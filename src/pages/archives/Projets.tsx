import { Link } from 'react-router'
import PageProvisoire from '../../components/PageProvisoire'
import { projets } from '../../content/projets'

// Provisoire : le registre et les filtres arrivent à l'étape feat/archives.
export default function ProjetsArchives() {
  return (
    <PageProvisoire rubrique="Archives / Projets" titre="Fiches réflexives">
      <ul className="mt-10 flex flex-col gap-2">
        {projets.map((p) => (
          <li key={p.slug} className="flex items-baseline gap-6">
            <span className="font-mono text-[13px] text-texte-ornement">{p.numero}</span>
            <Link to={`/archives/projets/${p.slug}`} className="font-serif text-[24px] hover:text-texte-titre-accent">
              {p.titre}
            </Link>
            <span className="meta text-[10px] text-texte-meta">{p.vitrine ? 'vitrine' : 'archives seulement'}</span>
          </li>
        ))}
      </ul>
    </PageProvisoire>
  )
}
