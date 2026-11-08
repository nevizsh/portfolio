import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { aleatoire } from './aleatoire'

// Le cône : part du haut à droite (88 % → 102 % de la largeur) et s'élargit vers le bas (30 % → 62 %).
const HAUT = [88, 102]
const BAS = [30, 62]

// 18 grains de poussière, placés une fois pour toutes dans le cône
const tirage = aleatoire(2026)
const grains = Array.from({ length: 18 }, () => {
  const t = 0.08 + tirage() * 0.84 // hauteur dans le cône (0 = haut, 1 = bas)
  const gauche = HAUT[0] + (BAS[0] - HAUT[0]) * t
  const droite = HAUT[1] + (BAS[1] - HAUT[1]) * t
  return {
    x: gauche + (droite - gauche) * (0.15 + tirage() * 0.7),
    y: t * 100,
    taille: 1.2 + tirage() * 1.6,
    opacite: 0.15 + tirage() * 0.35,
    duree: 20 + tirage() * 20,
    dx: (tirage() - 0.5) * 40,
    dy: -10 - tirage() * 30,
  }
})

type FaisceauProps = {
  className?: string
}

/**
 * Faisceau du projecteur : décor aria-hidden en fond d'en-tête (vitrine uniquement, jamais dans les archives).
 * La poussière dérive très lentement (GSAP, 20 à 40 s, en boucle) ; tout est figé si
 * l'utilisateur a demandé de réduire les animations.
 */
export default function Faisceau({ className = '' }: FaisceauProps) {
  const racine = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>('.grain', racine.current).forEach((el, i) => {
          const g = grains[i]
          gsap.to(el, { x: g.dx, y: g.dy, duration: g.duree, ease: 'sine.inOut', repeat: -1, yoyo: true })
        })
      }, racine)
      return () => ctx.revert()
    })
    return () => mm.revert()
  }, [])

  return (
    // Le masque fait s'éteindre la lumière en douceur vers le bas (pas de coupure nette en fin d'en-tête)
    <div
      ref={racine}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden [mask-image:linear-gradient(to_bottom,black_55%,transparent)] ${className}`}
    >
      {/* Le flou est sur le parent : le trapèze est d'abord découpé, puis adouci */}
      <div className="faisceau absolute inset-0 blur-[28px]">
        <div
          className="absolute inset-0 bg-accent-reflet opacity-[0.06]"
          style={{ clipPath: `polygon(${HAUT[0]}% 0, ${HAUT[1]}% 0, ${BAS[1]}% 100%, ${BAS[0]}% 100%)` }}
        />
      </div>
      {grains.map((g, i) => (
        <span
          key={i}
          className="grain absolute rounded-full bg-papier"
          style={{ left: `${g.x}%`, top: `${g.y}%`, width: g.taille, height: g.taille, opacity: g.opacite }}
        />
      ))}
    </div>
  )
}
