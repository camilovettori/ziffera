import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SubscribeForm } from "./subscribe-form";

export default function MarginFlowSubscribePage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#F7FAFF] text-slate-900">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.18),transparent_26%),radial-gradient(circle_at_top_right,rgba(125,211,252,0.14),transparent_24%),linear-gradient(180deg,#ffffff_0%,#f6f9ff_42%,#eef4ff_100%)]" />
        <div className="absolute left-[-10%] top-[-8%] h-[24rem] w-[24rem] rounded-full bg-blue-200/40 blur-3xl" />
        <div className="absolute right-[-8%] top-[10rem] h-[22rem] w-[22rem] rounded-full bg-cyan-200/32 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-6 py-6 lg:px-10">
        <div className="flex items-center justify-between gap-4 rounded-[1.8rem] border border-slate-200/80 bg-white/88 px-5 py-4 shadow-[0_18px_44px_rgba(15,23,42,0.07)] backdrop-blur-2xl">
          <div>
            <Badge>MarginFlow trial</Badge>
            <p className="mt-2 text-sm text-slate-600">
              Secure embedded checkout handled by Ziffera Core and Stripe.
            </p>
          </div>
          <Button asChild variant="outline">
            <Link href="/marginflow">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-10 px-6 pb-24 pt-8 lg:grid-cols-[0.94fr_1.06fr] lg:px-10 lg:pb-32 lg:pt-12">
        <div className="max-w-2xl">
          <Badge>Start free trial</Badge>
          <h1 className="mt-6 text-5xl font-semibold leading-[0.94] tracking-[-0.06em] text-slate-950 md:text-7xl xl:text-[5.5rem]">
            Start MarginFlow
            <br />
            with a clean trial.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 md:text-[1.16rem] md:leading-9">
            Give us your details once, and Ziffera Core will create the client
            record, link the Stripe customer, and load checkout directly on this
            page.
          </p>

          <Card className="mt-8 border-blue-100/80 bg-[linear-gradient(180deg,#eff6ff_0%,#ffffff_100%)] shadow-[0_18px_42px_rgba(59,130,246,0.08)]">
            <CardContent className="px-5 py-4 text-sm leading-7 text-slate-700">
              Your confirmation email will come from support@ziffera.ie.
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="overflow-hidden border-slate-200/80 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] shadow-[0_28px_84px_rgba(15,23,42,0.1)]">
            <CardHeader className="pb-5">
              <Badge>Checkout form</Badge>
              <CardTitle className="mt-4 text-3xl tracking-[-0.05em]">
                A simple, premium start.
              </CardTitle>
              <CardDescription className="mt-3 max-w-2xl text-base leading-7">
                Add your name, email, and optional company name. Checkout will
                appear below once your details are confirmed.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <SubscribeForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}

