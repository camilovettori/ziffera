BEGIN;

ALTER TABLE clients
ADD COLUMN IF NOT EXISTS billing_project_key TEXT;

UPDATE clients
SET billing_project_key = COALESCE(NULLIF(TRIM(billing_project_key), ''), slug)
WHERE billing_project_key IS NULL OR TRIM(billing_project_key) = '';

ALTER TABLE clients
ALTER COLUMN billing_project_key SET NOT NULL;

CREATE UNIQUE INDEX IF NOT EXISTS clients_billing_project_key_unique
  ON clients (billing_project_key);

CREATE OR REPLACE FUNCTION prevent_billing_project_key_update()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  IF NEW.billing_project_key IS DISTINCT FROM OLD.billing_project_key THEN
    RAISE EXCEPTION 'billing_project_key is immutable';
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS clients_billing_project_key_immutable ON clients;

CREATE TRIGGER clients_billing_project_key_immutable
BEFORE UPDATE ON clients
FOR EACH ROW
EXECUTE FUNCTION prevent_billing_project_key_update();

CREATE TABLE IF NOT EXISTS client_billing_integrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL UNIQUE REFERENCES clients (id) ON DELETE CASCADE,
  project_key TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'disabled')),
  last_synced_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS client_billing_integrations_project_key_idx
  ON client_billing_integrations (project_key);

CREATE TABLE IF NOT EXISTS client_subscription_snapshots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES clients (id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products (id) ON DELETE CASCADE,
  subscription_id UUID REFERENCES subscriptions (id) ON DELETE SET NULL,
  project_key TEXT NOT NULL,
  product_sort_order INTEGER NOT NULL DEFAULT 0,
  client_name TEXT NOT NULL,
  client_slug TEXT NOT NULL,
  billing_project_key TEXT NOT NULL,
  client_billing_status TEXT NOT NULL,
  client_service_status TEXT NOT NULL,
  client_billing_email TEXT,
  client_support_email TEXT,
  client_website_url TEXT,
  product_code TEXT NOT NULL,
  product_name TEXT NOT NULL,
  product_slug TEXT NOT NULL,
  product_kind TEXT NOT NULL,
  product_is_active BOOLEAN NOT NULL DEFAULT TRUE,
  subscription_name TEXT,
  subscription_status TEXT NOT NULL,
  billing_interval TEXT NOT NULL CHECK (billing_interval IN ('month', 'year')),
  amount_cents INTEGER NOT NULL DEFAULT 0,
  currency TEXT NOT NULL DEFAULT 'EUR',
  trial_start_at TIMESTAMPTZ,
  trial_end_at TIMESTAMPTZ,
  current_period_start_at TIMESTAMPTZ,
  current_period_end_at TIMESTAMPTZ,
  cancel_at_period_end BOOLEAN NOT NULL DEFAULT FALSE,
  manual_override_status TEXT,
  entitlement_status TEXT,
  access_source TEXT,
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  stripe_price_id TEXT,
  stripe_product_id TEXT,
  stripe_latest_invoice_id TEXT,
  stripe_latest_invoice_status TEXT,
  latest_payment_status TEXT,
  latest_payment_amount_cents INTEGER,
  latest_payment_currency TEXT,
  latest_payment_paid_at TIMESTAMPTZ,
  latest_payment_description TEXT,
  snapshot_version BIGINT NOT NULL DEFAULT 1,
  snapshot_payload JSONB NOT NULL DEFAULT '{}'::jsonb,
  synced_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE UNIQUE INDEX IF NOT EXISTS client_subscription_snapshots_client_product_unique
  ON client_subscription_snapshots (client_id, product_id);

CREATE INDEX IF NOT EXISTS client_subscription_snapshots_project_key_idx
  ON client_subscription_snapshots (project_key);

CREATE INDEX IF NOT EXISTS client_subscription_snapshots_subscription_id_idx
  ON client_subscription_snapshots (subscription_id);

CREATE INDEX IF NOT EXISTS client_subscription_snapshots_synced_at_idx
  ON client_subscription_snapshots (synced_at DESC);

INSERT INTO client_billing_integrations (
  client_id,
  project_key,
  status,
  last_synced_at
)
SELECT
  c.id,
  c.billing_project_key,
  'active',
  NOW()
FROM clients c
ON CONFLICT (client_id) DO UPDATE SET
  project_key = EXCLUDED.project_key,
  status = 'active',
  last_synced_at = NOW(),
  updated_at = NOW();

WITH latest_subscriptions AS (
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
  ORDER BY s.client_id, s.product_id, s.updated_at DESC, s.created_at DESC
)
INSERT INTO client_subscription_snapshots (
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
  snapshot_payload,
  synced_at
)
SELECT
  latest_subscriptions.client_id,
  latest_subscriptions.product_id,
  latest_subscriptions.subscription_id,
  latest_subscriptions.billing_project_key,
  latest_subscriptions.product_sort_order,
  latest_subscriptions.client_name,
  latest_subscriptions.client_slug,
  latest_subscriptions.billing_project_key,
  latest_subscriptions.client_billing_status,
  latest_subscriptions.client_service_status,
  latest_subscriptions.client_billing_email,
  latest_subscriptions.client_support_email,
  latest_subscriptions.client_website_url,
  latest_subscriptions.product_code,
  latest_subscriptions.product_name,
  latest_subscriptions.product_slug,
  latest_subscriptions.product_kind,
  latest_subscriptions.product_is_active,
  latest_subscriptions.subscription_name,
  latest_subscriptions.subscription_status,
  latest_subscriptions.billing_interval,
  latest_subscriptions.amount_cents,
  latest_subscriptions.currency,
  latest_subscriptions.trial_start_at,
  latest_subscriptions.trial_end_at,
  latest_subscriptions.current_period_start_at,
  latest_subscriptions.current_period_end_at,
  latest_subscriptions.cancel_at_period_end,
  latest_subscriptions.manual_override_status,
  latest_subscriptions.entitlement_status,
  latest_subscriptions.access_source,
  latest_subscriptions.stripe_customer_id,
  latest_subscriptions.stripe_subscription_id,
  latest_subscriptions.stripe_price_id,
  latest_subscriptions.stripe_product_id,
  latest_subscriptions.stripe_latest_invoice_id,
  latest_subscriptions.stripe_latest_invoice_status,
  latest_subscriptions.latest_payment_status,
  latest_subscriptions.latest_payment_amount_cents,
  latest_subscriptions.latest_payment_currency,
  latest_subscriptions.latest_payment_paid_at,
  latest_subscriptions.latest_payment_description,
  jsonb_build_object(
    'projectKey', latest_subscriptions.billing_project_key,
    'client', jsonb_build_object(
      'id', latest_subscriptions.client_id,
      'name', latest_subscriptions.client_name,
      'slug', latest_subscriptions.client_slug,
      'billingProjectKey', latest_subscriptions.billing_project_key,
      'billingStatus', latest_subscriptions.client_billing_status,
      'serviceStatus', latest_subscriptions.client_service_status,
      'billingEmail', latest_subscriptions.client_billing_email,
      'supportEmail', latest_subscriptions.client_support_email,
      'websiteUrl', latest_subscriptions.client_website_url
    ),
    'product', jsonb_build_object(
      'id', latest_subscriptions.product_id,
      'code', latest_subscriptions.product_code,
      'name', latest_subscriptions.product_name,
      'slug', latest_subscriptions.product_slug,
      'kind', latest_subscriptions.product_kind,
      'sortOrder', latest_subscriptions.product_sort_order,
      'isActive', latest_subscriptions.product_is_active
    ),
    'subscription', jsonb_build_object(
      'id', latest_subscriptions.subscription_id,
      'name', latest_subscriptions.subscription_name,
      'status', latest_subscriptions.subscription_status,
      'billingInterval', latest_subscriptions.billing_interval,
      'amountCents', latest_subscriptions.amount_cents,
      'currency', latest_subscriptions.currency,
      'trialStartAt', latest_subscriptions.trial_start_at,
      'trialEndAt', latest_subscriptions.trial_end_at,
      'currentPeriodStartAt', latest_subscriptions.current_period_start_at,
      'currentPeriodEndAt', latest_subscriptions.current_period_end_at,
      'cancelAtPeriodEnd', latest_subscriptions.cancel_at_period_end,
      'manualOverrideStatus', latest_subscriptions.manual_override_status,
      'stripeCustomerId', latest_subscriptions.stripe_customer_id,
      'stripeSubscriptionId', latest_subscriptions.stripe_subscription_id,
      'stripePriceId', latest_subscriptions.stripe_price_id,
      'stripeProductId', latest_subscriptions.stripe_product_id,
      'stripeLatestInvoiceId', latest_subscriptions.stripe_latest_invoice_id,
      'stripeLatestInvoiceStatus', latest_subscriptions.stripe_latest_invoice_status
    ),
    'entitlement', jsonb_build_object(
      'status', latest_subscriptions.entitlement_status,
      'accessSource', latest_subscriptions.access_source
    ),
    'latestPayment', jsonb_build_object(
      'status', latest_subscriptions.latest_payment_status,
      'amountCents', latest_subscriptions.latest_payment_amount_cents,
      'currency', latest_subscriptions.latest_payment_currency,
      'paidAt', latest_subscriptions.latest_payment_paid_at,
      'description', latest_subscriptions.latest_payment_description
    ),
    'snapshotVersion', 1,
    'syncedAt', NOW()
  ),
  NOW()
FROM latest_subscriptions
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
  snapshot_payload = EXCLUDED.snapshot_payload,
  synced_at = EXCLUDED.synced_at,
  snapshot_version = client_subscription_snapshots.snapshot_version + 1,
  updated_at = NOW();

COMMIT;
