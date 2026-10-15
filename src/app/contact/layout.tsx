import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Contact Ziffera",
  description:
    "Talk to Ziffera by email or call about a website, a custom business system or an integration. Written scope and fixed quote before anything starts.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Ziffera",
    description:
      "Talk to Ziffera by email or call about a website, a custom business system or an integration. Written scope and fixed quote before anything starts.",
    url: "https://www.ziffera.ie/contact",
    siteName: "Ziffera",
    type: "website",
    images: [
      {
        url: "/examples/homepage.png",
        width: 1200,
        height: 630,
        alt: "Ziffera website preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Ziffera",
    description:
      "Talk to Ziffera by email or call about a website, a custom business system or an integration. Written scope and fixed quote before anything starts.",
    images: ["/examples/homepage.png"],
  },
};

export default function ContactLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
