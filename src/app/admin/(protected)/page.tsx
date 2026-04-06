import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getDashboardSummary } from "@/lib/core/admin-data";

export const dynamic = "force-dynamic";

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
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <Badge>Operational core</Badge>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.06em] text-slate-950">
            Ziffera Core Dashboard
          </h1>
          <p className="mt-3 text-base leading-8 text-slate-600">
            A clean command centre for clients, entitlements, service state, and
            payment records.
          </p>
        </div>
        <Link
          href="/admin/clients"
          className="inline-flex w-fit items-center justify-center rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-[0_16px_32px_rgba(15,23,42,0.18)] transition hover:-translate-y-0.5 hover:bg-slate-800"
        >
          Manage clients
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label="Total clients"
          value={String(summary.totalClients)}
          detail="All commercial records under Ziffera Core."
        />
        <MetricCard
          label="Active clients"
          value={String(summary.activeClients)}
          detail="Clients currently marked active."
        />
        <MetricCard
          label="Suspended clients"
          value={String(summary.suspendedClients)}
          detail="Accounts with service turned off or paused."
        />
        <MetricCard
          label="Products"
          value={String(summary.productsCount)}
          detail="Current product directory entries."
        />
        <MetricCard
          label="Active entitlements"
          value={String(summary.activeEntitlementsCount)}
          detail="Granted access records across clients."
        />
        <MetricCard
          label="Subscriptions"
          value={String(summary.subscriptionsCount)}
          detail="Recurring billing records in the core."
        />
        <MetricCard
          label="Payment records"
          value={String(summary.paymentRecordsCount)}
          detail="Paid, manual, invoice, and one-off records."
        />
        <Card className="border-slate-200/80 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] shadow-[0_14px_34px_rgba(15,23,42,0.05)]">
          <CardHeader className="pb-3">
            <CardDescription className="text-[10px] uppercase tracking-[0.28em] text-slate-500">
              Attention
            </CardDescription>
            <CardTitle className="text-3xl tracking-[-0.05em]">
              {summary.attentionItems.length}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {summary.attentionItems.length ? (
              summary.attentionItems.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-900"
                >
                  {item}
                </div>
              ))
            ) : (
              <p className="text-sm leading-7 text-slate-600">
                No immediate issues. The operational surface is quiet.
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.08fr_0.92fr]">
        <Card className="border-slate-200/80 bg-white shadow-[0_18px_46px_rgba(15,23,42,0.06)]">
          <CardHeader>
            <CardDescription className="text-[10px] uppercase tracking-[0.28em] text-slate-500">
              Recent activity
            </CardDescription>
            <CardTitle className="text-2xl tracking-[-0.05em]">
              Audit events
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {summary.recentAuditEvents.length ? (
              summary.recentAuditEvents.map((event) => (
                <div
                  key={event.id}
                  className="rounded-[1.4rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] px-4 py-4"
                >
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <div className="text-sm font-medium text-slate-950">
                        {event.action}
                      </div>
                      <div className="text-xs uppercase tracking-[0.22em] text-slate-500">
                        {event.entityType} / {event.entityId}
                      </div>
                    </div>
                    <div className="text-xs text-slate-500">
                      {new Date(event.createdAt).toLocaleString()}
                    </div>
                  </div>
                  <div className="mt-2 text-sm leading-6 text-slate-600">
                    {event.actorName || event.actorEmail || "System"}
                  </div>
                </div>
              ))
            ) : (
              <div className="rounded-[1.4rem] border border-slate-200 bg-slate-50 px-4 py-5 text-sm text-slate-600">
                No audit activity yet.
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-slate-200/80 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] shadow-[0_18px_46px_rgba(15,23,42,0.06)]">
          <CardHeader>
            <CardDescription className="text-[10px] uppercase tracking-[0.28em] text-slate-500">
              Quick view
            </CardDescription>
            <CardTitle className="text-2xl tracking-[-0.05em]">
              Operational signals
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm leading-7 text-slate-600">
            <div className="rounded-[1.4rem] border border-slate-200 bg-white px-4 py-4">
              Client access and billing state are separated from entitlements.
            </div>
            <div className="rounded-[1.4rem] border border-slate-200 bg-white px-4 py-4">
              Frequency Framed is seeded as a paid-in-full project record.
            </div>
            <div className="rounded-[1.4rem] border border-slate-200 bg-white px-4 py-4">
              Product directory entries remain intact for MarginFlow, Zconnect,
              and Work Hours Tracker.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
