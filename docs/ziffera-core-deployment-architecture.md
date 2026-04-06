# Ziffera Core Deployment Architecture

## Recommendation

Ziffera Core should be the official commercial and operational control plane.
The product runtimes should remain separate for now, with access and billing
driven centrally from `api.ziffera.ie`.

### Keep separate for now

- MarginFlow frontend and runtime
- Zconnect frontend and runtime
- Work Hours Tracker app/backend
- Public Ziffera institutional site on Vercel

### Centralize now

- clients
- subscriptions
- entitlements
- payment records
- Stripe customer/subscription state
- service status and suspension control
- audit logs
- email events

### Best future consolidation candidate

Zconnect is the safest later consolidation candidate because it already behaves
like a service boundary product and is more integration-oriented than the other
products.

## Official deployment map

- `ziffera.ie` -> public institutional site on Vercel
- `api.ziffera.ie` -> Ziffera Core backend on Render
- `marginflow.ziffera.ie` -> MarginFlow frontend
- `zconnect.ziffera.ie` -> Zconnect frontend
- `workhourstracker.ziffera.ie` -> Work Hours Tracker app

## Current mapping

At this stage, the products still operate as separate runtimes. Ziffera Core
stores the target URLs and operational state so the admin can manage them
without forcing a merge.

## DNS checklist

- Create a DNS record for `api.ziffera.ie` pointing at the Render backend.
- Keep product subdomains on their current hosting until runtime integration is
  intentionally planned and tested.
- Make sure each product subdomain has a single canonical origin.
- If cookies are ever shared across subdomains, set the cookie domain and
  same-site policy deliberately and test cross-subdomain behaviour carefully.
- Keep CORS allow-lists explicit. Only allow the exact production origins that
  need to call the API.

## Render consolidation plan

### Stay separate now

- Separate product runtimes
- Central control plane on Render

### Future step if consolidation becomes safe

- Move product-specific server logic behind the control plane only after
  authentication, entitlements, and access enforcement are stable.
- Fold the easiest product boundary first, likely Zconnect.
- Keep public-facing customer flows isolated until the migration can be
  rehearsed and validated.

### Risks of forcing it early

- Broken product workflows
- Auth/session regressions
- Unclear ownership of billing truth
- Harder rollback if a single merged deployment fails
- Accidental coupling between product UI and commercial control plane

## Operational note

The admin should treat product connections as explicit records, not implicit
assumptions. That keeps the system honest while the ecosystem remains mixed.
