# WeJustice Demo — TODOS

> Mis à jour le 7 avril 2026. Priorité par gravité.

---

## P0 — Design System Rouge (problème systémique)

- [ ] **Les couleurs des pricing cards sont multi-couleurs** (bleu Mini, vert Plus, violet Maxi, jaune Aura) — ça doit être brand WeJustice partout. Un seul accent : le brand red. Les plans se différencient par le contenu, pas par la couleur.
- [ ] **Les checks ✓ dans les pricing cards sont en rouge Flowbite** (pas brand red) — vérifier que `primary-700` = `#C20520` est bien appliqué par Flowbite
- [ ] **Badge "Recommandé" en rouge Flowbite** — doit être brand red
- [ ] **Bouton "Comparer les forfaits" ouvre un bloc blanc** — cassé, à fixer
- [ ] **Section B2B "Contactez-nous"** — un bouton gris, un bouton rouge outline, pas homogène. Les deux doivent être identiques.
- [ ] **Les badges -30% / -35% / -40% sont en rouge clair** — pas brand
- [ ] **L'espacement entre le hero et les cards est incohérent** — le label "POUR LES CITOYENS" est collé au hero

## P0 — Page Tarifs (refonte complète nécessaire)

- [ ] **Supprimer les couleurs par plan** — tout en brand red ou gris neutre
- [ ] **Homogénéiser les CTA "Choisir"** — tous identiques, brand red via `var(--color-brand)`
- [ ] **Fixer le comparateur** — le bloc expand doit avoir le bon fond dark:bg-gray-800
- [ ] **Section organisations** — même design system que le reste du site
- [ ] **Vérifier dark mode complet** sur toute la page

## P1 — Page Actions (filtres)

- [x] **Doublons de thèmes normalisés** — sante→santé, numerique→numérique etc.
- [ ] **Regrouper les 10 thèmes en 4-5 catégories** — logique front qui regroupe, code commencé mais pas fini
- [ ] **Les badges de filtre doivent être capitalize avec accents** — "Santé" pas "sante"

## P1 — Espace /compte

- [x] **Sidebar refaite** — liens Tailwind custom, icônes toujours visibles
- [x] **Navbar refaite** — logo cliquable, avatar dropdown, pas de nom user
- [x] **Notifications** — icônes catégorie, tri chrono, CTA contextuel, fond bleu non lues
- [x] **Dashboard images** — même taille que signatures (h-16 w-24)
- [ ] **Vérifier visuellement tout le /compte** en light + dark, desktop + mobile

## P1 — Page En savoir plus

- [x] **Timeline inversée** — futur en haut, passé en bas
- [x] **2027 + 2028 ajoutés** — expansion Europe + monde
- [x] **Photos réelles** Arnaud + Christophe
- [x] **LinkedIn + Twitter** sur les profils
- [x] **CTA final identique homepage** — bouton blanc unique
- [x] **Icônes piliers en gris** — pas rouge (pas cliquable)
- [x] **Unicode fixé** — vrais caractères français

## Complété cette session

- [x] Audit produit complet (65 issues)
- [x] 6 liens morts footer supprimés
- [x] 135 accents français corrigés
- [x] Boutons partage fonctionnels (vrais URLs)
- [x] Page Rejoindre fixée
- [x] Pages À propos + En savoir plus fusionnées
- [x] SignatureForm : plus de progress bar doublon ni gradient
- [x] Stats hero corrigées (8 actions, 312884 signatures)
- [x] MilestoneProgress avec badges jalons lisibles
- [x] Hover/shadow supprimés sur éléments non-cliquables
- [x] Avatar user : cercle rouge brand, pas de stroke

## Règles pour la prochaine session

1. **Un seul rouge** : `var(--color-brand)` (#C20520). Vérifier `tailwind.config.ts` primary-700.
2. **JAMAIS de `color="failure"` Flowbite sans vérifier** que le theme mappe vers brand red.
3. **Pas de couleurs par plan** sur les pricing cards — brand red ou gris neutre.
4. **Tester CHAQUE changement** visuellement en dark mode AVANT de passer au suivant.
5. **Push uniquement quand Chris le demande.**
6. **Pas de suggestions non demandées.**
