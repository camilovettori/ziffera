import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Contact Ziffera — Get Your Website",
  description:
    "Start your website project with Ziffera. Fast delivery and no long-term contracts.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Ziffera — Get Your Website",
    description:
      "Start your website project with Ziffera. Fast delivery and no long-term contracts.",
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
    title: "Contact Ziffera — Get Your Website",
    description:
      "Start your website project with Ziffera. Fast delivery and no long-term contracts.",
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
