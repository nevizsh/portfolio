import { useRef, useState } from 'react'
import Visuel from './Visuel'

type EcranProps = {
  /** Libellé de l'emplacement tant qu'il n'y a ni vidéo ni image */
  libelle?: string
  /** Vidéo (mp4, webm…) */
  video?: string
  /** Sous-titres WebVTT : obligatoires avec une vidéo */
  sousTitres?: string
  /** Image : affiche de la vidéo, ou visuel seul */
  image?: string
  titreVideo?: string
  /** Sans vidéo : afficher quand même le bouton de lecture en décor (vidéo à venir) */
  bouton?: boolean
  className?: string
}

/** Bouton de lecture : rond Vermillon de 88 px, triangle Encre. */
function BoutonLecture() {
  return (
    <span className="flex size-[88px] items-center justify-center rounded-full bg-fond-accent shadow-ticket transition-transform duration-survol ease-salle group-hover:scale-105">
      <svg viewBox="0 0 24 24" className="ml-1.5 size-8 fill-encre" aria-hidden="true">
        <path d="M6 3.5v17l14-8.5z" />
      </svg>
    </span>
  )
}

/**
 * Écran : cadre Ocre 1,5 px, fond Encre, lueur ocre (shadow-ecran), padding 16.
 * Jamais de lecture automatique : la vidéo démarre au clic, avec ses sous-titres.
 */
export default function Ecran({ libelle = 'Vidéo', video, sousTitres, image, titreVideo = 'Vidéo', bouton = true, className = '' }: EcranProps) {
  const lecteur = useRef<HTMLVideoElement>(null)
  const [lancee, setLancee] = useState(false)

  const lancer = () => {
    setLancee(true)
    lecteur.current?.play()
  }

  return (
    <div className={`border-[1.5px] border-bordure-filet bg-fond-base p-4 shadow-ecran ${className}`}>
      <div className="relative aspect-video w-full">
        {video ? (
          <>
            <video
              ref={lecteur}
              className="size-full bg-encre object-cover"
              src={video}
              poster={image}
              controls={lancee}
              preload="none"
              playsInline
              aria-label={titreVideo}
            >
              {sousTitres && <track kind="captions" src={sousTitres} srcLang="fr" label="Français" default />}
            </video>
            {!lancee && (
              <button type="button" onClick={lancer} className="group absolute inset-0 flex items-center justify-center">
                <span className="sr-only">Lire : {titreVideo}</span>
                <BoutonLecture />
              </button>
            )}
          </>
        ) : (
          <>
            <Visuel libelle={libelle} src={image} className="size-full" />
            {/* Sans vidéo : le bouton n'est qu'un décor */}
            {bouton && <span aria-hidden="true" className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <BoutonLecture />
            </span>}
          </>
        )}
      </div>
    </div>
  )
}
