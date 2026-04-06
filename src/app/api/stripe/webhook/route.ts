import { NextResponse } from "next/server";
import { getStripeClient } from "@/lib/core/stripe";
import { getEnv } from "@/lib/core/env";
import { processStripeWebhookEvent } from "@/lib/core/stripe-webhooks";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const env = getEnv();
  if (!env.stripeSecretKey || !env.stripeWebhookSecret) {
    return NextResponse.json(
      { error: "Stripe is not configured." },
      { status: 500 }
    );
  }

  const stripe = getStripeClient();
  if (!stripe) {
    return NextResponse.json(
      { error: "Stripe is not configured." },
      { status: 500 }
    );
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json(
      { error: "Missing Stripe signature." },
      { status: 400 }
    );
  }

  const body = await request.text();

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      env.stripeWebhookSecret
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Invalid Stripe webhook.";
    return NextResponse.json({ error: message }, { status: 400 });
  }

  try {
    const result = await processStripeWebhookEvent(event);
    return NextResponse.json({ ok: true, status: result.status }, { status: 200 });
  } catch (error) {
    console.error("Stripe webhook processing failed", error);
    return NextResponse.json(
      { error: "Failed to process Stripe webhook." },
      { status: 500 }
    );
  }
}

