import { Link } from 'react-router'
import Etoile from './Etoile'
import { formeTicket } from './formes'
import { useTaille } from './useTaille'

type TicketProps = {
  label: string
  sousTitre?: string
  variant?: 'principal' | 'papier'
  /** Lien interne (commence par /), externe ou mailto: */
  href?: string
  onClick?: () => void
  className?: string
}

/**
 * Ticket de cinéma : bouton d'action (248 × 68, largeur selon le texte).
 * La forme SVG est recalculée à la largeur réelle : les encoches ne se déforment pas.
 */
export default function Ticket({ label, sousTitre, variant = 'principal', href, onClick, className = '' }: TicketProps) {
  const [ref, { w }] = useTaille<HTMLSpanElement>({ w: 248, h: 68 })
  const principal = variant === 'principal'

  const contenu = (
    <span ref={ref} className="relative flex h-[68px] min-w-[248px] items-center gap-[14px] pr-[22px] pl-[18px] text-texte-sur-piece">
      {/* Fond : la forme du ticket. L'ombre suit la forme grâce à drop-shadow. */}
      <svg
        aria-hidden="true"
        className="absolute inset-0 -z-10 h-full w-full overflow-visible drop-shadow-[0_6px_14px_rgb(0_0_0/0.4)]"
        viewBox={`0 0 ${w} 68`}
        preserveAspectRatio="none"
      >
        <path d={formeTicket(w, 68, { coin: 6, encoche: 9 })} className={principal ? 'fill-fond-accent' : 'fill-fond-piece'} />
      </svg>

      {/* Talon */}
      <Etoile taille={14} className={principal ? 'text-encre' : 'text-vermillon'} />
      <span aria-hidden="true" className="h-10 border-l border-dashed border-encre/35" />

      <span className="flex flex-1 flex-col gap-1 text-left">
        <span className="font-sans text-[16px] leading-tight font-semibold">{label}</span>
        {sousTitre && <span className="font-mono text-[10px] leading-none tracking-[0.1em] uppercase">{sousTitre}</span>}
      </span>

      <span aria-hidden="true" className="ml-4 text-[18px] transition-transform duration-survol ease-salle group-hover:translate-x-1.5 group-focus-visible:translate-x-1.5">
        →
      </span>
    </span>
  )

  const classes = `group relative isolate inline-flex transition-transform duration-survol ease-salle hover:translate-x-[3px] focus-visible:translate-x-[3px] ${className}`

  if (href?.startsWith('/')) return <Link to={href} className={classes}>{contenu}</Link>
  if (href) return <a href={href} className={classes}>{contenu}</a>
  return <button type="button" onClick={onClick} className={`${classes} cursor-pointer`}>{contenu}</button>
}
