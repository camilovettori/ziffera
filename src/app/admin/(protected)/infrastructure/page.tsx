import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { listProductConnections, listProducts } from "@/lib/core/admin-data";
import { upsertProductConnectionAction } from "./actions";

export const dynamic = "force-dynamic";

const deploymentMap = [
  {
    label: "ziffera.ie",
    role: "Public institutional website",
    platform: "Vercel",
    currentMapping: "Ziffera marketing site",
  },
  {
    label: "api.ziffera.ie",
    role: "Core control plane",
    platform: "Render",
    currentMapping: "Ziffera Core API and admin backend",
  },
  {
    label: "marginflow.ziffera.ie",
    role: "MarginFlow frontend",
    platform: "Product subdomain",
    currentMapping: "Public product surface, still separately operated",
  },
  {
    label: "zconnect.ziffera.ie",
    role: "Zconnect frontend",
    platform: "Product subdomain",
    currentMapping: "Integration product surface, separately operated",
  },
  {
    label: "workhourstracker.ziffera.ie",
    role: "Work Hours Tracker app",
    platform: "Product subdomain",
    currentMapping: "PWA/app surface, separately operated",
  },
];

export default async function InfrastructurePage() {
  const [products, connections] = await Promise.all([
    listProducts(),
    listProductConnections(),
  ]);
  const connectedProducts = products.filter((product) => product.productConnection);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <Badge>Infrastructure</Badge>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.06em] text-slate-950">
            Deployment map and product connections
          </h1>
          <p className="mt-3 text-base leading-8 text-slate-600">
            Ziffera Core is the commercial control plane. Product runtimes stay
            separate for now, but their operational links are recorded here.
          </p>
        </div>
        <div className="rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-slate-700">
          Transitional architecture: central control plane, separate product runtimes.
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {deploymentMap.map((entry) => (
          <Card
            key={entry.label}
            className="border-slate-200/80 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] shadow-[0_18px_46px_rgba(15,23,42,0.06)]"
          >
            <CardHeader>
              <CardDescription className="text-[10px] uppercase tracking-[0.28em] text-slate-500">
                {entry.platform}
              </CardDescription>
              <CardTitle className="text-2xl tracking-[-0.05em]">
                {entry.label}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm leading-7 text-slate-600">
              <div>{entry.role}</div>
              <div className="mt-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-700">
                {entry.currentMapping}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-slate-200/80 bg-white shadow-[0_18px_46px_rgba(15,23,42,0.06)]">
          <CardHeader>
            <CardDescription className="text-[10px] uppercase tracking-[0.28em] text-slate-500">
              Product directory
            </CardDescription>
            <CardTitle className="text-2xl tracking-[-0.05em]">
              {products.length}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm leading-7 text-slate-600">
            Core product records currently known to Ziffera.
          </CardContent>
        </Card>
        <Card className="border-slate-200/80 bg-white shadow-[0_18px_46px_rgba(15,23,42,0.06)]">
          <CardHeader>
            <CardDescription className="text-[10px] uppercase tracking-[0.28em] text-slate-500">
              Connected products
            </CardDescription>
            <CardTitle className="text-2xl tracking-[-0.05em]">
              {connectedProducts.length}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm leading-7 text-slate-600">
            Products with explicit app or operational connection records.
          </CardContent>
        </Card>
        <Card className="border-slate-200/80 bg-white shadow-[0_18px_46px_rgba(15,23,42,0.06)]">
          <CardHeader>
            <CardDescription className="text-[10px] uppercase tracking-[0.28em] text-slate-500">
              Operational stance
            </CardDescription>
            <CardTitle className="text-2xl tracking-[-0.05em]">
              Transitional
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm leading-7 text-slate-600">
            Central control plane first, consolidation later only where safe.
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.04fr_0.96fr]">
        <Card className="border-slate-200/80 bg-white shadow-[0_18px_46px_rgba(15,23,42,0.06)]">
          <CardHeader>
            <CardDescription className="text-[10px] uppercase tracking-[0.28em] text-slate-500">
              Render recommendation
            </CardDescription>
            <CardTitle className="text-2xl tracking-[-0.05em]">
              What stays separate now
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm leading-7 text-slate-600">
            <div className="rounded-[1.4rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] px-4 py-4">
              Keep MarginFlow, Zconnect, and Work Hours Tracker as separate
              runtimes until control-plane stability and access enforcement are
              proven.
            </div>
            <div className="rounded-[1.4rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] px-4 py-4">
              Ziffera Core should remain the commercial source of truth for
              clients, entitlements, subscriptions, and service controls.
            </div>
            <div className="rounded-[1.4rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] px-4 py-4">
              Best future consolidation candidate: Zconnect, because its
              frontend/backend split already behaves like an integration
              service boundary.
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200/80 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] shadow-[0_18px_46px_rgba(15,23,42,0.06)]">
          <CardHeader>
            <CardDescription className="text-[10px] uppercase tracking-[0.28em] text-slate-500">
              DNS checklist
            </CardDescription>
            <CardTitle className="text-2xl tracking-[-0.05em]">
              Subdomains and CORS
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm leading-7 text-slate-600">
            <div className="rounded-[1.4rem] border border-slate-200 bg-white px-4 py-4">
              Point <strong>api.ziffera.ie</strong> to the Render control plane.
            </div>
            <div className="rounded-[1.4rem] border border-slate-200 bg-white px-4 py-4">
              Keep product subdomains on their current deployments until each
              product confirms it can safely depend on Core-managed access.
            </div>
            <div className="rounded-[1.4rem] border border-slate-200 bg-white px-4 py-4">
              If cookies are ever shared across subdomains, the auth strategy
              must be explicit and same-site rules must be reviewed carefully.
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-slate-200/80 bg-white shadow-[0_18px_46px_rgba(15,23,42,0.06)]">
        <CardHeader>
          <CardDescription className="text-[10px] uppercase tracking-[0.28em] text-slate-500">
            Product connection records
          </CardDescription>
          <CardTitle className="text-2xl tracking-[-0.05em]">
            Runtime links and operational state
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6 xl:grid-cols-2">
          {connections.map((connection) => (
            <div
              key={connection.id}
              className="rounded-[1.5rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] p-5"
            >
              <form action={upsertProductConnectionAction} className="space-y-4">
                <input type="hidden" name="productId" value={connection.product_id} />
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="text-sm font-medium text-slate-950">
                      {connection.productName}
                    </div>
                    <div className="text-xs uppercase tracking-[0.22em] text-slate-500">
                      {connection.productSlug} / {connection.productKind}
                    </div>
                  </div>
                  <Badge variant={connection.productIsActive ? "secondary" : "outline"}>
                    {connection.productIsActive ? "Product active" : "Product disabled"}
                  </Badge>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="App URL" name="appUrl" defaultValue={connection.app_url ?? ""} />
                  <Field label="API URL" name="apiUrl" defaultValue={connection.api_url ?? ""} />
                  <SelectField
                    label="Service status"
                    name="serviceStatus"
                    defaultValue={connection.service_status}
                    options={[
                      ["active", "Active"],
                      ["trial", "Trial"],
                      ["maintenance", "Maintenance"],
                      ["suspended", "Suspended"],
                      ["inactive", "Inactive"],
                    ]}
                  />
                  <Field
                    label="Environment"
                    name="environmentLabel"
                    defaultValue={connection.environment_label}
                  />
                </div>

                <SelectField
                  label="Managed by"
                  name="managedExternally"
                  defaultValue={connection.managed_externally ? "true" : "false"}
                  options={[
                    ["true", "External product service"],
                    ["false", "Managed by Ziffera Core"],
                  ]}
                />

                <div className="grid gap-4 sm:grid-cols-2">
                  <TextareaField
                    label="Internal notes"
                    name="internalNotes"
                    defaultValue={connection.internal_notes ?? ""}
                  />
                  <TextareaField
                    label="Internal links"
                    name="internalLinks"
                    defaultValue={connection.internal_links ?? ""}
                  />
                </div>

                <div className="flex items-center justify-between gap-3">
                  <div className="text-xs uppercase tracking-[0.22em] text-slate-500">
                    Readiness: {connection.managed_externally ? "external control" : "core-managed"}
                  </div>
                  <button className="inline-flex h-11 items-center justify-center rounded-2xl bg-slate-950 px-5 text-sm font-semibold text-white transition hover:bg-slate-800">
                    Save connection
                  </button>
                </div>
              </form>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="border-slate-200/80 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] shadow-[0_18px_46px_rgba(15,23,42,0.06)]">
        <CardHeader>
          <CardDescription className="text-[10px] uppercase tracking-[0.28em] text-slate-500">
            Future readiness
          </CardDescription>
          <CardTitle className="text-2xl tracking-[-0.05em]">
            Client access and platform alignment
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm leading-7 text-slate-600">
          The admin already knows which products exist. Product connections make
          those records operational, and client entitlements determine who sees
          what.
        </CardContent>
      </Card>
    </div>
  );
}

function Field({
  label,
  name,
  defaultValue = "",
}: {
  label: string;
  name: string;
  defaultValue?: string;
}) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] uppercase tracking-[0.24em] text-slate-500">
        {label}
      </label>
      <input
        name={name}
        defaultValue={defaultValue}
        className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-blue-300 focus:ring-4 focus:ring-blue-100"
      />
    </div>
  );
}

function TextareaField({
  label,
  name,
  defaultValue = "",
}: {
  label: string;
  name: string;
  defaultValue?: string;
}) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] uppercase tracking-[0.24em] text-slate-500">
        {label}
      </label>
      <textarea
        name={name}
        rows={5}
        defaultValue={defaultValue}
        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-300 focus:ring-4 focus:ring-blue-100"
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
