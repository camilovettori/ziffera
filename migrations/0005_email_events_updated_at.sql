BEGIN;

ALTER TABLE email_events
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW();

UPDATE email_events
SET updated_at = COALESCE(updated_at, queued_at, sent_at, failed_at, created_at, NOW())
WHERE updated_at IS NULL;

COMMIT;
