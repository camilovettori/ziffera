import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import Header from "@/components/layout/Header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function WorkPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#F0F4FF] text-slate-900">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.14),transparent_26%),radial-gradient(circle_at_top_right,rgba(124,58,237,0.1),transparent_24%),linear-gradient(180deg,#ffffff_0%,#f5f9ff_40%,#eef4ff_100%)]" />
        <div className="absolute left-[-10%] top-[-8%] h-[24rem] w-[24rem] rounded-full bg-blue-200/40 blur-3xl" />
        <div className="absolute right-[-8%] top-[10rem] h-[22rem] w-[22rem] rounded-full bg-cyan-200/32 blur-3xl" />
        <div className="absolute bottom-[12%] left-[18%] h-[18rem] w-[18rem] rounded-full bg-indigo-200/28 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.04] [background-image:linear-gradient(rgba(15,23,42,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.12)_1px,transparent_1px)] [background-size:84px_84px]" />
      </div>

      <Header />

      <section className="mx-auto max-w-7xl px-6 pb-20 pt-12 lg:px-10 lg:pb-28 lg:pt-20">
        <div className="max-w-3xl">
          <Badge>Our work</Badge>
          <h1 className="mt-6 text-5xl font-semibold leading-[0.92] tracking-[-0.06em] text-slate-950 md:text-7xl xl:text-[5.5rem]">
            Real builds.
            <br />
            <span className="bg-[linear-gradient(180deg,#1d4ed8_0%,#3b82f6_45%,#7dd3fc_100%)] bg-clip-text text-transparent">
              Live results.
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 md:text-[1.16rem] md:leading-9">
            Every project shown here is live and serving real customers. No
            mock-up galleries, no concept designs — just working products.
          </p>
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-[0.94fr_1.06fr]">
          <div className="max-w-2xl">
            <Badge>Real client project</Badge>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-slate-950 md:text-5xl">
              Frequency Framed.
            </h2>
            <p className="mt-4 max-w-xl text-lg leading-8 text-slate-600">
              A live e-commerce build with Stripe checkout, an admin panel, and
              a polished storefront. The only real project featured here.
            </p>

            <div className="mt-6 rounded-[1.6rem] border border-blue-100 bg-white px-5 py-4 shadow-[0_16px_38px_rgba(59,130,246,0.08)]">
              <div className="text-[10px] uppercase tracking-[0.28em] text-blue-700">
                Live proof
              </div>
              <div className="mt-2 text-base font-semibold text-slate-900">
                Frequency Framed is live at frequencyframed.ie.
              </div>
            </div>

            <div className="mt-8 grid gap-3">
              {[
                "Live website at frequencyframed.ie",
                "Stripe checkout and admin flow included",
                "A real client build, not a mock-up gallery",
              ].map((point) => (
                <Card
                  key={point}
                  className="border-slate-200/80 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] shadow-[0_12px_28px_rgba(15,23,42,0.05)]"
                >
                  <CardContent className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-700">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-50 text-blue-700">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    {point}
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <Button asChild size="lg" aria-label="See the full Frequency Framed case study">
                <Link href="/work/frequency-framed">
                  Full case study <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" aria-label="View the live Frequency Framed website">
                <a
                  href="https://www.frequencyframed.ie"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View live proof
                </a>
              </Button>
            </div>
          </div>

          <div className="grid gap-4">
            <Card className="overflow-hidden border-slate-200 bg-white/95 p-4 shadow-[0_24px_70px_rgba(15,23,42,0.08)] lg:p-5">
              <div className="flex items-center justify-between gap-4">
                <Badge variant="secondary">Frequency Framed</Badge>
                <div className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-blue-700">
                  Live client work
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
                <div className="relative aspect-[16/11] bg-slate-200">
                  <Image
                    src="/examples/homepage.png"
                    alt="Frequency Framed homepage preview"
                    fill
                    sizes="(max-width: 1024px) 100vw, 56vw"
                    className="object-cover object-top"
                  />
                </div>
              </div>
            </Card>

            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { title: "Homepage", text: "Clear structure that leads visitors toward action." },
                { title: "Checkout", text: "Embedded Stripe flow with a simple payment path." },
                { title: "Admin", text: "Practical controls for ongoing management." },
              ].map((shot) => (
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
                      Frequency Framed
                    </CardTitle>
                    <CardDescription className="mt-2 max-w-xl text-sm leading-6 text-slate-600">
                      {shot.text}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-20 border-t border-slate-200/80 pt-16">
          <div className="grid gap-10 lg:grid-cols-[0.94fr_1.06fr]">
            <div className="max-w-2xl">
              <Badge>Live client project</Badge>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-slate-950 md:text-5xl">
                Rub &amp; Scrub.
              </h2>
              <p className="mt-4 max-w-xl text-lg leading-8 text-slate-600">
                Mobile car valeting business in Dublin. WhatsApp booking flow,
                before/after gallery, and a clean service site built to convert.
              </p>

              <div className="mt-6 rounded-[1.6rem] border border-blue-100 bg-white px-5 py-4 shadow-[0_16px_38px_rgba(59,130,246,0.08)]">
                <div className="text-[10px] uppercase tracking-[0.28em] text-blue-700">
                  Live proof
                </div>
                <div className="mt-2 text-base font-semibold text-slate-900">
                  Rub &amp; Scrub is live at rubandscrub.ie.
                </div>
              </div>

              <div className="mt-8 grid gap-3">
                {[
                  "Live website at rubandscrub.ie",
                  "WhatsApp booking flow with pre-filled message",
                  "Before/after gallery and customer reviews",
                ].map((point) => (
                  <Card
                    key={point}
                    className="border-slate-200/80 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] shadow-[0_12px_28px_rgba(15,23,42,0.05)]"
                  >
                    <CardContent className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-700">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-50 text-blue-700">
                        <Check className="h-3.5 w-3.5" />
                      </span>
                      {point}
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <Button asChild size="lg" aria-label="See the full Rub and Scrub case study">
                  <Link href="/work/rub-and-scrub">
                    Full case study <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" aria-label="View the live Rub and Scrub website">
                  <a
                    href="https://www.rubandscrub.ie"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View live site
                  </a>
                </Button>
              </div>
            </div>

            <div className="grid gap-4">
              <Card className="overflow-hidden border-slate-200 bg-white/95 p-4 shadow-[0_24px_70px_rgba(15,23,42,0.08)] lg:p-5">
                <div className="flex items-center justify-between gap-4">
                  <Badge variant="secondary">Rub &amp; Scrub</Badge>
                  <div className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-blue-700">
                    Live client work
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
                  <div className="relative aspect-[16/11] bg-slate-200">
                    <Image
                      src="/examples/rub-and-scrub.png"
                      alt="Rub and Scrub homepage preview"
                      fill
                      sizes="(max-width: 1024px) 100vw, 56vw"
                      className="object-cover object-top"
                    />
                  </div>
                </div>
              </Card>

              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  { title: "Booking", text: "WhatsApp flow that opens with a pre-filled message — no back-and-forth." },
                  { title: "Gallery", text: "Before/after photos that show the quality of work before the customer commits." },
                  { title: "Reviews", text: "Customer reviews section that builds trust with new visitors." },
                ].map((shot) => (
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
                        Rub &amp; Scrub
                      </CardTitle>
                      <CardDescription className="mt-2 max-w-xl text-sm leading-6 text-slate-600">
                        {shot.text}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 border-t border-slate-200/80 pt-16">
          <div className="grid gap-10 lg:grid-cols-[0.94fr_1.06fr]">
            <div className="max-w-2xl">
              <Badge>Zconnect — Systems &amp; Integrations</Badge>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-slate-950 md:text-5xl">
                Lovin from the Oven.
              </h2>
              <p className="mt-4 max-w-xl text-lg leading-8 text-slate-600">
                Automated invoice sync between Unify and Zoho Books for an Irish
                food business. Zero manual entry, real-time triggers, clean
                handoff.
              </p>

              <div className="mt-6 rounded-[1.6rem] border border-blue-100 bg-white px-5 py-4 shadow-[0_16px_38px_rgba(59,130,246,0.08)]">
                <div className="text-[10px] uppercase tracking-[0.28em] text-blue-700">
                  What it does
                </div>
                <div className="mt-2 text-base font-semibold text-slate-900">
                  Unify orders → Zoho Books invoices, automatically.
                </div>
              </div>

              <div className="mt-8 grid gap-3">
                {[
                  "Unify → Zoho Books automated in real time",
                  "Hours of weekly admin eliminated from day one",
                  "System runs without developer involvement after handoff",
                ].map((point) => (
                  <Card
                    key={point}
                    className="border-slate-200/80 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] shadow-[0_12px_28px_rgba(15,23,42,0.05)]"
                  >
                    <CardContent className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-700">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-50 text-blue-700">
                        <Check className="h-3.5 w-3.5" />
                      </span>
                      {point}
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <Button asChild size="lg" aria-label="See the full Lovin from the Oven case study">
                  <Link href="/work/lovin-from-the-oven">
                    Full case study <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/contact">Talk about Zconnect</Link>
                </Button>
              </div>
            </div>

            <div className="grid gap-4">
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
                  <div className="relative aspect-[16/11] flex items-center justify-center bg-slate-50 p-8">
                    <div className="flex w-full flex-col items-center gap-5">
                      <div className="text-[10px] uppercase tracking-[0.28em] text-blue-700">
                        Integration flow
                      </div>
                      <div className="flex flex-wrap items-center justify-center gap-3">
                        <div className="rounded-[1.2rem] border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 shadow-[0_8px_20px_rgba(15,23,42,0.05)]">
                          Unify
                        </div>
                        <ArrowRight className="h-4 w-4 shrink-0 text-blue-400" />
                        <div className="rounded-[1.2rem] border border-blue-100 bg-blue-50 px-4 py-3 text-sm font-semibold text-blue-900 shadow-[0_8px_20px_rgba(59,130,246,0.08)]">
                          Zconnect
                        </div>
                        <ArrowRight className="h-4 w-4 shrink-0 text-blue-400" />
                        <div className="rounded-[1.2rem] border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 shadow-[0_8px_20px_rgba(15,23,42,0.05)]">
                          Zoho Books
                        </div>
                      </div>
                      <p className="max-w-[16rem] text-center text-xs text-slate-500">
                        Order confirmed → invoice generated automatically
                      </p>
                    </div>
                  </div>
                </div>
              </Card>

              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  { title: "Integration", text: "Unify and Zoho Books connected via webhook — no polling, no delay." },
                  { title: "Automation", text: "Every confirmed order generates an invoice immediately, without any manual step." },
                  { title: "Handoff", text: "Full documentation handed to the client so the system is theirs to own." },
                ].map((shot) => (
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
            </div>
          </div>
        </div>

        <div className="mt-20 border-t border-slate-200/80 pt-16">
          <Badge>Start your project</Badge>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-slate-950 md:text-5xl">
            Want a build like this?
          </h2>
          <p className="mt-4 max-w-xl text-lg leading-8 text-slate-700">
            The same quality of work is available for your business. A clear
            process, a fixed price, and a live result in 7 days.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button asChild size="lg">
              <Link href="/checkout/setup-deposit">
                Start your website <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/contact">Talk to Ziffera</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
