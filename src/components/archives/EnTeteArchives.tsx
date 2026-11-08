import { Fragment, type ReactNode } from 'react'
import { Link } from 'react-router'

export type Etape = { libelle: string; to?: string }

/** Fil d'Ariane mono Turquoise : « ARCHIVES / PROJETS / AÏMA ». La dernière étape est la page en cours. */
export function FilAriane({ etapes, className = '' }: { etapes: Etape[]; className?: string }) {
  return (
    <nav aria-label="Fil d'Ariane" className={className}>
      <ol className="meta flex flex-wrap gap-x-3 text-[12px] text-texte-meta md:text-[13px]">
        {etapes.map((e, i) => (
          <Fragment key={e.libelle}>
            {i > 0 && (
              <li aria-hidden="true" className="opacity-70">
                /
              </li>
            )}
            <li>
              {e.to ? (
                <Link to={e.to} className="transition-colors duration-survol ease-salle hover:text-texte-ornement">
                  {e.libelle}
                </Link>
              ) : (
                <span aria-current="page">{e.libelle}</span>
              )}
            </li>
          </Fragment>
        ))}
      </ol>
    </nav>
  )
}

type EnTeteArchivesProps = {
  etapes: Etape[]
  titre: string
  phrase?: string
  /** Taille du titre sur ordinateur (96 à l'accueil, 80 ailleurs, 72 dans une fiche) */
  taille?: 72 | 80 | 96
  children?: ReactNode
}

const TAILLES = { 72: 'md:text-[72px]', 80: 'md:text-[80px]', 96: 'md:text-[96px]' }

/** En-tête des pages d'archives : sobre, sans faisceau (le faisceau reste dans la vitrine). */
export default function EnTeteArchives({ etapes, titre, phrase, taille = 80, children }: EnTeteArchivesProps) {
  return (
    <header>
      <FilAriane etapes={etapes} />
      <h1 className={`mt-5 font-serif text-[52px] leading-[0.95] font-medium ${TAILLES[taille]}`}>{titre}</h1>
      {phrase && <p className="mt-6 max-w-[760px] text-[16px] leading-relaxed text-texte-secondaire md:text-[18px]">{phrase}</p>}
      {children}
    </header>
  )
}
