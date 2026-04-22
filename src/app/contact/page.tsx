"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

const needs = ["Website", "E-commerce website", "Booking / contact site"];
const budgets = ["€400-€800", "€800-€1,500", "Not sure"];

type FormState = {
  name: string;
  email: string;
  businessName: string;
  need: string;
  budget: string;
  message: string;
};

const initialFormState: FormState = {
  name: "",
  email: "",
  businessName: "",
  need: "",
  budget: "",
  message: "",
};

export default function ContactPage() {
  const [formData, setFormData] = useState<FormState>(initialFormState);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">(
    "idle"
  );
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
    const businessName = formData.businessName.trim();
    const need = formData.need.trim();
    const budget = formData.budget.trim();
    const message = formData.message.trim();

    if (!name || !email || !businessName || !need || !budget || !message) {
      setStatus("error");
      setFeedback("Please complete all fields before sending.");
      return;
    }

    setStatus("sending");
    setFeedback("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          businessName,
          need,
          budget,
          message,
        }),
      });

      const responseText = await response.text();
      let result: { success?: boolean; message?: string; error?: string } = {};

      if (responseText) {
        try {
          result = JSON.parse(responseText) as {
            success?: boolean;
            message?: string;
            error?: string;
          };
        } catch (parseError) {
          console.error("Contact API returned invalid JSON", parseError);
        }
      }

      if (!response.ok) {
        throw new Error(result.error ?? "Unable to send message. Please try again.");
      }

      setFormData(initialFormState);
      setStatus("success");
      setFeedback(result.message ?? "Thanks. Your message has been sent.");
    } catch (error) {
      console.error("Contact form submission failed", error);
      setStatus("error");
      setFeedback(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    }
  };

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#F7FAFF] text-slate-900">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.18),transparent_26%),radial-gradient(circle_at_top_right,rgba(125,211,252,0.14),transparent_24%),linear-gradient(180deg,#ffffff_0%,#f6f9ff_42%,#eef4ff_100%)]" />
        <div className="absolute left-[-10%] top-[-8%] h-[24rem] w-[24rem] rounded-full bg-blue-200/40 blur-3xl" />
        <div className="absolute right-[-8%] top-[10rem] h-[22rem] w-[22rem] rounded-full bg-cyan-200/32 blur-3xl" />
        <div className="absolute bottom-[12%] left-[18%] h-[18rem] w-[18rem] rounded-full bg-indigo-200/28 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.04] [background-image:linear-gradient(rgba(15,23,42,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.12)_1px,transparent_1px)] [background-size:84px_84px]" />
      </div>

      <div className="mx-auto max-w-7xl px-6 py-6 lg:px-10">
        <div className="sticky top-0 z-20 rounded-[1.8rem] border border-slate-200/80 bg-white/84 px-5 py-4 shadow-[0_18px_44px_rgba(15,23,42,0.07)] backdrop-blur-2xl">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <Link href="/" className="inline-flex w-fit flex-col items-start">
              <Image
                src="/logos/ziffera-logo.png"
                alt="Ziffera logo"
                width={230}
                height={76}
                priority
                className="h-12 w-auto object-contain lg:h-14"
              />
              <div className="mt-2 pl-1 text-[10px] uppercase tracking-[0.3em] text-slate-500">
                Premium websites only
              </div>
            </Link>

            <div className="flex flex-wrap gap-3">
              <Button asChild variant="outline">
                <Link href="/">Back to homepage</Link>
              </Button>
              <Button asChild variant="secondary">
                <Link href="/#work">View real work</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-12 px-6 pb-24 pt-10 lg:grid-cols-[0.92fr_1.08fr] lg:px-10 lg:pb-32 lg:pt-14">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="max-w-3xl"
        >
          <Badge>Friendly, direct contact</Badge>
          <h1 className="mt-6 text-5xl font-semibold leading-[0.94] tracking-[-0.06em] text-slate-950 md:text-7xl xl:text-[5.5rem]">
            Tell us about your website.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 md:text-[1.16rem] md:leading-9">
            Most websites are delivered in 7-14 days. We handle everything for you.
            No pressure - just a quick quote.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {[
              "Most websites delivered in 7-14 days",
              "We handle everything for you",
              "No pressure - just a quick quote",
            ].map(
              (entry) => (
                <Card
                  key={entry}
                  className="border-slate-200/80 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] shadow-[0_12px_28px_rgba(15,23,42,0.05)]"
                >
                  <CardContent className="px-4 py-3 text-sm font-medium text-slate-700">
                    {entry}
                  </CardContent>
                </Card>
              )
            )}
          </div>

          <Card className="mt-8 border-blue-100/80 bg-[linear-gradient(180deg,#eff6ff_0%,#ffffff_100%)] shadow-[0_18px_42px_rgba(59,130,246,0.08)]">
            <CardContent className="px-5 py-4 text-sm leading-7 text-slate-700">
              We build premium websites for real businesses and keep the process
              simple from start to finish.
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
        >
          <Card className="overflow-hidden border-slate-200/80 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] shadow-[0_28px_84px_rgba(15,23,42,0.1)]">
            <CardHeader className="pb-5">
              <Badge>Contact form</Badge>
              <CardTitle className="mt-4 text-3xl tracking-[-0.05em]">
                Get a clear quote
              </CardTitle>
              <CardDescription className="mt-3 max-w-2xl text-base leading-7">
                A short form keeps things easy and helps us reply with the right next step.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-5 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.24em] text-slate-500">
                      Name
                    </label>
                    <Input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={(event) => handleChange("name", event.target.value)}
                      placeholder="Your name"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.24em] text-slate-500">
                      Email
                    </label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={(event) => handleChange("email", event.target.value)}
                      placeholder="you@company.com"
                      required
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <label className="text-[10px] uppercase tracking-[0.24em] text-slate-500">
                      Business name
                    </label>
                    <Input
                      type="text"
                      name="businessName"
                      value={formData.businessName}
                      onChange={(event) =>
                        handleChange("businessName", event.target.value)
                      }
                      placeholder="Company or brand"
                      required
                    />
                  </div>
                </div>

                <Separator />

                <div className="grid gap-5 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.24em] text-slate-500">
                      What do you need?
                    </label>
                    <Select
                      value={formData.need}
                      onChange={(event) => handleChange("need", event.target.value)}
                      required
                    >
                      <option value="">Select one</option>
                      {needs.map((entry) => (
                        <option key={entry} value={entry}>
                          {entry}
                        </option>
                      ))}
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.24em] text-slate-500">
                      Budget
                    </label>
                    <Select
                      value={formData.budget}
                      onChange={(event) => handleChange("budget", event.target.value)}
                      required
                    >
                      <option value="">Select one</option>
                      {budgets.map((entry) => (
                        <option key={entry} value={entry}>
                          {entry}
                        </option>
                      ))}
                    </Select>
                  </div>
                </div>

                <Separator />

                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                  className="space-y-2"
                >
                  <label className="text-[10px] uppercase tracking-[0.24em] text-slate-500">
                    Message
                  </label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={(event) => handleChange("message", event.target.value)}
                    placeholder="Tell us what your website needs to do, what pages you need, and any examples you like."
                    required
                  />
                </motion.div>

                <div className="flex flex-col gap-4 border-t border-slate-200 pt-5 md:flex-row md:items-center md:justify-between">
                  <div className="text-sm leading-7 text-slate-500">
                    We&apos;ll review the details and send you a clear next step.
                  </div>

                  <div className="flex flex-col items-start gap-3 md:items-end">
                    <Button type="submit" disabled={status === "sending"} size="lg">
                      {status === "sending" ? "Sending..." : "Send message"}
                    </Button>

                    <p
                      aria-live="polite"
                      className={`max-w-xl text-sm leading-6 ${
                        status === "success"
                          ? "text-emerald-600"
                          : status === "error"
                            ? "text-rose-600"
                            : "text-slate-500"
                      }`}
                    >
                      {feedback || "Your message goes straight to hello@ziffera.ie."}
                    </p>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </main>
  );
}
