import { defineRouting } from 'next-intl/routing';

// Demo: FR + EN only (vs 24 locales in prod)
export const SUPPORTED_LOCALES = ['fr', 'en'] as const;
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

export const routing = defineRouting({
  locales: [...SUPPORTED_LOCALES],
  defaultLocale: 'fr',
  localePrefix: 'always',
  localeDetection: true,
});

export type Locale = SupportedLocale;
