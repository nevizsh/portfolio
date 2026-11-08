import { createContext, useContext } from 'react'
import type { ProjetCharge } from '../../content/projets'

/** Projet de la fiche en cours : les composants du MDX (AcDemontre, Preuves) y lisent les preuves */
export const ContexteFiche = createContext<ProjetCharge | null>(null)

export function useProjetFiche() {
  const projet = useContext(ContexteFiche)
  if (!projet) throw new Error('Composant de fiche utilisé hors d\'une fiche réflexive')
  return projet
}
