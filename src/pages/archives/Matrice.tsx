import { Link } from 'react-router'
import EnTeteArchives from '../../components/archives/EnTeteArchives'
import { CodeAC } from '../../components/archives/Registre'
import { classesRegistre as c } from '../../components/archives/classesRegistre'
import { archives } from '../../content/archives'
import { lienPreuve } from '../../content/liensAC'
import { projets } from '../../content/projets'
import { referentiel } from '../../data/referentiel'

/** Cercle plein Vermillon : démontré · cercle vide Ocre 45 % : pas mobilisé */
function Pastille({ pleine }: { pleine: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-block size-3 rounded-full ${pleine ? 'bg-texte-titre-accent' : 'border border-bordure-filet/45'}`}
    />
  )
}

const nomCourt = (p: (typeof projets)[number]) => p.titreCourt || p.titre

/**
 * Matrice AC × projets, générée depuis le champ « ac » des MDX.
 * Lignes groupées par compétence et niveau ; une case pleine est un lien vers la preuve dans la fiche.
 */
export default function Matrice() {
  return (
    <div className="mx-auto max-w-[1440px] px-5 pt-16 pb-24 md:px-20 md:pt-[100px] md:pb-[120px]">
      <title>Matrice des AC · Archives · nevizsh</title>
      <EnTeteArchives etapes={[{ libelle: 'Archives', to: '/archives' }, { libelle: 'Matrice' }]} titre="Matrice des AC" phrase={archives.matrice.phrase}>
        <ul aria-label="Légende" className="mt-6 flex flex-wrap gap-x-8 gap-y-2 font-mono text-[12px]">
          <li className="flex items-center gap-2.5">
            <Pastille pleine />
            Démontré (avec preuve)
          </li>
          <li className="flex items-center gap-2.5">
            <Pastille pleine={false} />
            Pas mobilisé
          </li>
        </ul>
      </EnTeteArchives>

      {/* Sur petit écran, le tableau défile à l'horizontale ; la colonne des codes reste visible */}
      <div className="mt-12 -mx-5 overflow-x-auto px-5 md:mx-0 md:px-0" tabIndex={0} role="region" aria-label="Matrice des AC (défilement horizontal)">
        <table className={`${c.table} min-w-[1100px] table-fixed`}>
          <caption className="sr-only">AC du parcours DWEB en lignes, projets en colonnes</caption>
          <thead>
            <tr>
              <th scope="col" className={`${c.th} sticky left-0 z-10 w-[100px] bg-fond-base`}>
                AC
              </th>
              <th scope="col" className={`${c.th} w-[420px]`}>
                Intitulé
              </th>
              {projets.map((p) => (
                <th key={p.slug} scope="col" className={`${c.th} px-1 text-center text-[11px] tracking-[0.04em] normal-case`}>
                  <Link to={`/archives/projets/${p.slug}`} className="hover:text-texte-ornement" title={p.titre}>
                    {nomCourt(p)}
                  </Link>
                </th>
              ))}
            </tr>
          </thead>

          {referentiel.flatMap((competence) =>
            competence.niveaux.map((niveau) => (
              <tbody key={`${competence.slug}-${niveau.numero}`}>
                <tr>
                  <th scope="colgroup" colSpan={2 + projets.length} className="sticky left-0 pt-8 pb-3 text-left font-normal">
                    <span className="font-serif text-[22px] text-texte-ornement italic md:text-[24px]">
                      {competence.nom} · niveau {niveau.numero}
                    </span>
                  </th>
                </tr>
                {niveau.ac.map((ac) => (
                  <tr key={ac.code} className={c.tr}>
                    <th scope="row" className={`py-3 pr-4 align-middle sticky left-0 z-10 bg-fond-base font-normal group-hover:bg-[color-mix(in_oklab,var(--color-fond-base),var(--color-papier)_4%)]`}>
                      <CodeAC code={ac.code} />
                    </th>
                    <td className="py-3 pr-6 align-middle text-[14px] leading-snug">{ac.intitule}</td>
                    {projets.map((p) => (
                      <td key={p.slug} className="px-1 py-3 text-center align-middle">
                        {p.ac.includes(ac.code) ? (
                          <Link
                            to={lienPreuve(p, ac.code)}
                            aria-label={`${ac.code} démontré dans ${p.titre} : voir la preuve`}
                            className="inline-flex size-7 items-center justify-center rounded-full transition-transform duration-survol ease-salle hover:scale-125"
                          >
                            <Pastille pleine />
                          </Link>
                        ) : (
                          <>
                            <Pastille pleine={false} />
                            {/* Les lecteurs d'écran annoncent déjà l'AC et le projet (en-têtes de ligne et de colonne) */}
                            <span className="sr-only">Pas mobilisé</span>
                          </>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            )),
          )}
        </table>
      </div>
    </div>
  )
}
