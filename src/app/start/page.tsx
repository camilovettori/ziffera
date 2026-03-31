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
              Websites . Systems . SaaS
            </div>
          </Link>

          <Link
            href="/"
            className="inline-flex w-fit items-center rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-medium text-slate-200 transition hover:bg-white/[0.08]"
          >
            Back to homepage
          </Link>
        </div>

        {/* HERO */}
        <section className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-3 rounded-full border border-blue-400/20 bg-blue-400/10 px-4 py-2 text-[11px] uppercase tracking-[0.28em] text-blue-100 shadow-[0_12px_30px_rgba(59,130,246,0.12)]">
              <span className="h-2 w-2 rounded-full bg-blue-300 shadow-[0_0_18px_rgba(96,165,250,0.95)]" />
              Launch offer . Only 4 spots left
            </div>

            <h1 className="mt-6 text-5xl font-semibold leading-[0.9] tracking-[-0.06em] text-white md:text-7xl xl:text-[5.5rem]">
              Make your business look
              <br />
              <span className="bg-[linear-gradient(180deg,#ffffff_0%,#dbeafe_58%,#93c5fd_100%)] bg-clip-text text-transparent">
                like it belongs at the top.
              </span>
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300 md:text-[1.28rem] md:leading-9">
              Ziffera builds high-quality, modern websites for businesses that
              want to look credible, professional, and ready to grow.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-[1.15fr_0.85fr]">
              <div className="rounded-[1.8rem] border border-white/10 bg-white/[0.04] p-5 shadow-[0_18px_60px_rgba(0,0,0,0.22)]">
                <div className="text-[11px] uppercase tracking-[0.24em] text-slate-400">
                  Launch pricing
                </div>
                <div className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-white">
                  EUR 250 setup + EUR 20/month
                </div>
                <p className="mt-3 text-sm leading-7 text-slate-400">
                  Hosting, maintenance, and support are included for standard
                  business websites.
                </p>
              </div>

              <div className="rounded-[1.8rem] border border-blue-400/15 bg-gradient-to-br from-blue-500/12 via-white/[0.04] to-cyan-400/6 p-5">
                <div className="text-[11px] uppercase tracking-[0.24em] text-blue-100">
                  Fit
                </div>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  More complex websites and custom systems are quoted
                  separately.
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#apply"
                className="rounded-2xl bg-gradient-to-r from-blue-500 via-blue-400 to-cyan-300 px-6 py-3.5 text-sm font-semibold text-white shadow-[0_20px_60px_rgba(59,130,246,0.38)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_70px_rgba(59,130,246,0.45)]"
              >
                Secure your spot
              </a>

              <a
                href="#example"
                className="rounded-2xl border border-white/12 bg-white/[0.04] px-6 py-3.5 text-sm font-medium text-white transition duration-300 hover:border-white/20 hover:bg-white/[0.08]"
              >
                View real project
              </a>
            </div>

            <div className="mt-8 grid gap-3 text-sm text-slate-400 sm:grid-cols-3">
              {[
                "Only 4 spots left at this launch price",
                "Response within 24 hours",
                "Built for serious local businesses",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/8 bg-[#0D1521]/70 px-4 py-3"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* HERO VISUAL */}
          <div className="relative">
            <div className="pointer-events-none absolute -left-10 top-10 h-32 w-32 rounded-full bg-blue-500/20 blur-3xl" />
            <div className="pointer-events-none absolute -right-6 bottom-12 h-36 w-36 rounded-full bg-cyan-400/15 blur-3xl" />
            <div className="pointer-events-none absolute -inset-10 bg-[radial-gradient(circle_at_72%_28%,rgba(59,130,246,0.24),transparent_42%)] blur-2xl" />

            <div className="relative overflow-hidden rounded-[2.8rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.075),rgba(255,255,255,0.03))] p-7 shadow-[0_40px_140px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-2xl lg:p-10">
              <div className="pointer-events-none absolute inset-0 rounded-[2.8rem] bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.2),transparent_58%)]" />
              <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />

              <div className="relative mb-6 flex flex-wrap items-center justify-start gap-2">
                <div className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-white/80 backdrop-blur-md">
                  Limited launch
                </div>
                <div className="rounded-full border border-sky-300/30 bg-sky-400/12 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-sky-100 backdrop-blur-md">
                  Only 4 clients left
                </div>
              </div>

              <div className="relative mx-auto max-w-[860px] rounded-[2.35rem] border border-white/10 bg-[#09111b] p-4 shadow-[0_24px_80px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.05)] lg:p-5">
                <div className="mb-4 flex items-center justify-start gap-3 px-2">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                    <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
                    <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
                  </div>
                  <div className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-slate-400">
                    Live preview
                  </div>
                </div>

                <div className="relative overflow-hidden rounded-[1.6rem] border border-white/10 bg-black">
                  <video
                    src="/examples/homepage.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="h-[28rem] w-full object-cover object-center sm:h-[30rem] lg:h-[34rem]"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,12,0.04),transparent_22%,transparent_74%,rgba(2,6,12,0.42))]" />
                  <a
                    href="#apply"
                    className="absolute bottom-4 right-4 inline-flex scale-[1.06] items-center justify-center rounded-[999px] border border-white/10 bg-[linear-gradient(135deg,rgba(59,130,246,0.95),rgba(34,211,238,0.88))] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-white shadow-[0_14px_34px_rgba(59,130,246,0.24),0_0_0_1px_rgba(255,255,255,0.03)] backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:border-sky-300/30 hover:shadow-[0_16px_38px_rgba(59,130,246,0.3)]"
                  >
                    Secure your spot
                  </a>
                </div>
              </div>

              <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    label: "Promo offer",
                    value: "EUR 250",
                    note: "was EUR 1,400",
                    highlight: true,
                  },
                  {
                    label: "Monthly care",
                    value: "EUR 20/mo",
                    note: "hosting and support",
                    highlight: false,
                  },
                  {
                    label: "Turnaround",
                    value: "Fast launch",
                    note: "quick onboarding",
                    highlight: false,
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className={[
                      "flex h-full min-h-[11rem] flex-col justify-between rounded-[1.4rem] border px-6 py-6 text-left backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]",
                      item.highlight
                        ? "scale-[1.025] border-blue-300/45 bg-[linear-gradient(180deg,rgba(59,130,246,0.22),rgba(8,17,29,0.86))] shadow-[0_20px_56px_rgba(59,130,246,0.16),0_0_0_1px_rgba(96,165,250,0.12),inset_0_1px_0_rgba(255,255,255,0.06)]"
                        : "border-white/10 bg-[#08111d]/75",
                    ].join(" ")}
                  >
                    <div className="text-[10px] uppercase tracking-[0.34em] text-slate-400">
                      {item.label}
                    </div>
                    <div className="mt-4 flex flex-col gap-2">
                      <div className="text-[1.25rem] font-semibold leading-tight tracking-[-0.03em] text-white">
                        {item.value}
                      </div>
                      {item.highlight ? (
                        <div className="text-sm font-medium text-red-400 line-through decoration-red-400/90 decoration-2">
                          EUR 1,400
                        </div>
                      ) : null}
                      <div className="text-[11px] uppercase tracking-[0.24em] text-slate-500">
                        {item.note}
                      </div>
                    </div>
                  </div>
                ))}
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
                EUR 1,500 - EUR 3,000+
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
                EUR 250 + EUR 20/month
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
              "You don&apos;t have a website yet",
              "Your current site looks outdated",
              "You&apos;re losing clients due to lack of credibility",
              "You want to look more professional online",
              "You need something clean, modern and effective",
              "You want a fast and simple process",
            ].map((item) => (
              <div
                key={item}
                className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-slate-300"
              >
                + {item}
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
              Fill out the form below and we&apos;ll review your project. If it&apos;s a
              good fit, we&apos;ll get back to you with next steps.
            </p>
          </div>

          <form className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-[linear-gradient(180deg,rgba(255,255,255,0.1),rgba(255,255,255,0.03))] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-2xl md:p-8 lg:p-10">
            <div className="pointer-events-none absolute -left-16 top-12 h-40 w-40 rounded-full bg-blue-500/14 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-12 right-[-2rem] h-44 w-44 rounded-full bg-cyan-400/10 blur-3xl" />
            <div className="pointer-events-none absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

            <div className="flex flex-col gap-4 border-b border-white/10 pb-6 md:flex-row md:items-end md:justify-between">
              <div>
                <div className="text-xs uppercase tracking-[0.24em] text-blue-200">
                  Premium intake
                </div>
                <div className="mt-2 text-[1.35rem] font-semibold tracking-[-0.03em] text-white">
                  Tell us a little about the project
                </div>
              </div>
              <div className="inline-flex w-fit items-center rounded-full border border-white/12 bg-white/[0.07] px-3 py-1.5 text-xs text-slate-200 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] md:ml-auto md:text-right">
                Fast, low-friction, personally reviewed.
              </div>
            </div>

            <div className="mt-8 grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
              <div className="grid gap-6">
                <div className="rounded-[1.6rem] border border-white/14 bg-[#0d1624]/90 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.18),inset_0_1px_0_rgba(255,255,255,0.04)]">
                  <div className="text-xs uppercase tracking-[0.24em] text-slate-300">
                    Contact details
                  </div>
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <label className="grid gap-2.5">
                      <span className="text-[10px] uppercase tracking-[0.28em] text-slate-300">
                        Full name
                      </span>
                      <input
                        type="text"
                        name="fullName"
                        placeholder="Your name"
                        className="h-12 rounded-2xl border border-white/12 bg-[#132033] px-4 text-sm text-white outline-none transition placeholder:text-slate-500 hover:border-white/20 focus:border-blue-400/55 focus:bg-[#16263c] focus:ring-2 focus:ring-blue-400/20"
                      />
                    </label>

                    <label className="grid gap-2.5">
                      <span className="text-[10px] uppercase tracking-[0.28em] text-slate-300">
                        Business name
                      </span>
                      <input
                        type="text"
                        name="businessName"
                        placeholder="Company or brand"
                        className="h-12 rounded-2xl border border-white/12 bg-[#132033] px-4 text-sm text-white outline-none transition placeholder:text-slate-500 hover:border-white/20 focus:border-blue-400/55 focus:bg-[#16263c] focus:ring-2 focus:ring-blue-400/20"
                      />
                    </label>

                    <label className="grid gap-2.5">
                      <span className="text-[10px] uppercase tracking-[0.28em] text-slate-300">
                        Email address
                      </span>
                      <input
                        type="email"
                        name="email"
                        placeholder="you@company.com"
                        className="h-12 rounded-2xl border border-white/12 bg-[#132033] px-4 text-sm text-white outline-none transition placeholder:text-slate-500 hover:border-white/20 focus:border-blue-400/55 focus:bg-[#16263c] focus:ring-2 focus:ring-blue-400/20"
                      />
                    </label>

                    <label className="grid gap-2.5">
                      <span className="text-[10px] uppercase tracking-[0.28em] text-slate-300">
                        Phone number
                      </span>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Optional"
                        className="h-12 rounded-2xl border border-white/12 bg-[#132033] px-4 text-sm text-white outline-none transition placeholder:text-slate-500 hover:border-white/20 focus:border-blue-400/55 focus:bg-[#16263c] focus:ring-2 focus:ring-blue-400/20"
                      />
                    </label>

                    <label className="grid gap-2.5 sm:col-span-2">
                      <span className="text-[10px] uppercase tracking-[0.28em] text-slate-300">
                        Business type / industry
                      </span>
                      <input
                        type="text"
                        name="businessType"
                        placeholder="e.g. SaaS, consulting, clinic, retail"
                        className="h-12 rounded-2xl border border-white/12 bg-[#132033] px-4 text-sm text-white outline-none transition placeholder:text-slate-500 hover:border-white/20 focus:border-blue-400/55 focus:bg-[#16263c] focus:ring-2 focus:ring-blue-400/20"
                      />
                    </label>
                  </div>
                </div>

                <div className="rounded-[1.6rem] border border-white/14 bg-[#0d1624]/90 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.18),inset_0_1px_0_rgba(255,255,255,0.04)]">
                  <div className="text-xs uppercase tracking-[0.24em] text-slate-300">
                    Project details
                  </div>
                  <label className="mt-6 grid gap-2.5">
                    <span className="text-[10px] uppercase tracking-[0.28em] text-slate-300">
                      Project details / message
                    </span>
                    <textarea
                      name="message"
                      placeholder="Tell us what you need, what is changing, and any details we should know."
                      className="min-h-[210px] rounded-[1.5rem] border border-white/12 bg-[#132033] px-4 py-4 text-sm leading-7 text-white outline-none transition placeholder:text-slate-500 hover:border-white/20 focus:border-blue-400/55 focus:bg-[#16263c] focus:ring-2 focus:ring-blue-400/20"
                    />
                  </label>
                </div>
              </div>

              <div className="grid gap-6">
                <fieldset className="rounded-[1.6rem] border border-white/14 bg-[#0d1624]/90 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.18),inset_0_1px_0_rgba(255,255,255,0.04)]">
                  <legend className="text-xs uppercase tracking-[0.24em] text-slate-300">
                    What do you need?
                  </legend>
                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    {[
                      "Website",
                      "E-commerce website",
                      "Website + booking/contact flow",
                      "Custom system / quoted separately",
                    ].map((item) => (
                      <label key={item} className="block cursor-pointer">
                        <input
                          type="radio"
                          name="projectType"
                          className="peer sr-only"
                        />
                        <span className="flex min-h-12 items-center rounded-[1.1rem] border border-white/12 bg-[#132033] px-4 py-3 text-sm text-slate-300 transition duration-300 hover:border-sky-300/30 hover:bg-white/[0.06] peer-checked:border-sky-300/50 peer-checked:bg-sky-400/15 peer-checked:text-white peer-checked:shadow-[0_10px_28px_rgba(56,189,248,0.12)]">
                          {item}
                        </span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                <div className="grid gap-5 sm:grid-cols-2">
                  <fieldset className="rounded-[1.6rem] border border-white/14 bg-[#0d1624]/90 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.18),inset_0_1px_0_rgba(255,255,255,0.04)]">
                    <legend className="text-xs uppercase tracking-[0.24em] text-slate-300">
                      Do you already have a website?
                    </legend>
                    <div className="mt-6 grid gap-3">
                      {[
                        "No",
                        "Yes, but it needs redesign",
                        "Yes, and I want something better",
                      ].map((item) => (
                        <label key={item} className="block cursor-pointer">
                          <input
                            type="radio"
                            name="existingWebsite"
                            className="peer sr-only"
                          />
                          <span className="flex min-h-12 items-center rounded-[1.1rem] border border-white/12 bg-[#132033] px-4 py-3 text-sm text-slate-300 transition duration-300 hover:border-sky-300/30 hover:bg-white/[0.06] peer-checked:border-sky-300/50 peer-checked:bg-sky-400/15 peer-checked:text-white peer-checked:shadow-[0_10px_28px_rgba(56,189,248,0.12)]">
                            {item}
                          </span>
                        </label>
                      ))}
                    </div>
                  </fieldset>

                  <fieldset className="rounded-[1.6rem] border border-white/14 bg-[#0d1624]/90 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.18),inset_0_1px_0_rgba(255,255,255,0.04)]">
                    <legend className="text-xs uppercase tracking-[0.24em] text-slate-300">
                      Approximate budget
                    </legend>
                    <div className="mt-6 grid gap-3">
                      {["Launch offer", "EUR 500-1,000", "EUR 1,000+", "Not sure yet"].map((item) => (
                        <label key={item} className="block cursor-pointer">
                          <input
                            type="radio"
                            name="budget"
                            className="peer sr-only"
                          />
                          <span className="flex min-h-12 items-center rounded-[1.1rem] border border-white/12 bg-[#132033] px-4 py-3 text-sm text-slate-300 transition duration-300 hover:border-sky-300/30 hover:bg-white/[0.06] peer-checked:border-sky-300/50 peer-checked:bg-sky-400/15 peer-checked:text-white peer-checked:shadow-[0_10px_28px_rgba(56,189,248,0.12)]">
                            {item}
                          </span>
                        </label>
                      ))}
                    </div>
                  </fieldset>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <fieldset className="rounded-[1.6rem] border border-white/14 bg-[#0d1624]/90 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.18),inset_0_1px_0_rgba(255,255,255,0.04)]">
                    <legend className="text-xs uppercase tracking-[0.24em] text-slate-300">
                      What is your goal?
                    </legend>
                    <div className="mt-6 grid gap-3">
                      {[
                        "Look more professional",
                        "Get more clients",
                        "Sell online",
                        "Build trust / credibility",
                        "Other",
                      ].map((item) => (
                        <label key={item} className="block cursor-pointer">
                          <input
                            type="radio"
                            name="goal"
                            className="peer sr-only"
                          />
                          <span className="flex min-h-12 items-center rounded-[1.1rem] border border-white/12 bg-[#132033] px-4 py-3 text-sm text-slate-300 transition duration-300 hover:border-sky-300/30 hover:bg-white/[0.06] peer-checked:border-sky-300/50 peer-checked:bg-sky-400/15 peer-checked:text-white peer-checked:shadow-[0_10px_28px_rgba(56,189,248,0.12)]">
                            {item}
                          </span>
                        </label>
                      ))}
                    </div>
                  </fieldset>

                  <fieldset className="rounded-[1.6rem] border border-white/14 bg-[#0d1624]/90 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.18),inset_0_1px_0_rgba(255,255,255,0.04)]">
                    <legend className="text-xs uppercase tracking-[0.24em] text-slate-300">
                      Preferred contact method
                    </legend>
                    <div className="mt-6 grid gap-3">
                      {["Email", "WhatsApp / phone"].map((item) => (
                        <label key={item} className="block cursor-pointer">
                          <input
                            type="radio"
                            name="contactMethod"
                            className="peer sr-only"
                          />
                          <span className="flex min-h-12 items-center rounded-[1.1rem] border border-white/12 bg-[#132033] px-4 py-3 text-sm text-slate-300 transition duration-300 hover:border-sky-300/30 hover:bg-white/[0.06] peer-checked:border-sky-300/50 peer-checked:bg-sky-400/15 peer-checked:text-white peer-checked:shadow-[0_10px_28px_rgba(56,189,248,0.12)]">
                            {item}
                          </span>
                        </label>
                      ))}
                    </div>
                  </fieldset>
                </div>

                <fieldset className="rounded-[1.6rem] border border-white/14 bg-[#0d1624]/90 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.18),inset_0_1px_0_rgba(255,255,255,0.04)]">
                  <legend className="text-xs uppercase tracking-[0.24em] text-slate-300">
                    Timeline
                  </legend>
                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    {["ASAP", "This month", "Next 1-3 months", "Just exploring"].map((item) => (
                      <label key={item} className="block cursor-pointer">
                        <input
                          type="radio"
                          name="timeline"
                          className="peer sr-only"
                        />
                        <span className="flex min-h-12 items-center rounded-[1.1rem] border border-white/12 bg-[#132033] px-4 py-3 text-sm text-slate-300 transition duration-300 hover:border-sky-300/30 hover:bg-white/[0.06] peer-checked:border-sky-300/50 peer-checked:bg-sky-400/15 peer-checked:text-white peer-checked:shadow-[0_10px_28px_rgba(56,189,248,0.12)]">
                          {item}
                        </span>
                      </label>
                    ))}
                  </div>
                </fieldset>
              </div>
            </div>

            <div className="mt-7 flex flex-col gap-4 border-t border-white/10 pt-7 md:flex-row md:items-center md:justify-between">
              <div className="max-w-2xl text-sm leading-7 text-slate-300">
                We review each request personally and reply with the next steps.
              </div>

              <button
                type="button"
                className="inline-flex items-center justify-center rounded-[1.4rem] bg-gradient-to-br from-blue-500 via-blue-400 to-cyan-300 px-8 py-4 text-sm font-semibold text-white shadow-[0_20px_54px_rgba(59,130,246,0.42),0_0_0_1px_rgba(96,165,250,0.08)] transition duration-300 hover:-translate-y-0.5 hover:from-blue-400 hover:to-cyan-200 hover:shadow-[0_22px_58px_rgba(59,130,246,0.5),0_0_0_1px_rgba(96,165,250,0.12)]"
              >
                Apply now
              </button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}
