import Link from "next/link";
import Image from "next/image";
import ExampleSection from "@/components/sections/ExampleSection";

export default function StartPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#0B0F14] text-white">
      {/* Background atmosphere */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.14),transparent_24%),radial-gradient(circle_at_top_right,rgba(34,211,238,0.08),transparent_18%),radial-gradient(circle_at_bottom_left,rgba(99,102,241,0.08),transparent_20%)]" />
        <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:80px_80px]" />
      </div>

      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-10 lg:py-14">
        {/* Top bar */}
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <Link href="/" className="inline-flex w-fit flex-col items-start">
            <Image
              src="/logos/ziffera-logo.png"
              alt="Ziffera logo"
              width={240}
              height={80}
              priority
              className="h-14 w-auto object-contain lg:h-16"
            />
            <div className="mt-2 pl-1 text-[10px] uppercase tracking-[0.32em] text-slate-400 opacity-85">
              Websites · Systems · SaaS
            </div>
          </Link>

          <Link
            href="/"
            className="inline-flex w-fit items-center rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-medium text-slate-200 transition hover:bg-white/[0.08]"
          >
            ← Back to homepage
          </Link>
        </div>

        {/* HERO */}
<section className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
  <div className="max-w-3xl">
    <div className="inline-flex items-center rounded-full border border-blue-400/20 bg-blue-400/10 px-4 py-2 text-[11px] uppercase tracking-[0.28em] text-blue-200">
      Launch offer · Only 4 spots left
    </div>

    <h1 className="mt-6 text-5xl font-semibold leading-[0.94] tracking-[-0.05em] text-white md:text-7xl">
      Make your business look
      <br />
      like it belongs at the top.
    </h1>

    <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300 md:text-[1.3rem] md:leading-9">
      Ziffera builds high-quality, modern websites for businesses that want to
      look credible, professional, and ready to grow.
    </p>

    <div className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
      Launch pricing:
      <span className="font-semibold text-white"> €250 setup</span> +
      <span className="font-semibold text-white"> €20/month</span> for hosting,
      maintenance, and support.
    </div>

    <div className="mt-4 max-w-3xl text-sm text-slate-400">
      This offer is designed for standard business websites. More complex or
      custom systems are quoted separately.
    </div>

    <div className="mt-8 flex flex-wrap gap-4">
      <a
        href="#apply"
        className="rounded-2xl bg-gradient-to-r from-blue-500 to-blue-400 px-6 py-3.5 text-sm font-semibold text-white shadow-[0_18px_50px_rgba(59,130,246,0.35)] transition duration-300 hover:-translate-y-0.5 hover:from-blue-400 hover:to-blue-300"
      >
        Secure your spot
      </a>

      <a
        href="#example"
        className="rounded-2xl border border-white/12 bg-white/[0.04] px-6 py-3.5 text-sm font-medium text-white transition duration-300 hover:bg-white/[0.08]"
      >
        View real project
      </a>
    </div>

    <div className="mt-4 text-xs uppercase tracking-[0.22em] text-slate-500">
      Only 4 spots left at this launch price · Response within 24 hours
    </div>
  </div>

  {/* HERO VISUAL — PREMIUM MOCKUP */}
  <div className="relative">
    {/* controlled outer glow */}
    <div className="pointer-events-none absolute -inset-12 bg-[radial-gradient(circle_at_70%_30%,rgba(59,130,246,0.25),transparent_40%)] blur-2xl" />

    <div className="relative rounded-[2.8rem] border border-white/10 bg-white/[0.03] p-5 backdrop-blur-2xl shadow-[0_40px_140px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.05)]">
      {/* subtle inner glow */}
      <div className="pointer-events-none absolute inset-0 rounded-[2.8rem] bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.15),transparent_60%)]" />

      <div className="relative mb-4 flex flex-wrap gap-2">
        <div className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-white/80 backdrop-blur-md">
          Limited launch
        </div>

        <div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-emerald-100 backdrop-blur-md">
          Only 4 clients left
        </div>
      </div>

      <div className="relative mx-auto max-w-[720px] rounded-[2.2rem] border border-white/10 bg-[#0A1018] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
        <div className="mb-3 flex items-center gap-2 px-2">
          <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
        </div>

        <div className="relative overflow-hidden rounded-[1.6rem] border border-white/10 bg-black">
          <video
            src="/examples/homepage.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="w-full object-cover"
          />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,12,0.18),transparent_25%,transparent_75%,rgba(2,6,12,0.35))]" />
        </div>
      </div>

      <div className="mt-4 grid gap-4 rounded-[1.5rem] border border-white/10 bg-[#08111d]/75 px-5 py-4 backdrop-blur-xl sm:grid-cols-[1fr_auto] sm:items-center">
        <div>
          <div className="text-[11px] uppercase tracking-[0.24em] text-slate-400">
            Launch pricing
          </div>
          <div className="mt-1 text-lg font-semibold tracking-[-0.03em] text-white">
            €250 setup + €20/month
          </div>
          <div className="mt-1 text-sm text-slate-400">
            For standard business websites. Advanced builds quoted separately.
          </div>
        </div>

        <a
          href="#apply"
          className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-blue-400 px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(59,130,246,0.35)] transition duration-300 hover:-translate-y-0.5 hover:from-blue-400 hover:to-blue-300"
        >
          Secure your spot
        </a>
      </div>
    </div>
  </div>
</section>
        

        {/* COMPARISON */}
        <section className="mt-20">
          <div className="mb-6 max-w-2xl">
            <div className="text-xs uppercase tracking-[0.24em] text-blue-200">
              Why this offer matters
            </div>
            <h2 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-white md:text-5xl">
              What businesses usually pay vs what Ziffera is offering now.
            </h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8">
              <div className="text-xs uppercase tracking-[0.24em] text-slate-400">
                Typical agency pricing
              </div>
              <div className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-white">
                €1,500 – €3,000+
              </div>
              <div className="mt-2 text-slate-400">
                Upfront for a premium website build
              </div>

              <div className="mt-6 space-y-3 text-sm text-slate-300">
                <div className="rounded-2xl border border-white/10 bg-[#0B0F14]/70 px-4 py-3">
                  Higher upfront cost
                </div>
                <div className="rounded-2xl border border-white/10 bg-[#0B0F14]/70 px-4 py-3">
                  Support often charged separately
                </div>
                <div className="rounded-2xl border border-white/10 bg-[#0B0F14]/70 px-4 py-3">
                  Slower communication in many cases
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-blue-400/20 bg-gradient-to-br from-blue-400/12 to-white/[0.03] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.25)]">
              <div className="text-xs uppercase tracking-[0.24em] text-blue-100">
                Ziffera starter offer
              </div>
              <div className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-white">
                €250 + €20/month
              </div>
              <div className="mt-2 text-slate-300">
                Launch pricing for early clients
              </div>

              <div className="mt-6 space-y-3 text-sm text-slate-200">
                <div className="rounded-2xl border border-white/10 bg-[#0B0F14]/70 px-4 py-3">
                  Premium design at low entry cost
                </div>
                <div className="rounded-2xl border border-white/10 bg-[#0B0F14]/70 px-4 py-3">
                  Hosting, maintenance and support included
                </div>
                <div className="rounded-2xl border border-white/10 bg-[#0B0F14]/70 px-4 py-3">
                  Designed to help small businesses look serious fast
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* EXAMPLE WEBSITE */}
        <div id="example">
          <ExampleSection />
        </div>

        {/* WHO THIS IS FOR */}
        <section className="mt-24">
          <div className="max-w-2xl">
            <div className="text-xs uppercase tracking-[0.24em] text-blue-200">
              Who this is for
            </div>
            <h3 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-white md:text-4xl">
              This is for you if:
            </h3>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {[
              "You don’t have a website yet",
              "Your current site looks outdated",
              "You’re losing clients due to lack of credibility",
              "You want to look more professional online",
              "You need something clean, modern and effective",
              "You want a fast and simple process",
            ].map((item) => (
              <div
                key={item}
                className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-slate-300"
              >
                ✓ {item}
              </div>
            ))}
          </div>
        </section>

        {/* APPLY */}
        <section id="apply" className="mt-20">
          <div className="mb-6 max-w-2xl">
            <div className="text-xs uppercase tracking-[0.24em] text-blue-200">
              Application form
            </div>
            <h2 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-white md:text-5xl">
              Apply for your website.
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-400">
              Fill out the form below and we’ll review your project. If it’s a
              good fit, we’ll get back to you with next steps.
            </p>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 shadow-[0_20px_80px_rgba(0,0,0,0.28)]">
            <div className="text-slate-400">
              Keep your current working form section here.
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}