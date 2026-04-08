"use client";

/**
 * NotificationsPage — Liste des notifications du membre.
 *
 * Règles CEO :
 * - Icônes catégorie avec cercle coloré (bleu=bienvenue, vert=action, violet=invite, ambre=upgrade)
 * - Tous les titres alignés sur la même verticale (pas de badge qui décale)
 * - Non lues : fond bg-blue-50 dark:bg-blue-900/10 sur la Card entière (pas de dot)
 * - Tri chronologique côté front (sort par date desc)
 * - CTA contextuel quand pertinent (action→voir l'action, upgrade→voir les forfaits)
 * - Date relative à droite
 */

import Link from "next/link";
import { useParams } from "next/navigation";
import { Card } from "flowbite-react";
import { ComptePageShell } from "@/components/features/compte/ComptePageShell";
import userActivity from "@/mocks/user-activity.json";

/* ─── Date relative (format humain) ─── */

function relativeDate(dateStr: string): string {
  const now = new Date();
  const date = new Date(dateStr);
  const diffMs = now.getTime() - date.getTime();
  const diffH = Math.floor(diffMs / 3600000);
  const diffD = Math.floor(diffH / 24);
  if (diffH < 1) return "à l'instant";
  if (diffH < 24) return `il y a ${diffH}h`;
  if (diffD < 7) return `il y a ${diffD}j`;
  return `il y a ${Math.floor(diffD / 7)} sem.`;
}

/* ─── Catégories visuelles (cercle coloré + path SVG) ─── */

const CATEGORY_STYLE: Record<string, { bg: string; icon: string }> = {
  bienvenue: {
    bg: "bg-blue-100 dark:bg-blue-900/30",
    icon: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z",
  },
  action: {
    bg: "bg-green-100 dark:bg-green-900/30",
    icon: "M13 10V3L4 14h7v7l9-11h-7z",
  },
  invite: {
    bg: "bg-purple-100 dark:bg-purple-900/30",
    icon: "M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z",
  },
  upgrade: {
    bg: "bg-amber-100 dark:bg-amber-900/30",
    icon: "M5 10l7-7m0 0l7 7m-7-7v18",
  },
};

/* Couleur de l'icône SVG selon la catégorie */
const CATEGORY_ICON_COLOR: Record<string, string> = {
  bienvenue: "text-blue-600 dark:text-blue-400",
  action: "text-green-600 dark:text-green-400",
  invite: "text-purple-600 dark:text-purple-400",
  upgrade: "text-amber-600 dark:text-amber-400",
};

/**
 * CTA contextuel par type de notification.
 * Retourne null si la notification n'est pas actionnable.
 */
function getNotificationCTA(type: string, locale: string): { label: string; href: string } | null {
  switch (type) {
    case "bienvenue":
      return { label: "Découvrir les actions", href: `/${locale}/actions` };
    case "action":
      return { label: "Voir l'action", href: `/${locale}/actions` };
    case "upgrade":
      return { label: "Voir les forfaits", href: `/${locale}/tarifs` };
    case "invite":
      return null; // Pas d'action requise
    default:
      return null;
  }
}

export default function NotificationsPage() {
  const params = useParams();
  const locale = (params?.locale as string) || "fr";

  /* Tri chronologique : plus récente en premier */
  const sorted = [...userActivity.notifications].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  const unreadCount = sorted.filter((n) => !n.read).length;

  return (
    <ComptePageShell
      title="Notifications"
      subtitle={`${unreadCount} non lue${unreadCount > 1 ? "s" : ""}`}
    >
      <div className="space-y-3">
        {sorted.map((n) => {
          const style = CATEGORY_STYLE[n.type] || CATEGORY_STYLE.action;
          const iconColor = CATEGORY_ICON_COLOR[n.type] || CATEGORY_ICON_COLOR.action;
          const cta = getNotificationCTA(n.type, locale);

          return (
            <Card
              key={n.id}
              /* Non lues : fond bleu subtil sur la card entière, PAS de dot */
              className={!n.read ? "bg-blue-50 dark:bg-blue-900/10" : ""}
            >
              <div className="flex items-start gap-3">
                {/* Icône catégorie — cercle coloré avec icône assortie */}
                <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${style.bg}`}>
                  <svg className={`h-4 w-4 ${iconColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={style.icon} />
                  </svg>
                </div>

                {/* Contenu — titre aligné, pas de badge qui décale */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <p className={`text-sm font-semibold ${!n.read ? "text-gray-900 dark:text-white" : "text-gray-700 dark:text-gray-300"}`}>
                      {n.title}
                    </p>
                    {/* Date relative — toujours à droite, alignée */}
                    <span className="shrink-0 text-xs text-gray-400 dark:text-gray-500">
                      {relativeDate(n.date)}
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">{n.body}</p>
                  {/* CTA contextuel quand pertinent */}
                  {cta && (
                    <Link
                      href={cta.href}
                      className="mt-2 inline-flex text-xs font-medium text-brand hover:underline"
                    >
                      {cta.label} →
                    </Link>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </ComptePageShell>
  );
}
