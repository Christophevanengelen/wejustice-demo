"use client";

/**
 * TarifsClient - Premium pricing page with comparison table.
 *
 * Marketing-grade layout:
 * 1. Hero with value proposition + trust signals
 * 2. Configurator (seats, duration) + 4 plan cards
 * 3. Comparison table toggle (Flowbite Table)
 * 4. Don libre step (after CTA)
 * 5. Trust badges bar
 * 6. Organisations section
 * 7. FAQ (Flowbite Accordion pattern)
 */

import { useState, useRef, type FormEvent } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Tooltip } from "flowbite-react";
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

/* ─── FAQ Data ─── */
const FAQ_ITEMS = [
  {
    q: "Quelle est la diff\u00e9rence entre signer et rejoindre ?",
    a: "Signer une action est gratuit et illimit\u00e9 : cela exprime votre soutien. Rejoindre signifie devenir partie prenante de l'action en Justice, ce qui est encadr\u00e9 par votre forfait.",
  },
  {
    q: "Puis-je changer de forfait en cours de route ?",
    a: "Oui, vous pouvez passer \u00e0 un forfait sup\u00e9rieur \u00e0 tout moment. La diff\u00e9rence sera calcul\u00e9e au prorata de votre engagement restant.",
  },
  {
    q: "Qu'est-ce que le tarif r\u00e9duit ?",
    a: "Le tarif r\u00e9duit (-50%) est r\u00e9serv\u00e9 aux personnes en situation de pr\u00e9carit\u00e9 (ch\u00f4mage, \u00e9tudiants, faibles retraites). Un justificatif peut \u00eatre demand\u00e9.",
  },
  {
    q: "Comment fonctionne le forfait groupe ?",
    a: "Avec les forfaits Plus (2 pers.), Maxi (3 pers.) ou Aura (4 pers.), vous financez l'abonnement de vos proches. Chacun a son propre compte et ses propres actions.",
  },
  {
    q: "Mon don libre est-il d\u00e9ductible des imp\u00f4ts ?",
    a: "Wejustice est en cours d'obtention du statut d'int\u00e9r\u00eat g\u00e9n\u00e9ral. Nous vous tiendrons inform\u00e9 d\u00e8s que la d\u00e9ductibilit\u00e9 fiscale sera active.",
  },
  {
    q: "Que se passe-t-il si je ne renouvelle pas ?",
    a: "Vos signatures restent actives. Vous ne pourrez simplement plus rejoindre de nouvelles actions tant que vous n'aurez pas r\u00e9activ\u00e9 un forfait.",
  },
];

/* ─── Trust badges ─── */
const TRUST_BADGES = [
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    label: "Paiement s\u00e9curis\u00e9",
    desc: "Chiffrement SSL 256-bit",
  },
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    label: "Sans engagement",
    desc: "R\u00e9siliable \u00e0 tout moment",
  },
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    label: "Satisfait ou rembours\u00e9",
    desc: "Garantie 30 jours",
  },
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
    label: "+15 000 citoyens",
    desc: "Communaut\u00e9 active",
  },
];

/* ─── Comparison table features ─── */
const COMPARISON_FEATURES = [
  { label: "Gazette mensuelle", mini: true, plus: true, maxi: true, aura: true },
  { label: "Support en ligne", mini: true, plus: true, maxi: true, aura: true },
  { label: "Actions rejoignables", mini: "1", plus: "2", maxi: "5", aura: "Illimit\u00e9" },
  { label: "Rejoindre les proces", mini: true, plus: true, maxi: true, aura: true },
  { label: "B\u00e9n\u00e9ficiaires max", mini: "1", plus: "2", maxi: "3", aura: "4" },
  { label: "R\u00e9duction groupe", mini: false, plus: "-40%", maxi: "-50%", aura: "-50%" },
  { label: "Tarif r\u00e9duit disponible", mini: true, plus: true, maxi: true, aura: false },
];

/* ─── FAQ Item component ─── */
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

/* ─── Check/Cross icons for comparison table ─── */
function CheckIcon() {
  return (
    <svg className="mx-auto h-4 w-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
  );
}

function CrossIcon() {
  return (
    <svg className="mx-auto h-4 w-4 text-gray-300 dark:text-gray-600" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
  );
}

function CellValue({ val }: { val: boolean | string }) {
  if (val === true) return <CheckIcon />;
  if (val === false) return <CrossIcon />;
  return <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{val}</span>;
}

/* ─── Main Component ─── */
export function TarifsClient() {
  const params = useParams();
  const locale = (params?.locale as string) || "fr";
  const [seats, setSeats] = useState(1);
  const [duration, setDuration] = useState<DurationKey>("annual");
  const [isReduced, setIsReduced] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [showComparison, setShowComparison] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [signupPlan, setSignupPlan] = useState<string | null>(null);

  const donLibreRef = useRef<HTMLDivElement>(null);

  const visiblePlans = isReduced ? PLANS.filter((p) => p.id !== "aura") : PLANS;

  const handleChoose = (plan: Plan) => {
    setSignupPlan(plan.id);
    setShowSignup(true);
    setSelectedPlan(plan);
  };

  const handleSignupSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Demo mode — redirect to /compte
    window.location.href = `/${locale}/compte`;
  };

  const signupPlanLabel = signupPlan === "free"
    ? "Gratuit"
    : PLANS.find((p) => p.id === signupPlan)?.name || "";

  const handleReducedToggle = () => {
    const next = !isReduced;
    setIsReduced(next);
    if (next) {
      setSeats(1);
      setSelectedPlan(null);
    }
  };

  const handleSeatDown = () => {
    if (seats > 1) { setSeats(seats - 1); setSelectedPlan(null); }
  };

  const handleSeatUp = () => {
    if (seats < 4) { setSeats(seats + 1); setSelectedPlan(null); }
  };

  const currentDuration = DURATIONS.find((d) => d.key === duration)!;

  return (
    <div className="bg-white dark:bg-gray-900">

      {/* ═══ SECTION 1 : HERO ═══ */}
      <section className="relative flex min-h-[40vh] flex-col overflow-hidden">
        <Image
          src="/images/pages/wejustice_actions.jpg"
          alt="Citoyens mobilisés pour la justice collective"
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
            Activez le 5<sup className="text-lg">e</sup> pouvoir
          </h1>
          <p className="mx-auto mb-6 max-w-2xl text-base text-white/80 sm:text-lg">
            Chaque citoyen peut agir en Justice pour défendre ses droits.
            Choisissez votre forfait, rejoignez les actions, et devenez acteur du changement.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-white/60">
            <span className="flex items-center gap-1.5">
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              Paiement sécurisé
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              Sans engagement
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              +15 000 citoyens
            </span>
          </div>
        </div>
      </section>

      {/* ═══ POURQUOI UN ABONNEMENT ═══ */}
      <section className="border-b border-gray-200 bg-gray-50 py-12 dark:border-white/[0.08] dark:bg-gray-900 lg:py-16">
        <div className="mx-auto max-w-screen-xl px-4 lg:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white lg:text-3xl">
              Pourquoi votre soutien est essentiel
            </h2>
            <p className="mb-6 text-base leading-relaxed text-gray-600 dark:text-gray-300">
              Wejustice ne reçoit aucune subvention, aucun financement public, aucune aide privée.
              Notre indépendance totale est le prix de notre liberté d&apos;action.
              Nous ne vivons que par le soutien de nos membres. C&apos;est la seule façon
              pour le 5<sup>ème</sup> pouvoir d&apos;exister et de rester accessible au plus grand nombre.
            </p>
            <div className="mx-auto grid max-w-2xl gap-6 sm:grid-cols-3">
              <div className="rounded-lg border border-gray-200 bg-white p-5 dark:border-white/[0.08] dark:bg-gray-900">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">0 €</p>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">De subvention publique</p>
              </div>
              <div className="rounded-lg border border-gray-200 bg-white p-5 dark:border-white/[0.08] dark:bg-gray-900">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">100%</p>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Indépendant</p>
              </div>
              <div className="rounded-lg border border-gray-200 bg-white p-5 dark:border-white/[0.08] dark:bg-gray-900">
                <p className="text-2xl font-bold text-brand">Vous</p>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Êtes le 5<sup>ème</sup> pouvoir</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 2 : CITOYENS - CONFIGURATOR + CARDS ═══ */}
      <div className="mx-auto max-w-screen-xl px-4 pb-10 pt-12 lg:px-6">

        {/* Section header */}
        <div className="mb-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
            Pour les citoyens
          </p>
          <h2 className="mt-2 text-3xl font-extrabold text-gray-900 dark:text-white">
            Choisissez votre forfait
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-gray-500 dark:text-gray-400">
            Votre abonnement finance les procédures, les avocats et les outils qui rendent la Justice accessible.
          </p>
        </div>

        {/* Seat selector (hidden in reduced mode) */}
        {!isReduced && (
          <div className="mb-6 flex flex-wrap items-center justify-center gap-4">
            <span className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
              Bénéficiaires
              <Tooltip content={TOOLTIPS.seats}>
                <span className="inline-flex cursor-help items-center text-gray-400 dark:text-gray-500">
                  <svg width="14" height="14" viewBox="0 0 20 20">
                    <circle cx="10" cy="10" r="8.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
                    <text x="10" y="14.5" textAnchor="middle" fontSize="10" fontWeight="600" fill="currentColor" fontFamily="sans-serif">?</text>
                  </svg>
                </span>
              </Tooltip>
            </span>
            <div className="flex items-center gap-3">
              <button
                onClick={handleSeatDown}
                disabled={seats <= 1}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-brand text-sm font-bold text-white transition-opacity disabled:opacity-30"
              >
                -
              </button>
              <span className="min-w-[60px] text-center text-sm font-semibold text-gray-900 dark:text-white">
                {seats} pers.
              </span>
              <button
                onClick={handleSeatUp}
                disabled={seats >= 4}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-brand text-sm font-bold text-white transition-opacity disabled:opacity-30"
              >
                +
              </button>
            </div>
          </div>
        )}

        {/* Duration selector */}
        <div className="mb-8 flex flex-wrap items-center justify-center gap-3">
          <span className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
            Durée
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
                {d.label}
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
        <div className={`mb-8 flex gap-6 overflow-x-auto pb-4 lg:grid lg:overflow-visible ${visiblePlans.length <= 3 ? "lg:grid-cols-3 lg:max-w-4xl lg:mx-auto" : "lg:grid-cols-4"}`}>
          {visiblePlans.map((plan) => {
            const priceResult = calculatePrice(plan.id, seats, duration, isReduced);
            return (
              <PricingCard
                key={plan.id}
                plan={plan}
                price={priceResult}
                seats={seats}
                isReduced={isReduced}
                onChoose={() => handleChoose(plan)}
              />
            );
          })}
        </div>

        {/* Comparison table toggle */}
        <ScrollReveal>
          <div className="mb-8 text-center">
            <button
              onClick={() => setShowComparison(!showComparison)}
              className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-gray-50 px-5 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
              </svg>
              {showComparison ? "Masquer la comparaison" : "Comparer les forfaits"}
              <svg className={`h-3 w-3 transition-transform duration-200 ${showComparison ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </ScrollReveal>

        {/* Comparison table — HTML natif (Flowbite Table cassait le dark mode) */}
        {showComparison && (
            <div className="mb-10 overflow-x-auto rounded-lg border border-gray-200 dark:border-white/[0.08]">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50 text-xs uppercase text-gray-700 dark:border-white/[0.08] dark:bg-gray-800 dark:text-gray-300">
                    <th className="px-6 py-4">Fonctionnalité</th>
                    {PLANS.map((p) => (
                      <th key={p.id} className="px-4 py-4 text-center">
                        <span className="font-bold normal-case text-gray-900 dark:text-white">{p.name}</span>
                        {p.recommended && (
                          <span className="ml-1.5 rounded-full bg-gray-200 px-2 py-0.5 text-[10px] font-medium text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                            Recommandé
                          </span>
                        )}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-white/[0.08]">
                  {COMPARISON_FEATURES.map((feat) => (
                    <tr key={feat.label} className="bg-white dark:bg-gray-900">
                      <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                        {feat.label}
                      </td>
                      <td className="px-4 py-4 text-center"><CellValue val={feat.mini} /></td>
                      <td className="px-4 py-4 text-center"><CellValue val={feat.plus} /></td>
                      <td className="px-4 py-4 text-center"><CellValue val={feat.maxi} /></td>
                      <td className="px-4 py-4 text-center"><CellValue val={feat.aura} /></td>
                    </tr>
                  ))}
                  <tr className="bg-gray-50 font-semibold dark:bg-gray-800">
                    <td className="px-6 py-4 text-sm font-bold text-gray-900 dark:text-white">
                      Prix / mois
                    </td>
                    {PLANS.map((p) => {
                      const pr = calculatePrice(p.id, 1, "annual", false);
                      return (
                        <td key={p.id} className="px-4 py-4 text-center text-sm font-bold text-gray-900 dark:text-white">
                          {pr.pricePerPersonMonthly.toFixed(2).replace(".", ",")} EUR
                        </td>
                      );
                    })}
                  </tr>
                </tbody>
              </table>
            </div>
        )}

        {/* Reduced toggle */}
        <div className="mb-10 flex flex-col items-center">
          <button
            role="switch"
            aria-checked={isReduced}
            onClick={handleReducedToggle}
            className="flex items-center gap-3"
          >
            <div
              className={`relative h-6 w-11 rounded-full transition-colors ${
                isReduced
                  ? "bg-brand"
                  : "bg-gray-300 dark:bg-gray-600"
              }`}
            >
              <div
                className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                  isReduced ? "translate-x-[22px]" : "translate-x-0.5"
                }`}
              />
            </div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Tarif réduit
            </span>
          </button>
          {isReduced && (
            <div className="mt-3 max-w-md rounded-lg bg-gray-100 p-3 text-center text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-300">
              Réservé aux personnes à faibles revenus (précarité, étudiants, chômage, faibles retraites) acceptant de fournir à première demande des justificatifs.
            </div>
          )}
        </div>

        {/* Step 2: Don libre */}
        {selectedPlan && (
          <div ref={donLibreRef}>
            <DonLibreStep
              plan={selectedPlan}
              price={calculatePrice(selectedPlan.id, seats, duration, isReduced)}
              seats={seats}
              isReduced={isReduced}
              durationLabel={currentDuration.label}
              onBack={() => setSelectedPlan(null)}
            />
          </div>
        )}
      </div>

      {/* ═══ REJOINDRE GRATUITEMENT (discreet) ═══ */}
      <div className="mx-auto max-w-screen-xl px-4 pb-10 lg:px-6">
        <div className="mx-auto max-w-lg rounded-lg border border-gray-200 p-6 text-center dark:border-white/[0.08]">
          <h3 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">
            Rejoindre gratuitement
          </h3>
          <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
            Créez votre compte gratuit pour signer des pétitions en illimité.
          </p>
          <ul className="mx-auto mb-5 flex max-w-xs flex-col gap-1.5 text-left">
            {["Signatures illimitées", "Suivi en temps réel", "Communauté citoyenne"].map((feature) => (
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
            Créer mon compte gratuit
          </CTAButton>
        </div>
      </div>

      {/* ═══ TRUST BADGES BAR ═══ */}
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

      {/* ═══ SECTION 3 : ORGANISATIONS ═══ */}
      <div className="border-t border-gray-200 bg-gray-50 py-16 dark:border-white/[0.08] dark:bg-gray-900/30">
        <div className="mx-auto max-w-screen-xl px-4 lg:px-6">

          {/* Section label */}
          <div className="mb-4 flex items-center gap-3">
            <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />
            <span className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">
              Pour les organisations
            </span>
            <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />
          </div>

          {/* Intro text */}
          <ScrollReveal>
            <div className="mx-auto mb-10 max-w-xl text-center">
              <h2 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white lg:text-3xl">
                Vous êtes une organisation ?
              </h2>
              <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                Syndicats, entreprises, associations et ONG : Wejustice vous permet de lancer
                des actions collectives en Justice pour défendre vos membres et votre cause.
              </p>
            </div>
          </ScrollReveal>

          <OrganisationsTable />
        </div>
      </div>

      {/* ═══ SECTION 4 : FAQ ═══ */}
      <div className="mx-auto max-w-screen-xl px-4 py-16 lg:px-6">
        <div className="mx-auto max-w-2xl">
          <ScrollReveal>
            <h2 className="mb-8 text-center text-2xl font-bold text-gray-900 dark:text-white">
              Questions fréquentes
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

      {/* ═══ SIGNUP MODAL ═══ */}
      {showSignup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-lg bg-white p-8 dark:bg-gray-900">
            <h2 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
              Creez votre compte
            </h2>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
              Plan : <span className="font-semibold text-gray-900 dark:text-white">{signupPlanLabel}</span>
            </p>
            <form onSubmit={handleSignupSubmit} className="space-y-4">
              <div>
                <label htmlFor="signup-prenom" className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Prenom
                </label>
                <input
                  id="signup-prenom"
                  type="text"
                  placeholder="Votre prenom"
                  required
                  className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 focus:border-brand focus:ring-1 focus:ring-brand dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 dark:focus:border-brand dark:focus:ring-brand"
                />
              </div>
              <div>
                <label htmlFor="signup-nom" className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Nom
                </label>
                <input
                  id="signup-nom"
                  type="text"
                  placeholder="Votre nom"
                  required
                  className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 focus:border-brand focus:ring-1 focus:ring-brand dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 dark:focus:border-brand dark:focus:ring-brand"
                />
              </div>
              <div>
                <label htmlFor="signup-email" className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email
                </label>
                <input
                  id="signup-email"
                  type="email"
                  placeholder="votre@email.com"
                  required
                  className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 focus:border-brand focus:ring-1 focus:ring-brand dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 dark:focus:border-brand dark:focus:ring-brand"
                />
              </div>
              <CTAButton type="submit" fullWidth size="lg">
                Creer mon compte
              </CTAButton>
            </form>
            <button
              onClick={() => setShowSignup(false)}
              className="mt-4 w-full text-center text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              Fermer
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
