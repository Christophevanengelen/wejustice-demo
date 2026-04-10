"use client";

/**
 * NotificationBell -- Bell icon with dropdown for the navbar.
 *
 * - Shows a red badge with unread count
 * - Clicking toggles a Flowbite-style dropdown panel
 * - Opening the dropdown marks all as read (clears badge)
 * - Click outside closes the dropdown
 * - Dark mode support
 * - Reusable in both Navigation and CompteNavbar
 */

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import userActivity from "@/mocks/user-activity.json";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface Notification {
  id: string;
  type: string;
  title: string;
  description: string;
  date: string;
  read: boolean;
  link: string;
}

/* ------------------------------------------------------------------ */
/*  Category config (icon path + colors)                               */
/* ------------------------------------------------------------------ */

const CATEGORY_CONFIG: Record<string, { bg: string; iconColor: string; icon: string }> = {
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

const DEFAULT_CONFIG = CATEGORY_CONFIG.action;

/* ------------------------------------------------------------------ */
/*  Relative date helper                                               */
/* ------------------------------------------------------------------ */

function relativeDate(dateStr: string): string {
  const now = new Date();
  const date = new Date(dateStr);
  const diffMs = now.getTime() - date.getTime();
  const diffH = Math.floor(diffMs / 3600000);
  const diffD = Math.floor(diffH / 24);
  if (diffH < 1) return "maintenant";
  if (diffH < 24) return `${diffH}h`;
  if (diffD < 7) return `${diffD}j`;
  return `${Math.floor(diffD / 7)} sem.`;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function NotificationBell() {
  const params = useParams();
  const locale = (params?.locale as string) || "fr";

  const [isOpen, setIsOpen] = useState(false);
  const [readIds, setReadIds] = useState<Set<string>>(new Set());
  const dropdownRef = useRef<HTMLDivElement>(null);

  /* Sort notifications by date desc, take top 5 for dropdown */
  const allNotifications = (userActivity.notifications as Notification[]).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  const displayedNotifications = allNotifications.slice(0, 5);

  const isRead = (n: Notification) => n.read || readIds.has(n.id);
  const unreadCount = allNotifications.filter((n) => !isRead(n)).length;

  const handleNotificationClick = (id: string) => {
    setReadIds((prev) => new Set([...prev, id]));
    setIsOpen(false);
  };

  /* Toggle dropdown */
  const toggleDropdown = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  /* Click outside to close */
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell button */}
      <button
        type="button"
        onClick={toggleDropdown}
        className="relative inline-flex h-10 w-10 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        aria-label={`Notifications${unreadCount > 0 ? ` (${unreadCount} non lues)` : ""}`}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
          />
        </svg>

        {/* Unread badge */}
        {unreadCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-brand text-[10px] font-bold text-white">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown panel */}
      {isOpen && (
        <div className="absolute right-0 top-12 z-50 w-80 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg dark:border-white/[0.08] dark:bg-gray-900 sm:w-96">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3 dark:border-white/[0.08]">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Notifications</h3>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {allNotifications.length} total
            </span>
          </div>

          {/* Notification list */}
          <div className="max-h-80 overflow-y-auto">
            {displayedNotifications.map((n) => {
              const config = CATEGORY_CONFIG[n.type] || DEFAULT_CONFIG;
              return (
                <Link
                  key={n.id}
                  href={`/${locale}${n.link}`}
                  onClick={() => handleNotificationClick(n.id)}
                  className={`flex items-start gap-3 px-4 py-3 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800 ${
                    !isRead(n) ? "bg-blue-50/50 dark:bg-blue-900/10" : ""
                  }`}
                >
                  {/* Category icon */}
                  <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${config.bg}`}>
                    <svg className={`h-4 w-4 ${config.iconColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d={config.icon} />
                    </svg>
                  </div>

                  {/* Content */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {n.title}
                      </p>
                      {/* Unread dot */}
                      {!isRead(n) && (
                        <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-blue-500" />
                      )}
                    </div>
                    <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
                      {n.description}
                    </p>
                    <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                      {relativeDate(n.date)}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Footer */}
          <Link
            href={`/${locale}/compte/notifications`}
            onClick={() => setIsOpen(false)}
            className="flex items-center justify-center border-t border-gray-200 px-4 py-3 text-sm font-medium text-brand hover:bg-gray-50 dark:border-white/[0.08] dark:hover:bg-gray-800"
          >
            Voir toutes les notifications
          </Link>
        </div>
      )}
    </div>
  );
}
