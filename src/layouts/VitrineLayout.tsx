import { useEffect, useRef } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router'
import Etoile from '../components/Etoile'
import Defilement from '../components/Defilement'
import LienEvitement from '../components/LienEvitement'
import { contact } from '../content/contact'

// Règle de la passation : aucun lien de la vitrine ne mène aux archives.
const liens = [
  { to: '/', libelle: 'Accueil', end: true },
  { to: '/projets', libelle: 'Projets', end: false },
  { to: '/profil', libelle: 'Profil', end: false },
]

const classeLien = ({ isActive }: { isActive: boolean }) =>
  `transition-colors duration-survol ease-salle hover:text-texte-titre-accent ${isActive ? 'text-texte-titre-accent' : ''}`

function Logo({ className = '' }: { className?: string }) {
  return (
    <Link to="/" className={`flex items-center gap-3 font-serif text-[28px] leading-none font-medium ${className}`}>
      <Etoile taille={16} className="text-texte-titre-accent" />
      nevizsh
    </Link>
  )
}

function MenuMobile() {
  const dialogue = useRef<HTMLDialogElement>(null)
  const { pathname } = useLocation()

  // Referme le menu quand on change de page
  useEffect(() => {
    dialogue.current?.close()
  }, [pathname])

  return (
    <>
      <button
        type="button"
        className="-mr-2 p-2 md:hidden"
        aria-haspopup="dialog"
        aria-controls="menu-mobile"
        onClick={() => dialogue.current?.showModal()}
      >
        <span className="sr-only">Ouvrir le menu</span>
        <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path d="M4 7h16M4 12h16M7 17h13" />
        </svg>
      </button>

      {/* <dialog> natif : piège le focus, se ferme avec Échap, rend le reste de la page inerte */}
      <dialog
        ref={dialogue}
        id="menu-mobile"
        aria-label="Menu"
        className="m-0 h-dvh max-h-none w-screen max-w-none bg-fond-base p-0 text-texte-principal backdrop:bg-fond-base md:hidden"
      >
        <div className="flex h-16 items-center justify-between border-b border-bordure-discrete px-5">
          <Logo className="text-[24px]" />
          <button type="button" className="-mr-2 p-2" onClick={() => dialogue.current?.close()}>
            <span className="sr-only">Fermer le menu</span>
            <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>
        <nav aria-label="Navigation principale" className="flex flex-col gap-7 px-5 pt-12 font-serif text-[40px] leading-none">
          {liens.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end} className={classeLien}>
              {l.libelle}
            </NavLink>
          ))}
          <Link to="/profil#contact" className="transition-colors duration-survol ease-salle hover:text-texte-titre-accent">
            Contact
          </Link>
        </nav>
      </dialog>
    </>
  )
}

function Navigation() {
  return (
    <header className="border-b border-bordure-discrete md:border-b-0">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-5 md:h-20 md:px-20">
        <Logo className="text-[24px] md:text-[28px]" />

        <nav aria-label="Navigation principale" className="hidden items-center gap-10 text-[15px] md:flex">
          {liens.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end} className={classeLien}>
              {l.libelle}
            </NavLink>
          ))}
          <Link
            to="/profil#contact"
            className="rounded-[2px] border border-bordure-filet px-[18px] py-[9px] font-semibold transition-colors duration-survol ease-salle hover:bg-bordure-filet hover:text-texte-sur-piece"
          >
            Contact
          </Link>
          {/* Emplacement réservé au futur bouton son (désactivé par défaut, voir passation) */}
        </nav>

        <MenuMobile />
      </div>
    </header>
  )
}

function PiedDePage() {
  return (
    <footer className="border-t border-bordure-filet">
      <div className="mx-auto grid max-w-[1440px] gap-8 px-5 pt-12 pb-14 md:grid-cols-[1.15fr_1fr_auto] md:px-20 md:pt-[60px] md:pb-[70px]">
        <div className="flex flex-col gap-3">
          <Logo className="text-[24px] md:text-[26px]" />
          <p className="hidden text-[14px] text-texte-secondaire md:block">{contact.signature}</p>
        </div>

        <div className="flex flex-col gap-2 text-[15px]">
          <h2 className="meta mb-1 text-[11px] text-texte-meta">Contact</h2>
          <p>{contact.mail.url ? <a href={contact.mail.url}>{contact.mail.libelle}</a> : contact.mail.libelle}</p>
          <p>
            {contact.linkedin.url ? <a href={contact.linkedin.url}>LinkedIn</a> : 'LinkedIn'}
            <span className="hidden md:inline"> — {contact.linkedin.libelle}</span>
          </p>
          <p>
            GitHub — <a href={contact.github.url}>{contact.github.libelle}</a>
          </p>
        </div>

        {/* Pas de lien vers les archives ici. */}
        <div className="flex items-baseline gap-6 md:flex-col md:items-end md:gap-2">
          <Link to="/mentions-legales" className="text-[15px] text-texte-meta transition-colors duration-survol ease-salle hover:text-texte-ornement">
            Mentions légales
          </Link>
          <p className="font-mono text-[12px]">© 2026 nevizsh</p>
        </div>
      </div>
    </footer>
  )
}

export default function VitrineLayout() {
  return (
    <div className="flex min-h-svh flex-col">
      <LienEvitement />
      <Defilement />
      <Navigation />
      <main id="contenu" tabIndex={-1} className="flex-1 outline-none">
        <Outlet />
      </main>
      <PiedDePage />
    </div>
  )
}
