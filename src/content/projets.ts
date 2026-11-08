import { lazy, type ComponentType, type LazyExoticComponent } from 'react'
import type { MDXComponents } from 'mdx/types'
import donnees from 'virtual:projets'
import type { Projet } from './schema'

/*
 * Chargement des projets : un fichier MDX par projet.
 *  - Les données (frontmatter) viennent du module virtuel « virtual:projets », lu et validé
 *    au build par le plugin de vite.config.ts : elles sont légères et servent partout.
 *  - Le corps MDX (la fiche réflexive) est chargé à la demande, seulement dans les archives :
 *    il n'est pas dans le fichier JavaScript téléchargé par les visiteurs de la vitrine.
 *
 * Projets de test (pour essayer les filtres sans inventer de domaines dans les vrais fichiers) :
 *   npm run dev:test   → charge src/dev/projets-test/ à la place de src/content/projets/
 */

type CorpsFiche = ComponentType<{ components?: MDXComponents }>
type ChargeurFiche = () => Promise<{ default: CorpsFiche }>

export type ProjetCharge = Projet & {
  /** Titres de niveau 2 du corps de la fiche (« Contexte et demande », « Axe 1 — … ») */
  sections: string[]
  /** Corps MDX : la fiche réflexive, chargée à la demande */
  Fiche: LazyExoticComponent<CorpsFiche>
}

const fichiers: Record<string, ChargeurFiche> =
  import.meta.env.DEV && import.meta.env.VITE_PROJETS_TEST === '1'
    ? import.meta.glob<{ default: CorpsFiche }>('../dev/projets-test/*.mdx')
    : import.meta.glob<{ default: CorpsFiche }>('./projets/*.mdx')

const chargeurs = new Map(Object.entries(fichiers).map(([chemin, charger]) => [chemin.split('/').pop()!.replace('.mdx', ''), charger]))

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
export const projets: ProjetCharge[] = donnees
  .map((p) => ({ ...p, Fiche: lazy(chargeurs.get(p.slug)!) }))
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
