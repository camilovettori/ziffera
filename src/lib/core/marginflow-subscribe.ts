import "server-only";

import { query } from "@/lib/core/db";
import { writeAuditLog } from "@/lib/core/admin-data";
import type { SubscriptionRecord } from "@/lib/core/models";
import {
  createEmbeddedCheckoutSessionForClient,
  createOrLinkClientForEmbeddedCheckout,
  createOrLinkStripeCustomerForClient,
} from "@/lib/core/embedded-checkout";
import { sendMarginFlowConfirmationEmail } from "@/lib/core/emails";

export async function findExistingMarginFlowSubscription(clientId: string) {
  const result = await query<SubscriptionRecord>(
    `SELECT s.*
     FROM subscriptions s
     INNER JOIN products p ON p.id = s.product_id
     WHERE s.client_id = $1
       AND p.code = 'marginflow'
       AND s.status IN ('trialing', 'active', 'past_due', 'paused', 'incomplete')
     ORDER BY s.created_at DESC
     LIMIT 1`,
    [clientId]
  );

  return result.rows[0] ?? null;
}

export async function prepareMarginFlowSubscription(input: {
  name: string;
  email: string;
  companyName?: string | null;
}) {
  const client = await createOrLinkClientForEmbeddedCheckout({
    flowSlug: "monthly",
    name: input.name,
    email: input.email,
    companyName: input.companyName ?? null,
  });
  const existingSubscription = await findExistingMarginFlowSubscription(client.id);

  if (existingSubscription) {
    return {
      alreadySubscribed: true,
      client,
      existingSubscription,
    };
  }

  const customer = await createOrLinkStripeCustomerForClient({
    client,
    email: input.email,
    companyName: input.companyName ?? null,
    source: "public_marginflow_subscribe",
  });

  const checkout = await createEmbeddedCheckoutSessionForClient({
    flowSlug: "monthly",
    client,
    email: input.email,
    companyName: input.companyName ?? null,
    stripeCustomerId: customer.stripeCustomerId,
  });

  await writeAuditLog({
    actorAdminId: null,
    action: "public.marginflow.subscribe.request",
    entityType: "client",
    entityId: client.id,
    afterData: client as unknown as Record<string, unknown>,
    metadata: {
      productCode: "marginflow",
      stripeCustomerId: customer.stripeCustomerId,
      checkoutSessionId: checkout.sessionId,
    },
  });

  const confirmation = await sendMarginFlowConfirmationEmail({
    clientId: client.id,
    toEmail: input.email,
    name: client.name,
    companyName: input.companyName ?? client.company_name ?? null,
    priceLabel: "EUR 25 / month",
    trialDays: checkout.definition.trialDays,
    productName: "MarginFlow",
    checkoutSessionId: checkout.sessionId,
  });

  return {
    alreadySubscribed: false,
    client,
    stripeCustomerId: customer.stripeCustomerId,
    checkoutSessionId: checkout.sessionId,
    clientSecret: checkout.clientSecret,
    emailConfirmationSent: confirmation.sent,
  };
}
