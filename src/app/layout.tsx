import type { Metadata } from "next";
import localFont from "next/font/local";
import { ThemeModeScript } from "flowbite-react";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, DEFAULT_OG_IMAGE, TWITTER_HANDLE } from "@/lib/metadata";
import "./globals.css";

const campton = localFont({
  src: [
    { path: "../../public/fonts/campton/Campton-Book.woff2", weight: "400", style: "normal" },
    { path: "../../public/fonts/campton/Campton-Medium.woff2", weight: "500", style: "normal" },
    { path: "../../public/fonts/campton/Campton-SemiBold.woff2", weight: "600", style: "normal" },
    { path: "../../public/fonts/campton/Campton-Bold.woff2", weight: "700", style: "normal" },
    { path: "../../public/fonts/campton/Campton-ExtraBold.woff2", weight: "800", style: "normal" },
  ],
  variable: "--font-campton",
  display: "swap",
  fallback: ["system-ui", "-apple-system", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} - La justice collective, pour tous`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: TWITTER_HANDLE,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={campton.variable} suppressHydrationWarning>
      <head>
        <ThemeModeScript mode="light" />
      </head>
      <body className="min-h-screen bg-white font-sans text-gray-900 antialiased dark:bg-gray-900 dark:text-white">
        {children}
      </body>
    </html>
  );
}
