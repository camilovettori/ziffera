BEGIN;

CREATE TABLE IF NOT EXISTS product_connections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL UNIQUE REFERENCES products (id) ON DELETE CASCADE,
  app_url TEXT,
  api_url TEXT,
  service_status TEXT NOT NULL DEFAULT 'active'
    CHECK (service_status IN ('active', 'suspended', 'trial', 'maintenance', 'inactive')),
  environment_label TEXT NOT NULL DEFAULT 'production',
  managed_externally BOOLEAN NOT NULL DEFAULT TRUE,
  internal_notes TEXT,
  internal_links TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS product_connections_service_status_idx
  ON product_connections (service_status);

CREATE INDEX IF NOT EXISTS product_connections_environment_label_idx
  ON product_connections (environment_label);

INSERT INTO product_connections (
  product_id,
  app_url,
  api_url,
  service_status,
  environment_label,
  managed_externally,
  internal_notes,
  internal_links
)
SELECT
  p.id,
  CASE p.code
    WHEN 'marginflow' THEN 'https://marginflow.ziffera.ie'
    WHEN 'zconnect' THEN 'https://zconnect.ziffera.ie'
    WHEN 'workhours-tracker' THEN 'https://workhourstracker.ziffera.ie'
    ELSE NULL
  END,
  NULL,
  'active',
  'production',
  TRUE,
  CASE p.code
    WHEN 'marginflow' THEN 'Public SaaS product; access managed through Ziffera Core.'
    WHEN 'zconnect' THEN 'Integration product; keep backend and frontend separate for now.'
    WHEN 'workhours-tracker' THEN 'PWA / app service; preserve existing runtime until safe consolidation.'
    ELSE NULL
  END,
  NULL
FROM products p
WHERE p.code IN ('marginflow', 'zconnect', 'workhours-tracker')
ON CONFLICT (product_id) DO UPDATE SET
  app_url = EXCLUDED.app_url,
  api_url = EXCLUDED.api_url,
  service_status = EXCLUDED.service_status,
  environment_label = EXCLUDED.environment_label,
  managed_externally = EXCLUDED.managed_externally,
  internal_notes = EXCLUDED.internal_notes,
  internal_links = EXCLUDED.internal_links,
  updated_at = NOW();

COMMIT;
