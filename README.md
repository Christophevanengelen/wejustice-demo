# WeJustice Demo — Frontend Only

Demo 100% autonome, zero backend. Pour iterer sur l'UI/UX avec Claude avant d'integrer avec Django.

## Demarrage rapide

```bash
cd demo
npm install
npm run dev
# → http://localhost:3001/fr
```

## Structure

```
demo/
├── app/[locale]/     # Pages (homepage, actions, blog, admin...)
├── components/       # Composants React (Navigation, Footer, DemoToolbar...)
├── lib/
│   ├── mock-api.ts   # Remplace djangoApi — lit les JSON
│   └── mock-auth.tsx # Remplace AuthProvider — toggle role
├── mocks/            # Donnees fictives editables
│   ├── actions.json  # 6 actions realistes
│   ├── users.json    # 3 profils (membre, admin, avocat)
│   └── ...
├── messages/         # i18n (FR + EN)
├── styles/           # Theme CSS WeJustice
└── public/           # Logos, fonts, images
```

## DemoToolbar (bouton 🎭 en bas a droite)

- **Role** : Switcher entre Anonyme / Membre / Admin / Avocat
- **Dark mode** : Toggle instantane
- **Langue** : FR / EN

## Modifier les donnees mock

Editez les fichiers JSON dans `mocks/` — pas besoin de redemarrer, le HMR recharge automatiquement.

## Workflow

1. Chris decrit un changement UI
2. Claude modifie les fichiers dans `demo/`
3. Preview en live sur http://localhost:3001
4. Chris valide visuellement
5. Arnaud porte les changements dans le vrai projet
