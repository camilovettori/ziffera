import crypto from "node:crypto";
import nextEnv from "@next/env";
import { Client } from "pg";

const { loadEnvConfig } = nextEnv;

loadEnvConfig(process.cwd());

const databaseUrl = process.env.DATABASE_URL;
const adminEmail = process.env.ZIFFERA_BOOTSTRAP_ADMIN_EMAIL;
const adminPassword = process.env.ZIFFERA_BOOTSTRAP_ADMIN_PASSWORD;
const adminName = process.env.ZIFFERA_BOOTSTRAP_ADMIN_NAME ?? "Ziffera Owner";

if (!databaseUrl) {
  console.error("DATABASE_URL is required to seed the admin user.");
  process.exit(1);
}

if (!adminEmail || !adminPassword) {
  console.error(
    "ZIFFERA_BOOTSTRAP_ADMIN_EMAIL and ZIFFERA_BOOTSTRAP_ADMIN_PASSWORD are required."
  );
  process.exit(1);
}

const useSsl =
  (process.env.DATABASE_SSL ?? "").toLowerCase() === "true" ||
  (process.env.NODE_ENV === "production" &&
    (process.env.DATABASE_SSL ?? "").toLowerCase() !== "false");

const client = new Client({
  connectionString: databaseUrl,
  ssl: useSsl ? { rejectUnauthorized: false } : undefined,
});

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("base64url");
  const derivedKey = crypto.scryptSync(password, salt, 64);
  return `scrypt$${salt}$${derivedKey.toString("base64url")}`;
}

async function main() {
  await client.connect();

  const passwordHash = hashPassword(adminPassword);

  await client.query(
    `
      INSERT INTO admins (name, email, password_hash, role, status, updated_at)
      VALUES ($1, $2, $3, 'owner', 'active', NOW())
      ON CONFLICT (email) DO UPDATE SET
        name = EXCLUDED.name,
        password_hash = EXCLUDED.password_hash,
        role = 'owner',
        status = 'active',
        updated_at = NOW();
    `,
    [adminName, adminEmail.toLowerCase(), passwordHash]
  );

  console.log(`Seeded admin user ${adminEmail.toLowerCase()}.`);
}

main()
  .catch((error) => {
    console.error("Admin seeding failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await client.end();
  });
