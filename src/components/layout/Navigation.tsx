"use client";

import { useState } from "react";
import Link from "next/link";
import { DarkThemeToggle, Dropdown, DropdownHeader, DropdownItem, DropdownDivider } from "flowbite-react";
import { useParams, usePathname } from "next/navigation";
import { useAuthSafe } from "@/lib/mock-auth";
import { LogoFigma } from "@/components/ui/LogoFigma";

const NAV_LINKS = [
  { href: "/actions", label: "Actions" },
  { href: "/tribune", label: "Tribune" },
  { href: "/blog", label: "Blog" },
  { href: "/rejoindre", label: "Rejoindre" },
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
    <nav className="fixed top-0 z-50 w-full bg-white dark:bg-gray-900">
      <div className="mx-auto flex h-16 max-w-screen-xl items-center px-4 lg:px-6">
        {/* Logo */}
        <Link href={`/${locale}`} className="flex-shrink-0">
          <LogoFigma size="sm" />
        </Link>

        {/* Nav links — desktop, à gauche après le logo */}
        <ul className="ml-8 hidden items-center gap-8 md:flex">
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={`/${locale}${href}`}
                className={`text-sm font-medium ${
                  isActive(href)
                    ? "text-brand"
                    : "text-gray-900 hover:text-brand dark:text-white dark:hover:text-brand"
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right — all items aligned on same 40px line */}
        <div className="ml-auto flex items-center gap-2">
          {/* Language switcher */}
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <span className="inline-flex h-10 items-center gap-1.5 rounded-lg px-2 text-sm font-medium text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                {locale === "fr" ? (
                  <svg className="h-3.5 w-3.5 rounded-sm" viewBox="0 0 36 24"><rect width="12" height="24" fill="#002654"/><rect x="12" width="12" height="24" fill="#fff"/><rect x="24" width="12" height="24" fill="#CE1126"/></svg>
                ) : (
                  <svg className="h-3.5 w-3.5 rounded-sm" viewBox="0 0 36 24"><clipPath id="gb"><rect width="36" height="24" rx="2"/></clipPath><g clipPath="url(#gb)"><rect width="36" height="24" fill="#012169"/><path d="M0 0L36 24M36 0L0 24" stroke="#fff" strokeWidth="4"/><path d="M0 0L36 24M36 0L0 24" stroke="#C8102E" strokeWidth="2.5"/><path d="M18 0V24M0 12H36" stroke="#fff" strokeWidth="6"/><path d="M18 0V24M0 12H36" stroke="#C8102E" strokeWidth="3.5"/></g></svg>
                )}
                {locale === "fr" ? "FR" : "EN"}
              </span>
            }
          >
            <DropdownItem as={Link} href={`/fr${pathname.replace(/^\/(fr|en)/, "")}`} className={locale === "fr" ? "font-semibold" : ""}>
              <span className="inline-flex items-center gap-2">
                <svg className="h-3.5 w-3.5 rounded-sm" viewBox="0 0 36 24"><rect width="12" height="24" fill="#002654"/><rect x="12" width="12" height="24" fill="#fff"/><rect x="24" width="12" height="24" fill="#CE1126"/></svg>
                Français
              </span>
            </DropdownItem>
            <DropdownItem as={Link} href={`/en${pathname.replace(/^\/(fr|en)/, "")}`} className={locale === "en" ? "font-semibold" : ""}>
              <span className="inline-flex items-center gap-2">
                <svg className="h-3.5 w-3.5 rounded-sm" viewBox="0 0 36 24"><clipPath id="gb2"><rect width="36" height="24" rx="2"/></clipPath><g clipPath="url(#gb2)"><rect width="36" height="24" fill="#012169"/><path d="M0 0L36 24M36 0L0 24" stroke="#fff" strokeWidth="4"/><path d="M0 0L36 24M36 0L0 24" stroke="#C8102E" strokeWidth="2.5"/><path d="M18 0V24M0 12H36" stroke="#fff" strokeWidth="6"/><path d="M18 0V24M0 12H36" stroke="#C8102E" strokeWidth="3.5"/></g></svg>
                English
              </span>
            </DropdownItem>
          </Dropdown>

          {/* Dark mode toggle */}
          <DarkThemeToggle />

          {/* User avatar / login */}
          {isAuthenticated && user ? (
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand text-sm font-bold text-white">
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
              className="inline-flex h-10 items-center rounded-lg px-4 text-sm font-medium text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
            >
              Se connecter
            </Link>
          )}

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 md:hidden dark:text-gray-400 dark:hover:bg-gray-700"
            aria-controls="navbar-demo"
            aria-expanded={mobileOpen}
          >
            <span className="sr-only">Menu</span>
            <svg className="h-5 w-5" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="border-t border-gray-200 bg-gray-50 px-4 py-4 dark:border-white/[0.08] dark:bg-gray-900 md:hidden">
          <ul className="space-y-2">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={`/${locale}${href}`}
                  onClick={() => setMobileOpen(false)}
                  className={`block rounded-lg px-3 py-2 text-sm font-medium ${
                    isActive(href)
                      ? "text-brand"
                      : "text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-800"
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
