"use client";

/**
 * StickySignCTA - Mobile-only sticky bottom bar
 *
 * Appears on scroll (>300px). Shows mini progress + sign CTA.
 * Dismissable with localStorage persistence.
 * Uses spring animation for entry/exit.
 *
 * Part of the component library - mobile conversion retention.
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { CTAButton } from "@/components/ui/CTAButton";

interface StickySignCTAProps {
  actionId: string;
  hashtag: string;
  signatureCount: number;
  signatureGoal: number;
  hasSigned: boolean;
  onSign: () => void;
}

export function StickySignCTA({
  actionId,
  hashtag,
  signatureCount,
  signatureGoal,
  hasSigned,
  onSign,
}: StickySignCTAProps) {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const prefersReduced = useReducedMotion();

  const pct = Math.min(100, Math.round((signatureCount / signatureGoal) * 100));

  useEffect(() => {
    /* Check if already dismissed for this action */
    const key = `sticky-cta-dismissed-${actionId}`;
    if (localStorage.getItem(key) === "true") {
      setDismissed(true);
      return;
    }

    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [actionId]);

  const handleDismiss = () => {
    setDismissed(true);
    localStorage.setItem(`sticky-cta-dismissed-${actionId}`, "true");
  };

  const show = visible && !dismissed && !hasSigned;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white p-4 shadow-2xl lg:hidden dark:border-gray-700 dark:bg-gray-800"
          initial={prefersReduced ? { opacity: 0 } : { y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={prefersReduced ? { opacity: 0 } : { y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {/* Dismiss button */}
          <button
            onClick={handleDismiss}
            className="absolute right-3 top-2 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            aria-label="Fermer"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Mini progress */}
          <div className="mb-2 flex items-center justify-between text-xs">
            <span className="font-medium text-gray-900 dark:text-white">
              #{hashtag} - {signatureCount.toLocaleString("fr-FR")} signatures
            </span>
            <span className="text-gray-500 dark:text-gray-400">{pct}%</span>
          </div>
          <div className="mb-3 h-1.5 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
            <div
              className="h-full rounded-full transition-all"
              style={{ width: `${pct}%`, backgroundColor: 'var(--color-brand)' }}
            />
          </div>

          {/* CTA */}
          <CTAButton onClick={onSign} size="md" fullWidth>
            Signer maintenant
          </CTAButton>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
