import type { ReactNode } from 'react'
import { formeCadre } from './formes'
import { useTaille } from './useTaille'

type CadreArtDecoProps = {
  children?: ReactNode
  /** Coupe des angles extérieurs (16 pour les portraits) */
  coupe?: number
  className?: string
}

/** Double filet Ocre aux angles coupés, sans fond : cadre des portraits (accueil et profil). */
export default function CadreArtDeco({ children, coupe = 16, className = '' }: CadreArtDecoProps) {
  const [ref, { w, h }] = useTaille<HTMLDivElement>({ w: 760, h: 320 })
  const retrait = 8
  const coupeInterieure = coupe - 3.2

  return (
    <div ref={ref} className={`relative ${className}`}>
      <svg aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full overflow-visible" viewBox={`0 0 ${w} ${h}`}>
        <path className="stroke-bordure-filet" d={formeCadre(w, h, coupe)} fill="none" strokeWidth="1" />
        <path
          className="stroke-bordure-filet"
          d={formeCadre(w - 2 * retrait, h - 2 * retrait, coupeInterieure, 0)}
          transform={`translate(${retrait} ${retrait})`}
          fill="none"
          strokeWidth="0.6"
          strokeOpacity="0.5"
        />
      </svg>

      <div className="relative h-full">{children}</div>
    </div>
  )
}
