import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { EmbeddedCheckoutFlow } from "@/components/checkout/embedded-checkout-flow";
import {
  getSiteCheckoutFlowDefinition,
  type SiteCheckoutFlowSlug,
} from "@/lib/site-checkout";

export const dynamic = "force-dynamic";

function isCheckoutFlowSlug(value: string): value is SiteCheckoutFlowSlug {
  return value === "monthly" || value === "setup-deposit" || value === "setup-final";
}

export default async function CheckoutFlowPage({
  params,
}: {
  params: Promise<{ flow: string }>;
}) {
  const { flow } = await params;
  if (!isCheckoutFlowSlug(flow)) {
    notFound();
  }

  const definition = getSiteCheckoutFlowDefinition(flow);
  const bullets = [
    definition.priceLabel,
    definition.mode === "subscription" && definition.trialDays > 0
      ? `${definition.trialDays}-day free trial`
      : "Secure embedded checkout",
    "Built into the Ziffera website",
  ].filter(Boolean) as string[];

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#F7FAFF] text-slate-900">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.18),transparent_26%),radial-gradient(circle_at_top_right,rgba(125,211,252,0.14),transparent_24%),linear-gradient(180deg,#ffffff_0%,#f6f9ff_42%,#eef4ff_100%)]" />
      </div>

      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-10 lg:grid-cols-[0.94fr_1.06fr] lg:px-10 lg:py-16">
        <div className="max-w-2xl">
          <Badge>{definition.title}</Badge>
          <h1 className="mt-6 text-5xl font-semibold leading-[0.94] tracking-[-0.06em] text-slate-950 md:text-7xl xl:text-[5.25rem]">
            Embedded checkout
            <br />
            inside Ziffera.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 md:text-[1.16rem] md:leading-9">
            A clean, production-ready checkout surface for recurring subscriptions
            and one-time payments. The experience stays on-site and feels native
            to the Ziffera brand.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {bullets.map((bullet) => (
              <Card
                key={bullet}
                className="border-slate-200/80 bg-white shadow-[0_14px_32px_rgba(15,23,42,0.05)]"
              >
                <CardContent className="px-4 py-3 text-sm font-medium text-slate-700">
                  {bullet}
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mt-8 border-blue-100/80 bg-[linear-gradient(180deg,#eff6ff_0%,#ffffff_100%)] shadow-[0_18px_42px_rgba(59,130,246,0.08)]">
            <CardContent className="px-5 py-4 text-sm leading-7 text-slate-700">
              Support: support@ziffera.ie
            </CardContent>
          </Card>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild variant="outline" size="lg">
              <Link href="/">Back to Ziffera</Link>
            </Button>
          </div>
        </div>

        <Card className="overflow-hidden border-slate-200/80 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] shadow-[0_28px_84px_rgba(15,23,42,0.1)]">
          <CardHeader className="pb-5">
            <Badge>Checkout form</Badge>
            <CardTitle className="mt-4 text-3xl tracking-[-0.05em]">
              {definition.title}
            </CardTitle>
            <CardDescription className="mt-3 max-w-2xl text-base leading-7">
              {definition.priceLabel}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <EmbeddedCheckoutFlow
              apiPath={`/api/checkout/${flow}`}
              successHref={definition.successPath}
              cancelHref={definition.cancelPath}
              supportEmail="support@ziffera.ie"
              buttonLabel={
                definition.mode === "subscription"
                  ? "Start free trial"
                  : "Continue to payment"
              }
              checkoutCopy="The secure checkout loads inside this page once your details are confirmed."
              bullets={bullets}
            />
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
