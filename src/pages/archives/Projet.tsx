import { useParams } from 'react-router'
import PageProvisoire from '../../components/PageProvisoire'

export default function ProjetArchives() {
  const { slug } = useParams()
  return <PageProvisoire rubrique={`Archives / Projets / ${slug}`} titre="[Titre du projet]" titreOnglet="Fiche réflexive" />
}
