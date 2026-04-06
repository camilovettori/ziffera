import Link from "next/link";
import { ArrowRight, Check, Shield, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const highlights = [
  "Clear margin visibility for practical decisions",
  "Premium trial onboarding with Stripe",
  "Built to feel trustworthy from the first click",
];

const features = [
  "€25/month promotional pricing",
  "14-day free trial",
  "Secure embedded Stripe checkout",
  "Admin-friendly client setup",
];

export default function MarginFlowPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#F7FAFF] text-slate-900">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.18),transparent_26%),radial-gradient(circle_at_top_right,rgba(125,211,252,0.14),transparent_24%),linear-gradient(180deg,#ffffff_0%,#f6f9ff_42%,#eef4ff_100%)]" />
        <div className="absolute left-[-10%] top-[-8%] h-[24rem] w-[24rem] rounded-full bg-blue-200/40 blur-3xl" />
        <div className="absolute right-[-8%] top-[10rem] h-[22rem] w-[22rem] rounded-full bg-cyan-200/32 blur-3xl" />
        <div className="absolute bottom-[12%] left-[18%] h-[18rem] w-[18rem] rounded-full bg-indigo-200/28 blur-3xl" />
      </div>

      <section className="mx-auto max-w-7xl px-6 pb-20 pt-12 lg:px-10 lg:pb-28 lg:pt-20">
        <div className="max-w-3xl">
          <Badge>MarginFlow</Badge>
          <h1 className="mt-6 text-5xl font-semibold leading-[0.92] tracking-[-0.06em] text-slate-950 md:text-7xl xl:text-[5.5rem]">
            Clear margin tracking
            <br />
            <span className="bg-[linear-gradient(180deg,#1d4ed8_0%,#3b82f6_45%,#7dd3fc_100%)] bg-clip-text text-transparent">
              with a calm, premium trial.
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 md:text-[1.16rem] md:leading-9">
            MarginFlow helps small businesses see the numbers behind each
            product and make better decisions without clutter or noise.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Card className="border-slate-200/80 bg-white shadow-[0_14px_32px_rgba(15,23,42,0.05)]">
              <CardContent className="px-4 py-3 text-sm font-medium text-slate-700">
                €25/month
              </CardContent>
            </Card>
            <Card className="border-slate-200/80 bg-white shadow-[0_14px_32px_rgba(15,23,42,0.05)]">
              <CardContent className="px-4 py-3 text-sm font-medium text-slate-700">
                14-day free trial
              </CardContent>
            </Card>
            <Card className="border-slate-200/80 bg-white shadow-[0_14px_32px_rgba(15,23,42,0.05)]">
              <CardContent className="px-4 py-3 text-sm font-medium text-slate-700">
                Secure embedded checkout
              </CardContent>
            </Card>
          </div>

          <div className="mt-9 flex flex-wrap gap-4">
            <Button asChild size="lg">
              <Link href="/checkout/monthly">
                Start free trial
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/contact">Talk to Ziffera</Link>
            </Button>
          </div>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-[1.02fr_0.98fr]">
          <Card className="overflow-hidden border-slate-200/80 bg-white shadow-[0_28px_84px_rgba(15,23,42,0.1)]">
            <CardHeader>
              <Badge variant="secondary">What you get</Badge>
              <CardTitle className="mt-4 text-3xl tracking-[-0.05em]">
                Built for clarity and trust.
              </CardTitle>
              <CardDescription className="mt-3 max-w-2xl text-base leading-7">
                The experience stays minimal and direct so the value feels
                obvious from the first interaction.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {highlights.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-[1.2rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] px-4 py-3 text-sm text-slate-700"
                >
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-50 text-blue-700">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  {item}
                </div>
              ))}

              <Separator className="my-5" />

              <div className="grid gap-3 sm:grid-cols-2">
                {features.map((feature) => (
                  <Card
                    key={feature}
                    className="border-slate-200/80 bg-white shadow-[0_12px_28px_rgba(15,23,42,0.05)]"
                  >
                    <CardContent className="flex items-center gap-3 px-4 py-3 text-sm text-slate-700">
                      <Shield className="h-4 w-4 text-blue-700" />
                      {feature}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden border-blue-100/80 bg-[linear-gradient(180deg,#eff6ff_0%,#ffffff_100%)] shadow-[0_24px_72px_rgba(59,130,246,0.08)]">
            <CardHeader>
              <Badge>Pricing</Badge>
              <CardTitle className="mt-4 text-4xl tracking-[-0.05em]">
                €25 / month
              </CardTitle>
              <CardDescription className="mt-3 max-w-xl text-base leading-7">
                A focused promotional plan with a 14-day free trial and a secure
                embedded checkout flow managed through Ziffera Core.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-[1.4rem] border border-blue-100 bg-white px-5 py-5 text-sm leading-7 text-slate-700">
                <div className="flex items-start gap-3">
                  <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-blue-700" />
                  <p>
                    The checkout flow is built to feel calm and trustworthy, and
                    your subscription details are synchronized into the Ziffera
                    admin automatically after Stripe confirms the subscription.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}
