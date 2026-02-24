import type { CVProject } from './cv-details';

export const cvProjectsFr: CVProject[] = [
  {
    "id": "ai-translation-tools-2025",
    "company": "SaaS de traduction par IA generative",
    "companyDesc": "Projet de conception et implementation de microservices de post-traitement pour un SaaS de traduction par IA",
    "role": "Ingenieur backend (conception et implementation de microservices)",
    "roles": ["Backend", "Infra", "Testing"],
    "period": "2025/04 — 2025/09",
    "teamSize": 5,
    "summary": "Ensemble de microservices de post-traitement bases sur FastAPI + Celery + PostgreSQL + Redis. En plus de la conception et implementation du service de post-validation, modernisation de l'environnement de developpement frontend, mise en place de l'infrastructure de deploiement Docker/GHCR, generation automatique de mocks OpenAPI et environnement de tests E2E",
    "technologies": [
      "Docker",
      "Redis",
      "Python",
      "PostgreSQL",
      "Celery",
      "FastAPI",
      "Vite",
      "Vitest",
      "Storybook",
      "Biome",
      "Playwright",
      "React Testing Library",
      "MSW",
      "Orval",
      "GitHub Actions",
      "agent-browser",
      "asyncio"
    ],
    "tasks": [
      {
        "title": "Conception d'une machine a etats pour le post-traitement et construction d'une infrastructure de taches tolerante aux pannes",
        "summary": "Gestion du processus de verification qualite et re-traduction post-traduction via une machine a etats a 9 etats, avec enregistrement immutable de chaque etape en base de donnees. Cela permet l'analyse des causes par simple requete SQL en cas de probleme de precision de traduction, et le suivi en temps reel de l'avancement via API. Chaque etape est implementee comme tache Celery idempotente, avec une conception tolerante aux pannes permettant la reprise a partir des informations de file d'attente restaurees depuis la base de donnees en cas de defaillance de conteneur",
        "difficulty": "extreme",
        "technologies": [
          "Docker",
          "Redis",
          "Python",
          "PostgreSQL",
          "Celery",
          "FastAPI"
        ],
        "highlights": [
          "Separation complete de la logique de transition d'etats et de la logique metier, avec conception et implementation d'une architecture faiblement couplee et facile a maintenir"
        ],
        "decisions": [
          {
            "title": "Controle du processus de verification de traduction par machine a etats",
            "detail": "Conception du controle de la boucle verification de traduction -> re-traduction via une machine a etats a 9 etats. En separant la logique de transition d'etats de la logique metier, les modifications des conditions de branchement n'impactent pas les autres etapes, realisant ainsi une structure faiblement couplee"
          },
          {
            "title": "Schema immutable privilegiant l'observabilite",
            "detail": "Adoption d'une methode d'enregistrement immutable en base de donnees des resultats de chaque etape. En cas de probleme de precision de traduction, l'analyse des causes est possible par SQL, et les donnees sont directement exploitables pour l'amelioration future des modeles IA. De plus, l'avancement du traitement est consultable par simple SELECT, reduisant la charge de verification tant pour les developpeurs que pour les equipes metier"
          },
          {
            "title": "Conception tolerante aux pannes via des taches Celery idempotentes",
            "detail": "Chaque etape de transition d'etats est implementee comme tache Celery idempotente. Grace a une configuration de retry avec backoff exponentiel et jitter, les appels de polling API peuvent egalement etre reessayes en toute securite. Meme en cas de perte de la file Redis suite a un arret de conteneur, le traitement peut reprendre a partir de l'etat enregistre en base de donnees"
          }
        ],
        "outcomes": [
          {
            "before": "L'avancement du post-traitement etait opaque, et la verification ne pouvait se faire que par lecture visuelle des logs",
            "after": "Suivi de l'avancement via une seule API. L'analyse des causes des problemes de precision de traduction est desormais possible par SQL, reduisant la charge de verification pour les developpeurs et les equipes metier",
            "metric": "Amelioration de l'observabilite et capacite de reprise apres incident"
          }
        ],
        "challenges": [
          {
            "title": "Conception de la reprise du traitement en cas de defaillance de conteneur",
            "resolution": "La file Redis etant volatile, mise en place d'un mecanisme de restauration des informations de file a partir de l'etat en base de donnees lors du redemarrage du conteneur. Chaque tache etant concue de maniere idempotente, la reprise en cours de traitement est securisee"
          },
          {
            "title": "Separation de la logique de transition d'etats et de la logique metier",
            "resolution": "Gestion des conditions de branchement des transitions d'etats et de la logique metier de chaque etape dans des modules completement distincts. Conception faiblement couplee garantissant qu'une modification de l'un n'impacte pas l'autre, assurant la maintenabilite"
          }
        ]
      },
      {
        "title": "Redaction du cahier de tests de non-regression et definition de la strategie de tests assistee par IA",
        "summary": "Redaction d'un cahier de tests manuels de non-regression en prevision du refactoring post-premiere version. Evaluation honnete des limites de fiabilite du comportement non-deterministe de l'IA generative (agent-browser), et definition d'une strategie de migration progressive : tests manuels -> E2E -> tests de composants. Decision pragmatique de limiter aux tests manuels les parties fortement couplees a l'editeur OnlyOffice (implementation Canvas)",
        "difficulty": "medium",
        "technologies": [
          "Storybook",
          "Playwright",
          "Vitest",
          "React Testing Library",
          "agent-browser"
        ],
        "highlights": [
          "Evaluation des limites de fiabilite du comportement non-deterministe de l'IA generative et definition d'une strategie d'automatisation progressive des tests (manuels -> E2E -> composants)"
        ],
        "decisions": [
          {
            "title": "Definition de la strategie de tests tenant compte du comportement non-deterministe de l'IA generative (agent-browser)",
            "detail": "Plutot que de laisser l'IA executer des tests de maniere desordonnee, definition d'une strategie d'automatisation progressive : (1) systematisation des tests manuels via un cahier de tests, (2) migration vers des tests E2E et de composants deterministes, (3) utilisation d'agent-browser uniquement pour la generation de code de tests E2E deterministes et non pour les tests manuels"
          },
          {
            "title": "Strategie de tests pour l'UI fortement couplee a l'editeur OnlyOffice (implementation Canvas)",
            "detail": "Le recours a un Fake de l'editeur OnlyOffice a ete juge comme reduisant l'efficacite des tests. Les tests E2E bases sur les positions relatives du DOM du Canvas etant instables, la decision pragmatique a ete prise de limiter aux tests manuels les parties fortement couplees a OnlyOffice"
          }
        ],
        "outcomes": [
          {
            "before": "Absence de moyens de prevention des regressions lors du refactoring, et strategie de tests non definie",
            "after": "Redaction d'un cahier de tests manuels de non-regression et systematisation des tests. Apres evaluation honnete des limites de fiabilite de l'IA generative, definition d'une strategie de migration progressive : tests manuels -> E2E -> tests de composants. Documentation de la decision pragmatique de limiter les tests manuels aux parties couplees a OnlyOffice",
            "metric": "Systematisation de la strategie de tests et dispositif d'assurance qualite"
          }
        ],
        "challenges": [
          {
            "title": "Determination des limites d'automatisation des tests pour l'UI fortement couplee a l'editeur OnlyOffice (implementation Canvas)",
            "resolution": "Separation claire des sujets de test entre « domaine automatisable » et « domaine necessitant des tests manuels ». Les parties couplees a OnlyOffice sont couvertes par le cahier de tests manuels, tandis que les autres logiques UI/API sont automatisees par des tests E2E et de composants"
          }
        ]
      },
      {
        "title": "Conception du glossaire et architecture Clean Architecture pour la verification de traduction",
        "summary": "Conception du modele de domaine, de la structure de donnees du glossaire et de l'architecture Clean Architecture (separation UseCase/Repository/Domain) pour l'ensemble de la fonctionnalite de verification de traduction. Le schema de persistance des decisions de l'IA generative en base de donnees garantit l'observabilite du processus de verification",
        "difficulty": "high",
        "technologies": [
          "Python",
          "FastAPI",
          "PostgreSQL"
        ],
        "highlights": [
          "Conception de l'ensemble de la logique de verification de traduction en Clean Architecture avec separation UseCase/Repository/Domain, facilitant la repartition des taches entre les membres de l'equipe"
        ],
        "decisions": [
          {
            "title": "Adoption d'une architecture en 3 couches : UseCase/Repository/Domain",
            "detail": "Separation de la logique de verification de traduction en 3 couches : UseCase (controle du flux metier) / Repository (abstraction de l'acces aux donnees) / Domain (modele de domaine et validation). En isolant les appels a l'IA generative dans la couche UseCase, la portee d'impact lors d'un changement de modele IA est limitee"
          },
          {
            "title": "Schema de persistance des decisions de l'IA generative en base de donnees",
            "detail": "Adoption d'une conception ou chaque decision rendue par l'IA generative a chaque etape de verification (score de qualite de traduction, necessite de re-traduction, suggestions de correction terminologique) est persistee comme enregistrement en base de donnees. Cela constitue la base pour accumuler les donnees necessaires a la comparaison future de la precision des modeles IA et a l'amelioration des prompts"
          }
        ],
        "outcomes": [
          {
            "before": "La logique de verification de traduction etait sans conception, et il n'y avait pas de critere de repartition des taches au sein de l'equipe",
            "after": "L'architecture en 3 couches clarifie les responsabilites de chaque couche. Mise en place d'une organisation permettant aux membres de l'equipe de developper en parallele les couches Repository et UseCase, le document de conception servant de reference pour la repartition des taches",
            "metric": "Etablissement d'une base de conception permettant le developpement parallele par une equipe de 4 personnes"
          }
        ],
        "challenges": [
          {
            "title": "Integration des sorties non-deterministes de l'IA generative dans le modele de domaine",
            "resolution": "Definition des sorties de l'IA comme « resultats de decision » avec typage, et conception d'un flux de validation dans la couche Domain avant persistance en base. La structure permet d'absorber les changements de format de sortie de l'IA dans la validation de la couche Domain"
          }
        ]
      },
      {
        "title": "Implementation d'un algorithme de correspondance quasi-exacte pour la recherche d'exemples d'utilisation du glossaire",
        "summary": "Implementation d'un algorithme pour la recherche d'exemples d'utilisation dans le glossaire de traduction, tolerant les variations d'ecriture, les differences de particules et de ponctuation tout en retournant des correspondances semantiquement precises. Resolution du probleme de precision insuffisante de la recherche plein texte et des correspondances manquees en recherche exacte",
        "difficulty": "high",
        "technologies": [
          "Python",
          "PostgreSQL"
        ],
        "highlights": [
          "Conception d'une logique de recherche « quasi-exacte » intermediaire entre recherche plein texte et recherche exacte, realisant une recherche terminologique de haute precision tout en tolerant les variations d'ecriture"
        ],
        "decisions": [
          {
            "title": "Conception d'une methode « quasi-exacte » ni recherche plein texte ni correspondance exacte",
            "detail": "La recherche plein texte PostgreSQL (tsvector) generait trop de resultats a cause des variations de particules et de ponctuation japonaises, tandis que la correspondance exacte manquait de nombreux resultats a cause des variations d'ecriture. Conception d'une methode intermediaire appliquant une normalisation (suppression de la ponctuation, unification des espaces, tolerance des patterns de particules) avant la comparaison de chaines, conciliant precision et rappel"
          }
        ],
        "outcomes": [
          {
            "before": "La recherche plein texte retournait des phrases sans rapport avec les termes de traduction, et la correspondance exacte ne permettait pas de trouver les exemples d'utilisation cibles en raison des variations d'ecriture",
            "after": "L'algorithme de correspondance quasi-exacte a considerablement ameliore l'utilisabilite du glossaire en retournant uniquement les exemples d'utilisation semantiquement precis tout en tolerant les variations d'ecriture, de particules et de ponctuation",
            "metric": "Amelioration de la precision de recherche du glossaire (reduction des faux positifs et amelioration du rappel)"
          }
        ],
        "challenges": [
          {
            "title": "Systematisation des patterns de variations d'ecriture du texte japonais",
            "resolution": "Collecte et classification des patterns de variations d'ecriture frequents dans les documents de traduction (melange de ponctuation, substitution de particules, melange pleine/demi-chasse). Implementation sous forme de regles de normalisation avec verification exhaustive par cas de test"
          }
        ]
      },
      {
        "title": "Parallelisation des IO reseau sequentiels des taches Celery avec asyncio",
        "summary": "Passage des IO reseau sequentiels vers plusieurs services externes (API de traduction, API de glossaire, etc.) a une execution parallele via une boucle d'evenements asyncio. Etablissement d'un pattern d'integration securise entre le modele de worker synchrone de Celery et asyncio, ameliorant la latence et le debit",
        "difficulty": "high",
        "technologies": [
          "Python",
          "Celery",
          "asyncio"
        ],
        "highlights": [
          "Etablissement d'un pattern de lancement securise de boucle d'evenements asyncio au sein d'un worker synchrone Celery, parallelisant les appels API externes precedemment sequentiels"
        ],
        "decisions": [
          {
            "title": "Adoption du pattern d'integration de boucle d'evenements asyncio au sein d'un worker synchrone Celery",
            "detail": "Adoption d'un pattern lancant une boucle d'evenements via asyncio.run() dans chaque tache tout en maintenant le modele de worker synchrone (prefork) de Celery. L'option de convertir Celery en workers async a ete ecartee en raison du risque eleve d'incompatibilite avec l'ecosysteme, et le pool de threads (ThreadPoolExecutor) a ete rejete car les threads sont inutilement monopolises en attente d'IO"
          }
        ],
        "outcomes": [
          {
            "before": "Les appels aux API de traduction et de glossaire etaient executes sequentiellement, avec un temps de traitement long par requete du a l'attente successive de 3 API externes",
            "after": "Passage a l'execution parallele des appels API externes via asyncio.gather. Reduction du temps de traitement de la somme des temps de reponse de chaque API au temps de reponse de l'API la plus lente",
            "metric": "Reduction de la latence et amelioration du debit pour les appels API externes"
          }
        ],
        "challenges": [
          {
            "title": "Coexistence du modele d'execution synchrone de Celery et d'asyncio",
            "resolution": "Les workers prefork de Celery etant bases sur des processus, adoption d'une methode creant et detruisant une boucle d'evenements asyncio dans chaque tache. En limitant le cycle de vie de la boucle d'evenements au scope de la tache, toute interference entre workers est eliminee"
          }
        ]
      },
      {
        "title": "Optimisation de l'algorithme de correspondance textuelle pour l'attribution de Content Controls",
        "summary": "Optimisation de l'algorithme de correspondance entre le texte source et la structure du document pour attribuer precisement des marqueurs aux zones de traduction. Conciliation de la precision de correspondance et des performances pour les documents volumineux",
        "difficulty": "extreme",
        "technologies": [
          "Python"
        ],
        "highlights": [
          "Optimisation de l'algorithme d'exploration, atteignant une vitesse de traitement pratique tout en maintenant la precision meme pour les documents volumineux"
        ],
        "decisions": [
          {
            "title": "Reduction de l'espace de recherche par une strategie de correspondance par etapes",
            "detail": "Adoption d'une strategie executant sequentiellement la correspondance entre le texte source et la structure du document (paragraphes, cellules, elements de liste) en 3 etapes : correspondance exacte -> correspondance normalisee -> correspondance partielle. En excluant de l'espace de recherche les zones confirmees aux etapes superieures, le volume de calcul est reduit tout en maintenant la precision"
          }
        ],
        "outcomes": [
          {
            "before": "Le traitement de correspondance etait lent pour les documents volumineux (plus de 100 pages), avec des problemes de precision d'attribution des Content Controls",
            "after": "La strategie de correspondance par etapes permet une vitesse de traitement pratique meme pour les documents volumineux. La precision de correspondance est egalement amelioree, augmentant la fiabilite de l'attribution des marqueurs aux zones de traduction",
            "metric": "Amelioration de la vitesse de correspondance et de la precision pour les documents volumineux"
          }
        ],
        "challenges": [
          {
            "title": "Compromis entre la granularite de decoupage de la structure du document et la precision de correspondance",
            "resolution": "Ajustement de la granularite de decoupage du texte selon la structure interne du document Word (paragraphes, cellules de tableau, elements de liste, en-tetes/pieds de page). Le probleme d'un decoupage trop fin augmentant les candidats de correspondance et ralentissant le traitement, ou trop grossier reduisant la precision de correspondance partielle, a ete resolu par des regles de decoupage par type d'element"
          }
        ]
      },
      {
        "title": "Modernisation de l'environnement de developpement frontend",
        "summary": "Introduction groupee de Vite, Vitest, Storybook, Biome et Playwright dans le frontend existant, renouvelant l'experience developpeur et les fondations de qualite du code. Amelioration de la vitesse de build et mise en place de la chaine d'outils : tests unitaires, catalogue UI, linter/formatter et tests E2E",
        "difficulty": "high",
        "technologies": [
          "Vite",
          "Vitest",
          "Storybook",
          "Biome",
          "Playwright"
        ],
        "highlights": [
          "Introduction de 5 outils Vite/Vitest/Storybook/Biome/Playwright et construction des fondations de tests, gestion de qualite et catalogue UI a partir de zero"
        ],
        "decisions": [
          {
            "title": "Selection de Vite + Biome (abandon de webpack + ESLint/Prettier)",
            "detail": "Migration de l'environnement de build base sur webpack vers Vite et unification d'ESLint+Prettier en Biome. Amelioration significative de la vitesse d'iteration de developpement grace au hot reload rapide de Vite et au lint/format performant de Biome"
          },
          {
            "title": "Unification de la gestion des versions Node.js par l'introduction de Volta",
            "detail": "Resolution par Volta du probleme d'erreurs de build sporadiques causees par les divergences de versions Node.js au sein de l'equipe. Fixation de la version a la racine du projet, eliminant les differences d'environnement entre les membres"
          }
        ],
        "outcomes": [
          {
            "before": "Aucun test unitaire, catalogue UI, linter ni test E2E — absence de moyen objectif de verification de la qualite du code",
            "after": "Introduction integree de 5 outils : Vite (build), Vitest (tests unitaires), Storybook (catalogue UI), Biome (lint/format) et Playwright (E2E), renouvelant les fondations de developpement",
            "metric": "Etablissement des fondations de tests et de gestion de qualite (construction a partir de zero)"
          }
        ],
        "challenges": [
          {
            "title": "Coexistence du projet PHP existant avec Vite",
            "resolution": "Conception d'une configuration hybride ne perturbant pas l'environnement PHP+jQuery existant, gerant uniquement la partie React avec Vite. Configuration permettant une migration incrementale en chargeant la sortie du build Vite depuis les templates PHP"
          }
        ]
      },
      {
        "title": "Generation automatique de mocks frontend a partir de la specification OpenAPI du backend Python",
        "summary": "Construction d'un mecanisme de generation automatique de definitions de types TypeScript, de clients API et de handlers de mock via MSW (Mock Service Worker) et Orval a partir de la specification OpenAPI generee automatiquement par FastAPI. Le developpement frontend n'a plus besoin d'attendre l'implementation backend",
        "difficulty": "high",
        "technologies": [
          "MSW",
          "Orval",
          "FastAPI",
          "Storybook"
        ],
        "highlights": [
          "Construction d'un pipeline de generation automatique de definitions de types, clients API et mocks a partir de la specification OpenAPI, eliminant la dependance du frontend envers le backend"
        ],
        "decisions": [
          {
            "title": "Pipeline de generation automatique de mocks avec la specification OpenAPI comme source unique de verite",
            "detail": "Conception d'un pipeline utilisant la specification OpenAPI generee automatiquement par FastAPI comme unique source de verite, generant les definitions de types TypeScript et clients API via Orval, et les handlers de mock via MSW. La methode de redaction manuelle des mocks rendant difficile le suivi des modifications d'API, la generation automatique a partir de la specification garantit simultanement la securite des types et la fidelite des mocks"
          }
        ],
        "outcomes": [
          {
            "before": "Le developpement frontend devait attendre la completion de l'implementation des API backend, empechant le developpement en parallele",
            "after": "Grace a la generation automatique de mocks a partir de la specification OpenAPI, le developpement frontend peut demarrer des que la definition API backend est finalisee. Les mocks API fonctionnent egalement sur Storybook, permettant de verifier le fonctionnement de l'UI sans backend",
            "metric": "Etablissement du parallelisme de developpement frontend/backend"
          }
        ],
        "challenges": [
          {
            "title": "Maintien de la coherence des types entre le schema OpenAPI et Orval/MSW",
            "resolution": "Automatisation de la regeneration a partir du schema OpenAPI en CI, construction d'un mecanisme ou les definitions de types et mocks frontend suivent automatiquement les modifications d'API backend. Les incoherences de types sont immediatement detectees comme erreurs de compilation TypeScript"
          }
        ]
      },
      {
        "title": "Construction d'une infrastructure de deploiement en mode pull avec Docker Compose + GHCR",
        "summary": "Creation de scripts d'automatisation pour l'ensemble du processus : build avec Docker Compose -> push vers GHCR -> deploiement en mode pull sur le serveur de production. Mise en place de la gestion des images GHCR, des parametres de visibilite/permissions et du deploiement par pull base sur cron en production",
        "difficulty": "high",
        "technologies": [
          "Docker",
          "GitHub Actions"
        ],
        "highlights": [
          "Migration du deploiement manuel SSH+SCP vers un deploiement en mode pull Docker Compose+GHCR, etablissant un flux de deploiement reproductible"
        ],
        "decisions": [
          {
            "title": "Adoption du deploiement en mode pull GHCR (migration depuis la methode manuelle SSH+SCP)",
            "detail": "Migration de la methode de deploiement ou le developpeur se connectait au serveur par SSH et uploadait les fichiers par SCP, vers un deploiement en mode pull ou les images sont poussees vers GHCR et le serveur de production les recup via cron. Garantie de la reproductibilite du deploiement et possibilite de rollback immediat par changement de tag d'image"
          },
          {
            "title": "Conception de la gestion des images et des parametres de visibilite/permissions GHCR",
            "detail": "Gestion de la visibilite des images GitHub Container Registry au niveau de l'organisation, et mise en place des parametres de permissions necessaires pour le pull depuis le serveur de production (Personal Access Token + scope read:packages). Conception egalement de la convention de nommage des tags d'images"
          }
        ],
        "outcomes": [
          {
            "before": "Le deploiement etait manuel par SSH+SCP, dependant des personnes, avec un risque d'incident du a des erreurs de procedure. Aucun moyen de rollback",
            "after": "Reproductibilite assuree par le deploiement en mode pull Docker Compose+GHCR. Rollback facilite grace au pull automatique base sur cron et a la gestion des tags d'images",
            "metric": "Automatisation et reproductibilite du deploiement"
          }
        ],
        "challenges": [
          {
            "title": "Garantie de la fiabilite du deploiement par pull base sur cron",
            "resolution": "Integration dans le script de pull d'un health check, d'une detection de difference d'image et d'une fonction de rollback. En cas d'echec du pull d'une nouvelle image, le conteneur existant est maintenu"
          }
        ]
      },
      {
        "title": "Configuration TLS/CORS du serveur OnlyOffice controlable par variables d'environnement Docker",
        "summary": "Configuration de la mise en place des certificats TLS et des parametres CORS d'origine du serveur de documents OnlyOffice via des variables d'environnement lors du demarrage Docker par injection de script. Facilitation du changement de configuration par environnement",
        "difficulty": "medium",
        "technologies": [
          "Docker"
        ],
        "highlights": [
          "Adoption d'une approche de controle par variables d'environnement via injection de script au demarrage, sans edition directe des fichiers de configuration OnlyOffice"
        ],
        "decisions": [
          {
            "title": "Externalisation de la configuration OnlyOffice par injection de script",
            "detail": "La methode de montage direct des fichiers de configuration OnlyOffice posant des problemes de compatibilite lors des mises a jour de version, adoption d'une methode de generation dynamique des fichiers de configuration a partir des variables d'environnement via un script entrypoint au demarrage Docker. Le chemin des certificats TLS et l'origine CORS sont desormais modifiables par variables d'environnement"
          }
        ],
        "outcomes": [
          {
            "before": "Les parametres TLS/CORS d'OnlyOffice etaient codes en dur dans les fichiers de configuration, necessitant une edition manuelle lors du changement d'environnement",
            "after": "Controle du chemin des certificats TLS et de l'origine CORS par variables d'environnement Docker, automatisant le changement de configuration entre les environnements de developpement, staging et production",
            "metric": "Automatisation du changement d'environnement et externalisation de la configuration"
          }
        ]
      },
      {
        "title": "Documentation des procedures de construction de l'environnement de developpement E2E mixte local/distant",
        "summary": "Elaboration d'une documentation reproductible pour les procedures de construction d'un environnement de developpement E2E combinant React+Python local et PHP sur un serveur distant. Redaction d'un guide incluant Docker Compose, configuration reseau et gestion des variables d'environnement, optimisant l'onboarding des nouveaux membres",
        "difficulty": "medium",
        "technologies": [
          "Docker",
          "Python",
          "FastAPI"
        ],
        "highlights": [
          "Documentation des procedures de reproduction de l'environnement mixte local/distant, reduisant le temps de mise en place pour les nouveaux membres"
        ],
        "decisions": [
          {
            "title": "Standardisation des procedures de mise en place de l'environnement par integration Docker Compose",
            "detail": "Consolidation dans un seul document de la configuration reseau Docker Compose, des modeles de variables d'environnement et des procedures de verification de connexion pour faire communiquer les conteneurs React+Python locaux avec PHP+OnlyOffice sur le serveur distant. L'objectif est qu'un nouveau membre puisse reproduire l'environnement E2E en suivant simplement le document"
          }
        ],
        "outcomes": [
          {
            "before": "Les procedures de mise en place de l'environnement etaient transmises oralement et dependaient des personnes, la construction de l'environnement d'un nouveau membre prenant 1 a 2 jours",
            "after": "Le guide de procedures reproductible elimine la dependance aux personnes pour la mise en place de l'environnement. Documentation etape par etape incluant Docker Compose, configuration reseau et variables d'environnement",
            "metric": "Optimisation de l'onboarding des nouveaux membres"
          }
        ]
      },
      {
        "title": "Construction de l'environnement de tests E2E Playwright et implementation des scenarios de test",
        "summary": "Construction avec Playwright d'un environnement de tests E2E couvrant l'ensemble du workflow de traduction integrant React/Python/OnlyOffice. Les elements Canvas d'OnlyOffice ayant des limites pour les tests E2E, separation claire entre le perimetre automatisable et le perimetre de tests manuels",
        "difficulty": "high",
        "technologies": [
          "Playwright",
          "Docker"
        ],
        "highlights": [
          "Implementation de scenarios de tests de regression pour l'ensemble du workflow de traduction, avec separation claire entre le perimetre automatisable et le perimetre de tests manuels"
        ],
        "decisions": [
          {
            "title": "Delimitation claire entre le domaine automatisable et le domaine de tests manuels",
            "detail": "Les operations dependant des elements Canvas de l'editeur OnlyOffice etant difficiles a tester de maniere stable avec Playwright en E2E, les sujets de test ont ete divises en « flux d'operations du workflow de traduction et integration API » et « operations de document dans OnlyOffice », seul le premier etant couvert par les tests E2E"
          }
        ],
        "outcomes": [
          {
            "before": "Absence d'environnement de tests E2E, les tests de regression lors des ajouts de fonctionnalites ou refactoring etaient exclusivement manuels",
            "after": "Implementation avec Playwright de scenarios de tests de regression pour l'ensemble du workflow de traduction (upload de fichier -> execution de la traduction -> verification des resultats). Les tests d'integration React+Python+PostgreSQL peuvent desormais s'executer automatiquement dans l'environnement Docker",
            "metric": "Automatisation des tests de regression par E2E (couverture du perimetre testable)"
          }
        ],
        "challenges": [
          {
            "title": "Construction de l'environnement de test d'integration des 3 services React+Python+OnlyOffice",
            "resolution": "Conception d'une configuration reseau permettant au test runner Playwright d'acceder aux 3 services demarres de maniere integree via Docker Compose. Gestion des donnees initiales de test et du nettoyage sous forme de fixtures, garantissant l'independance des tests"
          }
        ]
      },
      {
        "title": "Construction du tableau de bord d'efficacite de developpement, MCP d'agregation de logs et agent de generation de Stories",
        "summary": "Creation d'un tableau de bord visualisant le statut d'execution des taches Celery et les taux de succes/echec de la verification de traduction. Construction egalement d'un serveur MCP permettant la recherche de logs d'environnement distribue depuis Claude Code, et d'un sous-agent generant automatiquement des Storybook Stories a partir de composants, ameliorant l'efficacite de developpement",
        "difficulty": "medium",
        "technologies": [
          "Python",
          "Storybook",
          "agent-browser"
        ],
        "highlights": [
          "Construction d'une infrastructure de support au developpement exploitant les outils IA : recherche de logs par serveur MCP et agent de generation automatique de Stories"
        ],
        "decisions": [
          {
            "title": "Integration des logs distribues dans Claude Code via serveur MCP",
            "detail": "Construction d'un serveur MCP permettant la recherche transversale depuis Claude Code des logs distribues dans les conteneurs React, Python et Celery. Auparavant les logs etaient consultes individuellement via docker logs + grep, mais la mise en outil MCP permet la recherche et le filtrage des logs directement depuis la conversation Claude Code"
          },
          {
            "title": "Generation automatique de Storybook Stories par agent-browser",
            "detail": "Construction d'un sous-agent generant automatiquement des Storybook Stories a partir des composants React existants. Analyse de l'implementation des composants par agent-browser et generation automatique de fichiers Story couvrant les patterns de props et d'etats, accelerant la constitution du catalogue UI"
          }
        ],
        "outcomes": [
          {
            "before": "La consultation des logs des conteneurs distribues necessitait l'execution manuelle de docker logs + grep, rendant l'investigation des incidents chronophage. Les Storybook Stories etaient egalement creees manuellement pour chaque composant UI",
            "after": "Recherche transversale des logs depuis Claude Code rendue possible par le serveur MCP. Creation d'un tableau de bord visualisant le statut d'execution des taches Celery et les taux de succes/echec de la verification de traduction, ameliorant l'efficacite d'investigation des incidents et du suivi qualite",
            "metric": "Amelioration de l'investigation des incidents et de l'efficacite de developpement, acceleration de la constitution du catalogue UI"
          }
        ]
      }
    ]
  },
  {
    "id": "learning-platform-consulting-2025",
    "company": "Entreprise de plateforme d'apprentissage en ligne de taille intermediaire",
    "companyDesc": "Entreprise fournissant une plateforme d'apprentissage en ligne de taille intermediaire. Analyse technique et proposition de support pour les demandes d'extension a court terme du systeme integre de gestion.",
    "role": "Investigation technique et redaction de documentation",
    "roles": ["Consulting"],
    "period": "2025-05 — 2025-07",
    "teamSize": 2,
    "summary": "Quantification de la qualite du systeme legacy VBScript/Oracle via SonarQube, et support a la selection strategique par une matrice de comparaison a 3 options (modification/ERP/extension navigateur). Construction egalement d'une base de recherche RAG pour les documents internes via NotebookLM+markitdown. Resultats obtenus en environ 2 mois de conseil court terme grace a l'utilisation d'outils IA generative",
    "technologies": [
      "SonarQube",
      "NotebookLM",
      "markitdown",
      "Claude",
      "Cursor",
      "ChatGPT",
      "Genspark",
      "Gamma",
      "Canva",
      "Mermaid"
    ],
    "tasks": [
      {
        "title": "Construction d'une base de recherche RAG pour les documents internes",
        "summary": "Conversion des documents internes en Markdown via markitdown avec traitement de segmentation, et mise en place d'un environnement de recherche RAG via NotebookLM. Integration de Claude Desktop + SonarQube via MCP pour optimiser le flux d'extraction et de formatage des points cles des problemes de qualite.",
        "difficulty": "medium",
        "technologies": [
          "SonarQube",
          "NotebookLM",
          "markitdown",
          "Claude"
        ],
        "highlights": [
          "Conception de l'architecture de la base de recherche RAG via NotebookLM+markitdown et construction du pipeline de conversion de documents",
          "Proposition d'une approche a faible cout et delai court par l'utilisation de SaaS existants (NotebookLM) plutot que le developpement d'un RAG personnalise"
        ],
        "decisions": [
          {
            "title": "Construction RAG a faible effort via NotebookLM + markitdown",
            "detail": "Utilisation de NotebookLM de Google, avec conversion des documents internes (PDF/Word/Excel) en texte via markitdown. Minimisation des couts par l'utilisation de SaaS existants plutot que la construction d'un RAG personnalise"
          }
        ],
        "outcomes": [
          {
            "before": "Les documents internes etaient disperses dans les serveurs de fichiers et le stockage cloud des differents departements, sans possibilite de recherche transversale. La recherche d'informations necessaires etait chronophage",
            "after": "Construction d'une base de recherche RAG via NotebookLM + markitdown. Conversion des documents internes en Markdown pour permettre la recherche transversale en langage naturel. Realisation d'un environnement de recherche fonctionnel en environ 2 semaines de conseil",
            "metric": "Optimisation de la recherche de documents internes"
          }
        ],
        "challenges": [
          {
            "title": "Conversion de documents internes de formats divers en format exploitable par la recherche RAG",
            "resolution": "Conversion de PDF/Word/Excel en format Markdown via markitdown. Construction d'un pipeline de conversion preservant autant que possible les informations structurelles (titres, tableaux, listes). Verification manuelle de la qualite des Markdown convertis et correction si necessaire avant injection dans NotebookLM"
          }
        ]
      },
      {
        "title": "Investigation de la structure du code du systeme legacy et analyse d'extensibilite",
        "summary": "Analyse statique du systeme legacy VBScript/Oracle avec Cursor/SonarQube/Claude Desktop. Analyse de l'extensibilite, de la difficulte de modification et des dependances, et elaboration/comparaison des options ERP, modification existante et extension.",
        "difficulty": "medium",
        "technologies": [
          "SonarQube",
          "Cursor",
          "ChatGPT",
          "Claude"
        ],
        "highlights": [
          "Realisation d'une analyse statique via SonarQube et creation d'un rapport d'evaluation des risques de modification par module",
          "Fourniture des bases d'adoption de l'approche d'extension navigateur grace a la visualisation des risques de modification basee sur des donnees quantitatives"
        ],
        "decisions": [
          {
            "title": "Quantification de la qualite du code legacy par SonarQube",
            "detail": "Analyse statique de l'ensemble du code via SonarQube, mesurant quantitativement les indicateurs de bugs, code smells, taux de duplication et couverture de tests. Preparation de donnees permettant une evaluation objective des risques de modification"
          },
          {
            "title": "Proposition de priorites de modification basee sur des donnees quantitatives",
            "detail": "Organisation des resultats d'analyse statique par module, avec cartographie des zones a haut risque de modification et de leur perimetre d'impact. Proposition de priorites de modification basee sur des arguments quantitatifs"
          }
        ],
        "outcomes": [
          {
            "before": "Absence d'evaluation objective de la qualite du code, risques de modification incertains",
            "after": "Evaluation quantitative de la qualite du code par analyse SonarQube. Identification des zones a haut risque de modification et visualisation de l'ensemble de la dette technique",
            "metric": "Objectivation des risques de modification basee sur une evaluation quantitative. Utilise comme base d'adoption de l'approche d'extension navigateur"
          }
        ],
        "challenges": [
          {
            "title": "Investigation dans un environnement legacy sans gestion de version ni tests",
            "resolution": "Quantification de la qualite par analyse statique SonarQube et investigation sans impact sur l'environnement de production via connexion a un replica en lecture seule de la base Oracle. Compilation des resultats d'analyse en rapport format slide et visualisation des risques techniques pour la direction"
          }
        ]
      },
      {
        "title": "Conception de PoC d'extension a court terme et redaction de documents d'aide a la decision",
        "summary": "Creation de documents de proposition utilisant activement des diagrammes de flux et de structure en notation Mermaid. Acceleration de la production de documents par iterations courtes grace a l'utilisation d'IA generatives telles que Genspark, Gamma et Canva.",
        "difficulty": "medium",
        "technologies": [
          "Genspark",
          "Gamma",
          "Canva",
          "Mermaid"
        ],
        "highlights": [
          "Conception d'une matrice de comparaison a 3 options sur 7 axes d'evaluation et d'un arbre de decision, et elaboration de l'architecture PoC de l'extension navigateur React",
          "Classification des demandes de 6 departements en 3 niveaux : « realisable par extension / modification necessaire / en attente ERP », avec presentation des perspectives de realisation a chaque departement"
        ],
        "decisions": [
          {
            "title": "Support a la selection strategique par un framework de comparaison a 3 options",
            "detail": "Creation d'une matrice comparant 3 options sur 7 axes d'evaluation (risque de developpement, cout, delai, assurance qualite, impact operationnel, extensibilite, ROI) et visualisation du flux de decision sous forme d'arbre de decision"
          },
          {
            "title": "Proposition d'une approche d'amelioration a faible risque par extension navigateur React",
            "detail": "Proposition d'une approche superposant une UI React sur l'ecran legacy sous forme d'extension Chrome. Conception de PoC implementant cote frontend un dropdown hierarchique du master de remises, etc., sans modifier la base de donnees ni la logique backend existantes"
          }
        ],
        "outcomes": [
          {
            "before": "Absence de criteres de jugement entre les multiples approches d'extension (modification/ERP/extension), empechant la prise de decision par la direction",
            "after": "Support a la selection strategique par matrice de comparaison a 3 options + arbre de decision. Conception de l'architecture PoC de l'extension navigateur React (Lambda+S3+IndexedDB+Chrome Extension) et presentation d'orientations d'implementation concretes pour le cas d'usage de flexibilisation des criteres de remise",
            "metric": "L'extension navigateur approuvee comme mesure a court terme. L'implementation ERP lancee en reflexion budgetaire separee comme plan a moyen/long terme de 2-3 ans"
          }
        ],
        "challenges": [
          {
            "title": "Consolidation des demandes de 6 departements et classification de faisabilite",
            "resolution": "Consolidation de toutes les demandes issues des entretiens dans un fichier Excel, classification en 3 niveaux : « realisable par extension navigateur », « modification du code existant necessaire », « en attente ERP ». Affichage des priorites par etoiles et visualisation du stade de realisation de chaque demande departementale"
          }
        ]
      }
    ]
  },
  {
    "id": "ai-translation-qcd-2025",
    "company": "Startup nationale de SaaS de traduction par IA generative",
    "companyDesc": "Startup nationale fournissant un SaaS de traduction par IA generative. En charge de la proposition de mesures d'amelioration QCD (Qualite, Cout, Delai) axees sur les ressources humaines de l'organisation de developpement.",
    "role": "Conseiller en organisation de developpement",
    "roles": ["Consulting"],
    "period": "2025-04 — 2025-07",
    "teamSize": 2,
    "summary": "Analyse structurelle des problematiques QCD (Qualite, Cout, Delai) d'une organisation de developpement d'environ 30 personnes en tant que conseiller externe. Structuration de 100 hypotheses par MECE x Issue Tree et objectivation des priorites d'action par scoring pondere a 5 axes. Creation d'une feuille de route d'execution en 6 phases et de documents de proposition pour la direction, avec obtention de l'approbation du COO en comite de direction",
    "technologies": [
      "SonarQube",
      "Cursor",
      "NotebookLM",
      "ChatGPT",
      "Gamma",
      "Mermaid",
      "Gemini",
      "Genspark"
    ],
    "tasks": [
      {
        "title": "Analyse structurelle des problematiques QCD de l'organisation de developpement",
        "summary": "Investigation des causes de la baisse de velocite et de qualite du developpement, et organisation des problematiques techniques et organisationnelles. Approfondissement des problemes structurels de l'organisation d'ingenieurs : gestion du code, dispositif de revue, procedures de release, structure de dependance aux personnes cles.",
        "difficulty": "high",
        "technologies": [
          "SonarQube",
          "Cursor",
          "NotebookLM"
        ],
        "highlights": [
          "Structuration de 100 hypotheses par MECE x Issue Tree et extraction de 8 problematiques majeures par scoring a 5 axes. Description neutre des problematiques liees a la politique organisationnelle en les formulant comme problemes systemiques"
        ],
        "decisions": [
          {
            "title": "Approche de structuration de 100 hypotheses par MECE x Issue Tree",
            "detail": "Combinaison des methodes MECE (Mutuellement Exclusif, Collectivement Exhaustif) et Issue Tree, avec un scoring quantitatif a 5 axes (contribution a la vitesse de release, contribution au taux de bugs, facilite d'execution, facilite de mesure, lead time) pour enumerer et evaluer exhaustivement 100 hypotheses"
          },
          {
            "title": "Classement par importance des 8 problematiques majeures et cartographie de la structure organisationnelle",
            "detail": "Approfondissement prioritaire de 3 problematiques directement liees aux implementeurs sur la base du critere de contribution a la problematique principale « deterioration de la livraison de l'application existante », et organisation des 5 problematiques restantes par partie prenante. Classement des 8 problematiques par ordre d'importance"
          }
        ],
        "outcomes": [
          {
            "before": "Problematiques fragmentees sans vision d'ensemble. Resultats d'entretiens subjectifs rendant impossible la determination des priorites",
            "after": "Structuration de 100 hypotheses par MECE x Issue Tree et extraction de 8 problematiques majeures par scoring a 5 axes. Construction d'une cartographie des problematiques exploitable par la direction pour la prise de decision",
            "metric": "Structuration complete de 100 hypotheses en 8 problematiques majeures. Evaluation quantitative realisee avec des scores de 4,35 (maximum) a 1,9 (minimum)"
          }
        ],
        "challenges": [
          {
            "title": "Structuration des problematiques en l'absence de donnees quantitatives",
            "resolution": "Adoption d'une methode ne dependant pas de donnees quantitatives : structuration des hypotheses par MECE x Issue Tree et evaluation relative par scoring a 5 axes. Construction d'un framework propre convertissant le contenu des entretiens en « poids des problematiques »"
          },
          {
            "title": "Description neutre des problematiques liees a la politique organisationnelle",
            "resolution": "Description sans mention de noms de personnes, formulee comme problemes systemiques tels que « structure de prise de decision » et « ambiguite des pouvoirs d'approbation ». Les solutions proposees sont egalement formulees comme conception institutionnelle plutot que critique personnelle"
          }
        ]
      },
      {
        "title": "Construction du cadre d'evaluation des mesures d'amelioration QCD et de la matrice de priorites d'execution",
        "summary": "Investigation et organisation des mesures d'amelioration centrees sur les axes Qualite, Cout et Delai. Evaluation quantitative « Impact x Faisabilite » pour chaque mesure. Implementation dans les documents d'une matrice ponderee, d'un graphique de priorites, et presentation d'un plan d'execution par etapes via diagramme de Gantt et schema de delimitation des responsabilites.",
        "difficulty": "high",
        "technologies": [
          "ChatGPT",
          "Gamma",
          "Mermaid"
        ],
        "highlights": [
          "Conception d'une fonction de scoring pondere a 5 axes et generation automatique d'une feuille de route en 6 phases x 3 semaines via la fonction RANK.EQ"
        ],
        "decisions": [
          {
            "title": "Objectivation des priorites d'action par scoring pondere a 5 axes",
            "detail": "Conception d'une fonction de scoring ponderee sur 5 axes : contribution Q (0,1), contribution C (0,1), contribution D (0,4), cout financier (0,1), charge de travail requise (0,3). Distribution des poids privilegiant la contribution au Delai (D) et la charge de travail"
          },
          {
            "title": "Conception d'une feuille de route de deploiement par etapes en 6 phases x 3 semaines",
            "detail": "Mappage automatique du classement par score en numeros de phase via la fonction RANK.EQ, et generation automatique d'un diagramme de Gantt en 6 phases x 3 semaines. Positionnement de 4 a 5 mesures par phase, avec les resultats de la phase precedente servant de prerequis a la phase suivante pour un deploiement progressif"
          }
        ],
        "outcomes": [
          {
            "before": "Priorites indeterminees pour 27 mesures, retardant la prise de decision de la direction",
            "after": "Construction d'un plan d'execution permettant de visualiser l'avancement sur une base mensuelle grace au scoring pondere a 5 axes + feuille de route en 6 phases",
            "metric": "Priorites du Top 5 des mesures approuvees en un seul comite de direction. Objectifs cibles : amelioration de 30% de la vitesse de release et reduction de 30% du taux de bugs en 4 mois"
          }
        ],
        "challenges": [
          {
            "title": "Construction d'un framework d'evaluation objective des priorites d'action",
            "resolution": "Implementation du scoring pondere a 5 axes dans Excel, avec accord prealable sur les bases de ponderation avec le COO pour garantir l'objectivite et la transparence des resultats du scoring"
          }
        ]
      },
      {
        "title": "Conception et creation des documents de presentation pour le comite de direction",
        "summary": "Pour faciliter le consensus avec les parties prenantes non-techniques, utilisation intensive de diagrammes de flux, diagrammes de sequence et arbres de decision en notation Mermaid. Direction de la creation de documents d'aide a la decision executive en exploitant la base RAG de NotebookLM.",
        "difficulty": "medium",
        "technologies": [
          "NotebookLM",
          "Gemini",
          "Genspark",
          "Mermaid"
        ],
        "highlights": [
          "Direction de la creation de documents de proposition en 2 parties (23+10 slides) pour la direction. Redefinition des problematiques techniques comme impacts QCD et explication par chaines de causalite"
        ],
        "decisions": [
          {
            "title": "Conception de documents de proposition en 2 parties (optimisation des ressources humaines + refonte de la base de gestion des tickets)",
            "detail": "Conception en 2 parties : « Proposition d'optimisation des ressources humaines de l'organisation de developpement pour l'activite de traduction IA » (23 slides, vue d'ensemble) et « Amelioration QCD par la refonte de la base de gestion des tickets » (10 slides, approfondissement)"
          },
          {
            "title": "Proposition de base unifiee Jira et aide a la decision par comparaison d'outils",
            "detail": "Creation d'un tableau comparatif de 4 options (Notion, Planio, Notion+Planio combine, Jira) sur 5 axes : flexibilite de la structure des tickets, collaboration inter-departements, UI/UX, conception des workflows, integration avec d'autres outils. Recommandation de Jira + Jira Service Management"
          }
        ],
        "outcomes": [
          {
            "before": "Absence de moyens d'explication des problematiques techniques a la direction, rendant difficile l'approbation des investissements d'amelioration",
            "after": "Visualisation de la vue d'ensemble de l'amelioration QCD et des mesures concretes via des documents de proposition en 2 parties (23 slides + 10 slides). Aide a la decision par tableaux de comparaison d'outils et diagrammes RACI",
            "metric": "Approbation par le COO de la realisation du PoC. Decision de lancement de la verification de l'unification de la gestion des tickets et de l'introduction de Jira"
          }
        ],
        "challenges": [
          {
            "title": "Explication des problematiques techniques a la direction non-technique",
            "resolution": "Redefinition des problematiques techniques comme impacts QCD (Qualite, Cout, Delai) et explication par chaines de causalite telles que « fuite de bugs -> charge de retravail -> augmentation des couts ». Definition d'objectifs KPI (reduction de 40% du taux de bugs, reduction de 25% du lead time) et quantification de l'effet d'amelioration"
          }
        ]
      }
    ]
  },
  {
    "id": "factory-maintenance-app-2024",
    "company": "Startup d'applications metier pour l'industrie manufacturiere",
    "companyDesc": "Startup SaaS soutenant les operations de maintenance des equipements industriels. En charge du developpement full-stack de l'application de maintenance des equipements.",
    "role": "Ingenieur full-stack",
    "roles": ["Frontend", "Backend", "Infra"],
    "period": "2024-10 — 2025-03",
    "teamSize": 4,
    "summary": "SaaS multi-tenant de gestion de la maintenance et de l'inspection des equipements industriels. Responsabilite complete du backend NestJS + GraphQL + PostgreSQL et du frontend React + Apollo Client. Conception et implementation des fonctionnalites cles : taches recurrentes conformes RFC5545, controle d'acces RBAC+ReBAC a 3 axes, interface calendrier style Google Calendar, sauvegarde incrementale par champ",
    "technologies": [
      "TypeScript",
      "React",
      "Apollo Client",
      "NestJS",
      "Prisma",
      "GraphQL",
      "Apollo Server",
      "Redis",
      "PostgreSQL",
      "CASL",
      "CSS",
      "React Hook Form",
      "Zod",
      "Storybook",
      "Playwright",
      "Vitest"
    ],
    "tasks": [
      {
        "title": "Conception et implementation de la fonctionnalite de taches recurrentes conforme RFC5545",
        "summary": "Couverture des recurrences annuelles, mensuelles (nieme semaine/jour du mois), hebdomadaires (jours multiples) et quotidiennes, avec gestion de la mise a jour en lot, du saut et des conditions de fin. Conception du schema, de l'API et du batch separant entites non materialisees et materialisees tout en les affichant de maniere integree sur un meme ecran. Adoption d'une architecture de materialisation batch J-1 via Redis+SQS+EventBridge.",
        "difficulty": "extreme",
        "technologies": [
          "TypeScript",
          "React",
          "Apollo Client",
          "NestJS",
          "Prisma",
          "GraphQL",
          "Apollo Server",
          "Redis",
          "PostgreSQL"
        ],
        "highlights": [
          "Analyse de la specification RFC5545 et conception de l'architecture de deploiement des regles de recurrence, de gestion des exceptions et de materialisation batch. Redaction de documents de specification et de retrospective, documentant systematiquement les intentions de conception et les alternatives",
          "Implementation du SQL/API de fusion entites materialisees/non materialisees via generate_series + UNION ALL + DISTINCT ON"
        ],
        "decisions": [
          {
            "title": "Adoption de la materialisation batch J-1 (EventBridge+SQS)",
            "detail": "Adoption de la materialisation batch J-1 via EventBridge+SQS+NestJS SQS Consumer"
          },
          {
            "title": "Methode de fusion entites materialisees/non materialisees via generate_series + UNION ALL",
            "detail": "Deploiement des dates via generate_series de PostgreSQL, restauration de 20+ colonnes a partir de la definition JSON du template, deduplication par DISTINCT ON apres UNION ALL avec les enregistrements d'entites"
          },
          {
            "title": "Integration de 3 modeles temporels dans un modele unique",
            "detail": "Adoption d'une conception integrant 3 modeles temporels (date seule, avec horaire, avec periode) dans un modele unique pour assurer la compatibilite avec le systeme existant. Documentation d'une conception d'extension prevoyant le concept de timeModel cote template en vue d'une separation future"
          }
        ],
        "outcomes": [
          {
            "before": "Fonctionnalite de taches recurrentes non implementee, les inspections regulieres quotidiennes/hebdomadaires etaient creees manuellement",
            "after": "Mise en production de la fonctionnalite de regles de recurrence conforme RFC5545, permettant la generation automatique de taches recurrentes Daily/Weekly/Monthly",
            "metric": "Reduction de la charge de creation manuelle des inspections regulieres"
          },
          {
            "before": "Les discussions de conception des recurrences ne convergeaient pas, les specifications etaient dispersees",
            "after": "Redaction de documents de specification et de retrospective, systematisant les problemes de l'implementation actuelle et la conception ideale. Elaboration d'une feuille de route d'amelioration en 6 phases",
            "metric": "Capitalisation organisationnelle des connaissances de conception et clarification de la feuille de route d'amelioration"
          }
        ],
        "challenges": [
          {
            "title": "Conception des regles de recurrence integrant 3 modeles temporels dans un modele unique",
            "resolution": "Demarrage par une implementation minimale (date seule, sans horaire) et documentation de la conception ideale avec concept de timeModel cote template sous forme de specification. Clarification du chemin de migration vers la separation des 3 modeles"
          },
          {
            "title": "SQL de 300+ lignes pour la restauration de tous les champs a partir de la definition JSONB du template",
            "resolution": "Construction progressive d'une chaine de CTE de 300+ lignes, avec separation claire des responsabilites de chaque CTE aux etapes : deploiement des regles de recurrence -> generation des dates -> generation des taches non materialisees -> fusion avec les taches materialisees -> deduplication. Maintien d'une structure maintenable tout en decrivant en detail dans le document de retrospective les conceptions ideales comme la migration vers la methode de reference au template"
          },
          {
            "title": "Materialisation batch forcee par les contraintes de l'API pivot du tableau de bord",
            "resolution": "Construction d'une chaine de CTE dans le SQL convertissant les taches non materialisees en structure de colonnes identique aux enregistrements d'entites. Analyse detaillee dans le document de retrospective d'une alternative d'agregation en 2 etapes + fusion dans la couche applicative utilisant la loi d'associativite de COUNT/SUM (avec demonstration mathematique)"
          }
        ]
      },
      {
        "title": "Conception, consensus et implementation du controle d'acces a 3 axes : Perimetre x Ressource x Action",
        "summary": "Definition des permissions sur 3 axes : perimetre (siege/usine, etc.) x ressource x action. Comparaison de 2 approches (configuration individuelle vs attribution de roles) et obtention du consensus par facilitation. Gestion coherente de l'autorisation API et du controle d'affichage UI via CASL Ability.",
        "difficulty": "high",
        "technologies": [
          "TypeScript",
          "React",
          "NestJS",
          "GraphQL",
          "CASL"
        ],
        "highlights": [
          "Conception d'un modele ACL hybride RBAC+ReBAC et verification exhaustive de plus de 30 cas d'utilisation. Documentation detaillee des fondements des decisions et des alternatives dans le document de conception",
          "Comparaison de 2 approches (configuration individuelle vs attribution de roles) et facilitation du consensus de conception au sein de l'equipe"
        ],
        "decisions": [
          {
            "title": "Adoption du modele ACL hybride RBAC+ReBAC",
            "detail": "Couche base de donnees : hybride RBAC+ReBAC (extensible vers ABAC a l'avenir), couche UI : publication progressive en 3 phases"
          },
          {
            "title": "Evaluation des permissions Deny-by-default + methode template",
            "detail": "Refus par defaut, si au moins un deny explicite alors deny, sinon si au moins un allow alors allow, sinon deny — evaluation en 3 niveaux"
          },
          {
            "title": "Heritage hierarchique optionnel via scopeType+inheritChildren",
            "detail": "Ajout d'un indicateur d'heritage a l'attribution de role par perimetre, permettant d'activer ou desactiver l'heritage lors de l'attribution du role"
          }
        ],
        "outcomes": [
          {
            "before": "Controle d'acces non implemente, tous les utilisateurs pouvaient acceder a toutes les donnees",
            "after": "Conception et obtention du consensus pour un systeme ACL RBAC+ReBAC avec hierarchie de perimetre a 3 niveaux (organisation > site > projet) et 5 types de templates definis par le systeme",
            "metric": "Conception du modele ACL completee et consensus d'equipe obtenu"
          },
          {
            "before": "Exigences ACL dispersees, verification exhaustive de plus de 30 cas d'utilisation impossible",
            "after": "Redaction du document de conception et du tableau de verification des cas d'utilisation. Confirmation de la couverture de 12 cas d'utilisation (affectation multi-usines, ingenieurs externes, auditeurs, etc.)",
            "metric": "Verification exhaustive des exigences et documentation de la conception"
          }
        ],
        "challenges": [
          {
            "title": "Equilibre de la conception de la hierarchie des permissions dans un SaaS multi-tenant",
            "resolution": "Conciliation de la flexibilite et de la facilite de gestion via l'optionnalisation de l'heritage par indicateur et une structure a 2 couches : template de role + surcharge de permissions individuelles. Documentation de plus de 30 cas d'utilisation et verification de la couverture de chaque pattern"
          }
        ]
      },
      {
        "title": "Optimisation du rendu de l'ecran principal (reduction du temps de rendu de plus de 70%)",
        "summary": "Minimisation de la charge de re-rendu causee par la mise a jour liee des filtres, de la liste et du detail, grace a une revision de la structure des etats. Refactoring cible sur les zones a cout de rendu eleve et a fort impact UX, dans le cadre d'un budget de temps limite.",
        "difficulty": "high",
        "technologies": [
          "TypeScript",
          "React",
          "Apollo Client"
        ],
        "highlights": [
          "Analyse des re-rendus via React DevTools Profiler et application selective de React.memo/useMemo/useCallback pour une reduction du temps de rendu de plus de 70%"
        ],
        "decisions": [
          {
            "title": "Elimination des re-rendus inutiles via React.memo + useMemo",
            "detail": "Visualisation des re-rendus de l'arbre de composants via le Profiler de React DevTools, et elimination des re-rendus inutiles par React.memo, useMemo et useCallback. Reduction du temps de rendu de plus de 70% atteinte"
          }
        ],
        "outcomes": [
          {
            "before": "Temps de rendu lent avec impact negatif sur l'UX",
            "after": "Reduction du temps de rendu de plus de 70%",
            "metric": "Taux de reduction du temps de rendu"
          }
        ],
        "challenges": [
          {
            "title": "Memoisation globale de tous les composants vs optimisation selective guidee par le Profiler",
            "resolution": "Utilisation du Profiler de React DevTools pour verifier visuellement les re-rendus de l'arbre de composants. Identification uniquement des composants reellement lents et application selective de React.memo/useMemo/useCallback. Reduction du temps de rendu de plus de 70% tout en limitant la charge de travail"
          }
        ]
      },
      {
        "title": "Implementation d'une interface calendrier de type Google Calendar pour l'affichage des taches",
        "summary": "Implementation d'une vue calendrier compatible avec l'affichage hebdomadaire, mensuel et sur 3 jours. Realisation d'un affichage arrondi, de zones d'affichage variables et de la compatibilite planificateur via CSS Grid/Subgrid.",
        "difficulty": "medium",
        "technologies": [
          "TypeScript",
          "React",
          "CSS"
        ],
        "highlights": [
          "Developpement d'un algorithme de packing (mapping d'occupation des lignes -> placement en haut) personnalise et elaboration d'une conception de mise a jour reactive avec Apollo Client comme SSoT",
          "Implementation from scratch des vues variables a 3/4/7 jours, du changement de date par D&D, des coins arrondis sur les semaines, et de la compatibilite mobile par CSS scroll snap"
        ],
        "decisions": [
          {
            "title": "Decision d'implementer l'interface calendrier from scratch",
            "detail": "Construction de l'interface calendrier de zero avec React+CSS sans dependance a une bibliotheque. Conception acceptant le nombre variable de jours (3/4/hebdomadaire, etc.) comme parametre externe, garantissant un layout stable quel que soit le nombre de jours"
          },
          {
            "title": "Integration du drag & drop de changement de date et de la sauvegarde incrementale avec Apollo Client comme SSoT",
            "detail": "Conception avec le cache Apollo Client comme source unique de verite (SSoT). Lors d'un changement de date par D&D ou d'une sauvegarde incrementale depuis la modale d'edition, la mise a jour du cache Apollo declenche le re-rendu reactif du calendrier"
          },
          {
            "title": "Interface calendrier responsive et optimisation mobile par CSS scroll snap",
            "detail": "Sur mobile, basculement vers une interface significativement differente de la version PC, avec affichage en slide de la liste des taches au tap sur une date. Application de CSS scroll snap pour que le defilement s'arrete toujours sur une unite de date et ne s'arrete pas a mi-chemin"
          }
        ],
        "outcomes": [
          {
            "before": "Absence d'interface calendrier, les plannings de travail etaient affiches uniquement sous forme de liste avec une faible lisibilite",
            "after": "Implementation from scratch d'une interface calendrier personnalisee avec une ergonomie equivalente a Google Calendar. Basculement dynamique entre vues 3 jours/4 jours/hebdomadaire et affichage arrondi des evenements chevauquant les semaines",
            "metric": "Fourniture d'une interface permettant aux utilisateurs de visualiser et gerer intuitivement les plannings de travail. L'implementation from scratch permet une adaptation flexible aux evolutions des exigences"
          },
          {
            "before": "La gestion des dates d'execution des taches n'etait disponible que sous forme de tableau, rendant difficile la comprehension visuelle de l'ensemble du planning",
            "after": "Construction de zero d'une interface de type Google Calendar. Affichage dense en packing des taches multi-jours/mono-jour, changement de date par D&D, mise a jour en temps reel via Apollo Client SSoT, responsive (incluant scroll snap). Compatibilite avec basculement de vue variable 3/4/7 jours",
            "metric": "Niveau de completude et utilisabilite de l'interface calendrier"
          }
        ],
        "challenges": [
          {
            "title": "Expression UI des coins arrondis pour les evenements chevauquant les semaines",
            "resolution": "Segmentation de l'evenement par semaine et application dynamique de classes border-radius selon la position de chaque segment (debut/milieu/fin). Coins arrondis a gauche pour le segment de debut, a droite pour le segment de fin, sans arrondis pour les segments intermediaires"
          },
          {
            "title": "Layout responsive pour les vues a nombre de jours variable",
            "resolution": "Reception du parametre de nombre de jours comme props du composant et calcul dynamique de la largeur des colonnes en unites fr de CSS Grid. Modification de la logique de placement des evenements pour calculer dynamiquement la position grid-column a partir des dates de debut/fin"
          },
          {
            "title": "Algorithme de packing pour les taches multi-jours et mono-jour (placement en haut sans espace)",
            "resolution": "Developpement d'un algorithme de packing personnalise gerant l'etat d'occupation par ligne. Mappage d'abord des lignes occupees par les taches multi-jours, puis placement des taches mono-jour sur la premiere ligne disponible. Realisation d'un layout dense identique a Google Calendar"
          }
        ]
      },
      {
        "title": "Implementation de la validation par type pour les formulaires a structure dynamique",
        "summary": "Implementation de la validation par type (chaine/nombre/date, etc.) via RHF+Zod pour les elements ajoutables/supprimables sur le template. Conciliation de la separation du traitement et de la reutilisabilite entre modale de creation et ecran d'edition. Prise en charge du controle d'activation, du controle d'affichage des options et de la validation croisee.",
        "difficulty": "high",
        "technologies": [
          "TypeScript",
          "React Hook Form",
          "Zod"
        ],
        "highlights": [
          "Implementation de la validation par type (chaine/nombre/date, etc.) via RHF+Zod pour les elements ajoutables/supprimables sur le template. Conciliation de la separation du traitement et de la reutilisabilite entre modale de creation et ecran d'edition. Prise en charge du controle d'activation, du controle d'affichage des options et de la validation croisee."
        ]
      },
      {
        "title": "Implementation de la sauvegarde incrementale par detection de differences au focus out",
        "summary": "Implementation d'une sauvegarde incrementale ciblant uniquement les differences au focus out pour prevenir les pertes de donnees. Tests de retransmission en conditions de reseau instable realises via le throttling DevTools.",
        "difficulty": "medium",
        "technologies": [
          "TypeScript",
          "React",
          "GraphQL"
        ],
        "highlights": [
          "Conception d'une architecture de sauvegarde incrementale par champ onBlur + Command Pattern, avec implementation d'un mecanisme de retransmission des commandes en echec"
        ],
        "decisions": [
          {
            "title": "Adoption de la sauvegarde incrementale par champ onBlur (rejet de la sauvegarde globale du formulaire)",
            "detail": "Adoption d'une methode de sauvegarde incrementale ou chaque champ possede sa propre instance react-hook-form, avec envoi immediat d'une mutation GraphQL apres verification de difference par isEqual sur l'evenement onBlur"
          },
          {
            "title": "Encapsulation des modifications de champ par approche RPC traitant les commandes comme donnees",
            "detail": "Structuration de chaque modification de champ comme donnee de commande, avec attribution d'UUID et envoi au backend selon une approche RPC. Definition par type de ressource du jeu de champs modifiables, conception traitant les operations de modification comme donnees serialisables"
          }
        ],
        "outcomes": [
          {
            "before": "Risque de perte de donnees saisies en environnement Wi-Fi d'usine avec la methode de sauvegarde globale du formulaire",
            "after": "Implementation de la sauvegarde incrementale par champ onBlur + Command Pattern + mecanisme de retransmission des commandes en echec. Conception d'une feuille de route d'amelioration en 3 etapes (persistance localStorage -> introduction SW -> offline complet)",
            "metric": "Reduction significative du risque de perte de donnees et elaboration du plan d'amelioration future"
          }
        ],
        "challenges": [
          {
            "title": "Preservation des donnees dans un environnement Wi-Fi d'usine instable",
            "resolution": "Implementation de la sauvegarde incrementale par champ onBlur + accumulation des commandes en echec dans useRef + mecanisme de retransmission via le bouton de sauvegarde. Gestion d'erreur en 2 niveaux : conservation des valeurs du formulaire en cas d'erreur reseau, reinitialisation aux valeurs serveur en cas d'erreur client"
          }
        ]
      },
      {
        "title": "Definition de la structure des repertoires et des conventions de nommage des composants UI",
        "summary": "Proposition et obtention du consensus pour une structure de repertoires, des conventions de nommage et des regles de composition des composants afin d'ameliorer la reutilisabilite des composants lies au domaine. Diffusion comme convention partagee au sein de l'equipe.",
        "difficulty": "medium",
        "technologies": [
          "TypeScript",
          "React"
        ],
        "highlights": [
          "Proposition et obtention du consensus pour une structure de repertoires, des conventions de nommage et des regles de composition des composants afin d'ameliorer la reutilisabilite des composants lies au domaine. Diffusion comme convention partagee au sein de l'equipe."
        ]
      },
      {
        "title": "Visualisation de tous les etats UI via Storybook et mise en place des fondations d'internationalisation",
        "summary": "Visualisation de tous les etats UI via Storybook, facilitant les futures variations d'affichage. Implementation de l'internationalisation de l'interface des cartes (incluant la proposition de libelles en anglais), etablissant les fondations de la compatibilite internationale.",
        "difficulty": "medium",
        "technologies": [
          "TypeScript",
          "Storybook",
          "Playwright",
          "Vitest"
        ],
        "highlights": [
          "Visualisation de tous les etats UI via Storybook, facilitant les futures variations d'affichage. Implementation de l'internationalisation de l'interface des cartes (incluant la proposition de libelles en anglais), etablissant les fondations de la compatibilite internationale."
        ]
      }
    ]
  },
  {
    "id": "recruitment-saas-2022",
    "company": "Filiale cotee d'un groupe de conseil et systemes RH",
    "companyDesc": "Filiale d'une entreprise cotee specialisee dans le conseil et le developpement de systemes RH. En charge du developpement du systeme de gestion du recrutement multi-tenant.",
    "role": "Tech Lead Frontend",
    "roles": ["Frontend", "Tech Lead", "Testing"],
    "period": "2022-10 — 2024-09",
    "teamSize": 10,
    "summary": "Direction pendant 2 ans du developpement frontend du SaaS de gestion du recrutement de jeunes diplomes en tant que Tech Lead. Developpement des interfaces B2B (panneau d'administration RH) et B2C (interface d'inscription des candidats) en architecture monorepo pnpm. Conception et implementation des fonctionnalites cles : constructeur de formulaires dynamiques base sur le Specification Pattern, tableau de bord compatible Suspense, pipeline VRT, et promotion de la qualite et de l'efficacite de developpement au sein d'une equipe de 10 personnes",
    "technologies": [
      "TypeScript",
      "React",
      "GitHub Actions",
      "Renovate",
      "React Hook Form",
      "Storybook",
      "Apollo Client",
      "Playwright",
      "TanStack Query",
      "GraphQL",
      "reg-suit",
      "storycap",
      "MUI"
    ],
    "tasks": [
      {
        "title": "Gestion d'equipe et management de la qualite en tant que Tech Lead Frontend",
        "summary": "Direction de l'attribution des taches, de la mise a jour des story points, du partage de connaissances, de la culture de revue de PR et de l'elaboration de guides d'implementation. Introduction de l'automatisation des mises a jour regulieres des bibliotheques via Renovate. Organisation de reunions d'equipe et promotion du partage technique, des conventions de code et des specifications d'ecrans.",
        "difficulty": "high",
        "technologies": [
          "TypeScript",
          "React",
          "GitHub Actions",
          "Renovate"
        ],
        "highlights": [
          "Direction de type orchestrateur pour la specification exhaustive de l'application B2C, l'obtention du consensus avec l'equipe backend, le decoupage des taches, l'attribution aux membres et la prise en charge du chemin critique",
          "Etablissement des standards de qualite de l'equipe via l'elaboration de directives de revue de code, la construction de l'environnement VRT et la formation des stagiaires"
        ],
        "decisions": [
          {
            "title": "Elevation du niveau de qualite de l'equipe par la formation des stagiaires et la revue de code",
            "detail": "Realisation active de revues de code et formation des stagiaires par le feedback. Adoption d'une approche OJT transmettant en pratique les conventions de codage et les patterns de conception a travers les revues"
          },
          {
            "title": "Interface unique vers l'equipe backend et management de type orchestrateur",
            "detail": "Specification exhaustive de l'application B2C realisee en autonomie, avec alignement approfondi en tete-a-tete avec le lead de l'equipe backend. Organisation ensuite de reunions d'onboarding pour l'equipe B2C avec explication de l'ensemble des specifications. Fonctionnement comme guichet unique centralisant les questions et clarifications des membres aupres de l'equipe backend"
          },
          {
            "title": "Decoupage des specifications en taches, organisation des dependances et attribution basee sur les competences des membres",
            "detail": "Decoupage des specifications detaillees en taches avec clarification des dependances et creation de tickets Jira. Attribution des tickets selon les forces, faiblesses, niveaux de competence et preferences des membres. Prise en charge personnelle des taches constituant des points de defaillance unique (chemin critique) dans le graphe de dependances"
          }
        ],
        "outcomes": [
          {
            "before": "Disparite de la qualite frontend et regression CSS non detectees",
            "after": "Construction d'un environnement de regression visuelle via Storybook+storycap+reg-suit, avec detection automatique des differences UI a chaque PR. Elaboration egalement de directives de revue de code",
            "metric": "Etablissement d'un dispositif automatise de garantie de la qualite UI"
          }
        ],
        "challenges": [
          {
            "title": "Equilibre entre dette technique et vitesse de developpement en tant que Tech Lead FE",
            "resolution": "Construction d'un environnement de regression visuelle via Storybook+storycap+reg-suit pour garantir automatiquement la qualite UI. Elaboration de directives de revue de code pour elever le standard de qualite de l'ensemble de l'equipe"
          },
          {
            "title": "Specification detaillee de l'application B2C candidats en 4 mois de delai court",
            "resolution": "Direction de la specification detaillee en tant que Tech Lead. Organisation du flux utilisateur des candidats et definition systematique des conditions de transition par statut, du contenu d'affichage et des regles de validation. Finalisation agile des specifications en parallele de l'implementation"
          },
          {
            "title": "Identification des cas limites des formulaires dynamiques et obtention du consensus backend",
            "resolution": "Decision de gerer le cas de zero options cote B2B par intervention du support client dans la configuration du formulaire, sans afficher d'alerte particuliere cote application B2C. Obtention du consensus individuel avec le lead backend pour chaque cas limite, documentation des decisions et partage avec l'equipe"
          }
        ]
      },
      {
        "title": "Specification et implementation du parcours d'inscription des candidats",
        "summary": "Specification detaillee et implementation FE du flux d'inscription complet : creation de compte -> candidature a une offre -> entree dans les etapes de selection. Completion du developpement fonctionnel dans le delai de 4 mois, obtenant une evaluation tres positive du client.",
        "difficulty": "high",
        "technologies": [
          "TypeScript",
          "React",
          "React Hook Form",
          "Storybook",
          "Apollo Client",
          "Playwright"
        ],
        "highlights": [
          "Definition d'une conception unifiant 4 parcours de formulaires sur une base DynamicForm commune, avec implementation de la validation multi-pages et du controle de navigation"
        ],
        "decisions": [
          {
            "title": "Implementation des 4 parcours de formulaires B2C sur une base DynamicForm commune",
            "detail": "Adoption d'une conception centree sur des classes de definition de specifications de formulaire, partageant un hook useForm commun, des composants d'entree et un systeme de validation, avec definition individuelle uniquement de la structure des pages, des destinations d'envoi et des differences de parametres par parcours"
          },
          {
            "title": "Validation par page et controle de navigation dans les formulaires multi-pages",
            "detail": "Gestion de l'etat de validation par page via useFormState avec conversion entre l'index de page URL (base 1) et l'index de tableau (base 0). Execution de trigger() dans le scope de la page et blocage de la navigation vers les pages non validees"
          }
        ],
        "outcomes": [
          {
            "before": "Contrainte de delai de developpement de 4 mois",
            "after": "Completion de l'ensemble du developpement fonctionnel dans les delais, evaluation tres positive du client obtenue",
            "metric": "Taux de completion du developpement et satisfaction client"
          },
          {
            "before": "Absence de formulaire d'inscription cote candidats, le volet B2C du SaaS de gestion du recrutement etait non amenage",
            "after": "Implementation des 4 parcours de formulaires (inscription, pre-entree, mise a jour du profil, taches du compte personnel) sur une base DynamicForm commune. Realisation de 24 types de composants d'entree, 50+ regles de validation et navigation multi-pages",
            "metric": "Completude de la base de formulaires B2C candidats"
          }
        ],
        "challenges": [
          {
            "title": "Gestion complexe des transitions d'etat dans le parcours d'inscription des candidats",
            "resolution": "Creation detaillee de diagrammes de transition d'etat lors de la phase de specification, visualisant tous les patterns. Implementation d'une conception empechant les transitions invalides au niveau des types. Completion de l'ensemble des fonctionnalites dans le delai de 4 mois"
          },
          {
            "title": "Mappage des erreurs de validation serveur au niveau des champs",
            "resolution": "Determination des erreurs de validation GraphQL dans useEffect, avec separation et configuration des erreurs de banniere globale et des erreurs au niveau des champs. Unification de la gestion des erreurs via un hook useForm personnalise"
          }
        ]
      },
      {
        "title": "Conception et implementation du constructeur de formulaires dynamiques RH (adoption du Specification Pattern)",
        "summary": "Implementation d'un constructeur de formulaires permettant aux RH de configurer pages, titres, champs de saisie, validations, relations parent-enfant, etc. Resolution du probleme d'etat des classes par le Specification Pattern, avec maintien de la coherence avec RHF. Realisation d'une conception conciliant cohesion et extensibilite.",
        "difficulty": "extreme",
        "technologies": [
          "TypeScript",
          "React",
          "React Hook Form",
          "Apollo Client"
        ],
        "highlights": [
          "Conception et implementation d'une base de validation croisee avec Specification Pattern x 50+ methodes personnalisees Yup. Construction d'un moteur de generation de formulaires a 3 couches",
          "Implementation du filtrage reactif des options avec liaison parent-enfant + useWatch + effacement automatique des valeurs selectionnees"
        ],
        "decisions": [
          {
            "title": "Conception de la validation dynamique de formulaires par Specification Pattern",
            "detail": "Adoption du Specification Pattern (pattern issu du Domain-Driven Design) pour une conception ou les expressions conditionnelles sont composables en tant qu'objets"
          },
          {
            "title": "Base de validation croisee par Specification Pattern x methodes personnalisees Yup",
            "detail": "Ajout de 50+ methodes personnalisees au schema Yup avec application en lot a tous les types de schema. Declaration des dependances entre champs par metadonnees et construction automatique du graphe de dependances"
          },
          {
            "title": "Separation de la validation dans un package shared en architecture monorepo pnpm",
            "detail": "Adoption d'une architecture en 3 packages (B2B, B2C, commun) via pnpm workspace. Placement de la base de validation dans le package commun et utilisation depuis B2B/B2C par re-export. Gestion centralisee des definitions d'enum d'origine GraphQL via un registre d'enumerations"
          },
          {
            "title": "Filtrage des options sans rechargement par liaison reactive parent-enfant",
            "detail": "Surveillance reactive des changements de valeur du champ parent via useWatch() dans le composant de liaison parent-enfant. Passage de la fonction de filtrage au composant enfant et filtrage des options par useMemo. Effacement automatique des valeurs invalides par un composant de reinitialisation des selections"
          }
        ],
        "outcomes": [
          {
            "before": "Les definitions de conditions des formulaires de candidature etaient codees en dur, necessitant une modification du code pour chaque changement de condition",
            "after": "Implementation de la definition declarative des conditions par Specification Pattern, permettant aux responsables RH de configurer les conditions de formulaire sans code",
            "metric": "Libre-service pour les modifications de conditions de formulaire"
          },
          {
            "before": "Les elements de formulaire etaient codes en dur, necessitant l'intervention d'un ingenieur pour chaque ajout ou modification d'element",
            "after": "Le moteur de generation de formulaires dynamiques permet aux responsables RH de configurer librement les elements de formulaire. Realisation d'une base de formulaires dynamiques avec 50+ regles de validation, 24 types de composants d'entree, validation croisee entre champs et filtrage reactif des options. Mise a disposition de B2B et B2C via le package commun",
            "metric": "Flexibilite et qualite de la base de formulaires dynamiques"
          }
        ],
        "challenges": [
          {
            "title": "Explosion combinatoire des expressions conditionnelles du constructeur de formulaires RH",
            "resolution": "Adoption du Specification Pattern (issu du DDD) pour une conception des expressions conditionnelles comme objets de premiere classe composables par AND/OR/NOT. Implementation d'une definition conditionnelle declarative de type JSON Schema"
          },
          {
            "title": "Controle de synchronisation entre la validation croisee inter-champs et l'UI reactive",
            "resolution": "Detection des changements d'options par le composant de reinitialisation des selections et effacement immediat des valeurs invalides. Construction automatique du graphe de dependances entre champs et declenchement automatique de la re-validation des champs dependants via l'option deps de React Hook Form. Support des dependances de formulaires dynamiques par correspondance de wildcards sur les index de tableaux"
          },
          {
            "title": "Conception du moteur de generation de formulaires pilote par le schema",
            "resolution": "Conception de classes de definition de specifications en 3 couches : formulaire complet -> page -> element. Chaque couche construit dynamiquement le schema de validation, avec generation automatique du schema par page. Securite des types sur les valeurs de formulaire assuree egalement par les parametres de type TypeScript"
          }
        ]
      },
      {
        "title": "Specification detaillee et implementation compatible Suspense du tableau de bord RH",
        "summary": "Specification detaillee et implementation du tableau de bord de l'ecran principal. Compatibilite Suspense pour l'ensemble et les 3 types de panneaux. Identification des causes de re-rendu via React Profiler et amelioration des performances reelles et du temps d'attente percu.",
        "difficulty": "high",
        "technologies": [
          "TypeScript",
          "React",
          "Apollo Client",
          "TanStack Query"
        ],
        "highlights": [
          "Conception et implementation d'une architecture de data fetching independant par widget (Suspense+ErrorBoundary) et d'un algorithme de grille Masonry personnalise"
        ],
        "decisions": [
          {
            "title": "Adoption de l'architecture de data fetching independant par widget",
            "detail": "Adoption d'une architecture ou chaque widget effectue son data fetching de maniere independante. Utilisation de useReadQuery d'Apollo Client pour un data fetching compatible Suspense complet au sein du composant widget"
          },
          {
            "title": "Implementation from scratch d'une grille Masonry personnalisee",
            "detail": "Implementation d'un algorithme de placement de grille personnalise. Suivi de l'index de ligne courant des colonnes gauche et droite, placement des widgets dans la colonne la plus courte pour realiser l'effet Masonry"
          },
          {
            "title": "Tri par drag & drop des widgets via dnd-kit v6",
            "detail": "Adoption de @dnd-kit/core v6.1.0 + @dnd-kit/sortable v8.0.0. Gestion de la liste par SortableContext et controle de l'etat D&D de chaque widget par le hook useSortable. Implementation de l'apercu pendant le deplacement via DragOverlay"
          }
        ],
        "outcomes": [
          {
            "before": "Le data fetching du tableau de bord etait en mode waterfall, rendant l'interface inoperable jusqu'au chargement complet de tous les widgets. Probleme egalement d'espaces dans le placement des widgets",
            "after": "Realisation du fetching independant + affichage skeleton via React Suspense + Apollo useReadQuery + Material UI Skeleton. Placement sans espace par grille Masonry personnalisee. Tri par D&D et basculement 1 colonne/2 colonnes via dnd-kit v6",
            "metric": "Amelioration de l'UX ou chaque widget transite independamment du chargement a l'affichage. Architecture faiblement couplee egalement compatible avec une future extension marketplace tierce"
          }
        ],
        "challenges": [
          {
            "title": "Resolution du probleme de waterfall lors du data fetching simultane de 20 widgets",
            "resolution": "Migration vers un data fetching compatible Suspense via useReadQuery d'Apollo Client 3.10. Encapsulation de chaque widget dans une frontiere React Suspense avec composants Skeleton Material UI en fallback. Application egalement d'ErrorBoundary individuellement a chaque widget pour qu'une defaillance API d'un widget n'impacte pas les autres"
          },
          {
            "title": "Implementation d'une grille Masonry personnalisee dans un environnement ne supportant pas CSS Masonry",
            "resolution": "Implementation d'un algorithme de placement personnalise. Suivi de l'index de ligne courant des colonnes gauche et droite, placement de chaque widget dans la colonne la plus courte. Realisation d'un placement sans espace de type Masonry par calcul dynamique de grid-row-start/grid-row-span sur CSS Grid"
          }
        ]
      },
      {
        "title": "Mise en place des fonctionnalites transversales : gestion des erreurs, cache, controle d'acces, etc.",
        "summary": "Implementation de la gestion des erreurs, reinitialisation du cache, ajout de parametres d'en-tete aux requetes, redirection, batching de requetes et correction de la validation auto-generee a partir du schema GraphQL.",
        "difficulty": "high",
        "technologies": [
          "TypeScript",
          "React",
          "Apollo Client",
          "GraphQL"
        ],
        "highlights": [
          "Implementation de la gestion des erreurs, reinitialisation du cache, ajout de parametres d'en-tete aux requetes, redirection, batching de requetes et correction de la validation auto-generee a partir du schema GraphQL."
        ]
      },
      {
        "title": "Construction de l'environnement de regression visuelle avec Storybook+storycap+reg-suit",
        "summary": "Integration de Storybook, storycap et reg-suit dans le CI GitHub Actions pour realiser des tests de regression UI. Mise en place egalement de tests E2E de regression avec Playwright dans l'environnement CI.",
        "difficulty": "high",
        "technologies": [
          "Storybook",
          "GitHub Actions",
          "Playwright",
          "reg-suit",
          "storycap"
        ],
        "highlights": [
          "Conception et construction du pipeline VRT Storybook+storycap+reg-suit+GitHub Actions+S3, instaurant la culture VRT au sein de l'equipe",
          "Implementation de la capture parallele b2b/b2c par matrix strategy, comparaison de differences avec seuil de 0,1%, et publication automatique de commentaires sur les PR"
        ],
        "decisions": [
          {
            "title": "Conception du pipeline VRT avec Storybook v8 + storycap + reg-suit + S3",
            "detail": "Construction de l'environnement Storybook avec @storybook/react-vite v8.1.5, capture automatique de screenshots par storycap v5.0.0, comparaison de differences pixel par reg-suit (seuil 0,1%), publication des resultats sur AWS S3, et flux de revue des differences par notification GitHub PR"
          },
          {
            "title": "Execution VRT parallele b2b/b2c par matrix strategy GitHub Actions",
            "detail": "Conception d'un pipeline en 2 etapes : capture parallele b2b/b2c par storycap via matrix strategy de GitHub Actions et upload en tant qu'artefacts, puis integration dans le job vrt suivant pour execution de reg-suit run"
          }
        ],
        "outcomes": [
          {
            "before": "Les modifications UI involontaires (regressions CSS) etaient decouvertes apres la mise en production",
            "after": "Comparaison automatique des screenshots par storycap+reg-suit a chaque PR. Detection a 100% des regressions CSS avant le merge",
            "metric": "Taux de detection des regressions CSS"
          },
          {
            "before": "La verification qualite des modifications UI se faisait exclusivement par inspection visuelle manuelle, avec des bugs de regression decouverts apres release",
            "after": "Construction du pipeline VRT Storybook v8.1.5 + storycap + reg-suit + GitHub Actions + S3. Comparaison automatique des screenshots a chaque PR pour l'ensemble des composants UI : 215 stories b2b et 49 pages b2c",
            "metric": "Detection automatique des regressions visuelles avec un seuil de difference pixel de 0,1%. La revue des images de difference dans les commentaires PR est devenue une pratique etablie, reduisant les bugs de regression UI post-release"
          }
        ],
        "challenges": [
          {
            "title": "Stabilisation des timeouts et de l'attente des assets de storycap",
            "resolution": "Configuration de screenshot: { waitAssets: true } dans les parametres par defaut de preview.tsx pour attendre le chargement complet des assets. Configuration de serverTimeout a 60000ms et captureTimeout a 15000ms lors de l'execution de storycap. Ajustement individuel des delais par story pour un environnement de capture stable"
          },
          {
            "title": "Ancrage de la culture VRT au sein de l'equipe",
            "resolution": "Introduction de l'affichage des images de difference dans les commentaires PR via reg-notify-github-plugin, et etablissement d'une regle d'equipe incluant les differences dans la revue. Promotion du flux de developpement de composants sur Storybook, construction d'un processus de developpement ou la creation de stories s'integre naturellement dans le VRT"
          }
        ]
      },
      {
        "title": "Migration de react-admin vers Apollo Client/RHF/MUI et introduction de GraphQL Suspense",
        "summary": "Proposition de la migration de react-admin vers Apollo Client, RHF et MUI pour ameliorer l'efficacite de developpement, et conduite jusqu'a la migration complete. Verification et introduction en production de l'amelioration de la vitesse d'affichage par GraphQL Suspense et React Suspense.",
        "difficulty": "high",
        "technologies": [
          "React",
          "React Hook Form",
          "MUI",
          "Apollo Client",
          "GraphQL"
        ],
        "highlights": [
          "Proposition de la migration de react-admin vers Apollo Client, RHF et MUI pour ameliorer l'efficacite de developpement, et conduite jusqu'a la migration complete. Verification et introduction en production de l'amelioration de la vitesse d'affichage par GraphQL Suspense et React Suspense."
        ]
      },
      {
        "title": "Direction de l'equipe de smoke testing",
        "summary": "En tant que leader de la phase de test, prise en charge proactive du role de conducteur. Partage des specifications d'ecran et de navigation lors des sessions de conduite des autres membres. Direction de la creation des tickets de defaut et de la gestion des statuts de test.",
        "difficulty": "medium",
        "technologies": [
          "Playwright"
        ],
        "highlights": [
          "En tant que leader de la phase de test, prise en charge proactive du role de conducteur. Partage des specifications d'ecran et de navigation lors des sessions de conduite des autres membres. Direction de la creation des tickets de defaut et de la gestion des statuts de test."
        ]
      }
    ]
  },
  {
    "id": "mobile-order-app-2022",
    "company": "Societe de vente d'applications de commande mobile",
    "companyDesc": "Societe developpant et commercialisant des applications de commande mobile pour la restauration. En charge du developpement LIFF, application native et backend.",
    "role": "Ingenieur frontend LIFF / application native / backend",
    "roles": ["Frontend", "Backend"],
    "period": "2022-04 — 2022-09",
    "teamSize": 7,
    "summary": "",
    "technologies": [
      "TypeScript",
      "Next.js",
      "Apollo Client",
      "React Native",
      "Expo",
      "LIFF",
      "React",
      "NestJS",
      "GraphQL",
      "Jest",
      "Hasura"
    ],
    "tasks": [
      {
        "title": "Developpement frontend multi-plateforme : Web/LIFF/application native",
        "summary": "Prise en charge complete du developpement Web (Next.js), LIFF et application native (React Native/Expo). Implementation de logiques metier variees : gestion des commandes, integration LINE restaurant, integration caisse, gestion des stocks, traitement de cloture.",
        "difficulty": "high",
        "technologies": [
          "TypeScript",
          "Next.js",
          "Apollo Client",
          "React Native",
          "Expo",
          "LIFF"
        ],
        "highlights": [
          "Prise en charge complete du developpement Web (Next.js), LIFF et application native (React Native/Expo). Implementation de logiques metier variees : gestion des commandes, integration LINE restaurant, integration caisse, gestion des stocks, traitement de cloture."
        ]
      },
      {
        "title": "Internationalisation de la commande mobile (anglais et chinois)",
        "summary": "Investigation des interfaces applicatives pour les marches anglophone et sinophone, avec comme prerequis que l'affichage des logos et des libelles ne soit pas deforme quel que soit l'appareil, et que le sens soit compris de maniere concise. Amelioration de l'UI par discussion avec le designer et le PO en utilisant des prototypes.",
        "difficulty": "medium",
        "technologies": [
          "TypeScript",
          "React",
          "LIFF"
        ],
        "highlights": [
          "Investigation des interfaces applicatives pour les marches anglophone et sinophone, avec comme prerequis que l'affichage des logos et des libelles ne soit pas deforme quel que soit l'appareil, et que le sens soit compris de maniere concise. Amelioration de l'UI par discussion avec le designer et le PO en utilisant des prototypes."
        ]
      },
      {
        "title": "Implementation du traitement de pre-cloture du systeme de caisse (mutualisation avec la cloture definitive et mise en place de tests unitaires)",
        "summary": "Mutualisation des traitements communs avec la cloture definitive et resolution des incoherences de nommage des variables. Ajout de tests unitaires pour une implementation a faible dette technique.",
        "difficulty": "medium",
        "technologies": [
          "TypeScript",
          "NestJS",
          "GraphQL",
          "Jest"
        ],
        "highlights": [
          "Mutualisation des traitements communs avec la cloture definitive et resolution des incoherences de nommage des variables. Ajout de tests unitaires pour une implementation a faible dette technique."
        ]
      },
      {
        "title": "Implementation de l'agregation des commandes par table, par menu et par tranche horaire sur l'ecran cuisine",
        "summary": "Implementation de fonctionnalites et amelioration de l'UI de l'ecran cuisine. Implementation de la fonction d'agregation des statuts de commande par table, par menu et par tranche horaire.",
        "difficulty": "medium",
        "technologies": [
          "TypeScript",
          "Hasura",
          "GraphQL",
          "React Native"
        ],
        "highlights": [
          "Implementation de fonctionnalites et amelioration de l'UI de l'ecran cuisine. Implementation de la fonction d'agregation des statuts de commande par table, par menu et par tranche horaire."
        ]
      }
    ]
  },
  {
    "id": "board-management-app-2022",
    "company": "Societe de service de digitalisation des conseils d'administration",
    "companyDesc": "Entreprise fournissant un SaaS de digitalisation de la gestion des conseils d'administration. En charge du developpement FE et BE du service de gestion des conseils d'administration.",
    "role": "Ingenieur frontend / backend",
    "roles": ["Frontend", "Backend"],
    "period": "2022-03 — 2022-05",
    "teamSize": 5,
    "summary": "",
    "technologies": [
      "TypeScript",
      "React",
      "Tailwind CSS",
      "Storybook",
      "Playwright",
      "Node.js",
      "Express",
      "Prisma",
      "GraphQL"
    ],
    "tasks": [
      {
        "title": "Implementation de composants UI et organisation du Storybook (adoption de l'Atomic Design)",
        "summary": "Pour resoudre le probleme de faible decouverte et recherche des composants UI, alignement du repertoire Storybook sur l'Atomic Design. Catalogage de tous les composants UI dans Storybook pour ameliorer l'efficacite d'implementation des ecrans.",
        "difficulty": "medium",
        "technologies": [
          "TypeScript",
          "React",
          "Tailwind CSS",
          "Storybook"
        ],
        "highlights": [
          "Pour resoudre le probleme de faible decouverte et recherche des composants UI, alignement du repertoire Storybook sur l'Atomic Design. Catalogage de tous les composants UI dans Storybook pour ameliorer l'efficacite d'implementation des ecrans."
        ]
      },
      {
        "title": "Implementation des ecrans d'aide a la creation de documents et de decision par ecrit, et tests E2E",
        "summary": "Implementation detaillee des ecrans d'aide a la creation de documents et de decision par ecrit. Garantie de la qualite par l'implementation de tests E2E Playwright.",
        "difficulty": "medium",
        "technologies": [
          "TypeScript",
          "React",
          "Playwright"
        ],
        "highlights": [
          "Implementation detaillee des ecrans d'aide a la creation de documents et de decision par ecrit. Garantie de la qualite par l'implementation de tests E2E Playwright."
        ]
      },
      {
        "title": "Implementation backend de la fonctionnalite de planification de dates",
        "summary": "Implementation backend de la fonctionnalite de planification de dates en Node.js/Express/GraphQL/Prisma.",
        "difficulty": "medium",
        "technologies": [
          "Node.js",
          "Express",
          "Prisma",
          "GraphQL"
        ],
        "highlights": [
          "Implementation backend de la fonctionnalite de planification de dates en Node.js/Express/GraphQL/Prisma."
        ]
      }
    ]
  },
  {
    "id": "freelance-web-2021",
    "company": "Freelance",
    "companyDesc": "Missions freelance de creation de sites web SPA multiples. 4 projets : societe de creation de sites, societe de recrutement, societe d'analyse de donnees et restaurant.",
    "role": "Ingenieur frontend",
    "roles": ["Frontend"],
    "period": "2021-05 — 2022-03",
    "teamSize": 1,
    "summary": "",
    "technologies": [
      "TypeScript",
      "JavaScript",
      "React",
      "Next.js",
      "Amazon S3"
    ],
    "tasks": [
      {
        "title": "Creation de sites web SPA en React/Next.js (4 projets)",
        "summary": "Creation de sites web SPA pour une societe de creation de sites, une societe de recrutement, une societe d'analyse de donnees et un restaurant. Prise en charge de l'integration du frontend avec les CMS (WordPress/Contentful, etc.) et de l'hebergement sur Vercel/Netlify/S3.",
        "difficulty": "medium",
        "technologies": [
          "TypeScript",
          "JavaScript",
          "React",
          "Next.js",
          "Amazon S3"
        ],
        "highlights": [
          "Creation de sites web SPA pour une societe de creation de sites, une societe de recrutement, une societe d'analyse de donnees et un restaurant. Prise en charge de l'integration du frontend avec les CMS (WordPress/Contentful, etc.) et de l'hebergement sur Vercel/Netlify/S3."
        ]
      }
    ]
  },
  {
    "id": "bitkey-data-2020",
    "company": "Bitkey, Inc.",
    "companyDesc": "Startup de developpement de serrures connectees. En charge de la construction du data lake interne, des tableaux de bord et du developpement du site portail de quartier.",
    "role": "Ingenieur data et ingenieur frontend",
    "roles": ["Data", "Frontend"],
    "period": "2020-08 — 2021-03",
    "teamSize": 3,
    "summary": "",
    "technologies": [
      "Python",
      "SQL",
      "BigQuery",
      "AWS Lambda",
      "Cloud Functions",
      "pandas",
      "NumPy",
      "Google Data Portal",
      "TypeScript",
      "React",
      "MUI",
      "Storybook"
    ],
    "tasks": [
      {
        "title": "Definition et elaboration des KPI partages a l'echelle de l'entreprise",
        "summary": "Organisation des KPI relatifs a la direction, aux produits, aux ventes, a la qualite et a l'utilisation, et definition de l'ensemble des indicateurs a partager avec l'ensemble des employes. Direction de la conception des indicateurs pour diffuser une culture de collaboration transversale.",
        "difficulty": "high",
        "technologies": [
          "Python",
          "SQL",
          "BigQuery"
        ],
        "highlights": [
          "Organisation des KPI relatifs a la direction, aux produits, aux ventes, a la qualite et a l'utilisation, et definition de l'ensemble des indicateurs a partager avec l'ensemble des employes. Direction de la conception des indicateurs pour diffuser une culture de collaboration transversale."
        ]
      },
      {
        "title": "Construction d'un pipeline d'agregation de sources de donnees multiples vers BigQuery",
        "summary": "Implementation de traitements periodiques sur AWS Lambda et Cloud Functions pour centraliser dans BigQuery les donnees dispersees dans Amazon Redshift, Amazon Aurora, Salesforce et Cloud Firestore. Prise en charge egalement de la transformation et de l'automatisation de l'agregation des donnees semi-structurees.",
        "difficulty": "high",
        "technologies": [
          "AWS Lambda",
          "Cloud Functions",
          "Python",
          "pandas",
          "NumPy",
          "SQL",
          "BigQuery"
        ],
        "highlights": [
          "Implementation de traitements periodiques sur AWS Lambda et Cloud Functions pour centraliser dans BigQuery les donnees dispersees dans Amazon Redshift, Amazon Aurora, Salesforce et Cloud Firestore. Prise en charge egalement de la transformation et de l'automatisation de l'agregation des donnees semi-structurees."
        ]
      },
      {
        "title": "Conception et implementation du tableau de bord Google Data Portal et diffusion interne",
        "summary": "Conception et implementation d'un tableau de bord sur Google Data Portal, avec visualisation permanente des indicateurs de ventes, qualite et utilisation. Ancrage de la culture d'exploitation des donnees par l'installation d'un ecran a l'entree du bureau, le placement sur le portail employe et les presentations en reunions hebdomadaires.",
        "difficulty": "medium",
        "technologies": [
          "SQL",
          "BigQuery",
          "Google Data Portal"
        ],
        "highlights": [
          "Conception et implementation d'un tableau de bord sur Google Data Portal, avec visualisation permanente des indicateurs de ventes, qualite et utilisation. Ancrage de la culture d'exploitation des donnees par l'installation d'un ecran a l'entree du bureau, le placement sur le portail employe et les presentations en reunions hebdomadaires."
        ]
      },
      {
        "title": "Implementation des composants UI du site portail de quartier",
        "summary": "Site portail de quartier pour le partage d'informations entre residents d'un lotissement equipe de serrures connectees. Implementation de composants UI communs a plusieurs ecrans en collaboration avec le designer UI. Creation d'un catalogue UI sur Storybook.",
        "difficulty": "medium",
        "technologies": [
          "TypeScript",
          "React",
          "MUI",
          "Storybook"
        ],
        "highlights": [
          "Site portail de quartier pour le partage d'informations entre residents d'un lotissement equipe de serrures connectees. Implementation de composants UI communs a plusieurs ecrans en collaboration avec le designer UI. Creation d'un catalogue UI sur Storybook."
        ]
      }
    ]
  },
  {
    "id": "simplex-banking-2019",
    "company": "Simplex Inc.",
    "companyDesc": "ESN specialisee dans le developpement de systemes financiers. En charge du developpement, des tests et de la maintenance du systeme de gestion des risques pour une grande banque et d'une application d'inscription pour une compagnie d'assurance.",
    "role": "Ingenieur frontend / testeur / charge de maintenance",
    "roles": ["Frontend", "Testing"],
    "period": "2019-06 — 2020-06",
    "teamSize": 9,
    "summary": "",
    "technologies": [
      "Java",
      "VBA",
      "Bash",
      "TypeScript",
      "JavaScript",
      "Vue.js"
    ],
    "tasks": [
      {
        "title": "Developpement d'une application frontend Excel communicant avec une API Java JSON via VBA",
        "summary": "Developpement d'une application communiquant avec une API Java JSON via VBA pour afficher les donnees dans Excel. Implementation d'une fonctionnalite ajoutant dynamiquement des colonnes selon les resultats JSON et integrant des formules Excel dans chaque colonne. Attention particuliere a la lisibilite du nommage.",
        "difficulty": "high",
        "technologies": [
          "Java",
          "VBA",
          "Bash"
        ],
        "highlights": [
          "Developpement d'une application communiquant avec une API Java JSON via VBA pour afficher les donnees dans Excel. Implementation d'une fonctionnalite ajoutant dynamiquement des colonnes selon les resultats JSON et integrant des formules Excel dans chaque colonne. Attention particuliere a la lisibilite du nommage."
        ]
      },
      {
        "title": "Tests chez le client, operations de release, maintenance et support client",
        "summary": "Prise en charge des tests chez le client et des operations de release via commandes shell et AWS. Direction du support par email aux clients, de la conception fonctionnelle des projets d'amelioration, de la creation de tickets de defaut et du suivi lors des reunions periodiques.",
        "difficulty": "medium",
        "technologies": [
          "Java",
          "Bash"
        ],
        "highlights": [
          "Prise en charge des tests chez le client et des operations de release via commandes shell et AWS. Direction du support par email aux clients, de la conception fonctionnelle des projets d'amelioration, de la creation de tickets de defaut et du suivi lors des reunions periodiques."
        ]
      },
      {
        "title": "Implementation frontend Vue.js de l'application d'inscription pour une compagnie d'assurance",
        "summary": "Elaboration des specifications detaillees des infobulles et modales avec le concepteur, et implementation sur tous les ecrans et champs de saisie. Implementation de l'UI de multiples ecrans de saisie utilisateur. Prise en charge de l'execution et de la gestion des tests de scenarios metier et des tests systeme.",
        "difficulty": "medium",
        "technologies": [
          "TypeScript",
          "JavaScript",
          "Vue.js"
        ],
        "highlights": [
          "Elaboration des specifications detaillees des infobulles et modales avec le concepteur, et implementation sur tous les ecrans et champs de saisie. Implementation de l'UI de multiples ecrans de saisie utilisateur. Prise en charge de l'execution et de la gestion des tests de scenarios metier et des tests systeme."
        ]
      }
    ]
  },
  {
    "id": "graph-intern-2018",
    "company": "Graph, Inc.",
    "companyDesc": "Stage dans une entreprise d'analyse de donnees et de developpement IA. En charge du developpement du moteur de recommandation pour un e-commerce de mode, de l'analyse de donnees pour un constructeur automobile et du developpement d'un chatbot.",
    "role": "Ingenieur data - stagiaire",
    "roles": ["Data"],
    "period": "2018-01 — 2019-03",
    "teamSize": 2,
    "summary": "",
    "technologies": [
      "Python",
      "pandas",
      "NumPy",
      "SQL",
      "JavaScript",
      "Flask",
      "Amazon S3",
      "Amazon EC2"
    ],
    "tasks": [
      {
        "title": "Developpement du prototype du moteur de recommandation pour un e-commerce de mode (3 algorithmes)",
        "summary": "Developpement d'un prototype de moteur de recommandation pour les listes de suggestions affichees sur la page d'accueil, les pages produit et le panier. Application de filtrage par contenu et de filtrage collaboratif respectivement pour les nouveaux clients, les clients existants et les pages produit, avec une conception tenant compte de la serendipite.",
        "difficulty": "high",
        "technologies": [
          "Python",
          "pandas",
          "NumPy",
          "SQL"
        ],
        "highlights": [
          "Developpement d'un prototype de moteur de recommandation pour les listes de suggestions affichees sur la page d'accueil, les pages produit et le panier. Application de filtrage par contenu et de filtrage collaboratif respectivement pour les nouveaux clients, les clients existants et les pages produit, avec une conception tenant compte de la serendipite."
        ]
      },
      {
        "title": "Classification de clients par algorithme des k plus proches voisins et statistiques descriptives des achats",
        "summary": "Pour aider a la reflexion sur les strategies marketing de la direction de l'e-commerce de mode, classification des clients existants par l'algorithme des k plus proches voisins et statistiques descriptives des achats par segment (chiffre d'affaires par categorie de produit, etc.).",
        "difficulty": "medium",
        "technologies": [
          "Python",
          "pandas",
          "NumPy",
          "SQL"
        ],
        "highlights": [
          "Pour aider a la reflexion sur les strategies marketing de la direction de l'e-commerce de mode, classification des clients existants par l'algorithme des k plus proches voisins et statistiques descriptives des achats par segment (chiffre d'affaires par categorie de produit, etc.)."
        ]
      },
      {
        "title": "Developpement full-stack et deploiement d'un chatbot de demonstration",
        "summary": "Definition des specifications de design, implementation de l'interface et de l'API (Python/Flask) du chatbot de demonstration. Deploiement de l'application sur S3 et EC2.",
        "difficulty": "medium",
        "technologies": [
          "JavaScript",
          "Flask",
          "Amazon S3",
          "Amazon EC2",
          "Python"
        ],
        "highlights": [
          "Definition des specifications de design, implementation de l'interface et de l'API (Python/Flask) du chatbot de demonstration. Deploiement de l'application sur S3 et EC2."
        ]
      }
    ]
  }
];
