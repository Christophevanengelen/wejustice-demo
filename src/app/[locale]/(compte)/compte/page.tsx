"use client";

/**
 * CompteDashboard — Tableau de bord de l'espace membre.
 *
 * Règles :
 * - Card Flowbite partout
 * - Progress bars en brand red via Progress Flowbite color="red"
 * - Images actions : Next.js <Image> (pas de <img>)
 * - Notifications récentes : fond subtil pour non lues, PAS de dot
 * - Border-radius : rounded-lg (Flowbite default) partout
 * - Dark mode complet
 */

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useAuthSafe } from "@/lib/mock-auth";
import { getMaxActions } from "@/lib/pricing-engine";
import { ComptePageShell } from "@/components/features/compte/ComptePageShell";
import { CTAButton } from "@/components/ui/CTAButton";
import { Card, Badge, Progress, Alert } from "flowbite-react";
import userActivity from "@/mocks/user-activity.json";
import actionsData from "@/mocks/actions.json";

export default function CompteDashboard() {
  const params = useParams();
  const locale = (params?.locale as string) || "fr";
  const { user } = useAuthSafe();
  const [hasSignedActions] = useState(false);

  const maxActions = getMaxActions(userActivity.plan);
  const rejointes = userActivity.actionsRejointes.length;
  const sigCount = userActivity.signatures.length;
  const seatsUsed = userActivity.seats.used;
  const seatsMax = userActivity.seats.max;
  const unread = userActivity.notifications.filter((n) => !n.read).length;
  const recentNotifs = [...userActivity.notifications]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);
  const rejointesActions = actionsData.filter((a) => userActivity.actionsRejointes.includes(a.id));

  if (!hasSignedActions) {
    return (
      <ComptePageShell
        title={`Bonjour ${user?.firstName || "Jean"} !`}
        subtitle="Nouveau membre"
      >
        <div className="mx-auto max-w-2xl py-8 text-center">
          <div className="rounded-lg border border-gray-200 bg-white p-8 dark:border-white/[0.08] dark:bg-gray-900 lg:p-12">
            {/* Welcome icon */}
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-brand/10">
              <svg className="h-8 w-8 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </div>

            <h2 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white lg:text-3xl">
              Bienvenue sur Wejustice !
            </h2>
            <p className="mx-auto mb-8 max-w-md text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Vous n&apos;avez pas encore signe d&apos;action. C&apos;est le moment de faire entendre votre voix.
            </p>

            <CTAButton href={`/${locale}/actions`} size="xl">
              Signer toutes les actions ouvertes en un clic
            </CTAButton>

            <p className="mt-6 text-sm text-gray-500 dark:text-gray-400">
              Ou parcourez les actions pour choisir celles qui vous concernent.
            </p>
            <Link
              href={`/${locale}/actions`}
              className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-brand hover:underline"
            >
              Voir les actions
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
              </svg>
            </Link>
          </div>
        </div>
      </ComptePageShell>
    );
  }

  return (
    <ComptePageShell
      title={`Bonjour ${user?.firstName || "Jean"} !`}
      subtitle={`${user?.grade || "Citoyen engage"} | Forfait ${userActivity.planLabel}`}
    >
      {/* Stats cards — 3 colonnes sur desktop */}
      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <Card>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {rejointes} / {maxActions === Infinity ? "\u221E" : maxActions}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Actions rejointes</p>
          {maxActions !== Infinity && (
            <Progress
              progress={Math.min(100, (rejointes / maxActions) * 100)}
              color="red"
              size="sm"
            />
          )}
        </Card>
        <Card>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {seatsUsed} / {seatsMax}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Seats utilises</p>
          <Progress progress={(seatsUsed / seatsMax) * 100} color="red" size="sm" />
        </Card>
        <Card>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">{sigCount}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Signatures gratuites</p>
        </Card>
      </div>

      {/* Actions rejointes — avec Next.js Image */}
      <div className="mb-8">
        <h2 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">Actions rejointes</h2>
        <div className="space-y-3">
          {rejointesActions.map((action) => (
            <Card key={action.id}>
              <Link
                href={`/${locale}/actions/${action.id}`}
                className="flex items-center gap-4 transition-opacity hover:opacity-80"
              >
                {/* Image — même taille que sur /signatures (h-16 w-24) */}
                <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-lg bg-gray-200 dark:bg-gray-700">
                  <Image
                    src={action.image}
                    alt={action.title}
                    fill
                    sizes="96px"
                    className="object-cover"
                    onError={(e) => {
                      const img = e.target as HTMLImageElement;
                      if (!img.src.endsWith("default.png")) {
                        img.src = "/images/actions/default.png";
                      }
                    }}
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold text-gray-900 dark:text-white">
                    {action.title}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">#{action.tag}</p>
                </div>
                <Badge color="green" size="xs">Vous participez</Badge>
              </Link>
            </Card>
          ))}
        </div>
        {/* Alerte si limite atteinte */}
        {maxActions !== Infinity && rejointes >= maxActions && (
          <Alert color="warning" className="mt-3">
            <span className="text-xs">
              Vous avez atteint la limite de votre forfait ({rejointes}/{maxActions} actions).{" "}
              <Link href={`/${locale}/tarifs`} className="font-medium underline">
                Passer a Aura pour un acces illimite
              </Link>
            </span>
          </Alert>
        )}
      </div>

      {/* Code invitation */}
      <Card className="mb-8">
        <h2 className="text-base font-bold text-gray-900 dark:text-white">Inviter des proches</h2>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Partagez ce code avec vos proches pour qu&apos;ils beneficient de votre forfait.
        </p>
        <div className="flex items-center gap-3">
          <code className="rounded-lg bg-gray-100 px-4 py-2 font-mono text-sm font-bold text-gray-900 dark:bg-gray-700 dark:text-white">
            {userActivity.inviteCode}
          </code>
          <button
            onClick={() => { navigator.clipboard?.writeText(userActivity.inviteCode); }}
            className="rounded-lg border border-gray-300 px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            Copier
          </button>
        </div>
        <p className="text-xs text-gray-400 dark:text-gray-500">
          {seatsUsed} / {seatsMax} seats utilises
        </p>
      </Card>

      {/* Dernière activité — notifications récentes */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">Derniere activite</h2>
          <Link
            href={`/${locale}/compte/notifications`}
            className="text-xs font-medium text-brand hover:underline"
          >
            Voir tout ({unread} non lues)
          </Link>
        </div>
        <div className="space-y-2">
          {recentNotifs.map((n) => (
            <Card
              key={n.id}
              /* Non lues : fond bleu subtil, PAS de dot */
              className={!n.read ? "bg-blue-50 dark:bg-blue-900/10" : ""}
            >
              <div className="flex items-start gap-2">
                <p className="flex-1 text-sm font-medium text-gray-900 dark:text-white">{n.title}</p>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">{n.body}</p>
            </Card>
          ))}
        </div>
      </div>
    </ComptePageShell>
  );
}
