/**
 * Générateur pseudo-aléatoire à graine (mulberry32) : mêmes valeurs à chaque rendu.
 * Sert à placer la poussière et à incliner les affiches de façon stable, jamais au hasard du rendu.
 */
export function aleatoire(graine: number) {
  let a = graine >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/** Empreinte numérique d'un texte (slug) : sert de graine. */
export function empreinte(texte: string) {
  let h = 2166136261
  for (let i = 0; i < texte.length; i++) {
    h ^= texte.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

/** Inclinaison stable d'une affiche, entre -2,5° et +2°, tirée de son slug. */
export const inclinaisonDe = (slug: string) => -2.5 + aleatoire(empreinte(slug))() * 4.5
