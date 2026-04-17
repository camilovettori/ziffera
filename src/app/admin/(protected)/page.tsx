import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getDashboardSummary } from "@/lib/core/admin-data";

export const dynamic = "force-dynamic";

function formatMoney(cents: number) {
  return new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(cents / 100);
}

function MetricCard({
  label,
  value,
  detail,
}: {
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <Card className="border-slate-200/80 bg-white shadow-[0_14px_34px_rgba(15,23,42,0.05)]">
      <CardHeader className="pb-3">
        <CardDescription className="text-[10px] uppercase tracking-[0.28em] text-slate-500">
          {label}
        </CardDescription>
        <CardTitle className="text-3xl tracking-[-0.05em]">{value}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm leading-7 text-slate-600">{detail}</p>
      </CardContent>
    </Card>
  );
}

export default async function AdminDashboardPage() {
  const summary = await getDashboardSummary();

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <Badge>Commercial control plane</Badge>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.06em] text-slate-950">
            Ziffera dashboard
          </h1>
          <p className="mt-3 text-base leading-8 text-slate-600">
            The quiet operational surface for products, clients, billing, and
            Stripe-driven state.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <QuickAction href="/admin/products#create-product" label="Create product" />
          <QuickAction href="/admin/clients#create-client" label="Create client" />
          <QuickAction href="/admin/subscriptions" label="Open subscriptions" />
          <QuickAction href="/admin/payments" label="Open payments" />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <MetricCard
          label="Active clients"
          value={String(summary.activeClients)}
          detail="Clients currently carrying active commercial relationships."
        />
        <MetricCard
          label="Active subscriptions"
          value={String(summary.activeSubscriptions)}
          detail="Live Stripe-aligned subscription records."
        />
        <MetricCard
          label="MRR"
          value={formatMoney(summary.mrrCents)}
          detail="Monthly recurring revenue from active and trialing subscriptions."
        />
        <MetricCard
          label="Billing issues"
          value={String(summary.billingIssues)}
          detail="Failed payments plus subscriptions that have gone past due."
        />
        <MetricCard
          label="Needs attention"
          value={String(summary.attentionClients)}
          detail="Clients missing a product assignment or carrying a warning state."
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.08fr_0.92fr]">
        <Card className="border-slate-200/80 bg-white shadow-[0_18px_46px_rgba(15,23,42,0.06)]">
          <CardHeader>
            <CardDescription className="text-[10px] uppercase tracking-[0.28em] text-slate-500">
              Attention
            </CardDescription>
            <CardTitle className="text-2xl tracking-[-0.05em]">
              Clients needing attention
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {summary.attentionItems.length ? (
              summary.attentionItems.map((item) => (
                <div
                  key={item}
                  className="rounded-[1.4rem] border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-900"
                >
                  {item}
                </div>
              ))
            ) : (
              <div className="rounded-[1.4rem] border border-slate-200 bg-slate-50 px-4 py-5 text-sm text-slate-600">
                No client issues are flagged right now.
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-slate-200/80 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] shadow-[0_18px_46px_rgba(15,23,42,0.06)]">
          <CardHeader>
            <CardDescription className="text-[10px] uppercase tracking-[0.28em] text-slate-500">
              Workflow
            </CardDescription>
            <CardTitle className="text-2xl tracking-[-0.05em]">
              Ziffera operating loop
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm leading-7 text-slate-600">
            <div className="rounded-[1.4rem] border border-slate-200 bg-white px-4 py-4">
              Create a product, attach the Stripe price or payment link, and
              keep the commercial catalog current.
            </div>
            <div className="rounded-[1.4rem] border border-slate-200 bg-white px-4 py-4">
              Assign that product to a client so billing, service, and client
              administration stay linked.
            </div>
            <div className="rounded-[1.4rem] border border-slate-200 bg-white px-4 py-4">
              Let Stripe and webhooks update the canonical billing snapshot,
              then mirror that state in the client admin.
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <Card className="border-slate-200/80 bg-white shadow-[0_18px_46px_rgba(15,23,42,0.06)]">
          <CardHeader>
            <CardDescription className="text-[10px] uppercase tracking-[0.28em] text-slate-500">
              Activity
            </CardDescription>
            <CardTitle className="text-2xl tracking-[-0.05em]">
              Recent billing and activity events
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {summary.recentEvents.length ? (
              summary.recentEvents.map((event) => (
                <div
                  key={`${event.kind}-${event.id}`}
                  className="rounded-[1.4rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] px-4 py-4"
                >
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <div className="text-sm font-medium text-slate-950">
                        {event.title}
                      </div>
                      <div className="text-xs uppercase tracking-[0.22em] text-slate-500">
                        {event.kind}
                      </div>
                    </div>
                    <div className="text-xs text-slate-500">
                      {new Date(event.createdAt).toLocaleString()}
                    </div>
                  </div>
                  <div
                    className={`mt-2 rounded-2xl border px-3 py-2 text-sm leading-6 ${
                      event.tone === "critical"
                        ? "border-rose-200 bg-rose-50 text-rose-800"
                        : event.tone === "warn"
                          ? "border-amber-200 bg-amber-50 text-amber-800"
                          : "border-slate-200 bg-white text-slate-600"
                    }`}
                  >
                    {event.detail}
                  </div>
                </div>
              ))
            ) : (
              <div className="rounded-[1.4rem] border border-slate-200 bg-slate-50 px-4 py-5 text-sm text-slate-600">
                No recent events yet.
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-slate-200/80 bg-white shadow-[0_18px_46px_rgba(15,23,42,0.06)]">
          <CardHeader>
            <CardDescription className="text-[10px] uppercase tracking-[0.28em] text-slate-500">
              Notes
            </CardDescription>
            <CardTitle className="text-2xl tracking-[-0.05em]">
              Billing rules that stay separate
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm leading-7 text-slate-600">
            <div className="rounded-[1.4rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] px-4 py-4">
              Billing status is commercial truth. Service status is delivery
              truth. The two move independently.
            </div>
            <div className="rounded-[1.4rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] px-4 py-4">
              Products are treated as a sellable catalog, not a loose set of
              admin notes.
            </div>
            <div className="rounded-[1.4rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] px-4 py-4">
              Clients should always point at one assigned product so the admin
              surface can stay predictable as more customers arrive.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function QuickAction({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-[0_16px_32px_rgba(15,23,42,0.18)] transition hover:-translate-y-0.5 hover:bg-slate-800"
    >
      {label}
    </Link>
  );
}
