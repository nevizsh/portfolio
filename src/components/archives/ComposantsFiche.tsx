import { Children, isValidElement, type ReactNode } from 'react'
import TicketPreuve from '../TicketPreuve'
import { ancre } from '../../content/ancres'
import { infosAC, numeroPreuve } from '../../content/liensAC'
import { useProjetFiche } from './contexteFiche'

/** Texte brut d'un contenu React (pour calculer l'ancre d'un titre) */
function texteDe(contenu: ReactNode): string {
  return Children.toArray(contenu)
    .map((c) => (typeof c === 'string' || typeof c === 'number' ? String(c) : isValidElement<{ children?: ReactNode }>(c) ? texteDe(c.props.children) : ''))
    .join('')
}

/**
 * Titre de section numéroté (« 01 », « 03 · AXE 1 ») : le numéro vient d'un compteur CSS
 * (counter-reset sur la fiche), donc il suit l'ordre des sections sans rien saisir.
 */
export function TitreSectionFiche({ id, children }: { id?: string; children: ReactNode }) {
  const texte = texteDe(children)
  const axe = texte.match(/^Axe\s+(\d+)/i)
  return (
    <h2 id={id ?? ancre(texte)} className="mt-20 scroll-mt-10 [counter-increment:section-fiche] first:mt-0 md:mt-[90px]">
      <span
        aria-hidden="true"
        className="meta block text-[12px] text-texte-meta before:content-[counter(section-fiche,decimal-leading-zero)]"
      >
        {axe && ` · Axe ${axe[1]}`}
      </span>
      <span className="mt-4 block font-serif text-[36px] leading-tight font-medium md:text-[40px]">{children}</span>
    </h2>
  )
}

/** Ligne « AC démontré » : code en étiquette Vermillon, intitulé officiel, en quoi le projet le démontre, renvoi à la preuve */
export function AcDemontre({ code = '', preuve, children }: { code?: string; preuve?: number; children?: ReactNode }) {
  const infos = code ? infosAC(code) : undefined
  return (
    <div className="flex flex-col gap-2 border-b border-bordure-filet/20 py-3 sm:flex-row sm:items-start sm:gap-5">
      <span className="w-fit shrink-0 rounded-[2px] bg-fond-accent px-2.5 py-1 font-mono text-[12px] leading-none text-texte-sur-accent">
        {code || 'AC__.__'}
      </span>
      <p className="flex-1 text-[15px] leading-snug">
        {infos?.intitule ?? "[Intitulé officiel de l'AC : il s'affiche tout seul dès que le code est rempli]"}
        {children && <span className="text-texte-secondaire"> — {children}</span>}
      </p>
      {preuve !== undefined && (
        <a href={`#preuve-${numeroPreuve(preuve)}`} className="shrink-0 font-mono text-[12px] text-texte-ornement hover:text-texte-titre-accent">
          <span aria-hidden="true">→ </span>N° {numeroPreuve(preuve)}
          <span className="sr-only"> (voir la preuve)</span>
        </a>
      )}
    </div>
  )
}

/** Tickets de preuve **avec AC** (archives) : numéros 1, 2… du champ « preuves » du MDX */
export function Preuves({ numeros }: { numeros: number[] }) {
  const projet = useProjetFiche()
  return (
    <ul className="mt-5 flex flex-wrap gap-5">
      {numeros.map((n) => {
        const p = projet.preuves[n - 1]
        if (!p) return null
        return (
          <li key={n} id={`preuve-${numeroPreuve(n)}`} className="w-full max-w-[300px] scroll-mt-10">
            <TicketPreuve numero={numeroPreuve(n)} intitule={p.intitule} type={p.type} ac={p.ac || 'AC__.__'} showAc href={p.href || undefined} />
          </li>
        )
      })}
    </ul>
  )
}
