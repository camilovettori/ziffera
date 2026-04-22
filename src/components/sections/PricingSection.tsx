'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const plans = [
  {
    name: 'Starter Website',
    price: '€800',
    delivery: '5–7 days',
    description: 'Clean, fast, mobile-first website for small Irish businesses.',
    features: [
      'Up to 5 pages',
      'Mobile-first responsive design',
      'Contact form with email notifications',
      'Basic SEO setup',
      '1 round of revisions',
      'Delivered in 5–7 days',
    ],
    cta: { label: 'Get Started', href: '/contact' },
    highlighted: false,
  },
  {
    name: 'Growth Website',
    price: '€1,500',
    delivery: '7–10 days',
    description: 'A conversion-focused build for businesses ready to grow.',
    features: [
      'Up to 10 pages',
      'Conversion-optimised layout',
      'CMS integration (manage your own content)',
      'Advanced SEO + analytics setup',
      'Blog or portfolio section',
      '3 rounds of revisions',
      'Delivered in 7–10 days',
    ],
    cta: { label: 'Most Popular — Get Started', href: '/contact' },
    highlighted: true,
  },
  {
    name: 'E-commerce / Custom Build',
    price: 'From €2,500',
    delivery: '10–14 days',
    description:
      'Full e-commerce or custom SaaS build with Stripe, admin panel, and integrations.',
    features: [
      'Unlimited pages',
      'Stripe checkout + payments',
      'Admin dashboard',
      'Custom integrations (APIs, CRMs, automation)',
      'Priority support',
      'Delivered in 10–14 days',
    ],
    cta: { label: 'Book a Call', href: '/contact' },
    highlighted: false,
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

export default function PricingSection() {
  return (
    <motion.section
      id="pricing"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.18 }}
      className="bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div variants={item} className="max-w-2xl">
          <Badge>Pricing</Badge>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-slate-950 md:text-5xl">
            Simple, transparent pricing.
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-700">
            No hidden fees. No surprises. Just great websites at honest prices.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              variants={item}
              className={plan.highlighted ? 'relative lg:scale-[1.03] lg:-translate-y-2' : 'relative'}
            >
              {plan.highlighted && (
                <div className="absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-1/2">
                  <Badge className="border border-blue-200 bg-blue-50 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-blue-700">
                    Most Popular
                  </Badge>
                </div>
              )}

              <Card
                className={`flex h-full flex-col overflow-hidden rounded-[24px] ${
                  plan.highlighted
                    ? 'border-blue-200 bg-[linear-gradient(180deg,#eff6ff_0%,#ffffff_100%)] shadow-[0_28px_72px_rgba(59,130,246,0.12)]'
                    : 'border-slate-200/80 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.06)]'
                }`}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <CardTitle className="text-3xl tracking-[-0.05em] text-slate-950">
                        {plan.name}
                      </CardTitle>
                      <div className="mt-2 text-sm font-medium uppercase tracking-[0.22em] text-slate-500">
                        {plan.delivery}
                      </div>
                    </div>
                    <div className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-blue-700">
                      {plan.price}
                    </div>
                  </div>
                  <CardDescription className="mt-4 max-w-xl text-slate-700">
                    {plan.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="flex h-full flex-1 flex-col space-y-5">
                  <div className="space-y-3">
                    {plan.features.map((feature) => (
                      <div
                        key={feature}
                        className="flex items-start gap-3 rounded-[1.2rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] px-4 py-3 text-sm leading-6 text-slate-700"
                      >
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-700">
                          <Check className="h-3.5 w-3.5" />
                        </span>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button
                    asChild
                    size="lg"
                    variant={plan.highlighted ? 'default' : 'outline'}
                    className="mt-auto w-full"
                    aria-label={plan.cta.label}
                  >
                    <Link href={plan.cta.href}>{plan.cta.label}</Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mx-auto mt-10 max-w-4xl rounded-[1.4rem] border border-slate-200 bg-white px-5 py-4 text-center text-sm leading-7 text-slate-600 shadow-[0_12px_28px_rgba(15,23,42,0.05)]">
          All projects start with a 50% deposit. Final payment before launch. No lock-in contracts.
        </div>
      </div>
    </motion.section>
  )
}
