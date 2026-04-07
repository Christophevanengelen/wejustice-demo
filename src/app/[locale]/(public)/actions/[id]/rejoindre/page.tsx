import { setRequestLocale } from "next-intl/server";
import Link from "next/link";
import { CTAButton } from "@/components/ui/CTAButton";

type Props = { params: Promise<{ locale: string; id: string }> };

export default async function RejoindrePage({ params }: Props) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="mx-auto flex min-h-[60vh] max-w-screen-md flex-col items-center justify-center px-4 py-16 text-center lg:py-24">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary-100 dark:bg-primary-900/30">
          <svg className="h-8 w-8 text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>

        <h1 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
          Rejoindre cette action
        </h1>
        <p className="mb-8 max-w-lg text-lg text-gray-500 dark:text-gray-400">
          Vous souhaitez devenir partie prenante de cette action juridique ?
          Commencez par souscrire à un forfait pour activer votre dossier.
        </p>

        <div className="flex flex-col gap-3 sm:flex-row">
          <CTAButton href={`/${locale}/tarifs`} size="lg">
            Découvrir les forfaits
          </CTAButton>
          <Link
            href={`/${locale}/actions/${id}`}
            className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-6 py-3 text-base font-medium text-gray-700 transition-all hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            Retour à l&apos;action
          </Link>
        </div>
      </div>
    </section>
  );
}
