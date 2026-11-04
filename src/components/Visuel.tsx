type VisuelProps = {
  /** Texte de l'emplacement tant qu'il n'y a pas d'image */
  libelle?: string
  /** Image : remplace l'emplacement */
  src?: string
  alt?: string
  /** Taille et proportions, par ex. "aspect-video w-full" */
  className?: string
}

/** Emplacement d'image : fond Canard, pointillés Ocre en retrait, libellé mono centré. */
export default function Visuel({ libelle = 'Visuel', src, alt = '', className = 'aspect-[3/2] w-full' }: VisuelProps) {
  if (src) return <img src={src} alt={alt} className={`object-cover ${className}`} />

  return (
    <div role="img" aria-label={`Emplacement : ${libelle}`} className={`relative bg-fond-surface ${className}`}>
      <div aria-hidden="true" className="absolute inset-2 border border-dashed border-bordure-filet/70" />
      <span aria-hidden="true" className="meta absolute inset-0 flex items-center justify-center px-6 text-center text-[10px]">
        {libelle}
      </span>
    </div>
  )
}
