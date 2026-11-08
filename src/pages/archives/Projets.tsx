import { Link, useSearchParams } from 'react-router'
import Filtres from '../../components/Filtres'
import EnTeteArchives from '../../components/archives/EnTeteArchives'
import { FlecheLigne, Pastille } from '../../components/archives/Registre'
import { classesRegistre as c } from '../../components/archives/classesRegistre'
import { archives } from '../../content/archives'
import { competencesDe } from '../../content/liensAC'
import { projets } from '../../content/projets'
import { typesProjet, type TypeProjet } from '../../data/domaines'
import { referentiel } from '../../data/referentiel'

const optionsCompetence = [{ valeur: 'toutes', libelle: 'Toutes' }, ...referentiel.map((r) => ({ valeur: r.slug, libelle: r.nom }))]
const optionsType = [
  { valeur: 'tous', libelle: 'Tous' },
  ...(Object.keys(typesProjet) as TypeProjet[]).map((t) => ({ valeur: t, libelle: typesProjet[t] })),
]

export default function ProjetsArchives() {
  // Les deux filtres vivent dans l'adresse : ?competence=developper&type=sae
  const [parametres, setParametres] = useSearchParams()
  const lire = (cle: string, options: { valeur: string }[]) => {
    const v = parametres.get(cle)
    return options.some((o) => o.valeur === v) ? v! : options[0].valeur
  }
  const competence = lire('competence', optionsCompetence)
  const type = lire('type', optionsType)

  const choisir = (cle: string, valeur: string, parDefaut: string) => {
    const suivants = new URLSearchParams(parametres)
    if (valeur === parDefaut) suivants.delete(cle)
    else suivants.set(cle, valeur)
    setParametres(suivants, { replace: true, preventScrollReset: true })
  }

  const visibles = projets.filter(
    (p) => (competence === 'toutes' || competencesDe(p).some((r) => r.slug === competence)) && (type === 'tous' || p.type === type),
  )

  return (
    <div className="mx-auto max-w-[1440px] px-5 pt-16 pb-24 md:px-20 md:pt-[100px] md:pb-[120px]">
      <title>Fiches réflexives · Archives · nevizsh</title>
      <EnTeteArchives
        etapes={[{ libelle: 'Archives', to: '/archives' }, { libelle: 'Projets' }]}
        titre="Fiches réflexives"
        phrase={archives.projets.phrase}
      />

      {/* ---- Filtres ---- */}
      <div className="mt-10 flex flex-col gap-4">
        {[
          { cle: 'competence', legende: 'Compétence', options: optionsCompetence, actif: competence },
          { cle: 'type', legende: 'Type', options: optionsType, actif: type },
        ].map((f) => (
          <div key={f.cle} className="flex flex-col gap-2 md:flex-row md:items-center md:gap-0">
            <p aria-hidden="true" className="meta w-[120px] shrink-0 text-[11px] text-texte-meta">
              {f.legende}
            </p>
            <Filtres
              legende={`Filtrer par ${f.legende.toLowerCase()}`}
              variante="mono"
              options={f.options}
              actif={f.actif}
              onChange={(v) => choisir(f.cle, v, f.options[0].valeur)}
              className="-mx-5 overflow-x-auto px-5 pb-1 [scrollbar-width:none] md:mx-0 md:flex-wrap md:overflow-visible md:px-0"
            />
          </div>
        ))}
      </div>

      <p aria-live="polite" className="sr-only">
        {visibles.length} fiche{visibles.length > 1 ? 's' : ''}
      </p>

      {/* ---- Registre ---- */}
      <div className="mt-12">
        <table className={c.table}>
          <caption className="sr-only">Fiches réflexives : numéro, projet, type, année, compétences et nombre d'AC</caption>
          <thead>
            <tr>
              <th scope="col" className={`${c.th} w-[70px]`}>
                N°
              </th>
              <th scope="col" className={c.th}>
                Projet
              </th>
              <th scope="col" className={`${c.th} hidden md:table-cell`}>
                Type
              </th>
              <th scope="col" className={`${c.th} hidden md:table-cell`}>
                Année
              </th>
              <th scope="col" className={`${c.th} hidden lg:table-cell`}>
                Compétences
              </th>
              <th scope="col" className={`${c.th} w-[50px]`}>
                AC
              </th>
              <th scope="col" className={`${c.th} w-[60px]`}>
                <span className="sr-only">Ouvrir</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {visibles.map((p) => {
              const competences = competencesDe(p)
              return (
                // La ligne entière est cliquable : le lien du titre s'étend sur toute la ligne (after:inset-0)
                <tr key={p.slug} className={`${c.tr} relative focus-within:bg-papier/4`}>
                  <td className={`${c.td} font-mono text-[13px] text-texte-ornement`}>{p.numero}</td>
                  <td className={c.td}>
                    <Link
                      to={`/archives/projets/${p.slug}`}
                      className="font-serif text-[22px] leading-tight font-medium after:absolute after:inset-0 md:text-[24px]"
                    >
                      {p.titre}
                    </Link>
                  </td>
                  <td className={`${c.td} hidden text-[15px] text-texte-secondaire md:table-cell`}>{p.type ? typesProjet[p.type] : '[Type]'}</td>
                  <td className={`${c.td} hidden font-mono text-[13px] md:table-cell`}>{p.annee}</td>
                  <td className={`${c.td} hidden lg:table-cell`}>
                    <span className="flex flex-wrap gap-1.5">
                      {competences.length ? competences.map((r) => <Pastille key={r.slug}>{r.nom}</Pastille>) : <Pastille>[Compétences]</Pastille>}
                    </span>
                  </td>
                  <td className={`${c.td} font-mono text-[13px]`}>{p.ac.length}</td>
                  <td className={`${c.td} text-right`}>
                    <FlecheLigne />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        {!visibles.length && (
          <p className="border-b border-bordure-filet/20 py-8 text-center text-texte-secondaire">Aucune fiche ne correspond à ces filtres.</p>
        )}
      </div>
    </div>
  )
}
