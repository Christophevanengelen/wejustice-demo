import type { Metadata } from "next";
import { getMessages, setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { ThemeProvider } from "flowbite-react";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { wejusticeTheme } from "@/lib/flowbite-theme";
import { MockAuthProvider } from "@/lib/mock-auth";
import { absoluteUrl, baseOpenGraph, baseTwitter } from "@/lib/metadata";
import { organizationJsonLd, websiteJsonLd, safeJsonLd } from "@/lib/jsonld";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    alternates: {
      canonical: absoluteUrl(`/${locale}`),
      languages: {
        fr: absoluteUrl("/fr"),
        en: absoluteUrl("/en"),
      },
    },
    openGraph: {
      ...baseOpenGraph(locale),
      url: absoluteUrl(`/${locale}`),
    },
    twitter: baseTwitter(),
  };
}

/**
 * Root locale layout — Providers only.
 *
 * Navigation + Footer are in (public)/layout.tsx.
 * Sidebar + Navbar are in (compte)/compte/layout.tsx.
 *
 * This separation ensures /compte has its own Flowbite Pro dashboard shell
 * without conflicting with the global navigation.
 */
export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <ThemeProvider theme={wejusticeTheme}>
        <MockAuthProvider>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: safeJsonLd(organizationJsonLd()) }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: safeJsonLd(websiteJsonLd()) }}
          />
          {children}
        </MockAuthProvider>
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}
