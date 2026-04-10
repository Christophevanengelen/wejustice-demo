"use client";

/**
 * OrganisationsTable — Section B2B pour syndicats, entreprises, assos, ONG.
 *
 * Une seule colonne, liste de bénéfices avec checks, CTA unique.
 * Pas de tableau comparatif — les deux profils ont les mêmes features.
 */

import { useTranslations } from "next-intl";
import { CTAButton } from "@/components/ui/CTAButton";

export function OrganisationsTable() {
  const t = useTranslations("organisations");
  const BENEFITS = [
    t("benefit1"),
    t("benefit2"),
    t("benefit3"),
    t("benefit4"),
    t("benefit5"),
    t("benefit6"),
  ];
  return (
    <div className="mx-auto max-w-2xl">
      <div className="rounded-lg border border-gray-200 bg-white p-8 dark:border-white/[0.08] dark:bg-gray-900">
        {/* Bénéfices — liste simple avec checks */}
        <ul className="mb-8 space-y-4">
          {BENEFITS.map((benefit) => (
            <li key={benefit} className="flex items-start gap-3">
              <svg className="mt-0.5 h-5 w-5 shrink-0 text-brand" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-sm text-gray-700 dark:text-gray-300">{benefit}</span>
            </li>
          ))}
        </ul>

        {/* CTA unique */}
        <div className="text-center">
          <CTAButton href="https://calendly.com/wejustice" size="lg">
            {t("cta")}
          </CTAButton>
          <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
            {t("ctaDesc")}
          </p>
        </div>
      </div>
    </div>
  );
}
