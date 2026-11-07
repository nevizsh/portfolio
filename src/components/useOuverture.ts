import { useLayoutEffect, useRef, useState, type RefObject } from 'react'
import gsap from 'gsap'

const CLE = 'nevizsh-ouverture-vue'

/**
 * Ouverture de l'accueil (une fois par session, environ 2 s ; 1,2 s en mobile) :
 *   0 s          noir complet
 *   0,2 → 0,9 s  le faisceau s'allume en fondu, avec un léger scintillement
 *   0,9 → 1,7 s  les filets du cadre se tracent, « NEVII » apparaît projeté (battements de lumière)
 *   1,7 → 2,1 s  l'accroche, les tickets et la navigation apparaissent en fondu
 *
 * Le contenu est dans le DOM dès le départ : seule son opacité est animée.
 * Mouvement réduit : pas de séquence, tout est affiché.
 * Les éléments animés sont repérés par des classes .ouv-* (et .filet-cadre, .eventail).
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

      tl.set([q('.ouv-faisceau'), q('.eventail'), q('.ouv-nevii'), q('.ouv-fronton'), q('.ouv-suite'), nav], { autoAlpha: 0 })
        .set(q('.filet-cadre'), { strokeDasharray: 1, strokeDashoffset: 1 })
        // Le faisceau s'allume, avec un léger scintillement
        .to(q('.ouv-faisceau'), { keyframes: { autoAlpha: [0, 0.6, 0.35, 0.85, 0.7, 1] }, duration: 0.7 }, 0.2)
        // Le cadre se trace
        .to(q('.filet-cadre'), { strokeDashoffset: 0, duration: 0.6, ease: 'power2.inOut', stagger: 0.08 }, 0.9)
        .to(q('.eventail'), { autoAlpha: 0.55, duration: 0.4 }, 1.1)
        // « NEVII » projeté : deux ou trois battements de lumière
        .to(q('.ouv-nevii'), { keyframes: { autoAlpha: [0, 0.7, 0.3, 0.9, 0.55, 1] }, duration: 0.6, ease: 'none' }, 1.1)
        .to(q('.ouv-fronton'), { autoAlpha: 1, duration: 0.4 }, 1.3)
        // Puis l'accroche, les tickets et la navigation
        .to([q('.ouv-suite'), nav], { autoAlpha: 1, duration: 0.4, stagger: 0.1 }, 1.7)

      // Mobile : même séquence, plus courte (≈ 1,2 s)
      if (mobile) tl.timeScale(2.1 / 1.2)

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
