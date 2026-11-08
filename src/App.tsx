import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router'
import VitrineLayout from './layouts/VitrineLayout'
import Accueil from './pages/vitrine/Accueil'
import Projets from './pages/vitrine/Projets'
import Projet from './pages/vitrine/Projet'
import Profil from './pages/vitrine/Profil'
import MentionsLegales from './pages/vitrine/MentionsLegales'
import Introuvable from './pages/vitrine/Introuvable'

// Archives : chargées à la demande, dans des fichiers à part. Le visiteur de la vitrine
// ne télécharge ni leurs pages, ni le référentiel, ni le texte des fiches réflexives.
const ArchivesLayout = lazy(() => import('./layouts/ArchivesLayout'))
const AccueilArchives = lazy(() => import('./pages/archives/Accueil'))
const ProjetsArchives = lazy(() => import('./pages/archives/Projets'))
const ProjetArchives = lazy(() => import('./pages/archives/Projet'))
const Competence = lazy(() => import('./pages/archives/Competence'))
const Matrice = lazy(() => import('./pages/archives/Matrice'))
const IntrouvableArchives = lazy(() => import('./pages/archives/Introuvable'))

// Planche des composants : chargée seulement en développement, absente du site publié
const Composants = import.meta.env.DEV ? lazy(() => import('./pages/Composants')) : null

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
        {Composants && (
          <Route
            path="_composants"
            element={
              <Suspense>
                <Composants />
              </Suspense>
            }
          />
        )}
        <Route path="*" element={<Introuvable />} />
      </Route>

      {/* Archives : privées (noindex), aucun lien depuis la vitrine */}
      <Route
        path="archives"
        element={
          <Suspense>
            <ArchivesLayout />
          </Suspense>
        }
      >
        <Route index element={<AccueilArchives />} />
        <Route path="projets" element={<ProjetsArchives />} />
        <Route path="projets/:slug" element={<ProjetArchives />} />
        <Route path="competences" element={<Navigate to="comprendre" replace />} />
        <Route path="competences/:nom" element={<Competence />} />
        <Route path="matrice" element={<Matrice />} />
        <Route path="*" element={<IntrouvableArchives />} />
      </Route>
    </Routes>
  )
}
