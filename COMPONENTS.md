# WeJustice Demo — Component Library

> Un composant = un fichier = un style. Jamais de duplication.

## UI (atoms)

| Composant | Fichier | Props |
|-----------|---------|-------|
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

## Features — Actions

| Composant | Fichier | Role |
|-----------|---------|------|
| `ActionCard` | `features/actions/ActionCard.tsx` | Carte action (liste + homepage) |
| `SignatureForm` | `features/actions/SignatureForm.tsx` | 3 paths : guest / logged-in / signed |
| `ShareButtons` | `features/actions/ShareButtons.tsx` | 6 plateformes, 2 variants |
| `StickySignCTA` | `features/actions/StickySignCTA.tsx` | Mobile sticky bottom bar |
| `MilestoneTracker` | `features/actions/MilestoneTracker.tsx` | Paliers de signatures |
| `CommentThread` | `features/actions/CommentThread.tsx` | Message YouTube-style + replies |
| `TabPresentation` | `features/actions/TabPresentation.tsx` | AIDA : probleme, preuves, demandes, temoignages, equipe |
| `TabSuivi` | `features/actions/TabSuivi.tsx` | Milestones, timeline, fonds, resultats, prochaine etape |
| `TabCommunaute` | `features/actions/TabCommunaute.tsx` | Stats, composer, fil de messages |

## Features — Press

| Composant | Fichier |
|-----------|---------|
| `PressSection` | `features/press/PressSection.tsx` |

## Animations

| Composant | Fichier |
|-----------|---------|
| `ScrollToTop` | `animations/ScrollToTop.tsx` |
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
