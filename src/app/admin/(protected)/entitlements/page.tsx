import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  getDashboardSummary,
  listClients,
  listEntitlements,
  listProducts,
} from "@/lib/core/admin-data";
import { setEntitlementAction } from "./actions";

export const dynamic = "force-dynamic";

export default async function EntitlementsPage() {
  const [clients, products, summary] = await Promise.all([
    listClients(),
    listProducts(),
    getDashboardSummary(),
  ]);
  const entitlements = await listEntitlements();

  return (
    <div className="space-y-8">
      <div>
        <Badge>Entitlements</Badge>
        <h1 className="mt-4 text-4xl font-semibold tracking-[-0.06em] text-slate-950">
          Access control
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-8 text-slate-600">
          A client may have access without recurring billing. This layer remains
          independent from subscriptions.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Stat label="Clients" value={summary.totalClients} />
        <Stat label="Products" value={summary.productsCount} />
        <Stat label="Active entitlements" value={summary.activeEntitlementsCount} />
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <Card className="border-slate-200/80 bg-white shadow-[0_18px_46px_rgba(15,23,42,0.06)]">
          <CardHeader>
            <CardDescription className="text-[10px] uppercase tracking-[0.28em] text-slate-500">
              Grant access
            </CardDescription>
            <CardTitle className="text-2xl tracking-[-0.05em]">
              Assign entitlement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form action={setEntitlementAction} className="space-y-4">
              <SelectField label="Client" name="clientId" options={clients.map((client) => [client.id, client.name])} />
              <SelectField label="Product" name="productId" options={products.map((product) => [product.id, product.name])} />
              <SelectField
                label="Status"
                name="entitlementStatus"
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
                options={[
                  ["manual", "Manual"],
                  ["subscription", "Subscription"],
                  ["payment", "Payment"],
                  ["seed", "Seed"],
                ]}
              />
              <textarea
                name="notes"
                rows={3}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-300 focus:ring-4 focus:ring-blue-100"
                placeholder="Optional notes"
              />
              <button className="inline-flex h-11 items-center justify-center rounded-2xl bg-slate-950 px-5 text-sm font-semibold text-white transition hover:bg-slate-800">
                Save entitlement
              </button>
            </form>
          </CardContent>
        </Card>

        <Card className="border-slate-200/80 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] shadow-[0_18px_46px_rgba(15,23,42,0.06)]">
        <CardHeader>
          <CardDescription className="text-[10px] uppercase tracking-[0.28em] text-slate-500">
            Current access
          </CardDescription>
          <CardTitle className="text-2xl tracking-[-0.05em]">
            Existing entitlements
          </CardTitle>
        </CardHeader>
          <CardContent className="space-y-3">
            {entitlements.length ? (
              entitlements.map((entitlement) => (
                <div
                  key={entitlement.id}
                  className="rounded-[1.4rem] border border-slate-200 bg-white px-4 py-4"
                >
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <div className="text-sm font-medium text-slate-950">
                        {entitlement.clientName} · {entitlement.productName}
                      </div>
                      <div className="text-xs uppercase tracking-[0.22em] text-slate-500">
                        {entitlement.entitlement_status} · {entitlement.access_source}
                      </div>
                    </div>
                    <form action={setEntitlementAction}>
                      <input type="hidden" name="clientId" value={entitlement.client_id} />
                      <input type="hidden" name="productId" value={entitlement.product_id} />
                      <input type="hidden" name="entitlementStatus" value="revoked" />
                      <input type="hidden" name="accessSource" value="manual" />
                      <button className="rounded-full border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-700">
                        Revoke
                      </button>
                    </form>
                  </div>
                </div>
              ))
            ) : (
              <div className="rounded-[1.4rem] border border-slate-200 bg-white px-4 py-5 text-sm text-slate-600">
                No entitlements yet.
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="border-slate-200/80 bg-white shadow-[0_18px_46px_rgba(15,23,42,0.06)]">
        <CardHeader>
          <CardDescription className="text-[10px] uppercase tracking-[0.28em] text-slate-500">
            Client overview
          </CardDescription>
          <CardTitle className="text-2xl tracking-[-0.05em]">
            Access by client
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {clients.map((client) => (
            <div
              key={client.id}
              className="rounded-[1.4rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] px-4 py-4"
            >
              <div className="text-sm font-medium text-slate-950">
                {client.name}
              </div>
              <div className="mt-1 text-xs uppercase tracking-[0.22em] text-slate-500">
                {client.entitlementCount} entitlements
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <Card className="border-slate-200/80 bg-white shadow-[0_14px_34px_rgba(15,23,42,0.05)]">
      <CardHeader>
        <CardDescription className="text-[10px] uppercase tracking-[0.28em] text-slate-500">
          {label}
        </CardDescription>
        <CardTitle className="text-3xl tracking-[-0.05em]">{value}</CardTitle>
      </CardHeader>
    </Card>
  );
}

function SelectField({
  label,
  name,
  options,
}: {
  label: string;
  name: string;
  options: [string, string][];
}) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] uppercase tracking-[0.24em] text-slate-500">
        {label}
      </label>
      <select
        name={name}
        defaultValue={options[0]?.[0] ?? ""}
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
