import { useId, type PointerEvent } from 'react'
import { Link } from 'react-router'
import RubanAffiche from './RubanAffiche'
import { inclinaisonDe } from './aleatoire'

type AfficheProps = {
  slug: string
  numero: string
  annee: string
  categorie: string
  titre: string
  accroche: string
  role: string
  technos: string[]
  logo?: string
  /** Image du projet : remplace l'intérieur de la fenêtre */
  visuel?: string
  href: string
  /** Ruban « À l'affiche » : seulement si selection ET sur la page Projets */
  ruban?: boolean
  /** Largeur affichée en px (référence 360 ; 280 dans la grille Projets) */
  largeur?: number
  /** Inclinaison en degrés ; par défaut, valeur stable tirée du slug (-2,5° à +2°) */
  inclinaison?: number
  className?: string
}

// --- Chemins de la passation (export Figma) ----------------------------------
const FENETRE =
  'M26 18H108C130 18 136 0 154 0C172 0 178 18 200 18H282C282 24.9 284.74 31.51 289.62 36.38C294.49 41.26 301.1 44 308 44V228C301.1 228 294.49 230.74 289.62 235.62C284.74 240.49 282 247.1 282 254H200C178 254 172 272 154 272C136 272 130 254 108 254H26C26 247.1 23.26 240.49 18.38 235.62C13.51 230.74 6.9 228 0 228V44C3.41 44 6.8 43.33 9.95 42.02C13.1 40.71 15.97 38.8 18.38 36.38C20.8 33.97 22.71 31.1 24.02 27.95C25.33 24.8 26 21.41 26 18Z'
const CONTOUR =
  'M32 18H114C136 18 142 0 160 0C178 0 184 18 206 18H288C288 26.49 291.37 34.63 297.37 40.63C303.37 46.63 311.51 50 320 50V234C311.51 234 303.37 237.37 297.37 243.37C291.37 249.37 288 257.51 288 266H206C184 266 178 284 160 284C142 284 136 266 114 266H32C32 257.51 28.63 249.37 22.63 243.37C16.63 237.37 8.49 234 0 234V50C8.49 50 16.63 46.63 22.63 40.63C28.63 34.63 32 26.49 32 18Z'
const ETINCELLE = 'M7 0C7.47 4.27 9.73 6.53 14 7C9.73 7.47 7.47 9.73 7 14C6.53 9.73 4.27 7.47 0 7C4.27 6.53 6.53 4.27 7 0Z'
const PINCE_EXT = 'M21.5 1.5H6.5C4.84 1.5 3.5 2.84 3.5 4.5V43.5C3.5 45.16 4.84 46.5 6.5 46.5H21.5C23.16 46.5 24.5 45.16 24.5 43.5V4.5C24.5 2.84 23.16 1.5 21.5 1.5Z'
const PINCE_INT = 'M18.5 9H9.5C8.67 9 8 9.67 8 10.5V37.5C8 38.33 8.67 39 9.5 39H18.5C19.33 39 20 38.33 20 37.5V10.5C20 9.67 19.33 9 18.5 9Z'

// Décor de la fenêtre (coordonnées dans la fenêtre 308 × 272), relevé sur la capture
const POINTS = [[272, 63], [192, 112], [42, 123], [292, 143], [242, 252], [111, 232]]
const ETOILES_FENETRE = [[221, 94, 28], [80, 171, 20], [264, 199, 14], [151, 73, 10]]
// Étincelles Encre autour (coordonnées de l'affiche 360 × 480)
const ETINCELLES = [[21, 23, 14, 0.32], [309, 67, 18, 0.35], [328, 370, 12, 0.3], [46, 378, 16, 0.33]]

function Etincelle({ x, y, taille, className, opacite }: { x: number; y: number; taille: number; className: string; opacite: number }) {
  return <path d={ETINCELLE} transform={`translate(${x - taille / 2} ${y - taille / 2}) scale(${taille / 14})`} className={className} fillOpacity={opacite} />
}

/** Fenêtre ornée : masque à coins rentrants et pointes douces ; intérieur décoré ou image. */
function Fenetre({ visuel }: { visuel?: string }) {
  const id = useId()
  return (
    <svg viewBox="0 0 308 272" width="308" height="272" className="absolute top-[66px] left-[26px]" aria-hidden="true">
      <defs>
        <clipPath id={`masque-${id}`}>
          <path d={FENETRE} />
        </clipPath>
        <pattern id={`bandes-${id}`} width="9" height="10" patternUnits="userSpaceOnUse">
          <rect width="4" height="10" className="fill-canard-profond" fillOpacity="0.5" />
        </pattern>
        <filter id={`flou-${id}`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="20" />
        </filter>
      </defs>
      <g clipPath={`url(#masque-${id})`}>
        {visuel ? (
          <image href={visuel} width="308" height="272" preserveAspectRatio="xMidYMid slice" />
        ) : (
          <>
            <rect width="308" height="272" className="fill-encre" />
            <rect width="308" height="272" fill={`url(#bandes-${id})`} />
            <circle cx="154" cy="136" r="110" className="fill-ocre" fillOpacity="0.2" filter={`url(#flou-${id})`} />
            {POINTS.map(([x, y]) => (
              <circle key={`${x}-${y}`} cx={x} cy={y} r="1" className="fill-papier" fillOpacity="0.6" />
            ))}
            {ETOILES_FENETRE.map(([x, y, t]) => (
              <Etincelle key={`${x}-${y}`} x={x} y={y} taille={t} className="fill-papier" opacite={0.95} />
            ))}
            <text x="154" y="232" textAnchor="middle" className="fill-papier font-mono uppercase" fontSize="10" letterSpacing="1.4" fillOpacity="0.8">
              Visuel du projet
            </text>
          </>
        )}
      </g>
      <path d={FENETRE} fill="none" className="stroke-encre" strokeWidth="1.4" />
    </svg>
  )
}

/**
 * Affiche de projet (fiche Papier 3:4, 360 × 480 de référence).
 * Tout est dessiné à la taille de référence puis mis à l'échelle (transform: scale),
 * pour que chaque détail reste proportionnel quelle que soit la largeur.
 */
export default function Affiche(props: AfficheProps) {
  const { slug, numero, annee, categorie, titre, accroche, role, technos, logo, visuel, href, ruban = false, largeur = 360, className = '' } = props
  const echelle = largeur / 360
  const inclinaison = props.inclinaison ?? inclinaisonDe(slug)

  // Reflet vitrine : la bande de lumière suit la souris (pas au doigt, pas si mouvement réduit)
  const suivre = (e: PointerEvent<HTMLAnchorElement>) => {
    if (e.pointerType !== 'mouse' || matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`)
    e.currentTarget.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`)
  }
  const reinitialiser = (e: PointerEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.removeProperty('--mx')
    e.currentTarget.style.removeProperty('--my')
  }

  return (
    <Link
      to={href}
      onPointerMove={suivre}
      onPointerLeave={reinitialiser}
      style={{ width: largeur, height: largeur * (4 / 3), rotate: `${inclinaison}deg` }}
      className={
        'group relative block shrink-0 rounded-[4px] shadow-affiche transition-[rotate,translate,box-shadow] duration-fondu ease-salle ' +
        'hover:-translate-y-2 hover:!rotate-0 hover:shadow-[0_28px_56px_rgb(0_0_0/0.55)] ' +
        `focus-visible:-translate-y-2 focus-visible:!rotate-0 ${className}`
      }
    >
      {/* Toile à la taille de référence, mise à l'échelle */}
      <div
        className="absolute top-0 left-0 h-[480px] w-[360px] origin-top-left overflow-hidden rounded-[4px] bg-fond-piece text-texte-sur-piece"
        style={{ transform: `scale(${echelle})` }}
      >
        {/* 1. Losanges */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(45deg, var(--color-encre) 0 1px, transparent 1px 19px),' +
              'repeating-linear-gradient(-45deg, var(--color-encre) 0 1px, transparent 1px 19px)',
          }}
        />
        {/* 2. Double cadre */}
        <div aria-hidden="true" className="absolute inset-[10px] border border-encre/50" />
        <div aria-hidden="true" className="absolute inset-[15px] border-[0.5px] border-encre/22" />

        {/* 3. En-tête */}
        <p className="absolute top-[24px] w-full text-center font-serif text-[14px] leading-none italic">
          N° {numero} · {annee}
        </p>
        <p className="absolute top-[40px] flex w-full items-center justify-center gap-3 font-serif text-[22px] leading-[28px] font-medium">
          <span aria-hidden="true" className="h-px w-[60px] bg-encre" />
          <span className="max-w-[200px] truncate">{categorie}</span>
          <span aria-hidden="true" className="h-px w-[60px] bg-encre" />
        </p>

        {/* 4. Fenêtre ornée et son contour décalé */}
        <svg viewBox="0 0 320 284" width="320" height="284" className="absolute top-[60px] left-[20px]" aria-hidden="true">
          <path d={CONTOUR} fill="none" className="stroke-encre" strokeWidth="0.6" />
        </svg>
        <Fenetre visuel={visuel} />

        {/* 5. Étiquette suspendue (le titre) et sa ficelle. Figma -5° = CSS +5° (sens inverse) */}
        <svg viewBox="0 0 40 40" width="40" height="40" className="absolute top-[70px] left-[40px]" aria-hidden="true">
          <path d="M2 38C10 20 22 8 38 2" fill="none" className="stroke-encre" strokeWidth="1" />
        </svg>
        <p className="absolute top-[104px] left-[16px] flex origin-left rotate-5 items-center gap-2 rounded-[18px] border border-ocre bg-fond-surface py-2 pr-4 pl-3 whitespace-nowrap shadow-[0_4px_8px_rgb(0_0_0/0.3)]">
          <span aria-hidden="true" className="size-[9px] rounded-full border border-ocre bg-papier" />
          <span className="font-sans text-[16px] leading-none font-semibold text-papier">{titre}</span>
        </p>

        {/* 6. Pince argent */}
        <svg viewBox="0 0 30 54" width="30" height="54" className="absolute top-[28.5px] left-[-0.5px] drop-shadow-[0_2px_2px_rgb(0_0_0/0.25)]" aria-hidden="true">
          <path d={PINCE_EXT} className="fill-accent-metal stroke-encre" strokeWidth="1" />
          <path d={PINCE_INT} fill="none" className="stroke-encre" strokeWidth="0.8" />
        </svg>

        {/* 7. Ruban de coin */}
        <svg viewBox="0 0 120 120" width="120" height="120" className="absolute top-0 left-[240px]" aria-hidden="true">
          <path d="M40 0H74L120 46V80L40 0Z" className="fill-ocre stroke-encre" strokeWidth="0.6" />
        </svg>

        {/* 8. Étincelles */}
        <svg viewBox="0 0 360 480" width="360" height="480" className="pointer-events-none absolute inset-0" aria-hidden="true">
          {ETINCELLES.map(([x, y, t, o]) => (
            <Etincelle key={`${x}-${y}`} x={x} y={y} taille={t} className="fill-encre" opacite={o} />
          ))}
        </svg>

        {/* 9. Accroche */}
        <p className="absolute top-[344px] w-full px-8 text-center font-serif text-[19px] leading-tight font-medium">{accroche}</p>

        {/* 10. Encart et médaillon */}
        <p className="absolute top-[398px] left-[62px] flex h-[66px] w-[272px] items-center rounded-[10px] bg-encre/7 pr-4 pl-[62px] font-sans text-[12px] leading-snug">
          {[role, ...technos].join(' · ')}
        </p>
        <div aria-hidden="true" className="absolute top-[392px] left-[22px] flex size-[76px] items-center justify-center rounded-full border border-encre bg-papier">
          <div className="flex size-[62px] items-center justify-center overflow-hidden rounded-full bg-fond-surface">
            {logo ? <img src={logo} alt="" className="size-full object-cover" /> : <span className="font-mono text-[9px] tracking-[0.12em] text-papier uppercase">Logo</span>}
          </div>
        </div>

        {/* 11. Reflet vitrine (au-dessus de tout) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[4px] shadow-[inset_0_0_0_1px_rgb(255_255_255/0.25)]"
          style={{
            backgroundImage:
              'linear-gradient(115deg, transparent calc(var(--mx, 38%) - 22%), rgb(255 255 255 / 0.28) var(--mx, 38%), transparent calc(var(--mx, 38%) + 22%))',
          }}
        />
      </div>

      {ruban && <RubanAffiche className="absolute -top-3 left-1/2 z-10 -translate-x-1/2" />}
    </Link>
  )
}
