"use client";

/**
 * SignaturesPage — Liste des actions signées par le membre.
 *
 * Style IDENTIQUE aux ActionCards du site public :
 * - Image avec Next.js <Image>, rounded-lg, même ratio
 * - Badges : tag en contraste (bg-gray-900/white), Flowbite Badge size="xs"
 * - CTA : vrais Button Flowbite size="xs", pas des labels
 * - Border-radius : rounded-lg partout (cards + images)
 * - Dark mode complet
 */

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useAuthSafe } from "@/lib/mock-auth";
import { canJoinAction } from "@/lib/pricing-engine";
import { ComptePageShell } from "@/components/features/compte/ComptePageShell";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { CTAButton } from "@/components/ui/CTAButton";
import { Card, Badge, Button } from "flowbite-react";
import userActivity from "@/mocks/user-activity.json";
import actionsData from "@/mocks/actions.json";

export default function SignaturesPage() {
  const params = useParams();
  const locale = (params?.locale as string) || "fr";
  useAuthSafe();

  const signedActions = actionsData.filter((a) => userActivity.signatures.includes(a.slug));
  const canJoin = canJoinAction(userActivity.plan, userActivity.actionsRejointes);

  return (
    <ComptePageShell
      title="Mes signatures"
      subtitle={`${signedActions.length} action${signedActions.length > 1 ? "s" : ""} signee${signedActions.length > 1 ? "s" : ""}`}
    >
      <div className="space-y-4">
        {signedActions.map((action) => {
          const isRejointe = userActivity.actionsRejointes.includes(action.slug);
          return (
            <Card key={action.id} className="overflow-hidden">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                {/* Image — Next.js Image, rounded-lg, même style que ActionCard */}
                <Link
                  href={`/${locale}/actions/${action.slug}`}
                  className="relative block h-32 w-full shrink-0 overflow-hidden rounded-lg sm:h-28 sm:w-40"
                >
                  <Image
                    src={action.image}
                    alt={action.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 160px"
                    className="object-cover"
                    onError={(e) => {
                      const img = e.target as HTMLImageElement;
                      if (!img.src.endsWith("default.png")) {
                        img.src = "/images/actions/default.png";
                      }
                    }}
                  />
                </Link>

                {/* Contenu texte */}
                <div className="min-w-0 flex-1">
                  {/* Badges — taille cohérente, même style que ActionCard */}
                  <div className="mb-2 flex flex-wrap items-center gap-1.5">
                    {/* Tag en contraste comme ActionCard */}
                    <span className="rounded-full bg-gray-900 px-3 py-0.5 text-xs font-semibold text-white dark:bg-white dark:text-gray-900">
                      #{action.tag}
                    </span>
                    <StatusBadge status={action.status} size="xs" />
                    {isRejointe && (
                      <Badge color="green" size="xs">Vous participez</Badge>
                    )}
                  </div>

                  {/* Titre cliquable */}
                  <Link
                    href={`/${locale}/actions/${action.slug}`}
                    className="text-base font-bold text-gray-900 hover:text-brand dark:text-white"
                  >
                    {action.title}
                  </Link>

                  {/* Description tronquée */}
                  <p className="mt-1 line-clamp-2 text-sm text-gray-500 dark:text-gray-400">
                    {action.description}
                  </p>

                  {/* Signatures count */}
                  <p className="mt-2 text-xs font-medium text-gray-600 dark:text-gray-300">
                    {action.signatures.current.toLocaleString("fr-FR")} signatures
                  </p>

                  {/* CTA — vrais boutons Flowbite, pas des labels */}
                  <div className="mt-3 flex items-center gap-2">
                    <Button as={Link} href={`/${locale}/actions/${action.slug}`} color="gray" size="xs">
                      Voir l&apos;action
                    </Button>
                    {isRejointe ? (
                      <span className="text-xs font-medium text-green-600 dark:text-green-400">
                        Deja rejoint
                      </span>
                    ) : canJoin ? (
                      <CTAButton href="https://palace.legal" size="sm">
                        Rejoindre
                      </CTAButton>
                    ) : (
                      <span className="text-xs text-amber-600 dark:text-amber-400">
                        <Link href={`/${locale}/tarifs`} className="underline">
                          Passez au forfait superieur
                        </Link>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </ComptePageShell>
  );
}
