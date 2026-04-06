"use client";

import { useMemo, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Loader2, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type SubmitResponse = {
  success?: boolean;
  clientSecret?: string;
  error?: string;
};

type CheckoutFormState = {
  name: string;
  email: string;
  company: string;
};

const initialFormState: CheckoutFormState = {
  name: "",
  email: "",
  company: "",
};

export type EmbeddedCheckoutFlowProps = {
  apiPath: string;
  successHref: string;
  cancelHref: string;
  supportEmail: string;
  buttonLabel: string;
  checkoutCopy?: string;
  bullets: string[];
  companyLabel?: string;
};

const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
const stripePromise = stripePublishableKey ? loadStripe(stripePublishableKey) : null;

export function EmbeddedCheckoutFlow({
  apiPath,
  successHref,
  cancelHref,
  supportEmail,
  buttonLabel,
  checkoutCopy,
  bullets,
  companyLabel = "Company",
}: EmbeddedCheckoutFlowProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<CheckoutFormState>(initialFormState);
  const [status, setStatus] = useState<"idle" | "submitting" | "loading" | "error">(
    "idle"
  );
  const [feedback, setFeedback] = useState("");
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  const hasStripeConfig = Boolean(stripePublishableKey && stripePromise);

  const stripeOptions = useMemo(
    () =>
      clientSecret
        ? {
            clientSecret,
            onComplete: () => {
              router.replace(successHref);
            },
          }
        : null,
    [clientSecret, router, successHref]
  );

  const handleChange = (key: keyof CheckoutFormState, value: string) => {
    setFormData((current) => ({ ...current, [key]: value }));
    if (status === "error") {
      setStatus("idle");
      setFeedback("");
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const name = formData.name.trim();
    const email = formData.email.trim();
    const company = formData.company.trim();

    if (!name || !email) {
      setStatus("error");
      setFeedback("Please add your name and email address.");
      return;
    }

    if (!hasStripeConfig) {
      setStatus("error");
      setFeedback("Stripe checkout is not configured yet.");
      return;
    }

    setStatus("submitting");
    setFeedback("");

    try {
      const response = await fetch(apiPath, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, company }),
      });

      const result = (await response.json()) as SubmitResponse;

      if (!response.ok) {
        throw new Error(result.error ?? "We could not start checkout right now.");
      }

      if (!result.clientSecret) {
        throw new Error("We could not start checkout right now.");
      }

      setClientSecret(result.clientSecret);
      setStatus("loading");
    } catch (error) {
      console.error("Embedded checkout submit failed", error);
      setStatus("error");
      setFeedback(
        error instanceof Error
          ? error.message
          : "We could not start checkout right now."
      );
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-3 sm:grid-cols-3">
        {bullets.map((bullet) => (
          <div
            key={bullet}
            className="rounded-[1.2rem] border border-slate-200/80 bg-white/90 px-4 py-3 text-sm font-medium text-slate-700 shadow-[0_12px_28px_rgba(15,23,42,0.05)]"
          >
            {bullet}
          </div>
        ))}
      </div>

      <div className="rounded-[1.4rem] border border-blue-100 bg-white/80 px-4 py-4 text-sm leading-7 text-slate-700">
        <div className="flex items-start gap-3">
          <Shield className="mt-0.5 h-5 w-5 shrink-0 text-blue-700" />
          <p>
            Stripe handles the secure checkout experience inside the Ziffera
            site. Questions can go to {supportEmail}.
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className={cn("space-y-6", clientSecret && "hidden")}
      >
        <div className="grid gap-5 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.24em] text-slate-500">
              Name
            </label>
            <Input
              type="text"
              name="name"
              autoComplete="name"
              value={formData.name}
              onChange={(event) => handleChange("name", event.target.value)}
              placeholder="Your name"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.24em] text-slate-500">
              Email
            </label>
            <Input
              type="email"
              name="email"
              autoComplete="email"
              value={formData.email}
              onChange={(event) => handleChange("email", event.target.value)}
              placeholder="you@company.com"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-[10px] uppercase tracking-[0.24em] text-slate-500">
              {companyLabel}
            </label>
            <Input
              type="text"
              name="company"
              autoComplete="organization"
              value={formData.company}
              onChange={(event) => handleChange("company", event.target.value)}
              placeholder="Optional company name"
            />
          </div>
        </div>

        {feedback ? (
          <div className="rounded-[1.2rem] border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
            {feedback}
          </div>
        ) : null}

        <Button
          type="submit"
          className="w-full"
          size="lg"
          disabled={status === "submitting" || status === "loading"}
        >
          {status === "submitting" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Starting checkout...
            </>
          ) : (
            buttonLabel
          )}
        </Button>
      </form>

      {clientSecret ? (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-[1.2rem] border border-slate-200/80 bg-white/90 px-4 py-3 text-sm text-slate-600">
            <span>Secure checkout loaded inside the page.</span>
            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setClientSecret(null);
                  setStatus("idle");
                  setFeedback("");
                }}
              >
                Edit details
              </Button>
              <Button type="button" variant="ghost" onClick={() => router.push(cancelHref)}>
                Cancel
              </Button>
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-slate-200/80 bg-white p-3 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
            {checkoutCopy ? (
              <p className="px-2 pb-3 text-sm leading-7 text-slate-600">
                {checkoutCopy}
              </p>
            ) : null}

            {stripeOptions && stripePromise ? (
              <div className="min-h-[640px]">
                <EmbeddedCheckoutProvider
                  stripe={stripePromise}
                  options={stripeOptions}
                >
                  <EmbeddedCheckout />
                </EmbeddedCheckoutProvider>
              </div>
            ) : (
              <div className="flex min-h-[320px] items-center justify-center rounded-[1.2rem] border border-dashed border-slate-200 bg-slate-50 text-sm text-slate-500">
                Loading secure checkout...
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex min-h-[240px] items-center justify-center rounded-[1.5rem] border border-dashed border-slate-200 bg-slate-50 text-sm text-slate-500">
          {status === "error" && feedback
            ? feedback
            : "Your checkout will load here after the form is submitted."}
        </div>
      )}
    </div>
  );
}
