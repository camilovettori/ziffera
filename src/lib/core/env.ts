import "server-only";

import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required."),
  DATABASE_SSL: z.string().optional(),
  SESSION_SECRET: z
    .string()
    .min(32, "SESSION_SECRET must be at least 32 characters long."),
  ADMIN_SESSION_COOKIE_NAME: z.string().optional(),
  ADMIN_SESSION_TTL_DAYS: z.string().optional(),
  APP_URL: z.string().optional(),
  SUPPORT_EMAIL: z.string().optional(),
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().optional(),
  RESEND_API_KEY: z.string().optional(),
  STRIPE_SECRET_KEY: z.string().optional(),
  STRIPE_WEBHOOK_SECRET: z.string().optional(),
  STRIPE_MARGINFLOW_PRODUCT_ID: z.string().optional(),
  STRIPE_MARGINFLOW_MONTHLY_PRICE_ID: z.string().optional(),
  STRIPE_MARGINFLOW_MONTHLY_PROMO_PRICE_ID: z.string().optional(),
  STRIPE_PRICE_MONTHLY_PLAN: z.string().optional(),
  STRIPE_PRICE_SETUP_DEPOSIT: z.string().optional(),
  STRIPE_PRICE_SETUP_FINAL: z.string().optional(),
  STRIPE_WEBSITE_SETUP_DEPOSIT_PRICE_ID: z.string().optional(),
  STRIPE_WEBSITE_FINAL_PAYMENT_PRICE_ID: z.string().optional(),
  STRIPE_MARGINFLOW_TRIAL_DAYS: z.string().optional(),
});

function isTruthy(value: string | undefined) {
  return ["1", "true", "yes", "on"].includes((value ?? "").toLowerCase());
}

type EnvShape = {
  databaseUrl: string;
  databaseSsl: boolean;
  sessionSecret: string;
  adminSessionCookieName: string;
  adminSessionTtlDays: number;
  appUrl: string;
  supportEmail: string;
  stripePublishableKey?: string;
  resendApiKey?: string;
  stripeSecretKey?: string;
  stripeWebhookSecret?: string;
  stripeMarginflowProductId?: string;
  stripeMarginflowMonthlyPriceId?: string;
  stripeMarginflowMonthlyPromoPriceId?: string;
  stripePriceMonthlyPlan?: string;
  stripePriceSetupDeposit?: string;
  stripePriceSetupFinal?: string;
  stripeWebsiteSetupDepositPriceId?: string;
  stripeWebsiteFinalPaymentPriceId?: string;
  stripeMarginflowTrialDays: number;
};

let cachedEnv: EnvShape | null = null;

export function getEnv(): EnvShape {
  if (cachedEnv) {
    return cachedEnv;
  }

  const parsed = envSchema.safeParse(process.env);
  if (!parsed.success) {
    const message = parsed.error.issues
      .map((issue) => `${issue.path.join(".") || "env"}: ${issue.message}`)
      .join("; ");
    throw new Error(`Invalid Ziffera environment configuration: ${message}`);
  }

  const ttlDaysRaw = Number(parsed.data.ADMIN_SESSION_TTL_DAYS ?? "14");

  cachedEnv = {
    databaseUrl: parsed.data.DATABASE_URL,
    databaseSsl: isTruthy(parsed.data.DATABASE_SSL),
    sessionSecret: parsed.data.SESSION_SECRET,
    adminSessionCookieName:
      parsed.data.ADMIN_SESSION_COOKIE_NAME ?? "ziffera_admin_session",
    adminSessionTtlDays:
      Number.isFinite(ttlDaysRaw) && ttlDaysRaw > 0 ? ttlDaysRaw : 14,
    appUrl: parsed.data.APP_URL ?? "https://ziffera.ie",
    supportEmail: parsed.data.SUPPORT_EMAIL ?? "support@ziffera.ie",
    stripePublishableKey: parsed.data.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    resendApiKey: parsed.data.RESEND_API_KEY,
    stripeSecretKey: parsed.data.STRIPE_SECRET_KEY,
    stripeWebhookSecret: parsed.data.STRIPE_WEBHOOK_SECRET,
    stripeMarginflowProductId: parsed.data.STRIPE_MARGINFLOW_PRODUCT_ID,
    stripeMarginflowMonthlyPriceId:
      parsed.data.STRIPE_MARGINFLOW_MONTHLY_PRICE_ID,
    stripeMarginflowMonthlyPromoPriceId:
      parsed.data.STRIPE_MARGINFLOW_MONTHLY_PROMO_PRICE_ID,
    stripePriceMonthlyPlan:
      parsed.data.STRIPE_PRICE_MONTHLY_PLAN ??
      parsed.data.STRIPE_MARGINFLOW_MONTHLY_PROMO_PRICE_ID ??
      parsed.data.STRIPE_MARGINFLOW_MONTHLY_PRICE_ID,
    stripePriceSetupDeposit:
      parsed.data.STRIPE_PRICE_SETUP_DEPOSIT ??
      parsed.data.STRIPE_WEBSITE_SETUP_DEPOSIT_PRICE_ID,
    stripePriceSetupFinal:
      parsed.data.STRIPE_PRICE_SETUP_FINAL ??
      parsed.data.STRIPE_WEBSITE_FINAL_PAYMENT_PRICE_ID,
    stripeWebsiteSetupDepositPriceId:
      parsed.data.STRIPE_WEBSITE_SETUP_DEPOSIT_PRICE_ID,
    stripeWebsiteFinalPaymentPriceId:
      parsed.data.STRIPE_WEBSITE_FINAL_PAYMENT_PRICE_ID,
    stripeMarginflowTrialDays:
      (() => {
        const days = Number(parsed.data.STRIPE_MARGINFLOW_TRIAL_DAYS ?? "14");
        return Number.isFinite(days) && days > 0 ? days : 14;
      })(),
  };

  return cachedEnv;
}

export const env = new Proxy({} as EnvShape, {
  get(_target, prop: string) {
    return getEnv()[prop as keyof EnvShape];
  },
}) as EnvShape;

export type ZifferaEnv = EnvShape;
