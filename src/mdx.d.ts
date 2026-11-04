// Types des fichiers .mdx importés : le composant (corps) et le frontmatter (en-tête YAML)
declare module '*.mdx' {
  import type { ComponentType } from 'react'
  export const frontmatter: unknown
  const Contenu: ComponentType
  export default Contenu
}
