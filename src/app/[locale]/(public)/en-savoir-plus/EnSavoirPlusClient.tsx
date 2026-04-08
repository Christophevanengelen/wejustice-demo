"use client";

/**
 * EnSavoirPlusClient — Page unique "Qui sommes-nous / En savoir plus"
 *
 * Fusionnée depuis les anciennes pages À propos et En savoir plus.
 * Connectée au CTA secondaire du hero ("En savoir plus").
 *
 * Sections :
 * 1. Hero — Le 5ème pouvoir
 * 2. Mission — 3 piliers (Transparence, Accessibilité, Impact)
 * 3. Timeline — Histoire de WeJustice (depuis wejustice.legal)
 * 4. L'équipe — Joint venture Arnaud + Christophe
 * 5. Ce qui nous différencie — vs pétitions classiques
 * 6. Comment ça marche — 5 étapes
 * 7. Trust signals — Hébergement, RGPD, paiement
 * 8. CTA final — Découvrir les actions + Voir les forfaits
 */

import { useParams } from "next/navigation";
import Image from "next/image";
import {
  Badge,
  Card,
} from "flowbite-react";
import { CTAButton } from "@/components/ui/CTAButton";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

/* ═══ DATA ═══ */

const PILLARS = [
  {
    title: "Transparence",
    description: "Chaque action affiche son avancement, ses objectifs et l'utilisation des fonds. Aucune zone d'ombre.",
    icon: "M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.64 0 8.577 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.64 0-8.577-3.007-9.963-7.178z M15 12a3 3 0 11-6 0 3 3 0 016 0z",
  },
  {
    title: "Accessibilité",
    description: "Agir en justice ne devrait pas être réservé à ceux qui en ont les moyens. Nos forfaits mutualisés rendent la procédure accessible à tous.",
    icon: "M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z",
  },
  {
    title: "Impact",
    description: "Nos actions ont des conséquences juridiques réelles. Chaque signature alimente une procédure portée par des avocats spécialisés.",
    icon: "M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971zm-13.5 0L7.87 15.697c.122.499-.107 1.028-.59 1.202a5.989 5.989 0 01-2.03.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971z",
  },
];

const TIMELINE_EVENTS = [
  { year: "2028", title: "Expansion mondiale", description: "WeJustice s'ouvre aux citoyens du monde entier. La justice collective sans frontières." },
  { year: "2027", title: "Expansion européenne", description: "Déploiement dans les 27 pays de l'Union européenne. Les actions collectives traversent les frontières pour peser face aux multinationales." },
  { year: "2026", title: "Lancement de WeJustice", description: "La plateforme de justice collective accessible à tous. Le 5ème pouvoir est né.", active: true },
  { year: "2025", title: "Rencontre avec Christophe van Engelen", description: "Arnaud rencontre Christophe, expert en communication digitale et expérience utilisateur. Ensemble, ils imaginent une plateforme qui combine l'expertise juridique et la puissance du design." },
  { year: "2022", title: "Acquisition de VpourVerdict.com et Cessezlefou.com", description: "Lexprecia élargit son écosystème d'actions citoyennes en acquérant deux plateformes complémentaires. L'ambition grandit : créer le 5ème pouvoir." },
  { year: "2020", title: "Ouverture de Palace.legal", description: "La plateforme Palace.legal ouvre ses portes : pétitions et actions collectives en ligne. Le cabinet découvre le potentiel du numérique pour démocratiser l'accès à la justice." },
  { year: "2017", title: "Premières actions collectives en Justice", description: "Lexprecia lance ses premières procédures juridiques collectives. Les citoyens se regroupent pour la première fois pour faire valoir leurs droits ensemble." },
  { year: "2015", title: "Création de Lexprecia", description: "Me Arnaud Durand fonde le cabinet Lexprecia à Paris. Spécialisé en droit de la consommation et actions collectives, il pose les bases juridiques de ce qui deviendra WeJustice." },
];

const TEAM = [
  {
    name: "Me Arnaud Durand",
    role: "Avocat référent — Cabinet Lexprecia",
    bio: "Avocat au barreau de Paris depuis 2015, spécialisé en droit de la consommation et actions collectives. Plus de 50 procédures collectives portées, des victoires significatives contre des multinationales.",
    initials: "AD",
    photo: "/images/team/arnaud.jpg",
    quote: "Les citoyens ont le droit d'agir ensemble. Mon rôle est de leur donner les armes juridiques pour le faire.",
    linkedin: "https://www.linkedin.com/in/arnauddurand/",
    twitter: "https://x.com/ArnaudAvocat",
  },
  {
    name: "Christophe van Engelen",
    role: "Expert CX & Communication — Co-fondateur",
    bio: "Spécialiste en expérience utilisateur et communication digitale basé à Bruxelles. Transforme des idées complexes en produits intuitifs qui mobilisent. Son obsession : que chaque citoyen puisse agir en 30 secondes.",
    initials: "CVE",
    photo: "/images/team/christophe.jpg",
    quote: "La justice est un sujet trop sérieux pour être mal communiqué. Si l'UX est mauvaise, les citoyens ne s'engagent pas.",
    linkedin: "https://www.linkedin.com/in/christophevanengelen/",
    twitter: "https://x.com/jhondoe2509",
  },
];

const PROCESS_STEPS = [
  { num: "01", title: "Signatures", desc: "Les citoyens signent pour lancer l'action. Gratuit, en 30 secondes." },
  { num: "02", title: "Mise en demeure", desc: "Un courrier officiel est envoyé par Me Durand à l'entité visée." },
  { num: "03", title: "Négociation", desc: "Dialogue avec la partie adverse. La pression collective change la donne." },
  { num: "04", title: "Action en justice", desc: "La procédure juridique est lancée au nom de tous les plaignants." },
  { num: "05", title: "Verdict", desc: "La justice rend une décision. Les plaignants sont informés et indemnisés." },
];

/* ═══ COMPONENT ═══ */

export default function EnSavoirPlusClient() {
  const params = useParams();
  const locale = (params?.locale as string) || "fr";

  return (
    <div>
      {/* 1. HERO */}
      <section className="bg-white py-16 lg:py-24 dark:bg-gray-900">
        <div className="mx-auto max-w-screen-xl px-4 text-center lg:px-6">
          <ScrollReveal>
            <Badge color="gray" size="xs" className="mb-4 inline-flex">Notre histoire</Badge>
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 lg:text-5xl dark:text-white">
              WeJustice, le 5ème pouvoir
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-gray-500 dark:text-gray-400">
              Nous rassemblons les citoyens pour des actions juridiques collectives.
              Ensemble, nous transformons l&apos;indignation en procédures concrètes.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* 2. MISSION — 3 piliers */}
      <section className="bg-gray-50 py-16 lg:py-24 dark:bg-gray-900">
        <div className="mx-auto max-w-screen-xl px-4 lg:px-6">
          <ScrollReveal>
            <h2 className="mb-4 text-center text-3xl font-bold text-gray-900 dark:text-white">Notre mission</h2>
            <p className="mx-auto mb-12 max-w-2xl text-center text-gray-500 dark:text-gray-400">
              Trois piliers guident chacune de nos décisions.
            </p>
          </ScrollReveal>
          <div className="grid gap-8 md:grid-cols-3">
            {PILLARS.map((p, i) => (
              <ScrollReveal key={p.title} delay={0.1 * i}>
                <Card className="h-full text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700">
                    <svg className="h-6 w-6 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d={p.icon} />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{p.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{p.description}</p>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 3. TIMELINE — Histoire de WeJustice (style wejustice.legal : alternance gauche/droite) */}
      <section className="bg-white py-16 lg:py-24 dark:bg-gray-900">
        <div className="mx-auto max-w-4xl px-4 lg:px-6">
          <ScrollReveal>
            <div className="mb-12 text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Notre histoire</p>
              <h2 className="mt-2 text-3xl font-extrabold text-gray-900 dark:text-white">
                Le 5ème pouvoir prend forme
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-gray-500 dark:text-gray-400">
                Les étapes clés de l&apos;avènement de WeJustice
              </p>
            </div>
          </ScrollReveal>

          {/* Timeline custom — trait central + alternance gauche/droite */}
          <div className="relative">
            {/* Trait vertical central */}
            <div className="absolute left-6 top-0 h-full w-px bg-gray-200 md:left-1/2 dark:bg-gray-700" />

            {TIMELINE_EVENTS.map((event, i) => {
              const isLeft = i % 2 === 0;
              return (
                <ScrollReveal key={event.year} delay={0.1 * i}>
                  <div className="relative mb-10 flex items-start md:mb-12">
                    {/* Point sur la ligne */}
                    <div className="absolute left-6 z-10 -translate-x-1/2 md:left-1/2">
                      <div
                        className="h-3 w-3 rounded-full border-2 border-white bg-brand dark:border-gray-900"
                      />
                    </div>

                    {/* Contenu — mobile toujours à droite, desktop alternance */}
                    <div className={`ml-12 md:ml-0 md:w-1/2 ${isLeft ? "md:pr-12 md:text-right" : "md:ml-auto md:pl-12 md:text-left"}`}>
                      <span
                        className="inline-block rounded-full bg-brand px-3 py-1 text-xs font-bold text-white"
                      >
                        {event.year}
                      </span>
                      <h3 className="mt-2 text-lg font-bold text-gray-900 dark:text-white">
                        {event.title}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        {event.description}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. L'ÉQUIPE — design humain, cards homothétiques */}
      <section className="bg-gray-50 py-16 lg:py-24 dark:bg-gray-900">
        <div className="mx-auto max-w-screen-xl px-4 lg:px-6">
          <ScrollReveal>
            <div className="mb-12 text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">L&apos;équipe</p>
              <h2 className="mt-2 text-3xl font-extrabold text-gray-900 dark:text-white">
                Deux expertises, une mission
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-gray-500 dark:text-gray-400">
                La justice ne devrait pas être un privilège. Pour la rendre accessible,
                il faut l&apos;expertise juridique et la capacité à mobiliser.
              </p>
            </div>
          </ScrollReveal>

          <div className="mx-auto grid auto-rows-[1fr] max-w-4xl gap-8 lg:grid-cols-2">
            {TEAM.map((member, i) => (
              <ScrollReveal key={member.name} delay={0.1 * (i + 1)} className="flex">
                <div className="flex w-full flex-col rounded-lg border border-gray-200 bg-white p-8 dark:border-white/[0.08] dark:bg-gray-900">
                  {/* Photo + nom — centré, humain */}
                  <div className="mb-6 text-center">
                    <Image
                      src={member.photo}
                      alt={member.name}
                      width={96}
                      height={96}
                      className="mx-auto mb-4 h-24 w-24 rounded-full object-cover"
                    />
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{member.name}</h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{member.role}</p>

                    {/* Liens sociaux */}
                    <div className="mt-3 flex items-center justify-center gap-3">
                      <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 transition-colors hover:text-gray-600 dark:hover:text-gray-300" aria-label={`LinkedIn de ${member.name}`}>
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 110-4 2 2 0 010 4z" />
                        </svg>
                      </a>
                      <a href={member.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 transition-colors hover:text-gray-600 dark:hover:text-gray-300" aria-label={`Twitter de ${member.name}`}>
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                      </a>
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="flex-1 text-center text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                    {member.bio}
                  </p>

                  {/* Citation — en bas, toujours au même niveau */}
                  <div className="mt-6 border-t border-gray-100 pt-4 dark:border-white/[0.08]">
                    <p className="text-center text-sm italic text-gray-500 dark:text-gray-400">
                      &laquo; {member.quote} &raquo;
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CE QUI NOUS DIFFÉRENCIE */}
      <section className="bg-white py-16 lg:py-24 dark:bg-gray-900">
        <div className="mx-auto max-w-3xl px-4 text-center lg:px-6">
          <ScrollReveal>
            <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">Ce qui nous différencie</h2>
            <p className="mb-8 text-gray-500 dark:text-gray-400">
              Contrairement aux plateformes de pétitions classiques, nous ne nous arrêtons pas à la mobilisation.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="grid gap-6 text-left sm:grid-cols-2">
              <Card>
                <p className="mb-1 text-sm font-semibold text-gray-400 dark:text-gray-500">Pétitions classiques</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Collecte de signatures symboliques sans suite juridique.
                  L&apos;impact repose sur la pression médiatique seule.
                </p>
              </Card>
              <Card className="border-2 border-brand">
                <p className="mb-1 text-sm font-semibold text-brand">WeJustice</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Chaque signature alimente une procédure juridique réelle,
                  portée par un avocat spécialisé. Vos droits sont défendus devant les tribunaux.
                </p>
              </Card>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 6. COMMENT ÇA MARCHE — 5 étapes */}
      <section className="bg-gray-50 py-16 lg:py-24 dark:bg-gray-900">
        <div className="mx-auto max-w-5xl px-4 lg:px-6">
          <ScrollReveal>
            <div className="mb-12 text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-brand">Le processus</p>
              <h2 className="mt-2 text-3xl font-extrabold text-gray-900 dark:text-white">Comment ça marche ?</h2>
              <p className="mx-auto mt-3 max-w-2xl text-gray-500 dark:text-gray-400">
                Des signatures au verdict, chaque étape est transparente et collective.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {PROCESS_STEPS.map((step, i) => (
              <ScrollReveal key={step.num} delay={0.1 * i}>
                <div className="flex h-full flex-col items-center gap-3 rounded-lg border border-gray-200 bg-white p-6 text-center dark:border-white/[0.08] dark:bg-gray-900">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand text-lg font-extrabold text-white">
                    {step.num}
                  </div>
                  <h3 className="text-base font-bold text-gray-900 dark:text-white">{step.title}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{step.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 7. TRUST SIGNALS */}
      <section className="bg-white py-12 dark:bg-gray-900">
        <div className="mx-auto max-w-screen-xl px-4 lg:px-6">
          <div className="flex flex-wrap items-center justify-center gap-8">
            {[
              { label: "Données hébergées en France", icon: "M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" },
              { label: "Conforme RGPD", icon: "M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
              { label: "Paiement sécurisé", icon: "M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" },
            ].map((signal) => (
              <div key={signal.label} className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <svg className="h-5 w-5 text-green-500 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={signal.icon} />
                </svg>
                {signal.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. CTA FINAL — identique à la homepage */}
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
