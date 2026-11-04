import Etoile from './Etoile'
import Ticket from './Ticket'
import { formeTicket } from './formes'
import { useTaille } from './useTaille'
import { contact } from '../content/contact'

type GrandTicketProps = {
  appel?: string
  className?: string
}

const lignes = [
  { nom: 'Mail', ...contact.mail },
  { nom: 'LinkedIn', ...contact.linkedin },
  { nom: 'GitHub', ...contact.github },
]

function Valeur({ libelle, url }: { libelle: string; url: string }) {
  return url ? <a href={url} className="hover:text-texte-sur-piece-accent">{libelle}</a> : <>{libelle}</>
}

/**
 * Grand ticket de contact.
 * Bureau : horizontal 960 × 240 (talon de 220 px à gauche).
 * Mobile : vertical, talon en haut, bouton « Écrire un mail » sous le ticket (capture mobile).
 */
export default function GrandTicket({ appel = '[Appel au contact en une phrase]', className = '' }: GrandTicketProps) {
  const [refH, tH] = useTaille<HTMLDivElement>({ w: 960, h: 240 })
  const [refV, tV] = useTaille<HTMLDivElement>({ w: 350, h: 300 })
  // Tant que l'adresse n'est pas renseignée, « mailto: » ouvre un mail vide
  const mail = contact.mail.url || 'mailto:'
  const ticketMail = <Ticket label="Écrire un mail" sousTitre={contact.mail.libelle} href={mail} />

  return (
    <div className={className}>
      {/* ---- Bureau ---- */}
      <div ref={refH} className="relative isolate mx-auto hidden min-h-[240px] w-full max-w-[960px] text-texte-sur-piece md:flex">
        <svg aria-hidden="true" className="absolute inset-0 -z-10 h-full w-full overflow-visible drop-shadow-[0_16px_36px_rgb(0_0_0/0.5)]" viewBox={`0 0 ${tH.w} ${tH.h}`} preserveAspectRatio="none">
          <path d={formeTicket(tH.w, tH.h, { coin: 10, encoche: 22 })} className="fill-fond-piece" />
        </svg>

        <div className="flex w-[220px] shrink-0 flex-col items-center justify-center gap-2 border-r border-dashed border-encre/50 my-6">
          <Etoile taille={22} className="text-vermillon" />
          <span className="font-mono text-[11px] tracking-[0.14em] uppercase">Portfolio</span>
          <span className="font-serif text-[40px] leading-none font-medium">2026</span>
        </div>

        <div className="relative flex flex-1 flex-col justify-center py-8 pr-14 pl-6">
          <p className="font-serif text-[36px] leading-tight font-medium">{appel}</p>
          <dl className="mt-3 flex flex-col gap-1.5">
            {lignes.map((l) => (
              <div key={l.nom} className="flex items-baseline gap-6">
                <dt className="w-[60px] font-mono text-[11px] tracking-[0.12em] uppercase">{l.nom}</dt>
                <dd className="text-[15px]">
                  <Valeur libelle={l.libelle} url={l.url} />
                </dd>
              </div>
            ))}
          </dl>
          <div className="absolute right-6 bottom-6">{ticketMail}</div>
        </div>
      </div>

      {/* ---- Mobile ---- */}
      <div className="flex flex-col items-center gap-8 md:hidden">
        <div ref={refV} className="relative isolate w-full max-w-[350px] text-texte-sur-piece">
          <svg aria-hidden="true" className="absolute inset-0 -z-10 h-full w-full overflow-visible drop-shadow-[0_16px_36px_rgb(0_0_0/0.5)]" viewBox={`0 0 ${tV.w} ${tV.h}`} preserveAspectRatio="none">
            <path d={formeTicket(tV.w, tV.h, { coin: 10, encoche: 16, yEncoche: 64 })} className="fill-fond-piece" />
          </svg>
          <div className="flex h-16 items-center gap-3 px-6">
            <Etoile taille={18} className="text-vermillon" />
            <span className="font-mono text-[11px] tracking-[0.14em] uppercase">Portfolio 2026</span>
          </div>
          <div aria-hidden="true" className="mx-6 border-t border-dashed border-encre/50" />
          <div className="px-6 pt-5 pb-7">
            <p className="font-serif text-[30px] leading-tight font-medium">{appel}</p>
            <ul className="mt-4 flex flex-col gap-2 text-[15px]">
              <li><Valeur {...contact.mail} /></li>
              <li>LinkedIn · {contact.linkedin.url ? <a href={contact.linkedin.url}>[URL]</a> : '[URL]'}</li>
              <li><Valeur {...contact.github} /></li>
            </ul>
          </div>
        </div>
        {ticketMail}
      </div>
    </div>
  )
}
