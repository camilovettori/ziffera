import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CopyButton } from "@/components/admin/copy-button";
import { listProducts } from "@/lib/core/admin-data";
import { createProductAction, updateProductAction } from "./actions";

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  const products = await listProducts();

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <Badge>Products</Badge>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.06em] text-slate-950">
            Billing catalog
          </h1>
          <p className="mt-3 text-base leading-8 text-slate-600">
            Sellable products live here as a clean catalog with names, Stripe
            links, pricing, and active state.
          </p>
        </div>
        <div className="rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-slate-700">
          One product should be easy to price, assign, and send to a client.
        </div>
      </div>

      <Card id="create-product" className="border-slate-200/80 bg-white shadow-[0_18px_46px_rgba(15,23,42,0.06)]">
        <CardHeader>
          <CardDescription className="text-[10px] uppercase tracking-[0.28em] text-slate-500">
            New product
          </CardDescription>
          <CardTitle className="text-2xl tracking-[-0.05em]">
            Create catalog entry
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ProductEditorForm action={createProductAction} submitLabel="Create product" />
        </CardContent>
      </Card>

      <div className="grid gap-6">
        {products.map((product) => (
          <Card
            key={product.id}
            className="border-slate-200/80 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] shadow-[0_18px_46px_rgba(15,23,42,0.06)]"
          >
            <CardHeader className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <CardDescription className="text-[10px] uppercase tracking-[0.28em] text-slate-500">
                  {product.product_kind} · {product.billing_type}
                </CardDescription>
                <CardTitle className="text-2xl tracking-[-0.05em]">
                  {product.displayName}
                </CardTitle>
                <div className="mt-2 text-sm text-slate-600">
                  Internal: {product.name} · Code: {product.code}
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge variant={product.is_active ? "secondary" : "outline"}>
                  {product.is_active ? "Active" : "Inactive"}
                </Badge>
                <Badge variant="secondary">
                  {product.assignedClientCount} assigned clients
                </Badge>
                <Badge variant="secondary">
                  {product.activeSubscriptionCount} active subscriptions
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-3 md:grid-cols-3">
                <Info label="Price" value={formatAmount(product.amount_cents, product.currency, product.billing_interval)} />
                <Info label="Stripe product" value={product.stripe_product_id ?? "Not linked"} />
                <Info label="Stripe price" value={product.stripe_price_id ?? "Not linked"} />
              </div>

              <div className="grid gap-3 lg:grid-cols-[1.1fr_0.9fr]">
                <div className="rounded-[1.4rem] border border-slate-200 bg-white px-4 py-4 text-sm leading-7 text-slate-600">
                  <div className="text-[10px] uppercase tracking-[0.24em] text-slate-500">
                    Description
                  </div>
                  <div className="mt-1">
                    {product.description || "No description yet."}
                  </div>
                </div>
                <div className="rounded-[1.4rem] border border-slate-200 bg-white px-4 py-4 text-sm leading-7 text-slate-600">
                  <div className="text-[10px] uppercase tracking-[0.24em] text-slate-500">
                    Payment link
                  </div>
                  <div className="mt-1 break-all">
                    {product.stripe_payment_link_url ?? "Add a Stripe payment link to enable copying."}
                  </div>
                  {product.stripe_payment_link_url ? (
                    <div className="mt-3">
                      <CopyButton value={product.stripe_payment_link_url} label="Copy payment link" />
                    </div>
                  ) : null}
                </div>
              </div>

              <form action={updateProductAction} className="space-y-5 rounded-[1.5rem] border border-slate-200 bg-white p-5">
                <input type="hidden" name="productId" value={product.id} />
                <ProductEditorFields product={product} />
                <div className="flex flex-wrap gap-3">
                  <button className="inline-flex h-12 items-center justify-center rounded-2xl bg-slate-950 px-5 text-sm font-semibold text-white transition hover:bg-slate-800">
                    Save product
                  </button>
                  <Badge variant={product.is_active ? "secondary" : "outline"}>
                    {product.is_active ? "Ready to sell" : "Hidden from sale"}
                  </Badge>
                </div>
              </form>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function ProductEditorForm({
  action,
  submitLabel,
}: {
  action: (formData: FormData) => Promise<void>;
  submitLabel: string;
}) {
  return (
    <form action={action} className="space-y-5">
      <ProductEditorFields />
      <button className="inline-flex h-12 items-center justify-center rounded-2xl bg-slate-950 px-5 text-sm font-semibold text-white transition hover:bg-slate-800">
        {submitLabel}
      </button>
    </form>
  );
}

function ProductEditorFields({
  product,
}: {
  product?: {
    name: string;
    public_name: string | null;
    product_kind: string;
    billing_type: string;
    billing_interval: string | null;
    amount_cents: number | null;
    currency: string;
    description: string | null;
    public_url: string | null;
    stripe_product_id: string | null;
    stripe_price_id: string | null;
    stripe_payment_link_url: string | null;
    sort_order: number;
    is_active: boolean;
  };
}) {
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Internal name" name="name" defaultValue={product?.name ?? ""} />
        <Field label="Public name" name="publicName" defaultValue={product?.public_name ?? ""} />
        <SelectField
          label="Product kind"
          name="productKind"
          defaultValue={product?.product_kind ?? "service"}
          options={[
            ["service", "Service"],
            ["saas", "SaaS"],
            ["project", "Project"],
            ["integration", "Integration"],
          ]}
        />
        <SelectField
          label="Billing type"
          name="billingType"
          defaultValue={product?.billing_type ?? "recurring"}
          options={[
            ["recurring", "Recurring"],
            ["one_off", "One-off"],
          ]}
        />
        <SelectField
          label="Interval"
          name="billingInterval"
          defaultValue={product ? product.billing_interval ?? "" : "month"}
          options={[
            ["", "Not set"],
            ["month", "Monthly"],
            ["year", "Yearly"],
          ]}
        />
        <Field
          label="Amount cents"
          name="amountCents"
          type="number"
          defaultValue={String(product?.amount_cents ?? 0)}
        />
        <Field label="Currency" name="currency" defaultValue={product?.currency ?? "EUR"} />
        <Field label="Public URL" name="publicUrl" defaultValue={product?.public_url ?? ""} />
        <Field
          label="Sort order"
          name="sortOrder"
          type="number"
          defaultValue={String(product?.sort_order ?? 0)}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Stripe product ID" name="stripeProductId" defaultValue={product?.stripe_product_id ?? ""} />
        <Field label="Stripe price ID" name="stripePriceId" defaultValue={product?.stripe_price_id ?? ""} />
        <Field label="Payment link URL" name="stripePaymentLinkUrl" defaultValue={product?.stripe_payment_link_url ?? ""} />
        <SelectField
          label="Active state"
          name="isActive"
          defaultValue={product ? (product.is_active ? "true" : "false") : "true"}
          options={[
            ["true", "Active"],
            ["false", "Inactive"],
          ]}
        />
      </div>

      <div className="space-y-2">
        <label className="text-[10px] uppercase tracking-[0.24em] text-slate-500">
          Description
        </label>
        <textarea
          name="description"
          rows={4}
          defaultValue={product?.description ?? ""}
          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-300 focus:ring-4 focus:ring-blue-100"
          placeholder="Product description"
        />
      </div>
    </>
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
