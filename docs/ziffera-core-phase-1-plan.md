# Ziffera Core Phase 1 Plan

## Repository Inventory

### `camilovettori/ziffera`

- Next.js 16 App Router marketing site.
- Current surface area is mostly public pages, sections, and UI primitives.
- Existing backend work is limited to two route handlers:
  - `src/app/api/contact/route.ts`
  - `src/app/api/start-application/route.ts/route.ts` is present, but the path is malformed and should be verified before relying on it.
- No database layer, auth system, Stripe integration, or persistent admin backend is present in this repo today.

### `camilovettori/marginflow`

- Public repo README shows a Next.js / TypeScript / Tailwind app with a separate `backend/` and `frontend/`.
- Uses PostgreSQL via Neon.
- Has an authentication system and a dashboard in progress.
- Hosted on Vercel.

### `camilovettori/workhours-tracker`

- Public repo README shows a FastAPI backend and vanilla JS/PWA frontend.
- Uses SQLite.
- Has local persistence and is deployed on Render.
- This stack is materially different from the Next.js apps, so merging would be risky.

### `camilovettori/zconnect`

- Public repo README shows a split `backend/` + `frontend/` project.
- Frontend is Next.js / TypeScript / Tailwind.
- Backend is FastAPI.
- Uses PostgreSQL.
- README documents invoice synchronization, duplicate prevention, and sync history, which implies business logic that should not be rewritten casually.

### `camilovettori/frequency-framed`

- Public repo README shows a Next.js App Router app with API routes.
- Uses Supabase for PostgreSQL + auth.
- Uses Stripe webhooks and Resend.
- Has an admin panel, order persistence, and CMS features.
- This is the closest current reference for a production commerce stack, but it still should not be merged blindly into Ziffera.

## Key Architectural Findings

- The products are heterogeneous:
  - Next.js App Router with API routes
  - Next.js plus FastAPI
  - FastAPI plus vanilla JS PWA
  - Different auth and database strategies
- A forced modular monolith across all products would be high risk and would likely break product-specific behavior.
- The Ziffera repo is currently the least coupled and is the best place to introduce the central control plane.
- The commercial truth should live in Ziffera Core, while product apps keep their existing behavior until explicit adapters are added.

## Safest Phase-1 Architecture

### Recommendation

Choose a phased control-plane architecture:

1. Build `api.ziffera.ie` as the central Ziffera Core backend on Render.
2. Keep MarginFlow, Zconnect, and Work Hours Tracker running in their existing shapes for now.
3. Use Ziffera Core as the system of record for:
   - clients
   - subscriptions
   - Stripe customers/subscriptions
   - entitlements
   - service suspension state
   - payment records
   - email events
   - audit logs
4. Add only thin integration points to product apps when needed, instead of merging their codebases.
5. Defer SSO until after core billing and entitlement flows are stable and the product stacks have been inspected more deeply.

### Why this is safest

- It avoids rewriting three independently evolving codebases.
- It lets the business centralize billing and access control first.
- It minimizes route, auth, and deployment breakage.
- It preserves current branding and workflows in the products.

## Phase-1 Implementation Plan

### Step 1: Core foundation

- Add a central backend project structure in Ziffera for:
  - auth
  - clients
  - subscriptions
  - entitlements
  - Stripe webhooks
  - transactional emails
  - audit logging
- Add a clean env contract and sample env file.
- Add database schema/migrations for the core tables only.

### Step 2: Admin shell

- Create a premium admin/backoffice area inside Ziffera.
- Implement the dashboard, clients, subscriptions, payments, products, automations, and service controls as read/write screens against the new core models.

### Step 3: Billing and access

- Centralize Stripe customer/subscription creation in Ziffera Core.
- Model `paid in full`, `trial`, `overdue`, `suspended`, and `manual override` states in the core database.
- Keep product apps intact and let the core publish entitlements for them.

### Step 4: Product integration

- Add minimal integration hooks to product apps only where required.
- Prefer headers/tokens/redirects over deep code changes.
- Do not attempt a full shared-login rollout until the core access model is stable.

### Step 5: Deployment and routing

- `ziffera.ie` stays on Vercel.
- `api.ziffera.ie` becomes the core backend on Render.
- Product subdomains should be prepared for future unified routing, but should not be force-migrated in phase 1 if that introduces risk.

## Immediate Risks To Watch

- Stripe webhooks need retry-safe idempotency.
- Cross-subdomain auth can become fragile if attempted too early.
- Existing product auth models are different, so SSO should be staged.
- Product-specific database schemas should not be touched until a clear adapter strategy exists.

## Decision

Phase 1 should be a transitional control plane, not a forced monolith.

- Best fit: option C with elements of B
- Keep products mostly intact
- Centralize commercial truth in Ziffera Core
- Add SSO later only if the actual codebase structures make it safe
