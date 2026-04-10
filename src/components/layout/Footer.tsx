"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { LogoFigma } from "@/components/ui/LogoFigma";

export function Footer() {
  const params = useParams();
  const locale = (params?.locale as string) || "fr";
  const t = useTranslations("footer");

  const LINKS = {
    actions: [
      { href: "/actions", label: t("allActions") },
      { href: "/tribune", label: t("tribune") },
      { href: "/blog", label: t("blog") },
    ],
    about: [
      { href: "/qui-sommes-nous", label: t("whoAreWe") },
      { href: "/tarifs", label: t("pricing") },
    ],
    legal: [
      { href: "/confidentialite", label: t("privacy") },
      { href: "/cgu", label: t("terms") },
    ],
  };

  const TITLES: Record<string, string> = {
    actions: t("actionsTitle"),
    about: t("aboutTitle"),
    legal: t("legalTitle"),
  };

  return (
    <footer className="border-t border-gray-200 bg-white dark:border-white/[0.08] dark:bg-gray-900">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          {/* Brand */}
          <div className="mb-6 md:mb-0">
            <Link href={`/${locale}`} className="inline-block">
              <LogoFigma size="sm" />
            </Link>
            <p className="mt-4 max-w-xs text-sm text-gray-500 dark:text-gray-400">
              {t("tagline")}
            </p>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-6">
            {Object.entries(LINKS).map(([title, links]) => (
              <div key={title}>
                <h2 className="mb-6 text-sm font-semibold uppercase text-gray-900 dark:text-white">
                  {TITLES[title]}
                </h2>
                <ul className="space-y-4 text-gray-500 dark:text-gray-400">
                  {links.map(({ href, label }) => (
                    <li key={href}>
                      <Link
                        href={`/${locale}${href}`}
                        className="hover:underline"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <hr className="my-6 border-gray-200 dark:border-white/[0.08] sm:mx-auto lg:my-8" />

        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 dark:text-gray-400 sm:text-center">
            &copy; {new Date().getFullYear()} {t("copyright")}
          </span>
        </div>
      </div>
    </footer>
  );
}
