import { setRequestLocale } from "next-intl/server";
import { MerciClient } from "./MerciClient";

type Props = { params: Promise<{ locale: string; id: string }> };

export default async function MerciPage({ params }: Props) {
  const { locale, id } = await params;
  setRequestLocale(locale);
  return <MerciClient actionId={id} />;
}
