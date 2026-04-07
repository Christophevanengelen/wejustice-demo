# WeJustice Demo — TODOS

> Mis à jour le 7 avril 2026. Session CEO review.

---

## P0 — Page Tarifs (pas fini)

- [x] Couleurs plans supprimées (bleu/vert/violet/jaune → gris neutre)
- [x] Checks ✓ → var(--color-brand) (adaptatif light/dark)
- [x] Bouton "Choisir" → var(--color-brand)
- [x] Badge "Recommandé" → var(--color-brand)
- [x] Badges durée → vert (économie) au lieu de bleu/violet/orange
- [x] Boutons +/- → fond brand red
- [x] Durée sélectionnée → fond brand red
- [x] Toggle tarif réduit → Flowbite ToggleSwitch
- [ ] **Bouton "Comparer les forfaits" donne un bloc blanc** — fond cassé
- [ ] **Section B2B "Contactez-nous"** — 2 CTA différents, pas homogènes
- [ ] **Espacement "POUR LES CITOYENS"** — collé au hero, respire pas
- [ ] **Les "?" (tooltips) pas alignés** — amateur
- [ ] **Bénéficiaires mise en page** — pas beau, pas aligné proprement
- [ ] **Vérifier dark mode complet** sur toute la page tarifs

## P0 — Design System (audit global)

- [ ] **Audit compliance Flowbite complète** — chaque composant custom doit utiliser un composant Flowbite équivalent ou être justifié
- [ ] **Border-radius audit** — vérifier rounded-lg partout (Cards, boutons), rounded-full (badges, avatar)
- [ ] **Créer un composant CTAButton centralisé** — UN composant pour tous les CTA rouges du site (existe dans ui/CTAButton.tsx mais pas utilisé partout)
- [ ] **Remplacer TOUS les `style={{ backgroundColor: 'var(--color-brand)' }}` par CTAButton** — centraliser

## P1 — Pages à vérifier visuellement (light + dark, desktop + mobile)

- [ ] Homepage
- [ ] Actions listing (filtres réduits à 4 catégories — vérifier rendu)
- [ ] Action detail
- [ ] Page merci
- [ ] Page partager
- [ ] Page rejoindre
- [ ] En savoir plus (photos équipe, timeline, cards homothétiques)
- [ ] Blog listing
- [ ] Blog article
- [ ] Tarifs
- [ ] Tribune
- [ ] CGU
- [ ] Confidentialité
- [ ] /compte dashboard
- [ ] /compte signatures
- [ ] /compte notifications
- [ ] /compte profil
- [ ] /compte paiements

## P1 — Issues spécifiques non fixées

- [ ] **KPI action detail** — cards alignées sur la plus grande (auto-rows-[1fr]) — pas vérifié
- [ ] **Cards équipe En savoir plus** — homothétiques avec photos — pas vérifié
- [ ] **Blog articles contenu placeholder** — "Cet article sera publié prochainement"
- [ ] **Paliers MilestoneProgress** — vérifier rendu compact (cards) et full (action detail)

## Complété cette session

- [x] Audit produit (65 issues, AUDIT.md)
- [x] 6 liens morts footer supprimés, footer 3 colonnes
- [x] 135+ accents français corrigés
- [x] Boutons partage fonctionnels (vrais URLs Twitter/FB/LinkedIn/WhatsApp/Email)
- [x] Page Rejoindre fixée (CTA → /tarifs)
- [x] Pages À propos + En savoir plus fusionnées
- [x] Timeline wejustice.legal (alternance gauche/droite, futur en haut)
- [x] Photos réelles + LinkedIn + Twitter sur profils équipe
- [x] Navigation : Tarifs ajouté, /login→/compte, /admin supprimé
- [x] SignatureForm : plus de progress bar doublon ni gradient
- [x] Stats hero corrigées (8 actions, 312884 signatures)
- [x] MilestoneProgress avec badges jalons lisibles
- [x] Hover/shadow supprimés sur éléments non-cliquables
- [x] Avatar user : cercle rouge brand, pas de stroke
- [x] Espace /compte : sidebar sans Flowbite Sidebar, navbar avec dropdown
- [x] Notifications : icônes catégorie, tri chrono, CTA contextuel
- [x] Image act-003 fixée (.png → .jpg)
- [x] Filtres actions : doublons normalisés, 4 catégories
- [x] Rouge unifié : var(--color-brand) sur pricing cards

## Règles (lire AVANT de coder)

1. **Un seul rouge** : `var(--color-brand)` pour les éléments visuels (boutons, checks, badges). `primary-*` Tailwind OK pour les liens hover et focus rings.
2. **Hover/shadow = cliquable uniquement.** Éléments informatifs = flat.
3. **Pas de gradient** sauf hero image.
4. **Border-radius** : rounded-lg (cards, boutons), rounded-full (badges, avatar). Rien d'autre.
5. **Partage = vrais URLs.** JAMAIS console.log/alert.
6. **Accents français** dans tout le JSX. Pas de \u00xx.
7. **`<Image>` Next.js** au lieu de `<img>`.
8. **`<Link>` Next.js** au lieu de `<a>` pour liens internes.
9. **ComptePageShell** sur toutes les pages /compte.
10. **Push uniquement quand Chris le demande.**
11. **Tester en dark mode AVANT de passer au suivant.**
12. **Pas de suggestions non demandées.**
