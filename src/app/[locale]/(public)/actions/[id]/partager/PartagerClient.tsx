"use client";

import { Button } from "flowbite-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ShareButtons } from "@/components/features/actions/ShareButtons";
import actionsData from "@/mocks/actions.json";

export function PartagerClient({ actionId }: { actionId: string }) {
  const params = useParams();
  const locale = (params?.locale as string) || "fr";
  const action = actionsData.find((a) => a.id === actionId || a.slug === actionId);
  const title = action?.title || "cette action";
  const shareUrl = `https://wejustice-demo.vercel.app/${locale}/actions/${action?.slug || actionId}`;

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="mx-auto flex min-h-[60vh] max-w-screen-md flex-col items-center justify-center px-4 py-16 text-center lg:py-24">
        <h1 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
          Partagez cette action
        </h1>
        <p className="mb-10 max-w-lg text-lg text-gray-500 dark:text-gray-400">
          Plus nous sommes nombreux, plus notre voix porte.
          Partagez «{title}» autour de vous.
        </p>

        <div className="mb-10 w-full max-w-md">
          <ShareButtons
            url={shareUrl}
            title={title}
            hashtag={action?.tag || "WeJustice"}
            variant="grid"
          />
        </div>

        <Button color="light" size="lg" as={Link} href={`/${locale}/actions/${actionId}`}>
          Retour à l&apos;action
        </Button>
      </div>
    </section>
  );
}
