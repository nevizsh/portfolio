import { Link } from 'react-router'
import Etoile from './Etoile'

type TicketPreuveProps = {
  /** Numéro de la preuve : « 01 » */
  numero: string
  intitule: string
  type: string
  /** Code AC prouvé : affiché seulement si showAc (archives) */
  ac?: string
  showAc?: boolean
  href?: string
  className?: string
}

/** Ticket de preuve (300 × 156, hauteur variable). La ligne « prouve » n'existe que si showAc. */
export default function TicketPreuve({ numero, intitule, type, ac, showAc = false, href, className = '' }: TicketPreuveProps) {
  const contenu = (
    <>
      {/* Encoches au niveau des pointillés (53 px du haut) */}
      <span aria-hidden="true" className="absolute top-[43px] -left-2.5 size-5 rounded-full bg-fond-base" />
      <span aria-hidden="true" className="absolute top-[43px] -right-2.5 size-5 rounded-full bg-fond-base" />

      <span className="flex h-[53px] items-center gap-2.5 px-[22px]">
        <Etoile taille={12} className="text-vermillon" />
        <span className="flex-1 font-mono text-[11px] tracking-[0.12em] uppercase">Preuve n° {numero}</span>
        <span aria-hidden="true" className="text-[18px] transition-transform duration-survol ease-salle group-hover:translate-x-1">
          →
        </span>
      </span>
      <span aria-hidden="true" className="mx-0 block border-t border-dashed border-encre/35" />

      <span className="flex flex-col px-[22px] pt-4 pb-5">
        <span className="font-serif text-[24px] leading-tight font-medium">{intitule}</span>
        <span className="mt-3 flex items-baseline justify-between gap-4 border-t border-encre/20 pt-2">
          <span className="font-mono text-[11px] text-encre/60">type</span>
          <span className="text-right font-sans text-[14px]">{type}</span>
        </span>
        {showAc && ac && (
          <span className="mt-2 flex items-baseline justify-between gap-4 border-t border-encre/20 pt-2">
            <span className="font-mono text-[11px] text-encre/60">prouve</span>
            <span className="text-right font-mono text-[13px] text-texte-sur-piece-accent">{ac}</span>
          </span>
        )}
      </span>
    </>
  )

  const classes =
    `group relative block w-full max-w-[300px] rounded-[8px] bg-fond-piece text-texte-sur-piece shadow-[0_12px_24px_rgb(0_0_0/0.4)] ` +
    `transition-transform duration-survol ease-salle ${className}`

  if (href?.startsWith('/')) return <Link to={href} className={`${classes} hover:-translate-y-1`}>{contenu}</Link>
  if (href) return <a href={href} className={`${classes} hover:-translate-y-1`}>{contenu}</a>
  return <div className={classes}>{contenu}</div>
}
