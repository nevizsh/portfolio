import { useParams } from 'react-router'
import PageProvisoire from '../../components/PageProvisoire'
import { trouverProjetVitrine } from '../../content/projets'
import Introuvable from './Introuvable'

// Provisoire : la page projet complète arrive à l'étape feat/vitrine.
export default function Projet() {
  const { slug } = useParams()
  const projet = trouverProjetVitrine(slug)
  // Un projet hors vitrine reste introuvable ici, même si son fichier existe.
  if (!projet) return <Introuvable />

  return (
    <PageProvisoire rubrique={`N° ${projet.numero} · ${projet.annee} · ${projet.categorie}`} titre={projet.titre}>
      <p className="mt-6 font-serif text-[26px] italic">{projet.accroche}</p>
    </PageProvisoire>
  )
}
