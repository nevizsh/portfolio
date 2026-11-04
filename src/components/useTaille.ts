import { useLayoutEffect, useRef, useState } from 'react'

/**
 * Mesure la taille réelle d'un élément (et la suit quand elle change),
 * pour recalculer les formes SVG des tickets et des cadres.
 */
export function useTaille<T extends HTMLElement>(initiale: { w: number; h: number }) {
  const ref = useRef<T>(null)
  const [taille, setTaille] = useState(initiale)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const mesurer = () => {
      const { width, height } = el.getBoundingClientRect()
      // getBoundingClientRect inclut les rotations CSS : offsetWidth donne la taille avant transformation
      setTaille({ w: el.offsetWidth || width, h: el.offsetHeight || height })
    }
    mesurer()
    const observateur = new ResizeObserver(mesurer)
    observateur.observe(el)
    return () => observateur.disconnect()
  }, [])

  return [ref, taille] as const
}
