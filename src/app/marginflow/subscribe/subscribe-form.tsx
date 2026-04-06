"use client";

import { EmbeddedCheckoutFlow } from "@/components/checkout/embedded-checkout-flow";

export function SubscribeForm() {
  return (
    <EmbeddedCheckoutFlow
      apiPath="/api/marginflow/subscribe"
      successHref="/marginflow/subscribe/success"
      cancelHref="/marginflow/subscribe/cancel"
      supportEmail="support@ziffera.ie"
      buttonLabel="Start free trial"
      checkoutCopy="Stripe checkout will load inside this page once your details are confirmed."
      bullets={[
        "EUR 25/month promotional pricing",
        "14-day free trial",
        "Managed by Ziffera Core",
      ]}
    />
  );
}
