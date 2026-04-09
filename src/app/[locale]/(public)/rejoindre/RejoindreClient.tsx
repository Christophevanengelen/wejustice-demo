"use client";

import { useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { CTAButton } from "@/components/ui/CTAButton";

export function RejoindreClient() {
  const params = useParams();
  const locale = (params?.locale as string) || "fr";
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim() || !email.trim()) return;
    setSubmitted(true);
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative flex min-h-[40vh] flex-col overflow-hidden">
        <Image
          src="/images/pages/wejustice_actions.jpg"
          alt="Rejoignez le mouvement"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_30%]"
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, rgba(3, 7, 18, 0.75) 0%, rgba(3, 7, 18, 0.60) 50%, rgba(3, 7, 18, 0.80) 100%)" }}
        />
        <div className="relative z-10 mx-auto flex max-w-screen-xl flex-1 flex-col items-center justify-center px-4 py-10 text-center sm:py-16">
          <h1 className="mb-4 text-3xl font-bold leading-tight tracking-tight text-white lg:text-5xl">
            Rejoignez le 5<sup className="text-lg">ème</sup> pouvoir
          </h1>
          <p className="mx-auto max-w-2xl text-base text-white/80 sm:text-lg">
            Créez votre compte gratuit. Signez des pétitions, soutenez des actions collectives en Justice, et devenez acteur du changement.
          </p>
        </div>
      </section>

      {/* Onboarding form */}
      <section className="bg-white py-16 dark:bg-gray-900 lg:py-24">
        <div className="mx-auto max-w-screen-xl px-4 lg:px-6">
          <div className="mx-auto max-w-lg">
            {submitted ? (
              /* Success state → redirect to /compte */
              <div className="text-center">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                  <svg className="h-8 w-8 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
                  Bienvenue, {firstName} !
                </h2>
                <p className="mb-8 text-gray-500 dark:text-gray-400">
                  Votre compte a été créé (démo). Découvrez votre espace membre.
                </p>
                <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                  <CTAButton href={`/${locale}/actions`} size="lg">
                    Signer une pétition
                  </CTAButton>
                  <CTAButton href={`/${locale}/compte`} variant="light" size="lg">
                    Mon espace membre
                  </CTAButton>
                </div>
              </div>
            ) : (
              /* Registration form */
              <div>
                <h2 className="mb-2 text-center text-2xl font-bold text-gray-900 dark:text-white">
                  Créez votre compte gratuit
                </h2>
                <p className="mb-8 text-center text-gray-500 dark:text-gray-400">
                  En 30 secondes. Sans engagement. Sans carte bancaire.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="firstName" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                      Prénom
                    </label>
                    <input
                      id="firstName"
                      type="text"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="Votre prénom"
                      className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition-colors focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                      Adresse email
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="votre@email.com"
                      className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition-colors focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                    />
                  </div>
                  <CTAButton type="submit" size="lg" fullWidth>
                    Créer mon compte
                  </CTAButton>
                </form>

                <p className="mt-4 text-center text-xs text-gray-400 dark:text-gray-500">
                  En créant votre compte, vous acceptez nos{" "}
                  <a href={`/${locale}/cgu`} className="underline hover:text-gray-600">CGU</a>{" "}
                  et notre{" "}
                  <a href={`/${locale}/confidentialite`} className="underline hover:text-gray-600">politique de confidentialité</a>.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Trust signals */}
      <section className="border-t border-gray-200 bg-gray-50 py-12 dark:border-white/[0.08] dark:bg-gray-900">
        <div className="mx-auto max-w-screen-xl px-4 lg:px-6">
          <div className="grid gap-8 sm:grid-cols-3">
            <div className="text-center">
              <p className="text-3xl font-bold text-gray-900 dark:text-white">312 884</p>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Signatures collectées</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-gray-900 dark:text-white">8</p>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Actions collectives ouvertes</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-gray-900 dark:text-white">100%</p>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Gratuit pour signer</p>
            </div>
          </div>
        </div>
      </section>

      {/* What happens next */}
      <section className="bg-white py-16 dark:bg-gray-900 lg:py-24">
        <div className="mx-auto max-w-screen-xl px-4 lg:px-6">
          <h2 className="mb-12 text-center text-2xl font-bold text-gray-900 dark:text-white">
            Après votre inscription
          </h2>
          <div className="mx-auto grid max-w-3xl gap-8 sm:grid-cols-3">
            <div className="text-center">
              <span className="mb-3 inline-block text-2xl font-bold text-brand">01</span>
              <h3 className="mb-2 text-base font-bold text-gray-900 dark:text-white">Signez</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Parcourez les actions et signez celles qui vous concernent. C&apos;est gratuit et illimité.
              </p>
            </div>
            <div className="text-center">
              <span className="mb-3 inline-block text-2xl font-bold text-brand">02</span>
              <h3 className="mb-2 text-base font-bold text-gray-900 dark:text-white">Partagez</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Plus nous sommes nombreux, plus notre voix porte. Chaque partage compte.
              </p>
            </div>
            <div className="text-center">
              <span className="mb-3 inline-block text-2xl font-bold text-brand">03</span>
              <h3 className="mb-2 text-base font-bold text-gray-900 dark:text-white">Soutenez</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Envie d&apos;aller plus loin ? Nos forfaits vous permettent de rejoindre les procédures judiciaires.
              </p>
            </div>
          </div>
          <div className="mt-12 text-center">
            <CTAButton href={`/${locale}/tarifs`} variant="outline" size="lg">
              Voir les forfaits
            </CTAButton>
          </div>
        </div>
      </section>
    </div>
  );
}
