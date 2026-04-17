BEGIN;

ALTER TABLE products
RENAME COLUMN default_price_cents TO amount_cents;

ALTER TABLE products
RENAME COLUMN default_currency TO currency;

ALTER TABLE products
ADD COLUMN IF NOT EXISTS public_name TEXT;

ALTER TABLE products
ADD COLUMN IF NOT EXISTS billing_type TEXT NOT NULL DEFAULT 'recurring'
  CHECK (billing_type IN ('recurring', 'one_off'));

ALTER TABLE products
ADD COLUMN IF NOT EXISTS billing_interval TEXT
  CHECK (billing_interval IN ('month', 'year'));

ALTER TABLE products
ADD COLUMN IF NOT EXISTS stripe_product_id TEXT;

ALTER TABLE products
ADD COLUMN IF NOT EXISTS stripe_price_id TEXT;

ALTER TABLE products
ADD COLUMN IF NOT EXISTS stripe_payment_link_url TEXT;

CREATE UNIQUE INDEX IF NOT EXISTS products_stripe_product_id_unique
  ON products (stripe_product_id)
  WHERE stripe_product_id IS NOT NULL;

CREATE UNIQUE INDEX IF NOT EXISTS products_stripe_price_id_unique
  ON products (stripe_price_id)
  WHERE stripe_price_id IS NOT NULL;

ALTER TABLE clients
ADD COLUMN IF NOT EXISTS assigned_product_id UUID REFERENCES products (id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS clients_assigned_product_id_idx
  ON clients (assigned_product_id);

UPDATE products
SET public_name = COALESCE(NULLIF(TRIM(public_name), ''), name),
    billing_type = COALESCE(billing_type, CASE WHEN product_kind = 'project' THEN 'one_off' ELSE 'recurring' END),
    billing_interval = COALESCE(billing_interval, CASE WHEN product_kind = 'project' THEN NULL ELSE 'month' END),
    currency = COALESCE(NULLIF(TRIM(currency), ''), 'EUR')
WHERE public_name IS NULL
   OR billing_type IS NULL
   OR currency IS NULL;

UPDATE clients
SET assigned_product_id = assigned_product_id
WHERE assigned_product_id IS NOT NULL;

COMMIT;
