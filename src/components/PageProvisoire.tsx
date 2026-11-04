import type { ReactNode } from 'react'

type PageProvisoireProps = {
  rubrique: string
  titre: string
  /** Titre de l'onglet */
  titreOnglet?: string
  children?: ReactNode
}

/** En-tête provisoire des pages en attendant leur construction (étapes vitrine et archives). */
export default function PageProvisoire({ rubrique, titre, titreOnglet, children }: PageProvisoireProps) {
  return (
    <div className="mx-auto max-w-[1440px] px-5 py-20 md:px-20 md:py-[100px]">
      <title>{`${titreOnglet ?? titre} · nevizsh`}</title>
      <p className="meta mb-5 text-[12px] text-texte-meta md:text-[13px]">{rubrique}</p>
      <h1 className="font-serif text-[64px] leading-[0.95] font-medium md:text-[96px]">{titre}</h1>
      <p className="mt-6 max-w-[720px] text-texte-secondaire">[Page à construire]</p>
      {children}
    </div>
  )
}
