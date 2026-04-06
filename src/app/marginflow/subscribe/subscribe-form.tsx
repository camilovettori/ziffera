"use client";

import { useState, type FormEvent } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type FormState = {
  name: string;
  email: string;
  company: string;
};

const initialState: FormState = {
  name: "",
  email: "",
  company: "",
};

export function SubscribeForm() {
  const [formData, setFormData] = useState<FormState>(initialState);
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [feedback, setFeedback] = useState("");

  const handleChange = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setFormData((current) => ({ ...current, [key]: value }));
    if (status !== "idle") {
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

    setStatus("submitting");
    setFeedback("");

    try {
      const response = await fetch("/api/marginflow/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, company }),
      });

      const result = (await response.json()) as {
        checkoutUrl?: string;
        redirectUrl?: string;
        error?: string;
      };

      if (!response.ok) {
        throw new Error(result.error ?? "We could not start your trial right now.");
      }

      const redirectUrl = result.redirectUrl ?? result.checkoutUrl;
      if (!redirectUrl) {
        throw new Error("We could not start your trial right now.");
      }

      window.location.assign(redirectUrl);
    } catch (error) {
      setStatus("error");
      setFeedback(
        error instanceof Error
          ? error.message
          : "We could not start your trial right now."
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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
            Company
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

      <Button type="submit" className="w-full" size="lg" disabled={status === "submitting"}>
        {status === "submitting" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Starting trial...
          </>
        ) : (
          "Start free trial"
        )}
      </Button>
    </form>
  );
}
