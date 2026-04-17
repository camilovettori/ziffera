import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  getClientById,
  getClientProductAccessMatrix,
  listProducts,
} from "@/lib/core/admin-data";
import { changeClientServiceStatusAction, updateClientAction, upsertClientContactAction } from "../actions";
import { setEntitlementAction } from "../../entitlements/actions";

export const dynamic = "force-dynamic";

export default async function ClientDetailPage({
  params,
}: {
  params: Promise<{ clientId: string }>;
}) {
  const { clientId } = await params;
  const [client, products, accessMatrix] = await Promise.all([
    getClientById(clientId),
    listProducts(),
    getClientProductAccessMatrix(clientId),
  ]);

  if (!client) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <Badge>{client.client_type}</Badge>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.06em] text-slate-950">
            {client.name}
          </h1>
          <p className="mt-3 text-sm uppercase tracking-[0.22em] text-slate-500">
            Billing: {client.billing_status} · Service: {client.service_status}
          </p>
          <p className="mt-2 text-sm text-slate-600">
            Assigned product:{" "}
            {client.assignedProduct?.public_name ?? client.assignedProduct?.name ?? "Unassigned"}
          </p>
        </div>
        <Link
          href="/admin/clients"
          className="inline-flex w-fit items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-300"
        >
          Back to clients
        </Link>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.06fr_0.94fr]">
        <Card className="border-slate-200/80 bg-white shadow-[0_18px_46px_rgba(15,23,42,0.06)]">
          <CardHeader>
            <CardDescription className="text-[10px] uppercase tracking-[0.28em] text-slate-500">
              Commercial record
            </CardDescription>
            <CardTitle className="text-2xl tracking-[-0.05em]">
              Edit client
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form action={updateClientAction} className="space-y-4">
              <input type="hidden" name="clientId" value={client.id} />
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Name" name="name" defaultValue={client.name} />
                <Field label="Company" name="companyName" defaultValue={client.company_name ?? ""} />
                <Field label="Legal name" name="legalName" defaultValue={client.legal_name ?? ""} />
                <Field label="Billing email" name="billingEmail" defaultValue={client.billing_email ?? ""} />
                <Field label="Website" name="websiteUrl" defaultValue={client.website_url ?? ""} />
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
                    ...products.map((product) => [product.id, product.displayName] as [string, string]),
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

              <div className="rounded-[1.4rem] border border-slate-200 bg-slate-50 px-4 py-4 text-sm leading-7 text-slate-600">
                <div className="text-[10px] uppercase tracking-[0.22em] text-slate-500">
                  Current subscription summary
                </div>
                <div className="mt-1">
                  {client.currentSubscription
                    ? `${client.currentSubscription.status} · ${client.currentSubscription.amountCents / 100} ${client.currentSubscription.currency} · ${client.currentSubscription.billingInterval}`
                    : "No subscription linked to the assigned product yet."}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.24em] text-slate-500">
                  Internal notes
                </label>
                <textarea
                  name="internalNotes"
                  rows={4}
                  defaultValue={client.internal_notes ?? ""}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-300 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.24em] text-slate-500">
                  Service status reason
                </label>
                <textarea
                  name="serviceStatusReason"
                  rows={3}
                  defaultValue={client.service_status_reason ?? ""}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-300 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <button className="inline-flex h-12 items-center justify-center rounded-2xl bg-slate-950 px-5 text-sm font-semibold text-white transition hover:bg-slate-800">
                Save client
              </button>
            </form>
          </CardContent>
        </Card>

        <Card className="border-slate-200/80 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] shadow-[0_18px_46px_rgba(15,23,42,0.06)]">
          <CardHeader>
            <CardDescription className="text-[10px] uppercase tracking-[0.28em] text-slate-500">
              Access state
            </CardDescription>
            <CardTitle className="text-2xl tracking-[-0.05em]">
              Entitlements
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <form action={setEntitlementAction} className="space-y-4 rounded-[1.4rem] border border-slate-200 bg-white p-4">
              <input type="hidden" name="clientId" value={client.id} />
              <div className="grid gap-4">
                <SelectField
                  label="Product"
                  name="productId"
                  defaultValue={products[0]?.id ?? ""}
                  options={products.map((product) => [product.id, product.displayName])}
                />
                <SelectField
                  label="State"
                  name="entitlementStatus"
                  defaultValue="active"
                  options={[
                    ["active", "Active"],
                    ["trial", "Trial"],
                    ["paused", "Paused"],
                    ["suspended", "Suspended"],
                    ["revoked", "Revoked"],
                  ]}
                />
                <SelectField
                  label="Source"
                  name="accessSource"
                  defaultValue="manual"
                  options={[
                    ["manual", "Manual"],
                    ["subscription", "Subscription"],
                    ["payment", "Payment"],
                    ["seed", "Seed"],
                  ]}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.24em] text-slate-500">
                  Notes
                </label>
                <textarea
                  name="notes"
                  rows={3}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-300 focus:ring-4 focus:ring-blue-100"
                />
              </div>
              <button className="inline-flex h-11 items-center justify-center rounded-2xl bg-slate-950 px-5 text-sm font-semibold text-white transition hover:bg-slate-800">
                Grant access
              </button>
            </form>

            <div className="space-y-3">
              {client.entitlements.length ? (
                client.entitlements.map((entitlement) => (
                  <div
                    key={entitlement.id}
                    className="rounded-[1.4rem] border border-slate-200 bg-white px-4 py-4"
                  >
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <div className="text-sm font-medium text-slate-950">
                          {entitlement.productName}
                        </div>
                        <div className="text-xs uppercase tracking-[0.22em] text-slate-500">
                          {entitlement.entitlement_status} · {entitlement.access_source}
                        </div>
                      </div>
                      {entitlement.entitlement_status !== "revoked" ? (
                        <form action={setEntitlementAction}>
                          <input type="hidden" name="clientId" value={client.id} />
                          <input type="hidden" name="productId" value={entitlement.product_id} />
                          <input type="hidden" name="entitlementStatus" value="revoked" />
                          <input type="hidden" name="accessSource" value="manual" />
                          <button className="rounded-full border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-700">
                            Revoke
                          </button>
                        </form>
                      ) : (
                        <Badge variant="secondary">Revoked</Badge>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="rounded-[1.4rem] border border-slate-200 bg-white px-4 py-5 text-sm text-slate-600">
                  No entitlements yet.
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-slate-200/80 bg-white shadow-[0_18px_46px_rgba(15,23,42,0.06)]">
        <CardHeader>
          <CardDescription className="text-[10px] uppercase tracking-[0.28em] text-slate-500">
            Product access
          </CardDescription>
          <CardTitle className="text-2xl tracking-[-0.05em]">
            Client ↔ product view
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 lg:grid-cols-2">
          {accessMatrix.map((access) => (
            <div
              key={access.productId}
              className="rounded-[1.4rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] px-4 py-4"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="text-sm font-medium text-slate-950">
                    {access.productName}
                  </div>
                  <div className="text-xs uppercase tracking-[0.22em] text-slate-500">
                    {access.productKind} / {access.productSlug}
                  </div>
                </div>
                <div className="text-xs uppercase tracking-[0.22em] text-slate-500">
                  {access.accessStatus} · {access.accessScope}
                </div>
              </div>

              <div className="mt-4 grid gap-2 text-sm leading-6 text-slate-600">
                <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3">
                  App: {access.appUrl ?? "not linked yet"}
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3">
                  API: {access.apiUrl ?? "not linked yet"}
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3">
                  Connection: {access.connectionServiceStatus ?? "not configured"} ·{" "}
                  {access.environmentLabel ?? "production"}
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3">
                  Readiness: {access.readiness}
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3">
                  Entitlement: {access.entitlementStatus ?? "none"} ·{" "}
                  {access.accessSource ?? "manual"}
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <Card className="border-slate-200/80 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] shadow-[0_18px_46px_rgba(15,23,42,0.06)]">
          <CardHeader>
            <CardDescription className="text-[10px] uppercase tracking-[0.28em] text-slate-500">
              Contacts
            </CardDescription>
            <CardTitle className="text-2xl tracking-[-0.05em]">
              Client contacts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <form action={upsertClientContactAction} className="space-y-4 rounded-[1.4rem] border border-slate-200 bg-white p-4">
              <input type="hidden" name="clientId" value={client.id} />
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Full name" name="fullName" />
                <Field label="Email" name="email" />
                <Field label="Phone" name="phone" />
                <Field label="Role" name="role" />
              </div>
              <label className="flex items-center gap-2 text-sm text-slate-600">
                <input type="checkbox" name="isPrimary" className="h-4 w-4 rounded border-slate-300" />
                Primary contact
              </label>
              <textarea
                name="notes"
                rows={3}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-300 focus:ring-4 focus:ring-blue-100"
                placeholder="Notes"
              />
              <button className="inline-flex h-11 items-center justify-center rounded-2xl bg-slate-950 px-5 text-sm font-semibold text-white transition hover:bg-slate-800">
                Add contact
              </button>
            </form>

            <div className="space-y-3">
              {client.contacts.length ? (
                client.contacts.map((contact) => (
                  <div
                    key={contact.id}
                    className="rounded-[1.4rem] border border-slate-200 bg-white px-4 py-4"
                  >
                    <div className="text-sm font-medium text-slate-950">
                      {contact.full_name}
                    </div>
                    <div className="text-xs uppercase tracking-[0.22em] text-slate-500">
                      {contact.email} {contact.is_primary ? "· primary" : ""}
                    </div>
                  </div>
                ))
              ) : (
                <div className="rounded-[1.4rem] border border-slate-200 bg-white px-4 py-5 text-sm text-slate-600">
                  No contacts stored yet.
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200/80 bg-white shadow-[0_18px_46px_rgba(15,23,42,0.06)]">
          <CardHeader>
            <CardDescription className="text-[10px] uppercase tracking-[0.28em] text-slate-500">
              Service controls
            </CardDescription>
            <CardTitle className="text-2xl tracking-[-0.05em]">
              Suspend or reactivate
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <form action={changeClientServiceStatusAction} className="space-y-4 rounded-[1.4rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] p-4">
              <input type="hidden" name="clientId" value={client.id} />
              <div className="grid gap-4 sm:grid-cols-2">
                <SelectField
                  label="Status"
                  name="serviceStatus"
                  defaultValue={client.service_status}
                  options={[
                    ["active", "Active"],
                    ["suspended", "Suspended"],
                    ["overdue", "Overdue"],
                    ["inactive", "Inactive"],
                    ["paid_in_full", "Paid in full"],
                  ]}
                />
                <Field label="Effective date" name="effectiveAt" type="datetime-local" />
              </div>
              <Field label="Grace period ends" name="gracePeriodEndsAt" type="datetime-local" />
              <textarea
                name="reason"
                rows={3}
                defaultValue={client.service_status_reason ?? ""}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-300 focus:ring-4 focus:ring-blue-100"
                placeholder="Reason for the change"
              />
              <div className="flex gap-3">
                <button className="inline-flex h-11 items-center justify-center rounded-2xl bg-slate-950 px-5 text-sm font-semibold text-white transition hover:bg-slate-800">
                  Save service status
                </button>
              </div>
            </form>

            <div className="rounded-[1.4rem] border border-slate-200 bg-slate-50 px-4 py-4 text-sm leading-7 text-slate-600">
              Data is never deleted when a client is suspended. Status changes are
              recorded in service history and audit logs.
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-slate-200/80 bg-white shadow-[0_18px_46px_rgba(15,23,42,0.06)]">
        <CardHeader>
          <CardDescription className="text-[10px] uppercase tracking-[0.28em] text-slate-500">
            Payments and billing
          </CardDescription>
          <CardTitle className="text-2xl tracking-[-0.05em]">
            Snapshot
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-3">
          {client.payments.slice(0, 3).map((payment) => (
            <div key={payment.id} className="rounded-[1.4rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] px-4 py-4">
              <div className="text-sm font-medium text-slate-950">
                {(payment.amount_cents / 100).toFixed(2)} {payment.currency}
              </div>
              <div className="text-xs uppercase tracking-[0.22em] text-slate-500">
                {payment.payment_status} · {payment.payment_kind}
              </div>
              <div className="mt-2 text-sm leading-6 text-slate-600">
                {payment.description || "Payment record"}
              </div>
            </div>
          ))}
          {!client.payments.length ? (
            <div className="rounded-[1.4rem] border border-slate-200 bg-slate-50 px-4 py-5 text-sm text-slate-600 md:col-span-3">
              No payment records yet.
            </div>
          ) : null}
        </CardContent>
      </Card>

      <div className="rounded-[1.6rem] border border-blue-100 bg-blue-50 px-5 py-4 text-sm leading-7 text-slate-700">
        Subscriptions, payments, and entitlements are stored as separate records.
        That keeps one-off projects like Frequency Framed cleanly distinct from
        recurring SaaS billing.
      </div>
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
