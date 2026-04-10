"use client";

/**
 * MerciClient - Post-Signature Viral Growth Engine
 *
 * This is not a "thank you" page. It is a GROWTH ENGINE.
 * Every element is designed to maximize sharing and re-engagement.
 */

import { useEffect, useMemo, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { CTAButton } from "@/components/ui/CTAButton";
import { AnimatedCounter } from "@/components/animations";
import { EASING, DURATION } from "@/components/animations";
import { MilestoneProgress } from "@/components/features/actions/MilestoneProgress";
import actionsData from "@/mocks/actions.json";

/* -- Confetti particle -- */
function ConfettiPiece({ delay, x }: { delay: number; x: number }) {
  const color = useMemo(() => {
    const colors = ["#C20520", "#16A34A", "#3B82F6", "#F59E0B", "#8B5CF6", "#EC4899"];
    return colors[Math.floor(Math.random() * colors.length)];
  }, []);

  return (
    <motion.div
      className="absolute top-0"
      style={{ left: `${x}%`, backgroundColor: color, width: 8, height: 8, borderRadius: 2 }}
      initial={{ y: -20, opacity: 1, rotate: 0, scale: 1 }}
      animate={{
        y: [0, 200, 400],
        opacity: [1, 1, 0],
        rotate: [0, 180, 360],
        scale: [1, 0.8, 0.5],
        x: [0, (Math.random() - 0.5) * 100],
      }}
      transition={{ duration: 2.5, delay, ease: "easeOut" }}
    />
  );
}

/* -- Share platform config -- */
const SHARE_PLATFORMS = [
  {
    id: "twitter",
    reachKey: "twitter" as const,
    bgClass: "bg-black hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-200",
    textClass: "text-white dark:text-black",
    icon: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
    fill: true,
  },
  {
    id: "whatsapp",
    reachKey: "whatsapp" as const,
    bgClass: "bg-green-600 hover:bg-green-700",
    textClass: "text-white",
    icon: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z",
    fill: true,
  },
  {
    id: "facebook",
    reachKey: "facebook" as const,
    bgClass: "bg-blue-600 hover:bg-blue-700",
    textClass: "text-white",
    icon: "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z",
    fill: true,
  },
  {
    id: "linkedin",
    reachKey: "linkedin" as const,
    bgClass: "bg-blue-700 hover:bg-blue-800",
    textClass: "text-white",
    icon: "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 110-4 2 2 0 010 4z",
    fill: true,
  },
];

/* -- Generate referral code -- */
function generateReferralCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const part1 = Array.from({ length: 2 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
  const part2 = Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
  return `${part1}-${part2}`;
}

export function MerciClient({ actionId }: { actionId: string }) {
  const params = useParams();
  const searchParams = useSearchParams();
  const locale = (params?.locale as string) || "fr";
  const prefersReduced = useReducedMotion();
  const verifyEmail = searchParams?.get("verify");
  const t = useTranslations("merci");
  const tShare = useTranslations("share");

  const action = actionsData.find((a) => a.id === actionId || a.slug === actionId);
  // TODO: action content translations will come from backend CMS
  const title = action?.title || "cette action";
  const currentSigs = action?.signatures.current ?? 0;
  const goalSigs = action?.signatures.goal ?? 500000;

  const [referralCode] = useState(generateReferralCode);
  const referralUrl = `wejustice.legal/r/${referralCode}`;

  const [afterYouCount, setAfterYouCount] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setAfterYouCount((c) => c + Math.floor(Math.random() * 3) + 1);
    }, 5000 + Math.random() * 5000);
    return () => clearInterval(interval);
  }, []);

  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedReferral, setCopiedReferral] = useState(false);

  const confettiPieces = useMemo(
    () =>
      Array.from({ length: 30 }, (_, i) => ({
        id: i,
        delay: Math.random() * 0.8,
        x: Math.random() * 100,
      })),
    [],
  );

  const shareUrl = `https://wejustice.legal/actions/${action?.slug ?? actionId}`;
  const tweetText = locale === "en"
    ? `I just signed the action "${title}" on @wejustice. Join us!`
    : `Je viens de signer l'action "${title}" sur @wejustice. Rejoignez-nous !`;
  const whatsappText = locale === "en"
    ? `I signed the action "${title}" on Wejustice. Join the movement: ${shareUrl}`
    : `J'ai signe l'action "${title}" sur Wejustice. Rejoignez le mouvement : ${shareUrl}`;

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(`${tweetText} ${shareUrl}`).catch(() => {});
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const pct = Math.round((currentSigs / goalSigs) * 100);
  const remaining = goalSigs - currentSigs;

  return (
    <section className="bg-white dark:bg-gray-900">
      {/* Email verification banner (guest only) */}
      {verifyEmail && (
        <div className="border-b border-blue-200 bg-blue-50 px-4 py-3 dark:border-blue-800 dark:bg-blue-900/30">
          <div className="mx-auto flex max-w-screen-md items-center gap-3">
            <svg className="h-5 w-5 shrink-0 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
            <p className="text-sm text-blue-700 dark:text-blue-300">
              {t.rich("emailVerification", { email: verifyEmail, strong: (chunks) => <strong>{chunks}</strong> })}
            </p>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-screen-md px-4 py-12 lg:py-20">
        {/* === 1. ANIMATED SUCCESS === */}
        <div className="relative mb-8 flex flex-col items-center text-center">
          {!prefersReduced && (
            <div className="pointer-events-none absolute inset-x-0 top-0 h-96 overflow-hidden">
              {confettiPieces.map((p) => (
                <ConfettiPiece key={p.id} delay={p.delay} x={p.x} />
              ))}
            </div>
          )}

          <motion.div
            initial={prefersReduced ? false : { scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: EASING.bounce, delay: 0.2 }}
            className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30"
          >
            <motion.svg
              className="h-12 w-12 text-green-500 dark:text-green-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              initial={prefersReduced ? false : { pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </motion.svg>
          </motion.div>

          <motion.h1
            initial={prefersReduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DURATION.slow, delay: 0.4, ease: EASING.smooth }}
            className="mb-2 text-3xl font-bold text-gray-900 dark:text-white lg:text-4xl"
          >
            {t("title")}
          </motion.h1>

          <motion.p
            initial={prefersReduced ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DURATION.slow, delay: 0.6, ease: EASING.smooth }}
            className="text-lg text-gray-500 dark:text-gray-400"
          >
            {t("supportRegistered", { title })}
          </motion.p>
        </div>

        {/* === 2. COUNTER + PROGRESS === */}
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DURATION.slow, delay: 0.8, ease: EASING.smooth }}
          className="mb-8 rounded-lg border border-gray-100 bg-gray-50 p-6 dark:border-white/[0.08] dark:bg-gray-900"
        >
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            {t("youAreSignatory")}{" "}
            <span className="text-lg font-bold text-gray-900 dark:text-white">
              <AnimatedCounter value={currentSigs} duration={2} />
              <sup className="text-xs">
                {locale === "en" ? "th" : "e"}
              </sup>
            </span>{" "}
            {t("signatory")}. {t("moreToGo")}{" "}
            <span className="font-bold text-gray-900 dark:text-white">
              {remaining.toLocaleString(locale === "en" ? "en-US" : "fr-FR")}
            </span>{" "}
            {t("toReach")}{" "}
            <span className="font-bold text-gray-900 dark:text-white">{pct < 100 ? t("theGoal") : t("victory")}</span>.
          </p>
          <div className="mt-4">
            <MilestoneProgress currentSignatures={currentSigs} goalSignatures={goalSigs} />
          </div>
        </motion.div>

        {/* === 4. VIRAL SHARE BLOCK === */}
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DURATION.slow, delay: 1.2, ease: EASING.smooth }}
          className="mb-8 rounded-lg border-2 border-gray-200 bg-white p-6 dark:border-white/[0.08] dark:bg-gray-900"
        >
          <div className="mb-4 text-center">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {t("multiplyImpact")}
            </h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {t("shareAverage")}
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {SHARE_PLATFORMS.map((platform) => {
              const urls: Record<string, string> = {
                twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}&url=${encodeURIComponent(shareUrl)}&hashtags=${encodeURIComponent(action?.tag || "Wejustice")}`,
                facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
                linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
                whatsapp: `https://wa.me/?text=${encodeURIComponent(whatsappText)}`,
              };
              return (
                <a
                  key={platform.id}
                  href={urls[platform.id]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-3 rounded-lg px-4 py-3.5 text-left transition-all ${platform.bgClass} ${platform.textClass}`}
                >
                  <svg
                    className="h-5 w-5 shrink-0"
                    fill={platform.fill ? "currentColor" : "none"}
                    viewBox="0 0 24 24"
                    stroke={platform.fill ? "none" : "currentColor"}
                    strokeWidth={platform.fill ? 0 : 1.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d={platform.icon} />
                  </svg>
                  <div className="min-w-0 flex-1">
                    <span className="block text-sm font-medium">{tShare(platform.id)}</span>
                    <span className="block text-xs opacity-70">{t(`reach.${platform.reachKey}`)} {t("willSee")}</span>
                  </div>
                </a>
              );
            })}
          </div>

          {/* Copy message block */}
          <div className="mt-4 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-white/[0.08] dark:bg-gray-800">
            <div className="flex items-start justify-between gap-3">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {tweetText}{" "}
                <span className="text-gray-500 dark:text-gray-400">{shareUrl}</span>
              </p>
              <button
                onClick={handleCopyLink}
                className="shrink-0 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-100 dark:border-white/[0.08] dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                {copiedLink ? t("copied") : t("copy")}
              </button>
            </div>
          </div>
        </motion.div>

        {/* === 7. UPSELL === */}
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DURATION.slow, delay: 1.6, ease: EASING.smooth }}
          className="border-t border-gray-200 pt-8 text-center dark:border-white/[0.08]"
        >
          <h2 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
            {t("upsellTitle")}
          </h2>
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
            {t("upsellText")}
          </p>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <CTAButton href={`/${locale}/tarifs`} size="lg">
              {t("discoverPlans")}
            </CTAButton>
            <CTAButton href={`/${locale}/actions`} size="lg" variant="light">
              {t("discoverActions")}
            </CTAButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
