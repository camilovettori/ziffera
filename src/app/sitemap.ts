import type { MetadataRoute } from "next";

const baseUrl = "https://www.ziffera.ie";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: `${baseUrl}/`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
      images: [`${baseUrl}/examples/homepage.png`],
    },
    {
      url: `${baseUrl}/work`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
      images: [`${baseUrl}/examples/homepage.png`],
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
      images: [`${baseUrl}/examples/homepage.png`],
    },
    {
      url: `${baseUrl}/contact`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
      images: [`${baseUrl}/examples/homepage.png`],
    },
    {
      url: `${baseUrl}/work/frequency-framed`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
      images: [`${baseUrl}/examples/homepage.png`],
    },
    {
      url: `${baseUrl}/work/rub-and-scrub`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
      images: [`${baseUrl}/examples/rub-and-scrub.png`],
    },
  ];
}
