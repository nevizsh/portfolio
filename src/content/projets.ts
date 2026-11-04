import type { ComponentType } from 'react'
import { validerProjet, type Projet } from './schema'

/*
 * Chargement des projets : un fichier MDX par projet.
 * Le frontmatter (en-tête YAML) donne les données ; le corps MDX est la fiche réflexive (archives).
 *
 * Projets de test (pour essayer les filtres sans inventer de domaines dans les vrais fichiers) :
 *   npm run dev:test   → charge src/dev/projets-test/ à la place de src/content/projets/
 */

type ModuleMdx = { frontmatter: unknown; default: ComponentType }

export type ProjetCharge = Projet & {
  /** Corps MDX : la fiche réflexive */
  Fiche: ComponentType
}

const vrais = import.meta.glob<ModuleMdx>('./projets/*.mdx', { eager: true })
const deTest = import.meta.env.DEV && import.meta.env.VITE_PROJETS_TEST === '1'
  ? import.meta.glob<ModuleMdx>('../dev/projets-test/*.mdx', { eager: true })
  : null

const modules = deTest ?? vrais

/** Ordre : numéro (les « 0X » après les numéros connus), puis titre. */
const versNombre = (numero: string) => (/^\d+$/.test(numero) ? Number(numero) : Number.NaN)

const parOrdre = (a: Projet, b: Projet) => {
  // « 0X » n'est pas un nombre (attention : parseInt("0X") donnerait 0)
  const na = versNombre(a.numero)
  const nb = versNombre(b.numero)
  if (!Number.isNaN(na) || !Number.isNaN(nb)) {
    if (Number.isNaN(na)) return 1
    if (Number.isNaN(nb)) return -1
    if (na !== nb) return na - nb
  }
  return a.titre.localeCompare(b.titre, 'fr')
}

/** Tous les projets, publics ou non (archives) */
export const projets: ProjetCharge[] = Object.entries(modules)
  .map(([fichier, m]) => ({ ...validerProjet(m.frontmatter, fichier), Fiche: m.default }))
  .sort(parOrdre)

/** Projets publics (page Projets), la sélection en premier */
export const projetsVitrine = projets
  .filter((p) => p.vitrine)
  .sort((a, b) => Number(b.selection) - Number(a.selection))

/** « À l'affiche » sur l'accueil */
export const projetsALAffiche = projetsVitrine.filter((p) => p.selection)

export const trouverProjet = (slug?: string) => projets.find((p) => p.slug === slug)

/** Pour la vitrine : un projet non public reste introuvable */
export const trouverProjetVitrine = (slug?: string) => projetsVitrine.find((p) => p.slug === slug)

/** Projet suivant dans l'ordre des projets publics (revient au premier après le dernier) */
export function projetSuivant(slug: string) {
  const i = projetsVitrine.findIndex((p) => p.slug === slug)
  if (i === -1 || projetsVitrine.length < 2) return undefined
  return projetsVitrine[(i + 1) % projetsVitrine.length]
}
