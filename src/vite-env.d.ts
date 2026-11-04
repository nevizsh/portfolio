/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** "1" : charge les projets de test (npm run dev:test) */
  readonly VITE_PROJETS_TEST?: string
}
