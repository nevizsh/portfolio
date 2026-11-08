// Textes du profil, partagés par l'accueil et la page Profil.
// Les infos clés « Formation » et « Alternance » viennent de la passation ; le reste est à compléter.
export const profil = {
  nom: 'Geneviève',
  accroche: '[Accroche : une phrase forte qui donne envie de découvrir tes projets]',
  presentation: '[Présentation en 3 ou 4 phrases : qui tu es, ce que tu fais entre code et image, ce qui t\'anime, ce que tu cherches.]',
  infosCles: [
    { libelle: 'Formation', valeur: 'BUT MMI · Développement web et dispositifs interactifs · Université de la Nouvelle-Calédonie' },
    { libelle: 'Alternance', valeur: 'Développeuse web · ISI NC' },
    { libelle: 'Recherche', valeur: '[Alternance, master, premier poste…]' },
  ],
  /** Parcours, affiché comme un générique (du plus récent au plus ancien) */
  parcours: [
    { role: 'Formation', dates: '[Dates]', intitule: 'BUT MMI — Développement web et dispositifs interactifs', lieu: 'Université de la Nouvelle-Calédonie' },
    { role: 'Alternance', dates: '[Dates]', intitule: 'Développeuse web', lieu: 'ISI NC' },
    { role: '[Étape précédente]', dates: '[Dates]', intitule: "[Intitulé de l'étape]", lieu: '[Établissement]' },
  ],
  /** « Ce que je sais faire » : les 5 compétences en langage clair (pas de code AC sur la vitrine) */
  savoirFaire: [
    { titre: 'Comprendre les utilisateurs', texte: '[Ce que tu sais faire, avec un exemple concret]' },
    { titre: 'Concevoir des solutions', texte: '[Ce que tu sais faire, avec un exemple concret]' },
    { titre: 'Créer contenus et interfaces', texte: '[Ce que tu sais faire, avec un exemple concret]' },
    { titre: 'Développer pour le web', texte: '[Ce que tu sais faire, avec un exemple concret]' },
    { titre: 'Mener un projet', texte: '[Ce que tu sais faire, avec un exemple concret]' },
  ],
  portrait: '',
  video: { src: '', sousTitres: '', image: '' },
  /** Chemin du CV : déposer le fichier dans public/ (par ex. public/cv.pdf → '/cv.pdf') */
  cv: '',
}
