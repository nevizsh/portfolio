// Ancres des sections de la fiche réflexive : « Axe 1 — Intitulé » → « axe-1-intitule ».
// Partagé par le plugin Vite (sommaire calculé au build) et par les titres affichés.
export function ancre(texte: string) {
  return texte
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

/** Titres de niveau 2 (« ## … ») du corps MDX, dans l'ordre */
export function sectionsDuCorps(corps: string) {
  // Les marques de mise en forme (*, _, `) ne s'affichent pas : on les retire
  return [...corps.matchAll(/^##\s+(.+?)\s*$/gm)].map((m) => m[1].replace(/[*_`]/g, ''))
}
