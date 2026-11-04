import { useParams } from 'react-router'
import PageProvisoire from '../../components/PageProvisoire'
import { trouverProjet } from '../../content/projets'

// Provisoire : sommaire, fiche d'identité et preuves arrivent à l'étape feat/archives.
export default function ProjetArchives() {
  const { slug } = useParams()
  const projet = trouverProjet(slug)
  if (!projet) return <PageProvisoire rubrique="Archives / Projets" titre="Fiche introuvable" />

  const { Fiche } = projet
  return (
    <PageProvisoire rubrique={`Archives / Projets / ${projet.titre}`} titre={projet.titre} titreOnglet="Fiche réflexive">
      <div className="mt-12 max-w-[760px] [&_h2]:mt-12 [&_h2]:font-serif [&_h2]:text-[40px] [&_h3]:mt-6 [&_h3]:font-serif [&_h3]:text-[26px] [&_p]:mt-2 [&_p]:text-texte-secondaire">
        <Fiche />
      </div>
    </PageProvisoire>
  )
}
