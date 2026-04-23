import CTASection from "@/components/sections/CTASection";
import OurWorkSection from "@/components/sections/OurWorkSection";
import HeroSection from "@/components/sections/HeroSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import PricingSection from "@/components/sections/PricingSection";
import ServicesSection from "@/components/sections/ServicesSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import Header from "@/components/layout/Header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const faqs = [
  {
    question: "How fast can you build my website?",
    answer:
      "Most projects are delivered in 5-14 days once the content is ready and the scope is clear.",
  },
  {
    question: "What do I need to provide?",
    answer:
      "Your business details, any branding you already have, and a few notes on what the website needs to do.",
  },
  {
    question: "Is there a long-term contract?",
    answer:
      "No. The monthly plan is simple, and you can cancel or pause it anytime.",
  },
  {
    question: "What does the monthly fee cover?",
    answer:
      "Hosting, security updates, basic maintenance, and ongoing support so the site stays in good shape.",
  },
];

export default function HomePage() {
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
      <HeroSection />
      <OurWorkSection />
      <TestimonialsSection />
      <ServicesSection />
      <HowItWorksSection />
      <PricingSection />

      <section id="faq" className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
        <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="max-w-2xl">
            <Badge>FAQ</Badge>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-slate-950 md:text-5xl">
              A few quick answers before you start.
            </h2>
            <p className="mt-4 max-w-xl text-lg leading-8 text-slate-700">
              Straight answers help people move faster. Here&apos;s what most business
              owners want to know first.
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
      </section>

      <CTASection />

      <footer className="border-t border-slate-200/80 bg-white/80">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-10 lg:grid-cols-[1.05fr_0.95fr] lg:px-10">
          <div className="max-w-2xl">
            <Badge variant="secondary">Ziffera</Badge>
            <p className="mt-4 text-lg leading-8 text-slate-700">
              Premium websites for real businesses. Fast delivery. No lock-in.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <Card className="border-slate-200/80 bg-white shadow-[0_12px_28px_rgba(15,23,42,0.05)]">
              <CardContent className="space-y-2 px-5 py-5 text-sm text-slate-800">
                <div className="text-[10px] uppercase tracking-[0.24em] text-slate-500">
                  Contact email
                </div>
                <a
                  href="mailto:hello@ziffera.ie"
                  className="font-medium text-slate-950 transition hover:text-blue-700"
                  aria-label="Email Ziffera at hello at ziffera dot ie"
                >
                  hello@ziffera.ie
                </a>
              </CardContent>
            </Card>

            <Card className="border-slate-200/80 bg-white shadow-[0_12px_28px_rgba(15,23,42,0.05)]">
              <CardContent className="space-y-2 px-5 py-5 text-sm text-slate-800">
                <div className="text-[10px] uppercase tracking-[0.24em] text-slate-500">
                  LinkedIn
                </div>
                <a
                  href="https://www.linkedin.com/company/ziffera"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-slate-950 transition hover:text-blue-700"
                  aria-label="Visit Ziffera on LinkedIn"
                >
                  LinkedIn profile
                </a>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="border-t border-slate-200/80">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-4 text-sm text-slate-600 lg:flex-row lg:items-center lg:justify-between lg:px-10">
            <span>Copyright 2025 Ziffera. All rights reserved.</span>
            <span>Ready to launch a better first impression?</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
