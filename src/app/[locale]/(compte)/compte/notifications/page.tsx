"use client";

/**
 * NotificationsPage -- Liste des notifications du membre.
 *
 * Data structure uses `description` field (not `body`) and `link` for navigation.
 * Types: signature, milestone, comment, action, payment, welcome, update
 */

import Link from "next/link";
import { useParams } from "next/navigation";
import { Card } from "flowbite-react";
import { ComptePageShell } from "@/components/features/compte/ComptePageShell";
import userActivity from "@/mocks/user-activity.json";

/* --- Date relative (format humain) --- */

function relativeDate(dateStr: string): string {
  const now = new Date();
  const date = new Date(dateStr);
  const diffMs = now.getTime() - date.getTime();
  const diffH = Math.floor(diffMs / 3600000);
  const diffD = Math.floor(diffH / 24);
  if (diffH < 1) return "maintenant";
  if (diffH < 24) return `il y a ${diffH}h`;
  if (diffD < 7) return `il y a ${diffD}j`;
  return `il y a ${Math.floor(diffD / 7)} sem.`;
}

/* --- Category visuals (circle + SVG path) --- */

const CATEGORY_STYLE: Record<string, { bg: string; iconColor: string; icon: string }> = {
  signature: {
    bg: "bg-green-100 dark:bg-green-900/30",
    iconColor: "text-green-600 dark:text-green-400",
    icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  milestone: {
    bg: "bg-orange-100 dark:bg-orange-900/30",
    iconColor: "text-orange-600 dark:text-orange-400",
    icon: "M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9",
  },
  comment: {
    bg: "bg-blue-100 dark:bg-blue-900/30",
    iconColor: "text-blue-600 dark:text-blue-400",
    icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",
  },
  action: {
    bg: "bg-red-100 dark:bg-red-900/30",
    iconColor: "text-brand",
    icon: "M13 10V3L4 14h7v7l9-11h-7z",
  },
  payment: {
    bg: "bg-gray-100 dark:bg-gray-700",
    iconColor: "text-gray-600 dark:text-gray-400",
    icon: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z",
  },
  welcome: {
    bg: "bg-purple-100 dark:bg-purple-900/30",
    iconColor: "text-purple-600 dark:text-purple-400",
    icon: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z",
  },
  update: {
    bg: "bg-yellow-100 dark:bg-yellow-900/30",
    iconColor: "text-yellow-600 dark:text-yellow-400",
    icon: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15",
  },
};

const DEFAULT_STYLE = CATEGORY_STYLE.action;

export default function NotificationsPage() {
  const params = useParams();
  const locale = (params?.locale as string) || "fr";

  /* Sort by date desc */
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
          const style = CATEGORY_STYLE[n.type] || DEFAULT_STYLE;

          return (
            <Link key={n.id} href={`/${locale}${n.link}`} className="block">
              <Card
                className={`transition-colors hover:bg-gray-50 dark:hover:bg-gray-800 ${!n.read ? "bg-blue-50 dark:bg-blue-900/10" : ""}`}
              >
                <div className="flex items-start gap-3">
                  {/* Category icon */}
                  <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${style.bg}`}>
                    <svg className={`h-4 w-4 ${style.iconColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d={style.icon} />
                    </svg>
                  </div>

                  {/* Content */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <p className={`text-sm font-semibold ${!n.read ? "text-gray-900 dark:text-white" : "text-gray-700 dark:text-gray-300"}`}>
                        {n.title}
                      </p>
                      <span className="shrink-0 text-xs text-gray-400 dark:text-gray-500">
                        {relativeDate(n.date)}
                      </span>
                    </div>
                    <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">{n.description}</p>
                  </div>

                  {/* Unread dot */}
                  {!n.read && (
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-blue-500" />
                  )}
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </ComptePageShell>
  );
}
