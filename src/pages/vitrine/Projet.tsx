import { Link, useParams } from 'react-router'
import Affiche from '../../components/Affiche'
import Apparition from '../../components/Apparition'
import Ecran from '../../components/Ecran'
import Etoile from '../../components/Etoile'
import Faisceau from '../../components/Faisceau'
import InfosCles from '../../components/InfosCles'
import Ticket from '../../components/Ticket'
import TicketPreuve from '../../components/TicketPreuve'
import TitreSection from '../../components/TitreSection'
import Visuel from '../../components/Visuel'
import { projetSuivant, trouverProjetVitrine } from '../../content/projets'
import Introuvable from './Introuvable'

const marges = 'mx-auto max-w-[1440px] px-5 md:px-20'

// Légère inclinaison des images et des tickets, comme posés à la main
const INCLINAISONS = [-1.5, 1, 0.6]

export default function Projet() {
  const { slug } = useParams()
  const projet = trouverProjetVitrine(slug)
  // Un projet hors vitrine reste introuvable ici, même si son fichier existe
  if (!projet) return <Introuvable />

  const suivant = projetSuivant(projet.slug)
  const nn = (i: number) => String(i + 1).padStart(2, '0')

  return (
    <>
      <title>{`${projet.titre} · nevizsh`}</title>

      {/* ---- En-tête : affiche à gauche, fiche à droite ---- */}
      <header className="relative isolate overflow-hidden">
        <Faisceau className="-z-10" />
        <div className={`${marges} pt-8 pb-16 md:pt-12 md:pb-[100px]`}>
          <nav aria-label="Fil d'Ariane" className="font-mono text-[12px] tracking-[0.1em] text-texte-meta">
            <Link to="/projets" className="hover:text-texte-ornement">Projets</Link>
            <span aria-hidden="true" className="mx-3">/</span>
            <span aria-current="page">{projet.titre}</span>
          </nav>

          <div className="mt-8 grid items-start gap-10 lg:mt-10 lg:grid-cols-[440px_1fr] lg:gap-[100px]">
            <div className="flex justify-center lg:justify-start lg:pl-3">
              {/* Affiche ×1,12 (403 px), inclinée de -2° */}
              <div className="hidden lg:block">
                <Affiche {...projet} largeur={403} inclinaison={-2} />
              </div>
              <div className="lg:hidden">
                <Affiche {...projet} largeur={280} inclinaison={-2} />
              </div>
            </div>

            <div className="lg:pt-4">
              <p className="font-mono text-[12px] tracking-[0.14em] text-texte-ornement uppercase">
                N° {projet.numero} · {projet.annee} · {projet.categorie}
              </p>
              <h1 className="mt-4 font-serif text-[64px] leading-[0.95] font-medium md:text-[104px]">{projet.titre}</h1>
              <p className="mt-5 font-serif text-[24px] leading-snug italic text-texte-secondaire md:text-[28px]">{projet.accroche}</p>
              <p className="mt-5 max-w-[640px] text-[16px] leading-relaxed text-texte-secondaire md:text-[18px]">{projet.pitch}</p>
              <InfosCles
                className="mt-6 max-w-[700px]"
                infos={[
                  { libelle: 'Mon rôle', valeur: projet.role },
                  { libelle: 'Équipe', valeur: projet.equipe },
                  { libelle: 'Période', valeur: projet.periode },
                  { libelle: 'Technos', valeur: projet.technos.join(' · ') },
                ]}
              />
              {(projet.lienEnLigne || projet.lienCode) && (
                <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row">
                  {projet.lienEnLigne && <Ticket label="Voir le projet" sousTitre="En ligne" href={projet.lienEnLigne} />}
                  {projet.lienCode && <Ticket label="Code source" sousTitre="GitHub" variant="papier" href={projet.lienCode} />}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* ---- Écran : visuel principal ou extrait vidéo ---- */}
      <Apparition as="div" className={marges}>
        <Ecran
          libelle="Visuel principal ou extrait vidéo"
          video={projet.video || undefined}
          image={projet.visuel || undefined}
          titreVideo={`Extrait vidéo : ${projet.titre}`}
          bouton={false}
          className="mx-auto max-w-[1280px] [&>div]:aspect-[2/1]"
        />
      </Apparition>

      {/* ---- Récit ---- */}
      {(projet.recitRole || projet.recitResultat) && (
        <Apparition aria-label="Le projet" className={`${marges} pt-20 md:pt-[110px]`}>
          <div className="mx-auto flex max-w-[760px] flex-col gap-14">
            {[
              { titre: 'Mon rôle', texte: projet.recitRole },
              { titre: 'Le résultat', texte: projet.recitResultat },
            ]
              .filter((r) => r.texte)
              .map((r) => (
                <div key={r.titre}>
                  <h2 className="flex items-center gap-4 font-serif text-[32px] leading-tight font-medium md:text-[40px]">
                    <Etoile taille={12} className="text-vermillon" />
                    {r.titre}
                  </h2>
                  <p className="mt-4 text-[16px] leading-relaxed text-texte-secondaire md:text-[18px]">{r.texte}</p>
                </div>
              ))}
          </div>
        </Apparition>
      )}

      {/* ---- En images ---- */}
      {projet.galerie.length > 0 && (
        <Apparition aria-labelledby="titre-galerie" className={`${marges} pt-20 md:pt-[110px]`}>
          <TitreSection rubrique="Galerie" titre="En images" id="titre-galerie" />
          <ul className="mt-10 grid gap-8 md:grid-cols-3 md:gap-10">
            {projet.galerie.map((image, i) => (
              <li key={i} style={{ rotate: `${INCLINAISONS[i % INCLINAISONS.length]}deg` }}>
                <figure className="border border-bordure-filet p-2.5 pb-3">
                  <Visuel libelle={`Image ${nn(i)}`} src={image.src || undefined} alt={image.legende} className="aspect-[3/2] w-full" />
                  {image.legende && <figcaption className="mt-2.5 text-[12px] text-texte-secondaire">{image.legende}</figcaption>}
                </figure>
              </li>
            ))}
          </ul>
        </Apparition>
      )}

      {/* ---- Voir le projet : tickets de preuve, toujours SANS code AC sur la vitrine ---- */}
      {projet.preuves.length > 0 && (
        <Apparition aria-labelledby="titre-preuves" className={`${marges} pt-20 md:pt-[110px]`}>
          <TitreSection rubrique="Liens" titre="Voir le projet" id="titre-preuves" />
          <ul className="mt-10 flex flex-wrap gap-8 md:gap-11">
            {projet.preuves.map((preuve, i) => (
              <li key={i} className="w-full max-w-[300px]" style={{ rotate: `${INCLINAISONS[(i + 1) % INCLINAISONS.length]}deg` }}>
                <TicketPreuve numero={nn(i)} intitule={preuve.intitule} type={preuve.type} href={preuve.href || undefined} />
              </li>
            ))}
          </ul>
        </Apparition>
      )}

      {/* ---- Projet suivant ---- */}
      {suivant && (
        <Apparition as="div" className="mt-24 border-y border-bordure-filet/50 md:mt-[120px]">
          <div className={`${marges} flex items-center justify-between gap-10 py-12 md:py-16`}>
            <Link to={`/projets/${suivant.slug}`} className="group">
              <span className="meta block text-[12px] text-texte-meta">Projet suivant</span>
              <span className="mt-3 block font-serif text-[40px] leading-tight font-medium text-texte-titre-accent md:text-[56px]">
                {suivant.titre}{' '}
                <span aria-hidden="true" className="inline-block transition-transform duration-survol ease-salle group-hover:translate-x-2">
                  →
                </span>
              </span>
            </Link>
            <div aria-hidden="true" className="hidden md:block">
              <Affiche {...suivant} largeur={190} />
            </div>
          </div>
        </Apparition>
      )}
    </>
  )
}
