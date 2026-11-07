import { useLayoutEffect, useRef } from 'react'
import { useSearchParams } from 'react-router'
import gsap from 'gsap'
import { Flip } from 'gsap/Flip'
import Affiche from '../../components/Affiche'
import EnTetePage from '../../components/EnTetePage'
import Filtres from '../../components/Filtres'
import { projetsVitrine } from '../../content/projets'
import { domaines, type Domaine } from '../../data/domaines'

gsap.registerPlugin(Flip)

// Filtres : « Tout » + les domaines réellement présents dans les MDX, avec leur nombre de projets
const domainesPresents = (Object.keys(domaines) as Domaine[]).filter((d) => projetsVitrine.some((p) => p.domaines.includes(d)))
const options = [
  { valeur: 'tout', libelle: 'Tout', compteur: projetsVitrine.length },
  ...domainesPresents.map((d) => ({
    valeur: d,
    libelle: domaines[d],
    compteur: projetsVitrine.filter((p) => p.domaines.includes(d)).length,
  })),
]

export default function Projets() {
  // Le filtre vit dans l'adresse (?domaine=video) : on peut partager ou recharger la page filtrée
  const [parametres, setParametres] = useSearchParams()
  const demande = parametres.get('domaine') ?? 'tout'
  const actif = options.some((o) => o.valeur === demande) ? demande : 'tout'

  const grille = useRef<HTMLUListElement>(null)
  const etat = useRef<Flip.FlipState | null>(null)

  const visibles = projetsVitrine.filter((p) => actif === 'tout' || p.domaines.includes(actif as Domaine))

  const choisir = (valeur: string) => {
    // Mémorise la position des affiches avant le changement (technique FLIP)
    if (grille.current && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
      etat.current = Flip.getState(grille.current.querySelectorAll('li'))
    }
    setParametres(valeur === 'tout' ? {} : { domaine: valeur }, { replace: true, preventScrollReset: true })
  }

  // Après le rendu : les affiches restantes glissent à leur nouvelle place, les autres s'éteignent en fondu
  useLayoutEffect(() => {
    if (!etat.current) return
    Flip.from(etat.current, {
      duration: 0.6,
      ease: 'power2.inOut',
      absolute: true,
      onEnter: (el) => gsap.fromTo(el, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5 }),
      onLeave: (el) => gsap.to(el, { autoAlpha: 0, duration: 0.4 }),
    })
    etat.current = null
  }, [actif])

  return (
    <>
      <title>Projets · nevizsh</title>
      <EnTetePage rubrique="Au programme" titre="Projets" phrase="[Une phrase : ce que le visiteur va trouver ici.]" />

      <div className="mx-auto max-w-[1440px] px-5 pb-24 md:px-20 md:pb-[120px]">
        <div className="flex flex-col items-center gap-5">
          {/* Mobile : puces en défilement horizontal */}
          <Filtres
            legende="Filtrer les projets par domaine"
            options={options}
            actif={actif}
            onChange={choisir}
            className="-mx-5 max-w-[calc(100%+2.5rem)] overflow-x-auto px-5 pb-1 [scrollbar-width:none] md:mx-0 md:max-w-none md:flex-wrap md:justify-center md:overflow-visible md:px-0"
          />
          <p aria-live="polite" className="meta text-[11px] text-texte-secondaire">
            {visibles.length} projet{visibles.length > 1 ? 's' : ''} · la sélection en premier
          </p>
        </div>

        <ul
          ref={grille}
          className="mt-14 grid justify-center gap-x-10 gap-y-20 [grid-template-columns:repeat(auto-fill,280px)] md:mt-[70px]"
        >
          {projetsVitrine.map((p) => (
            <li key={p.slug} data-flip-id={p.slug} hidden={!visibles.includes(p)}>
              <Affiche {...p} href={`/projets/${p.slug}`} largeur={280} ruban={p.selection} />
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
