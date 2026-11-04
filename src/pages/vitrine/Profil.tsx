import PageProvisoire from '../../components/PageProvisoire'

export default function Profil() {
  return (
    <PageProvisoire rubrique="Profil" titre="Nevii" titreOnglet="Profil">
      {/* Cible du lien « Contact » de la navigation */}
      <section id="contact" aria-labelledby="titre-contact" className="mt-[100px] scroll-mt-10">
        <p className="meta mb-4 text-[12px] text-texte-meta">Contact</p>
        <h2 id="titre-contact" className="font-serif text-[36px] font-medium md:text-[52px]">
          Me contacter
        </h2>
      </section>
    </PageProvisoire>
  )
}
