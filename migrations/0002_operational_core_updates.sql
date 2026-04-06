BEGIN;

ALTER TABLE service_status_changes
ADD COLUMN IF NOT EXISTS effective_at TIMESTAMPTZ NOT NULL DEFAULT NOW();

INSERT INTO clients (
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
)
VALUES (
  'Frequency Framed',
  'Frequency Framed',
  'Frequency Framed',
  'frequency-framed',
  'project',
  'paid_in_full',
  'paid_in_full',
  'One-off custom website project. Paid in full.',
  'Seeded client record for a completed custom build.',
  'hello@frequencyframed.ie',
  'https://www.frequencyframed.ie',
  'hello@frequencyframed.ie'
)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  legal_name = EXCLUDED.legal_name,
  company_name = EXCLUDED.company_name,
  client_type = EXCLUDED.client_type,
  billing_status = EXCLUDED.billing_status,
  service_status = EXCLUDED.service_status,
  service_status_reason = EXCLUDED.service_status_reason,
  internal_notes = EXCLUDED.internal_notes,
  billing_email = EXCLUDED.billing_email,
  website_url = EXCLUDED.website_url,
  support_email = EXCLUDED.support_email,
  updated_at = NOW();

WITH seeded_client AS (
  SELECT id FROM clients WHERE slug = 'frequency-framed' LIMIT 1
)
INSERT INTO payment_records (
  client_id,
  payment_status,
  payment_kind,
  amount_cents,
  currency,
  description,
  paid_at,
  metadata
)
SELECT
  seeded_client.id,
  'paid',
  'manual',
  20000,
  'EUR',
  'Seeded one-off payment for Frequency Framed',
  NOW(),
  '{"seeded": true, "source": "migration_0002"}'::jsonb
FROM seeded_client
ON CONFLICT DO NOTHING;

COMMIT;
