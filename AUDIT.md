# AUDIT EXHAUSTIF - WeJustice Demo

> Auditeur : Agent UX Research
> Date : 7 avril 2026
> Scope : 20 pages, ~40 composants, ~8 mocks, navigation + footer
> Codebase : `demo/src/`

---

## 1. Resume executif

**Score : 5.5 / 10**

**Verdict** : Le site a une base visuelle solide (hero images, cards, dark mode), mais souffre de **5 liens morts dans le footer visible sur toutes les pages**, d'une **absence systematique d'accents francais** dans le contenu code en dur (pas les mocks), d'une **page "Rejoindre" completement cassee** (2 boutons identiques qui ramenent au meme endroit), et de **3 pages manquantes** referencees dans la navigation globale. Le tunnel de conversion a des trous : apres la signature, l'upsell vers `/tarifs` fonctionne, mais le CTA "Rejoindre" sur la page tarifs ne mene nulle part. La demo est utilisable pour montrer le design, mais pas pour simuler un parcours utilisateur complet.

---

## 2. Tableau des issues par page

### Legende gravite
- **P0** : Bloquant - lien mort visible, page cassee, boucle CTA
- **P1** : Critique - contenu absent, tunnel coupe, incoherence grave
- **P2** : Important - accents manquants, doublon CTA, composant mal utilise
- **P3** : Cosmetique - espacement, wording, polish

| # | Page | Issue | Gravite | Categorie |
|---|------|-------|---------|-----------|
| 1 | Footer (TOUTES pages) | `/victoires` - page n'existe pas, lien mort | P0 | Lien mort |
| 2 | Footer (TOUTES pages) | `/faq` - page n'existe pas, lien mort | P0 | Lien mort |
| 3 | Footer (TOUTES pages) | `/contact` - page n'existe pas, lien mort | P0 | Lien mort |
| 4 | Footer (TOUTES pages) | `/mentions-legales` - page n'existe pas, lien mort | P0 | Lien mort |
| 5 | Navigation | `/login` - page n'existe pas, lien mort | P0 | Lien mort |
| 6 | Navigation | `/admin` (dropdown) - page n'existe pas | P0 | Lien mort |
| 7 | Rejoindre (`/actions/[id]/rejoindre`) | 2 boutons identiques "Retour a l'action" cote a cote, l'un en rouge l'autre en gris, tous deux pointent vers la meme URL. Aucun CTA vers `/tarifs` malgre le texte qui dit "Commencez par souscrire a un forfait". | P0 | CTA casse |
| 8 | Footer | "Mentions legales" sans accent (devrait etre "Mentions l**e**gales") | P2 | Accents |
| 9 | Footer | "Confidentialite" sans accent (devrait etre "Confidentialit**e**") | P2 | Accents |
| 10 | Footer | "A propos" sans accent (devrait etre "**A** propos") | P2 | Accents |
| 11 | Footer | "reserves" sans accent : "Tous droits reserves" | P2 | Accents |
| 12 | Footer | "Donnees fictives" sans accent | P2 | Accents |
| 13 | Homepage | "Signatures collectees" sans accent dans les stats hero | P2 | Accents |
| 14 | Homepage | "Citoyens mobilises" sans accent | P2 | Accents |
| 15 | Homepage | "Actions lancees" sans accent | P2 | Accents |
| 16 | Homepage | "4 etapes simples" sans accent | P2 | Accents |
| 17 | Homepage | "Comment ca marche" sans accent (devrait etre "Comment **c**a marche") | P2 | Accents |
| 18 | Homepage | "Etape 1/2/3/4" sans accent | P2 | Accents |
| 19 | Homepage | "deja obtenu gain de cause" sans accent | P2 | Accents |
| 20 | Homepage | "Pret a agir ?" sans accent | P2 | Accents |
| 21 | Homepage | "Decouvrir les actions" (CTA final) sans accent | P2 | Accents |
| 22 | Homepage | 3 CTA distincts menent tous vers `/actions` (hero, featured section, CTA final) = doublon de destination, dilue l'impact | P2 | CTA doublon |
| 23 | Homepage | Hero CTA secondaire vers `/en-savoir-plus` OK, mais pas de CTA vers `/tarifs` nulle part sur la HP | P2 | Tunnel |
| 24 | Homepage | `<a>` natifs utilises partout au lieu de Next.js `<Link>` = pas de prefetch, navigation pleine page | P2 | Composant |
| 25 | Actions listing | "trouvee/trouvees" sans accent | P2 | Accents |
| 26 | Actions listing | "Reinitialiser" sans accent | P2 | Accents |
| 27 | Actions listing | Pas de CTA "Rejoindre" ou vers `/tarifs` sur la page listing = dead end pour conversion | P1 | Tunnel |
| 28 | Action detail | `text-2xs` classe CSS custom non standard (probablement non resolu par Tailwind) | P2 | CSS |
| 29 | Action detail | `background-image` inline via `style=` au lieu de `<Image>` Next.js pour le hero = pas d'optimisation image | P2 | Composant |
| 30 | Action detail | Pas de lien vers `/tarifs` ou `/rejoindre` depuis les onglets = le user signe mais ne voit jamais l'offre payante sauf s'il scrolle le sidebar | P1 | Tunnel |
| 31 | Page Merci | "apres vous" sans accent : "personnes ont signe apres vous" | P2 | Accents |
| 32 | Page Merci | "Decouvrir les forfaits" CTA vers `/tarifs` = OK, tunnel intact | P3 | OK |
| 33 | Page Merci | "Copie !" sans accent (devrait etre "Copi**e** !") | P2 | Accents |
| 34 | Page Partager | `alert()` natif sur les boutons de partage au lieu d'un comportement demo elegant | P2 | UX |
| 35 | Page Partager | Pas de lien vers `/tarifs` = dead end apres partage | P1 | Tunnel |
| 36 | En savoir plus | "5eme pouvoir" sans accent (devrait etre "5**e**me") | P2 | Accents |
| 37 | En savoir plus | "specialise", "annees", "procedures" sans accents multiples fois | P2 | Accents |
| 38 | En savoir plus | Page contient section "Comment ca marche" et section "Tribune citoyenne" = duplique le contenu de la homepage et de la page Tribune = confusion | P2 | Contenu doublon |
| 39 | Blog listing | Articles body = placeholder : "Cet article sera publie prochainement avec le contenu complet" sur TOUS les articles | P1 | Contenu placeholder |
| 40 | Blog articles | Aucun CTA vers `/actions` ou `/tarifs` dans le body des articles = dead end | P1 | Tunnel |
| 41 | Tarifs | Page complete et fonctionnelle, bon tunnel | P3 | OK |
| 42 | Tarifs | "precarite", "etudiants", "securise", "resilient" sans accents | P2 | Accents |
| 43 | Tarifs | Bouton "Choisir ce forfait" ne mene nulle part (juste scroll vers don libre, mais pas de checkout) - OK pour demo | P3 | Attendu |
| 44 | Tribune | Page "Bientot disponible" = coherent | P3 | OK |
| 45 | Tribune | "Denoncez", "Constituez", "moderation", "systeme" sans accents | P2 | Accents |
| 46 | Tribune | Emojis utilises dans la section "Pour qui" : les regles disent "pas d'emojis sauf demande explicite" | P2 | Design |
| 47 | A propos | Page sobre, correcte. Les accents sont en HTML entities (`&eacute;`) = OK | P3 | OK |
| 48 | A propos | Pas de CTA vers `/actions` ou `/tarifs` = dead end | P1 | Tunnel |
| 49 | CGU | "Retour a l'accueil" sans accent | P2 | Accents |
| 50 | CGU | Contenu complet, bien structure avec Flowbite Table | P3 | OK |
| 51 | CGU | Lien vers `/confidentialite` = OK, lien interne fonctionne | P3 | OK |
| 52 | Confidentialite | Contenu complet, bien structure | P3 | OK |
| 53 | Confidentialite | Lien externe vers cnil.fr = OK | P3 | OK |
| 54 | Compte Dashboard | `<img>` natif au lieu de `<Image>` Next.js pour les images d'actions | P2 | Composant |
| 55 | Compte Dashboard | Fonctionne bien, stats, progress, notifications | P3 | OK |
| 56 | Compte Signatures | CTA "Rejoindre cette action" pointe vers `https://palace.legal` (external) = coherent avec decision CEO | P3 | OK |
| 57 | Compte Profil | Tous les champs sont disabled + "La modification sera disponible prochainement" = OK pour demo | P3 | OK |
| 58 | Compte Paiements | Fonctionne bien avec Flowbite Table | P3 | OK |
| 59 | Compte Notifications | Dates relatives calculent depuis `now()` mais les dates mock sont fixes = les temps relatifs seront faux (ex: "il y a 1932 sem.") | P1 | Data |
| 60 | Design System | "bibliotheque" sans accent | P2 | Accents |
| 61 | Mocks actions.json | "imposse" (faute de frappe) dans le temoignage Sophie R. | P2 | Typo |
| 62 | Mocks actions.json | "caviardas" au lieu de "caviardes" | P2 | Typo |
| 63 | Navigation | Lien "Tarifs" et "En savoir plus" absents du menu principal (seulement Actions, Tribune, Blog) | P1 | Navigation |
| 64 | Navigation | `<a>` natif au lieu de Next.js `<Link>` pour tous les liens = navigation pleine page, pas de SPA behavior | P2 | Composant |
| 65 | Footer | `<a>` natif au lieu de `<Link>` = meme probleme | P2 | Composant |

---

## 3. Audit des CTA - Tableau de TOUS les boutons/liens

### Navigation globale

| Source | Label | Destination | Existe ? | Verdict |
|--------|-------|-------------|----------|---------|
| Nav | Logo | `/{locale}` | OUI | OK |
| Nav | "Actions" | `/{locale}/actions` | OUI | OK |
| Nav | "Tribune" | `/{locale}/tribune` | OUI | OK |
| Nav | "Blog" | `/{locale}/blog` | OUI | OK |
| Nav | "Se connecter" | `/{locale}/login` | NON | LIEN MORT |
| Nav dropdown | "Mon compte" | `/{locale}/compte` | OUI | OK |
| Nav dropdown | "Mes signatures" | `/{locale}/compte/signatures` | OUI | OK |
| Nav dropdown | "Administration" | `/{locale}/admin` | NON | LIEN MORT |
| Nav dropdown | "Deconnexion" | aucun href | - | No-op (OK demo) |

### Footer (present sur TOUTES les pages)

| Source | Label | Destination | Existe ? | Verdict |
|--------|-------|-------------|----------|---------|
| Footer | Logo | `/{locale}` | OUI | OK |
| Footer | "Toutes les actions" | `/{locale}/actions` | OUI | OK |
| Footer | "Nos victoires" | `/{locale}/victoires` | NON | LIEN MORT |
| Footer | "Tribune" | `/{locale}/tribune` | OUI | OK |
| Footer | "Tarifs" | `/{locale}/tarifs` | OUI | OK |
| Footer | "Qui sommes-nous" | `/{locale}/a-propos` | OUI | OK |
| Footer | "Blog" | `/{locale}/blog` | OUI | OK |
| Footer | "FAQ" | `/{locale}/faq` | NON | LIEN MORT |
| Footer | "Contact" | `/{locale}/contact` | NON | LIEN MORT |
| Footer | "Mentions legales" | `/{locale}/mentions-legales` | NON | LIEN MORT |
| Footer | "Confidentialite" | `/{locale}/confidentialite` | OUI | OK |
| Footer | "CGU" | `/{locale}/cgu` | OUI | OK |

### Homepage

| Source | Label | Destination | Verdict |
|--------|-------|-------------|---------|
| Hero | "Decouvrir les actions" | `/actions` | OK mais doublon x3 |
| Hero | "En savoir plus" | `/en-savoir-plus` | OK |
| Featured section | "Voir toutes les actions" | `/actions` | DOUBLON avec hero |
| CTA final | "Decouvrir les actions" | `/actions` | DOUBLON x3 |

### Action Detail

| Source | Label | Destination | Verdict |
|--------|-------|-------------|---------|
| Hero back | "Actions" | `/actions` | OK |
| Signature form (guest) | "Signer gratuitement" | `/actions/{id}/merci` | OK |
| Signature form (logged) | "Signer en 1 clic" | `/actions/{id}/merci` | OK |
| Signature form (signed) | "Partager cette action" | `/actions/{id}/partager` | OK |
| SignatureForm footer | "CGU" | `/cgu` | OK |
| SignatureForm footer | "politique de confidentialite" | `/confidentialite` | OK |

### Page Merci

| Source | Label | Destination | Verdict |
|--------|-------|-------------|---------|
| Share buttons x4 | Twitter/WhatsApp/FB/LinkedIn | `console.log` (demo) | OK demo |
| Copy link | - | clipboard | OK |
| Upsell | "Decouvrir les forfaits" | `/tarifs` | OK, tunnel intact |
| Upsell | "Decouvrir d'autres actions" | `/actions` | OK |

### Page Partager

| Source | Label | Destination | Verdict |
|--------|-------|-------------|---------|
| Share buttons x4 | Copier/Twitter/FB/Email | `alert()` | MAUVAIS UX (P2) |
| Bottom | "Retour aux actions" | `/actions` | OK mais devrait aller a l'action specifique |

### Page Rejoindre

| Source | Label | Destination | Verdict |
|--------|-------|-------------|---------|
| Bouton rouge | "Retour a l'action" | `/actions/{id}` | CASSE - devrait etre "Decouvrir les forfaits" vers `/tarifs` |
| Bouton gris | "Retour a l'action" | `/actions/{id}` | DOUBLON exact du bouton rouge |

### En savoir plus

| Source | Label | Destination | Verdict |
|--------|-------|-------------|---------|
| CTA final | "Decouvrir les actions" | `/actions` | OK |
| CTA final | "Voir les forfaits" | `/tarifs` | OK |

### Blog article

| Source | Label | Destination | Verdict |
|--------|-------|-------------|---------|
| Back link | "Blog" | `/blog` | OK |
| Share buttons | partage | demo | OK |
| Related articles | carte cliquable | `/blog/{slug}` | OK |
| Aucun CTA conversion | - | - | DEAD END pour conversion |

### Tarifs

| Source | Label | Destination | Verdict |
|--------|-------|-------------|---------|
| Plan cards | "Choisir ce forfait" | scroll vers don libre | OK demo |
| Organisations | "Prendre rendez-vous" | Calendly (external) | OK |

### A propos

| Source | Label | Destination | Verdict |
|--------|-------|-------------|---------|
| Aucun CTA | - | - | DEAD END |

---

## 4. Liens morts ou circulaires

### Liens morts (page n'existe pas)

| Lien | Reference depuis | Impact |
|------|-----------------|--------|
| `/{locale}/login` | Navigation (bouton "Se connecter") | P0 - visible sur TOUTES les pages |
| `/{locale}/admin` | Navigation dropdown (si admin) | P0 - visible quand connecte admin |
| `/{locale}/victoires` | Footer | P0 - visible sur TOUTES les pages |
| `/{locale}/faq` | Footer | P0 - visible sur TOUTES les pages |
| `/{locale}/contact` | Footer | P0 - visible sur TOUTES les pages |
| `/{locale}/mentions-legales` | Footer | P0 - visible sur TOUTES les pages |

**Total : 6 liens morts, dont 5 visibles sur CHAQUE page du site.**

### Liens circulaires / doublons

| Situation | Verdict |
|-----------|---------|
| Page Rejoindre : 2 boutons identiques vers `/actions/{id}` | CIRCULAIRE - retour immediat a l'action |
| Homepage : 3 CTA vers `/actions` | DOUBLON - dilue l'impact |
| Page Partager : "Retour aux actions" au lieu de retour a l'action specifique | PERTE DE CONTEXTE |

---

## 5. Probleme systemique : accents francais manquants

Le code JSX en dur (pas les mocks) utilise systematiquement des caracteres sans accent. Cela affecte **62+ occurrences** dans 13 fichiers.

**Exemples** :
- "Etape" au lieu de "**E**tape"
- "Decouvrir" au lieu de "D**e**couvrir"
- "Pret" au lieu de "Pr**e**t"
- "collectees" au lieu de "collect**e**es"
- "securise" au lieu de "s**e**curis**e**"
- "Confidentialite" au lieu de "Confidentialit**e**"

**Impact** : Chris, en tant qu'expert CX, verra cela immediatement. Sur un site juridique francais, l'absence d'accents fait amateur et mine la credibilite.

**Exception positive** : La page A propos utilise des HTML entities (`&eacute;`, `&agrave;`) pour les accents = correct. Les fichiers JSON mocks utilisent aussi des caracteres corrects en partie.

---

## 6. Probleme technique : `<a>` au lieu de `<Link>`

Presque tous les liens dans Navigation.tsx, Footer.tsx, et plusieurs composants utilisent `<a href=...>` au lieu de `<Link>` de Next.js. Consequence : chaque clic provoque un full page reload au lieu d'une navigation SPA fluide. Cela se ressent particulierement sur :
- Le menu de navigation (chaque clic recharge la page entiere)
- Les cards d'actions (clic = reload complet)
- Le footer (meme chose)

**Exception** : `ActionCard.tsx` utilise correctement `<Link>`. Le composant `SignatureForm` utilise `window.location.href` pour la redirection vers merci (full reload forcement).

---

## 7. Recommandations prioritaires (Top 10)

### P0 - A fixer MAINTENANT

| # | Action | Effort |
|---|--------|--------|
| 1 | **Creer les 4 pages manquantes du footer** : `/victoires` (peut etre une page "Bientot disponible"), `/faq`, `/contact`, `/mentions-legales`. OU retirer les liens du footer. Un footer avec des liens morts detruit la credibilite. | 2h |
| 2 | **Creer la page `/login`** : meme un simple placeholder "Connexion avec magic link - demo". Le bouton est visible sur TOUTES les pages. | 30min |
| 3 | **Fixer la page Rejoindre** : remplacer le bouton rouge par "Decouvrir les forfaits" pointant vers `/tarifs`, garder un seul bouton gris "Retour a l'action". | 15min |

### P1 - A fixer CETTE SEMAINE

| # | Action | Effort |
|---|--------|--------|
| 4 | **Ajouter `/tarifs` et `/en-savoir-plus` dans la navigation principale.** Actuellement, Tarifs n'est accessible que depuis le footer et la page merci. | 15min |
| 5 | **Ajouter un CTA vers `/actions` dans les articles de blog** et dans la page A propos. Ce sont des dead ends de conversion. | 30min |
| 6 | **Remplacer les contenus placeholder des articles de blog** par du vrai contenu (meme court). "Cet article sera publie prochainement" = un visiteur quitte immediatement. | 2h |
| 7 | **Fixer les dates des notifications mock** dans `user-activity.json` : utiliser des dates relatives au lieu de dates fixes, ou changer le composant pour afficher des dates absolues. | 30min |

### P2 - A fixer AVANT la prochaine demo

| # | Action | Effort |
|---|--------|--------|
| 8 | **Corriger les 62+ occurrences d'accents manquants** dans le JSX. Faire un search/replace systematique. | 1h |
| 9 | **Remplacer les `<a>` par `<Link>`** dans Navigation.tsx, Footer.tsx, et les autres composants pour une navigation SPA fluide. | 1h |
| 10 | **Supprimer les 4 emojis de la page Tribune** (section "Pour qui") : les regles du projet interdisent les emojis sauf demande explicite. Remplacer par des icones SVG coherentes avec le reste du site. | 30min |

---

## 8. Points positifs (pour etre honnete)

- **Design system coherent** : les tokens de couleur, la typographie, les espacements sont globalement consistants entre les pages
- **Dark mode complet** : toutes les pages ont leurs classes `dark:`, bien implemente
- **Flowbite correctement utilise** : Card, Badge, Button, Table, Timeline, Progress, Tooltip, Rating, Avatar = bonne utilisation de la lib
- **Page Tarifs** : excellente page, complete, interactive, avec configurateur, comparaison, FAQ, organisations
- **Page Merci** : growth engine bien pense (confetti, referral, share, upsell)
- **Pages juridiques (CGU, Confidentialite)** : contenu complet, structure, credible
- **ActionCard** : composant bien construit avec Image Next.js, milestone progress, trending badge
- **Mocks data** : les 8 actions sont bien documentees avec des donnees reelles (DejaVu, Linky, DNC, Phonegate, etc.)

---

## 9. Resume des metriques

| Metrique | Valeur |
|----------|--------|
| Pages existantes | 20 |
| Pages manquantes referencees | 6 (login, victoires, faq, contact, mentions-legales, admin) |
| Liens morts totaux | 6 (dont 5 dans le footer = visibles partout) |
| CTA doublons | 3 sur la homepage vers /actions |
| Dead ends (pages sans CTA de conversion) | 4 (blog articles, a propos, partager, listing actions) |
| Accents manquants dans le JSX | 62+ occurrences dans 13 fichiers |
| `<a>` au lieu de `<Link>` | Navigation + Footer + multiples composants |
| Typos dans les mocks | 2 (imposse, caviardas) |
| Pages avec contenu placeholder | 1 (tous les articles blog) |
| Emojis non autorises | 4 (page Tribune) |

---

*Audit realise le 7 avril 2026. Pas de complaisance, comme demande.*
