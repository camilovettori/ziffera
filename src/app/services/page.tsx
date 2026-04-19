import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import Header from "@/components/layout/Header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const services = [
  {
    badge: "Most popular",
    title: "Landing Page",
    price: "From €600",
    monthly: "+ €30/month after launch",
    delivery: "5 days",
    desc: "A single, focused page built to convert visitors into customers. Perfect for new businesses, campaigns, or testing an idea fast.",
    includes: [
      "1 page, mobile-first design",
      "Clear call to action and contact form",
      "Hosting, security, and support included in monthly plan",
      "Delivered in 5 business days",
    ],
    href: "/checkout/setup-deposit",
    cta: "Get started",
    accent: "from-blue-500 to-cyan-400",
    promo: {
      badge: "🎉 Launch offer — €400 setup + €25/month",
      sub: "Limited time. Only for the first slots.",
      price: "€400 setup",
      monthly: "+ €25/month after launch",
    },
  },
  {
    badge: "Best value",
    title: "Business Website",
    price: "From €900",
    monthly: "+ €40/month after launch",
    delivery: "7 days",
    desc: "A clean, fast, professional website for your business. Up to 6 pages, built to look sharp on every device and give your business a credible digital presence.",
    includes: [
      "Up to 6 pages (Home, About, Services, Contact + 2 more)",
      "Mobile-first, premium design",
      "Contact form and Google Maps integration",
      "Hosting, security updates, and basic maintenance",
      "Delivered in 7 business days",
    ],
    href: "/checkout/setup-deposit",
    cta: "Get started",
    accent: "from-violet-500 to-fuchsia-400",
  },
  {
    badge: null,
    title: "E-commerce Store",
    price: "From €1.500",
    monthly: "+ €60/month after launch",
    delivery: "14 days",
    desc: "A full online store with Stripe payments, product management, and an admin panel you control. No middlemen, no transaction fees beyond Stripe.",
    includes: [
      "Stripe checkout — direct payments to your account",
      "Product gallery and individual product pages",
      "Admin panel for managing products and orders",
      "Mobile-first storefront with premium finish",
      "Delivered in 14 business days",
    ],
    href: "/contact",
    cta: "Talk to us first",
    accent: "from-sky-500 to-blue-500",
  },
  {
    badge: null,
    title: "Zconnect — Systems & Integrations",
    price: "From €800",
    monthly: "No monthly fee — one-time project",
    delivery: "Depends on scope",
    desc: "Connect your business tools so they talk to each other. Automate invoices, sync data between platforms, and remove the manual work that eats into your team's time.",
    includes: [
      "API integrations between your existing tools",
      "Webhook automation and real-time triggers",
      "Error handling and logging",
      "Full documentation and clean handoff — you own the system",
      "Example: Unify → Zoho Books automatic invoice sync",
    ],
    href: "/contact",
    cta: "Talk about your integration",
    accent: "from-cyan-500 to-indigo-500",
  },
  {
    badge: null,
    title: "SaaS & Custom Software",
    price: "From €3.000",
    monthly: "Discussed per project",
    delivery: "Discussed per project",
    desc: "Subscription-ready digital products, internal tools, and custom software built with real commercial thinking. For founders and businesses with a specific problem to solve.",
    includes: [
      "Product design with commercial thinking built in",
      "Subscription billing with Stripe",
      "Admin panel and user management",
      "Built to scale — not a template",
    ],
    href: "/contact",
    cta: "Let's talk about your idea",
    accent: "from-indigo-500 to-blue-600",
  },
];

export default function ServicesPage() {
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
        <div className="max-w-2xl">
          <Badge>What we build</Badge>
          <h1 className="mt-6 text-5xl font-semibold leading-[0.92] tracking-[-0.06em] text-slate-950 md:text-7xl xl:text-[5.5rem]">
            Services.
            <br />
            <span className="bg-[linear-gradient(180deg,#1d4ed8_0%,#3b82f6_45%,#7dd3fc_100%)] bg-clip-text text-transparent">
              Real prices.
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 md:text-[1.16rem] md:leading-9">
            Websites, e-commerce, integrations, and digital products for small
            businesses that want a serious online presence.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <Card
              key={service.title}
              className="group relative flex h-full flex-col overflow-hidden rounded-[20px] border border-[#E2E8F0] bg-white shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-[6px] hover:border-[rgba(99,102,241,0.3)] hover:shadow-[0_16px_48px_rgba(99,102,241,0.1)]"
            >
              <div className={`absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r ${service.accent}`} />
              <CardHeader className="px-7 pt-8 pb-4">
                {"promo" in service && service.promo && (
                  <div className="mb-5 rounded-[1rem] bg-[linear-gradient(135deg,#2563eb_0%,#7c3aed_100%)] px-4 py-3.5 text-white shadow-[0_6px_20px_rgba(37,99,235,0.35)]">
                    <div className="text-[13px] font-bold leading-snug">
                      {service.promo.badge}
                    </div>
                    <div className="mt-1 text-[11px] text-white/75">
                      {service.promo.sub}
                    </div>
                  </div>
                )}
                <div className="flex items-center justify-between gap-3">
                  {service.badge ? (
                    <Badge className="text-[10px]">{service.badge}</Badge>
                  ) : (
                    <span />
                  )}
                  <span className="text-[10px] uppercase tracking-[0.22em] text-slate-400">
                    {service.delivery}
                  </span>
                </div>
                <CardTitle className="mt-4 text-[18px] font-extrabold tracking-[-0.04em] text-[#0F172A]">
                  {service.title}
                </CardTitle>
                <div className="mt-3">
                  {"promo" in service && service.promo ? (
                    <>
                      <span className="text-2xl font-bold tracking-[-0.04em] text-slate-950">
                        {service.promo.price}
                      </span>
                      <div className="mt-1 text-[13px] text-slate-500">
                        {service.promo.monthly}
                      </div>
                      <div className="mt-2 flex flex-wrap gap-x-3 gap-y-0.5">
                        <span className="text-[12px] text-slate-400 line-through">
                          {service.price}
                        </span>
                        <span className="text-[12px] text-slate-400 line-through">
                          {service.monthly}
                        </span>
                      </div>
                    </>
                  ) : (
                    <>
                      <span className="text-2xl font-bold tracking-[-0.04em] text-slate-950">
                        {service.price}
                      </span>
                      <div className="mt-1 text-[13px] text-slate-500">
                        {service.monthly}
                      </div>
                    </>
                  )}
                </div>
                <CardDescription className="mt-4 text-[14px] leading-[1.65] text-slate-700">
                  {service.desc}
                </CardDescription>
              </CardHeader>

              <CardContent className="flex flex-1 flex-col px-7 pb-7">
                <Separator className="mb-5" />
                <div className="flex-1 grid gap-2">
                  {service.includes.map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-2.5 text-[13px] leading-[1.55] text-slate-700"
                    >
                      <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-700">
                        <Check className="h-2.5 w-2.5" />
                      </span>
                      {item}
                    </div>
                  ))}
                </div>

                <Button asChild className="mt-6 w-full" size="sm">
                  <Link href={service.href}>
                    {service.cta} <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-20 border-t border-slate-200/80 pt-16">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <Badge>Not sure where to start?</Badge>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-slate-950 md:text-5xl">
                Not sure which service fits?
              </h2>
              <p className="mt-4 max-w-xl text-lg leading-8 text-slate-700">
                Send a message and we&apos;ll tell you exactly what you need —
                and what you don&apos;t.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button asChild size="lg">
                  <Link href="/contact">
                    Get in touch <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
            <div>
              <Badge variant="secondary">How it works</Badge>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-slate-950 md:text-5xl">
                Simple process, clear handoff.
              </h2>
              <p className="mt-4 max-w-xl text-lg leading-8 text-slate-700">
                Every project starts with a clear brief. You approve the work
                before anything goes live. No surprises, no scope creep, no
                ongoing dependency on us unless you want it.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
