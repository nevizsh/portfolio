import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import Affiche from '../../components/Affiche'
import Apparition from '../../components/Apparition'
import CadreArtDeco from '../../components/CadreArtDeco'
import Etoile from '../../components/Etoile'
import Faisceau from '../../components/Faisceau'
import GrandTicket from '../../components/GrandTicket'
import InfosCles from '../../components/InfosCles'
import Ticket from '../../components/Ticket'
import TitreSection from '../../components/TitreSection'
import Visuel from '../../components/Visuel'
import { useOuverture } from '../../components/useOuverture'
import { useTaille } from '../../components/useTaille'
import { projetsALAffiche, projetsVitrine, type ProjetCharge } from '../../content/projets'
import { profil } from '../../content/profil'

const marges = 'mx-auto max-w-[1440px] px-5 md:px-20'

/* ---------------------------------------------------------------------------
 * En-tête : faisceau, fronton dans le cadre Art déco, accroche, deux tickets
 * ------------------------------------------------------------------------- */
function EnTete() {
  const racine = useRef<HTMLElement>(null)
  const { enCours, passer } = useOuverture(racine)

  return (
    <section
      ref={racine}
      aria-labelledby="titre-accueil"
      className="relative isolate overflow-hidden bg-[linear-gradient(to_bottom,transparent_55%,rgb(22_80_90/0.09))] md:min-h-[810px]"
    >
      <Faisceau className="ouv-faisceau -z-10" />

      <div className={`${marges} flex flex-col items-center pt-[120px] pb-20 md:pt-[150px] md:pb-[110px]`}>
        <CadreArtDeco eventail className="w-full max-w-[760px]">
          {/* @container : la taille du prénom suit la largeur du cadre (unité cqi) */}
          <div className="@container flex flex-col items-center px-4 py-10 text-center md:min-h-[320px] md:justify-center md:py-12">
            <p className="ouv-fronton font-mono text-[11px] tracking-[0.34em] text-texte-ornement uppercase md:text-[13px]">Portfolio 2026</p>
            {/* « GENEVIÈVE » mesure environ 6,4 fois la taille de police : à 14 % de la largeur du cadre,
                il occupe près de 90 % de l'intérieur (environ 100 px sur ordinateur, 42 px sur mobile) */}
            <h1
              id="titre-accueil"
              className="ouv-genevieve mt-3 font-display text-[14cqi] leading-none tracking-[0.22em] md:mt-4"
              style={{ textShadow: '0 0 36px rgb(222 196 132 / .35)' }}
            >
              {/* Le décalage compense l'espacement ajouté après la dernière lettre */}
              <span className="mr-[-0.22em]">GENEVIÈVE</span>
            </h1>
            <p aria-hidden="true" className="ouv-fronton mt-6 flex items-center gap-3 md:mt-5">
              <span className="h-px w-[70px] bg-bordure-filet" />
              <Etoile taille={11} className="text-vermillon" />
              <span className="h-px w-[70px] bg-bordure-filet" />
            </p>
          </div>
        </CadreArtDeco>

        <p className="ouv-suite mt-14 max-w-[720px] text-center font-serif text-[28px] leading-tight italic md:mt-[60px] md:text-[32px]">
          {profil.accroche}
        </p>

        <div className="ouv-suite mt-10 flex flex-col items-center gap-5 md:flex-row">
          <Ticket label="Voir les projets" sousTitre={`${projetsVitrine.length} projets`} href="/projets" />
          <Ticket label="Me contacter" sousTitre="Mail · LinkedIn" variant="papier" href="#contact" />
        </div>
      </div>

      {enCours && (
        <button
          type="button"
          onClick={passer}
          className="fixed right-5 bottom-5 z-50 rounded-[2px] border border-bordure-filet bg-fond-base px-4 py-2 font-mono text-[11px] tracking-[0.14em] uppercase md:right-8 md:bottom-8"
        >
          Passer
        </button>
      )}
    </section>
  )
}

/* ---------------------------------------------------------------------------
 * Présentation : portrait encadré, qui je suis, infos clés, profil et vidéo
 * ------------------------------------------------------------------------- */
function VignetteVideo() {
  return (
    <Link
      to="/profil#video"
      className="group flex items-center gap-4 rounded-[2px] border border-bordure-filet p-2.5 pr-5 transition-colors duration-survol ease-salle hover:bg-papier/4"
    >
      <span aria-hidden="true" className="flex h-16 w-28 items-center justify-center bg-fond-surface">
        <span className="flex size-8 items-center justify-center rounded-full bg-fond-accent">
          <svg viewBox="0 0 24 24" className="ml-0.5 size-3.5 fill-encre">
            <path d="M6 3.5v17l14-8.5z" />
          </svg>
        </span>
      </span>
      <span className="flex flex-col gap-1">
        <span className="text-[15px] font-semibold">Vidéo de présentation</span>
        <span className="font-mono text-[10px] tracking-[0.1em] text-texte-meta uppercase">1 min · Sous-titrée</span>
      </span>
    </Link>
  )
}

function Presentation() {
  return (
    <Apparition aria-labelledby="titre-presentation" className={`${marges} py-16 md:py-[100px]`}>
      <div className="grid gap-10 md:grid-cols-[380px_1fr] md:gap-20">
        {/* En mobile, le titre passe avant le portrait (capture mobile) */}
        <TitreSection rubrique="Présentation" titre="Qui je suis" className="md:hidden" />

        <CadreArtDeco coupe={16} className="mx-auto aspect-[380/460] w-full max-w-[260px] md:max-w-none">
          <div className="absolute inset-0 p-[18px]">
            <Visuel libelle="Portrait" src={profil.portrait} className="size-full" />
          </div>
        </CadreArtDeco>

        <div className="flex flex-col">
          <TitreSection rubrique="Présentation" titre="Qui je suis" id="titre-presentation" className="hidden md:block" />
          <p className="max-w-[600px] text-[16px] leading-relaxed text-texte-secondaire md:mt-8 md:text-[18px]">{profil.presentation}</p>
          <InfosCles infos={profil.infosCles} className="mt-8 border-b border-bordure-filet/30" />
          <div className="mt-8 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
            <Ticket label="Profil complet" sousTitre="Parcours · CV PDF" variant="papier" href="/profil" />
            <VignetteVideo />
          </div>
        </div>
      </div>
    </Apparition>
  )
}

/* ---------------------------------------------------------------------------
 * À l'affiche : mur d'affiches (bureau) ou défilement horizontal (mobile)
 * ------------------------------------------------------------------------- */

// Décalage vertical de chaque affiche dans sa rangée, pour l'effet « mur »
const DECALAGES = [30, 0, 40, 0, 0]

const propsAffiche = (p: ProjetCharge) => ({ ...p, href: `/projets/${p.slug}` })

function MurAffiches() {
  const [ref, { w }] = useTaille<HTMLDivElement>({ w: 1280, h: 0 })
  const ecart = 60
  const largeur = Math.min(360, Math.floor((w - 2 * ecart) / 3))
  // Rangées de 3 puis de 2, comme sur la maquette
  const rangees: ProjetCharge[][] = []
  for (let i = 0; i < projetsALAffiche.length; ) {
    const n = rangees.length % 2 === 0 ? 3 : 2
    rangees.push(projetsALAffiche.slice(i, i + n))
    i += n
  }

  return (
    <div ref={ref} className="mt-14 hidden flex-col gap-10 lg:flex">
      {rangees.map((rangee, r) => (
        <ul key={r} className="flex justify-center" style={{ gap: ecart }}>
          {rangee.map((p, i) => (
            <li key={p.slug} style={{ marginTop: DECALAGES[(r * 3 + i) % DECALAGES.length] }}>
              <Affiche {...propsAffiche(p)} largeur={largeur} />
            </li>
          ))}
        </ul>
      ))}
    </div>
  )
}

function CarrouselAffiches() {
  const piste = useRef<HTMLUListElement>(null)
  const [actif, setActif] = useState(0)

  // Indicateur : l'affiche la plus visible dans la piste
  useEffect(() => {
    const el = piste.current
    if (!el) return
    const observateur = new IntersectionObserver(
      (entrees) => {
        for (const e of entrees) if (e.isIntersecting) setActif(Number((e.target as HTMLElement).dataset.index))
      },
      { root: el, threshold: 0.6 },
    )
    el.querySelectorAll('li').forEach((li) => observateur.observe(li))
    return () => observateur.disconnect()
  }, [])

  return (
    <div className="mt-10 lg:hidden">
      {/* Défilement horizontal avec accroche magnétique (scroll-snap) */}
      <ul
        ref={piste}
        aria-label="Projets à l'affiche"
        className="-mx-5 flex snap-x snap-mandatory scroll-px-5 gap-6 overflow-x-auto px-5 pt-4 pb-10 [scrollbar-width:none]"
      >
        {projetsALAffiche.map((p, i) => (
          <li key={p.slug} data-index={i} className="shrink-0 snap-start">
            <Affiche {...propsAffiche(p)} largeur={300} />
          </li>
        ))}
      </ul>
      <div aria-hidden="true" className="flex items-center gap-2.5">
        {projetsALAffiche.map((p, i) => (
          <span
            key={p.slug}
            className={`h-2 rounded-full transition-all duration-survol ease-salle ${i === actif ? 'w-[18px] bg-fond-accent' : 'w-2 bg-bordure-filet/80'}`}
          />
        ))}
      </div>
    </div>
  )
}

function ALAffiche() {
  if (!projetsALAffiche.length) return null
  return (
    <Apparition aria-labelledby="titre-affiche" className={`${marges} py-16 md:py-[100px]`}>
      <div className="flex items-end justify-between gap-6">
        <TitreSection rubrique="À l'affiche" titre="Projets" id="titre-affiche" />
        <Link to="/projets" className="mb-3 hidden font-semibold text-texte-titre-accent hover:underline lg:block">
          Tous les projets →
        </Link>
      </div>
      <MurAffiches />
      <CarrouselAffiches />
      <Link to="/projets" className="mt-8 inline-block font-semibold text-texte-titre-accent hover:underline lg:hidden">
        Tous les projets →
      </Link>
    </Apparition>
  )
}

/* ---------------------------------------------------------------------------
 * Contact : grand ticket
 * ------------------------------------------------------------------------- */
function Contact() {
  return (
    <Apparition id="contact" aria-labelledby="titre-contact" className={`${marges} scroll-mt-10 pt-16 pb-24 md:pt-[100px] md:pb-[120px]`}>
      <TitreSection rubrique="Contact" titre="Me contacter" id="titre-contact" centre />
      <GrandTicket className="mt-12" />
    </Apparition>
  )
}

export default function Accueil() {
  return (
    <>
      <title>nevizsh · Portfolio 2026</title>
      <EnTete />
      <Presentation />
      <ALAffiche />
      <Contact />
    </>
  )
}
