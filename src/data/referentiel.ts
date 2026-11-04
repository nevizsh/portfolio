// FICHIER GÉNÉRÉ par scripts/generer-referentiel.mjs depuis docs/referentiel/referentiel-dweb.md
// Ne pas modifier à la main (intitulés officiels, mot pour mot) : relancer  npm run referentiel

export type AC = { code: string; intitule: string }
export type Niveau = { numero: number; intitule: string; ac: AC[] }
export type Competence = {
  slug: string
  nom: string
  intitule: string
  composantes: AC[]
  niveaux: Niveau[]
}

export const referentiel: Competence[] = [
  {
    "slug": "comprendre",
    "nom": "Comprendre",
    "intitule": "Comprendre les écosystèmes, les besoins des utilisateurs et les dispositifs de communication numérique.",
    "composantes": [
      {
        "code": "CE1.01",
        "intitule": "en intégrant les enjeux humains, écologiques et éthiques"
      },
      {
        "code": "CE1.02",
        "intitule": "en écoutant et observant les utilisateurs"
      },
      {
        "code": "CE1.03",
        "intitule": "en s'appuyant sur des données quantitatives pertinentes et des outils statistiques adaptés"
      },
      {
        "code": "CE1.04",
        "intitule": "en sollicitant des modèles théoriques issus des sciences humaines et sociales"
      },
      {
        "code": "CE1.05",
        "intitule": "en restituant les résultats de manière synthétique"
      }
    ],
    "niveaux": [
      {
        "numero": 1,
        "intitule": "Comprendre les éléments de communication et les attentes utilisateurs",
        "ac": [
          {
            "code": "AC11.01",
            "intitule": "Présenter une organisation, ses activités et son environnement (économique, sociologique, culturel, juridique, technologique, communicationnel et médiatique)"
          },
          {
            "code": "AC11.02",
            "intitule": "Évaluer un site web, un produit multimédia ou un dispositif interactif existant en s'appuyant sur des guides de bonnes pratiques"
          },
          {
            "code": "AC11.03",
            "intitule": "Produire des analyses statistiques descriptives et les interpréter pour évaluer un contexte socio-économique"
          },
          {
            "code": "AC11.04",
            "intitule": "Analyser des formes médiatiques et leur sémiotique"
          },
          {
            "code": "AC11.05",
            "intitule": "Identifier les cibles (critères socio-économiques, démographiques, géographiques, culturels…)"
          },
          {
            "code": "AC11.06",
            "intitule": "Réaliser des entretiens utilisateurs pour construire des personae et des récits utilisateurs (user stories)"
          }
        ]
      },
      {
        "numero": 2,
        "intitule": "Comprendre la stratégie de communication et l'expérience utilisateur",
        "ac": [
          {
            "code": "AC21.01",
            "intitule": "Analyser la stratégie de communication ou marketing d'un acteur, d'une organisation au regard d'un secteur ou d'un marché (stratégie, mission, valeurs…)"
          },
          {
            "code": "AC21.02",
            "intitule": "Auditer un site web, une marque ou un service, en termes de trafic et de référencement"
          },
          {
            "code": "AC21.03",
            "intitule": "Traiter des données avec des outils statistiques pour faciliter leur analyse et leur exploitation"
          },
          {
            "code": "AC21.04",
            "intitule": "Identifier et décrire les parcours client à partir d'enquêtes de terrain"
          },
          {
            "code": "AC21.05",
            "intitule": "Cartographier les expériences utilisateur : points de contact, points de friction et de satisfaction, carte d'empathie"
          }
        ]
      }
    ]
  },
  {
    "slug": "concevoir",
    "nom": "Concevoir",
    "intitule": "Concevoir ou co-concevoir une réponse stratégique pertinente à une problématique complexe.",
    "composantes": [
      {
        "code": "CE2.01",
        "intitule": "en optimisant la responsabilité sociale et environnementale de l'organisation"
      },
      {
        "code": "CE2.02",
        "intitule": "en s'intégrant aux écosystèmes physiques et numériques des parties prenantes"
      },
      {
        "code": "CE2.03",
        "intitule": "en s'appuyant sur les usages et les modes de communication observés"
      },
      {
        "code": "CE2.04",
        "intitule": "en enrichissant sa démarche de connaissances sociologiques, esthétiques, culturelles et inter-culturelles"
      },
      {
        "code": "CE2.05",
        "intitule": "en présentant de façon convaincante la réponse proposée, en français, en anglais ou dans d'autres langues"
      }
    ],
    "niveaux": [
      {
        "numero": 1,
        "intitule": "Concevoir une réponse stratégique",
        "ac": [
          {
            "code": "AC12.01",
            "intitule": "Concevoir un produit ou un service en terme d'usage et de fonctionnalité"
          },
          {
            "code": "AC12.02",
            "intitule": "Construire la proposition de valeur d'un produit ou d'un service"
          },
          {
            "code": "AC12.03",
            "intitule": "Proposer une recommandation marketing (cibles, objectifs, points de contact)"
          },
          {
            "code": "AC12.04",
            "intitule": "Proposer une stratégie de communication"
          }
        ]
      },
      {
        "numero": 2,
        "intitule": "Co-concevoir une réponse stratégique",
        "ac": [
          {
            "code": "AC22.01",
            "intitule": "Co-concevoir un produit ou un service (proposition de valeur, fonctionnalités…)"
          },
          {
            "code": "AC22.02",
            "intitule": "Produire une recommandation ergonomique à partir des tests utilisateurs (sur système fonctionnel, prototype ou maquette interactive)"
          },
          {
            "code": "AC22.03",
            "intitule": "Co-construire une recommandation stratégique (en structurant un plan d'action)"
          },
          {
            "code": "AC22.04",
            "intitule": "Optimiser le référencement d'un site web, d'un produit ou d'un service"
          },
          {
            "code": "AC22.05",
            "intitule": "Mettre en place une présence sur les réseaux sociaux"
          }
        ]
      }
    ]
  },
  {
    "slug": "exprimer",
    "nom": "Exprimer",
    "intitule": "Exprimer un message avec les médias numériques pour informer et communiquer.",
    "composantes": [
      {
        "code": "CE3.01",
        "intitule": "en veillant à la qualité esthétique des créations et en la justifiant par des références culturelles et artistiques"
      },
      {
        "code": "CE3.02",
        "intitule": "en produisant un discours de qualité, appuyé sur les théories du récit et les traditions narratives"
      },
      {
        "code": "CE3.03",
        "intitule": "en respectant la stratégie de communication établie"
      },
      {
        "code": "CE3.04",
        "intitule": "en veillant à la qualité orthographique, grammaticale et typographique des productions"
      },
      {
        "code": "CE3.05",
        "intitule": "en communiquant en français, en anglais ou dans d'autres langues"
      }
    ],
    "niveaux": [
      {
        "numero": 1,
        "intitule": "Exprimer un message par des productions simples",
        "ac": [
          {
            "code": "AC13.01",
            "intitule": "Écrire pour les médias numériques"
          },
          {
            "code": "AC13.02",
            "intitule": "Produire des pistes graphiques et des planches d'inspiration"
          },
          {
            "code": "AC13.03",
            "intitule": "Créer, composer et retoucher des visuels"
          },
          {
            "code": "AC13.04",
            "intitule": "Tourner et monter une vidéo (scénario, captation image et son…)"
          },
          {
            "code": "AC13.05",
            "intitule": "Designer une interface web (wireframes, UI)"
          },
          {
            "code": "AC13.06",
            "intitule": "Optimiser les médias en fonction de leurs usages et supports de diffusion"
          }
        ]
      },
      {
        "numero": 2,
        "intitule": "Exprimer une identité visuelle et éditoriale transmédia",
        "ac": [
          {
            "code": "AC23.01",
            "intitule": "Produire un écrit journalistique sourcé et documenté"
          },
          {
            "code": "AC23.02",
            "intitule": "Définir une iconographie (illustrations, photographies, vidéos)"
          },
          {
            "code": "AC23.03",
            "intitule": "Créer et décliner une identité visuelle (charte graphique)"
          },
          {
            "code": "AC23.04",
            "intitule": "Imaginer, écrire et scénariser en vue d'une communication multimédia ou transmédia"
          },
          {
            "code": "AC23.05",
            "intitule": "Réaliser, composer et produire pour une communication plurimédia"
          },
          {
            "code": "AC23.06",
            "intitule": "Élaborer et produire des animations, des designs sonores, des effets spéciaux, de la visualisation de données ou de la 3D"
          }
        ]
      }
    ]
  },
  {
    "slug": "developper",
    "nom": "Développer",
    "intitule": "Développer pour le web et les médias numériques.",
    "composantes": [
      {
        "code": "CE4.01",
        "intitule": "en se conformant aux standards du Web et aux normes d'accessibilité"
      },
      {
        "code": "CE4.02",
        "intitule": "en s'appuyant sur des concepts théoriques issus de l'informatique et des sciences de l'information"
      },
      {
        "code": "CE4.03",
        "intitule": "en produisant du code fonctionnel, sobre et réutilisable"
      },
      {
        "code": "CE4.04",
        "intitule": "en utilisant les outils favorisant un développement itératif et collaboratif"
      },
      {
        "code": "CE4.05",
        "intitule": "en veillant à la sécurité des systèmes et des données"
      }
    ],
    "niveaux": [
      {
        "numero": 1,
        "intitule": "Développer un site web simple et le mettre en ligne",
        "ac": [
          {
            "code": "AC14.01",
            "intitule": "Exploiter de manière autonome un environnement de développement efficace et productif"
          },
          {
            "code": "AC14.02",
            "intitule": "Produire des pages Web fluides incluant un balisage sémantique efficace et des interactions simples"
          },
          {
            "code": "AC14.03",
            "intitule": "Générer des pages Web à partir de données structurées"
          },
          {
            "code": "AC14.04",
            "intitule": "Mettre en ligne une application Web en utilisant une solution d'hébergement standard"
          },
          {
            "code": "AC14.05",
            "intitule": "Modéliser les données d'une application Web"
          },
          {
            "code": "AC14.06",
            "intitule": "Déployer et personnaliser une application Web en utilisant un CMS ou un framework MVC"
          }
        ]
      },
      {
        "numero": 2,
        "intitule": "Développer une application Web interactive",
        "ac": [
          {
            "code": "AC24.01",
            "intitule": "Produire des pages et applications Web responsives"
          },
          {
            "code": "AC24.02",
            "intitule": "Mettre en place ou développer un back office"
          },
          {
            "code": "AC24.03",
            "intitule": "Intégrer, produire ou développer des interactions riches ou des dispositifs interactifs"
          },
          {
            "code": "AC24.04",
            "intitule": "Modéliser les traitements d'une application Web"
          },
          {
            "code": "AC24.05",
            "intitule": "Optimiser une application web en termes de référencement et de temps de chargement"
          },
          {
            "code": "AC24.06",
            "intitule": "Configurer une solution d'hébergement adaptée aux besoins"
          }
        ]
      },
      {
        "numero": 3,
        "intitule": "Développer un écosystème numérique complexe",
        "ac": [
          {
            "code": "AC34.01",
            "intitule": "Développer à l'aide d'un framework de développement côté client"
          },
          {
            "code": "AC34.02",
            "intitule": "Développer à l'aide d'un framework de développement côté serveur"
          },
          {
            "code": "AC34.03",
            "intitule": "Développer des dispositifs interactifs sophistiqués"
          },
          {
            "code": "AC34.04",
            "intitule": "Concevoir et développer des composants logiciels, plugins ou extensions"
          },
          {
            "code": "AC34.05",
            "intitule": "Maîtriser l'hébergement et le déploiement d'applications"
          }
        ]
      }
    ]
  },
  {
    "slug": "entreprendre",
    "nom": "Entreprendre",
    "intitule": "Entreprendre dans le secteur du numérique.",
    "composantes": [
      {
        "code": "CE5.01",
        "intitule": "en s'appuyant sur une veille technologique et des modèles de l'innovation"
      },
      {
        "code": "CE5.02",
        "intitule": "en favorisant la collaboration entre les parties prenantes du projet"
      },
      {
        "code": "CE5.03",
        "intitule": "en respectant le droit et la vie privée"
      },
      {
        "code": "CE5.04",
        "intitule": "en favorisant la sobriété numérique"
      },
      {
        "code": "CE5.05",
        "intitule": "en exploitant des cadres de réflexion français et internationaux"
      }
    ],
    "niveaux": [
      {
        "numero": 1,
        "intitule": "Entreprendre un projet numérique",
        "ac": [
          {
            "code": "AC15.01",
            "intitule": "Gérer un projet avec une méthode classique"
          },
          {
            "code": "AC15.02",
            "intitule": "Budgéter un projet et suivre sa rentabilité"
          },
          {
            "code": "AC15.03",
            "intitule": "Découvrir les écosystèmes d'innovation numérique (fab labs, living labs, tiers-lieux, incubateurs…)"
          },
          {
            "code": "AC15.04",
            "intitule": "Analyser un produit ou un service innovant en identifiant les propositions de valeurs et en évaluant les solutions proposées"
          },
          {
            "code": "AC15.05",
            "intitule": "Construire une présence en ligne professionnelle (personal branding)"
          },
          {
            "code": "AC15.06",
            "intitule": "Interagir au sein des organisations"
          },
          {
            "code": "AC15.07",
            "intitule": "Produire un message écrit ou oral professionnel"
          }
        ]
      },
      {
        "numero": 2,
        "intitule": "Entreprendre un projet au sein d'un écosystème numérique",
        "ac": [
          {
            "code": "AC25.01",
            "intitule": "Gérer un projet avec une méthode d'amélioration continue par exemple une méthode agile"
          },
          {
            "code": "AC25.02",
            "intitule": "Cartographier un écosystème (identification des acteurs, synthèse des propositions de valeur)"
          },
          {
            "code": "AC25.03",
            "intitule": "Initier la constitution d'un réseau professionnel"
          },
          {
            "code": "AC25.04",
            "intitule": "Collaborer au sein des organisations"
          },
          {
            "code": "AC25.05",
            "intitule": "Maîtriser les codes des productions écrites et orales professionnelles"
          },
          {
            "code": "AC25.06",
            "intitule": "Prendre en compte les contraintes juridiques"
          }
        ]
      },
      {
        "numero": 3,
        "intitule": "Entreprendre dans le numérique",
        "ac": [
          {
            "code": "AC35.01",
            "intitule": "Piloter un produit, un service ou une équipe"
          },
          {
            "code": "AC35.02",
            "intitule": "Maîtriser la qualité en projet Web ou multimédia"
          },
          {
            "code": "AC35.03",
            "intitule": "Concevoir un projet d'entreprise innovante en définissant le nom, l'identité, la forme juridique et le ton de la marque"
          },
          {
            "code": "AC35.04",
            "intitule": "Défendre un projet de manière convaincante"
          }
        ]
      }
    ]
  }
]

/** Tous les AC du parcours (66), dans l'ordre du référentiel */
export const tousLesAC = referentiel.flatMap((c) =>
  c.niveaux.flatMap((n) => n.ac.map((ac) => ({ ...ac, competence: c.slug, niveau: n.numero }))),
)

export const codesAC = new Set(tousLesAC.map((ac) => ac.code))

export const trouverCompetence = (slug?: string) => referentiel.find((c) => c.slug === slug)
