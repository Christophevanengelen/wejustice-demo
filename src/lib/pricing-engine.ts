/**
 * Pricing Engine - WeJustice Forfaits Libertes
 *
 * Pure calculation module. Zero React, zero DOM.
 * Source of truth: simulator.js from Arnaud Durand.
 *
 * Reusable by: pricing page, /compte dashboard, upgrade CTAs.
 */

// ─── Plan definitions ───

export interface Plan {
  id: "mini" | "plus" | "maxi" | "aura";
  name: string;
  color: string;
  icon: string; // SVG path
  basePriceMonthly: number;
  maxSeats: number;
  maxActions: string;
  features: PlanFeature[];
  recommended?: boolean;
}

export interface PlanFeature {
  label: string;
  value: string;
  tooltip?: string;
}

export type DurationKey = "monthly" | "annual" | "biannual" | "triannual";

export interface PriceResult {
  pricePerPersonMonthly: number;
  totalMonthly: number;
  totalUpfront: number | null; // null if monthly (no upfront)
  savings: number; // vs monthly over same period
  durationMonths: number;
  isDisabled: boolean;
}

// ─── Constants (from simulator.js) ───

const BASES: Record<string, number> = {
  mini: 8.40,
  plus: 14.60,
  maxi: 24.80,
  aura: 58.00,
};

const DISCOUNT_SEAT = {
  duo: 0.40,  // 2 persons: -40%
  trio: 0.50, // 3 persons: -50%
};

const DISCOUNT_DURATION: Record<DurationKey, number> = {
  monthly: 0,
  annual: 0.25,    // -25%
  biannual: 0.35,  // -35%
  triannual: 0.45, // -45%
};

const DISCOUNT_REDUCED = 0.50; // -50% for reduced tariff

const DURATION_MONTHS: Record<DurationKey, number> = {
  monthly: 1,
  annual: 12,
  biannual: 24,
  triannual: 36,
};

const DURATION_LABELS: Record<DurationKey, string> = {
  monthly: "Par mois",
  annual: "1 an",
  biannual: "2 ans",
  triannual: "3 ans",
};

const _DURATION_DISCOUNT_PERCENT: Record<DurationKey, number | null> = {
  monthly: null,
  annual: 30,
  biannual: 35,
  triannual: 40,
};

// ─── Tooltip texts (exact copy from simulator.js) ───

const TOOLTIP_ACTIONS = "Concerne toutes les actions Libertés en cours, vous pourrez rejoindre de nouvelles actions une fois vos précédentes actions clôturées.";
const TOOLTIP_ELIGIBILITY = "Participer à une procédure nécessite d'y être éligible. Par exemple, tout citoyen peut participer aux procédures en transparence, mais pas à une procédure nécessitant d'être médecin.";
const TOOLTIP_SEATS = "Les proches de votre choix (famille, amis, voisins...) auront leur propre compte, mais vous financez leur abonnement grâce à un forfait groupe.";
const TOOLTIP_DURATION = "Les combats que nous menons s'inscrivent dans la durée : nous vous incitons donc à un soutien durable.";
const TOOLTIP_SUPPORT = "Bénéficiez du support écrit non juridique en illimité, tant que c'est raisonnable.";

// ─── Plans ───

export const PLANS: Plan[] = [
  {
    id: "mini",
    name: "Mini",
    color: "#64748b",
    icon: "M2 20h2c1.1 0 2-.9 2-2v-8c0-1.1-.9-2-2-2H2v12zm18-12h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L13.17 1 7.59 6.59C7.22 6.95 7 7.45 7 8v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2c0-1.1-.9-2-2-2z",
    basePriceMonthly: BASES.mini,
    maxSeats: 1,
    maxActions: "Jusqu'à 1 action",
    features: [
      { label: "Recevoir notre Gazette", value: "Inclus" },
      { label: "Support en ligne", value: "Inclus", tooltip: TOOLTIP_SUPPORT },
      { label: "Soutenir nos actions", value: "Jusqu'à 1 action", tooltip: TOOLTIP_ACTIONS },
      { label: "Rejoindre les procès", value: "Possible", tooltip: TOOLTIP_ELIGIBILITY },
    ],
  },
  {
    id: "plus",
    name: "Plus",
    color: "#64748b",
    icon: "M10,1.5 L12.6,7.5 L19.2,8.1 L14.3,12.5 L15.9,19 L10,15.6 L4.1,19 L5.7,12.5 L0.8,8.1 L7.4,7.5",
    basePriceMonthly: BASES.plus,
    maxSeats: 2,
    maxActions: "Jusqu'à 2 actions",
    features: [
      { label: "Recevoir notre Gazette", value: "Inclus" },
      { label: "Support en ligne", value: "Inclus", tooltip: TOOLTIP_SUPPORT },
      { label: "Soutenir nos actions", value: "Jusqu'à 2 actions", tooltip: TOOLTIP_ACTIONS },
      { label: "Rejoindre les procès", value: "Possible", tooltip: TOOLTIP_ELIGIBILITY },
    ],
  },
  {
    id: "maxi",
    name: "Maxi",
    color: "#64748b",
    icon: "M10,2 L17.5,5.5 L17.5,11.5 C17.5,15.5 14.2,18.5 10,20 C5.8,18.5 2.5,15.5 2.5,11.5 L2.5,5.5 Z",
    basePriceMonthly: BASES.maxi,
    maxSeats: 3,
    maxActions: "Jusqu'à 5 actions",
    recommended: true,
    features: [
      { label: "Recevoir notre Gazette", value: "Inclus" },
      { label: "Support en ligne", value: "Inclus", tooltip: TOOLTIP_SUPPORT },
      { label: "Soutenir nos actions", value: "Jusqu'à 5 actions", tooltip: TOOLTIP_ACTIONS },
      { label: "Rejoindre les procès", value: "Possible", tooltip: TOOLTIP_ELIGIBILITY },
    ],
  },
  {
    id: "aura",
    name: "Aura",
    color: "#64748b",
    icon: "M2,15 L5,7 L8.5,12 L10,3.5 L11.5,12 L15,7 L18,15 Z M2,16.5 L18,16.5 L18,18 L2,18 Z",
    basePriceMonthly: BASES.aura,
    maxSeats: 4,
    maxActions: "Illimité",
    features: [
      { label: "Recevoir notre Gazette", value: "Inclus" },
      { label: "Support en ligne", value: "Inclus", tooltip: TOOLTIP_SUPPORT },
      { label: "Soutenir nos actions", value: "Illimité ∞", tooltip: TOOLTIP_ACTIONS },
      { label: "Rejoindre les procès", value: "Possible", tooltip: TOOLTIP_ELIGIBILITY },
    ],
  },
];

// ─── Exports for UI ───

export const TOOLTIPS = {
  actions: TOOLTIP_ACTIONS,
  eligibility: TOOLTIP_ELIGIBILITY,
  seats: TOOLTIP_SEATS,
  duration: TOOLTIP_DURATION,
  support: TOOLTIP_SUPPORT,
};

export const DURATIONS: { key: DurationKey; label: string; discountPercent: number | null }[] = [
  { key: "monthly", label: DURATION_LABELS.monthly, discountPercent: null },
  { key: "annual", label: DURATION_LABELS.annual, discountPercent: 25 },
  { key: "biannual", label: DURATION_LABELS.biannual, discountPercent: 35 },
  { key: "triannual", label: DURATION_LABELS.triannual, discountPercent: 45 },
];

export const DON_TAGS_STANDARD = [10, 20, 50, 100, 500, 1000, 2000];
export const DON_TAGS_REDUCED = [2, 3, 4, 5];

// ─── Calculation functions ───

function round10(v: number): number {
  return Math.round(v * 10) / 10;
}

/**
 * Calculate price for a plan given seats, duration, and reduced mode.
 */
export function calculatePrice(
  planId: string,
  seats: number,
  duration: DurationKey,
  isReduced: boolean,
): PriceResult {
  const plan = PLANS.find((p) => p.id === planId);
  if (!plan) {
    return { pricePerPersonMonthly: 0, totalMonthly: 0, totalUpfront: null, savings: 0, durationMonths: 1, isDisabled: true };
  }

  const isDisabled = !isReduced && seats > plan.maxSeats;
  const isAura = plan.id === "aura";
  const months = DURATION_MONTHS[duration];
  const durationDiscount = DISCOUNT_DURATION[duration];

  if (isAura) {
    // Aura: fixed price regardless of seats
    const base = plan.basePriceMonthly;
    const monthly = round10(base * (1 - durationDiscount));
    const perPerson = round10(monthly / seats);
    const totalUpfront = duration === "monthly" ? null : round10(monthly * months);
    const savingsVsMonthly = duration === "monthly" ? 0 : round10(base * months - monthly * months);

    return {
      pricePerPersonMonthly: perPerson,
      totalMonthly: monthly,
      totalUpfront,
      savings: savingsVsMonthly,
      durationMonths: months,
      isDisabled,
    };
  }

  // Mini/Plus/Maxi
  const base = plan.basePriceMonthly;

  if (isReduced) {
    // Reduced: -50% on base, 1 person, no seat discount
    const reducedBase = round10(base * (1 - DISCOUNT_REDUCED));
    const monthly = round10(reducedBase * (1 - durationDiscount));
    const totalUpfront = duration === "monthly" ? null : round10(monthly * months);
    const savingsVsMonthly = duration === "monthly" ? 0 : round10(reducedBase * months - monthly * months);

    return {
      pricePerPersonMonthly: monthly,
      totalMonthly: monthly,
      totalUpfront,
      savings: savingsVsMonthly,
      durationMonths: months,
      isDisabled,
    };
  }

  // Standard: apply seat discount then duration discount
  const seatDiscount = seats === 1 ? 0 : seats === 2 ? DISCOUNT_SEAT.duo : DISCOUNT_SEAT.trio;
  const afterSeat = round10(base * (1 - seatDiscount));
  const monthly = round10(afterSeat * (1 - durationDiscount));
  const totalMonthly = round10(monthly * seats);
  const totalUpfront = duration === "monthly" ? null : round10(monthly * months * seats);

  // Savings: compare vs monthly (no duration discount) over same period
  const monthlyNoDiscount = round10(afterSeat * seats);
  const savingsVsMonthly = duration === "monthly" ? 0 : round10(monthlyNoDiscount * months - (totalUpfront || 0));

  return {
    pricePerPersonMonthly: monthly,
    totalMonthly,
    totalUpfront,
    savings: savingsVsMonthly,
    durationMonths: months,
    isDisabled,
  };
}

/**
 * Check if a card should be disabled for the given seat count.
 */
export function isCardDisabled(planId: string, seats: number, isReduced: boolean): boolean {
  if (isReduced && planId === "aura") return true; // Aura hidden in reduced
  const plan = PLANS.find((p) => p.id === planId);
  if (!plan) return true;
  if (isReduced) return false; // reduced = 1 seat, always fits
  return seats > plan.maxSeats;
}

/**
 * Format price for display.
 */
export function formatPrice(value: number): string {
  return value.toFixed(2).replace(".", ",") + " \u20AC";
}

/**
 * Check if user can join another action based on their plan.
 * Signer is free and unlimited. Rejoindre is limited by plan.
 */
export function canJoinAction(planId: string, actionsRejointes: string[]): boolean {
  const plan = PLANS.find((p) => p.id === planId);
  if (!plan) return false;
  if (plan.id === "aura") return true; // unlimited
  const maxActions = plan.id === "mini" ? 1 : plan.id === "plus" ? 2 : plan.id === "maxi" ? 5 : 0;
  return actionsRejointes.length < maxActions;
}

/**
 * Get max actions for a plan.
 */
export function getMaxActions(planId: string): number {
  if (planId === "aura") return Infinity;
  if (planId === "maxi") return 5;
  if (planId === "plus") return 2;
  if (planId === "mini") return 1;
  return 0;
}
