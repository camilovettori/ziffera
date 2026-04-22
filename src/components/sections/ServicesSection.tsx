'use client'

import { motion } from 'framer-motion'
import { Code2, Globe, Smartphone, Sparkles, Workflow } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const services = [
  {
    title: 'Websites',
    desc: 'Clean, fast, mobile-first websites delivered in 7 days.',
    icon: Globe,
    accent: 'from-blue-500 to-cyan-400',
  },
  {
    title: 'E-commerce',
    desc: 'Online stores with Stripe, product management, and admin access.',
    icon: Sparkles,
    accent: 'from-violet-500 to-fuchsia-400',
  },
  {
    title: 'SaaS Products',
    desc: 'Subscription-ready digital products with real commercial thinking.',
    icon: Smartphone,
    accent: 'from-sky-500 to-blue-500',
  },
  {
    title: 'Mobile Apps',
    desc: 'iOS and Android interfaces that feel polished and intuitive.',
    icon: Code2,
    accent: 'from-indigo-500 to-blue-600',
  },
  {
    title: 'Systems & Integrations',
    desc: 'Automation and connected systems that remove admin work.',
    icon: Workflow,
    accent: 'from-cyan-500 to-indigo-500',
  },
]

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
}

export default function ServicesSection() {
  return (
    <motion.section
      id="services"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.22 }}
      className="bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)] py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div variants={item} className="max-w-2xl">
          <Badge>Services</Badge>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-slate-950 md:text-5xl">
            What we build.
          </h2>
          <p className="mt-4 max-w-[500px] text-[18px] leading-[1.65] text-slate-700">
            Websites, e-commerce stores, SaaS products, apps, and systems.
            Every build is clean, fast, and ready to work for your business.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon

            return (
              <motion.div
                key={service.title}
                variants={item}
                whileHover={{ y: -6, scale: 1.015 }}
                transition={{ duration: 0.22 }}
              >
                <Card className="group relative h-full overflow-hidden rounded-[20px] border border-[#E2E8F0] bg-white shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-[6px] hover:border-[rgba(99,102,241,0.3)] hover:shadow-[0_16px_48px_rgba(99,102,241,0.1)]">
                  <div className={`absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r ${service.accent}`} />
                  <CardHeader className="flex h-full flex-col px-7 pt-8 pb-4">
                    <div className="mb-5 flex h-[52px] w-[52px] items-center justify-center rounded-[12px] border border-[rgba(99,102,241,0.08)] bg-[rgba(99,102,241,0.08)] text-[24px] text-blue-700 shadow-none transition duration-300 group-hover:shadow-[0_10px_24px_rgba(99,102,241,0.08)]">
                      <Icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-[18px] font-extrabold tracking-[-0.04em] text-[#0F172A]">
                      {service.title}
                    </CardTitle>
                    <CardDescription className="mt-3 flex-1 text-[14px] leading-[1.65] text-slate-700">
                      {service.desc}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </motion.section>
  )
}
