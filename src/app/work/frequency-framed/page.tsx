import type { Metadata } from "next";
import CaseStudy, { type CaseStudyData } from "@/components/work/CaseStudy";

export const metadata: Metadata = {
  title: "Frequency Framed — Ziffera",
  description:
    "A premium e-commerce website case study showing how Ziffera built a storefront that made selling online feel easier.",
  alternates: {
    canonical: "/work/frequency-framed",
  },
  openGraph: {
    title: "Frequency Framed — Ziffera",
    description:
      "A premium e-commerce website case study showing how Ziffera built a storefront that made selling online feel easier.",
    url: "https://www.ziffera.ie/work/frequency-framed",
    siteName: "Ziffera",
    type: "website",
    images: [
      {
        url: "/examples/homepage.png",
        width: 1200,
        height: 630,
        alt: "Frequency Framed website preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Frequency Framed — Ziffera",
    description:
      "A premium e-commerce website case study showing how Ziffera built a storefront that made selling online feel easier.",
    images: ["/examples/homepage.png"],
  },
};

const data: CaseStudyData = {
  name: "Frequency Framed",
  type: "E-commerce website",
  client: "Frequency Framed, original framed paintings",
  logo: { src: "/systems/frequency-framed-logo.png", w: 520, h: 273 },
  summary:
    "An online shop for an artist selling original framed paintings, with card, Apple Pay and Google Pay checkout and an admin panel to run the business.",
  url: "frequencyframed.ie",
  live: "https://www.frequencyframed.ie",
  stack: ["Next.js", "Stripe", "PostgreSQL"],
  result: "Selling online from launch",
  challenge:
    "Sales were happening through direct messages, one conversation at a time. The artist needed a shop that looks as considered as the work, takes payment securely, and keeps track of which pieces are available, reserved or sold.",
  built: [
    "Gallery and product pages designed around the artwork",
    "Stripe checkout with card, Apple Pay and Google Pay",
    "Stock control for each piece: available, reserved or sold",
    "Admin panel for artworks, orders, reviews and the blog",
    "Order confirmation emails to the customer and the artist",
  ],
  hero: {
    kind: "image",
    src: "/examples/homepage.png",
    width: 1362,
    height: 1261,
    alt: "Frequency Framed homepage",
  },
  gallery: [
    {
      src: "/examples/gallery.png",
      width: 1134,
      height: 1202,
      alt: "Frequency Framed gallery page with filters",
      caption: "Gallery with filters by collection",
    },
    {
      src: "/examples/checkout.png",
      width: 1172,
      height: 1214,
      alt: "Frequency Framed delivery and payment page",
      caption: "Delivery and payment, powered by Stripe",
    },
    {
      src: "/examples/admin.png",
      width: 2541,
      height: 1212,
      alt: "Frequency Framed admin panel listing artworks",
      caption: "Admin panel for artworks, prices and stock",
    },
    {
      src: "/examples/cart.png",
      width: 1305,
      height: 1191,
      alt: "Frequency Framed shopping cart",
      caption: "Cart and order summary",
    },
    {
      src: "/examples/mobileFF.jpg",
      width: 1080,
      height: 1945,
      alt: "Frequency Framed homepage on a phone",
      caption: "Built mobile-first",
      tall: true,
    },
  ],
  next: { name: "Rub & Scrub", href: "/work/rub-and-scrub", type: "Service website" },
};

export default function FrequencyFramedPage() {
  return <CaseStudy data={data} />;
}
