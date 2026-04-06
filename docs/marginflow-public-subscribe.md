# MarginFlow Public Subscribe Flow

This repo now exposes a public, production-minded MarginFlow trial flow.

## Public routes

- `/marginflow` - premium product landing page with pricing and trial details
- `/marginflow/subscribe` - checkout form
- `/marginflow/subscribe/success` - post-checkout success page
- `/api/marginflow/subscribe` - server-side checkout creation endpoint

## Flow

1. A visitor opens `/marginflow` and clicks `Start free trial`.
2. The subscribe form posts `name`, `email`, and optional `company`.
3. Ziffera Core creates or reuses the client record.
4. Ziffera Core creates or reuses the Stripe customer.
5. Ziffera Core creates a Stripe Checkout Session using the MarginFlow promotional price and trial window.
6. The browser is redirected to Stripe.
7. Stripe webhooks sync the resulting subscription into the admin.
8. Ziffera sends the confirmation email from `support@ziffera.ie` when the email service is configured.

## Stripe mapping

- Product code: `marginflow`
- Promotional monthly price: `STRIPE_MARGINFLOW_MONTHLY_PROMO_PRICE_ID`
- Trial days: `STRIPE_MARGINFLOW_TRIAL_DAYS`

## Admin sync

Webhook handling updates:

- `clients`
- `stripe_customers`
- `subscriptions`
- `stripe_subscriptions`
- `payment_records`
- `email_events`
- `audit_logs`

## Deferred

- SSO across products
- direct public login provisioning for the other products
- any runtime logic changes in MarginFlow, Zconnect, or Work Hours Tracker
