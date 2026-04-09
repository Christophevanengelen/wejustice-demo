import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/metadata";
import actionsData from "@/mocks/actions.json";
import blogData from "@/mocks/blog.json";

/**
 * Dynamic sitemap generation from mock data.
 *
 * Covers: actions (×2 locales), blog (×2), static pages (×2).
 * ~46 URLs total with lastModified, changeFrequency, priority.
 */

const LOCALES = ["fr", "en"] as const;

function url(path: string): string {
  return `${SITE_URL}${path}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  // ─── Static pages ───
  const staticPages = [
    { path: "", priority: 1.0, changeFrequency: "weekly" as const },
    { path: "/actions", priority: 0.9, changeFrequency: "daily" as const },
    { path: "/blog", priority: 0.7, changeFrequency: "weekly" as const },
    { path: "/tarifs", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/tribune", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "/cgu", priority: 0.2, changeFrequency: "yearly" as const },
    { path: "/confidentialite", priority: 0.2, changeFrequency: "yearly" as const },
    { path: "/qui-sommes-nous", priority: 0.6, changeFrequency: "monthly" as const },
  ];

  for (const page of staticPages) {
    for (const locale of LOCALES) {
      entries.push({
        url: url(`/${locale}${page.path}`),
        lastModified: new Date("2026-04-07"),
        changeFrequency: page.changeFrequency,
        priority: page.priority,
      });
    }
  }

  // ─── Actions ───
  for (const action of actionsData) {
    for (const locale of LOCALES) {
      entries.push({
        url: url(`/${locale}/actions/${action.slug}`),
        lastModified: new Date("2026-04-07"),
        changeFrequency: "weekly",
        priority: action.featured ? 0.9 : 0.7,
      });
    }
  }

  // ─── Blog articles ───
  for (const article of blogData) {
    for (const locale of LOCALES) {
      entries.push({
        url: url(`/${locale}/blog/${article.slug}`),
        lastModified: new Date(article.date),
        changeFrequency: "monthly",
        priority: article.featured ? 0.7 : 0.5,
      });
    }
  }

  return entries;
}
