"use client";

/**
 * ProfilPage — Informations personnelles du membre.
 *
 * Règles :
 * - Card Flowbite pour chaque section
 * - TextInput Flowbite disabled (lecture seule pour la démo)
 * - Badge plan avec couleur dynamique (planColor du mock)
 * - ToggleSwitch pour les préférences
 * - Zone danger : border rouge subtil, texte rouge, bouton disabled
 * - Dark mode complet
 * - rounded-lg partout (Flowbite default)
 */

import Link from "next/link";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useAuthSafe } from "@/lib/mock-auth";
import { ComptePageShell } from "@/components/features/compte/ComptePageShell";
import { Card, Badge, TextInput, Label, ToggleSwitch } from "flowbite-react";
import userActivity from "@/mocks/user-activity.json";

export default function ProfilPage() {
  const params = useParams();
  const locale = (params?.locale as string) || "fr";
  const { user } = useAuthSafe();
  const t = useTranslations("compte");

  return (
    <ComptePageShell
      title={t("profileTitle")}
      subtitle={t("profileSubtitle")}
    >
      <div className="space-y-4">
        {/* Informations personnelles */}
        <Card>
          <h2 className="text-base font-bold text-gray-900 dark:text-white">
            {t("personalInfo")}
          </h2>
          <div className="space-y-3">
            <div>
              <Label htmlFor="prenom">{t("firstName")}</Label>
              <TextInput id="prenom" value={user?.firstName || "Jean"} disabled className="mt-1" />
            </div>
            <div>
              <Label htmlFor="nom">{t("lastName")}</Label>
              <TextInput id="nom" value={user?.lastName || "Dupont"} disabled className="mt-1" />
            </div>
            <div>
              <Label htmlFor="email">{t("emailLabel")}</Label>
              <TextInput
                id="email"
                type="email"
                value={user?.email || "jean.dupont@example.com"}
                disabled
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="pays">{t("country")}</Label>
              <TextInput id="pays" value="France" disabled className="mt-1" />
            </div>
          </div>
        </Card>

        {/* Forfait actuel */}
        <Card>
          <h2 className="text-base font-bold text-gray-900 dark:text-white">{t("currentPlan")}</h2>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Badge style={{ backgroundColor: userActivity.planColor }} size="xs" className="text-white">
                {userActivity.planLabel}
              </Badge>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {userActivity.actionsRejointes.length}/{userActivity.maxActions} actions
              </span>
            </div>
            <Link
              href={`/${locale}/tarifs`}
              className="text-xs font-medium text-brand hover:underline"
            >
              {t("changePlan")}
            </Link>
          </div>
        </Card>

        {/* Préférences */}
        <Card>
          <h2 className="text-base font-bold text-gray-900 dark:text-white">{t("preferences")}</h2>
          <div className="space-y-4">
            <ToggleSwitch checked={true} label={t("gazette")} onChange={() => {}} disabled />
            <ToggleSwitch checked={true} label={t("emailNotifs")} onChange={() => {}} disabled />
          </div>
        </Card>

        {/* Zone danger — border rouge subtil */}
        <Card className="border-red-200 dark:border-red-800">
          <h2 className="text-base font-bold text-red-700 dark:text-red-400">{t("dangerZone")}</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {t("deleteWarning")}
          </p>
          <button
            disabled
            className="rounded-lg border border-red-300 px-4 py-2 text-xs font-medium text-red-600 opacity-50 dark:border-red-700 dark:text-red-400"
          >
            {t("deleteAccount")}
          </button>
        </Card>
      </div>
    </ComptePageShell>
  );
}
