import type { Metadata } from "next";
import { absoluteUrl, baseOpenGraph, baseTwitter } from "@/lib/metadata";
import { RejoindreClient } from "./RejoindreClient";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const title = locale === "fr"
    ? "Rejoindre Wejustice — Créez votre compte"
    : "Join Wejustice — Create your account";
  const description = locale === "fr"
    ? "Créez votre compte gratuit et rejoignez le 5ème pouvoir. Signez des pétitions, soutenez des actions collectives en Justice."
    : "Create your free account and join the 5th power. Sign petitions, support collective legal actions.";

  return {
    title,
    description,
    alternates: {
      canonical: absoluteUrl(`/${locale}/rejoindre`),
      languages: { fr: absoluteUrl("/fr/rejoindre"), en: absoluteUrl("/en/rejoindre") },
    },
    openGraph: { ...baseOpenGraph(locale), title, description, url: absoluteUrl(`/${locale}/rejoindre`) },
    twitter: { ...baseTwitter(), title, description },
  };
}

export default function RejoindrePage() {
  return <RejoindreClient />;
}
