import type { Metadata } from "next";
import Link from "next/link";
import { setRequestLocale } from "next-intl/server";

type Props = { params: Promise<{ locale: string }> };

export const metadata: Metadata = {
  title: "Conditions Générales d'Utilisation",
  description: "CGU de la plateforme WeJustice - conditions d'accès, signature, engagement et responsabilité.",
  robots: { index: false, follow: true },
};

export default async function CguPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 lg:py-20">
      {/* Back link */}
      <Link href={`/${locale}`} className="mb-8 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400">
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Retour à l&apos;accueil
      </Link>

      <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white lg:text-4xl">
        Conditions Générales d&apos;Utilisation
      </h1>
      <p className="mb-10 text-sm text-gray-500 dark:text-gray-400">
        Dernière mise à jour : 1er avril 2026
      </p>

      <div className="space-y-10 text-sm leading-relaxed text-gray-600 dark:text-gray-400">

        {/* 1 */}
        <section>
          <h2 className="mb-3 text-lg font-bold text-gray-900 dark:text-white">1. Objet</h2>
          <p>
            Les présentes Conditions Generales d&apos;Utilisation (CGU) régissent l&apos;acces et l&apos;utilisation
            de la plateforme WeJustice, accessible à l&apos;adresse wejustice.legal.
            WeJustice est une plateforme d&apos;actions juridiques collectives qui permet aux citoyens
            de signer, soutenir et suivre des actions en justice collectives.
          </p>
          <p className="mt-3">
            En utilisant la plateforme, vous acceptez les présentes CGU dans leur intégralité.
            Si vous n&apos;acceptez pas ces conditions, veuillez ne pas utiliser le service.
          </p>
        </section>

        {/* 2 */}
        <section>
          <h2 className="mb-3 text-lg font-bold text-gray-900 dark:text-white">2. Description du service</h2>
          <p>WeJustice propose les services suivants :</p>
          <ul className="mt-3 space-y-2 pl-5">
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gray-400"></span>
              <span><strong className="text-gray-900 dark:text-white">Signature gratuite</strong> - Signer une action collective pour exprimer votre soutien. Aucun engagement financier ni juridique.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gray-400"></span>
              <span><strong className="text-gray-900 dark:text-white">Soutien financier</strong> - Contribuer financierement au financement des actions juridiques. Ce soutien est volontaire et ne fait pas de vous un plaignant.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gray-400"></span>
              <span><strong className="text-gray-900 dark:text-white">Constitution de dossier</strong> - Si vous etes directement concerne par une action, vous pouvez constituer un dossier pour devenir partie prenante de la procedure juridique. Cette demarche est facultative.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gray-400"></span>
              <span><strong className="text-gray-900 dark:text-white">Suivi et transparence</strong> - Suivre l&apos;avancement des actions, consulter l&apos;utilisation des fonds collectés, et participer a la communauté.</span>
            </li>
          </ul>
        </section>

        {/* 3 */}
        <section>
          <h2 className="mb-3 text-lg font-bold text-gray-900 dark:text-white">3. Acces a la plateforme</h2>
          <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-4 py-3 font-medium text-gray-900 dark:text-white">Niveau d&apos;accès</th>
                  <th className="px-4 py-3 font-medium text-gray-900 dark:text-white">Inscription requise</th>
                  <th className="px-4 py-3 font-medium text-gray-900 dark:text-white">Fonctionnalités</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">Visiteur</td>
                  <td className="px-4 py-3">Non</td>
                  <td className="px-4 py-3">Consultation des actions, lecture du blog</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">Signataire</td>
                  <td className="px-4 py-3">Prenom, nom, email</td>
                  <td className="px-4 py-3">Signature d&apos;actions, suivi</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">Membre</td>
                  <td className="px-4 py-3">Compte complet</td>
                  <td className="px-4 py-3">Soutien financier, constitution de dossier, communauté</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 4 */}
        <section>
          <h2 className="mb-3 text-lg font-bold text-gray-900 dark:text-white">4. Signature et engagement</h2>
          <div className="rounded-lg border-l-4 border-green-500 bg-green-50 p-4 dark:border-green-400 dark:bg-green-900/20">
            <p className="font-medium text-green-800 dark:text-green-300">
              Signer une action est gratuit et ne vous engage a rien.
            </p>
            <p className="mt-2 text-green-700 dark:text-green-400">
              Votre signature exprime votre soutien a l&apos;action collective. Elle ne fait pas
              de vous un plaignant et ne vous engage dans aucune procedure juridique.
              Vous pouvez demander le retrait de votre signature a tout moment.
            </p>
          </div>
        </section>

        {/* 5 */}
        <section>
          <h2 className="mb-3 text-lg font-bold text-gray-900 dark:text-white">5. Propriété intellectuelle</h2>
          <p>
            L&apos;ensemble des contenus de la plateforme (textes, images, logo, code source)
            sont la propriete de WeJustice ou de ses partenaires. Toute reproduction,
            meme partielle, est interdite sans autorisation préalable.
          </p>
          <p className="mt-3">
            Les contenus publiés par les utilisateurs (commentaires, temoignages) restent
            la propriete de leurs auteurs. En les publiant sur la plateforme, vous accordez
            a WeJustice une licence non exclusive d&apos;utilisation dans le cadre des actions collectives.
          </p>
        </section>

        {/* 6 */}
        <section>
          <h2 className="mb-3 text-lg font-bold text-gray-900 dark:text-white">6. Responsabilité</h2>
          <p>
            WeJustice met tout en oeuvre pour assurer la fiabilité des informations publiées
            sur la plateforme. Toutefois, WeJustice ne peut etre tenue responsable :
          </p>
          <ul className="mt-3 space-y-1 pl-5">
            <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gray-400"></span>Des decisions juridiques rendues dans le cadre des actions collectives</li>
            <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gray-400"></span>De l&apos;issue des procedures engagées</li>
            <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gray-400"></span>Des interruptions temporaires du service pour maintenance</li>
            <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gray-400"></span>Des contenus publiés par les utilisateurs</li>
          </ul>
        </section>

        {/* 7 */}
        <section>
          <h2 className="mb-3 text-lg font-bold text-gray-900 dark:text-white">7. Regles d&apos;utilisation</h2>
          <p>L&apos;utilisateur s&apos;engage a :</p>
          <ul className="mt-3 space-y-1 pl-5">
            <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gray-400"></span>Fournir des informations exactes lors de l&apos;inscription et de la signature</li>
            <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gray-400"></span>Ne pas creer de fausses signatures</li>
            <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gray-400"></span>Respecter les autres utilisateurs dans les espaces de discussion</li>
            <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gray-400"></span>Ne pas publier de contenu illegal, diffamatoire ou haineux</li>
            <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gray-400"></span>Ne pas compromettre la sécurité de la plateforme</li>
          </ul>
          <p className="mt-3">
            WeJustice se réserve le droit de supprimer tout contenu contraire aux présentes
            CGU et de suspendre ou supprimer tout compte en infraction.
          </p>
        </section>

        {/* 8 */}
        <section>
          <h2 className="mb-3 text-lg font-bold text-gray-900 dark:text-white">8. Donnees personnelles</h2>
          <p>
            Le traitement de vos données personnelles est décrit dans notre{" "}
            <Link href={`/${locale}/confidentialite`} className="font-medium text-primary-600 underline dark:text-primary-400">
              Politique de confidentialité
            </Link>.
          </p>
          <p className="mt-3">
            En résumé : nous collectons uniquement les données nécessaires au fonctionnement
            du service, nous ne vendons jamais vos données, et vous pouvez exercer vos droits
            (accès, rectification, suppression) à tout moment.
          </p>
        </section>

        {/* 9 */}
        <section>
          <h2 className="mb-3 text-lg font-bold text-gray-900 dark:text-white">9. Modification des CGU</h2>
          <p>
            WeJustice se réserve le droit de modifier les présentes CGU à tout moment.
            Les utilisateurs seront informes des modifications par email ou notification
            sur la plateforme. L&apos;utilisation continue du service apres modification
            vaut acceptation des nouvelles conditions.
          </p>
        </section>

        {/* 10 */}
        <section>
          <h2 className="mb-3 text-lg font-bold text-gray-900 dark:text-white">10. Droit applicable</h2>
          <p>
            Les présentes CGU sont régies par le droit français.
            Tout litige relatif a l&apos;utilisation de la plateforme sera soumis
            aux tribunaux competents de Paris.
          </p>
        </section>

        {/* Contact */}
        <section className="rounded-lg bg-gray-50 p-6 dark:bg-gray-800">
          <h2 className="mb-3 text-lg font-bold text-gray-900 dark:text-white">Contact</h2>
          <p>
            Pour toute question relative aux présentes CGU, contactez-nous :
          </p>
          <p className="mt-2 font-medium text-gray-900 dark:text-white">
            contact@wejustice.legal
          </p>
        </section>
      </div>
    </article>
  );
}
