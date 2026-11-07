import type { ReactNode } from 'react'
import { formeCadre } from './formes'
import { useTaille } from './useTaille'

type CadreArtDecoProps = {
  children?: ReactNode
  /** Coupe des angles extérieurs : 18 (fronton) ou 16 (portrait) */
  coupe?: number
  /** Éventail au-dessus du cadre (fronton de l'accueil) */
  eventail?: boolean
  className?: string
}

/**
 * Double filet Ocre aux angles coupés, sans fond (fronton de l'accueil, portrait).
 * Les chemins portent pathLength=1 : l'animation d'ouverture pourra les « tracer »
 * avec stroke-dashoffset (classe .filet-cadre).
 */
export default function CadreArtDeco({ children, coupe = 18, eventail = false, className = '' }: CadreArtDecoProps) {
  const [ref, { w, h }] = useTaille<HTMLDivElement>({ w: 760, h: 320 })
  const retrait = 8
  const coupeInterieure = coupe - 3.2

  return (
    <div ref={ref} className={`relative ${className}`}>
      {eventail && (
        <svg
          aria-hidden="true"
          viewBox="0 0 68 34"
          width="68"
          height="34"
          className="eventail absolute -top-10 left-1/2 -translate-x-1/2 text-bordure-filet opacity-55"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.8"
        >
          <path d="M34 34H0M34 34L2.6 21M34 34L10 10M34 34L21 2.6M34 34V0M34 34L47 2.6M34 34L58 10M34 34L65.4 21M34 34H68" />
        </svg>
      )}

      <svg aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full overflow-visible" viewBox={`0 0 ${w} ${h}`}>
        <path className="filet-cadre stroke-bordure-filet" d={formeCadre(w, h, coupe)} fill="none" strokeWidth="1" pathLength={1} />
        <path
          className="filet-cadre stroke-bordure-filet"
          d={formeCadre(w - 2 * retrait, h - 2 * retrait, coupeInterieure, 0)}
          transform={`translate(${retrait} ${retrait})`}
          fill="none"
          strokeWidth="0.6"
          strokeOpacity="0.5"
          pathLength={1}
        />
      </svg>

      <div className="relative h-full">{children}</div>
    </div>
  )
}
