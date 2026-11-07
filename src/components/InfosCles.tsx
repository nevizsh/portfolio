type InfosClesProps = {
  infos: { libelle: string; valeur: string }[]
  className?: string
}

/** Infos clés : libellé mono Turquoise + valeur, séparés par des filets Ocre à 30 %. Lignes vides masquées. */
export default function InfosCles({ infos, className = '' }: InfosClesProps) {
  const lignes = infos.filter((i) => i.valeur)
  if (!lignes.length) return null
  return (
    <dl className={className}>
      {lignes.map((i) => (
        <div key={i.libelle} className="grid grid-cols-[110px_1fr] gap-4 border-t border-bordure-filet/30 py-3 md:grid-cols-[135px_1fr]">
          <dt className="meta pt-0.5 text-[10px] text-texte-meta md:text-[11px]">{i.libelle}</dt>
          <dd className="text-[15px] leading-snug">{i.valeur}</dd>
        </div>
      ))}
    </dl>
  )
}
