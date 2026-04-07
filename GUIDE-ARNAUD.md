# Guide Arnaud — WeJustice Demo → Production

> Ce document accompagne la démo https://wejustice-demo.vercel.app
> Il décrit ce qu'Arnaud doit implémenter en Symfony et ce qui reste côté front.

---

## 1. Architecture cible

```
                    ┌──────────────────────────────┐
                    │         NAVIGATEUR            │
                    └──────────┬───────────────────┘
                               │
                    ┌──────────▼───────────────────┐
                    │         NGINX                 │
                    │   (reverse proxy, CORS, SSL)  │
                    └──────┬───────────┬───────────┘
                           │           │
              ┌────────────▼──┐   ┌────▼──────────────┐
              │   NEXT.JS     │   │   SYMFONY          │
              │   (Frontend)  │   │   (Backend API)    │
              │               │   │                    │
              │ - Pages       │   │ - Auth (users)     │
              │ - Composants  │   │ - Signatures       │
              │ - i18n        │   │ - Forfaits/PayZen  │
              │ - SEO/OG      │   │ - Espace membre    │
              │ - Animations  │   │ - Newsletter       │
              │               │   │ - CMS blog         │
              └───────────────┘   └────────┬───────────┘
                                           │
                                  ┌────────▼───────────┐
                                  │   POSTGRESQL        │
                                  │   (DB existante)    │
                                  └────────────────────┘
                                           │
                                  ┌────────▼───────────┐
                                  │   CRM LEXPRECIA     │
                                  │   (système existant)│
                                  │   - KYC             │
                                  │   - Mandat          │
                                  │   - Dossier         │
                                  │     plaignant       │
                                  └────────────────────┘
```

### Règle fondamentale

**Next.js = vitrine. Symfony = cerveau.** Next.js ne parle JAMAIS directement à la DB. Tout passe par Nginx vers l'API Symfony.

---

## 2. Ce que WeJustice gère vs ce que Lexprecia gère

| Domaine | WeJustice (nous) | Lexprecia (CRM existant) |
|---------|------------------|--------------------------|
| **Signature** (gratuite) | Formulaire + stockage | — |
| **Forfait** (payant) | Affichage + tunnel | PayZen + gestion abo |
| **Espace membre** | Status only (lecture DB) | — |
| **"Rejoindre" une action** | CTA → redirect | KYC, mandat, dossier plaignant |
| **Procédure juridique** | Page de suivi (lecture) | Gestion complète (Me Durand) |
| **Blog/Tribune** | Affichage (CMS simple) | — |
| **Organisations B2B** | Page contact + formulaire | Négociation commerciale |

### Le CTA "Rejoindre"

Quand un membre clique "Rejoindre cette action" :
1. **WeJustice** vérifie qu'il a un forfait actif et des actions disponibles
2. **WeJustice** redirige vers le système Lexprecia (URL externe ou iframe)
3. **Lexprecia** gère le KYC, le mandat, et le dossier plaignant
4. **Lexprecia** met à jour le statut dans la DB partagée
5. **WeJustice** affiche le statut mis à jour dans l'espace membre

---

## 3. Pages de la démo et leur implémentation

### Pages publiques (tout le monde)

| Page | URL démo | Backend nécessaire | Priorité |
|------|----------|-------------------|----------|
| Homepage | `/fr` | Stats réelles (compteurs) | P0 |
| Actions listing | `/fr/actions` | API liste actions + filtres | P0 |
| Action détail | `/fr/actions/{id}` | API action + signatures réelles | P0 |
| Formulaire signature | (dans action détail) | POST signature + email confirm | P0 |
| Page merci | `/fr/actions/{id}/merci` | Statique (pas de backend) | P0 |
| Page partager | `/fr/actions/{id}/partager` | Statique (OG tags dynamiques) | P1 |
| Blog listing | `/fr/blog` | API articles (ou markdown) | P2 |
| Blog article | `/fr/blog/{slug}` | API article détail | P2 |
| Tribune | `/fr/tribune` | Formulaire soumission dossier | P2 |
| Tarifs | `/fr/tarifs` | Statique (pricing-engine.ts) | P1 |
| CGU | `/fr/cgu` | Statique | P3 |
| Confidentialité | `/fr/confidentialite` | Statique | P3 |

### Pages authentifiées (membre connecté)

| Page | URL démo | Backend nécessaire | Priorité |
|------|----------|-------------------|----------|
| Dashboard | `/fr/compte` | API user + stats (actions/seats) | P0 |
| Mes signatures | `/fr/compte/signatures` | API signatures user | P1 |
| Notifications | `/fr/compte/notifications` | API notifications | P2 |
| Profil | `/fr/compte/profil` | API user (lecture seule) | P1 |
| Paiements | `/fr/compte/paiements` | API historique paiements | P1 |

---

## 4. API Symfony à implémenter

### Endpoints priorité P0

```
POST   /api/signatures           # Créer une signature (prénom, nom, email)
GET    /api/actions               # Lister les actions (filtres: theme, status)
GET    /api/actions/{id}          # Détail action (signatures count, timeline)
GET    /api/stats                 # Stats homepage (total signatures, actions, membres)
POST   /api/auth/login            # Connexion (email + password ou magic link)
GET    /api/auth/me               # User courant (plan, actions, seats)
```

### Endpoints priorité P1

```
GET    /api/actions/{id}/signatures   # Liste signatures (paginé)
GET    /api/user/signatures           # Mes signatures
GET    /api/user/payments             # Mes paiements
POST   /api/forfaits/subscribe        # Souscrire un forfait → PayZen
POST   /api/newsletter/subscribe      # Inscription newsletter
```

### Endpoints priorité P2

```
GET    /api/blog                      # Articles blog
GET    /api/blog/{slug}               # Article détail
POST   /api/tribune/submit            # Soumettre un dossier tribune
GET    /api/user/notifications        # Notifications
```

---

## 5. Modèle de données principal

```sql
-- Les tables essentielles (simplifié)

users (id, email, first_name, last_name, plan_id, created_at)
plans (id, name, max_actions, max_seats, price_monthly)
actions (id, title, slug, description, image, status, goal, created_at)
signatures (id, user_id?, action_id, first_name, last_name, email, created_at)
participations (id, user_id, action_id, status, crm_redirect_url)
payments (id, user_id, plan_id, amount, status, payzen_ref, created_at)
notifications (id, user_id, title, body, read, created_at)
```

**Note :** La table `participations` fait le lien entre "Rejoindre" et le CRM Lexprecia. Le champ `crm_redirect_url` pointe vers le dossier dans le système existant.

---

## 6. Pricing Engine

Le moteur de calcul des prix est dans `src/lib/pricing-engine.ts`. C'est un module **pur** (zero React, zero DOM). Arnaud peut le porter en PHP ou l'utiliser tel quel côté front.

| Forfait | Prix de base | Max actions | Max sièges |
|---------|-------------|-------------|------------|
| Mini | 8,40 EUR/mois | 1 | 1 |
| Plus | 14,60 EUR/mois | 2 | 2 |
| Maxi | 24,80 EUR/mois | 5 | 3 |
| Aura | 58,00 EUR/mois | Illimité | 4 |

Réductions :
- Duo (2 personnes) : -40%
- Trio (3 personnes) : -50%
- Annuel : -30%, Biannuel : -35%, Triannuel : -40%
- Tarif réduit (précarité) : -50%, 1 personne, pas d'Aura

---

## 7. SEO — Déjà en place

La démo inclut une infrastructure SEO complète qu'Arnaud doit **conserver** :

| Élément | Fichier | Status |
|---------|---------|--------|
| robots.txt | `src/app/robots.ts` | ✅ AI bots autorisés, training bloqué |
| sitemap.xml | `src/app/sitemap.ts` | ✅ 46 URLs dynamiques |
| OG tags | `generateMetadata` par page | ✅ Titre + description + image |
| Twitter Cards | `summary_large_image` | ✅ Sur toutes les pages |
| JSON-LD | `src/lib/jsonld.ts` | ✅ Organization, Article, FAQ, Breadcrumb |
| llms.txt | `public/llms.txt` | ✅ Documentation pour LLMs |
| Alternates i18n | `fr` + `en` | ✅ Canonical + hreflang |

---

## 8. Design System

| Décision | Choix | Raison |
|----------|-------|--------|
| Gray family | **Slate** | Undertone bleu-gris = institutionnel, trustworthy |
| Brand color | **#C20520** (rouge) | CTA cliquable uniquement, jamais en fond |
| Dark mode brand | **#FF4D63** | Validé CEO, contraste AA sur dark surfaces |
| Components | **Flowbite React** | Via ThemeProvider, pas de plugin CSS |
| Font | **Campton** | Custom font, WOFF2 |
| Animations | **Framer Motion** | Scroll reveals, counters, transitions |

---

## 9. Décisions produit CEO (Avril 2026)

### Tunnel de conversion
```
VISITEUR ──▶ SIGNE (gratuit) ──▶ PAGE MERCI ──▶ UPSELL ──▶ /tarifs ──▶ PayZen
                                    │
                                    ├─ "Merci ! Votre signature compte."
                                    ├─ Bouton partage (Twitter, FB, WhatsApp)
                                    └─ "Allez plus loin : devenez partie prenante"
                                       CTA vers /tarifs (forfait)
```
L'upsell se fait **sur la page merci**, pas par email. C'est le moment chaud.

### Mécanisme de paliers (viralité)
Toutes les actions sont lancées simultanément. Le système de paliers décide laquelle passe en procédure juridique :

| Palier | Effet |
|--------|-------|
| 1 000 signatures | Badge "Action populaire" + notification signataires |
| 10 000 signatures | Communiqué interne + boost partage |
| 50 000 signatures | Notification presse + Me Durand prépare le dossier |
| 100 000 signatures | Lancement procédure juridique + email tous signataires |
| 500 000 signatures | Action phare, couverture médiatique maximale |

Arnaud doit implémenter : un job qui vérifie les seuils après chaque signature et déclenche les notifications appropriées.

### Organisations B2B
Le CTA "Contactez-nous" de la section Organisations redirige vers un **Calendly** (prise de RDV directe avec Chris). Pas de formulaire, pas d'email. URL à configurer quand le Calendly sera créé.

### Page À propos
Page manquante dans la démo. Doit contenir :
- Qui est derrière WeJustice (Chris — fondateur, CX)
- L'avocat référent (Me Arnaud Durand — Lexprecia)
- La mission (5e pouvoir, justice collective)
- Les partenaires
- Signal de confiance #1 pour les nouveaux visiteurs

### Espace membre = Status Only
L'espace membre WeJustice affiche des **données en lecture seule** depuis la DB. Toute la gestion plaignant (KYC, mandat, dossier) est dans le CRM Lexprecia existant. Le bouton "Rejoindre" redirige vers Lexprecia.

---

## 10. Ce qu'Arnaud NE doit PAS faire

1. **Ne pas recréer le design** — utiliser la démo comme spec pixel-perfect
2. **Ne pas gérer le KYC** — redirect vers CRM Lexprecia
3. **Ne pas implémenter de CMS lourd** — markdown ou champs simples en DB
4. **Ne pas toucher au SEO** — la structure est en place, la garder
5. **Ne pas utiliser Docker** — déploiement direct sur VM avec systemd

---

## 11. Liens

- **Démo live** : https://wejustice-demo.vercel.app
- **Repo GitHub** : https://github.com/Christophevanengelen/wejustice-demo
- **Pricing engine** : `src/lib/pricing-engine.ts`
- **Design tokens** : `src/styles/wejustice-theme.css`
- **Mock data** : `src/mocks/` (actions, blog, users, site-settings)
