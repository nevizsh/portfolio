// Textes des archives (volet compétences), à compléter. Les intitulés officiels viennent du référentiel.
export const archives = {
  accueil: {
    phrase: "[Une phrase d'accueil pour le jury : ce que contiennent ces archives et comment elles sont organisées.]",
    etapes: [
      { titre: 'Choisir une entrée', texte: '[Par projet, par compétence ou par la matrice des AC.]' },
      { titre: 'Lire la fiche', texte: '[Chaque fiche suit le même modèle : contexte, axes, preuves, bilan.]' },
      { titre: 'Vérifier les preuves', texte: '[Chaque AC renvoie vers une preuve numérotée (ticket).]' },
    ],
  },
  projets: {
    phrase: '[Une phrase : tous les projets du BUT, avec la fiche réflexive complète et les AC démontrés.]',
  },
  matrice: {
    phrase: '[Une phrase : chaque ligne est un AC du parcours, chaque colonne un projet ; une case pleine renvoie vers la preuve.]',
  },
  /** « Mon bilan » de chaque compétence (clé : slug du référentiel) */
  bilans: {
    comprendre: '',
    concevoir: '',
    exprimer: '',
    developper: '',
    entreprendre: '',
  } as Record<string, string>,
  /** Texte affiché tant qu'un bilan est vide */
  bilanVide:
    "[À compléter : où tu en es sur cette compétence, ta progression depuis la 1re année, tes points forts et ce qui reste à travailler.]",
}
