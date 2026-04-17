import "server-only";

import crypto from "node:crypto";
import { query } from "@/lib/core/db";
import { getEnv } from "@/lib/core/env";
import type {
  ClientBillingIntegrationRecord,
  ClientRecord,
} from "@/lib/core/models";

export class InternalBillingAuthError extends Error {
  readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "InternalBillingAuthError";
    this.status = status;
  }
}

export type InternalBillingAccess = {
  client: ClientRecord;
  integration: ClientBillingIntegrationRecord;
};

function cleanText(value: string | null | undefined) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

function timingSafeEquals(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  if (leftBuffer.length !== rightBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(leftBuffer, rightBuffer);
}

export async function authenticateInternalBillingRequest(
  projectKey: string,
  request: Request
): Promise<InternalBillingAccess> {
  const env = getEnv();
  const configuredToken = cleanText(env.internalBillingApiToken);
  if (!configuredToken) {
    throw new InternalBillingAuthError(
      "Internal billing API token is not configured.",
      500
    );
  }

  const authorization = request.headers.get("authorization");
  const bearerToken = authorization?.startsWith("Bearer ")
    ? authorization.slice("Bearer ".length).trim()
    : null;

  if (!bearerToken) {
    throw new InternalBillingAuthError("Missing bearer token.", 401);
  }

  if (!timingSafeEquals(bearerToken, configuredToken)) {
    throw new InternalBillingAuthError("Unauthorized.", 401);
  }

  const normalizedProjectKey = cleanText(projectKey)?.toLowerCase();
  if (!normalizedProjectKey) {
    throw new InternalBillingAuthError("Missing project key.", 400);
  }

  const result = await query<
    ClientBillingIntegrationRecord & {
      client_name: string;
      client_slug: string;
      client_billing_project_key: string;
      client_billing_status: ClientRecord["billing_status"];
      client_service_status: ClientRecord["service_status"];
      client_billing_email: string | null;
      client_support_email: string | null;
      client_website_url: string | null;
      client_legal_name: string | null;
      client_company_name: string | null;
      client_type: ClientRecord["client_type"];
      client_internal_notes: string | null;
      client_created_at: string;
      client_updated_at: string;
    }
  >(
    `SELECT
       cbi.*,
       c.name AS client_name,
       c.slug AS client_slug,
       c.billing_project_key AS client_billing_project_key,
       c.billing_status AS client_billing_status,
       c.service_status AS client_service_status,
       c.billing_email AS client_billing_email,
       c.support_email AS client_support_email,
       c.website_url AS client_website_url,
       c.legal_name AS client_legal_name,
       c.company_name AS client_company_name,
       c.client_type AS client_type,
       c.internal_notes AS client_internal_notes,
       c.created_at AS client_created_at,
       c.updated_at AS client_updated_at
     FROM client_billing_integrations cbi
     INNER JOIN clients c ON c.id = cbi.client_id
     WHERE c.billing_project_key = $1
     LIMIT 1`,
    [normalizedProjectKey]
  );

  const row = result.rows[0];
  if (!row) {
    throw new InternalBillingAuthError("Project key not found.", 404);
  }

  if (row.status !== "active") {
    throw new InternalBillingAuthError("Project key is disabled.", 403);
  }

  return {
    client: {
      id: row.client_id,
      name: row.client_name,
      legal_name: row.client_legal_name,
      company_name: row.client_company_name,
      slug: row.client_slug,
      billing_project_key: row.client_billing_project_key,
      client_type: row.client_type,
      billing_status: row.client_billing_status,
      service_status: row.client_service_status,
      service_status_reason: null,
      internal_notes: row.client_internal_notes,
      billing_email: row.client_billing_email,
      website_url: row.client_website_url,
      support_email: row.client_support_email,
      created_at: row.client_created_at,
      updated_at: row.client_updated_at,
    },
    integration: {
      id: row.id,
      client_id: row.client_id,
      project_key: row.project_key,
      status: row.status,
      last_synced_at: row.last_synced_at,
      created_at: row.created_at,
      updated_at: row.updated_at,
    },
  };
}

