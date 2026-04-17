import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { listClients, listProducts } from "@/lib/core/admin-data";
import { createClientAction } from "./actions";

export const dynamic = "force-dynamic";

export default async function ClientsPage() {
  const [clients, products] = await Promise.all([listClients(), listProducts()]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <Badge>Clients</Badge>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.06em] text-slate-950">
            Client accounts
          </h1>
          <p className="mt-3 text-base leading-8 text-slate-600">
            Each client should point at one assigned product so billing status
            and service delivery stay easy to reason about.
          </p>
        </div>
        <div className="rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-slate-700">
          Billing state and service state are separate on purpose.
        </div>
      </div>

      <Card id="create-client" className="border-slate-200/80 bg-white shadow-[0_18px_46px_rgba(15,23,42,0.06)]">
        <CardHeader>
          <CardDescription className="text-[10px] uppercase tracking-[0.28em] text-slate-500">
            New client
          </CardDescription>
          <CardTitle className="text-2xl tracking-[-0.05em]">
            Create client record
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form action={createClientAction} className="space-y-5">
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Name" name="name" placeholder="Client name" />
              <Field label="Company" name="companyName" placeholder="Company name" />
              <Field label="Legal name" name="legalName" placeholder="Legal name" />
              <Field label="Billing email" name="billingEmail" placeholder="billing@client.ie" />
              <Field label="Support email" name="supportEmail" placeholder="support@client.ie" />
              <Field label="Website" name="websiteUrl" placeholder="https://client.ie" />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <SelectField
                label="Client type"
                name="clientType"
                options={[
                  ["saas", "SaaS client"],
                  ["project", "Website project"],
                  ["mixed", "Mixed / custom system"],
                ]}
              />
              <SelectField
                label="Assigned product"
                name="assignedProductId"
                defaultValue={products[0]?.id ?? ""}
                options={[
                  ["", "Choose a product"],
                  ...products.map((product) => [
                    product.id,
                    `${product.displayName} · ${formatAmount(product.amount_cents, product.currency, product.billing_interval)}`,
                  ] as [string, string]),
                ]}
              />
              <SelectField
                label="Billing status"
                name="billingStatus"
                options={[
                  ["none", "None"],
                  ["trial", "Trial"],
                  ["current", "Current"],
                  ["overdue", "Overdue"],
                  ["paid_in_full", "Paid in full"],
                ]}
              />
              <SelectField
                label="Service status"
                name="serviceStatus"
                options={[
                  ["active", "Active"],
                  ["trial", "Trial"],
                  ["overdue", "Overdue"],
                  ["suspended", "Suspended"],
                  ["inactive", "Inactive"],
                  ["paid_in_full", "Paid in full"],
                ]}
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.24em] text-slate-500">
                Internal notes
              </label>
              <textarea
                name="internalNotes"
                rows={4}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-300 focus:ring-4 focus:ring-blue-100"
                placeholder="Private notes for the team"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.24em] text-slate-500">
                Service status reason
              </label>
              <textarea
                name="serviceStatusReason"
                rows={3}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-300 focus:ring-4 focus:ring-blue-100"
                placeholder="Optional reason"
              />
            </div>

            <button className="inline-flex h-12 items-center justify-center rounded-2xl bg-slate-950 px-5 text-sm font-semibold text-white transition hover:bg-slate-800">
              Create client
            </button>
          </form>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {clients.map((client) => (
          <Link
            key={client.id}
            href={`/admin/clients/${client.id}`}
            className="block rounded-[1.5rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] px-5 py-5 transition hover:border-blue-200 hover:shadow-[0_14px_30px_rgba(15,23,42,0.06)]"
          >
            <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <div className="text-sm font-medium text-slate-950">
                  {client.name}
                </div>
                <div className="mt-1 text-xs uppercase tracking-[0.22em] text-slate-500">
                  {client.client_type} · {client.billing_status} · {client.service_status}
                </div>
                <div className="mt-3 text-sm text-slate-600">
                  Assigned product: {client.assignedProduct?.public_name ?? client.assignedProduct?.name ?? "Unassigned"}
                </div>
                <div className="text-sm text-slate-600">
                  Current subscription: {client.currentSubscription ? `${client.currentSubscription.status} · ${formatAmount(client.currentSubscription.amountCents, client.currentSubscription.currency, client.currentSubscription.billingInterval)}` : "None yet"}
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge variant={client.billing_status === "overdue" ? "outline" : "secondary"}>
                  {client.billing_status}
                </Badge>
                <Badge variant={client.service_status === "suspended" ? "outline" : "secondary"}>
                  {client.service_status}
                </Badge>
                <Badge variant="secondary">
                  {client.paymentCount} payments
                </Badge>
                <Badge variant="secondary">
                  {client.subscriptionCount} subscriptions
                </Badge>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  placeholder,
}: {
  label: string;
  name: string;
  placeholder: string;
}) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] uppercase tracking-[0.24em] text-slate-500">
        {label}
      </label>
      <input
        name={name}
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
  defaultValue?: string;
  options: [string, string][];
}) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] uppercase tracking-[0.24em] text-slate-500">
        {label}
      </label>
      <select
        name={name}
        defaultValue={defaultValue ?? options[0]?.[0] ?? ""}
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

function formatAmount(
  amountCents: number | null,
  currency: string,
  billingInterval: string | null
) {
  const amount = new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format((amountCents ?? 0) / 100);

  if (billingInterval === "month") {
    return `${amount} / month`;
  }

  if (billingInterval === "year") {
    return `${amount} / year`;
  }

  return `${amount} one-off`;
}
