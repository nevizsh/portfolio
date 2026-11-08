/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** "1" : charge les projets de test (npm run dev:test) */
  readonly VITE_PROJETS_TEST?: string
}

// Données des projets, générées et validées au build (plugin de vite.config.ts)
declare module 'virtual:projets' {
  import type { Projet } from './content/schema'
  const projets: (Projet & { sections: string[] })[]
  export default projets
}
