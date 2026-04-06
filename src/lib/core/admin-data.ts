import "server-only";

import { query, withTransaction } from "@/lib/core/db";
import type {
  BillingStatus,
  ClientContactRecord,
  ClientRecord,
  EntitlementRecord,
  PaymentRecord,
  ProductConnectionRecord,
  ProductRecord,
  ServiceStatus,
} from "@/lib/core/models";

export type DashboardSummary = {
  totalClients: number;
  activeClients: number;
  suspendedClients: number;
  productsCount: number;
  activeEntitlementsCount: number;
  subscriptionsCount: number;
  paymentRecordsCount: number;
  recentAuditEvents: AuditLogListItem[];
  attentionItems: string[];
};

export type AuditLogListItem = {
  id: string;
  action: string;
  entityType: string;
  entityId: string;
  createdAt: string;
  actorName: string | null;
  actorEmail: string | null;
  metadata: Record<string, unknown>;
};

export type ClientListItem = ClientRecord & {
  contactCount: number;
  entitlementCount: number;
  subscriptionCount: number;
  paymentCount: number;
};

export type ProductListItem = ProductRecord & {
  entitlementCount: number;
  activeClientCount: number;
  productConnection: ProductConnectionRecord | null;
};

export type ProductConnectionListItem = ProductConnectionRecord & {
  productName: string;
  productSlug: string;
  productKind: string;
  productIsActive: boolean;
};

export type PaymentListItem = PaymentRecord & {
  clientName: string;
  productName: string | null;
};

export type ClientDetail = ClientRecord & {
  contacts: ClientContactRecord[];
  entitlements: ClientEntitlementView[];
  subscriptions: ClientSubscriptionView[];
  payments: PaymentRecord[];
};

export type ClientEntitlementView = EntitlementRecord & {
  productName: string;
  productSlug: string;
  productIsActive: boolean;
};

export type ClientSubscriptionView = {
  id: string;
  productName: string;
  status: string;
  billingInterval: string;
  amountCents: number;
  currency: string;
  currentPeriodEndAt: string | null;
  trialEndAt: string | null;
};

export type ProductDetail = ProductRecord & {
  entitlements: Array<
    ClientEntitlementView & {
      clientName: string;
      clientSlug: string;
      clientServiceStatus: string;
    }
  >;
};

export type ClientProductAccessView = {
  productId: string;
  productName: string;
  productSlug: string;
  productKind: string;
  productIsActive: boolean;
  appUrl: string | null;
  apiUrl: string | null;
  environmentLabel: string | null;
  managedExternally: boolean;
  connectionServiceStatus: ProductConnectionRecord["service_status"] | null;
  accessStatus: "active" | "trial" | "suspended" | "revoked" | "inactive" | "none";
  accessScope: "core-managed" | "external";
  entitlementStatus: EntitlementRecord["entitlement_status"] | null;
  accessSource: EntitlementRecord["access_source"] | null;
  subscriptionStatus: string | null;
  readiness: "ready" | "partial" | "not-configured";
  internalNotes: string | null;
  internalLinks: string | null;
};

export type EntitlementListItem = EntitlementRecord & {
  clientName: string;
  clientSlug: string;
  productName: string;
  productSlug: string;
  productIsActive: boolean;
};

function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function toNumber(value: unknown) {
  return typeof value === "number" ? value : Number(value ?? 0);
}

function toBoolean(value: unknown) {
  return Boolean(value);
}

function toJsonRecord(value: unknown) {
  return (value && typeof value === "object" ? value : {}) as unknown as Record<string, unknown>;
}

export async function writeAuditLog(input: {
  actorAdminId?: string | null;
  action: string;
  entityType: string;
  entityId: string;
  beforeData?: Record<string, unknown> | null;
  afterData?: Record<string, unknown> | null;
  metadata?: Record<string, unknown>;
}) {
  await query(
    `INSERT INTO audit_logs (
      actor_admin_id,
      action,
      entity_type,
      entity_id,
      before_data,
      after_data,
      metadata
    ) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
    [
      input.actorAdminId ?? null,
      input.action,
      input.entityType,
      input.entityId,
      input.beforeData ?? null,
      input.afterData ?? null,
      input.metadata ?? {},
    ]
  );
}

export async function getDashboardSummary(): Promise<DashboardSummary> {
  const [counts, auditLogs, attention] = await Promise.all([
    query<{
      total_clients: string;
      active_clients: string;
      suspended_clients: string;
      products_count: string;
      active_entitlements_count: string;
      subscriptions_count: string;
      payment_records_count: string;
    }>(`
      SELECT
        COUNT(*) AS total_clients,
        COUNT(*) FILTER (WHERE service_status = 'active') AS active_clients,
        COUNT(*) FILTER (WHERE service_status = 'suspended') AS suspended_clients,
        (SELECT COUNT(*) FROM products WHERE is_active = TRUE) AS products_count,
        (SELECT COUNT(*) FROM entitlements WHERE entitlement_status = 'active') AS active_entitlements_count,
        (SELECT COUNT(*) FROM subscriptions) AS subscriptions_count,
        (SELECT COUNT(*) FROM payment_records) AS payment_records_count
      FROM clients
    `),
    query<{
      id: string;
      action: string;
      entity_type: string;
      entity_id: string;
      created_at: string;
      actor_name: string | null;
      actor_email: string | null;
      metadata: Record<string, unknown>;
    }>(`
      SELECT
        a.id,
        a.action,
        a.entity_type,
        a.entity_id,
        a.created_at,
        ad.name AS actor_name,
        ad.email AS actor_email,
        a.metadata
      FROM audit_logs a
      LEFT JOIN admins ad ON ad.id = a.actor_admin_id
      ORDER BY a.created_at DESC
      LIMIT 6
    `),
    query<{ item: string }>(`
      SELECT item FROM (
        SELECT CASE
          WHEN service_status = 'suspended' THEN name || ' is suspended'
          WHEN billing_status = 'overdue' THEN name || ' is overdue'
          ELSE NULL
        END AS item
        FROM clients
      ) attention
      WHERE item IS NOT NULL
      LIMIT 6
    `),
  ]);

  return {
    totalClients: toNumber(counts.rows[0]?.total_clients),
    activeClients: toNumber(counts.rows[0]?.active_clients),
    suspendedClients: toNumber(counts.rows[0]?.suspended_clients),
    productsCount: toNumber(counts.rows[0]?.products_count),
    activeEntitlementsCount: toNumber(
      counts.rows[0]?.active_entitlements_count
    ),
    subscriptionsCount: toNumber(counts.rows[0]?.subscriptions_count),
    paymentRecordsCount: toNumber(counts.rows[0]?.payment_records_count),
    recentAuditEvents: auditLogs.rows.map((row) => ({
      id: row.id,
      action: row.action,
      entityType: row.entity_type,
      entityId: row.entity_id,
      createdAt: row.created_at,
      actorName: row.actor_name,
      actorEmail: row.actor_email,
      metadata: toJsonRecord(row.metadata),
    })),
    attentionItems: attention.rows.map((row) => row.item),
  };
}

export async function listClients(): Promise<ClientListItem[]> {
  const result = await query<
    ClientRecord & {
      contact_count: string;
      entitlement_count: string;
      subscription_count: string;
      payment_count: string;
    }
  >(`
    SELECT
      c.*,
      COUNT(DISTINCT cc.id) AS contact_count,
      COUNT(DISTINCT e.id) AS entitlement_count,
      COUNT(DISTINCT s.id) AS subscription_count,
      COUNT(DISTINCT pr.id) AS payment_count
    FROM clients c
    LEFT JOIN client_contacts cc ON cc.client_id = c.id
    LEFT JOIN entitlements e ON e.client_id = c.id
    LEFT JOIN subscriptions s ON s.client_id = c.id
    LEFT JOIN payment_records pr ON pr.client_id = c.id
    GROUP BY c.id
    ORDER BY c.created_at DESC
  `);

  return result.rows.map((row) => ({
    ...row,
    contactCount: toNumber(row.contact_count),
    entitlementCount: toNumber(row.entitlement_count),
    subscriptionCount: toNumber(row.subscription_count),
    paymentCount: toNumber(row.payment_count),
  }));
}

export async function getClientById(clientId: string): Promise<ClientDetail | null> {
  const result = await query<ClientRecord>(`SELECT * FROM clients WHERE id = $1 LIMIT 1`, [
    clientId,
  ]);

  const client = result.rows[0];
  if (!client) {
    return null;
  }

  const [contacts, entitlements, subscriptions, payments] = await Promise.all([
    query<ClientContactRecord>(
      `SELECT * FROM client_contacts WHERE client_id = $1 ORDER BY is_primary DESC, created_at DESC`,
      [clientId]
    ),
    query<
      EntitlementRecord & {
        product_name: string;
        product_slug: string;
        product_is_active: boolean;
      }
    >(
      `SELECT e.*, p.name AS product_name, p.slug AS product_slug, p.is_active AS product_is_active
       FROM entitlements e
       INNER JOIN products p ON p.id = e.product_id
       WHERE e.client_id = $1
       ORDER BY p.sort_order ASC, p.name ASC`,
      [clientId]
    ),
    query<{
      id: string;
      product_name: string;
      status: string;
      billing_interval: string;
      amount_cents: number;
      currency: string;
      current_period_end_at: string | null;
      trial_end_at: string | null;
    }>(
      `SELECT s.id, p.name AS product_name, s.status, s.billing_interval, s.amount_cents, s.currency, s.current_period_end_at, s.trial_end_at
       FROM subscriptions s
       INNER JOIN products p ON p.id = s.product_id
       WHERE s.client_id = $1
       ORDER BY s.created_at DESC`,
      [clientId]
    ),
    query<PaymentRecord>(
      `SELECT * FROM payment_records WHERE client_id = $1 ORDER BY created_at DESC`,
      [clientId]
    ),
  ]);

  return {
    ...client,
    contacts: contacts.rows,
    entitlements: entitlements.rows.map((row) => ({
      ...row,
      productName: row.product_name,
      productSlug: row.product_slug,
      productIsActive: toBoolean(row.product_is_active),
    })),
    subscriptions: subscriptions.rows.map((row) => ({
      id: row.id,
      productName: row.product_name,
      status: row.status,
      billingInterval: row.billing_interval,
      amountCents: row.amount_cents,
      currency: row.currency,
      currentPeriodEndAt: row.current_period_end_at,
      trialEndAt: row.trial_end_at,
    })),
    payments: payments.rows,
  };
}

export async function listProducts(): Promise<ProductListItem[]> {
  const result = await query<
    ProductRecord & {
      entitlement_count: string;
      active_client_count: string;
      connection_id: string | null;
      connection_app_url: string | null;
      connection_api_url: string | null;
      connection_service_status: ProductConnectionRecord["service_status"] | null;
      connection_environment_label: string | null;
      connection_managed_externally: boolean | null;
      connection_internal_notes: string | null;
      connection_internal_links: string | null;
      connection_created_at: string | null;
      connection_updated_at: string | null;
    }
  >(`
    SELECT
      p.*,
      COUNT(DISTINCT e.id) AS entitlement_count,
      COUNT(DISTINCT e.client_id) FILTER (WHERE e.entitlement_status = 'active') AS active_client_count,
      pc.id AS connection_id,
      pc.app_url AS connection_app_url,
      pc.api_url AS connection_api_url,
      pc.service_status AS connection_service_status,
      pc.environment_label AS connection_environment_label,
      pc.managed_externally AS connection_managed_externally,
      pc.internal_notes AS connection_internal_notes,
      pc.internal_links AS connection_internal_links,
      pc.created_at AS connection_created_at,
      pc.updated_at AS connection_updated_at
    FROM products p
    LEFT JOIN entitlements e ON e.product_id = p.id
    LEFT JOIN product_connections pc ON pc.product_id = p.id
    GROUP BY p.id
    , pc.id
    , pc.app_url
    , pc.api_url
    , pc.service_status
    , pc.environment_label
    , pc.managed_externally
    , pc.internal_notes
    , pc.internal_links
    ORDER BY p.sort_order ASC, p.name ASC
  `);

  return result.rows.map((row) => ({
    ...row,
    entitlementCount: toNumber(row.entitlement_count),
    activeClientCount: toNumber(row.active_client_count),
    productConnection: row.connection_id
      ? {
          id: row.connection_id,
          product_id: row.id,
          app_url: row.connection_app_url,
          api_url: row.connection_api_url,
          service_status: row.connection_service_status ?? "active",
          environment_label: row.connection_environment_label ?? "production",
          managed_externally: Boolean(row.connection_managed_externally),
          internal_notes: row.connection_internal_notes,
          internal_links: row.connection_internal_links,
          created_at: row.connection_created_at ?? row.created_at,
          updated_at: row.connection_updated_at ?? row.updated_at,
        }
      : null,
  }));
}

export async function getProductById(productId: string): Promise<ProductDetail | null> {
  const result = await query<ProductRecord>(
    `SELECT * FROM products WHERE id = $1 LIMIT 1`,
    [productId]
  );
  const product = result.rows[0];
  if (!product) {
    return null;
  }

  const entitlements = await query<
    EntitlementRecord & {
      client_name: string;
      client_slug: string;
      client_service_status: string;
    }
  >(
    `SELECT e.*, c.name AS client_name, c.slug AS client_slug, c.service_status AS client_service_status
     FROM entitlements e
     INNER JOIN clients c ON c.id = e.client_id
     WHERE e.product_id = $1
     ORDER BY e.created_at DESC`,
    [productId]
  );

  return {
    ...product,
    entitlements: entitlements.rows.map((row) => ({
      ...row,
      productName: product.name,
      productSlug: product.slug,
      productIsActive: product.is_active,
      clientName: row.client_name,
      clientSlug: row.client_slug,
      clientServiceStatus: row.client_service_status,
    })),
  };
}

export async function listProductConnections(): Promise<ProductConnectionListItem[]> {
  const result = await query<
    ProductConnectionRecord & {
      product_name: string;
      product_slug: string;
      product_kind: string;
      product_is_active: boolean;
    }
  >(
    `SELECT
      pc.*,
      p.name AS product_name,
      p.slug AS product_slug,
      p.product_kind AS product_kind,
      p.is_active AS product_is_active
     FROM product_connections pc
     INNER JOIN products p ON p.id = pc.product_id
     ORDER BY p.sort_order ASC, p.name ASC`
  );

  return result.rows.map((row) => ({
    ...row,
    productName: row.product_name,
    productSlug: row.product_slug,
    productKind: row.product_kind,
    productIsActive: toBoolean(row.product_is_active),
  }));
}

export async function getProductConnectionByProductId(
  productId: string
): Promise<ProductConnectionRecord | null> {
  const result = await query<ProductConnectionRecord>(
    `SELECT * FROM product_connections WHERE product_id = $1 LIMIT 1`,
    [productId]
  );

  return result.rows[0] ?? null;
}

export async function upsertProductConnection(input: {
  productId: string;
  appUrl?: string | null;
  apiUrl?: string | null;
  serviceStatus: ProductConnectionRecord["service_status"];
  environmentLabel?: string | null;
  managedExternally?: boolean;
  internalNotes?: string | null;
  internalLinks?: string | null;
}) {
  const result = await query<ProductConnectionRecord>(
    `INSERT INTO product_connections (
      product_id,
      app_url,
      api_url,
      service_status,
      environment_label,
      managed_externally,
      internal_notes,
      internal_links
    ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
    ON CONFLICT (product_id) DO UPDATE SET
      app_url = EXCLUDED.app_url,
      api_url = EXCLUDED.api_url,
      service_status = EXCLUDED.service_status,
      environment_label = EXCLUDED.environment_label,
      managed_externally = EXCLUDED.managed_externally,
      internal_notes = EXCLUDED.internal_notes,
      internal_links = EXCLUDED.internal_links,
      updated_at = NOW()
    RETURNING *`,
    [
      input.productId,
      input.appUrl?.trim() || null,
      input.apiUrl?.trim() || null,
      input.serviceStatus,
      input.environmentLabel?.trim() || "production",
      input.managedExternally ?? true,
      input.internalNotes?.trim() || null,
      input.internalLinks?.trim() || null,
    ]
  );

  return result.rows[0] ?? null;
}

export async function getClientProductAccessMatrix(
  clientId: string
): Promise<ClientProductAccessView[]> {
  const result = await query<{
    product_id: string;
    product_name: string;
    product_slug: string;
    product_kind: string;
    product_is_active: boolean;
    app_url: string | null;
    api_url: string | null;
    environment_label: string | null;
    managed_externally: boolean | null;
    connection_service_status: ProductConnectionRecord["service_status"] | null;
    internal_notes: string | null;
    internal_links: string | null;
    entitlement_id: string | null;
    entitlement_status: EntitlementRecord["entitlement_status"] | null;
    access_source: EntitlementRecord["access_source"] | null;
    subscription_status: string | null;
    subscription_service_status: string | null;
  }>(
    `SELECT
      p.id AS product_id,
      p.name AS product_name,
      p.slug AS product_slug,
      p.product_kind AS product_kind,
      p.is_active AS product_is_active,
      pc.app_url,
      pc.api_url,
      pc.environment_label,
      pc.managed_externally,
      pc.service_status AS connection_service_status,
      pc.internal_notes,
      pc.internal_links,
      e.id AS entitlement_id,
      e.entitlement_status,
      e.access_source,
      s.status AS subscription_status,
      s.status AS subscription_service_status
     FROM products p
     LEFT JOIN product_connections pc ON pc.product_id = p.id
     LEFT JOIN entitlements e ON e.client_id = $1 AND e.product_id = p.id
     LEFT JOIN subscriptions s ON s.id = e.subscription_id
     ORDER BY p.sort_order ASC, p.name ASC`,
    [clientId]
  );

  return result.rows.map((row) => {
    const hasConnection = Boolean(row.app_url || row.api_url);
    const rawAccessStatus =
      row.entitlement_status ??
      (row.product_is_active ? "none" : "inactive");

    return {
      productId: row.product_id,
      productName: row.product_name,
      productSlug: row.product_slug,
      productKind: row.product_kind,
      productIsActive: toBoolean(row.product_is_active),
      appUrl: row.app_url,
      apiUrl: row.api_url,
      environmentLabel: row.environment_label,
      managedExternally: row.managed_externally ?? true,
      connectionServiceStatus: row.connection_service_status,
      accessStatus:
        rawAccessStatus === "paused" || rawAccessStatus === "suspended"
          ? "suspended"
          : rawAccessStatus === "revoked"
            ? "revoked"
            : rawAccessStatus === "trial"
            ? "trial"
            : rawAccessStatus === "active"
              ? "active"
              : row.product_is_active
                ? "none"
                : "inactive",
      accessScope: row.managed_externally === false ? "core-managed" : "external",
      entitlementStatus: row.entitlement_status,
      accessSource: row.access_source,
      subscriptionStatus: row.subscription_status,
      readiness: hasConnection
        ? row.managed_externally === false
          ? "ready"
          : "partial"
        : "not-configured",
      internalNotes: row.internal_notes,
      internalLinks: row.internal_links,
    };
  });
}

export async function listPayments(): Promise<PaymentListItem[]> {
  const result = await query<
    PaymentRecord & { client_name: string; product_name: string | null }
  >(
    `SELECT pr.*, c.name AS client_name, p.name AS product_name
     FROM payment_records pr
     INNER JOIN clients c ON c.id = pr.client_id
     LEFT JOIN products p ON p.id = pr.product_id
     ORDER BY pr.created_at DESC`
  );

  return result.rows.map((row) => ({
    ...row,
    clientName: row.client_name,
    productName: row.product_name,
  }));
}

export async function listEntitlements(): Promise<EntitlementListItem[]> {
  const result = await query<
    EntitlementRecord & {
      client_name: string;
      client_slug: string;
      product_name: string;
      product_slug: string;
      product_is_active: boolean;
    }
  >(
    `SELECT
      e.*,
      c.name AS client_name,
      c.slug AS client_slug,
      p.name AS product_name,
      p.slug AS product_slug,
      p.is_active AS product_is_active
     FROM entitlements e
     INNER JOIN clients c ON c.id = e.client_id
     INNER JOIN products p ON p.id = e.product_id
     ORDER BY e.created_at DESC`
  );

  return result.rows.map((row) => ({
    ...row,
    clientName: row.client_name,
    clientSlug: row.client_slug,
    productName: row.product_name,
    productSlug: row.product_slug,
    productIsActive: row.product_is_active,
  }));
}

export async function listAuditLogs(limit = 30): Promise<AuditLogListItem[]> {
  const result = await query<{
    id: string;
    action: string;
    entity_type: string;
    entity_id: string;
    created_at: string;
    actor_name: string | null;
    actor_email: string | null;
    metadata: Record<string, unknown>;
  }>(
    `SELECT
      a.id,
      a.action,
      a.entity_type,
      a.entity_id,
      a.created_at,
      ad.name AS actor_name,
      ad.email AS actor_email,
      a.metadata
     FROM audit_logs a
     LEFT JOIN admins ad ON ad.id = a.actor_admin_id
     ORDER BY a.created_at DESC
     LIMIT $1`,
    [limit]
  );

  return result.rows.map((row) => ({
    id: row.id,
    action: row.action,
    entityType: row.entity_type,
    entityId: row.entity_id,
    createdAt: row.created_at,
    actorName: row.actor_name,
    actorEmail: row.actor_email,
    metadata: toJsonRecord(row.metadata),
  }));
}

export async function createClient(input: {
  name: string;
  legalName?: string;
  companyName?: string;
  clientType: string;
  billingEmail?: string;
  websiteUrl?: string;
  supportEmail?: string;
  internalNotes?: string;
  billingStatus?: BillingStatus;
  serviceStatus?: ServiceStatus;
  serviceStatusReason?: string;
  actorAdminId?: string | null;
}) {
  const name = input.name.trim();
  const slugBase = slugify(input.companyName || input.legalName || input.name);
  let slug = slugBase || `client-${Date.now()}`;
  let suffix = 2;

  while (true) {
    const slugResult = await query<{ id: string }>(
      `SELECT id FROM clients WHERE slug = $1 LIMIT 1`,
      [slug]
    );

    if (!slugResult.rows[0]) {
      break;
    }

    slug = `${slugBase || "client"}-${suffix}`;
    suffix += 1;
  }

  const result = await query<ClientRecord>(
    `INSERT INTO clients (
      name,
      legal_name,
      company_name,
      slug,
      client_type,
      billing_status,
      service_status,
      service_status_reason,
      internal_notes,
      billing_email,
      website_url,
      support_email
    ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
    RETURNING *`,
    [
      name,
      input.legalName?.trim() || null,
      input.companyName?.trim() || null,
      slug,
      input.clientType,
      input.billingStatus ?? "none",
      input.serviceStatus ?? "active",
      input.serviceStatusReason?.trim() || null,
      input.internalNotes?.trim() || null,
      input.billingEmail?.trim() || null,
      input.websiteUrl?.trim() || null,
      input.supportEmail?.trim() || null,
    ]
  );

  const client = result.rows[0];
  if (!client) {
    throw new Error("Failed to create client.");
  }

  await writeAuditLog({
    actorAdminId: input.actorAdminId ?? null,
    action: "client.create",
    entityType: "client",
    entityId: client.id,
    afterData: client as unknown as Record<string, unknown>,
  });

  return client;
}

export async function updateClient(
  clientId: string,
  input: {
    name: string;
    legalName?: string;
    companyName?: string;
    clientType: string;
    billingEmail?: string;
    websiteUrl?: string;
    supportEmail?: string;
    internalNotes?: string;
    billingStatus?: BillingStatus;
    serviceStatus?: ServiceStatus;
    serviceStatusReason?: string;
    actorAdminId?: string | null;
  }
) {
  const before = await getClientById(clientId);
  const result = await query<ClientRecord>(
    `UPDATE clients SET
      name = $1,
      legal_name = $2,
      company_name = $3,
      client_type = $4,
      billing_email = $5,
      website_url = $6,
      support_email = $7,
      internal_notes = $8,
      billing_status = $9,
      service_status = $10,
      service_status_reason = $11,
      updated_at = NOW()
    WHERE id = $12
    RETURNING *`,
    [
      input.name.trim(),
      input.legalName?.trim() || null,
      input.companyName?.trim() || null,
      input.clientType,
      input.billingEmail?.trim() || null,
      input.websiteUrl?.trim() || null,
      input.supportEmail?.trim() || null,
      input.internalNotes?.trim() || null,
      input.billingStatus ?? "none",
      input.serviceStatus ?? "active",
      input.serviceStatusReason?.trim() || null,
      clientId,
    ]
  );

  const client = result.rows[0];
  if (!client) {
    throw new Error("Failed to update client.");
  }

  await writeAuditLog({
    actorAdminId: input.actorAdminId ?? null,
    action: "client.update",
    entityType: "client",
    entityId: client.id,
    beforeData: before as unknown as Record<string, unknown>,
    afterData: client as unknown as Record<string, unknown>,
  });

  return client;
}

export async function upsertClientContact(input: {
  clientId: string;
  contactId?: string;
  fullName: string;
  email: string;
  phone?: string;
  role?: string;
  isPrimary?: boolean;
  notes?: string;
}) {
  if (input.contactId) {
    const result = await query<ClientContactRecord>(
      `UPDATE client_contacts SET
        full_name = $1,
        email = $2,
        phone = $3,
        role = $4,
        is_primary = $5,
        notes = $6,
        updated_at = NOW()
      WHERE id = $7 AND client_id = $8
      RETURNING *`,
      [
        input.fullName.trim(),
        input.email.trim(),
        input.phone?.trim() || null,
        input.role?.trim() || null,
        Boolean(input.isPrimary),
        input.notes?.trim() || null,
        input.contactId,
        input.clientId,
      ]
    );

    return result.rows[0] ?? null;
  }

  const result = await query<ClientContactRecord>(
    `INSERT INTO client_contacts (
      client_id,
      full_name,
      email,
      phone,
      role,
      is_primary,
      notes
    ) VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *`,
    [
      input.clientId,
      input.fullName.trim(),
      input.email.trim(),
      input.phone?.trim() || null,
      input.role?.trim() || null,
      Boolean(input.isPrimary),
      input.notes?.trim() || null,
    ]
  );

  return result.rows[0] ?? null;
}

export async function setClientStatus(input: {
  clientId: string;
  serviceStatus: ServiceStatus;
  reason?: string;
  effectiveAt?: string;
  gracePeriodEndsAt?: string;
  actorAdminId?: string | null;
}) {
  const before = await getClientById(input.clientId);
  const client = await withTransaction(async (tx) => {
    const result = await tx.query<ClientRecord>(
      `UPDATE clients
       SET service_status = $1,
           service_status_reason = $2,
           updated_at = NOW()
       WHERE id = $3
       RETURNING *`,
      [input.serviceStatus, input.reason?.trim() || null, input.clientId]
    );

    const updatedClient = result.rows[0];
    if (!updatedClient) {
      throw new Error("Client not found.");
    }

    await tx.query(
      `INSERT INTO service_status_changes (
        client_id,
        changed_by_admin_id,
        previous_status,
        new_status,
        reason,
        grace_period_ends_at,
        notes,
        effective_at
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
      [
        input.clientId,
        input.actorAdminId ?? null,
        before?.service_status ?? null,
        input.serviceStatus,
        input.reason?.trim() || null,
        input.gracePeriodEndsAt || null,
        null,
        input.effectiveAt || new Date().toISOString(),
      ]
    );

    await tx.query(
      `UPDATE entitlements
       SET entitlement_status = CASE
         WHEN $1 = 'suspended' THEN 'suspended'
         WHEN $1 = 'active' THEN 'active'
         ELSE entitlement_status
       END,
       updated_at = NOW()
       WHERE client_id = $2`,
      [input.serviceStatus, input.clientId]
    );

    return updatedClient;
  });

  await writeAuditLog({
    actorAdminId: input.actorAdminId ?? null,
    action:
      input.serviceStatus === "suspended"
        ? "client.suspend"
        : "client.reactivate",
    entityType: "client",
    entityId: client.id,
    beforeData: before as unknown as Record<string, unknown>,
    afterData: client as unknown as Record<string, unknown>,
    metadata: {
      reason: input.reason ?? null,
      effectiveAt: input.effectiveAt ?? null,
      gracePeriodEndsAt: input.gracePeriodEndsAt ?? null,
    },
  });

  return client;
}

export async function setProductActive(input: {
  productId: string;
  isActive: boolean;
  actorAdminId?: string | null;
}) {
  const before = await getProductById(input.productId);
  const result = await query<ProductRecord>(
    `UPDATE products SET is_active = $1, updated_at = NOW()
     WHERE id = $2
     RETURNING *`,
    [input.isActive, input.productId]
  );

  const product = result.rows[0];
  if (!product) {
    throw new Error("Product not found.");
  }

  await writeAuditLog({
    actorAdminId: input.actorAdminId ?? null,
    action: input.isActive ? "product.enable" : "product.disable",
    entityType: "product",
    entityId: product.id,
    beforeData: before as unknown as Record<string, unknown>,
    afterData: product as unknown as Record<string, unknown>,
  });

  return product;
}

export async function setEntitlement(input: {
  clientId: string;
  productId: string;
  entitlementStatus: "active" | "trial" | "paused" | "suspended" | "revoked";
  accessSource?: "manual" | "subscription" | "payment" | "seed";
  notes?: string;
  subscriptionId?: string | null;
  actorAdminId?: string | null;
}) {
  const before = await query<EntitlementRecord>(
    `SELECT * FROM entitlements WHERE client_id = $1 AND product_id = $2 LIMIT 1`,
    [input.clientId, input.productId]
  );

  const existing = before.rows[0] ?? null;
  const result = await query<EntitlementRecord>(
    `INSERT INTO entitlements (
      client_id,
      product_id,
      subscription_id,
      entitlement_status,
      access_source,
      granted_at,
      revoked_at,
      notes,
      updated_at
    ) VALUES (
      $1,$2,$3,$4,$5,NOW(),
      CASE WHEN $4 = 'revoked' THEN NOW() ELSE NULL END,
      $6,
      NOW()
    )
    ON CONFLICT (client_id, product_id) DO UPDATE SET
      subscription_id = EXCLUDED.subscription_id,
      entitlement_status = EXCLUDED.entitlement_status,
      access_source = EXCLUDED.access_source,
      revoked_at = EXCLUDED.revoked_at,
      notes = EXCLUDED.notes,
      updated_at = NOW()
    RETURNING *`,
    [
      input.clientId,
      input.productId,
      input.subscriptionId ?? null,
      input.entitlementStatus,
      input.accessSource ?? "manual",
      input.notes?.trim() || null,
    ]
  );

  const entitlement = result.rows[0];
  if (!entitlement) {
    throw new Error("Failed to save entitlement.");
  }

  const client = await getClientById(input.clientId);
  const product = await getProductById(input.productId);

  await writeAuditLog({
    actorAdminId: input.actorAdminId ?? null,
    action:
      input.entitlementStatus === "revoked"
        ? "entitlement.revoke"
        : existing
          ? "entitlement.update"
          : "entitlement.create",
    entityType: "entitlement",
    entityId: entitlement.id,
    beforeData: existing as unknown as Record<string, unknown>,
    afterData: entitlement as unknown as Record<string, unknown>,
    metadata: {
      clientName: client?.name ?? null,
      productName: product?.name ?? null,
    },
  });

  return entitlement;
}

export async function createPaymentRecord(input: {
  clientId: string;
  productId?: string | null;
  subscriptionId?: string | null;
  paymentStatus: PaymentRecord["payment_status"];
  paymentKind: PaymentRecord["payment_kind"];
  amountCents: number;
  currency?: string;
  description?: string;
  paidAt?: string | null;
  dueAt?: string | null;
  metadata?: Record<string, unknown>;
  actorAdminId?: string | null;
}) {
  const result = await query<PaymentRecord>(
    `INSERT INTO payment_records (
      client_id,
      subscription_id,
      product_id,
      payment_status,
      payment_kind,
      amount_cents,
      currency,
      description,
      due_at,
      paid_at,
      metadata
    ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
    RETURNING *`,
    [
      input.clientId,
      input.subscriptionId ?? null,
      input.productId ?? null,
      input.paymentStatus,
      input.paymentKind,
      input.amountCents,
      input.currency ?? "EUR",
      input.description?.trim() || null,
      input.dueAt ?? null,
      input.paidAt ?? (input.paymentStatus === "paid" ? new Date().toISOString() : null),
      input.metadata ?? {},
    ]
  );

  const payment = result.rows[0];
  if (!payment) {
    throw new Error("Failed to create payment record.");
  }

  await writeAuditLog({
    actorAdminId: input.actorAdminId ?? null,
    action: "payment.create",
    entityType: "payment_record",
    entityId: payment.id,
    afterData: payment as unknown as Record<string, unknown>,
  });

  return payment;
}
