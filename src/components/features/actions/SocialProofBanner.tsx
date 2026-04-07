"use client";

/**
 * SocialProofBanner — Indicateurs d'activité sur une action.
 *
 * Affiche UNE seule donnée pertinente et vérifiable :
 * - "X signatures cette semaine" (donnée réelle du mock)
 *
 * PAS de "personnes lisent cette page" (déjà dans le hero).
 * PAS de "signé depuis votre arrivée" (donnée inventée, non vérifiable).
 */

import { motion, useReducedMotion } from "framer-motion";
import { EASING, DURATION } from "@/components/animations";

interface SocialProofBannerProps {
  signaturesThisWeek: number;
  liveReaders?: number;
}

export function SocialProofBanner({
  signaturesThisWeek,
}: SocialProofBannerProps) {
  const prefersReduced = useReducedMotion();

  if (signaturesThisWeek <= 0) return null;

  return (
    <motion.div
      initial={prefersReduced ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: DURATION.slow, ease: EASING.smooth, delay: 0.3 }}
      className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400"
    >
      <svg className="h-4 w-4 shrink-0 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
      </svg>
      <span>
        <strong>{signaturesThisWeek.toLocaleString("fr-FR")}</strong> signatures cette semaine
      </span>
    </motion.div>
  );
}
