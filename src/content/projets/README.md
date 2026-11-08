# Remplir un projet

Un fichier `.mdx` par projet. Le nom du fichier est le `slug` (`aima.mdx` → `slug: aima`).

## L'en-tête (frontmatter, entre les `---`)

Les données du projet : vitrine, affiche, fiche d'identité des archives. Tout est vérifié au lancement et au build : une erreur (AC inconnu, champ manquant…) arrête le build avec un message qui dit quoi corriger.

- `ac` : les codes AC démontrés par le projet (`["AC24.01", "AC14.02"]`). Ils alimentent l'index des archives, les bilans par compétence et la matrice. **Jamais affichés sur la vitrine.**
- `preuves` : la liste des preuves. La première est la preuve n° 01, la deuxième la n° 02, etc. Le champ `ac` d'une preuve dit quel AC elle prouve : la case de la matrice renvoie alors directement vers elle.
- `type` : `sae`, `alternance`, `tp` ou `personnel` (filtre « Type » des archives).
- `titreCourt` : le nom affiché en tête de colonne dans la matrice.

## Le corps (la fiche réflexive, archives seulement)

Chaque titre `##` devient une section numérotée et une entrée du sommaire. Un titre qui commence par « Axe 1 », « Axe 2 »… reçoit l'étiquette « AXE 1 », « AXE 2 ».

Dans un axe, deux composants :

```mdx
### AC démontrés

<AcDemontre code="AC24.01" preuve={1}>en quoi ce projet le démontre</AcDemontre>

### Preuves

<Preuves numeros={[1, 2]} />
```

- `code` : un AC du champ `ac`. Son intitulé officiel s'affiche tout seul (inutile de le recopier).
- `preuve` : le numéro de la preuve dans `preuves` (affiche « → N° 01 », qui mène au ticket).
- `numeros` : les preuves à afficher en tickets dans cet axe.

Un code absent du champ `ac`, ou un numéro de preuve qui n'existe pas, arrête le build.

## Essayer sans toucher aux vrais fichiers

`npm run dev:test` charge les projets fictifs de `src/dev/projets-test/` (avec domaines, AC et preuves).
