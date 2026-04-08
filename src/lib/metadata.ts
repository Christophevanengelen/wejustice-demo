/**
 * Metadata helpers for Open Graph & Twitter Cards.
 *
 * Shared by all page-level generateMetadata functions.
 * Uses Next.js Metadata API best practices.
 */

import type { Metadata } from "next";

export const SITE_URL = "https://wejustice-demo.vercel.app";
export const SITE_NAME = "Wejustice";
export const SITE_DESCRIPTION = "La justice collective, pour tous. Rejoignez des milliers de citoyens qui agissent ensemble.";
export const DEFAULT_OG_IMAGE = "/images/wejustice_home_hero.png";
export const TWITTER_HANDLE = "@wejustice";

const LOCALE_MAP: Record<string, string> = {
  fr: "fr_FR",
  en: "en_US",
};

/** Resolve a relative path to an absolute URL. */
export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Base Open Graph metadata (merged by child pages). */
export function baseOpenGraph(locale: string): Metadata["openGraph"] {
  return {
    type: "website",
    siteName: SITE_NAME,
    locale: LOCALE_MAP[locale] || "fr_FR",
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  };
}

/** Base Twitter Card metadata. */
export function baseTwitter(): Metadata["twitter"] {
  return {
    card: "summary_large_image",
    site: TWITTER_HANDLE,
  };
}
