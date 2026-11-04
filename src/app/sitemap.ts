import type { MetadataRoute } from "next";
import { products } from "@/lib/products";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: site.url, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${site.url}/quote`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    ...products.map((p) => ({ url: `${site.url}/insurance/${p.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.7 })),
    { url: `${site.url}/privacy`, lastModified: now, priority: 0.2 },
    { url: `${site.url}/terms`, lastModified: now, priority: 0.2 },
  ];
}
