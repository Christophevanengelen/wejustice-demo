import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { TarifsClient } from "./TarifsClient";
import { faqJsonLd, breadcrumbJsonLd, safeJsonLd } from "@/lib/jsonld";

type Props = { params: Promise<{ locale: string }> };

export const metadata: Metadata = {
  title: "Forfaits Libertés",
  description: "Choisissez votre forfait Wejustice et rejoignez les actions collectives en Justice. À partir de 5,90 EUR/mois.",
};

const FAQ_ITEMS = [
  { q: "Quelle est la différence entre signer et rejoindre ?", a: "Signer une action est gratuit et illimité : cela exprime votre soutien. Rejoindre signifie devenir partie prenante de l'action en Justice, ce qui est encadré par votre forfait." },
  { q: "Puis-je changer de forfait en cours de route ?", a: "Oui, vous pouvez passer à un forfait supérieur à tout moment. La différence sera calculée au prorata de votre engagement restant." },
  { q: "Qu'est-ce que le tarif réduit ?", a: "Le tarif réduit (-50%) est réservé aux personnes en situation de précarité (chômage, étudiants, faibles retraites). Un justificatif peut être demandé." },
  { q: "Comment fonctionne le forfait groupe ?", a: "Avec les forfaits Plus (2 pers.), Maxi (3 pers.) ou Aura (4 pers.), vous financez l'abonnement de vos proches. Chacun a son propre compte et ses propres actions." },
  { q: "Mon don libre est-il déductible des impôts ?", a: "Wejustice est en cours d'obtention du statut d'intérêt général. Nous vous tiendrons informé dès que la déductibilité fiscale sera active." },
  { q: "Que se passe-t-il si je ne renouvelle pas ?", a: "Vos signatures restent actives. Vous ne pourrez simplement plus rejoindre de nouvelles actions tant que vous n'aurez pas réactivé un forfait." },
];

export default async function TarifsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(faqJsonLd(FAQ_ITEMS)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(breadcrumbJsonLd([
          { name: "Accueil", href: `/${locale}` },
          { name: "Tarifs", href: `/${locale}/tarifs` },
        ])) }}
      />
      <TarifsClient />
    </>
  );
}
