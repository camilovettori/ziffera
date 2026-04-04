import Header from "@/components/layout/Header";
import HeroSection from "@/components/sections/HeroSection";
import ExampleSection from "@/components/sections/ExampleSection";
import Image from "next/image";
import Link from "next/link";

const trustItems = [
  "Websites",
  "E-commerce",
  "Admin systems",
  "Integrations",
  "SaaS products",
];

const services = [
  {
    title: "Websites",
    desc: "Business websites that make you look established, explain what you do clearly, and help more people get in touch.",
  },
  {
    title: "E-commerce",
    desc: "Stripe-ready stores with product management, a clean checkout flow, and the admin tools needed to keep things moving.",
  },
  {
    title: "Custom Systems",
    desc: "Practical dashboards, workflows, and internal tools that cut down on repetitive admin work.",
  },
  {
    title: "Integrations",
    desc: "Connect the tools you already use and automate the handoff between invoicing, books, CRM, and operations.",
  },
];

const launchInclusions = [
  "Hosting",
  "Maintenance",
  "Support",
  "Small updates",
  "Monitoring and basic care",
];

const whyZiffera = [
  {
    title: "Clear communication",
    desc: "Simple next steps, no heavy agency language, and a process that feels easy to follow.",
  },
  {
    title: "Practical design",
    desc: "The work should look premium, but it also needs to help the business make progress.",
  },
  {
    title: "Software-level thinking",
    desc: "We build with structure, maintainability, and the real workflow in mind, not just the first screen.",
  },
  {
    title: "Ongoing support",
    desc: "You are not left with a nice website and no plan. We stay focused on keeping it useful.",
  },
];

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#F7FAFF] text-slate-900">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.16),transparent_26%),radial-gradient(circle_at_top_right,rgba(125,211,252,0.12),transparent_24%),linear-gradient(180deg,#ffffff_0%,#f7fbff_45%,#eef5ff_100%)]" />
        <div className="absolute left-[-10%] top-[-8%] h-[24rem] w-[24rem] rounded-full bg-blue-200/40 blur-3xl" />
        <div className="absolute right-[-8%] top-[10rem] h-[22rem] w-[22rem] rounded-full bg-cyan-200/40 blur-3xl" />
        <div className="absolute bottom-[12%] left-[18%] h-[18rem] w-[18rem] rounded-full bg-indigo-200/30 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.04] [background-image:linear-gradient(rgba(15,23,42,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.12)_1px,transparent_1px)] [background-size:84px_84px]" />
      </div>

      <Header />

      <div>
        <HeroSection />

        <section className="mx-auto max-w-7xl px-6 pb-10 lg:px-10">
          <div className="grid gap-3 rounded-[1.8rem] border border-slate-200 bg-white p-4 shadow-[0_16px_40px_rgba(15,23,42,0.04)] sm:grid-cols-2 lg:grid-cols-5">
            {trustItems.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 text-center text-sm font-medium text-slate-600"
              >
                {item}
              </div>
            ))}
          </div>
        </section>

        <section
          id="services"
          className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24"
        >
          <div className="max-w-2xl">
            <div className="text-xs uppercase tracking-[0.24em] text-blue-700">
              Services
            </div>
            <h2 className="mt-3 text-4xl font-semibold tracking-[-0.05em] text-slate-950 md:text-5xl">
              What Ziffera builds.
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              Clear offers, thoughtful design, and practical builds that help
              growing businesses look better and work smarter.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {services.map((service) => (
              <div
                key={service.title}
                className="group rounded-[1.7rem] border border-slate-200 bg-white p-6 shadow-[0_18px_40px_rgba(15,23,42,0.05)] transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_22px_48px_rgba(15,23,42,0.08)]"
              >
                <div className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-blue-700">
                  {service.title}
                </div>
                <p className="mt-5 text-sm leading-7 text-slate-600">
                  {service.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        <ExampleSection />

        <section
          id="offers"
          className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24"
        >
          <div className="max-w-2xl">
            <div className="text-xs uppercase tracking-[0.24em] text-blue-700">
              Launch offers
            </div>
            <h2 className="mt-3 text-4xl font-semibold tracking-[-0.05em] text-slate-950 md:text-5xl">
              A serious launch offer, presented clearly.
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              If you want a premium e-commerce build without the usual agency
              overhead, this is the launch promotion.
            </p>
          </div>

          <div className="mt-12 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
            <div className="overflow-hidden rounded-[2rem] border border-blue-100 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.07)]">
              <div className="grid gap-6 p-6 lg:grid-cols-[1fr_0.92fr] lg:p-8">
                <div>
                  <div className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-blue-700">
                    Limited launch promotion
                  </div>
                  <h3 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-slate-950">
                    E-commerce website package
                  </h3>
                  <p className="mt-4 text-lg leading-8 text-slate-600">
                    A full e-commerce website with Stripe integration, admin
                    panel, product management, and a professional checkout
                    flow. Inspired by the Frequency Framed build.
                  </p>

                  <div className="mt-6 rounded-[1.6rem] border border-slate-200 bg-slate-50 p-5">
                    <div className="flex flex-wrap items-end gap-x-4 gap-y-2">
                      <div className="text-sm text-slate-500 line-through">
                        Typical value around EUR 2500
                      </div>
                      <div className="text-3xl font-semibold tracking-[-0.04em] text-slate-950">
                        EUR 650 setup
                      </div>
                    </div>
                    <div className="mt-3 text-sm leading-7 text-slate-600">
                      Monthly plan from EUR 45/month. A lighter care plan from
                      EUR 25/month can be discussed for simpler ongoing needs.
                    </div>
                  </div>

                  <div className="mt-6">
                    <div className="text-sm font-semibold text-slate-900">
                      Included in the monthly plan:
                    </div>
                    <div className="mt-3 grid gap-3 sm:grid-cols-2">
                      {launchInclusions.map((item) => (
                        <div
                          key={item}
                          className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600"
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-4">
                    <Link
                      href="/contact"
                      className="rounded-2xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-[0_18px_50px_rgba(59,130,246,0.22)] transition duration-300 hover:-translate-y-0.5 hover:bg-blue-500"
                    >
                      Ask about this offer
                    </Link>

                    <Link
                      href="/#work"
                      className="rounded-2xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-medium text-slate-800 transition duration-300 hover:border-blue-200 hover:bg-blue-50"
                    >
                      See the proof
                    </Link>
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <div className="overflow-hidden rounded-[1.6rem] border border-slate-200 bg-slate-50 shadow-[0_16px_32px_rgba(15,23,42,0.05)]">
                    <div className="relative aspect-[4/3]">
                      <Image
                        src="/promos/ziffera-starter.png"
                        alt="Ziffera e-commerce launch preview"
                        fill
                        sizes="(max-width: 1024px) 100vw, 45vw"
                        className="object-cover"
                      />
                    </div>
                  </div>

                  <div className="rounded-[1.6rem] border border-blue-100 bg-blue-50 p-5">
                    <div className="text-xs uppercase tracking-[0.24em] text-blue-700">
                      Good fit for
                    </div>
                    <p className="mt-3 text-sm leading-7 text-slate-700">
                      Artists, makers, service businesses, and product brands
                      that want a proper online store without the complexity of
                      a big-agency build.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.06)] lg:p-8">
              <div className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-slate-500">
                Smaller launch option
              </div>
              <h3 className="mt-4 text-2xl font-semibold tracking-[-0.04em] text-slate-950">
                Business website starter
              </h3>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                For local businesses and service brands that need a polished
                website, clear messaging, and a simple way for people to get in
                touch.
              </p>

              <div className="mt-6 space-y-3">
                {[
                  "Simple, credible first impression",
                  "Mobile-friendly page structure",
                  "Clear enquiry path",
                  "Strong visual presentation",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600"
                  >
                    {item}
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-[1.6rem] border border-blue-100 bg-[linear-gradient(180deg,#eff6ff_0%,#ffffff_100%)] p-5">
                <div className="text-xs uppercase tracking-[0.24em] text-blue-700">
                  Best for
                </div>
                <p className="mt-3 text-sm leading-7 text-slate-700">
                  A focused launch if you do not need e-commerce yet, but want a
                  website that feels modern, friendly, and trustworthy.
                </p>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  Talk about your website
                </Link>
                <Link
                  href="/#work"
                  className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-800 transition hover:border-blue-200 hover:bg-blue-50"
                >
                  View proof
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section
          id="products"
          className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24"
        >
          <div className="max-w-2xl">
            <div className="text-xs uppercase tracking-[0.24em] text-blue-700">
              Products
            </div>
            <h2 className="mt-3 text-4xl font-semibold tracking-[-0.05em] text-slate-950 md:text-5xl">
              Ziffera products built for practical value.
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              Useful software for small businesses that want better control and
              less manual work.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <div className="rounded-[2rem] border border-blue-100 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)] lg:p-8">
              <div className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-blue-700">
                Releasing on 01/05
              </div>
              <h3 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-slate-950">
                MarginFlow
              </h3>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">
                Margin intelligence software for small businesses. It helps you
                understand where profit is really coming from, where costs are
                creeping in, and what needs attention first.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {[
                  "Track margins with clarity",
                  "Spot products that underperform",
                  "See cost and profit trends",
                  "Make decisions faster",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600"
                  >
                    {item}
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="rounded-2xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-[0_18px_50px_rgba(59,130,246,0.22)] transition duration-300 hover:-translate-y-0.5 hover:bg-blue-500"
                >
                  Join the waitlist
                </Link>
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)] lg:p-8">
              <div className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-slate-500">
                Integration product
              </div>
              <h3 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-slate-950">
                Zconnect
              </h3>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">
                Unify your Zoho Invoice and Zoho Books workflows so invoice
                creation becomes automatic and manual admin work drops away.
              </p>

              <div className="mt-6 rounded-[1.6rem] border border-blue-100 bg-blue-50 p-5">
                <div className="text-xs uppercase tracking-[0.24em] text-blue-700">
                  Also available
                </div>
                <p className="mt-3 text-sm leading-7 text-slate-700">
                  Need a custom connection between other platforms? Get in
                  touch and we can scope the right integration.
                </p>
              </div>

              <div className="mt-6 flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="rounded-2xl bg-slate-900 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  Talk about Zconnect
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section
          id="why"
          className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24"
        >
          <div className="max-w-2xl">
            <div className="text-xs uppercase tracking-[0.24em] text-blue-700">
              Why Ziffera
            </div>
            <h2 className="mt-3 text-4xl font-semibold tracking-[-0.05em] text-slate-950 md:text-5xl">
              Premium enough to trust, simple enough to say yes to.
            </h2>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {whyZiffera.map((item) => (
              <div
                key={item.title}
                className="rounded-[1.7rem] border border-slate-200 bg-white p-6 shadow-[0_18px_40px_rgba(15,23,42,0.05)]"
              >
                <div className="text-xl font-semibold tracking-[-0.04em] text-slate-950">
                  {item.title}
                </div>
                <p className="mt-4 text-sm leading-7 text-slate-600">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section
          id="contact"
          className="mx-auto max-w-7xl px-6 pb-24 pt-8 lg:px-10 lg:pb-32"
        >
          <div className="overflow-hidden rounded-[2.2rem] border border-blue-100 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] p-8 shadow-[0_20px_60px_rgba(15,23,42,0.06)] md:p-10">
            <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
              <div>
                <div className="text-xs uppercase tracking-[0.24em] text-blue-700">
                  Final CTA
                </div>
                <h2 className="mt-3 text-4xl font-semibold tracking-[-0.05em] text-slate-950 md:text-5xl">
                  Need a website, store, or custom system?
                </h2>
                <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
                  Let&apos;s build something that helps your business grow and
                  feels clear, modern, and easy for customers to trust.
                </p>
              </div>

              <div className="rounded-[1.8rem] border border-slate-200 bg-white p-6 shadow-[0_16px_40px_rgba(15,23,42,0.05)]">
                <div className="space-y-4">
                  <Link
                    href="/contact"
                    className="inline-flex w-full items-center justify-center rounded-2xl bg-blue-600 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-500"
                  >
                    Start your project
                  </Link>
                  <Link
                    href="/#work"
                    className="inline-flex w-full items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 py-3.5 text-sm font-medium text-slate-800 transition hover:border-blue-200 hover:bg-blue-50"
                  >
                    View real work
                  </Link>
                  <Link
                    href="/#work"
                    className="inline-flex w-full items-center justify-center rounded-2xl border border-blue-100 bg-blue-50 px-5 py-3.5 text-sm font-medium text-blue-700 transition hover:border-blue-200 hover:bg-blue-100"
                  >
                    View real work
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
