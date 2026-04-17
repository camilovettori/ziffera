import "server-only";

import Stripe from "stripe";
import { query } from "@/lib/core/db";
import { refreshClientBillingSnapshotForClientId } from "@/lib/core/billing-snapshots";
import { writeAuditLog, setEntitlement } from "@/lib/core/admin-data";
import { createEmailEvent } from "@/lib/core/emails";
import type {
  EntitlementRecord,
  PaymentRecord,
  StripeCustomerRecord,
  StripeSubscriptionRecord,
  SubscriptionRecord,
  SubscriptionStatus,
} from "@/lib/core/models";
import { env } from "@/lib/core/env";
import {
  getStripeClient,
  normalizeStripePaymentStatus,
  normalizeStripeTimestamp,
  resolveStripeProductCodeFromPriceId,
  resolveStripeProductCodeFromProductId,
} from "@/lib/core/stripe";

function toNumber(value: unknown) {
  return typeof value === "number" ? value : Number(value ?? 0);
}

function toBoolean(value: unknown) {
  return Boolean(value);
}

function cleanText(value: string | null | undefined) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

function entitlementStatusFromSubscription(
  status: SubscriptionStatus
): EntitlementRecord["entitlement_status"] | null {
  switch (status) {
    case "trialing":
      return "trial";
    case "active":
      return "active";
    case "past_due":
    case "paused":
      return "suspended";
    case "canceled":
    case "incomplete":
      return "revoked";
    default:
      return null;
  }
}

function coreStatusFromStripe(
  status?: string | null
): SubscriptionStatus {
  switch (status) {
    case "trialing":
    case "active":
    case "past_due":
    case "paused":
    case "canceled":
    case "incomplete":
      return status;
    case "incomplete_expired":
      return "canceled";
    default:
      return "manual_override";
  }
}

async function findClientIdByStripeCustomerId(stripeCustomerId: string) {
  const result = await query<{ client_id: string }>(
    `SELECT client_id FROM stripe_customers WHERE stripe_customer_id = $1 LIMIT 1`,
    [stripeCustomerId]
  );

  return result.rows[0]?.client_id ?? null;
}

async function findProductIdByStripeIdentifiers(input: {
  stripePriceId?: string | null;
  stripeProductId?: string | null;
  productCode?: string | null;
}) {
  const productCode =
    input.productCode ??
    resolveStripeProductCodeFromPriceId(input.stripePriceId) ??
    resolveStripeProductCodeFromProductId(input.stripeProductId);

  if (!productCode) {
    return null;
  }

  const result = await query<{ id: string }>(
    `SELECT id FROM products WHERE code = $1 LIMIT 1`,
    [productCode]
  );

  return result.rows[0]?.id ?? null;
}

async function upsertStripeCustomer(input: {
  clientId: string;
  stripeCustomerId: string;
  email?: string | null;
  name?: string | null;
  metadata?: Record<string, unknown>;
}) {
  const existing = await query<StripeCustomerRecord>(
    `SELECT *
     FROM stripe_customers
     WHERE client_id = $1 OR stripe_customer_id = $2
     LIMIT 1`,
    [input.clientId, input.stripeCustomerId]
  );

  if (existing.rows[0]) {
    const result = await query<StripeCustomerRecord>(
      `UPDATE stripe_customers
       SET client_id = $1,
           stripe_customer_id = $2,
           email = $3,
           name = $4,
           metadata = $5,
           synced_at = NOW(),
           updated_at = NOW()
       WHERE id = $6
       RETURNING *`,
      [
        input.clientId,
        input.stripeCustomerId,
        input.email ?? null,
        input.name ?? null,
        input.metadata ?? {},
        existing.rows[0].id,
      ]
    );

    return result.rows[0];
  }

  const result = await query<StripeCustomerRecord>(
    `INSERT INTO stripe_customers (
      client_id,
      stripe_customer_id,
      email,
      name,
      metadata,
      synced_at
    ) VALUES ($1, $2, $3, $4, $5, NOW())
    RETURNING *`,
    [
      input.clientId,
      input.stripeCustomerId,
      input.email ?? null,
      input.name ?? null,
      input.metadata ?? {},
    ]
  );

  return result.rows[0] ?? null;
}

async function upsertStripeSubscription(input: {
  subscriptionId: string;
  stripeSubscriptionId: string;
  stripeCustomerId: string;
  stripePriceId?: string | null;
  stripeProductId?: string | null;
  latestInvoiceId?: string | null;
  latestInvoiceStatus?: string | null;
  status: string;
  rawStatus?: string | null;
  currentPeriodStartAt?: string | null;
  currentPeriodEndAt?: string | null;
  trialStartAt?: string | null;
  trialEndAt?: string | null;
  cancelAtPeriodEnd?: boolean;
  amountCents?: number;
  currency?: string;
  metadata?: Record<string, unknown>;
}) {
  const existing = await query<StripeSubscriptionRecord>(
    `SELECT *
     FROM stripe_subscriptions
     WHERE subscription_id = $1 OR stripe_subscription_id = $2
     LIMIT 1`,
    [input.subscriptionId, input.stripeSubscriptionId]
  );

  if (existing.rows[0]) {
    const result = await query<StripeSubscriptionRecord>(
      `UPDATE stripe_subscriptions
       SET stripe_subscription_id = $1,
           stripe_customer_id = $2,
           stripe_price_id = $3,
           stripe_product_id = $4,
           latest_invoice_id = $5,
           latest_invoice_status = $6,
           status = $7,
           raw_status = $8,
           current_period_start_at = $9,
           current_period_end_at = $10,
           trial_start_at = $11,
           trial_end_at = $12,
           cancel_at_period_end = $13,
           amount_cents = $14,
           currency = $15,
           metadata = $16,
           synced_at = NOW(),
           updated_at = NOW()
       WHERE id = $17
       RETURNING *`,
      [
        input.stripeSubscriptionId,
        input.stripeCustomerId,
        input.stripePriceId ?? null,
        input.stripeProductId ?? null,
        input.latestInvoiceId ?? null,
        input.latestInvoiceStatus ?? null,
        input.status,
        input.rawStatus ?? null,
        input.currentPeriodStartAt ?? null,
        input.currentPeriodEndAt ?? null,
        input.trialStartAt ?? null,
        input.trialEndAt ?? null,
        input.cancelAtPeriodEnd ?? false,
        input.amountCents ?? 0,
        input.currency ?? "EUR",
        input.metadata ?? {},
        existing.rows[0].id,
      ]
    );

    return result.rows[0];
  }

  const result = await query<StripeSubscriptionRecord>(
    `INSERT INTO stripe_subscriptions (
      subscription_id,
      stripe_subscription_id,
      stripe_customer_id,
      stripe_price_id,
      stripe_product_id,
      latest_invoice_id,
      latest_invoice_status,
      status,
      raw_status,
      current_period_start_at,
      current_period_end_at,
      trial_start_at,
      trial_end_at,
      cancel_at_period_end,
      amount_cents,
      currency,
      metadata,
      synced_at
    ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,NOW())
    RETURNING *`,
    [
      input.subscriptionId,
      input.stripeSubscriptionId,
      input.stripeCustomerId,
      input.stripePriceId ?? null,
      input.stripeProductId ?? null,
      input.latestInvoiceId ?? null,
      input.latestInvoiceStatus ?? null,
      input.status,
      input.rawStatus ?? null,
      input.currentPeriodStartAt ?? null,
      input.currentPeriodEndAt ?? null,
      input.trialStartAt ?? null,
      input.trialEndAt ?? null,
      input.cancelAtPeriodEnd ?? false,
      input.amountCents ?? 0,
      input.currency ?? "EUR",
      input.metadata ?? {},
    ]
  );

  return result.rows[0] ?? null;
}

async function upsertSubscriptionRow(input: {
  subscriptionId: string;
  clientId: string;
  productId: string;
  status: SubscriptionStatus;
  subscriptionName?: string | null;
  billingInterval?: "month" | "year";
  amountCents?: number;
  currency?: string;
  trialStartAt?: string | null;
  trialEndAt?: string | null;
  currentPeriodStartAt?: string | null;
  currentPeriodEndAt?: string | null;
  cancelAtPeriodEnd?: boolean;
  manualOverrideStatus?: string | null;
  notes?: string | null;
  stripeCustomerId?: string | null;
  stripeSubscriptionId?: string | null;
  stripePriceId?: string | null;
  stripeProductId?: string | null;
  stripeLatestInvoiceId?: string | null;
  stripeLatestInvoiceStatus?: string | null;
  stripeStatusRaw?: string | null;
}) {
  const result = await query<SubscriptionRecord>(
    `UPDATE subscriptions
     SET subscription_name = $1,
         status = $2,
         billing_interval = $3,
         amount_cents = $4,
         currency = $5,
         trial_start_at = $6,
         trial_end_at = $7,
         current_period_start_at = $8,
         current_period_end_at = $9,
         cancel_at_period_end = $10,
         manual_override_status = $11,
         notes = $12,
         stripe_customer_id = $13,
         stripe_subscription_id = $14,
         stripe_price_id = $15,
         stripe_product_id = $16,
         stripe_latest_invoice_id = $17,
         stripe_latest_invoice_status = $18,
         stripe_status_raw = $19,
         updated_at = NOW()
     WHERE id = $20
     RETURNING *`,
    [
      input.subscriptionName ?? null,
      input.status,
      input.billingInterval ?? "month",
      input.amountCents ?? 0,
      input.currency ?? "EUR",
      input.trialStartAt ?? null,
      input.trialEndAt ?? null,
      input.currentPeriodStartAt ?? null,
      input.currentPeriodEndAt ?? null,
      input.cancelAtPeriodEnd ?? false,
      input.manualOverrideStatus ?? null,
      input.notes ?? null,
      input.stripeCustomerId ?? null,
      input.stripeSubscriptionId ?? null,
      input.stripePriceId ?? null,
      input.stripeProductId ?? null,
      input.stripeLatestInvoiceId ?? null,
      input.stripeLatestInvoiceStatus ?? null,
      input.stripeStatusRaw ?? null,
      input.subscriptionId,
    ]
  );

  const subscription = result.rows[0];
  if (!subscription) {
    throw new Error("Subscription not found.");
  }

  if (subscription.stripe_subscription_id && subscription.stripe_customer_id) {
    await upsertStripeSubscription({
      subscriptionId: subscription.id,
      stripeSubscriptionId: subscription.stripe_subscription_id,
      stripeCustomerId: subscription.stripe_customer_id,
      stripePriceId: subscription.stripe_price_id,
      stripeProductId: subscription.stripe_product_id,
      latestInvoiceId: subscription.stripe_latest_invoice_id,
      latestInvoiceStatus: subscription.stripe_latest_invoice_status,
      status: subscription.status,
      rawStatus: subscription.stripe_status_raw,
      currentPeriodStartAt: subscription.current_period_start_at,
      currentPeriodEndAt: subscription.current_period_end_at,
      trialStartAt: subscription.trial_start_at,
      trialEndAt: subscription.trial_end_at,
      cancelAtPeriodEnd: subscription.cancel_at_period_end,
      amountCents: subscription.amount_cents,
      currency: subscription.currency,
      metadata: {},
    });
  }

  if (
    subscription.status !== "manual_override" &&
    subscription.client_id &&
    subscription.product_id
  ) {
    const entitlementStatus = entitlementStatusFromSubscription(subscription.status);
    if (entitlementStatus) {
      await setEntitlement({
        clientId: subscription.client_id,
        productId: subscription.product_id,
        subscriptionId: subscription.id,
        entitlementStatus,
        accessSource: "subscription",
      });
    }
  }

  await refreshClientBillingSnapshotForClientId(subscription.client_id);

  return subscription;
}

export async function updateSubscriptionRecord(input: {
  subscriptionId: string;
  subscriptionName?: string | null;
  status: SubscriptionStatus;
  billingInterval?: "month" | "year";
  amountCents?: number;
  currency?: string;
  trialStartAt?: string | null;
  trialEndAt?: string | null;
  currentPeriodStartAt?: string | null;
  currentPeriodEndAt?: string | null;
  cancelAtPeriodEnd?: boolean;
  manualOverrideStatus?: string | null;
  notes?: string | null;
  stripeCustomerId?: string | null;
  stripeSubscriptionId?: string | null;
  stripePriceId?: string | null;
  stripeProductId?: string | null;
  stripeLatestInvoiceId?: string | null;
  stripeLatestInvoiceStatus?: string | null;
  stripeStatusRaw?: string | null;
  actorAdminId?: string | null;
}) {
  const before = await getSubscriptionById(input.subscriptionId);
  if (!before) {
    throw new Error("Subscription not found.");
  }

  const result = await query<SubscriptionRecord>(
    `UPDATE subscriptions
     SET subscription_name = $1,
         status = $2,
         billing_interval = $3,
         amount_cents = $4,
         currency = $5,
         trial_start_at = $6,
         trial_end_at = $7,
         current_period_start_at = $8,
         current_period_end_at = $9,
         cancel_at_period_end = $10,
         manual_override_status = $11,
         notes = $12,
         stripe_customer_id = $13,
         stripe_subscription_id = $14,
         stripe_price_id = $15,
         stripe_product_id = $16,
         stripe_latest_invoice_id = $17,
         stripe_latest_invoice_status = $18,
         stripe_status_raw = $19,
         updated_at = NOW()
     WHERE id = $20
     RETURNING *`,
    [
      input.subscriptionName ?? before.subscription_name,
      input.status,
      input.billingInterval ?? before.billing_interval,
      input.amountCents ?? before.amount_cents,
      input.currency ?? before.currency,
      input.trialStartAt ?? before.trial_start_at,
      input.trialEndAt ?? before.trial_end_at,
      input.currentPeriodStartAt ?? before.current_period_start_at,
      input.currentPeriodEndAt ?? before.current_period_end_at,
      input.cancelAtPeriodEnd ?? before.cancel_at_period_end,
      input.manualOverrideStatus ?? before.manual_override_status,
      input.notes ?? before.notes,
      input.stripeCustomerId ?? before.stripe_customer_id,
      input.stripeSubscriptionId ?? before.stripe_subscription_id,
      input.stripePriceId ?? before.stripe_price_id,
      input.stripeProductId ?? before.stripe_product_id,
      input.stripeLatestInvoiceId ?? before.stripe_latest_invoice_id,
      input.stripeLatestInvoiceStatus ?? before.stripe_latest_invoice_status,
      input.stripeStatusRaw ?? before.stripe_status_raw,
      input.subscriptionId,
    ]
  );

  const subscription = result.rows[0];
  if (!subscription) {
    throw new Error("Failed to update subscription.");
  }

  if (subscription.stripe_subscription_id && subscription.stripe_customer_id) {
    await upsertStripeSubscription({
      subscriptionId: subscription.id,
      stripeSubscriptionId: subscription.stripe_subscription_id,
      stripeCustomerId: subscription.stripe_customer_id,
      stripePriceId: subscription.stripe_price_id,
      stripeProductId: subscription.stripe_product_id,
      latestInvoiceId: subscription.stripe_latest_invoice_id,
      latestInvoiceStatus: subscription.stripe_latest_invoice_status,
      status: subscription.status,
      rawStatus: subscription.stripe_status_raw,
      currentPeriodStartAt: subscription.current_period_start_at,
      currentPeriodEndAt: subscription.current_period_end_at,
      trialStartAt: subscription.trial_start_at,
      trialEndAt: subscription.trial_end_at,
      cancelAtPeriodEnd: subscription.cancel_at_period_end,
      amountCents: subscription.amount_cents,
      currency: subscription.currency,
      metadata: {},
    });
  }

  const entitlementStatus = entitlementStatusFromSubscription(subscription.status);
  if (entitlementStatus) {
    await setEntitlement({
      clientId: subscription.client_id,
      productId: subscription.product_id,
      subscriptionId: subscription.id,
      entitlementStatus,
      accessSource: "subscription",
      actorAdminId: input.actorAdminId ?? null,
    });
  }

  await writeAuditLog({
    actorAdminId: input.actorAdminId ?? null,
    action: "subscription.update",
    entityType: "subscription",
    entityId: subscription.id,
    beforeData: before as unknown as Record<string, unknown>,
    afterData: subscription as unknown as Record<string, unknown>,
  });

  await refreshClientBillingSnapshotForClientId(subscription.client_id);

  return subscription;
}

export async function syncSubscriptionFromStripeIdentifier(input: {
  subscriptionId?: string | null;
  stripeSubscriptionId?: string | null;
  actorAdminId?: string | null;
}) {
  const stripe = getStripeClient();
  if (!stripe) {
    throw new Error("Stripe is not configured.");
  }

  const stripeSubscriptionId = cleanText(input.stripeSubscriptionId);
  const current = input.subscriptionId
    ? await getSubscriptionById(input.subscriptionId)
    : stripeSubscriptionId
      ? await getSubscriptionByStripeSubscriptionId(stripeSubscriptionId)
      : null;

  const retrievableStripeSubscriptionId =
    stripeSubscriptionId ?? current?.stripe_subscription_id ?? null;

  if (!retrievableStripeSubscriptionId) {
    throw new Error("Stripe subscription ID is required to sync.");
  }

  const stripeSubscription = await stripe.subscriptions.retrieve(
    retrievableStripeSubscriptionId,
    {
      expand: ["customer", "latest_invoice", "items.data.price.product"],
    }
  );

  return syncSubscriptionFromStripeObject({
    stripeSubscription,
    actorAdminId: input.actorAdminId ?? null,
    clientId: current?.client_id ?? null,
    productId: current?.product_id ?? null,
    sourceEventType: "manual_sync",
  });
}

export type SubscriptionListItem = SubscriptionRecord & {
  clientName: string;
  clientSlug: string;
  clientBillingStatus: string;
  clientServiceStatus: string;
  productName: string;
  productSlug: string;
  productIsActive: boolean;
  paymentCount: number;
};

export type SubscriptionDetail = SubscriptionRecord & {
  clientName: string;
  clientSlug: string;
  clientBillingStatus: string;
  clientServiceStatus: string;
  clientBillingEmail: string | null;
  clientSupportEmail: string | null;
  primaryContactEmail: string | null;
  productName: string;
  productSlug: string;
  productDescription: string | null;
  productIsActive: boolean;
  stripeCustomer: StripeCustomerRecord | null;
  stripeSubscription: StripeSubscriptionRecord | null;
  entitlement: EntitlementRecord | null;
  payments: PaymentRecord[];
};

export async function listSubscriptions(filters: {
  q?: string;
  status?: string;
  clientId?: string;
  productId?: string;
} = {}): Promise<SubscriptionListItem[]> {
  const conditions: string[] = [];
  const values: string[] = [];

  if (filters.q?.trim()) {
    values.push(`%${filters.q.trim()}%`);
    const param = `$${values.length}`;
    conditions.push(
      `(c.name ILIKE ${param} OR c.slug ILIKE ${param} OR p.name ILIKE ${param} OR s.status ILIKE ${param} OR COALESCE(s.stripe_subscription_id, '') ILIKE ${param})`
    );
  }

  if (filters.status?.trim()) {
    values.push(filters.status.trim());
    conditions.push(`s.status = $${values.length}`);
  }

  if (filters.clientId?.trim()) {
    values.push(filters.clientId.trim());
    conditions.push(`s.client_id = $${values.length}`);
  }

  if (filters.productId?.trim()) {
    values.push(filters.productId.trim());
    conditions.push(`s.product_id = $${values.length}`);
  }

  const whereClause = conditions.length
    ? `WHERE ${conditions.join(" AND ")}`
    : "";

  const result = await query<{
    id: string;
    client_id: string;
    product_id: string;
    subscription_name: string | null;
    status: SubscriptionStatus;
    billing_interval: "month" | "year";
    amount_cents: number;
    currency: string;
    trial_start_at: string | null;
    trial_end_at: string | null;
    current_period_start_at: string | null;
    current_period_end_at: string | null;
    cancel_at_period_end: boolean;
    manual_override_status: string | null;
    notes: string | null;
    stripe_customer_id: string | null;
    stripe_subscription_id: string | null;
    stripe_price_id: string | null;
    stripe_product_id: string | null;
    stripe_latest_invoice_id: string | null;
    stripe_latest_invoice_status: string | null;
    stripe_status_raw: string | null;
    created_at: string;
    updated_at: string;
    client_name: string;
    client_slug: string;
    client_billing_status: string;
    client_service_status: string;
    product_name: string;
    product_slug: string;
    product_is_active: boolean;
    payment_count: string;
  }>(
    `
      SELECT
        s.*,
        c.name AS client_name,
        c.slug AS client_slug,
        c.billing_status AS client_billing_status,
        c.service_status AS client_service_status,
        COALESCE(p.public_name, p.name) AS product_name,
        p.slug AS product_slug,
        p.is_active AS product_is_active,
        COALESCE((
          SELECT COUNT(*) FROM payment_records pr WHERE pr.subscription_id = s.id
        ), 0) AS payment_count
      FROM subscriptions s
      INNER JOIN clients c ON c.id = s.client_id
      INNER JOIN products p ON p.id = s.product_id
      ${whereClause}
      ORDER BY s.created_at DESC
    `,
    values
  );

  return result.rows.map((row) => ({
    ...row,
    clientName: row.client_name,
    clientSlug: row.client_slug,
    clientBillingStatus: row.client_billing_status,
    clientServiceStatus: row.client_service_status,
    productName: row.product_name,
    productSlug: row.product_slug,
    productIsActive: toBoolean(row.product_is_active),
    paymentCount: toNumber(row.payment_count),
  }));
}

export async function getSubscriptionById(
  subscriptionId: string
): Promise<SubscriptionDetail | null> {
  const result = await query<{
    id: string;
    client_id: string;
    product_id: string;
    subscription_name: string | null;
    status: SubscriptionStatus;
    billing_interval: "month" | "year";
    amount_cents: number;
    currency: string;
    trial_start_at: string | null;
    trial_end_at: string | null;
    current_period_start_at: string | null;
    current_period_end_at: string | null;
    cancel_at_period_end: boolean;
    manual_override_status: string | null;
    notes: string | null;
    stripe_customer_id: string | null;
    stripe_subscription_id: string | null;
    stripe_price_id: string | null;
    stripe_product_id: string | null;
    stripe_latest_invoice_id: string | null;
    stripe_latest_invoice_status: string | null;
    stripe_status_raw: string | null;
    created_at: string;
    updated_at: string;
    client_name: string;
    client_slug: string;
    client_billing_status: string;
    client_service_status: string;
    client_billing_email: string | null;
    client_support_email: string | null;
    primary_contact_email: string | null;
    product_name: string;
    product_slug: string;
    product_description: string | null;
    product_is_active: boolean;
  }>(
    `
      SELECT
        s.*,
        c.name AS client_name,
        c.slug AS client_slug,
        c.billing_status AS client_billing_status,
        c.service_status AS client_service_status,
        c.billing_email AS client_billing_email,
        c.support_email AS client_support_email,
        pc.email AS primary_contact_email,
        COALESCE(p.public_name, p.name) AS product_name,
        p.slug AS product_slug,
        p.description AS product_description,
        p.is_active AS product_is_active
      FROM subscriptions s
      INNER JOIN clients c ON c.id = s.client_id
      INNER JOIN products p ON p.id = s.product_id
      LEFT JOIN LATERAL (
        SELECT email
        FROM client_contacts
        WHERE client_id = c.id
        ORDER BY is_primary DESC, created_at ASC
        LIMIT 1
      ) pc ON TRUE
      WHERE s.id = $1
      LIMIT 1
    `,
    [subscriptionId]
  );

  const row = result.rows[0];
  if (!row) {
    return null;
  }

  const [stripeCustomer, stripeSubscription, entitlement, payments] =
    await Promise.all([
      query<StripeCustomerRecord>(
        `SELECT * FROM stripe_customers WHERE client_id = $1 LIMIT 1`,
        [row.client_id]
      ),
      query<StripeSubscriptionRecord>(
        `SELECT *
         FROM stripe_subscriptions
         WHERE subscription_id = $1
            OR stripe_subscription_id = $2
         LIMIT 1`,
        [row.id, row.stripe_subscription_id]
      ),
      query<EntitlementRecord>(
        `SELECT * FROM entitlements WHERE subscription_id = $1 LIMIT 1`,
        [row.id]
      ),
      query<PaymentRecord>(
        `SELECT * FROM payment_records WHERE subscription_id = $1 ORDER BY created_at DESC`,
        [row.id]
      ),
    ]);

  return {
    ...row,
    clientName: row.client_name,
    clientSlug: row.client_slug,
    clientBillingStatus: row.client_billing_status,
    clientServiceStatus: row.client_service_status,
    clientBillingEmail: row.client_billing_email,
    clientSupportEmail: row.client_support_email,
    primaryContactEmail: row.primary_contact_email,
    productName: row.product_name,
    productSlug: row.product_slug,
    productDescription: row.product_description,
    productIsActive: toBoolean(row.product_is_active),
    stripeCustomer: stripeCustomer.rows[0] ?? null,
    stripeSubscription: stripeSubscription.rows[0] ?? null,
    entitlement: entitlement.rows[0] ?? null,
    payments: payments.rows,
  };
}

export async function getSubscriptionByStripeSubscriptionId(
  stripeSubscriptionId: string
) {
  const result = await query<{ id: string }>(
    `SELECT id FROM subscriptions WHERE stripe_subscription_id = $1 LIMIT 1`,
    [stripeSubscriptionId]
  );

  const subscriptionId = result.rows[0]?.id ?? null;
  if (!subscriptionId) {
    return null;
  }

  return getSubscriptionById(subscriptionId);
}

export async function createStripeCustomerForSubscription(input: {
  subscriptionId: string;
  actorAdminId?: string | null;
}) {
  const stripe = getStripeClient();
  if (!stripe) {
    throw new Error("Stripe is not configured.");
  }

  const detail = await getSubscriptionById(input.subscriptionId);
  if (!detail) {
    throw new Error("Subscription not found.");
  }

  if (detail.stripeCustomer) {
    return detail.stripeCustomer;
  }

  if (detail.stripe_customer_id) {
    const existingStripeCustomer = await stripe.customers.retrieve(
      detail.stripe_customer_id
    );

    if (existingStripeCustomer && !("deleted" in existingStripeCustomer)) {
      const record = await upsertStripeCustomer({
        clientId: detail.client_id,
        stripeCustomerId: existingStripeCustomer.id,
        email: existingStripeCustomer.email ?? null,
        name: existingStripeCustomer.name ?? detail.clientName,
        metadata: existingStripeCustomer.metadata ?? {},
      });

      await writeAuditLog({
        actorAdminId: input.actorAdminId ?? null,
        action: "stripe.customer.link",
        entityType: "stripe_customer",
        entityId: existingStripeCustomer.id,
        afterData: record as unknown as Record<string, unknown>,
        metadata: {
          subscriptionId: detail.id,
          clientId: detail.client_id,
        },
      });

      return record;
    }
  }

  const customer = await stripe.customers.create({
    name: detail.clientName,
    email:
      detail.clientBillingEmail ??
      detail.primaryContactEmail ??
      detail.clientSupportEmail ??
      undefined,
    metadata: {
      client_id: detail.client_id,
      client_slug: detail.clientSlug,
      subscription_id: detail.id,
      product_id: detail.product_id,
      product_name: detail.productName,
      source: "ziffera_core_admin",
    },
  });

  const record = await upsertStripeCustomer({
    clientId: detail.client_id,
    stripeCustomerId: customer.id,
    email: customer.email ?? null,
    name: customer.name ?? detail.clientName,
    metadata: customer.metadata,
  });

  await query(
    `UPDATE subscriptions
     SET stripe_customer_id = $1,
         updated_at = NOW()
     WHERE id = $2`,
    [customer.id, detail.id]
  );

  await refreshClientBillingSnapshotForClientId(detail.client_id);

  await writeAuditLog({
    actorAdminId: input.actorAdminId ?? null,
    action: "stripe.customer.create",
    entityType: "stripe_customer",
    entityId: customer.id,
    afterData: record as unknown as Record<string, unknown>,
    metadata: {
      subscriptionId: detail.id,
      clientId: detail.client_id,
    },
  });

  return record;
}

export async function syncSubscriptionFromStripeObject(input: {
  stripeSubscription: Stripe.Subscription;
  actorAdminId?: string | null;
  clientId?: string | null;
  productId?: string | null;
  sourceEventType?: string;
}) {
  const stripeSubscription = input.stripeSubscription;
  const stripeSubscriptionId = stripeSubscription.id;
  const stripeCustomerId =
    typeof stripeSubscription.customer === "string"
      ? stripeSubscription.customer
      : stripeSubscription.customer.id;
  const stripePriceId = stripeSubscription.items.data[0]?.price?.id ?? null;
  const stripeProductIdRaw = stripeSubscription.items.data[0]?.price?.product ?? null;
  const stripeProductId =
    typeof stripeProductIdRaw === "string"
      ? stripeProductIdRaw
      : stripeProductIdRaw?.id ?? null;
  const latestInvoice = stripeSubscription.latest_invoice;
  const latestInvoiceId =
    typeof latestInvoice === "string" ? latestInvoice : latestInvoice?.id ?? null;
  const latestInvoiceStatus =
    typeof latestInvoice === "string" ? null : latestInvoice?.status ?? null;
  const metadata = stripeSubscription.metadata ?? {};
  const metadataSubscriptionId =
    cleanText(metadata.subscription_id) ??
    cleanText(metadata.core_subscription_id);
  const resolvedClientId =
    input.clientId ??
    cleanText(metadata.client_id) ??
    (await findClientIdByStripeCustomerId(stripeCustomerId));
  const resolvedProductId =
    input.productId ??
    (await findProductIdByStripeIdentifiers({
      stripePriceId,
      stripeProductId,
      productCode: cleanText(metadata.product_code),
    }));

  const status = coreStatusFromStripe(stripeSubscription.status);
  const amountCents = stripeSubscription.items.data[0]?.price?.unit_amount ?? 0;
  const currency = stripeSubscription.currency?.toUpperCase() ?? "EUR";

  const existing = await query<SubscriptionRecord>(
    `SELECT *
     FROM subscriptions
     WHERE stripe_subscription_id = $1
        OR id = $2
     LIMIT 1`,
    [stripeSubscriptionId, metadataSubscriptionId ?? ""]
  );

  const existingSubscription = existing.rows[0] ?? null;
  const finalClientId =
    resolvedClientId ?? existingSubscription?.client_id ?? null;
  const finalProductId =
    resolvedProductId ?? existingSubscription?.product_id ?? null;

  if (!finalClientId || !finalProductId) {
    return null;
  }

  const stripeSubscriptionTiming = stripeSubscription as unknown as {
    current_period_start?: number | null;
    current_period_end?: number | null;
    trial_start?: number | null;
    trial_end?: number | null;
    latest_invoice?: string | Stripe.Invoice | null;
    customer: string | Stripe.Customer | Stripe.DeletedCustomer;
    items: {
      data: Array<{
        price: {
          id: string;
          recurring?: { interval?: "month" | "year" } | null;
          unit_amount?: number | null;
          product?: string | Stripe.Product | null;
        };
      }>;
    };
  };

  let subscription: SubscriptionRecord;
  if (existing.rows[0]) {
    const updated = await upsertSubscriptionRow({
      subscriptionId: existing.rows[0].id,
      clientId: finalClientId,
      productId: finalProductId,
      status,
      subscriptionName: cleanText(metadata.subscription_name),
      billingInterval:
        stripeSubscriptionTiming.items.data[0]?.price?.recurring?.interval === "year"
          ? "year"
          : "month",
      amountCents,
      currency,
      trialStartAt: normalizeStripeTimestamp(stripeSubscriptionTiming.trial_start),
      trialEndAt: normalizeStripeTimestamp(stripeSubscriptionTiming.trial_end),
      currentPeriodStartAt: normalizeStripeTimestamp(
        stripeSubscriptionTiming.current_period_start
      ),
      currentPeriodEndAt: normalizeStripeTimestamp(
        stripeSubscriptionTiming.current_period_end
      ),
      cancelAtPeriodEnd: Boolean(stripeSubscription.cancel_at_period_end),
      manualOverrideStatus: existing.rows[0].manual_override_status,
      notes: existing.rows[0].notes,
      stripeCustomerId,
      stripeSubscriptionId,
      stripePriceId,
      stripeProductId,
      stripeLatestInvoiceId: latestInvoiceId,
      stripeLatestInvoiceStatus: latestInvoiceStatus,
      stripeStatusRaw: stripeSubscription.status,
    });
    subscription = updated;
  } else {
    const created = await query<SubscriptionRecord>(
      `INSERT INTO subscriptions (
        client_id,
        product_id,
        subscription_name,
        status,
        billing_interval,
        amount_cents,
        currency,
        trial_start_at,
        trial_end_at,
        current_period_start_at,
        current_period_end_at,
        cancel_at_period_end,
        stripe_customer_id,
        stripe_subscription_id,
        stripe_price_id,
        stripe_product_id,
        stripe_latest_invoice_id,
        stripe_latest_invoice_status,
        stripe_status_raw
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19)
      RETURNING *`,
      [
        finalClientId,
        finalProductId,
        cleanText(metadata.subscription_name),
        status,
        stripeSubscriptionTiming.items.data[0]?.price?.recurring?.interval === "year"
          ? "year"
          : "month",
        amountCents,
        currency,
        normalizeStripeTimestamp(stripeSubscriptionTiming.trial_start),
        normalizeStripeTimestamp(stripeSubscriptionTiming.trial_end),
        normalizeStripeTimestamp(stripeSubscriptionTiming.current_period_start),
        normalizeStripeTimestamp(stripeSubscriptionTiming.current_period_end),
        Boolean(stripeSubscription.cancel_at_period_end),
        stripeCustomerId,
        stripeSubscriptionId,
        stripePriceId,
        stripeProductId,
        latestInvoiceId,
        latestInvoiceStatus,
        stripeSubscription.status,
      ]
    );
    subscription = created.rows[0];
  }

  await upsertStripeCustomer({
    clientId: finalClientId,
    stripeCustomerId,
    email: (() => {
      const customer = stripeSubscriptionTiming.customer;
      if (typeof customer === "string" || "deleted" in customer) {
        return null;
      }
      return customer.email ?? null;
    })(),
    name: (() => {
      const customer = stripeSubscriptionTiming.customer;
      if (typeof customer === "string" || "deleted" in customer) {
        return null;
      }
      return customer.name ?? null;
    })(),
    metadata,
  });

  await upsertStripeSubscription({
    subscriptionId: subscription.id,
    stripeSubscriptionId,
    stripeCustomerId,
    stripePriceId,
    stripeProductId,
    latestInvoiceId,
    latestInvoiceStatus,
    status,
    rawStatus: stripeSubscription.status,
    currentPeriodStartAt: normalizeStripeTimestamp(
      stripeSubscriptionTiming.current_period_start
    ),
    currentPeriodEndAt: normalizeStripeTimestamp(
      stripeSubscriptionTiming.current_period_end
    ),
    trialStartAt: normalizeStripeTimestamp(stripeSubscriptionTiming.trial_start),
    trialEndAt: normalizeStripeTimestamp(stripeSubscriptionTiming.trial_end),
    cancelAtPeriodEnd: Boolean(stripeSubscription.cancel_at_period_end),
    amountCents,
    currency,
    metadata,
  });

  const entitlementStatus = entitlementStatusFromSubscription(status);
  if (entitlementStatus) {
    await setEntitlement({
      clientId: finalClientId,
      productId: finalProductId,
      subscriptionId: subscription.id,
      entitlementStatus,
      accessSource: "subscription",
      notes: input.sourceEventType ? `Stripe sync: ${input.sourceEventType}` : undefined,
      actorAdminId: input.actorAdminId ?? null,
    });
  }

  const billingEmail = cleanText(
    (await query<{ billing_email: string | null }>(
      `SELECT billing_email FROM clients WHERE id = $1 LIMIT 1`,
      [finalClientId]
    )).rows[0]?.billing_email
  );

  const lifecycleTemplateKey =
    status === "trialing"
      ? "trial_started"
      : status === "active"
        ? "subscription_started"
        : status === "canceled"
          ? "subscription_canceled"
          : null;

  if (billingEmail && lifecycleTemplateKey) {
    await createEmailEvent({
      clientId: finalClientId,
      toEmail: billingEmail,
      templateKey: lifecycleTemplateKey,
      emailStatus: "queued",
      subject:
        lifecycleTemplateKey === "trial_started"
          ? "Your trial has started"
          : lifecycleTemplateKey === "subscription_started"
            ? "Your subscription is active"
            : "Your subscription has been canceled",
      metadata: {
        stripeSubscriptionId,
        stripeCustomerId,
        stripePriceId,
        stripeProductId,
        sourceEventType: input.sourceEventType ?? null,
        supportEmail: env.supportEmail,
      },
    });
  }

  await writeAuditLog({
    actorAdminId: input.actorAdminId ?? null,
    action: input.sourceEventType
      ? `stripe.subscription.${input.sourceEventType}`
      : "stripe.subscription.sync",
    entityType: "subscription",
    entityId: subscription.id,
    afterData: subscription as unknown as Record<string, unknown>,
    metadata: {
      stripeSubscriptionId,
      stripeCustomerId,
      stripePriceId,
      stripeProductId,
      sourceEventType: input.sourceEventType ?? null,
    },
  });

  await refreshClientBillingSnapshotForClientId(subscription.client_id);

  return subscription;
}

export async function syncInvoicePaymentFromStripeObject(input: {
  invoice: Stripe.Invoice;
  actorAdminId?: string | null;
  sourceEventType?: string;
}) {
  const invoice = input.invoice;
  const invoiceData = invoice as unknown as {
    payment_intent?: string | Stripe.PaymentIntent | null;
    subscription?: string | Stripe.Subscription | null;
    due_date?: number | null;
    status_transitions?: { paid_at?: number | null } | null;
    metadata?: Record<string, string | undefined>;
  };
  const stripeInvoiceId = invoice.id;
  const stripePaymentIntentId =
    typeof invoiceData.payment_intent === "string"
      ? invoiceData.payment_intent
      : invoiceData.payment_intent?.id ?? null;
  const stripeCustomerId =
    typeof invoice.customer === "string"
      ? invoice.customer
      : invoice.customer?.id ?? null;
  const stripeSubscriptionId =
    typeof invoiceData.subscription === "string"
      ? invoiceData.subscription
      : invoiceData.subscription?.id ?? null;
  const subscription = stripeSubscriptionId
    ? await getSubscriptionByStripeSubscriptionId(stripeSubscriptionId)
    : null;

  const clientId =
    subscription?.client_id ??
    (stripeCustomerId ? await findClientIdByStripeCustomerId(stripeCustomerId) : null) ??
    cleanText(invoiceData.metadata?.client_id);

  if (!clientId) {
    return null;
  }

  const paymentStatus = normalizeStripePaymentStatus(invoice.status);
  const paymentResult = await query<PaymentRecord>(
    `INSERT INTO payment_records (
      client_id,
      subscription_id,
      product_id,
      payment_status,
      payment_kind,
      amount_cents,
      currency,
      description,
      stripe_payment_intent_id,
      stripe_invoice_id,
      stripe_checkout_session_id,
      due_at,
      paid_at,
      metadata
    ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)
    ON CONFLICT (stripe_invoice_id) DO UPDATE SET
      client_id = EXCLUDED.client_id,
      subscription_id = EXCLUDED.subscription_id,
      product_id = EXCLUDED.product_id,
      payment_status = EXCLUDED.payment_status,
      payment_kind = EXCLUDED.payment_kind,
      amount_cents = EXCLUDED.amount_cents,
      currency = EXCLUDED.currency,
      description = EXCLUDED.description,
      stripe_payment_intent_id = EXCLUDED.stripe_payment_intent_id,
      stripe_checkout_session_id = EXCLUDED.stripe_checkout_session_id,
      due_at = EXCLUDED.due_at,
      paid_at = EXCLUDED.paid_at,
      metadata = EXCLUDED.metadata,
      updated_at = NOW()
    RETURNING *`,
    [
      clientId,
      subscription?.id ?? null,
      subscription?.product_id ?? null,
      paymentStatus,
      "invoice",
      invoice.amount_paid || invoice.amount_due || 0,
      invoice.currency?.toUpperCase() ?? "EUR",
      invoice.number ? `Stripe invoice ${invoice.number}` : "Stripe invoice",
      stripePaymentIntentId,
      stripeInvoiceId,
      cleanText(invoiceData.metadata?.checkout_session_id),
      normalizeStripeTimestamp(invoiceData.due_date ?? null),
      normalizeStripeTimestamp(invoiceData.status_transitions?.paid_at ?? null),
      {
        invoiceStatus: invoice.status,
        invoiceNumber: invoice.number ?? null,
        customerId: stripeCustomerId,
        subscriptionId: stripeSubscriptionId,
        sourceEventType: input.sourceEventType ?? null,
      },
    ]
  );

  await query(
    `UPDATE subscriptions
     SET stripe_latest_invoice_id = $1,
         stripe_latest_invoice_status = $2,
         updated_at = NOW()
     WHERE stripe_subscription_id = $3`,
    [stripeInvoiceId, invoice.status ?? null, stripeSubscriptionId]
  );

  const billingEmail = cleanText(
    (await query<{ billing_email: string | null }>(
      `SELECT billing_email FROM clients WHERE id = $1 LIMIT 1`,
      [clientId]
    )).rows[0]?.billing_email
  );

  if (billingEmail) {
    await createEmailEvent({
      clientId,
      toEmail: billingEmail,
      templateKey: paymentStatus === "paid" ? "invoice_paid" : "payment_failed",
      emailStatus: "queued",
      subject:
        paymentStatus === "paid"
          ? "Your payment has been received"
          : "Payment issue detected",
      metadata: {
        invoiceId: stripeInvoiceId,
        paymentRecordId: paymentResult.rows[0]?.id ?? null,
        supportEmail: env.supportEmail,
        sourceEventType: input.sourceEventType ?? null,
      },
    });
  }

  await writeAuditLog({
    actorAdminId: input.actorAdminId ?? null,
    action:
      input.sourceEventType === "invoice.payment_failed"
        ? "stripe.invoice.payment_failed"
        : "stripe.invoice.paid",
    entityType: "payment_record",
    entityId: paymentResult.rows[0]?.id ?? stripeInvoiceId,
    afterData: paymentResult.rows[0] as unknown as Record<string, unknown>,
    metadata: {
      stripeInvoiceId,
      stripePaymentIntentId,
      stripeCustomerId,
      stripeSubscriptionId,
      sourceEventType: input.sourceEventType ?? null,
    },
  });

  await refreshClientBillingSnapshotForClientId(clientId);

  return paymentResult.rows[0] ?? null;
}
