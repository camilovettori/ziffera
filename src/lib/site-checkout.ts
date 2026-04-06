import "server-only";

import crypto from "node:crypto";
import Stripe from "stripe";
import { env } from "@/lib/core/env";

export type SiteCheckoutFlowSlug = "monthly" | "setup-deposit" | "setup-final";
export type SiteCheckoutMode = "subscription" | "payment";

export type SiteCheckoutFlowDefinition = {
  slug: SiteCheckoutFlowSlug;
  title: string;
  mode: SiteCheckoutMode;
  priceId: string | undefined;
  priceLabel: string;
  successPath: string;
  cancelPath: string;
  trialDays: number;
};

export type SiteCheckoutSession = {
  definition: SiteCheckoutFlowDefinition;
  sessionId: string;
  clientSecret: string;
};

const MONTHLY_TRIAL_DAYS = 14;

function cleanId(value: string | undefined) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

function getStripeClient() {
  if (!env.stripeSecretKey) {
    return null;
  }

  return new Stripe(env.stripeSecretKey);
}

function buildIdempotencyKey(input: {
  prefix: string;
  payload: Record<string, string | number | null | undefined>;
}) {
  const canonicalPayload = JSON.stringify(
    Object.keys(input.payload)
      .sort()
      .reduce<Record<string, string | number>>((accumulator, key) => {
        const value = input.payload[key];
        accumulator[key] = value ?? "";
        return accumulator;
      }, {})
  );

  return `${input.prefix}:v1:${crypto
    .createHash("sha256")
    .update(canonicalPayload)
    .digest("hex")}`;
}

export function listSiteCheckoutFlows(): SiteCheckoutFlowDefinition[] {
  return [
    {
      slug: "monthly",
      title: "Ziffera Monthly Plan",
      mode: "subscription",
      priceId: cleanId(env.stripePriceMonthlyPlan),
      priceLabel: "€25 / month",
      successPath: "/checkout/monthly/success",
      cancelPath: "/checkout/monthly/cancel",
      trialDays: MONTHLY_TRIAL_DAYS,
    },
    {
      slug: "setup-deposit",
      title: "Website Setup Deposit",
      mode: "payment",
      priceId: cleanId(env.stripePriceSetupDeposit),
      priceLabel: "One-time deposit",
      successPath: "/checkout/setup-deposit/success",
      cancelPath: "/checkout/setup-deposit/cancel",
      trialDays: 0,
    },
    {
      slug: "setup-final",
      title: "Website Setup Final Payment",
      mode: "payment",
      priceId: cleanId(env.stripePriceSetupFinal),
      priceLabel: "One-time final payment",
      successPath: "/checkout/setup-final/success",
      cancelPath: "/checkout/setup-final/cancel",
      trialDays: 0,
    },
  ];
}

export function getSiteCheckoutFlowDefinition(
  slug: SiteCheckoutFlowSlug
): SiteCheckoutFlowDefinition {
  const definition = listSiteCheckoutFlows().find((entry) => entry.slug === slug);
  if (!definition) {
    throw new Error(`Unknown checkout flow: ${slug}`);
  }

  return definition;
}

export async function createSiteCheckoutSession(input: {
  slug: SiteCheckoutFlowSlug;
  name: string;
  email: string;
  company?: string | null;
}) {
  const stripe = getStripeClient();
  if (!stripe) {
    throw new Error("Stripe is not configured.");
  }

  const definition = getSiteCheckoutFlowDefinition(input.slug);
  if (!definition.priceId) {
    throw new Error(`${definition.title} is not configured.`);
  }

  const successUrl = `${env.appUrl.replace(/\/$/, "")}${definition.successPath}`;
  const cancelUrl = `${env.appUrl.replace(/\/$/, "")}${definition.cancelPath}`;
  const customerIdempotencyKey = buildIdempotencyKey({
    prefix: `ziffera-customer:${definition.slug}`,
    payload: {
      company: input.company ?? "",
      email: input.email,
      name: input.name,
      priceId: definition.priceId,
    },
  });

  const customer = await stripe.customers.create(
    {
      name: input.name,
      email: input.email,
      metadata: {
        company: input.company ?? "",
        checkout_flow: definition.slug,
        checkout_title: definition.title,
      },
    },
    {
      idempotencyKey: customerIdempotencyKey,
    }
  );

  const checkoutIdempotencyKey = buildIdempotencyKey({
    prefix: `ziffera-checkout:${definition.slug}`,
    payload: {
      cancelPath: cancelUrl,
      company: input.company ?? "",
      customerId: customer.id,
      email: input.email,
      mode: definition.mode,
      name: input.name,
      priceId: definition.priceId,
      successPath: successUrl,
      trialDays: definition.trialDays,
    },
  });

  const checkoutSession = await stripe.checkout.sessions.create(
    {
      mode: definition.mode,
      ui_mode: "embedded_page",
      redirect_on_completion: "never",
      customer: customer.id,
      client_reference_id: customer.id,
      line_items: [
        {
          price: definition.priceId,
          quantity: 1,
        },
      ],
      ...(definition.mode === "subscription"
        ? {
            subscription_data: {
              trial_period_days: definition.trialDays,
              metadata: {
                checkout_flow: definition.slug,
                checkout_title: definition.title,
                customer_name: input.name,
                customer_email: input.email,
                company: input.company ?? "",
              },
            },
          }
        : {
            payment_intent_data: {
              metadata: {
                checkout_flow: definition.slug,
                checkout_title: definition.title,
                customer_name: input.name,
                customer_email: input.email,
                company: input.company ?? "",
              },
            },
          }),
      metadata: {
        checkout_flow: definition.slug,
        checkout_title: definition.title,
        customer_name: input.name,
        customer_email: input.email,
        company: input.company ?? "",
      },
    },
    {
      idempotencyKey: checkoutIdempotencyKey,
    }
  );

  if (!checkoutSession.client_secret) {
    throw new Error("Stripe checkout session did not return a client secret.");
  }

  return {
    definition,
    customerId: customer.id,
    sessionId: checkoutSession.id,
    clientSecret: checkoutSession.client_secret,
  };
}
