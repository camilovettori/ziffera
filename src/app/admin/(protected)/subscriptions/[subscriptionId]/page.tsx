import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { listProducts } from "@/lib/core/admin-data";
import { getSubscriptionById } from "@/lib/core/subscriptions";
import {
  createStripeCustomerAction,
  syncSubscriptionFromStripeAction,
  updateSubscriptionAction,
} from "../actions";

export const dynamic = "force-dynamic";

export default async function SubscriptionDetailPage({
  params,
}: {
  params: Promise<{ subscriptionId: string }>;
}) {
  const { subscriptionId } = await params;
  const [subscription, products] = await Promise.all([
    getSubscriptionById(subscriptionId),
    listProducts(),
  ]);

  if (!subscription) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <Badge>{subscription.status}</Badge>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.06em] text-slate-950">
            {subscription.clientName} / {subscription.productName}
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-8 text-slate-600">
            Subscription detail with Stripe references, trial dates, and manual
            internal controls.
          </p>
        </div>
        <Link
          href="/admin/subscriptions"
          className="inline-flex w-fit items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-300"
        >
          Back to subscriptions
        </Link>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.03fr_0.97fr]">
        <Card className="border-slate-200/80 bg-white shadow-[0_18px_46px_rgba(15,23,42,0.06)]">
          <CardHeader>
            <CardDescription className="text-[10px] uppercase tracking-[0.28em] text-slate-500">
              Core record
            </CardDescription>
            <CardTitle className="text-2xl tracking-[-0.05em]">
              Edit subscription
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form action={updateSubscriptionAction} className="space-y-4">
              <input type="hidden" name="subscriptionId" value={subscription.id} />
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Name" name="subscriptionName" defaultValue={subscription.subscription_name ?? ""} />
                <Field label="Amount cents" name="amountCents" type="number" defaultValue={String(subscription.amount_cents)} />
                <Field label="Currency" name="currency" defaultValue={subscription.currency} />
                <SelectField
                  label="Billing interval"
                  name="billingInterval"
                  defaultValue={subscription.billing_interval}
                  options={[
                    ["month", "Monthly"],
                    ["year", "Yearly"],
                  ]}
                />
              </div>

              <SelectField
                label="Status"
                name="status"
                defaultValue={subscription.status}
                options={[
                  ["trialing", "Trialing"],
                  ["active", "Active"],
                  ["past_due", "Past due"],
                  ["paused", "Paused"],
                  ["canceled", "Canceled"],
                  ["incomplete", "Incomplete"],
                  ["manual_override", "Manual override"],
                ]}
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Trial start" name="trialStartAt" type="datetime-local" defaultValue={toLocalDateTime(subscription.trial_start_at)} />
                <Field label="Trial end" name="trialEndAt" type="datetime-local" defaultValue={toLocalDateTime(subscription.trial_end_at)} />
                <Field label="Current period start" name="currentPeriodStartAt" type="datetime-local" defaultValue={toLocalDateTime(subscription.current_period_start_at)} />
                <Field label="Current period end" name="currentPeriodEndAt" type="datetime-local" defaultValue={toLocalDateTime(subscription.current_period_end_at)} />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Stripe customer ID" name="stripeCustomerId" defaultValue={subscription.stripe_customer_id ?? ""} />
                <Field label="Stripe subscription ID" name="stripeSubscriptionId" defaultValue={subscription.stripe_subscription_id ?? ""} />
                <Field label="Stripe price ID" name="stripePriceId" defaultValue={subscription.stripe_price_id ?? ""} />
                <Field label="Stripe product ID" name="stripeProductId" defaultValue={subscription.stripe_product_id ?? ""} />
                <Field label="Latest invoice ID" name="stripeLatestInvoiceId" defaultValue={subscription.stripe_latest_invoice_id ?? ""} />
                <Field label="Latest invoice status" name="stripeLatestInvoiceStatus" defaultValue={subscription.stripe_latest_invoice_status ?? ""} />
                <Field label="Raw Stripe status" name="stripeStatusRaw" defaultValue={subscription.stripe_status_raw ?? ""} />
                <Field label="Manual override status" name="manualOverrideStatus" defaultValue={subscription.manual_override_status ?? ""} />
              </div>

              <label className="flex items-center gap-2 text-sm text-slate-600">
                <input
                  type="checkbox"
                  name="cancelAtPeriodEnd"
                  defaultChecked={subscription.cancel_at_period_end}
                  className="h-4 w-4 rounded border-slate-300"
                />
                Cancel at period end
              </label>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.24em] text-slate-500">
                  Notes
                </label>
                <textarea
                  name="notes"
                  rows={4}
                  defaultValue={subscription.notes ?? ""}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-300 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <button className="inline-flex h-12 items-center justify-center rounded-2xl bg-slate-950 px-5 text-sm font-semibold text-white transition hover:bg-slate-800">
                Save subscription
              </button>
            </form>
          </CardContent>
        </Card>

        <Card className="border-slate-200/80 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] shadow-[0_18px_46px_rgba(15,23,42,0.06)]">
          <CardHeader>
            <CardDescription className="text-[10px] uppercase tracking-[0.28em] text-slate-500">
              Stripe sync
            </CardDescription>
            <CardTitle className="text-2xl tracking-[-0.05em]">
              Internal-only controls
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <form action={createStripeCustomerAction} className="space-y-3 rounded-[1.4rem] border border-slate-200 bg-white p-4">
              <input type="hidden" name="subscriptionId" value={subscription.id} />
              <div className="text-sm leading-6 text-slate-600">
                Create or link a Stripe customer for this client, then store the
                Stripe customer ID in the core.
              </div>
              <button className="inline-flex h-11 items-center justify-center rounded-2xl border border-slate-200 bg-slate-950 px-5 text-sm font-semibold text-white transition hover:bg-slate-800">
                Create Stripe customer
              </button>
            </form>

            <form action={syncSubscriptionFromStripeAction} className="space-y-3 rounded-[1.4rem] border border-slate-200 bg-white p-4">
              <input type="hidden" name="subscriptionId" value={subscription.id} />
              <div className="text-sm leading-6 text-slate-600">
                Pull the latest state from Stripe and update the core records
                without exposing public checkout flows.
              </div>
              <button className="inline-flex h-11 items-center justify-center rounded-2xl border border-blue-200 bg-blue-50 px-5 text-sm font-semibold text-blue-700 transition hover:bg-blue-100">
                Sync from Stripe
              </button>
            </form>

            <div className="grid gap-3">
              <MetaRow label="Client" value={subscription.clientName} />
              <MetaRow label="Billing status" value={subscription.clientBillingStatus} />
              <MetaRow label="Service status" value={subscription.clientServiceStatus} />
              <MetaRow label="Stripe customer" value={subscription.stripe_customer_id ?? "Not linked"} />
              <MetaRow label="Stripe subscription" value={subscription.stripe_subscription_id ?? "Not linked"} />
              <MetaRow label="Stripe price" value={subscription.stripe_price_id ?? "Not linked"} />
              <MetaRow label="Stripe product" value={subscription.stripe_product_id ?? "Not linked"} />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.92fr_1.08fr]">
        <Card className="border-slate-200/80 bg-white shadow-[0_18px_46px_rgba(15,23,42,0.06)]">
          <CardHeader>
            <CardDescription className="text-[10px] uppercase tracking-[0.28em] text-slate-500">
              Entitlement
            </CardDescription>
            <CardTitle className="text-2xl tracking-[-0.05em]">
              Access state
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm leading-7 text-slate-600">
            {subscription.entitlement ? (
              <div className="rounded-[1.4rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] px-4 py-4">
                <div className="text-sm font-medium text-slate-950">
                  {subscription.entitlement.entitlement_status}
                </div>
                <div className="text-xs uppercase tracking-[0.22em] text-slate-500">
                  {subscription.entitlement.access_source}
                </div>
                <div className="mt-2 text-sm text-slate-600">
                  Linked to this subscription record.
                </div>
              </div>
            ) : (
              <div className="rounded-[1.4rem] border border-slate-200 bg-slate-50 px-4 py-5 text-sm text-slate-600">
                No entitlement row is linked yet.
              </div>
            )}

            <div className="rounded-[1.4rem] border border-slate-200 bg-slate-50 px-4 py-4">
              Access and billing are intentionally separate. A client can keep
              access history even when billing changes.
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200/80 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] shadow-[0_18px_46px_rgba(15,23,42,0.06)]">
          <CardHeader>
            <CardDescription className="text-[10px] uppercase tracking-[0.28em] text-slate-500">
              Payment history
            </CardDescription>
            <CardTitle className="text-2xl tracking-[-0.05em]">
              Recent payment records
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {subscription.payments.length ? (
              subscription.payments.map((payment) => (
                <div
                  key={payment.id}
                  className="rounded-[1.4rem] border border-slate-200 bg-white px-4 py-4"
                >
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <div className="text-sm font-medium text-slate-950">
                        {(payment.amount_cents / 100).toFixed(2)} {payment.currency}
                      </div>
                      <div className="text-xs uppercase tracking-[0.22em] text-slate-500">
                        {payment.payment_status} · {payment.payment_kind}
                      </div>
                    </div>
                    <div className="text-xs text-slate-500">
                      {payment.paid_at ? new Date(payment.paid_at).toLocaleString() : new Date(payment.created_at).toLocaleString()}
                    </div>
                  </div>
                  <div className="mt-2 text-sm leading-6 text-slate-600">
                    {payment.description || "Payment record"}
                  </div>
                </div>
              ))
            ) : (
              <div className="rounded-[1.4rem] border border-slate-200 bg-slate-50 px-4 py-5 text-sm text-slate-600">
                No payment records yet.
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="border-slate-200/80 bg-white shadow-[0_18px_46px_rgba(15,23,42,0.06)]">
        <CardHeader>
          <CardDescription className="text-[10px] uppercase tracking-[0.28em] text-slate-500">
            Product mapping
          </CardDescription>
          <CardTitle className="text-2xl tracking-[-0.05em]">
            Subscription product
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <div
              key={product.id}
              className={`rounded-[1.4rem] border px-4 py-4 ${
                product.id === subscription.product_id
                  ? "border-blue-200 bg-blue-50"
                  : "border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)]"
              }`}
            >
              <div className="text-sm font-medium text-slate-950">{product.name}</div>
              <div className="mt-1 text-xs uppercase tracking-[0.22em] text-slate-500">
                {product.code}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

function Field({
  label,
  name,
  defaultValue,
  type = "text",
}: {
  label: string;
  name: string;
  defaultValue: string;
  type?: string;
}) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] uppercase tracking-[0.24em] text-slate-500">
        {label}
      </label>
      <input
        name={name}
        type={type}
        defaultValue={defaultValue}
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

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3">
      <div className="text-[10px] uppercase tracking-[0.22em] text-slate-500">
        {label}
      </div>
      <div className="mt-1 text-sm text-slate-700">{value}</div>
    </div>
  );
}

function toLocalDateTime(value: string | null) {
  if (!value) {
    return "";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const offsetMs = date.getTimezoneOffset() * 60_000;
  return new Date(date.getTime() - offsetMs).toISOString().slice(0, 16);
}
