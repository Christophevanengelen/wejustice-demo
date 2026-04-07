"use client";

import type React from "react";

/**
 * UrgencyBadge - Contextual urgency indicators
 *
 * Three modes (can stack):
 * 1. Countdown: "Plus que X jours" (if endDate in future)
 * 2. Goal proximity: "Plus que X signatures!" (80-99% of goal)
 * 3. Trending: pulsing green dot + "Tendance"
 *
 * Renders nothing if no urgency condition is met.
 * Part of the component library.
 */

interface UrgencyBadgeProps {
  endDate?: string | null;
  currentSignatures: number;
  goalSignatures: number;
  trending?: boolean;
}

export function UrgencyBadge({
  endDate,
  currentSignatures,
  goalSignatures,
  trending,
}: UrgencyBadgeProps) {
  const badges: React.ReactElement[] = [];
  const pct = goalSignatures > 0 ? (currentSignatures / goalSignatures) * 100 : 0;

  /* Trending */
  if (trending) {
    badges.push(
      <span key="trending" className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
        </span>
        Tendance
      </span>
    );
  }

  /* Countdown */
  if (endDate) {
    const end = new Date(endDate);
    const now = new Date();
    const diffMs = end.getTime() - now.getTime();
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays > 0 && diffDays <= 90) {
      badges.push(
        <span key="countdown" className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Plus que {diffDays} jour{diffDays > 1 ? "s" : ""} pour signer
        </span>
      );
    }
  }

  /* Goal proximity (80-99%) */
  if (pct >= 80 && pct < 100) {
    const remaining = goalSignatures - currentSignatures;
    badges.push(
      <span key="proximity" className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
        <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" />
        </svg>
        Plus que {remaining.toLocaleString("fr-FR")} signatures !
      </span>
    );
  }

  if (badges.length === 0) return null;

  return <div className="flex flex-wrap gap-2">{badges}</div>;
}
