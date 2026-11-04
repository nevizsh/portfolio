/*
 * Formes SVG générées selon la taille réelle de l'élément.
 * Les chemins de la passation sont exportés à une taille fixe : ici on garde leurs mesures
 * (rayons, encoches, coupes) et on recalcule le chemin pour n'importe quelle largeur,
 * sans déformer les encoches.
 */

type OptionsTicket = {
  /** Rayon des coins arrondis en creux */
  coin: number
  /** Rayon des encoches latérales */
  encoche: number
  /** Hauteur du centre des encoches (par défaut : au milieu) */
  yEncoche?: number
}

/**
 * Ticket : coins arrondis en creux + une encoche demi-ronde sur chaque côté.
 * Ticket (248 × 68) : coin 6, encoche 9 · Grand ticket (960 × 240) : coin 10, encoche 22.
 * Tous les arcs ont sweep = 0 : ils se creusent vers l'intérieur.
 */
export function formeTicket(w: number, h: number, { coin: c, encoche: e, yEncoche }: OptionsTicket) {
  const y = yEncoche ?? h / 2
  return (
    `M${c} 0H${w - c}A${c} ${c} 0 0 0 ${w} ${c}` +
    `V${y - e}A${e} ${e} 0 0 0 ${w} ${y + e}` +
    `V${h - c}A${c} ${c} 0 0 0 ${w - c} ${h}` +
    `H${c}A${c} ${c} 0 0 0 0 ${h - c}` +
    `V${y + e}A${e} ${e} 0 0 0 0 ${y - e}` +
    `V${c}A${c} ${c} 0 0 0 ${c} 0Z`
  )
}

/**
 * Cadre Art déco : rectangle aux angles coupés à 45°.
 * Extérieur : coupe 18 (16 pour le portrait), trait centré à 0,5 px du bord.
 * Intérieur : retrait de 8 px, coupe réduite d'environ 3,2 px (14,8 pour 18).
 */
export function formeCadre(w: number, h: number, coupe: number, retrait = 0.5) {
  const x0 = retrait
  const y0 = retrait
  const x1 = w - retrait
  const y1 = h - retrait
  return `M${x0 + coupe} ${y0}H${x1 - coupe}L${x1} ${y0 + coupe}V${y1 - coupe}L${x1 - coupe} ${y1}H${x0 + coupe}L${x0} ${y1 - coupe}V${y0 + coupe}L${x0 + coupe} ${y0}Z`
}
