// Auto-generated from cv-details.ts
// Simplified Chinese (zh-CN) translation of CV data

import type { CVProject } from './cv-details';

export const cvProjectsZh: CVProject[] = [
  {
    "id": "ai-translation-tools-2025",
    "company": "生成式AI翻译SaaS",
    "companyDesc": "AI翻译SaaS的翻译后处理微服务群的设计与实现项目",
    "role": "后端工程师（微服务设计与实现）",
    "roles": ["Backend", "Infra", "Testing"],
    "period": "2025/04 — 2025/09",
    "teamSize": 5,
    "summary": "基于FastAPI + Celery + PostgreSQL + Redis架构的翻译后处理微服务群。负责post-validation服务的设计与实现，同时推进前端开发环境现代化、Docker/GHCR部署基础设施搭建、OpenAPI Mock自动生成、E2E测试环境等开发基础设施的全面整备",
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
        "title": "翻译后处理状态机设计与容错任务基础设施的构建",
        "summary": "通过9状态的状态机管理翻译后的质量检查与重新翻译流程，将各步骤的结果以不可变数据形式记录到数据库中。由此实现了翻译精度出现问题时仅通过SQL即可进行原因分析，同时处理进度也可通过API即时确认。各步骤以幂等的Celery任务方式实现，即使容器发生故障，也能从数据库恢复队列信息并重新开始处理的容错设计",
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
          "将状态转换逻辑与业务逻辑完全分离，设计并实现了松耦合且易于维护的架构"
        ],
        "decisions": [
          {
            "title": "通过状态机控制翻译验证流程",
            "detail": "采用9状态的状态机控制翻译检查到重新翻译的循环。通过将状态转换逻辑与业务逻辑分离，实现了修改条件分支不会影响其他步骤的松耦合结构"
          },
          {
            "title": "以可观测性为核心的不可变Schema设计",
            "detail": "采用将所有步骤结果以不可变数据形式记录到数据库的方案。翻译精度出现问题时可通过SQL分析原因，未来AI模型改进也可直接利用这些数据。同时处理进度仅通过DB SELECT即可掌握，减轻了开发者动作确认和业务方翻译质量检查的双重负担"
          },
          {
            "title": "基于幂等Celery任务的容错设计",
            "detail": "将各状态转换步骤以幂等的Celery任务方式实现。通过指数退避+抖动的重试配置，API轮询部分也可安全重试。即使容器本身崩溃导致Redis队列丢失，也能从数据库中记录的状态恢复队列信息并重新开始处理"
          }
        ],
        "outcomes": [
          {
            "before": "翻译后处理的进度状况如同黑箱，只能通过目视日志确认动作",
            "after": "通过单个API即可确认处理状况。翻译精度问题也可通过SQL进行原因分析，减少了开发者和业务方双方的确认工时",
            "metric": "可观测性的提升与故障恢复能力"
          }
        ],
        "challenges": [
          {
            "title": "容器故障时的处理恢复设计",
            "resolution": "由于Redis队列具有易失性，构建了容器重启时从数据库状态恢复正确队列信息的机制。通过将各任务设计为幂等，实现了可从中途安全恢复"
          },
          {
            "title": "状态转换逻辑与业务逻辑的分离",
            "resolution": "将状态转换的条件分支与各步骤内的业务逻辑完全作为独立模块管理。实现了修改任何一方都不会相互影响的松耦合设计，确保了可维护性"
          }
        ]
      },
      {
        "title": "防回归手动测试规格书的编写与AI辅助测试方针的制定",
        "summary": "为首次发布后的重构准备了防回归手动测试规格书。诚实评估了生成式AI（agent-browser）非确定性行为的可靠性限制，制定了从手动测试到E2E测试再到组件测试的分阶段迁移方针。对与OnlyOffice编辑器（Canvas实现）紧密耦合的部分做出了放弃E2E测试、限定为手动测试的务实判断",
        "difficulty": "medium",
        "technologies": [
          "Storybook",
          "Playwright",
          "Vitest",
          "React Testing Library",
          "agent-browser"
        ],
        "highlights": [
          "评估了生成式AI非确定性行为的可靠性限制，制定了分阶段测试自动化方针（手动测试→E2E→组件测试）"
        ],
        "decisions": [
          {
            "title": "基于生成式AI（agent-browser）非确定性行为的测试方针制定",
            "detail": "制定了分阶段推进测试自动化的方针，而非无序地让AI执行手动测试。(1)首先通过手动测试规格书体系化手动测试，(2)迁移至确定性的E2E测试和组件测试，(3)agent-browser仅用于生成确定性的E2E测试代码而非执行手动测试"
          },
          {
            "title": "OnlyOffice编辑器（Canvas实现）紧密耦合UI的测试方针",
            "detail": "判断对OnlyOffice编辑器进行Fake化会降低测试有效性。由于基于Canvas DOM相对位置的E2E测试容易不稳定，诚实地决定对OnlyOffice紧密耦合部分放弃E2E测试，限定为手动测试"
          }
        ],
        "outcomes": [
          {
            "before": "重构时缺乏防回归手段，测试方针也未制定",
            "after": "编写了防回归手动测试规格书并体系化了手动测试。在诚实评估生成式AI可靠性限制的基础上，制定了从手动测试到E2E测试再到组件测试的分阶段迁移方针。对OnlyOffice紧密耦合部分限定为手动测试的务实判断已文档化",
            "metric": "测试策略的体系化与质量保障体制"
          }
        ],
        "challenges": [
          {
            "title": "与Canvas实现的OnlyOffice编辑器紧密耦合的UI测试自动化限制判断",
            "resolution": "将测试对象明确分离为「可自动化的领域」和「需要手动测试的领域」。OnlyOffice紧密耦合部分通过手动测试规格书覆盖，其余UI和API逻辑则通过E2E和组件测试实现自动化"
          }
        ]
      },
      {
        "title": "翻译验证功能的术语表设计与Clean Architecture设计",
        "summary": "设计了翻译验证功能整体的领域模型、术语表数据结构、Clean Architecture（UseCase/Repository/Domain分离）。通过将生成式AI的决策持久化到数据库的Schema设计，确保了验证流程的可观测性",
        "difficulty": "high",
        "technologies": [
          "Python",
          "FastAPI",
          "PostgreSQL"
        ],
        "highlights": [
          "以UseCase/Repository/Domain分离的Clean Architecture设计了翻译验证逻辑整体，使团队成员的任务分配更加容易"
        ],
        "decisions": [
          {
            "title": "采用UseCase/Repository/Domain三层分离架构",
            "detail": "将翻译验证逻辑分离为UseCase（业务流程控制）/Repository（数据访问抽象化）/Domain（领域模型与验证）三层。通过将生成式AI的调用封装在UseCase层内，限定了AI模型变更时的影响范围"
          },
          {
            "title": "将生成式AI决策持久化到数据库的Schema设计",
            "detail": "采用将生成式AI在各验证步骤中做出的判定（翻译质量分数、是否需要重新翻译、术语修改建议）全部以数据库记录形式持久化的设计。作为未来AI模型精度比较和Prompt改进所需数据的积累基础"
          }
        ],
        "outcomes": [
          {
            "before": "翻译验证逻辑处于无设计状态，团队内缺乏任务分配标准",
            "after": "通过三层架构明确了各层的职责。构建了团队成员可以并行开发Repository层和UseCase层的体制，设计文档作为任务分配标准发挥了作用",
            "metric": "建立了支持4名成员并行开发的设计基础"
          }
        ],
        "challenges": [
          {
            "title": "将生成式AI的非确定性输出纳入领域模型的设计",
            "resolution": "将AI的输出定义为「判定结果」类型，设计了在Domain层验证后持久化到数据库的流程。即使AI的输出格式发生变化，也能在Domain层的验证中吸收"
          }
        ]
      },
      {
        "title": "术语表使用示例检索中的准完全匹配算法实现",
        "summary": "在翻译术语表的使用示例检索中，实现了允许书写变体、助词差异和标点差异的同时返回语义准确匹配的算法。解决了全文搜索精度不足和完全匹配检索遗漏频发的问题",
        "difficulty": "high",
        "technologies": [
          "Python",
          "PostgreSQL"
        ],
        "highlights": [
          "设计了介于全文搜索和完全匹配之间的「准完全匹配」检索逻辑，在允许书写变体的同时实现了高精度术语检索"
        ],
        "decisions": [
          {
            "title": "设计既非全文搜索也非完全匹配的「准完全匹配」方式",
            "detail": "PostgreSQL的全文搜索（tsvector）因日语助词和标点差异导致过度命中，完全匹配则因书写变体导致检索遗漏频发。采用在正规化处理（去除标点、统一空格、允许助词模式）后进行字符串比较的中间方式，兼顾了精确率和召回率"
          }
        ],
        "outcomes": [
          {
            "before": "全文搜索会命中与翻译术语无关的句子，完全匹配则因书写变体无法检索到目标使用示例",
            "after": "通过准完全匹配算法，在允许书写变体、助词差异和标点差异的同时仅返回语义准确的使用示例，大幅提升了术语表的实用性",
            "metric": "术语表检索精度的提升（误命中减少与召回率改善的兼顾）"
          }
        ],
        "challenges": [
          {
            "title": "日语文本书写变体模式的体系化",
            "resolution": "从翻译对象文档中收集并分类高频书写变体模式（标点「、」「，」混用、助词「は」「が」互换、全角半角混用）。以正规化规则实现，并通过测试用例全面验证"
          }
        ]
      },
      {
        "title": "将Celery任务的串行网络IO通过asyncio并行化",
        "summary": "将翻译API、术语表API等多个外部服务的串行网络IO改为asyncio事件循环的并行执行。确立了Celery同步Worker模型与asyncio安全集成的模式，改善了延迟和吞吐量",
        "difficulty": "high",
        "technologies": [
          "Python",
          "Celery",
          "asyncio"
        ],
        "highlights": [
          "确立了在Celery同步Worker内安全启动asyncio事件循环的模式，将串行的外部API调用并行化"
        ],
        "decisions": [
          {
            "title": "采用在Celery同步Worker内集成asyncio事件循环的模式",
            "detail": "在保持Celery同步Worker（prefork）模型的同时，采用在任务内通过asyncio.run()启动事件循环的模式。将Celery本身改为async Worker的方案因生态系统兼容性风险高而不采用，线程池（ThreadPoolExecutor）因IO等待时线程被无谓占用的问题也不采用"
          }
        ],
        "outcomes": [
          {
            "before": "对翻译API和术语表API的调用为串行执行，3个外部API按顺序等待导致单次请求的处理时间较长",
            "after": "通过asyncio.gather将外部API调用改为并行执行。将串行执行时各API响应时间之和的处理时间，缩短至最慢API的响应时间",
            "metric": "外部API调用部分的延迟降低与吞吐量提升"
          }
        ],
        "challenges": [
          {
            "title": "Celery同步执行模型与asyncio的共存",
            "resolution": "由于Celery的prefork Worker基于进程，采用在每个任务内新建asyncio事件循环并用完即弃的方式。通过将事件循环的生命周期限定在任务作用域内，排除了Worker间的干扰"
          }
        ]
      },
      {
        "title": "内容控件标注的文本匹配算法优化",
        "summary": "为在文档中的翻译目标位置准确标注标记，优化了原文文本与文档结构之间的匹配算法。在大规模文档中兼顾了匹配精度和性能",
        "difficulty": "extreme",
        "technologies": [
          "Python"
        ],
        "highlights": [
          "优化了搜索算法，在大规模文档中也能在保持精度的同时达到实用的处理速度"
        ],
        "decisions": [
          {
            "title": "通过分阶段匹配策略削减搜索空间",
            "detail": "采用完全匹配→正规化匹配→部分匹配三个阶段依次执行原文文本与文档结构（段落、单元格、列表项）之间匹配的策略。通过将上阶段确定的位置从搜索空间中排除，在削减计算量的同时保持了精度"
          }
        ],
        "outcomes": [
          {
            "before": "大规模文档（超过100页）匹配处理耗时较长，内容控件的标注精度也存在问题",
            "after": "通过分阶段匹配策略在大规模文档中也实现了实用的处理速度。匹配精度也得到提升，翻译目标位置标记标注的可靠性得到改善",
            "metric": "大规模文档匹配速度改善与精度提升"
          }
        ],
        "challenges": [
          {
            "title": "文档结构分割粒度与匹配精度的权衡",
            "resolution": "按Word文档的内部结构（段落、表格单元格、列表项、页眉/页脚）调整文本分割粒度。分割过细会增加匹配候选导致变慢，过粗则降低部分匹配的精度，通过按元素类型制定分割规则解决了此问题"
          }
        ]
      },
      {
        "title": "前端开发环境现代化",
        "summary": "一次性向现有前端引入Vite、Vitest、Storybook、Biome和Playwright，全面革新了开发体验和代码质量基础。整备了构建速度改善、单元测试、UI目录、代码检查/格式化工具、E2E测试的工具链",
        "difficulty": "high",
        "technologies": [
          "Vite",
          "Vitest",
          "Storybook",
          "Biome",
          "Playwright"
        ],
        "highlights": [
          "引入Vite/Vitest/Storybook/Biome/Playwright五大工具，从零构建了测试、质量管理和UI目录的基础设施"
        ],
        "decisions": [
          {
            "title": "选择Vite + Biome（摆脱webpack + ESLint/Prettier）",
            "detail": "将现有基于webpack的构建环境迁移至Vite，将ESLint+Prettier统合为Biome。通过Vite的热重载速度和Biome的高速lint/format，大幅改善了开发迭代速度"
          },
          {
            "title": "引入Volta统一Node.js版本管理",
            "detail": "通过Volta解决了团队内Node.js版本不一致导致的构建错误频发问题。在项目根目录固定版本，消除了成员间的环境差异"
          }
        ],
        "outcomes": [
          {
            "before": "单元测试、UI目录、代码检查工具、E2E测试均不存在，缺乏客观验证代码质量的手段",
            "after": "综合引入Vite（构建）、Vitest（单元测试）、Storybook（UI目录）、Biome（lint/format）、Playwright（E2E）五大工具，全面革新了开发基础设施",
            "metric": "测试与质量管理基础设施的建立（从零开始构建）"
          }
        ],
        "challenges": [
          {
            "title": "现有PHP项目与Vite的共存",
            "resolution": "在不破坏现有PHP+jQuery环境的前提下，设计了仅React部分由Vite管理的混合架构。构建了Vite的构建输出可从PHP模板加载的配置，实现了渐进式迁移"
          }
        ]
      },
      {
        "title": "从Python后端OpenAPI规范自动生成前端Mock",
        "summary": "以FastAPI自动生成的OpenAPI规范文档为源，构建了使用MSW（Mock Service Worker）和Orval自动生成TypeScript类型定义、API客户端和Mock Handler的机制。使得前端开发无需等待后端实现完成",
        "difficulty": "high",
        "technologies": [
          "MSW",
          "Orval",
          "FastAPI",
          "Storybook"
        ],
        "highlights": [
          "构建了从OpenAPI规范自动生成类型定义、API客户端和Mock的Pipeline，消除了前端对后端的依赖"
        ],
        "decisions": [
          {
            "title": "以OpenAPI规范为Single Source of Truth的Mock自动生成Pipeline",
            "detail": "以FastAPI自动生成的OpenAPI规范文档为唯一可信源，设计了通过Orval生成TypeScript类型定义和API客户端、通过MSW生成Mock Handler的Pipeline。手动编写Mock的方式难以追踪API变更，因此通过从规范文档自动生成同时保证类型安全性和Mock新鲜度"
          }
        ],
        "outcomes": [
          {
            "before": "前端开发需要等待后端API实现完成，无法并行开发",
            "after": "通过从OpenAPI规范自动生成Mock，在后端API定义确定的时间点即可开始前端开发。Mock API在Storybook上也可运行，无需后端即可完成UI动作确认",
            "metric": "建立前后端开发并行性"
          }
        ],
        "challenges": [
          {
            "title": "OpenAPI Schema与Orval/MSW类型一致性的维护",
            "resolution": "在CI上自动化从OpenAPI Schema的重新生成，构建了后端API变更时前端类型定义和Mock自动跟踪的机制。类型不一致可通过TypeScript编译错误立即检测"
          }
        ]
      },
      {
        "title": "Docker Compose + GHCR的拉取式部署基础设施构建",
        "summary": "编写了Docker Compose构建→推送至GHCR→生产服务器拉取式部署的一系列自动化脚本。整备了GHCR的镜像管理、可见性设置、权限设置，以及生产服务器上基于cron的拉取部署",
        "difficulty": "high",
        "technologies": [
          "Docker",
          "GitHub Actions"
        ],
        "highlights": [
          "从手动SSH+SCP部署迁移到Docker Compose+GHCR拉取式部署，建立了可重现的部署流程"
        ],
        "decisions": [
          {
            "title": "采用GHCR拉取式部署（从手动SSH+SCP方式迁移）",
            "detail": "从开发者通过SSH登录服务器并用SCP上传文件的部署方式，迁移到向GHCR推送镜像并由生产服务器通过cron拉取的拉取式部署。确保了部署的可重现性，回滚也可通过切换镜像标签即时实现"
          },
          {
            "title": "GHCR可见性/权限设置与镜像管理的设计",
            "detail": "在Organization级别管理GitHub Container Registry的镜像可见性，整备了生产服务器拉取所需的权限设置（Personal Access Token + read:packages scope）。同时设计了镜像标签命名规则"
          }
        ],
        "outcomes": [
          {
            "before": "部署依赖手动SSH+SCP且属人化，存在操作失误导致故障的风险。也没有回滚手段",
            "after": "通过Docker Compose+GHCR拉取式部署确保了可重现性。基于cron的自动拉取和镜像标签管理使回滚也变得容易",
            "metric": "部署自动化与可重现性的建立"
          }
        ],
        "challenges": [
          {
            "title": "基于cron的拉取部署的可靠性保障",
            "resolution": "在拉取脚本中嵌入健康检查、镜像差异检测和回滚功能，设计为新镜像拉取失败时维持现有容器运行"
          }
        ]
      },
      {
        "title": "通过Docker环境变量控制OnlyOffice服务器的TLS/CORS设置",
        "summary": "将OnlyOffice文档服务器的TLS证书设置和CORS Origin设置配置为可通过Docker启动时的脚本注入从环境变量进行设置。使不同环境间的设置切换变得容易",
        "difficulty": "medium",
        "technologies": [
          "Docker"
        ],
        "highlights": [
          "采用不直接编辑OnlyOffice配置文件，而是通过启动脚本注入从环境变量控制的方案"
        ],
        "decisions": [
          {
            "title": "通过脚本注入方式实现OnlyOffice设置外部化",
            "detail": "直接挂载OnlyOffice配置文件的方式在版本升级时会出现兼容性问题，因此采用在Docker启动时通过entrypoint脚本从环境变量动态生成配置文件的方式。实现了TLS证书路径和CORS Origin可通过环境变量切换"
          }
        ],
        "outcomes": [
          {
            "before": "OnlyOffice的TLS/CORS设置硬编码在配置文件中，环境切换时需要手动编辑",
            "after": "实现了通过Docker环境变量控制TLS证书路径和CORS Origin，自动化了开发、预发布和生产环境的设置切换",
            "metric": "环境切换自动化与设置外部化"
          }
        ]
      },
      {
        "title": "本地/远程混合E2E开发环境的搭建步骤文档化",
        "summary": "将本地React+Python与远程服务器上PHP联动的E2E开发环境搭建步骤整理为可重现的文档。编写了包含Docker Compose、网络设置和环境变量管理的步骤文档，提升了新成员的入职效率",
        "difficulty": "medium",
        "technologies": [
          "Docker",
          "Python",
          "FastAPI"
        ],
        "highlights": [
          "将本地/远程混合环境的重现步骤文档化，减少了新成员的环境搭建工时"
        ],
        "decisions": [
          {
            "title": "通过Docker Compose集成实现环境搭建步骤标准化",
            "detail": "将本地React+Python容器与远程服务器上PHP+OnlyOffice联动所需的Docker Compose网络设置、环境变量模板和连接确认步骤汇总到一份文档中。目标是新成员按文档执行即可重现E2E环境"
          }
        ],
        "outcomes": [
          {
            "before": "环境搭建步骤依赖口头传达且属人化，新成员的环境搭建需要1-2天",
            "after": "通过可重现的步骤文档消除了环境搭建步骤的属人化。整备了包含Docker Compose、网络设置和环境变量的逐步文档",
            "metric": "新成员入职效率的提升"
          }
        ]
      },
      {
        "title": "Playwright E2E测试环境搭建与测试场景实现",
        "summary": "使用Playwright构建了覆盖React/Python/OnlyOffice联动翻译工作流全流程的E2E测试环境。由于OnlyOffice的Canvas元素存在E2E测试的限制，明确区分了可测试范围和手动测试范围",
        "difficulty": "high",
        "technologies": [
          "Playwright",
          "Docker"
        ],
        "highlights": [
          "实现了覆盖翻译工作流全流程的回归测试场景，明确区分了可自动化范围和手动测试范围"
        ],
        "decisions": [
          {
            "title": "明确界定测试对象的可自动化领域与手动测试领域",
            "detail": "由于依赖OnlyOffice编辑器Canvas元素的操作难以通过Playwright进行稳定的E2E测试，将测试对象分为「翻译工作流的操作流程和API联动」与「OnlyOffice内的文档操作」，制定了仅前者通过E2E测试覆盖的方针"
          }
        ],
        "outcomes": [
          {
            "before": "没有E2E测试环境，功能添加和重构时的回归测试仅依赖手动",
            "after": "使用Playwright实现了翻译工作流全流程（文件上传→翻译执行→结果确认）的回归测试场景。Docker环境内React+Python+PostgreSQL的集成测试可自动执行",
            "metric": "通过E2E测试实现回归测试自动化（覆盖可测试领域）"
          }
        ],
        "challenges": [
          {
            "title": "React+Python+OnlyOffice三服务联动测试环境的构建",
            "resolution": "通过Docker Compose统合启动三个服务，设计了Playwright测试运行器可访问的网络架构。将测试用初始数据注入和清理作为Fixture管理，确保了测试的独立性"
          }
        ]
      },
      {
        "title": "开发效率化仪表盘与日志聚合MCP和Story生成Agent的构建",
        "summary": "创建了可视化Celery任务执行状况和翻译验证成功/失败率的仪表盘。同时构建了可从Claude Code搜索分布式环境日志的MCP服务器，以及从组件自动生成Storybook Story的子Agent，提升了开发效率",
        "difficulty": "medium",
        "technologies": [
          "Python",
          "Storybook",
          "agent-browser"
        ],
        "highlights": [
          "构建了MCP服务器日志搜索和Story自动生成Agent等基于AI工具的开发支持基础设施"
        ],
        "decisions": [
          {
            "title": "通过MCP服务器实现分布式日志的Claude Code集成",
            "detail": "构建了可从Claude Code跨域搜索React、Python和Celery各容器分布式日志的MCP服务器。以往需要通过docker logs + grep逐个确认日志，通过MCP工具化实现了在Claude Code对话中进行日志搜索和过滤"
          },
          {
            "title": "通过agent-browser自动生成Storybook Story",
            "detail": "构建了从现有React组件自动生成Storybook Story的子Agent。通过agent-browser解析组件实现，自动生成覆盖props和状态模式的Story文件，加速了UI目录的整备"
          }
        ],
        "outcomes": [
          {
            "before": "分布式容器的日志确认需要手动执行docker logs + grep，故障排查耗时较长。Storybook Story也需要为每个UI组件手动编写",
            "after": "通过MCP服务器实现了从Claude Code的日志跨域搜索。同时创建了可视化Celery任务执行状况和翻译验证成功/失败率的仪表盘，提升了故障排查和质量监控的效率",
            "metric": "故障排查和开发效率的提升以及UI目录整备的加速"
          }
        ]
      }
    ]
  },
  {
    "id": "learning-platform-consulting-2025",
    "company": "中型在线学习平台企业",
    "companyDesc": "提供中型在线学习平台的企业。负责对综合业务系统短期扩展需求的技术分析与提案支持。",
    "role": "技术调研与资料制作",
    "roles": ["Consulting"],
    "period": "2025-05 — 2025-07",
    "teamSize": 2,
    "summary": "使用SonarQube对VBScript/Oracle遗留系统进行质量量化，通过改造/ERP导入/浏览器扩展的三选项比较矩阵支持战略选择。同时构建了基于NotebookLM+markitdown的RAG型内部资料搜索基础设施。活用生成式AI工具，在约2个月的短期咨询中交付了成果",
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
        "title": "内部资料RAG型搜索基础设施的构建",
        "summary": "使用markitdown将内部资料转换为Markdown格式并分割处理，通过NotebookLM搭建RAG型搜索环境。通过MCP连接Claude Desktop与SonarQube，优化了质量问题要点提取和格式化流程。",
        "difficulty": "medium",
        "technologies": [
          "SonarQube",
          "NotebookLM",
          "markitdown",
          "Claude"
        ],
        "highlights": [
          "设计了基于NotebookLM+markitdown的RAG型搜索基础设施架构，构建了资料转换Pipeline",
          "提出了非自建RAG而是活用现有SaaS（NotebookLM）的低成本、短周期方案"
        ],
        "decisions": [
          {
            "title": "基于NotebookLM + markitdown的低工时RAG构建",
            "detail": "活用Google的NotebookLM，采用markitdown将内部资料（PDF/Word/Excel）转换为文本后投入的方式。不构建自定义RAG，而是通过活用现有SaaS最小化成本"
          }
        ],
        "outcomes": [
          {
            "before": "内部资料散布在各部门的文件服务器和云存储中，无法进行跨域搜索。查找所需信息耗时较长",
            "after": "构建了基于NotebookLM + markitdown的RAG型搜索基础设施。将内部资料转换为Markdown后投入，实现了自然语言跨域搜索。在约2周的咨询期内实现了实用的搜索环境",
            "metric": "内部资料搜索效率的提升"
          }
        ],
        "challenges": [
          {
            "title": "将多种文件格式的内部资料转换为RAG可搜索格式",
            "resolution": "使用markitdown将PDF/Word/Excel转换为Markdown格式。构建了尽可能保留结构信息（标题、表格、列表）的转换Pipeline。对转换后的Markdown进行手动质量确认，在必要时修正后投入NotebookLM"
          }
        ]
      },
      {
        "title": "遗留系统代码结构调研与可扩展性分析",
        "summary": "使用Cursor/SonarQube/Claude Desktop对VBScript/Oracle遗留系统进行静态分析。分析可扩展性、改造难度和依赖关系，进行ERP、现有改造和扩展方案的选项整理与比较。",
        "difficulty": "medium",
        "technologies": [
          "SonarQube",
          "Cursor",
          "ChatGPT",
          "Claude"
        ],
        "highlights": [
          "执行了SonarQube静态分析，编写了按模块的改造风险评估报告",
          "通过基于量化数据的改造风险可视化，提供了浏览器扩展方案的采纳依据"
        ],
        "decisions": [
          {
            "title": "通过SonarQube量化遗留代码质量",
            "detail": "使用SonarQube对全部代码进行静态分析，定量测量了Bug、代码异味、重复率和测试覆盖率等指标。整备了可客观评估改造风险的数据"
          },
          {
            "title": "基于量化数据提出改造优先级建议",
            "detail": "按模块整理静态分析结果，映射改造风险高的位置及影响范围。基于量化依据提出了改造优先级建议"
          }
        ],
        "outcomes": [
          {
            "before": "不存在代码质量的客观评估，改造风险不明确",
            "after": "通过SonarQube分析定量评估了代码质量。识别了改造风险高的位置，可视化了技术债务的全貌",
            "metric": "基于量化评估的改造风险客观化。作为浏览器扩展方案的采纳依据"
          }
        ],
        "challenges": [
          {
            "title": "在无版本控制、无测试的遗留环境中进行调研",
            "resolution": "通过SonarQube静态分析量化质量，连接Oracle DB只读副本在不影响生产环境的情况下进行调研。将分析结果整理为幻灯片形式的报告，向管理层可视化技术风险"
          }
        ]
      },
      {
        "title": "短期扩展方案的PoC构想与决策支持资料制作",
        "summary": "编制了积极使用Mermaid记法的流程图和结构图的提案资料。活用Genspark、Gamma、Canva等生成式AI，以短周期迭代方式加速资料制作流程。",
        "difficulty": "medium",
        "technologies": [
          "Genspark",
          "Gamma",
          "Canva",
          "Mermaid"
        ],
        "highlights": [
          "设计了7维评估轴的三选项比较矩阵和决策树，制定了React浏览器扩展的PoC架构",
          "将6个部门的需求分类为「可通过扩展实现/需要改造/等待ERP」三个层次，向各部门展示了实现前景"
        ],
        "decisions": [
          {
            "title": "通过三选项比较框架支持战略选择",
            "detail": "创建了以7个评估轴（开发风险、成本、工期、质量保障、运维影响、可扩展性、ROI）比较三个选项的矩阵，以决策树形式可视化了判断流程"
          },
          {
            "title": "提出React浏览器扩展的低风险改善方案",
            "detail": "提出了以Chrome扩展程序形式将React UI叠加在遗留画面上的方案。进行了不变更现有DB和后端逻辑、在前端实现折扣主数据层级下拉等功能的PoC设计"
          }
        ],
        "outcomes": [
          {
            "before": "缺乏多种扩展方案（改造/ERP/扩展）的判断标准，管理层无法做出决策",
            "after": "通过三选项比较矩阵+决策树支持战略选择。设计了React浏览器扩展的PoC架构（Lambda+S3+IndexedDB+Chrome Extension），以折扣标准灵活化的用例展示了具体实施方针",
            "metric": "浏览器扩展作为短期措施获得批准。ERP导入作为2-3年中长期计划另行开始预算化讨论"
          }
        ],
        "challenges": [
          {
            "title": "6个部门需求的整理与可行性分类",
            "resolution": "将全部需求以访谈结果形式汇总到Excel中，分为「可通过浏览器扩展实现」「需要现有代码改造」「等待ERP」三个层次。以星号标注优先级，可视化了各部门需求在哪个阶段可以实现"
          }
        ]
      }
    ]
  },
  {
    "id": "ai-translation-qcd-2025",
    "company": "生成式AI翻译SaaS国内创业公司",
    "companyDesc": "提供基于生成式AI翻译SaaS的国内创业公司。负责开发组织人才方面QCD改善方案的提案。",
    "role": "开发组织顾问",
    "roles": ["Consulting"],
    "period": "2025-04 — 2025-07",
    "teamSize": 2,
    "summary": "作为外部顾问对约30人规模的开发组织进行QCD（质量、成本、交付）课题结构分析。通过MECE×Issue Tree将100个假设结构化，使用5轴加权评分客观化措施优先级。制作了6阶段执行路线图和经营提案资料，在经营会议上获得了COO的批准",
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
        "title": "开发组织的QCD课题结构分析",
        "summary": "调查开发速度和质量下降的原因，整理技术方面和体制方面的课题。深入挖掘代码管理、评审体制、发布流程、属人化结构等工程师组织的结构性课题。",
        "difficulty": "high",
        "technologies": [
          "SonarQube",
          "Cursor",
          "NotebookLM"
        ],
        "highlights": [
          "通过MECE×Issue Tree将100个假设结构化，以5轴评分提取8大课题。将组织政治性课题也作为系统课题中立描述"
        ],
        "decisions": [
          {
            "title": "基于MECE×Issue Tree的100假设结构化方法",
            "detail": "组合MECE（Mutually Exclusive, Collectively Exhaustive）与Issue Tree方法，以5轴定量评分（发布速度贡献度、Bug发生率贡献度、执行容易性、可测量性、前置时间）全面列举和评估100个假设"
          },
          {
            "title": "8大课题的重要度排序与组织结构映射",
            "detail": "以对最重要课题「现有应用交付能力下降」的贡献度为基准，重点深入与实施者直接相关的3个课题，其余5个课题按利益相关者分类整理。将8个课题按重要度排序"
          }
        ],
        "outcomes": [
          {
            "before": "课题零散、全貌不明。访谈结果主观，无法判断优先级",
            "after": "通过MECE×Issue Tree将100个假设结构化，以5轴评分提取8大课题。构建了管理层可用于决策的课题地图",
            "metric": "完成100假设→8大课题的结构化。实现了Top假设评分4.35（最高）到1.9（最低）的量化评估"
          }
        ],
        "challenges": [
          {
            "title": "量化数据不足情况下的课题结构化",
            "resolution": "采用不依赖量化数据、通过MECE×Issue Tree进行假设结构化、以5轴评分进行相对评估的方法。构建了将访谈内容转化为「课题权重」的独有框架"
          },
          {
            "title": "组织政治性课题的中立描述",
            "resolution": "不提及个人姓名，以「决策结构」「审批权限不明确」等系统课题形式描述，解决方案也非个人批评而是作为制度设计提出"
          }
        ]
      },
      {
        "title": "QCD改善措施评估框架与执行优先级矩阵构建",
        "summary": "以质量、成本、交付为轴进行改善措施的调研与整理。对每项措施进行「影响度×可行性」的量化评估。在资料中嵌入加权矩阵和优先级图表，通过甘特图和职责分界图展示分阶段执行计划。",
        "difficulty": "high",
        "technologies": [
          "ChatGPT",
          "Gamma",
          "Mermaid"
        ],
        "highlights": [
          "设计了5轴加权评分函数，使用RANK.EQ函数自动生成6阶段×3周的路线图"
        ],
        "decisions": [
          {
            "title": "通过5轴加权评分客观化措施优先级",
            "detail": "设计了Q贡献度(0.1)、C贡献度(0.1)、D贡献度(0.4)、金钱成本(0.1)、所需工时(0.3)的5轴加权评分函数。采用了重视D（交付）贡献度和所需工时的权重分配"
          },
          {
            "title": "6阶段×3周的分阶段展开路线图设计",
            "detail": "使用RANK.EQ函数将评分排名自动映射到阶段编号，自动生成6阶段×3周的甘特图。每个阶段配置4-5项措施，前一阶段的成果作为下一阶段的前提条件进行分阶段展开"
          }
        ],
        "outcomes": [
          {
            "before": "27项措施的优先级不明确，管理层决策延迟",
            "after": "通过5轴加权评分+6阶段路线图，构建了可按月可视化进度的执行计划",
            "metric": "Top5措施的优先级在一次经营会议中获得批准。4个月内发布速度提升30%、Bug率降低30%（暂定目标）"
          }
        ],
        "challenges": [
          {
            "title": "措施优先级的客观评估框架构建",
            "resolution": "在Excel中实现5轴加权评分，通过事先与COO就权重依据达成一致，确保了评分结果的客观性和透明度"
          }
        ]
      },
      {
        "title": "经营会议提交用幻灯片资料的设计与制作",
        "summary": "为促进非工程师层的共识形成，大量使用Mermaid记法的流程图、时序图和判断分支图。活用NotebookLM的RAG基础设施，主导制作了支持经营决策的意思决定资料。",
        "difficulty": "medium",
        "technologies": [
          "NotebookLM",
          "Gemini",
          "Genspark",
          "Mermaid"
        ],
        "highlights": [
          "主导制作了2部构成（23+10页幻灯片）的经营提案资料。将技术课题重新定义为QCD影响，以因果关系链进行说明"
        ],
        "decisions": [
          {
            "title": "2部构成的经营提案资料设计（人才优化+工单基础设施重新设计）",
            "detail": "以「AI翻译事业开发组织的人才优化提案」（23页·全局概览）和「通过工单管理基础设施重新设计提升QCD」（10页·深入分析）的2部构成设计了资料"
          },
          {
            "title": "Jira统一基础设施的提案与工具对比决策支持",
            "detail": "创建了Notion、Planio、Notion+Planio并用、Jira四个选项在「工单结构灵活性」「跨部门协作」「UI/UX」「工作流设计」「其他工具集成」5个维度的比较表，推荐了Jira+Jira Service Management"
          }
        ],
        "outcomes": [
          {
            "before": "缺乏向管理层说明技术课题的手段，改善投资的审批困难",
            "after": "通过2部构成的经营提案资料（23页+10页幻灯片）可视化了QCD改善的全貌和具体措施。以工具比较表和RACI图表支持决策",
            "metric": "COO批准了PoC实施。工单管理统一和Jira导入验证的启动已确定"
          }
        ],
        "challenges": [
          {
            "title": "向非工程师管理层说明技术课题",
            "resolution": "将技术课题重新定义为对QCD（质量、成本、交付）的影响，以「Bug流出→返工工时→成本增加」的因果关系链进行说明。设定KPI目标值（Bug率降低40%、前置时间缩短25%），量化了改善效果"
          }
        ]
      }
    ]
  },
  {
    "id": "factory-maintenance-app-2024",
    "company": "制造业业务应用创业公司",
    "companyDesc": "支持制造业工厂设备保全业务的SaaS创业公司。负责工厂设备保全应用的全栈开发。",
    "role": "全栈工程师",
    "roles": ["Frontend", "Backend", "Infra"],
    "period": "2024-10 — 2025-03",
    "teamSize": 4,
    "summary": "管理制造业设备保全与巡检业务的多租户SaaS。一贯负责NestJS + GraphQL + PostgreSQL后端和React + Apollo Client前端。设计并实现了RFC5545标准的重复任务功能、RBAC+ReBAC三轴访问控制、Google日历风格任务UI、字段级逐次保存等核心功能",
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
        "title": "RFC5545标准重复任务功能的设计与实现",
        "summary": "涵盖年、月（第n周第n天/n日）、周（支持多天选择）、日的重复规则，支持批量更新、跳过和结束条件。设计了分离未实体化与实体化记录同时在同一画面统合显示的Schema、API和批处理。采用Redis+SQS+EventBridge的前日批量实体化架构。",
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
          "分析RFC5545规范，设计了重复规则展开、异常处理和批量实体化的架构。编写了规格书和设计回顾文档，系统性地记录了设计意图和替代方案",
          "实现了基于generate_series + UNION ALL + DISTINCT ON的实体与未实体合并SQL/API"
        ],
        "decisions": [
          {
            "title": "采用前日批量实体化（EventBridge+SQS）",
            "detail": "采用EventBridge+SQS+NestJS SQS Consumer的前日批量实体化方案"
          },
          {
            "title": "基于generate_series + UNION ALL的实体与未实体合并方式",
            "detail": "使用PostgreSQL的generate_series展开日期，从模板的JSON定义恢复20+列，与实体记录UNION ALL后通过DISTINCT ON去重"
          },
          {
            "title": "在单一模型中统合三种时间模型",
            "detail": "重视与现有系统的兼容性，采用将三种时间模型（仅日期、含时间、指定时段）统合在单一模型中的设计。在文档中记录了面向未来分离的设计，在模板侧引入timeModel概念的扩展设计"
          }
        ],
        "outcomes": [
          {
            "before": "重复任务功能未实现，每日/每周的定期巡检需要手动创建",
            "after": "发布了RFC5545标准的重复规则功能，实现了Daily/Weekly/Monthly重复任务的自动生成",
            "metric": "定期巡检手动创建工时的削减"
          },
          {
            "before": "重复设计的讨论未能收敛，设计规格散在各处",
            "after": "编写了规格书和回顾文档，体系化了当前实现的问题点和理想设计。制定了6阶段的改善路线图",
            "metric": "设计知识的组织性积累与改善路线图的明确化"
          }
        ],
        "challenges": [
          {
            "title": "在单一模型中统合三种时间模型的重复规则设计",
            "resolution": "从仅日期（未支持时间）的最小实现着手，将在模板侧引入timeModel概念的理想设计文档化为规格书。明确了未来向三模型分离迁移的路径"
          },
          {
            "title": "从模板JSONB定义恢复全字段导致300行以上的SQL",
            "resolution": "分阶段构建了300行以上的CTE链，在重复规则展开→日期生成→未实体化任务生成→与实体任务合并→去重的各阶段明确分离CTE的职责。在维持可维护结构的同时，在回顾文档中详细描述了向模板引用方式迁移等理想设计"
          },
          {
            "title": "仪表盘透视API的限制导致的强制批量实体化",
            "resolution": "构建了在SQL内将未实体化任务转换为与实体记录相同列结构的CTE链。在回顾文档中详细分析了利用COUNT/SUM结合律的两阶段聚合+应用层合并的替代方案（附数学证明）"
          }
        ]
      },
      {
        "title": "范围×资源×操作三轴访问控制的设计、共识形成与实现",
        "summary": "以总部/工厂等范围×资源×操作的三轴定义权限。比较了个别设置方式和角色分配方式的2种方案，通过协调达成共识。通过CASL Ability共同管理API授权和UI显示控制以维持一致性。",
        "difficulty": "high",
        "technologies": [
          "TypeScript",
          "React",
          "NestJS",
          "GraphQL",
          "CASL"
        ],
        "highlights": [
          "设计了RBAC+ReBAC混合ACL模型，全面验证了30+用例。在设计文档中详细记录了决策依据和替代方案",
          "比较了个别设置方式和角色分配方式的2种方案，协调推动了团队内的设计共识形成"
        ],
        "decisions": [
          {
            "title": "采用RBAC+ReBAC混合ACL模型",
            "detail": "DB层采用RBAC+ReBAC混合（未来可扩展为ABAC），UI层采用3阶段分阶段公开的设计"
          },
          {
            "title": "Deny-by-default + 模板方式的权限评估",
            "detail": "默认拒绝，有一个明确deny即拒绝，否则有allow则允许，两者都没有则拒绝的三阶段评估"
          },
          {
            "title": "通过scopeType+inheritChildren实现层级继承可选化",
            "detail": "在范围级别角色分配中添加继承标志，使继承的开启/关闭可在角色分配时选择"
          }
        ],
        "outcomes": [
          {
            "before": "访问控制未实现，所有用户可访问所有数据",
            "after": "设计并形成了3层范围层级（组织>站点>项目）和5种系统定义模板的RBAC+ReBAC ACL系统的共识",
            "metric": "ACL模型设计完成与团队共识形成"
          },
          {
            "before": "ACL需求散在，30+用例无法全面验证",
            "after": "编写了设计文档和用例验证表。确认覆盖了12个用例（多工厂兼任、外部工程师、审计员等）",
            "metric": "需求的全面验证与设计文档化"
          }
        ],
        "challenges": [
          {
            "title": "多租户SaaS中权限层级设计的平衡",
            "resolution": "通过继承标志实现继承可选化，以及角色模板+个别权限覆写的两层结构兼顾灵活性和管理便利性。文档化了30+用例，验证了各模式的覆盖情况"
          }
        ]
      },
      {
        "title": "首页渲染优化（渲染时间削减70%以上）",
        "summary": "通过状态结构的调整最小化了过滤器、列表和详情联动渲染导致的重渲染开销。限定在渲染成本高且对UX影响大的位置，在有限工时内完成了重构。",
        "difficulty": "high",
        "technologies": [
          "TypeScript",
          "React",
          "Apollo Client"
        ],
        "highlights": [
          "使用React DevTools Profiler分析重渲染，选择性地应用React.memo/useMemo/useCallback实现了渲染时间削减70%以上"
        ],
        "decisions": [
          {
            "title": "通过React.memo + useMemo消除不必要的重渲染",
            "detail": "使用React DevTools的Profiler可视化组件树的重渲染，通过React.memo、useMemo和useCallback消除不必要的重渲染。实现了渲染时间削减70%以上"
          }
        ],
        "outcomes": [
          {
            "before": "渲染时间过慢对UX产生不良影响",
            "after": "渲染时间削减70%以上",
            "metric": "渲染时间削减率"
          }
        ],
        "challenges": [
          {
            "title": "全组件一律Memo化 vs Profiler驱动的选择性优化",
            "resolution": "使用React DevTools Profiler目视确认组件树的重渲染。仅识别实际较慢的组件，选择性地应用React.memo/useMemo/useCallback。在控制工时的同时实现了70%以上的渲染时间削减"
          }
        ]
      },
      {
        "title": "Google日历风格任务显示UI的实现",
        "summary": "实现了支持周视图、月视图和3日视图的日历视图。使用CSS Grid/Subgrid实现了圆角显示、可变显示区域和排程对应。",
        "difficulty": "medium",
        "technologies": [
          "TypeScript",
          "React",
          "CSS"
        ],
        "highlights": [
          "自行开发了打包算法（行占用映射→上对齐放置），制定了以Apollo Client SSoT的响应式更新设计",
          "从零实现了3/4/7日可变视图、拖放日期变更、跨周圆角、CSS scroll snap移动端适配"
        ],
        "decisions": [
          {
            "title": "从零自行实现日历UI",
            "detail": "不依赖第三方库，使用React+CSS从零构建日历UI。将3日/4日/周次等可变天数视图作为外部参数接收，设计为任意天数宽度下布局都不会崩溃"
          },
          {
            "title": "以Apollo Client为SSoT的拖放日期变更与逐次保存联动",
            "detail": "将Apollo Client的缓存设计为唯一可信数据源（SSoT）。无论是拖放日期变更还是编辑弹窗的逐次保存后都更新Apollo缓存，构建了日历响应式重绘的机制"
          },
          {
            "title": "响应式日历UI与CSS scroll snap的移动端优化",
            "detail": "移动端切换为与PC版大不相同的UI，采用点击日期后滑动显示任务列表的设计。应用CSS scroll snap确保滚动始终按日期单位吸附，不会停在中间位置"
          }
        ],
        "outcomes": [
          {
            "before": "不存在日历UI，工作计划仅以列表形式显示，一览性较差",
            "after": "从零实现了与Google日历同等操作感的自定义日历UI。实现了3日/4日/周次视图的动态切换和跨周事件的圆角显示",
            "metric": "提供了用户可直观掌握和管理工作计划的UI。通过从零自行实现，实现了对需求变更的灵活应对"
          },
          {
            "before": "任务执行日管理仅有表格形式的列表显示，难以直观把握整体日程",
            "after": "从零构建了Google日历风格的UI。实现了多日/单日任务的密集打包显示、拖放日期变更、Apollo Client SSoT实时更新、响应式适配（含scroll snap）。还支持3日/4日/7日的可变视图切换",
            "metric": "日历UI的完成度与可用性"
          }
        ],
        "challenges": [
          {
            "title": "跨周事件的圆角UI表达",
            "resolution": "将事件按周分割为段，根据各段的位置（首段/中间/末段）动态应用border-radius的CSS类。首段左圆角，末段右圆角，中间段无圆角"
          },
          {
            "title": "可变天数视图的响应式布局",
            "resolution": "将天数参数作为组件的props接收，使用CSS Grid的fr单位动态计算列宽。事件放置也改为从startDate/endDate动态计算grid-column位置的逻辑"
          },
          {
            "title": "多日任务与单日任务的打包算法（无间隙上对齐）",
            "resolution": "自行开发了管理每行占用状态的打包算法。先映射多日任务占用的行，单日任务放置在空闲的最上方行。由此实现了与Google日历相同的密集布局"
          }
        ]
      },
      {
        "title": "动态表单结构对应的按类型验证实现",
        "summary": "对模板上可添加、删除的项目（字符串/数值/日期等）使用RHF+Zod实现了按类型验证。在创建弹窗和编辑画面之间兼顾了处理分离与可复用性。支持激活控制、选项显示控制和关联验证。",
        "difficulty": "high",
        "technologies": [
          "TypeScript",
          "React Hook Form",
          "Zod"
        ],
        "highlights": [
          "对模板上可添加、删除的项目（字符串/数值/日期等）使用RHF+Zod实现了按类型验证。在创建弹窗和编辑画面之间兼顾了处理分离与可复用性。支持激活控制、选项显示控制和关联验证。"
        ]
      },
      {
        "title": "焦点失去时差异逐次保存功能的实现",
        "summary": "为防止保存遗漏，实现了焦点失去时仅针对差异部分的逐次保存。利用DevTools节流功能，在不稳定网络环境下也进行了重发测试。",
        "difficulty": "medium",
        "technologies": [
          "TypeScript",
          "React",
          "GraphQL"
        ],
        "highlights": [
          "设计了字段级onBlur逐次保存+Command Pattern架构，实现了发送失败命令的重发机制"
        ],
        "decisions": [
          {
            "title": "采用字段级onBlur逐次保存（不采用表单一次性保存）",
            "detail": "采用每个字段拥有独立的react-hook-form实例，在onBlur事件中进行isEqual差异检查后立即发送GraphQL mutation的逐次保存方式"
          },
          {
            "title": "通过将命令作为数据处理的RPC式方法封装字段变更",
            "detail": "将各字段变更结构化为命令数据，赋予UUID后发送至后端的RPC式方式。按资源类型定义变更目标的字段集合，将变更操作设计为可序列化的数据"
          }
        ],
        "outcomes": [
          {
            "before": "表单一次性保存方式在工厂Wi-Fi环境下存在输入数据丢失风险",
            "after": "实现了字段级onBlur逐次保存+Command Pattern+发送失败命令的重发机制。设计了3阶段改善路线图（localStorage持久化→SW引入→完全离线）",
            "metric": "数据丢失风险的大幅降低与未来改善计划的制定"
          }
        ],
        "challenges": [
          {
            "title": "工厂内Wi-Fi不稳定环境下的数据保全",
            "resolution": "实现了字段级onBlur逐次保存+发送失败命令的useRef积累+保存按钮重发机制。网络错误时保持表单值，客户端错误时重置为服务器值的两阶段错误处理"
          }
        ]
      },
      {
        "title": "UI组件目录结构与命名规范的制定和引入",
        "summary": "为提高领域耦合型组件的可复用性，提出了目录结构、命名规范和组件构成规则的方案并形成共识。作为团队内共同规约加以推广。",
        "difficulty": "medium",
        "technologies": [
          "TypeScript",
          "React"
        ],
        "highlights": [
          "为提高领域耦合型组件的可复用性，提出了目录结构、命名规范和组件构成规则的方案并形成共识。作为团队内共同规约加以推广。"
        ]
      },
      {
        "title": "通过Storybook实现全UI状态可视化与多语言对应基础设施整备",
        "summary": "通过Storybook可视化UI全状态，使未来的显示变体对应更加容易。实现了卡片UI的多语言对应（含英文文案建议），整备了国际化对应基础设施。",
        "difficulty": "medium",
        "technologies": [
          "TypeScript",
          "Storybook",
          "Playwright",
          "Vitest"
        ],
        "highlights": [
          "通过Storybook可视化UI全状态，使未来的显示变体对应更加容易。实现了卡片UI的多语言对应（含英文文案建议），整备了国际化对应基础设施。"
        ]
      }
    ]
  },
  {
    "id": "recruitment-saas-2022",
    "company": "HR咨询/系统上市集团子公司",
    "companyDesc": "从事HR咨询和系统开发的上市企业集团子公司。负责多租户型招聘管理系统的新规开发。",
    "role": "前端技术负责人",
    "roles": ["Frontend", "Tech Lead", "Testing"],
    "period": "2022-10 — 2024-09",
    "teamSize": 10,
    "summary": "作为技术负责人主导了2年的校园招聘管理SaaS前端开发。以pnpm Monorepo架构开发B2B（HR管理画面）和B2C（应聘者报名画面）。设计并实现了基于Specification模式的动态表单构建器、Suspense对应仪表盘、VRT Pipeline等核心功能，推动了10人团队的质量与开发效率提升",
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
        "title": "作为前端技术负责人的团队运营与质量管理",
        "summary": "主导任务分配、SP更新、知识共享、PR Review文化培育和实施指南整备。引入Renovate实现库定期更新自动化。主持团队会议推进技术、代码规范和画面规格的共享。",
        "difficulty": "high",
        "technologies": [
          "TypeScript",
          "React",
          "GitHub Actions",
          "Renovate"
        ],
        "highlights": [
          "以编排者型方式主导了B2C应用整体的规格梳理、与后端团队的共识形成、任务分解、成员分配和关键路径承担",
          "通过制定代码Review指南、构建VRT环境和培养实习生，确立了团队质量标准"
        ],
        "decisions": [
          {
            "title": "通过实习生培养和代码Review提升团队整体质量",
            "detail": "积极进行代码Review，通过对实习生成员的反馈进行培养。采用通过Review传授编码规范和设计模式的OJT型方法"
          },
          {
            "title": "统一后端团队接口窗口的编排者型管理",
            "detail": "一人短期内梳理B2C应用全部规格，与后端团队负责人进行一对一的彻底对齐。共识达成后举办B2C团队成员入职会议说明全部规格。汇总团队成员的提问和疑问后与后端团队统一解决，作为一站式窗口运作"
          },
          {
            "title": "规格任务分解、依赖关系整理和基于成员特长的分配",
            "detail": "将确定的规格分解为任务并明确依赖关系落实到Jira工单。根据成员的擅长/不擅长、技能水平和意愿分配工单。在任务依赖关系上容易成为单点故障（关键路径）的部分由自己主动承担"
          }
        ],
        "outcomes": [
          {
            "before": "前端质量参差不齐，CSS回归问题被遗漏",
            "after": "构建了Storybook+storycap+reg-suit的视觉回归测试环境，每个PR自动检测UI差异。同时制定了代码Review指南",
            "metric": "UI质量自动保障体制的建立"
          }
        ],
        "challenges": [
          {
            "title": "作为前端技术负责人在技术债务与开发速度之间的平衡",
            "resolution": "构建了Storybook+storycap+reg-suit的视觉回归测试环境，自动保障UI质量。制定代码Review指南，提升团队整体质量水准"
          },
          {
            "title": "4个月短期内B2C应聘者应用的规格详细确定",
            "resolution": "作为技术负责人从规格详细确定开始主导。整理应聘者的用户流程，系统性地定义了各状态的转换条件、显示内容和验证规则。在实现的同时以敏捷方式确定规格"
          },
          {
            "title": "动态表单规格边界用例的梳理与后端共识形成",
            "resolution": "决定选项为0件的情况在B2B侧的表单设置运营中通过客服介入解决，B2C应用侧不显示特殊提示。对每个边界用例与后端团队负责人单独达成共识，将决定事项文档化并与团队共享"
          }
        ]
      },
      {
        "title": "应聘者报名流程的规格制定与实现",
        "summary": "会员注册→职位申请→选拔步骤报名流程的详细规格制定和前端实现。在4个月开发期内完成功能开发，获得了委托方的高度评价。",
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
          "制定了以共通DynamicForm基础统一4条表单流程的设计，实现了多页面验证与导航控制"
        ],
        "decisions": [
          {
            "title": "以共通DynamicForm基础实现4条B2C表单流程",
            "detail": "以表单规格定义类为核心，共享通用的useForm Hook、输入组件群和验证系统，仅按各流程单独定义页面构成、提交目标和参数差异的设计方案"
          },
          {
            "title": "多页面表单的页面级验证与导航控制",
            "detail": "在转换URL页面索引（从1开始）和数组索引（从0开始）的同时，用useFormState管理页面级验证状态。在页面范围内执行trigger()，阻止导航至未验证页面"
          }
        ],
        "outcomes": [
          {
            "before": "4个月开发期的限制",
            "after": "在期限内完成全部功能开发，获得了委托方的高度评价",
            "metric": "开发完成率与客户满意度"
          },
          {
            "before": "面向应聘者的报名表单不存在，招聘管理SaaS的B2C侧未整备",
            "after": "以共通DynamicForm基础实现了4条表单流程（新注册、预报名、个人资料更新、个人页面任务）。实现了24种输入组件、50+验证规则和多页面导航",
            "metric": "B2C应聘者表单基础的完成度"
          }
        ],
        "challenges": [
          {
            "title": "应聘者报名流程中复杂的状态转换管理",
            "resolution": "在规格制定阶段详细绘制状态转换图，可视化所有模式。实现了在类型层面防止非法转换的设计。在4个月开发期内完成全部功能"
          },
          {
            "title": "服务端验证错误到字段级的映射",
            "resolution": "在useEffect内判定GraphQL验证错误，分离设置全局Banner错误和字段级错误。通过自定义useForm Hook统一错误处理"
          }
        ]
      },
      {
        "title": "HR用动态表单构建器的设计与实现（采用Specification模式）",
        "summary": "实现了HR可设置页面、标题、输入项、验证、父子关系等的表单构建器。通过Specification模式解决了类的状态问题，保持了与RHF的一致性。实现了内聚性与可扩展性的兼顾。",
        "difficulty": "extreme",
        "technologies": [
          "TypeScript",
          "React",
          "React Hook Form",
          "Apollo Client"
        ],
        "highlights": [
          "设计并实现了Specification模式×Yup自定义方法50+的关联验证基础。构建了3层表单生成引擎",
          "实现了父子字段联动+useWatch+选择值自动清除的响应式选项过滤"
        ],
        "decisions": [
          {
            "title": "基于Specification模式的动态表单验证设计",
            "detail": "采用Specification模式（领域驱动设计的模式），实现了将条件表达式作为对象可组合的设计"
          },
          {
            "title": "Specification模式×Yup自定义方法的关联验证基础",
            "detail": "为Yup Schema添加了50+自定义方法，实现了一次性应用于所有Schema类型的模式。以声明式描述依赖字段的元数据，自动构建依赖图"
          },
          {
            "title": "以pnpm Monorepo架构将验证分离到shared包",
            "detail": "采用pnpm workspace的B2B、B2C和共通3包架构。将验证基础配置在共通包中，B2B/B2C通过re-export使用。以枚举注册表统一管理GraphQL来源的enum定义"
          },
          {
            "title": "通过父子字段联动实现无刷新选项过滤",
            "detail": "在父子联动组件中使用useWatch()响应式监视父字段值的变化。将过滤函数传递给子组件，通过useMemo过滤选项。选择值重置器自动清除已失效的选择值"
          }
        ],
        "outcomes": [
          {
            "before": "报名表单的条件定义为硬编码，每次条件变更都需要代码修改",
            "after": "实现了基于Specification模式的声明式条件定义，HR人员无需代码即可设置表单条件",
            "metric": "表单条件变更的自助服务化"
          },
          {
            "before": "表单项目为硬编码，每次项目添加或变更都需要工程师实现",
            "after": "通过动态表单生成引擎，HR人员可自由设置表单项目。实现了配备50+验证规则、24种输入组件、字段间关联验证和响应式选项过滤的动态表单基础。通过共通包同时提供给B2B/B2C",
            "metric": "动态表单基础的灵活性与质量"
          }
        ],
        "challenges": [
          {
            "title": "HR用动态表单条件式组合爆炸",
            "resolution": "采用Specification模式（源自DDD），将条件式设计为可通过AND/OR/NOT组合的一等对象。实现了类似JSON Schema的声明式条件定义"
          },
          {
            "title": "表单项目间关联验证与响应式UI的同步控制",
            "resolution": "选择值重置组件检测选项变化并立即清除无效值。自动构建字段依赖图，通过React Hook Form的deps选项自动触发依赖字段的重新验证。数组索引的通配符匹配也支持动态表单的依赖关系"
          },
          {
            "title": "Schema驱动的动态表单生成引擎设计",
            "resolution": "设计了表单整体→页面→项目的3层规格定义类。各层动态构建验证Schema，自动生成页面级Schema。通过TypeScript类型参数也确保了表单值的类型安全性"
          }
        ]
      },
      {
        "title": "HR用仪表盘的详细规格制定与Suspense对应实现",
        "summary": "首页仪表盘的详细规格确定与实现。对整体和3种面板进行Suspense对应。使用React Profiler定位渲染原因，同时改善了实际性能和感知等待时间。",
        "difficulty": "high",
        "technologies": [
          "TypeScript",
          "React",
          "Apollo Client",
          "TanStack Query"
        ],
        "highlights": [
          "设计并实现了Widget独立数据获取（Suspense+ErrorBoundary）架构和自定义Masonry网格算法"
        ],
        "decisions": [
          {
            "title": "采用Widget独立数据获取架构",
            "detail": "采用各Widget独立进行数据获取的架构。使用Apollo Client useReadQuery在Widget组件内完成Suspense对应的数据获取"
          },
          {
            "title": "自定义Masonry网格布局的从零实现",
            "detail": "实现了自定义网格放置算法。追踪左右列的当前行索引，以将Widget放置到较短列的逻辑实现了Masonry效果"
          },
          {
            "title": "基于dnd-kit v6的Widget拖放排序",
            "detail": "采用@dnd-kit/core v6.1.0 + @dnd-kit/sortable v8.0.0。通过SortableContext管理列表，使用useSortable Hook控制各Widget的拖放状态。通过DragOverlay实现了拖动中的预览显示"
          }
        ],
        "outcomes": [
          {
            "before": "仪表盘的数据获取为瀑布流方式，所有Widget加载完成前不可操作。Widget间也存在间隙放置问题",
            "after": "通过React Suspense + Apollo useReadQuery + Material UI Skeleton实现了独立获取+骨架屏显示。自定义Masonry网格实现无间隙放置。dnd-kit v6实现拖放排序和1列/2列切换",
            "metric": "改善为各Widget独立完成加载→渲染的UX。实现了未来也可扩展至第三方市场的松耦合架构"
          }
        ],
        "challenges": [
          {
            "title": "20个Widget同时数据获取的瀑布流问题消除",
            "resolution": "使用Apollo Client 3.10的useReadQuery迁移到Suspense对应的数据获取。将各Widget用React Suspense边界包裹，设置Material UI的Skeleton组件为fallback。ErrorBoundary也对各Widget单独应用，设计为一个API故障不会波及其他Widget"
          },
          {
            "title": "CSS Masonry不支持环境下的自定义网格布局实现",
            "resolution": "实现了自定义放置算法。追踪左右列的当前行索引，将各Widget放置到较短列。通过在CSS Grid上动态计算grid-row-start/grid-row-span的方式实现了类Masonry的无间隙放置"
          }
        ]
      },
      {
        "title": "错误处理、缓存、访问控制等横切关注点画面功能整备",
        "summary": "实现了错误处理、缓存重置、查询Header参数附加、重定向、查询批处理、GraphQL Schema自动生成验证修正。",
        "difficulty": "high",
        "technologies": [
          "TypeScript",
          "React",
          "Apollo Client",
          "GraphQL"
        ],
        "highlights": [
          "实现了错误处理、缓存重置、查询Header参数附加、重定向、查询批处理、GraphQL Schema自动生成验证修正。"
        ]
      },
      {
        "title": "Storybook+storycap+reg-suit视觉回归测试环境构建",
        "summary": "将Storybook、storycap和reg-suit集成到GitHub Actions CI中进行UI回归测试。同时在CI环境中整备了Playwright回归测试用E2E测试。",
        "difficulty": "high",
        "technologies": [
          "Storybook",
          "GitHub Actions",
          "Playwright",
          "reg-suit",
          "storycap"
        ],
        "highlights": [
          "设计并构建了Storybook+storycap+reg-suit+GitHub Actions+S3的VRT Pipeline，在团队中扎根了VRT文化",
          "实现了matrix strategy的b2b/b2c并行截图、阈值0.1%差异比较和PR评论自动发布"
        ],
        "decisions": [
          {
            "title": "Storybook v8 + storycap + reg-suit + S3的VRT Pipeline设计",
            "detail": "基于@storybook/react-vite v8.1.5构建Storybook环境，storycap v5.0.0自动截图，reg-suit像素差异比较（阈值0.1%），AWS S3结果发布，GitHub PR通知的差异Review流程"
          },
          {
            "title": "GitHub Actions matrix策略实现b2b/b2c并行VRT执行",
            "detail": "使用GitHub Actions的matrix strategy并行对b2b/b2c用storycap截图并上传为Artifact。后续的vrt Job统合后执行reg-suit run的两阶段Pipeline设计"
          }
        ],
        "outcomes": [
          {
            "before": "UI的非预期变更（CSS回归）在发布后才被发现",
            "after": "通过storycap+reg-suit在每个PR自动执行截图比较。可在合并前100%检测CSS回归",
            "metric": "CSS回归检测率"
          },
          {
            "before": "UI变更的质量确认仅靠手动目视，因遗漏导致的回归Bug在发布后才被发现",
            "after": "构建了Storybook v8.1.5 + storycap + reg-suit + GitHub Actions + S3的VRT Pipeline。b2b 215个Story、b2c 49页全UI组件每PR自动截图比较",
            "metric": "阈值0.1%的像素差异检测自动发现视觉回归。通过PR评论的差异图像Review已扎根，发布后UI回归Bug减少"
          }
        ],
        "challenges": [
          {
            "title": "storycap的超时与资源等待的稳定化",
            "resolution": "在preview.tsx的default参数中设置screenshot: { waitAssets: true }等待资源加载完成。storycap执行时设置serverTimeout 60000ms和captureTimeout 15000ms。逐个Story调整delay构建了稳定的截图环境"
          },
          {
            "title": "VRT文化在团队中的扎根",
            "resolution": "引入了reg-notify-github-plugin通过PR评论显示差异图像，制定了有差异时纳入Review的团队规则。推荐在Storybook上的组件开发流程，构建了Story编写自然融入VRT的开发流程"
          }
        ]
      },
      {
        "title": "从react-admin迁移至Apollo Client/RHF/MUI及GraphQL Suspense引入",
        "summary": "为提升开发效率，提议从react-admin迁移至Apollo Client、RHF和MUI，并推进至完全迁移。验证并正式引入了GraphQL Suspense和React Suspense带来的显示速度提升。",
        "difficulty": "high",
        "technologies": [
          "React",
          "React Hook Form",
          "MUI",
          "Apollo Client",
          "GraphQL"
        ],
        "highlights": [
          "为提升开发效率，提议从react-admin迁移至Apollo Client、RHF和MUI，并推进至完全迁移。验证并正式引入了GraphQL Suspense和React Suspense带来的显示速度提升。"
        ]
      },
      {
        "title": "作为冒烟测试团队负责人推进测试",
        "summary": "作为测试阶段负责人率先承担Driver角色。在其他成员担任Driver时共享画面和导航规格。主导缺陷工单创建和测试状态管理。",
        "difficulty": "medium",
        "technologies": [
          "Playwright"
        ],
        "highlights": [
          "作为测试阶段负责人率先承担Driver角色。在其他成员担任Driver时共享画面和导航规格。主导缺陷工单创建和测试状态管理。"
        ]
      }
    ]
  },
  {
    "id": "mobile-order-app-2022",
    "company": "移动点餐应用销售公司",
    "companyDesc": "开发和销售面向餐饮店的移动点餐应用的公司。负责LIFF/原生应用/后端的开发。",
    "role": "LIFF前端/原生应用/后端工程师",
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
        "title": "Web/LIFF/原生应用多平台前端开发",
        "summary": "一贯负责Web（Next.js）、LIFF应用和原生应用（React Native/Expo）的全部开发。实现了订单管理、门店LINE联动、收银联动、库存管理、结算处理等广泛的领域逻辑。",
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
          "一贯负责Web（Next.js）、LIFF应用和原生应用（React Native/Expo）的全部开发。实现了订单管理、门店LINE联动、收银联动、库存管理、结算处理等广泛的领域逻辑。"
        ]
      },
      {
        "title": "移动点餐的多语言化（英语和中文）对应",
        "summary": "在确保不同用户设备上Logo和文案显示不会出现布局问题、含义可简洁理解的前提下，调研了英语圈和中文圈的应用UI。通过原型与设计师和PO讨论改进UI。",
        "difficulty": "medium",
        "technologies": [
          "TypeScript",
          "React",
          "LIFF"
        ],
        "highlights": [
          "在确保不同用户设备上Logo和文案显示不会出现布局问题、含义可简洁理解的前提下，调研了英语圈和中文圈的应用UI。通过原型与设计师和PO讨论改进UI。"
        ]
      },
      {
        "title": "POS系统临时结算处理的实现（与正式结算共通化与单元测试整备）",
        "summary": "将与正式结算处理重叠的逻辑进行共通化，消除了变量命名不一致。添加了单元测试，实现了低技术债务的实现。",
        "difficulty": "medium",
        "technologies": [
          "TypeScript",
          "NestJS",
          "GraphQL",
          "Jest"
        ],
        "highlights": [
          "将与正式结算处理重叠的逻辑进行共通化，消除了变量命名不一致。添加了单元测试，实现了低技术债务的实现。"
        ]
      },
      {
        "title": "厨房显示屏按桌、按菜品、按时间的订单状况统计实现",
        "summary": "厨房显示屏的功能实现与UI改善。实现了按桌、按菜品和按时间统计订单状况的功能。",
        "difficulty": "medium",
        "technologies": [
          "TypeScript",
          "Hasura",
          "GraphQL",
          "React Native"
        ],
        "highlights": [
          "厨房显示屏的功能实现与UI改善。实现了按桌、按菜品和按时间统计订单状况的功能。"
        ]
      }
    ]
  },
  {
    "id": "board-management-app-2022",
    "company": "董事会DX服务公司",
    "companyDesc": "提供董事会运营DX化SaaS的企业。负责董事会管理服务的前端和后端开发。",
    "role": "前端/后端工程师",
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
        "title": "UI组件实现与Storybook整备（采用Atomic Design）",
        "summary": "为解决UI组件可发现性和可搜索性低的问题，将Storybook目录结构对齐Atomic Design。在Storybook中一览化全部UI组件，改善了画面实现效率。",
        "difficulty": "medium",
        "technologies": [
          "TypeScript",
          "React",
          "Tailwind CSS",
          "Storybook"
        ],
        "highlights": [
          "为解决UI组件可发现性和可搜索性低的问题，将Storybook目录结构对齐Atomic Design。在Storybook中一览化全部UI组件，改善了画面实现效率。"
        ]
      },
      {
        "title": "文件创建辅助与书面决议画面的实现及E2E测试",
        "summary": "文件创建辅助和书面决议画面的详细实现。实现了Playwright E2E测试确保质量。",
        "difficulty": "medium",
        "technologies": [
          "TypeScript",
          "React",
          "Playwright"
        ],
        "highlights": [
          "文件创建辅助和书面决议画面的详细实现。实现了Playwright E2E测试确保质量。"
        ]
      },
      {
        "title": "日程调整功能的后端实现",
        "summary": "使用Node.js/Express/GraphQL/Prisma实现日程调整功能的后端。",
        "difficulty": "medium",
        "technologies": [
          "Node.js",
          "Express",
          "Prisma",
          "GraphQL"
        ],
        "highlights": [
          "使用Node.js/Express/GraphQL/Prisma实现日程调整功能的后端。"
        ]
      }
    ]
  },
  {
    "id": "freelance-web-2021",
    "company": "自由职业",
    "companyDesc": "作为自由职业者承接了多个SPA主页制作项目。网站制作公司、招聘公司、数据分析公司和餐厅共4个项目。",
    "role": "前端工程师",
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
        "title": "基于React/Next.js的SPA主页制作（4个项目）",
        "summary": "制作了网站制作公司、招聘公司、数据分析公司和餐厅的SPA主页。负责前端应用与CMS（WordPress/Contentful等）的联动及Vercel/Netlify/S3的托管。",
        "difficulty": "medium",
        "technologies": [
          "TypeScript",
          "JavaScript",
          "React",
          "Next.js",
          "Amazon S3"
        ],
        "highlights": [
          "制作了网站制作公司、招聘公司、数据分析公司和餐厅的SPA主页。负责前端应用与CMS（WordPress/Contentful等）的联动及Vercel/Netlify/S3的托管。"
        ]
      }
    ]
  },
  {
    "id": "bitkey-data-2020",
    "company": "Bitkey Inc.",
    "companyDesc": "开发智能锁的创业公司。负责公司内部数据湖与仪表盘构建，以及城镇门户网站开发。",
    "role": "数据工程师/前端工程师",
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
        "title": "全公司共享KPI的定义与制定",
        "summary": "整理经营、产品、销售、质量和使用情况相关的KPI，定义了全体员工应共享的指标群。主导了旨在推广跨团队协作文化的指标设计。",
        "difficulty": "high",
        "technologies": [
          "Python",
          "SQL",
          "BigQuery"
        ],
        "highlights": [
          "整理经营、产品、销售、质量和使用情况相关的KPI，定义了全体员工应共享的指标群。主导了旨在推广跨团队协作文化的指标设计。"
        ]
      },
      {
        "title": "多数据源到BigQuery的汇聚Pipeline构建",
        "summary": "在AWS Lambda和Cloud Functions上实现了将散布在Amazon Redshift、Amazon Aurora、Salesforce和Cloud Firestore中的数据定期汇聚到BigQuery的处理。同时负责半结构化数据的转换和聚合自动化。",
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
          "在AWS Lambda和Cloud Functions上实现了将散布在Amazon Redshift、Amazon Aurora、Salesforce和Cloud Firestore中的数据定期汇聚到BigQuery的处理。同时负责半结构化数据的转换和聚合自动化。"
        ]
      },
      {
        "title": "Google Data Portal仪表盘设计/实现与公司内推广",
        "summary": "使用Google Data Portal设计并实现仪表盘，实时可视化销售、质量和使用指标。通过在办公室入口设置面板、嵌入员工门户和周会展示推动了数据活用文化的扎根。",
        "difficulty": "medium",
        "technologies": [
          "SQL",
          "BigQuery",
          "Google Data Portal"
        ],
        "highlights": [
          "使用Google Data Portal设计并实现仪表盘，实时可视化销售、质量和使用指标。通过在办公室入口设置面板、嵌入员工门户和周会展示推动了数据活用文化的扎根。"
        ]
      },
      {
        "title": "城镇门户网站的UI组件实现",
        "summary": "采用智能锁的新城镇居民间信息共享门户网站。与UI设计师协商实现了多画面共通UI组件。通过Storybook创建了UI目录。",
        "difficulty": "medium",
        "technologies": [
          "TypeScript",
          "React",
          "MUI",
          "Storybook"
        ],
        "highlights": [
          "采用智能锁的新城镇居民间信息共享门户网站。与UI设计师协商实现了多画面共通UI组件。通过Storybook创建了UI目录。"
        ]
      }
    ]
  },
  {
    "id": "simplex-banking-2019",
    "company": "Simplex Inc.",
    "companyDesc": "以金融系统开发为主力的系统集成商。负责大型银行风险管理系统及保险公司新注册应用的开发、测试和维护。",
    "role": "前端工程师/测试工程师/运维维护",
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
        "title": "基于VBA的Java JSON API联动Excel前端应用开发",
        "summary": "开发了通过VBA与Java JSON API通信并在Excel上显示数据的应用。实现了根据JSON数据结果动态添加列并在各列嵌入Excel公式的功能。注重可读性的命名。",
        "difficulty": "high",
        "technologies": [
          "Java",
          "VBA",
          "Bash"
        ],
        "highlights": [
          "开发了通过VBA与Java JSON API通信并在Excel上显示数据的应用。实现了根据JSON数据结果动态添加列并在各列嵌入Excel公式的功能。注重可读性的命名。"
        ]
      },
      {
        "title": "客户现场测试、发布作业、运维和客户对应",
        "summary": "负责使用Shell命令和AWS的客户现场测试和发布作业。主导了客户邮件问答对应、增强项目基本设计、缺陷工单创建和定期例会的对应确认。",
        "difficulty": "medium",
        "technologies": [
          "Java",
          "Bash"
        ],
        "highlights": [
          "负责使用Shell命令和AWS的客户现场测试和发布作业。主导了客户邮件问答对应、增强项目基本设计、缺陷工单创建和定期例会的对应确认。"
        ]
      },
      {
        "title": "保险公司新注册应用的Vue.js前端实现",
        "summary": "与设计师确定帮助提示和弹窗的详细规格，在全画面各输入项中实现。实现了用户输入多画面UI。负责业务场景测试和系统测试的实施与管理。",
        "difficulty": "medium",
        "technologies": [
          "TypeScript",
          "JavaScript",
          "Vue.js"
        ],
        "highlights": [
          "与设计师确定帮助提示和弹窗的详细规格，在全画面各输入项中实现。实现了用户输入多画面UI。负责业务场景测试和系统测试的实施与管理。"
        ]
      }
    ]
  },
  {
    "id": "graph-intern-2018",
    "company": "Graph Inc.",
    "companyDesc": "从事数据分析和AI开发的企业实习。负责服装EC推荐引擎开发、汽车制造商数据分析和聊天机器人开发。",
    "role": "数据工程师/实习生",
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
        "title": "服装EC推荐引擎原型开发（3种算法）",
        "summary": "为首页、商品页和购物车页面显示的推荐列表进行推荐引擎原型开发。分别对新客户、老客户和商品页应用了基于内容的过滤和协同过滤，实现了兼顾偶然发现性的设计。",
        "difficulty": "high",
        "technologies": [
          "Python",
          "pandas",
          "NumPy",
          "SQL"
        ],
        "highlights": [
          "为首页、商品页和购物车页面显示的推荐列表进行推荐引擎原型开发。分别对新客户、老客户和商品页应用了基于内容的过滤和协同过滤，实现了兼顾偶然发现性的设计。"
        ]
      },
      {
        "title": "基于k近邻法的客户分类与购买状况基础统计",
        "summary": "为服装EC管理层的营销策略研讨，使用k近邻法对现有客户进行分类，并按分类统计购买状况（商品类别销售额等）。",
        "difficulty": "medium",
        "technologies": [
          "Python",
          "pandas",
          "NumPy",
          "SQL"
        ],
        "highlights": [
          "为服装EC管理层的营销策略研讨，使用k近邻法对现有客户进行分类，并按分类统计购买状况（商品类别销售额等）。"
        ]
      },
      {
        "title": "演示用聊天机器人的全栈开发与部署",
        "summary": "确定演示用聊天机器人的设计规格，实现画面和API（Python/Flask）。将应用部署到S3和EC2。",
        "difficulty": "medium",
        "technologies": [
          "JavaScript",
          "Flask",
          "Amazon S3",
          "Amazon EC2",
          "Python"
        ],
        "highlights": [
          "确定演示用聊天机器人的设计规格，实现画面和API（Python/Flask）。将应用部署到S3和EC2。"
        ]
      }
    ]
  }
];
