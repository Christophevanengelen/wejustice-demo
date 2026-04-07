# WeJustice Demo — PLAYBOOK

> Regles strictes pour garder le projet propre. A lire AVANT de toucher au code.

---

## Structure du projet

```
demo/
├── src/                           ← TOUT le code source ici
│   ├── app/                       ← Pages (App Router, routes)
│   │   ├── layout.tsx             ← Root HTML shell
│   │   ├── globals.css            ← CSS global + tokens
│   │   └── [locale]/              ← Routes i18n
│   │       ├── page.tsx           ← Homepage
│   │       ├── layout.tsx         ← Locale layout (providers)
│   │       ├── actions/           ← Feature: actions
│   │       ├── design-system/     ← Feature: design system
│   │       └── ...
│   ├── components/                ← Composants reutilisables
│   │   ├── ui/                    ← Atoms (1 responsabilite)
│   │   ├── layout/                ← Layout (Navigation, Footer)
│   │   ├── features/              ← Par feature (actions/, merci/)
│   │   └── animations/            ← Animations transverses
│   ├── lib/                       ← Logique metier
│   │   ├── mock-auth.tsx          ← Auth provider mock
│   │   ├── mock-api.ts            ← API client mock
│   │   └── flowbite-theme.ts      ← Theme Flowbite global
│   ├── hooks/                     ← Custom React hooks
│   ├── mocks/                     ← Donnees JSON mock
│   ├── styles/                    ← CSS theme (wejustice-theme.css)
│   ├── i18n/                      ← Config i18n (routing, request)
│   ├── types/                     ← Types TypeScript globaux
│   └── middleware.ts              ← Middleware next-intl
├── public/                        ← Assets statiques (images, fonts)
├── messages/                      ← Fichiers i18n JSON (fr.json, en.json)
└── [configs racine]               ← package.json, next.config.ts, etc.
```

---

## Regles strictes

### 1. Tout le code dans `src/`
- **JAMAIS** de fichier `.tsx`, `.ts` (sauf configs) a la racine de `demo/`
- Les seuls fichiers a la racine : `package.json`, `next.config.ts`, `tailwind.config.ts`, `tsconfig.json`, `postcss.config.mjs`, `PLAYBOOK.md`, `COMPONENTS.md`, `README.md`

### 2. Organisation des composants
- **`ui/`** = Composants atomiques (1 seule responsabilite). Ex: `StatusBadge`, `LogoFigma`, `SignatureProgress`, `ThemeTags`
- **`layout/`** = Navigation, Footer, DemoToolbar — les composants de mise en page globale
- **`features/{nom}/`** = Composants specifiques a une feature. Ex: `features/actions/ActionCard.tsx`
- **`animations/`** = Utilitaires d'animation transverses

### 3. Un composant = un fichier = un style
- **JAMAIS** de duplication de composant entre pages
- Si deux pages ont besoin du meme element visuel, c'est un composant dans `components/`
- Les pages (`app/[locale]/*`) sont de la **pure composition** : imports + layout + data

### 4. Imports
- Toujours utiliser `@/` (mappe vers `src/`)
- Jamais d'imports relatifs entre composants (`../` interdit entre `ui/` et `features/`)
- Pattern: `import { X } from "@/components/ui/X"`

### 5. Hero zones - regles visuelles
- **Sous-titres** : toujours `text-white/80` sur fond sombre. JAMAIS `text-gray-400` (trop sombre sur images)
- **Inputs glass** : utiliser la classe `.hero-glass-input` (definie dans globals.css). Border-radius `rounded-xl` (12px), pas `rounded-lg` (8px)
- **Boutons sur hero** : `rounded-xl` pour matcher les inputs

### 6. Rouge = CTA cliquable uniquement
- `Button color="failure"` = brand red → uniquement pour les actions cliquables
- Progress bars = `color="red"` (brand red via theme) → OK car c'est le momentum de l'action
- Labels, badges, tags = couleurs neutres (gray) ou semantiques (green/yellow/blue)
- `.cta-brand-block` = sections CTA pleine largeur (fond rouge, texte blanc)

### 6. Flowbite via ThemeProvider uniquement
- JAMAIS de couleurs Flowbite par defaut (bleu/cyan)
- Tout passe par `lib/flowbite-theme.ts` + `<ThemeProvider>` dans le layout
- JAMAIS de `@import "flowbite-react/plugin/tailwindcss"` dans le CSS (casse Tailwind v4)

### 7. Dark mode
- Chaque composant doit supporter `dark:` classes
- `@custom-variant dark` dans globals.css pour Tailwind v4
- `ThemeModeScript` dans root layout pour eviter le flash
- Tester light ET dark avant de valider

### 8. Nommage
- Composants : PascalCase (`ActionCard.tsx`)
- Hooks : camelCase avec `use` prefix (`useScrollDirection.ts`)
- Mocks : kebab-case JSON (`site-settings.json`)
- Pages : `page.tsx` + `*Client.tsx` pour la partie client

### 9. Ajouter une feature
1. Creer les composants dans `components/features/{feature}/`
2. Creer les mocks dans `mocks/`
3. Creer la page dans `app/[locale]/{feature}/`
4. Mettre a jour `COMPONENTS.md`
5. Tester desktop + mobile + dark mode

### 10. Best practices UI/CSS — OBLIGATOIRES

**Cartes en grille :**
- Toutes les cartes d'une grille DOIVENT être alignées sur la plus grande → `auto-rows-[1fr]` sur la grid
- Si un wrapper (ScrollReveal, animation) est entre la grid et la carte → ajouter `className="flex"` sur le wrapper
- Le contenu de la carte utilise `justify-center` pour centrer verticalement, label collé sous le chiffre

**Hover / ombres :**
- JAMAIS de `hover:shadow`, `hover:-translate`, `group-hover:scale` sur un élément non-cliquable
- Hover = exclusivement réservé aux éléments interactifs (liens, boutons, cartes avec `href`)
- Les cartes informatives sont flat : border + bg, pas de shadow

**Dégradés :**
- JAMAIS de dégradé décoratif (gradient glow, gradient top accent) sauf sur le hero image
- Les cartes, sections, wrappers sont flat et sobres

**Rouge = CTA uniquement :**
- `var(--color-brand)` (#C20520) = boutons cliquables, progress bars, step circles
- JAMAIS de `color="failure"` Flowbite (c'est un rouge différent) → utiliser `style={{ backgroundColor: 'var(--color-brand)' }}`
- Labels, badges, tags = gris ou sémantique

**Partage :**
- TOUS les boutons de partage DOIVENT ouvrir les vrais URLs des plateformes
- JAMAIS de `console.log` ou `alert()` sur un bouton de partage

**Avatar user :**
- Cercle fond rouge brand + initiales blanches, pas de stroke
- Identique sur nav publique et nav /compte

### 11. Ce qu'on ne fait PAS
- Pas de backend, pas d'API reelle, pas de DB
- Pas de Sentry, PostHog, analytics
- Pas de `console.log` sauf `[demo]` prefix intentionnel
- Pas d'animations qui wrappent des conteneurs grid/flex (cassent le layout)
- Pas de `@import` flowbite dans le CSS (ThemeProvider only)

---

## Checklist avant chaque changement

- [ ] Le composant existe-t-il deja ? → Reutiliser, pas dupliquer
- [ ] Le fichier est-il dans le bon dossier (`ui/`, `features/`, `layout/`) ?
- [ ] Les imports utilisent `@/` et pas `../` ?
- [ ] Dark mode teste ?
- [ ] Mobile teste ?
- [ ] `COMPONENTS.md` mis a jour si nouveau composant ?
