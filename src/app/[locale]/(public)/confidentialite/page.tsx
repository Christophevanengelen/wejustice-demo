import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

type Props = { params: Promise<{ locale: string }> };

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: "Politique de confidentialité de WeJustice - traitement des données personnelles, droits RGPD.",
  robots: { index: false, follow: true },
};

export default async function ConfidentialitePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 lg:py-20">
      {/* Back link */}
      <a href={`/${locale}`} className="mb-8 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-brand dark:text-gray-400">
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Retour a l&apos;accueil
      </a>

      <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white lg:text-4xl">
        Politique de confidentialite
      </h1>
      <p className="mb-10 text-sm text-gray-500 dark:text-gray-400">
        Derniere mise a jour : 1er avril 2026
      </p>

      <div className="space-y-10 text-sm leading-relaxed text-gray-600 dark:text-gray-400">

        {/* Intro */}
        <section className="rounded-lg border-l-4 border-blue-500 bg-blue-50 p-4 dark:border-blue-400 dark:bg-blue-900/20">
          <p className="text-blue-800 dark:text-blue-300">
            Chez WeJustice, la protection de vos donnees personnelles est une priorite.
            Cette politique vous explique quelles donnees nous collectons, pourquoi,
            comment nous les protegeons, et quels sont vos droits.
          </p>
        </section>

        {/* 1 */}
        <section>
          <h2 className="mb-3 text-lg font-bold text-gray-900 dark:text-white">1. Responsable du traitement</h2>
          <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-900">
            <p><strong className="text-gray-900 dark:text-white">WeJustice</strong></p>
            <p>contact@wejustice.legal</p>
            <p>Delegue a la protection des donnees : dpo@wejustice.legal</p>
          </div>
        </section>

        {/* 2 */}
        <section>
          <h2 className="mb-3 text-lg font-bold text-gray-900 dark:text-white">2. Donnees collectees</h2>
          <p className="mb-4">Nous collectons uniquement les donnees necessaires au fonctionnement du service :</p>

          <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-white/[0.08]">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-4 py-3 font-medium text-gray-900 dark:text-white">Donnee</th>
                  <th className="px-4 py-3 font-medium text-gray-900 dark:text-white">Finalite</th>
                  <th className="px-4 py-3 font-medium text-gray-900 dark:text-white">Base legale</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">Prenom, nom</td>
                  <td className="px-4 py-3">Identification du signataire</td>
                  <td className="px-4 py-3">Consentement</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">Adresse email</td>
                  <td className="px-4 py-3">Communication, suivi de l&apos;action</td>
                  <td className="px-4 py-3">Consentement</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">Pays</td>
                  <td className="px-4 py-3">Eligibilite geographique</td>
                  <td className="px-4 py-3">Interet legitime</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">Donnees de paiement</td>
                  <td className="px-4 py-3">Traitement des contributions</td>
                  <td className="px-4 py-3">Execution du contrat</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">Adresse IP</td>
                  <td className="px-4 py-3">Securite, prevention de la fraude</td>
                  <td className="px-4 py-3">Interet legitime</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-4 rounded-lg border-l-4 border-green-500 bg-green-50 p-4 dark:border-green-400 dark:bg-green-900/20">
            <p className="font-medium text-green-800 dark:text-green-300">
              Nous ne vendons jamais vos donnees. Nous ne partageons jamais vos donnees a des fins publicitaires.
            </p>
          </div>
        </section>

        {/* 3 */}
        <section>
          <h2 className="mb-3 text-lg font-bold text-gray-900 dark:text-white">3. Duree de conservation</h2>
          <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-white/[0.08]">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-4 py-3 font-medium text-gray-900 dark:text-white">Type de donnee</th>
                  <th className="px-4 py-3 font-medium text-gray-900 dark:text-white">Duree</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td className="px-4 py-3">Donnees de signature</td>
                  <td className="px-4 py-3">Jusqu&apos;a la cloture de l&apos;action ou demande de suppression</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Donnees de compte</td>
                  <td className="px-4 py-3">Jusqu&apos;a suppression du compte + 1 mois</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Donnees de paiement</td>
                  <td className="px-4 py-3">10 ans (obligation legale comptable)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Logs de connexion</td>
                  <td className="px-4 py-3">12 mois</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 4 */}
        <section>
          <h2 className="mb-3 text-lg font-bold text-gray-900 dark:text-white">4. Partage des donnees</h2>
          <p>Vos donnees peuvent etre partagees avec :</p>
          <ul className="mt-3 space-y-2 pl-5">
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gray-400"></span>
              <span><strong className="text-gray-900 dark:text-white">Les avocats partenaires</strong> - uniquement si vous constituez un dossier de plaignant, et uniquement les donnees necessaires a la procedure</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gray-400"></span>
              <span><strong className="text-gray-900 dark:text-white">Notre prestataire de paiement</strong> (SystemPay / groupe BPCE) - pour le traitement securise des transactions</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gray-400"></span>
              <span><strong className="text-gray-900 dark:text-white">Notre hebergeur</strong> - pour le stockage securise des donnees (serveurs en France / UE)</span>
            </li>
          </ul>
          <p className="mt-3">
            Aucun transfert de donnees hors de l&apos;Union Europeenne n&apos;est effectue.
          </p>
        </section>

        {/* 5 */}
        <section>
          <h2 className="mb-3 text-lg font-bold text-gray-900 dark:text-white">5. Securite</h2>
          <p>Nous mettons en oeuvre les mesures suivantes pour proteger vos donnees :</p>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {[
              { title: "Chiffrement", desc: "Toutes les communications sont chiffrees (HTTPS/TLS)" },
              { title: "Acces restreint", desc: "Seul le personnel autorise accede aux donnees" },
              { title: "Paiements securises", desc: "Vos donnees bancaires ne transitent jamais par nos serveurs" },
              { title: "Hebergement UE", desc: "Serveurs localises en France / Union Europeenne" },
            ].map((item) => (
              <div key={item.title} className="rounded-lg bg-gray-50 p-4 dark:bg-gray-900">
                <p className="text-sm font-medium text-gray-900 dark:text-white">{item.title}</p>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 6 */}
        <section>
          <h2 className="mb-3 text-lg font-bold text-gray-900 dark:text-white">6. Vos droits</h2>
          <p className="mb-4">
            Conformement au Reglement General sur la Protection des Donnees (RGPD),
            vous disposez des droits suivants :
          </p>
          <div className="space-y-3">
            {[
              { right: "Droit d'acces", desc: "Obtenir une copie de vos donnees personnelles" },
              { right: "Droit de rectification", desc: "Corriger des donnees inexactes ou incompletes" },
              { right: "Droit a l'effacement", desc: "Demander la suppression de vos donnees" },
              { right: "Droit a la portabilite", desc: "Recevoir vos donnees dans un format structure" },
              { right: "Droit d'opposition", desc: "Vous opposer au traitement de vos donnees" },
              { right: "Droit de retrait", desc: "Retirer votre consentement a tout moment" },
            ].map((item) => (
              <div key={item.right} className="flex items-start gap-3 rounded-lg border border-gray-200 p-4 dark:border-white/[0.08]">
                <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{item.right}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4">
            Pour exercer vos droits, contactez notre DPO : <strong className="text-gray-900 dark:text-white">dpo@wejustice.legal</strong>
          </p>
          <p className="mt-2">
            Vous pouvez egalement introduire une reclamation aupres de la CNIL : <a href="https://www.cnil.fr" className="font-medium text-brand underline" target="_blank" rel="noopener noreferrer">www.cnil.fr</a>
          </p>
        </section>

        {/* 7 */}
        <section>
          <h2 className="mb-3 text-lg font-bold text-gray-900 dark:text-white">7. Cookies</h2>
          <p>
            WeJustice utilise uniquement des cookies essentiels au fonctionnement du service
            (authentification, preferences de langue, mode sombre). Nous n&apos;utilisons pas
            de cookies publicitaires ni de trackers tiers.
          </p>
          <div className="mt-3 overflow-hidden rounded-lg border border-gray-200 dark:border-white/[0.08]">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-4 py-3 font-medium text-gray-900 dark:text-white">Cookie</th>
                  <th className="px-4 py-3 font-medium text-gray-900 dark:text-white">Finalite</th>
                  <th className="px-4 py-3 font-medium text-gray-900 dark:text-white">Duree</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td className="px-4 py-3 font-mono text-xs">wj-session</td>
                  <td className="px-4 py-3">Authentification</td>
                  <td className="px-4 py-3">Session</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-xs">wj-locale</td>
                  <td className="px-4 py-3">Preference de langue</td>
                  <td className="px-4 py-3">1 an</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-xs">wj-theme</td>
                  <td className="px-4 py-3">Mode sombre/clair</td>
                  <td className="px-4 py-3">1 an</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Contact */}
        <section className="rounded-lg bg-gray-50 p-6 dark:bg-gray-900">
          <h2 className="mb-3 text-lg font-bold text-gray-900 dark:text-white">Contact</h2>
          <p>
            Pour toute question relative a la protection de vos donnees :
          </p>
          <p className="mt-2">
            <strong className="text-gray-900 dark:text-white">Delegue a la protection des donnees</strong><br />
            dpo@wejustice.legal
          </p>
        </section>
      </div>
    </article>
  );
}
