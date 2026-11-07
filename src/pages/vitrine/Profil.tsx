import Apparition from '../../components/Apparition'
import CadreArtDeco from '../../components/CadreArtDeco'
import Ecran from '../../components/Ecran'
import Etoile from '../../components/Etoile'
import Faisceau from '../../components/Faisceau'
import GrandTicket from '../../components/GrandTicket'
import InfosCles from '../../components/InfosCles'
import Ticket from '../../components/Ticket'
import TitreSection from '../../components/TitreSection'
import Visuel from '../../components/Visuel'
import { profil } from '../../content/profil'

const marges = 'mx-auto max-w-[1440px] px-5 md:px-20'

// Cartes de compétence inclinées de -1,5° à +1,4°, redressées au survol
const INCLINAISONS = [-1.2, 0.8, -0.4, 1.4, -1.5]

export default function Profil() {
  return (
    <>
      <title>Profil · nevizsh</title>

      {/* ---- En-tête : portrait encadré + présentation ---- */}
      <header className="relative isolate overflow-hidden">
        <Faisceau className="-z-10" />
        <div className={`${marges} grid items-start gap-10 pt-12 pb-16 md:grid-cols-[400px_1fr] md:gap-20 md:pt-[100px] md:pb-[100px]`}>
          <CadreArtDeco coupe={16} className="mx-auto aspect-[400/500] w-full max-w-[260px] md:max-w-none">
            <div className="absolute inset-0 p-[18px]">
              <Visuel libelle="Portrait" src={profil.portrait || undefined} alt={`Portrait de ${profil.nom}`} className="size-full" />
            </div>
          </CadreArtDeco>

          <div>
            <p className="meta text-[12px] text-texte-meta md:text-[13px]">Profil</p>
            <h1 className="mt-4 font-serif text-[64px] leading-[0.95] font-medium md:text-[104px]">{profil.nom}</h1>
            <p className="mt-5 font-serif text-[24px] italic text-texte-secondaire md:text-[28px]">{profil.titrePro}</p>
            <p className="mt-5 max-w-[660px] text-[16px] leading-relaxed text-texte-secondaire md:text-[18px]">{profil.presentation}</p>
            <InfosCles infos={profil.infosCles} className="mt-6 max-w-[720px]" />
            <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row">
              <Ticket label="Télécharger le CV" sousTitre="PDF" href={profil.cv || '/cv.pdf'} />
              <Ticket label="Me contacter" sousTitre="Mail · LinkedIn" variant="papier" href="#contact" />
            </div>
          </div>
        </div>
      </header>

      {/* ---- Vidéo de présentation ---- */}
      <Apparition id="video" aria-labelledby="titre-video" className={`${marges} scroll-mt-10 pt-10 md:pt-[60px]`}>
        <TitreSection rubrique="Vidéo" titre="Présentation" id="titre-video" centre />
        <Ecran
          className="mx-auto mt-10 max-w-[960px]"
          libelle="Vidéo de présentation — moins d'une minute"
          video={profil.video.src || undefined}
          sousTitres={profil.video.sousTitres || undefined}
          image={profil.video.image || undefined}
          titreVideo="Vidéo de présentation"
        />
        <p className="meta mt-5 text-center text-[10px] text-texte-secondaire">Sous-titres disponibles</p>
      </Apparition>

      {/* ---- Parcours, comme un générique ---- */}
      <section aria-labelledby="titre-parcours" className={`${marges} pt-24 md:pt-[120px]`}>
        <TitreSection rubrique="Parcours" titre="Parcours" id="titre-parcours" centre />
        <ol className="mt-12 flex flex-col items-center text-center">
          {profil.parcours.map((etape, i) => (
            <li key={i} className="flex flex-col items-center">
              {i > 0 && <Etoile taille={12} className="my-10 text-vermillon" />}
              <Apparition as="div" className="flex max-w-[680px] flex-col items-center [transition-duration:900ms]">
                <p className="font-mono text-[12px] tracking-[0.14em] text-texte-ornement uppercase">
                  {etape.role} · {etape.dates}
                </p>
                <h3 className="mt-3 font-serif text-[28px] leading-tight font-medium md:text-[34px]">{etape.intitule}</h3>
                <p className="mt-2 text-[16px] text-texte-secondaire">{etape.lieu}</p>
              </Apparition>
            </li>
          ))}
        </ol>
      </section>

      {/* ---- Ce que je sais faire : 5 cartes de compétence ---- */}
      <Apparition aria-labelledby="titre-savoir-faire" className={`${marges} pt-24 md:pt-[140px]`}>
        <TitreSection rubrique="Compétences" titre="Ce que je sais faire" id="titre-savoir-faire" />
        <ul className="mt-10 grid gap-6 md:grid-cols-3 lg:grid-cols-5 lg:gap-6">
          {profil.savoirFaire.map((carte, i) => (
            <li
              key={carte.titre}
              style={{ rotate: `${INCLINAISONS[i % INCLINAISONS.length]}deg` }}
              className="rounded-[6px] bg-fond-piece px-[22px] pt-6 pb-[26px] text-texte-sur-piece shadow-carte transition-[rotate] duration-survol ease-salle hover:!rotate-0"
            >
              <Etoile taille={14} className="text-vermillon" />
              <h3 className="mt-3 font-serif text-[24px] leading-[1.1] font-medium">{carte.titre}</h3>
              <p className="mt-3 text-[14px] leading-snug text-encre/80">{carte.texte}</p>
            </li>
          ))}
        </ul>
      </Apparition>

      {/* ---- Contact ---- */}
      <Apparition id="contact" aria-labelledby="titre-contact" className={`${marges} scroll-mt-10 pt-24 pb-24 md:pt-[140px] md:pb-[120px]`}>
        <TitreSection rubrique="Contact" titre="Me contacter" id="titre-contact" centre />
        <GrandTicket className="mt-12" />
      </Apparition>
    </>
  )
}
