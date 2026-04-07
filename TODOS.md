# WeJustice Demo — TODOS

> Session du 7 avril 2026. Tout ce qui reste à fixer.

---

## P0 — Design System incohérent (le plus gros problème)

- [ ] **CTA rouge incohérent d'une page à l'autre** — certains utilisent `color="failure"` Flowbite (mauvais rouge), d'autres `var(--color-brand)`, d'autres des classes Tailwind. CRÉER UN COMPOSANT `<CTAButton>` unique qui wrappe le bon style partout. Un seul rouge, un seul border-radius, un seul padding.
- [ ] **Border-radius incohérents** — mélange de rounded-lg, rounded-xl, rounded-full sur des éléments similaires. RÈGLE : Cards=rounded-lg, Boutons=rounded-lg, Badges=rounded-full, Avatar=rounded-full. Rien d'autre.
- [ ] **Audit complet des tokens** — faire un grep de tous les `bg-red`, `bg-failure`, `color="failure"`, `rounded-xl` dans src/ et les normaliser
- [ ] **Les badges/labels ont des tailles différentes** sur la page signatures vs les ActionCards — normaliser avec Badge Flowbite size cohérent

## P0 — Espace /compte

- [ ] **Sidebar fond blanc en light mode** — vérifié que l'agent a fixé, à vérifier visuellement
- [ ] **Sidebar icône active visible** — vérifié que l'agent a fixé (plus de Flowbite Sidebar, liens Tailwind custom)
- [ ] **Navbar logo cliquable** — vérifié que l'agent a fixé
- [ ] **Avatar dropdown cliquable** — vérifié que l'agent a fixé
- [ ] **Page signatures : style identique aux ActionCards** — vérifié que l'agent a fixé, mais le CTA "Rejoindre cette action" doit utiliser `var(--color-brand)` pas `color="failure"`
- [ ] **Page notifications : icônes catégorie + tri chrono + CTA contextuel** — vérifié que l'agent a fixé
- [ ] **Tester tout le /compte en light ET dark mode**

## P1 — Partage (nerf de la guerre)

- [x] **ShareButtons ouvrent les vrais URLs** — Twitter, Facebook, LinkedIn, WhatsApp, Email
- [x] **Page Merci : boutons partage fonctionnels** — vrais URLs
- [x] **Page Partager : utilise ShareButtons centralisé** — plus de alert()
- [x] **Règle documentée dans CLAUDE.md**

## P1 — Pages fusionnées

- [x] **En savoir plus = page unique** (fusionné avec À propos)
- [x] **À propos supprimée** — tous les liens redirigent vers /en-savoir-plus
- [x] **Timeline wejustice.legal intégrée** (2015→2026)
- [x] **CTA hero "En savoir plus"** → /en-savoir-plus

## P1 — Audit correctifs appliqués

- [x] **6 liens morts footer supprimés** — victoires, faq, contact, mentions-legales
- [x] **Footer 3 colonnes** — Actions, À propos, Légal
- [x] **Navigation : /login → /compte, /admin supprimé, Tarifs ajouté**
- [x] **Page Rejoindre fixée** — CTA "Découvrir les forfaits" → /tarifs
- [x] **Dead ends fixés** — CTA ajoutés sur blog, actions listing, partager
- [x] **135 HTML entities → vrais caractères Unicode**
- [x] **Accents français partout dans le JSX**
- [x] **`<a>` → `<Link>` sur Navigation, Footer, Homepage**
- [x] **Emojis Tribune → SVG**
- [x] **Typos mocks corrigées**
- [x] **Image act-003 : .png → .jpg**

## P1 — Hero / Homepage

- [x] **Stats corrigées** : totalActions 24→8, activeActions 6→8, totalSignatures→312884
- [x] **Section "Comment ça marche" : plus de hover/shadow**
- [x] **Témoignages : plus de hover/shadow**
- [x] **Signature form : plus de progress bar doublon, plus de gradient**

## P2 — À faire prochaine session

- [ ] **Push + deploy sur Vercel** — beaucoup de changements accumulés non déployés
- [ ] **Vérification visuelle complète** — chaque page, light + dark, desktop + mobile
- [ ] **Page En savoir plus : vérifier le CTA final** — "Voir les forfaits" en style glass, pas outline angular
- [ ] **MilestoneProgress : vérifier les badges jalons** sur les cards et la page action
- [ ] **Blog : contenu placeholder** — "Cet article sera publié prochainement" sur tous les articles
- [ ] **Notifications dates** — vérifier que les dates mock sont récentes (avril 2026)
- [ ] **Tests E2E Playwright** — toujours à 0

## Règles à respecter (pour la prochaine session)

1. **Un seul rouge** : `var(--color-brand)` (#C20520). JAMAIS `color="failure"` Flowbite.
2. **Hover/shadow = cliquable uniquement**. Éléments informatifs = flat.
3. **Pas de gradient** sauf hero image.
4. **Border-radius unique** : rounded-lg partout sauf badges (rounded-full) et avatar (rounded-full).
5. **Partage = vrais URLs**. JAMAIS console.log/alert.
6. **Accents français** dans tout le JSX.
7. **`<Image>` Next.js** au lieu de `<img>`.
8. **`<Link>` Next.js** au lieu de `<a>` pour les liens internes.
9. **ComptePageShell** sur toutes les pages /compte.
10. **Atomic Design** : un composant réutilisable > du copier-coller entre pages.
