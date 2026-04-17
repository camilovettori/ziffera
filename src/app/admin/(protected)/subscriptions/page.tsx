import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { listClients, listProducts } from "@/lib/core/admin-data";
import { listSubscriptions } from "@/lib/core/subscriptions";

export const dynamic = "force-dynamic";

type SearchParams = {
  q?: string;
  status?: string;
  clientId?: string;
  productId?: string;
};

export default async function SubscriptionsPage({
  searchParams,
}: {
  searchParams?: Promise<SearchParams>;
}) {
  const params = (await searchParams) ?? {};
  const [subscriptions, clients, products] = await Promise.all([
    listSubscriptions(params),
    listClients(),
    listProducts(),
  ]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <Badge>Subscriptions</Badge>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.06em] text-slate-950">
            Subscription control plane
          </h1>
          <p className="mt-3 text-base leading-8 text-slate-600">
            A careful, internal-first view of recurring billing state, Stripe
            references, and subscription-linked entitlements.
          </p>
        </div>
        <div className="rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-slate-700">
          This section is read-only first. Public charges remain deferred.
        </div>
      </div>

      <Card className="border-slate-200/80 bg-white shadow-[0_18px_46px_rgba(15,23,42,0.06)]">
        <CardHeader>
          <CardDescription className="text-[10px] uppercase tracking-[0.28em] text-slate-500">
            Filters
          </CardDescription>
          <CardTitle className="text-2xl tracking-[-0.05em]">
            Search subscriptions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form method="get" className="grid gap-4 lg:grid-cols-[1.3fr_0.7fr_0.7fr_0.7fr_auto]">
            <Field label="Search" name="q" placeholder="Client, product, Stripe ID" defaultValue={params.q ?? ""} />
            <SelectField
              label="Status"
              name="status"
              defaultValue={params.status ?? ""}
              options={[
                ["", "All statuses"],
                ["trialing", "Trialing"],
                ["active", "Active"],
                ["past_due", "Past due"],
                ["paused", "Paused"],
                ["canceled", "Canceled"],
                ["incomplete", "Incomplete"],
                ["manual_override", "Manual override"],
              ]}
            />
            <SelectField
              label="Client"
              name="clientId"
              defaultValue={params.clientId ?? ""}
              options={[["", "All clients"], ...clients.map((client) => [client.id, client.name] as [string, string])]}
            />
            <SelectField
              label="Product"
              name="productId"
              defaultValue={params.productId ?? ""}
              options={[["", "All products"], ...products.map((product) => [product.id, product.displayName] as [string, string])]}
            />
            <div className="flex items-end">
              <button className="inline-flex h-12 items-center justify-center rounded-2xl bg-slate-950 px-5 text-sm font-semibold text-white transition hover:bg-slate-800">
                Apply
              </button>
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="grid gap-6 xl:grid-cols-[1.02fr_0.98fr]">
        <Card className="border-slate-200/80 bg-white shadow-[0_18px_46px_rgba(15,23,42,0.06)]">
          <CardHeader>
            <CardDescription className="text-[10px] uppercase tracking-[0.28em] text-slate-500">
              Registry
            </CardDescription>
            <CardTitle className="text-2xl tracking-[-0.05em]">
              Current subscriptions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {subscriptions.length ? (
              subscriptions.map((subscription) => (
                <Link
                  key={subscription.id}
                  href={`/admin/subscriptions/${subscription.id}`}
                  className="block rounded-[1.4rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] px-4 py-4 transition hover:border-blue-200 hover:shadow-[0_14px_30px_rgba(15,23,42,0.06)]"
                >
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <div className="text-sm font-medium text-slate-950">
                        {subscription.clientName} / {subscription.productName}
                      </div>
                      <div className="mt-1 flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.22em] text-slate-500">
                        <span>{subscription.status}</span>
                        <span>{subscription.billing_interval}</span>
                        <span>
                          {(subscription.amount_cents / 100).toFixed(2)} {subscription.currency}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.2em]">
                      <Pill tone={pillToneForStatus(subscription.status)} label={subscription.status} />
                      {subscription.cancel_at_period_end ? <Pill tone="amber" label="Cancel at period end" /> : null}
                      {subscription.stripe_subscription_id ? <Pill tone="slate" label="Stripe linked" /> : null}
                    </div>
                  </div>

                  <div className="mt-3 grid gap-2 text-sm leading-6 text-slate-600 sm:grid-cols-2">
                    <Info label="Trial" value={formatRange(subscription.trial_start_at, subscription.trial_end_at)} />
                    <Info label="Billing period" value={formatRange(subscription.current_period_start_at, subscription.current_period_end_at)} />
                    <Info label="Stripe customer" value={subscription.stripe_customer_id ?? "Not linked"} />
                    <Info label="Stripe subscription" value={subscription.stripe_subscription_id ?? "Not linked"} />
                  </div>
                </Link>
              ))
            ) : (
              <div className="rounded-[1.4rem] border border-slate-200 bg-slate-50 px-4 py-5 text-sm text-slate-600">
                No subscriptions matched the current filters.
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-slate-200/80 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] shadow-[0_18px_46px_rgba(15,23,42,0.06)]">
          <CardHeader>
            <CardDescription className="text-[10px] uppercase tracking-[0.28em] text-slate-500">
              Operational note
            </CardDescription>
            <CardTitle className="text-2xl tracking-[-0.05em]">
              Safe Stripe foundation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm leading-7 text-slate-600">
            <div className="rounded-[1.4rem] border border-slate-200 bg-white px-4 py-4">
              Admin can manually create or link a Stripe customer, then sync a
              subscription from Stripe without exposing a public checkout flow.
            </div>
            <div className="rounded-[1.4rem] border border-slate-200 bg-white px-4 py-4">
              Product mapping is centralised in the core Stripe config, not
              scattered through the UI.
            </div>
            <div className="rounded-[1.4rem] border border-slate-200 bg-white px-4 py-4">
              Trial dates, billing periods, and payment records are stored in
              the core database for auditability.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  placeholder,
  defaultValue,
}: {
  label: string;
  name: string;
  placeholder: string;
  defaultValue: string;
}) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] uppercase tracking-[0.24em] text-slate-500">
        {label}
      </label>
      <input
        name={name}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-300 focus:ring-4 focus:ring-blue-100"
      />
    </div>
  );
}

function SelectField({
  label,
  name,
  defaultValue,
  options,
}: {
  label: string;
  name: string;
  defaultValue: string;
  options: [string, string][];
}) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] uppercase tracking-[0.24em] text-slate-500">
        {label}
      </label>
      <select
        name={name}
        defaultValue={defaultValue}
        className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-blue-300 focus:ring-4 focus:ring-blue-100"
      >
        {options.map(([value, labelText]) => (
          <option key={`${name}-${value}`} value={value}>
            {labelText}
          </option>
        ))}
      </select>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3">
      <div className="text-[10px] uppercase tracking-[0.22em] text-slate-500">
        {label}
      </div>
      <div className="mt-1 text-sm text-slate-700">{value}</div>
    </div>
  );
}

function Pill({
  tone,
  label,
}: {
  tone: "emerald" | "amber" | "rose" | "slate";
  label: string;
}) {
  const classes: Record<"emerald" | "amber" | "rose" | "slate", string> = {
    emerald: "border-emerald-200 bg-emerald-50 text-emerald-700",
    amber: "border-amber-200 bg-amber-50 text-amber-700",
    rose: "border-rose-200 bg-rose-50 text-rose-700",
    slate: "border-slate-200 bg-slate-50 text-slate-700",
  };

  return (
    <span className={`inline-flex rounded-full border px-3 py-1.5 ${classes[tone]}`}>
      {label}
    </span>
  );
}

function pillToneForStatus(status: string) {
  switch (status) {
    case "active":
    case "trialing":
      return "emerald";
    case "past_due":
    case "incomplete":
      return "amber";
    case "paused":
    case "canceled":
      return "rose";
    default:
      return "slate";
  }
}

function formatRange(start: string | null, end: string | null) {
  if (!start && !end) {
    return "Not set";
  }

  if (!start) {
    return `Ends ${new Date(end as string).toLocaleString()}`;
  }

  if (!end) {
    return `Starts ${new Date(start).toLocaleString()}`;
  }

  return `${new Date(start).toLocaleDateString()} to ${new Date(end).toLocaleDateString()}`;
}
