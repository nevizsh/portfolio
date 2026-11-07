import type { ReactNode } from 'react'
import Eventail from './Eventail'
import Faisceau from './Faisceau'

type EnTetePageProps = {
  rubrique: string
  titre: string
  phrase?: string
  children?: ReactNode
}

/** En-tête centré des pages vitrine (Projets, Mentions légales) : faisceau, éventail, rubrique, titre, phrase. */
export default function EnTetePage({ rubrique, titre, phrase, children }: EnTetePageProps) {
  return (
    <header className="relative isolate overflow-hidden">
      <Faisceau className="-z-10" />
      <div className="mx-auto flex max-w-[1440px] flex-col items-center px-5 pt-16 pb-12 text-center md:px-20 md:pt-[100px] md:pb-16">
        <Eventail />
        <p className="meta mt-3 text-[12px] text-texte-meta md:text-[13px]">{rubrique}</p>
        <h1 className="mt-4 font-serif text-[64px] leading-[0.95] font-medium md:text-[104px]">{titre}</h1>
        {phrase && <p className="mt-6 max-w-[640px] text-[16px] text-texte-secondaire md:text-[18px]">{phrase}</p>}
        {children}
      </div>
    </header>
  )
}
