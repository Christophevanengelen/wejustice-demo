"use client";

/**
 * ShareButtons — Partage multi-plateforme avec Open Graph.
 *
 * Ouvre les vrais URLs de partage dans une nouvelle fenêtre.
 * Les plateformes récupèrent automatiquement les OG tags de la page cible.
 *
 * Deux variantes :
 * - "icon-row" : Icônes circulaires horizontales (hero action, sidebar)
 * - "grid" : Grille 2 colonnes avec labels (page partager, page merci)
 *
 * Plateformes : Twitter/X, Facebook, LinkedIn, WhatsApp, Email, Copier le lien
 */

import { useState } from "react";

interface ShareButtonsProps {
  url: string;
  title: string;
  hashtag: string;
  variant?: "icon-row" | "grid";
  onShare?: (platform: string) => void;
}

interface Platform {
  id: string;
  label: string;
  /** SVG path(s) */
  icon: string;
  /** true = use stroke (email, copy), false = use fill (social icons) */
  stroke: boolean;
  /** Build the share URL. Returns null for "copy". */
  getUrl: (url: string, title: string, hashtag: string) => string | null;
}

const PLATFORMS: Platform[] = [
  {
    id: "twitter",
    label: "Twitter / X",
    icon: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
    stroke: false,
    getUrl: (url, title, hashtag) =>
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}&hashtags=${encodeURIComponent(hashtag)}`,
  },
  {
    id: "facebook",
    label: "Facebook",
    icon: "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z",
    stroke: false,
    getUrl: (url) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    icon: "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 110-4 2 2 0 010 4z",
    stroke: false,
    getUrl: (url, title) =>
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    icon: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z",
    stroke: false,
    getUrl: (url, title) =>
      `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`,
  },
  {
    id: "email",
    label: "Par email",
    icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
    stroke: true,
    getUrl: (url, title) =>
      `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${title}\n\n${url}`)}`,
  },
  {
    id: "copy",
    label: "Copier le lien",
    icon: "M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z",
    stroke: true,
    getUrl: () => null,
  },
];

export function ShareButtons({
  url,
  title,
  hashtag,
  variant = "icon-row",
  onShare,
}: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = (platform: Platform) => {
    if (platform.id === "copy") {
      navigator.clipboard?.writeText(url).catch(() => {});
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      onShare?.("copy");
      return;
    }

    const shareUrl = platform.getUrl(url, title, hashtag);
    if (shareUrl) {
      // Email ouvre dans le même onglet, les autres dans un popup
      if (platform.id === "email") {
        window.location.href = shareUrl;
      } else {
        window.open(shareUrl, "_blank", "noopener,noreferrer,width=600,height=500");
      }
    }
    onShare?.(platform.id);
  };

  /* ─── Icon-row variant (hero, compact) ─── */
  if (variant === "icon-row") {
    return (
      <div className="flex items-center gap-2">
        {PLATFORMS.map((platform) => (
          <button
            key={platform.id}
            onClick={() => handleShare(platform)}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/70 transition-colors hover:bg-white/20 hover:text-white"
            aria-label={platform.id === "copy" && copied ? "Lien copié" : platform.label}
            title={platform.id === "copy" && copied ? "Copié !" : platform.label}
          >
            <svg
              className="h-4 w-4"
              fill={platform.stroke ? "none" : "currentColor"}
              viewBox="0 0 24 24"
              stroke={platform.stroke ? "currentColor" : "none"}
              strokeWidth={platform.stroke ? 1.5 : 0}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d={platform.icon} />
            </svg>
          </button>
        ))}
      </div>
    );
  }

  /* ─── Grid variant (partager page, merci page) ─── */
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {PLATFORMS.map((platform) => (
        <button
          key={platform.id}
          onClick={() => handleShare(platform)}
          className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white px-5 py-4 text-left text-sm font-medium text-gray-900 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
        >
          <svg
            className="h-5 w-5 text-gray-400"
            fill={platform.stroke ? "none" : "currentColor"}
            viewBox="0 0 24 24"
            stroke={platform.stroke ? "currentColor" : "none"}
            strokeWidth={platform.stroke ? 1.5 : 0}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d={platform.icon} />
          </svg>
          {platform.id === "copy" && copied ? "Lien copié !" : platform.label}
        </button>
      ))}
    </div>
  );
}
