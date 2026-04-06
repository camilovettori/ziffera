import "server-only";

import { query } from "@/lib/core/db";
import { createClient, upsertClientContact, writeAuditLog } from "@/lib/core/admin-data";
import type { ClientRecord, ProductRecord, StripeCustomerRecord, SubscriptionRecord } from "@/lib/core/models";
import { env } from "@/lib/core/env";
import { getStripeClient, getStripeCatalogEntryByProductCode, getStripeTrialDaysForProductCode } from "@/lib/core/stripe";
import { sendMarginFlowConfirmationEmail } from "@/lib/core/emails";

async function getMarginFlowProduct() {
  const result = await query<ProductRecord>(
    `SELECT * FROM products WHERE code = $1 LIMIT 1`,
    ["marginflow"]
  );

  return result.rows[0] ?? null;
}

export async function findClientByBillingEmail(email: string) {
  const result = await query<ClientRecord>(
    `SELECT *
     FROM clients
     WHERE LOWER(billing_email) = LOWER($1)
        OR EXISTS (
          SELECT 1
          FROM client_contacts cc
          WHERE cc.client_id = clients.id
            AND LOWER(cc.email) = LOWER($1)
        )
     ORDER BY updated_at DESC
     LIMIT 1`,
    [email]
  );

  return result.rows[0] ?? null;
}

export async function findExistingMarginFlowSubscription(clientId: string) {
  const result = await query<SubscriptionRecord>(
    `SELECT s.*
     FROM subscriptions s
     INNER JOIN products p ON p.id = s.product_id
     WHERE s.client_id = $1
       AND p.code = 'marginflow'
       AND s.status IN ('trialing', 'active', 'past_due', 'paused', 'incomplete')
     ORDER BY s.created_at DESC
     LIMIT 1`,
    [clientId]
  );

  return result.rows[0] ?? null;
}

async function ensurePrimaryContact(input: {
  clientId: string;
  fullName: string;
  email: string;
  companyName?: string | null;
}) {
  const existing = await query<{ id: string }>(
    `SELECT id FROM client_contacts
     WHERE client_id = $1 AND LOWER(email) = LOWER($2)
     LIMIT 1`,
    [input.clientId, input.email]
  );

  const notes = input.companyName ? `Submitted company: ${input.companyName}` : null;

  if (existing.rows[0]) {
    await upsertClientContact({
      clientId: input.clientId,
      contactId: existing.rows[0].id,
      fullName: input.fullName,
      email: input.email,
      role: "Primary contact",
      isPrimary: true,
      notes: notes ?? undefined,
    });
    return;
  }

  await upsertClientContact({
    clientId: input.clientId,
    fullName: input.fullName,
    email: input.email,
    role: "Primary contact",
    isPrimary: true,
    notes: notes ?? undefined,
  });
}

export async function createOrLinkClientForMarginFlow(input: {
  name: string;
  email: string;
  companyName?: string | null;
}) {
  const existing = await findClientByBillingEmail(input.email);

  if (existing) {
    await query(
      `UPDATE clients
       SET billing_email = COALESCE(billing_email, $1),
           company_name = COALESCE(company_name, $2),
           updated_at = NOW()
       WHERE id = $3`,
      [input.email, input.companyName ?? null, existing.id]
    );

    await ensurePrimaryContact({
      clientId: existing.id,
      fullName: input.name,
      email: input.email,
      companyName: input.companyName ?? null,
    });

    return existing;
  }

  const client = await createClient({
    name: input.name,
    companyName: input.companyName ?? undefined,
    clientType: "saas",
    billingEmail: input.email,
    supportEmail: env.supportEmail,
    billingStatus: "trial",
    serviceStatus: "trial",
    serviceStatusReason: "MarginFlow free trial started.",
    actorAdminId: null,
  });

  await ensurePrimaryContact({
    clientId: client.id,
    fullName: input.name,
    email: input.email,
    companyName: input.companyName ?? null,
  });

  return client;
}

export async function createOrLinkStripeCustomerForClient(input: {
  client: ClientRecord;
  email: string;
  companyName?: string | null;
}) {
  const stripe = getStripeClient();
  if (!stripe) {
    throw new Error("Stripe is not configured.");
  }

  const existing = await query<StripeCustomerRecord>(
    `SELECT * FROM stripe_customers WHERE client_id = $1 LIMIT 1`,
    [input.client.id]
  );

  if (existing.rows[0]) {
    try {
      const retrieved = await stripe.customers.retrieve(
        existing.rows[0].stripe_customer_id
      );

      if (retrieved && !("deleted" in retrieved)) {
        return {
          stripeCustomerId: retrieved.id,
        };
      }
    } catch {
      // Fall through and create a fresh Stripe customer.
    }
  }

  const customer = await stripe.customers.create({
    name: input.client.name,
    email: input.email,
    metadata: {
      client_id: input.client.id,
      client_slug: input.client.slug,
      client_name: input.client.name,
      company_name: input.companyName ?? input.client.company_name ?? "",
      product_code: "marginflow",
      source: "public_marginflow_subscribe",
    },
  });

  await query(
    `INSERT INTO stripe_customers (
      client_id,
      stripe_customer_id,
      email,
      name,
      metadata,
      synced_at
    ) VALUES ($1,$2,$3,$4,$5,NOW())
    ON CONFLICT (client_id) DO UPDATE SET
      stripe_customer_id = EXCLUDED.stripe_customer_id,
      email = EXCLUDED.email,
      name = EXCLUDED.name,
      metadata = EXCLUDED.metadata,
      synced_at = NOW(),
      updated_at = NOW()`,
    [
      input.client.id,
      customer.id,
      input.email,
      input.client.name,
      customer.metadata ?? {},
    ]
  );

  await writeAuditLog({
    actorAdminId: null,
    action: "stripe.customer.create",
    entityType: "stripe_customer",
    entityId: customer.id,
    metadata: {
      clientId: input.client.id,
      source: "public_marginflow_subscribe",
    },
  });

  return {
    stripeCustomerId: customer.id,
  };
}

export async function createMarginFlowCheckoutSession(input: {
  client: ClientRecord;
  email: string;
  companyName?: string | null;
  stripeCustomerId: string;
}) {
  const stripe = getStripeClient();
  if (!stripe) {
    throw new Error("Stripe is not configured.");
  }

  const catalogEntry = getStripeCatalogEntryByProductCode("marginflow");
  if (!catalogEntry?.monthlyPromoPriceId) {
    throw new Error("MarginFlow pricing is not configured.");
  }

  const product = await getMarginFlowProduct();
  if (!product) {
    throw new Error("MarginFlow product is not available.");
  }

  const trialDays = getStripeTrialDaysForProductCode("marginflow");
  const successUrl = `${env.appUrl.replace(/\/$/, "")}/marginflow/subscribe/success?session_id={CHECKOUT_SESSION_ID}`;
  const cancelUrl = `${env.appUrl.replace(/\/$/, "")}/marginflow/subscribe`;

  const checkoutSession = await stripe.checkout.sessions.create(
    {
      mode: "subscription",
      customer: input.stripeCustomerId,
      client_reference_id: input.client.id,
      allow_promotion_codes: false,
      success_url: successUrl,
      cancel_url: cancelUrl,
      line_items: [
        {
          price: catalogEntry.monthlyPromoPriceId,
          quantity: 1,
        },
      ],
      subscription_data: {
        trial_period_days: trialDays,
        metadata: {
          client_id: input.client.id,
          client_slug: input.client.slug,
          product_code: product.code,
          product_name: product.name,
          company_name: input.companyName ?? input.client.company_name ?? "",
          source: "public_marginflow_subscribe",
        },
      },
      metadata: {
        client_id: input.client.id,
        client_slug: input.client.slug,
        product_code: product.code,
        product_name: product.name,
        company_name: input.companyName ?? input.client.company_name ?? "",
        source: "public_marginflow_subscribe",
      },
    },
    {
      idempotencyKey: `marginflow-subscribe:${input.client.id}`,
    }
  );

  if (!checkoutSession.url) {
    throw new Error("Stripe checkout session did not return a URL.");
  }

  await writeAuditLog({
    actorAdminId: null,
    action: "stripe.checkout_session.create",
    entityType: "stripe_checkout_session",
    entityId: checkoutSession.id,
    metadata: {
      clientId: input.client.id,
      stripeCustomerId: input.stripeCustomerId,
      productCode: product.code,
      source: "public_marginflow_subscribe",
    },
  });

  const confirmation = await sendMarginFlowConfirmationEmail({
    clientId: input.client.id,
    toEmail: input.email,
    name: input.client.name,
    companyName: input.companyName ?? input.client.company_name ?? null,
    priceLabel: "EUR 25 / month",
    trialDays,
    productName: product.name,
    checkoutSessionId: checkoutSession.id,
  });

  return {
    checkoutSessionId: checkoutSession.id,
    checkoutUrl: checkoutSession.url,
    confirmation,
  };
}

export async function prepareMarginFlowSubscription(input: {
  name: string;
  email: string;
  companyName?: string | null;
}) {
  const client = await createOrLinkClientForMarginFlow(input);
  const existingSubscription = await findExistingMarginFlowSubscription(client.id);

  if (existingSubscription) {
    return {
      alreadySubscribed: true,
      client,
      existingSubscription,
    };
  }

  const customer = await createOrLinkStripeCustomerForClient({
    client,
    email: input.email,
    companyName: input.companyName ?? null,
  });

  const checkout = await createMarginFlowCheckoutSession({
    client,
    email: input.email,
    companyName: input.companyName ?? null,
    stripeCustomerId: customer.stripeCustomerId,
  });

  await writeAuditLog({
    actorAdminId: null,
    action: "public.marginflow.subscribe.request",
    entityType: "client",
    entityId: client.id,
    afterData: client as unknown as Record<string, unknown>,
    metadata: {
      productCode: "marginflow",
      stripeCustomerId: customer.stripeCustomerId,
      checkoutSessionId: checkout.checkoutSessionId,
    },
  });

  return {
    alreadySubscribed: false,
    client,
    stripeCustomerId: customer.stripeCustomerId,
    checkoutSessionId: checkout.checkoutSessionId,
    checkoutUrl: checkout.checkoutUrl,
    emailConfirmationSent: checkout.confirmation.sent,
  };
}
