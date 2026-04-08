"use client";

/**
 * DonLibreStep - Step 2: optional recurring monthly donation.
 *
 * Shows: plan summary + free amount field + tag buttons + total recap + final CTA.
 * Tags differ by mode: standard (10-2000) vs reduced (2-5).
 */

import { useState } from "react";
import { type Plan, type PriceResult, formatPrice, DON_TAGS_STANDARD, DON_TAGS_REDUCED } from "@/lib/pricing-engine";
import { CTAButton } from "@/components/ui/CTAButton";

interface DonLibreStepProps {
  plan: Plan;
  price: PriceResult;
  seats: number;
  isReduced: boolean;
  durationLabel: string;
  onBack: () => void;
}

export function DonLibreStep({ plan, price, seats, isReduced, durationLabel, onBack }: DonLibreStepProps) {
  const [donAmount, setDonAmount] = useState<number | null>(null);
  const [selectedTag, setSelectedTag] = useState<number | null>(null);

  const tags = isReduced ? DON_TAGS_REDUCED : DON_TAGS_STANDARD;

  const handleTagClick = (amount: number) => {
    if (selectedTag === amount) {
      // Toggle off
      setSelectedTag(null);
      setDonAmount(null);
    } else {
      setSelectedTag(amount);
      setDonAmount(amount);
    }
  };

  const handleInputChange = (value: string) => {
    const num = parseFloat(value);
    if (isNaN(num) || num < 0) {
      setDonAmount(null);
      setSelectedTag(null);
    } else {
      setDonAmount(num);
      setSelectedTag(tags.includes(num) ? num : null);
    }
  };

  const totalMonthly = price.totalMonthly + (donAmount || 0);

  const handleConfirm = () => {
    alert(
      `Demo : souscription au forfait ${plan.name}\n` +
      `${seats} personne${seats > 1 ? "s" : ""} - ${durationLabel}\n` +
      `Forfait : ${formatPrice(price.totalMonthly)}/mois\n` +
      (donAmount ? `Don libre : +${formatPrice(donAmount)}/mois\n` : "") +
      (price.totalUpfront ? `Montant à régler : ${formatPrice(price.totalUpfront + (donAmount || 0) * price.durationMonths)}` : `Total mensuel : ${formatPrice(totalMonthly)}`)
    );
  };

  return (
    <div className="mx-auto max-w-lg rounded-lg border border-gray-200 bg-white p-6 shadow-lg dark:border-white/[0.08] dark:bg-gray-900 dark:hover:shadow-none">
      {/* Back */}
      <button onClick={onBack} className="mb-4 flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Modifier mon choix
      </button>

      {/* Plan summary */}
      <div className="mb-6 rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-sm font-bold" style={{ color: plan.color }}>{plan.name}</span>
            <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
              {seats} pers. - {durationLabel}
            </span>
          </div>
          <span className="text-lg font-bold text-gray-900 dark:text-white">
            {formatPrice(price.totalMonthly)}<span className="text-xs font-normal text-gray-500">/mois</span>
          </span>
        </div>
        {price.totalUpfront !== null && (
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Réglez maintenant {formatPrice(price.totalUpfront)}
          </p>
        )}
      </div>

      {/* Don libre */}
      <div className="mb-6">
        <h3 className="mb-2 text-sm font-bold text-gray-900 dark:text-white">
          Ajouter un soutien mensuel libre
        </h3>
        <p className="mb-4 text-xs text-gray-500 dark:text-gray-400">
          Optionnel. Ce montant sera prélevé chaque mois en plus de votre forfait.
        </p>

        {/* Tags */}
        <div className="mb-3 flex flex-wrap gap-2">
          {tags.map((amount) => (
            <button
              key={amount}
              onClick={() => handleTagClick(amount)}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                selectedTag === amount
                  ? "border-gray-900 bg-gray-900 text-white dark:border-white dark:bg-white dark:text-gray-900"
                  : "border-gray-300 bg-white text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              }`}
            >
              {amount} EUR
            </button>
          ))}
        </div>

        {/* Free input */}
        <div className="flex items-center gap-2">
          <input
            type="number"
            min="0"
            step="1"
            placeholder="Montant libre"
            value={donAmount ?? ""}
            onChange={(e) => handleInputChange(e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition-colors focus:border-gray-500 focus:ring-2 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          />
          <span className="text-sm text-gray-500 dark:text-gray-400">EUR/mois</span>
        </div>
      </div>

      {/* Total recap */}
      <div className="mb-6 rounded-lg border-2 border-gray-200 p-4 dark:border-gray-600">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500 dark:text-gray-400">Forfait {plan.name}</span>
          <span className="text-sm text-gray-900 dark:text-white">{formatPrice(price.totalMonthly)}/mois</span>
        </div>
        {donAmount !== null && donAmount > 0 && (
          <div className="mt-1 flex items-center justify-between">
            <span className="text-sm text-gray-500 dark:text-gray-400">Soutien libre</span>
            <span className="text-sm text-gray-900 dark:text-white">+{formatPrice(donAmount)}/mois</span>
          </div>
        )}
        <hr className="my-2 border-gray-200 dark:border-gray-600" />
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-gray-900 dark:text-white">Total mensuel</span>
          <span className="text-lg font-bold text-gray-900 dark:text-white">{formatPrice(totalMonthly)}</span>
        </div>
        {price.totalUpfront !== null && (
          <div className="mt-1 flex items-center justify-between">
            <span className="text-xs text-gray-500 dark:text-gray-400">À régler maintenant</span>
            <span className="text-sm font-bold text-gray-900 dark:text-white">
              {formatPrice(price.totalUpfront + (donAmount || 0) * price.durationMonths)}
            </span>
          </div>
        )}
      </div>

      {/* Final CTA */}
      <CTAButton onClick={handleConfirm} size="lg" fullWidth>
        Confirmer
      </CTAButton>
    </div>
  );
}
