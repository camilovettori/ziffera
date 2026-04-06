# Ziffera Core Phase 4 - Stripe Foundation

This phase keeps billing internal-first. Public checkout and the MarginFlow
subscribe CTA remain deferred.

## What is active now

- Stripe subscription data can be stored on `subscriptions`
- Stripe mirror rows live in `stripe_customers` and `stripe_subscriptions`
- webhook events are recorded in `stripe_webhook_events`
- payment records can be synced from Stripe invoices or checkout sessions
- admin operators can create a Stripe customer or sync a subscription from Stripe

## Required environment variables

- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `STRIPE_MARGINFLOW_PRODUCT_ID`
- `STRIPE_MARGINFLOW_MONTHLY_PRICE_ID`
- `STRIPE_MARGINFLOW_MONTHLY_PROMO_PRICE_ID`
- `STRIPE_MARGINFLOW_TRIAL_DAYS`

## Product and price mapping

The central mapping lives in `src/lib/core/stripe.ts`.

For now the catalog is:

- MarginFlow
  - monthly promotional plan: `25 EUR / month`
  - free trial: `14 days`

The mapping is environment-driven so the Stripe IDs can be changed without
editing UI code.

## Webhook setup

1. Create a Stripe webhook endpoint pointing at:
   - `https://api.ziffera.ie/api/stripe/webhook`
2. Subscribe the endpoint to:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.paid`
   - `invoice.payment_failed`
3. Copy the signing secret into `STRIPE_WEBHOOK_SECRET`.

## Trial representation

Trial dates are stored on:

- `subscriptions.trial_start_at`
- `subscriptions.trial_end_at`
- `stripe_subscriptions.trial_start_at`
- `stripe_subscriptions.trial_end_at`

The core subscription status is normalized separately from the raw Stripe
status so the admin panel can stay trustworthy even if Stripe returns a
different event order.

## Local testing

- Use the Stripe CLI to forward test events to the webhook endpoint.
- Run `npm run db:migrate` before testing the subscription screens.
- Use the admin panel to create or link a Stripe customer, then sync from
  Stripe to verify state propagation.

## Intentionally deferred

- Public MarginFlow subscribe CTA
- automatic public checkout
- SSO across products
- product runtime changes in MarginFlow, Zconnect, and Work Hours Tracker
- production email delivery templates for billing

