import { Link } from 'react-router'
import PageProvisoire from '../../components/PageProvisoire'
import { projetsVitrine } from '../../content/projets'

// Provisoire : la grille d'affiches et les filtres arrivent à l'étape feat/vitrine.
export default function Projets() {
  return (
    <PageProvisoire rubrique="Au programme" titre="Projets">
      <p className="meta mt-10 text-[11px] text-texte-ornement">{projetsVitrine.length} projets · la sélection en premier</p>
      <ul className="mt-6 flex flex-col gap-2">
        {projetsVitrine.map((p) => (
          <li key={p.slug}>
            <Link to={`/projets/${p.slug}`} className="font-serif text-[26px] hover:text-texte-titre-accent">
              {p.titre}
            </Link>
          </li>
        ))}
      </ul>
    </PageProvisoire>
  )
}
