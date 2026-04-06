BEGIN;

ALTER TABLE subscriptions
ADD COLUMN IF NOT EXISTS stripe_customer_id TEXT,
ADD COLUMN IF NOT EXISTS stripe_subscription_id TEXT,
ADD COLUMN IF NOT EXISTS stripe_price_id TEXT,
ADD COLUMN IF NOT EXISTS stripe_product_id TEXT,
ADD COLUMN IF NOT EXISTS stripe_latest_invoice_id TEXT,
ADD COLUMN IF NOT EXISTS stripe_latest_invoice_status TEXT,
ADD COLUMN IF NOT EXISTS stripe_status_raw TEXT;

CREATE UNIQUE INDEX IF NOT EXISTS subscriptions_stripe_subscription_id_unique
  ON subscriptions (stripe_subscription_id);

CREATE INDEX IF NOT EXISTS subscriptions_stripe_customer_id_idx
  ON subscriptions (stripe_customer_id);

CREATE INDEX IF NOT EXISTS subscriptions_stripe_price_id_idx
  ON subscriptions (stripe_price_id);

CREATE INDEX IF NOT EXISTS subscriptions_stripe_product_id_idx
  ON subscriptions (stripe_product_id);

ALTER TABLE stripe_subscriptions
ADD COLUMN IF NOT EXISTS stripe_price_id TEXT,
ADD COLUMN IF NOT EXISTS stripe_product_id TEXT,
ADD COLUMN IF NOT EXISTS latest_invoice_status TEXT,
ADD COLUMN IF NOT EXISTS current_period_start_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS current_period_end_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS trial_start_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS trial_end_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS cancel_at_period_end BOOLEAN NOT NULL DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS amount_cents INTEGER NOT NULL DEFAULT 0,
ADD COLUMN IF NOT EXISTS currency TEXT NOT NULL DEFAULT 'EUR';

CREATE INDEX IF NOT EXISTS stripe_subscriptions_price_id_idx
  ON stripe_subscriptions (stripe_price_id);

CREATE INDEX IF NOT EXISTS stripe_subscriptions_product_id_idx
  ON stripe_subscriptions (stripe_product_id);

CREATE UNIQUE INDEX IF NOT EXISTS stripe_subscriptions_stripe_subscription_id_unique
  ON stripe_subscriptions (stripe_subscription_id);

CREATE TABLE IF NOT EXISTS stripe_webhook_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  stripe_event_id TEXT NOT NULL UNIQUE,
  event_type TEXT NOT NULL,
  livemode BOOLEAN NOT NULL DEFAULT FALSE,
  processed_at TIMESTAMPTZ,
  processing_status TEXT NOT NULL DEFAULT 'received'
    CHECK (processing_status IN ('received', 'processing', 'processed', 'ignored', 'failed')),
  payload JSONB NOT NULL DEFAULT '{}'::jsonb,
  error_message TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS stripe_webhook_events_status_idx
  ON stripe_webhook_events (processing_status, event_type);

CREATE UNIQUE INDEX IF NOT EXISTS payment_records_stripe_invoice_id_unique
  ON payment_records (stripe_invoice_id);

CREATE UNIQUE INDEX IF NOT EXISTS payment_records_stripe_payment_intent_id_unique
  ON payment_records (stripe_payment_intent_id);

CREATE UNIQUE INDEX IF NOT EXISTS payment_records_stripe_checkout_session_id_unique
  ON payment_records (stripe_checkout_session_id);

COMMIT;
