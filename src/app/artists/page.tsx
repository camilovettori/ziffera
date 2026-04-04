import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Websites for Artists | Ziffera",
  description:
    "Premium websites for artists, photographers, illustrators and makers who want to present, sell and manage their work professionally.",
};

const proofCards = [
  {
    label: "Real client project",
    value: "Frequency Framed",
    note: "Built and launched by Ziffera",
  },
  {
    label: "Live website",
    value: "frequencyframed.ie",
    note: "A real art business site",
  },
  {
    label: "What it proves",
    value: "Gallery, checkout, admin",
    note: "A complete selling system",
  },
];

const whyArtists = [
  {
    title: "Your website is your storefront",
    text: "Social media is useful, but it should not be the only place people experience your work.",
  },
  {
    title: "Collectors trust owned sites more",
    text: "A polished website gives your work a dedicated space and makes you look more established.",
  },
  {
    title: "DMs are not a sales system",
    text: "A real website gives visitors a clear path to view, enquire, commission or buy.",
  },
  {
    title: "Algorithms should not control your sales",
    text: "Your work deserves a home that you own, control and can confidently share.",
  },
];

const included = [
  "Custom homepage",
  "Artwork gallery",
  "Artwork detail pages",
  "Secure payments",
  "Cart and checkout",
  "Mobile-friendly design",
  "Contact / inquiry form",
  "Admin panel for updates",
  "Order management",
  "Easy content updates",
];

const artists = [
  "Painters",
  "Photographers",
  "Illustrators",
  "Ceramic artists",
  "Sculptors",
  "Mixed media artists",
  "Makers and creatives",
  "Independent creators",
];

const steps = [
  {
    title: "Tell me about your work",
    text: "Share your art, your goals and what you want the website to help you achieve.",
  },
  {
    title: "I design and build the site",
    text: "I create a premium website that presents your work beautifully and feels easy to trust.",
  },
  {
    title: "You launch and share it",
    text: "You get a professional online home you can send to collectors, galleries and buyers.",
  },
];

const trustPoints = [
  "No templates",
  "Built for real businesses",
  "Fast turnaround",
  "Desktop and mobile ready",
];

const faqs = [
  {
    q: "Can I sell my work online?",
    a: "Yes. The site can include secure payments, cart flow and a clean checkout experience for your work.",
  },
  {
    q: "Can people contact me for commissions?",
    a: "Yes. We can add a contact or inquiry flow so collectors and clients can reach you easily.",
  },
  {
    q: "Will it work on mobile?",
    a: "Absolutely. The experience is designed to feel premium and easy to browse on phones and tablets.",
  },
  {
    q: "Can I update artworks later?",
    a: "Yes. The site can be set up so you can add or update work without rebuilding everything.",
  },
  {
    q: "Do I need all images upfront?",
    a: "No. We can build with what you have and structure the site so new work can be added later.",
  },
  {
    q: "Do you help with payments?",
    a: "Yes. We can set up the payment experience and make the buying flow simple and professional.",
  },
];

export default function ArtistsPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#0B0F14] text-white">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.14),transparent_24%),radial-gradient(circle_at_top_right,rgba(34,211,238,0.08),transparent_18%),radial-gradient(circle_at_bottom_left,rgba(99,102,241,0.08),transparent_20%)]" />
        <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:80px_80px]" />
      </div>

      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-10 lg:py-14">
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

          <div className="flex flex-wrap gap-3">
            <Link
              href="#proof"
              className="inline-flex w-fit items-center rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-medium text-slate-200 transition hover:bg-white/[0.08]"
            >
              See Real Example
            </Link>
            <Link
              href="/"
              className="inline-flex w-fit items-center rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-medium text-slate-200 transition hover:bg-white/[0.08]"
            >
              Back to homepage
            </Link>
          </div>
        </div>

        {/* HERO */}
        <section className="grid gap-12 lg:grid-cols-[1.03fr_0.97fr] lg:items-center">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-3 rounded-full border border-blue-400/20 bg-blue-400/10 px-4 py-2 text-[11px] uppercase tracking-[0.28em] text-blue-100 shadow-[0_12px_30px_rgba(59,130,246,0.12)]">
              <span className="h-2 w-2 rounded-full bg-blue-300 shadow-[0_0_18px_rgba(96,165,250,0.95)]" />
              For artists who want to sell professionally
            </div>

            <h1 className="mt-6 text-5xl font-semibold leading-[0.92] tracking-[-0.06em] text-white md:text-7xl xl:text-[5.4rem]">
              Sell your work online with a website made for artists.
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300 md:text-[1.28rem] md:leading-9">
              Get a custom art website with a beautiful gallery, secure
              payments, mobile-friendly pages, commission enquiries and easy
              content updates.
            </p>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400">
              Built for painters, photographers, illustrators, makers and other
              creatives who want their own branded online presence.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="rounded-2xl bg-gradient-to-r from-blue-500 via-blue-400 to-cyan-300 px-6 py-3.5 text-sm font-semibold text-white shadow-[0_20px_60px_rgba(59,130,246,0.38)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_70px_rgba(59,130,246,0.45)]"
              >
                Get Your Artist Website
              </Link>

              <Link
                href="#proof"
                className="rounded-2xl border border-white/12 bg-white/[0.04] px-6 py-3.5 text-sm font-medium text-white transition duration-300 hover:border-white/20 hover:bg-white/[0.08]"
              >
                View Real Example
              </Link>
            </div>

            <div className="mt-8 grid gap-3 text-sm text-slate-400 sm:grid-cols-3">
              {[
                "Real client project: Frequency Framed",
                "Desktop and mobile ready",
                "No commitment to enquire",
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

          <div className="relative">
            <div className="pointer-events-none absolute -left-10 top-10 h-32 w-32 rounded-full bg-blue-500/20 blur-3xl" />
            <div className="pointer-events-none absolute -right-6 bottom-12 h-36 w-36 rounded-full bg-cyan-400/15 blur-3xl" />
            <div className="pointer-events-none absolute -inset-10 bg-[radial-gradient(circle_at_72%_28%,rgba(59,130,246,0.24),transparent_42%)] blur-2xl" />

            <div className="relative overflow-hidden rounded-[2.8rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.075),rgba(255,255,255,0.03))] p-7 shadow-[0_40px_140px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-2xl lg:p-8">
              <div className="pointer-events-none absolute inset-0 rounded-[2.8rem] bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.2),transparent_58%)]" />
              <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />

              <div className="relative mb-5 flex flex-wrap items-center justify-start gap-2">
                <div className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-white/80 backdrop-blur-md">
                  Real client project
                </div>
                <div className="rounded-full border border-sky-300/30 bg-sky-400/12 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-sky-100 backdrop-blur-md">
                  Frequency Framed
                </div>
              </div>

              <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
                <div className="group overflow-hidden rounded-[2rem] border border-white/10 bg-black shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
                  <div className="relative">
                    <video
                      src="/examples/homepage.mp4"
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="h-[22rem] w-full object-cover object-center sm:h-[26rem]"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,12,0.04),transparent_22%,transparent_74%,rgba(2,6,12,0.42))]" />
                  </div>
                </div>

                <div className="grid gap-4">
                  <div className="overflow-hidden rounded-[1.8rem] border border-white/10 bg-[#09111b] shadow-[0_24px_70px_rgba(0,0,0,0.28)]">
                    <div className="relative aspect-[4/5]">
                      <Image
                        src="/examples/mobileFF.jpg"
                        alt="Mobile preview of Frequency Framed"
                        fill
                        sizes="(max-width: 1024px) 100vw, 360px"
                        className="object-cover object-top"
                      />
                    </div>
                  </div>

                  <div className="rounded-[1.8rem] border border-white/12 bg-white/[0.04] p-4 shadow-[0_18px_50px_rgba(0,0,0,0.18)]">
                    <div className="text-xs uppercase tracking-[0.24em] text-blue-100">
                      Live website
                    </div>
                    <a
                      href="https://www.frequencyframed.ie"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 block text-sm font-medium text-white underline decoration-blue-200/40 underline-offset-4 transition hover:decoration-blue-200/70"
                    >
                      www.frequencyframed.ie
                    </a>
                    <p className="mt-3 text-sm leading-7 text-slate-400">
                      A real website, e-commerce flow and admin system delivered
                      for a client.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {proofCards.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] px-4 py-4"
                  >
                    <div className="text-[10px] uppercase tracking-[0.28em] text-slate-400">
                      {item.label}
                    </div>
                    <div className="mt-2 text-sm font-medium text-white">
                      {item.value}
                    </div>
                    <div className="mt-1 text-sm text-slate-400">{item.note}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* WHY ARTISTS */}
        <section id="proof" className="mt-24">
          <div className="max-w-2xl">
            <div className="text-xs uppercase tracking-[0.24em] text-blue-200">
              Why artists need their own website
            </div>
            <h2 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-white md:text-5xl">
              Your work deserves more than a social feed.
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-400">
              Instagram is useful, but it is not your storefront, your sales
              system or the place where collectors should have to guess who you
              are.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {whyArtists.map((item) => (
              <div
                key={item.title}
                className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-6 shadow-[0_18px_50px_rgba(0,0,0,0.18)]"
              >
                <h3 className="text-lg font-semibold tracking-[-0.03em] text-white">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-400">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* INCLUDED */}
        <section className="mt-24">
          <div className="max-w-2xl">
            <div className="text-xs uppercase tracking-[0.24em] text-blue-200">
              What is included
            </div>
            <h2 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-white md:text-5xl">
              Everything needed to present and sell your work professionally.
            </h2>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {included.map((item) => (
              <div
                key={item}
                className="rounded-[1.4rem] border border-white/10 bg-[linear-gradient(180deg,rgba(13,22,36,0.96),rgba(12,19,31,0.92))] px-5 py-5 shadow-[0_18px_50px_rgba(0,0,0,0.16)]"
              >
                <div className="flex items-center gap-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-sky-300 shadow-[0_0_18px_rgba(96,165,250,0.7)]" />
                  <span className="text-sm font-medium text-white">{item}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* TRUST STRIP */}
        <section className="mt-20">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {trustPoints.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 text-sm text-slate-300 shadow-[0_12px_40px_rgba(0,0,0,0.14)]"
              >
                {item}
              </div>
            ))}
          </div>
        </section>

        {/* WHO THIS IS FOR */}
        <section className="mt-24">
          <div className="max-w-2xl">
            <div className="text-xs uppercase tracking-[0.24em] text-blue-200">
              Who this is for
            </div>
            <h2 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-white md:text-5xl">
              Ideal for creatives who want to look professional and sell better.
            </h2>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {artists.map((item) => (
              <div
                key={item}
                className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-slate-300"
              >
                {item}
              </div>
            ))}
          </div>
        </section>

        {/* PROCESS */}
        <section className="mt-24">
          <div className="mb-6 max-w-2xl">
            <div className="text-xs uppercase tracking-[0.24em] text-blue-200">
              Simple process
            </div>
            <h2 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-white md:text-5xl">
              A calm, clear process that removes uncertainty.
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className="rounded-[1.5rem] border border-white/10 bg-[linear-gradient(180deg,rgba(13,22,36,0.96),rgba(12,19,31,0.92))] p-6 shadow-[0_18px_50px_rgba(0,0,0,0.18),inset_0_1px_0_rgba(255,255,255,0.04)]"
              >
                <div className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-sky-300/20 bg-sky-400/10 text-sm font-semibold text-sky-100">
                  0{index + 1}
                </div>
                <h3 className="mt-4 text-lg font-semibold tracking-[-0.03em] text-white">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-400">
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* PRICING */}
        <section className="mt-24">
          <div className="mb-6 max-w-2xl">
            <div className="text-xs uppercase tracking-[0.24em] text-blue-200">
              Offer
            </div>
            <h2 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-white md:text-5xl">
              Clear pricing for a custom artist website.
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-400">
              Setup is a launch offer for artists who want a premium, custom
              built website without agency overhead.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8">
              <div className="text-xs uppercase tracking-[0.24em] text-slate-400">
                Setup
              </div>
              <div className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-white">
                EUR 250
              </div>
              <p className="mt-3 text-sm leading-7 text-slate-400">
                Launch offer for a professional artist website, designed and
                built for your work.
              </p>
            </div>

            <div className="rounded-[2rem] border border-blue-400/20 bg-gradient-to-br from-blue-400/12 to-white/[0.03] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.25)]">
              <div className="text-xs uppercase tracking-[0.24em] text-blue-100">
                Monthly
              </div>
              <div className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-white">
                EUR 20/mo
              </div>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                Hosting, support and care for a standard business website.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-24">
          <div className="mb-6 max-w-2xl">
            <div className="text-xs uppercase tracking-[0.24em] text-blue-200">
              FAQ
            </div>
            <h2 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-white md:text-5xl">
              Answers to the questions artists usually ask first.
            </h2>
          </div>

          <div className="grid gap-4">
            {faqs.map((item) => (
              <details
                key={item.q}
                className="group rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-6 shadow-[0_18px_50px_rgba(0,0,0,0.18)]"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-lg font-medium tracking-[-0.02em] text-white marker:hidden">
                  <span>{item.q}</span>
                  <span className="text-xl text-slate-400 transition group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-400">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="mt-24">
          <div className="rounded-[2.2rem] border border-blue-400/18 bg-[linear-gradient(180deg,rgba(59,130,246,0.12),rgba(255,255,255,0.03))] p-7 shadow-[0_24px_70px_rgba(0,0,0,0.22)] md:p-8">
            <div className="text-xs uppercase tracking-[0.24em] text-blue-100">
              Only 4 spots available this month
            </div>
            <div className="mt-3 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div className="max-w-2xl">
                <h2 className="text-3xl font-semibold tracking-[-0.04em] text-white md:text-4xl">
                  Start your artist website with a real project built around
                  your work.
                </h2>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  No commitment - we&apos;ll review your project and guide you
                  on the best next step.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-[1.3rem] bg-gradient-to-br from-blue-500 via-blue-400 to-cyan-300 px-7 py-3.5 text-sm font-semibold text-white shadow-[0_20px_54px_rgba(59,130,246,0.45)] transition hover:-translate-y-0.5 hover:shadow-[0_24px_62px_rgba(59,130,246,0.55)]"
                >
                  Get Your Artist Website
                </Link>

                <Link
                  href="#proof"
                  className="inline-flex items-center justify-center rounded-[1.3rem] border border-white/12 bg-white/[0.04] px-7 py-3.5 text-sm font-medium text-white transition hover:bg-white/[0.08]"
                >
                  See Real Example
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
