import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CopyButton } from "@/components/admin/copy-button";
import { getClientById, listProducts } from "@/lib/core/admin-data";
import {
  changeClientServiceStatusAction,
  refreshClientBillingAction,
  updateClientProfileAction,
} from "../actions";

export const dynamic = "force-dynamic";

export default async function ClientDetailPage({
  params,
}: {
  params: Promise<{ clientId: string }>;
}) {
  const { clientId } = await params;
  const [client, products] = await Promise.all([
    getClientById(clientId),
    listProducts(),
  ]);

  if (!client) {
    notFound();
  }

  const assignedProduct = client.assignedProduct;
  const latestPayment = client.payments[0] ?? null;
  const subscription = client.currentSubscription ?? null;
  const nextRenewalAt = subscription?.currentPeriodEndAt ?? subscription?.trialEndAt ?? null;
  const paymentLink = assignedProduct?.stripe_payment_link_url ?? null;

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <Badge>{client.client_type}</Badge>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.06em] text-slate-950">
            {client.name}
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Assigned product: {assignedProduct?.public_name ?? assignedProduct?.name ?? "Unassigned"}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Badge variant={client.billing_status === "overdue" ? "outline" : "secondary"}>
              Billing: {client.billing_status}
            </Badge>
            <Badge variant={client.service_status === "suspended" ? "outline" : "secondary"}>
              Service: {client.service_status}
            </Badge>
          </div>
        </div>
        <Link
          href="/admin/clients"
          className="inline-flex w-fit items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-300"
        >
          Back to clients
        </Link>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.08fr_0.92fr]">
        <Card className="border-slate-200/80 bg-white shadow-[0_18px_46px_rgba(15,23,42,0.06)]">
          <CardHeader>
            <CardDescription className="text-[10px] uppercase tracking-[0.28em] text-slate-500">
              Client profile
            </CardDescription>
            <CardTitle className="text-2xl tracking-[-0.05em]">
              Commercial record
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form action={updateClientProfileAction} className="space-y-5">
              <input type="hidden" name="clientId" value={client.id} />

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Name" name="name" defaultValue={client.name} />
                <Field label="Company" name="companyName" defaultValue={client.company_name ?? ""} />
                <Field label="Legal name" name="legalName" defaultValue={client.legal_name ?? ""} />
                <Field label="Website" name="websiteUrl" defaultValue={client.website_url ?? ""} />
                <Field label="Billing email" name="billingEmail" defaultValue={client.billing_email ?? ""} />
                <Field label="Support email" name="supportEmail" defaultValue={client.support_email ?? ""} />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <SelectField
                  label="Client type"
                  name="clientType"
                  defaultValue={client.client_type}
                  options={[
                    ["saas", "SaaS client"],
                    ["project", "Website project"],
                    ["mixed", "Mixed / custom system"],
                  ]}
                />
                <SelectField
                  label="Assigned product"
                  name="assignedProductId"
                  defaultValue={client.assigned_product_id ?? ""}
                  options={[
                    ["", "Unassigned"],
                    ...products.map((product) => [
                      product.id,
                      formatProductOption(product.displayName, product.amount_cents, product.currency, product.billing_interval, product.billing_type),
                    ] as [string, string]),
                  ]}
                />
                <SelectField
                  label="Billing status"
                  name="billingStatus"
                  defaultValue={client.billing_status}
                  options={[
                    ["none", "None"],
                    ["trial", "Trial"],
                    ["current", "Current"],
                    ["overdue", "Overdue"],
                    ["paid_in_full", "Paid in full"],
                  ]}
                />
              </div>

              <div className="rounded-[1.4rem] border border-slate-200 bg-slate-50 px-4 py-4 text-sm leading-7 text-slate-600">
                <div className="text-[10px] uppercase tracking-[0.22em] text-slate-500">
                  Current status
                </div>
                <div className="mt-1 flex flex-wrap gap-2">
                  <Badge variant={client.billing_status === "overdue" ? "outline" : "secondary"}>
                    Billing: {client.billing_status}
                  </Badge>
                  <Badge variant={client.service_status === "suspended" ? "outline" : "secondary"}>
                    Service: {client.service_status}
                  </Badge>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.24em] text-slate-500">
                  Internal notes
                </label>
                <textarea
                  name="internalNotes"
                  rows={5}
                  defaultValue={client.internal_notes ?? ""}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-300 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <button className="inline-flex h-12 items-center justify-center rounded-2xl bg-slate-950 px-5 text-sm font-semibold text-white transition hover:bg-slate-800">
                Save profile
              </button>
            </form>
          </CardContent>
        </Card>

        <Card className="border-slate-200/80 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] shadow-[0_18px_46px_rgba(15,23,42,0.06)]">
          <CardHeader>
            <CardDescription className="text-[10px] uppercase tracking-[0.28em] text-slate-500">
              Billing summary
            </CardDescription>
            <CardTitle className="text-2xl tracking-[-0.05em]">
              Commercial billing view
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <SummaryRow
              label="Assigned product"
              value={assignedProduct ? assignedProduct.public_name ?? assignedProduct.name : "Unassigned"}
            />
            <SummaryRow
              label="Current subscription"
              value={subscription
                ? `${subscription.status} - ${formatMoney(subscription.amountCents, subscription.currency)} / ${subscription.billingInterval}`
                : "No subscription linked yet"}
            />
            <SummaryRow
              label="Payment status"
              value={latestPayment
                ? `${latestPayment.payment_status} - ${formatMoney(latestPayment.amount_cents, latestPayment.currency)}`
                : "No payment records yet"}
            />
            <SummaryRow
              label="Last payment"
              value={latestPayment
                ? `${formatMoney(latestPayment.amount_cents, latestPayment.currency)} - ${formatDate(latestPayment.paid_at ?? latestPayment.created_at)}`
                : "No payment recorded"}
            />
            <SummaryRow
              label="Next renewal"
              value={nextRenewalAt ? formatDate(nextRenewalAt) : "Not scheduled"}
            />

            <div className="rounded-[1.4rem] border border-slate-200 bg-white px-4 py-4">
              <div className="text-[10px] uppercase tracking-[0.22em] text-slate-500">
                Payment link
              </div>
              <div className="mt-3 flex flex-wrap gap-3">
                {paymentLink ? (
                  <CopyButton value={paymentLink} label="Copy payment link" />
                ) : (
                  <div className="inline-flex items-center rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-500">
                    No payment link configured
                  </div>
                )}
                <form action={refreshClientBillingAction}>
                  <input type="hidden" name="clientId" value={client.id} />
                  <button className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50">
                    Refresh billing
                  </button>
                </form>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/admin/subscriptions"
                className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
              >
                Open subscriptions
              </Link>
              <Link
                href="/admin/payments"
                className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
              >
                Open payments
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-slate-200/80 bg-white shadow-[0_18px_46px_rgba(15,23,42,0.06)]">
        <CardHeader>
          <CardDescription className="text-[10px] uppercase tracking-[0.28em] text-slate-500">
            Service controls
          </CardDescription>
          <CardTitle className="text-2xl tracking-[-0.05em]">
            Suspend or reactivate
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form action={changeClientServiceStatusAction} className="space-y-4">
            <input type="hidden" name="clientId" value={client.id} />
            <div className="grid gap-4 sm:grid-cols-2">
              <SelectField
                label="Service status"
                name="serviceStatus"
                defaultValue={client.service_status}
                options={[
                  ["active", "Active"],
                  ["trial", "Trial"],
                  ["overdue", "Overdue"],
                  ["suspended", "Suspended"],
                  ["inactive", "Inactive"],
                  ["paid_in_full", "Paid in full"],
                ]}
              />
              <Field label="Effective date" name="effectiveAt" type="datetime-local" />
            </div>
            <Field label="Grace period ends" name="gracePeriodEndsAt" type="datetime-local" />
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.24em] text-slate-500">
                Reason
              </label>
              <textarea
                name="reason"
                rows={4}
                defaultValue={client.service_status_reason ?? ""}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-300 focus:ring-4 focus:ring-blue-100"
                placeholder="Reason for the change"
              />
            </div>
            <button className="inline-flex h-11 items-center justify-center rounded-2xl bg-slate-950 px-5 text-sm font-semibold text-white transition hover:bg-slate-800">
              Save service status
            </button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

function Field({
  label,
  name,
  defaultValue = "",
  type = "text",
}: {
  label: string;
  name: string;
  defaultValue?: string;
  type?: string;
}) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] uppercase tracking-[0.24em] text-slate-500">
        {label}
      </label>
      <input
        name={name}
        defaultValue={defaultValue}
        type={type}
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
          <option key={value} value={value}>
            {labelText}
          </option>
        ))}
      </select>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.4rem] border border-slate-200 bg-white px-4 py-4">
      <div className="text-[10px] uppercase tracking-[0.22em] text-slate-500">
        {label}
      </div>
      <div className="mt-1 text-sm leading-6 text-slate-700">{value}</div>
    </div>
  );
}

function formatMoney(amountCents: number, currency: string) {
  return new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amountCents / 100);
}

function formatDate(value: string | null) {
  if (!value) {
    return "Not available";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-IE", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

function formatProductOption(
  name: string,
  amountCents: number | null,
  currency: string,
  billingInterval: string | null,
  billingType: string
) {
  if (amountCents == null) {
    return name;
  }

  const amount = formatMoney(amountCents, currency);
  if (billingType === "one_off" || !billingInterval) {
    return `${name} - ${amount} one-off`;
  }

  return `${name} - ${amount} / ${billingInterval}`;
}
