"use client";

/**
 * PricingCard - One plan card in the pricing carousel.
 *
 * Shows: name, icon, price, 4 features with tooltips, CTA.
 * Greyed out when disabled (seats > max).
 * Badge "Recommande" on Maxi.
 */

import { type Plan, type PriceResult, formatPrice } from "@/lib/pricing-engine";
import { CTAButton } from "@/components/ui/CTAButton";

interface PricingCardProps {
  plan: Plan;
  price: PriceResult;
  seats: number;
  isReduced: boolean;
  onChoose: () => void;
}

function InfoTooltip({ text }: { text: string }) {
  return (
    <span className="group relative ml-1 inline-block cursor-help text-gray-400">
      <svg width="13" height="13" viewBox="0 0 20 20" className="inline align-middle" style={{ marginBottom: 1 }}>
        <circle cx="10" cy="10" r="8.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <text x="10" y="14.5" textAnchor="middle" fontSize="10" fontWeight="600" fill="currentColor" fontFamily="sans-serif">i</text>
      </svg>
      <span className="pointer-events-none absolute bottom-full left-1/2 z-30 hidden w-60 -translate-x-1/2 rounded-lg border border-gray-200 bg-white p-3 text-xs leading-relaxed text-gray-700 shadow-lg group-hover:block dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300">
        {text}
      </span>
    </span>
  );
}

export function PricingCard({ plan, price, seats, isReduced, onChoose }: PricingCardProps) {
  const disabled = price.isDisabled;

  return (
    <div
      className={`relative flex w-72 flex-shrink-0 flex-col rounded-lg border p-6 transition-shadow lg:w-auto lg:flex-shrink ${
        disabled
          ? "border-gray-200 bg-gray-50 opacity-40 dark:border-gray-700 dark:bg-gray-800"
          : plan.recommended
            ? "border-2 bg-white shadow-lg dark:bg-gray-800"
            : "border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800"
      }`}
      style={plan.recommended && !disabled ? { borderColor: 'var(--color-brand)' } : undefined}
    >
      {/* Badge Recommande */}
      {plan.recommended && !disabled && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold text-white" style={{ backgroundColor: 'var(--color-brand)' }}>
            Recommandé
          </span>
        </div>
      )}

      {/* Name — pas d'icône, propre et aligné */}
      <div className="mb-4">
        <span className="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white">
          {plan.name}
        </span>
      </div>

      {/* Price */}
      <div className="mb-1">
        <span className="text-3xl font-bold text-gray-900 dark:text-white">
          {formatPrice(seats > 1 && !isReduced ? price.pricePerPersonMonthly : price.totalMonthly)}
        </span>
        <span className="ml-1 text-sm text-gray-500 dark:text-gray-400">
          {seats > 1 && !isReduced ? "/mois/pers." : "/mois"}
        </span>
      </div>

      {/* Total monthly if multi-seat */}
      {seats > 1 && !isReduced && (
        <p className="mb-1 text-sm font-medium" style={{ color: 'var(--color-brand)' }}>
          Total : {formatPrice(price.totalMonthly)}/mois
        </p>
      )}

      {/* Upfront payment if duration > monthly */}
      {price.totalUpfront !== null && (
        <p className="mb-1 text-sm font-medium text-gray-900 dark:text-white">
          Réglez maintenant {formatPrice(price.totalUpfront)}
        </p>
      )}

      {/* Savings */}
      {price.savings > 0 && (
        <p className="mb-2 text-xs font-medium text-green-600 dark:text-green-400">
          Vous économisez {formatPrice(price.savings)}
        </p>
      )}

      {/* Actions count */}
      <p className="mb-4 text-xs text-gray-500 dark:text-gray-400">{plan.maxActions}</p>

      {/* Divider */}
      <hr className="mb-4 border-gray-200 dark:border-gray-700" />

      {/* Features - all 4, no factorization */}
      <ul className="mb-6 flex-1 space-y-3">
        {plan.features.map((f) => (
          <li key={f.label} className="flex items-start gap-2">
            <svg className="mt-0.5 h-4 w-4 flex-shrink-0" style={{ color: 'var(--color-brand)' }} viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" fill="currentColor" />
            </svg>
            <div>
              <span className="text-xs text-gray-700 dark:text-gray-300">{f.label}</span>
              {f.tooltip && <InfoTooltip text={f.tooltip} />}
              <div className="text-xs font-medium text-gray-900 dark:text-white">{f.value}</div>
            </div>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <CTAButton
        onClick={onChoose}
        disabled={disabled}
        variant={disabled ? "light" : "solid"}
        size="lg"
        fullWidth
      >
        Choisir
      </CTAButton>
    </div>
  );
}
