"use client";

/**
 * ActionDetailClient - Full action detail page
 *
 * Composition of library components:
 * - Hero with parallax image, animated counter, share buttons, urgency badges
 * - Tabbed content (Presentation / Suivi / Communaute)
 * - Sticky sidebar with SignatureForm (desktop)
 * - StickySignCTA (mobile)
 * - Lawyer + target entity signature
 *
 * All state is local - no API calls.
 */

import { useState } from "react";
import { Button, Badge } from "flowbite-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useAuthSafe } from "@/lib/mock-auth";
import { getStatusLabel } from "@/components/ui/StatusBadge";
import { SignatureForm } from "@/components/features/actions/SignatureForm";
import { ShareButtons } from "@/components/features/actions/ShareButtons";
import { StickySignCTA } from "@/components/features/actions/StickySignCTA";
import { MilestoneProgress } from "@/components/features/actions/MilestoneProgress";
import { SocialProofBanner } from "@/components/features/actions/SocialProofBanner";
import { UrgencyNearMilestone } from "@/components/features/actions/UrgencyNearMilestone";
import { TabPresentation } from "@/components/features/actions/TabPresentation";
import { TabSuivi } from "@/components/features/actions/TabSuivi";
import { TabCommunaute } from "@/components/features/actions/TabCommunaute";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { AnimatedCounter } from "@/components/animations/AnimatedCounter";
import actionsData from "@/mocks/actions.json";

type TabId = "presentation" | "suivi" | "communaute";

const TABS: { id: TabId; label: string; desc: string }[] = [
  { id: "presentation", label: "L'action", desc: "Comprendre le combat" },
  { id: "suivi", label: "Suivi & resultats", desc: "Transparence totale" },
  { id: "communaute", label: "Communauté", desc: "Échangez ensemble" },
];

export function ActionDetailClient({ actionId }: { actionId: string }) {
  const params = useParams();
  const locale = (params?.locale as string) || "fr";
  const { user } = useAuthSafe();
  const [hasSigned, setHasSigned] = useState(false);
  const [sigCount, setSigCount] = useState(0);
  const [activeTab, setActiveTab] = useState<TabId>("presentation");

  // Live readers counter (mock - random 15-45, stable per session)
  const [liveReaders] = useState(() => Math.floor(Math.random() * 31) + 15);

  /** Switch tab without scroll jump - lock scroll position during re-render */
  const switchTab = (tab: TabId) => {
    const y = window.scrollY;
    setActiveTab(tab);
    requestAnimationFrame(() => window.scrollTo(0, y));
  };

  const action = actionsData.find((a) => a.id === actionId || a.slug === actionId);

  if (!action) {
    return (
      <div className="py-32 text-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Action introuvable</h1>
        <Button as={Link} href={`/${locale}/actions`} color="light" className="mt-6">
          Retour aux actions
        </Button>
      </div>
    );
  }

  const currentSigs = action.signatures.current + sigCount;
  const pct = Math.min(100, Math.round((currentSigs / action.signatures.goal) * 100));

  const handleSign = () => {
    setHasSigned(true);
    setSigCount((c) => c + 1);
  };

  return (
    <div>
      {/* ═══ HERO ═══ */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${action.image})` }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to right, rgba(3, 7, 18, 0.85) 0%, rgba(3, 7, 18, 0.70) 50%, rgba(3, 7, 18, 0.55) 100%)',
          }}
        />

        <div className="relative z-10 mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16">
          {/* Back link */}
          <a href={`/${locale}/actions`} className="mb-6 inline-flex items-center gap-1 text-sm text-white/70 hover:text-white">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Actions
          </a>

          {/* Labels */}
          <div className="mb-4 flex flex-wrap gap-2">
            <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-gray-900">
              #{action.tag}
            </span>
            {action.themes.slice(0, 3).map((theme) => (
              <span key={theme} className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium capitalize text-white">
                {theme}
              </span>
            ))}
            <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-green-300">
              {getStatusLabel(action.status)}
            </span>
          </div>

          {/* Title */}
          <h1 className="mb-3 max-w-3xl text-3xl font-bold text-white lg:text-5xl">
            {action.title}
          </h1>

          {/* Description */}
          <p className="mb-6 max-w-2xl text-base text-white/80 lg:text-lg">
            {action.description}
          </p>

          {/* Counter + Milestone progress */}
          <div className="mb-6 max-w-lg">
            <div className="mb-2 flex items-baseline gap-2">
              <span className="text-4xl font-bold text-white">
                <AnimatedCounter value={currentSigs} duration={2} />
              </span>
              <span className="text-sm text-white/60">
                / {action.signatures.goal.toLocaleString("fr-FR")} signatures
              </span>
            </div>
            <div className="[&_*]:!border-white/20 [&_p]:text-white/70 [&_span]:text-white/80">
              <MilestoneProgress
                currentSignatures={currentSigs}
                goalSignatures={action.signatures.goal}
                variant="compact"
              />
            </div>
          </div>

          {/* Live readers + Share */}
          <div className="mb-4 flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
            </span>
            <span className="text-xs text-white/70">{liveReaders} personnes lisent cette page</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-white/60">Partager :</span>
            <ShareButtons
              url={`https://wejustice.legal/actions/${action.slug}`}
              title={action.title}
              hashtag={action.tag}
              variant="icon-row"
            />
          </div>
        </div>
      </section>

      {/* ═══ SOCIAL PROOF BANNER ═══ */}
      <div className="border-b border-gray-100 bg-white px-4 py-3 dark:border-gray-800 dark:bg-gray-900">
        <div className="mx-auto max-w-screen-xl lg:px-6">
          <SocialProofBanner
            signaturesThisWeek={action.signaturesThisWeek}
            liveReaders={liveReaders}
          />
        </div>
      </div>

      {/* ═══════════════════════════════════════════════
          MAIN CONTENT - 2-column layout
          ═══════════════════════════════════════════════ */}
      <section className="bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-screen-xl px-4 py-6 lg:flex lg:gap-10 lg:px-6 lg:py-16">
          {/* Left: Content */}
          <div className="flex-1">
            {/* ─── Urgency banner (near milestone) ─── */}
            <div className="mb-4">
              <UrgencyNearMilestone currentSignatures={currentSigs} />
            </div>

            {/* ─── Mobile: Signature form FIRST (above the fold) ─── */}
            <div className="mb-6 lg:hidden">
              <SignatureForm
                actionId={action.slug}
                hashtag={action.tag}
                signatureCount={currentSigs}
                signatureGoal={action.signatures.goal}
                signaturesThisWeek={action.signaturesThisWeek}
                hasSigned={hasSigned}
                onSign={handleSign}
                locale={locale}
              />
            </div>

            {/* Tabs — premium underline style */}
            <div className="mb-8 border-b border-gray-200 dark:border-white/[0.08]">
              <nav className="flex gap-1">
                {TABS.map(({ id, label, desc }) => (
                  <button
                    key={id}
                    onClick={() => switchTab(id)}
                    className={`relative flex flex-col items-center px-4 pb-3 pt-1 text-center transition-colors ${
                      activeTab === id
                        ? "text-gray-900 dark:text-white"
                        : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                    }`}
                  >
                    <span className="text-sm font-semibold">{label}</span>
                    <span className="mt-0.5 text-2xs text-gray-400 dark:text-gray-500">{desc}</span>
                    {/* Active indicator */}
                    {activeTab === id && (
                      <span className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-brand" />
                    )}
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab content - pure composition via library components */}
            {activeTab === "presentation" && (
              <TabPresentation
                problem={action.problem}
                evidence={action.evidence}
                demands={action.demands}
                currentSignatures={currentSigs}
                victimTestimonials={action.victimTestimonials}
                initiator={(action as Record<string, unknown>).initiator as { name: string; role: string; bio: string; url: string; avatarColor: string } | undefined}
                lawyer={action.lawyer}
                target={action.target}
                howItWorks={action.howItWorks}
              />
            )}

            {activeTab === "suivi" && (
              <TabSuivi
                currentSignatures={currentSigs}
                timeline={action.timeline as { date: string; label: string; type: string; description: string; side?: "nous" | "adversaire"; document?: string }[]}
                funds={action.funds as { totalCollected: number; totalSpent: number; categories: { label: string; amount: number; pct: number; color: string }[] }}
                results={action.results}
                nextStep={action.nextStep}
              />
            )}

            {activeTab === "communaute" && (
              <TabCommunaute
                actionId={action.slug}
                signaturesThisWeek={action.signaturesThisWeek}
                totalSignatures={currentSigs}
              />
            )}
          </div>

          {/* Right: Signature sidebar (desktop only, sticky) */}
          <div className="hidden lg:mt-0 lg:block lg:w-96 lg:flex-shrink-0">
            <div className="sticky top-24">
              <SignatureForm
                actionId={action.slug}
                hashtag={action.tag}
                signatureCount={currentSigs}
                signatureGoal={action.signatures.goal}
                signaturesThisWeek={action.signaturesThisWeek}
                hasSigned={hasSigned}
                onSign={handleSign}
                locale={locale}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          MOBILE STICKY CTA (lg:hidden)
          ═══════════════════════════════════════════════ */}
      <StickySignCTA
        actionId={action.slug}
        hashtag={action.tag}
        signatureCount={currentSigs}
        signatureGoal={action.signatures.goal}
        hasSigned={hasSigned}
        onSign={handleSign}
      />
    </div>
  );
}
