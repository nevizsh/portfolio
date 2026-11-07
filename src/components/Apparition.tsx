import { useEffect, useRef, type ReactNode } from 'react'

type ApparitionProps = {
  children: ReactNode
  /** Balise rendue (section par défaut) */
  as?: 'section' | 'div'
  id?: string
  className?: string
  'aria-labelledby'?: string
}

/**
 * Apparition au défilement : montée de 16 px + fondu, une seule fois.
 * Le masquage initial est en CSS (classe .apparition, index.css) et seulement si
 * l'utilisateur n'a pas demandé de réduire les animations : sinon tout est visible d'emblée.
 */
export default function Apparition({ children, as: Balise = 'section', className = '', ...props }: ApparitionProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observateur = new IntersectionObserver(
      ([entree]) => {
        if (entree.isIntersecting) {
          el.classList.add('est-visible')
          observateur.disconnect()
        }
      },
      { rootMargin: '0px 0px -10% 0px' },
    )
    observateur.observe(el)
    return () => observateur.disconnect()
  }, [])

  const classes = `apparition ${className}`
  return Balise === 'section' ? (
    <section ref={ref} className={classes} {...props}>
      {children}
    </section>
  ) : (
    <div ref={ref} className={classes} {...props}>
      {children}
    </div>
  )
}
