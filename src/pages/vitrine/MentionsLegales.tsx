import EnTetePage from '../../components/EnTetePage'

// Textes à compléter par Geneviève (mise en page éditoriale simple).
const rubriques = [
  { titre: 'Éditrice', texte: '[Nom, statut (particulier), moyen de contact.]' },
  { titre: 'Hébergeur', texte: 'Netlify — [raison sociale et adresse à recopier depuis le site de Netlify].' },
  {
    titre: 'Crédits et droits des images',
    texte: "[Crédits des visuels, des polices et des images de projets d'équipe : qui a produit quoi, et avec quelle autorisation.]",
  },
]

export default function MentionsLegales() {
  return (
    <>
      <title>Mentions légales · nevizsh</title>
      <EnTetePage rubrique="Informations" titre="Mentions légales" />
      <div className="mx-auto max-w-[720px] px-5 pb-24 md:pb-[120px]">
        {rubriques.map((r) => (
          <section key={r.titre} className="border-t border-bordure-filet py-10 md:py-12">
            <h2 className="font-serif text-[32px] leading-tight font-medium md:text-[40px]">{r.titre}</h2>
            <p className="mt-4 text-[16px] leading-relaxed text-texte-secondaire md:text-[18px]">{r.texte}</p>
          </section>
        ))}
      </div>
    </>
  )
}
