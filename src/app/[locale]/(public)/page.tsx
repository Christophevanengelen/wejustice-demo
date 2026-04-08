import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { HomepageClient } from "./HomepageClient";

type Props = {
  params: Promise<{ locale: string }>;
};

export const metadata: Metadata = {
  title: "Ensemble, faisons respecter nos droits",
  description: "Wejustice rassemble les citoyens pour des actions juridiques collectives. Signez, rejoignez, agissez.",
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <HomepageClient />;
}
