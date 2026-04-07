"use client";

/**
 * MilestoneProgress — Barre de progression avec jalons de signatures.
 *
 * Deux variantes :
 * - "full" : Barre + jalons étiquetés en dessous + indicateur "prochain palier"
 *            Utilisé sur action detail hero et page merci.
 * - "compact" : Barre seule avec indicateur texte du prochain palier.
 *               Utilisé sur les ActionCards.
 *
 * Les jalons :
 *   1K = Action populaire
 *   10K = Mobilisation en vue
 *   50K = Palier décisif
 *   100K = Lancement juridique
 *   500K = Action historique
 *
 * Mobile : les jalons full s'affichent en liste verticale sous la barre
 * au lieu d'être positionnés en absolute (illisible sur petit écran).
 */

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EASING } from "@/components/animations";

interface Milestone {
  threshold: number;
  label: string;
  shortLabel: string;
  color: string;
}

const MILESTONES: Milestone[] = [
  { threshold: 1_000, label: "Action populaire", shortLabel: "1K", color: "text-green-600 dark:text-green-400" },
  { threshold: 10_000, label: "Mobilisation en vue", shortLabel: "10K", color: "text-blue-600 dark:text-blue-400" },
  { threshold: 50_000, label: "Palier décisif", shortLabel: "50K", color: "text-purple-600 dark:text-purple-400" },
  { threshold: 100_000, label: "Lancement juridique", shortLabel: "100K", color: "text-red-600 dark:text-red-400" },
  { threshold: 500_000, label: "Action historique", shortLabel: "500K", color: "text-amber-600 dark:text-amber-400" },
];

function formatCount(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(".0", "")}M`;
  if (n >= 1_000) return `${Math.round(n / 1_000)}K`;
  return n.toString();
}

interface MilestoneProgressProps {
  currentSignatures: number;
  goalSignatures: number;
  variant?: "full" | "compact";
}

export function MilestoneProgress({
  currentSignatures,
  goalSignatures,
  variant = "full",
}: MilestoneProgressProps) {
  const prefersReduced = useReducedMotion();
  const [animatedPct, setAnimatedPct] = useState(0);

  const pct = Math.min(100, (currentSignatures / goalSignatures) * 100);

  useEffect(() => {
    if (prefersReduced) {
      setAnimatedPct(pct);
      return;
    }
    const timeout = setTimeout(() => setAnimatedPct(pct), 100);
    return () => clearTimeout(timeout);
  }, [pct, prefersReduced]);

  const nextMilestone = MILESTONES.find((m) => m.threshold > currentSignatures);
  const remaining = nextMilestone ? nextMilestone.threshold - currentSignatures : 0;

  /* ─── Compact : barre + jalons atteints + prochain palier ─── */
  if (variant === "compact") {
    const reachedCompact = MILESTONES.filter((m) => currentSignatures >= m.threshold);
    return (
      <div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: "var(--color-brand)" }}
            initial={{ width: 0 }}
            animate={{ width: `${animatedPct}%` }}
            transition={{ duration: prefersReduced ? 0 : 1.2, ease: EASING.smooth }}
          />
        </div>
        <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
          {reachedCompact.map((m) => (
            <span key={m.threshold} className={`inline-flex items-center gap-0.5 text-[10px] font-medium ${m.color}`}>
              <svg className="h-2.5 w-2.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              {m.shortLabel}
            </span>
          ))}
          {nextMilestone && remaining > 0 && (
            <span className="text-[10px] text-gray-400 dark:text-gray-500">
              → <span className={`font-semibold ${nextMilestone.color}`}>{nextMilestone.shortLabel}</span> dans {remaining.toLocaleString("fr-FR")}
            </span>
          )}
        </div>
      </div>
    );
  }

  /* ─── Full : barre + jalons étiquetés ─── */
  const reached = MILESTONES.filter((m) => currentSignatures >= m.threshold);
  const unreached = MILESTONES.filter((m) => currentSignatures < m.threshold && m.threshold <= goalSignatures * 1.2);

  return (
    <div>
      {/* Barre de progression */}
      <div className="h-3 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: "var(--color-brand)" }}
          initial={{ width: 0 }}
          animate={{ width: `${animatedPct}%` }}
          transition={{ duration: prefersReduced ? 0 : 1.5, ease: EASING.smooth }}
        />
      </div>

      {/* Jalons — liste horizontale desktop, verticale mobile */}
      <div className="mt-3 flex flex-wrap gap-2">
        {reached.map((m) => (
          <span
            key={m.threshold}
            className={`inline-flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium dark:bg-gray-800 ${m.color}`}
          >
            <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            {m.shortLabel} — {m.label}
          </span>
        ))}
        {unreached.slice(0, 1).map((m) => (
          <span
            key={m.threshold}
            className="inline-flex items-center gap-1 rounded-full border border-dashed border-gray-300 px-2.5 py-1 text-xs font-medium text-gray-400 dark:border-gray-600 dark:text-gray-500"
          >
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
            Prochain : {m.shortLabel} — {m.label}
          </span>
        ))}
      </div>

      {/* Indicateur restant */}
      {nextMilestone && remaining > 0 && (
        <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
          Plus que{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            {remaining.toLocaleString("fr-FR")}
          </span>{" "}
          signatures pour atteindre{" "}
          <span className={`font-semibold ${nextMilestone.color}`}>
            {nextMilestone.label}
          </span>
        </p>
      )}
    </div>
  );
}
