"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";

const needs = [
  "Website",
  "E-commerce",
  "Custom system",
  "Integration",
  "Other",
];

const budgets = [
  "Under EUR 1000",
  "EUR 1000-EUR 2500",
  "EUR 2500+",
  "Not sure yet",
];

const timelines = ["ASAP", "This month", "Next 1-3 months", "Just exploring"];

type FormState = {
  name: string;
  email: string;
  businessName: string;
  need: string;
  budget: string;
  timeline: string;
  message: string;
};

const initialFormState: FormState = {
  name: "",
  email: "",
  businessName: "",
  need: "",
  budget: "",
  timeline: "",
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
    const timeline = formData.timeline.trim();
    const message = formData.message.trim();

    if (!name || !email || !businessName || !need || !budget || !timeline || !message) {
      setStatus("error");
      setFeedback("Please complete all fields before sending.");
      return;
    }

    setStatus("sending");
    setFeedback("");

    console.log("Submitting contact form", {
      name,
      email,
      businessName,
      need,
      budget,
      timeline,
      messageLength: message.length,
    });

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
          timeline,
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

      console.log("Contact form sent", result);

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
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.16),transparent_26%),radial-gradient(circle_at_top_right,rgba(125,211,252,0.12),transparent_24%),linear-gradient(180deg,#ffffff_0%,#f7fbff_45%,#eef5ff_100%)]" />
        <div className="absolute left-[-10%] top-[-8%] h-[24rem] w-[24rem] rounded-full bg-blue-200/40 blur-3xl" />
        <div className="absolute right-[-8%] top-[10rem] h-[22rem] w-[22rem] rounded-full bg-cyan-200/40 blur-3xl" />
        <div className="absolute bottom-[12%] left-[18%] h-[18rem] w-[18rem] rounded-full bg-indigo-200/30 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.04] [background-image:linear-gradient(rgba(15,23,42,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.12)_1px,transparent_1px)] [background-size:84px_84px]" />
      </div>

      <div className="mx-auto max-w-7xl px-6 py-6 lg:px-10">
        <div className="sticky top-0 z-20 rounded-[1.6rem] border border-slate-200 bg-white/85 px-5 py-4 shadow-[0_14px_40px_rgba(15,23,42,0.05)] backdrop-blur-xl">
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
                Websites / Systems / SaaS
              </div>
            </Link>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/"
                className="inline-flex w-fit items-center rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition hover:border-blue-200 hover:bg-blue-50"
              >
                Back to homepage
              </Link>
              <Link
                href="/#work"
                className="inline-flex w-fit items-center rounded-2xl border border-blue-100 bg-blue-50 px-5 py-3 text-sm font-medium text-blue-700 transition hover:border-blue-200 hover:bg-blue-100"
              >
                View real work
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-12 px-6 pb-24 pt-10 lg:grid-cols-[1.02fr_0.98fr] lg:px-10 lg:pb-32 lg:pt-14">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-[11px] uppercase tracking-[0.28em] text-blue-700">
            Friendly, direct contact
          </div>

          <h1 className="mt-6 text-5xl font-semibold leading-[0.94] tracking-[-0.06em] text-slate-950 md:text-7xl xl:text-[5.5rem]">
            Tell us what you need.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 md:text-[1.22rem] md:leading-9">
            Share a few details and we&apos;ll reply with the clearest next step.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {["Usually reply within 24 hours", "Clear next steps", "No pressure"].map(
              (item) => (
                <div
                  key={item}
                  className="rounded-[1.4rem] border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 shadow-[0_8px_24px_rgba(15,23,42,0.04)]"
                >
                  {item}
                </div>
              )
            )}
          </div>

          <div className="mt-8 rounded-[1.6rem] border border-blue-100 bg-blue-50 px-5 py-4 text-sm leading-7 text-slate-700">
            We build websites, e-commerce stores, custom systems, and
            integrations for small businesses, artists, and growing brands.
          </div>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.06)] lg:p-8">
          <div className="rounded-[1.6rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] p-5">
            <div className="text-xs uppercase tracking-[0.24em] text-blue-700">
              Contact form
            </div>

            <form onSubmit={handleSubmit} className="mt-6 grid gap-5">
              <div className="grid gap-5 md:grid-cols-2">
                <label className="grid gap-2">
                  <span className="text-[10px] uppercase tracking-[0.24em] text-slate-500">
                    Name
                  </span>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={(event) => handleChange("name", event.target.value)}
                    placeholder="Your name"
                    required
                    className="h-12 rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-blue-200 focus:border-blue-300 focus:ring-2 focus:ring-blue-100"
                  />
                </label>

                <label className="grid gap-2">
                  <span className="text-[10px] uppercase tracking-[0.24em] text-slate-500">
                    Email
                  </span>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={(event) => handleChange("email", event.target.value)}
                    placeholder="you@company.com"
                    required
                    className="h-12 rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-blue-200 focus:border-blue-300 focus:ring-2 focus:ring-blue-100"
                  />
                </label>

                <label className="grid gap-2 md:col-span-2">
                  <span className="text-[10px] uppercase tracking-[0.24em] text-slate-500">
                    Business / brand name
                  </span>
                  <input
                    type="text"
                    name="businessName"
                    value={formData.businessName}
                    onChange={(event) =>
                      handleChange("businessName", event.target.value)
                    }
                    placeholder="Company or brand"
                    required
                    className="h-12 rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-blue-200 focus:border-blue-300 focus:ring-2 focus:ring-blue-100"
                  />
                </label>

                <label className="grid gap-2">
                  <span className="text-[10px] uppercase tracking-[0.24em] text-slate-500">
                    What do you need?
                  </span>
                  <select
                    value={formData.need}
                    onChange={(event) => handleChange("need", event.target.value)}
                    required
                    className="h-12 rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition hover:border-blue-200 focus:border-blue-300 focus:ring-2 focus:ring-blue-100"
                  >
                    <option value="">Select one</option>
                    {needs.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="grid gap-2">
                  <span className="text-[10px] uppercase tracking-[0.24em] text-slate-500">
                    Budget range
                  </span>
                  <select
                    value={formData.budget}
                    onChange={(event) =>
                      handleChange("budget", event.target.value)
                    }
                    required
                    className="h-12 rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition hover:border-blue-200 focus:border-blue-300 focus:ring-2 focus:ring-blue-100"
                  >
                    <option value="">Select one</option>
                    {budgets.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="grid gap-2 md:col-span-2">
                  <span className="text-[10px] uppercase tracking-[0.24em] text-slate-500">
                    Timeline
                  </span>
                  <select
                    value={formData.timeline}
                    onChange={(event) =>
                      handleChange("timeline", event.target.value)
                    }
                    required
                    className="h-12 rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition hover:border-blue-200 focus:border-blue-300 focus:ring-2 focus:ring-blue-100"
                  >
                    <option value="">Select one</option>
                    {timelines.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="grid gap-2 md:col-span-2">
                  <span className="text-[10px] uppercase tracking-[0.24em] text-slate-500">
                    Message
                  </span>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={(event) => handleChange("message", event.target.value)}
                    placeholder="A few lines about what you need, what it should do, and any links that help."
                    required
                    className="min-h-[180px] rounded-[1.5rem] border border-slate-200 bg-white px-4 py-4 text-sm leading-7 text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-blue-200 focus:border-blue-300 focus:ring-2 focus:ring-blue-100"
                  />
                </label>
              </div>

              <div className="flex flex-col gap-4 border-t border-slate-200 pt-5 md:flex-row md:items-center md:justify-between">
                <div className="text-sm leading-7 text-slate-500">
                  We&apos;ll review the details and send you a clear next step.
                </div>

                <div className="flex flex-col gap-3 md:items-end">
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="inline-flex items-center justify-center rounded-2xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-[0_16px_40px_rgba(59,130,246,0.22)] transition duration-300 hover:-translate-y-0.5 hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
                  >
                    {status === "sending" ? "Sending..." : "Send message"}
                  </button>

                  <p
                    aria-live="polite"
                    className={`text-sm leading-6 ${
                      status === "success"
                        ? "text-emerald-600"
                        : status === "error"
                          ? "text-rose-600"
                          : "text-slate-500"
                    }`}
                  >
                    {feedback || "Your message will go straight to hello@ziffera.ie."}
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
