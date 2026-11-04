import { Navigate, Route, Routes } from 'react-router'
import VitrineLayout from './layouts/VitrineLayout'
import ArchivesLayout from './layouts/ArchivesLayout'
import PageProvisoire from './components/PageProvisoire'
import Accueil from './pages/vitrine/Accueil'
import Projets from './pages/vitrine/Projets'
import Projet from './pages/vitrine/Projet'
import Profil from './pages/vitrine/Profil'
import MentionsLegales from './pages/vitrine/MentionsLegales'
import Introuvable from './pages/vitrine/Introuvable'
import AccueilArchives from './pages/archives/Accueil'
import ProjetsArchives from './pages/archives/Projets'
import ProjetArchives from './pages/archives/Projet'
import Competence from './pages/archives/Competence'
import Matrice from './pages/archives/Matrice'
import { referentiel } from './data/referentiel'

export default function App() {
  return (
    <Routes>
      {/* Vitrine : publique */}
      <Route element={<VitrineLayout />}>
        <Route index element={<Accueil />} />
        <Route path="projets" element={<Projets />} />
        <Route path="projets/:slug" element={<Projet />} />
        <Route path="profil" element={<Profil />} />
        <Route path="mentions-legales" element={<MentionsLegales />} />
        <Route path="*" element={<Introuvable />} />
      </Route>

      {/* Archives : privées (noindex), aucun lien depuis la vitrine */}
      <Route path="archives" element={<ArchivesLayout />}>
        <Route index element={<AccueilArchives />} />
        <Route path="projets" element={<ProjetsArchives />} />
        <Route path="projets/:slug" element={<ProjetArchives />} />
        <Route path="competences" element={<Navigate to={referentiel[0].slug} replace />} />
        <Route path="competences/:nom" element={<Competence />} />
        <Route path="matrice" element={<Matrice />} />
        <Route path="*" element={<PageProvisoire rubrique="Archives · Erreur 404" titre="Page introuvable" />} />
      </Route>
    </Routes>
  )
}
