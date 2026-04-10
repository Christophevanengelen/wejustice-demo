"use client";

/**
 * CompteSidebar — Sidebar de l'espace membre.
 *
 * RÉÉCRITURE COMPLÈTE sans composant Flowbite Sidebar :
 * Le composant Flowbite Sidebar impose un fond sombre et des styles
 * qui conflictent avec le thème du site. On utilise des liens simples
 * stylés avec Tailwind, comme la Navigation du site public.
 *
 * Règles :
 * - bg-white / dark:bg-gray-800 (même fond que le site)
 * - Fixed left, SOUS la navbar (top-16 = 64px, hauteur de la navbar)
 * - UNE seule border-r, pas de doublon
 * - Icône SVG TOUJOURS visible, même quand l'item est actif
 * - Active state : fond subtil + texte brand, PAS de masquage d'icône
 * - "Retour au site" : en bas, simple lien, pas de séparateur bizarre
 * - Mobile : overlay avec backdrop sombre
 */

import { usePathname, useParams } from "next/navigation";
import Link from "next/link";
import { Badge } from "flowbite-react";
import { useTranslations } from "next-intl";
import { useAuthSafe } from "@/lib/mock-auth";
import userActivity from "@/mocks/user-activity.json";
import type { ComponentProps, FC } from "react";

/* ─── Icons (SVG inline, pas de react-icons) ─── */

const HomeIcon: FC<ComponentProps<"svg">> = (props) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

const DocumentIcon: FC<ComponentProps<"svg">> = (props) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const BellIcon: FC<ComponentProps<"svg">> = (props) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
  </svg>
);

const UserIcon: FC<ComponentProps<"svg">> = (props) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const CreditCardIcon: FC<ComponentProps<"svg">> = (props) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
  </svg>
);

const ArrowLeftIcon: FC<ComponentProps<"svg">> = (props) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
  </svg>
);

/* ─── Navigation items ─── */

interface NavItem {
  href: string;
  label: string;
  icon: FC<ComponentProps<"svg">>;
  badge?: number; // Compteur optionnel (ex: notifications non lues)
}

interface CompteSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CompteSidebar({ isOpen, onClose }: CompteSidebarProps) {
  const pathname = usePathname();
  const params = useParams();
  const locale = (params?.locale as string) || "fr";
  const { user } = useAuthSafe();
  const t = useTranslations("compte.sidebar");

  const unreadCount = userActivity.notifications.filter((n) => !n.read).length;

  /* Détection du lien actif : exact match pour /compte, startsWith pour les sous-pages */
  const isActive = (href: string): boolean => {
    const cleanPath = pathname.replace(/^\/(fr|en)/, "") || "/";
    return href === "/compte" ? cleanPath === "/compte" : cleanPath.startsWith(href);
  };

  /* Items de navigation de la sidebar */
  const navItems: NavItem[] = [
    { href: "/compte", label: t("dashboard"), icon: HomeIcon },
    { href: "/compte/signatures", label: t("signatures"), icon: DocumentIcon },
    { href: "/compte/notifications", label: t("notifications"), icon: BellIcon, badge: unreadCount },
    { href: "/compte/profil", label: t("profile"), icon: UserIcon },
    { href: "/compte/paiements", label: t("payments"), icon: CreditCardIcon },
  ];

  const sidebarContent = (
    <div className="flex h-full flex-col bg-white dark:bg-gray-900">
      {/* Badge forfait en haut */}
      {user && (
        <div className="px-4 pb-3 pt-4">
          <div className="flex items-center gap-2">
            <Badge style={{ backgroundColor: userActivity.planColor }} size="xs" className="text-white">
              {userActivity.planLabel}
            </Badge>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {userActivity.actionsRejointes.length}/{userActivity.maxActions} actions
            </span>
          </div>
        </div>
      )}

      {/* Navigation principale */}
      <nav className="flex-1 px-3 py-2" aria-label="Menu espace membre">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const active = isActive(item.href);
            const Icon = item.icon;
            return (
              <li key={item.href}>
                <Link
                  href={`/${locale}${item.href}`}
                  onClick={onClose}
                  className={`
                    flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium
                    transition-colors
                    ${active
                      ? "bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-white"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    }
                  `}
                >
                  {/* Icône — TOUJOURS visible, taille fixe 20px */}
                  <Icon className="h-5 w-5 shrink-0" />
                  <span className="flex-1">{item.label}</span>
                  {/* Badge compteur (notifications non lues) */}
                  {item.badge && item.badge > 0 && (
                    <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-100 px-1.5 text-xs font-semibold text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                      {item.badge}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Retour au site — en bas, simple et propre */}
      <div className="px-3 pb-4 pt-2">
        <Link
          href={`/${locale}`}
          onClick={onClose}
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          <ArrowLeftIcon className="h-5 w-5 shrink-0" />
          <span>{t("backToSite")}</span>
        </Link>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop — fixed left, SOUS la navbar (top-16), UNE seule border-r */}
      <aside className="fixed top-16 bottom-0 left-0 z-20 hidden w-64 border-r border-gray-200 lg:block dark:border-white/[0.08]">
        {sidebarContent}
      </aside>

      {/* Mobile — overlay avec backdrop */}
      {isOpen && (
        <>
          {/* Backdrop sombre cliquable pour fermer */}
          <div
            className="fixed inset-0 z-30 bg-gray-900/50 dark:bg-gray-900/80"
            onClick={onClose}
            aria-hidden="true"
          />
          {/* Sidebar mobile — même contenu, au-dessus du backdrop */}
          <aside className="fixed top-16 bottom-0 left-0 z-40 w-64 border-r border-gray-200 dark:border-white/[0.08]">
            {sidebarContent}
          </aside>
        </>
      )}
    </>
  );
}
