"use client";

/**
 * HomepageClient — Marketing-grade landing page.
 *
 * Sections:
 *  1. Hero with parallax image + animated stats
 *  2. Featured Actions grid
 *  3. How It Works — Flowbite Timeline + stagger animation
 *  4. Testimonials — Card grid with avatars, quotes, Rating stars
 *  5. Press logos
 *  6. Final CTA
 */

import { Badge, Card, Avatar, Rating, RatingStar, Timeline, TimelineBody, TimelineContent, TimelineItem, TimelinePoint, TimelineTime, TimelineTitle } from "flowbite-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { CTAButton } from "@/components/ui/CTAButton";
import { ActionCard } from "@/components/features/actions/ActionCard";
import { PressSection } from "@/components/features/press/PressSection";
import { AnimatedCounter } from "@/components/animations/AnimatedCounter";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import actionsData from "@/mocks/actions.json";
import siteSettings from "@/mocks/site-settings.json";
import testimonialsData from "@/mocks/testimonials.json";

/* ─── Step icons for How It Works ─── */
const STEP_ICONS = [
  // 1. Signez — pen/signature
  <svg key="sign" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
  </svg>,
  // 2. Rassemblez — people
  <svg key="gather" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>,
  // 3. Agissez — scales of justice
  <svg key="act" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
  </svg>,
  // 4. Gagnez — trophy
  <svg key="win" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>,
];

/* ─── Stat icons for Hero ─── */
const STAT_CONFIG = [
  {
    key: "signatures",
    value: siteSettings.totalSignatures,
    label: "Signatures collectées",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
      </svg>
    ),
  },
  {
    key: "members",
    value: siteSettings.totalMembers,
    label: "Citoyens mobilisés",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    key: "actions",
    value: siteSettings.totalActions,
    label: "Actions lancées",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
      </svg>
    ),
  },
];

/* ─── Testimonial impact metrics ─── */
const TESTIMONIAL_IMPACT: Record<string, string> = {
  "t-001": "340 EUR récupérés",
  "t-002": "12 000 signataires",
  "t-003": "4 800 EUR de trop-perçu",
  "t-004": "Action en cours",
};

export function HomepageClient() {
  const params = useParams();
  const locale = (params?.locale as string) || "fr";

  const featuredActions = actionsData.filter((a) => a.featured);
  const featuredTestimonials = testimonialsData.filter((t) => t.featured);

  return (
    <div>
      {/* ════════════════════════════════════════════════════════════
          HERO — Full-bleed image with gradient, animated stats
          ════════════════════════════════════════════════════════════ */}
      <section className="relative flex min-h-[79vh] flex-col overflow-hidden">
        <Image
          src="/images/wejustice_home_hero.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_5%]"
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to right, rgba(3, 7, 18, 0.80) 0%, rgba(3, 7, 18, 0.65) 50%, rgba(3, 7, 18, 0.50) 100%)',
          }}
        />
        <div className="relative z-10 mx-auto flex max-w-screen-xl flex-1 flex-col items-center justify-center px-4 py-16 text-center lg:px-6">
          <span className="mb-6 inline-flex items-center gap-1 rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
            {siteSettings.activeActions} actions collectives en cours
          </span>

          <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
            {siteSettings.heroTitle}
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-white/80 sm:text-xl lg:text-2xl">
            {siteSettings.heroSubtitle}
          </p>

          <div className="mb-16 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <CTAButton href={`/${locale}/actions`} size="xl">
              {siteSettings.heroCta}
              <svg className="ml-2 -mr-1 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </CTAButton>
            <CTAButton href={`/${locale}/en-savoir-plus`} variant="light" size="xl" className="border-white/30 bg-white/10 text-white hover:bg-white/20 dark:border-white/30 dark:bg-white/10 dark:text-white dark:hover:bg-white/20">
              En savoir plus
            </CTAButton>
          </div>

          {/* Stats — Flowbite social-proof pattern */}
          <dl className="grid gap-8 text-white sm:grid-cols-3">
            {STAT_CONFIG.map((stat, i) => (
              <ScrollReveal key={stat.key} delay={0.15 * i} direction="up" distance={20}>
                <div className="flex flex-col">
                  <dt className="mb-2 text-3xl font-extrabold tracking-tight md:text-4xl">
                    <AnimatedCounter value={stat.value} duration={2.5} />
                  </dt>
                  <dd className="text-sm text-white/60">{stat.label}</dd>
                </div>
              </ScrollReveal>
            ))}
          </dl>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          FEATURED ACTIONS
          ════════════════════════════════════════════════════════════ */}
      <section className="bg-white py-16 dark:bg-gray-900 lg:py-24">
        <div className="mx-auto max-w-screen-xl px-4 lg:px-6">
          <ScrollReveal>
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white lg:text-4xl">
                Actions en cours
              </h2>
              <p className="text-lg text-gray-500 dark:text-gray-400">
                Rejoignez les actions qui vous concernent
              </p>
            </div>
          </ScrollReveal>

          <div className="grid auto-rows-[1fr] gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredActions.slice(0, 3).map((action, i) => (
              <ScrollReveal key={action.id} delay={0.1 * i} className="flex">
                <ActionCard
                  id={action.id}
                  title={action.title}
                  description={action.description}
                  status={action.status}
                  tag={action.tag}
                  themes={action.themes}
                  signatures={action.signatures}
                  lawyer={action.lawyer}
                  image={action.image}
                  locale={locale}
                  signaturesThisWeek={action.signaturesThisWeek}
                />
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.3}>
            <div className="mt-10 text-center">
              <CTAButton href={`/${locale}/actions`} size="xl">
                Voir toutes les actions
                <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 14 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                </svg>
              </CTAButton>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          HOW IT WORKS — Flowbite Timeline with stagger
          ════════════════════════════════════════════════════════════ */}
      <section className="bg-gray-50 py-16 dark:bg-gray-900 lg:py-24">
        <div className="mx-auto max-w-screen-xl px-4 lg:px-6">
          <ScrollReveal>
            <div className="mx-auto mb-14 max-w-2xl text-center">
              <Badge color="gray" size="xs" className="mb-4 inline-flex">
                4 étapes simples
              </Badge>
              <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white lg:text-4xl">
                Comment ça marche
              </h2>
              <p className="text-base text-gray-500 dark:text-gray-400">
                De la signature à la victoire, chaque étape vous rapproche de la justice.
              </p>
            </div>
          </ScrollReveal>

          {/* Desktop: horizontal cards. Mobile: Flowbite vertical Timeline. */}

          {/* Desktop layout — 4 columns */}
          <div className="hidden lg:grid lg:grid-cols-4 lg:gap-8">
            {siteSettings.howItWorks.map(({ step, title, description }, i) => (
              <ScrollReveal key={step} delay={0.12 * i}>
                <div className="group relative text-center">
                  {/* Connecting line */}
                  {i < 3 && (
                    <div className="absolute left-[calc(50%+28px)] top-7 hidden h-px w-[calc(100%-56px)] bg-gray-300 dark:bg-gray-600 lg:block" />
                  )}

                  {/* Step circle */}
                  <div className="relative z-10 mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-brand text-white">
                    {STEP_ICONS[i]}
                  </div>

                  {/* Card */}
                  <div className="rounded-lg border border-gray-200 bg-white p-5 dark:border-white/[0.08] dark:bg-gray-900">
                    <span className="mb-1 block text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                      Étape {step}
                    </span>
                    <h3 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">
                      {title}
                    </h3>
                    <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                      {description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Mobile layout — Flowbite vertical Timeline */}
          <div className="lg:hidden">
            <Timeline>
              {siteSettings.howItWorks.map(({ step, title, description }, i) => (
                <ScrollReveal key={step} delay={0.1 * i}>
                  <TimelineItem>
                    <TimelinePoint />
                    <TimelineContent>
                      <TimelineTime>Étape {step}</TimelineTime>
                      <TimelineTitle>{title}</TimelineTitle>
                      <TimelineBody>{description}</TimelineBody>
                    </TimelineContent>
                  </TimelineItem>
                </ScrollReveal>
              ))}
            </Timeline>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          TESTIMONIALS — Premium card grid with ratings + impact
          ════════════════════════════════════════════════════════════ */}
      <section className="bg-white py-16 dark:bg-gray-900 lg:py-24">
        <div className="mx-auto max-w-screen-xl px-4 lg:px-6">
          <ScrollReveal>
            <div className="mx-auto mb-14 max-w-2xl text-center">
              <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white lg:text-4xl">
                Ils ont agi avec WeJustice
              </h2>
              <p className="text-base text-gray-500 dark:text-gray-400">
                Des milliers de citoyens ont déjà obtenu gain de cause.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredTestimonials.map((testimonial, i) => (
              <ScrollReveal key={testimonial.id} delay={0.08 * i}>
                <Card className="h-full border-gray-200 shadow-none dark:border-white/[0.08] dark:bg-gray-900">
                  <div className="flex h-full flex-col">
                    {/* Rating stars */}
                    <Rating className="mb-3">
                      <RatingStar />
                      <RatingStar />
                      <RatingStar />
                      <RatingStar />
                      <RatingStar />
                    </Rating>

                    {/* Quote */}
                    <blockquote className="mb-4 flex-1">
                      <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                        &ldquo;{testimonial.quote}&rdquo;
                      </p>
                    </blockquote>

                    {/* Impact badge */}
                    {TESTIMONIAL_IMPACT[testimonial.id] && (
                      <div className="mb-4">
                        <Badge color="success" size="xs" className="inline-flex">
                          {TESTIMONIAL_IMPACT[testimonial.id]}
                        </Badge>
                      </div>
                    )}

                    {/* Author */}
                    <div className="flex items-center gap-3 border-t border-gray-100 pt-4 dark:border-white/[0.08]">
                      <Avatar
                        placeholderInitials={testimonial.name.charAt(0)}
                        rounded
                        size="sm"
                      />
                      <div>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">
                          {testimonial.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {testimonial.action}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          PRESS SECTION
          ════════════════════════════════════════════════════════════ */}
      <PressSection />

      {/* ════════════════════════════════════════════════════════════
          FINAL CTA
          ════════════════════════════════════════════════════════════ */}
      <section className="cta-brand-block">
        <div className="mx-auto max-w-screen-xl px-4 py-16 text-center lg:px-6 lg:py-24">
          <ScrollReveal>
            <h2 className="mb-4 text-3xl font-bold tracking-tight lg:text-4xl">
              Prêt à agir ?
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg">
              Rejoignez des milliers de citoyens qui font valoir leurs droits collectivement.
            </p>
            <CTAButton href={`/${locale}/actions`} variant="light" size="xl">
              Découvrir les actions
            </CTAButton>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
