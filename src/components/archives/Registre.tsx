import type { ReactNode } from 'react'

/** Code AC en mono Vermillon (« AC24.01 »), ou un emplacement « AC__.__ » s'il est vide */
export function CodeAC({ code, className = '' }: { code?: string; className?: string }) {
  return <span className={`font-mono text-[13px] whitespace-nowrap text-texte-titre-accent ${className}`}>{code || 'AC__.__'}</span>
}

/** Petite étiquette à contour Ocre (compétences, statut) */
export function Pastille({ children, accent = false }: { children: ReactNode; accent?: boolean }) {
  return (
    <span
      className={
        'inline-block rounded-[2px] border px-2 py-[3px] font-mono text-[11px] leading-none tracking-[0.06em] whitespace-nowrap ' +
        (accent ? 'border-texte-titre-accent text-texte-titre-accent' : 'border-bordure-filet/50 text-texte-principal')
      }
    >
      {children}
    </span>
  )
}

/** Flèche de fin de ligne : passe en Vermillon au survol de la ligne */
export function FlecheLigne() {
  return (
    <span
      aria-hidden="true"
      className="inline-block text-[18px] transition-[color,translate] duration-survol ease-salle group-hover:translate-x-1 group-hover:text-texte-titre-accent"
    >
      →
    </span>
  )
}
