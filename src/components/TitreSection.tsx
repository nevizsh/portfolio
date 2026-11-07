type TitreSectionProps = {
  rubrique: string
  titre: string
  id?: string
  centre?: boolean
  /** Niveau du titre (h2 par défaut) */
  niveau?: 'h1' | 'h2'
  className?: string
}

/** Rubrique mono Turquoise au-dessus d'un titre Cormorant (52 px bureau, 36 px mobile). */
export default function TitreSection({ rubrique, titre, id, centre = false, niveau = 'h2', className = '' }: TitreSectionProps) {
  const Titre = niveau
  return (
    <div className={`${centre ? 'text-center' : ''} ${className}`}>
      <p className="meta text-[12px] text-texte-meta md:text-[13px]">{rubrique}</p>
      <Titre id={id} className="mt-3 font-serif text-[36px] leading-[1.05] font-medium md:text-[52px]">
        {titre}
      </Titre>
    </div>
  )
}
