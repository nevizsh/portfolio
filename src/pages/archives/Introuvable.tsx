import { Link } from 'react-router'
import EnTeteArchives from '../../components/archives/EnTeteArchives'

/** Page introuvable des archives (adresse inconnue, fiche ou compétence absente). */
export default function IntrouvableArchives() {
  return (
    <div className="mx-auto max-w-[1440px] px-5 pt-16 pb-24 md:px-20 md:pt-[100px] md:pb-[120px]">
      <title>Page introuvable · Archives · nevizsh</title>
      <EnTeteArchives
        etapes={[{ libelle: 'Archives', to: '/archives' }, { libelle: 'Erreur 404' }]}
        titre="Page introuvable"
        phrase="Cette page n'existe pas, ou plus, dans les archives."
      />
      <Link to="/archives" className="mt-8 inline-block font-semibold text-texte-titre-accent">
        Retour à l'accueil des archives <span aria-hidden="true">→</span>
      </Link>
    </div>
  )
}
