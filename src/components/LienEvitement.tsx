/** Lien « Aller au contenu » : invisible, il apparaît au premier appui sur Tab. */
export default function LienEvitement() {
  return (
    <a
      href="#contenu"
      className="sr-only z-50 rounded-[2px] bg-fond-piece px-4 py-2 font-semibold text-texte-sur-piece focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
    >
      Aller au contenu
    </a>
  )
}
