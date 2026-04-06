import "server-only";

import Stripe from "stripe";
import { query, withTransaction } from "@/lib/core/db";
import { writeAuditLog } from "@/lib/core/admin-data";
import { env } from "@/lib/core/env";
import { getStripeClient } from "@/lib/core/stripe";
import {
  syncInvoicePaymentFromStripeObject,
  syncSubscriptionFromStripeObject,
} from "@/lib/core/subscriptions";
import type { StripeWebhookEventRecord } from "@/lib/core/models";

function cleanText(value: string | null | undefined) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

async function claimWebhookEvent(event: Stripe.Event) {
  return withTransaction(async (tx) => {
    const inserted = await tx.query<StripeWebhookEventRecord>(
      `INSERT INTO stripe_webhook_events (
        stripe_event_id,
        event_type,
        livemode,
        processing_status,
        payload
      ) VALUES ($1,$2,$3,'processing',$4)
      ON CONFLICT (stripe_event_id) DO NOTHING
      RETURNING *`,
      [
        event.id,
        event.type,
        Boolean(event.livemode),
        event as unknown as Record<string, unknown>,
      ]
    );

    if (inserted.rows[0]) {
      return { row: inserted.rows[0], shouldProcess: true };
    }

    const existing = await tx.query<StripeWebhookEventRecord>(
      `SELECT *
       FROM stripe_webhook_events
       WHERE stripe_event_id = $1
       LIMIT 1
       FOR UPDATE`,
      [event.id]
    );

    const row = existing.rows[0];
    if (!row) {
      throw new Error("Failed to load Stripe webhook event.");
    }

    if (row.processing_status === "processed" || row.processing_status === "ignored" || row.processing_status === "processing") {
      return { row, shouldProcess: false };
    }

    await tx.query(
      `UPDATE stripe_webhook_events
       SET event_type = $1,
           livemode = $2,
           payload = $3,
           processing_status = 'processing',
           error_message = NULL,
           updated_at = NOW()
       WHERE id = $4`,
      [
        event.type,
        Boolean(event.livemode),
        event as unknown as Record<string, unknown>,
        row.id,
      ]
    );

    return {
      row: { ...row, processing_status: "processing" as const },
      shouldProcess: true,
    };
  });
}

async function finalizeWebhookEvent(input: {
  eventId: string;
  status: StripeWebhookEventRecord["processing_status"];
  errorMessage?: string | null;
}) {
  await query(
    `UPDATE stripe_webhook_events
     SET processing_status = $1,
         error_message = $2,
         processed_at = CASE WHEN $1 = 'processed' THEN NOW() ELSE processed_at END,
         updated_at = NOW()
     WHERE id = $3`,
    [input.status, input.errorMessage ?? null, input.eventId]
  );
}

async function recordIgnoredWebhook(event: Stripe.Event, rowId: string) {
  await finalizeWebhookEvent({ eventId: rowId, status: "ignored" });
  await writeAuditLog({
    actorAdminId: null,
    action: "stripe.webhook.ignored",
    entityType: "stripe_event",
    entityId: event.id,
    metadata: { eventType: event.type },
  });
}

async function handleCheckoutSessionCompleted(event: Stripe.Event) {
  const session = event.data.object as Stripe.Checkout.Session;
  const stripe = getStripeClient();
  const customerId =
    typeof session.customer === "string"
      ? session.customer
      : session.customer?.id ?? null;
  const clientId = cleanText(session.metadata?.client_id);

  if (
    session.mode === "subscription" &&
    stripe &&
    typeof session.subscription === "string"
  ) {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription,
      {
        expand: ["customer", "latest_invoice", "items.data.price.product"],
      }
    );

    await syncSubscriptionFromStripeObject({
      stripeSubscription: subscription,
      sourceEventType: event.type,
    });
    return;
  }

  if (session.mode === "payment" && clientId) {
    const result = await query(
      `INSERT INTO payment_records (
        client_id,
        payment_status,
        payment_kind,
        amount_cents,
        currency,
        description,
        stripe_payment_intent_id,
        stripe_checkout_session_id,
        paid_at,
        metadata
      ) VALUES ($1,'paid','one_off',$2,$3,$4,$5,$6,NOW(),$7)
      ON CONFLICT (stripe_checkout_session_id) DO UPDATE SET
        payment_status = EXCLUDED.payment_status,
        amount_cents = EXCLUDED.amount_cents,
        currency = EXCLUDED.currency,
        description = EXCLUDED.description,
        stripe_payment_intent_id = EXCLUDED.stripe_payment_intent_id,
        paid_at = EXCLUDED.paid_at,
        metadata = EXCLUDED.metadata,
        updated_at = NOW()`,
      [
        clientId,
        session.amount_total ?? 0,
        (session.currency ?? "EUR").toUpperCase(),
        session.metadata?.description ?? "Stripe checkout payment",
        typeof session.payment_intent === "string"
          ? session.payment_intent
          : session.payment_intent?.id ?? null,
        session.id,
        {
          sessionMode: session.mode,
          customerId,
          sourceEventType: event.type,
          supportEmail: env.supportEmail,
        },
      ]
    );

    await writeAuditLog({
      actorAdminId: null,
      action: "stripe.checkout_session.payment_received",
      entityType: "payment_record",
      entityId: result.rows[0]?.id ?? session.id,
      afterData: result.rows[0] as unknown as Record<string, unknown>,
      metadata: {
        checkoutSessionId: session.id,
        sourceEventType: event.type,
      },
    });
  }
}

export async function processStripeWebhookEvent(event: Stripe.Event) {
  const claimed = await claimWebhookEvent(event);

  if (!claimed.shouldProcess) {
    return { status: "ignored", event: claimed.row };
  }

  try {
    switch (event.type) {
      case "checkout.session.completed":
        await handleCheckoutSessionCompleted(event);
        break;
      case "customer.subscription.created":
      case "customer.subscription.updated":
      case "customer.subscription.deleted":
        await syncSubscriptionFromStripeObject({
          stripeSubscription: event.data.object as Stripe.Subscription,
          sourceEventType: event.type,
        });
        break;
      case "invoice.paid":
      case "invoice.payment_failed":
        await syncInvoicePaymentFromStripeObject({
          invoice: event.data.object as Stripe.Invoice,
          sourceEventType: event.type,
        });
        break;
      default:
        await recordIgnoredWebhook(event, claimed.row.id);
        return { status: "ignored", event: claimed.row };
    }

    await finalizeWebhookEvent({
      eventId: claimed.row.id,
      status: "processed",
    });

    await writeAuditLog({
      actorAdminId: null,
      action: "stripe.webhook.processed",
      entityType: "stripe_event",
      entityId: event.id,
      metadata: { eventType: event.type },
    });

    return { status: "processed", event: claimed.row };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Stripe webhook processing failed.";

    await finalizeWebhookEvent({
      eventId: claimed.row.id,
      status: "failed",
      errorMessage: message,
    });

    await writeAuditLog({
      actorAdminId: null,
      action: "stripe.webhook.failed",
      entityType: "stripe_event",
      entityId: event.id,
      metadata: { eventType: event.type, errorMessage: message },
    });

    throw error;
  }
}
