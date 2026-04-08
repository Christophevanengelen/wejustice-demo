/**
 * JSON-LD Structured Data helpers for SEO + GEO.
 *
 * Generates Schema.org markup for Google Rich Results
 * and AI citation (LLM SEO / Generative Engine Optimization).
 */

import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "@/lib/metadata";

// ─── Safe JSON-LD serializer (XSS prevention) ───

export function safeJsonLd(data: Record<string, unknown>): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

// ─── Organization ───

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/images/wejustice-logo.svg`,
    description: SITE_DESCRIPTION,
    foundingDate: "2023",
    sameAs: [
      "https://twitter.com/wejustice",
      "https://facebook.com/wejustice",
      "https://linkedin.com/company/wejustice",
      "https://instagram.com/wejustice",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: "contact@wejustice.legal",
      availableLanguage: ["French", "English"],
    },
  };
}

// ─── WebSite with SearchAction ───

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    inLanguage: ["fr", "en"],
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/fr/actions?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

// ─── Article (for actions) ───

interface ActionData {
  id: string;
  title: string;
  description: string;
  image: string;
  slug: string;
  tag: string;
  lawyer?: { name: string; firm: string };
  initiator?: { name: string; role: string };
  signatures: { current: number; goal: number };
}

export function actionArticleJsonLd(action: ActionData, locale: string) {
  const authorName = action.initiator?.name || action.lawyer?.name || SITE_NAME;
  const authorRole = action.initiator?.role || "Avocat";

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: action.title,
    description: action.description.slice(0, 160),
    image: `${SITE_URL}${action.image}`,
    url: `${SITE_URL}/${locale}/actions/${action.id}`,
    datePublished: "2024-01-15",
    dateModified: "2026-04-07",
    author: {
      "@type": "Person",
      name: authorName,
      jobTitle: authorRole,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/images/wejustice-logo.svg` },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/${locale}/actions/${action.id}`,
    },
    keywords: [action.tag, "action collective", "justice", "Wejustice"],
    interactionStatistic: {
      "@type": "InteractionCounter",
      interactionType: "https://schema.org/EndorseAction",
      userInteractionCount: action.signatures.current,
    },
  };
}

// ─── NewsArticle (for blog) ───

interface BlogData {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  author: { name: string };
  date: string;
  category: string;
  readTime: number;
}

export function blogArticleJsonLd(article: BlogData, locale: string) {
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.excerpt.slice(0, 160),
    image: `${SITE_URL}${article.image}`,
    url: `${SITE_URL}/${locale}/blog/${article.slug}`,
    datePublished: article.date,
    dateModified: article.date,
    author: {
      "@type": "Person",
      name: article.author.name,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/images/wejustice-logo.svg` },
    },
    articleSection: article.category,
    wordCount: article.readTime * 250,
  };
}

// ─── BreadcrumbList ───

interface BreadcrumbItem {
  name: string;
  href: string;
}

export function breadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.href}`,
    })),
  };
}

// ─── FAQPage ───

interface FaqItem {
  q: string;
  a: string;
}

export function faqJsonLd(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}
