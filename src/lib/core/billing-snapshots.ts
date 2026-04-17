import "server-only";

import { query } from "@/lib/core/db";
import type {
  BillingStatus,
  ClientBillingIntegrationRecord,
  ClientRecord,
  ClientSubscriptionSnapshotRecord,
  EntitlementRecord,
  ProductKind,
  ServiceStatus,
  SubscriptionStatus,
} from "@/lib/core/models";

export type BillingSnapshotClient = {
  id: string;
  name: string;
  slug: string;
  billingProjectKey: string;
  billingStatus: BillingStatus;
  serviceStatus: ServiceStatus;
  billingEmail: string | null;
  supportEmail: string | null;
  websiteUrl: string | null;
};

export type BillingSnapshotSubscription = {
  projectKey: string;
  clientId: string;
  clientName: string;
  clientSlug: string;
  billingProjectKey: string;
  productId: string;
  productCode: string;
  productName: string;
  productSlug: string;
  productKind: ProductKind;
  productSortOrder: number;
  productIsActive: boolean;
  subscriptionId: string | null;
  subscriptionName: string | null;
  subscriptionStatus: SubscriptionStatus;
  billingInterval: "month" | "year";
  amountCents: number;
  currency: string;
  trialStartAt: string | null;
  trialEndAt: string | null;
  currentPeriodStartAt: string | null;
  currentPeriodEndAt: string | null;
  cancelAtPeriodEnd: boolean;
  manualOverrideStatus: string | null;
  clientBillingStatus: BillingStatus;
  clientServiceStatus: ServiceStatus;
  clientBillingEmail: string | null;
  clientSupportEmail: string | null;
  clientWebsiteUrl: string | null;
  entitlementStatus: EntitlementRecord["entitlement_status"] | null;
  accessSource: EntitlementRecord["access_source"] | null;
  stripeCustomerId: string | null;
  stripeSubscriptionId: string | null;
  stripePriceId: string | null;
  stripeProductId: string | null;
  stripeLatestInvoiceId: string | null;
  stripeLatestInvoiceStatus: string | null;
  latestPaymentStatus: string | null;
  latestPaymentAmountCents: number | null;
  latestPaymentCurrency: string | null;
  latestPaymentPaidAt: string | null;
  latestPaymentDescription: string | null;
  snapshotVersion: number;
  syncedAt: string;
};

export type BillingSnapshot = {
  projectKey: string;
  client: BillingSnapshotClient;
  subscriptions: BillingSnapshotSubscription[];
  lastSyncedAt: string | null;
};

function toBoolean(value: unknown) {
  return Boolean(value);
}

function toNumber(value: unknown) {
  return typeof value === "number" ? value : Number(value ?? 0);
}

function buildSnapshotPayload(input: BillingSnapshotSubscription) {
  return {
    projectKey: input.projectKey,
    client: {
      id: input.clientId,
      name: input.clientName,
      slug: input.clientSlug,
      billingProjectKey: input.billingProjectKey,
      billingStatus: input.clientBillingStatus,
      serviceStatus: input.clientServiceStatus,
      billingEmail: input.clientBillingEmail,
      supportEmail: input.clientSupportEmail,
      websiteUrl: input.clientWebsiteUrl,
    },
    product: {
      id: input.productId,
      code: input.productCode,
      name: input.productName,
      slug: input.productSlug,
      kind: input.productKind,
      sortOrder: input.productSortOrder,
      isActive: input.productIsActive,
    },
    subscription: {
      id: input.subscriptionId,
      name: input.subscriptionName,
      status: input.subscriptionStatus,
      billingInterval: input.billingInterval,
      amountCents: input.amountCents,
      currency: input.currency,
      trialStartAt: input.trialStartAt,
      trialEndAt: input.trialEndAt,
      currentPeriodStartAt: input.currentPeriodStartAt,
      currentPeriodEndAt: input.currentPeriodEndAt,
      cancelAtPeriodEnd: input.cancelAtPeriodEnd,
      manualOverrideStatus: input.manualOverrideStatus,
      stripeCustomerId: input.stripeCustomerId,
      stripeSubscriptionId: input.stripeSubscriptionId,
      stripePriceId: input.stripePriceId,
      stripeProductId: input.stripeProductId,
      stripeLatestInvoiceId: input.stripeLatestInvoiceId,
      stripeLatestInvoiceStatus: input.stripeLatestInvoiceStatus,
    },
    entitlement: {
      status: input.entitlementStatus,
      accessSource: input.accessSource,
    },
    latestPayment: {
      status: input.latestPaymentStatus,
      amountCents: input.latestPaymentAmountCents,
      currency: input.latestPaymentCurrency,
      paidAt: input.latestPaymentPaidAt,
      description: input.latestPaymentDescription,
    },
    snapshotVersion: input.snapshotVersion,
    syncedAt: input.syncedAt,
  };
}

async function getClientByBillingProjectKey(projectKey: string) {
  const normalizedProjectKey = projectKey.trim().toLowerCase();
  const result = await query<ClientRecord>(
    `SELECT *
     FROM clients
     WHERE billing_project_key = $1
     LIMIT 1`,
    [normalizedProjectKey]
  );

  return result.rows[0] ?? null;
}

async function getIntegrationByClientId(clientId: string) {
  const result = await query<ClientBillingIntegrationRecord>(
    `SELECT *
     FROM client_billing_integrations
     WHERE client_id = $1
     LIMIT 1`,
    [clientId]
  );

  return result.rows[0] ?? null;
}

async function buildSnapshotRowsForClient(client: ClientRecord) {
  const result = await query<{
    client_id: string;
    client_name: string;
    client_slug: string;
    billing_project_key: string;
    client_billing_status: BillingStatus;
    client_service_status: ServiceStatus;
    client_billing_email: string | null;
    client_support_email: string | null;
    client_website_url: string | null;
    product_id: string;
    product_code: string;
    product_name: string;
    product_slug: string;
    product_kind: ProductKind;
    product_sort_order: string;
    product_is_active: boolean;
    subscription_id: string | null;
    subscription_name: string | null;
    subscription_status: SubscriptionStatus;
    billing_interval: "month" | "year";
    amount_cents: number;
    currency: string;
    trial_start_at: string | null;
    trial_end_at: string | null;
    current_period_start_at: string | null;
    current_period_end_at: string | null;
    cancel_at_period_end: boolean;
    manual_override_status: string | null;
    entitlement_status: EntitlementRecord["entitlement_status"] | null;
    access_source: EntitlementRecord["access_source"] | null;
    stripe_customer_id: string | null;
    stripe_subscription_id: string | null;
    stripe_price_id: string | null;
    stripe_product_id: string | null;
    stripe_latest_invoice_id: string | null;
    stripe_latest_invoice_status: string | null;
    latest_payment_status: string | null;
    latest_payment_amount_cents: number | null;
    latest_payment_currency: string | null;
    latest_payment_paid_at: string | null;
    latest_payment_description: string | null;
    synced_at: string;
  }>(
    `WITH latest_subscriptions AS (
       SELECT DISTINCT ON (s.client_id, s.product_id)
         s.id AS subscription_id,
         s.client_id,
         s.product_id,
         s.subscription_name,
         s.status AS subscription_status,
         s.billing_interval,
         s.amount_cents,
         s.currency,
         s.trial_start_at,
         s.trial_end_at,
         s.current_period_start_at,
         s.current_period_end_at,
         s.cancel_at_period_end,
         s.manual_override_status,
         s.stripe_customer_id,
         s.stripe_subscription_id,
         s.stripe_price_id,
         s.stripe_product_id,
         s.stripe_latest_invoice_id,
         s.stripe_latest_invoice_status,
         c.name AS client_name,
         c.slug AS client_slug,
         c.billing_project_key,
         c.billing_status AS client_billing_status,
         c.service_status AS client_service_status,
         c.billing_email AS client_billing_email,
         c.support_email AS client_support_email,
         c.website_url AS client_website_url,
         p.code AS product_code,
         p.name AS product_name,
         p.slug AS product_slug,
         p.product_kind,
         p.sort_order AS product_sort_order,
         p.is_active AS product_is_active,
         e.entitlement_status,
         e.access_source,
         lp.payment_status AS latest_payment_status,
         lp.amount_cents AS latest_payment_amount_cents,
         lp.currency AS latest_payment_currency,
         lp.paid_at AS latest_payment_paid_at,
         lp.description AS latest_payment_description
       FROM subscriptions s
       INNER JOIN clients c ON c.id = s.client_id
       INNER JOIN products p ON p.id = s.product_id
       LEFT JOIN entitlements e
         ON e.client_id = s.client_id
        AND e.product_id = s.product_id
       LEFT JOIN LATERAL (
         SELECT
           pr.payment_status,
           pr.amount_cents,
           pr.currency,
           pr.paid_at,
           pr.description
         FROM payment_records pr
         WHERE pr.subscription_id = s.id
         ORDER BY COALESCE(pr.paid_at, pr.created_at) DESC
         LIMIT 1
       ) lp ON TRUE
       WHERE s.client_id = $1
       ORDER BY s.client_id, s.product_id, s.updated_at DESC, s.created_at DESC
     )
     SELECT *
     FROM latest_subscriptions
     ORDER BY product_sort_order ASC, product_name ASC`,
    [client.id]
  );

  return result.rows.map((row) => ({
    projectKey: client.billing_project_key,
    clientId: row.client_id,
    clientName: row.client_name,
    clientSlug: row.client_slug,
    billingProjectKey: row.billing_project_key,
    productId: row.product_id,
    productCode: row.product_code,
    productName: row.product_name,
    productSlug: row.product_slug,
    productKind: row.product_kind,
    productSortOrder: toNumber(row.product_sort_order),
    productIsActive: toBoolean(row.product_is_active),
    subscriptionId: row.subscription_id,
    subscriptionName: row.subscription_name,
    subscriptionStatus: row.subscription_status,
    billingInterval: row.billing_interval,
    amountCents: row.amount_cents,
    currency: row.currency,
    trialStartAt: row.trial_start_at,
    trialEndAt: row.trial_end_at,
    currentPeriodStartAt: row.current_period_start_at,
    currentPeriodEndAt: row.current_period_end_at,
    cancelAtPeriodEnd: row.cancel_at_period_end,
    manualOverrideStatus: row.manual_override_status,
    clientBillingStatus: row.client_billing_status,
    clientServiceStatus: row.client_service_status,
    clientBillingEmail: row.client_billing_email,
    clientSupportEmail: row.client_support_email,
    clientWebsiteUrl: row.client_website_url,
    entitlementStatus: row.entitlement_status,
    accessSource: row.access_source,
    stripeCustomerId: row.stripe_customer_id,
    stripeSubscriptionId: row.stripe_subscription_id,
    stripePriceId: row.stripe_price_id,
    stripeProductId: row.stripe_product_id,
    stripeLatestInvoiceId: row.stripe_latest_invoice_id,
    stripeLatestInvoiceStatus: row.stripe_latest_invoice_status,
    latestPaymentStatus: row.latest_payment_status,
    latestPaymentAmountCents: row.latest_payment_amount_cents,
    latestPaymentCurrency: row.latest_payment_currency,
    latestPaymentPaidAt: row.latest_payment_paid_at,
    latestPaymentDescription: row.latest_payment_description,
    snapshotVersion: 1,
    syncedAt: row.synced_at,
  }));
}

export async function ensureClientBillingIntegrationForClientId(clientId: string) {
  const client = await query<ClientRecord>(
    `SELECT * FROM clients WHERE id = $1 LIMIT 1`,
    [clientId]
  );
  const row = client.rows[0];
  if (!row) {
    throw new Error("Client not found.");
  }

  const result = await query<ClientBillingIntegrationRecord>(
    `INSERT INTO client_billing_integrations (
      client_id,
      project_key,
      status,
      last_synced_at
    ) VALUES ($1, $2, 'active', NOW())
    ON CONFLICT (client_id) DO UPDATE SET
      project_key = EXCLUDED.project_key,
      status = 'active',
      updated_at = NOW()
    RETURNING *`,
    [row.id, row.billing_project_key]
  );

  return result.rows[0] ?? null;
}

async function upsertSnapshotRows(client: ClientRecord) {
  const rows = await buildSnapshotRowsForClient(client);

  if (!rows.length) {
    await query(
      `DELETE FROM client_subscription_snapshots
       WHERE client_id = $1`,
      [client.id]
    );

    return [];
  }

  const productIds = rows.map((row) => row.productId);
  await query(
    `DELETE FROM client_subscription_snapshots
     WHERE client_id = $1
       AND NOT (product_id = ANY($2::uuid[]))`,
    [client.id, productIds]
  );

  for (const row of rows) {
    const payload = buildSnapshotPayload({
      ...row,
      snapshotVersion: 1,
      syncedAt: new Date().toISOString(),
    });

    await query(
      `INSERT INTO client_subscription_snapshots (
        client_id,
        product_id,
        subscription_id,
        project_key,
        product_sort_order,
        client_name,
        client_slug,
        billing_project_key,
        client_billing_status,
        client_service_status,
        client_billing_email,
        client_support_email,
        client_website_url,
        product_code,
        product_name,
        product_slug,
        product_kind,
        product_is_active,
        subscription_name,
        subscription_status,
        billing_interval,
        amount_cents,
        currency,
        trial_start_at,
        trial_end_at,
        current_period_start_at,
        current_period_end_at,
        cancel_at_period_end,
        manual_override_status,
        entitlement_status,
        access_source,
        stripe_customer_id,
        stripe_subscription_id,
        stripe_price_id,
        stripe_product_id,
        stripe_latest_invoice_id,
        stripe_latest_invoice_status,
        latest_payment_status,
        latest_payment_amount_cents,
        latest_payment_currency,
        latest_payment_paid_at,
        latest_payment_description,
        snapshot_version,
        snapshot_payload,
        synced_at
      ) VALUES (
        $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,
        $21,$22,$23,$24,$25,$26,$27,$28,$29,$30,$31,$32,$33,$34,$35,$36,$37,$38,
        $39,$40,$41,$42,$43,$44
      )
      ON CONFLICT (client_id, product_id) DO UPDATE SET
        subscription_id = EXCLUDED.subscription_id,
        project_key = EXCLUDED.project_key,
        product_sort_order = EXCLUDED.product_sort_order,
        client_name = EXCLUDED.client_name,
        client_slug = EXCLUDED.client_slug,
        billing_project_key = EXCLUDED.billing_project_key,
        client_billing_status = EXCLUDED.client_billing_status,
        client_service_status = EXCLUDED.client_service_status,
        client_billing_email = EXCLUDED.client_billing_email,
        client_support_email = EXCLUDED.client_support_email,
        client_website_url = EXCLUDED.client_website_url,
        product_code = EXCLUDED.product_code,
        product_name = EXCLUDED.product_name,
        product_slug = EXCLUDED.product_slug,
        product_kind = EXCLUDED.product_kind,
        product_is_active = EXCLUDED.product_is_active,
        subscription_name = EXCLUDED.subscription_name,
        subscription_status = EXCLUDED.subscription_status,
        billing_interval = EXCLUDED.billing_interval,
        amount_cents = EXCLUDED.amount_cents,
        currency = EXCLUDED.currency,
        trial_start_at = EXCLUDED.trial_start_at,
        trial_end_at = EXCLUDED.trial_end_at,
        current_period_start_at = EXCLUDED.current_period_start_at,
        current_period_end_at = EXCLUDED.current_period_end_at,
        cancel_at_period_end = EXCLUDED.cancel_at_period_end,
        manual_override_status = EXCLUDED.manual_override_status,
        entitlement_status = EXCLUDED.entitlement_status,
        access_source = EXCLUDED.access_source,
        stripe_customer_id = EXCLUDED.stripe_customer_id,
        stripe_subscription_id = EXCLUDED.stripe_subscription_id,
        stripe_price_id = EXCLUDED.stripe_price_id,
        stripe_product_id = EXCLUDED.stripe_product_id,
        stripe_latest_invoice_id = EXCLUDED.stripe_latest_invoice_id,
        stripe_latest_invoice_status = EXCLUDED.stripe_latest_invoice_status,
        latest_payment_status = EXCLUDED.latest_payment_status,
        latest_payment_amount_cents = EXCLUDED.latest_payment_amount_cents,
        latest_payment_currency = EXCLUDED.latest_payment_currency,
        latest_payment_paid_at = EXCLUDED.latest_payment_paid_at,
        latest_payment_description = EXCLUDED.latest_payment_description,
        snapshot_version = client_subscription_snapshots.snapshot_version + 1,
        snapshot_payload = EXCLUDED.snapshot_payload,
        synced_at = EXCLUDED.synced_at,
        updated_at = NOW()`,
      [
        client.id,
        row.productId,
        row.subscriptionId,
        client.billing_project_key,
        row.productSortOrder,
        row.clientName,
        row.clientSlug,
        row.billingProjectKey,
        row.clientBillingStatus,
        row.clientServiceStatus,
        row.clientBillingEmail,
        row.clientSupportEmail,
        row.clientWebsiteUrl,
        row.productCode,
        row.productName,
        row.productSlug,
        row.productKind,
        row.productIsActive,
        row.subscriptionName,
        row.subscriptionStatus,
        row.billingInterval,
        row.amountCents,
        row.currency,
        row.trialStartAt,
        row.trialEndAt,
        row.currentPeriodStartAt,
        row.currentPeriodEndAt,
        row.cancelAtPeriodEnd,
        row.manualOverrideStatus,
        row.entitlementStatus,
        row.accessSource,
        row.stripeCustomerId,
        row.stripeSubscriptionId,
        row.stripePriceId,
        row.stripeProductId,
        row.stripeLatestInvoiceId,
        row.stripeLatestInvoiceStatus,
        row.latestPaymentStatus,
        row.latestPaymentAmountCents,
        row.latestPaymentCurrency,
        row.latestPaymentPaidAt,
        row.latestPaymentDescription,
        payload,
        row.syncedAt,
      ]
    );
  }

  await query(
    `INSERT INTO client_billing_integrations (
      client_id,
      project_key,
      status,
      last_synced_at
    ) VALUES ($1, $2, 'active', NOW())
    ON CONFLICT (client_id) DO UPDATE SET
      project_key = EXCLUDED.project_key,
      status = 'active',
      last_synced_at = NOW(),
      updated_at = NOW()`,
    [client.id, client.billing_project_key]
  );

  return rows;
}

export async function refreshClientBillingSnapshotForClientId(clientId: string) {
  const client = await query<ClientRecord>(
    `SELECT *
     FROM clients
     WHERE id = $1
     LIMIT 1`,
    [clientId]
  );
  const row = client.rows[0];
  if (!row) {
    throw new Error("Client not found.");
  }

  await ensureClientBillingIntegrationForClientId(row.id);
  await upsertSnapshotRows(row);

  const snapshot = await getBillingSnapshotByProjectKey(row.billing_project_key);
  if (snapshot) {
    return snapshot;
  }

  return {
    projectKey: row.billing_project_key,
    client: {
      id: row.id,
      name: row.name,
      slug: row.slug,
      billingProjectKey: row.billing_project_key,
      billingStatus: row.billing_status,
      serviceStatus: row.service_status,
      billingEmail: row.billing_email,
      supportEmail: row.support_email,
      websiteUrl: row.website_url,
    } satisfies BillingSnapshotClient,
    subscriptions: [],
    lastSyncedAt: (await getIntegrationByClientId(row.id))?.last_synced_at ?? null,
  } satisfies BillingSnapshot;
}

export async function getBillingSnapshotByProjectKey(
  projectKey: string
): Promise<BillingSnapshot | null> {
  const client = await getClientByBillingProjectKey(projectKey);
  if (!client) {
    return null;
  }

  const integration = await getIntegrationByClientId(client.id);
  const rows = await query<ClientSubscriptionSnapshotRecord>(
    `SELECT *
     FROM client_subscription_snapshots
     WHERE project_key = $1
     ORDER BY product_sort_order ASC, product_name ASC`,
    [client.billing_project_key]
  );

  return {
    projectKey: client.billing_project_key,
    client: {
      id: client.id,
      name: client.name,
      slug: client.slug,
      billingProjectKey: client.billing_project_key,
      billingStatus: client.billing_status,
      serviceStatus: client.service_status,
      billingEmail: client.billing_email,
      supportEmail: client.support_email,
      websiteUrl: client.website_url,
    },
    subscriptions: rows.rows.map((row) => ({
      projectKey: row.project_key,
      clientId: row.client_id,
      clientName: row.client_name,
      clientSlug: row.client_slug,
      billingProjectKey: row.billing_project_key,
      productId: row.product_id,
      productCode: row.product_code,
      productName: row.product_name,
      productSlug: row.product_slug,
      productKind: row.product_kind,
      productSortOrder: row.product_sort_order,
      productIsActive: row.product_is_active,
      subscriptionId: row.subscription_id,
      subscriptionName: row.subscription_name,
      subscriptionStatus: row.subscription_status,
      billingInterval: row.billing_interval,
      amountCents: row.amount_cents,
      currency: row.currency,
      trialStartAt: row.trial_start_at,
      trialEndAt: row.trial_end_at,
      currentPeriodStartAt: row.current_period_start_at,
      currentPeriodEndAt: row.current_period_end_at,
      cancelAtPeriodEnd: row.cancel_at_period_end,
      manualOverrideStatus: row.manual_override_status,
      clientBillingStatus: row.client_billing_status,
      clientServiceStatus: row.client_service_status,
      clientBillingEmail: row.client_billing_email,
      clientSupportEmail: row.client_support_email,
      clientWebsiteUrl: row.client_website_url,
      entitlementStatus: row.entitlement_status,
      accessSource: row.access_source,
      stripeCustomerId: row.stripe_customer_id,
      stripeSubscriptionId: row.stripe_subscription_id,
      stripePriceId: row.stripe_price_id,
      stripeProductId: row.stripe_product_id,
      stripeLatestInvoiceId: row.stripe_latest_invoice_id,
      stripeLatestInvoiceStatus: row.stripe_latest_invoice_status,
      latestPaymentStatus: row.latest_payment_status,
      latestPaymentAmountCents: row.latest_payment_amount_cents,
      latestPaymentCurrency: row.latest_payment_currency,
      latestPaymentPaidAt: row.latest_payment_paid_at,
      latestPaymentDescription: row.latest_payment_description,
      snapshotVersion: row.snapshot_version,
      syncedAt: row.synced_at,
    })),
    lastSyncedAt: integration?.last_synced_at ?? rows.rows[0]?.synced_at ?? null,
  };
}
