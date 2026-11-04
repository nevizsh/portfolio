type EtoileProps = {
  /** Taille en px (largeur = hauteur) */
  taille?: number
  className?: string
}

/** Étoile à quatre branches de la passation (talons, séparateurs, logo). Couleur : currentColor. */
export default function Etoile({ taille = 14, className = '' }: EtoileProps) {
  return (
    <svg
      viewBox="0 0 14 14"
      width={taille}
      height={taille}
      className={`shrink-0 ${className}`}
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M7 0L8.4 5.6L14 7L8.4 8.4L7 14L5.6 8.4L0 7L5.6 5.6L7 0Z" />
    </svg>
  )
}
