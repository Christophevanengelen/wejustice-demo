# WeJustice Demo — Component Library

> Un composant = un fichier = un style. Jamais de duplication.

## UI (atoms)

| Composant | Fichier | Props |
|-----------|---------|-------|
| `CTAButton` | `ui/CTAButton.tsx` | `variant, size, fullWidth, disabled, onClick, className, children` |
| `ErrorBoundary` | `ui/ErrorBoundary.tsx` | `children, fallback` |
| `LogoFigma` | `ui/LogoFigma.tsx` | `size, showText, className` |
| `StatusBadge` | `ui/StatusBadge.tsx` | `status, size` |
| `ThemeTags` | `ui/ThemeTags.tsx` | `themes, variant` |
| `SignatureProgress` | `ui/SignatureProgress.tsx` | `current, goal, variant` |
| `UrgencyBadge` | `ui/UrgencyBadge.tsx` | `endDate, currentSignatures, goalSignatures, trending` |
| `FundsBar` | `ui/FundsBar.tsx` | `totalCollected, totalSpent, categories` |

## Layout

| Composant | Fichier |
|-----------|---------|
| `Navigation` | `layout/Navigation.tsx` |
| `Footer` | `layout/Footer.tsx` |
| `DemoToolbar` | `layout/DemoToolbar.tsx` |

## Features — Compte (espace membre)

| Composant | Fichier | Role |
|-----------|---------|------|
| `ComptePageShell` | `features/compte/ComptePageShell.tsx` | Coquille layout pour toutes les pages /compte (titre, max-width) |
| `CompteNavbar` | `features/compte/CompteNavbar.tsx` | Navbar espace membre (logo, avatar, dark toggle, hamburger) |
| `CompteSidebar` | `features/compte/CompteSidebar.tsx` | Sidebar fixe espace membre (liens, icones, active state) |

## Features — Actions

| Composant | Fichier | Role |
|-----------|---------|------|
| `ActionCard` | `features/actions/ActionCard.tsx` | Carte action (liste + homepage) |
| `SignatureForm` | `features/actions/SignatureForm.tsx` | 3 paths : guest / logged-in / signed |
| `ShareButtons` | `features/actions/ShareButtons.tsx` | 6 plateformes, 2 variants |
| `StickySignCTA` | `features/actions/StickySignCTA.tsx` | Mobile sticky bottom bar |
| `MilestoneTracker` | `features/actions/MilestoneTracker.tsx` | Paliers de signatures |
| `MilestoneProgress` | `features/actions/MilestoneProgress.tsx` | Barre de progression avec jalons (full/compact) |
| `SocialProofBanner` | `features/actions/SocialProofBanner.tsx` | Indicateur "X signatures cette semaine" |
| `UrgencyNearMilestone` | `features/actions/UrgencyNearMilestone.tsx` | Banniere urgence quand proche d'un palier |
| `CommentThread` | `features/actions/CommentThread.tsx` | Message YouTube-style + replies |
| `TabPresentation` | `features/actions/TabPresentation.tsx` | AIDA : probleme, preuves, demandes, temoignages, equipe |
| `TabSuivi` | `features/actions/TabSuivi.tsx` | Milestones, timeline, fonds, resultats, prochaine etape |
| `TabCommunaute` | `features/actions/TabCommunaute.tsx` | Stats, composer, fil de messages |

## Features — Press

| Composant | Fichier |
|-----------|---------|
| `PressSection` | `features/press/PressSection.tsx` |

## Features — Pricing

| Composant | Fichier | Role |
|-----------|---------|------|
| `PricingCard` | `features/pricing/PricingCard.tsx` | Carte plan (nom, prix, features, CTA) |
| `DonLibreStep` | `features/pricing/DonLibreStep.tsx` | Step 2 : don libre mensuel optionnel |
| `OrganisationsTable` | `features/pricing/OrganisationsTable.tsx` | Section B2B (benefices, CTA Calendly) |

## Animations

| Composant | Fichier |
|-----------|---------|
| `ScrollToTop` | `animations/ScrollToTop.tsx` |
| `ScrollReveal` | `animations/ScrollReveal.tsx` |
| `AnimatedSection` | `animations/AnimatedSection.tsx` |
| `AnimatedList` | `animations/AnimatedList.tsx` |
| `FadeIn` | `animations/FadeIn.tsx` |
| `AnimatedCounter` | `animations/AnimatedCounter.tsx` |

## Pages

| Route | Fichier | Composants utilises |
|-------|---------|---------------------|
| `/fr` | `HomepageClient.tsx` | ActionCard, PressSection, Avatar, Button |
| `/fr/actions` | `ActionsListClient.tsx` | ActionCard |
| `/fr/actions/[id]` | `ActionDetailClient.tsx` | TabPresentation, TabSuivi, TabCommunaute, SignatureForm, ShareButtons, StickySignCTA |
| `/fr/actions/[id]/merci` | `MerciClient.tsx` | Button |
| `/fr/actions/[id]/partager` | `PartagerClient.tsx` | Button |
| `/fr/design-system` | `DesignSystemClient.tsx` | Tous les composants UI |
