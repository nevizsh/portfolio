import { useParams } from 'react-router'
import PageProvisoire from '../../components/PageProvisoire'

export default function Projet() {
  const { slug } = useParams()
  return <PageProvisoire rubrique={`Projets / ${slug}`} titre="[Titre du projet]" />
}
