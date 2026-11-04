import { useEffect } from 'react'
import { useLocation } from 'react-router'

/**
 * À chaque changement de page : retour en haut,
 * ou défilement jusqu'à l'ancre si l'adresse en contient une (/profil#contact).
 */
export default function Defilement() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const cible = document.getElementById(decodeURIComponent(hash.slice(1)))
      if (cible) {
        cible.scrollIntoView()
        return
      }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])

  return null
}
