import Link from "next/link";
import Header from "@/components/layout/Header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const values = [
  {
    title: "Websites",
    desc: "Premium, mobile-first websites delivered in 7 days for Irish SMEs. Sharp design, real structure.",
  },
  {
    title: "SaaS Products",
    desc: "Subscription-ready software built with commercial thinking from day one, not bolted on later.",
  },
  {
    title: "Systems",
    desc: "Automation and integrations that remove admin friction and sharpen how a business operates.",
  },
];

export default function AboutPage() {
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
          <Badge>About Ziffera</Badge>
          <h1 className="mt-6 text-5xl font-semibold leading-[0.92] tracking-[-0.06em] text-slate-950 md:text-7xl xl:text-[5.5rem]">
            Built in Ireland.
            <br />
            <span className="bg-[linear-gradient(180deg,#1d4ed8_0%,#3b82f6_45%,#7dd3fc_100%)] bg-clip-text text-transparent">
              Serious about craft.
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 md:text-[1.16rem] md:leading-9">
            Ziffera builds websites, SaaS products, mobile apps, and custom
            software for Irish businesses. We combine sharp design with real
            product thinking.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Button asChild size="lg">
              <Link href="/contact">Get in touch</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/work">See our work</Link>
            </Button>
          </div>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {values.map((card) => (
            <Card
              key={card.title}
              className="border-slate-200/80 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.06)]"
            >
              <CardHeader>
                <CardTitle className="text-xl tracking-[-0.04em]">
                  {card.title}
                </CardTitle>
                <CardDescription className="mt-2 text-sm leading-7 text-slate-600">
                  {card.desc}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-[1.02fr_0.98fr]">
          <Card className="overflow-hidden border-slate-200/80 bg-white shadow-[0_28px_84px_rgba(15,23,42,0.1)]">
            <CardHeader>
              <Badge variant="secondary">The approach</Badge>
              <CardTitle className="mt-4 text-3xl tracking-[-0.05em]">
                Product thinking in every project.
              </CardTitle>
              <CardDescription className="mt-3 max-w-2xl text-base leading-7">
                Every website and product we build is held to the same standard
                as a commercial software release. That means clear structure,
                honest pricing, and no cut corners.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  "Mobile-first from the start",
                  "Stripe-ready checkout flows",
                  "Admin panels that work in practice",
                  "Delivered in 7 days for websites",
                ].map((point) => (
                  <Card
                    key={point}
                    className="border-slate-200/80 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] shadow-[0_12px_28px_rgba(15,23,42,0.05)]"
                  >
                    <CardContent className="px-4 py-3 text-sm text-slate-700">
                      {point}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden border-blue-100/80 bg-[linear-gradient(180deg,#eff6ff_0%,#ffffff_100%)] shadow-[0_24px_72px_rgba(59,130,246,0.08)]">
            <CardHeader>
              <Badge>Ready to start?</Badge>
              <CardTitle className="mt-4 text-3xl tracking-[-0.05em]">
                Let&apos;s build something worth showing.
              </CardTitle>
              <CardDescription className="mt-3 max-w-xl text-base leading-7">
                Whether it&apos;s a business website or a product idea, the
                process starts with a clear conversation.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button asChild className="w-full" size="lg">
                <Link href="/checkout/setup-deposit">
                  Start your website
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full" size="lg">
                <Link href="/contact">Talk to Ziffera</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}
