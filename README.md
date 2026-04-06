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

The site now uses Stripe embedded checkout inside the Ziffera pages for the main payment flow:

- normalized price mapping in `src/lib/site-checkout.ts`
- embedded checkout inside `/checkout/[flow]`
- recurring monthly checkout plus one-time payment flows
- graceful success and cancel states inside the site
- no webhook handling in this phase

### Public checkout flow

The primary site checkout routes are:

- `/checkout/monthly`
- `/checkout/monthly/success`
- `/checkout/monthly/cancel`
- `/checkout/setup-deposit`
- `/checkout/setup-deposit/success`
- `/checkout/setup-deposit/cancel`
- `/checkout/setup-final`
- `/checkout/setup-final/success`
- `/checkout/setup-final/cancel`
- `/api/checkout/monthly`
- `/api/checkout/setup-deposit`
- `/api/checkout/setup-final`

The primary flow captures the customer details on-site, creates a Stripe customer, then loads the embedded checkout inside the Ziffera page.

### Deployment architecture

See [docs/ziffera-core-deployment-architecture.md](docs/ziffera-core-deployment-architecture.md) for the current Render and subdomain plan.

### Environment setup

Copy `.env.example` to `.env.local` and set at least:

- `DATABASE_URL`
- `SESSION_SECRET`
- `ZIFFERA_BOOTSTRAP_ADMIN_EMAIL`
- `ZIFFERA_BOOTSTRAP_ADMIN_PASSWORD`

For Stripe foundation work, also set:

- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `STRIPE_SECRET_KEY`
- `STRIPE_PRICE_MONTHLY_PLAN`
- `STRIPE_PRICE_SETUP_DEPOSIT`
- `STRIPE_PRICE_SETUP_FINAL`

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
