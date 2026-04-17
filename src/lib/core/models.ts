export const ADMIN_ROLES = ["owner", "admin"] as const;
export const CLIENT_TYPES = ["saas", "project", "mixed"] as const;
export const BILLING_STATUSES = [
  "none",
  "trial",
  "current",
  "overdue",
  "paid_in_full",
] as const;
export const SERVICE_STATUSES = [
  "active",
  "trial",
  "overdue",
  "suspended",
  "inactive",
  "paid_in_full",
] as const;
export const PRODUCT_KINDS = [
  "saas",
  "service",
  "project",
  "integration",
] as const;
export const PRODUCT_BILLING_TYPES = ["recurring", "one_off"] as const;
export const PRODUCT_BILLING_INTERVALS = ["month", "year"] as const;
export const SUBSCRIPTION_STATUSES = [
  "trialing",
  "active",
  "past_due",
  "paused",
  "canceled",
  "incomplete",
  "manual_override",
] as const;
export const ENTITLEMENT_STATUSES = [
  "active",
  "trial",
  "paused",
  "suspended",
  "revoked",
] as const;
export const PAYMENT_STATUSES = [
  "pending",
  "paid",
  "failed",
  "refunded",
  "manual",
  "void",
] as const;
export const EMAIL_STATUSES = ["queued", "sent", "failed", "bounced"] as const;

export type AdminRole = (typeof ADMIN_ROLES)[number];
export type ClientType = (typeof CLIENT_TYPES)[number];
export type BillingStatus = (typeof BILLING_STATUSES)[number];
export type ServiceStatus = (typeof SERVICE_STATUSES)[number];
export type ProductKind = (typeof PRODUCT_KINDS)[number];
export type ProductBillingType = (typeof PRODUCT_BILLING_TYPES)[number];
export type ProductBillingInterval = (typeof PRODUCT_BILLING_INTERVALS)[number];
export type SubscriptionStatus = (typeof SUBSCRIPTION_STATUSES)[number];
export type EntitlementStatus = (typeof ENTITLEMENT_STATUSES)[number];
export type PaymentStatus = (typeof PAYMENT_STATUSES)[number];
export type EmailStatus = (typeof EMAIL_STATUSES)[number];

export interface AdminRecord {
  id: string;
  name: string;
  email: string;
  password_hash: string;
  role: AdminRole;
  status: "active" | "disabled";
  last_login_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface AdminSessionRecord {
  id: string;
  admin_id: string;
  session_token_hash: string;
  user_agent: string | null;
  ip_address: string | null;
  created_at: string;
  last_seen_at: string;
  expires_at: string;
}

export interface ClientRecord {
  id: string;
  name: string;
  legal_name: string | null;
  company_name: string | null;
  slug: string;
  billing_project_key: string;
  assigned_product_id: string | null;
  client_type: ClientType;
  billing_status: BillingStatus;
  service_status: ServiceStatus;
  service_status_reason: string | null;
  internal_notes: string | null;
  billing_email: string | null;
  website_url: string | null;
  support_email: string | null;
  created_at: string;
  updated_at: string;
}

export interface ClientBillingIntegrationRecord {
  id: string;
  client_id: string;
  project_key: string;
  status: "active" | "disabled";
  last_synced_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface ClientContactRecord {
  id: string;
  client_id: string;
  full_name: string;
  email: string;
  phone: string | null;
  role: string | null;
  is_primary: boolean;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface ProductRecord {
  id: string;
  code: string;
  name: string;
  public_name: string | null;
  slug: string;
  product_kind: ProductKind;
  billing_type: ProductBillingType;
  billing_interval: ProductBillingInterval | null;
  description: string | null;
  public_url: string | null;
  sort_order: number;
  amount_cents: number | null;
  currency: string;
  stripe_product_id: string | null;
  stripe_price_id: string | null;
  stripe_payment_link_url: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProductConnectionRecord {
  id: string;
  product_id: string;
  app_url: string | null;
  api_url: string | null;
  service_status: "active" | "suspended" | "trial" | "maintenance" | "inactive";
  environment_label: string;
  managed_externally: boolean;
  internal_notes: string | null;
  internal_links: string | null;
  created_at: string;
  updated_at: string;
}

export interface SubscriptionRecord {
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
}

export interface EntitlementRecord {
  id: string;
  client_id: string;
  product_id: string;
  subscription_id: string | null;
  entitlement_status: EntitlementStatus;
  access_source: "manual" | "subscription" | "payment" | "seed";
  granted_at: string;
  revoked_at: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface PaymentRecord {
  id: string;
  client_id: string;
  subscription_id: string | null;
  product_id: string | null;
  payment_status: PaymentStatus;
  payment_kind: "subscription" | "one_off" | "manual" | "invoice";
  amount_cents: number;
  currency: string;
  description: string | null;
  stripe_payment_intent_id: string | null;
  stripe_invoice_id: string | null;
  stripe_checkout_session_id: string | null;
  due_at: string | null;
  paid_at: string | null;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface StripeCustomerRecord {
  id: string;
  client_id: string;
  stripe_customer_id: string;
  email: string | null;
  name: string | null;
  metadata: Record<string, unknown>;
  synced_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface StripeSubscriptionRecord {
  id: string;
  subscription_id: string;
  stripe_subscription_id: string;
  stripe_customer_id: string;
  stripe_price_id: string | null;
  stripe_product_id: string | null;
  latest_invoice_id: string | null;
  status: string;
  raw_status: string | null;
  synced_at: string | null;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface AuditLogRecord {
  id: string;
  actor_admin_id: string | null;
  action: string;
  entity_type: string;
  entity_id: string;
  before_data: Record<string, unknown> | null;
  after_data: Record<string, unknown> | null;
  metadata: Record<string, unknown>;
  created_at: string;
}

export interface EmailEventRecord {
  id: string;
  client_id: string | null;
  admin_id: string | null;
  to_email: string;
  template_key: string;
  email_status: EmailStatus;
  subject: string | null;
  provider_message_id: string | null;
  metadata: Record<string, unknown>;
  failure_reason: string | null;
  queued_at: string;
  sent_at: string | null;
  failed_at: string | null;
  updated_at: string;
}

export interface ServiceStatusChangeRecord {
  id: string;
  client_id: string;
  product_id: string | null;
  changed_by_admin_id: string | null;
  previous_status: string | null;
  new_status: string;
  reason: string | null;
  grace_period_ends_at: string | null;
  notes: string | null;
  created_at: string;
}

export interface StripeWebhookEventRecord {
  id: string;
  stripe_event_id: string;
  event_type: string;
  livemode: boolean;
  processed_at: string | null;
  processing_status: "received" | "processing" | "processed" | "ignored" | "failed";
  payload: Record<string, unknown>;
  error_message: string | null;
  created_at: string;
  updated_at: string;
}

export interface ClientSubscriptionSnapshotRecord {
  id: string;
  client_id: string;
  product_id: string;
  subscription_id: string | null;
  project_key: string;
  product_sort_order: number;
  client_name: string;
  client_slug: string;
  billing_project_key: string;
  client_billing_status: BillingStatus;
  client_service_status: ServiceStatus;
  client_billing_email: string | null;
  client_support_email: string | null;
  client_website_url: string | null;
  product_code: string;
  product_name: string;
  product_slug: string;
  product_kind: ProductKind;
  product_is_active: boolean;
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
  entitlement_status: EntitlementStatus | null;
  access_source: EntitlementRecord["access_source"] | null;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  stripe_price_id: string | null;
  stripe_product_id: string | null;
  stripe_latest_invoice_id: string | null;
  stripe_latest_invoice_status: string | null;
  latest_payment_status: PaymentStatus | null;
  latest_payment_amount_cents: number | null;
  latest_payment_currency: string | null;
  latest_payment_paid_at: string | null;
  latest_payment_description: string | null;
  snapshot_version: number;
  snapshot_payload: Record<string, unknown>;
  synced_at: string;
  created_at: string;
  updated_at: string;
}
