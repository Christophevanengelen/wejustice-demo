# WeJustice Demo — Frontend Only

> Demo autonome, zero backend. Pour iterer sur l'UI/UX avant d'integrer avec Django.

## Stack

| Couche | Technologie |
|--------|-------------|
| Framework | Next.js 16 (App Router) |
| UI | React 19 + Flowbite React 0.12 |
| CSS | Tailwind CSS 4 |
| Animations | Framer Motion 12 |
| i18n | next-intl (FR + EN) |
| Data | JSON statiques dans `src/mocks/` |

## Demarrage

```bash
cd demo && npm install && npm run dev
# → http://localhost:3001/fr
```

## Structure — LIRE PLAYBOOK.md

```
demo/
├── src/                           ← TOUT le code
│   ├── app/                       ← Pages (routes)
│   ├── components/
│   │   ├── ui/                    ← Atoms (LogoFigma, StatusBadge, ThemeTags...)
│   │   ├── layout/                ← Navigation, Footer, DemoToolbar
│   │   ├── features/actions/      ← ActionCard, SignatureForm, ShareButtons...
│   │   └── animations/            ← ScrollToTop, FadeIn, AnimatedCounter...
│   ├── lib/                       ← mock-auth, mock-api, flowbite-theme
│   ├── hooks/                     ← Custom hooks
│   ├── mocks/                     ← JSON mock data
│   ├── styles/                    ← Theme CSS (wejustice-theme.css)
│   └── i18n/                      ← Routing + request config
├── public/                        ← Images, fonts, favicon
├── messages/                      ← fr.json, en.json
└── PLAYBOOK.md                    ← REGLES STRICTES — lire avant de coder
```

## Regles critiques

1. **Tout dans `src/`.** Zero code a la racine (sauf configs).
2. **Un composant = un fichier = un style.** Jamais de duplication entre pages.
3. **Rouge = CTA cliquable uniquement.** Labels/badges = gris ou semantique.
4. **Flowbite via ThemeProvider.** Jamais de couleurs Flowbite par defaut. `lib/flowbite-theme.ts` = source de verite.
5. **Dark mode obligatoire.** Chaque composant a ses `dark:` classes. Tester avant de valider.
6. **Imports `@/` uniquement.** Jamais de `../` entre composants.
7. **Pages = pure composition.** Layout + data + imports de composants. Zero inline style.

## Commandes

```bash
npm run dev              # Dev server → localhost:3001
npm run build            # Build prod (verifie zero erreurs TS)
```

## Conventions de nommage

| Type | Convention | Exemple |
|------|-----------|---------|
| Composant | PascalCase | `ActionCard.tsx` |
| Hook | camelCase + `use` | `useScrollDirection.ts` |
| Mock | kebab-case JSON | `site-settings.json` |
| Page server | `page.tsx` | `app/[locale]/actions/page.tsx` |
| Page client | `*Client.tsx` | `ActionsListClient.tsx` |

## Ajouter une feature

1. Composants → `src/components/features/{feature}/`
2. Mocks → `src/mocks/{feature}.json`
3. Page → `src/app/[locale]/{feature}/page.tsx` + `*Client.tsx`
4. Mettre a jour `COMPONENTS.md`
5. Tester desktop + mobile + dark mode

## Design tokens

| Token | Usage |
|-------|-------|
| `--color-brand` (#C20520) | CTA, progress bars, logo |
| `.cta-brand-block` | Sections CTA pleine largeur |
| `.step-circle` | Cercles numeros |
| `Button color="failure"` | Bouton CTA principal |
| `Progress color="red"` | Barre de progression |

## Règle critique — Partage = nerf de la guerre

Le flywheel WeJustice repose sur le partage viral :
**Signature → Partage → Nouvelles signatures → Palier → Presse → Explosion**

TOUTES les fonctions de partage DOIVENT ouvrir les vrais URLs des plateformes :
- Twitter : `https://twitter.com/intent/tweet?text=...&url=...&hashtags=...`
- Facebook : `https://www.facebook.com/sharer/sharer.php?u=...`
- LinkedIn : `https://www.linkedin.com/sharing/share-offsite/?url=...`
- WhatsApp : `https://wa.me/?text=...`
- Email : `mailto:?subject=...&body=...`
- Copier : `navigator.clipboard.writeText(url)`

JAMAIS de `console.log` ou `alert()` sur les boutons de partage. JAMAIS.
Le composant central est `components/features/actions/ShareButtons.tsx`.
La page merci a ses propres boutons stylés (couleurs des plateformes) mais DOIT ouvrir les mêmes URLs.

## Ce qu'on ne fait PAS

- Pas de backend, API, DB, auth reelle
- Pas de Sentry, PostHog, analytics
- Pas de `@import "flowbite-react/plugin"` dans le CSS
- Pas d'animations qui wrappent des conteneurs grid/flex
- Pas de pricing (supprime du scope)
- Pas de `console.log` ou `alert()` sur les boutons de partage
