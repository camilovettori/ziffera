BEGIN;

CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS schema_migrations (
  filename TEXT PRIMARY KEY,
  applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS admins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('owner', 'admin')),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'disabled')),
  last_login_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS admins_role_idx ON admins (role);

CREATE TABLE IF NOT EXISTS admin_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id UUID NOT NULL REFERENCES admins (id) ON DELETE CASCADE,
  session_token_hash TEXT NOT NULL UNIQUE,
  user_agent TEXT,
  ip_address TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  last_seen_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  expires_at TIMESTAMPTZ NOT NULL
);

CREATE INDEX IF NOT EXISTS admin_sessions_admin_id_idx ON admin_sessions (admin_id);
CREATE INDEX IF NOT EXISTS admin_sessions_expires_at_idx ON admin_sessions (expires_at);

CREATE TABLE IF NOT EXISTS clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  legal_name TEXT,
  company_name TEXT,
  slug TEXT NOT NULL UNIQUE,
  client_type TEXT NOT NULL DEFAULT 'saas' CHECK (client_type IN ('saas', 'project', 'mixed')),
  billing_status TEXT NOT NULL DEFAULT 'none' CHECK (billing_status IN ('none', 'trial', 'current', 'overdue', 'paid_in_full')),
  service_status TEXT NOT NULL DEFAULT 'active' CHECK (service_status IN ('active', 'trial', 'overdue', 'suspended', 'inactive', 'paid_in_full')),
  service_status_reason TEXT,
  internal_notes TEXT,
  billing_email TEXT,
  website_url TEXT,
  support_email TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS clients_status_idx ON clients (service_status, billing_status);

CREATE TABLE IF NOT EXISTS client_contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES clients (id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  role TEXT,
  is_primary BOOLEAN NOT NULL DEFAULT FALSE,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS client_contacts_client_id_idx ON client_contacts (client_id);

CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  product_kind TEXT NOT NULL CHECK (product_kind IN ('saas', 'service', 'project', 'integration')),
  description TEXT,
  public_url TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  default_price_cents INTEGER,
  default_currency TEXT NOT NULL DEFAULT 'EUR',
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS products_kind_idx ON products (product_kind, is_active);

CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES clients (id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products (id),
  subscription_name TEXT,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('trialing', 'active', 'past_due', 'paused', 'canceled', 'incomplete', 'manual_override')),
  billing_interval TEXT NOT NULL DEFAULT 'month' CHECK (billing_interval IN ('month', 'year')),
  amount_cents INTEGER NOT NULL DEFAULT 0,
  currency TEXT NOT NULL DEFAULT 'EUR',
  trial_start_at TIMESTAMPTZ,
  trial_end_at TIMESTAMPTZ,
  current_period_start_at TIMESTAMPTZ,
  current_period_end_at TIMESTAMPTZ,
  cancel_at_period_end BOOLEAN NOT NULL DEFAULT FALSE,
  manual_override_status TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS subscriptions_client_id_idx ON subscriptions (client_id);
CREATE INDEX IF NOT EXISTS subscriptions_product_id_idx ON subscriptions (product_id);
CREATE INDEX IF NOT EXISTS subscriptions_status_idx ON subscriptions (status);

CREATE TABLE IF NOT EXISTS entitlements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES clients (id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products (id),
  subscription_id UUID REFERENCES subscriptions (id) ON DELETE SET NULL,
  entitlement_status TEXT NOT NULL DEFAULT 'active' CHECK (entitlement_status IN ('active', 'trial', 'paused', 'suspended', 'revoked')),
  access_source TEXT NOT NULL DEFAULT 'manual' CHECK (access_source IN ('manual', 'subscription', 'payment', 'seed')),
  granted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  revoked_at TIMESTAMPTZ,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE UNIQUE INDEX IF NOT EXISTS entitlements_client_product_unique ON entitlements (client_id, product_id);
CREATE INDEX IF NOT EXISTS entitlements_product_id_idx ON entitlements (product_id);

CREATE TABLE IF NOT EXISTS payment_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES clients (id) ON DELETE CASCADE,
  subscription_id UUID REFERENCES subscriptions (id) ON DELETE SET NULL,
  product_id UUID REFERENCES products (id),
  payment_status TEXT NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded', 'manual', 'void')),
  payment_kind TEXT NOT NULL DEFAULT 'subscription' CHECK (payment_kind IN ('subscription', 'one_off', 'manual', 'invoice')),
  amount_cents INTEGER NOT NULL DEFAULT 0,
  currency TEXT NOT NULL DEFAULT 'EUR',
  description TEXT,
  stripe_payment_intent_id TEXT,
  stripe_invoice_id TEXT,
  stripe_checkout_session_id TEXT,
  due_at TIMESTAMPTZ,
  paid_at TIMESTAMPTZ,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS payment_records_client_id_idx ON payment_records (client_id);
CREATE INDEX IF NOT EXISTS payment_records_status_idx ON payment_records (payment_status);

CREATE TABLE IF NOT EXISTS stripe_customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL UNIQUE REFERENCES clients (id) ON DELETE CASCADE,
  stripe_customer_id TEXT NOT NULL UNIQUE,
  email TEXT,
  name TEXT,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  synced_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS stripe_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subscription_id UUID NOT NULL UNIQUE REFERENCES subscriptions (id) ON DELETE CASCADE,
  stripe_subscription_id TEXT NOT NULL UNIQUE,
  stripe_customer_id TEXT NOT NULL,
  latest_invoice_id TEXT,
  status TEXT NOT NULL,
  raw_status TEXT,
  synced_at TIMESTAMPTZ,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS stripe_subscriptions_customer_idx ON stripe_subscriptions (stripe_customer_id);

CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_admin_id UUID REFERENCES admins (id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id TEXT NOT NULL,
  before_data JSONB,
  after_data JSONB,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS audit_logs_entity_idx ON audit_logs (entity_type, entity_id);

CREATE TABLE IF NOT EXISTS email_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES clients (id) ON DELETE SET NULL,
  admin_id UUID REFERENCES admins (id) ON DELETE SET NULL,
  to_email TEXT NOT NULL,
  template_key TEXT NOT NULL,
  email_status TEXT NOT NULL DEFAULT 'queued' CHECK (email_status IN ('queued', 'sent', 'failed', 'bounced')),
  subject TEXT,
  provider_message_id TEXT,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  failure_reason TEXT,
  queued_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  sent_at TIMESTAMPTZ,
  failed_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS email_events_status_idx ON email_events (email_status, template_key);

CREATE TABLE IF NOT EXISTS service_status_changes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES clients (id) ON DELETE CASCADE,
  product_id UUID REFERENCES products (id) ON DELETE SET NULL,
  changed_by_admin_id UUID REFERENCES admins (id) ON DELETE SET NULL,
  previous_status TEXT,
  new_status TEXT NOT NULL,
  reason TEXT,
  grace_period_ends_at TIMESTAMPTZ,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS service_status_changes_client_id_idx ON service_status_changes (client_id, created_at DESC);

INSERT INTO products (code, name, slug, product_kind, description, public_url, sort_order, default_price_cents, default_currency, is_active)
VALUES
  ('marginflow', 'MarginFlow', 'marginflow', 'saas', 'Margin visibility software for small businesses.', 'https://marginflow.ziffera.ie', 10, 2500, 'EUR', TRUE),
  ('zconnect', 'Zconnect', 'zconnect', 'integration', 'Automation and invoice synchronization tooling.', 'https://zconnect.ziffera.ie', 20, NULL, 'EUR', TRUE),
  ('workhours-tracker', 'Work Hours Tracker', 'workhours-tracker', 'saas', 'Time tracking and reporting product.', 'https://workhourstracker.ziffera.ie', 30, NULL, 'EUR', TRUE)
ON CONFLICT (code) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  product_kind = EXCLUDED.product_kind,
  description = EXCLUDED.description,
  public_url = EXCLUDED.public_url,
  sort_order = EXCLUDED.sort_order,
  default_price_cents = EXCLUDED.default_price_cents,
  default_currency = EXCLUDED.default_currency,
  is_active = EXCLUDED.is_active,
  updated_at = NOW();

COMMIT;
