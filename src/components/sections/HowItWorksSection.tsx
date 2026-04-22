import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";

const steps = [
  {
    step: "01",
    title: "Pay your deposit",
    description: "We confirm scope, agree the direction, and get started.",
  },
  {
    step: "02",
    title: "We build your website",
    description: "Design, content structure, and development move forward together.",
  },
  {
    step: "03",
    title: "You review and approve",
    description: "You check the site and we handle the final refinements.",
  },
  {
    step: "04",
    title: "Go live",
    description: "Your new website launches and starts working for the business.",
  },
];

export default function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)] py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-2xl">
          <Badge>How it works</Badge>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-slate-950 md:text-5xl">
            How It Works
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-700">
            A simple process keeps the project moving. You know what happens next at
            every step.
          </p>
        </div>

        <ol className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {steps.map((step) => (
            <li key={step.step} className="h-full">
              <Card className="h-full border-slate-200/80 bg-white shadow-[0_16px_42px_rgba(15,23,42,0.06)]">
                <CardContent className="flex h-full flex-col px-6 py-6">
                  <div className="inline-flex w-fit rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-blue-700">
                    Step {step.step}
                  </div>
                  <CardTitle className="mt-4 text-2xl tracking-[-0.05em] text-slate-950">
                    {step.title}
                  </CardTitle>
                  <CardDescription className="mt-3 text-base leading-7 text-slate-700">
                    {step.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </li>
          ))}
        </ol>

        <div className="mt-10 flex flex-wrap gap-4">
          <Button asChild size="lg" aria-label="View pricing">
            <Link href="/pricing">View Pricing</Link>
          </Button>
          <Button asChild size="lg" variant="outline" aria-label="Get your website">
            <Link href="/contact">Get your website</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
