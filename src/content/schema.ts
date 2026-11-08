import { z } from 'zod'
import { codesAC } from '../data/referentiel.ts'
import { codesDomaines, typesProjet } from '../data/domaines.ts'

/*
 * Schéma du frontmatter d'un projet (src/content/projets/*.mdx).
 * Utilisé à deux endroits :
 *  - au build (plugin Vite dans vite.config.ts) : une erreur arrête le build ;
 *  - dans le navigateur (src/content/projets.ts) : les données sont typées.
 */

const codeAC = z.string().refine((code) => codesAC.has(code), {
  message: 'code AC absent du référentiel (src/data/referentiel.ts)',
})

const preuve = z.object({
  intitule: z.string(),
  type: z.string(),
  /** Code AC prouvé : affiché seulement dans les archives. Vide tant que non renseigné. */
  ac: z.union([codeAC, z.literal('')]).default(''),
  href: z.string().default(''),
})

export const schemaProjet = z
  .object({
    // --- Champs de la passation ---------------------------------------
    slug: z.string().regex(/^[a-z0-9-]+$/, 'slug : minuscules, chiffres et tirets'),
    numero: z.string(),
    titre: z.string().min(1),
    /** Public : page Projets et /projets/:slug */
    vitrine: z.boolean(),
    /** « À l'affiche » : accueil et ruban sur la page Projets (suppose vitrine: true) */
    selection: z.boolean().default(false),
    domaines: z.array(z.enum(codesDomaines)).default([]),
    /** Filtre « Type » des archives : vide par défaut */
    type: z.union([z.enum(Object.keys(typesProjet) as [keyof typeof typesProjet]), z.literal('')]).default(''),
    categorie: z.string(),
    accroche: z.string(),
    pitch: z.string(),
    annee: z.string(),
    role: z.string(),
    technos: z.array(z.string()).default([]),
    /** Chemin du logo ; vide → médaillon « LOGO » */
    logo: z.string().default(''),
    /** Codes AC du référentiel DWEB : alimentent l'index des archives, les bilans et la matrice */
    ac: z.array(codeAC).default([]),

    // --- Champs ajoutés pour les pages (voir les captures) : tous facultatifs ---
    /** Titre court : colonnes de la matrice des AC (vide → titre) */
    titreCourt: z.string().default(''),
    equipe: z.string().default(''),
    periode: z.string().default(''),
    cadre: z.string().default(''),
    livrables: z.string().default(''),
    statut: z.string().default(''),
    /** Récit de la page projet : « Mon rôle » et « Le résultat » */
    recitRole: z.string().default(''),
    recitResultat: z.string().default(''),
    /** Tickets « Voir le projet / EN LIGNE » et « Code source / GITHUB » */
    lienEnLigne: z.string().default(''),
    lienCode: z.string().default(''),
    /** Visuel principal ou extrait vidéo, et images de la galerie */
    visuel: z.string().default(''),
    video: z.string().default(''),
    galerie: z.array(z.object({ src: z.string(), legende: z.string().default('') })).default([]),
    preuves: z.array(preuve).default([]),
  })
  .refine((p) => !p.selection || p.vitrine, {
    message: 'un projet « selection: true » doit aussi avoir « vitrine: true »',
    path: ['selection'],
  })

export type Projet = z.infer<typeof schemaProjet>

/** Valide un frontmatter et renvoie un message lisible en cas d'erreur. */
export function validerProjet(donnees: unknown, fichier: string): Projet {
  const resultat = schemaProjet.safeParse(donnees)
  if (!resultat.success) {
    const details = resultat.error.issues.map((i) => `  - ${i.path.join('.') || '(racine)'} : ${i.message}`).join('\n')
    throw new Error(`Frontmatter invalide dans ${fichier} :\n${details}`)
  }
  return resultat.data
}
