import { Fragment } from 'react'
import { Link, NavLink, useParams } from 'react-router'
import { FilAriane } from '../../components/archives/EnTeteArchives'
import { CodeAC, Pastille } from '../../components/archives/Registre'
import { classesRegistre as c } from '../../components/archives/classesRegistre'
import { archives } from '../../content/archives'
import { projetsDemontrant } from '../../content/liensAC'
import { referentiel, trouverCompetence } from '../../data/referentiel'
import IntrouvableArchives from './Introuvable'

export default function Competence() {
  const { nom } = useParams()
  const competence = trouverCompetence(nom)
  if (!competence) return <IntrouvableArchives />

  const bilan = archives.bilans[competence.slug] || archives.bilanVide

  return (
    <div className="mx-auto max-w-[1440px] px-5 pt-16 pb-24 md:px-20 md:pt-[100px] md:pb-[120px]">
      <title>{`${competence.nom} · Archives · nevizsh`}</title>
      <header>
        <FilAriane etapes={[{ libelle: 'Archives', to: '/archives' }, { libelle: 'Compétences' }, { libelle: competence.nom }]} />
        {/* Onglets des 5 compétences : l'active en Vermillon soulignée */}
      <nav aria-label="Compétences" className="mt-5">
        <ul className="-mx-5 flex gap-x-7 overflow-x-auto px-5 pb-1 text-[15px] [scrollbar-width:none] md:mx-0 md:flex-wrap md:px-0">
          {referentiel.map((r) => (
            <li key={r.slug}>
              <NavLink
                to={`/archives/competences/${r.slug}`}
                className={({ isActive }) =>
                  'inline-block border-b pb-1 whitespace-nowrap transition-colors duration-survol ease-salle ' +
                  (isActive ? 'border-texte-titre-accent text-texte-titre-accent' : 'border-transparent hover:text-texte-titre-accent')
                }
              >
                {r.nom}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
        <h1 className="mt-6 font-serif text-[64px] leading-[0.95] font-medium md:text-[96px]">{competence.nom}</h1>
        <p className="mt-5 max-w-[900px] font-serif text-[22px] leading-snug text-texte-secondaire italic md:text-[26px]">{competence.intitule}</p>
      </header>

      {/* ---- Mon bilan ---- */}
      <section aria-label="Mon bilan" className="mt-12 border-l-2 border-texte-titre-accent bg-papier/3 px-6 py-6 md:mt-[60px] md:px-[28px] md:py-[28px]">
        <p className="meta text-[11px] text-texte-meta">Mon bilan</p>
        <p className="mt-3 text-[16px] leading-relaxed md:text-[18px]">{bilan}</p>
      </section>

      {/* ---- Niveaux et AC ---- */}
      {competence.niveaux.map((n) => (
        <section key={n.numero} aria-labelledby={`niveau-${n.numero}`} className="mt-16 md:mt-[90px]">
          <h2 id={`niveau-${n.numero}`} className="flex flex-col gap-1 md:flex-row md:items-baseline md:gap-5">
            <span className="meta shrink-0 text-[12px] text-texte-ornement">Niveau {n.numero}</span>
            <span className="font-serif text-[28px] leading-tight font-medium md:text-[30px]">{n.intitule}</span>
          </h2>

          <div className="mt-4 overflow-x-auto">
            <table className={`${c.table} min-w-[720px] border-t border-bordure-filet/20`}>
              <caption className="sr-only">
                AC du niveau {n.numero} : code, intitulé officiel, projets qui le démontrent et statut
              </caption>
              <thead className="sr-only">
                <tr>
                  <th scope="col">Code</th>
                  <th scope="col">Intitulé</th>
                  <th scope="col">Projets qui le démontrent</th>
                  <th scope="col">Statut</th>
                </tr>
              </thead>
              <tbody>
                {n.ac.map((ac) => {
                  const lies = projetsDemontrant(ac.code)
                  return (
                    <tr key={ac.code} className={c.tr}>
                      <td className={`${c.td} w-[110px]`}>
                        <CodeAC code={ac.code} />
                      </td>
                      <td className={`${c.td} text-[15px] leading-snug`}>{ac.intitule}</td>
                      <td className={`${c.td} w-[300px] text-[15px] text-texte-secondaire`}>
                        {lies.length
                          ? lies.map((p, i) => (
                              <Fragment key={p.slug}>
                                {i > 0 && ', '}
                                <Link to={`/archives/projets/${p.slug}`} className="underline decoration-bordure-filet/40 underline-offset-4 hover:text-texte-titre-accent">
                                  {p.titre}
                                </Link>
                              </Fragment>
                            ))
                          : <span className="text-texte-secondaire/60">—</span>}
                      </td>
                      <td className={`${c.td} w-[130px] pr-0`}>
                        {/* Statut calculé depuis les MDX : démontré dès qu'un projet cite l'AC */}
                        {lies.length ? <Pastille accent>Démontré</Pastille> : <Pastille>À démontrer</Pastille>}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </section>
      ))}
    </div>
  )
}
