# Wejustice Demo — PLAYBOOK

> Règles strictes pour garder le projet propre. À lire AVANT de toucher au code.
> Mis à jour : session du 10 avril 2026.

---

## Avancées session 8-10 avril 2026

### Audits Gstack (6/6)
- /health 6.5/10, /qa-only 62/100, /cso MEDIUM, /design-review C+, /devex-review 9/10, /benchmark terminé

### Commentaires Arnaud appliqués (58+)
- Nav "Rejoindre" → /tarifs, light mode par défaut, "Wejustice" (casse), 5 étapes "Comment ça marche"
- Piliers renommés (Suivi en direct, Accessibilité, Changer le Monde)
- Timeline simplifiée (retrait 2027/2028), bios refaites, section "Le 5ème pouvoir"
- Route /en-savoir-plus → /qui-sommes-nous
- Actions : keywords + recherche étendue, tag Nodulaire fixé, avocat masqué des cards
- Statuts simplifiés : Ouverte (vert), En cours (bleu), Terminée (gris)
- URLs actions avec slugs (dejavu-transparence-vaccins au lieu de act-001)
- Page merci : compteur fusionné, message+URL copiable, boutons partage en `<a href>`
- Flow guest : redirect direct vers /merci avec bandeau email validation
- Tarifs : bloc "Pourquoi votre soutien" intégré dans hero, sélecteur personnes supprimé
- Pricing : Aura recalculé (base 34€), réductions 25/35/45%, nouvelle logique bénéficiaires
- Zoom images smooth (600ms cubic-bezier) partout
- Empty state /compte avec CTA "Signer toutes les actions"
- Modal inscription (prénom/nom/email) au clic sur offre

### Sécurité
- DOMPurify, security headers, ignoreBuildErrors:false, Next.js upgradé (0 CVE)
- ESLint config, ErrorBoundary React, PII nettoyé, rate limiting SignatureForm

### Performance
- Images compressées (-6MB), next/font/local Campton, LazyScrollReveal

---

## Architecture BFF — Regles NON NEGOCIABLES

Next.js est une VITRINE + BFF minimal. Le backend PHP est la source de verite.

### Ce que Next.js FAIT :
- Rendre les pages (SSR/CSR)
- Gerer session/cookie (HTTP-only)
- Proxy transparent vers le backend PHP (routes /api/*)
- Callbacks techniques (PayZen, OAuth, magic links)
- Contenu marketing statique (site-settings.json, testimonials.json)

### Ce que Next.js ne fait JAMAIS :
- DB, ORM, queries SQL
- Logique metier (pricing, entitlement, eligibilite)
- Persistance (signatures, paiements, comptes)
- Auth comme source de verite (JWT, sessions server)
- Calculs de droits (max actions, tarif reduit, seats)

### Imports mocks — Classification :
| Fichier | Type | En prod |
|---------|------|---------|
| `actions.json` | RUNTIME | GET /api/actions |
| `comments.json` | RUNTIME | GET /api/actions/:slug/comments |
| `user-activity.json` | RUNTIME | GET /api/me/dashboard |
| `users.json` | RUNTIME | GET /api/auth/me |
| `blog.json` | RUNTIME | GET /api/cms/articles |
| `site-settings.json` | STATIQUE | Reste en JSON (marketing) |
| `testimonials.json` | STATIQUE | Reste en JSON (marketing) |

### Client API :
Les composants DOIVENT importer depuis `@/lib/api.ts`, JAMAIS directement `@/mocks/*.json`
pour les donnees RUNTIME. Le client API retourne les mocks en demo et appellera le BFF en prod.

---

## Structure du projet

```
demo/
├── src/
│   ├── app/
│   │   ├── layout.tsx             ← Root HTML + next/font/local Campton
│   │   ├── globals.css            ← CSS global + .bg-brand/.text-brand
│   │   └── [locale]/
│   │       ├── (public)/          ← Pages publiques (Navigation + Footer)
│   │       └── (compte)/          ← Espace membre (CompteNavbar + Sidebar)
│   ├── components/
│   │   ├── ui/                    ← CTAButton, ErrorBoundary, StatusBadge, LogoFigma
│   │   ├── layout/                ← Navigation, Footer, DemoToolbar
│   │   ├── features/              ← actions/, pricing/, compte/, press/
│   │   └── animations/            ← ScrollReveal, LazyScrollReveal, AnimatedCounter
│   ├── lib/                       ← mock-auth, mock-api, flowbite-theme, pricing-engine
│   ├── mocks/                     ← JSON mock (actions, blog, site-settings, etc.)
│   ├── styles/                    ← wejustice-theme.css (single source of truth)
│   └── middleware.ts
├── public/                        ← Images compressées, fonts Campton
├── messages/                      ← fr.json, en.json
└── .gstack/                       ← Rapports QA et retros
```

---

## Règles strictes

### 1. Code dans `src/` uniquement

### 2. Rouge = CTA cliquable uniquement
- `.bg-brand` / `.text-brand` / `.border-brand`
- Light: #C20520, Dark: #FF4D63
- `primary-*` Tailwind UNIQUEMENT pour `focus:ring-primary-*`

### 3. Dark mode — pattern Vercel/Linear
- Borders : `dark:border-white/[0.08]`
- Fond cards : `dark:bg-gray-900` (même que page)
- Zéro shadows en dark : `dark:hover:shadow-none`
- Light mode = défaut (`ThemeModeScript mode="light"`)

### 4. CTAButton = seul composant bouton CTA
- Variants : `solid`, `outline`, `light`
- Sizes : `sm`, `md`, `lg`, `xl`
- JAMAIS de `<button style={{ backgroundColor }}>`

### 5. Nommage
- "Wejustice" (W majuscule, j minuscule) dans tout le texte visible
- Composants PascalCase, hooks camelCase, mocks kebab-case, pages page.tsx + *Client.tsx

### 6. Sécurité
- `ignoreBuildErrors: false`
- DOMPurify sur tout `dangerouslySetInnerHTML`
- Security headers (HSTS, X-Frame, Referrer, Permissions)
- Pas de PII dans console.log, pas d'email réel dans mocks

### 7. Performance
- Images max 1600px, qualité 75
- `next/font/local` pour Campton
- Zoom images : `duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:scale-105`

### 8. Pricing
- Pas de sélecteur de personnes — chaque plan a un nombre fixe de bénéficiaires
- Mini/Plus : 1 pers., Maxi : 2 pers., Aura : 3 pers.
- Réductions durée : 25% (1 an), 35% (2 ans), 45% (3 ans)
- Tarif réduit : -50% sur tous les plans (Aura inclus)
- Prix de base : Mini 8,40€, Plus 14,60€, Maxi 24,80€, Aura 34€

### 9. URLs
- Actions : slugs (dejavu-transparence-vaccins), pas d'IDs (act-001)
- Route /qui-sommes-nous (pas /en-savoir-plus)

### 10. Ce qu'on ne fait PAS
- Pas de backend, API, DB, auth réelle
- Pas de console.log sauf [demo] prefix
- Pas d'animations qui wrappent des conteneurs grid/flex
- Pas de mémoire projet sans instruction explicite du client
- Pas de déplacement d'éléments entre sections sans demande explicite

---

## Checklist

- [ ] Composant existe déjà ? → Réutiliser
- [ ] Bon dossier (ui/, features/, layout/) ?
- [ ] Imports `@/` ?
- [ ] Dark mode testé ?
- [ ] Build OK (`npm run build`) ?
- [ ] Zero erreurs TS (`npx tsc --noEmit`) ?
