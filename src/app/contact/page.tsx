"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";

const contactPoints = [
  "Personal review",
  "No commitment",
  "Clear next steps",
  "Only 4 spots this month",
];

const quickDetails = [
  "Custom websites",
  "Artist sites",
  "E-commerce",
  "Bookings and enquiries",
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [feedback, setFeedback] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const name = formData.name.trim();
    const email = formData.email.trim();
    const message = formData.message.trim();

    if (!name || !email || !message) {
      setStatus("error");
      setFeedback("Please fill in your name, email, and message.");
      return;
    }

    setStatus("sending");
    setFeedback("");

    console.log("Submitting contact form", { name, email, message });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
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
        throw new Error(
          result.error ?? "Unable to send message. Please try again."
        );
      }

      console.log("Contact form sent", result);

      setFormData({
        name: "",
        email: "",
        message: "",
      });
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
    <main className="relative min-h-screen overflow-x-hidden bg-[#0B0F14] text-white">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.14),transparent_24%),radial-gradient(circle_at_top_right,rgba(34,211,238,0.08),transparent_18%),radial-gradient(circle_at_bottom_left,rgba(99,102,241,0.08),transparent_20%)]" />
        <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:80px_80px]" />
      </div>

      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-10 lg:py-14">
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <Link href="/" className="inline-flex w-fit flex-col items-start">
            <Image
              src="/logos/ziffera-logo.png"
              alt="Ziffera logo"
              width={240}
              height={80}
              priority
              className="h-14 w-auto object-contain lg:h-16"
            />
            <div className="mt-2 pl-1 text-[10px] uppercase tracking-[0.32em] text-slate-400 opacity-85">
              Websites . Systems . SaaS
            </div>
          </Link>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/"
              className="inline-flex w-fit items-center rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-medium text-slate-200 transition hover:bg-white/[0.08]"
            >
              Back to homepage
            </Link>
            <Link
              href="/artists"
              className="inline-flex w-fit items-center rounded-2xl border border-blue-400/20 bg-blue-400/10 px-5 py-3 text-sm font-medium text-blue-100 transition hover:bg-blue-400/15"
            >
              View artist page
            </Link>
          </div>
        </div>

        <section className="grid gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-3 rounded-full border border-blue-400/20 bg-blue-400/10 px-4 py-2 text-[11px] uppercase tracking-[0.28em] text-blue-100 shadow-[0_12px_30px_rgba(59,130,246,0.12)]">
              <span className="h-2 w-2 rounded-full bg-blue-300 shadow-[0_0_18px_rgba(96,165,250,0.95)]" />
              Direct contact and project review
            </div>

            <h1 className="mt-6 text-5xl font-semibold leading-[0.9] tracking-[-0.06em] text-white md:text-7xl xl:text-[5.5rem]">
              Start your project
              <br />
              <span className="bg-[linear-gradient(180deg,#ffffff_0%,#dbeafe_58%,#93c5fd_100%)] bg-clip-text text-transparent">
                with a simple first step.
              </span>
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300 md:text-[1.28rem] md:leading-9">
              Share a few details about your project and we will personally
              review the fit, the scope and the fastest path to a premium
              result.
            </p>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400">
              No commitment. We will just review your project and reply with
              clear next steps.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {contactPoints.map((item) => (
                <div
                  key={item}
                  className="rounded-[1.6rem] border border-white/10 bg-white/[0.04] px-5 py-4 text-sm text-slate-300"
                >
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="https://wa.me/353830483222"
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl bg-gradient-to-r from-blue-500 via-blue-400 to-cyan-300 px-6 py-3.5 text-sm font-semibold text-white shadow-[0_20px_60px_rgba(59,130,246,0.38)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_70px_rgba(59,130,246,0.45)]"
              >
                Quick chat on WhatsApp
              </a>

              <Link
                href="#contact-form"
                className="rounded-2xl border border-white/12 bg-white/[0.04] px-6 py-3.5 text-sm font-medium text-white transition duration-300 hover:border-white/20 hover:bg-white/[0.08]"
              >
                Fill the form
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="pointer-events-none absolute -left-10 top-10 h-32 w-32 rounded-full bg-blue-500/20 blur-3xl" />
            <div className="pointer-events-none absolute -right-6 bottom-12 h-36 w-36 rounded-full bg-cyan-400/15 blur-3xl" />

            <div className="relative overflow-hidden rounded-[2.6rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-7 shadow-[0_40px_140px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-2xl lg:p-8">
              <div className="pointer-events-none absolute inset-0 rounded-[2.6rem] bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.2),transparent_58%)]" />
              <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />

              <div className="rounded-[2rem] border border-white/10 bg-[#09111b] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
                <div className="text-xs uppercase tracking-[0.25em] text-slate-400">
                  What to expect
                </div>
                <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-white">
                  A premium review, not a generic sales reply.
                </h2>
                <p className="mt-4 text-sm leading-7 text-slate-400">
                  We look at your goals, your current presence and the best way
                  to make the site feel credible and conversion-focused.
                </p>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {quickDetails.map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-slate-200"
                    >
                      {item}
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-[1.4rem] border border-blue-400/18 bg-[linear-gradient(180deg,rgba(59,130,246,0.12),rgba(255,255,255,0.03))] p-4 text-sm leading-7 text-slate-300">
                  Only 4 spots available this month. We review each project
                  personally and reply with the next steps.
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="contact-form" className="mt-24">
          <div className="mb-6 max-w-2xl">
            <div className="text-xs uppercase tracking-[0.24em] text-blue-200">
              Contact form
            </div>
            <h2 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-white md:text-5xl">
              Tell us a little about the project.
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-400">
              Keep it short. We&apos;ll review the details and reply with the
              best next step.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="relative overflow-hidden rounded-[2rem] border border-white/16 bg-[linear-gradient(180deg,rgba(255,255,255,0.11),rgba(255,255,255,0.035))] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-2xl md:p-8 lg:p-10"
          >
            <div className="pointer-events-none absolute -left-16 top-12 h-40 w-40 rounded-full bg-blue-500/16 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-12 right-[-2rem] h-44 w-44 rounded-full bg-cyan-400/12 blur-3xl" />
            <div className="pointer-events-none absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

            <div className="grid gap-6">
              <div className="rounded-[1.6rem] border border-white/14 bg-[linear-gradient(180deg,rgba(13,22,36,0.96),rgba(12,19,31,0.92))] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.18),inset_0_1px_0_rgba(255,255,255,0.04)]">
                <div className="text-xs uppercase tracking-[0.24em] text-slate-200">
                  Contact details
                </div>
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <label className="grid gap-2.5">
                    <span className="text-[10px] uppercase tracking-[0.28em] text-slate-200">
                      Name
                    </span>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={(event) =>
                        setFormData((current) => {
                          setStatus("idle");
                          setFeedback("");

                          return {
                            ...current,
                            name: event.target.value,
                          };
                        })
                      }
                      placeholder="Your name"
                      required
                      className="h-12 rounded-2xl border border-white/12 bg-[#15253a] px-4 text-sm text-white outline-none transition placeholder:text-slate-500 hover:border-white/20 focus:border-blue-400/55 focus:bg-[#1a2c44] focus:ring-2 focus:ring-blue-400/22"
                    />
                  </label>

                  <label className="grid gap-2.5">
                    <span className="text-[10px] uppercase tracking-[0.28em] text-slate-200">
                      Email address
                    </span>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={(event) =>
                        setFormData((current) => {
                          setStatus("idle");
                          setFeedback("");

                          return {
                            ...current,
                            email: event.target.value,
                          };
                        })
                      }
                      placeholder="you@company.com"
                      required
                      className="h-12 rounded-2xl border border-white/12 bg-[#15253a] px-4 text-sm text-white outline-none transition placeholder:text-slate-500 hover:border-white/20 focus:border-blue-400/55 focus:bg-[#1a2c44] focus:ring-2 focus:ring-blue-400/22"
                    />
                  </label>

                  <label className="grid gap-2.5 md:col-span-2">
                    <span className="text-[10px] uppercase tracking-[0.28em] text-slate-200">
                      Message
                    </span>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={(event) =>
                        setFormData((current) => {
                          setStatus("idle");
                          setFeedback("");

                          return {
                            ...current,
                            message: event.target.value,
                          };
                        })
                      }
                      placeholder="Tell us what you need, what is changing, and any details we should know."
                      required
                      className="min-h-[210px] rounded-[1.5rem] border border-white/12 bg-[#15253a] px-4 py-4 text-sm leading-7 text-white outline-none transition placeholder:text-slate-500 hover:border-white/20 focus:border-blue-400/55 focus:bg-[#1a2c44] focus:ring-2 focus:ring-blue-400/22"
                    />
                  </label>
                </div>
              </div>

              <div className="flex flex-col gap-4 border-t border-white/10 pt-8 md:flex-row md:items-center md:justify-between">
                <div className="max-w-2xl text-sm leading-7 text-slate-300">
                  We review each request personally and reply with the next
                  steps.
                </div>

                <div className="flex flex-col gap-3 md:items-end">
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="inline-flex items-center justify-center rounded-[1.4rem] bg-gradient-to-br from-blue-500 via-blue-400 to-cyan-300 px-8 py-4 text-sm font-semibold text-white shadow-[0_20px_54px_rgba(59,130,246,0.45),0_0_0_1px_rgba(96,165,250,0.1)] transition duration-300 hover:-translate-y-0.5 hover:from-blue-400 hover:to-cyan-200 hover:shadow-[0_24px_62px_rgba(59,130,246,0.55),0_0_0_1px_rgba(96,165,250,0.14)] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
                  >
                    {status === "sending" ? "Sending..." : "Send message"}
                  </button>

                  <p
                    aria-live="polite"
                    className={`max-w-xl text-sm leading-6 ${
                      status === "success"
                        ? "text-emerald-300"
                        : status === "error"
                          ? "text-rose-300"
                          : "text-slate-400"
                    }`}
                  >
                    {feedback || "Your message will go straight to hello@ziffera.ie."}
                  </p>
                </div>
              </div>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}
