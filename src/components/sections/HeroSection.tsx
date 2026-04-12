"use client";

import { motion } from "framer-motion";
import { Check, ShieldCheck, Sparkles } from "lucide-react";
import Link from "next/link";
import HeroCarousel from "@/components/ui/HeroCarousel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription } from "@/components/ui/card";

const heroTrustPoints = [
  {
    title: "Real proof only",
    text: "Frequency Framed is the only public project shown on the homepage.",
    icon: Check,
  },
  {
    title: "Built to convert",
    text: "Clear hierarchy, sharper messaging, and stronger calls to action.",
    icon: Sparkles,
  },
  {
    title: "Simple process",
    text: "€400 setup, paid as €200 to begin and €200 before go-live.",
    icon: ShieldCheck,
  },
];

const heroParticles = [
  { top: "12%", left: "8%", size: 4, color: "#3B82F6", delay: "0s", duration: "16s" },
  { top: "18%", left: "26%", size: 3, color: "#8B5CF6", delay: "1.4s", duration: "18s" },
  { top: "28%", left: "50%", size: 5, color: "#06B6D4", delay: "2.2s", duration: "17s" },
  { top: "10%", left: "72%", size: 3, color: "#3B82F6", delay: "0.8s", duration: "15s" },
  { top: "22%", left: "88%", size: 4, color: "#8B5CF6", delay: "3s", duration: "19s" },
  { top: "42%", left: "14%", size: 2, color: "#06B6D4", delay: "2.8s", duration: "14s" },
  { top: "54%", left: "36%", size: 5, color: "#3B82F6", delay: "1.1s", duration: "18s" },
  { top: "60%", left: "62%", size: 3, color: "#8B5CF6", delay: "0.2s", duration: "16s" },
  { top: "68%", left: "82%", size: 4, color: "#06B6D4", delay: "3.4s", duration: "20s" },
  { top: "74%", left: "22%", size: 2, color: "#3B82F6", delay: "1.9s", duration: "15s" },
  { top: "82%", left: "46%", size: 3, color: "#8B5CF6", delay: "2.6s", duration: "17s" },
  { top: "86%", left: "76%", size: 4, color: "#06B6D4", delay: "0.5s", duration: "18s" },
];

export default function HeroSection() {
  return (
    <section
      className="relative isolate w-full min-h-screen overflow-hidden px-6 pt-6 lg:px-10 lg:pt-8"
      style={{
        background:
          "radial-gradient(ellipse 90% 70% at 15% 40%, rgba(59,130,246,0.22) 0%, transparent 65%), radial-gradient(ellipse 70% 90% at 85% 20%, rgba(124,58,237,0.18) 0%, transparent 60%), radial-gradient(ellipse 60% 60% at 60% 85%, rgba(16,185,129,0.08) 0%, transparent 55%), linear-gradient(160deg, #060917 0%, #0B0F28 35%, #0D0B22 65%, #080C1F 100%)",
      }}
    >
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(160deg,#060917_0%,#0B0F28_35%,#0D0B22_65%,#080C1F_100%)]" />
      <div
        className="hero-grid-overlay absolute inset-0 z-0 pointer-events-none opacity-70"
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.16),transparent_26%),radial-gradient(circle_at_top_right,rgba(124,58,237,0.12),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(96,165,250,0.12),transparent_26%)]" />
      <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
        <div className="hero-blob absolute left-[-6%] top-[-8%] h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(96,165,250,0.35),rgba(37,99,235,0.1)_55%,transparent_72%)] blur-3xl" />
        <div className="hero-blob absolute right-[-8%] top-[12%] h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.22),rgba(124,58,237,0.06)_58%,transparent_74%)] blur-3xl [animation-delay:1.8s]" />
        <div className="hero-blob absolute bottom-[-12%] left-[18%] h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.22),rgba(59,130,246,0.05)_58%,transparent_74%)] blur-3xl [animation-delay:3s]" />
        {heroParticles.map((particle, index) => (
          <span
            key={`${particle.top}-${particle.left}-${index}`}
            className="absolute rounded-full blur-[0.3px] [animation-name:particleFloat] [animation-iteration-count:infinite] [animation-timing-function:linear]"
            style={{
              top: particle.top,
              left: particle.left,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              backgroundColor: particle.color,
              animationDuration: particle.duration,
              animationDelay: particle.delay,
              opacity: 0.4,
              boxShadow: `0 0 12px ${particle.color}`,
            }}
          />
        ))}
        <div className="hero-fade-bottom z-[3]" />
      </div>

      <div className="relative z-10 mx-auto grid max-w-7xl gap-10 pb-[60px] pt-10 lg:grid-cols-[1.04fr_0.96fr] lg:items-center lg:pt-[4.5rem]">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="relative z-10 max-w-3xl"
        >
          <Badge className="inline-flex items-center gap-2 rounded-full border border-[rgba(99,102,241,0.28)] bg-[rgba(99,102,241,0.12)] px-4 py-1.5 text-[10px] font-bold uppercase tracking-[2.5px] text-[#A5B4FC] shadow-[0_10px_24px_rgba(37,99,235,0.10)] backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-[#818CF8] shadow-[0_0_6px_#818CF8] animate-pulse [animation-duration:2s]" />
            Websites / products / systems
          </Badge>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="mt-6 max-w-4xl text-5xl font-black leading-[0.92] tracking-[-0.06em] text-white drop-shadow-[0_2px_20px_rgba(0,0,0,0.5)] md:text-7xl xl:text-[5.5rem]"
          >
            Your business deserves a website that{" "}
            <span className="bg-[linear-gradient(135deg,#60A5FA_0%,#A78BFA_50%,#34D399_100%)] bg-[length:200%_200%] bg-clip-text text-transparent animate-[gradientFlow_4s_ease_infinite]">
              actually works.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12 }}
            className="mt-6 mb-8 max-w-[480px] text-[17px] font-normal leading-[1.75] text-[#CBD5F5]"
          >
            We design and build websites, SaaS products, apps, custom software,
            and connected systems for Irish businesses that want a serious
            digital presence.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <Button
              asChild
              size="lg"
              aria-label="Get started with the €400 setup and €25 per month offer"
              className="btn-primary shimmer-hover bg-[linear-gradient(135deg,#4F46E5_0%,#7C3AED_100%)] px-8 text-white shadow-[0_4px_24px_rgba(99,102,241,0.45),0_0_0_1px_rgba(139,92,246,0.3)] hover:shadow-[0_10px_34px_rgba(99,102,241,0.52),0_0_0_1px_rgba(139,92,246,0.35)]"
            >
              <Link href="/checkout/setup-deposit">
                Get Started {"\u2014"} €400 setup + €25/month
              </Link>
            </Button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.28 }}
            className="mt-4 flex items-center gap-2 text-[13px] font-medium text-slate-300"
          >
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/10 text-cyan-200 shadow-[0_0_8px_#22C55E]">
              <Check className="h-3.5 w-3.5" />
            </span>
            Currently accepting 2 new projects this month.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.34 }}
            className="mt-10 grid gap-3"
          >
            {heroTrustPoints.map((point) => {
              const Icon = point.icon;

              return (
                <Card
                  key={point.title}
                className="hero-feature-card rounded-[16px] border border-white/20 bg-[rgba(255,255,255,0.10)] shadow-[0_10px_30px_rgba(0,0,0,0.5)] backdrop-blur-[12px]"
              >
                  <CardContent className="flex items-center gap-4 px-[22px] py-[18px]">
                    <div className="flex h-11 min-w-11 shrink-0 items-center justify-center rounded-[12px] border border-[rgba(99,102,241,0.25)] bg-[rgba(99,102,241,0.18)] text-[18px] text-[#A5B4FC] shadow-[0_14px_28px_rgba(37,99,235,0.14)]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="space-y-1">
                      <div className="mb-1 text-[15px] font-bold text-white">
                        {point.title}
                      </div>
                      <CardDescription className="max-w-xl text-[13px] leading-[1.6] text-slate-300">
                        {point.text}
                      </CardDescription>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.18 }}
          className="hero-blob relative mx-auto w-full max-w-[520px] lg:self-center"
        >
          <HeroCarousel />
        </motion.div>
      </div>
    </section>
  );
}
