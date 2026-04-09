"use client";

/**
 * Design System - Mini Storybook
 *
 * Displays every component from the demo library side by side,
 * with both light and dark mode variants visible.
 * Use this page to verify visual consistency across components.
 */

import { Badge, Button, Progress } from "flowbite-react";
import { useParams } from "next/navigation";
import { LogoFigma } from "@/components/ui/LogoFigma";
import { ActionCard } from "@/components/features/actions/ActionCard";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { SignatureProgress } from "@/components/ui/SignatureProgress";
import { ThemeTags } from "@/components/ui/ThemeTags";
// PricingCard removed - pricing eliminated from demo scope
import actionsData from "@/mocks/actions.json";

/* ─── Section wrapper for each component showcase ─── */
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-12">
      <h2 className="mb-6 border-b border-gray-200 pb-2 text-lg font-bold text-gray-900 dark:border-gray-700 dark:text-white">
        {title}
      </h2>
      {children}
    </div>
  );
}

export function DesignSystemClient() {
  const params = useParams();
  const locale = (params?.locale as string) || "fr";
  const sampleAction = actionsData[0];

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-12 lg:px-6">
      <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
        Design System
      </h1>
      <p className="mb-12 text-gray-500 dark:text-gray-400">
        Tous les composants de la bibliothèque demo, au même endroit.
      </p>

      {/* ─── Logo ─── */}
      <Section title="LogoFigma">
        <div className="flex flex-wrap items-end gap-8">
          <div>
            <p className="mb-2 text-xs text-gray-400">xs</p>
            <LogoFigma size="xs" />
          </div>
          <div>
            <p className="mb-2 text-xs text-gray-400">sm</p>
            <LogoFigma size="sm" />
          </div>
          <div>
            <p className="mb-2 text-xs text-gray-400">base</p>
            <LogoFigma size="base" />
          </div>
          <div>
            <p className="mb-2 text-xs text-gray-400">icon only</p>
            <LogoFigma size="base" showText={false} />
          </div>
        </div>
      </Section>

      {/* ─── Status Badges ─── */}
      <Section title="StatusBadge (8 statuts)">
        <div className="flex flex-wrap gap-3">
          {["collecting", "goal_reached", "formal_notice", "negotiation", "legal_action", "won", "partial", "closed"].map((s) => (
            <StatusBadge key={s} status={s} />
          ))}
        </div>
      </Section>

      {/* ─── Theme Tags ─── */}
      <Section title="ThemeTags">
        <ThemeTags themes={["consommation", "banque", "numerique", "vie-privee", "environnement", "sante", "logement"]} />
      </Section>

      {/* ─── Hashtag label (from ActionCard) ─── */}
      <Section title="Hashtag Label">
        <div className="flex gap-3">
          <span className="rounded-full bg-gray-900 px-3 py-1 text-xs font-semibold text-white dark:bg-white dark:text-gray-900">
            #FraisBancaires
          </span>
          <span className="rounded-full bg-gray-900 px-3 py-1 text-xs font-semibold text-white dark:bg-white dark:text-gray-900">
            #RGPD
          </span>
          <span className="rounded-full bg-gray-900 px-3 py-1 text-xs font-semibold text-white dark:bg-white dark:text-gray-900">
            #Linky
          </span>
        </div>
      </Section>

      {/* ─── SignatureProgress ─── */}
      <Section title="SignatureProgress">
        <div className="grid max-w-md gap-6">
          <div>
            <p className="mb-2 text-xs text-gray-400">variant=full (default)</p>
            <SignatureProgress current={12847} goal={25000} />
          </div>
          <div>
            <p className="mb-2 text-xs text-gray-400">variant=compact</p>
            <SignatureProgress current={50234} goal={50000} variant="compact" />
          </div>
          <div>
            <p className="mb-2 text-xs text-gray-400">100% reached</p>
            <SignatureProgress current={42000} goal={40000} />
          </div>
        </div>
      </Section>

      {/* ─── CTA Tokens ─── */}
      <Section title="CTA Tokens">
        <div className="space-y-6">
          {/* Brand block */}
          <div className="cta-brand-block rounded-lg p-8 text-center">
            <h3 className="mb-2 text-xl font-bold">cta-brand-block</h3>
            <p className="mb-4">Fond brand red + texte blanc. Dark: brand-strong.</p>
            <Button color="light" size="lg">CTA blanc sur rouge</Button>
          </div>
          {/* Step circles */}
          <div className="flex items-center gap-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">step-circle :</p>
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="step-circle flex h-12 w-12 items-center justify-center rounded-full">
                <span className="text-lg font-bold">{n}</span>
              </div>
            ))}
          </div>
          {/* Brand CTA button */}
          <div className="flex items-center gap-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">CTA principal :</p>
            <a
              href="#"
              className="inline-flex items-center rounded-lg bg-brand px-6 py-3 text-sm font-bold text-white transition-colors hover:opacity-90"
            >
              Découvrir les actions →
            </a>
          </div>
        </div>
      </Section>

      {/* ─── ActionCard ─── */}
      <Section title="ActionCard">
        <div className="grid max-w-sm gap-6">
          <ActionCard
            id={sampleAction.id}
            slug={sampleAction.slug}
            title={sampleAction.title}
            description={sampleAction.description}
            status={sampleAction.status}
            tag={sampleAction.tag}
            themes={sampleAction.themes}
            signatures={sampleAction.signatures}
            lawyer={sampleAction.lawyer}
            image={sampleAction.image}
            locale={locale}
          />
        </div>
      </Section>

      {/* PricingCard removed - pricing eliminated from demo scope */}

      {/* ─── Flowbite Primitives ─── */}
      <Section title="Flowbite Primitives">
        <div className="space-y-6">
          <div>
            <p className="mb-2 text-xs text-gray-400">Badges</p>
            <div className="flex flex-wrap gap-2">
              <Badge color="info">Info</Badge>
              <Badge color="gray">Gray</Badge>
              <Badge color="failure">Failure</Badge>
              <Badge color="success">Success</Badge>
              <Badge color="warning">Warning</Badge>
              <Badge color="indigo">Indigo</Badge>
              <Badge color="purple">Purple</Badge>
            </div>
          </div>
          <div>
            <p className="mb-2 text-xs text-gray-400">Buttons</p>
            <div className="flex flex-wrap gap-2">
              <Button color="failure" size="sm">Primary (failure)</Button>
              <Button color="light" size="sm">Light</Button>
              <Button color="gray" size="sm">Gray</Button>
              <Button color="failure" size="sm" outline>Outline</Button>
            </div>
          </div>
          <div>
            <p className="mb-2 text-xs text-gray-400">Progress bars</p>
            <div className="max-w-md space-y-2">
              <Progress progress={51} size="sm" color="red" />
              <Progress progress={100} size="sm" color="red" />
              <Progress progress={25} size="lg" color="red" />
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
