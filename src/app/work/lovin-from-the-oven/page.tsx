import Link from "next/link";
import { ArrowRight, Check, Shield, Sparkles } from "lucide-react";
import Header from "@/components/layout/Header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const highlights = [
  "Automated invoice sync between Unify (POS/orders) and Zoho Books (accounting)",
  "Real-time trigger — invoices generated in Zoho the moment an order is confirmed in Unify",
  "Zero manual data entry for the client after setup",
  "Error handling and logging so the client knows if something fails",
  "Clean handoff with documentation so the client owns the system",
];

const buildSpecs = [
  {
    title: "The brief",
    text: "Lovin from the Oven was manually creating invoices in Zoho Books every time an order came through Unify. It was repetitive, error-prone, and eating into the team's time. The goal was to connect the two systems so invoices were generated automatically — with no ongoing manual work.",
  },
  {
    title: "The result",
    text: "A live integration that runs silently in the background. Every Unify order triggers an automatic invoice in Zoho Books. The client saved hours of weekly admin work from day one — and the system runs without any developer involvement after handoff.",
  },
  {
    title: "The stack",
    text: "Built using the Unify and Zoho Books APIs with webhook automation through Zconnect. Error handling and logging built in from the start so the client has full visibility if anything needs attention.",
  },
];

export default function LovinFromTheOvenPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#F7FAFF] text-slate-900">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.18),transparent_26%),radial-gradient(circle_at_top_right,rgba(125,211,252,0.14),transparent_24%),linear-gradient(180deg,#ffffff_0%,#f6f9ff_42%,#eef4ff_100%)]" />
        <div className="absolute left-[-10%] top-[-8%] h-[24rem] w-[24rem] rounded-full bg-blue-200/40 blur-3xl" />
        <div className="absolute right-[-8%] top-[10rem] h-[22rem] w-[22rem] rounded-full bg-cyan-200/32 blur-3xl" />
        <div className="absolute bottom-[12%] left-[18%] h-[18rem] w-[18rem] rounded-full bg-indigo-200/28 blur-3xl" />
      </div>

      <Header />

      <section className="mx-auto max-w-7xl px-6 pb-20 pt-12 lg:px-10 lg:pb-28 lg:pt-20">
        <div className="max-w-3xl">
          <Badge>Zconnect — Systems &amp; Integrations</Badge>
          <h1 className="mt-6 text-5xl font-semibold leading-[0.92] tracking-[-0.06em] text-slate-950 md:text-7xl xl:text-[5.5rem]">
            Lovin from the Oven.
            <br />
            <span className="bg-[linear-gradient(180deg,#1d4ed8_0%,#3b82f6_45%,#7dd3fc_100%)] bg-clip-text text-transparent">
              Zero manual entry.
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 md:text-[1.16rem] md:leading-9">
            Automated invoice generation between Unify and Zoho Books for an
            Irish food business — no manual data entry, no errors, no developer
            needed to keep it running.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Button asChild size="lg" aria-label="Talk about Zconnect integrations">
              <Link href="/contact">
                Talk about Zconnect <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/work">See all work</Link>
            </Button>
          </div>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Card className="overflow-hidden border-slate-200 bg-white/95 p-4 shadow-[0_24px_70px_rgba(15,23,42,0.08)] lg:p-5">
            <div className="flex items-center justify-between gap-4">
              <Badge variant="secondary">Lovin from the Oven</Badge>
              <div className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-blue-700">
                Zconnect integration
              </div>
            </div>
            <div className="mt-4 overflow-hidden rounded-[1.8rem] border border-slate-200 bg-slate-100 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
              <div className="border-b border-slate-200 bg-slate-50 px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                  <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                  <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                </div>
              </div>
              <div className="relative aspect-[16/11] bg-slate-50 flex items-center justify-center p-8">
                <div className="flex w-full flex-col items-center gap-6">
                  <div className="text-[10px] uppercase tracking-[0.28em] text-blue-700">
                    Integration flow
                  </div>
                  <div className="flex flex-wrap items-center justify-center gap-3">
                    <div className="rounded-[1.2rem] border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-[0_8px_20px_rgba(15,23,42,0.05)]">
                      Unify
                    </div>
                    <ArrowRight className="h-4 w-4 shrink-0 text-blue-400" />
                    <div className="rounded-[1.2rem] border border-blue-100 bg-blue-50 px-5 py-3 text-sm font-semibold text-blue-900 shadow-[0_8px_20px_rgba(59,130,246,0.08)]">
                      Zconnect
                    </div>
                    <ArrowRight className="h-4 w-4 shrink-0 text-blue-400" />
                    <div className="rounded-[1.2rem] border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-[0_8px_20px_rgba(15,23,42,0.05)]">
                      Zoho Books
                    </div>
                  </div>
                  <p className="max-w-xs text-center text-xs text-slate-500">
                    Order confirmed in Unify → invoice generated automatically in Zoho Books
                  </p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="overflow-hidden border-slate-200/80 bg-white shadow-[0_28px_84px_rgba(15,23,42,0.1)]">
            <CardHeader>
              <Badge variant="secondary">What we built</Badge>
              <CardTitle className="mt-4 text-3xl tracking-[-0.05em]">
                Two systems, one automated flow.
              </CardTitle>
              <CardDescription className="mt-3 max-w-2xl text-base leading-7">
                A private integration that removed repetitive admin work from a
                real business — built once, runs indefinitely.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {highlights.map((point) => (
                <div
                  key={point}
                  className="flex items-center gap-3 rounded-[1.2rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] px-4 py-3 text-sm text-slate-700"
                >
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-50 text-blue-700">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  {point}
                </div>
              ))}
              <Separator className="my-5" />
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  "Unify API",
                  "Zoho Books API",
                  "Webhook automation",
                  "Zconnect",
                ].map((tech) => (
                  <Card
                    key={tech}
                    className="border-slate-200/80 bg-white shadow-[0_12px_28px_rgba(15,23,42,0.05)]"
                  >
                    <CardContent className="flex items-center gap-3 px-4 py-3 text-sm text-slate-700">
                      <Shield className="h-4 w-4 text-blue-700" />
                      {tech}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {buildSpecs.map((shot) => (
            <Card
              key={shot.title}
              className="overflow-hidden border-slate-200 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.06)]"
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between gap-4">
                  <Badge variant="outline">{shot.title}</Badge>
                  <Sparkles className="h-4 w-4 text-blue-600" />
                </div>
                <CardTitle className="mt-4 text-xl tracking-[-0.04em] text-slate-950">
                  Lovin from the Oven
                </CardTitle>
                <CardDescription className="mt-2 max-w-xl text-sm leading-6 text-slate-600">
                  {shot.text}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        <div className="mt-20 border-t border-slate-200/80 pt-16">
          <Badge>Interested in a similar integration?</Badge>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-slate-950 md:text-5xl">
            Talk about Zconnect.
          </h2>
          <p className="mt-4 max-w-xl text-lg leading-8 text-slate-700">
            If your business runs on tools that don&apos;t talk to each other,
            Zconnect can connect them. No ongoing developer fees — just a clean
            system that runs after handoff.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button asChild size="lg">
              <Link href="/contact">
                Talk about Zconnect <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/work">See all work</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
