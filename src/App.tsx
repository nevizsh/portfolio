// Planche de vérification des jetons (étape chore/theme).
// Provisoire : remplacée par le routage à l'étape feat/routing.

const primitives = [
  ['encre', 'bg-encre'],
  ['papier', 'bg-papier'],
  ['vermillon', 'bg-vermillon'],
  ['turquoise', 'bg-turquoise'],
  ['vermillon-sombre', 'bg-vermillon-sombre'],
  ['canard-profond', 'bg-canard-profond'],
  ['ocre', 'bg-ocre'],
  ['rose-chair', 'bg-rose-chair'],
  ['argent', 'bg-argent'],
] as const

const textes = [
  ['texte-principal', 'text-texte-principal'],
  ['texte-secondaire', 'text-texte-secondaire'],
  ['texte-meta', 'text-texte-meta'],
  ['texte-titre-accent', 'text-texte-titre-accent'],
  ['texte-ornement', 'text-texte-ornement'],
] as const

const ombres = [
  ['shadow-ticket', 'shadow-ticket'],
  ['shadow-affiche', 'shadow-affiche'],
  ['shadow-carte', 'shadow-carte'],
  ['shadow-ecran', 'shadow-ecran'],
] as const

function Rubrique({ children }: { children: string }) {
  return <p className="meta mb-6 text-[12px] text-texte-meta">{children}</p>
}

export default function App() {
  return (
    <main className="mx-auto flex max-w-[1440px] flex-col gap-20 px-5 py-16 md:px-20">
      <header>
        <Rubrique>Planche des jetons · provisoire</Rubrique>
        <h1 className="font-serif text-[64px] leading-[0.95] md:text-[104px]">Jetons de design</h1>
        <p className="mt-6 max-w-[720px] font-serif text-[26px] italic text-texte-secondaire">
          Couleurs, polices, ombres et mouvement repris de theme.css.
        </p>
      </header>

      <section>
        <Rubrique>Polices</Rubrique>
        <div className="flex flex-col gap-6">
          <p
            className="font-display text-[72px] tracking-[0.22em] md:text-[150px]"
            style={{ textShadow: '0 0 36px rgb(222 196 132 / .35)' }}
          >
            NEVII
          </p>
          <p className="font-serif text-[52px] leading-[0.95]">Cormorant Garamond 500</p>
          <p className="font-serif text-[32px] italic">Cormorant Garamond 500 italique</p>
          <p className="font-sans text-[16px]">DM Sans 400 : texte courant, chapôs et légendes.</p>
          <p className="font-sans text-[16px] font-semibold">DM Sans 600 : libellés des tickets.</p>
          <p className="meta text-[13px] text-texte-ornement">JetBrains Mono · métadonnées · 2026</p>
        </div>
      </section>

      <section>
        <Rubrique>Primitives</Rubrique>
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-9">
          {primitives.map(([nom, classe]) => (
            <li key={nom} className="flex flex-col gap-2">
              <span className={`h-20 rounded-[4px] border border-bordure-filet/30 ${classe}`} />
              <span className="meta text-[10px]">{nom}</span>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <Rubrique>Textes sur fond Encre</Rubrique>
        <ul className="flex flex-col gap-2 text-[18px]">
          {textes.map(([nom, classe]) => (
            <li key={nom} className={classe}>
              {nom}
            </li>
          ))}
        </ul>
        <div className="mt-8 inline-block rounded-[4px] bg-fond-piece p-6 text-texte-sur-piece">
          Texte sur Papier · <span className="text-texte-sur-piece-accent">accent sur Papier</span>
        </div>
      </section>

      <section>
        <Rubrique>Ombres</Rubrique>
        <ul className="flex flex-wrap gap-10">
          {ombres.map(([nom, classe]) => (
            <li key={nom} className={`flex h-28 w-48 items-end rounded-[4px] bg-fond-piece p-3 text-texte-sur-piece ${classe}`}>
              <span className="meta text-[10px]">{nom}</span>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <Rubrique>Mouvement et focus</Rubrique>
        <p className="mb-6 text-texte-secondaire">
          Survol : glissement lent (duration-survol, ease-salle). Clavier : focus Vermillon.
        </p>
        <button
          type="button"
          className="rounded-[2px] bg-fond-accent px-6 py-3 font-semibold text-texte-sur-accent shadow-ticket transition-transform duration-survol ease-salle hover:translate-x-1"
        >
          Survole-moi ou tabule jusqu'ici
        </button>
      </section>
    </main>
  )
}
