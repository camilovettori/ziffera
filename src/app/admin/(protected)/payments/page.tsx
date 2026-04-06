import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { listClients, listPayments, listProducts } from "@/lib/core/admin-data";
import { createPaymentAction } from "./actions";

export const dynamic = "force-dynamic";

export default async function PaymentsPage() {
  const [payments, clients, products] = await Promise.all([
    listPayments(),
    listClients(),
    listProducts(),
  ]);

  return (
    <div className="space-y-8">
      <div>
        <Badge>Payments</Badge>
        <h1 className="mt-4 text-4xl font-semibold tracking-[-0.06em] text-slate-950">
          Payment records
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-8 text-slate-600">
          Track one-off project payments, recurring billing records, and manual
          adjustments without mixing them into entitlements.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_0.92fr]">
        <Card className="border-slate-200/80 bg-white shadow-[0_18px_46px_rgba(15,23,42,0.06)]">
          <CardHeader>
            <CardDescription className="text-[10px] uppercase tracking-[0.28em] text-slate-500">
              Records
            </CardDescription>
            <CardTitle className="text-2xl tracking-[-0.05em]">
              Recent payments
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {payments.map((payment) => (
              <div
                key={payment.id}
                className="rounded-[1.4rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] px-4 py-4"
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="text-sm font-medium text-slate-950">
                      {payment.clientName}
                    </div>
                    <div className="text-xs uppercase tracking-[0.22em] text-slate-500">
                      {payment.payment_status} · {payment.payment_kind}
                    </div>
                  </div>
                  <div className="text-sm text-slate-600">
                    {(payment.amount_cents / 100).toFixed(2)} {payment.currency}
                  </div>
                </div>
                <div className="mt-2 text-sm leading-6 text-slate-600">
                  {payment.description || "Payment record"}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-slate-200/80 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] shadow-[0_18px_46px_rgba(15,23,42,0.06)]">
          <CardHeader>
            <CardDescription className="text-[10px] uppercase tracking-[0.28em] text-slate-500">
              Manual entry
            </CardDescription>
            <CardTitle className="text-2xl tracking-[-0.05em]">
              Create payment record
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form action={createPaymentAction} className="space-y-4">
              <SelectField
                label="Client"
                name="clientId"
                options={clients.map((client) => [client.id, client.name])}
              />
              <SelectField
                label="Product"
                name="productId"
                options={[["", "No product"], ...products.map((product) => [product.id, product.name] as [string, string])]}
              />
              <SelectField
                label="Payment status"
                name="paymentStatus"
                options={[
                  ["paid", "Paid"],
                  ["manual", "Manual"],
                  ["pending", "Pending"],
                  ["failed", "Failed"],
                  ["refunded", "Refunded"],
                  ["void", "Void"],
                ]}
              />
              <SelectField
                label="Payment kind"
                name="paymentKind"
                options={[
                  ["manual", "Manual"],
                  ["one_off", "One-off"],
                  ["invoice", "Invoice"],
                  ["subscription", "Subscription"],
                ]}
              />
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Amount cents" name="amountCents" type="number" placeholder="20000" />
                <Field label="Currency" name="currency" defaultValue="EUR" />
              </div>
              <Field label="Description" name="description" placeholder="Project payment" />
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Paid at" name="paidAt" type="datetime-local" />
                <Field label="Due at" name="dueAt" type="datetime-local" />
              </div>
              <label className="flex items-center gap-2 text-sm text-slate-600">
                <input type="checkbox" name="markPaidInFull" className="h-4 w-4 rounded border-slate-300" />
                Mark client paid in full
              </label>
              <button className="inline-flex h-11 items-center justify-center rounded-2xl bg-slate-950 px-5 text-sm font-semibold text-white transition hover:bg-slate-800">
                Save payment
              </button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  defaultValue,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  defaultValue?: string;
}) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] uppercase tracking-[0.24em] text-slate-500">
        {label}
      </label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-300 focus:ring-4 focus:ring-blue-100"
      />
    </div>
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
          <option key={`${name}-${value}`} value={value}>
            {labelText}
          </option>
        ))}
      </select>
    </div>
  );
}
