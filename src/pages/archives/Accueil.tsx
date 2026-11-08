import { Fragment } from 'react'
import { Link } from 'react-router'
import Etoile from '../../components/Etoile'
import EnTeteArchives from '../../components/archives/EnTeteArchives'
import { archives } from '../../content/archives'
import { projets } from '../../content/projets'
import { referentiel } from '../../data/referentiel'

const cartes = [
  {
    rubrique: '01 · Projets',
    titre: 'Fiches réflexives',
    texte: `${projets.length} projets, dans l'ordre de leur numéro.`,
    to: '/archives/projets',
  },
  {
    rubrique: '02 · Compétences',
    titre: 'Bilans par compétence',
    texte: referentiel.map((c) => c.nom).join(', ') + '.',
    to: '/archives/competences',
  },
  {
    rubrique: '03 · Matrice',
    titre: 'Matrice des AC',
    texte: 'Tous les AC du parcours DWEB, croisés avec les projets.',
    to: '/archives/matrice',
  },
]

function TitreBloc({ rubrique, titre, id }: { rubrique: string; titre: string; id: string }) {
  return (
    <>
      <p className="meta text-[12px] text-texte-meta md:text-[13px]">{rubrique}</p>
      <h2 id={id} className="mt-3 font-serif text-[36px] leading-tight font-medium md:text-[40px]">
        {titre}
      </h2>
    </>
  )
}

export default function AccueilArchives() {
  return (
    <div className="mx-auto max-w-[1440px] px-5 pt-16 pb-24 md:px-20 md:pt-[100px] md:pb-[120px]">
      <title>Archives · nevizsh</title>
      <EnTeteArchives etapes={[{ libelle: 'Archives · Volet compétences' }]} titre="Archives" phrase={archives.accueil.phrase} taille={96} />

      {/* ---- Mode d'emploi : 3 étapes ---- */}
      <section aria-labelledby="titre-mode-emploi" className="mt-20 md:mt-[90px]">
        <TitreBloc rubrique="Mode d'emploi" titre="Comment lire ces archives" id="titre-mode-emploi" />
        <ol className="mt-8 grid gap-6 md:grid-cols-3 md:gap-7">
          {archives.accueil.etapes.map((e, i) => (
            <li key={e.titre} className="border-l-2 border-texte-titre-accent py-1 pl-5">
              <p className="font-mono text-[12px] text-texte-ornement">{String(i + 1).padStart(2, '0')}</p>
              <h3 className="mt-2 font-serif text-[26px] leading-tight font-medium">{e.titre}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-texte-secondaire">{e.texte}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* ---- Par où commencer : 3 cartes d'accès ---- */}
      <section aria-labelledby="titre-acces" className="mt-20 md:mt-[100px]">
        <TitreBloc rubrique="Accès" titre="Par où commencer" id="titre-acces" />
        <ul className="mt-8 grid items-start gap-6 md:grid-cols-3 md:gap-7">
          {cartes.map((c) => (
            <li key={c.to}>
              <Link
                to={c.to}
                className="group block rounded-[4px] border border-bordure-filet/35 bg-papier/3 px-[30px] pt-6 pb-7 transition-colors duration-survol ease-salle hover:border-bordure-filet/70 hover:bg-papier/5"
              >
                <span className="meta block text-[12px] text-texte-meta">{c.rubrique}</span>
                <span className="mt-3 block font-serif text-[34px] leading-tight font-medium">{c.titre}</span>
                <span className="mt-3 block text-[15px] leading-relaxed text-texte-secondaire">{c.texte}</span>
                <span className="mt-4 flex flex-wrap items-baseline gap-x-3">
                  <span className="font-semibold text-texte-titre-accent">
                    Entrer{' '}
                    <span aria-hidden="true" className="inline-block transition-transform duration-survol ease-salle group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                  <span className="font-mono text-[12px] text-texte-secondaire">{c.to}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* ---- Accès direct aux 5 bilans ---- */}
      <nav aria-labelledby="titre-bilans" className="mt-20 md:mt-[100px]">
        <p id="titre-bilans" className="meta text-[12px] text-texte-meta">
          Bilans par compétence
        </p>
        <ul className="mt-5 flex flex-wrap items-center gap-x-9 gap-y-3">
          {referentiel.map((c, i) => (
            <Fragment key={c.slug}>
              {i > 0 && (
                <li aria-hidden="true">
                  <Etoile taille={10} className="text-texte-titre-accent" />
                </li>
              )}
              <li>
                <Link
                  to={`/archives/competences/${c.slug}`}
                  className="font-serif text-[26px] font-medium transition-colors duration-survol ease-salle hover:text-texte-titre-accent md:text-[28px]"
                >
                  {c.nom}
                </Link>
              </li>
            </Fragment>
          ))}
        </ul>
      </nav>
    </div>
  )
}
