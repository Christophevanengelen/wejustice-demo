import { readFile } from 'fs/promises';
import { join } from 'path';
import { getRequestConfig } from 'next-intl/server';
import { routing, SUPPORTED_LOCALES } from './routing';
import type { SupportedLocale } from './routing';

type NestedMessages = Record<string, unknown>;

/**
 * Demo i18n: reads only from static JSON files.
 * No Django API, no DEFAULT_TRANSLATIONS, no unstable_cache.
 */
async function loadJsonMessages(locale: SupportedLocale): Promise<NestedMessages> {
  try {
    const filePath = join(process.cwd(), 'messages', `${locale}.json`);
    const raw = await readFile(filePath, 'utf-8');
    return JSON.parse(raw) as NestedMessages;
  } catch {
    if (locale !== 'fr') {
      try {
        const frPath = join(process.cwd(), 'messages', 'fr.json');
        const raw = await readFile(frPath, 'utf-8');
        return JSON.parse(raw) as NestedMessages;
      } catch {
        return {};
      }
    }
    return {};
  }
}

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  if (!locale || !SUPPORTED_LOCALES.includes(locale as SupportedLocale)) {
    locale = routing.defaultLocale;
  }

  const messages = await loadJsonMessages(locale as SupportedLocale);

  return {
    locale,
    messages,
    onError() {
      // Silent in demo
    },
    getMessageFallback({ namespace, key }) {
      const fullKey = namespace ? `${namespace}.${key}` : key;
      if (process.env.NODE_ENV === 'development') {
        console.warn(`[demo-i18n] missing: ${locale}:${fullKey}`);
      }
      return '';
    },
  };
});
