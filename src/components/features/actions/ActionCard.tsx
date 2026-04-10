"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { MilestoneProgress } from "@/components/features/actions/MilestoneProgress";

interface ActionCardProps {
  id: string;
  slug: string;
  title: string;
  description: string;
  status: string;
  tag: string;
  themes: string[];
  signatures: { current: number; goal: number };
  lawyer: { name: string; firm: string };
  image: string;
  locale: string;
  showLawyer?: boolean;
  signaturesThisWeek?: number;
}

export function ActionCard({
  id,
  slug,
  title,
  description,
  status,
  tag,
  themes,
  signatures,
  lawyer,
  image,
  locale,
  showLawyer = false,
  signaturesThisWeek = 0,
}: ActionCardProps) {
  const t = useTranslations("actions");
  // TODO: action content translations will come from backend CMS

  return (
    <Link
      href={`/${locale}/actions/${slug}`}
      className="group flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white transition-colors hover:shadow-lg dark:border-white/[0.08] dark:bg-gray-900 dark:hover:border-white/[0.14] dark:hover:shadow-none"
    >
      {/* Image with overlay on hover */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="img-zoom object-cover"
          onError={(e) => {
            const img = e.target as HTMLImageElement;
            if (!img.src.endsWith("default.png")) {
              img.src = "/images/actions/default.png";
            }
          }}
        />
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        {/* Status badge */}
        <div className="absolute left-3 top-3">
          <StatusBadge status={status} />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        {/* Tag + themes */}
        <p className="mb-3 truncate text-xs text-gray-500 dark:text-gray-400">
          <span className="font-semibold text-gray-900 dark:text-white">#{tag}</span>
          {themes.slice(0, 2).map((thm) => (
            <span key={thm}> · <span className="capitalize">{thm}</span></span>
          ))}
        </p>

        <h3 className="mb-2 text-base font-bold leading-snug text-gray-900 dark:text-white">
          {title}
        </h3>

        <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
          {description}
        </p>

        <div className="mt-auto">
          {showLawyer && (
            <p className="mb-3 truncate text-xs text-gray-400 dark:text-gray-500">
              {lawyer.name} - {lawyer.firm}
            </p>
          )}

          {/* Signature count + trending on same line */}
          <div className="mb-1 flex items-center gap-2">
            <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
              {signatures.current.toLocaleString(locale === "en" ? "en-US" : "fr-FR")} {t("signatures")}
            </span>
            {signaturesThisWeek > 0 && (
              <span className="inline-flex items-center gap-0.5 text-[10px] font-medium text-orange-500 dark:text-orange-400">
                <svg className="h-2.5 w-2.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                </svg>
                {t("perWeek", { count: signaturesThisWeek })}
              </span>
            )}
          </div>
          <MilestoneProgress
            currentSignatures={signatures.current}
            goalSignatures={signatures.goal}
            variant="compact"
          />
        </div>
      </div>
    </Link>
  );
}
