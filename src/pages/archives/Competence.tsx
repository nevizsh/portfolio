import { NavLink, useParams } from 'react-router'
import PageProvisoire from '../../components/PageProvisoire'
import { referentiel, trouverCompetence } from '../../data/referentiel'

export default function Competence() {
  const { nom } = useParams()
  const competence = trouverCompetence(nom)

  if (!competence) {
    return <PageProvisoire rubrique="Archives / Compétences" titre="Compétence introuvable" />
  }

  return (
    <PageProvisoire rubrique={`Archives / Compétences / ${competence.nom}`} titre={competence.nom}>
      <nav aria-label="Compétences" className="mt-10 flex flex-wrap gap-x-8 gap-y-2 text-[15px]">
        {referentiel.map((c) => (
          <NavLink
            key={c.slug}
            to={`/archives/competences/${c.slug}`}
            className={({ isActive }) => (isActive ? 'text-texte-titre-accent underline underline-offset-8' : 'hover:text-texte-titre-accent')}
          >
            {c.nom}
          </NavLink>
        ))}
      </nav>
    </PageProvisoire>
  )
}
