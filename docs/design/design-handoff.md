# Passation design → code — Portfolio 2026 (nevizsh) · version cinéma

Document à lire par Claude Code avec `theme.css` et les captures PNG des écrans. Il remplace l'ancienne passation « enquête » : **tout ce qui parle d'affaires, de dossiers, de pièces à conviction, de punaises ou de tableau d'enquête est obsolète.**

## Ce qu'on attend du code

- **La base esthétique uniquement** : layouts, composants, pages, styles, animations. Le contenu réel sera ajouté ensuite par Geneviève.
- **Placeholders partout** : textes entre crochets (`[Accroche en une phrase]`), images remplacées par le composant `Visuel` (voir plus bas).
- **Ne rien inventer** sur les projets : seuls les titres listés dans « Contenu de démonstration » sont connus.
- Fidélité visuelle aux captures PNG : les captures font foi pour la mise en page, ce document pour les mesures, les couleurs et le comportement.

## Fichiers fournis (dossier `design-a-ranger/` du dépôt)

- `design-handoff.md` (ce fichier) et `theme.css` : à ranger (par exemple dans `docs/design/`), puis à supprimer de `design-a-ranger/`.
- Captures PNG des écrans Figma, nommées comme les cadres (`vitrine-accueil.png`, `archives-matrice.png`…) : à ranger dans `docs/design/maquettes/`. Elles ne vont pas dans `public/` (pas de maquette en ligne).

## Règles à ne jamais casser

1. Deux volets : la **vitrine** (publique) et les **archives** (`/archives`, privées, réservées aux enseignants).
2. **Aucune page vitrine ne mène aux archives** : ni menu, ni pied de page, ni lien caché. Une fiche réflexive peut renvoyer vers la version vitrine du même projet ; l'inverse est interdit.
3. **Aucun code AC sur la vitrine.** Le ticket de preuve a une ligne « prouve AC… » masquée par défaut (prop `showAc = false`), activée seulement dans les archives.
4. `public/_headers` :
   ```
   /archives/*
     X-Robots-Tag: noindex, nofollow
   ```
   Pas de `robots.txt` pour les archives : ce fichier est public et révélerait leur adresse.
5. `public/_redirects` : `/*  /index.html  200` (routage côté client sur Netlify).
6. **Le thème vit dans les objets, pas dans les mots** : les libellés restent simples (Accueil, Projets, Profil, Contact, Archives). Pas d'indication de touches, pas de barre de progression.
7. Accessibilité : ordre du DOM = ordre de lecture ; inclinaisons et décors en CSS ou en SVG `aria-hidden` ; `prefers-reduced-motion` respecté partout ; tout est utilisable au clavier (focus Vermillon visible).

## Stack et workflow

- React, TypeScript, Vite, MDX (`@mdx-js/rollup`, `remark-frontmatter`, `remark-mdx-frontmatter`), Tailwind CSS v4 (`@tailwindcss/vite`), React Router, GSAP / Motion, Netlify.
- Git : jamais de commit direct sur `main` (déployée automatiquement par Netlify). Une branche par fonctionnalité (`feat/…`, `chore/…`), fusion par pull request, Conventional Commits.
- Dossiers :
  ```
  src/
  ├── content/projets/    ← un fichier .mdx par projet
  ├── layouts/            ← VitrineLayout, ArchivesLayout
  ├── pages/vitrine/  et  pages/archives/
  ├── components/
  └── index.css           ← @import "tailwindcss"; puis le contenu de theme.css
  ```

## Modèle de contenu (un MDX par projet, lu par les deux gabarits)

```mdx
---
slug: aima
numero: "01"
titre: Aïma
vitrine: true          # public : page Projets + /projets/:slug
selection: true        # « à l'affiche » : accueil + ruban sur la page Projets (suppose vitrine: true)
domaines: []           # parmi dev, ui-ux, video, 3d-interactif, creation-graphique ; plusieurs possibles
categorie: "[Type de projet]"
accroche: "[Accroche en une phrase]"
pitch: "[Pitch vitrine : 2 ou 3 phrases, sans jargon ni code AC.]"
annee: "[Année]"
role: "[Ton rôle]"
technos: ["[techno]", "[techno]"]
logo: ""               # chemin du logo ; vide → médaillon « LOGO »
ac: []                 # codes AC du référentiel DWEB
---

[À compléter : fiche réflexive]
```

- `/projets` liste les projets `vitrine: true` ; `/` (section « À l'affiche ») liste les `selection: true`.
- `/archives/projets` liste **tous** les projets, publics ou non.
- Libellés des domaines : `dev` → Développement web, `ui-ux` → UI/UX, `video` → Vidéo, `3d-interactif` → 3D & Interactif, `creation-graphique` → Création graphique.
- Le champ `ac` alimente l'index des archives, les bilans et la matrice : rien n'est saisi deux fois.
- Le filtre « Type » de l'index des archives (SAÉ, Alternance, TP / ressource, Personnel) n'a pas encore de champ : prévoir un champ `type` optionnel, vide par défaut.
- Valider le frontmatter avec un schéma (Zod ou un type TS) : un projet `selection: true` sans `vitrine: true` doit lever une erreur au build.

## Jetons

Tout est dans `theme.css` (bloc `@theme` Tailwind v4). Les noms correspondent à la « code syntax » des variables Figma : `fond/surface` → `--color-fond-surface` → `bg-fond-surface`.

**Polices** (Google Fonts, `display=swap`, préconnexion) :
- **Poiret One** 400 : uniquement « Geneviève » sur le fronton de l'accueil (`font-display`).
- Cormorant Garamond 500 et 500 italique : titres, accroches (`font-serif`).
- DM Sans 400 et 600 : texte, libellés de tickets (`font-sans`).
- JetBrains Mono 400 : métadonnées en capitales espacées de 10 à 14 % (numéros, années, technos, codes AC, rubriques) (`font-mono`, classe `.meta`).

**Échelle des titres (bureau)** : titre de page 80 à 104 px (Cormorant, interligne 0,95) ; titre de section 52 px (40 dans les archives) ; sous-titres 26 à 34 px ; rubrique mono 12 à 13 px en `texte-meta` au-dessus de chaque titre. Mobile : titre de page 64 à 72 px, section 36 px.

**Mise en page** : largeur 1440 px de référence, marges latérales 80 px (20 en mobile), sections espacées de 60 à 100 px.

## Liens Figma (lire seulement si un détail manque)

Fichier : `https://www.figma.com/design/X7SDGTfkr46neJ2ZcJbTHv/Portfolio-2026`, page **03 · Cinéma (v4)**. Ajouter `?node-id=XX-YY`. Chaque écran a une note turquoise au-dessus qui explique ses choix. Les pages 01 et 02 sont obsolètes.

| Élément | node-id |
| --- | --- |
| Affiche / Projet (composant) | `54-32` |
| Ticket (Principal / Papier) | `54-31` |
| Ticket de preuve | `65-749` |
| Emplacement / Visuel | `9-5` |
| Navigation vitrine bureau / mobile | `56-2` / `10-133` |
| Pied de page vitrine bureau / mobile | `9-24` / `10-140` |
| Navigation / Pied de page archives | `65-767` / `65-779` |
| Accueil bureau / mobile | `56-13` / `57-413` |
| Animation d'ouverture (storyboard) | `59-911` |
| Projets | `65-782` |
| Page projet bureau / mobile | `66-1242` / `75-1668` |
| Profil bureau / mobile | `68-1513` / `75-1916` |
| Mentions légales | `65-1291` |
| Archives : accueil, index, fiche réflexive, bilan, matrice | `70-1569`, `70-1651`, `71-1595`, `73-1642`, `73-1795` |

## Composants

Les chemins SVG ci-dessous viennent de l'export Figma : les reprendre tels quels (en composants React avec `currentColor` ou des variables CSS pour les couleurs).

### Ticket — props `label`, `sousTitre`, `variant: "principal" | "papier"`, `href` ou `onClick`
Bouton d'action en forme de ticket de cinéma, 248 × 68 px (largeur selon le texte, minimum 248).
- Fond : forme SVG (coins arrondis en creux + encoches latérales), `fond-accent` (principal) ou `fond-piece` (papier), ombre `shadow-ticket` :
  ```
  viewBox="14 8 248 68"
  M20 8H256C256 9.59 256.63 11.12 257.76 12.24C258.88 13.37 260.41 14 262 14V33C259.61 33 257.32 33.95 255.64 35.64C253.95 37.32 253 39.61 253 42C253 44.39 253.95 46.68 255.64 48.36C257.32 50.05 259.61 51 262 51V70C260.41 70 258.88 70.63 257.76 71.76C256.63 72.88 256 74.41 256 76H20C20 74.41 19.37 72.88 18.24 71.76C17.12 70.63 15.59 70 14 70V51C16.39 51 18.68 50.05 20.36 48.36C22.05 46.68 23 44.39 23 42C23 39.61 22.05 37.32 20.36 35.64C18.68 33.95 16.39 33 14 33V14C15.59 14 17.12 13.37 18.24 12.24C19.37 11.12 20 9.59 20 8Z
  ```
  En code, la forme doit s'étirer en largeur sans déformer les encoches : la construire en SVG à partir de la largeur réelle (mesurée), ou utiliser un `mask` CSS avec des `radial-gradient` pour les encoches.
- Contenu (flex, padding 0 22 0 18, espacement 14) : talon avec l'étoile à quatre branches (14 px ; Encre sur le principal, Vermillon sur le papier), filet pointillé vertical de 40 px (Encre à 35 %), libellé DM Sans 600 16 px + sous-titre mono 10 px espacé 10 %, flèche « → » 18 px. Texte en Encre sur les deux variantes.
- Survol : le ticket glisse de 3 à 4 px vers la droite et la flèche avance un peu plus (`duration-survol`, `ease-salle`).

Étoile (réutilisée partout : talons, séparateurs, compétences) :
```
viewBox="0 0 14 14"  M7 0L8.4 5.6L14 7L8.4 8.4L7 14L5.6 8.4L0 7L5.6 5.6L7 0Z
```

### Grand ticket de contact
Même principe en 960 × 240 px (Papier, ombre `0 16px 36px rgb(0 0 0 / .5)`) :
```
viewBox="36 20 960 240"
M46 20H986C986 22.65 987.05 25.2 988.93 27.07C990.8 28.95 993.35 30 996 30V118C990.17 118 984.57 120.32 980.44 124.44C976.32 128.57 974 134.17 974 140C974 145.83 976.32 151.43 980.44 155.56C984.57 159.68 990.17 162 996 162V250C993.35 250 990.8 251.05 988.93 252.93C987.05 254.8 986 257.35 986 260H46C46 257.35 44.95 254.8 43.07 252.93C41.2 251.05 38.65 250 36 250V162C41.83 162 47.43 159.68 51.56 155.56C55.68 151.43 58 145.83 58 140C58 134.17 55.68 128.57 51.56 124.44C47.43 120.32 41.83 118 36 118V30C38.65 30 41.2 28.95 43.07 27.07C44.95 25.2 46 22.65 46 20Z
```
- Talon (220 px, séparé par un filet pointillé vertical Encre) : étoile Vermillon 22 px, « PORTFOLIO » mono 11 px, « 2026 » Cormorant 40 px.
- Contenu : appel au contact (Cormorant 36 px), puis 3 lignes libellé mono + valeur (mail, LinkedIn, GitHub), et un Ticket principal « Écrire un mail » (`mailto:`) en bas à droite.
- Mobile : la forme passe en vertical (talon en haut), largeur 350 px ; voir la capture mobile.

### Ticket de preuve — props `numero`, `intitule`, `type`, `ac`, `showAc = false`, `href`
300 × 156 px (hauteur variable), fond Papier, rayon 8, ombre `0 12px 24px rgb(0 0 0 / .4)`.
- Encoches : deux cercles de 20 px couleur `fond-base`, centrés sur les bords gauche et droit, à 53 px du haut (au niveau des pointillés).
- Talon (padding 16 22) : étoile Vermillon 12 px + « PREUVE N° 0X » mono 11 px espacé 12 %, flèche « → » à droite.
- Pointillés horizontaux (Encre à 35 %).
- Contenu (padding 16 22 20) : intitulé Cormorant 24 px ; lignes « type » et « prouve » : filet du haut Encre à 20 %, libellé mono 11 px Encre à 60 % à gauche, valeur à droite (type en DM Sans 14 ; AC en mono 13 `texte-sur-piece-accent`). **La ligne « prouve » n'existe que si `showAc`.**

### Affiche de projet — props issues du MDX (`numero`, `annee`, `categorie`, `titre`, `accroche`, `role`, `technos`, `logo`, `href`, `selection`)
Fiche Papier 3:4, **360 × 480 px de référence** (280 × 373 dans la grille de la page Projets : tout est proportionnel, prévoir `width` en prop et des tailles en `em` ou un `scale`). Rayon 4, ombre `shadow-affiche`. Calques, du fond vers le dessus (coordonnées pour 360 × 480) :
1. **Motif de losanges** : filets Encre à 45° et -45°, environ tous les 19 px, opacité 4 % (`repeating-linear-gradient`).
2. **Double cadre** : rectangle Encre 1 px à 50 % en retrait de 10 px, puis 0,5 px à 22 % en retrait de 15 px.
3. **En-tête** : « N° 0X · [année] » Cormorant italique 14 px centré à y 24 ; catégorie Cormorant 22 px centrée à y 40, entre deux filets Encre de 60 px (à y 54).
4. **Fenêtre ornée** (le visuel), 308 × 272 à (26, 66) : masque à coins rentrants et pointe douce en haut et en bas.
   ```
   viewBox="0 0 308 272"
   M26 18H108C130 18 136 0 154 0C172 0 178 18 200 18H282C282 24.9 284.74 31.51 289.62 36.38C294.49 41.26 301.1 44 308 44V228C301.1 228 294.49 230.74 289.62 235.62C284.74 240.49 282 247.1 282 254H200C178 254 172 272 154 272C136 272 130 254 108 254H26C26 247.1 23.26 240.49 18.38 235.62C13.51 230.74 6.9 228 0 228V44C3.41 44 6.8 43.33 9.95 42.02C13.1 40.71 15.97 38.8 18.38 36.38C20.8 33.97 22.71 31.1 24.02 27.95C25.33 24.8 26 21.41 26 18Z
   ```
   Intérieur : fond Encre, bandes verticales Canard à 50 % (4 px tous les 9 px), halo ocre flouté (cercle de 220 px centré, opacité 20 %, flou 20 px), quelques points Papier (2 px, 60 %) et étincelles Papier (95 %). Contour : le même chemin en trait Encre 1,4 px. Quand le projet a une image, elle remplace l'intérieur (même masque, `object-fit: cover`) ; sans image, mono 10 px « VISUEL DU PROJET » centré en bas.
   Contour extérieur décalé (320 × 284 à (20, 60), trait Encre 0,6 px) :
   ```
   viewBox="0 0 320 284"
   M32 18H114C136 18 142 0 160 0C178 0 184 18 206 18H288C288 26.49 291.37 34.63 297.37 40.63C303.37 46.63 311.51 50 320 50V234C311.51 234 303.37 237.37 297.37 243.37C291.37 249.37 288 257.51 288 266H206C184 266 178 284 160 284C142 284 136 266 114 266H32C32 257.51 28.63 249.37 22.63 243.37C16.63 237.37 8.49 234 0 234V50C8.49 50 16.63 46.63 22.63 40.63C28.63 34.63 32 26.49 32 18Z
   ```
5. **Étiquette suspendue** (le titre) : pastille `fond-surface`, bordure Ocre 1 px, rayon 18, padding 8 16 8 12, œillet de 9 px (cercle Papier à bordure Ocre), titre DM Sans 600 16 px Papier ; inclinée de -5°, à (16, 104) ; reliée au cadre par une ficelle (trait Encre 1 px) : `viewBox="0 0 40 40" M2 38C10 20 22 8 38 2`, à (40, 70).
6. **Pince argent** à (3, 30), 22 × 46 : rectangle arrondi `accent-metal` à trait Encre 1 px, avec un rectangle intérieur en trait Encre 0,8 px ; ombre légère.
   ```
   viewBox="0 0 30 54"
   M21.5 1.5H6.5C4.84 1.5 3.5 2.84 3.5 4.5V43.5C3.5 45.16 4.84 46.5 6.5 46.5H21.5C23.16 46.5 24.5 45.16 24.5 43.5V4.5C24.5 2.84 23.16 1.5 21.5 1.5Z
   M18.5 9H9.5C8.67 9 8 9.67 8 10.5V37.5C8 38.33 8.67 39 9.5 39H18.5C19.33 39 20 38.33 20 37.5V10.5C20 9.67 19.33 9 18.5 9Z
   ```
7. **Ruban** en coin supérieur droit (Ocre, trait Encre 0,6 px), coupé par l'affiche : `viewBox="0 0 120 120" M40 0H74L120 46V80L40 0Z`, à (240, 0).
8. **Étincelles** à quatre branches, Encre à 30-35 % (12 à 18 px), en (21, 23), (309, 67), (328, 370), (46, 378) : `viewBox="0 0 14 14" M7 0C7.47 4.27 9.73 6.53 14 7C9.73 7.47 7.47 9.73 7 14C6.53 9.73 4.27 7.47 0 7C4.27 6.53 6.53 4.27 7 0Z`
9. **Accroche** Cormorant 19 px centrée à y 344.
10. **Encart** du bas : rectangle Encre à 7 %, rayon 10, 272 × 66 à (62, 398), texte « rôle · techno · techno » DM Sans 12 px ; **médaillon** de 76 px à (22, 392) (anneau Papier, disque Canard de 62 px, logo ou « LOGO » mono 9 px).
11. **Reflet vitrine** (au-dessus de tout) : bande de lumière blanche en diagonale (dégradé linéaire de 0 à 28 % puis 0) et liseré intérieur blanc à 25 % ; au survol, la bande suit la position de la souris (variables CSS `--mx`/`--my` mises à jour en `pointermove`, désactivé si `prefers-reduced-motion` ou pointeur grossier).

Placement : chaque affiche est **inclinée** entre -2,5° et +2° (valeur stable par projet, par exemple dérivée du slug, pas aléatoire au rendu). Survol et focus : elle se redresse (0°), monte de 8 px, l'ombre s'allonge. Toute l'affiche est un lien vers `/projets/:slug`.

### Ruban « À l'affiche »
Étiquette Ocre (`accent-reflet`), rayon 2, padding 5 12 5 10, ombre `0 4px 8px rgb(0 0 0 / .35)` ; étoile Vermillon sombre 10 px + « À L'AFFICHE » mono 10 px Encre espacé 12 % ; posée à cheval sur le bord haut de l'affiche, centrée (y -12). Affichée seulement si `selection` **et** sur la page Projets (pas sur l'accueil).

### Cadre Art déco (fronton de l'accueil, portrait)
Double filet Ocre aux angles coupés, sans fond. Pour 760 × 320 :
```
extérieur (trait 1 px, 100 %) : M18.5 0.5H741.5L759.5 18.5V301.5L741.5 319.5H18.5L0.5 301.5V18.5L18.5 0.5Z
intérieur (trait 0,6 px, 50 %) : M22.8 8H737.2L752 22.8V297.2L737.2 312H22.8L8 297.2V22.8L22.8 8Z
```
À générer selon la taille (coupe de 18 px à l'extérieur, 14,8 px à l'intérieur, retrait de 8 px). Éventail au-dessus du fronton (68 × 34, Ocre 0,8 px, opacité 55 %, centré à y -40) :
```
viewBox="0 0 68 34"  M34 34H0M34 34L2.6 21M34 34L10 10M34 34L21 2.6M34 34V0M34 34L47 2.6M34 34L58 10M34 34L65.4 21M34 34H68
```
Contenu du fronton (centré) : « PORTFOLIO 2026 » mono 13 px Ocre espacé 34 % ; « GENEVIÈVE » Poiret One espacé 22 %, taille liée à la largeur du cadre (`14cqi`, environ 100 px sur ordinateur, 42 px sur mobile ; 150 px débordait avec 9 lettres), Papier, halo ocre (`text-shadow: 0 0 36px rgb(222 196 132 / .35)`) ; séparateur (deux filets Ocre de 70 px + étoile Vermillon de 11 px). Pas de titre pro.
Portrait : même cadre (coupe 16 px), 400 × 500 au profil, 260 × 320 en mobile, emplacement `Visuel` en retrait de 18 px.

### Faisceau du projecteur
Décor `aria-hidden` en fond d'en-tête (accueil, Projets, page projet, profil ; **jamais dans les archives**) : un trapèze Ocre flouté (`filter: blur(28px)`, opacité 5 à 7 %) qui part du haut à droite (de 88 % à 102 % de la largeur) et s'élargit vers le bas (de 30 % à 62 %) ; 18 grains de poussière (points Papier de 1,2 à 2,8 px, opacité 15 à 50 %) répartis dans le cône, qui dérivent très lentement (GSAP, 20 à 40 s, boucle). Coupé si `prefers-reduced-motion`.

### Écran
Cadre à trait Ocre 1,5 px, fond Encre, ombre `shadow-ecran`, padding 16 ; contient la vidéo (ou un `Visuel`), bouton de lecture rond Vermillon de 88 px avec un triangle Encre. 960 × 540 au profil, 1280 × 640 en page projet. Vidéo : sous-titres obligatoires, jamais de lecture automatique avec le son.

### Visuel (emplacement d'image)
Rectangle `fond-surface`, bordure pointillée Ocre 1 px en retrait, libellé mono 10 px centré (« VISUEL », « PORTRAIT »…). Sert partout où une image manque.

### Filtres (page Projets)
Puces arrondies (rayon complet, padding 9 16) : libellé DM Sans 14 px + compteur mono 11 px. Inactif : contour Ocre à 50 %, texte Papier, compteur Turquoise. Actif : fond Vermillon, texte et compteur Encre, DM Sans 600. Rôle ARIA : groupe de boutons à bascule (`aria-pressed`), un seul actif à la fois.

### Générique (parcours du profil)
Bloc centré par étape : rôle et dates en mono 12 px Ocre espacé 14 % ; intitulé Cormorant 34 px ; lieu DM Sans 16 px `texte-secondaire` ; étoile Vermillon de 12 px entre deux étapes. Option : apparition au défilement comme un générique (montée lente + fondu).

### Carte de compétence (profil)
Carte Papier, rayon 6, ombre `shadow-carte`, padding 24 22 26 ; étoile Vermillon 14 px, titre Cormorant 24 px Encre, phrase DM Sans 14 px Encre à 80 %. 5 cartes en ligne (bureau), empilées en mobile ; inclinées de -1,5° à +1,4°, redressées au survol.

### Registre (archives)
Tableaux sobres : en-tête mono 11 px Turquoise espacé 12 % avec filet bas Ocre à 60 % ; lignes avec filet Ocre à 20 % ; codes AC en mono Vermillon ; ligne survolée en `bg-papier/4` avec la flèche qui passe en Vermillon. Vrais `<table>` (avec `<th scope>`), ou une liste de liens si la ligne entière est cliquable.

### Navigation et pied de page
- **Vitrine bureau** (80 px de haut, padding horizontal 80) : étoile Vermillon 16 px + logotype « nevizsh » Cormorant 28 px à gauche ; à droite, Accueil, Projets, Profil (DM Sans 15 px, espacement 40), puis « Contact » dans un cadre Ocre 1 px (rayon 2, padding 9 18) vers `/profil#contact`. Lien actif : `texte-titre-accent`.
- **Vitrine mobile** : logo + bouton menu (panneau plein écran Encre, liens en Cormorant).
- **Pied de page vitrine** : filet haut Ocre ; signature (logo + « [Une phrase qui résume ton positionnement] »), colonne Contact (mail, LinkedIn, GitHub), « Mentions légales » et « © 2026 nevizsh ». **Aucun lien vers les archives.**
- **Archives** : étoile + « Archives » (Cormorant) + étiquette « VOLET COMPÉTENCES » (mono 10 px, cadre Ocre) ; liens Accueil, Projets, Compétences, Matrice ; pied de page « ARCHIVES · SAÉ 5.10 PORTFOLIO · BUT MMI 3 · UNC » et lien « Site vitrine → » (Turquoise).

## Pages

| Route | Contenu |
| --- | --- |
| `/` | Voir « Accueil » ci-dessous |
| `/projets` | En-tête avec faisceau : éventail, « AU PROGRAMME » (mono), « Projets » (Cormorant 80), une phrase. Filtres centrés : Tout + les domaines présents dans les MDX, avec compteurs ; ligne « N PROJETS · LA SÉLECTION EN PREMIER ». Grille de 4 affiches de 280 px par ligne (espacement 40 × 80), la sélection d'abord (ruban « À l'affiche »), puis les autres projets publics. Filtre dans l'adresse (`?domaine=video`). Mobile : puces en défilement horizontal, 1 affiche par ligne (2 sur tablette) |
| `/projets/:slug` | En-tête avec faisceau : fil d'Ariane « Projets / Titre », affiche du projet à gauche (×1,12, -2°) ; à droite « N° 0X · [ANNÉE] · [TYPE] » (mono Ocre), titre Cormorant 104, accroche en italique, pitch, infos (Mon rôle, Équipe, Période, Technos : libellé mono + valeur, filet Ocre 30 %), tickets « Voir le projet / EN LIGNE » (principal) et « Code source / GITHUB » (papier). Puis l'Écran (visuel ou extrait vidéo), le récit (« Mon rôle », « Le résultat »), « En images » (3 images inclinées), « Voir le projet » (tickets de preuve **sans AC**), « Projet suivant → » (ordre des projets publics, avec une petite affiche). Sections vides masquées |
| `/profil` | En-tête avec faisceau : portrait encadré (400 × 500), « PROFIL », « Geneviève » (Cormorant 104), présentation, infos clés (Formation : BUT MMI · Développement web et dispositifs interactifs · Université de la Nouvelle-Calédonie ; Alternance : Développeuse web · ISI NC ; Recherche : placeholder), tickets « Télécharger le CV / PDF » et « Me contacter / MAIL · LINKEDIN ». Puis vidéo de présentation dans l'Écran (« SOUS-TITRES DISPONIBLES »), parcours en générique, « Ce que je sais faire » (5 cartes de compétence), `#contact` avec le grand ticket |
| `/mentions-legales` | Éditrice, hébergeur (Netlify), crédits et droits des images ; mise en page éditoriale simple |
| `/archives` | Rubrique « ARCHIVES · VOLET COMPÉTENCES », titre « Archives » (96), phrase d'accueil ; « Comment lire ces archives » : 3 étapes (numéro mono Ocre, titre Cormorant 26, texte ; filet Vermillon 2 px à gauche) ; « Par où commencer » : 3 cartes d'accès (`bg-papier/3`, contour Ocre 35 %, rayon 4) Fiches réflexives, Bilans par compétence, Matrice des AC ; accès direct aux 5 bilans (noms en Cormorant 28 séparés par des étoiles) |
| `/archives/projets` | Titre « Fiches réflexives », filtres Compétence (Toutes + 5) et Type, registre : N°, Projet (Cormorant 24), Type, Année, Compétences (pastilles), AC (nombre), flèche |
| `/archives/projets/:slug` | Sommaire collant à gauche (240 px, filet Ocre 35 % à gauche, section en cours en Vermillon via `IntersectionObserver`) ; colonne de lecture : fil d'Ariane, titre (72), « Voir la version vitrine → » **si `vitrine: true`** ; Pitch vitrine (encadré `bg-papier/3`, filet Vermillon à gauche, Cormorant italique 24) ; 01 Fiche d'identité (Type, Dans la vitrine, Période, Cadre, Équipe, Mon rôle, Outils & technos, Livrables, Statut) ; 02 Contexte et demande ; 03 Axe 1… (Objectif, Ce que j'ai fait, Choix et pourquoi, Difficultés → solutions, AC démontrés : code en étiquette Vermillon + intitulé + renvoi « → N° 0X », Preuves : tickets de preuve **avec AC**) ; 04 Bilan transversal (Je vs Nous, Ce que je ferais autrement, Dimension pro) ; 05 Récapitulatif des AC (Code, Compétence, Intitulé) |
| `/archives/competences/:nom` | Onglets des 5 compétences (actif en Vermillon souligné), nom (96) et intitulé officiel en italique, encadré « Mon bilan », puis les niveaux (2 pour Comprendre, Concevoir, Exprimer ; 3 pour Développer et Entreprendre) : code AC (mono Vermillon), intitulé exact, projets qui le démontrent, statut |
| `/archives/matrice` | Légende (cercle plein Vermillon = démontré ; cercle vide Ocre 45 % = pas mobilisé), tableau AC × projets groupé par compétence et niveau (intertitres Cormorant italique Ocre), case pleine = lien vers la preuve dans la fiche. Généré depuis les MDX |

Les intitulés des compétences et des AC viennent du référentiel officiel DWEB : les stocker dans un fichier de données unique (`src/data/referentiel.ts`), avec des emplacements si Geneviève ne les a pas encore fournis. Ne jamais les reformuler.

### Accueil
- **Hero** (810 px de haut) : faisceau + poussière ; Cadre Art déco 760 × 320 centré (y 150) avec le fronton ; dessous, accroche Cormorant italique 32 px (720 px, centrée) et deux tickets « Voir les projets » (principal) et « Me contacter » (papier).
- **Présentation** : portrait encadré, titre « Qui je suis », 3 ou 4 phrases, infos clés (formation, alternance, recherche), ticket « Profil complet », vidéo de présentation en vignette secondaire.
- **Projets — « À l'affiche »** : les affiches `selection: true` (360 px), inclinées, 3 en haut et 2 en dessous, décalées comme sur un mur ; ticket vers `/projets`. Mobile : défilement horizontal avec accroche magnétique et indicateur.
- **Contact** : grand ticket. Puis pied de page.
- **Ouverture** (une fois par session, `sessionStorage`, environ 2 s, bouton « Passer » visible et focalisable) : noir complet → le faisceau s'allume en fondu avec un léger scintillement → les filets du cadre se tracent (`stroke-dashoffset`) et « Geneviève » apparaît « projeté » avec deux ou trois battements de lumière → l'accroche puis les tickets apparaissent en fondu. Mobile : environ 1,2 s. `prefers-reduced-motion` : pas de séquence, tout est affiché. Le contenu existe dans le DOM dès le départ (pas de page vide pour les lecteurs d'écran ni pour le référencement).
- **Son** : pas maintenant. Prévoir seulement l'emplacement d'un bouton son dans la navigation, désactivé par défaut.

### Animations, en résumé
Lentes et feutrées : fondus, lumière qui s'allume, soulèvement au survol. Apparition des sections au défilement (montée de 16 px + fondu, une fois). Filtrage de la page Projets : les affiches qui sortent s'éteignent en fondu, les autres se replacent (GSAP Flip ou `layout` de Motion). Jamais de clignotement rapide, de glitch ni de rebond.

## À éviter
Rideaux, ampoules, pellicule partout, clap, pop-corn, compte à rebours, néon, grain de film trop marqué, crochets de HUD, glitch, pluie de code, sépia. Et tous les éléments de l'ancienne DA enquête.

## Contenu de démonstration (placeholders)

Un fichier MDX par projet connu, avec seulement les titres, et des crochets partout ailleurs :

| slug | titre | vitrine | selection | numero |
| --- | --- | --- | --- | --- |
| `aeria` | Aeria | true | true | "0X" |
| `aima` | Aïma | true | true | "01" |
| `micro-mondes` | Micro-Mondes | true | true | "0X" |
| `web-documentaire` | Web-documentaire | true | true | "0X" |
| `galerie-3d` | Galerie 3D à commande vocale | true | true | "0X" |
| `bloodshare-vr` | BloodShare VR | false | false | "0X" |
| `eveil-des-abysses` | Éveil des abysses | false | false | "0X" |
| `mini-parc-3d` | Mini parc 3D | false | false | "0X" |

- `domaines: []` partout : c'est Geneviève qui les attribuera. Pour vérifier les filtres pendant le développement, utiliser un fichier de test hors de `src/content/` (ou un drapeau de développement), jamais de domaines inventés dans les vrais fichiers.
- Les trois derniers projets restent hors vitrine tant que Geneviève n'a pas décidé ; ils apparaissent dans les archives.
- `ac: []` partout.

## Ordre de travail conseillé

1. `chore/rangement-design` : ranger `design-a-ranger/` dans `docs/design/`.
2. `chore/theme` : `theme.css` dans `index.css`, polices.
3. `feat/routing` : routes, deux layouts, `_redirects`, `_headers`.
4. `feat/contenu` : chargement des MDX, schéma du frontmatter, données du référentiel.
5. `feat/composants` : Visuel, Ticket, Grand ticket, Ticket de preuve, Cadre Art déco, Faisceau, Écran, Affiche (avec reflet), Ruban, Filtres.
6. `feat/accueil` : accueil bureau puis mobile, puis l'ouverture.
7. `feat/vitrine` : Projets (filtres), page projet, profil, mentions légales.
8. `feat/archives` : accueil, index, fiche réflexive, bilans, matrice.
9. `chore/accessibilite` : vérification clavier, contrastes, `prefers-reduced-motion`, Lighthouse.
