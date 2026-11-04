import Etoile from './Etoile'

/** Étiquette « À l'affiche » posée à cheval sur le haut d'une affiche (page Projets uniquement). */
export default function RubanAffiche({ className = '' }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-[2px] bg-accent-reflet py-[5px] pr-3 pl-2.5 text-texte-sur-piece shadow-[0_4px_8px_rgb(0_0_0/0.35)] ${className}`}
    >
      <Etoile taille={10} className="text-vermillon-sombre" />
      <span className="font-mono text-[10px] leading-none tracking-[0.12em] uppercase">À l'affiche</span>
    </span>
  )
}
