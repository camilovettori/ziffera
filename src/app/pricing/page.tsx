import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { Check } from "lucide-react";
import Header from "@/components/layout/Header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Website Pricing — Ziffera",
  description:
    "Simple, transparent pricing for landing pages, business websites, and e-commerce stores.",
  alternates: {
    canonical: "/pricing",
  },
  openGraph: {
    title: "Website Pricing — Ziffera",
    description:
      "Simple, transparent pricing for landing pages, business websites, and e-commerce stores.",
    url: "https://www.ziffera.ie/pricing",
    siteName: "Ziffera",
    type: "website",
    images: [
      {
        url: "/examples/homepage.png",
        width: 1200,
        height: 630,
        alt: "Ziffera website preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Website Pricing — Ziffera",
    description:
      "Simple, transparent pricing for landing pages, business websites, and e-commerce stores.",
    images: ["/examples/homepage.png"],
  },
};

type Offer = {
  title: string;
  badge: string;
  description: string;
  price: ReactNode;
  monthly?: ReactNode;
  previousPrice?: ReactNode;
  features: string[];
  ctaLabel: string;
  ctaHref: string;
  highlighted?: boolean;
  secondary?: boolean;
};

const websiteOffers: Offer[] = [
  {
    title: "Landing Page",
    badge: "Launch offer",
    description:
      "A focused page for one clear offer. Fast to launch, easy to understand, and built to convert.",
    price: (
      <span className="text-4xl font-semibold tracking-[-0.05em] text-slate-950">
        &euro;400 setup
      </span>
    ),
    monthly: (
      <span className="text-sm font-medium text-slate-600">
        + &euro;25/month after launch
      </span>
    ),
    features: [
      "Best for one clear offer",
      "Fast launch and simple structure",
      "Mobile-first and easy to manage",
      "Great entry point for a new website",
    ],
    ctaLabel: "Get your website",
    ctaHref: "/contact",
  },
  {
    title: "Business Website",
    badge: "Most Popular",
    description:
      "The main website offer for most businesses. Stronger structure, better trust, and a cleaner path to enquiry.",
    price: (
      <span className="text-4xl font-semibold tracking-[-0.05em] text-slate-950">
        From &euro;600
      </span>
    ),
    monthly: (
      <span className="text-sm font-medium text-slate-600">
        + &euro;30/month after launch
      </span>
    ),
    previousPrice: (
      <span className="text-[10px] font-medium uppercase tracking-[0.24em] text-slate-400 line-through">
        From &euro;900
      </span>
    ),
    features: [
      "Best for most service businesses",
      "Multi-page and conversion-focused",
      "CMS available for easy updates",
      "Designed to build trust quickly",
    ],
    ctaLabel: "Start your website",
    ctaHref: "/contact",
    highlighted: true,
  },
  {
    title: "E-commerce Store",
    badge: "Sell online",
    description:
      "A premium store for businesses that need payments, product pages, and a smoother buying flow.",
    price: (
      <span className="text-4xl font-semibold tracking-[-0.05em] text-slate-950">
        From &euro;800
      </span>
    ),
    monthly: (
      <span className="text-sm font-medium text-slate-600">
        + &euro;35/month after launch
      </span>
    ),
    previousPrice: (
      <span className="text-[10px] font-medium uppercase tracking-[0.24em] text-slate-400 line-through">
        From &euro;1,500
      </span>
    ),
    features: [
      "Best for selling products online",
      "Payment-ready and mobile-friendly",
      "Clear product and checkout flow",
      "Built to make buying feel easy",
    ],
    ctaLabel: "Start selling online",
    ctaHref: "/contact",
  },
];

const secondaryOffers: Offer[] = [
  {
    title: "Systems & Integrations",
    badge: "Secondary offer",
    description:
      "Custom workflows, integrations, and connected systems for businesses that need more than a website.",
    price: (
      <span className="text-3xl font-semibold tracking-[-0.05em] text-slate-950">
        Project quote
      </span>
    ),
    features: [
      "Automations and connected workflows",
      "Internal tools and admin processes",
      "Scoped to the business requirements",
    ],
    ctaLabel: "Discuss project",
    ctaHref: "/contact",
    secondary: true,
  },
  {
    title: "SaaS & Custom Software",
    badge: "Custom build",
    description:
      "Project-based software work for products, dashboards, portals, and custom business tools.",
    price: (
      <span className="text-3xl font-semibold tracking-[-0.05em] text-slate-950">
        From &euro;1,800
      </span>
    ),
    features: [
      "Bespoke product or platform builds",
      "Project-based delivery and scope",
      "Best for custom software work",
    ],
    ctaLabel: "Request a quote",
    ctaHref: "/contact",
    secondary: true,
  },
];

const supportHighlights = [
  "No hidden fees",
  "No long-term contracts",
  "Cancel anytime",
  "Most projects delivered in under 2 weeks",
];

const afterLaunch = [
  "Hosting and security updates",
  "Basic maintenance and support",
  "Small text or image changes",
  "A website that stays online and working properly",
];

const faqs = [
  {
    question: "How does payment work?",
    answer:
      "The website offers start with a setup payment, the rest is settled before launch, and the monthly plan begins after the site goes live.",
  },
  {
    question: "Which offer should I choose?",
    answer:
      "Landing Page is best for one clear offer, Business Website is the main default, and E-commerce Store is for selling online.",
  },
  {
    question: "What about systems or software?",
    answer:
      "Systems & Integrations and SaaS & Custom Software are scoped separately when the project needs more custom logic.",
  },
  {
    question: "Can I make changes after launch?",
    answer:
      "Yes. The monthly plan keeps the site supported, and small text or image changes stay simple.",
  },
];

function OfferCard({ offer }: { offer: Offer }) {
  const buttonVariant = offer.highlighted || !offer.secondary ? "default" : "outline";

  return (
    <Card
      className={[
        "flex h-full flex-col overflow-hidden rounded-[28px] border bg-white transition duration-300",
        offer.highlighted
          ? "border-blue-200 bg-[linear-gradient(180deg,#eff6ff_0%,#ffffff_100%)] shadow-[0_28px_72px_rgba(59,130,246,0.12)] lg:-translate-y-2"
          : "border-slate-200/80 shadow-[0_12px_28px_rgba(15,23,42,0.05)]",
      ].join(" ")}
    >
      <CardHeader className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <Badge
            variant={offer.highlighted ? "secondary" : "secondary"}
            className={[
              "w-fit px-3 py-1 text-[10px] uppercase tracking-[0.22em]",
              offer.highlighted
                ? "border border-blue-200 bg-blue-50 text-blue-700"
                : "border border-slate-200 bg-slate-50 text-slate-600",
            ].join(" ")}
          >
            {offer.badge}
          </Badge>
          {offer.previousPrice ? <div className="pt-1 text-right">{offer.previousPrice}</div> : null}
        </div>

        <div className="space-y-2">
          <CardTitle className="text-3xl tracking-[-0.05em] text-slate-950">
            {offer.title}
          </CardTitle>
          <CardDescription className="max-w-xl text-base leading-7 text-slate-700">
            {offer.description}
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col px-6 pb-6">
        <div className="space-y-2">
          {offer.price}
          {offer.monthly ? <div>{offer.monthly}</div> : null}
        </div>

        <div className="mt-6 grid gap-3">
          {offer.features.map((feature) => (
            <div
              key={feature}
              className="flex items-start gap-3 rounded-[1.15rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] px-4 py-3 text-sm leading-6 text-slate-700"
            >
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-700">
                <Check className="h-3.5 w-3.5" />
              </span>
              <span>{feature}</span>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <Button
            asChild
            size="lg"
            variant={buttonVariant}
            className={[
              "w-full",
              offer.highlighted
                ? "bg-[linear-gradient(135deg,#2563eb_0%,#7c3aed_100%)] shadow-[0_18px_44px_rgba(37,99,235,0.28)]"
                : "",
            ].join(" ")}
          >
            <Link href={offer.ctaHref}>{offer.ctaLabel}</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default function PricingPage() {
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
          <Badge>Pricing</Badge>
          <h1 className="mt-6 text-5xl font-semibold leading-[0.92] tracking-[-0.06em] text-slate-950 md:text-7xl xl:text-[5.5rem]">
            One clear
            <br />
            <span className="bg-[linear-gradient(180deg,#1d4ed8_0%,#3b82f6_45%,#7dd3fc_100%)] bg-clip-text text-transparent">
              price. No surprises.
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 md:text-[1.16rem] md:leading-9">
            Website offers are the priority. Landing Page, Business Website, and
            E-commerce Store all have promotional pricing. Systems &amp; Integrations
            and SaaS &amp; Custom Software stay lower on the page for larger builds.
          </p>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-700">
            Landing Page is the fastest way to get one clear offer online. Business
            Website is the main option for most service businesses. E-commerce Store
            is built for selling products or taking orders online with less friction.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {supportHighlights.map((entry) => (
              <span
                key={entry}
                className="rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 shadow-[0_10px_24px_rgba(15,23,42,0.04)]"
              >
                {entry}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {websiteOffers.map((offer) => (
            <OfferCard key={offer.title} offer={offer} />
          ))}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {secondaryOffers.map((offer) => (
            <OfferCard key={offer.title} offer={offer} />
          ))}
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-[0.96fr_1.04fr]">
          <div>
            <Badge>After launch</Badge>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-slate-950 md:text-5xl">
              Support that keeps things simple.
            </h2>
            <p className="mt-4 max-w-xl text-lg leading-8 text-slate-700">
              The monthly plan keeps the site hosted, updated, and supported after
              launch so you do not have to manage the technical side alone.
            </p>
          </div>

          <Card className="border-slate-200/80 bg-white shadow-[0_12px_28px_rgba(15,23,42,0.05)]">
            <CardContent className="space-y-3 px-5 py-5 text-sm leading-7 text-slate-700">
              <div className="grid gap-3 sm:grid-cols-2">
                {afterLaunch.map((entry) => (
                  <div
                    key={entry}
                    className="flex items-start gap-3 rounded-[1.1rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] px-4 py-3"
                  >
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-700">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    <span>{entry}</span>
                  </div>
                ))}
              </div>

              <div className="rounded-[1.2rem] border border-blue-100 bg-blue-50/70 px-4 py-4 text-sm leading-6 text-slate-700">
                All projects start with a 50% deposit. Final payment before launch.
                No lock-in contracts.
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-20">
          <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
            <div className="max-w-2xl">
              <Badge>FAQ</Badge>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-slate-950 md:text-5xl">
                Quick answers before you start.
              </h2>
              <p className="mt-4 max-w-xl text-lg leading-8 text-slate-700">
                Straight answers help people move faster. Here&apos;s what most
                business owners want to know first.
              </p>
            </div>

            <div className="grid gap-4">
              {faqs.map((faq) => (
                <details
                  key={faq.question}
                  className="group rounded-[1.5rem] border border-slate-200/80 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)]"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-lg font-medium tracking-[-0.02em] text-slate-950">
                    <span>{faq.question}</span>
                    <span className="text-2xl font-light text-slate-400 transition duration-300 group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-700">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
