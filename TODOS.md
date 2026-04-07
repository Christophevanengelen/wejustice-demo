# WeJustice Demo — TODOS

> Mis à jour fin session 7 avril 2026.
> LIRE EN ENTIER avant de coder.

---

## P0 — Rouge dark mode cassé partout

Le rouge `primary-700` (#C20520) s'affiche en dark mode au lieu du rouge dark (#FF4D63).

**Root cause** : les composants utilisent `text-primary-700 dark:text-primary-500` ou `bg-primary-700 dark:bg-primary-600`. Mais `primary-500` = `#FB3049` ≠ `#FF4D63` (le vrai brand dark). Le seul moyen fiable : `var(--color-brand)` qui change automatiquement.

**Fix** :
1. Le composant `CTAButton` a été migré vers `bg-brand` (classe CSS dans globals.css)
2. Mais 31+ usages de `primary-*` restent dans le codebase pour des liens, focus rings, nav active
3. La nav active ("Tribune" en rouge) utilise `text-primary-700` dans le Flowbite theme → mauvais rouge en dark
4. **GREP** `text-primary-` et `bg-primary-` dans tout src/ et remplacer par `text-brand` / `bg-brand` pour les éléments visuels. Garder `primary-*` UNIQUEMENT pour les focus rings (`focus:ring-primary-*`)

**Fichiers critiques** :
- `src/lib/flowbite-theme.ts` ligne 55 : `text-primary-700` → doit utiliser var(--color-brand)
- `src/components/layout/Navigation.tsx` : liens nav active
- Tous les `style={{ color: 'var(--color-brand)' }}` → remplacer par `className="text-brand"`
- Tous les `style={{ backgroundColor: 'var(--color-brand)' }}` → remplacer par `className="bg-brand"`

## P0 — Layouting global incohérent

Les contenus ne sont pas alignés sur les limites du logo et de l'avatar dans la top nav.

**Fix** :
- La nav utilise `max-w-screen-xl` avec `p-4`
- Le contenu de CHAQUE page doit utiliser le même `max-w-screen-xl px-4 lg:px-6`
- Auditer : Homepage, Actions, Action detail, Blog, Tarifs, En savoir plus, Tribune, CGU, Confidentialité
- Les cartes ne doivent JAMAIS dépasser les limites de la nav

## P1 — Page Tarifs (presque fini)

- [x] Couleurs plans → gris neutre
- [x] Boutons "Choisir" → var(--color-brand) via CTAButton
- [x] Checks ✓ → var(--color-brand)
- [x] Badge "Recommandé" → var(--color-brand)
- [x] Badges durée → vert unique
- [x] Boutons +/- → brand red
- [x] Durée sélectionnée → brand red
- [x] Toggle → Flowbite ToggleSwitch
- [x] Icônes plans supprimées
- [x] Comparateur dark mode fixé
- [x] Section B2B simplifiée (1 colonne + 1 CTA)
- [x] Titre + sous-titre "Pour les citoyens"
- [x] Grid 3 cols centré en tarif réduit
- [x] Bouton "Confirmer" → brand red
- [ ] **Espacement "Bénéficiaires" et "Durée"** — tooltips ? pas alignés
- [ ] **Vérifier dark mode complet** page entière

## P1 — ActionCard (presque fini)

- [x] Tag + thèmes sur une ligne (#Tag · Thème1 · Thème2)
- [x] Max 2 thèmes
- [x] Zoom photo hover 110% 700ms ease-out
- [x] Jalons supprimés des cartes (compact = barre seule)
- [ ] **Le titre ne change plus de couleur au hover** — vérifier que c'est voulu (la carte entière est cliquable, le hover shadow suffit)

## P1 — Navigation

- [x] Sélecteur de langue FR/EN ajouté
- [ ] **Lien actif en mauvais rouge** — text-primary-700 dans le Flowbite theme → doit être text-brand

## P2 — Vérification visuelle (pas fait)

Chaque page doit être vérifiée en :
- Light mode desktop
- Dark mode desktop
- Light mode mobile
- Dark mode mobile

Pages :
- [ ] Homepage
- [ ] Actions listing
- [ ] Action detail
- [ ] Page merci
- [ ] Page partager
- [ ] Page rejoindre
- [ ] En savoir plus
- [ ] Blog listing + article
- [ ] Tarifs
- [ ] Tribune
- [ ] CGU + Confidentialité
- [ ] /compte (dashboard, signatures, notifications, profil, paiements)

## Règles (lire AVANT de coder)

1. **`var(--color-brand)`** = seul rouge autorisé. Light: #C20520, Dark: #FF4D63. Via classes `.bg-brand`, `.text-brand`, `.border-brand`.
2. **Hover/shadow = cliquable uniquement.**
3. **Pas de gradient** sauf hero image.
4. **Border-radius** : rounded-lg (cards, boutons), rounded-full (badges, avatar).
5. **Partage = vrais URLs.** JAMAIS console.log/alert.
6. **Accents français** dans tout le JSX. Pas de \u00xx.
7. **`<Image>` Next.js** au lieu de `<img>`.
8. **`<Link>` Next.js** au lieu de `<a>` pour liens internes.
9. **Max 2 thèmes** par carte action.
10. **Push uniquement quand Chris le demande.**
11. **Tester en dark mode AVANT de passer au suivant.**
12. **Layouting** : `max-w-screen-xl px-4 lg:px-6` partout, aligné sur la nav.
