import type { Metadata } from "next";
import CaseStudy, { type CaseStudyData } from "@/components/work/CaseStudy";

export const metadata: Metadata = {
  title: "Rub & Scrub — Ziffera",
  description:
    "A service website case study showing how Ziffera built a cleaner booking flow that helped increase enquiries and bookings.",
  alternates: {
    canonical: "/work/rub-and-scrub",
  },
  openGraph: {
    title: "Rub & Scrub — Ziffera",
    description:
      "A service website case study showing how Ziffera built a cleaner booking flow that helped increase enquiries and bookings.",
    url: "https://www.ziffera.ie/work/rub-and-scrub",
    siteName: "Ziffera",
    type: "website",
    images: [
      {
        url: "/examples/rub-and-scrub.png",
        width: 1200,
        height: 630,
        alt: "Rub and Scrub website preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rub & Scrub — Ziffera",
    description:
      "A service website case study showing how Ziffera built a cleaner booking flow that helped increase enquiries and bookings.",
    images: ["/examples/rub-and-scrub.png"],
  },
};

const data: CaseStudyData = {
  name: "Rub & Scrub",
  type: "Service website",
  client: "Rub & Scrub, mobile car valeting in Dublin",
  logo: { src: "/systems/rubandscrub-logo.png", w: 360, h: 271 },
  summary:
    "A mobile-first website for a Dublin car valeting business: clear services and prices, proof of quality, and a booking flow that takes under a minute on a phone.",
  url: "rubandscrub.ie",
  live: "https://www.rubandscrub.ie",
  stack: ["Next.js", "Supabase", "Vercel"],
  result: "More bookings through a simpler flow",
  challenge:
    "Most customers find a valeter on their phone, often while they're busy. They wanted to see what's included, what it costs and whether the work is good, then book without phone tag. The old setup made them call or message back and forth.",
  built: [
    "Mobile-first service pages with prices up front",
    "Booking flow that hands off straight to WhatsApp with the details filled in",
    "Before/after photos and video that show the quality of the work",
    "Local SEO, structured data and fast load times for Dublin searches",
  ],
  hero: {
    kind: "video",
    src: "/examples/rubandscrub.mp4",
    poster: "/examples/rubandscrub-poster.jpg",
  },
  gallery: [
    {
      src: "/examples/rub-and-scrub.png",
      width: 1110,
      height: 952,
      alt: "Rub and Scrub homepage",
      caption: "Homepage: services and booking in the first screen",
    },
    {
      src: "/examples/rubandscrub-before.jpg",
      width: 603,
      height: 1200,
      alt: "Car wheel arch covered in mud before valeting",
      caption: "Real customer car, before",
      tall: true,
    },
    {
      src: "/examples/rubandscrub-after.jpg",
      width: 604,
      height: 1200,
      alt: "The same wheel arch clean after valeting",
      caption: "The same car, after",
      tall: true,
    },
  ],
  next: { name: "Frequency Framed", href: "/work/frequency-framed", type: "E-commerce website" },
};

export default function RubAndScrubPage() {
  return <CaseStudy data={data} />;
}
