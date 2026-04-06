import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { SiteCheckoutFlowSlug } from "@/lib/site-checkout";

function isCheckoutFlowSlug(value: string): value is SiteCheckoutFlowSlug {
  return value === "monthly" || value === "setup-deposit" || value === "setup-final";
}

function getSuccessCopy(flow: SiteCheckoutFlowSlug) {
  if (flow === "setup-deposit") {
    return {
      badge: "Deposit received",
      title: "Your website project is reserved.",
      description:
        "We&apos;ve received your deposit and will follow up with the next steps. Support: support@ziffera.ie.",
      note: "Your build slot is secured.",
    };
  }

  if (flow === "setup-final") {
    return {
      badge: "Final payment received",
      title: "Your website is ready to go live.",
      description:
        "We&apos;ve received your final payment and will continue with the launch steps. Support: support@ziffera.ie.",
      note: "Final payment confirmed.",
    };
  }

  return {
    badge: "Monthly plan active",
    title: "Your monthly support plan is ready.",
    description:
      "Your plan will start when the website goes live. Support: support@ziffera.ie.",
    note: "Hosting and support will continue after launch.",
  };
}

export default async function CheckoutFlowSuccessPage({
  params,
}: {
  params: Promise<{ flow: string }>;
}) {
  const { flow } = await params;
  if (!isCheckoutFlowSlug(flow)) {
    notFound();
  }

  const copy = getSuccessCopy(flow);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#F7FAFF] text-slate-900">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.18),transparent_26%),radial-gradient(circle_at_top_right,rgba(125,211,252,0.14),transparent_24%),linear-gradient(180deg,#ffffff_0%,#f6f9ff_42%,#eef4ff_100%)]" />
      </div>

      <section className="mx-auto flex min-h-screen max-w-4xl items-center px-6 py-16 lg:px-10">
        <Card className="w-full overflow-hidden border-slate-200/80 bg-white shadow-[0_28px_84px_rgba(15,23,42,0.1)]">
          <CardHeader className="pb-4">
            <Badge>{copy.badge}</Badge>
            <CardTitle className="mt-5 text-4xl tracking-[-0.05em]">
              {copy.title}
            </CardTitle>
            <CardDescription className="mt-3 max-w-2xl text-base leading-7">
              {copy.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-[1.4rem] border border-blue-100 bg-[linear-gradient(180deg,#eff6ff_0%,#ffffff_100%)] px-5 py-4 text-sm leading-7 text-slate-700">
              {copy.note}
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild>
                <Link href="/">Back to Ziffera</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href={`/checkout/${flow}`}>Review payment</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
