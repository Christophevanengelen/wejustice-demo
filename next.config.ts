/**
 * Next.js Config — WeJustice Demo
 *
 * NOTE: withFlowbiteReact is EXCLUDED. It auto-injects @source and
 * @import directives into globals.css that produce invalid CSS in
 * Tailwind CSS 4 (tokens with !important, escaped selectors).
 * Flowbite React works via ThemeProvider + inline styles instead.
 */
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import { resolve } from "path";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  reactStrictMode: true,
  trailingSlash: false,

  typescript: {
    ignoreBuildErrors: true,
  },

  turbopack: {
    root: resolve(import.meta.dirname),
  },

  experimental: {
    viewTransition: true,
  },

  images: {
    unoptimized: true,
  },
};

export default withNextIntl(nextConfig);
