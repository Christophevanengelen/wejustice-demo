"use client";

/**
 * SignatureForm - Premium 3-path signature component
 *
 * Path 1 (GUEST): Name + Email form with trust signals
 * Path 2 (LOGGED-IN, not signed): 1-click button with social proof
 * Path 3 (ALREADY SIGNED): Green success state + share CTA
 *
 * Premium features: gradient border glow, trust badges, live social proof,
 * animated submit feedback, Flowbite Tooltip for data protection info.
 */

import { useState, useEffect } from "react";
import { Tooltip } from "flowbite-react";
import { CTAButton } from "@/components/ui/CTAButton";
import { useAuthSafe } from "@/lib/mock-auth";
// SignatureProgress removed — progress bar is already shown in the hero zone

interface SignatureFormProps {
  actionId: string;
  hashtag: string;
  signatureCount: number;
  signatureGoal: number;
  signaturesThisWeek: number;
  hasSigned: boolean;
  onSign: () => void;
  locale: string;
}

/** Fake live signing pulse — shows "X personnes signent en ce moment" */
function useLiveSigningCount() {
  const [count, setCount] = useState(7);
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((c) => Math.max(3, c + Math.floor(Math.random() * 5) - 2));
    }, 4000);
    return () => clearInterval(interval);
  }, []);
  return count;
}

/* ─── Trust badges data ─── */
const TRUST_ITEMS = [
  {
    icon: (
      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    label: "Donnees protegees",
    tip: "Vos informations sont chiffrees et ne sont jamais partagees avec des tiers.",
  },
  {
    icon: (
      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    label: "100% gratuit",
    tip: "Signer une action est totalement gratuit et sans engagement.",
  },
];

export function SignatureForm({
  actionId,
  hashtag: _hashtag,
  signatureCount: _signatureCount,
  signatureGoal: _signatureGoal,
  signaturesThisWeek,
  hasSigned,
  onSign,
  locale,
}: SignatureFormProps) {
  const { user, isAuthenticated } = useAuthSafe();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [isSubmitCooling, setIsSubmitCooling] = useState(false);
  const [pendingEmailVerification, setPendingEmailVerification] = useState(false);
  const liveSigners = useLiveSigningCount();

  const handleGuestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitCooling) return;
    if (!firstName.trim() || !lastName.trim() || !email.trim()) return;
    setSubmitting(true);
    setIsSubmitCooling(true);
    setTimeout(() => setIsSubmitCooling(false), 5000);
    setTimeout(() => {
      setSubmitting(false);
      setPendingEmailVerification(true);
    }, 800);
  };

  const handleConfirmEmail = () => {
    onSign();
    window.location.href = `/${locale}/actions/${actionId}/merci`;
  };

  const handleOneClick = () => {
    if (isSubmitCooling) return;
    setSubmitting(true);
    setIsSubmitCooling(true);
    setTimeout(() => setIsSubmitCooling(false), 5000);
    // Demo mode — no backend call
    setTimeout(() => {
      onSign();
      window.location.href = `/${locale}/actions/${actionId}/merci`;
    }, 800);
  };

  /* ─── Outer wrapper classes ─── */
  const wrapperClass = "rounded-lg border border-gray-200 bg-white p-6 shadow-lg dark:border-white/[0.08] dark:bg-gray-900";

  /* ─── Path 3: Already signed ─── */
  if (hasSigned) {
    return (
      <div className={wrapperClass}>

        <div className="mt-4 rounded-lg bg-green-50 p-4 text-center dark:bg-green-900/20">
          <svg className="mx-auto mb-2 h-8 w-8 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          <p className="text-sm font-medium text-green-700 dark:text-green-300">
            Vous avez signe cette action
          </p>
          <p className="mt-1 text-xs text-green-600/70 dark:text-green-400/70">
            Merci pour votre engagement !
          </p>
        </div>

        {/* Secondary CTA: share */}
        <a
          href={`/${locale}/actions/${actionId}/partager`}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white py-3 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
          Partager cette action
        </a>

        <p className="mt-3 text-center text-xs text-gray-400 dark:text-gray-500">
          {signaturesThisWeek} signatures cette semaine
        </p>
      </div>
    );
  }

  /* ─── Path 2: Logged-in, 1-click ─── */
  if (isAuthenticated && user) {
    return (
      <div className={wrapperClass}>

        {/* Connected info */}
        <div className="mt-4 rounded-lg bg-green-50 p-3 dark:bg-green-900/20">
          <p className="text-xs text-green-700 dark:text-green-300">
            Connecte en tant que <strong>{user.firstName} {user.lastName}</strong>
          </p>
        </div>

        {/* Live social proof */}
        <div className="mt-3 flex items-center justify-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {liveSigners} personnes signent en ce moment
          </span>
        </div>

        {/* 1-click CTA */}
        <CTAButton
          onClick={handleOneClick}
          disabled={submitting || isSubmitCooling}
          size="lg"
          fullWidth
          className="mt-4"
        >
          {submitting ? (
            <span className="inline-flex items-center gap-2">
              <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Signature en cours...
            </span>
          ) : (
            "Signer en 1 clic"
          )}
        </CTAButton>

        {/* Trust badges */}
        <div className="mt-4 flex items-center justify-center gap-4">
          {TRUST_ITEMS.map((item) => (
            <Tooltip key={item.label} content={item.tip}>
              <span className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500">
                {item.icon}
                {item.label}
              </span>
            </Tooltip>
          ))}
        </div>
      </div>
    );
  }

  /* ─── Path 1b: Email verification pending ─── */
  if (pendingEmailVerification) {
    return (
      <div className={wrapperClass}>
        <div className="py-4 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
            <svg className="h-7 w-7 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
          </div>
          <h3 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">
            Vérifiez votre email
          </h3>
          <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
            Un email de confirmation a été envoyé à
          </p>
          <p className="mb-4 text-sm font-semibold text-gray-900 dark:text-white">
            {email}
          </p>
          <p className="mb-6 text-xs text-gray-400 dark:text-gray-500">
            Cliquez sur le lien dans l&apos;email pour valider votre signature.
            Vérifiez vos spams si vous ne le trouvez pas.
          </p>
          <CTAButton onClick={handleConfirmEmail} size="md" fullWidth>
            J&apos;ai confirmé mon email (démo)
          </CTAButton>
          <button
            onClick={() => setPendingEmailVerification(false)}
            className="mt-3 text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            Modifier mon adresse email
          </button>
        </div>
      </div>
    );
  }

  /* ─── Path 1: Guest form ─── */
  return (
    <div className={wrapperClass}>
      {/* Live social proof */}
      <div className="mt-3 flex items-center justify-center gap-2">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
        </span>
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {liveSigners} personnes signent en ce moment
        </span>
      </div>

      {/* Form */}
      <form onSubmit={handleGuestSubmit} className="mt-4 space-y-3">
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Prenom"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition-colors focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
          />
          <input
            type="text"
            placeholder="Nom"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition-colors focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
          />
        </div>
        <input
          type="email"
          placeholder="Votre adresse email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition-colors focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
        />
        <CTAButton type="submit" disabled={submitting || isSubmitCooling} size="lg" fullWidth>
          {submitting ? (
            <span className="inline-flex items-center gap-2">
              <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Signature en cours...
            </span>
          ) : (
            "Signer gratuitement"
          )}
        </CTAButton>
      </form>

      {/* Trust badges */}
      <div className="mt-4 flex items-center justify-center gap-4">
        {TRUST_ITEMS.map((item) => (
          <Tooltip key={item.label} content={item.tip}>
            <span className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500">
              {item.icon}
              {item.label}
            </span>
          </Tooltip>
        ))}
      </div>

      <p className="mt-3 text-center text-xs text-gray-400 dark:text-gray-500">
        En signant, vous acceptez les{" "}
        <a href={`/${locale}/cgu`} target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-600 dark:hover:text-gray-300">CGU</a>{" "}et la{" "}
        <a href={`/${locale}/confidentialite`} target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-600 dark:hover:text-gray-300">politique de confidentialite</a>.
      </p>
    </div>
  );
}
