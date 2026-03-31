import Header from "@/components/layout/Header";
import HeroSection from "@/components/sections/HeroSection";

export default function HomePage() {
  const services = [
    {
      title: "Premium Websites",
      desc: "High-end websites built to make businesses look credible, modern, and ready to grow.",
    },
    {
      title: "E-commerce",
      desc: "Conversion-focused online stores with polished product pages, checkout, and scalable foundations.",
    },
    {
      title: "Custom Systems",
      desc: "Dashboards, portals, and internal tools designed around real workflows and business logic.",
    },
    {
      title: "SaaS Products",
      desc: "Subscription-based software products with clean UX, strong architecture, and room to scale.",
    },
  ];

  const projects = [
    {
      title: "Frequency Framed",
      tag: "Art E-commerce",
      desc: "Luxury artist website with commerce, admin workflows, and premium presentation.",
    },
    {
      title: "Business Website",
      tag: "Brand Presence",
      desc: "Elegant websites designed to help service businesses look established and trustworthy.",
    },
    {
      title: "Client Systems",
      tag: "Internal Tools",
      desc: "Operational dashboards, client portals, and tailored systems for smarter management.",
    },
  ];

  const productPoints = [
    "Weekly performance tracking",
    "Cost visibility and control",
    "Profit and margin insights",
    "Reporting designed for action",
  ];

  const whyZiffera = [
    {
      title: "Software-level thinking",
      desc: "We approach websites and systems with architecture, structure, and maintainability in mind.",
    },
    {
      title: "Premium visual quality",
      desc: "The interface should make the business look more valuable the moment someone lands on it.",
    },
    {
      title: "Built for the long term",
      desc: "Scalable foundations, cleaner operations, and digital assets that support business growth.",
    },
  ];

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#0B0F14] text-white">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.18),transparent_28%),radial-gradient(circle_at_top_right,rgba(34,211,238,0.10),transparent_22%),radial-gradient(circle_at_bottom_left,rgba(99,102,241,0.10),transparent_24%)]" />
        <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:80px_80px]" />
        <div className="absolute left-[-10%] top-[-5%] h-[28rem] w-[28rem] animate-pulse rounded-full bg-blue-500/15 blur-3xl" />
        <div className="absolute right-[-5%] top-[8rem] h-[24rem] w-[24rem] animate-pulse rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute bottom-[10%] left-[20%] h-[18rem] w-[18rem] animate-pulse rounded-full bg-indigo-500/10 blur-3xl" />
      </div>

      <Header />

      <main>
        <HeroSection />

        <section className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 shadow-[0_10px_70px_rgba(0,0,0,0.25)]">
            <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
              <div>
                <div className="text-xs uppercase tracking-[0.24em] text-blue-200">
                  Positioning
                </div>
                <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-white md:text-4xl">
                  Built like a software company. Presented like a premium brand.
                </h2>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  "High-end design language",
                  "Fast, scalable foundations",
                  "Business-first execution",
                  "Long-term technical thinking",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-white/10 bg-[#0B0F14]/70 px-5 py-4 text-sm text-slate-300"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <div className="max-w-2xl">
            <div className="text-xs uppercase tracking-[0.24em] text-blue-200">
              Services
            </div>
            <h2 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-white md:text-5xl">
              What we build.
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-400">
              Clear offers, premium execution, and architecture designed to
              support real business growth.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {services.map((service) => (
              <div
                key={service.title}
                className="group rounded-[1.8rem] border border-white/10 bg-white/[0.04] p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-400/30 hover:bg-white/[0.06]"
              >
                <div className="inline-flex rounded-2xl border border-blue-400/20 bg-blue-400/10 px-3 py-2 text-xs uppercase tracking-[0.2em] text-blue-100">
                  {service.title}
                </div>
                <p className="mt-5 text-sm leading-7 text-slate-300">
                  {service.desc}
                </p>
                <div className="mt-8 text-sm font-medium text-white">
                  Learn more →
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="work" className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <div className="text-xs uppercase tracking-[0.24em] text-blue-200">
                Selected Work
              </div>
              <h2 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-white md:text-5xl">
                Proof of quality.
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-400">
                Projects presented with clarity, confidence, and a premium
                product mindset.
              </p>
            </div>

            <button className="w-fit rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/10">
              View full portfolio
            </button>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {projects.map((project) => (
              <div
                key={project.title}
                className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] transition duration-300 hover:-translate-y-1 hover:border-blue-400/20"
              >
                <div className="relative h-56 overflow-hidden bg-gradient-to-br from-[#131B2B] via-[#10203A] to-[#0B0F14]">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.22),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(34,211,238,0.12),transparent_28%)]" />
                  <div className="absolute bottom-4 left-4 rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs uppercase tracking-[0.18em] text-slate-200 backdrop-blur-md">
                    Live project preview
                  </div>
                </div>

                <div className="p-6">
                  <div className="text-xs uppercase tracking-[0.22em] text-blue-200">
                    {project.tag}
                  </div>
                  <div className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-white">
                    {project.title}
                  </div>
                  <p className="mt-3 text-sm leading-7 text-slate-400">
                    {project.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="products" className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <div className="rounded-[2.2rem] border border-blue-400/20 bg-gradient-to-br from-blue-500/10 via-white/[0.04] to-cyan-400/5 p-8 md:p-10">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div>
                <div className="text-xs uppercase tracking-[0.24em] text-blue-100">
                  Flagship Product
                </div>
                <h2 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-white md:text-5xl">
                  MarginFlow
                </h2>
                <p className="mt-5 text-lg leading-8 text-slate-300">
                  A margin intelligence platform designed to help business
                  owners understand performance, costs, and profit with far more
                  clarity.
                </p>

                <div className="mt-8 flex flex-wrap gap-4">
                  <button className="rounded-2xl bg-blue-500 px-6 py-3.5 text-sm font-semibold text-white shadow-[0_20px_60px_rgba(59,130,246,0.3)] transition hover:bg-blue-400">
                    Start 14-day free trial
                  </button>
                  <button className="rounded-2xl border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-medium text-white">
                    Explore product
                  </button>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {productPoints.map((item) => (
                  <div
                    key={item}
                    className="rounded-3xl border border-white/10 bg-[#0B0F14]/70 p-6 text-sm leading-7 text-slate-300 transition hover:border-blue-400/20"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <div className="max-w-2xl">
            <div className="text-xs uppercase tracking-[0.24em] text-blue-200">
              Why Ziffera
            </div>
            <h2 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-white md:text-5xl">
              Clear thinking. Strong design. Serious execution.
            </h2>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {whyZiffera.map((item) => (
              <div
                key={item.title}
                className="rounded-[1.8rem] border border-white/10 bg-white/[0.04] p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-400/20"
              >
                <div className="text-xl font-semibold tracking-[-0.03em] text-white">
                  {item.title}
                </div>
                <p className="mt-4 text-sm leading-7 text-slate-400">
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
          <div className="overflow-hidden rounded-[2.2rem] border border-white/10 bg-white/[0.04] p-8 md:p-10">
            <div className="grid gap-10 lg:grid-cols-[1fr_0.85fr] lg:items-center">
              <div>
                <div className="text-xs uppercase tracking-[0.24em] text-blue-200">
                  Final CTA
                </div>
                <h2 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-white md:text-5xl">
                  Ready to build something serious?
                </h2>
                <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
                  Let’s create a website or digital product that reflects the
                  quality of your business and gives you a stronger digital
                  foundation.
                </p>
              </div>

              <div className="rounded-[1.8rem] border border-white/10 bg-[#0B0F14]/80 p-6">
                <div className="space-y-4">
                  <button className="w-full rounded-2xl bg-blue-500 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-400">
                    Start your project
                  </button>
                  <button className="w-full rounded-2xl border border-white/15 bg-white/5 px-5 py-3.5 text-sm font-medium text-white transition hover:bg-white/10">
                    Talk to Ziffera
                  </button>
                  <button className="w-full rounded-2xl border border-blue-400/20 bg-blue-400/10 px-5 py-3.5 text-sm font-medium text-blue-100 transition hover:bg-blue-400/15">
                    Try MarginFlow
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}