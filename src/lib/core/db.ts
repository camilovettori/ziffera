import "server-only";

import { Pool, type PoolClient, type QueryResultRow } from "pg";
import { getEnv } from "@/lib/core/env";

export class DatabaseQueryError extends Error {
  readonly queryPreview: string;

  constructor(message: string, queryPreview: string, cause: unknown) {
    super(message, { cause });
    this.name = "DatabaseQueryError";
    this.queryPreview = queryPreview;
  }
}

declare global {
  var zifferaPool: Pool | undefined;
}

function getPool() {
  if (!globalThis.zifferaPool) {
    const env = getEnv();
    globalThis.zifferaPool = new Pool({
      connectionString: env.databaseUrl,
      ssl: env.databaseSsl ? { rejectUnauthorized: false } : undefined,
      max: 10,
      idleTimeoutMillis: 30_000,
    });
  }

  return globalThis.zifferaPool;
}

export async function query<T extends QueryResultRow = QueryResultRow>(
  text: string,
  values: unknown[] = []
) {
  try {
    return await getPool().query<T>(text, values);
  } catch (error) {
    const compactText = text.replace(/\s+/g, " ").trim().slice(0, 120);
    throw new DatabaseQueryError(
      `Database query failed: ${compactText}`,
      compactText,
      error
    );
  }
}

export async function withTransaction<T>(
  callback: (client: PoolClient) => Promise<T>
) {
  const client = await getPool().connect();

  try {
    await client.query("BEGIN");
    const result = await callback(client);
    await client.query("COMMIT");
    return result;
  } catch (error) {
    try {
      await client.query("ROLLBACK");
    } catch {
      // Ignore rollback failures so the original error is preserved.
    }
    throw error;
  } finally {
    client.release();
  }
}
