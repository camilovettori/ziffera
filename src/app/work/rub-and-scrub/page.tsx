import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import Header from "@/components/layout/Header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Rub & Scrub — Ziffera",
  description:
    "A service website case study showing how Ziffera built a cleaner booking flow that helped increase enquiries and bookings.",
  alternates: {
    canonical: "/work/rub-and-scrub",
  },
  openGraph: {
    title: "Rub & Scrub — Ziffera",
    description:
      "A service website case study showing how Ziffera built a cleaner booking flow that helped increase enquiries and bookings.",
    url: "https://www.ziffera.ie/work/rub-and-scrub",
    siteName: "Ziffera",
    type: "website",
    images: [
      {
        url: "/examples/rub-and-scrub.png",
        width: 1200,
        height: 630,
        alt: "Rub and Scrub website preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rub & Scrub — Ziffera",
    description:
      "A service website case study showing how Ziffera built a cleaner booking flow that helped increase enquiries and bookings.",
    images: ["/examples/rub-and-scrub.png"],
  },
};

const highlights = [
  "Helps people book faster",
  "Shows proof of quality with photos",
  "Builds trust before the customer reaches out",
  "Makes the business look more professional",
  "Works well for local customers on mobile",
];

export default function RubAndScrubPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#F7FAFF] text-slate-900">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.18),transparent_26%),radial-gradient(circle_at_top_right,rgba(125,211,252,0.14),transparent_24%),linear-gradient(180deg,#ffffff_0%,#f6f9ff_42%,#eef4ff_100%)]" />
        <div className="absolute left-[-10%] top-[-8%] h-[24rem] w-[24rem] rounded-full bg-blue-200/40 blur-3xl" />
        <div className="absolute right-[-8%] top-[10rem] h-[22rem] w-[22rem] rounded-full bg-cyan-200/32 blur-3xl" />
        <div className="absolute bottom-[12%] left-[18%] h-[18rem] w-[18rem] rounded-full bg-indigo-200/28 blur-3xl" />
      </div>

      <Header />

      <section className="mx-auto max-w-7xl px-6 pb-20 pt-12 lg:px-10 lg:pb-28 lg:pt-20">
        <div className="max-w-3xl">
          <Badge>Live client project</Badge>
          <h1 className="mt-6 text-5xl font-semibold leading-[0.92] tracking-[-0.06em] text-slate-950 md:text-7xl xl:text-[5.5rem]">
            Rub &amp; Scrub.
            <br />
            <span className="bg-[linear-gradient(180deg,#1d4ed8_0%,#3b82f6_45%,#7dd3fc_100%)] bg-clip-text text-transparent">
              Built to get bookings.
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 md:text-[1.16rem] md:leading-9">
            A mobile-first website for a Dublin car valeting business - simple booking,
            strong proof of quality, and a clearer path to enquiry.
          </p>
          <div className="mt-5 inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-800">
            Outcome: Increased bookings with a simple flow
          </div>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button asChild size="lg" aria-label="Get your website">
              <Link href="/contact">Get your website</Link>
            </Button>
            <Button asChild variant="outline" size="lg" aria-label="View the live Rub and Scrub website">
              <a
                href="https://www.rubandscrub.ie"
                target="_blank"
                rel="noopener noreferrer"
              >
                View live site <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Card className="overflow-hidden border-slate-200 bg-white/95 p-4 shadow-[0_24px_70px_rgba(15,23,42,0.08)] lg:p-5">
            <div className="flex items-center justify-between gap-4">
              <Badge variant="secondary">Rub &amp; Scrub</Badge>
              <div className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-blue-700">
                Live client work
              </div>
            </div>
            <div className="mt-4 overflow-hidden rounded-[1.8rem] border border-slate-200 bg-slate-100 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
              <div className="border-b border-slate-200 bg-slate-50 px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                  <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                  <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                </div>
              </div>
              <div className="relative aspect-[16/11] bg-slate-200">
                <Image
                  src="/examples/rub-and-scrub.png"
                  alt="Rub and Scrub homepage preview"
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover object-top"
                />
              </div>
            </div>
          </Card>

          <Card className="overflow-hidden border-slate-200/80 bg-white shadow-[0_28px_84px_rgba(15,23,42,0.1)]">
            <CardHeader>
              <Badge variant="secondary">What changed</Badge>
              <CardTitle className="mt-4 text-3xl tracking-[-0.05em]">
                Simple, fast, and built to convert.
              </CardTitle>
              <CardDescription className="mt-3 max-w-2xl text-base leading-7">
                The goal was to make it easier for local customers to understand the
                service, trust the business, and make a booking.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {highlights.map((point) => (
                <div
                  key={point}
                  className="flex items-center gap-3 rounded-[1.2rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] px-4 py-3 text-sm text-slate-700"
                >
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-50 text-blue-700">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  {point}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="mt-20 border-t border-slate-200/80 pt-16">
          <Badge>Want this for your business?</Badge>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-slate-950 md:text-5xl">
            Start a similar build.
          </h2>
          <p className="mt-4 max-w-xl text-lg leading-8 text-slate-700">
            The same quality of work is available for your business. A clear process,
            a fixed price, and a live result in 5-14 days.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button asChild size="lg">
              <Link href="/contact">
                Get your website <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a
                href="https://www.rubandscrub.ie"
                target="_blank"
                rel="noopener noreferrer"
              >
                View live site
              </a>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
