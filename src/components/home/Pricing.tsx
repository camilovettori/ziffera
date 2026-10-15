import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Landing page",
    price: "€400",
    monthly: "+ €25/month",
    for: "One page for one clear offer. The fastest way to get online.",
    items: ["Mobile-first and easy to manage", "Fast launch, simple structure", "Contact or booking button"],
  },
  {
    name: "Business website",
    price: "from €600",
    monthly: "+ €30/month",
    for: "A few pages for a service business that needs enquiries.",
    items: ["Multi-page, built to get enquiries", "CMS for easy updates", "Booking or quote form"],
    featured: true,
  },
  {
    name: "Online shop",
    price: "from €800",
    monthly: "+ €35/month",
    for: "Sell products with card, Apple Pay and Google Pay.",
    items: ["Stripe checkout, mobile-friendly", "Clear product and checkout flow", "Admin for products and orders"],
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="border-y border-line bg-surface">
      <div className="mx-auto max-w-7xl px-5 py-20 lg:px-10 lg:py-28">
        <div className="max-w-2xl">
          <h2 className="text-4xl font-extrabold tracking-[-0.045em] text-ink md:text-5xl">
            Fixed prices, no lock-in
          </h2>
          <p className="mt-4 text-lg leading-8 text-ink-2">
            Half up front, half when you&apos;re happy. The monthly fee covers hosting,
            security updates and small changes, and you can cancel it any time.
          </p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {plans.map((p) => (
            <article
              key={p.name}
              className={cn(
                "flex flex-col rounded-2xl border p-7",
                p.featured
                  ? "border-z-blue bg-surface shadow-[0_0_0_4px_rgba(31,91,255,0.08),0_24px_48px_-28px_rgba(31,91,255,0.6)]"
                  : "border-line bg-paper"
              )}
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-lg font-bold tracking-[-0.02em] text-ink">{p.name}</h3>
                {p.featured ? (
                  <span className="rounded-full bg-z-wash px-2.5 py-0.5 text-xs font-medium text-z-deep">
                    Most chosen
                  </span>
                ) : null}
              </div>
              <p className="mt-5 flex items-baseline gap-2">
                <span className="text-4xl font-extrabold tracking-[-0.04em] text-ink">{p.price}</span>
                <span className="font-mono text-sm text-ink-3">{p.monthly}</span>
              </p>
              <p className="mt-3 text-[15px] leading-6 text-ink-2">{p.for}</p>
              <ul className="mt-6 flex-1 space-y-2.5 border-t border-line pt-6">
                {p.items.map((it) => (
                  <li key={it} className="flex gap-3 text-[15px] text-ink">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-z-blue" aria-hidden="true" />
                    {it}
                  </li>
                ))}
              </ul>
              <Button asChild variant={p.featured ? "default" : "outline"} className="mt-8 w-full">
                <Link href="/contact">Get a quote</Link>
              </Button>
            </article>
          ))}
        </div>

        <div className="mt-5 flex flex-col gap-4 rounded-2xl border border-dashed border-line-strong bg-paper p-7 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-bold tracking-[-0.02em] text-ink">
              Custom systems and integrations
            </h3>
            <p className="mt-1 max-w-xl text-[15px] leading-6 text-ink-2">
              Dashboards, internal tools, or connecting the apps you already use, like Zconnect.
              Software projects start from €1,800.
            </p>
          </div>
          <div className="flex shrink-0 gap-3">
            <Button asChild variant="outline">
              <Link href="/pricing">All pricing</Link>
            </Button>
            <Button asChild>
              <Link href="/contact">Discuss a system</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
