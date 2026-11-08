import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import mdx from '@mdx-js/rollup'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import { readdirSync, readFileSync } from 'node:fs'
import { basename, join } from 'node:path'
import { parse as lireYaml } from 'yaml'
import { defineConfig, loadEnv, type Plugin } from 'vite'
import { validerProjet } from './src/content/schema.ts'
import { codesAC } from './src/data/referentiel.ts'
import { sectionsDuCorps } from './src/content/ancres.ts'

const ID_VIRTUEL = 'virtual:projets'
const ID_RESOLU = '\0' + ID_VIRTUEL

/**
 * Lit et valide tous les projets d'un dossier. Une erreur (champ manquant, AC inconnu,
 * selection sans vitrine, slug ≠ nom du fichier, AC ou preuve inconnus dans le corps…)
 * arrête le build : rien d'invalide ne part en ligne.
 */
function lireProjets(dossier: string) {
  const slugs = new Set<string>()
  return readdirSync(dossier)
    .filter((f) => f.endsWith('.mdx'))
    .map((nom) => {
      const fichier = join(dossier, nom)
      const texte = readFileSync(fichier, 'utf8')
      const morceaux = texte.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)
      if (!morceaux) throw new Error(`Frontmatter manquant dans ${fichier}`)
      const [, yaml, corps] = morceaux
      const projet = validerProjet(lireYaml(yaml), fichier)

      if (projet.slug !== basename(nom, '.mdx')) {
        throw new Error(`Dans ${fichier} : le slug « ${projet.slug} » doit être le nom du fichier`)
      }
      if (slugs.has(projet.slug)) throw new Error(`Slug en double : ${projet.slug}`)
      slugs.add(projet.slug)

      // Corps de la fiche : chaque <AcDemontre code="…"> doit être un AC du référentiel déclaré
      // dans le champ « ac », et chaque numéro de preuve doit exister dans « preuves ».
      for (const [, code] of corps.matchAll(/<AcDemontre[^>]*\bcode="([^"]*)"/g)) {
        if (code && !codesAC.has(code)) throw new Error(`Dans ${fichier} : « ${code} » n'est pas un AC du référentiel`)
        if (code && !projet.ac.includes(code)) {
          throw new Error(`Dans ${fichier} : « ${code} » est cité dans la fiche mais absent du champ « ac »`)
        }
      }
      const numeros = [
        ...[...corps.matchAll(/<AcDemontre[^>]*\bpreuve=\{(\d+)\}/g)].map((m) => m[1]),
        ...[...corps.matchAll(/<Preuves[^>]*\bnumeros=\{\[([^\]]*)\]\}/g)].flatMap((m) => m[1].split(',')),
      ]
        .map((n) => Number(n.trim()))
        .filter((n) => !Number.isNaN(n))
      for (const n of numeros) {
        if (n < 1 || n > projet.preuves.length) {
          throw new Error(`Dans ${fichier} : la preuve n° ${n} n'existe pas (le champ « preuves » en a ${projet.preuves.length})`)
        }
      }

      return { ...projet, sections: sectionsDuCorps(corps) }
    })
}

/**
 * Module virtuel « virtual:projets » : les données de tous les projets (frontmatter validé
 * + titres des sections), sans le corps des fiches. Le corps MDX est chargé à part,
 * seulement quand on ouvre une fiche dans les archives.
 */
function projetsVirtuels(dossier: string): Plugin {
  return {
    name: 'projets-virtuels',
    buildStart: () => {
      lireProjets(dossier)
    },
    resolveId: (id) => (id === ID_VIRTUEL ? ID_RESOLU : undefined),
    load(id) {
      if (id !== ID_RESOLU) return
      return `export default ${JSON.stringify(lireProjets(dossier))}`
    },
    // Un MDX modifié : on régénère le module virtuel (nouvelle validation, données à jour)
    handleHotUpdate({ file, server, modules }) {
      if (!file.endsWith('.mdx')) return
      const virtuel = server.moduleGraph.getModuleById(ID_RESOLU)
      if (!virtuel) return
      server.moduleGraph.invalidateModule(virtuel)
      return [...modules, virtuel]
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  const dossierProjets = env.VITE_PROJETS_TEST === '1' ? 'src/dev/projets-test' : 'src/content/projets'

  return {
    plugins: [
      projetsVirtuels(dossierProjets),
      // MDX doit passer avant le plugin React
      { enforce: 'pre', ...mdx({ remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter] }) },
      react({ include: /\.(mdx|js|jsx|ts|tsx)$/ }),
      tailwindcss(),
    ],
  }
})
