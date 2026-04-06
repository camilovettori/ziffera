import "server-only";

import Stripe from "stripe";
import { getEnv } from "@/lib/core/env";

export type StripeCatalogEntry = {
  productCode: string;
  productName: string;
  stripeProductId?: string;
  monthlyPriceId?: string;
  monthlyPromoPriceId?: string;
  trialDays: number;
};

function cleanId(value: string | undefined) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

export function getStripeClient() {
  const env = getEnv();
  if (!env.stripeSecretKey) {
    return null;
  }

  return new Stripe(env.stripeSecretKey);
}

export function getStripeCatalog(): StripeCatalogEntry[] {
  const env = getEnv();

  return [
    {
      productCode: "marginflow",
      productName: "MarginFlow",
      stripeProductId: cleanId(env.stripeMarginflowProductId),
      monthlyPriceId:
        cleanId(env.stripePriceMonthlyPlan) ??
        cleanId(env.stripeMarginflowMonthlyPriceId),
      monthlyPromoPriceId:
        cleanId(env.stripePriceMonthlyPlan) ??
        cleanId(env.stripeMarginflowMonthlyPromoPriceId) ??
        cleanId(env.stripeMarginflowMonthlyPriceId),
      trialDays: env.stripeMarginflowTrialDays,
    },
  ];
}

export function getStripeCatalogEntryByProductCode(
  productCode: string
): StripeCatalogEntry | null {
  return (
    getStripeCatalog().find((entry) => entry.productCode === productCode) ??
    null
  );
}

export function resolveStripeProductCodeFromPriceId(
  priceId?: string | null
): string | null {
  const normalizedPriceId = cleanId(priceId ?? undefined);
  if (!normalizedPriceId) {
    return null;
  }

  const entry = getStripeCatalog().find(
    (catalogEntry) =>
      catalogEntry.monthlyPriceId === normalizedPriceId ||
      catalogEntry.monthlyPromoPriceId === normalizedPriceId
  );

  return entry?.productCode ?? null;
}

export function resolveStripeProductCodeFromProductId(
  stripeProductId?: string | null
): string | null {
  const normalizedProductId = cleanId(stripeProductId ?? undefined);
  if (!normalizedProductId) {
    return null;
  }

  const entry = getStripeCatalog().find(
    (catalogEntry) => catalogEntry.stripeProductId === normalizedProductId
  );

  return entry?.productCode ?? null;
}

export function normalizeStripeTimestamp(
  value?: number | null
): string | null {
  if (typeof value !== "number" || !Number.isFinite(value) || value <= 0) {
    return null;
  }

  return new Date(value * 1000).toISOString();
}

export function normalizeStripeStatus(status?: string | null) {
  if (!status) {
    return "manual_override";
  }

  switch (status) {
    case "trialing":
    case "active":
    case "past_due":
    case "paused":
    case "canceled":
    case "incomplete":
    case "manual_override":
      return status;
    case "incomplete_expired":
      return "canceled";
    default:
      return "manual_override";
  }
}

export function normalizeStripePaymentStatus(status?: string | null) {
  switch (status) {
    case "paid":
      return "paid";
    case "void":
      return "void";
    case "uncollectible":
    case "failed":
      return "failed";
    case "draft":
    case "open":
    case "deleted":
    default:
      return "pending";
  }
}

export function getStripeTrialDaysForProductCode(productCode: string) {
  const entry = getStripeCatalogEntryByProductCode(productCode);
  return entry?.trialDays ?? 14;
}
