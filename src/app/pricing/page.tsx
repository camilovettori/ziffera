import Link from "next/link";
import { Check } from "lucide-react";
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

const monthlyIncludes = [
  "Website hosting",
  "Security updates",
  "Basic maintenance",
  "Small text or image updates within reasonable limits",
  "Ongoing support",
  "Keeping the website online and running properly",
];

const monthlyNotIncluded = [
  "Full redesigns",
  "New pages",
  "Advanced SEO",
  "Ads / marketing management",
  "Large feature upgrades",
  "Major booking system changes",
];

const reassurance = [
  "You pay €200 to begin.",
  "You review and approve the website before the final payment.",
  "The site goes live only when the work is ready.",
];

const faqs = [
  {
    question: "How does payment work?",
    answer:
      "The setup is €400 total, paid as €200 to begin and €200 before go-live. The monthly plan is €25/month after launch.",
  },
  {
    question: "What do I need to provide?",
    answer:
      "Just your content (text and images), your preferences, and your goals. We handle the rest.",
  },
  {
    question: "Can I make changes after launch?",
    answer:
      "Yes. The monthly plan covers reasonable text and image updates, ongoing support, and keeping the site running properly.",
  },
  {
    question: "What if I'm not happy with the design?",
    answer:
      "We work through a clear revision process to make sure you're satisfied before anything goes live.",
  },
];

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
        <div className="grid gap-6 lg:grid-cols-[1.02fr_0.98fr]">
          <div>
            <Badge>Pricing</Badge>
            <h1 className="mt-6 text-5xl font-semibold leading-[0.92] tracking-[-0.06em] text-slate-950 md:text-7xl xl:text-[5.5rem]">
              One clear
              <br />
              <span className="bg-[linear-gradient(180deg,#1d4ed8_0%,#3b82f6_45%,#7dd3fc_100%)] bg-clip-text text-transparent">
                package.
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 md:text-[1.16rem] md:leading-9">
              The website offer is simple: €400 setup plus €25/month after
              launch. No hidden fees, no bloated package names, just a clear
              offer for a serious business website.
            </p>
          </div>

          <Card className="overflow-hidden border-blue-100/80 bg-[linear-gradient(180deg,#eff6ff_0%,#ffffff_100%)] shadow-[0_24px_72px_rgba(59,130,246,0.08)]">
            <CardHeader>
              <Badge>Start now</Badge>
              <CardTitle className="mt-4 text-4xl tracking-[-0.05em]">
                €400 setup + €25/month
              </CardTitle>
              <CardDescription className="mt-3 max-w-xl text-base leading-7 text-slate-700">
                Secure your build slot with a clear setup payment and an ongoing
                monthly plan for hosting and support.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-3 sm:grid-cols-2">
                <Card className="border-slate-200/80 bg-white shadow-[0_12px_28px_rgba(15,23,42,0.05)]">
                  <CardContent className="px-4 py-3 text-sm font-medium text-slate-700">
                    €200 to begin
                  </CardContent>
                </Card>
                <Card className="border-slate-200/80 bg-white shadow-[0_12px_28px_rgba(15,23,42,0.05)]">
                  <CardContent className="px-4 py-3 text-sm font-medium text-slate-700">
                    €200 before go-live
                  </CardContent>
                </Card>
              </div>
              <div className="rounded-[1.4rem] border border-blue-100 bg-white px-5 py-5 text-sm leading-7 text-slate-700">
                The setup total is €400. The €25/month plan covers hosting,
                security updates, basic maintenance, small text or image changes
                within reasonable limits, ongoing support, and keeping the
                website online and running properly.
              </div>
              <Button
                asChild
                className="w-full"
                size="lg"
                aria-label="Get started with the €400 setup and €25 per month offer"
              >
                <Link href="/checkout/setup-deposit">
                  Get Started {"\u2014"} €400 setup + €25/month
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-20 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <Badge>Monthly plan</Badge>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-slate-950 md:text-5xl">
              What the €25/month plan includes
            </h2>
            <p className="mt-4 max-w-xl text-lg leading-8 text-slate-700">
              The monthly plan starts when the website goes live and keeps the
              site supported afterwards.
            </p>
          </div>

          <div className="grid gap-4">
            <div className="grid gap-3 sm:grid-cols-2">
              {monthlyIncludes.map((entry) => (
                <Card
                  key={entry}
                  className="border-slate-200/80 bg-white shadow-[0_12px_28px_rgba(15,23,42,0.05)]"
                >
                  <CardContent className="flex items-start gap-3 px-4 py-4 text-sm text-slate-700">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-700">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    {entry}
                  </CardContent>
                </Card>
              ))}
            </div>
            <Card className="border-slate-200/80 bg-white shadow-[0_12px_28px_rgba(15,23,42,0.05)]">
              <CardContent className="space-y-3 px-5 py-5 text-sm leading-7 text-slate-700">
                <div className="text-[10px] uppercase tracking-[0.24em] text-slate-500">
                  Not included
                </div>
                <div className="flex flex-wrap gap-2">
                  {monthlyNotIncluded.map((entry) => (
                    <span
                      key={entry}
                      className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-700"
                    >
                      {entry}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-20 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <Badge>Reassurance</Badge>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-slate-950 md:text-5xl">
              No risk, no confusion.
            </h2>
            <p className="mt-4 max-w-xl text-lg leading-8 text-slate-700">
              The process stays clear from the first click to the final handoff.
            </p>
          </div>
          <div className="grid gap-3">
            {reassurance.map((entry) => (
              <Card
                key={entry}
                className="border-slate-200/80 bg-white shadow-[0_12px_28px_rgba(15,23,42,0.05)]"
              >
                <CardContent className="flex items-center gap-3 px-4 py-4 text-sm text-slate-700">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-50 text-blue-700">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  {entry}
                </CardContent>
              </Card>
            ))}
          </div>
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
                Irish SME owners want to know first.
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
