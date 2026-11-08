import { useLayoutEffect, useRef, useState, type RefObject } from 'react'
import gsap from 'gsap'

const CLE = 'nevizsh-ouverture-vue'

/**
 * Ouverture de l'accueil (une fois par session, environ 2 s ; 1,2 s en mobile) :
 *   0 s          noir complet
 *   0,2 → 0,9 s  le faisceau s'allume en fondu, avec un léger scintillement
 *   0,8 → 1,2 s  « PORTFOLIO 2026 » apparaît en fondu
 *   0,9 → 1,5 s  « Geneviève » apparaît projeté (battements de lumière)
 *   1,5 → 2,0 s  l'accroche, les tickets et la navigation apparaissent en fondu
 *
 * Le contenu est dans le DOM dès le départ : seule son opacité est animée.
 * Mouvement réduit : pas de séquence, tout est affiché.
 * Les éléments animés sont repérés par des classes .ouv-*.
 */
export function useOuverture(racine: RefObject<HTMLElement | null>) {
  const [enCours, setEnCours] = useState(false)
  const timeline = useRef<gsap.core.Timeline | null>(null)

  useLayoutEffect(() => {
    if (sessionStorage.getItem(CLE)) return
    const mm = gsap.matchMedia()

    mm.add({ mouvement: '(prefers-reduced-motion: no-preference)', mobile: '(max-width: 767px)' }, (contexte) => {
      const { mouvement, mobile } = contexte.conditions as { mouvement: boolean; mobile: boolean }
      // Déjà vue (la fonction est rappelée si l'écran change de taille) ou mouvement réduit
      if (!mouvement || sessionStorage.getItem(CLE)) return

      const nav = document.querySelector('[data-ouverture-nav]')
      const q = gsap.utils.selector(racine)

      const tl = gsap.timeline({
        defaults: { ease: 'power1.out' },
        onComplete: () => {
          sessionStorage.setItem(CLE, '1')
          setEnCours(false)
        },
      })

      tl.set([q('.ouv-faisceau'), q('.ouv-genevieve'), q('.ouv-fronton'), q('.ouv-suite'), nav], { autoAlpha: 0 })
        // Le faisceau s'allume, avec un léger scintillement
        .to(q('.ouv-faisceau'), { keyframes: { autoAlpha: [0, 0.6, 0.35, 0.85, 0.7, 1] }, duration: 0.7 }, 0.2)
        .to(q('.ouv-fronton'), { autoAlpha: 1, duration: 0.4 }, 0.8)
        // « Geneviève » projeté : deux ou trois battements de lumière
        .to(q('.ouv-genevieve'), { keyframes: { autoAlpha: [0, 0.7, 0.3, 0.9, 0.55, 1] }, duration: 0.6, ease: 'none' }, 0.9)
        // Puis l'accroche, les tickets et la navigation
        .to([q('.ouv-suite'), nav], { autoAlpha: 1, duration: 0.4, stagger: 0.1 }, 1.5)

      // Mobile : même séquence, plus courte (≈ 1,2 s)
      if (mobile) tl.timeScale(2.0 / 1.2)

      timeline.current = tl
      setEnCours(true)

      return () => {
        timeline.current = null
        setEnCours(false)
      }
    })

    return () => mm.revert()
  }, [racine])

  /** Bouton « Passer » : saute directement à la fin */
  const passer = () => timeline.current?.progress(1)

  return { enCours, passer }
}
