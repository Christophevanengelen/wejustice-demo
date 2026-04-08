# Wejustice Demo — PLAYBOOK

> Règles strictes pour garder le projet propre. À lire AVANT de toucher au code.
> Mis à jour : session du 8 avril 2026.

---

## Avancées session 8 avril 2026

### Audits Gstack exécutés (6/6)

| Audit | Score | Résultat |
|-------|-------|----------|
| /health | 6.5/10 | TSC 0, build OK, 5 warnings React Compiler |
| /qa-only | 62/100 | 18/18 pages chargent, faux positifs animations headless |
| /cso | MEDIUM | 4 HIGH fixés, 3 MEDIUM restants |
| /design-review | C+ | AI slop réduit, contraste renforcé |
| /devex-review | 9/10 | Docs excellentes, 3 gaps mineurs |
| /benchmark | Terminé | 3 quick wins identifiés et appliqués |

### Fixes sécurité (CSO)
- DOMPurify sur `dangerouslySetInnerHTML` blog body
- 5 security headers dans next.config.ts (HSTS, X-Frame, Referrer, Permissions, X-Content-Type)
- `ignoreBuildErrors: false` — le build échoue sur les erreurs TS
- PII retiré des console.log (SignatureForm)
- Email admin mock → example.com
- Next.js upgradé (0 vulnérabilités npm audit)

### Fixes performance (benchmark)
- Images compressées (5G, agriculteurs, phonegate, tribune — -6MB)
- `next/font/local` pour Campton (élimine CLS font)
- `LazyScrollReveal` wrapper `next/dynamic` (prêt pour lazy loading)

### Fixes qualité (health + design)
- CTAButton centralisé (13 remplacements dans 11 fichiers)
- ErrorBoundary React ajouté
- ESLint config ajoutée (eslint.config.mjs)
- COMPONENTS.md complété (+11 composants manquants)
- SignatureForm rate limiting (5s cooldown)
- Pricing cards sans ScrollReveal (visibles immédiatement)
- Piliers en-savoir-plus sans icon-in-circle (AI slop supprimé)
- Contraste body text renforcé (gray-500 → gray-600 sur en-savoir-plus)

### Dark mode Vercel/Linear (20+ fichiers)
- Borders `dark:border-white/[0.08]` (blanc 8% opacité) au lieu de `dark:border-gray-700`
- Fond uniforme `dark:bg-gray-900` pour les cards (même que page)
- Zéro shadows en dark mode (`dark:hover:shadow-none`)
- Flowbite Card theme global override (dark:bg-gray-900 + dark:border-white/[0.08])

### Commentaires Arnaud (16 appliqués)
1. Nav : "Tarifs" → "Rejoindre"
2. Light mode par défaut (users 60+)
3. Hero CTA : "Rejoindre" (primaire) + "Voir les actions" (secondaire)
4. "WeJustice" → "Wejustice" partout (casse respectée)
5. Zoom image action cards plus rapide (700ms → 300ms)
6. Étape 1 description → "Faites entrer votre nom dans l'Histoire..."
7. Nouvelle étape "Partagez" (après Signez)
8. Étape "Rassemblez" → "Rejoindre"
9. Étape "Agissez" description → "Faites partie du collectif..."
10. Étape "Gagnez" titre → "Obtenez"
11. Étape "Obtenez" description → "Recevez une décision, voire des indemnités."
12. Étape "Rejoindre" description → "Devenez... une partie à la procédure"
13. Sous-titre Comment ça marche → "De la signature au verdict..."
14. "Justice" majuscule
15. Témoignages : "Ils ont agi avec nous"
16. Étoiles supprimées des témoignages

### 5 étapes "Comment ça marche" (mis à jour)
1. **Signez** — Faites entrer votre nom dans l'Histoire en signant la pétition à l'origine du procès.
2. **Partagez** — Diffusez le projet auprès du plus grand nombre.
3. **Rejoindre** — Devenez, si vous le souhaitez et que vous êtes éligible, une partie à la procédure.
4. **Agissez** — Faites partie du collectif de l'action en Justice.
5. **Obtenez** — Recevez une décision, voire des indemnités.

### Problèmes restants
- 5 warnings React Compiler (faux positifs Framer Motion)
- i18n câblé mais non utilisé (messages JSON = dead code)
- Middleware sans rate limiting (demo, pas de backend)
- Images blog "À lire aussi" manquantes sur Vercel (OK en local)

---

## Structure du projet

```
demo/
├── src/                           ← TOUT le code source ici
│   ├── app/                       ← Pages (App Router, routes)
│   │   ├── layout.tsx             ← Root HTML shell + next/font/local Campton
│   │   ├── globals.css            ← CSS global + tokens + .bg-brand/.text-brand
│   │   └── [locale]/              ← Routes i18n
│   │       ├── (public)/          ← Route group public (Navigation + Footer)
│   │       └── (compte)/          ← Route group membre (CompteNavbar + Sidebar)
│   ├── components/                ← Composants réutilisables
│   │   ├── ui/                    ← Atoms (CTAButton, ErrorBoundary, StatusBadge, LogoFigma)
│   │   ├── layout/                ← Navigation, Footer, DemoToolbar
│   │   ├── features/              ← Par feature (actions/, pricing/, compte/)
│   │   └── animations/            ← ScrollReveal, LazyScrollReveal, AnimatedCounter
│   ├── lib/                       ← Logique métier
│   │   ├── mock-auth.tsx          ← Auth provider mock
│   │   ├── mock-api.ts            ← API client mock
│   │   ├── flowbite-theme.ts      ← Thème Flowbite global (Card dark override inclus)
│   │   └── pricing-engine.ts      ← Moteur de calcul forfaits
│   ├── mocks/                     ← Données JSON mock
│   ├── styles/                    ← wejustice-theme.css (single source of truth tokens)
│   ├── i18n/                      ← Config i18n (routing, request)
│   └── middleware.ts              ← Middleware next-intl
├── public/                        ← Assets statiques (images compressées, fonts Campton)
├── messages/                      ← Fichiers i18n JSON (fr.json, en.json)
├── .gstack/                       ← Rapports QA et retros
└── [configs racine]               ← package.json, next.config.ts, eslint.config.mjs, etc.
```

---

## Règles strictes

### 1. Tout le code dans `src/`
- **JAMAIS** de fichier `.tsx`, `.ts` (sauf configs) à la racine de `demo/`

### 2. Organisation des composants
- **`ui/`** = Atoms (CTAButton, ErrorBoundary, StatusBadge, LogoFigma, ThemeTags)
- **`layout/`** = Navigation, Footer, DemoToolbar
- **`features/{nom}/`** = Composants spécifiques à une feature
- **`animations/`** = ScrollReveal, LazyScrollReveal, AnimatedCounter, FadeIn

### 3. Un composant = un fichier = un style
- **JAMAIS** de duplication de composant entre pages
- Les pages (`app/[locale]/*`) sont de la **pure composition**

### 4. Imports
- Toujours `@/` (mappe vers `src/`). Jamais `../` entre composants.

### 5. Rouge = CTA cliquable uniquement
- `var(--color-brand)` via `.bg-brand`, `.text-brand`, `.border-brand`
- Light: #C20520, Dark: #FF4D63 (automatique)
- `primary-*` Tailwind UNIQUEMENT pour `focus:ring-primary-*`
- JAMAIS de `style={{ backgroundColor: 'var(--color-brand)' }}` → utiliser `className="bg-brand"`

### 6. Dark mode — pattern Vercel/Linear
- Borders : `dark:border-white/[0.08]` (blanc 8% opacité)
- Fond cards : `dark:bg-gray-900` (même que page)
- Zéro shadows en dark : `dark:hover:shadow-none`
- Flowbite Card : thème global override dans `flowbite-theme.ts`
- Light mode = défaut (ThemeModeScript mode="light")

### 7. CTAButton = seul composant bouton CTA
- `<CTAButton>` pour TOUS les boutons d'action
- Variants : `solid` (rouge), `outline` (bordure), `light` (gris)
- Sizes : `sm`, `md`, `lg`, `xl`
- `href` pour les liens, `onClick` pour les actions
- JAMAIS de `<button style={{ backgroundColor }}>`

### 8. Nommage
- "Wejustice" (W majuscule, j minuscule) dans tout le texte visible
- Composants : PascalCase (`ActionCard.tsx`)
- Hooks : camelCase + `use` prefix
- Mocks : kebab-case JSON (`site-settings.json`)
- Pages : `page.tsx` + `*Client.tsx`

### 9. Sécurité
- `ignoreBuildErrors: false` dans next.config.ts
- DOMPurify sur tout `dangerouslySetInnerHTML`
- Security headers (HSTS, X-Frame, Referrer, Permissions, X-Content-Type)
- Pas de PII dans les console.log
- Pas d'email réel dans les mocks (utiliser example.com)

### 10. Performance
- Images compressées (max 1600px largeur, qualité 75)
- `next/font/local` pour Campton (pas @font-face CSS)
- Pas de ScrollReveal sur les pricing cards (visibles immédiatement)
- `LazyScrollReveal` disponible pour lazy loading futur

### 11. Ce qu'on ne fait PAS
- Pas de backend, API, DB, auth réelle
- Pas de Sentry, PostHog, analytics
- Pas de `console.log` sauf `[demo]` prefix intentionnel
- Pas d'animations qui wrappent des conteneurs grid/flex
- Pas de `@import` flowbite dans le CSS (ThemeProvider only)
- Pas de mémoire projet sans instruction explicite du client

---

## Checklist avant chaque changement

- [ ] Le composant existe-t-il déjà ? → Réutiliser, pas dupliquer
- [ ] Le fichier est-il dans le bon dossier (`ui/`, `features/`, `layout/`) ?
- [ ] Les imports utilisent `@/` et pas `../` ?
- [ ] Dark mode testé ?
- [ ] Mobile testé ?
- [ ] `COMPONENTS.md` mis à jour si nouveau composant ?
- [ ] Build OK (`npm run build`) ?
- [ ] Zero erreurs TS (`npx tsc --noEmit`) ?
