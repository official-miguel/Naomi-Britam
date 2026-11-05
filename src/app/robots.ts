import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  // Explicitly welcome AI search crawlers so the site can be cited in AI answers (GEO).
  const aiBots = ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "PerplexityBot", "ClaudeBot", "Claude-SearchBot", "Google-Extended", "Bingbot"];
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: "/api/" }, ...aiBots.map((userAgent) => ({ userAgent, allow: "/", disallow: "/api/" }))],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
