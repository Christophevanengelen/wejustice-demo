"use client";

/**
 * TarifsClient - Premium pricing page with comparison table.
 */

import { useState, useRef, type FormEvent } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Tooltip } from "flowbite-react";
import { useTranslations } from "next-intl";
import { CTAButton } from "@/components/ui/CTAButton";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import {
  PLANS,
  DURATIONS,
  TOOLTIPS,
  calculatePrice,
  type DurationKey,
  type Plan,
} from "@/lib/pricing-engine";
import { PricingCard } from "@/components/features/pricing/PricingCard";
import { DonLibreStep } from "@/components/features/pricing/DonLibreStep";
import { OrganisationsTable } from "@/components/features/pricing/OrganisationsTable";

/* --- FAQ Item component --- */
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-200 dark:border-white/[0.08]">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-4 text-left"
      >
        <span className="text-sm font-medium text-gray-900 dark:text-white">{q}</span>
        <svg
          className={`h-4 w-4 flex-shrink-0 text-gray-500 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div className={`overflow-hidden transition-all duration-200 ${open ? "max-h-40 pb-4" : "max-h-0"}`}>
        <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
          {a}
        </p>
      </div>
    </div>
  );
}

/* --- Main Component --- */
export function TarifsClient() {
  const params = useParams();
  const locale = (params?.locale as string) || "fr";
  const t = useTranslations("tarifs");
  const [duration, setDuration] = useState<DurationKey>("annual");
  const [isReduced, setIsReduced] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [showSignup, setShowSignup] = useState(false);
  const [signupPlan, setSignupPlan] = useState<string | null>(null);

  const donLibreRef = useRef<HTMLDivElement>(null);

  const visiblePlans = PLANS;

  const handleChoose = (plan: Plan) => {
    setSignupPlan(plan.id);
    setShowSignup(true);
    setSelectedPlan(plan);
  };

  const handleSignupSubmit = (e: FormEvent) => {
    e.preventDefault();
    window.location.href = `/${locale}/compte`;
  };

  const signupPlanLabel = signupPlan === "free"
    ? t("free")
    : PLANS.find((p) => p.id === signupPlan)?.name || "";

  const handleReducedToggle = () => {
    const next = !isReduced;
    setIsReduced(next);
    if (next) {
      setSelectedPlan(null);
    }
  };

  const currentDuration = DURATIONS.find((d) => d.key === duration)!;

  /* Translated duration labels for the selector */
  const DURATION_LABELS: Record<DurationKey, string> = {
    monthly: t("monthly"),
    annual: t("annual"),
    biannual: t("biannual"),
    triannual: t("triannual"),
  };

  /* FAQ items from translations */
  const FAQ_ITEMS = [
    { q: t("faq1q"), a: t("faq1a") },
    { q: t("faq2q"), a: t("faq2a") },
    { q: t("faq3q"), a: t("faq3a") },
    { q: t("faq4q"), a: t("faq4a") },
    { q: t("faq5q"), a: t("faq5a") },
    { q: t("faq6q"), a: t("faq6a") },
  ];

  /* Trust badges */
  const TRUST_BADGES = [
    {
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
        </svg>
      ),
      label: t("trustSecure"),
      desc: t("trustSecureDesc"),
    },
    {
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      label: t("trustNoCommitment"),
      desc: t("trustNoCommitmentDesc"),
    },
    {
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      label: t("trustGuarantee"),
      desc: t("trustGuaranteeDesc"),
    },
    {
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
        </svg>
      ),
      label: t("trustCommunity"),
      desc: t("trustCommunityDesc"),
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-900">

      {/* === SECTION 1 : HERO === */}
      <section className="relative flex min-h-[40vh] flex-col overflow-hidden">
        <Image
          src="/images/pages/wejustice_actions.jpg"
          alt={t("heroTitle")}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_30%]"
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(3, 7, 18, 0.75) 0%, rgba(3, 7, 18, 0.60) 50%, rgba(3, 7, 18, 0.80) 100%)',
          }}
        />
        <div className="relative z-10 mx-auto flex max-w-screen-xl flex-1 flex-col items-center justify-center px-4 py-10 text-center sm:py-16 lg:px-6">
          <h1 className="mb-4 text-3xl font-bold leading-tight tracking-tight text-white lg:text-5xl">
            {t("heroTitle")}
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
            {t.rich("heroText", { sup: (chunks) => <sup>{chunks}</sup> })}
          </p>
          <div className="mx-auto grid max-w-2xl gap-6 sm:grid-cols-3">
            <div className="rounded-lg border border-white/15 bg-white/10 p-5 backdrop-blur-sm">
              <p className="text-2xl font-bold text-white">0 EUR</p>
              <p className="mt-1 text-xs text-white/60">{t("noSubsidy")}</p>
            </div>
            <div className="rounded-lg border border-white/15 bg-white/10 p-5 backdrop-blur-sm">
              <p className="text-2xl font-bold text-white">100%</p>
              <p className="mt-1 text-xs text-white/60">{t("independent")}</p>
            </div>
            <div className="rounded-lg border border-white/15 bg-white/10 p-5 backdrop-blur-sm">
              <p className="text-2xl font-bold text-brand">{locale === "en" ? "You" : "Vous"}</p>
              <p className="mt-1 text-xs text-white/60">
                {t.rich("youAre", { sup: (chunks) => <sup>{chunks}</sup> })}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* === SECTION 2 : CONFIGURATOR + CARDS === */}
      <div className="mx-auto max-w-screen-xl px-4 pb-10 pt-12 lg:px-6">

        {/* Section header */}
        <div className="mb-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
            {t("forCitizens")}
          </p>
          <h2 className="mt-2 text-3xl font-extrabold text-gray-900 dark:text-white">
            {t("choosePlan")}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-gray-500 dark:text-gray-400">
            {t("choosePlanSubtitle")}
          </p>
        </div>

        {/* Duration selector */}
        <div className="mb-8 flex flex-wrap items-center justify-center gap-3">
          <span className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
            {t("durationLabel")}
            <Tooltip content={TOOLTIPS.duration}>
              <span className="inline-flex cursor-help items-center text-gray-400 dark:text-gray-500">
                <svg width="14" height="14" viewBox="0 0 20 20">
                  <circle cx="10" cy="10" r="8.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
                  <text x="10" y="14.5" textAnchor="middle" fontSize="10" fontWeight="600" fill="currentColor" fontFamily="sans-serif">?</text>
                </svg>
              </span>
            </Tooltip>
          </span>
          <div className="flex flex-wrap gap-2">
            {DURATIONS.map((d) => (
              <button
                key={d.key}
                onClick={() => { setDuration(d.key); setSelectedPlan(null); }}
                className={`rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
                  duration === d.key
                    ? "text-white"
                    : "border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 dark:border-white/[0.08] dark:bg-gray-900 dark:text-gray-400 dark:hover:border-white/[0.14] dark:hover:bg-gray-800"
                }`}
                style={duration === d.key ? { backgroundColor: 'var(--color-brand)' } : undefined}
              >
                {DURATION_LABELS[d.key]}
                {d.discountPercent && (
                  <span className="ml-1 inline-block rounded bg-green-100 px-1.5 py-0.5 text-[10px] font-semibold text-green-700 dark:bg-green-900/30 dark:text-green-300">
                    -{d.discountPercent}%
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Cards */}
        <div className={`mb-8 flex gap-6 overflow-x-auto pb-4 pt-4 lg:grid lg:overflow-visible ${visiblePlans.length <= 3 ? "lg:grid-cols-3 lg:max-w-4xl lg:mx-auto" : "lg:grid-cols-4"}`}>
          {visiblePlans.map((plan) => {
            const priceResult = calculatePrice(plan.id, 1, duration, isReduced);
            return (
              <PricingCard
                key={plan.id}
                plan={plan}
                price={priceResult}
                isReduced={isReduced}
                onChoose={() => handleChoose(plan)}
              />
            );
          })}
        </div>

        {/* Reduced toggle */}
        <div className="mb-8 flex flex-col items-center">
          {isReduced && (
            <div className="mb-3 max-w-md rounded-lg border border-amber-300 bg-amber-50 p-3 text-center text-xs text-amber-800 dark:border-amber-600/40 dark:bg-amber-900/20 dark:text-amber-300">
              {t("reducedRateInfo")}
            </div>
          )}
          <button
            role="switch"
            aria-checked={isReduced}
            onClick={handleReducedToggle}
            className="flex items-center gap-3"
          >
            <div
              className={`relative h-6 w-11 rounded-full transition-colors ${
                isReduced ? "bg-brand" : "bg-gray-300 dark:bg-gray-600"
              }`}
            >
              <div
                className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                  isReduced ? "translate-x-[22px]" : "translate-x-0.5"
                }`}
              />
            </div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {t("reducedRate")}
            </span>
          </button>
        </div>

        {/* Step 2: Don libre */}
        {selectedPlan && (
          <div ref={donLibreRef}>
            <DonLibreStep
              plan={selectedPlan}
              price={calculatePrice(selectedPlan.id, 1, duration, isReduced)}
              isReduced={isReduced}
              durationLabel={currentDuration.label}
              onBack={() => setSelectedPlan(null)}
            />
          </div>
        )}
      </div>

      {/* === JOIN FREE === */}
      <div className="mx-auto max-w-screen-xl px-4 pb-10 lg:px-6">
        <div className="mx-auto max-w-lg rounded-lg border border-gray-200 p-6 text-center dark:border-white/[0.08]">
          <h3 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">
            {t("joinFreeTitle")}
          </h3>
          <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
            {t("joinFreeSubtitle")}
          </p>
          <ul className="mx-auto mb-5 flex max-w-xs flex-col gap-1.5 text-left">
            {[t("joinFreeFeature1"), t("joinFreeFeature2"), t("joinFreeFeature3")].map((feature) => (
              <li key={feature} className="flex items-center gap-2">
                <svg className="h-3.5 w-3.5 flex-shrink-0 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-xs text-gray-600 dark:text-gray-400">{feature}</span>
              </li>
            ))}
          </ul>
          <CTAButton
            variant="outline"
            size="md"
            onClick={() => { setSignupPlan("free"); setShowSignup(true); }}
          >
            {t("createFreeAccount")}
          </CTAButton>
        </div>
      </div>

      {/* === TRUST BADGES BAR === */}
      <ScrollReveal>
        <div className="border-y border-gray-200 bg-gray-50 py-8 dark:border-white/[0.08] dark:bg-gray-900">
          <div className="mx-auto grid max-w-screen-xl grid-cols-2 gap-6 px-4 lg:grid-cols-4 lg:px-6">
            {TRUST_BADGES.map((badge) => (
              <div key={badge.label} className="flex items-center gap-3">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-white text-gray-600 shadow-sm dark:bg-gray-700 dark:text-gray-300">
                  {badge.icon}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{badge.label}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{badge.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* === SECTION 3 : ORGANISATIONS === */}
      <div className="border-t border-gray-200 bg-gray-50 py-16 dark:border-white/[0.08] dark:bg-gray-900/30">
        <div className="mx-auto max-w-screen-xl px-4 lg:px-6">
          <div className="mb-4 flex items-center gap-3">
            <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />
            <span className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">
              {t("forOrganizations")}
            </span>
            <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />
          </div>
          <ScrollReveal>
            <div className="mx-auto mb-10 max-w-xl text-center">
              <h2 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white lg:text-3xl">
                {t("orgTitle")}
              </h2>
              <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                {t("orgSubtitle")}
              </p>
            </div>
          </ScrollReveal>
          <OrganisationsTable />
        </div>
      </div>

      {/* === SECTION 4 : FAQ === */}
      <div className="mx-auto max-w-screen-xl px-4 py-16 lg:px-6">
        <div className="mx-auto max-w-2xl">
          <ScrollReveal>
            <h2 className="mb-8 text-center text-2xl font-bold text-gray-900 dark:text-white">
              {t("faqTitle")}
            </h2>
          </ScrollReveal>
          <div>
            {FAQ_ITEMS.map((item, i) => (
              <ScrollReveal key={i} delay={0.04 * i} distance={12}>
                <FaqItem q={item.q} a={item.a} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>

      {/* === SIGNUP MODAL === */}
      {showSignup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-lg bg-white p-8 dark:bg-gray-900">
            <h2 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
              {t("signupTitle")}
            </h2>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
              {t("signupPlanLabel")} <span className="font-semibold text-gray-900 dark:text-white">{signupPlanLabel}</span>
            </p>
            <form onSubmit={handleSignupSubmit} className="space-y-4">
              <div>
                <label htmlFor="signup-prenom" className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t("signupFirstName")}
                </label>
                <input
                  id="signup-prenom"
                  type="text"
                  placeholder={t("signupFirstNamePlaceholder")}
                  required
                  className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 focus:border-brand focus:ring-1 focus:ring-brand dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 dark:focus:border-brand dark:focus:ring-brand"
                />
              </div>
              <div>
                <label htmlFor="signup-nom" className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t("signupLastName")}
                </label>
                <input
                  id="signup-nom"
                  type="text"
                  placeholder={t("signupLastNamePlaceholder")}
                  required
                  className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 focus:border-brand focus:ring-1 focus:ring-brand dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 dark:focus:border-brand dark:focus:ring-brand"
                />
              </div>
              <div>
                <label htmlFor="signup-email" className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t("signupEmail")}
                </label>
                <input
                  id="signup-email"
                  type="email"
                  placeholder={t("signupEmailPlaceholder")}
                  required
                  className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 focus:border-brand focus:ring-1 focus:ring-brand dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 dark:focus:border-brand dark:focus:ring-brand"
                />
              </div>
              <CTAButton type="submit" fullWidth size="lg">
                {t("signupSubmit")}
              </CTAButton>
            </form>
            <button
              onClick={() => setShowSignup(false)}
              className="mt-4 w-full text-center text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              {t("close")}
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
