import { useState, type ReactNode } from 'react'
import Affiche from '../components/Affiche'
import CadreArtDeco from '../components/CadreArtDeco'
import Ecran from '../components/Ecran'
import Etoile from '../components/Etoile'
import Faisceau from '../components/Faisceau'
import Filtres from '../components/Filtres'
import GrandTicket from '../components/GrandTicket'
import Ticket from '../components/Ticket'
import TicketPreuve from '../components/TicketPreuve'
import Visuel from '../components/Visuel'
import { projetsVitrine } from '../content/projets'
import { domaines } from '../data/domaines'

// Planche des composants : visible seulement en développement (npm run dev → /_composants).

function Bloc({ titre, children }: { titre: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-8">
      <h2 className="meta text-[12px] text-texte-meta">{titre}</h2>
      {children}
    </section>
  )
}

export default function Composants() {
  const [filtre, setFiltre] = useState('tout')
  const [aeria, aima] = projetsVitrine

  return (
    <div className="mx-auto flex max-w-[1440px] flex-col gap-24 px-5 py-16 md:px-20">
      <title>Composants · développement</title>
      <h1 className="font-serif text-[64px] leading-[0.95] md:text-[80px]">Composants</h1>

      <Bloc titre="Faisceau + Cadre Art déco (fronton)">
        <div className="relative -mx-5 flex min-h-[560px] items-center justify-center overflow-hidden px-5 md:-mx-20">
          <Faisceau />
          <CadreArtDeco eventail className="w-full max-w-[760px]">
            <div className="@container flex flex-col items-center px-6 py-12 text-center">
              <p className="font-mono text-[13px] tracking-[0.34em] text-texte-ornement uppercase">Portfolio 2026</p>
              <p className="mt-3 font-display text-[14cqi] leading-none tracking-[0.22em]" style={{ textShadow: '0 0 36px rgb(222 196 132 / .35)' }}>
                <span className="mr-[-0.22em]">GENEVIÈVE</span>
              </p>
              <p aria-hidden="true" className="mt-4 flex items-center gap-3">
                <span className="h-px w-[70px] bg-bordure-filet" />
                <Etoile taille={11} className="text-vermillon" />
                <span className="h-px w-[70px] bg-bordure-filet" />
              </p>
            </div>
          </CadreArtDeco>
        </div>
      </Bloc>

      <Bloc titre="Tickets">
        <div className="flex flex-wrap gap-6">
          <Ticket label="Voir les projets" sousTitre="5 projets" href="/projets" />
          <Ticket label="Me contacter" sousTitre="Mail · LinkedIn" variant="papier" href="/profil#contact" />
          <Ticket label="Galerie 3D à commande vocale" sousTitre="Libellé long" variant="papier" onClick={() => {}} />
        </div>
      </Bloc>

      <Bloc titre="Grand ticket de contact">
        <GrandTicket />
      </Bloc>

      <Bloc titre="Tickets de preuve (vitrine sans AC · archives avec AC)">
        <div className="flex flex-wrap gap-8">
          <TicketPreuve numero="0X" intitule="Intitulé de la preuve" type="[Type de preuve]" />
          <TicketPreuve numero="0X" intitule="[Commit, maquette, vidéo…]" type="[Lien]" ac="AC24.01" showAc href="#" />
        </div>
      </Bloc>

      <Bloc titre="Affiches (360 px, 280 px avec ruban « À l'affiche »)">
        <div className="flex flex-wrap items-start gap-16 pt-4">
          {aeria && <Affiche {...aeria} href={`/projets/${aeria.slug}`} />}
          {aima && <Affiche {...aima} href={`/projets/${aima.slug}`} largeur={280} ruban />}
        </div>
      </Bloc>

      <Bloc titre="Filtres">
        <Filtres
          legende="Filtrer par domaine"
          actif={filtre}
          onChange={setFiltre}
          className="flex-wrap"
          options={[
            { valeur: 'tout', libelle: 'Tout', compteur: 12 },
            ...Object.entries(domaines).map(([valeur, libelle]) => ({ valeur, libelle, compteur: 0 })),
          ]}
        />
      </Bloc>

      <Bloc titre="Écran et Visuel">
        <Ecran libelle="Vidéo de présentation — moins d'une minute" className="max-w-[960px]" />
        <Visuel libelle="Image 01" className="aspect-[4/3] w-[320px]" />
      </Bloc>
    </div>
  )
}
