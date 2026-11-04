// Domaines possibles d'un projet (filtres de la page Projets), avec leur libellé affiché.
export const domaines = {
  dev: 'Développement web',
  'ui-ux': 'UI/UX',
  video: 'Vidéo',
  '3d-interactif': '3D & Interactif',
  'creation-graphique': 'Création graphique',
} as const

export type Domaine = keyof typeof domaines

export const codesDomaines = Object.keys(domaines) as [Domaine, ...Domaine[]]

// Types de projet (filtre « Type » de l'index des archives)
export const typesProjet = {
  sae: 'SAÉ',
  alternance: 'Alternance',
  tp: 'TP / ressource',
  personnel: 'Personnel',
} as const

export type TypeProjet = keyof typeof typesProjet
