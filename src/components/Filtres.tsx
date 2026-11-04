export type OptionFiltre = {
  valeur: string
  libelle: string
  compteur?: number
}

type FiltresProps = {
  /** Nom du groupe, lu par les lecteurs d'écran (« Filtrer par domaine ») */
  legende: string
  options: OptionFiltre[]
  actif: string
  onChange: (valeur: string) => void
  className?: string
}

/**
 * Filtres en puces : groupe de boutons à bascule (aria-pressed), un seul actif à la fois.
 * Inactif : contour Ocre 50 %, compteur Turquoise. Actif : fond Vermillon, texte Encre.
 */
export default function Filtres({ legende, options, actif, onChange, className = '' }: FiltresProps) {
  return (
    <div role="group" aria-label={legende} className={`flex gap-2.5 ${className}`}>
      {options.map((o) => {
        const estActif = o.valeur === actif
        return (
          <button
            key={o.valeur}
            type="button"
            aria-pressed={estActif}
            onClick={() => onChange(o.valeur)}
            className={
              'inline-flex shrink-0 items-baseline gap-2 rounded-full border px-4 py-[9px] font-sans text-[14px] leading-none whitespace-nowrap ' +
              'transition-colors duration-survol ease-salle ' +
              (estActif
                ? 'border-fond-accent bg-fond-accent font-semibold text-texte-sur-accent'
                : 'border-bordure-filet/50 text-texte-principal hover:border-bordure-filet')
            }
          >
            {o.libelle}
            {o.compteur !== undefined && (
              <span className={`font-mono text-[11px] ${estActif ? 'text-texte-sur-accent' : 'text-texte-meta'}`}>{o.compteur}</span>
            )}
          </button>
        )
      })}
    </div>
  )
}
