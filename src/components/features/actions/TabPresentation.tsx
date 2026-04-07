"use client";

/**
 * TabPresentation - Premium AIDA landing page for an action
 *
 * Sections: Problem (with stat cards) → Evidence (Flowbite Cards) →
 * Demands (styled checklist) → Milestones → Victim Testimonials →
 * Initiator → Legal Team → How It Works
 *
 * Uses Flowbite Card, Badge, Avatar, Rating + ScrollReveal animations.
 */

import { Card, Avatar, Badge, Rating, RatingStar } from "flowbite-react";
import { MilestoneTracker } from "./MilestoneTracker";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { AnimatedCounter } from "@/components/animations/AnimatedCounter";

interface Initiator {
  name: string;
  role: string;
  bio: string;
  url: string;
  avatarColor: string;
}

interface TabPresentationProps {
  problem: { headline: string; description: string; keyFacts: { value: string; unit: string; label: string }[] };
  evidence: { title: string; type: string; description: string }[];
  demands: string[];
  currentSignatures: number;
  victimTestimonials: { name: string; quote: string; amount: string | null }[];
  initiator?: Initiator | null;
  lawyer: { name: string; firm: string; bio?: string; cases?: number };
  target: string;
  howItWorks: { step: number; title: string; description: string }[];
}

const EVIDENCE_ICONS: Record<string, { path: string; color: string }> = {
  report: {
    path: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
    color: "text-blue-500 dark:text-blue-400",
  },
  legal: {
    path: "M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3",
    color: "text-purple-500 dark:text-purple-400",
  },
  media: {
    path: "M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z",
    color: "text-amber-500 dark:text-amber-400",
  },
};

const EVIDENCE_TYPE_LABELS: Record<string, string> = {
  report: "Rapport",
  legal: "Juridique",
  media: "Presse",
};

export function TabPresentation({ problem, evidence, demands, currentSignatures, victimTestimonials, initiator, lawyer, target, howItWorks }: TabPresentationProps) {
  return (
    <div className="space-y-12">
      {/* ─── 1. LE PROBLEME ─── */}
      <ScrollReveal>
        <section>
          <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
            {problem.headline}
          </h3>
          <p className="mb-6 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
            {problem.description}
          </p>

          {/* Key Facts — Premium stat cards with animated counters */}
          <div className="grid auto-rows-[1fr] gap-4 sm:grid-cols-3">
            {problem.keyFacts.map((fact, i) => (
              <ScrollReveal key={fact.label} delay={0.08 * i} className="flex">
                <div className="flex w-full flex-col items-center justify-center rounded-lg border border-gray-200 bg-white p-5 text-center dark:border-gray-700 dark:bg-gray-800">
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {/^\d+$/.test(fact.value.replace(/\s/g, "")) ? (
                      <AnimatedCounter value={parseInt(fact.value.replace(/\s/g, ""), 10)} duration={1.8} />
                    ) : (
                      fact.value
                    )}
                    {fact.unit && (
                      <span className="ml-1 text-base font-medium text-gray-500 dark:text-gray-400">{fact.unit}</span>
                    )}
                  </p>
                  <p className="mt-1 text-xs font-medium text-gray-500 dark:text-gray-400">{fact.label}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* ─── 2. LES PREUVES — Flowbite Cards ─── */}
      {evidence.length > 0 && (
        <ScrollReveal>
          <section>
            <h3 className="mb-4 flex items-center gap-2 text-base font-bold text-gray-900 dark:text-white">
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
              Sources et preuves
            </h3>
            <div className="space-y-3">
              {evidence.map((item, i) => {
                const iconConfig = EVIDENCE_ICONS[item.type] || EVIDENCE_ICONS.report;
                return (
                  <ScrollReveal key={item.title} delay={0.06 * i}>
                    <Card className="border-gray-200 transition-all duration-200 hover:shadow-sm dark:border-gray-700">
                      <div className="flex items-start gap-4">
                        <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-700 ${iconConfig.color}`}>
                          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d={iconConfig.path} />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <div className="mb-1 flex items-center gap-2">
                            <p className="text-sm font-semibold text-gray-900 dark:text-white">{item.title}</p>
                            <Badge color="gray" size="xs">
                              {EVIDENCE_TYPE_LABELS[item.type] || item.type}
                            </Badge>
                          </div>
                          <p className="text-xs leading-relaxed text-gray-500 dark:text-gray-400">{item.description}</p>
                        </div>
                      </div>
                    </Card>
                  </ScrollReveal>
                );
              })}
            </div>
          </section>
        </ScrollReveal>
      )}

      {/* ─── 3. NOS DEMANDES — Styled checklist ─── */}
      {demands.length > 0 && (
        <ScrollReveal>
          <section>
            <h3 className="mb-4 flex items-center gap-2 text-base font-bold text-gray-900 dark:text-white">
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Nos demandes
            </h3>
            <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
              <ul className="space-y-4">
                {demands.map((demand, i) => (
                  <ScrollReveal key={i} delay={0.05 * i} distance={12}>
                    <li className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-white" style={{ backgroundColor: 'var(--color-brand)' }}>
                        <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                      <span className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">{demand}</span>
                    </li>
                  </ScrollReveal>
                ))}
              </ul>
            </div>
          </section>
        </ScrollReveal>
      )}

      {/* ─── 4. PALIERS ─── */}
      <ScrollReveal>
        <section>
          <h3 className="mb-2 text-base font-bold text-gray-900 dark:text-white">
            Chaque signature nous rapproche de l&apos;objectif
          </h3>
          <p className="mb-4 text-xs text-gray-500 dark:text-gray-400">
            A chaque palier atteint, une nouvelle etape juridique se declenche.
          </p>
          <MilestoneTracker currentSignatures={currentSignatures} />
        </section>
      </ScrollReveal>

      {/* ─── 5. TEMOIGNAGES VICTIMES — Flowbite Cards with Rating ─── */}
      {victimTestimonials.length > 0 && (
        <ScrollReveal>
          <section>
            <h3 className="mb-4 flex items-center gap-2 text-base font-bold text-gray-900 dark:text-white">
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
              </svg>
              Ils temoignent
            </h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {victimTestimonials.map((t, i) => (
                <ScrollReveal key={t.name} delay={0.06 * i}>
                  <Card className="h-full border-gray-200 dark:border-gray-700">
                    <div className="flex h-full flex-col">
                      <Rating className="mb-2" size="sm">
                        <RatingStar />
                        <RatingStar />
                        <RatingStar />
                        <RatingStar />
                        <RatingStar />
                      </Rating>
                      <blockquote className="flex-1">
                        <p className="text-sm italic leading-relaxed text-gray-600 dark:text-gray-400">
                          &ldquo;{t.quote}&rdquo;
                        </p>
                      </blockquote>
                      <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-3 dark:border-gray-700">
                        <span className="text-sm font-semibold text-gray-900 dark:text-white">{t.name}</span>
                        {t.amount && (
                          <Badge color="success" size="xs">
                            {t.amount}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </Card>
                </ScrollReveal>
              ))}
            </div>
          </section>
        </ScrollReveal>
      )}

      {/* ─── 6. INITIATEUR ─── */}
      {initiator && (
        <ScrollReveal>
          <section>
            <h3 className="mb-4 text-base font-bold text-gray-900 dark:text-white">
              A l&apos;initiative de cette action
            </h3>
            <Card className="border-2 border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-900/20">
              <div className="flex items-start gap-4">
                <div
                  className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full text-lg font-bold text-white"
                  style={{ backgroundColor: initiator.avatarColor }}
                >
                  {initiator.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <p className="text-base font-bold text-gray-900 dark:text-white">{initiator.name}</p>
                  <p className="text-xs font-medium text-blue-600 dark:text-blue-400">{initiator.role}</p>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">{initiator.bio}</p>
                  <a
                    href={initiator.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
                  >
                    Visiter {initiator.url.replace('https://', '').replace('/', '')}
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            </Card>
          </section>
        </ScrollReveal>
      )}

      {/* ─── 7. L'EQUIPE JURIDIQUE ─── */}
      <ScrollReveal>
        <section>
          <h3 className="mb-4 flex items-center gap-2 text-base font-bold text-gray-900 dark:text-white">
            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
            </svg>
            L&apos;equipe juridique
          </h3>
          <Card className="border-gray-200 dark:border-gray-700">
            <div className="flex items-start gap-4">
              <Avatar placeholderInitials={lawyer.name.charAt(4)} rounded size="md" />
              <div className="flex-1">
                <p className="text-sm font-bold text-gray-900 dark:text-white">{lawyer.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{lawyer.firm}</p>
                {lawyer.bio && <p className="mt-2 text-xs leading-relaxed text-gray-600 dark:text-gray-400">{lawyer.bio}</p>}
                {lawyer.cases && (
                  <Badge color="purple" size="xs" className="mt-2 inline-flex">
                    {lawyer.cases} affaires traitees
                  </Badge>
                )}
              </div>
            </div>
          </Card>
          <div className="mt-3 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Entite visee</p>
            <p className="mt-1 text-sm font-medium text-gray-900 dark:text-white">{target}</p>
          </div>
        </section>
      </ScrollReveal>

      {/* ─── 8. COMMENT CA MARCHE ─── */}
      {howItWorks.length > 0 && (
        <ScrollReveal>
          <section>
            <h3 className="mb-4 text-base font-bold text-gray-900 dark:text-white">
              Comment ca marche
            </h3>
            <div className="grid gap-4 sm:grid-cols-3">
              {howItWorks.map(({ step, title, description }, i) => (
                <ScrollReveal key={step} delay={0.08 * i}>
                  <div className="flex gap-3 rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
                    <div className="step-circle flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold">
                      {step}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900 dark:text-white">{title}</p>
                      <p className="mt-1 text-xs leading-relaxed text-gray-500 dark:text-gray-400">{description}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </section>
        </ScrollReveal>
      )}
    </div>
  );
}
