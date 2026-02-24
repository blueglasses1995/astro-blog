import type { CVProject } from './cv-details';

export const cvProjectsDe: CVProject[] = [
  {
    "id": "ai-translation-tools-2025",
    "company": "KI-gestütztes Übersetzungs-SaaS",
    "companyDesc": "Entwurf und Implementierung von Microservices für die Nachbearbeitung eines KI-Übersetzungs-SaaS-Produkts",
    "role": "Backend-Entwickler (Microservice-Architektur & Implementierung)",
    "roles": ["Backend", "Infra", "Testing"],
    "period": "2025/04 — 2025/09",
    "teamSize": 5,
    "summary": "Microservice-Architektur für die Übersetzungs-Nachbearbeitung auf Basis von FastAPI + Celery + PostgreSQL + Redis. Neben dem Entwurf und der Implementierung des Post-Validation-Service wurden die Frontend-Entwicklungsumgebung modernisiert, eine Docker/GHCR-Deploy-Infrastruktur aufgebaut, OpenAPI-Mock-Autogenerierung eingerichtet und eine E2E-Testumgebung bereitgestellt",
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
        "title": "Entwurf einer Zustandsmaschine für die Übersetzungs-Nachbearbeitung und Aufbau einer fehlertoleranten Task-Infrastruktur",
        "summary": "Der Qualitätssicherungs- und Neuübersetzungsprozess nach der Übersetzung wird über eine 9-Zustände-Zustandsmaschine gesteuert. Die Ergebnisse jedes Schritts werden als unveränderliche Daten in der Datenbank gespeichert. Dadurch können Ursachenanalysen bei Übersetzungsfehlern allein per SQL durchgeführt und der Fortschritt jederzeit über die API abgerufen werden. Jeder Schritt wurde als idempotenter Celery-Task implementiert, sodass bei Container-Ausfällen die Queue-Informationen aus der Datenbank wiederhergestellt und die Verarbeitung fortgesetzt werden kann",
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
          "Zustandsübergangslogik und Geschäftslogik vollständig voneinander getrennt und eine lose gekoppelte, wartungsfreundliche Architektur entworfen und implementiert"
        ],
        "decisions": [
          {
            "title": "Steuerung des Übersetzungsvalidierungsprozesses durch eine Zustandsmaschine",
            "detail": "Der Zyklus aus Übersetzungsprüfung und Neuübersetzung wird über eine 9-Zustände-Zustandsmaschine gesteuert. Durch die Trennung von Zustandsübergangslogik und Geschäftslogik wird eine lose gekoppelte Struktur realisiert, bei der Änderungen an Verzweigungsbedingungen keine Auswirkungen auf andere Schritte haben"
          },
          {
            "title": "Immutable-Schema-Design mit Fokus auf Beobachtbarkeit",
            "detail": "Alle Schrittergebnisse werden als unveränderliche Daten in der Datenbank gespeichert. Bei Übersetzungsqualitätsproblemen können Ursachen per SQL analysiert werden, und die Daten können direkt für zukünftige KI-Modellverbesserungen genutzt werden. Der Verarbeitungsfortschritt lässt sich allein per DB-SELECT erfassen, was den Aufwand sowohl für Entwickler bei der Funktionsprüfung als auch für die Fachabteilung bei der Qualitätskontrolle reduziert"
          },
          {
            "title": "Fehlertolerantes Design durch idempotente Celery-Tasks",
            "detail": "Jeder Zustandsübergangsschritt wurde als idempotenter Celery-Task implementiert. Durch exponentielle Backoff- und Jitter-Retry-Konfiguration kann auch der API-Polling-Teil sicher wiederholt werden. Selbst wenn der Container abstürzt und die Redis-Queue verloren geht, können die Queue-Informationen aus dem DB-Status wiederhergestellt und die Verarbeitung fortgesetzt werden"
          }
        ],
        "outcomes": [
          {
            "before": "Der Fortschritt der Nachbearbeitung war eine Blackbox; die Funktionsprüfung erfolgte ausschließlich durch manuelle Loginspektion",
            "after": "Der Verarbeitungsstatus ist über eine einzelne API abrufbar. Übersetzungsqualitätsprobleme können per SQL analysiert werden, was den Prüfungsaufwand für Entwickler und Fachabteilung reduziert",
            "metric": "Verbesserung der Beobachtbarkeit und Wiederherstellungsfähigkeit bei Ausfällen"
          }
        ],
        "challenges": [
          {
            "title": "Design der Wiederherstellung bei Container-Ausfällen",
            "resolution": "Da die Redis-Queue flüchtig ist, wurde ein Mechanismus aufgebaut, der beim Container-Neustart die korrekten Queue-Informationen aus dem DB-Status wiederherstellt. Durch idempotentes Task-Design kann die Verarbeitung sicher ab dem Unterbrechungspunkt fortgesetzt werden"
          },
          {
            "title": "Trennung von Zustandsübergangslogik und Geschäftslogik",
            "resolution": "Die Verzweigungsbedingungen für Zustandsübergänge und die Geschäftslogik innerhalb der einzelnen Schritte werden als vollständig separate Module verwaltet. So wird ein lose gekoppeltes Design realisiert, bei dem Änderungen an einem Teil keine Auswirkungen auf den anderen haben, und die Wartbarkeit wird sichergestellt"
          }
        ]
      },
      {
        "title": "Erstellung einer Testspezifikation zur Regressionsvermeidung und Festlegung einer KI-gestützten Teststrategie",
        "summary": "Erstellung einer manuellen Testspezifikation zur Regressionsvermeidung nach dem ersten Release vor dem Refactoring. Ehrliche Bewertung der Zuverlässigkeitsgrenzen des nicht-deterministischen Verhaltens generativer KI (agent-browser) und Erarbeitung einer stufenweisen Migrationsstrategie von manuellen Tests über E2E- zu Komponententests. Für den eng an den OnlyOffice-Editor (Canvas-Implementierung) gekoppelten Teil wurde die realistische Entscheidung getroffen, auf E2E zu verzichten und auf manuelle Tests zu beschränken",
        "difficulty": "medium",
        "technologies": [
          "Storybook",
          "Playwright",
          "Vitest",
          "React Testing Library",
          "agent-browser"
        ],
        "highlights": [
          "Bewertung der Zuverlässigkeitsgrenzen des nicht-deterministischen Verhaltens generativer KI und Erarbeitung einer stufenweisen Testautomatisierungsstrategie (manuell → E2E → Komponententests)"
        ],
        "decisions": [
          {
            "title": "Teststrategie unter Berücksichtigung des nicht-deterministischen Verhaltens generativer KI (agent-browser)",
            "detail": "Statt KI unkontrolliert testen zu lassen, wurde eine stufenweise Testautomatisierungsstrategie erarbeitet: (1) Zunächst Systematisierung manueller Tests durch Testspezifikationen, (2) Migration zu deterministischen E2E- und Komponententests, (3) Einsatz von agent-browser ausschließlich zur Generierung deterministischen E2E-Testcodes statt für manuelle Tests"
          },
          {
            "title": "Teststrategie für eng an den OnlyOffice-Editor (Canvas-Implementierung) gekoppelte UI",
            "detail": "Das Faking des OnlyOffice-Editors würde die Testeffektivität verringern. Da E2E-Tests mit DOM-Relativpositionen auf Canvas instabil sind, wurde ehrlich entschieden, E2E für den OnlyOffice-gekoppelten Teil aufzugeben und auf manuelle Tests zu beschränken"
          }
        ],
        "outcomes": [
          {
            "before": "Keine Mittel zur Regressionsvermeidung beim Refactoring vorhanden; Teststrategie war nicht definiert",
            "after": "Testspezifikation zur Regressionsvermeidung erstellt und manuelle Tests systematisiert. Nach ehrlicher Bewertung der Zuverlässigkeitsgrenzen generativer KI wurde eine stufenweise Migrationsstrategie (manuell → E2E → Komponententests) erarbeitet. Die Beschränkung des OnlyOffice-gekoppelten Teils auf manuelle Tests wurde als realistische Entscheidung dokumentiert",
            "metric": "Systematisierung der Teststrategie und Qualitätssicherungsstruktur"
          }
        ],
        "challenges": [
          {
            "title": "Beurteilung der Grenzen der Testautomatisierung für eng an den OnlyOffice-Editor (Canvas-Implementierung) gekoppelte UI",
            "resolution": "Klare Trennung der Testobjekte in 'automatisierbare Bereiche' und 'Bereiche, die manuelle Tests erfordern'. Der OnlyOffice-gekoppelte Teil wird durch die Testspezifikation abgedeckt; für alle anderen UI- und API-Logiken wurde eine Automatisierungsstrategie mit E2E- und Komponententests erarbeitet"
          }
        ]
      },
      {
        "title": "Glossar-Design und Clean-Architecture-Entwurf für die Übersetzungsvalidierungsfunktion",
        "summary": "Entwurf des gesamten Domänenmodells, der Glossar-Datenstruktur und der Clean Architecture (UseCase/Repository/Domain-Trennung) für die Übersetzungsvalidierungsfunktion. Durch ein Schema-Design, das KI-Entscheidungen persistent in der Datenbank speichert, wurde die Beobachtbarkeit des Validierungsprozesses sichergestellt",
        "difficulty": "high",
        "technologies": [
          "Python",
          "FastAPI",
          "PostgreSQL"
        ],
        "highlights": [
          "Clean Architecture mit UseCase/Repository/Domain-Trennung für die gesamte Übersetzungsvalidierungslogik entworfen und die Aufgabenverteilung an Teammitglieder erleichtert"
        ],
        "decisions": [
          {
            "title": "Einführung einer 3-Schichten-Architektur mit UseCase/Repository/Domain-Trennung",
            "detail": "Die Übersetzungsvalidierungslogik wurde in drei Schichten aufgeteilt: UseCase (Steuerung des Geschäftsablaufs), Repository (Abstraktion des Datenzugriffs) und Domain (Domänenmodell und Validierung). Durch die Kapselung der KI-Aufrufe in der UseCase-Schicht wird der Wirkungsbereich bei KI-Modelländerungen begrenzt"
          },
          {
            "title": "Schema-Design zur persistenten Speicherung von KI-Entscheidungen in der Datenbank",
            "detail": "Alle Bewertungen der generativen KI in den einzelnen Validierungsschritten (Übersetzungsqualitätsbewertung, Neuübersetzungsbedarf, Terminologiekorrekturvorschläge) werden als DB-Datensätze persistent gespeichert. Dies bildet die Grundlage für die Datenakkumulation, die für zukünftige KI-Modellgenauigkeitsvergleiche und Prompt-Optimierungen benötigt wird"
          }
        ],
        "outcomes": [
          {
            "before": "Übersetzungsvalidierungslogik war ohne Entwurf und es gab keine Grundlage für die Aufgabenverteilung im Team",
            "after": "Durch die 3-Schichten-Architektur wurden die Verantwortlichkeiten jeder Schicht klar definiert. Es wurde eine Struktur aufgebaut, in der Teammitglieder die Repository- und UseCase-Schicht parallel entwickeln können, und das Designdokument diente als Grundlage für die Aufgabenverteilung",
            "metric": "Aufbau einer Designgrundlage für die Parallelentwicklung mit 4 Teammitgliedern"
          }
        ],
        "challenges": [
          {
            "title": "Integration der nicht-deterministischen KI-Ausgaben in das Domänenmodell",
            "resolution": "KI-Ausgaben wurden als 'Bewertungsergebnisse' typdefiniert und ein Ablauf entworfen, bei dem sie nach Validierung in der Domain-Schicht persistent in der Datenbank gespeichert werden. Die Struktur wurde so gestaltet, dass Änderungen am KI-Ausgabeformat durch die Validierung der Domain-Schicht aufgefangen werden können"
          }
        ]
      },
      {
        "title": "Implementierung eines Semi-Exact-Match-Algorithmus für die Anwendungsbeispielsuche im Glossar",
        "summary": "Implementierung eines Algorithmus für die Suche nach Anwendungsbeispielen im Übersetzungsglossar, der Schreibvarianten, Partikelunterschiede und Interpunktionsabweichungen toleriert und gleichzeitig semantisch präzise Treffer liefert. Lösung des Problems, dass Volltextsuche zu ungenau und exakte Suche zu viele Treffer übersieht",
        "difficulty": "high",
        "technologies": [
          "Python",
          "PostgreSQL"
        ],
        "highlights": [
          "Entwurf einer 'Semi-Exact-Match'-Suchlogik zwischen Volltextsuche und exakter Suche, die Schreibvarianten toleriert und gleichzeitig hochpräzise Terminologiesuche ermöglicht"
        ],
        "decisions": [
          {
            "title": "Entwurf einer 'Semi-Exact-Match'-Methode – weder Volltextsuche noch exakte Suche",
            "detail": "PostgreSQLs Volltextsuche (tsvector) liefert bei japanischen Partikeln und Interpunktionsunterschieden zu viele Treffer, während exakte Suche bei Schreibvarianten zu viele Ergebnisse übersieht. Es wurde ein Zwischenansatz entworfen, der nach Normalisierung (Interpunktionsentfernung, Leerzeichenvereinheitlichung, Partikelmusterzulassung) einen Zeichenkettenvergleich durchführt und so Präzision und Recall vereint"
          }
        ],
        "outcomes": [
          {
            "before": "Volltextsuche lieferte Sätze, die keinen Bezug zum Übersetzungsterminologie hatten; exakte Suche konnte aufgrund von Schreibvarianten die gewünschten Anwendungsbeispiele nicht finden",
            "after": "Durch den Semi-Exact-Match-Algorithmus werden nur semantisch korrekte Anwendungsbeispiele zurückgegeben, wobei Schreibvarianten, Partikelunterschiede und Interpunktionsabweichungen toleriert werden, was die Praxistauglichkeit des Glossars erheblich verbessert",
            "metric": "Verbesserung der Glossarsuchgenauigkeit (Reduzierung von Fehltreffern bei gleichzeitiger Verbesserung des Recalls)"
          }
        ],
        "challenges": [
          {
            "title": "Systematisierung von Schreibvariantenmustern im japanischen Text",
            "resolution": "Häufig auftretende Schreibvarianten aus Übersetzungsdokumenten (Mischung von Interpunktionszeichen, Partikelaustausch, Mischung von Voll-/Halbbreitezeichen) wurden gesammelt und klassifiziert. Als Normalisierungsregeln implementiert und durch Testfälle umfassend verifiziert"
          }
        ]
      },
      {
        "title": "Parallelisierung sequentieller Netzwerk-IO in Celery-Tasks mit asyncio",
        "summary": "Sequentielle Netzwerk-IO-Aufrufe an mehrere externe Services wie Übersetzungs-API und Glossar-API wurden durch parallele Ausführung mittels asyncio-Eventloop ersetzt. Ein Muster zur sicheren Integration von Celerys synchronem Worker-Modell mit asyncio wurde etabliert, was Latenz und Durchsatz verbessert",
        "difficulty": "high",
        "technologies": [
          "Python",
          "Celery",
          "asyncio"
        ],
        "highlights": [
          "Etablierung eines Musters zum sicheren Start eines asyncio-Eventloops innerhalb synchroner Celery-Worker und Parallelisierung der zuvor sequentiellen externen API-Aufrufe"
        ],
        "decisions": [
          {
            "title": "Einführung eines asyncio-Eventloop-Integrationsmusters innerhalb synchroner Celery-Worker",
            "detail": "Unter Beibehaltung von Celerys synchronem Worker-Modell (Prefork) wurde ein Muster übernommen, bei dem innerhalb des Tasks ein Eventloop per asyncio.run() gestartet wird. Die Alternative, Celery selbst auf Async-Worker umzustellen, wurde wegen hoher Kompatibilitätsrisiken im Ökosystem verworfen; ein ThreadPoolExecutor wurde abgelehnt, da Threads bei IO-Wartezeiten unnötig belegt würden"
          }
        ],
        "outcomes": [
          {
            "before": "Aufrufe an Übersetzungs-API und Glossar-API erfolgten sequentiell; durch sequentielles Warten auf 3 externe APIs war die Verarbeitungszeit pro Request hoch",
            "after": "Durch parallele Ausführung externer API-Aufrufe mittels asyncio.gather wurde die Verarbeitungszeit von der Summe der einzelnen API-Antwortzeiten auf die Antwortzeit der langsamsten API reduziert",
            "metric": "Latenzreduzierung und Durchsatzverbesserung beim externen API-Aufruf"
          }
        ],
        "challenges": [
          {
            "title": "Koexistenz von Celerys synchronem Ausführungsmodell mit asyncio",
            "resolution": "Da Celerys Prefork-Worker prozessbasiert sind, wurde ein Ansatz gewählt, bei dem in jedem Task ein neuer asyncio-Eventloop erstellt und nach Gebrauch verworfen wird. Durch Begrenzung des Eventloop-Lebenszyklus auf den Task-Scope wird eine Interferenz zwischen Workern ausgeschlossen"
          }
        ]
      },
      {
        "title": "Optimierung des Textabgleichsalgorithmus für Content-Control-Zuweisung",
        "summary": "Optimierung des Abgleichsalgorithmus zwischen Quelltext und Dokumentstruktur zur präzisen Markierung von Übersetzungszielstellen innerhalb von Dokumenten. Erreichung von sowohl Abgleichsgenauigkeit als auch Performance bei Großdokumenten",
        "difficulty": "extreme",
        "technologies": [
          "Python"
        ],
        "highlights": [
          "Optimierung des Suchalgorithmus zur Aufrechterhaltung der Genauigkeit bei gleichzeitig praxistauglicher Verarbeitungsgeschwindigkeit auch bei Großdokumenten"
        ],
        "decisions": [
          {
            "title": "Reduzierung des Suchraums durch stufenweise Abgleichsstrategie",
            "detail": "Der Abgleich zwischen Quelltext und Dokumentstruktur (Absätze, Zellen, Listeneinträge) wird in drei Stufen durchgeführt: exakte Übereinstimmung → normalisierte Übereinstimmung → Teilübereinstimmung. Durch Ausschluss der in höheren Stufen bestätigten Stellen aus dem Suchraum wird der Rechenaufwand reduziert und gleichzeitig die Genauigkeit beibehalten"
          }
        ],
        "outcomes": [
          {
            "before": "Bei Großdokumenten (über 100 Seiten) war die Abgleichsverarbeitung zeitaufwändig und die Genauigkeit der Content-Control-Zuweisung mangelhaft",
            "after": "Durch die stufenweise Abgleichsstrategie wurde auch bei Großdokumenten eine praxistaugliche Verarbeitungsgeschwindigkeit erreicht. Die Abgleichsgenauigkeit wurde verbessert und die Zuverlässigkeit der Markerzuweisung an Übersetzungszielstellen erhöht",
            "metric": "Verbesserung der Abgleichsgeschwindigkeit und -genauigkeit bei Großdokumenten"
          }
        ],
        "challenges": [
          {
            "title": "Trade-off zwischen Granularität der Dokumentstruktur-Aufteilung und Abgleichsgenauigkeit",
            "resolution": "Die Textaufteilungsgranularität wurde je Elementtyp der internen Word-Dokumentstruktur (Absätze, Tabellenzellen, Listeneinträge, Kopf-/Fußzeilen) angepasst. Das Problem, dass zu feine Aufteilung die Abgleichskandidaten erhöht und verlangsamt, während zu grobe Aufteilung die Teilübereinstimmungsgenauigkeit verringert, wurde durch elementtypspezifische Aufteilungsregeln gelöst"
          }
        ]
      },
      {
        "title": "Modernisierung der Frontend-Entwicklungsumgebung",
        "summary": "Einführung von Vite, Vitest, Storybook, Biome und Playwright in das bestehende Frontend zur grundlegenden Erneuerung der Entwicklungserfahrung und Codequalitätsinfrastruktur. Verbesserung der Build-Geschwindigkeit sowie Einrichtung einer Toolchain für Unit-Tests, UI-Katalog, Linter/Formatter und E2E-Tests",
        "difficulty": "high",
        "technologies": [
          "Vite",
          "Vitest",
          "Storybook",
          "Biome",
          "Playwright"
        ],
        "highlights": [
          "Einführung der 5 Tools Vite/Vitest/Storybook/Biome/Playwright und Aufbau der Infrastruktur für Tests, Qualitätsmanagement und UI-Katalog von Grund auf"
        ],
        "decisions": [
          {
            "title": "Auswahl von Vite + Biome (Ablösung von webpack + ESLint/Prettier)",
            "detail": "Migration der bestehenden webpack-basierten Build-Umgebung zu Vite und Konsolidierung von ESLint+Prettier zu Biome. Durch Vites schnelles Hot-Reloading und Biomes Hochgeschwindigkeits-Lint/Format wurde die Iterationsgeschwindigkeit der Entwicklung erheblich verbessert"
          },
          {
            "title": "Einführung von Volta zur Vereinheitlichung der Node.js-Versionsverwaltung",
            "detail": "Das Problem sporadischer Build-Fehler durch unterschiedliche Node.js-Versionen im Team wurde mit Volta gelöst. Die Version wurde im Projekt-Root fixiert und Umgebungsunterschiede zwischen Teammitgliedern beseitigt"
          }
        ],
        "outcomes": [
          {
            "before": "Weder Unit-Tests noch UI-Katalog, Linter oder E2E-Tests waren vorhanden; es gab keine objektiven Mittel zur Überprüfung der Codequalität",
            "after": "Integrierte Einführung der 5 Tools Vite (Build), Vitest (Unit-Tests), Storybook (UI-Katalog), Biome (Lint/Format) und Playwright (E2E) zur grundlegenden Erneuerung der Entwicklungsinfrastruktur",
            "metric": "Aufbau der Test- und Qualitätsmanagement-Infrastruktur (Neuaufbau von Null)"
          }
        ],
        "challenges": [
          {
            "title": "Koexistenz des bestehenden PHP-Projekts mit Vite",
            "resolution": "Entwurf einer Hybridkonfiguration, bei der die bestehende PHP+jQuery-Umgebung nicht beeinträchtigt wird und nur der React-Teil von Vite verwaltet wird. Aufbau einer Konfiguration, bei der Vites Build-Ausgabe aus dem PHP-Template geladen wird, um eine inkrementelle Migration zu ermöglichen"
          }
        ]
      },
      {
        "title": "Automatische Mock-Generierung für das Frontend aus der OpenAPI-Spezifikation des Python-Backends",
        "summary": "Aufbau eines Systems zur automatischen Generierung von TypeScript-Typdefinitionen, API-Clients und Mock-Handlern mittels MSW (Mock Service Worker) und Orval aus der von FastAPI automatisch generierten OpenAPI-Spezifikation. Die Frontend-Entwicklung ist nicht mehr von der Backend-Implementierung abhängig",
        "difficulty": "high",
        "technologies": [
          "MSW",
          "Orval",
          "FastAPI",
          "Storybook"
        ],
        "highlights": [
          "Aufbau einer Pipeline zur automatischen Generierung von Typdefinitionen, API-Clients und Mocks aus der OpenAPI-Spezifikation, wodurch die Backend-Abhängigkeit des Frontends beseitigt wurde"
        ],
        "decisions": [
          {
            "title": "Mock-Autogenerierungspipeline mit OpenAPI-Spezifikation als Single Source of Truth",
            "detail": "Die von FastAPI automatisch generierte OpenAPI-Spezifikation dient als einzige Vertrauensquelle. Eine Pipeline wurde entworfen, die mit Orval TypeScript-Typdefinitionen und API-Clients und mit MSW Mock-Handler automatisch generiert. Da bei manueller Mock-Erstellung die Nachverfolgung von API-Änderungen schwierig ist, werden durch automatische Generierung aus der Spezifikation Typsicherheit und Mock-Aktualität gleichzeitig gewährleistet"
          }
        ],
        "outcomes": [
          {
            "before": "Frontend-Entwicklung musste auf den Abschluss der Backend-API-Implementierung warten; parallele Entwicklung war nicht möglich",
            "after": "Durch automatische Mock-Generierung aus der OpenAPI-Spezifikation kann die Frontend-Entwicklung beginnen, sobald die API-Definition des Backends feststeht. Die Mock-API funktioniert auch in Storybook, sodass UI-Funktionsprüfungen ohne Backend durchgeführt werden können",
            "metric": "Herstellung der Parallelität der Entwicklung zwischen Frontend und Backend"
          }
        ],
        "challenges": [
          {
            "title": "Aufrechterhaltung der Typkonsistenz zwischen OpenAPI-Schema und Orval/MSW",
            "resolution": "Automatisierung der Neugenerierung aus dem OpenAPI-Schema in der CI, sodass bei Backend-API-Änderungen die Typdefinitionen und Mocks des Frontends automatisch nachgeführt werden. Typinkonsistenzen werden sofort als TypeScript-Kompilierungsfehler erkannt"
          }
        ]
      },
      {
        "title": "Aufbau einer Pull-basierten Deploy-Infrastruktur mit Docker Compose + GHCR",
        "summary": "Erstellung einer Reihe von Automatisierungsskripten für den Ablauf: Build mit Docker Compose → Push zu GHCR → Pull-basiertes Deployment auf dem Produktionsserver. Einrichtung der GHCR-Image-Verwaltung, Sichtbarkeitseinstellungen und Berechtigungen sowie des cronbasierten Pull-Deployments auf dem Produktionsserver",
        "difficulty": "high",
        "technologies": [
          "Docker",
          "GitHub Actions"
        ],
        "highlights": [
          "Migration von manuellem SSH+SCP-Deployment zu Docker Compose+GHCR Pull-basiertem Deployment und Etablierung eines reproduzierbaren Deploy-Workflows"
        ],
        "decisions": [
          {
            "title": "Einführung von GHCR-Pull-basiertem Deployment (Migration von manueller SSH+SCP-Methode)",
            "detail": "Migration von einer Methode, bei der Entwickler sich per SSH am Server anmeldeten und Dateien per SCP hochluden, zu einem Pull-basierten Deployment, bei dem Images zu GHCR gepusht und vom Produktionsserver per Cron gepullt werden. Sicherstellung der Reproduzierbarkeit des Deployments und Ermöglichung sofortiger Rollbacks durch Image-Tag-Wechsel"
          },
          {
            "title": "Design der GHCR-Sichtbarkeits-/Berechtigungseinstellungen und Image-Verwaltung",
            "detail": "Verwaltung der Image-Sichtbarkeit der GitHub Container Registry auf Organisationsebene und Einrichtung der für den Pull vom Produktionsserver erforderlichen Berechtigungen (Personal Access Token + read:packages Scope). Auch die Tag-Namenskonventionen für Images wurden entworfen"
          }
        ],
        "outcomes": [
          {
            "before": "Deployment war durch manuelles SSH+SCP personenabhängig und es bestand das Risiko von Ausfällen durch Verfahrensfehler. Kein Rollback-Mechanismus vorhanden",
            "after": "Reproduzierbarkeit durch Pull-basiertes Deployment mit Docker Compose+GHCR sichergestellt. Einfache Rollbacks durch cronbasiertes automatisches Pulling und Image-Tag-Verwaltung ermöglicht",
            "metric": "Automatisierung des Deployments und Herstellung der Reproduzierbarkeit"
          }
        ],
        "challenges": [
          {
            "title": "Sicherstellung der Zuverlässigkeit des cronbasierten Pull-Deployments",
            "resolution": "Health-Check, Image-Differenzerkennung und Rollback-Funktionalität in das Pull-Skript integriert; bei fehlgeschlagenem Pull eines neuen Images wird der bestehende Container beibehalten"
          }
        ]
      },
      {
        "title": "TLS/CORS-Konfiguration des OnlyOffice-Servers über Docker-Umgebungsvariablen steuerbar gemacht",
        "summary": "TLS-Zertifikats- und CORS-Origin-Einstellungen des OnlyOffice-Dokumentenservers wurden durch Skript-Injection beim Docker-Start aus Umgebungsvariablen konfigurierbar gemacht. Erleichterte Umschaltung der Konfiguration je Umgebung",
        "difficulty": "medium",
        "technologies": [
          "Docker"
        ],
        "highlights": [
          "Ansatz der Steuerung über Umgebungsvariablen durch Startup-Skript-Injection ohne direkte Bearbeitung der OnlyOffice-Konfigurationsdateien"
        ],
        "decisions": [
          {
            "title": "Externalisierung der OnlyOffice-Konfiguration durch Skript-Injection",
            "detail": "Da direktes Mounten von OnlyOffice-Konfigurationsdateien bei Versionsupgrades zu Kompatibilitätsproblemen führt, wurde ein Ansatz gewählt, bei dem beim Docker-Start ein Entrypoint-Skript die Konfigurationsdateien dynamisch aus Umgebungsvariablen generiert. TLS-Zertifikatspfad und CORS-Origin können über Umgebungsvariablen umgeschaltet werden"
          }
        ],
        "outcomes": [
          {
            "before": "TLS/CORS-Einstellungen von OnlyOffice waren in Konfigurationsdateien hartcodiert und bei Umgebungswechsel war manuelle Bearbeitung erforderlich",
            "after": "TLS-Zertifikatspfad und CORS-Origin über Docker-Umgebungsvariablen steuerbar gemacht; automatische Konfigurationsumschaltung für Entwicklungs-, Staging- und Produktionsumgebungen",
            "metric": "Automatisierung der Umgebungsumschaltung und Externalisierung der Konfiguration"
          }
        ]
      },
      {
        "title": "Dokumentation der E2E-Entwicklungsumgebung mit lokaler/Remote-Mischkonfiguration",
        "summary": "Aufbereitung der Einrichtungsschritte für eine E2E-Entwicklungsumgebung, die lokales React+Python mit PHP auf einem Remote-Server verbindet, als reproduzierbare Dokumentation. Erstellung eines Handbuchs einschließlich Docker Compose, Netzwerkeinstellungen und Umgebungsvariablenverwaltung zur Effizienzsteigerung des Onboardings neuer Teammitglieder",
        "difficulty": "medium",
        "technologies": [
          "Docker",
          "Python",
          "FastAPI"
        ],
        "highlights": [
          "Dokumentation der Reproduktionsschritte für die lokale/Remote-Mischumgebung zur Reduzierung des Einrichtungsaufwands für neue Teammitglieder"
        ],
        "decisions": [
          {
            "title": "Standardisierung der Umgebungseinrichtung durch Docker-Compose-Integration",
            "detail": "Zusammenfassung von Docker-Compose-Netzwerkeinstellungen, Umgebungsvariablenvorlagen und Verbindungsprüfungsschritten zur Verbindung lokaler React+Python-Container mit Remote-PHP+OnlyOffice in einem einzigen Dokument. Ziel war es, dass neue Teammitglieder die E2E-Umgebung durch Befolgen der Dokumentation reproduzieren können"
          }
        ],
        "outcomes": [
          {
            "before": "Einrichtungsschritte wurden mündlich weitergegeben und waren personenabhängig; Umgebungseinrichtung neuer Teammitglieder dauerte 1-2 Tage",
            "after": "Durch reproduzierbare Dokumentation wurde die Personenabhängigkeit der Einrichtungsschritte beseitigt. Schritt-für-Schritt-Dokumentation einschließlich Docker Compose, Netzwerkeinstellungen und Umgebungsvariablen erstellt",
            "metric": "Effizienzsteigerung beim Onboarding neuer Teammitglieder"
          }
        ]
      },
      {
        "title": "Aufbau einer Playwright-E2E-Testumgebung und Implementierung von Testszenarien",
        "summary": "Aufbau einer E2E-Testumgebung mit Playwright, die den gesamten Übersetzungsworkflow der React/Python/OnlyOffice-Integration abdeckt. Da E2E-Tests für OnlyOffice-Canvas-Elemente Grenzen haben, wurde eine klare Abgrenzung zwischen testbaren und manuell zu testenden Bereichen vorgenommen",
        "difficulty": "high",
        "technologies": [
          "Playwright",
          "Docker"
        ],
        "highlights": [
          "Implementierung von Regressionstestszenarien für den gesamten Übersetzungsworkflow mit klarer Abgrenzung zwischen automatisierbaren und manuell zu testenden Bereichen"
        ],
        "decisions": [
          {
            "title": "Klare Grenzziehung zwischen automatisierbaren und manuell zu testenden Bereichen",
            "detail": "Da stabile E2E-Tests mit Playwright für Canvas-abhängige Operationen des OnlyOffice-Editors schwierig sind, wurden die Testobjekte in 'Übersetzungsworkflow-Bedienungsablauf und API-Integration' und 'Dokumentoperationen innerhalb von OnlyOffice' aufgeteilt; nur erstere werden durch E2E-Tests abgedeckt"
          }
        ],
        "outcomes": [
          {
            "before": "Keine E2E-Testumgebung vorhanden; Regressionstests bei Feature-Ergänzungen und Refactoring nur manuell",
            "after": "Implementierung von Regressionstestszenarien für den gesamten Übersetzungsworkflow (Datei-Upload → Übersetzungsausführung → Ergebnisprüfung) mit Playwright. Automatische Ausführung von Integrationstests mit React+Python+PostgreSQL in der Docker-Umgebung ermöglicht",
            "metric": "Automatisierung von Regressionstests durch E2E-Tests (Abdeckung des testbaren Bereichs)"
          }
        ],
        "challenges": [
          {
            "title": "Aufbau einer Testumgebung für die 3-Service-Integration von React+Python+OnlyOffice",
            "resolution": "Entwurf einer Netzwerkkonfiguration, bei der die 3 Services per Docker Compose gestartet werden und vom Playwright-Testrunner erreichbar sind. Verwaltung der Testdaten-Initialisierung und -Bereinigung als Fixtures zur Sicherstellung der Testunabhängigkeit"
          }
        ]
      },
      {
        "title": "Aufbau eines Entwicklungseffizienz-Dashboards, Log-Aggregations-MCP und Story-Generierungs-Agent",
        "summary": "Erstellung eines Dashboards zur Visualisierung des Celery-Task-Ausführungsstatus und der Erfolgs-/Fehlerrate der Übersetzungsvalidierung. Zusätzlich Aufbau eines MCP-Servers zur Durchsuchung verteilter Logs aus Claude Code heraus sowie eines Sub-Agenten zur automatischen Generierung von Storybook Stories aus Komponenten, was die Entwicklungseffizienz steigerte",
        "difficulty": "medium",
        "technologies": [
          "Python",
          "Storybook",
          "agent-browser"
        ],
        "highlights": [
          "Aufbau einer Entwicklungsunterstützungsinfrastruktur unter Einsatz von KI-Tools: MCP-Server für Logsuche und Agent zur automatischen Story-Generierung"
        ],
        "decisions": [
          {
            "title": "Claude-Code-Integration verteilter Logs über MCP-Server",
            "detail": "Aufbau eines MCP-Servers, der eine übergreifende Suche in den auf React-, Python- und Celery-Container verteilten Logs direkt aus Claude Code ermöglicht. Statt bisher individuell docker logs + grep auszuführen, ermöglicht die MCP-Tool-Integration die Logsuche und -filterung direkt aus der Claude-Code-Konversation heraus"
          },
          {
            "title": "Automatische Storybook-Story-Generierung durch agent-browser",
            "detail": "Aufbau eines Sub-Agenten zur automatischen Generierung von Storybook Stories aus bestehenden React-Komponenten. agent-browser analysiert die Komponentenimplementierung und generiert automatisch Story-Dateien, die Props und Zustandsmuster umfassend abdecken, was die Erstellung des UI-Katalogs beschleunigt"
          }
        ],
        "outcomes": [
          {
            "before": "Logprüfung verteilter Container erforderte manuelles Ausführen von docker logs + grep und Fehleranalysen dauerten lange. Storybook Stories mussten auch für jede UI-Komponente manuell erstellt werden",
            "after": "Über den MCP-Server ist eine übergreifende Logsuche direkt aus Claude Code möglich. Zusätzlich wurde ein Dashboard zur Visualisierung des Celery-Task-Ausführungsstatus und der Erfolgs-/Fehlerrate der Übersetzungsvalidierung erstellt, was die Effizienz bei Fehleranalyse und Qualitätsmonitoring verbesserte",
            "metric": "Verbesserung der Fehleranalyse, Entwicklungseffizienz und Beschleunigung der UI-Katalog-Erstellung"
          }
        ]
      }
    ]
  },
  {
    "id": "learning-platform-consulting-2025",
    "company": "Mittelständisches Online-Lernplattform-Unternehmen",
    "companyDesc": "Mittelständisches Unternehmen, das eine Online-Lernplattform anbietet. Technische Analyse und Beratungsunterstützung für kurzfristige Erweiterungswünsche an ein integriertes Unternehmenssystem.",
    "role": "Technische Analyse und Dokumentenerstellung",
    "roles": ["Consulting"],
    "period": "2025-05 — 2025-07",
    "teamSize": 2,
    "summary": "Quantifizierung der Codequalität eines VBScript/Oracle-basierten Legacy-Systems mit SonarQube und Unterstützung bei der Strategieauswahl durch eine 3-Optionen-Vergleichsmatrix (Überarbeitung/ERP-Einführung/Browsererweiterung). Aufbau einer RAG-basierten internen Dokumentensuchinfrastruktur mit NotebookLM+markitdown. Ergebnisse innerhalb von ca. 2 Monaten Kurzberatung unter Einsatz generativer KI-Tools erzielt",
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
        "title": "Aufbau einer RAG-basierten Suchinfrastruktur für interne Dokumente",
        "summary": "Umwandlung interner Dokumente in Markdown mittels markitdown und Einrichtung einer RAG-basierten Suchumgebung mit NotebookLM. Effiziente Extraktion und Aufbereitung von Qualitätsproblemen durch Integration von Claude Desktop und SonarQube über MCP.",
        "difficulty": "medium",
        "technologies": [
          "SonarQube",
          "NotebookLM",
          "markitdown",
          "Claude"
        ],
        "highlights": [
          "Entwurf der Architektur für die RAG-basierte Suchinfrastruktur mit NotebookLM+markitdown und Aufbau der Dokumentenkonvertierungspipeline",
          "Vorschlag eines kostengünstigen Schnellansatzes durch Nutzung bestehender SaaS (NotebookLM) statt kundenspezifischer RAG-Entwicklung"
        ],
        "decisions": [
          {
            "title": "Aufwandsarmer RAG-Aufbau mit NotebookLM + markitdown",
            "detail": "Einsatz von Googles NotebookLM mit markitdown zur Textkonvertierung interner Dokumente (PDF/Word/Excel) und anschließender Einspeisung. Statt kundenspezifischer RAG-Entwicklung wurde die Nutzung bestehender SaaS zur Kostenminimierung gewählt"
          }
        ],
        "outcomes": [
          {
            "before": "Interne Dokumente waren über Abteilungsserver und Cloud-Speicher verstreut; eine übergreifende Suche war nicht möglich. Das Auffinden benötigter Informationen war zeitaufwändig",
            "after": "Aufbau einer RAG-basierten Suchinfrastruktur mit NotebookLM + markitdown. Interne Dokumente in Markdown umgewandelt und eingespeist, sodass eine übergreifende Suche in natürlicher Sprache möglich wurde. Innerhalb von ca. 2 Wochen Beratungszeitraum wurde eine praxistaugliche Suchumgebung realisiert",
            "metric": "Effizienzsteigerung bei der Suche in internen Dokumenten"
          }
        ],
        "challenges": [
          {
            "title": "Umwandlung interner Dokumente verschiedener Dateiformate in ein RAG-suchbares Format",
            "resolution": "Einsatz von markitdown zur Konvertierung von PDF/Word/Excel in Markdown-Format. Aufbau einer Konvertierungspipeline, die Strukturinformationen (Überschriften, Tabellen, Listen) weitestgehend beibehält. Manuelle Qualitätsprüfung des konvertierten Markdowns und bei Bedarf Korrektur vor Einspeisung in NotebookLM"
          }
        ]
      },
      {
        "title": "Codestrukturanalyse und Erweiterbarkeitsanalyse des Legacy-Systems",
        "summary": "Statische Analyse des VBScript/Oracle-basierten Legacy-Systems mit Cursor/SonarQube/Claude Desktop. Analyse von Erweiterbarkeit, Überarbeitungsschwierigkeit und Abhängigkeiten; Aufbereitung und Vergleich der Optionen ERP, Bestandsüberarbeitung und Erweiterung.",
        "difficulty": "medium",
        "technologies": [
          "SonarQube",
          "Cursor",
          "ChatGPT",
          "Claude"
        ],
        "highlights": [
          "Durchführung der statischen Analyse mit SonarQube und Erstellung eines modulweisen Überarbeitungsrisiko-Bewertungsberichts",
          "Bereitstellung einer quantitativen Grundlage für den Browsererweiterungs-Ansatz durch Visualisierung der Überarbeitungsrisiken auf Basis quantitativer Daten"
        ],
        "decisions": [
          {
            "title": "Quantifizierung der Legacy-Codequalität durch SonarQube",
            "detail": "Statische Analyse des gesamten Codes mit SonarQube und quantitative Messung der Indikatoren für Bugs, Code-Smells, Duplikationsrate und Testabdeckung. Aufbereitung objektiv bewertbarer Daten zur Einschätzung der Überarbeitungsrisiken"
          },
          {
            "title": "Vorschlag zur Überarbeitungspriorisierung auf Basis quantitativer Daten",
            "detail": "Strukturierung der statischen Analyseergebnisse auf Modulebene und Zuordnung von Stellen mit hohem Überarbeitungsrisiko und deren Auswirkungsbereich. Vorschlag der Überarbeitungspriorisierung auf Basis quantitativer Grundlagen"
          }
        ],
        "outcomes": [
          {
            "before": "Keine objektive Bewertung der Codequalität vorhanden; Überarbeitungsrisiken unklar",
            "after": "Quantitative Bewertung der Codequalität durch SonarQube-Analyse. Identifizierung von Stellen mit hohem Überarbeitungsrisiko und Visualisierung des Gesamtbilds der technischen Schulden",
            "metric": "Objektivierung der Überarbeitungsrisiken auf Basis quantitativer Bewertung. Verwendung als Entscheidungsgrundlage für den Browsererweiterungs-Ansatz"
          }
        ],
        "challenges": [
          {
            "title": "Analyse in einer Legacy-Umgebung ohne Versionskontrolle und ohne Tests",
            "resolution": "Quantifizierung der Qualität durch statische Analyse mit SonarQube und Untersuchung über eine schreibgeschützte Replik der Oracle-Datenbank, ohne die Produktionsumgebung zu beeinträchtigen. Zusammenfassung der Analyseergebnisse als Slide-Bericht und Visualisierung der technischen Risiken für die Geschäftsleitung"
          }
        ]
      },
      {
        "title": "PoC-Konzeption für Kurzfrist-Erweiterung und Erstellung von Entscheidungsunterlagen",
        "summary": "Erstellung von Vorschlagsunterlagen unter intensiver Nutzung von Fluss- und Strukturdiagrammen in Mermaid-Notation. Beschleunigung der Dokumentenerstellung in kurzen Iterationen unter Einsatz generativer KI wie Genspark, Gamma und Canva.",
        "difficulty": "medium",
        "technologies": [
          "Genspark",
          "Gamma",
          "Canva",
          "Mermaid"
        ],
        "highlights": [
          "Entwurf einer 3-Optionen-Vergleichsmatrix mit 7 Bewertungsachsen und eines Entscheidungsbaums sowie Erarbeitung einer PoC-Architektur für React-Browsererweiterung",
          "Zuordnung der Anforderungen von 6 Abteilungen in 3 Kategorien: 'per Erweiterung umsetzbar / Überarbeitung erforderlich / ERP-abhängig' mit Darstellung des Realisierungsausblicks je Abteilung"
        ],
        "decisions": [
          {
            "title": "Unterstützung der Strategieauswahl durch ein 3-Optionen-Vergleichsframework",
            "detail": "Erstellung einer Matrix zum Vergleich von 3 Optionen anhand von 7 Bewertungsachsen (Entwicklungsrisiko, Kosten, Zeitrahmen, Qualitätssicherung, Betriebsauswirkung, Erweiterbarkeit, ROI) und Visualisierung des Entscheidungsflusses im Entscheidungsbaum-Format"
          },
          {
            "title": "Vorschlag eines risikoarmen Verbesserungsansatzes per React-Browsererweiterung",
            "detail": "Vorschlag eines Ansatzes, bei dem eine React-UI als Chrome-Erweiterung über die Legacy-Oberfläche gelegt wird. PoC-Entwurf zur Implementierung von hierarchischen Dropdown-Menüs für Rabattmastertabellen auf der Frontend-Seite ohne Änderung der bestehenden Datenbank oder Backend-Logik"
          }
        ],
        "outcomes": [
          {
            "before": "Keine Entscheidungskriterien für die verschiedenen Erweiterungsansätze (Überarbeitung/ERP/Erweiterung) vorhanden; Geschäftsleitung konnte keine Entscheidung treffen",
            "after": "Unterstützung der Strategieauswahl durch 3-Optionen-Vergleichsmatrix + Entscheidungsbaum. Entwurf einer PoC-Architektur für React-Browsererweiterung (Lambda+S3+IndexedDB+Chrome Extension) mit konkreter Implementierungsrichtung am Anwendungsfall der flexiblen Rabattkriterien",
            "metric": "Browsererweiterung als Kurzfristmaßnahme genehmigt. ERP-Einführung als mittel-/langfristiger Plan (2-3 Jahre) mit separater Budgetplanung in Prüfung"
          }
        ],
        "challenges": [
          {
            "title": "Zusammenstellung und Machbarkeitsbewertung der Anforderungen von 6 Abteilungen",
            "resolution": "Alle Anforderungen als Interviewergebnisse in Excel zusammengefasst und in 3 Kategorien eingeteilt: 'per Browsererweiterung umsetzbar', 'Überarbeitung des Bestandscodes erforderlich', 'ERP-abhängig'. Prioritäten mit Sternen dargestellt und visualisiert, in welcher Phase die Anforderungen jeder Abteilung realisiert werden"
          }
        ]
      }
    ]
  },
  {
    "id": "ai-translation-qcd-2025",
    "company": "Japanisches KI-Übersetzungs-SaaS-Startup",
    "companyDesc": "Japanisches Startup, das ein KI-gestütztes Übersetzungs-SaaS anbietet. Zuständig für Beratungsvorschläge zur QCD-Verbesserung im Personalbereich der Entwicklungsorganisation.",
    "role": "Berater für die Entwicklungsorganisation",
    "roles": ["Consulting"],
    "period": "2025-04 — 2025-07",
    "teamSize": 2,
    "summary": "Strukturanalyse der QCD-Herausforderungen (Qualität, Kosten, Lieferzeit) als externer Berater für eine ca. 30-köpfige Entwicklungsorganisation. Strukturierung von 100 Hypothesen mittels MECE x Issue Tree und Objektivierung der Maßnahmenprioritäten durch 5-Achsen-gewichtetes Scoring. Erstellung einer 6-Phasen-Umsetzungs-Roadmap und Managementvorschlagsunterlagen, COO-Genehmigung im Managementmeeting erhalten",
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
        "title": "Strukturanalyse der QCD-Herausforderungen der Entwicklungsorganisation",
        "summary": "Untersuchung der Ursachen für sinkende Entwicklungsgeschwindigkeit und Qualität sowie Aufbereitung technischer und organisatorischer Herausforderungen. Vertiefende Analyse struktureller Organisationsprobleme wie Code-Management, Review-Prozess, Release-Verfahren und personenabhängige Strukturen.",
        "difficulty": "high",
        "technologies": [
          "SonarQube",
          "Cursor",
          "NotebookLM"
        ],
        "highlights": [
          "Strukturierung von 100 Hypothesen mittels MECE x Issue Tree und Extraktion von 8 Kernproblemen durch 5-Achsen-Scoring. Neutrale Beschreibung organisationspolitischer Probleme als Systemprobleme"
        ],
        "decisions": [
          {
            "title": "Strukturierungsansatz von 100 Hypothesen mittels MECE x Issue Tree",
            "detail": "Kombination von MECE (Mutually Exclusive, Collectively Exhaustive) und Issue-Tree-Methodik mit quantitativem 5-Achsen-Scoring (Beitrag zur Release-Geschwindigkeit, Beitrag zur Fehlerrate, Umsetzbarkeit, Messbarkeit, Lead Time) zur umfassenden Auflistung und Bewertung von 100 Hypothesen"
          },
          {
            "title": "Priorisierung der 8 Kernprobleme und organisatorische Zuordnung",
            "detail": "Anhand des Beitrags zum Hauptproblem 'sinkende Delivery-Leistung der Bestandsanwendung' wurden 3 Probleme mit direktem Bezug zu Implementierern vertieft analysiert und die verbleibenden 5 nach Stakeholdern geordnet. Alle 8 Probleme nach Wichtigkeit sortiert"
          }
        ],
        "outcomes": [
          {
            "before": "Probleme waren fragmentiert und das Gesamtbild unklar. Interviewergebnisse waren subjektiv und eine Priorisierung nicht möglich",
            "after": "Strukturierung von 100 Hypothesen mittels MECE x Issue Tree und Extraktion von 8 Kernproblemen durch 5-Achsen-Scoring. Aufbau einer Problemlandkarte, die die Geschäftsleitung als Entscheidungsgrundlage nutzen kann",
            "metric": "Strukturierung von 100 Hypothesen zu 8 Kernproblemen abgeschlossen. Quantitative Bewertung mit Top-Hypothese Score 4,35 (höchster) bis 1,9 (niedrigster) realisiert"
          }
        ],
        "challenges": [
          {
            "title": "Problemstrukturierung bei Mangel an quantitativen Daten",
            "resolution": "Statt auf quantitative Daten angewiesen zu sein, wurden Hypothesen mittels MECE x Issue Tree strukturiert und durch 5-Achsen-Scoring relativ bewertet. Entwicklung eines eigenen Frameworks zur Umwandlung von Interviewinhalten in 'Problemgewichtungen'"
          },
          {
            "title": "Neutrale Beschreibung organisationspolitischer Probleme",
            "resolution": "Ohne Namensnennung als Systemprobleme wie 'Entscheidungsstruktur' und 'Unklarheit der Genehmigungsbefugnisse' beschrieben; Lösungsvorschläge als institutionelles Design statt als persönliche Kritik formuliert"
          }
        ]
      },
      {
        "title": "Aufbau eines Bewertungsframeworks für QCD-Verbesserungsmaßnahmen und einer Umsetzungsprioritätenmatrix",
        "summary": "Recherche und Aufbereitung von Verbesserungsmaßnahmen auf Basis der Achsen Qualität, Kosten und Lieferzeit. Quantitative Bewertung jeder Maßnahme nach 'Auswirkung x Machbarkeit'. Implementierung einer gewichteten Matrix und Prioritätencharts in den Unterlagen sowie Darstellung eines stufenweisen Umsetzungsplans mit Gantt-Diagramm und Verantwortlichkeitsmatrix.",
        "difficulty": "high",
        "technologies": [
          "ChatGPT",
          "Gamma",
          "Mermaid"
        ],
        "highlights": [
          "Entwurf einer 5-Achsen-gewichteten Scoring-Funktion und automatische Generierung einer 6-Phasen x 3-Wochen-Roadmap mittels RANK.EQ-Funktion"
        ],
        "decisions": [
          {
            "title": "Objektivierung der Maßnahmenprioritäten durch 5-Achsen-gewichtetes Scoring",
            "detail": "Entwurf einer Scoring-Funktion mit gewichteten 5 Achsen: Q-Beitrag (0,1), C-Beitrag (0,1), D-Beitrag (0,4), monetäre Kosten (0,1) und Aufwand (0,3). Gewichtung mit Fokus auf D-Beitrag (Lieferzeit) und Aufwand"
          },
          {
            "title": "Entwurf einer 6-Phasen x 3-Wochen-Stufenumsetzungs-Roadmap",
            "detail": "Automatische Zuordnung der Score-Rangfolge zu Phasennummern mittels RANK.EQ-Funktion und automatische Generierung eines 6-Phasen x 3-Wochen-Gantt-Diagramms. Jede Phase enthält 4-5 Maßnahmen, wobei die Ergebnisse der Vorphase als Voraussetzung für die nächste Phase dienen"
          }
        ],
        "outcomes": [
          {
            "before": "Prioritäten von 27 Maßnahmen unklar; Entscheidungsfindung der Geschäftsleitung verzögert",
            "after": "Aufbau eines Umsetzungsplans mit monatlich sichtbarem Fortschritt durch 5-Achsen-gewichtetes Scoring + 6-Phasen-Roadmap",
            "metric": "Top-5-Maßnahmen in einem einzigen Managementmeeting genehmigt. Ziel: 30% Steigerung der Release-Geschwindigkeit und 30% Reduktion der Fehlerrate in 4 Monaten (Planwert)"
          }
        ],
        "challenges": [
          {
            "title": "Aufbau eines objektiven Bewertungsframeworks für Maßnahmenprioritäten",
            "resolution": "5-Achsen-gewichtetes Scoring in Excel implementiert und die Begründung der Gewichtung vorab mit dem COO abgestimmt, um Objektivität und Transparenz der Scoring-Ergebnisse sicherzustellen"
          }
        ]
      },
      {
        "title": "Entwurf und Erstellung der Präsentationsunterlagen für das Managementmeeting",
        "summary": "Zur Förderung der Konsensbildung bei nicht-technischen Führungskräften wurden Fluss-, Sequenz- und Entscheidungsdiagramme in Mermaid-Notation intensiv eingesetzt. Unter Nutzung der RAG-Infrastruktur von NotebookLM wurden die Entscheidungsunterlagen für das Management federführend erstellt.",
        "difficulty": "medium",
        "technologies": [
          "NotebookLM",
          "Gemini",
          "Genspark",
          "Mermaid"
        ],
        "highlights": [
          "Federführende Erstellung einer 2-teiligen Managementvorlage (23+10 Slides). Technische Probleme als QCD-Auswirkungen neu definiert und durch Kausalitätsketten erklärt"
        ],
        "decisions": [
          {
            "title": "2-teiliges Design der Managementvorlage (Personaloptimierung + Ticketsystem-Redesign)",
            "detail": "Unterlagen in 2 Teilen gestaltet: 'Vorschlag zur Personaloptimierung der Entwicklungsorganisation im KI-Übersetzungsgeschäft' (23 Slides, Gesamtbild) und 'QCD-Verbesserung durch Redesign der Ticketmanagement-Infrastruktur' (10 Slides, Vertiefung)"
          },
          {
            "title": "Jira-Einheitsplattform-Vorschlag und Entscheidungsunterstützung durch Tool-Vergleich",
            "detail": "Erstellung einer Vergleichstabelle für 4 Optionen (Notion, Planio, Notion+Planio-Kombination, Jira) anhand 5 Achsen: Ticket-Strukturflexibilität, abteilungsübergreifende Zusammenarbeit, UI/UX, Workflow-Design und Tool-Integration. Empfehlung: Jira + Jira Service Management"
          }
        ],
        "outcomes": [
          {
            "before": "Keine Möglichkeit zur Erklärung technischer Probleme gegenüber der Geschäftsleitung; Genehmigung von Verbesserungsinvestitionen war schwierig",
            "after": "2-teilige Managementvorlage (23+10 Slides) visualisiert das Gesamtbild der QCD-Verbesserung und konkrete Maßnahmen. Entscheidungsunterstützung durch Tool-Vergleichstabelle und RACI-Chart",
            "metric": "COO hat PoC-Durchführung genehmigt. Entscheidung zur Vereinheitlichung des Ticketmanagements und Start der Jira-Einführungsevaluierung getroffen"
          }
        ],
        "challenges": [
          {
            "title": "Erklärung technischer Probleme gegenüber nicht-technischer Geschäftsleitung",
            "resolution": "Technische Probleme als QCD-Auswirkungen (Qualität, Kosten, Lieferzeit) neu definiert und durch Kausalitätsketten erklärt, z.B. 'Fehlerausbreitung → Nacharbeit → Kostenerhöhung'. Festlegung von KPI-Zielwerten (Fehlerrate -40%, Lead Time -25%) zur Quantifizierung der Verbesserungseffekte"
          }
        ]
      }
    ]
  },
  {
    "id": "factory-maintenance-app-2024",
    "company": "Startup für industrielle Wartungsanwendungen",
    "companyDesc": "SaaS-Startup, das Fabrikausrüstungswartung in der Fertigungsindustrie unterstützt. Zuständig für die Fullstack-Entwicklung der Werkswartungsanwendung.",
    "role": "Fullstack-Entwickler",
    "roles": ["Frontend", "Backend", "Infra"],
    "period": "2024-10 — 2025-03",
    "teamSize": 4,
    "summary": "Mandantenfähiges SaaS zur Verwaltung von Anlagenwartung und Inspektionsarbeiten in der Fertigungsindustrie. Durchgängige Verantwortung für Backend (NestJS + GraphQL + PostgreSQL) und Frontend (React + Apollo Client). Entwurf und Implementierung von Kernfunktionen wie RFC5545-konformer Wiederholungsaufgabenfunktion, RBAC+ReBAC 3-Achsen-Zugriffskontrolle, Google-Kalender-ähnlicher Task-UI und feldweiser sequentieller Speicherung",
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
        "title": "Entwurf und Implementierung der RFC5545-konformen Wiederholungsaufgabenfunktion",
        "summary": "Abdeckung von jährlichen, monatlichen (n-te Woche/n-ter Wochentag/n-ter Tag), wöchentlichen (mehrere Wochentage) und täglichen Wiederholungen einschließlich Sammelaktualisierung, Überspringen und Endbedingungen. Schema-, API- und Batch-Design, das nicht-materialisierte und materialisierte Aufgaben trennt und gleichzeitig in einer einheitlichen Ansicht darstellt. Architekturwahl: Redis+SQS+EventBridge für Vortags-Batch-Materialisierung.",
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
          "Analyse der RFC5545-Spezifikation und Architekturentwurf für Wiederholungsregelexpansion, Ausnahmebehandlung und Batch-Materialisierung. Spezifikationsdokument und Design-Review-Dokument erstellt mit systematischer Aufzeichnung der Designentscheidungen und Alternativen",
          "Implementierung von SQL/API mit generate_series + UNION ALL + DISTINCT ON für das Merge-Verfahren materialisierter und nicht-materialisierter Aufgaben"
        ],
        "decisions": [
          {
            "title": "Einführung der Vortags-Batch-Materialisierung (EventBridge+SQS)",
            "detail": "Vortags-Batch-Materialisierung mittels EventBridge+SQS+NestJS SQS Consumer eingeführt"
          },
          {
            "title": "Merge-Verfahren materialisierter und nicht-materialisierter Aufgaben mittels generate_series + UNION ALL",
            "detail": "Datumexpansion mit PostgreSQLs generate_series, Wiederherstellung von 20+ Spalten aus Template-JSON-Definitionen, Deduplizierung nach UNION ALL mit materialisierten Datensätzen durch DISTINCT ON"
          },
          {
            "title": "Integration von 3 Zeitmodellen in einem einzigen Modell",
            "detail": "Unter Berücksichtigung der Kompatibilität mit dem bestehenden System wurde ein Design gewählt, das 3 Zeitmodelle (nur Datum, mit Uhrzeit, Zeitspanne) in einem einzigen Modell integriert. Ein erweitertes Design mit timeModel-Konzept auf Template-Seite für zukünftige Auftrennung wurde dokumentiert"
          }
        ],
        "outcomes": [
          {
            "before": "Wiederholungsaufgabenfunktion war nicht implementiert; regelmäßige Inspektionen (täglich/wöchentlich) mussten manuell erstellt werden",
            "after": "RFC5545-konforme Wiederholungsregelfunktion veröffentlicht; automatische Generierung von täglichen/wöchentlichen/monatlichen Wiederholungsaufgaben ermöglicht",
            "metric": "Reduzierung des manuellen Aufwands für regelmäßige Inspektionserstellung"
          },
          {
            "before": "Designdiskussionen zur Wiederholung kamen nicht zum Abschluss; Designspezifikationen waren verstreut",
            "after": "Spezifikationsdokument und Review-Dokument erstellt; Probleme der aktuellen Implementierung und ideales Design systematisiert. 6-Phasen-Verbesserungs-Roadmap erarbeitet",
            "metric": "Organisatorische Wissensanreicherung im Design und Klärung der Verbesserungs-Roadmap"
          }
        ],
        "challenges": [
          {
            "title": "Entwurf von Wiederholungsregeln mit Integration von 3 Zeitmodellen in einem einzigen Modell",
            "resolution": "Start mit einer Minimalimplementierung (nur Datum, ohne Uhrzeitunterstützung) und Dokumentation des idealen Designs mit timeModel-Konzept auf Template-Seite als Spezifikation. Klärung des Migrationspfads zur zukünftigen Auftrennung der 3 Modelle"
          },
          {
            "title": "300+ Zeilen SQL durch vollständige Feldwiederherstellung aus Template-JSONB-Definitionen",
            "resolution": "Stufenweiser Aufbau einer CTE-Kette von über 300 Zeilen mit klarer Verantwortungstrennung in jeder Phase: Wiederholungsregelexpansion → Datumsgenerierung → Erzeugung nicht-materialisierter Aufgaben → Merge mit materialisierten Aufgaben → Duplikatentfernung. Wartbare Struktur beibehalten und ideales Design (z.B. Migration zur Template-Referenz-Methode) im Review-Dokument detailliert beschrieben"
          },
          {
            "title": "Erzwungene Batch-Materialisierung durch Einschränkungen der Dashboard-Pivot-API",
            "resolution": "Aufbau einer CTE-Kette im SQL, die nicht-materialisierte Aufgaben in dieselbe Spaltenstruktur wie materialisierte Datensätze überführt. Im Review-Dokument detaillierte Analyse einer Alternative mit zweistufiger Aggregation + App-Schicht-Merge unter Nutzung der Assoziativität von COUNT/SUM (mit mathematischem Beweis)"
          }
        ]
      },
      {
        "title": "Entwurf, Konsensbildung und Implementierung einer 3-Achsen-Zugriffskontrolle (Scope x Ressource x Aktion)",
        "summary": "Berechtigungsdefinition über 3 Achsen: Scope (Zentrale/Werk etc.) x Ressource x Aktion. Vergleich von Einzelkonfiguration und Rollenzuweisungsansatz mit Konsensbildung durch Facilitation. Gemeinsame Verwaltung von API-Autorisierung und UI-Anzeigekontrolle über CASL Ability zur Konsistenzsicherung.",
        "difficulty": "high",
        "technologies": [
          "TypeScript",
          "React",
          "NestJS",
          "GraphQL",
          "CASL"
        ],
        "highlights": [
          "Entwurf eines RBAC+ReBAC-Hybrid-ACL-Modells mit umfassender Verifizierung von über 30 Anwendungsfällen. Detaillierte Dokumentation der Entscheidungsgründe und Alternativen im Designdokument",
          "Vergleich von Einzelkonfiguration und Rollenzuweisungsansatz und Facilitation der Design-Konsensbildung im Team"
        ],
        "decisions": [
          {
            "title": "Einführung des RBAC+ReBAC-Hybrid-ACL-Modells",
            "detail": "DB-Schicht: RBAC+ReBAC-Hybrid (zukünftig ABAC-erweiterbar); UI-Schicht: Design mit stufenweiser Veröffentlichung in 3 Phasen"
          },
          {
            "title": "Deny-by-default + Template-basierte Berechtigungsauswertung",
            "detail": "Standardmäßige Ablehnung; wenn mindestens ein explizites Deny vorhanden, dann Deny; ansonsten wenn ein Allow vorhanden, dann Allow; wenn weder noch, dann Deny – 3-stufige Auswertung"
          },
          {
            "title": "Optionalisierung der Hierarchievererbung durch scopeType+inheritChildren",
            "detail": "Vererbungsflag zur scope-spezifischen Rollenzuweisung hinzugefügt; Ein-/Ausschalten der Vererbung kann bei der Rollenzuweisung gewählt werden"
          }
        ],
        "outcomes": [
          {
            "before": "Zugriffskontrolle war nicht implementiert; alle Benutzer konnten auf alle Daten zugreifen",
            "after": "RBAC+ReBAC-ACL-System mit 3-stufiger Scope-Hierarchie (Organisation > Standort > Projekt) und 5 systemdefinierten Templates entworfen und Konsens im Team hergestellt",
            "metric": "Abschluss des ACL-Modell-Designs und Teamkonsens"
          },
          {
            "before": "ACL-Anforderungen waren verstreut und eine umfassende Verifizierung von 30+ Anwendungsfällen fehlte",
            "after": "Designdokument und Anwendungsfall-Verifizierungstabelle erstellt. Bestätigung, dass 12 Anwendungsfälle (Mehrwerks-Zugehörigkeit, externer Ingenieur, Auditor usw.) abgedeckt sind",
            "metric": "Umfassende Anforderungsverifizierung und Design-Dokumentation"
          }
        ],
        "challenges": [
          {
            "title": "Balance beim Entwurf der Berechtigungshierarchie in einem mandantenfähigen SaaS",
            "resolution": "Ausgewogenheit von Flexibilität und Verwaltbarkeit durch Optionalisierung der Vererbung mittels Vererbungsflag und 2-stufige Struktur aus Rollentemplate + individueller Berechtigungsüberschreibung. Über 30 Anwendungsfälle dokumentiert und Abdeckung jedes Musters verifiziert"
          }
        ]
      },
      {
        "title": "Optimierung der Darstellungsleistung der Startseite (Renderzeit um über 70% reduziert)",
        "summary": "Minimierung des Re-Rendering-Aufwands durch verknüpfte Darstellung von Filter, Liste und Detailansicht durch Umstrukturierung der Zustandsverwaltung. Refactoring mit begrenztem Aufwand, fokussiert auf Stellen mit hohen Renderkosten und großem UX-Einfluss.",
        "difficulty": "high",
        "technologies": [
          "TypeScript",
          "React",
          "Apollo Client"
        ],
        "highlights": [
          "Analyse des Re-Renderings mit React DevTools Profiler und gezielte Anwendung von React.memo/useMemo/useCallback zur Reduzierung der Renderzeit um über 70%"
        ],
        "decisions": [
          {
            "title": "Eliminierung unnötiger Re-Renderings durch React.memo + useMemo",
            "detail": "Visualisierung des Re-Renderings im Komponentenbaum mit dem React DevTools Profiler und Eliminierung unnötiger Re-Renderings durch React.memo, useMemo und useCallback. Über 70% Reduzierung der Renderzeit erreicht"
          }
        ],
        "outcomes": [
          {
            "before": "Langsame Renderzeit mit negativer Auswirkung auf die UX",
            "after": "Renderzeit um über 70% reduziert",
            "metric": "Renderzeit-Reduktionsrate"
          }
        ],
        "challenges": [
          {
            "title": "Vollständige Memoization aller Komponenten vs. Profiler-gesteuerte selektive Optimierung",
            "resolution": "Visuelles Überprüfen des Re-Renderings im Komponentenbaum mit React DevTools Profiler. Identifikation der tatsächlich langsamen Komponenten und selektive Anwendung von React.memo/useMemo/useCallback. Über 70% Renderzeit-Reduktion bei minimalem Aufwand erreicht"
          }
        ]
      },
      {
        "title": "Implementierung einer Google-Kalender-ähnlichen Aufgabenansicht",
        "summary": "Implementierung einer Kalenderansicht mit Wochen-, Monats- und 3-Tages-Ansicht. Realisierung von abgerundeten Darstellungen, variablen Anzeigebereichen und Scheduler-Kompatibilität mittels CSS Grid/Subgrid.",
        "difficulty": "medium",
        "technologies": [
          "TypeScript",
          "React",
          "CSS"
        ],
        "highlights": [
          "Eigenentwicklung eines Packing-Algorithmus (Zeilenbelegungsmapping → Oben-zuerst-Platzierung) und Entwurf eines reaktiven Update-Designs mit Apollo Client als SSoT",
          "3/4/7-Tage-variable Ansicht, D&D-Datumsänderung, Wochenübergreifende Abrundung und CSS-scroll-snap-Mobiloptimierung komplett von Grund auf implementiert"
        ],
        "decisions": [
          {
            "title": "Entscheidung zur Eigenentwicklung der Kalender-UI",
            "detail": "Kalender-UI komplett von Grund auf mit React+CSS erstellt, ohne Bibliotheksabhängigkeit. 3-Tage/4-Tage/Wochen-Ansichten werden als externer Parameter entgegengenommen, sodass das Layout bei beliebiger Tagesanzahl stabil bleibt"
          },
          {
            "title": "Apollo Client als SSoT für Drag&Drop-Datumsänderung und sequentielle Speicherintegration",
            "detail": "Apollo Clients Cache als Single Source of Truth (SSoT) konzipiert. Sowohl bei D&D-Datumsänderungen als auch bei sequentieller Speicherung im Bearbeitungsmodus wird der Apollo-Cache aktualisiert, wodurch der Kalender reaktiv neu gerendert wird"
          },
          {
            "title": "Responsives Kalender-UI und Smartphone-Optimierung mit CSS scroll snap",
            "detail": "Auf dem Smartphone wird auf eine vom Desktop deutlich abweichende UI umgeschaltet, bei der durch Tippen auf ein Datum die Aufgabenliste als Slide angezeigt wird. CSS scroll snap wird angewendet, damit der Scroll immer auf Tagesebene einrastet und nicht an einer unpassenden Stelle stehen bleibt"
          }
        ],
        "outcomes": [
          {
            "before": "Keine Kalender-UI vorhanden; Arbeitspläne nur in Listenansicht mit geringer Übersichtlichkeit",
            "after": "Eigenentwicklung einer Kalender-UI mit Google-Kalender-vergleichbarem Bedienungsgefühl. Dynamischer Wechsel zwischen 3-Tage/4-Tage/Wochenansicht und abgerundete Darstellung wochenübergreifender Events realisiert",
            "metric": "Bereitstellung einer intuitiven UI zur Erfassung und Verwaltung von Arbeitsplänen. Flexible Anpassung an Anforderungsänderungen durch Eigenentwicklung"
          },
          {
            "before": "Aufgaben-Terminverwaltung nur in tabellarischer Listenansicht; visuelle Gesamtübersicht über den Zeitplan war schwierig",
            "after": "Google-Kalender-ähnliche UI komplett von Grund auf erstellt. Dichte Packing-Darstellung für Mehr-/Einzeltag-Aufgaben, D&D-Datumsänderung, Echtzeit-Aktualisierung mit Apollo Client als SSoT, Responsive-Design (inkl. scroll snap) realisiert. Variable Ansichtsumschaltung 3/4/7 Tage unterstützt",
            "metric": "Vollständigkeit und Benutzerfreundlichkeit der Kalender-UI"
          }
        ],
        "challenges": [
          {
            "title": "Abgerundete UI-Darstellung wochenübergreifender Events",
            "resolution": "Events werden pro Woche in Segmente aufgeteilt und je nach Position des Segments (Anfang/Mitte/Ende) werden border-radius-Klassen dynamisch angewendet. Anfangssegment: links abgerundet, Endsegment: rechts abgerundet, Mittelsegmente: ohne Abrundung"
          },
          {
            "title": "Responsives Layout für variable Tagesanzahl-Ansichten",
            "resolution": "Der Tagesanzahl-Parameter wird als Komponenten-Props entgegengenommen und die Spaltenbreite dynamisch in CSS-Grid-fr-Einheiten berechnet. Auch die Event-Platzierung wurde auf eine Logik umgestellt, die grid-column-Positionen dynamisch aus startDate/endDate berechnet"
          },
          {
            "title": "Packing-Algorithmus für Mehrtages- und Einzeltag-Aufgaben (lückenlos von oben angeordnet)",
            "resolution": "Eigenentwicklung eines Packing-Algorithmus zur Verwaltung der Zeilenbelegung. Mehrtages-Aufgaben belegen ihre Zeilen zuerst; Einzeltag-Aufgaben werden in der obersten verfügbaren Zeile platziert. So wird ein dichtes Layout wie bei Google Kalender realisiert"
          }
        ]
      },
      {
        "title": "Implementierung typspezifischer Validierung für dynamische Formularstrukturen",
        "summary": "Implementierung typspezifischer Validierung (String/Zahl/Datum etc.) für auf Templates dynamisch hinzufüg- und löschbare Felder mit RHF+Zod. Trennung und Wiederverwendbarkeit der Verarbeitung zwischen Erstellungsmodal und Bearbeitungsseite erreicht. Unterstützung für Aktivierungssteuerung, Auswahloptionsanzeige-Kontrolle und Kreuzvalidierung.",
        "difficulty": "high",
        "technologies": [
          "TypeScript",
          "React Hook Form",
          "Zod"
        ],
        "highlights": [
          "Implementierung typspezifischer Validierung für auf Templates dynamisch hinzufüg- und löschbare Felder (String/Zahl/Datum etc.) mit RHF+Zod. Trennung und Wiederverwendbarkeit der Verarbeitung zwischen Erstellungsmodal und Bearbeitungsseite erreicht. Unterstützung für Aktivierungssteuerung, Auswahloptionsanzeige-Kontrolle und Kreuzvalidierung."
        ]
      },
      {
        "title": "Implementierung der differenziellen sequentiellen Speicherung bei Fokus-Verlust",
        "summary": "Zur Vermeidung von Speicherverlusten wurde eine sequentielle Speicherung implementiert, die bei Fokus-Verlust nur Differenzen speichert. Mit DevTools-Throttling wurden auch Wiederholungstests unter instabilen Netzwerkbedingungen durchgeführt.",
        "difficulty": "medium",
        "technologies": [
          "TypeScript",
          "React",
          "GraphQL"
        ],
        "highlights": [
          "Architekturentwurf für feldweise onBlur-sequentielle Speicherung + Command Pattern und Implementierung eines Wiederübertragungsmechanismus für fehlgeschlagene Befehle"
        ],
        "decisions": [
          {
            "title": "Einführung der feldweisen onBlur-sequentiellen Speicherung (Ablehnung der Formular-Gesamtspeicherung)",
            "detail": "Jedes Feld besitzt eine unabhängige react-hook-form-Instanz; bei onBlur-Events wird nach isEqual-Differenzprüfung sofort eine GraphQL-Mutation gesendet – sequentielles Speicherverfahren"
          },
          {
            "title": "RPC-artiger Ansatz mit Befehlen als Datenobjekte zur Kapselung von Feldänderungen",
            "detail": "Jede Feldänderung wird als Befehlsdatenobjekt strukturiert, mit UUID versehen und an das Backend gesendet – RPC-artiges Verfahren. Pro Ressourcentyp wird das Ziel-Feldset typdefiniert, und Änderungsoperationen werden als serialisierbare Daten behandelt"
          }
        ],
        "outcomes": [
          {
            "before": "Bei Formular-Gesamtspeicherung bestand in der Fabrik-WLAN-Umgebung das Risiko des Verlusts eingegebener Daten",
            "after": "Implementierung von feldweiser onBlur-sequentieller Speicherung + Command Pattern + Wiederübertragungsmechanismus für fehlgeschlagene Befehle. Entwurf einer 3-stufigen Verbesserungs-Roadmap (localStorage-Persistierung → Service Worker → vollständiger Offline-Modus)",
            "metric": "Erhebliche Reduzierung des Datenverlustrisikos und Erarbeitung eines zukunftsweisenden Verbesserungsplans"
          }
        ],
        "challenges": [
          {
            "title": "Datensicherung in der instabilen Fabrik-WLAN-Umgebung",
            "resolution": "Implementierung von feldweiser onBlur-sequentieller Speicherung + useRef-Akkumulation fehlgeschlagener Befehle + Wiederübertragung über Speicher-Button. Bei Netzwerkfehlern werden Formularwerte beibehalten; bei Client-Fehlern wird auf Serverwerte zurückgesetzt – zweistufige Fehlerbehandlung"
          }
        ]
      },
      {
        "title": "Festlegung und Einführung der UI-Komponentenverzeichnisstruktur und Namenskonventionen",
        "summary": "Vorschlag und Konsensbildung für Verzeichnisstruktur, Namenskonventionen und Komponentenaufbauregeln zur Verbesserung der Wiederverwendbarkeit domänennaher Komponenten. Etablierung als teamweite gemeinsame Konvention.",
        "difficulty": "medium",
        "technologies": [
          "TypeScript",
          "React"
        ],
        "highlights": [
          "Vorschlag und Konsensbildung für Verzeichnisstruktur, Namenskonventionen und Komponentenaufbauregeln zur Verbesserung der Wiederverwendbarkeit domänennaher Komponenten. Etablierung als teamweite gemeinsame Konvention."
        ]
      },
      {
        "title": "Visualisierung aller UI-Zustände mit Storybook und Vorbereitung der Mehrsprachigkeitsinfrastruktur",
        "summary": "Visualisierung aller UI-Zustände in Storybook zur Erleichterung zukünftiger Anzeigevarianten. Implementierung der Mehrsprachigkeit für Karten-UI (einschließlich englischer Textvorschläge) und Vorbereitung der Internationalisierungsinfrastruktur.",
        "difficulty": "medium",
        "technologies": [
          "TypeScript",
          "Storybook",
          "Playwright",
          "Vitest"
        ],
        "highlights": [
          "Visualisierung aller UI-Zustände in Storybook zur Erleichterung zukünftiger Anzeigevarianten. Implementierung der Mehrsprachigkeit für Karten-UI (einschließlich englischer Textvorschläge) und Vorbereitung der Internationalisierungsinfrastruktur."
        ]
      }
    ]
  },
  {
    "id": "recruitment-saas-2022",
    "company": "Börsennotierte Tochtergesellschaft eines HR-Beratungs-/Systemunternehmens",
    "companyDesc": "Börsennotierte Konzerntochter eines HR-Beratungs- und Systementwicklungsunternehmens. Zuständig für die Neuentwicklung eines mandantenfähigen Bewerbermanagementsystems.",
    "role": "Frontend Tech Lead",
    "roles": ["Frontend", "Tech Lead", "Testing"],
    "period": "2022-10 — 2024-09",
    "teamSize": 10,
    "summary": "2 Jahre Leitung der Frontend-Entwicklung eines SaaS für Hochschulabsolventen-Recruiting als Tech Lead. Entwicklung von B2B (HR-Verwaltungsoberfläche) und B2C (Bewerberoberfläche) in pnpm-Monorepo-Architektur. Entwurf und Implementierung von Kernfunktionen wie dynamischem Formularbuilder mit Specification Pattern, Suspense-fähigem Dashboard und VRT-Pipeline; Förderung der Qualitäts- und Entwicklungseffizienz im 10-köpfigen Team",
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
        "title": "Teamleitung und Qualitätsmanagement als Frontend Tech Lead",
        "summary": "Leitung von Aufgabenzuweisung, SP-Aktualisierung, Wissensaustausch, Etablierung einer PR-Review-Kultur und Erstellung von Implementierungsleitfäden. Einführung automatischer Bibliotheksaktualisierung durch Renovate. Organisation von Teammeetings zur Förderung des Austauschs über Technik, Codekonventionen und Bildschirmspezifikationen.",
        "difficulty": "high",
        "technologies": [
          "TypeScript",
          "React",
          "GitHub Actions",
          "Renovate"
        ],
        "highlights": [
          "Orchestrierungsleitung der gesamten B2C-App: Spezifikationserarbeitung, Konsensbildung mit dem Backend-Team, Aufgabenzerlegung, Mitgliederzuweisung und Übernahme der kritischen Pfadaufgaben",
          "Etablierung von Teamqualitätsstandards durch Code-Review-Richtlinien, VRT-Umgebungsaufbau und Praktikantenbetreuung"
        ],
        "decisions": [
          {
            "title": "Qualitätshebung im Team durch Praktikantenbetreuung und Code-Reviews",
            "detail": "Aktive Durchführung von Code-Reviews und Ausbildung der Praktikanten durch Feedback. OJT-Ansatz, bei dem Codierungskonventionen und Designmuster durch die Review-Praxis vermittelt werden"
          },
          {
            "title": "Zentrale Backend-Schnittstelle und Orchestrierungs-Management",
            "detail": "Eigenständige kurzfristige Erarbeitung aller B2C-App-Spezifikationen und intensive 1:1-Abstimmung mit dem Backend-Teamleiter. Nach der Abstimmung Onboarding-Meeting für die B2C-Teammitglieder mit Erklärung aller Spezifikationen. Funktion als zentrale Anlaufstelle, die Fragen und Unklarheiten des Teams sammelt und mit dem Backend-Team klärt"
          },
          {
            "title": "Aufgabenzerlegung, Abhängigkeitsanalyse und mitgliedergerechte Zuweisung",
            "detail": "Abgestimmte Spezifikationen in Aufgaben zerlegt, Abhängigkeiten aufgeklärt und als Jira-Tickets dokumentiert. Zuweisung der Tickets nach Stärken, Schwächen, Fähigkeitsniveau und Wünschen der Mitglieder. Stellen, die aufgrund von Aufgabenabhängigkeiten zu Single Points of Failure (kritischer Pfad) werden, wurden selbst übernommen"
          }
        ],
        "outcomes": [
          {
            "before": "Schwankende Frontend-Qualität und Übersehen von CSS-Regressionen",
            "after": "Aufbau einer Visuellen Regressionstestumgebung mit Storybook+storycap+reg-suit zur automatischen Erkennung von UI-Differenzen pro PR. Code-Review-Richtlinien ebenfalls erstellt",
            "metric": "Etablierung einer automatisierten UI-Qualitätssicherung"
          }
        ],
        "challenges": [
          {
            "title": "Balance zwischen technischer Schuld und Entwicklungsgeschwindigkeit als Frontend Tech Lead",
            "resolution": "Aufbau einer Visuellen Regressionstestumgebung mit Storybook+storycap+reg-suit zur automatischen Sicherstellung der UI-Qualität. Erstellung von Code-Review-Richtlinien zur Anhebung des teamweiten Qualitätsniveaus"
          },
          {
            "title": "Detaillierte Spezifikationserarbeitung der B2C-Bewerberanwendung in nur 4 Monaten",
            "resolution": "Als Tech Lead Leitung der detaillierten Spezifikationserarbeitung. Analyse des Bewerber-Nutzerflows und systematische Definition der Übergangsbedingungen, Anzeigeinhalte und Validierungsregeln je Status. Agile Spezifikationsfestlegung parallel zur Implementierung"
          },
          {
            "title": "Identifikation von Spezifikations-Grenzfällen des dynamischen Formulars und Backend-Konsensbildung",
            "resolution": "Für den Fall von 0 Auswahloptionen wurde entschieden, dass auf B2B-Seite der Kundensupport in die Formulareinstellung eingreift und auf B2C-Seite kein spezieller Alert angezeigt wird. Für jeden Grenzfall wurde einzeln Konsens mit dem Backend-Teamleiter hergestellt und die Entscheidungen dokumentiert und im Team geteilt"
          }
        ]
      },
      {
        "title": "Spezifikationserarbeitung und Implementierung der Bewerber-Einstiegsroute",
        "summary": "Detaillierte Spezifikationserarbeitung und Frontend-Implementierung des Einstiegsflows: Registrierung → Stellenbewerbung → Bewerbungsschritte. Funktionsentwicklung innerhalb von 4 Monaten abgeschlossen mit hoher Bewertung durch den Auftraggeber.",
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
          "Erarbeitung eines Designs zur Vereinheitlichung von 4 Formularrouten auf einer gemeinsamen DynamicForm-Basis und Implementierung von Multipage-Validierung und Navigationssteuerung"
        ],
        "decisions": [
          {
            "title": "Implementierung der 4 B2C-Formularrouten auf gemeinsamer DynamicForm-Basis",
            "detail": "Formularspezifikationsdefinitionsklasse als Kern: gemeinsame Nutzung von useForm-Hook, Eingabekomponenten und Validierungssystem, wobei nur Seitenstruktur, Sende-Endpunkt und Parameterunterschiede je Route individuell definiert werden"
          },
          {
            "title": "Seitenweise Validierung und Navigationssteuerung des Multipage-Formulars",
            "detail": "Umrechnung zwischen URL-Seitenindex (1-basiert) und Array-Index (0-basiert) bei gleichzeitiger Verwaltung des seitenweisen Validierungsstatus über useFormState. Ausführung von trigger() im Seitenscope und Blockierung der Navigation zu nicht-validierten Seiten"
          }
        ],
        "outcomes": [
          {
            "before": "Zeitliche Beschränkung von 4 Monaten Entwicklungszeit",
            "after": "Alle Funktionen innerhalb des Zeitrahmens fertiggestellt; hohe Bewertung durch den Auftraggeber",
            "metric": "Fertigstellungsrate und Kundenzufriedenheit"
          },
          {
            "before": "Kein Bewerber-Einstiegsformular vorhanden; B2C-Seite des Bewerbermanagementsystems war nicht aufgebaut",
            "after": "Implementierung von 4 Formularrouten (Neuregistrierung, Voranmeldung, Profilaktualisierung, Meine-Seite-Aufgaben) auf gemeinsamer DynamicForm-Basis. 24 Eingabekomponentenarten, 50+ Validierungsregeln und Multipage-Navigation realisiert",
            "metric": "Vollständigkeit der B2C-Bewerber-Formularinfrastruktur"
          }
        ],
        "challenges": [
          {
            "title": "Verwaltung komplexer Zustandsübergänge in der Bewerber-Einstiegsroute",
            "resolution": "In der Spezifikationsphase detaillierte Zustandsübergangsdiagramme erstellt und alle Muster visualisiert. Design implementiert, das ungültige Übergänge auf Typebene verhindert. Alle Funktionen innerhalb von 4 Monaten Entwicklungszeit fertiggestellt"
          },
          {
            "title": "Feld-Level-Mapping von serverseitigen Validierungsfehlern",
            "resolution": "Bestimmung von GraphQL-Validierungsfehlern innerhalb von useEffect und getrennte Zuordnung von bildschirmweiten Bannerfehlern und Feld-Level-Fehlern. Vereinheitlichung der Fehlerbehandlung über einen Custom-useForm-Hook"
          }
        ]
      },
      {
        "title": "Entwurf und Implementierung des HR-Dynamikformular-Builders (Specification Pattern)",
        "summary": "Implementierung eines Formular-Builders, mit dem HR-Mitarbeiter Seiten, Überschriften, Eingabefelder, Validierungen und Eltern-Kind-Beziehungen konfigurieren können. Lösung des Klassen-Zustandsproblems durch das Specification Pattern unter Beibehaltung der Konsistenz mit RHF. Ausgewogenes Design zwischen Kohäsion und Erweiterbarkeit.",
        "difficulty": "extreme",
        "technologies": [
          "TypeScript",
          "React",
          "React Hook Form",
          "Apollo Client"
        ],
        "highlights": [
          "Entwurf und Implementierung einer Kreuzvalidierungsinfrastruktur mit Specification Pattern x 50+ Yup-Custom-Methoden. Aufbau einer 3-Schichten-Formulargenerierungs-Engine",
          "Implementierung eines reaktiven Auswahloptionsfilters mit Eltern-Kind-Feldverknüpfung + useWatch + automatischem Zurücksetzen ausgewählter Werte"
        ],
        "decisions": [
          {
            "title": "Design der dynamischen Formularvalidierung mit dem Specification Pattern",
            "detail": "Einführung des Specification Pattern (Domain-Driven-Design-Muster) für ein Design, bei dem Bedingungsausdrücke als Objekte komponierbar sind"
          },
          {
            "title": "Kreuzvalidierungsinfrastruktur mit Specification Pattern x Yup-Custom-Methoden",
            "detail": "Über 50 Custom-Methoden zum Yup-Schema hinzugefügt und als Pattern auf alle Schematypen angewendet. Abhängige Felder werden deklarativ über Metadaten beschrieben und der Abhängigkeitsgraph automatisch erstellt"
          },
          {
            "title": "Isolierung der Validierung in ein Shared-Package der pnpm-Monorepo-Architektur",
            "detail": "3-Package-Architektur mit pnpm workspace: B2B, B2C und Shared. Validierungsinfrastruktur im Shared-Package platziert; Nutzung von B2B/B2C durch Re-Export. Zentrale Verwaltung von GraphQL-basierten Enum-Definitionen über ein Enum-Registry"
          },
          {
            "title": "Reload-freie Auswahloptionsfilterung durch Eltern-Kind-Feldverknüpfung",
            "detail": "Reaktive Überwachung des Elternfeldwerts über useWatch() in Eltern-Kind-Verknüpfungskomponenten. Übergabe einer Filterfunktion an Kindkomponenten und Filterung der Optionen per useMemo. Ein Resetter löscht automatisch ungültig gewordene ausgewählte Werte"
          }
        ],
        "outcomes": [
          {
            "before": "Formular-Bedingungsdefinitionen waren hartcodiert; bei jeder Bedingungsänderung war eine Codeänderung erforderlich",
            "after": "Implementierung deklarativer Bedingungsdefinitionen durch das Specification Pattern, sodass HR-Mitarbeiter Formularbedingungen ohne Code konfigurieren können",
            "metric": "Self-Service für Formularbedingungsänderungen"
          },
          {
            "before": "Formularfelder waren hartcodiert; bei jeder Feld-Änderung oder -Ergänzung war Entwicklerarbeit erforderlich",
            "after": "Durch die dynamische Formulargenerierungs-Engine können HR-Mitarbeiter Formularfelder frei konfigurieren. Dynamische Formularinfrastruktur mit 50+ Validierungsregeln, 24 Eingabekomponentenarten, Feld-übergreifender Kreuzvalidierung und reaktiver Auswahloptionsfilterung realisiert. Bereitstellung für B2B/B2C über das Shared-Package",
            "metric": "Flexibilität und Qualität der dynamischen Formularinfrastruktur"
          }
        ],
        "challenges": [
          {
            "title": "Kombinationsexplosion bei Bedingungsausdrücken des HR-Dynamikformulars",
            "resolution": "Einführung des Specification Pattern (DDD-Herkunft) zur Gestaltung von Bedingungsausdrücken als First-Class-Objekte, die durch AND/OR/NOT zusammensetzbar sind. Implementierung einer deklarativen Bedingungsdefinition im JSON-Schema-Stil"
          },
          {
            "title": "Synchronisierung der Kreuzvalidierung und des reaktiven UI zwischen Formularfeldern",
            "resolution": "Eine Wert-Reset-Komponente erkennt Änderungen an Auswahloptionen und löscht ungültige Werte sofort. Der Feld-Abhängigkeitsgraph wird automatisch erstellt und die Revalidierung abhängiger Felder über React Hook Forms deps-Option automatisch ausgelöst. Wildcard-Matching von Array-Indizes unterstützt auch Abhängigkeiten in dynamischen Formularen"
          },
          {
            "title": "Entwurf einer schemagetriebenen dynamischen Formulargenerierungs-Engine",
            "resolution": "Entwurf von 3-Schichten-Spezifikationsdefinitionsklassen: Formular → Seite → Feld. Jede Schicht erstellt dynamisch Validierungsschemata und generiert automatisch seitenweise Schemas. Typsicherheit der Formularwerte durch TypeScript-Typparameter sichergestellt"
          }
        ]
      },
      {
        "title": "Detaillierte Spezifikation und Suspense-fähige Implementierung des HR-Dashboards",
        "summary": "Detaillierte Spezifikationserarbeitung und Implementierung des Dashboard-Startbildschirms. Suspense-Unterstützung für Gesamtansicht und 3 Panel-Typen. Identifikation der Render-Ursachen mit React Profiler und Verbesserung sowohl der tatsächlichen Performance als auch der gefühlten Wartezeit.",
        "difficulty": "high",
        "technologies": [
          "TypeScript",
          "React",
          "Apollo Client",
          "TanStack Query"
        ],
        "highlights": [
          "Entwurf und Implementierung einer Widget-unabhängigen Datenladearchitektur (Suspense+ErrorBoundary) und eines Custom-Masonry-Grid-Algorithmus"
        ],
        "decisions": [
          {
            "title": "Einführung der Widget-unabhängigen Datenladearchitektur",
            "detail": "Architektur, bei der jedes Widget unabhängig Daten lädt. Verwendung von Apollo Client useReadQuery für Suspense-fähiges Datenladen, vollständig innerhalb der Widget-Komponente"
          },
          {
            "title": "Eigenentwicklung eines Custom-Masonry-Grid-Layouts",
            "detail": "Implementierung eines Custom-Grid-Platzierungsalgorithmus. Nachverfolgung der aktuellen Zeilenindizes der linken und rechten Spalte und Platzierung von Widgets in der kürzeren Spalte für einen Masonry-Effekt"
          },
          {
            "title": "Widget-Drag&Drop-Sortierung mit dnd-kit v6",
            "detail": "Einsatz von @dnd-kit/core v6.1.0 + @dnd-kit/sortable v8.0.0. Listenverwaltung über SortableContext und Steuerung des D&D-Zustands jedes Widgets über den useSortable-Hook. Implementierung einer Vorschauanzeige während des Verschiebens mit DragOverlay"
          }
        ],
        "outcomes": [
          {
            "before": "Dashboard-Datenladen im Wasserfall-Verfahren; keine Interaktion bis alle Widgets geladen. Lücken in der Widget-Platzierung",
            "after": "Unabhängiges Laden + Skeleton-Anzeige mit React Suspense + Apollo useReadQuery + Material UI Skeleton realisiert. Lückenfreie Platzierung durch Custom-Masonry-Grid. D&D-Sortierung mit dnd-kit v6 und 1-Spalten/2-Spalten-Umschaltung implementiert",
            "metric": "UX-Verbesserung: Jedes Widget zeigt nach individuellem Ladeabschluss seine Inhalte. Lose gekoppelte Architektur, die auch für zukünftige Drittanbieter-Marketplace-Erweiterungen geeignet ist"
          }
        ],
        "challenges": [
          {
            "title": "Lösung des Wasserfall-Problems bei gleichzeitigem Datenladen von 20 Widgets",
            "resolution": "Migration zu Suspense-fähigem Datenladen mit Apollo Client 3.10 useReadQuery. Jedes Widget in React-Suspense-Boundary eingebettet, Material UI Skeleton-Komponente als Fallback gesetzt. ErrorBoundary auch individuell pro Widget, sodass ein API-Ausfall keine Auswirkungen auf andere Widgets hat"
          },
          {
            "title": "Custom-Grid-Layout-Implementierung in CSS-Masonry-nicht-unterstützter Umgebung",
            "resolution": "Implementierung eines Custom-Platzierungsalgorithmus. Nachverfolgung der aktuellen Zeilenindizes der linken und rechten Spalte und Platzierung jedes Widgets in der kürzeren Spalte. Masonry-ähnliche lückenfreie Platzierung durch dynamische Berechnung von grid-row-start/grid-row-span auf CSS Grid"
          }
        ]
      },
      {
        "title": "Übergreifende Bildschirmfunktionen: Fehlerbehandlung, Caching, Zugriffskontrolle und weitere",
        "summary": "Implementierung von Fehlerbehandlung, Cache-Zurücksetzung, Query-Header-Parameterzuweisung, Redirect, Query-Batching und Korrektur automatisch generierter Validierungen aus dem GraphQL-Schema.",
        "difficulty": "high",
        "technologies": [
          "TypeScript",
          "React",
          "Apollo Client",
          "GraphQL"
        ],
        "highlights": [
          "Implementierung von Fehlerbehandlung, Cache-Zurücksetzung, Query-Header-Parameterzuweisung, Redirect, Query-Batching und Korrektur automatisch generierter Validierungen aus dem GraphQL-Schema."
        ]
      },
      {
        "title": "Aufbau einer Visuellen Regressionstestumgebung mit Storybook+storycap+reg-suit",
        "summary": "Integration von Storybook, storycap und reg-suit in die CI mit GitHub Actions für visuelle Regressionstests der UI. Aufbau einer Playwright-basierten E2E-Regressionstest-CI-Umgebung.",
        "difficulty": "high",
        "technologies": [
          "Storybook",
          "GitHub Actions",
          "Playwright",
          "reg-suit",
          "storycap"
        ],
        "highlights": [
          "Entwurf und Aufbau einer VRT-Pipeline mit Storybook+storycap+reg-suit+GitHub Actions+S3 und Etablierung einer VRT-Kultur im Team",
          "Implementierung von paralleler Aufnahme für b2b/b2c mittels Matrix-Strategy, Schwellenwertvergleich mit 0,1% Differenz und automatischer PR-Kommentar-Veröffentlichung"
        ],
        "decisions": [
          {
            "title": "VRT-Pipeline-Design mit Storybook v8 + storycap + reg-suit + S3",
            "detail": "Aufbau der Storybook-Umgebung mit @storybook/react-vite v8.1.5, automatische Screenshot-Aufnahme mit storycap v5.0.0, Pixel-Differenzvergleich mit reg-suit (Schwellenwert 0,1%), Ergebnis-Publishing zu AWS S3, Differenz-Review-Flow über GitHub-PR-Benachrichtigung"
          },
          {
            "title": "Parallele VRT-Ausführung für b2b/b2c durch GitHub-Actions-Matrix-Strategy",
            "detail": "Parallele Aufnahme von b2b/b2c mit storycap über GitHub Actions Matrix-Strategy, Upload als Artifacts. Im nachfolgenden VRT-Job Zusammenführung und Ausführung von reg-suit run – 2-Stufen-Pipeline-Design"
          }
        ],
        "outcomes": [
          {
            "before": "Unbeabsichtigte UI-Änderungen (CSS-Regressionen) wurden erst nach dem Release entdeckt",
            "after": "Automatischer Screenshot-Vergleich pro PR durch storycap+reg-suit. 100% Erkennungsrate von CSS-Regressionen vor dem Merge",
            "metric": "CSS-Regressions-Erkennungsrate"
          },
          {
            "before": "Qualitätsprüfung von UI-Änderungen nur durch manuelle Inspektion; Regressionsbugs wurden durch Übersehen erst nach dem Release entdeckt",
            "after": "Aufbau einer VRT-Pipeline mit Storybook v8.1.5 + storycap + reg-suit + GitHub Actions + S3. Automatischer Screenshot-Vergleich aller UI-Komponenten pro PR: b2b 215 Stories, b2c 49 Seiten",
            "metric": "Automatische Erkennung visueller Regressionen mit 0,1% Pixel-Differenzschwelle. PR-Kommentar-basiertes Differenzbild-Review etabliert; Reduktion von UI-Regressionsbugs nach dem Release"
          }
        ],
        "challenges": [
          {
            "title": "Stabilisierung von storycap-Timeouts und Asset-Wartezeiten",
            "resolution": "Einstellung von screenshot: { waitAssets: true } in den Default-Parametern von preview.tsx zur Wartezeit für Asset-Ladung. storycap-Ausführung mit serverTimeout 60000ms und captureTimeout 15000ms konfiguriert. Individuelle Delay-Anpassung pro Story für eine stabile Aufnahmeumgebung"
          },
          {
            "title": "Etablierung der VRT-Kultur im Team",
            "resolution": "Einführung der Differenzbildanzeige in PR-Kommentaren durch reg-notify-github-plugin und Aufstellung einer Teamregel zur Einbeziehung von Differenzen in den Review. Förderung der Komponentenentwicklung in Storybook, sodass Story-Erstellung als natürlicher Teil der VRT in den Entwicklungsprozess eingebettet wird"
          }
        ]
      },
      {
        "title": "Migration von react-admin zu Apollo Client/RHF/MUI und Einführung von GraphQL Suspense",
        "summary": "Initiierung und vollständige Durchführung der Migration von react-admin zu Apollo Client, RHF und MUI zur Verbesserung der Entwicklungseffizienz. Evaluierung und produktive Einführung von GraphQL Suspense und React Suspense zur Verbesserung der Anzeigegeschwindigkeit.",
        "difficulty": "high",
        "technologies": [
          "React",
          "React Hook Form",
          "MUI",
          "Apollo Client",
          "GraphQL"
        ],
        "highlights": [
          "Initiierung und vollständige Durchführung der Migration von react-admin zu Apollo Client, RHF und MUI zur Verbesserung der Entwicklungseffizienz. Evaluierung und produktive Einführung von GraphQL Suspense und React Suspense zur Verbesserung der Anzeigegeschwindigkeit."
        ]
      },
      {
        "title": "Leitung des Smoke-Test-Teams",
        "summary": "Als Testphasenleiter übernahm er die Rolle des Testfahrers. Bei der Testausführung anderer Mitglieder teilte er Bildschirm- und Navigations-Spezifikationen. Erstellung von Fehlermeldungstickets und Verwaltung des Teststatus.",
        "difficulty": "medium",
        "technologies": [
          "Playwright"
        ],
        "highlights": [
          "Als Testphasenleiter übernahm er die Rolle des Testfahrers. Bei der Testausführung anderer Mitglieder teilte er Bildschirm- und Navigations-Spezifikationen. Erstellung von Fehlermeldungstickets und Verwaltung des Teststatus."
        ]
      }
    ]
  },
  {
    "id": "mobile-order-app-2022",
    "company": "Mobile-Order-Anwendungsunternehmen",
    "companyDesc": "Unternehmen für Entwicklung und Vertrieb von Mobile-Order-Apps für die Gastronomie. Zuständig für die Entwicklung von LIFF-/nativen Apps und Backend.",
    "role": "LIFF-Frontend / Native App / Backend-Entwickler",
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
        "title": "Multiplattform-Frontend-Entwicklung für Web/LIFF/Native App",
        "summary": "Durchgängige Entwicklung für Web (Next.js), LIFF-App und Native App (React Native/Expo). Implementierung umfangreicher Domänenlogik einschließlich Bestellverwaltung, Restaurant-LINE-Integration, Kassenanbindung, Bestandsverwaltung und Tagesabschluss.",
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
          "Durchgängige Entwicklung für Web (Next.js), LIFF-App und Native App (React Native/Expo). Implementierung umfangreicher Domänenlogik einschließlich Bestellverwaltung, Restaurant-LINE-Integration, Kassenanbindung, Bestandsverwaltung und Tagesabschluss."
        ]
      },
      {
        "title": "Mehrsprachigkeitsunterstützung der Mobile-Order-App (Englisch und Chinesisch)",
        "summary": "Recherche zu englisch- und chinesischsprachigen App-UIs unter der Prämisse, dass Logo und Texte auf allen Endgeräten korrekt dargestellt werden und die Bedeutung prägnant verständlich ist. UI-Verbesserung durch Diskussion mit Designer und PO anhand von Prototypen.",
        "difficulty": "medium",
        "technologies": [
          "TypeScript",
          "React",
          "LIFF"
        ],
        "highlights": [
          "Recherche zu englisch- und chinesischsprachigen App-UIs unter der Prämisse, dass Logo und Texte auf allen Endgeräten korrekt dargestellt werden und die Bedeutung prägnant verständlich ist. UI-Verbesserung durch Diskussion mit Designer und PO anhand von Prototypen."
        ]
      },
      {
        "title": "Implementierung der POS-Vorläufigen-Tagesabschlussverarbeitung (Vereinheitlichung mit Endabschluss und Unit-Tests)",
        "summary": "Vereinheitlichung überlappender Verarbeitungen mit dem endgültigen Tagesabschluss und Bereinigung von Namensinkonsistenzen bei Variablen. Unit-Tests hinzugefügt für eine implementierungsarme technische Schuld.",
        "difficulty": "medium",
        "technologies": [
          "TypeScript",
          "NestJS",
          "GraphQL",
          "Jest"
        ],
        "highlights": [
          "Vereinheitlichung überlappender Verarbeitungen mit dem endgültigen Tagesabschluss und Bereinigung von Namensinkonsistenzen bei Variablen. Unit-Tests hinzugefügt für eine implementierungsarme technische Schuld."
        ]
      },
      {
        "title": "Implementierung der tisch-/menü-/zeitbasierten Bestellstatusaggregation für das Küchendisplay",
        "summary": "Funktionsimplementierung und UI-Verbesserung des Küchendisplays. Implementierung der Aggregationsfunktion für Bestellstatus nach Tisch, Menüpunkt und Zeitperiode.",
        "difficulty": "medium",
        "technologies": [
          "TypeScript",
          "Hasura",
          "GraphQL",
          "React Native"
        ],
        "highlights": [
          "Funktionsimplementierung und UI-Verbesserung des Küchendisplays. Implementierung der Aggregationsfunktion für Bestellstatus nach Tisch, Menüpunkt und Zeitperiode."
        ]
      }
    ]
  },
  {
    "id": "board-management-app-2022",
    "company": "Unternehmen für Board-Management-DX-Services",
    "companyDesc": "Unternehmen, das ein SaaS zur Digitalisierung der Vorstandsarbeit anbietet. Zuständig für Frontend- und Backend-Entwicklung des Vorstandsverwaltungsdienstes.",
    "role": "Frontend-/Backend-Entwickler",
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
        "title": "UI-Komponentenimplementierung und Storybook-Einrichtung (Atomic Design)",
        "summary": "Zur Verbesserung der Auffindbarkeit und Suchbarkeit von UI-Komponenten wurde das Storybook-Verzeichnis an Atomic Design angelehnt. Alle UI-Komponenten wurden in Storybook katalogisiert, was die Effizienz der Bildschirmimplementierung verbesserte.",
        "difficulty": "medium",
        "technologies": [
          "TypeScript",
          "React",
          "Tailwind CSS",
          "Storybook"
        ],
        "highlights": [
          "Zur Verbesserung der Auffindbarkeit und Suchbarkeit von UI-Komponenten wurde das Storybook-Verzeichnis an Atomic Design angelehnt. Alle UI-Komponenten wurden in Storybook katalogisiert, was die Effizienz der Bildschirmimplementierung verbesserte."
        ]
      },
      {
        "title": "Implementierung der Dokumentenvorlagen- und Schriftlichen-Beschlussfassung-Bildschirme mit E2E-Tests",
        "summary": "Detaillierte Implementierung der Dokumentenvorlagen- und schriftlichen Beschlussfassungsbildschirme. Qualitätssicherung durch Playwright-E2E-Tests.",
        "difficulty": "medium",
        "technologies": [
          "TypeScript",
          "React",
          "Playwright"
        ],
        "highlights": [
          "Detaillierte Implementierung der Dokumentenvorlagen- und schriftlichen Beschlussfassungsbildschirme. Qualitätssicherung durch Playwright-E2E-Tests."
        ]
      },
      {
        "title": "Backend-Implementierung der Terminplanungsfunktion",
        "summary": "Backend-Implementierung der Terminplanungsfunktion mit Node.js/Express/GraphQL/Prisma.",
        "difficulty": "medium",
        "technologies": [
          "Node.js",
          "Express",
          "Prisma",
          "GraphQL"
        ],
        "highlights": [
          "Backend-Implementierung der Terminplanungsfunktion mit Node.js/Express/GraphQL/Prisma."
        ]
      }
    ]
  },
  {
    "id": "freelance-web-2021",
    "company": "Freiberufler",
    "companyDesc": "Freiberufliche Übernahme mehrerer SPA-Webseiten-Projekte. 4 Aufträge: Webentwicklungsagentur, Personalvermittlungsunternehmen, Datenanalyseunternehmen und Restaurant.",
    "role": "Frontend-Entwickler",
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
        "title": "SPA-Webseiten-Entwicklung mit React/Next.js (4 Projekte)",
        "summary": "Erstellung von SPA-Webseiten für eine Webentwicklungsagentur, ein Personalvermittlungsunternehmen, ein Datenanalyseunternehmen und ein Restaurant. Zuständig für die Integration von Frontend-Anwendung und CMS (WordPress/Contentful etc.) sowie Hosting auf Vercel/Netlify/S3.",
        "difficulty": "medium",
        "technologies": [
          "TypeScript",
          "JavaScript",
          "React",
          "Next.js",
          "Amazon S3"
        ],
        "highlights": [
          "Erstellung von SPA-Webseiten für eine Webentwicklungsagentur, ein Personalvermittlungsunternehmen, ein Datenanalyseunternehmen und ein Restaurant. Zuständig für die Integration von Frontend-Anwendung und CMS (WordPress/Contentful etc.) sowie Hosting auf Vercel/Netlify/S3."
        ]
      }
    ]
  },
  {
    "id": "bitkey-data-2020",
    "company": "Bitkey Inc.",
    "companyDesc": "Smart-Lock-Startup. Zuständig für den Aufbau des internen Data Lake und Dashboards sowie die Entwicklung einer Town-Portal-Webseite.",
    "role": "Data Engineer / Frontend-Entwickler",
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
        "title": "Definition und Erarbeitung unternehmensweiter KPIs",
        "summary": "Aufbereitung von KPIs in den Bereichen Management, Produkt, Vertrieb, Qualität und Nutzung sowie Definition der Kennzahlen, die unternehmensweit geteilt werden sollten. Leitung der Kennzahlengestaltung zur Förderung einer teamübergreifenden Wissenskultur.",
        "difficulty": "high",
        "technologies": [
          "Python",
          "SQL",
          "BigQuery"
        ],
        "highlights": [
          "Aufbereitung von KPIs in den Bereichen Management, Produkt, Vertrieb, Qualität und Nutzung sowie Definition der Kennzahlen, die unternehmensweit geteilt werden sollten. Leitung der Kennzahlengestaltung zur Förderung einer teamübergreifenden Wissenskultur."
        ]
      },
      {
        "title": "Aufbau einer Aggregationspipeline von mehreren Datenquellen nach BigQuery",
        "summary": "Implementierung regelmäßig ausgeführter Verarbeitungen zur Zusammenführung von Daten aus Amazon Redshift, Amazon Aurora, Salesforce und Cloud Firestore in BigQuery auf AWS Lambda und Cloud Functions. Zuständig auch für die Transformation und Aggregationsautomatisierung halbstrukturierter Daten.",
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
          "Implementierung regelmäßig ausgeführter Verarbeitungen zur Zusammenführung von Daten aus Amazon Redshift, Amazon Aurora, Salesforce und Cloud Firestore in BigQuery auf AWS Lambda und Cloud Functions. Zuständig auch für die Transformation und Aggregationsautomatisierung halbstrukturierter Daten."
        ]
      },
      {
        "title": "Design, Implementierung und unternehmensweite Einführung des Google Data Portal Dashboards",
        "summary": "Design und Implementierung eines Dashboards in Google Data Portal zur kontinuierlichen Visualisierung von Vertriebs-, Qualitäts- und Nutzungskennzahlen. Verankerung einer datengetriebenen Kultur durch Aufstellung eines Panels am Büroeingang, Platzierung im Mitarbeiterportal und Präsentation in wöchentlichen Meetings.",
        "difficulty": "medium",
        "technologies": [
          "SQL",
          "BigQuery",
          "Google Data Portal"
        ],
        "highlights": [
          "Design und Implementierung eines Dashboards in Google Data Portal zur kontinuierlichen Visualisierung von Vertriebs-, Qualitäts- und Nutzungskennzahlen. Verankerung einer datengetriebenen Kultur durch Aufstellung eines Panels am Büroeingang, Platzierung im Mitarbeiterportal und Präsentation in wöchentlichen Meetings."
        ]
      },
      {
        "title": "Implementierung der UI-Komponenten für die Town-Portal-Webseite",
        "summary": "Town-Portal-Webseite zum Informationsaustausch zwischen Bewohnern einer Smart-Lock-Neubausiedlung. Implementierung gemeinsamer UI-Komponenten für mehrere Bildschirme in Abstimmung mit dem UI-Designer. Erstellung eines UI-Katalogs mit Storybook.",
        "difficulty": "medium",
        "technologies": [
          "TypeScript",
          "React",
          "MUI",
          "Storybook"
        ],
        "highlights": [
          "Town-Portal-Webseite zum Informationsaustausch zwischen Bewohnern einer Smart-Lock-Neubausiedlung. Implementierung gemeinsamer UI-Komponenten für mehrere Bildschirme in Abstimmung mit dem UI-Designer. Erstellung eines UI-Katalogs mit Storybook."
        ]
      }
    ]
  },
  {
    "id": "simplex-banking-2019",
    "company": "Simplex Inc.",
    "companyDesc": "SIer mit Schwerpunkt auf Finanz-Systemlösungen. Zuständig für Entwicklung, Testing und Wartung eines Risikomanagementsystems für eine Großbank und einer Neuregistrierungsanwendung für eine Versicherungsgesellschaft.",
    "role": "Frontend-Entwickler / Tester / Wartungs- und Betriebsverantwortlicher",
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
        "title": "Entwicklung einer Excel-Frontend-Anwendung mit VBA und Java JSON API-Anbindung",
        "summary": "Entwicklung einer Anwendung, die über VBA mit einer Java JSON API kommuniziert und Daten in Excel anzeigt. Implementierung einer Funktion, die abhängig von den JSON-Ergebnissen dynamisch Spalten hinzufügt und jede Spalte mit Excel-Formeln versieht. Wert auf lesbare Benennung gelegt.",
        "difficulty": "high",
        "technologies": [
          "Java",
          "VBA",
          "Bash"
        ],
        "highlights": [
          "Entwicklung einer Anwendung, die über VBA mit einer Java JSON API kommuniziert und Daten in Excel anzeigt. Implementierung einer Funktion, die abhängig von den JSON-Ergebnissen dynamisch Spalten hinzufügt und jede Spalte mit Excel-Formeln versieht. Wert auf lesbare Benennung gelegt."
        ]
      },
      {
        "title": "Kundenseitiges Testing, Release-Arbeiten, Wartung und Kundenbetreuung",
        "summary": "Zuständig für kundenseitiges Testing und Release-Arbeiten mit Shell-Befehlen und AWS. Leitung der Bearbeitung von Kundenanfragen per E-Mail, Grundlagenentwurf für Enhancement-Projekte, Erstellung von Fehlermeldungstickets und Nachverfolgung in regelmäßigen Meetings.",
        "difficulty": "medium",
        "technologies": [
          "Java",
          "Bash"
        ],
        "highlights": [
          "Zuständig für kundenseitiges Testing und Release-Arbeiten mit Shell-Befehlen und AWS. Leitung der Bearbeitung von Kundenanfragen per E-Mail, Grundlagenentwurf für Enhancement-Projekte, Erstellung von Fehlermeldungstickets und Nachverfolgung in regelmäßigen Meetings."
        ]
      },
      {
        "title": "Vue.js-Frontend-Implementierung der Neuregistrierungsanwendung für Versicherungsgesellschaft",
        "summary": "Detaillierte Abstimmung der Hilfe-Tooltip- und Modalspezifikationen mit dem Designer und Implementierung in allen Bildschirmen und Eingabefeldern. UI-Implementierung für mehrere Benutzereingabebildschirme. Zuständig für die Durchführung und Verwaltung von Geschäftsszenario- und Systemtests.",
        "difficulty": "medium",
        "technologies": [
          "TypeScript",
          "JavaScript",
          "Vue.js"
        ],
        "highlights": [
          "Detaillierte Abstimmung der Hilfe-Tooltip- und Modalspezifikationen mit dem Designer und Implementierung in allen Bildschirmen und Eingabefeldern. UI-Implementierung für mehrere Benutzereingabebildschirme. Zuständig für die Durchführung und Verwaltung von Geschäftsszenario- und Systemtests."
        ]
      }
    ]
  },
  {
    "id": "graph-intern-2018",
    "company": "Graph Inc.",
    "companyDesc": "Datenanalyse- und KI-Entwicklungsunternehmen (Praktikum). Zuständig für die Entwicklung einer Empfehlungs-Engine für Mode-E-Commerce, Datenanalyse für einen Automobilhersteller und Chatbot-Entwicklung.",
    "role": "Data Engineer / Praktikant",
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
        "title": "Prototyp-Entwicklung einer Empfehlungs-Engine für Mode-E-Commerce (3 Algorithmen)",
        "summary": "Prototyp-Entwicklung einer Empfehlungs-Engine für Produktvorschläge auf Startseite, Produktdetailseite und Warenkorbseite. Anwendung von Content-based Filtering und Collaborative Filtering für Neukunden, Bestandskunden und Produktseiten jeweils, wobei auch der Serendipitätsaspekt berücksichtigt wurde.",
        "difficulty": "high",
        "technologies": [
          "Python",
          "pandas",
          "NumPy",
          "SQL"
        ],
        "highlights": [
          "Prototyp-Entwicklung einer Empfehlungs-Engine für Produktvorschläge auf Startseite, Produktdetailseite und Warenkorbseite. Anwendung von Content-based Filtering und Collaborative Filtering für Neukunden, Bestandskunden und Produktseiten jeweils, wobei auch der Serendipitätsaspekt berücksichtigt wurde."
        ]
      },
      {
        "title": "Kundenklassifikation mittels k-Nearest-Neighbors und Grundlagenauswertung des Kaufverhaltens",
        "summary": "Klassifikation der aktuellen Kunden mittels k-Nearest-Neighbors zur Unterstützung der Marketingmaßnahmen der E-Commerce-Geschäftsleitung. Grundlagenauswertung des Kaufverhaltens je Kundensegment (Umsatz nach Produktkategorie etc.).",
        "difficulty": "medium",
        "technologies": [
          "Python",
          "pandas",
          "NumPy",
          "SQL"
        ],
        "highlights": [
          "Klassifikation der aktuellen Kunden mittels k-Nearest-Neighbors zur Unterstützung der Marketingmaßnahmen der E-Commerce-Geschäftsleitung. Grundlagenauswertung des Kaufverhaltens je Kundensegment (Umsatz nach Produktkategorie etc.)."
        ]
      },
      {
        "title": "Fullstack-Entwicklung und Deployment eines Demo-Chatbots",
        "summary": "Festlegung der Designspezifikationen, Bildschirm- und API-Implementierung (Python/Flask) eines Demo-Chatbots. Deployment der Anwendung auf S3 und EC2.",
        "difficulty": "medium",
        "technologies": [
          "JavaScript",
          "Flask",
          "Amazon S3",
          "Amazon EC2",
          "Python"
        ],
        "highlights": [
          "Festlegung der Designspezifikationen, Bildschirm- und API-Implementierung (Python/Flask) eines Demo-Chatbots. Deployment der Anwendung auf S3 und EC2."
        ]
      }
    ]
  }
];
