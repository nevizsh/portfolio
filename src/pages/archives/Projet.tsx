import { Suspense, useEffect, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router'
import InfosCles from '../../components/InfosCles'
import { FilAriane } from '../../components/archives/EnTeteArchives'
import { TitreSectionFiche } from '../../components/archives/ComposantsFiche'
import { composantsFiche } from '../../components/archives/mdxFiche'
import { ContexteFiche } from '../../components/archives/contexteFiche'
import { CodeAC } from '../../components/archives/Registre'
import { classesRegistre as c } from '../../components/archives/classesRegistre'
import { ancre } from '../../content/ancres'
import { infosAC } from '../../content/liensAC'
import { trouverProjet, type ProjetCharge } from '../../content/projets'
import { typesProjet } from '../../data/domaines'
import IntrouvableArchives from './Introuvable'

type Entree = { id: string; libelle: string }

/**
 * Suivi de lecture : la section en cours est la dernière dont le titre a passé le quart haut de l'écran.
 * IntersectionObserver prévient quand un titre franchit cette ligne, ou quand le pied de page apparaît
 * (en bas de page, la dernière section ne peut pas remonter jusqu'à la ligne : on la choisit alors).
 * Monté après le corps de la fiche (même Suspense) : les titres existent déjà dans la page.
 */
function SuiviLecture({ ids, onChange }: { ids: string[]; onChange: (id: string) => void }) {
  const { hash } = useLocation()
  const cle = ids.join(' ')

  useEffect(() => {
    const titres = cle.split(' ').map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el)
    const recalculer = () => {
      const enBas = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4
      if (enBas) return onChange(titres.at(-1)?.id ?? '')
      const ligne = window.innerHeight * 0.25
      const passes = titres.filter((t) => t.getBoundingClientRect().top <= ligne)
      onChange((passes.at(-1) ?? titres[0])?.id ?? '')
    }
    const observateur = new IntersectionObserver(recalculer, { rootMargin: '0px 0px -75% 0px' })
    titres.forEach((t) => observateur.observe(t))
    // Le pied de page entièrement visible = bas de la page atteint
    const piedDePage = document.querySelector('footer')
    const observateurBas = new IntersectionObserver(recalculer, { threshold: [0, 1] })
    if (piedDePage) observateurBas.observe(piedDePage)
    recalculer()
    return () => {
      observateur.disconnect()
      observateurBas.disconnect()
    }
  }, [cle, onChange])

  // Arrivée depuis la matrice (#preuve-02) : la fiche est chargée à la demande, on défile une fois qu'elle est là
  useEffect(() => {
    if (hash) document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView()
  }, [hash])

  return null
}

function Sommaire({ entrees, active }: { entrees: Entree[]; active: string }) {
  return (
    <ol className="mt-4 flex flex-col gap-2.5 text-[15px]">
      {entrees.map((e) => (
        <li key={e.id}>
          <a
            href={`#${e.id}`}
            aria-current={e.id === active ? 'location' : undefined}
            className={`transition-colors duration-survol ease-salle hover:text-texte-titre-accent ${e.id === active ? 'text-texte-titre-accent' : ''}`}
          >
            {e.libelle}
          </a>
        </li>
      ))}
    </ol>
  )
}

function Identite({ projet }: { projet: ProjetCharge }) {
  return (
    <InfosCles
      className="mt-8 border-b border-bordure-filet/30"
      infos={[
        { libelle: 'Type', valeur: projet.type ? typesProjet[projet.type] : '[SAÉ, alternance, TP / ressource, personnel]' },
        { libelle: 'Dans la vitrine', valeur: projet.vitrine ? 'Oui' : 'Non' },
        { libelle: 'Période', valeur: projet.periode },
        { libelle: 'Cadre', valeur: projet.cadre },
        { libelle: 'Équipe', valeur: projet.equipe },
        { libelle: 'Mon rôle', valeur: projet.role },
        { libelle: 'Outils & technos', valeur: projet.technos.join(' · ') },
        { libelle: 'Livrables', valeur: projet.livrables },
        { libelle: 'Statut', valeur: projet.statut },
      ]}
    />
  )
}

function RecapAC({ projet }: { projet: ProjetCharge }) {
  return (
    <table className={`${c.table} mt-8`}>
      <caption className="sr-only">AC démontrés par ce projet : code, compétence et intitulé officiel</caption>
      <thead>
        <tr>
          <th scope="col" className={`${c.th} w-[110px]`}>
            Code
          </th>
          <th scope="col" className={`${c.th} hidden w-[180px] sm:table-cell`}>
            Compétence
          </th>
          <th scope="col" className={c.th}>
            Intitulé
          </th>
        </tr>
      </thead>
      <tbody>
        {projet.ac.length ? (
          projet.ac.map((code) => {
            const infos = infosAC(code)
            return (
              <tr key={code} className={c.tr}>
                <td className={c.td}>
                  <CodeAC code={code} />
                </td>
                <td className={`${c.td} hidden text-[15px] sm:table-cell`}>{infos?.competence.nom}</td>
                <td className={`${c.td} text-[15px] leading-snug`}>{infos?.intitule}</td>
              </tr>
            )
          })
        ) : (
          <tr className="border-b border-bordure-filet/20">
            <td className={c.td}>
              <CodeAC />
            </td>
            <td className={`${c.td} hidden text-[15px] sm:table-cell`}>[Compétence]</td>
            <td className={`${c.td} text-[15px] text-texte-secondaire`}>[Aucun AC pour l'instant : à remplir dans le champ « ac » du MDX]</td>
          </tr>
        )}
      </tbody>
    </table>
  )
}

export default function ProjetArchives() {
  const { slug } = useParams()
  const projet = trouverProjet(slug)
  const [active, setActive] = useState('')
  if (!projet) return <IntrouvableArchives />

  const { Fiche } = projet
  const entrees: Entree[] = [
    ...(projet.pitch ? [{ id: 'pitch', libelle: projet.vitrine ? 'Pitch vitrine' : 'Pitch' }] : []),
    { id: 'identite', libelle: "Fiche d'identité" },
    ...projet.sections.map((s) => ({ id: ancre(s), libelle: s })),
    { id: 'recap-ac', libelle: 'Récapitulatif des AC' },
  ]

  return (
    <ContexteFiche.Provider value={projet}>
      <title>{`${projet.titre} · Fiche réflexive · Archives · nevizsh`}</title>
      <div className="mx-auto grid max-w-[1440px] gap-10 px-5 pt-16 pb-24 md:px-20 md:pt-[80px] md:pb-[120px] lg:grid-cols-[240px_1fr] lg:gap-20">
        {/* ---- Sommaire collant (bureau) ---- */}
        <nav aria-labelledby="titre-sommaire" className="hidden lg:block">
          <div className="sticky top-10 border-l border-bordure-filet/35 py-2 pl-5">
            <p id="titre-sommaire" className="meta text-[11px] text-texte-meta">
              Sommaire
            </p>
            <Sommaire entrees={entrees} active={active} />
          </div>
        </nav>

        <article className="min-w-0 [counter-reset:section-fiche]">
          <header>
            <FilAriane
              etapes={[
                { libelle: 'Archives', to: '/archives' },
                { libelle: 'Projets', to: '/archives/projets' },
                { libelle: projet.titre },
              ]}
            />
            <h1 className="mt-5 font-serif text-[48px] leading-[0.95] font-medium md:text-[72px]">{projet.titre}</h1>
            {/* Sens autorisé : archives → vitrine (jamais l'inverse) */}
            {projet.vitrine && (
              <p className="mt-5 flex flex-wrap items-baseline gap-x-3">
                <Link to={`/projets/${projet.slug}`} className="group font-semibold text-texte-titre-accent">
                  Voir la version vitrine{' '}
                  <span aria-hidden="true" className="inline-block transition-transform duration-survol ease-salle group-hover:translate-x-1">
                    →
                  </span>
                </Link>
                <span className="font-mono text-[12px] text-texte-secondaire">/projets/{projet.slug}</span>
              </p>
            )}
          </header>

          {/* Sommaire repliable (mobile et tablette) */}
          <details className="mt-8 border-l border-bordure-filet/35 pl-5 lg:hidden">
            <summary className="meta cursor-pointer text-[11px] text-texte-meta">Sommaire</summary>
            <Sommaire entrees={entrees} active={active} />
          </details>

          {projet.pitch && (
            <section id="pitch" aria-label="Pitch" className="mt-12 scroll-mt-10 border-l-2 border-texte-titre-accent bg-papier/3 px-6 py-6 md:mt-[60px] md:px-[28px]">
              <p className="meta text-[11px] text-texte-meta">{projet.vitrine ? 'Pitch vitrine' : 'Pitch'}</p>
              <p className="mt-3 font-serif text-[22px] leading-snug italic md:text-[24px]">{projet.pitch}</p>
            </section>
          )}

          <section className="mt-16 md:mt-[70px]">
            <TitreSectionFiche id="identite">Fiche d'identité</TitreSectionFiche>
            <Identite projet={projet} />
          </section>

          {/* Corps MDX : contexte, axes (AC démontrés + preuves), bilan transversal */}
          <Suspense fallback={<p className="mt-20 text-texte-secondaire">Chargement de la fiche…</p>}>
            <div className="mt-20 md:mt-[90px]">
              <Fiche components={composantsFiche} />
            </div>

            <section className="mt-20 md:mt-[90px]">
              <TitreSectionFiche id="recap-ac">Récapitulatif des AC</TitreSectionFiche>
              <RecapAC projet={projet} />
            </section>

            <SuiviLecture ids={entrees.map((e) => e.id)} onChange={setActive} />
          </Suspense>
        </article>
      </div>
    </ContexteFiche.Provider>
  )
}
