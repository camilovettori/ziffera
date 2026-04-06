import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { listClients } from "@/lib/core/admin-data";
import { changeClientServiceStatusAction } from "../clients/actions";

export const dynamic = "force-dynamic";

export default async function ServiceControlsPage() {
  const clients = await listClients();

  return (
    <div className="space-y-8">
      <div>
        <Badge>Service controls</Badge>
        <h1 className="mt-4 text-4xl font-semibold tracking-[-0.06em] text-slate-950">
          Suspend or reactivate access
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-8 text-slate-600">
          Service state changes keep the records intact and preserve a clear
          operational trail.
        </p>
      </div>

      <Card className="border-slate-200/80 bg-white shadow-[0_18px_46px_rgba(15,23,42,0.06)]">
        <CardHeader>
          <CardDescription className="text-[10px] uppercase tracking-[0.28em] text-slate-500">
            Clients
          </CardDescription>
          <CardTitle className="text-2xl tracking-[-0.05em]">
            Quick status controls
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {clients.map((client) => (
            <div
              key={client.id}
              className="rounded-[1.4rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] px-4 py-4"
            >
              <div className="text-sm font-medium text-slate-950">
                {client.name}
              </div>
              <div className="text-xs uppercase tracking-[0.22em] text-slate-500">
                {client.service_status}
              </div>
              <div className="mt-4 flex gap-2">
                <form action={changeClientServiceStatusAction}>
                  <input type="hidden" name="clientId" value={client.id} />
                  <input type="hidden" name="serviceStatus" value="suspended" />
                  <input type="hidden" name="reason" value="Manual suspension from admin." />
                  <button className="rounded-full border border-rose-200 bg-rose-50 px-3 py-1.5 text-xs font-medium text-rose-700 transition hover:bg-rose-100">
                    Suspend
                  </button>
                </form>
                <form action={changeClientServiceStatusAction}>
                  <input type="hidden" name="clientId" value={client.id} />
                  <input type="hidden" name="serviceStatus" value="active" />
                  <input type="hidden" name="reason" value="Manual reactivation from admin." />
                  <button className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700 transition hover:bg-emerald-100">
                    Reactivate
                  </button>
                </form>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
