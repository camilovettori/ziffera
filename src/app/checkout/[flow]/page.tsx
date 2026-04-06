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

function getCheckoutCopy(flow: SiteCheckoutFlowSlug) {
  if (flow === "setup-deposit") {
    return {
      eyebrow: "Website setup deposit",
      title: "Secure your project with a 50% deposit.",
      description:
        "This deposit reserves your build slot and lets us begin your website project. The remaining 50% is only due before the site goes live.",
      details: [
        "€250 deposit today",
        "€250 before launch",
        "€25/month after launch",
      ],
      buttonLabel: "Continue to secure deposit",
    };
  }

  if (flow === "setup-final") {
    return {
      eyebrow: "Website final payment",
      title: "Complete your website before go-live.",
      description:
        "Use this payment to settle the remaining balance before the website goes live.",
      details: ["€250 final payment", "Due before launch", "Monthly plan starts after launch"],
      buttonLabel: "Continue to final payment",
    };
  }

  return {
    eyebrow: "Monthly plan",
    title: "Website hosting and support after launch.",
    description:
      "The monthly plan starts when the website goes live and keeps the site supported afterwards.",
    details: ["€25/month", "Starts after launch", "Hosting and maintenance included"],
    buttonLabel: "Continue to monthly plan",
  };
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
  const copy = getCheckoutCopy(flow);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#F7FAFF] text-slate-900">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.18),transparent_26%),radial-gradient(circle_at_top_right,rgba(125,211,252,0.14),transparent_24%),linear-gradient(180deg,#ffffff_0%,#f6f9ff_42%,#eef4ff_100%)]" />
      </div>

      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-10 lg:grid-cols-[0.94fr_1.06fr] lg:px-10 lg:py-16">
        <div className="max-w-2xl">
          <Badge>{copy.eyebrow}</Badge>
          <h1 className="mt-6 text-5xl font-semibold leading-[0.94] tracking-[-0.06em] text-slate-950 md:text-7xl xl:text-[5.25rem]">
            {copy.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 md:text-[1.16rem] md:leading-9">
            {copy.description}
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {copy.details.map((detail) => (
              <Card
                key={detail}
                className="border-slate-200/80 bg-white shadow-[0_14px_32px_rgba(15,23,42,0.05)]"
              >
                <CardContent className="px-4 py-3 text-sm font-medium text-slate-700">
                  {detail}
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mt-8 border-blue-100/80 bg-[linear-gradient(180deg,#eff6ff_0%,#ffffff_100%)] shadow-[0_18px_42px_rgba(59,130,246,0.08)]">
            <CardContent className="px-5 py-4 text-sm leading-7 text-slate-700">
              Secure payment powered by Stripe. Questions? Contact
              support@ziffera.ie.
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
            <Badge>Payment form</Badge>
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
              buttonLabel={copy.buttonLabel}
              checkoutCopy="Complete your payment below to continue."
              bullets={copy.details}
            />
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
