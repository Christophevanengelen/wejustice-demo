"use client";

import { useState } from "react";
import Link from "next/link";
import { Avatar, DarkThemeToggle, Dropdown, DropdownHeader, DropdownItem, DropdownDivider } from "flowbite-react";
import { useParams, usePathname } from "next/navigation";
import { useAuthSafe } from "@/lib/mock-auth";
import { LogoFigma } from "@/components/ui/LogoFigma";

const NAV_LINKS = [
  { href: "/actions", label: "Actions" },
  { href: "/tribune", label: "Tribune" },
  { href: "/blog", label: "Blog" },
  { href: "/tarifs", label: "Tarifs" },
];

export function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const params = useParams();
  const locale = (params?.locale as string) || "fr";
  const { user, isAuthenticated } = useAuthSafe();

  const isActive = (href: string) => {
    const cleanPath = pathname.replace(/^\/(fr|en)/, "") || "/";
    return cleanPath === href || cleanPath.startsWith(`${href}/`);
  };

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center p-4">
        {/* Logo */}
        <Link href={`/${locale}`} className="flex items-center space-x-3">
          <LogoFigma size="sm" />
        </Link>

        {/* Right side: lang + dark toggle + user + hamburger */}
        <div className="ml-auto flex items-center gap-2 md:order-2">
          {/* Language switcher */}
          <Link
            href={`/${locale === "fr" ? "en" : "fr"}${pathname.replace(/^\/(fr|en)/, "")}`}
            className="rounded-lg px-2 py-1.5 text-xs font-semibold uppercase text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
            title={locale === "fr" ? "Switch to English" : "Passer en français"}
          >
            {locale === "fr" ? "EN" : "FR"}
          </Link>

          <div title="Mode sombre/clair">
            <DarkThemeToggle />
          </div>

          {isAuthenticated && user ? (
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand text-sm font-bold text-white" style={{ backgroundColor: 'var(--color-brand)' }}>
                  {user.firstName[0]}{user.lastName[0]}
                </div>
              }
            >
              <DropdownHeader>
                <span className="block text-sm font-semibold text-gray-900 dark:text-white">
                  {user.firstName} {user.lastName}
                </span>
                <span className="block truncate text-sm text-gray-500 dark:text-gray-400">
                  {user.email}
                </span>
              </DropdownHeader>
              <DropdownItem as={Link} href={`/${locale}/compte`}>Mon compte</DropdownItem>
              <DropdownItem as={Link} href={`/${locale}/compte/signatures`}>Mes signatures</DropdownItem>
              <DropdownDivider />
              <DropdownItem>Déconnexion</DropdownItem>
            </Dropdown>
          ) : (
            <Link
              href={`/${locale}/compte`}
              className="rounded-lg px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
            >
              Se connecter
            </Link>
          )}

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 md:hidden dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-demo"
            aria-expanded={mobileOpen}
          >
            <span className="sr-only">Menu</span>
            <svg className="h-5 w-5" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
        </div>

        {/* Nav links */}
        <div
          className={`${mobileOpen ? "" : "hidden"} w-full items-center md:order-1 md:ml-8 md:flex md:w-auto`}
          id="navbar-demo"
        >
          <ul className="mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 font-medium md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-transparent md:p-0 dark:border-gray-700 dark:bg-gray-800 md:dark:bg-transparent">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={`/${locale}${href}`}
                  onClick={() => setMobileOpen(false)}
                  className={`block rounded-sm px-3 py-2 md:p-0 ${
                    isActive(href)
                      ? "bg-primary-700 text-white md:bg-transparent md:text-primary-700 md:dark:text-primary-500"
                      : "text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent md:dark:hover:text-primary-500"
                  }`}
                  aria-current={isActive(href) ? "page" : undefined}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
