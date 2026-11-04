import { Link, NavLink, Outlet } from 'react-router'
import Etoile from '../components/Etoile'
import Defilement from '../components/Defilement'
import LienEvitement from '../components/LienEvitement'

const liens = [
  { to: '/archives', libelle: 'Accueil', end: true },
  { to: '/archives/projets', libelle: 'Projets', end: false },
  { to: '/archives/competences', libelle: 'Compétences', end: false },
  { to: '/archives/matrice', libelle: 'Matrice', end: false },
]

const classeLien = ({ isActive }: { isActive: boolean }) =>
  `transition-colors duration-survol ease-salle hover:text-texte-titre-accent ${isActive ? 'text-texte-titre-accent' : ''}`

export default function ArchivesLayout() {
  return (
    <div className="flex min-h-svh flex-col">
      {/* En plus de l'en-tête X-Robots-Tag de public/_headers */}
      <meta name="robots" content="noindex, nofollow" />
      <LienEvitement />
      <Defilement />

      <header className="border-b border-bordure-filet">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-4 px-5 py-5 md:h-[72px] md:flex-row md:items-center md:justify-between md:px-20 md:py-0">
          <div className="flex items-center gap-4">
            <Link to="/archives" className="flex items-center gap-3 font-serif text-[26px] leading-none font-medium md:text-[28px]">
              <Etoile taille={16} className="text-texte-titre-accent" />
              Archives
            </Link>
            <span className="meta border border-bordure-filet px-2.5 py-1 text-[10px] text-texte-ornement">Volet compétences</span>
          </div>

          <nav aria-label="Navigation des archives" className="flex flex-wrap gap-x-8 gap-y-2 text-[15px] md:gap-x-10">
            {liens.map((l) => (
              <NavLink key={l.to} to={l.to} end={l.end} className={classeLien}>
                {l.libelle}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main id="contenu" tabIndex={-1} className="flex-1 outline-none">
        <Outlet />
      </main>

      <footer className="border-t border-bordure-filet">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-4 px-5 py-10 md:flex-row md:items-center md:justify-between md:px-20">
          <p className="meta text-[11px] md:text-[12px]">Archives · SAÉ 5.10 Portfolio · BUT MMI 3 · UNC</p>
          {/* Sens autorisé : archives → vitrine */}
          <Link to="/" className="text-[15px] text-texte-meta transition-colors duration-survol ease-salle hover:text-texte-ornement">
            Site vitrine →
          </Link>
        </div>
      </footer>
    </div>
  )
}
