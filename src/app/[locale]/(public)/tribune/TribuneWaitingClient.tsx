"use client";

import { useState } from "react";
import { CTAButton } from "@/components/ui/CTAButton";

export function TribuneWaitingClient() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    console.log("[demo] Tribune notification signup:", email);
    setSubmitted(true);
  };

  return (
    <div>
      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url(/images/pages/wejustice_tribune.jpg)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(3, 7, 18, 0.85) 0%, rgba(3, 7, 18, 0.70) 50%, rgba(3, 7, 18, 0.55) 100%)" }} />
        <div className="relative z-10 mx-auto max-w-screen-xl px-4 py-16 text-center lg:px-6 lg:py-24">
          <span className="mb-6 inline-flex rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
            Bientôt disponible
          </span>
          <h1 className="mb-4 text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
            Tribune Populaire
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-white/80 lg:text-xl">
            Dénoncez les injustices. Constituez un dossier citoyen structuré avec faits,
            preuves et demandes. Soumettez-le au jugement de la communauté.
          </p>

          {/* Email signup */}
          {submitted ? (
            <div className="mx-auto max-w-md rounded-lg bg-green-500/10 p-6">
              <svg className="mx-auto mb-3 h-10 w-10 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <p className="text-sm font-medium text-green-300">
                Vous serez averti dès le lancement de la Tribune Populaire.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mx-auto flex max-w-md gap-3">
              <input
                type="email"
                placeholder="Votre adresse email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="hero-glass-input flex-1"
              />
              <CTAButton type="submit" size="md">
                Me prévenir
              </CTAButton>
            </form>
          )}
        </div>
      </section>

      {/* ─── Comment ça marche - 3 etapes ─── */}
      <section className="bg-white py-16 dark:bg-gray-900 lg:py-24">
        <div className="mx-auto max-w-screen-xl px-4 lg:px-6">
          <h2 className="mb-4 text-center text-3xl font-bold text-gray-900 dark:text-white">
            Comment ça marche
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-center text-lg text-gray-500 dark:text-gray-400">
            Constituez un dossier citoyen solide et soumettez-le au vote de la communauté.
          </p>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
                title: "1. Constituez votre dossier",
                desc: "Décrivez l'injustice avec des faits datés et vérifiables. Identifiez la cible : organisation, institution ou pratique systémique.",
              },
              {
                icon: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z",
                title: "2. Ajoutez vos preuves",
                desc: "Documents, photos, vidéos, liens. Jusqu'à 10 Mo par fichier. Les preuves renforcent la crédibilité de votre dossier auprès de la communauté.",
              },
              {
                icon: "M3 6l3 1m0 0l-3 9a5 5 0 006 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5 5 0 006 0M18 7l3 9m-3-9l-6-2",
                title: "3. La communaute vote",
                desc: "Votre dossier est publié après modération. Les citoyens votent : Soutien, Opposition ou Abstention. L'organisation ciblée peut exercer son droit de réponse.",
              },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="rounded-lg border border-gray-200 bg-gray-50 p-6 dark:border-white/[0.08] dark:bg-gray-900">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-700">
                  <svg className="h-6 w-6 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
                  </svg>
                </div>
                <h3 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">{title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Les 5 etapes du dossier ─── */}
      <section className="bg-gray-50 py-16 dark:bg-gray-900 lg:py-24">
        <div className="mx-auto max-w-screen-xl px-4 lg:px-6">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 dark:text-white">
            Un dossier structuré en 5 étapes
          </h2>
          <div className="mx-auto max-w-3xl space-y-6">
            {[
              { step: 1, title: "Définir la cible", desc: "Qui ou quoi est responsable de l'injustice ? Organisation, institution ou pratique systémique." },
              { step: 2, title: "Chronologie des faits", desc: "Listez les événements datés et vérifiables, dans l'ordre chronologique. Chaque fait doit être factuel." },
              { step: 3, title: "Déposer les preuves", desc: "Documents PDF, photos, vidéos, liens. Jusqu'à 10 Mo par fichier. Optionnel mais renforce votre dossier." },
              { step: 4, title: "Formuler vos demandes", desc: "Réparation financière, excuses publiques, changement de politique, transparence. Soyez précis." },
              { step: 5, title: "Soumettre à la modération", desc: "Votre dossier est relu par l'équipe. Si valide, il est publié et soumis au vote de la communauté." },
            ].map(({ step, title, desc }) => (
              <div key={step} className="flex gap-4 rounded-lg bg-white p-5 dark:bg-gray-900">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-brand text-sm font-bold text-white">
                  {step}
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-900 dark:text-white">{title}</h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Pour qui ─── */}
      <section className="bg-white py-16 dark:bg-gray-900 lg:py-24">
        <div className="mx-auto max-w-screen-xl px-4 lg:px-6">
          <h2 className="mb-4 text-center text-3xl font-bold text-gray-900 dark:text-white">
            Pour qui ?
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-center text-lg text-gray-500 dark:text-gray-400">
            La Tribune Populaire est ouverte à tous ceux qui veulent faire entendre leur voix.
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: "M3 21h18M3 7v1a3 3 0 006 0V7m0 1a3 3 0 006 0V7m0 1a3 3 0 006 0V7H3l2-4h14l2 4M5 21V10.7M19 21V10.7", title: "Citoyens", desc: "Dénoncez une injustice vécue. Constituez un dossier solide et laissez la communauté juger." },
              { icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z", title: "Scientifiques", desc: "Publiez des dossiers étayés par des preuves scientifiques pour éclairer le débat public." },
              { icon: "M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z", title: "Journalistes", desc: "Documentez des affaires d'intérêt public avec une structure juridique rigoureuse." },
              { icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z", title: "Associations", desc: "Portez des causes collectives avec le soutien et le vote de la communauté." },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="rounded-lg border border-gray-200 p-6 text-center dark:border-white/[0.08]">
                <div className="mb-4 mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                  <svg className="h-7 w-7 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
                  </svg>
                </div>
                <h3 className="mb-2 text-base font-bold text-gray-900 dark:text-white">{title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Droit de reponse ─── */}
      <section className="bg-gray-50 py-16 dark:bg-gray-900 lg:py-24">
        <div className="mx-auto max-w-screen-xl px-4 lg:flex lg:items-center lg:gap-12 lg:px-6">
          <div className="flex-1">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
              Un système équitable : le droit de réponse
            </h2>
            <p className="mb-6 text-gray-500 dark:text-gray-400">
              Chaque organisation ciblée par un dossier citoyen dispose d&apos;un droit de réponse
              publié directement sur la page du dossier. Transparence pour tous les camps.
            </p>
            <ul className="space-y-3">
              {[
                "L'organisation ciblée est notifiée de la publication du dossier",
                "Elle peut publier sa réponse officielle, visible par tous",
                "La communauté vote en connaissance de cause, avec les deux versions",
                "Aucune censure : les faits et les réponses sont publics",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-gray-600 dark:text-gray-400">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-10 flex-1 lg:mt-0">
            <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-900">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                  <svg className="h-5 w-5 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">Dossier #TRB-042</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Publié il y a 3 jours</p>
                </div>
              </div>
              <div className="mb-4 rounded-lg bg-gray-50 p-4 dark:bg-gray-900">
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Vote de la communauté</p>
                <div className="mt-2 flex gap-4">
                  <div className="text-center">
                    <p className="text-xl font-bold text-green-600 dark:text-green-400">78%</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Soutien</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xl font-bold text-red-500">12%</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Opposition</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xl font-bold text-gray-400">10%</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Abstention</p>
                  </div>
                </div>
              </div>
              <div className="rounded-lg border-l-4 border-blue-400 bg-blue-50 p-3 dark:bg-blue-900/20">
                <p className="text-xs font-medium text-blue-700 dark:text-blue-300">Droit de réponse de l&apos;organisation</p>
                <p className="mt-1 text-xs text-blue-600 dark:text-blue-400">&quot;Nous contestons les faits présentés et apportons les clarifications suivantes...&quot;</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA final ─── */}
      <section className="cta-brand-block">
        <div className="mx-auto max-w-screen-xl px-4 py-16 text-center lg:px-6 lg:py-24">
          <h2 className="mb-4 text-3xl font-bold">
            Une injustice à dénoncer ?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg">
            La Tribune Populaire arrive bientôt.<br />
            Soyez parmi les premiers à constituer un dossier citoyen.
          </p>
          {submitted ? (
            <p className="text-sm font-medium text-white/80">Vous êtes déjà inscrit. Nous vous préviendrons !</p>
          ) : (
            <form onSubmit={handleSubmit} className="mx-auto flex max-w-md gap-3">
              <input
                type="email"
                placeholder="Votre adresse email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="hero-glass-input flex-1"
              />
              <CTAButton type="submit" variant="light" size="lg">
                Me prévenir
              </CTAButton>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
