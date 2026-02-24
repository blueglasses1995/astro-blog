import type { CVProject } from './cv-details';

export const cvProjectsEs: CVProject[] = [
  {
    "id": "ai-translation-tools-2025",
    "company": "SaaS de Traducción con IA Generativa",
    "companyDesc": "Proyecto de diseño e implementación de microservicios de post-procesamiento de traducción para un SaaS de traducción con IA",
    "role": "Ingeniero Backend (Diseño e implementación de microservicios)",
    "roles": ["Backend", "Infra", "Testing"],
    "period": "2025/04 — 2025/09",
    "teamSize": 5,
    "summary": "Conjunto de microservicios de post-procesamiento de traducción con arquitectura FastAPI + Celery + PostgreSQL + Redis. Además del diseño e implementación del servicio de post-validación, se modernizó el entorno de desarrollo frontend, se construyó la infraestructura de despliegue con Docker/GHCR, se implementó la generación automática de mocks desde OpenAPI, y se preparó el entorno de pruebas E2E, abarcando toda la base de desarrollo",
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
        "title": "Diseño de máquina de estados para post-procesamiento de traducción y construcción de infraestructura de tareas tolerante a fallos",
        "summary": "Se gestionó el proceso de verificación de calidad y retraducción posterior a la traducción mediante una máquina de estados de 9 estados, registrando los resultados de cada paso como datos inmutables en la BD. Esto permitió analizar causas de problemas de precisión de traducción solo con SQL, y verificar el estado del procesamiento en tiempo real a través de la API. Cada paso se implementó como tarea idempotente de Celery, con un diseño tolerante a fallos que permite restaurar la información de la cola desde la BD y reanudar el procesamiento ante caídas de contenedores",
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
          "Se diseñó e implementó una arquitectura desacoplada y fácil de mantener, separando completamente la lógica de transición de estados de la lógica de negocio"
        ],
        "decisions": [
          {
            "title": "Control del proceso de verificación de traducción mediante máquina de estados",
            "detail": "Se adoptó un diseño que controla el bucle de verificación de traducción y retraducción con una máquina de 9 estados. Al separar la lógica de transición de estados de la lógica de negocio, se logró una estructura desacoplada donde los cambios en las condiciones de ramificación no afectan a otros pasos"
          },
          {
            "title": "Diseño de esquema inmutable orientado a la observabilidad",
            "detail": "Se adoptó un esquema que registra los resultados de todos los pasos como datos inmutables en la BD. Cuando surgen problemas de precisión en la traducción, se pueden analizar las causas con SQL, y los datos se pueden reutilizar directamente para futuras mejoras del modelo de IA. Además, el estado del procesamiento se puede verificar con un simple SELECT en la BD, reduciendo la carga tanto para los desarrolladores en verificación funcional como para el equipo de negocio en la verificación de calidad de traducción"
          },
          {
            "title": "Diseño tolerante a fallos con tareas idempotentes de Celery",
            "detail": "Cada paso de transición de estados se implementó como tarea idempotente de Celery. Con configuración de reintentos con backoff exponencial + jitter, la parte de polling de la API también se puede reintentar de forma segura. Incluso si el contenedor cae y la cola de Redis se pierde, el procesamiento se puede reanudar restaurando la información de la cola desde el estado registrado en la BD"
          }
        ],
        "outcomes": [
          {
            "before": "El progreso del post-procesamiento de traducción era una caja negra, y la única forma de verificar el funcionamiento era revisar los logs manualmente",
            "after": "El estado del procesamiento se puede verificar con una sola llamada a la API. Los problemas de precisión de traducción también se pueden analizar con SQL, reduciendo el esfuerzo de verificación tanto para desarrolladores como para el equipo de negocio",
            "metric": "Mejora de la observabilidad y capacidad de recuperación ante fallos"
          }
        ],
        "challenges": [
          {
            "title": "Diseño de recuperación del procesamiento ante caídas de contenedores",
            "resolution": "Dado que la cola de Redis es volátil, se construyó un mecanismo para restaurar la información correcta de la cola desde el estado de la BD al reiniciar contenedores. Al diseñar cada tarea como idempotente, se permite la reanudación segura desde cualquier punto intermedio"
          },
          {
            "title": "Separación de la lógica de transición de estados y la lógica de negocio",
            "resolution": "Se gestionaron las condiciones de transición de estados y la lógica de negocio de cada paso como módulos completamente independientes. Se logró un diseño desacoplado donde la modificación de cualquiera de ellos no afecta al otro, asegurando la mantenibilidad"
          }
        ]
      },
      {
        "title": "Creación de especificaciones de pruebas manuales para prevención de regresiones y definición de estrategia de pruebas con IA",
        "summary": "Se crearon especificaciones de pruebas manuales para prevenir regresiones en preparación para la refactorización posterior al primer lanzamiento. Se evaluó honestamente los límites de confiabilidad del comportamiento no determinista de la IA generativa (agent-browser), y se definió una estrategia de migración gradual: pruebas manuales, E2E y pruebas de componentes. Se tomó la decisión pragmática de limitar las pruebas a manuales para las partes fuertemente acopladas al editor OnlyOffice (implementación Canvas)",
        "difficulty": "medium",
        "technologies": [
          "Storybook",
          "Playwright",
          "Vitest",
          "React Testing Library",
          "agent-browser"
        ],
        "highlights": [
          "Se evaluaron los límites de confiabilidad del comportamiento no determinista de la IA generativa y se definió una estrategia de automatización de pruebas gradual (manuales, E2E, componentes)"
        ],
        "decisions": [
          {
            "title": "Definición de estrategia de pruebas considerando el comportamiento no determinista de la IA generativa (agent-browser)",
            "detail": "En lugar de dejar que la IA ejecute pruebas manuales de forma desordenada, se definió una estrategia de automatización gradual: (1) sistematizar las pruebas manuales con especificaciones, (2) migrar a pruebas E2E y de componentes deterministas, (3) utilizar agent-browser exclusivamente para generar código de pruebas E2E deterministas, no para ejecutar pruebas manuales"
          },
          {
            "title": "Estrategia de pruebas para UI fuertemente acoplada al editor OnlyOffice (implementación Canvas)",
            "detail": "Se determinó que la simulación del editor OnlyOffice reduciría la efectividad de las pruebas. Dado que las pruebas E2E basadas en posiciones relativas del DOM en Canvas son propensas a la inestabilidad, se decidió honestamente renunciar a las pruebas E2E para las partes acopladas a OnlyOffice y limitarlas a pruebas manuales"
          }
        ],
        "outcomes": [
          {
            "before": "No existían medios de prevención de regresiones durante la refactorización, y no se había definido una estrategia de pruebas",
            "after": "Se crearon especificaciones de pruebas manuales para prevención de regresiones, sistematizando las pruebas manuales. Tras evaluar honestamente los límites de confiabilidad de la IA generativa, se definió una estrategia de migración gradual hacia pruebas E2E y de componentes. Se documentó la decisión pragmática de limitar las partes acopladas a OnlyOffice a pruebas manuales",
            "metric": "Sistematización de la estrategia de pruebas y marco de aseguramiento de calidad"
          }
        ],
        "challenges": [
          {
            "title": "Determinación de los límites de automatización de pruebas para UI fuertemente acoplada al editor OnlyOffice (implementación Canvas)",
            "resolution": "Se separaron claramente los objetos de prueba en 'áreas automatizables' y 'áreas que requieren pruebas manuales'. Las partes acopladas a OnlyOffice se cubren con especificaciones de pruebas manuales, mientras que el resto de la lógica UI/API se automatiza con pruebas E2E y de componentes"
          }
        ]
      },
      {
        "title": "Diseño de glosario y arquitectura limpia para la función de verificación de traducción",
        "summary": "Se diseñó el modelo de dominio, la estructura de datos del glosario y la arquitectura limpia (separación UseCase/Repository/Domain) para toda la función de verificación de traducción. Mediante un diseño de esquema que persiste las decisiones de la IA generativa en la BD, se aseguró la observabilidad del proceso de verificación",
        "difficulty": "high",
        "technologies": [
          "Python",
          "FastAPI",
          "PostgreSQL"
        ],
        "highlights": [
          "Se diseñó toda la lógica de verificación de traducción con arquitectura limpia separando UseCase/Repository/Domain, facilitando la distribución de tareas entre los miembros del equipo"
        ],
        "decisions": [
          {
            "title": "Adopción de arquitectura de 3 capas: UseCase/Repository/Domain",
            "detail": "Se separó la lógica de verificación de traducción en 3 capas: UseCase (control del flujo de negocio) / Repository (abstracción del acceso a datos) / Domain (modelo de dominio y validación). Al encapsular las llamadas a la IA generativa en la capa UseCase, se limitó el alcance del impacto ante cambios en el modelo de IA"
          },
          {
            "title": "Diseño de esquema para persistir las decisiones de la IA generativa en la BD",
            "detail": "Se adoptó un diseño que persiste como registros en la BD todas las determinaciones que la IA generativa realiza en cada paso de verificación (puntuación de calidad de traducción, necesidad de retraducción, sugerencias de corrección de términos). Esto se estableció como base para acumular datos necesarios para futuras comparaciones de precisión de modelos de IA y mejora de prompts"
          }
        ],
        "outcomes": [
          {
            "before": "La lógica de verificación de traducción no tenía diseño, y no existían criterios para la distribución de tareas dentro del equipo",
            "after": "La arquitectura de 3 capas clarificó las responsabilidades de cada capa. Se construyó un sistema donde los miembros del equipo pueden desarrollar en paralelo las capas Repository y UseCase, y el documento de diseño funcionó como criterio para la distribución de tareas",
            "metric": "Establecimiento de una base de diseño que permite el desarrollo paralelo con un equipo de 4 personas"
          }
        ],
        "challenges": [
          {
            "title": "Diseño para incorporar las salidas no deterministas de la IA generativa en el modelo de dominio",
            "resolution": "Se definieron las salidas de la IA como tipos de 'resultado de determinación', diseñando un flujo donde se validan en la capa Domain antes de persistirlas en la BD. Se logró una estructura que absorbe los cambios en el formato de salida de la IA mediante la validación en la capa Domain"
          }
        ]
      },
      {
        "title": "Implementación de algoritmo de coincidencia cuasi-exacta para búsqueda de ejemplos de uso en glosario",
        "summary": "Se implementó un algoritmo para la búsqueda de ejemplos de uso en el glosario de traducción que permite variaciones ortográficas, diferencias en partículas y discrepancias en puntuación, mientras devuelve coincidencias semánticamente precisas. Se resolvió el problema donde la búsqueda de texto completo carecía de precisión y la coincidencia exacta generaba demasiadas omisiones",
        "difficulty": "high",
        "technologies": [
          "Python",
          "PostgreSQL"
        ],
        "highlights": [
          "Se diseñó una lógica de búsqueda de 'coincidencia cuasi-exacta' intermedia entre la búsqueda de texto completo y la coincidencia exacta, logrando una búsqueda de términos de alta precisión que tolera variaciones ortográficas"
        ],
        "decisions": [
          {
            "title": "Diseño de método de 'coincidencia cuasi-exacta': ni búsqueda de texto completo ni coincidencia exacta",
            "detail": "La búsqueda de texto completo de PostgreSQL (tsvector) generaba demasiados resultados por diferencias en partículas y puntuación del japonés, mientras que la coincidencia exacta producía muchas omisiones por variaciones ortográficas. Se diseñó un método intermedio que aplica procesamiento de normalización (eliminación de puntuación, unificación de espacios, tolerancia de patrones de partículas) antes de la comparación de cadenas, equilibrando precisión y exhaustividad"
          }
        ],
        "outcomes": [
          {
            "before": "La búsqueda de texto completo arrojaba oraciones no relacionadas con los términos de traducción, y la coincidencia exacta no podía encontrar los ejemplos de uso deseados debido a variaciones ortográficas",
            "after": "El algoritmo de coincidencia cuasi-exacta mejoró significativamente la utilidad del glosario al devolver solo ejemplos de uso semánticamente precisos mientras tolera variaciones ortográficas, diferencias en partículas y diferencias en puntuación",
            "metric": "Mejora de precisión en la búsqueda del glosario (equilibrio entre reducción de falsos positivos y mejora de la exhaustividad)"
          }
        ],
        "challenges": [
          {
            "title": "Sistematización de patrones de variación ortográfica en texto japonés",
            "resolution": "Se recopilaron y clasificaron los patrones de variación ortográfica frecuentes en los documentos de traducción (mezcla de puntuación '、' y '，', intercambio de partículas 'は' y 'が', mezcla de caracteres de ancho completo y medio). Se implementaron como reglas de normalización y se verificaron exhaustivamente con casos de prueba"
          }
        ]
      },
      {
        "title": "Paralelización de IO de red secuencial en tareas Celery con asyncio",
        "summary": "Se transformó el IO de red secuencial hacia múltiples servicios externos (API de traducción, API de glosario, etc.) en ejecución concurrente mediante el bucle de eventos de asyncio. Se estableció un patrón para integrar de forma segura asyncio con el modelo de workers síncronos de Celery, mejorando la latencia y el throughput",
        "difficulty": "high",
        "technologies": [
          "Python",
          "Celery",
          "asyncio"
        ],
        "highlights": [
          "Se estableció un patrón para iniciar de forma segura un bucle de eventos asyncio dentro de workers síncronos de Celery, paralelizando las llamadas a APIs externas que antes eran secuenciales"
        ],
        "decisions": [
          {
            "title": "Adopción del patrón de integración de bucle de eventos asyncio dentro de workers síncronos de Celery",
            "detail": "Se adoptó un patrón que mantiene el modelo de workers síncronos (prefork) de Celery mientras inicia un bucle de eventos mediante asyncio.run() dentro de cada tarea. Se descartó la opción de cambiar Celery a workers asíncronos por el alto riesgo de compatibilidad del ecosistema, y también el ThreadPoolExecutor porque los hilos ocupan recursos innecesariamente durante la espera de IO"
          }
        ],
        "outcomes": [
          {
            "before": "Las llamadas a la API de traducción y la API de glosario se ejecutaban secuencialmente, y el tiempo de procesamiento por solicitud era largo al esperar 3 APIs externas en orden",
            "after": "Se cambió a ejecución concurrente de llamadas a APIs externas con asyncio.gather. El tiempo de procesamiento, que antes era la suma de los tiempos de respuesta de cada API en ejecución secuencial, se redujo al tiempo de respuesta de la API más lenta",
            "metric": "Reducción de latencia y mejora de throughput en la parte de llamadas a APIs externas"
          }
        ],
        "challenges": [
          {
            "title": "Coexistencia del modelo de ejecución síncrona de Celery con asyncio",
            "resolution": "Dado que los workers prefork de Celery son basados en procesos, se adoptó un enfoque de crear y desechar un nuevo bucle de eventos asyncio dentro de cada tarea. Al limitar el ciclo de vida del bucle de eventos al ámbito de la tarea, se eliminó la interferencia entre workers"
          }
        ]
      },
      {
        "title": "Optimización del algoritmo de coincidencia de texto para asignación de controles de contenido",
        "summary": "Se optimizó el algoritmo de coincidencia entre el texto fuente y la estructura del documento para asignar marcadores con precisión en las secciones de traducción del documento. Se logró equilibrar la precisión de coincidencia y el rendimiento en documentos de gran tamaño",
        "difficulty": "extreme",
        "technologies": [
          "Python"
        ],
        "highlights": [
          "Se optimizó el algoritmo de búsqueda, logrando velocidades de procesamiento prácticas incluso en documentos de gran tamaño manteniendo la precisión"
        ],
        "decisions": [
          {
            "title": "Reducción del espacio de búsqueda mediante estrategia de coincidencia por etapas",
            "detail": "Se adoptó una estrategia que ejecuta secuencialmente la coincidencia entre el texto fuente y la estructura del documento (párrafos, celdas, elementos de lista) en 3 etapas: coincidencia exacta, coincidencia normalizada y coincidencia parcial. Al excluir del espacio de búsqueda las ubicaciones confirmadas en etapas superiores, se redujo la complejidad computacional mientras se mantenía la precisión"
          }
        ],
        "outcomes": [
          {
            "before": "El procesamiento de coincidencia tardaba demasiado en documentos de gran tamaño (más de 100 páginas), y también había problemas con la precisión de asignación de controles de contenido",
            "after": "La estrategia de coincidencia por etapas logró velocidades de procesamiento prácticas incluso en documentos de gran tamaño. La precisión de coincidencia también mejoró, aumentando la confiabilidad de la asignación de marcadores en las secciones de traducción",
            "metric": "Mejora de velocidad de coincidencia y precisión en documentos de gran tamaño"
          }
        ],
        "challenges": [
          {
            "title": "Trade-off entre la granularidad de segmentación de la estructura del documento y la precisión de coincidencia",
            "resolution": "Se ajustó la granularidad de segmentación de texto según la estructura interna del documento Word (párrafos, celdas de tabla, elementos de lista, encabezados/pies de página). Se resolvió el problema donde una segmentación demasiado fina aumentaba los candidatos de coincidencia y ralentizaba el proceso, y una demasiado gruesa reducía la precisión de coincidencia parcial, mediante reglas de segmentación específicas por tipo de elemento"
          }
        ]
      },
      {
        "title": "Modernización del entorno de desarrollo frontend",
        "summary": "Se introdujeron de forma integral Vite, Vitest, Storybook, Biome y Playwright en el frontend existente, renovando la base de experiencia de desarrollo y calidad de código. Se preparó la cadena de herramientas incluyendo mejora de velocidad de compilación, pruebas unitarias, catálogo de UI, linter/formateador y pruebas E2E",
        "difficulty": "high",
        "technologies": [
          "Vite",
          "Vitest",
          "Storybook",
          "Biome",
          "Playwright"
        ],
        "highlights": [
          "Se introdujeron las 5 herramientas Vite/Vitest/Storybook/Biome/Playwright, construyendo desde cero la base de pruebas, gestión de calidad y catálogo de UI"
        ],
        "decisions": [
          {
            "title": "Selección de Vite + Biome (abandono de webpack + ESLint/Prettier)",
            "detail": "Se migró el entorno de compilación basado en webpack existente a Vite, y se integró ESLint+Prettier en Biome. La velocidad de hot reload de Vite y el lint/format de alta velocidad de Biome mejoraron significativamente la velocidad de iteración del desarrollo"
          },
          {
            "title": "Unificación de gestión de versiones de Node.js mediante la introducción de Volta",
            "detail": "Se resolvieron con Volta los errores de compilación esporádicos causados por discrepancias en las versiones de Node.js entre miembros del equipo. Se fijó la versión en la raíz del proyecto, eliminando las diferencias de entorno entre miembros"
          }
        ],
        "outcomes": [
          {
            "before": "No existían pruebas unitarias, catálogo de UI, linter ni pruebas E2E, y no había medios objetivos de verificación de calidad de código",
            "after": "Se integraron de forma holística las 5 herramientas: Vite (compilación), Vitest (pruebas unitarias), Storybook (catálogo de UI), Biome (lint/format) y Playwright (E2E), renovando completamente la base de desarrollo",
            "metric": "Establecimiento de la base de pruebas y gestión de calidad (construcción desde cero)"
          }
        ],
        "challenges": [
          {
            "title": "Coexistencia del proyecto PHP existente con Vite",
            "resolution": "Se diseñó una configuración híbrida que no rompe el entorno PHP+jQuery existente, gestionando solo la parte React con Vite. Se configuró para que la salida de compilación de Vite se cargue desde las plantillas PHP, permitiendo una migración incremental"
          }
        ]
      },
      {
        "title": "Generación automática de mocks para frontend desde especificación OpenAPI del backend Python",
        "summary": "Se construyó un sistema que utiliza la especificación OpenAPI generada automáticamente por FastAPI como fuente para generar automáticamente definiciones de tipos TypeScript, clientes API y handlers de mock con MSW (Mock Service Worker) y Orval. El desarrollo frontend ya no necesita esperar la implementación del backend",
        "difficulty": "high",
        "technologies": [
          "MSW",
          "Orval",
          "FastAPI",
          "Storybook"
        ],
        "highlights": [
          "Se construyó un pipeline que genera automáticamente definiciones de tipos, clientes API y mocks desde la especificación OpenAPI, eliminando la dependencia del frontend respecto al backend"
        ],
        "decisions": [
          {
            "title": "Pipeline de generación automática de mocks con la especificación OpenAPI como Single Source of Truth",
            "detail": "Se diseñó un pipeline que utiliza la especificación OpenAPI generada automáticamente por FastAPI como única fuente de verdad, generando definiciones de tipos TypeScript y clientes API con Orval, y handlers de mock con MSW. Dado que el enfoque de escribir mocks manualmente dificultaba el seguimiento de cambios en la API, la generación automática desde la especificación garantiza simultáneamente la seguridad de tipos y la vigencia de los mocks"
          }
        ],
        "outcomes": [
          {
            "before": "El desarrollo frontend necesitaba esperar a que se completara la implementación de la API del backend, imposibilitando el desarrollo en paralelo",
            "after": "Al generar mocks automáticamente desde la especificación OpenAPI, el desarrollo frontend puede comenzar tan pronto como se define la API del backend. Los mocks API también funcionan en Storybook, completando la verificación de funcionamiento de la UI sin necesidad del backend",
            "metric": "Establecimiento de la capacidad de desarrollo en paralelo entre frontend y backend"
          }
        ],
        "challenges": [
          {
            "title": "Mantenimiento de la coherencia de tipos entre el esquema OpenAPI y Orval/MSW",
            "resolution": "Se automatizó la regeneración desde el esquema OpenAPI en CI, construyendo un sistema donde las definiciones de tipos y mocks del frontend se actualizan automáticamente ante cambios en la API del backend. Las inconsistencias de tipos se detectan inmediatamente como errores de compilación de TypeScript"
          }
        ]
      },
      {
        "title": "Construcción de infraestructura de despliegue tipo pull con Docker Compose + GHCR",
        "summary": "Se crearon scripts de automatización para todo el flujo: compilación con Docker Compose, push a GHCR y despliegue tipo pull en el servidor de producción. Se configuró la gestión de imágenes en GHCR, visibilidad, permisos, y el despliegue tipo pull basado en cron en el servidor de producción",
        "difficulty": "high",
        "technologies": [
          "Docker",
          "GitHub Actions"
        ],
        "highlights": [
          "Se migró del despliegue manual SSH+SCP al despliegue tipo pull con Docker Compose+GHCR, estableciendo un flujo de despliegue reproducible"
        ],
        "decisions": [
          {
            "title": "Adopción de despliegue tipo pull con GHCR (migración desde método manual SSH+SCP)",
            "detail": "Se migró del método donde los desarrolladores se conectaban por SSH al servidor y subían archivos con SCP, a un despliegue tipo pull donde las imágenes se envían a GHCR y el servidor de producción las descarga mediante cron. Se aseguró la reproducibilidad del despliegue, y el rollback se hizo posible instantáneamente cambiando la etiqueta de imagen"
          },
          {
            "title": "Diseño de configuración de visibilidad y permisos de GHCR y gestión de imágenes",
            "detail": "Se gestionó la visibilidad de imágenes de GitHub Container Registry a nivel de Organization, y se configuraron los permisos necesarios para el pull desde el servidor de producción (Personal Access Token + scope read:packages). También se diseñó la convención de nomenclatura de etiquetas de imagen"
          }
        ],
        "outcomes": [
          {
            "before": "El despliegue era manual con SSH+SCP, dependiente de personas específicas, con riesgo de fallos por errores de procedimiento. No existían medios de rollback",
            "after": "Se aseguró la reproducibilidad con despliegue tipo pull mediante Docker Compose+GHCR. El rollback también se facilitó mediante pull automático basado en cron y gestión de etiquetas de imagen",
            "metric": "Automatización del despliegue y establecimiento de reproducibilidad"
          }
        ],
        "challenges": [
          {
            "title": "Asegurar la confiabilidad del despliegue tipo pull basado en cron",
            "resolution": "Se incorporaron en el script de pull las funciones de health check, detección de diferencias de imagen y rollback, diseñando para mantener el contenedor existente en caso de fallo en la descarga de la nueva imagen"
          }
        ]
      },
      {
        "title": "Control de configuración TLS/CORS del servidor OnlyOffice mediante variables de entorno Docker",
        "summary": "Se configuró la certificación TLS y la configuración de origen CORS del servidor de documentos OnlyOffice para ser controlables desde variables de entorno mediante inyección de scripts al inicio de Docker. Se facilitó el cambio de configuración entre entornos",
        "difficulty": "medium",
        "technologies": [
          "Docker"
        ],
        "highlights": [
          "Se adoptó un enfoque de control mediante variables de entorno a través de inyección de scripts de inicio, sin editar directamente los archivos de configuración de OnlyOffice"
        ],
        "decisions": [
          {
            "title": "Externalización de la configuración de OnlyOffice mediante inyección de scripts",
            "detail": "Dado que el montaje directo de archivos de configuración de OnlyOffice causa problemas de compatibilidad durante las actualizaciones de versión, se adoptó un método que genera dinámicamente los archivos de configuración desde variables de entorno mediante un script entrypoint al iniciar Docker. Se hicieron configurables la ruta del certificado TLS y el origen CORS mediante variables de entorno"
          }
        ],
        "outcomes": [
          {
            "before": "La configuración TLS/CORS de OnlyOffice estaba codificada en los archivos de configuración, requiriendo edición manual al cambiar de entorno",
            "after": "Se habilitó el control de la ruta del certificado TLS y el origen CORS mediante variables de entorno Docker, automatizando el cambio de configuración entre entornos de desarrollo, staging y producción",
            "metric": "Automatización del cambio de entornos y externalización de la configuración"
          }
        ]
      },
      {
        "title": "Documentación del procedimiento de construcción del entorno de desarrollo E2E con mezcla local/remoto",
        "summary": "Se elaboró documentación reproducible del procedimiento de construcción del entorno de desarrollo E2E que integra React+Python local con PHP en servidor remoto. Se creó un manual que incluye Docker Compose, configuración de red y gestión de variables de entorno, eficientizando la incorporación de nuevos miembros",
        "difficulty": "medium",
        "technologies": [
          "Docker",
          "Python",
          "FastAPI"
        ],
        "highlights": [
          "Se documentó el procedimiento de reproducción del entorno mixto local/remoto, reduciendo el esfuerzo de configuración del entorno para nuevos miembros"
        ],
        "decisions": [
          {
            "title": "Estandarización del procedimiento de configuración del entorno mediante integración con Docker Compose",
            "detail": "Se consolidó en un solo documento la configuración de red Docker Compose, las plantillas de variables de entorno y los procedimientos de verificación de conexión para integrar los contenedores locales React+Python con PHP+OnlyOffice en el servidor remoto. El objetivo fue que los nuevos miembros pudieran reproducir el entorno E2E siguiendo el documento"
          }
        ],
        "outcomes": [
          {
            "before": "El procedimiento de configuración del entorno se transmitía verbalmente y dependía de personas específicas, tomando 1-2 días la configuración del entorno para nuevos miembros",
            "after": "El manual reproducible eliminó la dependencia personal del procedimiento de configuración del entorno. Se elaboró documentación paso a paso que incluye Docker Compose, configuración de red y variables de entorno",
            "metric": "Eficientización de la incorporación de nuevos miembros"
          }
        ]
      },
      {
        "title": "Construcción del entorno de pruebas E2E con Playwright e implementación de escenarios de prueba",
        "summary": "Se construyó con Playwright un entorno de pruebas E2E que cubre todo el flujo de trabajo de traducción con integración React/Python/OnlyOffice. Dado que los elementos Canvas de OnlyOffice tienen limitaciones para pruebas E2E, se delimitaron claramente el alcance automatizable y el de pruebas manuales",
        "difficulty": "high",
        "technologies": [
          "Playwright",
          "Docker"
        ],
        "highlights": [
          "Se implementaron escenarios de prueba de regresión para todo el flujo de trabajo de traducción, delimitando claramente el alcance automatizable y el de pruebas manuales"
        ],
        "decisions": [
          {
            "title": "Delimitación clara entre áreas automatizables y áreas de pruebas manuales",
            "detail": "Dado que las operaciones dependientes de elementos Canvas del editor OnlyOffice son difíciles de probar de forma estable con Playwright, se dividieron los objetos de prueba en 'flujo de operaciones del workflow de traducción y integración API' y 'operaciones de documentos dentro de OnlyOffice', cubriendo solo el primero con pruebas E2E"
          }
        ],
        "outcomes": [
          {
            "before": "No existía entorno de pruebas E2E, y las pruebas de regresión durante adiciones de funcionalidad y refactorizaciones eran exclusivamente manuales",
            "after": "Se implementaron con Playwright escenarios de prueba de regresión para todo el flujo de trabajo de traducción (carga de archivo, ejecución de traducción, verificación de resultados). Las pruebas de integración React+Python+PostgreSQL se pueden ejecutar automáticamente dentro del entorno Docker",
            "metric": "Automatización de pruebas de regresión mediante E2E (cobertura del área testeable)"
          }
        ],
        "challenges": [
          {
            "title": "Construcción del entorno de pruebas de integración de los 3 servicios React+Python+OnlyOffice",
            "resolution": "Se diseñó una configuración de red que inicia los 3 servicios de forma integrada con Docker Compose y permite el acceso desde el runner de pruebas de Playwright. La carga de datos iniciales y la limpieza para pruebas se gestionan como fixtures, asegurando la independencia de las pruebas"
          }
        ]
      },
      {
        "title": "Construcción de dashboard de eficiencia de desarrollo, MCP de agregación de logs y agente de generación de Stories",
        "summary": "Se creó un dashboard que visualiza el estado de ejecución de tareas Celery y las tasas de éxito/fallo de verificación de traducción. También se construyeron un servidor MCP para buscar logs de entornos distribuidos desde Claude Code y un sub-agente que genera automáticamente Stories de Storybook desde componentes, mejorando la eficiencia del desarrollo",
        "difficulty": "medium",
        "technologies": [
          "Python",
          "Storybook",
          "agent-browser"
        ],
        "highlights": [
          "Se construyó una base de soporte al desarrollo utilizando herramientas de IA, incluyendo búsqueda de logs mediante servidor MCP y agente de generación automática de Stories"
        ],
        "decisions": [
          {
            "title": "Integración de logs distribuidos en Claude Code mediante servidor MCP",
            "detail": "Se construyó un servidor MCP que permite buscar transversalmente desde Claude Code los logs distribuidos en cada contenedor React, Python y Celery. Anteriormente se verificaban los logs individualmente con docker logs + grep, pero la herramienta MCP permitió la búsqueda y filtrado de logs desde dentro de la conversación de Claude Code"
          },
          {
            "title": "Generación automática de Stories de Storybook con agent-browser",
            "detail": "Se construyó un sub-agente que genera automáticamente Stories de Storybook desde componentes React existentes. agent-browser analiza la implementación de los componentes y genera automáticamente archivos Story que cubren exhaustivamente los patrones de props y estados, acelerando la preparación del catálogo de UI"
          }
        ],
        "outcomes": [
          {
            "before": "La verificación de logs de contenedores distribuidos requería ejecución manual de docker logs + grep, y la investigación de incidentes tomaba mucho tiempo. Las Stories de Storybook también se creaban manualmente para cada componente UI",
            "after": "El servidor MCP permite la búsqueda transversal de logs desde Claude Code. También se creó un dashboard que visualiza el estado de ejecución de tareas Celery y las tasas de éxito/fallo de verificación de traducción, mejorando la eficiencia de investigación de incidentes y monitoreo de calidad",
            "metric": "Mejora de la eficiencia en investigación de incidentes y desarrollo, y aceleración de la preparación del catálogo de UI"
          }
        ]
      }
    ]
  },
  {
    "id": "learning-platform-consulting-2025",
    "company": "Empresa mediana de plataforma de aprendizaje en línea",
    "companyDesc": "Empresa proveedora de una plataforma de aprendizaje en línea de tamaño mediano. Se brindó soporte de análisis técnico y propuestas para las solicitudes de ampliación a corto plazo del sistema integrado de operaciones.",
    "role": "Investigación técnica y elaboración de documentación",
    "roles": ["Consulting"],
    "period": "2025-05 — 2025-07",
    "teamSize": 2,
    "summary": "Cuantificación de calidad del sistema legado basado en VBScript/Oracle con SonarQube, y soporte en la selección estratégica mediante una matriz comparativa de 3 opciones: modificación/introducción de ERP/extensión de navegador. También se construyó una base de búsqueda RAG de documentos internos con NotebookLM+markitdown. Se generaron resultados en un período de consultoría de aproximadamente 2 meses aprovechando herramientas de IA generativa",
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
        "title": "Construcción de base de búsqueda RAG para documentos internos",
        "summary": "Se procesaron documentos internos a Markdown con markitdown y se preparó un entorno de búsqueda RAG con NotebookLM. Se integró Claude Desktop con SonarQube vía MCP, eficientizando el flujo de extracción y formateo de puntos clave de problemas de calidad.",
        "difficulty": "medium",
        "technologies": [
          "SonarQube",
          "NotebookLM",
          "markitdown",
          "Claude"
        ],
        "highlights": [
          "Se diseñó la arquitectura de la base de búsqueda RAG con NotebookLM+markitdown y se construyó el pipeline de conversión de documentos",
          "Se propuso un enfoque de bajo costo y plazo corto aprovechando SaaS existente (NotebookLM) en lugar de desarrollo RAG personalizado"
        ],
        "decisions": [
          {
            "title": "Construcción RAG de bajo esfuerzo con NotebookLM + markitdown",
            "detail": "Se adoptó un método que utiliza NotebookLM de Google, convirtiendo documentos internos (PDF/Word/Excel) a texto con markitdown para su ingesta. En lugar de construir un RAG personalizado, se minimizaron los costos aprovechando el SaaS existente"
          }
        ],
        "outcomes": [
          {
            "before": "Los documentos internos estaban dispersos en servidores de archivos y almacenamiento en la nube de cada departamento, sin posibilidad de búsqueda transversal. Encontrar la información necesaria tomaba mucho tiempo",
            "after": "Se construyó una base de búsqueda RAG con NotebookLM + markitdown. Se convirtieron los documentos internos a Markdown para su ingesta, permitiendo la búsqueda transversal en lenguaje natural. Se logró un entorno de búsqueda práctico dentro de un período de consultoría de aproximadamente 2 semanas",
            "metric": "Eficientización de la búsqueda de documentos internos"
          }
        ],
        "challenges": [
          {
            "title": "Conversión de documentos internos en diversos formatos de archivo a formato compatible con búsqueda RAG",
            "resolution": "Se utilizó markitdown para convertir PDF/Word/Excel a formato Markdown. Se construyó un pipeline de conversión que preserva al máximo la información estructural (encabezados, tablas, listas). Después de la conversión, se verificó manualmente la calidad del Markdown y se hicieron correcciones necesarias antes de ingresarlo en NotebookLM"
          }
        ]
      },
      {
        "title": "Investigación de estructura de código y análisis de extensibilidad del sistema legado",
        "summary": "Se realizó análisis estático del sistema legado basado en VBScript/Oracle con Cursor/SonarQube/Claude Desktop. Se analizaron la extensibilidad, dificultad de modificación y dependencias, y se organizaron y compararon las opciones de ERP, modificación existente y extensión.",
        "difficulty": "medium",
        "technologies": [
          "SonarQube",
          "Cursor",
          "ChatGPT",
          "Claude"
        ],
        "highlights": [
          "Se realizó análisis estático con SonarQube y se creó un informe de evaluación de riesgo de modificación por módulo",
          "La visualización de riesgos de modificación basada en datos cuantitativos proporcionó la justificación para la adopción del enfoque de extensión de navegador"
        ],
        "decisions": [
          {
            "title": "Cuantificación de la calidad del código legado con SonarQube",
            "detail": "Se utilizó SonarQube para realizar análisis estático de todo el código, midiendo cuantitativamente indicadores de bugs, code smells, tasa de duplicación y cobertura de pruebas. Se prepararon datos que permiten evaluar objetivamente los riesgos de modificación"
          },
          {
            "title": "Propuesta de prioridad de modificación basada en datos cuantitativos",
            "detail": "Se organizaron los resultados del análisis estático por módulo, mapeando las áreas de alto riesgo de modificación y su alcance de impacto. Se propuso la prioridad de modificación basada en evidencia cuantitativa"
          }
        ],
        "outcomes": [
          {
            "before": "No existía una evaluación objetiva de la calidad del código, y los riesgos de modificación eran inciertos",
            "after": "Se evaluó cuantitativamente la calidad del código mediante análisis con SonarQube. Se identificaron las áreas de alto riesgo de modificación y se visualizó el panorama completo de la deuda técnica",
            "metric": "Objetivación de los riesgos de modificación basada en evaluación cuantitativa. Utilizado como justificación para la adopción del enfoque de extensión de navegador"
          }
        ],
        "challenges": [
          {
            "title": "Investigación en un entorno legado sin control de versiones ni pruebas",
            "resolution": "Se cuantificó la calidad con análisis estático de SonarQube, y se realizó la investigación sin afectar el entorno de producción conectándose a una réplica de solo lectura de la BD Oracle. Se resumieron los resultados del análisis en un informe en formato de diapositivas, visualizando los riesgos técnicos para la dirección"
          }
        ]
      },
      {
        "title": "Elaboración de documentación de soporte a la toma de decisiones y conceptualización de PoC para extensión a corto plazo",
        "summary": "Se creó documentación de propuesta aprovechando activamente diagramas de flujo y estructura con notación Mermaid. Se utilizaron herramientas de IA generativa como Genspark, Gamma y Canva para acelerar el proceso de creación de documentos con iteraciones cortas.",
        "difficulty": "medium",
        "technologies": [
          "Genspark",
          "Gamma",
          "Canva",
          "Mermaid"
        ],
        "highlights": [
          "Se diseñó una matriz comparativa de 3 opciones con 7 ejes de evaluación y un árbol de decisión, y se definió la arquitectura PoC de extensión de navegador con React",
          "Se clasificaron las solicitudes de 6 departamentos en 3 niveles: 'factible con extensión/requiere modificación/pendiente de ERP', presentando a cada departamento la perspectiva de realización"
        ],
        "decisions": [
          {
            "title": "Soporte a la selección estratégica mediante framework de comparación de 3 opciones",
            "detail": "Se creó una matriz que compara las 3 opciones en 7 ejes de evaluación (riesgo de desarrollo, costo, plazo, aseguramiento de calidad, impacto operativo, extensibilidad, ROI), visualizando el flujo de decisión en formato de árbol de decisión"
          },
          {
            "title": "Propuesta de enfoque de mejora de bajo riesgo mediante extensión de navegador con React",
            "detail": "Se propuso un enfoque de superponer UI React sobre la pantalla legada como extensión de Chrome. Se realizó el diseño de PoC para implementar funcionalidades como dropdowns jerárquicos de maestro de descuentos en el lado frontend sin modificar la BD ni la lógica backend existentes"
          }
        ],
        "outcomes": [
          {
            "before": "No existían criterios de decisión entre los múltiples enfoques de extensión (modificación/ERP/extensión), y la dirección no podía tomar decisiones",
            "after": "Se apoyó la selección estratégica con matriz comparativa de 3 opciones + árbol de decisión. Se diseñó la arquitectura PoC de extensión de navegador React (Lambda+S3+IndexedDB+Chrome Extension), presentando la dirección de implementación concreta para el caso de uso de flexibilización de criterios de descuento",
            "metric": "La extensión de navegador fue aprobada como medida a corto plazo. La introducción de ERP se consideró por separado como plan de presupuesto a medio-largo plazo de 2-3 años"
          }
        ],
        "challenges": [
          {
            "title": "Organización de solicitudes de 6 departamentos y clasificación de factibilidad",
            "resolution": "Se consolidaron todas las solicitudes como resultados de entrevistas en Excel, clasificándolas en 3 niveles: 'factible con extensión de navegador', 'requiere modificación de código existente' y 'pendiente de ERP'. Se mostraron las prioridades con estrellas, visualizando en qué etapa se realizaría cada solicitud de cada departamento"
          }
        ]
      }
    ]
  },
  {
    "id": "ai-translation-qcd-2025",
    "company": "Startup nacional de SaaS de traducción con IA generativa",
    "companyDesc": "Startup nacional que provee un SaaS de traducción utilizando IA generativa. Se encargó de proponer mejoras de QCD en recursos humanos para la organización de desarrollo.",
    "role": "Asesor de organización de desarrollo",
    "roles": ["Consulting"],
    "period": "2025-04 — 2025-07",
    "teamSize": 2,
    "summary": "Análisis estructural de problemas QCD (Calidad, Costo, Plazo) como asesor externo en una organización de desarrollo de aproximadamente 30 personas. Se estructuraron 100 hipótesis con MECE e Issue Tree, y se objetivizó la prioridad de medidas con scoring ponderado de 5 ejes. Se creó un roadmap de ejecución de 6 fases y documentación de propuesta ejecutiva, obteniendo la aprobación del COO en la reunión de dirección",
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
        "title": "Análisis estructural de problemas QCD de la organización de desarrollo",
        "summary": "Se investigaron las causas de la caída en velocidad de desarrollo y calidad, organizando los problemas técnicos y organizacionales. Se profundizó en los problemas estructurales de la organización de ingeniería, incluyendo gestión de código, sistema de revisión, procedimientos de lanzamiento y estructura de dependencia de personas.",
        "difficulty": "high",
        "technologies": [
          "SonarQube",
          "Cursor",
          "NotebookLM"
        ],
        "highlights": [
          "Se estructuraron 100 hipótesis con MECE e Issue Tree, y se extrajeron 8 problemas principales con scoring de 5 ejes. Los problemas de política organizacional también se describieron de forma neutral como problemas de sistema"
        ],
        "decisions": [
          {
            "title": "Enfoque de estructuración de 100 hipótesis con MECE e Issue Tree",
            "detail": "Se combinaron los métodos MECE (Mutually Exclusive, Collectively Exhaustive) e Issue Tree, enumerando y evaluando exhaustivamente 100 hipótesis con scoring cuantitativo de 5 ejes (contribución a la velocidad de lanzamiento, contribución a la tasa de bugs, facilidad de ejecución, facilidad de medición, lead time)"
          },
          {
            "title": "Ordenamiento por importancia de 8 problemas principales y mapeo de estructura organizacional",
            "detail": "Tomando como criterio la contribución al problema más importante 'caída en el delivery de la aplicación existente', se profundizaron los 3 problemas directamente vinculados a los implementadores, y los 5 restantes se organizaron por stakeholder. Se reordenaron los 8 problemas por importancia"
          }
        ],
        "outcomes": [
          {
            "before": "Los problemas eran fragmentarios y sin visión de conjunto. Los resultados de entrevistas eran subjetivos e imposibilitaban la priorización",
            "after": "Se estructuraron 100 hipótesis con MECE e Issue Tree, y se extrajeron 8 problemas principales con scoring de 5 ejes. Se construyó un mapa de problemas utilizable por la dirección para la toma de decisiones",
            "metric": "Estructuración completa de 100 hipótesis a 8 problemas principales. Evaluación cuantitativa lograda con scores de hipótesis top desde 4.35 (máximo) hasta 1.9 (mínimo)"
          }
        ],
        "challenges": [
          {
            "title": "Estructuración de problemas con escasez de datos cuantitativos",
            "resolution": "Se adoptó un método que no depende de datos cuantitativos, estructurando hipótesis con MECE e Issue Tree y evaluándolas relativamente con scoring de 5 ejes. Se construyó un framework original para convertir el contenido de las entrevistas en 'peso del problema'"
          },
          {
            "title": "Descripción neutral de problemas de política organizacional",
            "resolution": "Sin mencionar nombres individuales, se describieron como problemas sistémicos tales como 'estructura de toma de decisiones' e 'ambigüedad en la autoridad de aprobación', y las soluciones se propusieron como diseño institucional en lugar de crítica personal"
          }
        ]
      },
      {
        "title": "Construcción de framework de evaluación de medidas de mejora QCD y matriz de prioridad de ejecución",
        "summary": "Investigación y organización de medidas de mejora centradas en los ejes de calidad, costo y plazo. Se realizó evaluación cuantitativa de 'impacto x factibilidad' por medida. Se implementaron matrices ponderadas y gráficos de prioridad en la documentación, y se presentó un plan de ejecución gradual con diagrama de Gantt y diagrama de delimitación de responsabilidades.",
        "difficulty": "high",
        "technologies": [
          "ChatGPT",
          "Gamma",
          "Mermaid"
        ],
        "highlights": [
          "Se diseñó una función de scoring ponderado de 5 ejes, y se generó automáticamente un roadmap de 6 fases x 3 semanas con la función RANK.EQ"
        ],
        "decisions": [
          {
            "title": "Objetivación de la prioridad de medidas mediante scoring ponderado de 5 ejes",
            "detail": "Se diseñó una función de scoring con ponderación en 5 ejes: contribución a Q (0.1), contribución a C (0.1), contribución a D (0.4), costo monetario (0.1) y esfuerzo requerido (0.3). La distribución de pesos enfatiza la contribución a D (plazo) y el esfuerzo requerido"
          },
          {
            "title": "Diseño de roadmap de despliegue gradual de 6 fases x 3 semanas",
            "detail": "Se mapearon automáticamente los rankings de score a números de fase con la función RANK.EQ, generando automáticamente un diagrama de Gantt de 6 fases x 3 semanas. Se ubicaron 4-5 medidas en cada fase, desplegándose gradualmente usando los resultados de la fase anterior como precondición de la siguiente"
          }
        ],
        "outcomes": [
          {
            "before": "La prioridad de 27 medidas era incierta, y la toma de decisiones de la dirección se retrasaba",
            "after": "Con el scoring ponderado de 5 ejes + roadmap de 6 fases, se construyó un plan de ejecución con seguimiento mensual del progreso",
            "metric": "La prioridad del Top 5 de medidas fue aprobada en una sola reunión de dirección. Objetivo provisional de 30% de mejora en velocidad de lanzamiento y 30% de reducción en tasa de bugs en 4 meses"
          }
        ],
        "challenges": [
          {
            "title": "Construcción de framework de evaluación objetiva de prioridad de medidas",
            "resolution": "Se implementó el scoring ponderado de 5 ejes en Excel, y se acordó previamente con el COO la justificación de la ponderación, asegurando la objetividad y transparencia de los resultados del scoring"
          }
        ]
      },
      {
        "title": "Diseño y creación de documentación de diapositivas para presentación en reunión de dirección",
        "summary": "Para facilitar la formación de consenso con directivos no técnicos, se utilizaron ampliamente diagramas de flujo, diagramas de secuencia y gráficos de ramificación de decisiones con notación Mermaid. Aprovechando la base RAG de NotebookLM, se lideró la creación de documentación de apoyo a la toma de decisiones ejecutiva.",
        "difficulty": "medium",
        "technologies": [
          "NotebookLM",
          "Gemini",
          "Genspark",
          "Mermaid"
        ],
        "highlights": [
          "Se lideró la creación de documentación de propuesta ejecutiva de 2 partes (23+10 diapositivas). Se redefinieron los problemas técnicos como impactos QCD y se explicaron mediante cadenas de causalidad"
        ],
        "decisions": [
          {
            "title": "Diseño de documentación de propuesta ejecutiva en 2 partes (optimización de recursos humanos + rediseño de base de tickets)",
            "detail": "Se diseñó la documentación en 2 partes: 'Propuesta de optimización de recursos humanos en la organización de desarrollo del negocio de traducción con IA' (23 diapositivas, visión general) y 'Mejora QCD mediante rediseño de la base de gestión de tickets' (10 diapositivas, profundización)"
          },
          {
            "title": "Propuesta de plataforma unificada Jira y soporte a la decisión mediante comparación de herramientas",
            "detail": "Se creó una tabla comparativa de 4 opciones (Notion, Planio, Notion+Planio combinado, Jira) en 5 ejes: 'flexibilidad de estructura de tickets', 'colaboración interdepartamental', 'UI/UX', 'diseño de workflow' y 'integración con otras herramientas', recomendando Jira + Jira Service Management"
          }
        ],
        "outcomes": [
          {
            "before": "No existían medios para explicar los problemas técnicos a la dirección, dificultando la aprobación de inversión en mejoras",
            "after": "Se visualizó el panorama general de mejoras QCD y las medidas concretas con documentación de propuesta ejecutiva de 2 partes (23 + 10 diapositivas). Se apoyó la toma de decisiones con tablas comparativas de herramientas y gráficos RACI",
            "metric": "El COO aprobó la ejecución del PoC. Se decidió el inicio de la verificación de unificación de gestión de tickets e introducción de Jira"
          }
        ],
        "challenges": [
          {
            "title": "Explicación de problemas técnicos a directivos no técnicos",
            "resolution": "Se redefinieron los problemas técnicos como impactos en QCD (Calidad, Costo, Plazo), explicándolos mediante cadenas de causalidad como 'escape de bugs → horas de retrabajo → aumento de costos'. Se establecieron valores objetivo de KPI (reducción de 40% en tasa de bugs, reducción de 25% en lead time) para cuantificar los efectos de mejora"
          }
        ]
      }
    ]
  },
  {
    "id": "factory-maintenance-app-2024",
    "company": "Startup de aplicaciones empresariales para manufactura",
    "companyDesc": "Startup SaaS que apoya las operaciones de mantenimiento de equipos de fábrica en la industria manufacturera. Se encargó del desarrollo full-stack de la aplicación de mantenimiento de equipos de fábrica.",
    "role": "Ingeniero Full-Stack",
    "roles": ["Frontend", "Backend", "Infra"],
    "period": "2024-10 — 2025-03",
    "teamSize": 4,
    "summary": "SaaS multiinquilino para gestión de mantenimiento e inspección de equipos en manufactura. Se asumió la responsabilidad integral del backend con NestJS + GraphQL + PostgreSQL y del frontend con React + Apollo Client. Se diseñaron e implementaron funciones centrales como tareas recurrentes conforme a RFC5545, control de acceso de 3 ejes RBAC+ReBAC, UI de tareas estilo Google Calendar y guardado incremental por campo",
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
        "title": "Diseño e implementación de función de tareas recurrentes conforme a RFC5545",
        "summary": "Se cubrieron recurrencias anuales, mensuales (n-ésima semana n-ésimo día / día n), semanales (múltiples días de la semana) y diarias, incluyendo actualización masiva, omisión y condiciones de finalización. Se diseñó el esquema, API y batch que separa instancias materializadas de virtuales mientras permite su visualización integrada en la misma pantalla. Se adoptó la arquitectura de materialización batch del día anterior con Redis+SQS+EventBridge.",
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
          "Se analizó la especificación RFC5545 y se diseñó la arquitectura de expansión de reglas de recurrencia, manejo de excepciones y materialización batch. Se crearon documentos de especificación y retrospectiva de diseño, registrando sistemáticamente las intenciones de diseño y alternativas",
          "Se implementó el SQL/API de merge de instancias materializadas y virtuales mediante generate_series + UNION ALL + DISTINCT ON"
        ],
        "decisions": [
          {
            "title": "Adopción de materialización batch del día anterior (EventBridge+SQS)",
            "detail": "Se adoptó la materialización batch del día anterior mediante EventBridge+SQS+NestJS SQS Consumer"
          },
          {
            "title": "Método de merge de instancias materializadas y virtuales con generate_series + UNION ALL",
            "detail": "Se expandieron fechas con generate_series de PostgreSQL, restaurando más de 20 columnas desde la definición JSON de la plantilla, para luego deduplicar con DISTINCT ON después del UNION ALL con los registros de instancias materializadas"
          },
          {
            "title": "Integración de 3 modelos temporales en un modelo único",
            "detail": "Se adoptó un diseño que integra los 3 modelos temporales (solo fecha, con hora, rango de período) en un único modelo, priorizando la compatibilidad con el sistema existente. Se documentó un diseño de extensión con el concepto de timeModel en la plantilla, previendo la futura separación"
          }
        ],
        "outcomes": [
          {
            "before": "La función de tareas recurrentes no estaba implementada, y las inspecciones periódicas diarias/semanales se creaban manualmente",
            "after": "Se lanzó la función de reglas de recurrencia conforme a RFC5545, permitiendo la generación automática de tareas recurrentes diarias, semanales y mensuales",
            "metric": "Reducción del esfuerzo de creación manual de inspecciones periódicas"
          },
          {
            "before": "Las discusiones de diseño de recurrencia no convergían, y las especificaciones de diseño estaban dispersas",
            "after": "Se crearon documentos de especificación y retrospectiva, sistematizando los problemas de la implementación actual y el diseño ideal. Se definió un roadmap de mejora de 6 fases",
            "metric": "Acumulación organizacional de conocimiento de diseño y clarificación del roadmap de mejora"
          }
        ],
        "challenges": [
          {
            "title": "Diseño de reglas de recurrencia integrando 3 modelos temporales en un modelo único",
            "resolution": "Se comenzó con la implementación mínima de solo fecha (sin soporte de hora), documentando el diseño ideal con el concepto de timeModel en la plantilla como especificación. Se clarificó la ruta de migración hacia la futura separación de los 3 modelos"
          },
          {
            "title": "SQL de más de 300 líneas para restauración completa de campos desde definición JSONB de plantilla",
            "resolution": "Se construyeron cadenas CTE de forma gradual, separando claramente las responsabilidades de cada CTE en las etapas: expansión de reglas de recurrencia, generación de fechas, generación de tareas virtuales, merge con tareas materializadas y deduplicación. Se mantuvo una estructura mantenible mientras se describió en detalle el diseño ideal, como la migración al método de referencia de plantilla, en el documento de retrospectiva"
          },
          {
            "title": "Materialización batch forzada por restricciones de la API de pivote del dashboard",
            "resolution": "Se construyó una cadena CTE que convierte las tareas virtuales dentro del SQL a la misma estructura de columnas que los registros de instancias materializadas. En el documento de retrospectiva se analizó en detalle la alternativa de agregación en dos etapas + merge en capa de aplicación utilizando la asociatividad de COUNT/SUM (con demostración matemática)"
          }
        ]
      },
      {
        "title": "Diseño, consenso y implementación de control de acceso de 3 ejes: Alcance x Recurso x Acción",
        "summary": "Se definieron los permisos en 3 ejes: alcance (sede/fábrica, etc.) x recurso x acción. Se compararon 2 propuestas (configuración individual vs. asignación por roles) y se obtuvo consenso mediante facilitación. Se cogestión la autorización de API y el control de visualización de UI con CASL Ability para mantener la coherencia.",
        "difficulty": "high",
        "technologies": [
          "TypeScript",
          "React",
          "NestJS",
          "GraphQL",
          "CASL"
        ],
        "highlights": [
          "Se diseñó un modelo ACL híbrido RBAC+ReBAC, verificando exhaustivamente más de 30 casos de uso. Se registraron detalladamente en documentos de diseño las justificaciones de decisión y las alternativas",
          "Se compararon 2 propuestas (configuración individual y asignación por roles) y se facilitó el consenso de diseño con el equipo"
        ],
        "decisions": [
          {
            "title": "Adopción del modelo ACL híbrido RBAC+ReBAC",
            "detail": "Se adoptó un modelo híbrido RBAC+ReBAC en la capa de BD (extensible a ABAC en el futuro), con un diseño de publicación gradual en 3 fases en la capa UI"
          },
          {
            "title": "Evaluación de permisos con Deny-by-default + método de plantillas",
            "detail": "Denegación por defecto; si existe al menos un deny explícito, se deniega; de lo contrario, si existe un allow, se permite; si no hay ninguno, se deniega: evaluación en 3 niveles"
          },
          {
            "title": "Opcionalización de herencia jerárquica mediante scopeType+inheritChildren",
            "detail": "Se añadió un flag de herencia a la asignación de roles por alcance, permitiendo seleccionar activar/desactivar la herencia al momento de asignar roles"
          }
        ],
        "outcomes": [
          {
            "before": "El control de acceso no estaba implementado y todos los usuarios podían acceder a todos los datos",
            "after": "Se diseñó y consensuó un sistema ACL RBAC+ReBAC con jerarquía de alcance de 3 niveles (organización > sede > proyecto) y 5 tipos de plantillas definidas por el sistema",
            "metric": "Completitud del diseño del modelo ACL y formación de consenso en el equipo"
          },
          {
            "before": "Los requisitos de ACL estaban dispersos y no se podían verificar exhaustivamente los más de 30 casos de uso",
            "after": "Se crearon documentos de diseño y tabla de verificación de casos de uso. Se confirmó la cobertura de 12 casos de uso (empleado en múltiples fábricas, ingeniero externo, auditor, etc.)",
            "metric": "Verificación exhaustiva de requisitos y documentación del diseño"
          }
        ],
        "challenges": [
          {
            "title": "Equilibrio en el diseño de jerarquía de permisos para SaaS multiinquilino",
            "resolution": "Se logró equilibrar la flexibilidad y la facilidad de gestión con la opcionalización de herencia mediante flag y la estructura de 2 capas de plantilla de roles + sobrescritura individual de permisos. Se documentaron más de 30 casos de uso, verificando que cada patrón está cubierto"
          }
        ]
      },
      {
        "title": "Optimización de renderizado de la pantalla principal (reducción de más del 70% en tiempo de renderizado)",
        "summary": "Se minimizó la carga de re-renderizado causada por la interacción entre filtros, listado y detalle mediante la reestructuración del estado. Se limitó la refactorización a las áreas con alto costo de renderizado y gran impacto en la UX, dentro del tiempo disponible.",
        "difficulty": "high",
        "technologies": [
          "TypeScript",
          "React",
          "Apollo Client"
        ],
        "highlights": [
          "Se analizaron los re-renderizados con React DevTools Profiler, aplicando selectivamente React.memo/useMemo/useCallback para lograr una reducción de más del 70% en el tiempo de renderizado"
        ],
        "decisions": [
          {
            "title": "Eliminación de re-renderizados innecesarios con React.memo + useMemo",
            "detail": "Se visualizaron los re-renderizados del árbol de componentes con el Profiler de React DevTools, eliminando los re-renderizados innecesarios con React.memo, useMemo y useCallback. Se logró una reducción de más del 70% en el tiempo de renderizado"
          }
        ],
        "outcomes": [
          {
            "before": "El tiempo de renderizado era lento con impacto negativo en la UX",
            "after": "Reducción de más del 70% en el tiempo de renderizado",
            "metric": "Tasa de reducción del tiempo de renderizado"
          }
        ],
        "challenges": [
          {
            "title": "Memoización masiva de todos los componentes vs. optimización selectiva guiada por Profiler",
            "resolution": "Se utilizó React DevTools Profiler para verificar visualmente los re-renderizados del árbol de componentes. Se identificaron solo los componentes realmente lentos, aplicando selectivamente React.memo/useMemo/useCallback. Se logró una reducción de más del 70% en el tiempo de renderizado mientras se minimizaba el esfuerzo"
          }
        ]
      },
      {
        "title": "Implementación de UI de visualización de tareas estilo Google Calendar",
        "summary": "Se implementó una vista de calendario compatible con vista semanal, mensual y de 3 días. Se logró la visualización con bordes redondeados, área de visualización variable y compatibilidad con programador utilizando CSS Grid/Subgrid.",
        "difficulty": "medium",
        "technologies": [
          "TypeScript",
          "React",
          "CSS"
        ],
        "highlights": [
          "Se desarrolló un algoritmo de packing personalizado (mapeo de ocupación de filas y colocación desde arriba) y se definió un diseño de actualización reactiva con Apollo Client SSoT",
          "Se implementaron desde cero vista variable de 3/4/7 días, cambio de fecha con D&D, bordes redondeados entre semanas y adaptación móvil con CSS scroll snap"
        ],
        "decisions": [
          {
            "title": "Decisión de implementar la UI de calendario desde cero",
            "detail": "Sin depender de bibliotecas, se construyó la UI de calendario desde cero con React+CSS. Se diseñó para recibir el número variable de días de la vista (3 días/4 días/semanal, etc.) como parámetro externo, asegurando que el layout no se rompa con cualquier ancho de días"
          },
          {
            "title": "Cambio de fecha mediante Drag & Drop e integración con guardado incremental usando Apollo Client como SSoT",
            "detail": "Se diseñó la caché de Apollo Client como la única fuente de verdad (SSoT). Se construyó un mecanismo donde tanto el cambio de fecha por D&D como el guardado incremental en el modal de edición actualizan la caché de Apollo, provocando el re-renderizado reactivo del calendario"
          },
          {
            "title": "UI de calendario responsiva y optimización móvil con CSS scroll snap",
            "detail": "En móvil, se adoptó un diseño que cambia a una UI significativamente diferente de la versión de escritorio, mostrando la lista de tareas con deslizamiento al tocar una fecha. Se aplicó CSS scroll snap para que el scroll siempre se ajuste a la unidad de fecha, evitando detenerse en posiciones intermedias"
          }
        ],
        "outcomes": [
          {
            "before": "No existía una UI de calendario, y los planes de trabajo solo se mostraban en formato de lista con baja visibilidad",
            "after": "Se implementó desde cero una UI de calendario personalizada con la misma sensación de operación que Google Calendar. Se logró el cambio dinámico entre vistas de 3 días/4 días/semanal y la visualización con bordes redondeados de eventos que cruzan semanas",
            "metric": "Se proporcionó una UI que permite a los usuarios comprender y gestionar intuitivamente los planes de trabajo. La implementación desde cero permite una respuesta flexible a cambios de requisitos"
          },
          {
            "before": "La gestión de fechas de ejecución de tareas solo estaba disponible en formato de tabla de listado, dificultando la comprensión visual del cronograma completo",
            "after": "Se construyó desde cero una UI estilo Google Calendar. Se logró la visualización compacta de tareas de un día y múltiples días, cambio de fecha por D&D, actualización en tiempo real con Apollo Client SSoT, adaptación responsiva (incluyendo scroll snap), y cambio entre vistas variables de 3/4/7 días",
            "metric": "Completitud de la UI de calendario y usabilidad"
          }
        ],
        "challenges": [
          {
            "title": "Expresión de UI con bordes redondeados para eventos que cruzan semanas",
            "resolution": "Se dividieron los eventos en segmentos por semana, aplicando dinámicamente clases de border-radius según la posición de cada segmento (inicio/medio/fin). El segmento inicial tiene bordes redondeados a la izquierda, el final a la derecha, y los intermedios sin bordes redondeados"
          },
          {
            "title": "Layout responsivo para vista de número variable de días",
            "resolution": "Se recibe el parámetro de número de días como props del componente, calculando dinámicamente el ancho de columna en unidades fr de CSS Grid. La colocación de eventos también se cambió a una lógica que calcula dinámicamente la posición de grid-column desde startDate/endDate"
          },
          {
            "title": "Algoritmo de packing para tareas de múltiples y un solo día (empaquetado compacto hacia arriba sin espacios)",
            "resolution": "Se desarrolló un algoritmo de packing personalizado que gestiona el estado de ocupación por fila. Se mapean primero las filas ocupadas por tareas de múltiples días, y las tareas de un solo día se colocan en la fila más alta disponible. Esto logró un layout compacto similar al de Google Calendar"
          }
        ]
      },
      {
        "title": "Implementación de validación por tipo para estructura de formulario dinámico",
        "summary": "Se implementó validación por tipo (cadena/número/fecha, etc.) con RHF+Zod para campos que se pueden agregar y eliminar en la plantilla. Se logró la separación de procesamiento y la reutilización entre el modal de creación y la pantalla de edición. Se soportó el control de activación, control de visualización de opciones y validación cruzada.",
        "difficulty": "high",
        "technologies": [
          "TypeScript",
          "React Hook Form",
          "Zod"
        ],
        "highlights": [
          "Se implementó validación por tipo (cadena/número/fecha, etc.) con RHF+Zod para campos que se pueden agregar y eliminar en la plantilla. Se logró la separación de procesamiento y la reutilización entre el modal de creación y la pantalla de edición. Se soportó el control de activación, control de visualización de opciones y validación cruzada."
        ]
      },
      {
        "title": "Implementación de función de guardado incremental por diferencias al perder el foco",
        "summary": "Para prevenir la pérdida de datos, se implementó el guardado incremental que solo envía las diferencias al perder el foco del campo. Se realizaron pruebas de reenvío en conexiones inestables utilizando throttling de DevTools.",
        "difficulty": "medium",
        "technologies": [
          "TypeScript",
          "React",
          "GraphQL"
        ],
        "highlights": [
          "Se diseñó la arquitectura de guardado incremental por campo con onBlur + Command Pattern, y se implementó un mecanismo de reenvío de comandos fallidos"
        ],
        "decisions": [
          {
            "title": "Adopción de guardado incremental por campo con onBlur (descarte del guardado de formulario completo)",
            "detail": "Se adoptó un método de guardado incremental donde cada campo tiene su propia instancia de react-hook-form, verifica diferencias con isEqual en el evento onBlur, y envía inmediatamente la mutación GraphQL"
          },
          {
            "title": "Encapsulación de cambios de campo mediante enfoque RPC que trata los comandos como datos",
            "detail": "Se adoptó un método RPC que estructura cada cambio de campo como datos de comando, asignando UUID como identificador y enviándolo al backend. Se definieron los conjuntos de campos de destino de cambio por tipo de recurso, diseñando las operaciones de cambio como datos serializables"
          }
        ],
        "outcomes": [
          {
            "before": "Con el método de guardado de formulario completo, existía riesgo de pérdida de datos de entrada en el entorno Wi-Fi de fábrica",
            "after": "Se implementó guardado incremental por campo con onBlur + Command Pattern + mecanismo de reenvío de comandos fallidos. Se diseñó un roadmap de mejora en 3 etapas (persistencia en localStorage, introducción de SW, offline completo)",
            "metric": "Reducción significativa del riesgo de pérdida de datos y planificación de mejoras futuras"
          }
        ],
        "challenges": [
          {
            "title": "Preservación de datos en entorno Wi-Fi inestable de fábrica",
            "resolution": "Se implementó guardado incremental por campo con onBlur + acumulación de comandos fallidos en useRef + mecanismo de reenvío con botón de guardar. En caso de error de red, se preservan los valores del formulario; en caso de error del cliente, se restablecen a los valores del servidor: manejo de errores en dos niveles"
          }
        ]
      },
      {
        "title": "Definición e introducción de estructura de directorios y convenciones de nomenclatura para componentes UI",
        "summary": "Para mejorar la reutilización de componentes estrechamente vinculados al dominio, se propuso y consensuó la estructura de directorios, convenciones de nomenclatura y reglas de composición de componentes. Se establecieron como convención común del equipo.",
        "difficulty": "medium",
        "technologies": [
          "TypeScript",
          "React"
        ],
        "highlights": [
          "Para mejorar la reutilización de componentes estrechamente vinculados al dominio, se propuso y consensuó la estructura de directorios, convenciones de nomenclatura y reglas de composición de componentes. Se establecieron como convención común del equipo."
        ]
      },
      {
        "title": "Visualización de todos los estados de UI con Storybook y preparación de base de internacionalización",
        "summary": "Se visualizaron todos los estados de UI con Storybook, facilitando la adaptación futura a variaciones de visualización. Se implementó la internacionalización de la UI de tarjetas (incluyendo propuestas de texto en inglés), preparando la base de adaptación internacional.",
        "difficulty": "medium",
        "technologies": [
          "TypeScript",
          "Storybook",
          "Playwright",
          "Vitest"
        ],
        "highlights": [
          "Se visualizaron todos los estados de UI con Storybook, facilitando la adaptación futura a variaciones de visualización. Se implementó la internacionalización de la UI de tarjetas (incluyendo propuestas de texto en inglés), preparando la base de adaptación internacional."
        ]
      }
    ]
  },
  {
    "id": "recruitment-saas-2022",
    "company": "Filial consolidada de empresa cotizada de consultoría y sistemas de RRHH",
    "companyDesc": "Filial consolidada de empresa cotizada dedicada a consultoría y desarrollo de sistemas de RRHH. Se encargó del desarrollo de un nuevo sistema multiinquilino de gestión de contratación.",
    "role": "Líder técnico de Frontend",
    "roles": ["Frontend", "Tech Lead", "Testing"],
    "period": "2022-10 — 2024-09",
    "teamSize": 10,
    "summary": "Se lideró durante 2 años el desarrollo frontend de un SaaS de gestión de contratación de nuevos graduados como líder técnico. Se desarrollaron B2B (panel de administración para RRHH) y B2C (pantalla de registro para candidatos) en estructura monorepo con pnpm. Se diseñaron e implementaron funciones centrales como el constructor de formularios dinámicos con patrón Specification, dashboard con soporte Suspense y pipeline VRT, impulsando la mejora de calidad y eficiencia de desarrollo del equipo de 10 personas",
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
        "title": "Gestión de equipo y control de calidad como líder técnico de Frontend",
        "summary": "Se lideró la asignación de tareas, actualización de story points, compartición de conocimiento, cultura de revisión de PR y elaboración de guías de implementación. Se introdujo la automatización de actualizaciones periódicas de bibliotecas con Renovate. Se organizaron reuniones de equipo promoviendo la compartición de tecnología, convenciones de código y especificaciones de pantallas.",
        "difficulty": "high",
        "technologies": [
          "TypeScript",
          "React",
          "GitHub Actions",
          "Renovate"
        ],
        "highlights": [
          "Se lideró de forma orquestada el levantamiento de especificaciones de toda la aplicación B2C, la formación de consenso con el equipo backend, la descomposición de tareas, la asignación de miembros y la asunción de la ruta crítica",
          "Se estableció el estándar de calidad del equipo mediante la definición de guías de revisión de código, construcción del entorno VRT y formación de becarios"
        ],
        "decisions": [
          {
            "title": "Formación de becarios y mejora de calidad del equipo mediante revisión de código",
            "detail": "Se realizaron activamente revisiones de código, proporcionando retroalimentación formativa a los miembros becarios. Se adoptó un enfoque OJT que transmite convenciones de codificación y patrones de diseño de forma práctica a través de las revisiones"
          },
          {
            "title": "Ventanilla única hacia el equipo backend y gestión tipo orquestador",
            "detail": "Una sola persona levantó las especificaciones de toda la aplicación B2C en un período corto, realizando un alineamiento exhaustivo uno a uno con el líder del equipo backend. Después del consenso, se organizó una reunión de onboarding para los miembros del equipo B2C explicando todas las especificaciones. Se funcionó como ventanilla única que recopila las preguntas y dudas del equipo y las resuelve con el equipo backend"
          },
          {
            "title": "Descomposición de tareas, organización de dependencias y asignación basada en características de los miembros",
            "detail": "Se descompusieron las especificaciones detalladas en tareas, se clarificaron las dependencias y se plasmaron en tickets de Jira. Se asignaron los tickets según las fortalezas, debilidades, nivel de habilidad y preferencias de los miembros. Las áreas propensas a ser punto único de fallo (ruta crítica) en la dependencia de tareas se asumieron proactivamente"
          }
        ],
        "outcomes": [
          {
            "before": "Existía variabilidad en la calidad del frontend y se pasaban por alto regresiones CSS",
            "after": "Se construyó un entorno de regresión visual con Storybook+storycap+reg-suit, detectando automáticamente diferencias de UI por cada PR. También se definieron guías de revisión de código",
            "metric": "Establecimiento de un sistema de aseguramiento automático de calidad de UI"
          }
        ],
        "challenges": [
          {
            "title": "Balance entre deuda técnica y velocidad de desarrollo como líder técnico de FE",
            "resolution": "Se construyó un entorno de regresión visual con Storybook+storycap+reg-suit, garantizando automáticamente la calidad de UI. Se definieron guías de revisión de código, elevando el estándar de calidad de todo el equipo"
          },
          {
            "title": "Detallado de especificaciones de la aplicación B2C para candidatos en un plazo corto de 4 meses",
            "resolution": "Como líder técnico, se lideró desde el detallado de especificaciones. Se organizó el flujo de usuario de los candidatos, definiendo sistemáticamente las condiciones de transición, contenido de visualización y reglas de validación para cada estado. Las especificaciones se confirmaron de forma ágil en paralelo con la implementación"
          },
          {
            "title": "Identificación de casos extremos en especificaciones de formularios dinámicos y formación de consenso con el backend",
            "resolution": "Para el caso de 0 opciones, se decidió que el soporte al cliente interviene en la configuración del formulario del lado B2B, sin mostrar alertas en la aplicación B2C. De esta manera, se obtuvo consenso individual con el líder del equipo backend para cada caso extremo, documentando las decisiones y compartiéndolas con el equipo"
          }
        ]
      },
      {
        "title": "Definición de especificaciones e implementación del flujo de registro de candidatos",
        "summary": "Detallado de especificaciones e implementación FE del flujo de registro, postulación a ofertas y entrada a etapas de selección. Se completó el desarrollo de funcionalidades dentro del período de 4 meses, obteniendo alta valoración del cliente.",
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
          "Se definió un diseño que unifica 4 flujos de formulario con una base común DynamicForm, implementando validación multipágina y control de transición"
        ],
        "decisions": [
          {
            "title": "Implementación de 4 flujos de formulario B2C con base común DynamicForm",
            "detail": "Se adoptó un diseño que comparte la clase de definición de especificaciones del formulario como núcleo, junto con hooks useForm comunes, grupos de componentes de entrada y sistema de validación, definiendo individualmente solo la estructura de páginas, destinos de envío y parámetros específicos de cada flujo"
          },
          {
            "title": "Validación por página y control de transición en formularios multipágina",
            "detail": "Se gestionó la conversión entre el índice de página de la URL (base 1) y el índice del array (base 0), administrando el estado de validación por página con useFormState. Se ejecuta trigger() con alcance de página, bloqueando la transición a páginas no validadas"
          }
        ],
        "outcomes": [
          {
            "before": "Restricción de un período de desarrollo de 4 meses",
            "after": "Se completó el desarrollo de todas las funcionalidades dentro del plazo, obteniendo alta valoración del cliente",
            "metric": "Tasa de completitud del desarrollo y satisfacción del cliente"
          },
          {
            "before": "No existía un formulario de registro para candidatos, y el lado B2C del SaaS de gestión de contratación no estaba preparado",
            "after": "Se implementaron 4 flujos de formulario (registro nuevo, pre-entrada, actualización de perfil, tareas de Mi Página) con la base común DynamicForm. Se logró 24 tipos de componentes de entrada, más de 50 reglas de validación y transición multipágina",
            "metric": "Completitud de la base de formularios B2C para candidatos"
          }
        ],
        "challenges": [
          {
            "title": "Gestión de transiciones de estado complejas en el flujo de registro de candidatos",
            "resolution": "Se crearon diagramas detallados de transición de estados en la etapa de definición de especificaciones, visualizando todos los patrones. Se implementó un diseño que previene transiciones inválidas a nivel de tipos. Se completaron todas las funcionalidades dentro del período de 4 meses"
          },
          {
            "title": "Mapeo a nivel de campo de errores de validación del lado del servidor",
            "resolution": "Se determinaron los errores de validación GraphQL dentro de useEffect, configurando por separado errores de banner de pantalla completa y errores a nivel de campo. Se unificó el manejo de errores con un hook useForm personalizado"
          }
        ]
      },
      {
        "title": "Diseño e implementación del constructor de formularios dinámicos para RRHH (adopción del patrón Specification)",
        "summary": "Se implementó un constructor de formularios que permite a RRHH configurar páginas, encabezados, campos de entrada, validaciones, relaciones padre-hijo, etc. Se resolvió el problema de estado de las clases con el patrón Specification, manteniendo la coherencia con RHF. Se logró un diseño que equilibra la cohesión y la extensibilidad.",
        "difficulty": "extreme",
        "technologies": [
          "TypeScript",
          "React",
          "React Hook Form",
          "Apollo Client"
        ],
        "highlights": [
          "Se diseñó e implementó una base de validación cruzada con patrón Specification x más de 50 métodos personalizados de Yup. Se construyó un motor de generación de formularios de 3 capas",
          "Se implementó un filtrado reactivo de opciones con vinculación padre-hijo + useWatch + limpieza automática de valores seleccionados"
        ],
        "decisions": [
          {
            "title": "Diseño de validación de formularios dinámicos con patrón Specification",
            "detail": "Se adoptó el patrón Specification (patrón de diseño dirigido por dominio), implementando un diseño donde las expresiones condicionales son componibles como objetos"
          },
          {
            "title": "Base de validación cruzada con patrón Specification x métodos personalizados de Yup",
            "detail": "Se añadieron más de 50 métodos personalizados al esquema Yup, aplicándolos en bloque a todos los tipos de esquema. Se describieron declarativamente los campos dependientes con metadatos, construyendo automáticamente el grafo de dependencias"
          },
          {
            "title": "Separación de la validación en paquete compartido con estructura monorepo pnpm",
            "detail": "Se adoptó una estructura de 3 paquetes (B2B, B2C, común) con pnpm workspace. Se ubicó la base de validación en el paquete común, utilizándose desde B2B/B2C mediante re-exportación. Se gestionaron centralizadamente las definiciones de enum derivadas de GraphQL con un registro de tipos enumerados"
          },
          {
            "title": "Filtrado reactivo de opciones sin recarga mediante vinculación de campos padre-hijo",
            "detail": "Se monitoreó reactivamente el cambio de valor del campo padre con useWatch() en el componente de vinculación padre-hijo. Se pasó la función de filtro al componente hijo, filtrando opciones con useMemo. Un reseteador de valores seleccionados limpia automáticamente los valores invalidados"
          }
        ],
        "outcomes": [
          {
            "before": "Las definiciones de condiciones de formularios de postulación estaban codificadas, requiriendo modificación de código para cada cambio de condición",
            "after": "Se implementó una definición declarativa de condiciones con el patrón Specification, permitiendo al personal de RRHH configurar condiciones de formulario sin código",
            "metric": "Autoservicio para cambios en condiciones de formulario"
          },
          {
            "before": "Los campos del formulario estaban codificados, requiriendo implementación por parte de ingenieros para cada adición o cambio de campo",
            "after": "El motor de generación de formularios dinámicos permite al personal de RRHH configurar libremente los campos. Se logró una base de formularios dinámicos con más de 50 reglas de validación, 24 tipos de componentes de entrada, validación cruzada entre campos y filtrado reactivo de opciones. Se proporciona a B2B/B2C a través del paquete común",
            "metric": "Flexibilidad y calidad de la base de formularios dinámicos"
          }
        ],
        "challenges": [
          {
            "title": "Explosión combinatoria de expresiones condicionales en formularios dinámicos para RRHH",
            "resolution": "Se adoptó el patrón Specification (originado en DDD), diseñando las expresiones condicionales como objetos de primera clase componibles con AND/OR/NOT. Se implementó una definición de condiciones declarativa similar a JSON Schema"
          },
          {
            "title": "Control de sincronización entre validación cruzada de campos de formulario y UI reactiva",
            "resolution": "El componente de reseteo de valores seleccionados detecta cambios en las opciones y limpia inmediatamente los valores inválidos. Se construye automáticamente el grafo de dependencias de campos, activando automáticamente la revalidación de campos dependientes con la opción deps de React Hook Form. También se manejan las dependencias de formularios dinámicos con coincidencia de comodines en índices de array"
          },
          {
            "title": "Diseño del motor de generación de formularios dinámicos dirigido por esquema",
            "resolution": "Se diseñaron clases de definición de especificaciones en 3 capas: formulario completo, página y campo. Cada capa construye dinámicamente esquemas de validación, generando automáticamente esquemas por página. Se aseguró la seguridad de tipos de los valores del formulario con parámetros de tipo TypeScript"
          }
        ]
      },
      {
        "title": "Detallado de especificaciones e implementación con soporte Suspense del dashboard para RRHH",
        "summary": "Detallado de especificaciones e implementación del dashboard de la pantalla principal. Se aplicó soporte Suspense a todo el dashboard y 3 tipos de paneles. Se identificaron las causas de renderizado con React Profiler, mejorando tanto el rendimiento real como el tiempo de espera percibido.",
        "difficulty": "high",
        "technologies": [
          "TypeScript",
          "React",
          "Apollo Client",
          "TanStack Query"
        ],
        "highlights": [
          "Se diseñó e implementó la arquitectura de fetching de datos independiente por widget (Suspense+ErrorBoundary) y un algoritmo de grilla Masonry personalizado"
        ],
        "decisions": [
          {
            "title": "Adopción de arquitectura de fetching de datos independiente por widget",
            "detail": "Se adoptó una arquitectura donde cada widget realiza su fetching de datos de forma independiente. Se utilizó useReadQuery de Apollo Client para completar la obtención de datos con soporte Suspense dentro del componente widget"
          },
          {
            "title": "Implementación desde cero de layout de grilla Masonry personalizado",
            "detail": "Se implementó un algoritmo de colocación de grilla personalizado. Se rastrea el índice de fila actual de las columnas izquierda y derecha, colocando los widgets en la columna más corta para lograr el efecto Masonry"
          },
          {
            "title": "Reordenamiento de widgets con Drag & Drop mediante dnd-kit v6",
            "detail": "Se adoptó @dnd-kit/core v6.1.0 + @dnd-kit/sortable v8.0.0. Se gestiona la lista con SortableContext y se controla el estado D&D de cada widget con el hook useSortable. Se implementó la vista previa durante el arrastre con DragOverlay"
          }
        ],
        "outcomes": [
          {
            "before": "El fetching de datos del dashboard seguía un patrón waterfall, bloqueando toda operación hasta que todos los widgets completaran su carga. También existía el problema de espacios entre widgets en la disposición",
            "after": "Se logró fetching independiente + visualización skeleton con React Suspense + Apollo useReadQuery + Material UI Skeleton. Disposición sin espacios con grilla Masonry personalizada. Se implementó reordenamiento D&D con dnd-kit v6 y cambio entre 1/2 columnas",
            "metric": "Se mejoró la UX donde cada widget transiciona independientemente de carga a renderizado. Se logró una arquitectura desacoplada extensible a un futuro marketplace de terceros"
          }
        ],
        "challenges": [
          {
            "title": "Resolución del problema waterfall con fetching simultáneo de datos de 20 widgets",
            "resolution": "Se migró a fetching de datos con soporte Suspense usando useReadQuery de Apollo Client 3.10. Se envolvió cada widget con un límite React Suspense, configurando componentes Skeleton de Material UI como fallback. Se aplicó ErrorBoundary individualmente a cada widget, diseñando para que el fallo de una API no se propague a otros widgets"
          },
          {
            "title": "Implementación de layout de grilla personalizado en entornos sin soporte CSS Masonry",
            "resolution": "Se implementó un algoritmo de colocación personalizado. Se rastrea el índice de fila actual de las columnas izquierda y derecha, colocando cada widget en la columna más corta. Se logró una disposición tipo Masonry sin espacios calculando dinámicamente grid-row-start/grid-row-span sobre CSS Grid"
          }
        ]
      },
      {
        "title": "Preparación de funcionalidades transversales de pantalla: manejo de errores, caché y control de acceso",
        "summary": "Se implementaron manejo de errores, reset de caché, inyección de parámetros de encabezado en consultas, redirección, batching de consultas y corrección de validación auto-generada desde el esquema GraphQL.",
        "difficulty": "high",
        "technologies": [
          "TypeScript",
          "React",
          "Apollo Client",
          "GraphQL"
        ],
        "highlights": [
          "Se implementaron manejo de errores, reset de caché, inyección de parámetros de encabezado en consultas, redirección, batching de consultas y corrección de validación auto-generada desde el esquema GraphQL."
        ]
      },
      {
        "title": "Construcción de entorno de regresión visual con Storybook+storycap+reg-suit",
        "summary": "Se integraron Storybook, Stoycap y reg-suit en el CI de GitHub Actions para realizar pruebas de regresión visual de UI. También se preparó el entorno CI para pruebas E2E de regresión con Playwright.",
        "difficulty": "high",
        "technologies": [
          "Storybook",
          "GitHub Actions",
          "Playwright",
          "reg-suit",
          "storycap"
        ],
        "highlights": [
          "Se diseñó y construyó el pipeline VRT con Storybook+storycap+reg-suit+GitHub Actions+S3, estableciendo la cultura VRT en el equipo",
          "Se implementó captura paralela b2b/b2c con matrix strategy, comparación de diferencias con umbral de 0.1%, y publicación automática de comentarios en PR"
        ],
        "decisions": [
          {
            "title": "Diseño del pipeline VRT con Storybook v8 + storycap + reg-suit + S3",
            "detail": "Se construyó el entorno Storybook con @storybook/react-vite v8.1.5, captura automática de screenshots con storycap v5.0.0, comparación de diferencias a nivel de píxel con reg-suit (umbral 0.1%), publicación de resultados en AWS S3, y flujo de revisión de diferencias con notificación en PR de GitHub"
          },
          {
            "title": "Ejecución paralela de VRT para b2b/b2c con matrix strategy de GitHub Actions",
            "detail": "Se diseñó un pipeline de 2 etapas donde se capturan en paralelo b2b/b2c con storycap usando matrix strategy de GitHub Actions, se suben como artefactos, y en el job VRT posterior se integran para ejecutar reg-suit run"
          }
        ],
        "outcomes": [
          {
            "before": "Los cambios no intencionados en la UI (regresiones CSS) se descubrían después del lanzamiento",
            "after": "Se ejecuta automáticamente la comparación de screenshots por cada PR con storycap+reg-suit. Se logró detectar el 100% de las regresiones CSS antes del merge",
            "metric": "Tasa de detección de regresiones CSS"
          },
          {
            "before": "La verificación de calidad de cambios de UI era solo visual manual, descubriéndose bugs de regresión después del lanzamiento por descuidos",
            "after": "Se construyó el pipeline VRT con Storybook v8.1.5 + storycap + reg-suit + GitHub Actions + S3. Se comparan automáticamente screenshots de todos los componentes UI: 215 stories b2b y 49 páginas b2c por cada PR",
            "metric": "Detección automática de regresiones visuales con umbral de detección de diferencia de píxel de 0.1%. La revisión de imágenes de diferencia en comentarios de PR se estableció como práctica, reduciendo los bugs de regresión de UI posteriores al lanzamiento"
          }
        ],
        "challenges": [
          {
            "title": "Estabilización del timeout y espera de assets en storycap",
            "resolution": "Se configuró screenshot: { waitAssets: true } en los parámetros predeterminados de preview.tsx para esperar la carga completa de assets. Se configuraron serverTimeout de 60000ms y captureTimeout de 15000ms al ejecutar storycap. Se ajustó el delay individualmente por story para construir un entorno de captura estable"
          },
          {
            "title": "Establecimiento de la cultura VRT en el equipo",
            "resolution": "Se introdujo la visualización de imágenes de diferencia en comentarios de PR con reg-notify-github-plugin, estableciendo una regla de equipo para incluir las diferencias en la revisión. Se promovió el flujo de desarrollo de componentes en Storybook, construyendo un proceso de desarrollo donde la creación de stories se integra naturalmente como parte del VRT"
          }
        ]
      },
      {
        "title": "Migración de react-admin a Apollo Client/RHF/MUI e introducción de GraphQL Suspense",
        "summary": "Se propuso la migración de react-admin a Apollo Client, RHF y MUI para mejorar la eficiencia de desarrollo, liderando hasta la migración completa. Se verificó y desplegó la mejora de velocidad de visualización mediante la introducción de GraphQL Suspense y React Suspense.",
        "difficulty": "high",
        "technologies": [
          "React",
          "React Hook Form",
          "MUI",
          "Apollo Client",
          "GraphQL"
        ],
        "highlights": [
          "Se propuso la migración de react-admin a Apollo Client, RHF y MUI para mejorar la eficiencia de desarrollo, liderando hasta la migración completa. Se verificó y desplegó la mejora de velocidad de visualización mediante la introducción de GraphQL Suspense y React Suspense."
        ]
      },
      {
        "title": "Liderazgo del equipo de pruebas de humo",
        "summary": "Se asumió proactivamente el rol de driver como líder de la fase de pruebas. Se compartieron las especificaciones de pantallas y transiciones durante las sesiones de otros miembros. Se lideró la creación de tickets de defectos y la gestión del estado de las pruebas.",
        "difficulty": "medium",
        "technologies": [
          "Playwright"
        ],
        "highlights": [
          "Se asumió proactivamente el rol de driver como líder de la fase de pruebas. Se compartieron las especificaciones de pantallas y transiciones durante las sesiones de otros miembros. Se lideró la creación de tickets de defectos y la gestión del estado de las pruebas."
        ]
      }
    ]
  },
  {
    "id": "mobile-order-app-2022",
    "company": "Empresa de ventas de aplicación de pedidos móviles",
    "companyDesc": "Empresa que desarrolla y vende aplicaciones de pedidos móviles para restaurantes. Se encargó del desarrollo de LIFF, aplicaciones nativas y backend.",
    "role": "Ingeniero de Frontend LIFF / Aplicaciones nativas / Backend",
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
        "title": "Desarrollo frontend multiplataforma: Web/LIFF/aplicaciones nativas",
        "summary": "Se realizó desarrollo integral de Web (Next.js), aplicación LIFF y aplicaciones nativas (React Native/Expo). Se implementó lógica de dominio amplia incluyendo gestión de pedidos, integración con LINE de tienda, integración con POS, gestión de inventario y procesamiento de cierre.",
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
          "Se realizó desarrollo integral de Web (Next.js), aplicación LIFF y aplicaciones nativas (React Native/Expo). Se implementó lógica de dominio amplia incluyendo gestión de pedidos, integración con LINE de tienda, integración con POS, gestión de inventario y procesamiento de cierre."
        ]
      },
      {
        "title": "Internacionalización del pedido móvil (inglés y chino)",
        "summary": "Se investigaron UIs de aplicaciones en inglés y chino con la premisa de que los logos y textos se visualicen sin problemas independientemente del dispositivo del usuario y sean comprensibles de forma concisa. Se mejoró la UI discutiendo con diseñadores y PO mediante prototipos.",
        "difficulty": "medium",
        "technologies": [
          "TypeScript",
          "React",
          "LIFF"
        ],
        "highlights": [
          "Se investigaron UIs de aplicaciones en inglés y chino con la premisa de que los logos y textos se visualicen sin problemas independientemente del dispositivo del usuario y sean comprensibles de forma concisa. Se mejoró la UI discutiendo con diseñadores y PO mediante prototipos."
        ]
      },
      {
        "title": "Implementación del procesamiento de cierre provisional del sistema POS (con refactorización de cierre definitivo y pruebas unitarias)",
        "summary": "Se refactorizó el procesamiento compartido con el cierre definitivo, eliminando inconsistencias en la nomenclatura de variables. Se añadieron pruebas unitarias, logrando una implementación con baja deuda técnica.",
        "difficulty": "medium",
        "technologies": [
          "TypeScript",
          "NestJS",
          "GraphQL",
          "Jest"
        ],
        "highlights": [
          "Se refactorizó el procesamiento compartido con el cierre definitivo, eliminando inconsistencias en la nomenclatura de variables. Se añadieron pruebas unitarias, logrando una implementación con baja deuda técnica."
        ]
      },
      {
        "title": "Implementación de agregación de estado de pedidos por mesa, menú y tiempo en la pantalla de cocina",
        "summary": "Se implementaron funcionalidades y mejoras de UI para la pantalla de cocina. Se implementó la función de agregación del estado de pedidos por mesa, menú y franja horaria.",
        "difficulty": "medium",
        "technologies": [
          "TypeScript",
          "Hasura",
          "GraphQL",
          "React Native"
        ],
        "highlights": [
          "Se implementaron funcionalidades y mejoras de UI para la pantalla de cocina. Se implementó la función de agregación del estado de pedidos por mesa, menú y franja horaria."
        ]
      }
    ]
  },
  {
    "id": "board-management-app-2022",
    "company": "Empresa de servicio DX para juntas directivas",
    "companyDesc": "Empresa que provee un SaaS para digitalizar la gestión de juntas directivas. Se encargó del desarrollo FE y BE del servicio de gestión de juntas directivas.",
    "role": "Ingeniero Frontend / Backend",
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
        "title": "Implementación de componentes UI y organización de Storybook (adopción de Atomic Design)",
        "summary": "Para resolver el problema de baja descubribilidad y buscabilidad de componentes UI, se reorganizó el directorio de Storybook siguiendo Atomic Design. Se catalogaron todos los componentes UI en Storybook, mejorando la eficiencia de implementación de pantallas.",
        "difficulty": "medium",
        "technologies": [
          "TypeScript",
          "React",
          "Tailwind CSS",
          "Storybook"
        ],
        "highlights": [
          "Para resolver el problema de baja descubribilidad y buscabilidad de componentes UI, se reorganizó el directorio de Storybook siguiendo Atomic Design. Se catalogaron todos los componentes UI en Storybook, mejorando la eficiencia de implementación de pantallas."
        ]
      },
      {
        "title": "Implementación de pantallas de asistente de creación de documentos y resolución escrita, con pruebas E2E",
        "summary": "Implementación detallada de las pantallas de asistente de creación de documentos y resolución escrita. Se implementaron pruebas E2E con Playwright para asegurar la calidad.",
        "difficulty": "medium",
        "technologies": [
          "TypeScript",
          "React",
          "Playwright"
        ],
        "highlights": [
          "Implementación detallada de las pantallas de asistente de creación de documentos y resolución escrita. Se implementaron pruebas E2E con Playwright para asegurar la calidad."
        ]
      },
      {
        "title": "Implementación del backend de la función de programación de reuniones",
        "summary": "Implementación del backend de la función de programación de reuniones utilizando Node.js/Express/GraphQL/Prisma.",
        "difficulty": "medium",
        "technologies": [
          "Node.js",
          "Express",
          "Prisma",
          "GraphQL"
        ],
        "highlights": [
          "Implementación del backend de la función de programación de reuniones utilizando Node.js/Express/GraphQL/Prisma."
        ]
      }
    ]
  },
  {
    "id": "freelance-web-2021",
    "company": "Freelance",
    "companyDesc": "Se aceptaron múltiples proyectos de creación de sitios web SPA como freelance. 4 proyectos: empresa de creación de sitios, empresa de reclutamiento, empresa de análisis de datos y restaurante.",
    "role": "Ingeniero Frontend",
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
        "title": "Creación de sitios web SPA con React/Next.js (4 proyectos)",
        "summary": "Se crearon sitios web SPA para una empresa de creación de sitios, empresa de reclutamiento, empresa de análisis de datos y restaurante. Se encargó de la integración de aplicaciones frontend con CMS (WordPress/Contentful, etc.) y el hosting en Vercel/Netlify/S3.",
        "difficulty": "medium",
        "technologies": [
          "TypeScript",
          "JavaScript",
          "React",
          "Next.js",
          "Amazon S3"
        ],
        "highlights": [
          "Se crearon sitios web SPA para una empresa de creación de sitios, empresa de reclutamiento, empresa de análisis de datos y restaurante. Se encargó de la integración de aplicaciones frontend con CMS (WordPress/Contentful, etc.) y el hosting en Vercel/Netlify/S3."
        ]
      }
    ]
  },
  {
    "id": "bitkey-data-2020",
    "company": "Bitkey, Inc.",
    "companyDesc": "Startup de desarrollo de cerraduras inteligentes. Se encargó de la construcción del data lake y dashboards internos, y del desarrollo del sitio portal para residentes.",
    "role": "Ingeniero de Datos / Ingeniero Frontend",
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
        "title": "Definición y formulación de KPIs compartidos de toda la empresa",
        "summary": "Se organizaron los KPIs relacionados con gestión, productos, ventas, calidad y situación de uso, definiendo el conjunto de indicadores que toda la empresa debe compartir. Se lideró el diseño de indicadores para fomentar una cultura de colaboración transversal entre equipos.",
        "difficulty": "high",
        "technologies": [
          "Python",
          "SQL",
          "BigQuery"
        ],
        "highlights": [
          "Se organizaron los KPIs relacionados con gestión, productos, ventas, calidad y situación de uso, definiendo el conjunto de indicadores que toda la empresa debe compartir. Se lideró el diseño de indicadores para fomentar una cultura de colaboración transversal entre equipos."
        ]
      },
      {
        "title": "Construcción del pipeline de agregación de múltiples fuentes de datos a BigQuery",
        "summary": "Se implementaron procesos de ejecución periódica en AWS Lambda y Cloud Functions para agregar datos dispersos en Amazon Redshift, Amazon Aurora, Salesforce y Cloud Firestore hacia BigQuery. También se encargó de la automatización de transformación y agregación de datos semiestructurados.",
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
          "Se implementaron procesos de ejecución periódica en AWS Lambda y Cloud Functions para agregar datos dispersos en Amazon Redshift, Amazon Aurora, Salesforce y Cloud Firestore hacia BigQuery. También se encargó de la automatización de transformación y agregación de datos semiestructurados."
        ]
      },
      {
        "title": "Diseño, implementación y difusión interna de dashboards con Google Data Portal",
        "summary": "Se diseñaron e implementaron dashboards con Google Data Portal, visualizando permanentemente los indicadores de ventas, calidad y uso. Se estableció la cultura de uso de datos mediante la instalación de paneles en la entrada de la oficina, su ubicación en el portal de empleados y presentaciones en reuniones semanales.",
        "difficulty": "medium",
        "technologies": [
          "SQL",
          "BigQuery",
          "Google Data Portal"
        ],
        "highlights": [
          "Se diseñaron e implementaron dashboards con Google Data Portal, visualizando permanentemente los indicadores de ventas, calidad y uso. Se estableció la cultura de uso de datos mediante la instalación de paneles en la entrada de la oficina, su ubicación en el portal de empleados y presentaciones en reuniones semanales."
        ]
      },
      {
        "title": "Implementación de componentes UI del sitio portal para residentes",
        "summary": "Sitio portal para residentes de la nueva urbanización con cerraduras inteligentes, para compartir información entre residentes. Se implementaron componentes UI comunes para múltiples pantallas en colaboración con el diseñador de UI. Se creó un catálogo de UI con Storybook.",
        "difficulty": "medium",
        "technologies": [
          "TypeScript",
          "React",
          "MUI",
          "Storybook"
        ],
        "highlights": [
          "Sitio portal para residentes de la nueva urbanización con cerraduras inteligentes, para compartir información entre residentes. Se implementaron componentes UI comunes para múltiples pantallas en colaboración con el diseñador de UI. Se creó un catálogo de UI con Storybook."
        ]
      }
    ]
  },
  {
    "id": "simplex-banking-2019",
    "company": "Simplex Inc.",
    "companyDesc": "Empresa de integración de sistemas especializada en desarrollo de sistemas financieros. Se encargó del desarrollo, pruebas y mantenimiento del sistema de gestión de riesgos para un banco importante y de la aplicación de registro para una compañía de seguros.",
    "role": "Ingeniero Frontend / Tester / Responsable de mantenimiento y operación",
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
        "title": "Desarrollo de aplicación frontend Excel con integración a Java JSON API mediante VBA",
        "summary": "Se desarrolló una aplicación que se comunica con una Java JSON API mediante VBA para mostrar datos en Excel. Se implementó la funcionalidad de agregar columnas dinámicamente según los resultados de los datos JSON e insertar fórmulas de Excel en cada columna. Se priorizó la legibilidad en la nomenclatura.",
        "difficulty": "high",
        "technologies": [
          "Java",
          "VBA",
          "Bash"
        ],
        "highlights": [
          "Se desarrolló una aplicación que se comunica con una Java JSON API mediante VBA para mostrar datos en Excel. Se implementó la funcionalidad de agregar columnas dinámicamente según los resultados de los datos JSON e insertar fórmulas de Excel en cada columna. Se priorizó la legibilidad en la nomenclatura."
        ]
      },
      {
        "title": "Pruebas en cliente, operaciones de lanzamiento, mantenimiento y atención al cliente",
        "summary": "Se encargó de las pruebas en cliente y operaciones de lanzamiento mediante comandos shell y AWS. Se lideró la atención de consultas por correo del cliente, diseño básico de proyectos de mejora, creación de tickets de defectos y confirmación de respuestas en reuniones regulares.",
        "difficulty": "medium",
        "technologies": [
          "Java",
          "Bash"
        ],
        "highlights": [
          "Se encargó de las pruebas en cliente y operaciones de lanzamiento mediante comandos shell y AWS. Se lideró la atención de consultas por correo del cliente, diseño básico de proyectos de mejora, creación de tickets de defectos y confirmación de respuestas en reuniones regulares."
        ]
      },
      {
        "title": "Implementación del frontend Vue.js de la aplicación de registro para compañía de seguros",
        "summary": "Se detallaron las especificaciones de tooltips de ayuda y modales con el diseñador, implementándolas en todos los campos de entrada de todas las pantallas. Se implementó la UI de múltiples pantallas de entrada de usuario. Se encargó de la ejecución y gestión de pruebas de escenario de negocio y pruebas de sistema.",
        "difficulty": "medium",
        "technologies": [
          "TypeScript",
          "JavaScript",
          "Vue.js"
        ],
        "highlights": [
          "Se detallaron las especificaciones de tooltips de ayuda y modales con el diseñador, implementándolas en todos los campos de entrada de todas las pantallas. Se implementó la UI de múltiples pantallas de entrada de usuario. Se encargó de la ejecución y gestión de pruebas de escenario de negocio y pruebas de sistema."
        ]
      }
    ]
  },
  {
    "id": "graph-intern-2018",
    "company": "Graph, Inc.",
    "companyDesc": "Pasantía en empresa de análisis de datos y desarrollo de IA. Se encargó del desarrollo del motor de recomendación para e-commerce de moda, análisis de datos para fabricante de automóviles y desarrollo de chatbot.",
    "role": "Ingeniero de Datos / Pasante",
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
        "title": "Desarrollo de prototipo del motor de recomendación para e-commerce de moda (3 algoritmos)",
        "summary": "Se desarrolló un prototipo del motor de recomendación para las listas de recomendaciones mostradas en la pantalla principal, páginas de productos y pantalla del carrito. Se aplicó filtrado basado en contenido y filtrado colaborativo para nuevos clientes, clientes existentes y páginas de productos respectivamente, logrando un diseño que también considera la serendipia.",
        "difficulty": "high",
        "technologies": [
          "Python",
          "pandas",
          "NumPy",
          "SQL"
        ],
        "highlights": [
          "Se desarrolló un prototipo del motor de recomendación para las listas de recomendaciones mostradas en la pantalla principal, páginas de productos y pantalla del carrito. Se aplicó filtrado basado en contenido y filtrado colaborativo para nuevos clientes, clientes existentes y páginas de productos respectivamente, logrando un diseño que también considera la serendipia."
        ]
      },
      {
        "title": "Clasificación de clientes con k-vecinos más cercanos y agregación básica de situación de compras",
        "summary": "Para apoyar las estrategias de marketing de la dirección del e-commerce de moda, se clasificaron los clientes actuales con k-vecinos más cercanos y se realizó una agregación básica de la situación de compras (ventas por categoría de producto, etc.) por clasificación.",
        "difficulty": "medium",
        "technologies": [
          "Python",
          "pandas",
          "NumPy",
          "SQL"
        ],
        "highlights": [
          "Para apoyar las estrategias de marketing de la dirección del e-commerce de moda, se clasificaron los clientes actuales con k-vecinos más cercanos y se realizó una agregación básica de la situación de compras (ventas por categoría de producto, etc.) por clasificación."
        ]
      },
      {
        "title": "Desarrollo full-stack y despliegue de chatbot de demostración",
        "summary": "Se definieron las especificaciones de diseño del chatbot de demostración, se implementó la pantalla y API (Python/Flask). Se desplegó la aplicación en S3 y EC2.",
        "difficulty": "medium",
        "technologies": [
          "JavaScript",
          "Flask",
          "Amazon S3",
          "Amazon EC2",
          "Python"
        ],
        "highlights": [
          "Se definieron las especificaciones de diseño del chatbot de demostración, se implementó la pantalla y API (Python/Flask). Se desplegó la aplicación en S3 y EC2."
        ]
      }
    ]
  }
];
