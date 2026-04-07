"use client";

/**
 * CompteNavbar — Navbar espace membre.
 *
 * Règles :
 * - Logo WeJustice cliquable → retour au site (toujours visible)
 * - Avatar : cercle brand red (#C20520 via var(--color-brand)), initiales blanches,
 *   pas de stroke, cliquable avec Dropdown Flowbite
 * - PAS de nom du user à côté de l'avatar
 * - DarkThemeToggle présent
 * - Hamburger mobile pour ouvrir la sidebar
 * - z-30 pour rester au-dessus de la sidebar (z-20)
 */

import Link from "next/link";
import { useParams } from "next/navigation";
import { DarkThemeToggle, Dropdown, DropdownHeader, DropdownItem, DropdownDivider } from "flowbite-react";
import { useAuthSafe } from "@/lib/mock-auth";
import { LogoFigma } from "@/components/ui/LogoFigma";

interface CompteNavbarProps {
  onMenuClick: () => void;
}

export function CompteNavbar({ onMenuClick }: CompteNavbarProps) {
  const { user } = useAuthSafe();
  const params = useParams();
  const locale = (params?.locale as string) || "fr";
  const initials = user ? `${user.firstName[0]}${user.lastName[0]}` : "";

  return (
    <nav className="fixed top-0 right-0 left-0 z-30 border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
      <div className="flex h-16 items-center justify-between px-4">
        {/* Left — hamburger (mobile only) + logo (toujours cliquable vers le site) */}
        <div className="flex items-center gap-3">
          {/* Hamburger — visible uniquement sur mobile (lg:hidden) */}
          <button
            onClick={onMenuClick}
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 lg:hidden dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            aria-label="Ouvrir le menu"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          {/* Logo — cliquable vers la page d'accueil du site */}
          <Link href={`/${locale}`} aria-label="Retour au site WeJustice">
            <LogoFigma size="xs" />
          </Link>
        </div>

        {/* Right — dark mode toggle + avatar dropdown */}
        <div className="flex items-center gap-3">
          <DarkThemeToggle />
          {user && (
            <Dropdown
              arrowIcon={false}
              inline
              label={
                /* Avatar : cercle brand red, initiales blanches, rounded-full */
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white"
                  style={{ backgroundColor: "var(--color-brand)" }}
                >
                  {initials}
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
              <DropdownItem as={Link} href={`/${locale}/compte/profil`}>Mon profil</DropdownItem>
              <DropdownItem as={Link} href={`/${locale}/compte/paiements`}>Paiements</DropdownItem>
              <DropdownDivider />
              <DropdownItem as={Link} href={`/${locale}`}>Retour au site</DropdownItem>
            </Dropdown>
          )}
        </div>
      </div>
    </nav>
  );
}
