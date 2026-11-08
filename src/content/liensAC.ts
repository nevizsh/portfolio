import { referentiel, tousLesAC } from '../data/referentiel'
import { projets, type ProjetCharge } from './projets'

/*
 * Liens entre les AC du référentiel et les projets : tout est calculé depuis le champ « ac »
 * et les preuves des MDX (rien n'est saisi deux fois). Archives uniquement.
 */

const parCode = new Map(tousLesAC.map((ac) => [ac.code, ac]))

/** Intitulé officiel, compétence et niveau d'un AC */
export function infosAC(code: string) {
  const ac = parCode.get(code)
  if (!ac) return undefined
  return { ...ac, competence: referentiel.find((c) => c.slug === ac.competence)! }
}

/** Compétences mobilisées par un projet, dans l'ordre du référentiel */
export function competencesDe(projet: ProjetCharge) {
  const slugs = new Set(projet.ac.map((code) => parCode.get(code)?.competence))
  return referentiel.filter((c) => slugs.has(c.slug))
}

/** Projets qui démontrent un AC */
export function projetsDemontrant(code: string) {
  return projets.filter((p) => p.ac.includes(code))
}

/** Numéro d'une preuve sur deux chiffres : 1 → « 01 » */
export const numeroPreuve = (n: number) => String(n).padStart(2, '0')

/** Adresse de la preuve d'un AC dans la fiche (sinon le récapitulatif des AC de la fiche) */
export function lienPreuve(projet: ProjetCharge, code: string) {
  const i = projet.preuves.findIndex((p) => p.ac === code)
  return `/archives/projets/${projet.slug}#${i === -1 ? 'recap-ac' : `preuve-${numeroPreuve(i + 1)}`}`
}
