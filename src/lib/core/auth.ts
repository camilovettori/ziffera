import "server-only";

import crypto from "node:crypto";
import { cache } from "react";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { query } from "@/lib/core/db";
import { DatabaseQueryError } from "@/lib/core/db";
import { getEnv } from "@/lib/core/env";
import type { AdminRecord } from "@/lib/core/models";

export const adminLoginSchema = z.object({
  email: z.email().trim().toLowerCase(),
  password: z.string().min(1, "Password is required."),
});

export type AdminSession = {
  admin: AdminRecord;
  sessionId: string;
  expiresAt: string;
};

export type AdminLoginResult =
  | {
      ok: true;
      admin: Pick<AdminRecord, "id" | "name" | "email" | "role">;
    }
  | {
      ok: false;
      error: string;
    };

function hashPassword(password: string) {
  const salt = crypto.randomBytes(16).toString("base64url");
  const derivedKey = crypto.scryptSync(password, salt, 64);
  return `scrypt$${salt}$${derivedKey.toString("base64url")}`;
}

function verifyPassword(password: string, storedHash: string) {
  const [scheme, salt, hashed] = storedHash.split("$");
  if (scheme !== "scrypt" || !salt || !hashed) {
    return false;
  }

  const expected = Buffer.from(hashed, "base64url");
  const derived = crypto.scryptSync(password, salt, expected.length);
  return (
    expected.length === derived.length &&
    crypto.timingSafeEqual(expected, derived)
  );
}

function createSessionToken() {
  const token = crypto.randomBytes(32).toString("base64url");
  const env = getEnv();
  const tokenHash = crypto
    .createHmac("sha256", env.sessionSecret)
    .update(token)
    .digest("hex");

  return { token, tokenHash };
}

function hashSessionToken(token: string) {
  const env = getEnv();
  return crypto
    .createHmac("sha256", env.sessionSecret)
    .update(token)
    .digest("hex");
}

function buildSessionCookie(token: string) {
  const env = getEnv();
  return {
    name: env.adminSessionCookieName,
    value: token,
    options: {
      httpOnly: true,
      sameSite: "lax" as const,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: Math.max(1, env.adminSessionTtlDays) * 24 * 60 * 60,
    },
  };
}

async function findAdminByEmail(email: string) {
  try {
    const result = await query<AdminRecord>(
      `SELECT *
       FROM admins
       WHERE email = $1
       LIMIT 1`,
      [email]
    );

    return result.rows[0] ?? null;
  } catch (error) {
    if (error instanceof DatabaseQueryError) {
      throw new Error(
        `Unable to look up the admin account for ${email}: the database query failed. ${error.message}`,
        { cause: error }
      );
    }

    throw error;
  }
}

export async function authenticateAdmin({
  email,
  password,
  userAgent,
}: {
  email: string;
  password: string;
  userAgent?: string | null;
}): Promise<AdminLoginResult> {
  try {
    const normalizedEmail = email.trim().toLowerCase();
    const admin = await findAdminByEmail(normalizedEmail);

    if (!admin || admin.status !== "active") {
      return { ok: false, error: "Invalid admin credentials." };
    }

    if (!verifyPassword(password, admin.password_hash)) {
      return { ok: false, error: "Invalid admin credentials." };
    }

    const env = getEnv();
    const { token, tokenHash } = createSessionToken();
    const expiresAt = new Date(
      Date.now() + env.adminSessionTtlDays * 24 * 60 * 60 * 1000
    );

    await query(
      `INSERT INTO admin_sessions (
        admin_id,
        session_token_hash,
        user_agent,
        expires_at
      )
      VALUES ($1, $2, $3, $4)`,
      [admin.id, tokenHash, userAgent ?? null, expiresAt.toISOString()]
    );

    await query(
      `UPDATE admins
       SET last_login_at = NOW(),
           updated_at = NOW()
       WHERE id = $1`,
      [admin.id]
    );

    const cookieStore = await cookies();
    const sessionCookie = buildSessionCookie(token);
    cookieStore.set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.options
    );

    return {
      ok: true,
      admin: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    };
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Unable to authenticate the admin account.";
    return { ok: false, error: message };
  }
}

export const getCurrentAdminSession = cache(async (): Promise<AdminSession | null> => {
  const env = getEnv();
  const cookieStore = await cookies();
  const token = cookieStore.get(env.adminSessionCookieName)?.value;
  if (!token) {
    return null;
  }

  const tokenHash = hashSessionToken(token);

  const result = await query<AdminRecord & { session_id: string; session_expires_at: string }>(
    `SELECT
        a.*,
        s.id AS session_id,
        s.expires_at AS session_expires_at
     FROM admin_sessions s
     INNER JOIN admins a ON a.id = s.admin_id
     WHERE s.session_token_hash = $1
       AND s.expires_at > NOW()
       AND a.status = 'active'
     LIMIT 1`,
    [tokenHash]
  );

  const row = result.rows[0];
  if (!row) {
    return null;
  }

  return {
    admin: {
      id: row.id,
      name: row.name,
      email: row.email,
      password_hash: row.password_hash,
      role: row.role,
      status: row.status,
      last_login_at: row.last_login_at,
      created_at: row.created_at,
      updated_at: row.updated_at,
    },
    sessionId: row.session_id,
    expiresAt: row.session_expires_at,
  };
});

export async function requireAdminSession() {
  const session = await getCurrentAdminSession();

  if (!session) {
    redirect("/admin/login");
  }

  return session;
}

export async function signOutAdmin() {
  const env = getEnv();
  const cookieStore = await cookies();
  const token = cookieStore.get(env.adminSessionCookieName)?.value;

  if (token) {
    const tokenHash = hashSessionToken(token);
    await query(`DELETE FROM admin_sessions WHERE session_token_hash = $1`, [
      tokenHash,
    ]);
  }

  cookieStore.delete(env.adminSessionCookieName);
  redirect("/admin/login");
}

export function getAdminCookieName() {
  return getEnv().adminSessionCookieName;
}

export function createPasswordHash(password: string) {
  return hashPassword(password);
}

export async function getRequestUserAgent() {
  const headerStore = await headers();
  return headerStore.get("user-agent");
}
