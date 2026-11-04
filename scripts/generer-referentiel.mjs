// Génère src/data/referentiel.ts à partir de docs/referentiel/referentiel-dweb.md
// (transcription mot pour mot de l'annexe 19). Ne jamais modifier les intitulés à la main :
// corriger la transcription, puis relancer  npm run referentiel
import { readFileSync, writeFileSync } from 'node:fs'

const source = new URL('../docs/referentiel/referentiel-dweb.md', import.meta.url)
const cible = new URL('../src/data/referentiel.ts', import.meta.url)
const NOMS = ['Comprendre', 'Concevoir', 'Exprimer', 'Développer', 'Entreprendre']

const versSlug = (nom) => nom.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()

const competences = []
let competence = null
let niveau = null

for (const brute of readFileSync(source, 'utf8').split('\n')) {
  const ligne = brute.trim()
  if (!ligne) continue

  if (NOMS.includes(ligne)) {
    competence = { slug: versSlug(ligne), nom: ligne, intitule: '', composantes: [], niveaux: [] }
    competences.push(competence)
    niveau = null
    continue
  }
  if (!competence) continue

  let m
  if ((m = ligne.match(/^Compétence : (.+)$/))) {
    competence.intitule = m[1]
  } else if ((m = ligne.match(/^(CE\d\.\d{2}) \| (.+)$/))) {
    competence.composantes.push({ code: m[1], intitule: m[2] })
  } else if ((m = ligne.match(/^Niveau (\d) — (.+)$/))) {
    niveau = { numero: Number(m[1]), intitule: m[2], ac: [] }
    competence.niveaux.push(niveau)
  } else if ((m = ligne.match(/^(AC\d{2}\.\d{2}) \| (.+)$/))) {
    if (!niveau) throw new Error(`AC hors niveau : ${ligne}`)
    niveau.ac.push({ code: m[1], intitule: m[2] })
  }
}

if (competences.length !== 5) throw new Error(`5 compétences attendues, ${competences.length} trouvées`)

const total = competences.flatMap((c) => c.niveaux.flatMap((n) => n.ac)).length

const ts = `// FICHIER GÉNÉRÉ par scripts/generer-referentiel.mjs depuis docs/referentiel/referentiel-dweb.md
// Ne pas modifier à la main (intitulés officiels, mot pour mot) : relancer  npm run referentiel

export type AC = { code: string; intitule: string }
export type Niveau = { numero: number; intitule: string; ac: AC[] }
export type Competence = {
  slug: string
  nom: string
  intitule: string
  composantes: AC[]
  niveaux: Niveau[]
}

export const referentiel: Competence[] = ${JSON.stringify(competences, null, 2)}

/** Tous les AC du parcours (${total}), dans l'ordre du référentiel */
export const tousLesAC = referentiel.flatMap((c) =>
  c.niveaux.flatMap((n) => n.ac.map((ac) => ({ ...ac, competence: c.slug, niveau: n.numero }))),
)

export const codesAC = new Set(tousLesAC.map((ac) => ac.code))

export const trouverCompetence = (slug?: string) => referentiel.find((c) => c.slug === slug)
`

writeFileSync(cible, ts)
console.log(`referentiel.ts : ${competences.length} compétences, ${total} AC`)
