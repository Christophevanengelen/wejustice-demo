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
    ignoreBuildErrors: false,
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

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
