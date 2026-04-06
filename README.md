This is the Ziffera institutional site plus the first Ziffera Core foundation work.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Ziffera Core foundation

The repo now includes the first control-plane scaffolding for the future
admin backend:

- database schema under `migrations/`
- server-side Postgres access in `src/lib/core/`
- protected admin auth at `/admin`
- a local bootstrap seed script for the first owner admin

### Stripe foundation

The control plane now understands Stripe subscriptions safely in an internal-first mode:

- central product-to-price mapping in `src/lib/core/stripe.ts`
- Stripe webhook ingestion at `/api/stripe/webhook`
- subscription and payment record sync in `src/lib/core/subscriptions.ts`
- admin-only Stripe customer creation and manual sync actions

### MarginFlow public trial flow

MarginFlow is now subscribable from the public site via:

- `/marginflow`
- `/marginflow/subscribe`
- `/marginflow/subscribe/success`
- `/api/marginflow/subscribe`

The flow creates or reuses the client record, creates or reuses the Stripe customer, then routes the visitor into the promotional Stripe checkout flow with a 14-day free trial.

### Deployment architecture

See [docs/ziffera-core-deployment-architecture.md](docs/ziffera-core-deployment-architecture.md) for the current Render and subdomain plan.

### Environment setup

Copy `.env.example` to `.env.local` and set at least:

- `DATABASE_URL`
- `SESSION_SECRET`
- `ZIFFERA_BOOTSTRAP_ADMIN_EMAIL`
- `ZIFFERA_BOOTSTRAP_ADMIN_PASSWORD`

For Stripe foundation work, also set:

- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `STRIPE_MARGINFLOW_MONTHLY_PRICE_ID`
- `STRIPE_MARGINFLOW_MONTHLY_PROMO_PRICE_ID`
- `STRIPE_MARGINFLOW_PRODUCT_ID` if you already have a Stripe product record

### Database commands

```bash
npm run db:migrate
npm run db:seed:admin
```

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
