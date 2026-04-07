"use client";

/**
 * UrgencyNearMilestone - Urgency banner when close to a milestone
 *
 * Shown when signatures are within 10% of the next milestone.
 * Pulsing border, animated text, encourages sharing.
 */

import { motion, useReducedMotion } from "framer-motion";
import { EASING } from "@/components/animations";

/* ── Milestone thresholds (shared with MilestoneProgress) ── */
const MILESTONES = [
  { threshold: 1_000, label: "1 000" },
  { threshold: 10_000, label: "10 000" },
  { threshold: 50_000, label: "50 000" },
  { threshold: 100_000, label: "100 000" },
  { threshold: 500_000, label: "500 000" },
];

function formatNumber(n: number): string {
  return n.toLocaleString("fr-FR");
}

interface UrgencyNearMilestoneProps {
  currentSignatures: number;
}

export function UrgencyNearMilestone({ currentSignatures }: UrgencyNearMilestoneProps) {
  const prefersReduced = useReducedMotion();

  // Find the next unmet milestone
  const nextMilestone = MILESTONES.find((m) => m.threshold > currentSignatures);
  if (!nextMilestone) return null;

  // Only show if within 10% of the milestone
  const remaining = nextMilestone.threshold - currentSignatures;
  const tenPercent = nextMilestone.threshold * 0.1;
  if (remaining > tenPercent) return null;

  return (
    <motion.div
      initial={prefersReduced ? false : { opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: EASING.smooth }}
      className="relative overflow-hidden rounded-lg border-2 border-red-200 bg-red-50 p-4 dark:border-red-800/60 dark:bg-red-900/20"
    >
      {/* Pulsing border effect */}
      {!prefersReduced && (
        <motion.div
          className="absolute inset-0 rounded-lg border-2 border-red-400/50 dark:border-red-500/30"
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      <div className="relative flex items-center gap-3">
        {/* Urgency icon */}
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/40">
          <svg className="h-5 w-5 text-red-600 dark:text-red-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
          </svg>
        </div>

        <div className="flex-1">
          <p className="text-sm font-semibold text-red-800 dark:text-red-300">
            Plus que{" "}
            <span className="text-base font-bold">{formatNumber(remaining)}</span>{" "}
            signatures pour atteindre{" "}
            <span className="font-bold">{nextMilestone.label}</span> !
          </p>
          <p className="mt-0.5 text-xs text-red-600/80 dark:text-red-400/70">
            Signez et partagez maintenant pour franchir ce cap historique.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
