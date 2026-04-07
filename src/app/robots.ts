import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/metadata";

/**
 * robots.txt - Crawl rules for search engines and AI bots.
 *
 * Strategy 2026:
 * - Allow search crawlers (Google, Bing) fully
 * - Allow AI search bots (GPTBot, ClaudeBot, PerplexityBot) for citation
 * - Block AI training bots (CCBot, Google-Extended, Bytespider)
 * - Block private pages (/compte/*)
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/compte/", "/api/", "/design-system/"],
      },
      {
        userAgent: "GPTBot",
        allow: "/",
        disallow: ["/compte/", "/api/"],
      },
      {
        userAgent: "ClaudeBot",
        allow: "/",
        disallow: ["/compte/", "/api/"],
      },
      {
        userAgent: "PerplexityBot",
        allow: "/",
        disallow: ["/compte/", "/api/"],
      },
      {
        userAgent: "CCBot",
        disallow: "/",
      },
      {
        userAgent: "Google-Extended",
        disallow: "/",
      },
      {
        userAgent: "Bytespider",
        disallow: "/",
      },
      {
        userAgent: "cohere-ai",
        disallow: "/",
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
