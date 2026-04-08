"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { LogoFigma } from "@/components/ui/LogoFigma";

const LINKS = {
  actions: [
    { href: "/actions", label: "Toutes les actions" },
    { href: "/tribune", label: "Tribune" },
    { href: "/blog", label: "Blog" },
  ],
  about: [
    { href: "/en-savoir-plus", label: "Qui sommes-nous" },
    { href: "/tarifs", label: "Tarifs" },
  ],
  legal: [
    { href: "/confidentialite", label: "Confidentialité" },
    { href: "/cgu", label: "CGU" },
  ],
};

export function Footer() {
  const params = useParams();
  const locale = (params?.locale as string) || "fr";

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
              La justice collective, pour tous. Rejoignez des milliers de citoyens
              qui font valoir leurs droits.
            </p>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-6">
            {Object.entries(LINKS).map(([title, links]) => (
              <div key={title}>
                <h2 className="mb-6 text-sm font-semibold uppercase text-gray-900 dark:text-white">
                  {title === "actions" ? "Actions" : title === "about" ? "\u00c0 propos" : "L\u00e9gal"}
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
            &copy; {new Date().getFullYear()}{" "}
            <Link href={`/${locale}`} className="hover:underline">Wejustice</Link>
            . Tous droits réservés.
          </span>
          <span className="mt-4 inline-flex rounded-lg bg-yellow-50 px-3 py-1 text-xs font-medium text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 sm:mt-0">
            DEMO - Données fictives
          </span>
        </div>
      </div>
    </footer>
  );
}
