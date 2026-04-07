import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { ActionsListClient } from "./ActionsListClient";

type Props = { params: Promise<{ locale: string }> };

export const metadata: Metadata = {
  title: "Actions collectives en cours",
  description: "Découvrez toutes les actions collectives en Justice sur WeJustice. Signez et rejoignez les combats citoyens.",
};

export default async function ActionsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ActionsListClient />;
}
