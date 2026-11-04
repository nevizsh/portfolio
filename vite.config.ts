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

/**
 * Valide le frontmatter de chaque projet au démarrage (dev) et au build.
 * Une erreur (champ manquant, AC inconnu, selection sans vitrine, slug ≠ nom du fichier…)
 * arrête le build : rien d'invalide ne part en ligne.
 */
function validerProjets(dossier: string): Plugin {
  const verifier = () => {
    const slugs = new Set<string>()
    for (const nom of readdirSync(dossier).filter((f) => f.endsWith('.mdx'))) {
      const fichier = join(dossier, nom)
      const yaml = readFileSync(fichier, 'utf8').match(/^---\r?\n([\s\S]*?)\r?\n---/)
      if (!yaml) throw new Error(`Frontmatter manquant dans ${fichier}`)
      const projet = validerProjet(lireYaml(yaml[1]), fichier)
      if (projet.slug !== basename(nom, '.mdx')) {
        throw new Error(`Dans ${fichier} : le slug « ${projet.slug} » doit être le nom du fichier`)
      }
      if (slugs.has(projet.slug)) throw new Error(`Slug en double : ${projet.slug}`)
      slugs.add(projet.slug)
    }
  }
  return {
    name: 'valider-projets',
    buildStart: verifier,
    handleHotUpdate: ({ file }) => {
      if (file.endsWith('.mdx')) verifier()
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  const dossierProjets = env.VITE_PROJETS_TEST === '1' ? 'src/dev/projets-test' : 'src/content/projets'

  return {
    plugins: [
      validerProjets(dossierProjets),
      // MDX doit passer avant le plugin React
      { enforce: 'pre', ...mdx({ remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter] }) },
      react({ include: /\.(mdx|js|jsx|ts|tsx)$/ }),
      tailwindcss(),
    ],
  }
})
