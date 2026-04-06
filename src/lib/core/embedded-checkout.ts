import "server-only";

import crypto from "node:crypto";
import { query } from "@/lib/core/db";
import { createClient, upsertClientContact, writeAuditLog } from "@/lib/core/admin-data";
import type {
  BillingStatus,
  ClientRecord,
  ClientType,
  ServiceStatus,
  StripeCustomerRecord,
} from "@/lib/core/models";
import { env } from "@/lib/core/env";
import {
  getStripeCatalogEntryByProductCode,
  getStripeClient,
  getStripeTrialDaysForProductCode,
} from "@/lib/core/stripe";

export type EmbeddedCheckoutFlowSlug =
  | "monthly"
  | "setup-deposit"
  | "setup-final";

export type EmbeddedCheckoutMode = "subscription" | "payment";

export type EmbeddedCheckoutFlowDefinition = {
  slug: EmbeddedCheckoutFlowSlug;
  name: string;
  mode: EmbeddedCheckoutMode;
  priceId: string | undefined;
  productCode: string | null;
  productName: string;
  priceLabel: string;
  successPath: string;
  cancelPath: string;
  clientType: ClientType;
  billingStatus: BillingStatus;
  serviceStatus: ServiceStatus;
  trialDays: number;
};

export type EmbeddedCheckoutSessionResult = {
  definition: EmbeddedCheckoutFlowDefinition;
  sessionId: string;
  clientSecret: string;
};

function cleanId(value: string | undefined) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

function buildDefinitions(): EmbeddedCheckoutFlowDefinition[] {
  const marginflowCatalog = getStripeCatalogEntryByProductCode("marginflow");

  return [
    {
      slug: "monthly",
      name: "MarginFlow monthly plan",
      mode: "subscription",
      priceId: cleanId(marginflowCatalog?.monthlyPromoPriceId),
      productCode: "marginflow",
      productName: "MarginFlow",
      priceLabel: "EUR 25 / month",
      successPath: "/checkout/monthly/success",
      cancelPath: "/checkout/monthly/cancel",
      clientType: "saas",
      billingStatus: "trial",
      serviceStatus: "trial",
      trialDays: getStripeTrialDaysForProductCode("marginflow"),
    },
    {
      slug: "setup-deposit",
      name: "Website setup deposit",
      mode: "payment",
      priceId:
        cleanId(env.stripePriceSetupDeposit) ??
        cleanId(env.stripeWebsiteSetupDepositPriceId),
      productCode: null,
      productName: "Website Setup Deposit",
      priceLabel: "One-time deposit",
      successPath: "/checkout/setup-deposit/success",
      cancelPath: "/checkout/setup-deposit/cancel",
      clientType: "project",
      billingStatus: "current",
      serviceStatus: "active",
      trialDays: 0,
    },
    {
      slug: "setup-final",
      name: "Website final payment",
      mode: "payment",
      priceId:
        cleanId(env.stripePriceSetupFinal) ??
        cleanId(env.stripeWebsiteFinalPaymentPriceId),
      productCode: null,
      productName: "Website Final Payment",
      priceLabel: "One-time final payment",
      successPath: "/checkout/setup-final/success",
      cancelPath: "/checkout/setup-final/cancel",
      clientType: "project",
      billingStatus: "current",
      serviceStatus: "active",
      trialDays: 0,
    },
  ];
}

export function listEmbeddedCheckoutFlows() {
  return buildDefinitions();
}

export function getEmbeddedCheckoutFlowDefinition(
  slug: EmbeddedCheckoutFlowSlug
): EmbeddedCheckoutFlowDefinition {
  const definition = buildDefinitions().find((entry) => entry.slug === slug);

  if (!definition) {
    throw new Error(`Unknown checkout flow: ${slug}`);
  }

  return definition;
}

function canonicalizeEmbeddedCheckoutPayload(input: {
  flowSlug: EmbeddedCheckoutFlowSlug;
  clientId: string;
  clientSlug: string;
  clientName: string;
  email: string;
  companyName: string | null;
  stripeCustomerId: string;
  priceId: string;
  mode: EmbeddedCheckoutMode;
  successPath: string;
  cancelPath: string;
  trialDays: number;
}) {
  return JSON.stringify({
    cancelPath: input.cancelPath,
    clientId: input.clientId,
    clientName: input.clientName,
    clientSlug: input.clientSlug,
    companyName: input.companyName ?? "",
    email: input.email,
    flowSlug: input.flowSlug,
    mode: input.mode,
    priceId: input.priceId,
    stripeCustomerId: input.stripeCustomerId,
    successPath: input.successPath,
    trialDays: input.trialDays,
  });
}

function buildEmbeddedCheckoutIdempotencyKey(input: {
  flowSlug: EmbeddedCheckoutFlowSlug;
  clientId: string;
  clientSlug: string;
  clientName: string;
  email: string;
  companyName: string | null;
  stripeCustomerId: string;
  priceId: string;
  mode: EmbeddedCheckoutMode;
  successPath: string;
  cancelPath: string;
  trialDays: number;
}) {
  const canonicalPayload = canonicalizeEmbeddedCheckoutPayload(input);
  const digest = crypto.createHash("sha256").update(canonicalPayload).digest("hex");
  return `embedded-checkout:${input.flowSlug}:v1:${digest}`;
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

export async function createOrLinkClientForEmbeddedCheckout(input: {
  flowSlug: EmbeddedCheckoutFlowSlug;
  name: string;
  email: string;
  companyName?: string | null;
}) {
  const definition = getEmbeddedCheckoutFlowDefinition(input.flowSlug);

  const existing = await query<ClientRecord>(
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
    [input.email]
  );

  if (existing.rows[0]) {
    await query(
      `UPDATE clients
       SET billing_email = COALESCE(billing_email, $1),
           company_name = COALESCE(company_name, $2),
           updated_at = NOW()
       WHERE id = $3`,
      [input.email, input.companyName ?? null, existing.rows[0].id]
    );

    await ensurePrimaryContact({
      clientId: existing.rows[0].id,
      fullName: input.name,
      email: input.email,
      companyName: input.companyName ?? null,
    });

    return existing.rows[0];
  }

  const client = await createClient({
    name: input.name,
    companyName: input.companyName ?? undefined,
    clientType: definition.clientType,
    billingEmail: input.email,
    supportEmail: env.supportEmail,
    billingStatus: definition.billingStatus,
    serviceStatus: definition.serviceStatus,
    serviceStatusReason:
      definition.slug === "monthly"
        ? "MarginFlow free trial started."
        : `${definition.name} checkout started.`,
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
  source: string;
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
      source: input.source,
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
      source: input.source,
    },
  });

  return {
    stripeCustomerId: customer.id,
  };
}

export async function createEmbeddedCheckoutSessionForClient(input: {
  flowSlug: EmbeddedCheckoutFlowSlug;
  client: ClientRecord;
  email: string;
  companyName?: string | null;
  stripeCustomerId: string;
}) {
  const definition = getEmbeddedCheckoutFlowDefinition(input.flowSlug);

  if (!definition.priceId) {
    throw new Error(`${definition.name} is not configured.`);
  }

  const stripe = getStripeClient();
  if (!stripe) {
    throw new Error("Stripe is not configured.");
  }

  const successUrl = `${env.appUrl.replace(/\/$/, "")}${definition.successPath}`;
  const cancelUrl = `${env.appUrl.replace(/\/$/, "")}${definition.cancelPath}`;
  const idempotencyKey = buildEmbeddedCheckoutIdempotencyKey({
    flowSlug: definition.slug,
    clientId: input.client.id,
    clientSlug: input.client.slug,
    clientName: input.client.name,
    email: input.email,
    companyName: input.companyName ?? input.client.company_name ?? null,
    stripeCustomerId: input.stripeCustomerId,
    priceId: definition.priceId,
    mode: definition.mode,
    successPath: successUrl,
    cancelPath: cancelUrl,
    trialDays: definition.trialDays,
  });

  const metadata = {
    client_id: input.client.id,
    client_slug: input.client.slug,
    client_name: input.client.name,
    company_name: input.companyName ?? input.client.company_name ?? "",
    flow_slug: definition.slug,
    flow_name: definition.name,
    product_code: definition.productCode ?? "",
    product_name: definition.productName,
    source:
      definition.slug === "monthly"
        ? "public_marginflow_subscribe"
        : "ziffera_checkout",
  };

  const checkoutSession = await stripe.checkout.sessions.create(
    {
      mode: definition.mode,
      customer: input.stripeCustomerId,
      client_reference_id: input.client.id,
      allow_promotion_codes: false,
      ui_mode: "embedded_page",
      redirect_on_completion: "never",
      payment_method_types: ["card"],
      line_items: [
        {
          price: definition.priceId,
          quantity: 1,
        },
      ],
      ...(definition.mode === "subscription"
        ? {
            subscription_data: {
              trial_period_days: definition.trialDays,
              metadata,
            },
          }
        : {
            payment_intent_data: {
              metadata,
            },
          }),
      metadata,
    },
    {
      idempotencyKey,
    }
  );

  const clientSecret = checkoutSession.client_secret ?? null;
  if (!clientSecret) {
    throw new Error("Stripe checkout session did not return a client secret.");
  }

  await writeAuditLog({
    actorAdminId: null,
    action: "stripe.checkout_session.create",
    entityType: "stripe_checkout_session",
    entityId: checkoutSession.id,
      metadata: {
        clientId: input.client.id,
        stripeCustomerId: input.stripeCustomerId,
        flowSlug: definition.slug,
        source:
        definition.slug === "monthly"
          ? "public_marginflow_subscribe"
          : "ziffera_checkout",
      },
  });

  return {
    definition,
    sessionId: checkoutSession.id,
    clientSecret,
  };
}
