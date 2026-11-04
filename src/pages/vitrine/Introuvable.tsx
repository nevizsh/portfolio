import { Link } from 'react-router'
import PageProvisoire from '../../components/PageProvisoire'

export default function Introuvable() {
  return (
    <PageProvisoire rubrique="Erreur 404" titre="Page introuvable">
      <Link to="/" className="mt-8 inline-block text-texte-titre-accent hover:underline">
        Retour à l'accueil →
      </Link>
    </PageProvisoire>
  )
}
