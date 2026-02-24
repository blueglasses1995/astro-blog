// English translation of cv-details.ts
// Professional CV data for portfolio site

import type { CVProject } from './cv-details';

export const cvProjectsEn: CVProject[] = [
  {
    "id": "ai-translation-tools-2025",
    "company": "AI Translation SaaS Startup",
    "companyDesc": "Design and implementation of post-translation processing microservices for an AI translation SaaS product",
    "role": "Backend Engineer (Microservice Design & Implementation)",
    "roles": ["Backend", "Infra", "Testing"],
    "period": "2025/04 — 2025/09",
    "teamSize": 5,
    "summary": "Post-translation processing microservice suite built with FastAPI + Celery + PostgreSQL + Redis. Designed and implemented the post-validation service, modernized the frontend development environment, built Docker/GHCR deployment infrastructure, implemented OpenAPI mock auto-generation, and established E2E testing — comprehensively improving the development platform",
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
        "title": "State Machine Design for Post-Translation Processing and Fault-Tolerant Task Infrastructure",
        "summary": "Managed post-translation quality checks and re-translation processes using a 9-state state machine, recording all step results as immutable data in the database. This enabled root cause analysis of translation accuracy issues using SQL alone, with processing status queryable via API in real time. Each step was implemented as an idempotent Celery task, with fault-tolerant design that can restore queue information from the database and resume processing after container failures",
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
          "Designed and implemented a loosely coupled, maintainable architecture with complete separation of state transition logic and business logic"
        ],
        "decisions": [
          {
            "title": "State machine control for translation validation process",
            "detail": "Designed a 9-state state machine to control the translation check to re-translation loop. By separating state transition logic from business logic, achieved a loosely coupled structure where changes to branching conditions do not affect other steps"
          },
          {
            "title": "Immutable schema design prioritizing observability",
            "detail": "Adopted an approach of recording all step results as immutable data in the database. When translation accuracy issues occur, root causes can be analyzed via SQL, and the data can be directly leveraged for future AI model improvements. Processing status can be determined with a simple DB SELECT, reducing the burden on both developers for operational verification and business stakeholders for translation quality checks"
          },
          {
            "title": "Fault-tolerant design with idempotent Celery tasks",
            "detail": "Implemented each state transition step as an idempotent Celery task. With exponential backoff + jitter retry configuration, API polling portions can also be safely retried. Even if a container crashes and the Redis queue is lost, processing can be resumed by restoring queue information from the database state"
          }
        ],
        "outcomes": [
          {
            "before": "Post-translation processing status was a black box, with log inspection being the only way to verify operations",
            "after": "Processing status became queryable via a single API. Translation accuracy issues can now be root-cause analyzed with SQL, reducing verification overhead for both developers and business stakeholders",
            "metric": "Improved observability and fault recovery capability"
          }
        ],
        "challenges": [
          {
            "title": "Designing processing recovery after container failures",
            "resolution": "Since Redis queues are volatile, built a mechanism to restore correct queue information from database state upon container restart. By designing each task to be idempotent, processing can safely resume from where it left off"
          },
          {
            "title": "Separating state transition logic from business logic",
            "resolution": "Managed state transition branching conditions and business logic within each step as completely separate modules. Achieved a loosely coupled design where modifications to either side do not affect the other, ensuring maintainability"
          }
        ]
      },
      {
        "title": "Regression Prevention Manual Test Specifications and AI-Assisted Testing Strategy",
        "summary": "Created manual test specifications for regression prevention in preparation for post-initial-release refactoring. Honestly evaluated the reliability limitations of generative AI (agent-browser) non-deterministic behavior, and formulated a phased migration strategy from manual testing to E2E to component tests. Made the practical decision to limit OnlyOffice editor (Canvas implementation) tightly-coupled sections to manual testing only",
        "difficulty": "medium",
        "technologies": [
          "Storybook",
          "Playwright",
          "Vitest",
          "React Testing Library",
          "agent-browser"
        ],
        "highlights": [
          "Evaluated the reliability limitations of generative AI non-deterministic behavior and formulated a phased test automation strategy (manual testing to E2E to component tests)"
        ],
        "decisions": [
          {
            "title": "Testing strategy informed by generative AI (agent-browser) non-deterministic behavior",
            "detail": "Rather than having AI perform unstructured manual testing, formulated a phased test automation approach: (1) systematize manual testing with test specifications first, (2) migrate to deterministic E2E and component tests, (3) leverage agent-browser solely for generating deterministic E2E test code rather than manual testing"
          },
          {
            "title": "Testing strategy for OnlyOffice editor (Canvas implementation) tightly-coupled UI",
            "detail": "Determined that faking the OnlyOffice editor would reduce test effectiveness. Since E2E tests relying on Canvas DOM relative positioning tend to be unstable, honestly decided to limit OnlyOffice tightly-coupled sections to manual testing only"
          }
        ],
        "outcomes": [
          {
            "before": "No regression prevention measures existed during refactoring, and no testing strategy had been formulated",
            "after": "Created manual test specifications to systematize manual testing. After honestly evaluating generative AI reliability limitations, formulated a phased migration strategy from manual testing to E2E to component tests. Documented the practical decision to limit OnlyOffice tightly-coupled sections to manual testing",
            "metric": "Systematization of testing strategy and quality assurance framework"
          }
        ],
        "challenges": [
          {
            "title": "Determining the limits of test automation for UI tightly coupled with Canvas-based OnlyOffice editor",
            "resolution": "Clearly separated test targets into 'automatable areas' and 'areas requiring manual testing.' OnlyOffice tightly-coupled sections are covered by manual test specifications, while other UI and API logic are automated with E2E and component tests"
          }
        ]
      },
      {
        "title": "Glossary Design and Clean Architecture for Translation Validation",
        "summary": "Designed the domain model, glossary data structure, and clean architecture (UseCase/Repository/Domain separation) for the entire translation validation feature. Ensured process observability through schema design that persists generative AI decision-making to the database",
        "difficulty": "high",
        "technologies": [
          "Python",
          "FastAPI",
          "PostgreSQL"
        ],
        "highlights": [
          "Designed the entire translation validation logic using clean architecture with UseCase/Repository/Domain separation, facilitating task delegation among team members"
        ],
        "decisions": [
          {
            "title": "Adoption of 3-layer UseCase/Repository/Domain architecture",
            "detail": "Separated translation validation logic into three layers: UseCase (business flow control), Repository (data access abstraction), and Domain (domain model/validation). By confining generative AI calls to the UseCase layer, limited the impact scope when changing AI models"
          },
          {
            "title": "Schema design for persisting generative AI decisions to database",
            "detail": "Adopted a design that persists all decisions made by generative AI at each validation step (translation quality scores, re-translation necessity, terminology correction suggestions) as database records. Established a data accumulation foundation for future AI model accuracy comparisons and prompt improvements"
          }
        ],
        "outcomes": [
          {
            "before": "Translation validation logic had no design, with no criteria for task delegation within the team",
            "after": "The 3-layer architecture clarified responsibilities of each layer. Established a structure enabling team members to develop Repository and UseCase layers in parallel, with design documentation serving as the basis for task delegation",
            "metric": "Established design foundation enabling parallel development across a 4-person team"
          }
        ],
        "challenges": [
          {
            "title": "Incorporating generative AI non-deterministic output into the domain model",
            "resolution": "Defined AI outputs as 'judgment results' with type definitions, designed a flow to validate in the Domain layer before persisting to the database. Structured so that changes in AI output format can be absorbed by Domain layer validation"
          }
        ]
      },
      {
        "title": "Near-Exact Match Algorithm for Glossary Usage Example Search",
        "summary": "Implemented an algorithm for glossary usage example search that tolerates notation variations, particle differences, and punctuation discrepancies while returning semantically accurate matches. Solved the problem where full-text search lacked precision and exact match produced excessive misses",
        "difficulty": "high",
        "technologies": [
          "Python",
          "PostgreSQL"
        ],
        "highlights": [
          "Designed a 'near-exact match' search logic positioned between full-text search and exact match, achieving high-precision terminology search while tolerating notation variations"
        ],
        "decisions": [
          {
            "title": "Design of a 'near-exact match' approach — neither full-text search nor exact match",
            "detail": "PostgreSQL full-text search (tsvector) produced excessive hits due to Japanese particle and punctuation differences, while exact match caused frequent search misses due to notation variations. Designed an intermediate approach that applies normalization (punctuation removal, whitespace standardization, particle pattern tolerance) before string comparison, balancing precision and recall"
          }
        ],
        "outcomes": [
          {
            "before": "Full-text search returned results unrelated to translation terms, while exact match could not find target usage examples due to notation variations",
            "after": "The near-exact match algorithm significantly improved glossary usability by returning only semantically accurate usage examples while tolerating notation variations, particle differences, and punctuation discrepancies",
            "metric": "Improved glossary search accuracy (simultaneous reduction of false positives and improvement of recall)"
          }
        ],
        "challenges": [
          {
            "title": "Systematizing Japanese text notation variation patterns",
            "resolution": "Collected and classified frequently occurring notation variation patterns from translation target documents (mixed punctuation styles, particle interchanges, mixed full-width/half-width characters). Implemented as normalization rules and comprehensively verified with test cases"
          }
        ]
      },
      {
        "title": "Parallelizing Serial Network I/O in Celery Tasks with asyncio",
        "summary": "Changed serial network I/O calls to multiple external services (translation API, glossary API, etc.) to concurrent execution using an asyncio event loop. Established a pattern for safely integrating asyncio with Celery's synchronous worker model, improving latency and throughput",
        "difficulty": "high",
        "technologies": [
          "Python",
          "Celery",
          "asyncio"
        ],
        "highlights": [
          "Established a pattern for safely launching an asyncio event loop within Celery synchronous workers, parallelizing previously serial external API calls"
        ],
        "decisions": [
          {
            "title": "Adopting asyncio event loop integration pattern within Celery synchronous workers",
            "detail": "Adopted a pattern of launching an event loop via asyncio.run() within tasks while maintaining Celery's synchronous worker (prefork) model. The alternative of converting Celery itself to async workers was rejected due to high ecosystem compatibility risks, and ThreadPoolExecutor was rejected because threads would be wastefully occupied during I/O waits"
          }
        ],
        "outcomes": [
          {
            "before": "Calls to translation API and glossary API were executed serially, with each request waiting sequentially for 3 external APIs, resulting in long per-request processing times",
            "after": "Changed external API calls to concurrent execution with asyncio.gather. Reduced processing time from the sum of all API response times (serial execution) to the slowest API's response time",
            "metric": "Reduced latency and improved throughput for external API call portions"
          }
        ],
        "challenges": [
          {
            "title": "Coexistence of Celery's synchronous execution model with asyncio",
            "resolution": "Since Celery's prefork workers are process-based, adopted an approach of creating and disposing of a new asyncio event loop within each task. By limiting the event loop lifecycle to the task scope, eliminated interference between workers"
          }
        ]
      },
      {
        "title": "Optimizing Text Matching Algorithm for Content Control Assignment",
        "summary": "Optimized the matching algorithm between source text and document structure to accurately assign markers to translation target locations within documents. Achieved both matching accuracy and performance for large-scale documents",
        "difficulty": "extreme",
        "technologies": [
          "Python"
        ],
        "highlights": [
          "Optimized the search algorithm to maintain accuracy while achieving practical processing speed for large-scale documents"
        ],
        "decisions": [
          {
            "title": "Reducing search space through a staged matching strategy",
            "detail": "Adopted a strategy of sequentially executing matching between source text and document structure (paragraphs, cells, list items) in three stages: exact match, normalized match, and partial match. By excluding locations confirmed in earlier stages from the search space, reduced computational complexity while maintaining accuracy"
          }
        ],
        "outcomes": [
          {
            "before": "Matching processing was slow for large documents (100+ pages), with accuracy issues in content control assignment",
            "after": "The staged matching strategy achieved practical processing speed even for large documents. Matching accuracy also improved, enhancing the reliability of marker assignment to translation target locations",
            "metric": "Improved matching speed and accuracy for large-scale documents"
          }
        ],
        "challenges": [
          {
            "title": "Trade-off between document structure segmentation granularity and matching accuracy",
            "resolution": "Adjusted text segmentation granularity per Word document internal structure type (paragraphs, table cells, list items, headers/footers). Resolved the issue where too-fine segmentation increases matching candidates and slows processing while too-coarse segmentation reduces partial match accuracy, by implementing element-type-specific segmentation rules"
          }
        ]
      },
      {
        "title": "Modernizing the Frontend Development Environment",
        "summary": "Introduced Vite, Vitest, Storybook, Biome, and Playwright to the existing frontend in a single initiative, overhauling the development experience and code quality foundation. Improved build speed and established a toolchain for unit testing, UI catalog, linter/formatter, and E2E testing",
        "difficulty": "high",
        "technologies": [
          "Vite",
          "Vitest",
          "Storybook",
          "Biome",
          "Playwright"
        ],
        "highlights": [
          "Introduced 5 tools (Vite/Vitest/Storybook/Biome/Playwright) and built the testing, quality management, and UI catalog infrastructure from scratch"
        ],
        "decisions": [
          {
            "title": "Selecting Vite + Biome (migrating from webpack + ESLint/Prettier)",
            "detail": "Migrated the existing webpack-based build environment to Vite and consolidated ESLint+Prettier into Biome. Significantly improved development iteration speed through Vite's hot reload performance and Biome's fast lint/format capabilities"
          },
          {
            "title": "Unifying Node.js version management with Volta",
            "detail": "Resolved the issue of sporadic build errors caused by Node.js version mismatches across the team by introducing Volta. Pinned the version at the project root to eliminate environment discrepancies between members"
          }
        ],
        "outcomes": [
          {
            "before": "No unit tests, UI catalog, linter, or E2E tests existed — there were no objective means to verify code quality",
            "after": "Comprehensively introduced 5 integrated tools: Vite (build), Vitest (unit testing), Storybook (UI catalog), Biome (lint/format), and Playwright (E2E), completely overhauling the development foundation",
            "metric": "Establishment of testing and quality management infrastructure (built from zero)"
          }
        ],
        "challenges": [
          {
            "title": "Coexistence of existing PHP-based project with Vite",
            "resolution": "Designed a hybrid configuration managing only the React portions with Vite without disrupting the existing PHP+jQuery environment. Structured Vite's build output to be loaded from PHP templates, enabling incremental migration"
          }
        ]
      },
      {
        "title": "Auto-Generating Frontend Mocks from Python Backend OpenAPI Specification",
        "summary": "Built a pipeline that uses the OpenAPI specification auto-generated by FastAPI as the source to auto-generate TypeScript type definitions, API clients, and mock handlers via MSW (Mock Service Worker) and Orval. Eliminated the need for frontend development to wait for backend implementation",
        "difficulty": "high",
        "technologies": [
          "MSW",
          "Orval",
          "FastAPI",
          "Storybook"
        ],
        "highlights": [
          "Built a pipeline that auto-generates type definitions, API clients, and mocks from OpenAPI specification, eliminating frontend dependency on backend"
        ],
        "decisions": [
          {
            "title": "Mock auto-generation pipeline using OpenAPI specification as Single Source of Truth",
            "detail": "Designed a pipeline using the OpenAPI specification auto-generated by FastAPI as the sole source of truth, generating TypeScript type definitions and API clients via Orval and mock handlers via MSW. Since manual mock writing makes it difficult to keep up with API changes, auto-generation from the specification simultaneously ensures type safety and mock freshness"
          }
        ],
        "outcomes": [
          {
            "before": "Frontend development had to wait for backend API implementation to complete, preventing parallel development",
            "after": "By auto-generating mocks from OpenAPI specification, frontend development can begin as soon as the backend API definition is finalized. Mock APIs also work on Storybook, enabling UI verification without the backend",
            "metric": "Established development parallelism between frontend and backend"
          }
        ],
        "challenges": [
          {
            "title": "Maintaining type consistency between OpenAPI schema and Orval/MSW",
            "resolution": "Automated regeneration from OpenAPI schema in CI, building a mechanism where frontend type definitions and mocks automatically track backend API changes. Type inconsistencies are immediately detected as TypeScript compilation errors"
          }
        ]
      },
      {
        "title": "Building Pull-Based Deployment Infrastructure with Docker Compose + GHCR",
        "summary": "Created automation scripts for the entire flow of Docker Compose build, push to GHCR, and pull-based deployment on the production server. Set up GHCR image management, visibility settings, permission configuration, and cron-based pull deployment on the production server",
        "difficulty": "high",
        "technologies": [
          "Docker",
          "GitHub Actions"
        ],
        "highlights": [
          "Migrated from manual SSH+SCP deployment to Docker Compose+GHCR pull-based deployment, establishing a reproducible deployment flow"
        ],
        "decisions": [
          {
            "title": "Adopting GHCR pull-based deployment (migrating from manual SSH+SCP approach)",
            "detail": "Migrated from a deployment approach where developers SSH into the server and SCP upload files, to a pull-based deployment where images are pushed to GHCR and the production server pulls them via cron. Ensured deployment reproducibility with instant rollback capability through image tag switching"
          },
          {
            "title": "GHCR visibility, permissions, and image management design",
            "detail": "Managed image visibility at the Organization level in GitHub Container Registry, set up required permissions for production server pulls (Personal Access Token + read:packages scope), and designed image tag naming conventions"
          }
        ],
        "outcomes": [
          {
            "before": "Deployment relied on manual SSH+SCP, was person-dependent, with risk of incidents from procedural errors. No rollback mechanism existed",
            "after": "Docker Compose+GHCR pull-based deployment ensures reproducibility. Cron-based automatic pulling and image tag management enable easy rollback",
            "metric": "Deployment automation and reproducibility establishment"
          }
        ],
        "challenges": [
          {
            "title": "Ensuring reliability of cron-based pull deployment",
            "resolution": "Incorporated health checks, image diff detection, and rollback functionality into the pull script, designed to maintain existing containers when new image pulls fail"
          }
        ]
      },
      {
        "title": "Configuring OnlyOffice Server TLS/CORS Settings via Docker Environment Variables",
        "summary": "Configured OnlyOffice document server TLS certificate and CORS origin settings to be controllable via environment variables through Docker startup script injection. Simplified per-environment configuration switching",
        "difficulty": "medium",
        "technologies": [
          "Docker"
        ],
        "highlights": [
          "Adopted an approach of controlling settings via environment variables through startup script injection rather than directly editing OnlyOffice configuration files"
        ],
        "decisions": [
          {
            "title": "Externalizing OnlyOffice configuration via script injection",
            "detail": "Since directly mounting OnlyOffice configuration files causes compatibility issues during version upgrades, adopted an approach of dynamically generating configuration files from environment variables via an entrypoint script at Docker startup. Made TLS certificate paths and CORS origins switchable via environment variables"
          }
        ],
        "outcomes": [
          {
            "before": "OnlyOffice TLS/CORS settings were hardcoded in configuration files, requiring manual editing when switching environments",
            "after": "Enabled control of TLS certificate paths and CORS origins via Docker environment variables, automating configuration switching across development, staging, and production environments",
            "metric": "Automated environment switching and externalized configuration"
          }
        ]
      },
      {
        "title": "Documenting Local/Remote Hybrid E2E Development Environment Setup",
        "summary": "Prepared reproducible documentation for building an E2E development environment connecting local React+Python with remote server PHP. Created step-by-step guides including Docker Compose, network configuration, and environment variable management to streamline new member onboarding",
        "difficulty": "medium",
        "technologies": [
          "Docker",
          "Python",
          "FastAPI"
        ],
        "highlights": [
          "Documented the reproducible setup procedure for a local/remote hybrid environment, reducing new member environment setup overhead"
        ],
        "decisions": [
          {
            "title": "Standardizing environment setup procedures via Docker Compose integration",
            "detail": "Consolidated Docker Compose network configuration, environment variable templates, and connection verification procedures for connecting local React+Python containers with remote server PHP+OnlyOffice into a single document. Aimed to enable new members to reproduce the E2E environment by following the documentation"
          }
        ],
        "outcomes": [
          {
            "before": "Environment setup procedures were passed down verbally and person-dependent, taking 1-2 days for new members to set up their environment",
            "after": "Reproducible documentation eliminated person-dependency in environment setup procedures. Prepared step-by-step documentation including Docker Compose, network configuration, and environment variables",
            "metric": "Improved new member onboarding efficiency"
          }
        ]
      },
      {
        "title": "Building Playwright E2E Test Environment and Implementing Test Scenarios",
        "summary": "Built an E2E test environment with Playwright covering the entire translation workflow across React/Python/OnlyOffice. Since OnlyOffice Canvas elements have E2E testing limitations, clearly delineated automatable scope from manual testing scope",
        "difficulty": "high",
        "technologies": [
          "Playwright",
          "Docker"
        ],
        "highlights": [
          "Implemented regression test scenarios for the entire translation workflow, clearly delineating automatable scope from manual testing scope"
        ],
        "decisions": [
          {
            "title": "Clear boundary between automatable and manual testing areas",
            "detail": "Since stable E2E testing of operations dependent on OnlyOffice editor Canvas elements is difficult with Playwright, divided test targets into 'translation workflow operation flows and API integration' and 'document operations within OnlyOffice,' with only the former covered by E2E tests"
          }
        ],
        "outcomes": [
          {
            "before": "No E2E test environment existed, with regression testing during feature additions and refactoring being manual only",
            "after": "Implemented regression test scenarios for the entire translation workflow (file upload, translation execution, result verification) with Playwright. Enabled automated integration testing of React+Python+PostgreSQL within a Docker environment",
            "metric": "Automated regression testing via E2E tests (covering automatable areas)"
          }
        ],
        "challenges": [
          {
            "title": "Building a test environment integrating 3 services: React+Python+OnlyOffice",
            "resolution": "Designed a network configuration where Playwright's test runner can access all 3 services launched via Docker Compose. Managed test data initialization and cleanup as fixtures to ensure test independence"
          }
        ]
      },
      {
        "title": "Building Development Efficiency Dashboard, Log Aggregation MCP, and Story Generation Agent",
        "summary": "Created a dashboard visualizing Celery task execution status and translation validation success/failure rates. Also built an MCP server for searching distributed environment logs from Claude Code, and a sub-agent for auto-generating Storybook Stories from components, improving development efficiency",
        "difficulty": "medium",
        "technologies": [
          "Python",
          "Storybook",
          "agent-browser"
        ],
        "highlights": [
          "Built a development support infrastructure leveraging AI tools, including an MCP server for log search and a Story auto-generation agent"
        ],
        "decisions": [
          {
            "title": "Claude Code integration of distributed logs via MCP server",
            "detail": "Built an MCP server enabling cross-container log search from Claude Code across React, Python, and Celery containers. Previously, logs had to be checked individually via docker logs + grep, but MCP tooling enabled log search and filtering from within Claude Code conversations"
          },
          {
            "title": "Storybook Story auto-generation via agent-browser",
            "detail": "Built a sub-agent that auto-generates Storybook Stories from existing React components. agent-browser analyzes component implementations and auto-generates Story files covering comprehensive props and state patterns, accelerating UI catalog development"
          }
        ],
        "outcomes": [
          {
            "before": "Checking distributed container logs required manual docker logs + grep execution, making incident investigation time-consuming. Storybook Stories also had to be manually created for each UI component",
            "after": "MCP server enables cross-container log search from Claude Code. A dashboard visualizing Celery task execution status and translation validation success/failure rates was also created, improving incident investigation and quality monitoring efficiency",
            "metric": "Improved incident investigation and development efficiency, accelerated UI catalog development"
          }
        ]
      }
    ]
  },
  {
    "id": "learning-platform-consulting-2025",
    "company": "Mid-Sized Online Learning Platform Company",
    "companyDesc": "A mid-sized company providing an online learning platform. Provided technical analysis and proposal support for short-term extension requirements of their integrated business system.",
    "role": "Technical Research & Documentation",
    "roles": ["Consulting"],
    "period": "2025-05 — 2025-07",
    "teamSize": 2,
    "summary": "Quantified code quality of a VBScript/Oracle-based legacy system using SonarQube, and supported strategic decision-making with a 3-option comparison matrix across 7 evaluation axes (modification/ERP adoption/browser extension). Also built a RAG-based internal document search platform using NotebookLM+markitdown. Delivered results in approximately 2 months of short-term consulting by leveraging generative AI tools",
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
        "title": "Building a RAG-Based Internal Document Search Platform",
        "summary": "Converted internal documents to Markdown with markitdown and built a RAG search environment using NotebookLM. Integrated Claude Desktop + SonarQube via MCP to streamline extraction and formatting of quality issue summaries.",
        "difficulty": "medium",
        "technologies": [
          "SonarQube",
          "NotebookLM",
          "markitdown",
          "Claude"
        ],
        "highlights": [
          "Designed the RAG search platform architecture using NotebookLM+markitdown and built the document conversion pipeline",
          "Proposed a low-cost, fast-delivery approach by leveraging existing SaaS (NotebookLM) instead of building a custom RAG solution"
        ],
        "decisions": [
          {
            "title": "Low-effort RAG construction using NotebookLM + markitdown",
            "detail": "Adopted an approach of leveraging Google's NotebookLM by converting internal documents (PDF/Word/Excel) to text with markitdown and ingesting them. Minimized costs by utilizing existing SaaS rather than building a custom RAG system"
          }
        ],
        "outcomes": [
          {
            "before": "Internal documents were scattered across departmental file servers and cloud storage with no cross-search capability. Finding needed information was time-consuming",
            "after": "Built a RAG search platform using NotebookLM + markitdown. Converted internal documents to Markdown and enabled natural language cross-search. Achieved a practical search environment within approximately 2 weeks of consulting",
            "metric": "Improved internal document search efficiency"
          }
        ],
        "challenges": [
          {
            "title": "Converting diverse file format internal documents to RAG-searchable format",
            "resolution": "Used markitdown to convert PDF/Word/Excel to Markdown format. Built a conversion pipeline that preserves structural information (headings, tables, lists) as much as possible. Manually quality-checked converted Markdown and made corrections as needed before ingesting into NotebookLM"
          }
        ]
      },
      {
        "title": "Legacy System Code Structure Analysis and Extensibility Assessment",
        "summary": "Performed static analysis of a VBScript/Oracle-based legacy system using Cursor/SonarQube/Claude Desktop. Analyzed extensibility, modification difficulty, and dependencies, then organized and compared options including ERP adoption, existing code modification, and browser extension.",
        "difficulty": "medium",
        "technologies": [
          "SonarQube",
          "Cursor",
          "ChatGPT",
          "Claude"
        ],
        "highlights": [
          "Conducted static analysis with SonarQube and created a module-level modification risk assessment report",
          "Provided the rationale for adopting the browser extension approach through quantitative data-driven modification risk visualization"
        ],
        "decisions": [
          {
            "title": "Quantifying legacy code quality with SonarQube",
            "detail": "Used SonarQube for static analysis of the entire codebase, quantitatively measuring bugs, code smells, duplication rate, and test coverage. Prepared data enabling objective assessment of modification risks"
          },
          {
            "title": "Proposing modification priorities based on quantitative data",
            "detail": "Organized static analysis results by module, mapping high-risk areas and their impact scopes. Proposed modification priorities based on quantitative evidence"
          }
        ],
        "outcomes": [
          {
            "before": "No objective code quality evaluation existed, and modification risks were unclear",
            "after": "Quantitatively evaluated code quality through SonarQube analysis. Identified high-risk modification areas and visualized the overall technical debt landscape",
            "metric": "Objectified modification risk through quantitative evaluation. Utilized as rationale for adopting the browser extension approach"
          }
        ],
        "challenges": [
          {
            "title": "Conducting investigation in a legacy environment with no version control or tests",
            "resolution": "Quantified quality through SonarQube static analysis and conducted investigation without impacting the production environment by connecting to an Oracle DB read-only replica. Compiled analysis results into slide-format reports to visualize technical risks for management"
          }
        ]
      },
      {
        "title": "Short-Term Extension PoC Design and Executive Decision Support Documentation",
        "summary": "Created proposal documentation leveraging Mermaid notation extensively for flow diagrams and structural diagrams. Accelerated the documentation process through rapid iterations using generative AI tools including Genspark, Gamma, and Canva.",
        "difficulty": "medium",
        "technologies": [
          "Genspark",
          "Gamma",
          "Canva",
          "Mermaid"
        ],
        "highlights": [
          "Designed a 3-option comparison matrix with 7 evaluation axes and a decision tree, and developed a PoC architecture for a React browser extension",
          "Categorized requirements from 6 departments into 3 tiers: 'addressable via extension,' 'requires code modification,' and 'waiting for ERP,' presenting each department with a realization outlook"
        ],
        "decisions": [
          {
            "title": "Strategic selection support via 3-option comparison framework",
            "detail": "Created a matrix comparing 3 options across 7 evaluation axes (development risk, cost, timeline, quality assurance, operational impact, extensibility, ROI), and visualized the decision flow in a decision tree format"
          },
          {
            "title": "Proposing a low-risk improvement approach via React browser extension",
            "detail": "Proposed an approach of overlaying a React UI onto legacy screens as a Chrome extension. Designed a PoC implementing features such as hierarchical discount master dropdowns on the frontend without modifying the existing database or backend logic"
          }
        ],
        "outcomes": [
          {
            "before": "No decision criteria existed for multiple extension approaches (modification/ERP/extension), preventing executive decision-making",
            "after": "Supported strategic selection with a 3-option comparison matrix + decision tree. Designed a React browser extension PoC architecture (Lambda+S3+IndexedDB+Chrome Extension) and presented a concrete implementation plan using the discount criteria flexibility use case",
            "metric": "Browser extension approved as a short-term measure. ERP adoption moved to a separate 2-3 year medium-to-long-term budget planning process"
          }
        ],
        "challenges": [
          {
            "title": "Organizing requirements from 6 departments and categorizing feasibility",
            "resolution": "Consolidated all requirements from interviews into Excel, categorized into 3 tiers: 'addressable via browser extension,' 'requires existing code modification,' and 'waiting for ERP.' Displayed priorities with star ratings, visualizing when each department's requirements would be realized"
          }
        ]
      }
    ]
  },
  {
    "id": "ai-translation-qcd-2025",
    "company": "AI Translation SaaS Startup (Japan)",
    "companyDesc": "A Japanese startup providing AI-powered translation SaaS. Served as external advisor on QCD (Quality, Cost, Delivery) improvement strategies for the development organization.",
    "role": "Development Organization Advisor",
    "roles": ["Consulting"],
    "period": "2025-04 — 2025-07",
    "teamSize": 2,
    "summary": "Conducted structural analysis of QCD (Quality, Cost, Delivery) challenges in a ~30-person development organization as an external advisor. Structured 100 hypotheses using MECE x Issue Tree methodology, objectified initiative priorities with 5-axis weighted scoring, and created a 6-phase execution roadmap and executive proposal materials. Secured COO approval at the executive meeting",
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
        "title": "Structural Analysis of Development Organization QCD Challenges",
        "summary": "Investigated the root causes of declining development velocity and quality, organizing technical and organizational challenges. Deep-dived into structural issues of the engineering organization including code management, review processes, release procedures, and knowledge silos.",
        "difficulty": "high",
        "technologies": [
          "SonarQube",
          "Cursor",
          "NotebookLM"
        ],
        "highlights": [
          "Structured 100 hypotheses using MECE x Issue Tree and extracted 8 major challenges via 5-axis scoring. Described organizational-political challenges neutrally as systemic issues"
        ],
        "decisions": [
          {
            "title": "MECE x Issue Tree approach for structuring 100 hypotheses",
            "detail": "Combined MECE (Mutually Exclusive, Collectively Exhaustive) with Issue Tree methodology, comprehensively enumerating and evaluating 100 hypotheses using 5-axis quantitative scoring (release velocity contribution, bug rate contribution, execution feasibility, measurability, lead time)"
          },
          {
            "title": "Priority ordering of 8 major challenges with organizational structure mapping",
            "detail": "Based on contribution to the top-priority issue 'declining delivery of existing applications,' deep-dived into 3 challenges directly tied to implementers and organized the remaining 5 by stakeholder. Reordered all 8 challenges by importance"
          }
        ],
        "outcomes": [
          {
            "before": "Challenges were fragmented with no overall picture. Interview results were subjective and insufficient for priority decisions",
            "after": "Structured 100 hypotheses using MECE x Issue Tree and extracted 8 major challenges via 5-axis scoring. Built a challenge map usable for executive decision-making",
            "metric": "Completed structuring from 100 hypotheses to 8 major challenges. Achieved quantitative evaluation with top hypothesis score 4.35 (highest) to 1.9 (lowest)"
          }
        ],
        "challenges": [
          {
            "title": "Structuring challenges amid insufficient quantitative data",
            "resolution": "Rather than relying on quantitative data, adopted an approach of structuring hypotheses via MECE x Issue Tree and performing relative evaluation through 5-axis scoring. Built a proprietary framework for converting interview content into 'challenge weights'"
          },
          {
            "title": "Neutral description of organizational-political challenges",
            "resolution": "Described issues without naming individuals, framing them as systemic challenges such as 'decision-making structure' and 'unclear approval authority.' Solutions were proposed as institutional design rather than personal criticism"
          }
        ]
      },
      {
        "title": "Building QCD Improvement Initiative Evaluation Framework and Priority Matrix",
        "summary": "Researched and organized improvement initiatives along Quality, Cost, and Delivery axes. Conducted quantitative 'impact x feasibility' evaluation for each initiative. Implemented weighted matrices and priority charts in deliverables, presenting phased execution plans with Gantt charts and responsibility assignment diagrams.",
        "difficulty": "high",
        "technologies": [
          "ChatGPT",
          "Gamma",
          "Mermaid"
        ],
        "highlights": [
          "Designed a 5-axis weighted scoring function and auto-generated a 6-phase x 3-week roadmap using RANK.EQ formula"
        ],
        "decisions": [
          {
            "title": "Objectifying initiative priorities via 5-axis weighted scoring",
            "detail": "Designed a scoring function with 5 weighted axes: Q contribution (0.1), C contribution (0.1), D contribution (0.4), monetary cost (0.1), and required effort (0.3). Configured weight distribution to emphasize D (Delivery) contribution and required effort"
          },
          {
            "title": "6-phase x 3-week phased rollout roadmap design",
            "detail": "Auto-mapped score rankings to phase numbers using RANK.EQ formula, auto-generating a 6-phase x 3-week Gantt chart. Placed 4-5 initiatives in each phase, with prior phase outcomes serving as prerequisites for subsequent phases in a staged rollout"
          }
        ],
        "outcomes": [
          {
            "before": "Priorities among 27 initiatives were unclear, causing delays in executive decision-making",
            "after": "5-axis weighted scoring + 6-phase roadmap enabled construction of an execution plan with month-by-month progress visibility",
            "metric": "Top 5 initiative priorities approved in a single executive meeting. Target of 30% release speed improvement and 30% bug rate reduction within 4 months (provisional goals)"
          }
        ],
        "challenges": [
          {
            "title": "Building an objective evaluation framework for initiative priorities",
            "resolution": "Implemented 5-axis weighted scoring in Excel and secured objectivity and transparency of scoring results by pre-aligning weight rationale with the COO"
          }
        ]
      },
      {
        "title": "Designing and Creating Executive Meeting Presentation Materials",
        "summary": "To facilitate consensus-building with non-engineer executives, extensively used flow diagrams, sequence diagrams, and decision branch charts in Mermaid notation. Led the creation of decision-support materials leveraging NotebookLM's RAG platform for executive decision-making.",
        "difficulty": "medium",
        "technologies": [
          "NotebookLM",
          "Gemini",
          "Genspark",
          "Mermaid"
        ],
        "highlights": [
          "Led the creation of a 2-part executive proposal (23+10 slides). Reframed technical challenges as QCD impacts and explained them through causal chain analysis"
        ],
        "decisions": [
          {
            "title": "Two-part executive proposal design (talent optimization + ticket platform redesign)",
            "detail": "Designed materials as a 2-part structure: 'Development Organization Talent Optimization Proposal for AI Translation Business' (23 slides, overall picture) and 'QCD Improvement Through Ticket Management Platform Redesign' (10 slides, deep-dive)"
          },
          {
            "title": "Jira unified platform proposal with tool comparison for decision support",
            "detail": "Created a comparison table evaluating 4 options (Notion, Planio, Notion+Planio hybrid, Jira) across 5 axes: ticket structure flexibility, cross-department collaboration, UI/UX, workflow design, and tool integration. Recommended Jira + Jira Service Management"
          }
        ],
        "outcomes": [
          {
            "before": "No means to explain technical challenges to executives, making it difficult to secure approval for improvement investments",
            "after": "Visualized the overall QCD improvement picture and concrete initiatives with a 2-part executive proposal (23 slides + 10 slides). Supported decision-making with tool comparison tables and RACI charts",
            "metric": "COO approved PoC implementation. Decision made to begin ticket management unification and Jira adoption evaluation"
          }
        ],
        "challenges": [
          {
            "title": "Explaining technical challenges to non-engineer executives",
            "resolution": "Reframed technical challenges as QCD (Quality, Cost, Delivery) impacts, explaining through causal chains such as 'bug leakage -> rework effort -> cost increase.' Set KPI targets (40% bug rate reduction, 25% lead time reduction) to quantify improvement effects"
          }
        ]
      }
    ]
  },
  {
    "id": "factory-maintenance-app-2024",
    "company": "Manufacturing Industry SaaS Startup",
    "companyDesc": "A SaaS startup supporting factory equipment maintenance operations in the manufacturing industry. Responsible for full-stack development of the factory equipment maintenance application.",
    "role": "Full-Stack Engineer",
    "roles": ["Frontend", "Backend", "Infra"],
    "period": "2024-10 — 2025-03",
    "teamSize": 4,
    "summary": "A multi-tenant SaaS for managing equipment maintenance and inspection operations in manufacturing. Handled both NestJS + GraphQL + PostgreSQL backend and React + Apollo Client frontend end-to-end. Designed and implemented core features including RFC5545-compliant recurring task functionality, RBAC+ReBAC 3-axis access control, Google Calendar-style task UI, and field-level incremental save",
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
        "title": "Design and Implementation of RFC5545-Compliant Recurring Task Feature",
        "summary": "Covered yearly, monthly (nth weekday/nth day), weekly (multiple weekdays), and daily recurrence patterns with support for bulk updates, skips, and termination conditions. Designed schema, API, and batch jobs to separate virtual and materialized instances while displaying them on a unified view. Adopted a day-ahead batch materialization architecture using Redis+SQS+EventBridge.",
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
          "Analyzed the RFC5545 specification and designed the architecture for recurrence rule expansion, exception handling, and batch materialization. Created specification documents and design retrospectives to systematically record design rationale and alternatives",
          "Implemented SQL/API for merging materialized and virtual instances using generate_series + UNION ALL + DISTINCT ON"
        ],
        "decisions": [
          {
            "title": "Adopting day-ahead batch materialization (EventBridge+SQS)",
            "detail": "Adopted day-ahead batch materialization using EventBridge+SQS+NestJS SQS Consumer"
          },
          {
            "title": "Materialized/virtual instance merge approach using generate_series + UNION ALL",
            "detail": "Expanded dates with PostgreSQL generate_series, restored 20+ columns from template JSON definitions, then deduplicated with DISTINCT ON after UNION ALL with materialized records"
          },
          {
            "title": "Integrating 3 time model types in a single model",
            "detail": "Prioritizing compatibility with the existing system, adopted a design integrating 3 time model types (date-only, with time, duration-specified) in a single model. Documented an extension design incorporating the timeModel concept in the template for future separation"
          }
        ],
        "outcomes": [
          {
            "before": "Recurring task feature was not implemented, requiring manual creation of daily/weekly routine inspections",
            "after": "Released RFC5545-compliant recurrence rule feature, enabling automatic generation of Daily/Weekly/Monthly recurring tasks",
            "metric": "Reduced manual creation effort for routine inspections"
          },
          {
            "before": "Recurrence design discussions could not converge, with design specifications scattered",
            "after": "Created specification documents and retrospectives to systematize current implementation issues and ideal design. Formulated a 6-phase improvement roadmap",
            "metric": "Organizational accumulation of design knowledge and clarity of improvement roadmap"
          }
        ],
        "challenges": [
          {
            "title": "Designing recurrence rules integrating 3 time model types in a single model",
            "resolution": "Started with a minimal implementation of date-only (no time support) and documented the ideal design incorporating the timeModel concept in templates as a specification. Clarified the migration path toward future 3-model separation"
          },
          {
            "title": "300+ line SQL from restoring all fields from template JSONB definitions",
            "resolution": "Progressively built a 300+ line CTE chain, clearly separating CTE responsibilities across stages: recurrence rule expansion, date generation, virtual task generation, merge with materialized tasks, and deduplication. Maintained a maintainable structure while documenting ideal designs such as template reference approach in retrospective documents"
          },
          {
            "title": "Forced batch materialization due to dashboard pivot API constraints",
            "resolution": "Built a CTE chain within SQL to convert virtual tasks into the same column structure as materialized records. Analyzed alternative approaches in detail in retrospective documents, including two-stage aggregation + application-layer merge leveraging COUNT/SUM associativity (with mathematical proof)"
          }
        ]
      },
      {
        "title": "Design, Consensus Building, and Implementation of 3-Axis Access Control (Scope x Resource x Action)",
        "summary": "Defined permissions along 3 axes: scope (headquarters/factory, etc.) x resource x action. Compared 2 approaches — individual assignment vs. role-based assignment — and facilitated team consensus. Maintained consistency by co-managing API authorization and UI display control with CASL Ability.",
        "difficulty": "high",
        "technologies": [
          "TypeScript",
          "React",
          "NestJS",
          "GraphQL",
          "CASL"
        ],
        "highlights": [
          "Designed an RBAC+ReBAC hybrid ACL model and comprehensively verified 30+ use cases. Detailed decision rationale and alternatives in design documentation",
          "Compared individual assignment and role-based assignment approaches, facilitating design consensus with the team"
        ],
        "decisions": [
          {
            "title": "Adopting RBAC+ReBAC hybrid ACL model",
            "detail": "Adopted RBAC+ReBAC hybrid (future ABAC-extensible) for the DB layer, with a 3-phase staged rollout design for the UI layer"
          },
          {
            "title": "Deny-by-default + template-based permission evaluation",
            "detail": "Default deny; if any explicit deny exists, deny; otherwise if any allow exists, allow; if neither, deny — a 3-stage evaluation"
          },
          {
            "title": "Optional hierarchy inheritance via scopeType+inheritChildren",
            "detail": "Added an inheritance flag to per-scope role assignments, making inheritance toggle selectable at role assignment time"
          }
        ],
        "outcomes": [
          {
            "before": "Access control was not implemented, allowing all users to access all data",
            "after": "Designed and achieved team consensus on an RBAC+ReBAC ACL system with 3-tier scope hierarchy (Organization > Site > Project) and 5 system-defined templates",
            "metric": "Completed ACL model design and team consensus"
          },
          {
            "before": "ACL requirements were scattered, with no comprehensive verification of 30+ use cases",
            "after": "Created design documentation and use case verification tables. Confirmed coverage of 12 use cases (multi-factory assignment, external engineers, auditors, etc.)",
            "metric": "Comprehensive requirements verification and design documentation"
          }
        ],
        "challenges": [
          {
            "title": "Balancing permission hierarchy design in multi-tenant SaaS",
            "resolution": "Achieved both flexibility and manageability through optional inheritance via inheritance flags and a 2-layer structure of role templates + individual permission overrides. Documented 30+ use cases and verified coverage of each pattern"
          }
        ]
      },
      {
        "title": "Top Screen Rendering Optimization (70%+ Render Time Reduction)",
        "summary": "Minimized re-rendering overhead from filter, list, and detail view interactions through state structure redesign. Focused refactoring on areas with high rendering cost and significant UX impact within limited effort budget.",
        "difficulty": "high",
        "technologies": [
          "TypeScript",
          "React",
          "Apollo Client"
        ],
        "highlights": [
          "Analyzed re-renders using React DevTools Profiler and selectively applied React.memo/useMemo/useCallback to achieve 70%+ render time reduction"
        ],
        "decisions": [
          {
            "title": "Eliminating unnecessary re-renders with React.memo + useMemo",
            "detail": "Visualized component tree re-renders using React DevTools Profiler, then eliminated unnecessary re-renders with React.memo, useMemo, and useCallback. Achieved over 70% render time reduction"
          }
        ],
        "outcomes": [
          {
            "before": "Slow rendering times negatively impacting UX",
            "after": "Over 70% reduction in rendering time",
            "metric": "Rendering time reduction rate"
          }
        ],
        "challenges": [
          {
            "title": "Blanket memoization of all components vs. Profiler-driven selective optimization",
            "resolution": "Used React DevTools Profiler to visually inspect component tree re-renders. Identified only the actually slow components and selectively applied React.memo/useMemo/useCallback. Achieved 70%+ render time reduction while minimizing effort"
          }
        ]
      },
      {
        "title": "Implementing Google Calendar-Style Task Display UI",
        "summary": "Implemented a calendar view supporting weekly, monthly, and 3-day display modes. Achieved rounded corner rendering, variable display areas, and scheduler support using CSS Grid/Subgrid.",
        "difficulty": "medium",
        "technologies": [
          "TypeScript",
          "React",
          "CSS"
        ],
        "highlights": [
          "Built a custom packing algorithm (row occupancy mapping with top-aligned placement) and designed a reactive update architecture using Apollo Client as SSoT",
          "Implemented 3/4/7-day variable view, drag-and-drop date changes, cross-week rounded corners, and CSS scroll snap mobile support from scratch"
        ],
        "decisions": [
          {
            "title": "Decision to build calendar UI from scratch",
            "detail": "Built the calendar UI from zero using React+CSS without library dependencies. Designed to accept variable day counts (3-day/4-day/weekly, etc.) as external parameters, ensuring the layout does not break at any day-count width"
          },
          {
            "title": "Drag-and-drop date changes and incremental save integration using Apollo Client as SSoT",
            "detail": "Designed Apollo Client cache as the Single Source of Truth (SSoT). Built a mechanism where the calendar reactively re-renders whenever the Apollo cache is updated — whether through D&D date changes or incremental saves from the edit modal"
          },
          {
            "title": "Responsive calendar UI with CSS scroll snap for mobile optimization",
            "detail": "Adopted a design that switches to a significantly different UI on mobile compared to desktop, with a slide-in task list on date tap. Applied CSS scroll snap to ensure scrolling always snaps to date boundaries, preventing stops at intermediate positions"
          }
        ],
        "outcomes": [
          {
            "before": "No calendar UI existed; work schedules were displayed only in a list format with poor overview",
            "after": "Implemented a custom calendar UI from scratch with Google Calendar-equivalent interaction. Achieved dynamic switching between 3-day/4-day/weekly views with cross-week event rounded corner display",
            "metric": "Provided a UI where users can intuitively grasp and manage work schedules. Full-scratch implementation enables flexible adaptation to requirement changes"
          },
          {
            "before": "Task date management was limited to a table-format list view, making it difficult to visually grasp the overall schedule",
            "after": "Built a Google Calendar-style UI from zero. Achieved dense packing display of multi-day/single-day tasks, D&D date changes, real-time updates via Apollo Client SSoT, responsive design (including scroll snap), and variable 3-day/4-day/7-day view switching",
            "metric": "Calendar UI completeness and usability"
          }
        ],
        "challenges": [
          {
            "title": "Rounded corner UI representation for events spanning weeks",
            "resolution": "Split events into per-week segments and dynamically applied border-radius classes based on each segment's position (first/middle/last). First segments get left rounded corners, last segments get right rounded corners, and middle segments have no rounding"
          },
          {
            "title": "Responsive layout for variable day-count views",
            "resolution": "Accepted the day count parameter as a component prop and dynamically calculated column widths in CSS Grid fr units. Event placement logic was also changed to dynamically compute grid-column positions from startDate/endDate"
          },
          {
            "title": "Packing algorithm for multi-day and single-day tasks (gap-free top-aligned layout)",
            "resolution": "Built a custom packing algorithm managing per-row occupancy state. Multi-day tasks are mapped to rows first, then single-day tasks are placed in the topmost available row. This achieved the same dense layout as Google Calendar"
          }
        ]
      },
      {
        "title": "Implementing Type-Specific Validation for Dynamic Form Structures",
        "summary": "Implemented type-specific validation using RHF+Zod for dynamically addable/removable fields (string/number/date, etc.) on templates. Achieved both processing separation and reusability between creation modals and edit screens. Supported active state control, option display control, and cross-field validation.",
        "difficulty": "high",
        "technologies": [
          "TypeScript",
          "React Hook Form",
          "Zod"
        ],
        "highlights": [
          "Implemented type-specific validation using RHF+Zod for dynamically addable/removable fields (string/number/date, etc.) on templates. Achieved both processing separation and reusability between creation modals and edit screens. Supported active state control, option display control, and cross-field validation."
        ]
      },
      {
        "title": "Implementing On-Blur Incremental Save with Diff Detection",
        "summary": "Implemented incremental save on focus-out targeting only changed fields to prevent data loss. Conducted retry testing under unstable network conditions using DevTools throttling.",
        "difficulty": "medium",
        "technologies": [
          "TypeScript",
          "React",
          "GraphQL"
        ],
        "highlights": [
          "Designed a field-level onBlur incremental save + Command Pattern architecture and implemented a failed command retry mechanism"
        ],
        "decisions": [
          {
            "title": "Adopting field-level onBlur incremental save (rejecting form-wide batch save)",
            "detail": "Adopted an incremental save approach where each field has an independent react-hook-form instance, performing an isEqual diff check on onBlur events and immediately sending a GraphQL mutation"
          },
          {
            "title": "RPC-style approach encapsulating field changes as command data",
            "detail": "Structured each field change as command data, assigned UUIDs, and sent to the backend in an RPC-style pattern. Type-defined the changeable field sets per resource type, treating change operations as serializable data"
          }
        ],
        "outcomes": [
          {
            "before": "Form-wide batch save posed risk of input data loss in factory Wi-Fi environments",
            "after": "Implemented field-level onBlur incremental save + Command Pattern + failed command retry mechanism. Designed a 3-stage improvement roadmap (localStorage persistence, Service Worker introduction, full offline support)",
            "metric": "Significantly reduced data loss risk and established future improvement plan"
          }
        ],
        "challenges": [
          {
            "title": "Data preservation in unstable factory Wi-Fi environments",
            "resolution": "Implemented field-level onBlur incremental save + failed command accumulation via useRef + retry on save button click. On network errors, form values are preserved; on client errors, values are reset to server state — a two-stage error handling approach"
          }
        ]
      },
      {
        "title": "Establishing UI Component Directory Structure and Naming Conventions",
        "summary": "Proposed and built consensus on directory structure, naming conventions, and component composition rules to improve reusability of domain-specific components. Established as shared team conventions.",
        "difficulty": "medium",
        "technologies": [
          "TypeScript",
          "React"
        ],
        "highlights": [
          "Proposed and built consensus on directory structure, naming conventions, and component composition rules to improve reusability of domain-specific components. Established as shared team conventions."
        ]
      },
      {
        "title": "Storybook-Driven UI State Visualization and Internationalization Foundation",
        "summary": "Visualized all UI states with Storybook to facilitate future display variation support. Implemented multilingual support for card UI (including English wording proposals) and established an internationalization foundation.",
        "difficulty": "medium",
        "technologies": [
          "TypeScript",
          "Storybook",
          "Playwright",
          "Vitest"
        ],
        "highlights": [
          "Visualized all UI states with Storybook to facilitate future display variation support. Implemented multilingual support for card UI (including English wording proposals) and established an internationalization foundation."
        ]
      }
    ]
  },
  {
    "id": "recruitment-saas-2022",
    "company": "HR Consulting Listed Subsidiary",
    "companyDesc": "A listed company subsidiary specializing in HR consulting and system development. Responsible for greenfield development of a multi-tenant recruitment management system.",
    "role": "Frontend Tech Lead",
    "roles": ["Frontend", "Tech Lead", "Testing"],
    "period": "2022-10 — 2024-09",
    "teamSize": 10,
    "summary": "Led frontend development of a new graduate recruitment management SaaS as tech lead for 2 years. Developed B2B (HR admin dashboard) and B2C (applicant entry interface) in a pnpm monorepo configuration. Designed and implemented core features including a Specification pattern-based dynamic form builder, Suspense-enabled dashboard, and VRT pipeline, driving quality and development efficiency improvements across a 10-person team",
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
        "title": "Team Management and Quality Assurance as Frontend Tech Lead",
        "summary": "Led task assignment, story point updates, knowledge sharing, PR review culture development, and implementation guide preparation. Introduced automated library updates with Renovate. Hosted team meetings to promote sharing of technical topics, code conventions, and screen specifications.",
        "difficulty": "high",
        "technologies": [
          "TypeScript",
          "React",
          "GitHub Actions",
          "Renovate"
        ],
        "highlights": [
          "Led the entire B2C application as an orchestrator: specification discovery, consensus-building with backend team, task decomposition, member assignment, and owning critical path items",
          "Established team quality standards through code review guideline creation, VRT environment setup, and intern mentoring"
        ],
        "decisions": [
          {
            "title": "Intern mentoring and code review-driven team quality improvement",
            "detail": "Actively conducted code reviews, mentoring intern members through feedback. Adopted an OJT approach of practically conveying coding conventions and design patterns through the review process"
          },
          {
            "title": "Single point of contact with backend team and orchestrator-style management",
            "detail": "Personally discovered all B2C application specifications in a short period and conducted thorough 1-on-1 alignment sessions with the backend team lead. After consensus, held onboarding meetings for B2C team members to explain all specifications. Functioned as a one-stop window, consolidating team questions and resolving them with the backend team"
          },
          {
            "title": "Task decomposition, dependency mapping, and member-strengths-based assignment",
            "detail": "Decomposed specifications into tasks, clarified dependencies, and created Jira tickets. Assigned tickets based on member strengths, weaknesses, skill levels, and preferences. Proactively took on items that were single points of failure (critical path) in task dependency chains"
          }
        ],
        "outcomes": [
          {
            "before": "Inconsistent frontend quality with CSS regression oversights",
            "after": "Built a visual regression testing environment with Storybook+storycap+reg-suit, automatically detecting UI diffs per PR. Also established code review guidelines",
            "metric": "Established automated UI quality assurance framework"
          }
        ],
        "challenges": [
          {
            "title": "Balancing technical debt and development velocity as FE tech lead",
            "resolution": "Built a visual regression testing environment with Storybook+storycap+reg-suit to automatically ensure UI quality. Established code review guidelines to raise quality standards across the entire team"
          },
          {
            "title": "Detailing B2C applicant application specifications within a 4-month timeframe",
            "resolution": "Led from specification detailing as tech lead. Organized applicant user flows and systematically defined transition conditions, display content, and validation rules for each status. Agile-confirmed specifications in parallel with implementation"
          },
          {
            "title": "Discovering dynamic form specification edge cases and achieving backend consensus",
            "resolution": "Decided that the zero-option case would be handled via B2B-side form configuration with customer support intervention, with the B2C application not displaying any alert. Individually reached consensus with the backend team lead on each such edge case, documented decisions, and shared with the team"
          }
        ]
      },
      {
        "title": "Applicant Entry Flow Specification and Implementation",
        "summary": "Detailed specification development and frontend implementation for the registration, job application, and selection step entry flow. Completed all feature development within a 4-month timeline, receiving high praise from the client.",
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
          "Designed a unified approach for 4 form flows using a shared DynamicForm foundation, implementing multi-page validation and transition control"
        ],
        "decisions": [
          {
            "title": "Implementing 4 B2C form flows on a shared DynamicForm foundation",
            "detail": "Adopted a design centered on form specification definition classes, sharing common useForm hooks, input component libraries, and validation systems, while individually defining only page structure, submission targets, and parameter differences per flow"
          },
          {
            "title": "Multi-page form page-level validation and transition control",
            "detail": "Managed page-level validation state with useFormState while converting between URL page indices (1-based) and array indices (0-based). Executed trigger() at page scope to block navigation to unvalidated pages"
          }
        ],
        "outcomes": [
          {
            "before": "A 4-month development timeline constraint",
            "after": "Completed all feature development within the timeline, receiving high praise from the client",
            "metric": "Development completion rate and client satisfaction"
          },
          {
            "before": "No applicant entry forms existed, with the B2C side of the recruitment management SaaS undeveloped",
            "after": "Implemented 4 form flows (registration, pre-entry, profile update, My Page tasks) on a shared DynamicForm foundation. Achieved 24 input component types, 50+ validation rules, and multi-page navigation",
            "metric": "B2C applicant form foundation completeness"
          }
        ],
        "challenges": [
          {
            "title": "Managing complex state transitions in the applicant entry flow",
            "resolution": "Created detailed state transition diagrams during specification phase to visualize all patterns. Implemented type-level prevention of invalid transitions. Completed all features within the 4-month development timeline"
          },
          {
            "title": "Mapping server-side validation errors to field level",
            "resolution": "Determined GraphQL validation errors within useEffect, separating screen-wide banner errors from field-level errors. Unified error handling through a custom useForm hook"
          }
        ]
      },
      {
        "title": "Designing and Implementing Dynamic Form Builder for HR (Specification Pattern Adoption)",
        "summary": "Implemented a form builder enabling HR staff to configure pages, headings, input fields, validation, parent-child relationships, etc. Solved class state issues with the Specification pattern while maintaining consistency with RHF. Achieved a design balancing cohesion and extensibility.",
        "difficulty": "extreme",
        "technologies": [
          "TypeScript",
          "React",
          "React Hook Form",
          "Apollo Client"
        ],
        "highlights": [
          "Designed and implemented a cross-field validation foundation with Specification pattern x 50+ Yup custom methods. Built a 3-layer form generation engine",
          "Implemented reactive option filtering with parent-child field linkage + useWatch + automatic selected value clearing"
        ],
        "decisions": [
          {
            "title": "Dynamic form validation design using the Specification pattern",
            "detail": "Adopted the Specification pattern (from Domain-Driven Design) to implement a composable design where conditions are treated as objects"
          },
          {
            "title": "Cross-field validation foundation with Specification pattern x Yup custom methods",
            "detail": "Added 50+ custom methods to Yup schemas, applied uniformly across all schema types. Declaratively described dependent fields via metadata, automatically building the dependency graph"
          },
          {
            "title": "Separating validation into a shared package in pnpm monorepo",
            "detail": "Adopted a 3-package structure with pnpm workspace: B2B, B2C, and shared. Placed the validation foundation in the shared package for re-export to B2B/B2C. Centrally managed GraphQL-derived enum definitions via an enum registry"
          },
          {
            "title": "Reload-free reactive option filtering via parent-child field linkage",
            "detail": "Used useWatch() in parent-child linked components to reactively observe parent field value changes. Passed filter functions to child components and filtered options via useMemo. A selected value resetter automatically clears invalidated selections"
          }
        ],
        "outcomes": [
          {
            "before": "Application form conditions were hardcoded, requiring code changes for every condition modification",
            "after": "Implemented declarative condition definitions using the Specification pattern, enabling HR staff to configure form conditions without code",
            "metric": "Self-service form condition changes"
          },
          {
            "before": "Form fields were hardcoded, requiring engineer implementation for every field addition or change",
            "after": "Dynamic form generation engine enables HR staff to freely configure form fields. Achieved a dynamic form foundation with 50+ validation rules, 24 input component types, cross-field validation, and reactive option filtering. Delivered to both B2B/B2C via shared package",
            "metric": "Dynamic form foundation flexibility and quality"
          }
        ],
        "challenges": [
          {
            "title": "Combinatorial explosion of condition expressions in HR dynamic forms",
            "resolution": "Adopted the Specification pattern (from DDD), designing conditions as first-class objects composable with AND/OR/NOT. Implemented JSON Schema-like declarative condition definitions"
          },
          {
            "title": "Synchronization control between cross-field validation and reactive UI",
            "resolution": "A selected value reset component detects option changes and immediately clears invalid values. Automatically built a field dependency graph, using React Hook Form's deps option to auto-trigger dependent field re-validation. Wildcard matching of array indices also handles dynamic form dependencies"
          },
          {
            "title": "Designing a schema-driven dynamic form generation engine",
            "resolution": "Designed 3-layer specification definition classes: form-level, page-level, and field-level. Each layer dynamically builds validation schemas, auto-generating per-page schemas. TypeScript type parameters also ensure form value type safety"
          }
        ]
      },
      {
        "title": "HR Dashboard Detailed Specification and Suspense-Enabled Implementation",
        "summary": "Detailed specification development and implementation of the top screen dashboard. Applied Suspense to the overall layout and 3 panel types. Identified render causes with React Profiler, improving both actual performance and perceived wait times.",
        "difficulty": "high",
        "technologies": [
          "TypeScript",
          "React",
          "Apollo Client",
          "TanStack Query"
        ],
        "highlights": [
          "Designed and implemented an independent widget data-fetching architecture (Suspense+ErrorBoundary) and custom Masonry grid algorithm"
        ],
        "decisions": [
          {
            "title": "Adopting independent widget data-fetching architecture",
            "detail": "Adopted an architecture where each widget independently fetches its data. Used Apollo Client useReadQuery to complete Suspense-compatible data fetching within each widget component"
          },
          {
            "title": "Full-scratch implementation of custom Masonry grid layout",
            "detail": "Implemented a custom grid placement algorithm. Tracked current row indices of left and right columns, placing widgets in the shorter column to achieve the Masonry effect"
          },
          {
            "title": "Widget drag-and-drop reordering with dnd-kit v6",
            "detail": "Adopted @dnd-kit/core v6.1.0 + @dnd-kit/sortable v8.0.0. Managed lists with SortableContext and controlled D&D state per widget with the useSortable hook. Implemented DragOverlay for in-motion preview display"
          }
        ],
        "outcomes": [
          {
            "before": "Dashboard data fetching used a waterfall pattern, blocking all interactions until all widgets finished loading. Gap issues in widget placement also existed",
            "after": "Achieved independent fetching + skeleton display with React Suspense + Apollo useReadQuery + Material UI Skeleton. Gap-free placement with custom Masonry grid. Implemented D&D reordering with dnd-kit v6 and 1-column/2-column toggle",
            "metric": "Improved UX where each widget independently transitions from loading to rendered. Achieved loosely coupled architecture extensible for future third-party marketplace integration"
          }
        ],
        "challenges": [
          {
            "title": "Resolving waterfall problem with 20 simultaneous widget data fetches",
            "resolution": "Migrated to Suspense-compatible data fetching using Apollo Client 3.10 useReadQuery. Wrapped each widget in a React Suspense boundary with Material UI Skeleton as fallback. Applied individual ErrorBoundary per widget to prevent a single API failure from propagating to other widgets"
          },
          {
            "title": "Custom grid layout implementation in CSS Masonry-unsupported environments",
            "resolution": "Implemented a custom placement algorithm. Tracked current row indices of left and right columns, placing each widget in the shorter column. Achieved Masonry-like gap-free placement by dynamically calculating grid-row-start/grid-row-span on CSS Grid"
          }
        ]
      },
      {
        "title": "Cross-Cutting Concerns: Error Handling, Caching, and Access Control",
        "summary": "Implemented error handling, cache reset, query header parameter injection, redirects, query batching, and auto-generated validation fixes from GraphQL schema.",
        "difficulty": "high",
        "technologies": [
          "TypeScript",
          "React",
          "Apollo Client",
          "GraphQL"
        ],
        "highlights": [
          "Implemented error handling, cache reset, query header parameter injection, redirects, query batching, and auto-generated validation fixes from GraphQL schema."
        ]
      },
      {
        "title": "Building Visual Regression Testing Environment with Storybook+storycap+reg-suit",
        "summary": "Integrated Storybook with storycap and reg-suit into GitHub Actions CI for UI regression testing. Also set up Playwright regression E2E tests in the CI environment.",
        "difficulty": "high",
        "technologies": [
          "Storybook",
          "GitHub Actions",
          "Playwright",
          "reg-suit",
          "storycap"
        ],
        "highlights": [
          "Designed and built a VRT pipeline with Storybook+storycap+reg-suit+GitHub Actions+S3, establishing a VRT culture across the team",
          "Implemented parallel B2B/B2C screenshot capture via matrix strategy, 0.1% threshold diff comparison, and automatic PR comment posting"
        ],
        "decisions": [
          {
            "title": "VRT pipeline design with Storybook v8 + storycap + reg-suit + S3",
            "detail": "Built the Storybook environment with @storybook/react-vite v8.1.5, automated screenshot capture with storycap v5.0.0, pixel diff comparison with reg-suit (0.1% threshold), result publishing to AWS S3, and a diff review flow via GitHub PR notifications"
          },
          {
            "title": "Parallel B2B/B2C VRT execution via GitHub Actions matrix strategy",
            "detail": "Designed a 2-stage pipeline where GitHub Actions matrix strategy captures B2B/B2C screenshots in parallel with storycap and uploads as artifacts, with a subsequent VRT job integrating and running reg-suit"
          }
        ],
        "outcomes": [
          {
            "before": "Unintended UI changes (CSS regressions) were discovered only after release",
            "after": "storycap+reg-suit automatically compares screenshots per PR, enabling 100% pre-merge detection of CSS regressions",
            "metric": "CSS regression detection rate"
          },
          {
            "before": "UI change quality verification relied solely on manual visual inspection, with overlooked regression bugs discovered post-release",
            "after": "Built a VRT pipeline with Storybook v8.1.5 + storycap + reg-suit + GitHub Actions + S3. Automatically compared screenshots of all UI components across B2B (215 stories) and B2C (49 pages) per PR",
            "metric": "Automated visual regression detection at 0.1% pixel diff threshold. PR comment-based diff image review became standard, reducing post-release UI regression bugs"
          }
        ],
        "challenges": [
          {
            "title": "Stabilizing storycap timeout and asset waiting",
            "resolution": "Set screenshot: { waitAssets: true } as a default parameter in preview.tsx to wait for asset loading completion. Configured serverTimeout 60000ms and captureTimeout 15000ms for storycap execution. Adjusted per-story delays to build a stable screenshot environment"
          },
          {
            "title": "Establishing VRT culture across the team",
            "resolution": "Introduced PR comment-based diff image display via reg-notify-github-plugin and established a team rule to include diffs in reviews. Promoted component development on Storybook, building a development process where story creation naturally integrates as part of VRT"
          }
        ]
      },
      {
        "title": "Migration from react-admin to Apollo Client/RHF/MUI and GraphQL Suspense Introduction",
        "summary": "Proposed and drove the migration from react-admin to Apollo Client, RHF, and MUI to improve development efficiency. Evaluated and fully adopted GraphQL Suspense and React Suspense for display speed improvements.",
        "difficulty": "high",
        "technologies": [
          "React",
          "React Hook Form",
          "MUI",
          "Apollo Client",
          "GraphQL"
        ],
        "highlights": [
          "Proposed and drove the migration from react-admin to Apollo Client, RHF, and MUI to improve development efficiency. Evaluated and fully adopted GraphQL Suspense and React Suspense for display speed improvements."
        ]
      },
      {
        "title": "Smoke Test Team Leader and Testing Facilitation",
        "summary": "Served as testing phase leader, proactively taking on the driver role. Shared screen and transition specifications when other members drove. Led bug ticket creation and test status management.",
        "difficulty": "medium",
        "technologies": [
          "Playwright"
        ],
        "highlights": [
          "Served as testing phase leader, proactively taking on the driver role. Shared screen and transition specifications when other members drove. Led bug ticket creation and test status management."
        ]
      }
    ]
  },
  {
    "id": "mobile-order-app-2022",
    "company": "Mobile Order Application Company",
    "companyDesc": "A company developing and selling mobile ordering applications for restaurants. Responsible for LIFF, native app, and backend development.",
    "role": "LIFF Frontend / Native App / Backend Engineer",
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
        "title": "Multi-Platform Frontend Development: Web/LIFF/Native App",
        "summary": "Handled all development across Web (Next.js), LIFF app, and native app (React Native/Expo). Implemented a wide range of domain logic including order management, store LINE integration, POS integration, inventory management, and closing processes.",
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
          "Handled all development across Web (Next.js), LIFF app, and native app (React Native/Expo). Implemented a wide range of domain logic including order management, store LINE integration, POS integration, inventory management, and closing processes."
        ]
      },
      {
        "title": "Mobile Order Internationalization (English & Chinese)",
        "summary": "Researched English and Chinese app UIs with the premise that logos and text display should not break regardless of user device, and that meanings should be concisely understandable. Iterated on UI improvements through prototyping and discussions with designers and the PO.",
        "difficulty": "medium",
        "technologies": [
          "TypeScript",
          "React",
          "LIFF"
        ],
        "highlights": [
          "Researched English and Chinese app UIs with the premise that logos and text display should not break regardless of user device, and that meanings should be concisely understandable. Iterated on UI improvements through prototyping and discussions with designers and the PO."
        ]
      },
      {
        "title": "POS System Interim Closing Implementation (Shared Logic with Final Closing & Unit Tests)",
        "summary": "Extracted shared processing between interim and final closing, resolved variable naming inconsistencies. Added unit tests to achieve a low-debt implementation.",
        "difficulty": "medium",
        "technologies": [
          "TypeScript",
          "NestJS",
          "GraphQL",
          "Jest"
        ],
        "highlights": [
          "Extracted shared processing between interim and final closing, resolved variable naming inconsistencies. Added unit tests to achieve a low-debt implementation."
        ]
      },
      {
        "title": "Kitchen Display Order Status Aggregation by Table, Menu Item, and Time Period",
        "summary": "Implemented features and UI improvements for the kitchen display. Built aggregation of order status by table, menu item, and time period.",
        "difficulty": "medium",
        "technologies": [
          "TypeScript",
          "Hasura",
          "GraphQL",
          "React Native"
        ],
        "highlights": [
          "Implemented features and UI improvements for the kitchen display. Built aggregation of order status by table, menu item, and time period."
        ]
      }
    ]
  },
  {
    "id": "board-management-app-2022",
    "company": "Board of Directors DX Service Company",
    "companyDesc": "A company providing SaaS for digitizing board of directors operations. Responsible for frontend and backend development of the board management service.",
    "role": "Frontend / Backend Engineer",
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
        "title": "UI Component Implementation and Storybook Organization (Atomic Design)",
        "summary": "Reorganized Storybook directory structure following Atomic Design to solve the low discoverability and searchability of UI components. Cataloged all UI components in Storybook to improve screen implementation efficiency.",
        "difficulty": "medium",
        "technologies": [
          "TypeScript",
          "React",
          "Tailwind CSS",
          "Storybook"
        ],
        "highlights": [
          "Reorganized Storybook directory structure following Atomic Design to solve the low discoverability and searchability of UI components. Cataloged all UI components in Storybook to improve screen implementation efficiency."
        ]
      },
      {
        "title": "Document Preparation Assistant and Written Resolution Screen Implementation with E2E Tests",
        "summary": "Detailed implementation of document preparation assistant and written resolution screens. Ensured quality through Playwright E2E test implementation.",
        "difficulty": "medium",
        "technologies": [
          "TypeScript",
          "React",
          "Playwright"
        ],
        "highlights": [
          "Detailed implementation of document preparation assistant and written resolution screens. Ensured quality through Playwright E2E test implementation."
        ]
      },
      {
        "title": "Backend Implementation of Scheduling Feature",
        "summary": "Backend implementation of the scheduling feature using Node.js/Express/GraphQL/Prisma.",
        "difficulty": "medium",
        "technologies": [
          "Node.js",
          "Express",
          "Prisma",
          "GraphQL"
        ],
        "highlights": [
          "Backend implementation of the scheduling feature using Node.js/Express/GraphQL/Prisma."
        ]
      }
    ]
  },
  {
    "id": "freelance-web-2021",
    "company": "Freelance",
    "companyDesc": "Contracted multiple SPA website development projects as a freelancer. Delivered for 4 clients: a web design agency, a recruitment company, a data analytics firm, and a restaurant.",
    "role": "Frontend Engineer",
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
        "title": "React/Next.js SPA Website Development (4 Projects)",
        "summary": "Developed SPA websites for a web design agency, recruitment company, data analytics firm, and restaurant. Handled frontend application integration with CMS (WordPress/Contentful, etc.) and hosting on Vercel/Netlify/S3.",
        "difficulty": "medium",
        "technologies": [
          "TypeScript",
          "JavaScript",
          "React",
          "Next.js",
          "Amazon S3"
        ],
        "highlights": [
          "Developed SPA websites for a web design agency, recruitment company, data analytics firm, and restaurant. Handled frontend application integration with CMS (WordPress/Contentful, etc.) and hosting on Vercel/Netlify/S3."
        ]
      }
    ]
  },
  {
    "id": "bitkey-data-2020",
    "company": "Bitkey, Inc.",
    "companyDesc": "A smart lock startup. Responsible for building internal data lake and dashboards, as well as town portal site development.",
    "role": "Data Engineer / Frontend Engineer",
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
        "title": "Company-Wide Shared KPI Definition and Design",
        "summary": "Organized KPIs related to management, product, sales, quality, and usage, defining the set of metrics to be shared across all employees. Led metric design to foster a cross-team culture of collaborative insight.",
        "difficulty": "high",
        "technologies": [
          "Python",
          "SQL",
          "BigQuery"
        ],
        "highlights": [
          "Organized KPIs related to management, product, sales, quality, and usage, defining the set of metrics to be shared across all employees. Led metric design to foster a cross-team culture of collaborative insight."
        ]
      },
      {
        "title": "Building Data Aggregation Pipeline from Multiple Sources to BigQuery",
        "summary": "Implemented scheduled jobs on AWS Lambda and Cloud Functions to aggregate data scattered across Amazon Redshift, Amazon Aurora, Salesforce, and Cloud Firestore into BigQuery. Also handled semi-structured data transformation and automated aggregation.",
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
          "Implemented scheduled jobs on AWS Lambda and Cloud Functions to aggregate data scattered across Amazon Redshift, Amazon Aurora, Salesforce, and Cloud Firestore into BigQuery. Also handled semi-structured data transformation and automated aggregation."
        ]
      },
      {
        "title": "Google Data Portal Dashboard Design, Implementation, and Company-Wide Adoption",
        "summary": "Designed and implemented dashboards in Google Data Portal, continuously visualizing sales, quality, and usage metrics. Drove data-driven culture adoption through office entrance panel installation, employee portal placement, and weekly meeting presentations.",
        "difficulty": "medium",
        "technologies": [
          "SQL",
          "BigQuery",
          "Google Data Portal"
        ],
        "highlights": [
          "Designed and implemented dashboards in Google Data Portal, continuously visualizing sales, quality, and usage metrics. Drove data-driven culture adoption through office entrance panel installation, employee portal placement, and weekly meeting presentations."
        ]
      },
      {
        "title": "Town Portal Site UI Component Implementation",
        "summary": "A town portal site for resident information sharing in a smart lock-equipped new town development. Implemented shared UI components across multiple screens in collaboration with UI designers. Created a UI catalog with Storybook.",
        "difficulty": "medium",
        "technologies": [
          "TypeScript",
          "React",
          "MUI",
          "Storybook"
        ],
        "highlights": [
          "A town portal site for resident information sharing in a smart lock-equipped new town development. Implemented shared UI components across multiple screens in collaboration with UI designers. Created a UI catalog with Storybook."
        ]
      }
    ]
  },
  {
    "id": "simplex-banking-2019",
    "company": "Simplex Inc.",
    "companyDesc": "A systems integrator specializing in financial system development. Responsible for development, testing, and maintenance of a risk management system for a major bank and a new registration application for an insurance company.",
    "role": "Frontend Engineer / Tester / Maintenance Operations",
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
        "title": "VBA Excel Frontend Application with Java JSON API Integration",
        "summary": "Developed an application that communicates with a Java JSON API via VBA and displays data in Excel. Implemented dynamic column addition based on JSON response data, with Excel formulas embedded in each column. Focused on readable naming conventions.",
        "difficulty": "high",
        "technologies": [
          "Java",
          "VBA",
          "Bash"
        ],
        "highlights": [
          "Developed an application that communicates with a Java JSON API via VBA and displays data in Excel. Implemented dynamic column addition based on JSON response data, with Excel formulas embedded in each column. Focused on readable naming conventions."
        ]
      },
      {
        "title": "On-Site Testing, Release Operations, Maintenance, and Client Support",
        "summary": "Handled on-site testing and release operations using shell commands and AWS. Led client email inquiry handling, enhancement project basic design, bug ticket creation, and status confirmation in regular meetings.",
        "difficulty": "medium",
        "technologies": [
          "Java",
          "Bash"
        ],
        "highlights": [
          "Handled on-site testing and release operations using shell commands and AWS. Led client email inquiry handling, enhancement project basic design, bug ticket creation, and status confirmation in regular meetings."
        ]
      },
      {
        "title": "Vue.js Frontend Implementation for Insurance Company Registration Application",
        "summary": "Refined help tooltip and modal specifications with the designer and implemented them across all input fields on every screen. Implemented user input UI across multiple screens. Managed business scenario testing and system testing.",
        "difficulty": "medium",
        "technologies": [
          "TypeScript",
          "JavaScript",
          "Vue.js"
        ],
        "highlights": [
          "Refined help tooltip and modal specifications with the designer and implemented them across all input fields on every screen. Implemented user input UI across multiple screens. Managed business scenario testing and system testing."
        ]
      }
    ]
  },
  {
    "id": "graph-intern-2018",
    "company": "Graph, Inc.",
    "companyDesc": "A data analytics and AI development company (internship). Responsible for apparel e-commerce recommendation engine development, automotive manufacturer data analysis, and chatbot development.",
    "role": "Data Engineer (Intern)",
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
        "title": "Apparel E-Commerce Recommendation Engine Prototype (3 Algorithm Types)",
        "summary": "Developed a recommendation engine prototype for product suggestions displayed on the top page, product pages, and cart. Applied content-based filtering and collaborative filtering for new customers, existing customers, and product pages respectively, with serendipity considerations in the design.",
        "difficulty": "high",
        "technologies": [
          "Python",
          "pandas",
          "NumPy",
          "SQL"
        ],
        "highlights": [
          "Developed a recommendation engine prototype for product suggestions displayed on the top page, product pages, and cart. Applied content-based filtering and collaborative filtering for new customers, existing customers, and product pages respectively, with serendipity considerations in the design."
        ]
      },
      {
        "title": "Customer Classification Using k-Nearest Neighbors and Purchase Behavior Analysis",
        "summary": "Classified existing customers using k-nearest neighbors for the apparel e-commerce executive team's marketing strategy planning. Performed basic aggregation of purchase behavior (product category sales, etc.) by customer segment.",
        "difficulty": "medium",
        "technologies": [
          "Python",
          "pandas",
          "NumPy",
          "SQL"
        ],
        "highlights": [
          "Classified existing customers using k-nearest neighbors for the apparel e-commerce executive team's marketing strategy planning. Performed basic aggregation of purchase behavior (product category sales, etc.) by customer segment."
        ]
      },
      {
        "title": "Full-Stack Development and Deployment of Demo Chatbot",
        "summary": "Determined design specifications, implemented screens and API (Python/Flask) for a demo chatbot. Deployed the application to S3 and EC2.",
        "difficulty": "medium",
        "technologies": [
          "JavaScript",
          "Flask",
          "Amazon S3",
          "Amazon EC2",
          "Python"
        ],
        "highlights": [
          "Determined design specifications, implemented screens and API (Python/Flask) for a demo chatbot. Deployed the application to S3 and EC2."
        ]
      }
    ]
  }
];
