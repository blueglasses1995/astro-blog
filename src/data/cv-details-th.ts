import type { CVProject } from './cv-details';

export const cvProjectsTh: CVProject[] = [
  {
    "id": "ai-translation-tools-2025",
    "company": "SaaS แปลภาษาด้วย Generative AI",
    "companyDesc": "โปรเจกต์ออกแบบและพัฒนาไมโครเซอร์วิสสำหรับการประมวลผลหลังการแปลของ AI Translation SaaS",
    "role": "วิศวกรแบ็กเอนด์ (ออกแบบและพัฒนาไมโครเซอร์วิส)",
    "roles": ["Backend", "Infra", "Testing"],
    "period": "2025/04 — 2025/09",
    "teamSize": 5,
    "summary": "กลุ่มไมโครเซอร์วิสประมวลผลหลังการแปลด้วยสถาปัตยกรรม FastAPI + Celery + PostgreSQL + Redis ออกแบบและพัฒนาเซอร์วิส post-validation รวมถึงปรับปรุงสภาพแวดล้อมการพัฒนาฟรอนต์เอนด์ให้ทันสมัย สร้างโครงสร้างพื้นฐานการ deploy ด้วย Docker/GHCR สร้าง mock อัตโนมัติจาก OpenAPI และจัดเตรียมสภาพแวดล้อมทดสอบ E2E",
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
        "title": "การออกแบบ State Machine สำหรับประมวลผลหลังการแปลและการสร้างโครงสร้างพื้นฐานงานที่ทนต่อข้อผิดพลาด",
        "summary": "จัดการกระบวนการตรวจสอบคุณภาพและแปลซ้ำหลังการแปลด้วย state machine 9 สถานะ โดยบันทึกผลลัพธ์ของแต่ละขั้นตอนเป็นข้อมูลถาวร (immutable) ในฐานข้อมูล ทำให้สามารถวิเคราะห์สาเหตุปัญหาความแม่นยำในการแปลด้วย SQL เพียงอย่างเดียว และตรวจสอบสถานะการประมวลผลผ่าน API ได้ทันที แต่ละขั้นตอนถูกพัฒนาเป็น Celery task แบบ idempotent ออกแบบให้ทนต่อข้อผิดพลาดโดยสามารถกู้คืนข้อมูลคิวจากฐานข้อมูลและดำเนินการต่อได้เมื่อคอนเทนเนอร์ล้มเหลว",
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
          "แยก state transition logic ออกจาก business logic อย่างสมบูรณ์ ออกแบบและพัฒนาสถาปัตยกรรมแบบ loose coupling ที่บำรุงรักษาง่าย"
        ],
        "decisions": [
          {
            "title": "การควบคุมกระบวนการตรวจสอบการแปลด้วย State Machine",
            "detail": "ออกแบบให้ลูปของการตรวจสอบการแปล -> การแปลซ้ำถูกควบคุมด้วย state machine 9 สถานะ การแยก state transition logic ออกจาก business logic ทำให้การเปลี่ยนแปลงเงื่อนไขการแตกสาขาไม่กระทบกับขั้นตอนอื่น ๆ สร้างโครงสร้างแบบ loose coupling"
          },
          {
            "title": "การออกแบบ Immutable Schema ที่เน้นการสังเกตการณ์ได้",
            "detail": "เลือกใช้วิธีบันทึกผลลัพธ์ของทุกขั้นตอนเป็นข้อมูลถาวรในฐานข้อมูล เมื่อเกิดปัญหาความแม่นยำในการแปลสามารถวิเคราะห์สาเหตุด้วย SQL ได้ และข้อมูลสามารถนำไปใช้ปรับปรุงโมเดล AI ในอนาคตได้โดยตรง นอกจากนี้ยังสามารถตรวจสอบสถานะการประมวลผลด้วย DB SELECT เพียงอย่างเดียว ลดภาระการตรวจสอบการทำงานของนักพัฒนาและการตรวจสอบคุณภาพการแปลของฝ่ายธุรกิจ"
          },
          {
            "title": "การออกแบบทนต่อข้อผิดพลาดด้วย Celery Task แบบ Idempotent",
            "detail": "พัฒนาแต่ละขั้นตอนของ state transition เป็น Celery task แบบ idempotent ด้วยการตั้งค่า retry แบบ exponential backoff + jitter ทำให้ส่วน polling ของ API สามารถ retry ได้อย่างปลอดภัย แม้คอนเทนเนอร์ล้มเหลวและ Redis queue สูญหาย ก็สามารถกู้คืนข้อมูลคิวจากสถานะในฐานข้อมูลและดำเนินการต่อได้"
          }
        ],
        "outcomes": [
          {
            "before": "สถานะการประมวลผลหลังการแปลเป็น black box ไม่มีทางตรวจสอบการทำงานได้นอกจากดูล็อกด้วยตาเปล่า",
            "after": "สามารถตรวจสอบสถานะการประมวลผลผ่าน API เดียว วิเคราะห์สาเหตุปัญหาความแม่นยำในการแปลด้วย SQL ลดเวลาตรวจสอบของทั้งนักพัฒนาและฝ่ายธุรกิจ",
            "metric": "การเพิ่ม observability และความสามารถในการกู้คืนจากข้อผิดพลาด"
          }
        ],
        "challenges": [
          {
            "title": "การออกแบบการกู้คืนเมื่อคอนเทนเนอร์ล้มเหลว",
            "resolution": "เนื่องจาก Redis queue เป็นข้อมูลชั่วคราว จึงสร้างกลไกกู้คืนข้อมูลคิวจากสถานะในฐานข้อมูลเมื่อคอนเทนเนอร์รีสตาร์ท ออกแบบแต่ละ task ให้เป็น idempotent เพื่อให้สามารถดำเนินการต่อจากจุดที่หยุดไปได้อย่างปลอดภัย"
          },
          {
            "title": "การแยก State Transition Logic ออกจาก Business Logic",
            "resolution": "จัดการเงื่อนไขการเปลี่ยนแปลงสถานะและ business logic ในแต่ละขั้นตอนเป็นโมดูลแยกกันอย่างสมบูรณ์ สร้างการออกแบบแบบ loose coupling ที่การเปลี่ยนแปลงฝั่งใดฝั่งหนึ่งไม่กระทบอีกฝั่ง รับประกันความสามารถในการบำรุงรักษา"
          }
        ]
      },
      {
        "title": "การจัดทำเอกสารทดสอบป้องกัน regression และการกำหนดแนวทางทดสอบด้วย AI",
        "summary": "จัดทำเอกสารทดสอบแบบ manual เพื่อป้องกัน regression ในการ refactoring หลังจากรีลีสครั้งแรก ประเมินข้อจำกัดด้านความน่าเชื่อถือของ generative AI (agent-browser) ที่มีพฤติกรรมแบบ non-deterministic อย่างตรงไปตรงมา และกำหนดแนวทางการเปลี่ยนผ่านแบบค่อยเป็นค่อยไปจากทดสอบแบบ manual ไปยัง E2E และ component test ตัดสินใจอย่างเป็นจริงที่จะจำกัดส่วนที่ผูกกับ OnlyOffice editor (Canvas) ไว้เฉพาะการทดสอบแบบ manual",
        "difficulty": "medium",
        "technologies": [
          "Storybook",
          "Playwright",
          "Vitest",
          "React Testing Library",
          "agent-browser"
        ],
        "highlights": [
          "ประเมินข้อจำกัดด้านความน่าเชื่อถือของ generative AI ที่มีพฤติกรรมแบบ non-deterministic และกำหนดแนวทางการทดสอบอัตโนมัติแบบค่อยเป็นค่อยไป (manual -> E2E -> component)"
        ],
        "decisions": [
          {
            "title": "การกำหนดแนวทางทดสอบโดยพิจารณาพฤติกรรม non-deterministic ของ generative AI (agent-browser)",
            "detail": "กำหนดแนวทางการทำทดสอบอัตโนมัติแบบค่อยเป็นค่อยไป แทนที่จะให้ AI ทดสอบอย่างไร้ระบบ (1) จัดระเบียบการทดสอบ manual ด้วยเอกสารข้อกำหนดการทดสอบก่อน (2) เปลี่ยนผ่านไปยังการทดสอบ E2E และ component test แบบ deterministic (3) ใช้ agent-browser เฉพาะในการสร้างโค้ดทดสอบ E2E แบบ deterministic เท่านั้น ไม่ใช่ในการทดสอบ manual"
          },
          {
            "title": "แนวทางทดสอบ UI ที่ผูกกับ OnlyOffice Editor (Canvas)",
            "detail": "ตัดสินว่าการทำ Fake ของ OnlyOffice editor จะลดประสิทธิภาพของการทดสอบ เนื่องจากการทดสอบ E2E บน Canvas ด้วยตำแหน่งสัมพันธ์ของ DOM มีแนวโน้มไม่เสถียร จึงตัดสินใจอย่างตรงไปตรงมาที่จะจำกัดส่วนที่ผูกกับ OnlyOffice ไว้เฉพาะการทดสอบแบบ manual"
          }
        ],
        "outcomes": [
          {
            "before": "ไม่มีมาตรการป้องกัน regression สำหรับการ refactoring และยังไม่มีแนวทางทดสอบ",
            "after": "จัดทำเอกสารทดสอบ manual เพื่อป้องกัน regression และจัดระเบียบการทดสอบ manual หลังจากประเมินข้อจำกัดด้านความน่าเชื่อถือของ generative AI อย่างตรงไปตรงมา กำหนดแนวทางเปลี่ยนผ่านแบบค่อยเป็นค่อยไปจาก manual ไปยัง E2E และ component test เอกสารการตัดสินใจจำกัดส่วนที่ผูกกับ OnlyOffice ไว้เฉพาะการทดสอบ manual",
            "metric": "การจัดระเบียบกลยุทธ์การทดสอบและระบบประกันคุณภาพ"
          }
        ],
        "challenges": [
          {
            "title": "การตัดสินข้อจำกัดของการทดสอบอัตโนมัติสำหรับ UI ที่ผูกกับ OnlyOffice Editor (Canvas)",
            "resolution": "แยกเป้าหมายการทดสอบออกเป็น \"พื้นที่ที่สามารถทำอัตโนมัติได้\" และ \"พื้นที่ที่ต้องทดสอบ manual\" อย่างชัดเจน ส่วนที่ผูกกับ OnlyOffice ครอบคลุมด้วยเอกสารทดสอบ manual ส่วน UI อื่น ๆ และ API logic กำหนดแนวทางทำอัตโนมัติด้วย E2E และ component test"
          }
        ]
      },
      {
        "title": "การออกแบบ Glossary และ Clean Architecture สำหรับฟีเจอร์ตรวจสอบการแปล",
        "summary": "ออกแบบ domain model, โครงสร้างข้อมูล glossary และ clean architecture (แยก UseCase/Repository/Domain) สำหรับฟีเจอร์ตรวจสอบการแปลทั้งหมด ออกแบบ schema ที่บันทึกการตัดสินใจของ generative AI ลงฐานข้อมูลอย่างถาวร เพื่อรับประกัน observability ของกระบวนการตรวจสอบ",
        "difficulty": "high",
        "technologies": [
          "Python",
          "FastAPI",
          "PostgreSQL"
        ],
        "highlights": [
          "ออกแบบ clean architecture แบบแยก UseCase/Repository/Domain สำหรับ logic ตรวจสอบการแปลทั้งหมด ทำให้การแบ่งงานให้สมาชิกในทีมทำได้ง่าย"
        ],
        "decisions": [
          {
            "title": "การใช้สถาปัตยกรรม 3 ชั้น แยก UseCase/Repository/Domain",
            "detail": "แยก logic ตรวจสอบการแปลออกเป็น 3 ชั้น: UseCase (ควบคุม business flow) / Repository (abstraction การเข้าถึงข้อมูล) / Domain (domain model และ validation) จำกัดการเรียก generative AI ไว้ในชั้น UseCase เพื่อจำกัดขอบเขตผลกระทบเมื่อเปลี่ยน AI model"
          },
          {
            "title": "การออกแบบ Schema ที่บันทึกการตัดสินใจของ Generative AI ลงฐานข้อมูลอย่างถาวร",
            "detail": "เลือกใช้การออกแบบที่บันทึกการตัดสินใจของ generative AI ในแต่ละขั้นตอนการตรวจสอบ (คะแนนคุณภาพการแปล, ความจำเป็นในการแปลซ้ำ, ข้อเสนอแนะการแก้ไขคำศัพท์) เป็นเรคคอร์ดในฐานข้อมูลทั้งหมด เป็นพื้นฐานสำหรับสะสมข้อมูลที่จำเป็นสำหรับการเปรียบเทียบความแม่นยำของ AI model และการปรับปรุง prompt ในอนาคต"
          }
        ],
        "outcomes": [
          {
            "before": "logic ตรวจสอบการแปลไม่มีการออกแบบ ไม่มีเกณฑ์สำหรับการแบ่งงานภายในทีม",
            "after": "สถาปัตยกรรม 3 ชั้นทำให้ความรับผิดชอบของแต่ละชั้นชัดเจน สร้างระบบที่สมาชิกสามารถพัฒนาชั้น Repository และ UseCase แบบขนานได้ เอกสารการออกแบบทำหน้าที่เป็นเกณฑ์ในการแบ่งงาน",
            "metric": "สร้างพื้นฐานการออกแบบที่รองรับการพัฒนาแบบขนานสำหรับทีม 4 คน"
          }
        ],
        "challenges": [
          {
            "title": "การออกแบบเพื่อรวม output แบบ non-deterministic ของ generative AI เข้ากับ domain model",
            "resolution": "กำหนดประเภทของ output ของ AI เป็น \"ผลการตัดสิน\" ออกแบบ flow ที่ validation ในชั้น Domain แล้วบันทึกลงฐานข้อมูลอย่างถาวร สร้างโครงสร้างที่แม้รูปแบบ output ของ AI เปลี่ยนไป ก็สามารถรองรับได้ด้วย validation ในชั้น Domain"
          }
        ]
      },
      {
        "title": "การพัฒนาอัลกอริทึมการค้นหาตัวอย่างการใช้งานแบบ Quasi-Exact Match สำหรับ Glossary",
        "summary": "พัฒนาอัลกอริทึมสำหรับค้นหาตัวอย่างการใช้งานใน glossary ที่ยอมรับความแตกต่างของการเขียน, อนุภาค, เครื่องหมายวรรคตอน ในขณะที่ส่งคืนผลลัพธ์ที่ตรงกันทางความหมายอย่างแม่นยำ แก้ปัญหาที่ full-text search มีความแม่นยำไม่เพียงพอ และ exact match พลาดผลลัพธ์มากเกินไป",
        "difficulty": "high",
        "technologies": [
          "Python",
          "PostgreSQL"
        ],
        "highlights": [
          "ออกแบบ logic การค้นหาแบบ \"quasi-exact match\" ที่อยู่ระหว่าง full-text search กับ exact match บรรลุการค้นหาคำศัพท์ที่มีความแม่นยำสูงในขณะที่ยอมรับความแตกต่างของการเขียน"
        ],
        "decisions": [
          {
            "title": "การออกแบบวิธี \"Quasi-Exact Match\" ที่ไม่ใช่ทั้ง Full-Text Search และ Exact Match",
            "detail": "full-text search ของ PostgreSQL (tsvector) ให้ผลลัพธ์มากเกินไปเนื่องจากความแตกต่างของอนุภาคและเครื่องหมายวรรคตอนในภาษาญี่ปุ่น ในขณะที่ exact match พลาดผลลัพธ์เนื่องจากความแตกต่างของการเขียน จึงออกแบบวิธีกลางที่เปรียบเทียบข้อความหลังจากใช้การ normalize (ลบเครื่องหมายวรรคตอน, ปรับช่องว่างให้เท่ากัน, ยอมรับรูปแบบอนุภาค) เพื่อให้ได้ทั้งความแม่นยำและ recall"
          }
        ],
        "outcomes": [
          {
            "before": "full-text search ให้ผลลัพธ์ที่ไม่เกี่ยวข้องกับคำศัพท์การแปล exact match ไม่สามารถค้นหาตัวอย่างการใช้งานที่ต้องการเนื่องจากความแตกต่างของการเขียน",
            "after": "อัลกอริทึม quasi-exact match ยอมรับความแตกต่างของการเขียน, อนุภาค, เครื่องหมายวรรคตอน ในขณะที่ส่งคืนเฉพาะตัวอย่างการใช้งานที่ตรงทางความหมาย เพิ่มความสามารถในการใช้งาน glossary อย่างมาก",
            "metric": "เพิ่มความแม่นยำในการค้นหา glossary (ลดผลลัพธ์ที่ไม่ถูกต้องและปรับปรุง recall ไปพร้อมกัน)"
          }
        ],
        "challenges": [
          {
            "title": "การจัดระเบียบรูปแบบความแตกต่างของการเขียนในข้อความภาษาญี่ปุ่น",
            "resolution": "รวบรวมและจำแนกรูปแบบความแตกต่างของการเขียนที่พบบ่อยจากเอกสารแปล (การผสมเครื่องหมายวรรคตอน, การสลับอนุภาค, การผสมตัวอักษรเต็มความกว้างและครึ่งความกว้าง) พัฒนาเป็นกฎ normalize และตรวจสอบอย่างครอบคลุมด้วย test case"
          }
        ]
      },
      {
        "title": "การปรับเปลี่ยน Serial Network IO ของ Celery Task ให้เป็นแบบ Concurrent ด้วย asyncio",
        "summary": "เปลี่ยน serial network IO ไปยัง external service หลายตัว เช่น translation API, glossary API ให้เป็นการทำงานแบบ concurrent ด้วย asyncio event loop สร้างรูปแบบการผสานรวม asyncio กับ synchronous worker model ของ Celery อย่างปลอดภัย ปรับปรุง latency และ throughput",
        "difficulty": "high",
        "technologies": [
          "Python",
          "Celery",
          "asyncio"
        ],
        "highlights": [
          "สร้างรูปแบบการเริ่ม asyncio event loop อย่างปลอดภัยภายใน Celery synchronous worker เปลี่ยนการเรียก external API ที่เคยเป็น serial ให้เป็น concurrent"
        ],
        "decisions": [
          {
            "title": "การใช้รูปแบบผสานรวม asyncio Event Loop ภายใน Celery Synchronous Worker",
            "detail": "เลือกใช้รูปแบบที่เริ่ม event loop ด้วย asyncio.run() ภายใน task โดยคงโมเดล synchronous worker (prefork) ของ Celery ไว้ ไม่เลือกแผนเปลี่ยน Celery เป็น async worker เนื่องจากความเสี่ยงด้านความเข้ากันได้ของ ecosystem สูง และ thread pool (ThreadPoolExecutor) ถูกปฏิเสธเนื่องจากปัญหา thread ถูกใช้งานอย่างสิ้นเปลืองระหว่างรอ IO"
          }
        ],
        "outcomes": [
          {
            "before": "การเรียก translation API และ glossary API เป็นแบบ serial ทำให้ต้องรอ 3 external API ตามลำดับ ส่งผลให้เวลาประมวลผลต่อ request ยาวนาน",
            "after": "เปลี่ยนการเรียก external API เป็นแบบ concurrent ด้วย asyncio.gather ลดเวลาประมวลผลจากผลรวมเวลาตอบสนองของแต่ละ API เหลือเพียงเวลาตอบสนองของ API ที่ช้าที่สุด",
            "metric": "ลด latency และเพิ่ม throughput ในส่วนเรียก external API"
          }
        ],
        "challenges": [
          {
            "title": "การอยู่ร่วมกันของ Synchronous Execution Model ของ Celery กับ asyncio",
            "resolution": "เนื่องจาก prefork worker ของ Celery เป็นแบบ process-based จึงเลือกใช้วิธีสร้าง asyncio event loop ใหม่ในแต่ละ task แล้วทิ้ง จำกัด lifecycle ของ event loop ไว้ในขอบเขตของ task เพื่อกำจัดการรบกวนระหว่าง worker"
          }
        ]
      },
      {
        "title": "การเพิ่มประสิทธิภาพอัลกอริทึม Text Matching สำหรับการแทรก Content Control",
        "summary": "ปรับปรุงอัลกอริทึม matching ระหว่างข้อความต้นฉบับกับโครงสร้างเอกสารเพื่อแทรก marker ในตำแหน่งที่ต้องแปลอย่างแม่นยำ บรรลุทั้งความแม่นยำของ matching และประสิทธิภาพสำหรับเอกสารขนาดใหญ่",
        "difficulty": "extreme",
        "technologies": [
          "Python"
        ],
        "highlights": [
          "ปรับปรุงอัลกอริทึมการค้นหาให้บรรลุความเร็วการประมวลผลที่ใช้งานได้จริงสำหรับเอกสารขนาดใหญ่โดยยังคงความแม่นยำ"
        ],
        "decisions": [
          {
            "title": "การลดพื้นที่ค้นหาด้วยกลยุทธ์ Matching แบบหลายขั้นตอน",
            "detail": "เลือกใช้กลยุทธ์ที่ดำเนินการ matching ระหว่างข้อความต้นฉบับกับโครงสร้างเอกสาร (paragraph, cell, list item) ตามลำดับ 3 ขั้นตอน: exact match -> normalized match -> partial match โดยตัดจุดที่ยืนยันแล้วในขั้นตอนก่อนหน้าออกจากพื้นที่ค้นหา ลดปริมาณการคำนวณในขณะที่ยังคงความแม่นยำ"
          }
        ],
        "outcomes": [
          {
            "before": "การประมวลผล matching สำหรับเอกสารขนาดใหญ่ (100+ หน้า) ใช้เวลานาน และมีปัญหาด้านความแม่นยำของ content control",
            "after": "กลยุทธ์ matching แบบหลายขั้นตอนบรรลุความเร็วการประมวลผลที่ใช้งานได้จริงสำหรับเอกสารขนาดใหญ่ ความแม่นยำของ matching ก็ปรับปรุงขึ้น เพิ่มความน่าเชื่อถือของการแทรก marker ในตำแหน่งที่ต้องแปล",
            "metric": "ปรับปรุงความเร็ว matching สำหรับเอกสารขนาดใหญ่และเพิ่มความแม่นยำ"
          }
        ],
        "challenges": [
          {
            "title": "Trade-off ระหว่างความละเอียดของการแบ่งโครงสร้างเอกสารกับความแม่นยำของ Matching",
            "resolution": "ปรับความละเอียดของการแบ่งข้อความตามโครงสร้างภายในของเอกสาร Word (paragraph, table cell, list item, header/footer) หากแบ่งละเอียดเกินไปจะมีตัวเลือก matching มากขึ้นทำให้ช้า หากหยาบเกินไปจะลดความแม่นยำของ partial match แก้ปัญหาด้วยกฎการแบ่งแยกตามประเภทขององค์ประกอบ"
          }
        ]
      },
      {
        "title": "การปรับปรุงสภาพแวดล้อมการพัฒนาฟรอนต์เอนด์ให้ทันสมัย",
        "summary": "นำ Vite, Vitest, Storybook, Biome, Playwright มาใช้พร้อมกันในฟรอนต์เอนด์ที่มีอยู่ ปรับปรุงประสบการณ์การพัฒนาและพื้นฐานคุณภาพโค้ด รวมถึงปรับปรุงความเร็วของ build และจัดเตรียม toolchain สำหรับ unit test, UI catalog, linter/formatter, E2E test",
        "difficulty": "high",
        "technologies": [
          "Vite",
          "Vitest",
          "Storybook",
          "Biome",
          "Playwright"
        ],
        "highlights": [
          "นำ 5 เครื่องมือ Vite/Vitest/Storybook/Biome/Playwright มาใช้ สร้างพื้นฐานการทดสอบ, การจัดการคุณภาพ และ UI catalog ตั้งแต่เริ่มต้น"
        ],
        "decisions": [
          {
            "title": "การเลือก Vite + Biome (ย้ายจาก webpack + ESLint/Prettier)",
            "detail": "ย้ายสภาพแวดล้อม build จาก webpack เป็น Vite และรวม ESLint+Prettier เข้ากับ Biome ด้วยความเร็ว hot reload ของ Vite และ lint/format ความเร็วสูงของ Biome ปรับปรุงความเร็วของ iteration ในการพัฒนาอย่างมาก"
          },
          {
            "title": "การนำ Volta มาใช้เพื่อรวมการจัดการเวอร์ชัน Node.js",
            "detail": "แก้ปัญหา build error ที่เกิดจากความไม่สอดคล้องของเวอร์ชัน Node.js ภายในทีมด้วย Volta กำหนดเวอร์ชันไว้ที่ project root เพื่อกำจัดความแตกต่างของสภาพแวดล้อมระหว่างสมาชิก"
          }
        ],
        "outcomes": [
          {
            "before": "ไม่มีทั้ง unit test, UI catalog, linter และ E2E test ไม่มีวิธีตรวจสอบคุณภาพโค้ดอย่างเป็นกลาง",
            "after": "นำ 5 เครื่องมือมาใช้แบบบูรณาการ: Vite (build), Vitest (unit test), Storybook (UI catalog), Biome (lint/format), Playwright (E2E) ปรับปรุงพื้นฐานการพัฒนาใหม่ทั้งหมด",
            "metric": "สร้างพื้นฐานการทดสอบและการจัดการคุณภาพ (สร้างจากศูนย์)"
          }
        ],
        "challenges": [
          {
            "title": "การอยู่ร่วมกันของโปรเจกต์ PHP ที่มีอยู่กับ Vite",
            "resolution": "ออกแบบโครงสร้างแบบ hybrid ที่จัดการเฉพาะส่วน React ด้วย Vite โดยไม่ทำลายสภาพแวดล้อม PHP+jQuery ที่มีอยู่ สร้างโครงสร้างที่อ่าน build output ของ Vite จาก template ของ PHP เพื่อให้สามารถ migrate แบบ incremental ได้"
          }
        ]
      },
      {
        "title": "การสร้าง Mock อัตโนมัติสำหรับฟรอนต์เอนด์จาก OpenAPI Specification ของ Python Backend",
        "summary": "สร้างระบบที่สร้าง TypeScript type definition, API client และ mock handler อัตโนมัติด้วย MSW (Mock Service Worker) และ Orval จาก OpenAPI specification ที่ FastAPI สร้างอัตโนมัติ ทำให้การพัฒนาฟรอนต์เอนด์ไม่ต้องรอการพัฒนาแบ็กเอนด์อีกต่อไป",
        "difficulty": "high",
        "technologies": [
          "MSW",
          "Orval",
          "FastAPI",
          "Storybook"
        ],
        "highlights": [
          "สร้าง pipeline ที่สร้าง type definition, API client และ mock อัตโนมัติจาก OpenAPI specification กำจัดการพึ่งพาแบ็กเอนด์ของฟรอนต์เอนด์"
        ],
        "decisions": [
          {
            "title": "Pipeline สร้าง Mock อัตโนมัติโดยใช้ OpenAPI Specification เป็น Single Source of Truth",
            "detail": "ออกแบบ pipeline ที่ใช้ OpenAPI specification ที่ FastAPI สร้างอัตโนมัติเป็นแหล่งข้อมูลเดียว สร้าง TypeScript type definition และ API client ด้วย Orval และสร้าง mock handler ด้วย MSW เนื่องจากการเขียน mock ด้วยมือทำให้ยากต่อการติดตามการเปลี่ยนแปลง API จึงรับประกัน type safety และความทันสมัยของ mock ด้วยการสร้างอัตโนมัติจาก specification"
          }
        ],
        "outcomes": [
          {
            "before": "การพัฒนาฟรอนต์เอนด์ต้องรอจนกว่า backend API จะพัฒนาเสร็จ ไม่สามารถพัฒนาแบบขนานได้",
            "after": "ด้วยการสร้าง mock อัตโนมัติจาก OpenAPI specification ทำให้สามารถเริ่มพัฒนาฟรอนต์เอนด์ได้ทันทีที่คำนิยาม API ของแบ็กเอนด์ถูกกำหนด Mock API ยังทำงานบน Storybook ทำให้สามารถตรวจสอบการทำงานของ UI ได้โดยไม่ต้องใช้แบ็กเอนด์",
            "metric": "สร้างความสามารถในการพัฒนาแบบขนานระหว่างฟรอนต์เอนด์และแบ็กเอนด์"
          }
        ],
        "challenges": [
          {
            "title": "การรักษาความสอดคล้องของ Type ระหว่าง OpenAPI Schema กับ Orval/MSW",
            "resolution": "ทำให้การสร้างใหม่จาก OpenAPI schema เป็นอัตโนมัติใน CI เพื่อให้ type definition และ mock ของฟรอนต์เอนด์ติดตามการเปลี่ยนแปลง API ของแบ็กเอนด์โดยอัตโนมัติ ความไม่สอดคล้องของ type สามารถตรวจพบได้ทันทีในรูปแบบ TypeScript compile error"
          }
        ]
      },
      {
        "title": "การสร้างโครงสร้างพื้นฐาน Pull-Based Deploy ด้วย Docker Compose + GHCR",
        "summary": "สร้างสคริปต์อัตโนมัติสำหรับ build ด้วย Docker Compose -> push ไปยัง GHCR -> pull-based deploy บนเซิร์ฟเวอร์ production จัดเตรียมการจัดการ image ของ GHCR, การตั้งค่า visibility, การตั้งค่าสิทธิ์ และ cron-based pull deploy บนเซิร์ฟเวอร์ production",
        "difficulty": "high",
        "technologies": [
          "Docker",
          "GitHub Actions"
        ],
        "highlights": [
          "ย้ายจากการ deploy แบบ manual SSH+SCP ไปเป็น pull-based deploy ด้วย Docker Compose+GHCR สร้าง deploy flow ที่มีความสามารถในการทำซ้ำ"
        ],
        "decisions": [
          {
            "title": "การใช้ GHCR Pull-Based Deploy (ย้ายจากวิธี manual SSH+SCP)",
            "detail": "ย้ายจากวิธี deploy ที่นักพัฒนาล็อกอินเซิร์ฟเวอร์ผ่าน SSH แล้วอัปโหลดไฟล์ด้วย SCP ไปเป็น pull-based deploy ที่ push image ไปยัง GHCR แล้วเซิร์ฟเวอร์ production pull ด้วย cron รับประกันความสามารถในการทำซ้ำของ deploy และสามารถ rollback ได้ทันทีด้วยการสลับ image tag"
          },
          {
            "title": "การออกแบบ Visibility, สิทธิ์ และการจัดการ Image ของ GHCR",
            "detail": "จัดการ visibility ของ image ใน GitHub Container Registry ในระดับ Organization จัดเตรียมการตั้งค่าสิทธิ์ที่จำเป็นสำหรับ pull จากเซิร์ฟเวอร์ production (Personal Access Token + read:packages scope) และออกแบบกฎการตั้งชื่อ image tag"
          }
        ],
        "outcomes": [
          {
            "before": "การ deploy ขึ้นอยู่กับบุคคลด้วย manual SSH+SCP มีความเสี่ยงที่จะเกิดปัญหาจากข้อผิดพลาดของขั้นตอน ไม่มีวิธี rollback",
            "after": "รับประกันความสามารถในการทำซ้ำด้วย pull-based deploy ด้วย Docker Compose+GHCR สามารถ rollback ได้ง่ายด้วย auto pull แบบ cron-based และการจัดการ image tag",
            "metric": "การทำ deploy ให้เป็นอัตโนมัติและสร้างความสามารถในการทำซ้ำ"
          }
        ],
        "challenges": [
          {
            "title": "การรับประกันความน่าเชื่อถือของ Pull Deploy แบบ Cron-Based",
            "resolution": "รวม health check, การตรวจจับความแตกต่างของ image และฟังก์ชัน rollback เข้าใน pull script ออกแบบให้เมื่อ pull image ใหม่ล้มเหลว จะคงคอนเทนเนอร์ที่มีอยู่ไว้"
          }
        ]
      },
      {
        "title": "การทำให้ตั้งค่า TLS/CORS ของเซิร์ฟเวอร์ OnlyOffice ผ่าน Environment Variable ใน Docker",
        "summary": "กำหนดค่าให้สามารถตั้งค่า TLS certificate และ CORS origin ของ OnlyOffice document server ผ่าน environment variable เมื่อเริ่ม Docker โดยใช้การ inject สคริปต์ ทำให้การสลับการตั้งค่าระหว่างสภาพแวดล้อมเป็นเรื่องง่าย",
        "difficulty": "medium",
        "technologies": [
          "Docker"
        ],
        "highlights": [
          "เลือกใช้วิธีควบคุมผ่าน environment variable ด้วยการ inject สคริปต์เมื่อเริ่ม Docker แทนที่จะแก้ไขไฟล์ตั้งค่าของ OnlyOffice โดยตรง"
        ],
        "decisions": [
          {
            "title": "การ externalize การตั้งค่า OnlyOffice ด้วยวิธี Script Injection",
            "detail": "เนื่องจากวิธี mount ไฟล์ตั้งค่าของ OnlyOffice โดยตรงจะมีปัญหาความเข้ากันได้เมื่ออัปเกรดเวอร์ชัน จึงเลือกใช้วิธีสร้างไฟล์ตั้งค่าแบบ dynamic จาก environment variable ด้วย entrypoint script เมื่อเริ่ม Docker ทำให้สามารถสลับ TLS certificate path และ CORS origin ผ่าน environment variable"
          }
        ],
        "outcomes": [
          {
            "before": "การตั้งค่า TLS/CORS ของ OnlyOffice ถูกเขียนฝังในไฟล์ตั้งค่า ต้องแก้ไขด้วยมือเมื่อสลับสภาพแวดล้อม",
            "after": "สามารถควบคุม TLS certificate path และ CORS origin ผ่าน Docker environment variable ทำให้การสลับการตั้งค่าระหว่างสภาพแวดล้อม development, staging และ production เป็นอัตโนมัติ",
            "metric": "การทำให้การสลับสภาพแวดล้อมเป็นอัตโนมัติและ externalize การตั้งค่า"
          }
        ]
      },
      {
        "title": "การจัดทำเอกสารขั้นตอนการสร้างสภาพแวดล้อมพัฒนา E2E แบบ Local/Remote ผสม",
        "summary": "จัดทำเอกสารขั้นตอนการสร้างสภาพแวดล้อมพัฒนา E2E ที่เชื่อมต่อ React+Python บน local กับ PHP บนเซิร์ฟเวอร์ remote ให้สามารถทำซ้ำได้ สร้างคู่มือที่รวม Docker Compose, การตั้งค่าเครือข่าย และการจัดการ environment variable เพื่อเพิ่มประสิทธิภาพการ onboarding สมาชิกใหม่",
        "difficulty": "medium",
        "technologies": [
          "Docker",
          "Python",
          "FastAPI"
        ],
        "highlights": [
          "จัดทำเอกสารขั้นตอนการทำซ้ำสภาพแวดล้อม local/remote ผสม ลดเวลาสร้างสภาพแวดล้อมของสมาชิกใหม่"
        ],
        "decisions": [
          {
            "title": "การมาตรฐานขั้นตอนสร้างสภาพแวดล้อมด้วย Docker Compose Integration",
            "detail": "รวมการตั้งค่าเครือข่าย Docker Compose, template ของ environment variable และขั้นตอนยืนยันการเชื่อมต่อสำหรับเชื่อมต่อคอนเทนเนอร์ React+Python บน local กับ PHP+OnlyOffice บนเซิร์ฟเวอร์ remote ไว้ในเอกสารเดียว มุ่งหวังให้สมาชิกใหม่สามารถทำซ้ำสภาพแวดล้อม E2E ได้โดยทำตามเอกสาร"
          }
        ],
        "outcomes": [
          {
            "before": "ขั้นตอนสร้างสภาพแวดล้อมถูกถ่ายทอดด้วยปากเปล่าและขึ้นอยู่กับบุคคล สมาชิกใหม่ใช้เวลา 1-2 วันในการสร้างสภาพแวดล้อม",
            "after": "คู่มือที่สามารถทำซ้ำได้ช่วยขจัดการขึ้นอยู่กับบุคคลของขั้นตอนสร้างสภาพแวดล้อม จัดเตรียมเอกสาร step-by-step ที่รวม Docker Compose, การตั้งค่าเครือข่าย และ environment variable",
            "metric": "เพิ่มประสิทธิภาพ onboarding สมาชิกใหม่"
          }
        ]
      },
      {
        "title": "การสร้างสภาพแวดล้อมทดสอบ E2E ด้วย Playwright และการพัฒนา Test Scenario",
        "summary": "สร้างสภาพแวดล้อมทดสอบ E2E ด้วย Playwright ที่ครอบคลุม workflow การแปลทั้งหมดที่เชื่อมต่อ React/Python/OnlyOffice เนื่องจาก Canvas element ของ OnlyOffice มีข้อจำกัดในการทดสอบ E2E จึงแบ่งขอบเขตที่สามารถทดสอบได้กับขอบเขตที่ต้องทดสอบ manual อย่างชัดเจน",
        "difficulty": "high",
        "technologies": [
          "Playwright",
          "Docker"
        ],
        "highlights": [
          "พัฒนา regression test scenario สำหรับ workflow การแปลทั้งหมด แบ่งขอบเขตที่สามารถทำอัตโนมัติได้กับขอบเขตที่ต้องทดสอบ manual อย่างชัดเจน"
        ],
        "decisions": [
          {
            "title": "การแบ่งเส้นที่ชัดเจนระหว่างพื้นที่ที่ทำอัตโนมัติได้กับพื้นที่ที่ต้องทดสอบ Manual",
            "detail": "เนื่องจากการดำเนินการที่ขึ้นอยู่กับ Canvas element ของ OnlyOffice editor ยากที่จะทดสอบ E2E ด้วย Playwright อย่างเสถียร จึงแบ่งเป้าหมายการทดสอบเป็น \"operation flow ของ workflow การแปลและ API integration\" กับ \"การดำเนินการเอกสารภายใน OnlyOffice\" กำหนดแนวทางครอบคลุมเฉพาะส่วนแรกด้วย E2E test"
          }
        ],
        "outcomes": [
          {
            "before": "ไม่มีสภาพแวดล้อมทดสอบ E2E regression test สำหรับการเพิ่มฟีเจอร์และ refactoring เป็นแบบ manual เท่านั้น",
            "after": "พัฒนา regression test scenario สำหรับ workflow การแปลทั้งหมด (อัปโหลดไฟล์ -> ดำเนินการแปล -> ตรวจสอบผลลัพธ์) ด้วย Playwright ทำให้สามารถดำเนินการ integration test ของ React+Python+PostgreSQL อัตโนมัติในสภาพแวดล้อม Docker",
            "metric": "การทำ regression test ให้เป็นอัตโนมัติด้วย E2E test (ครอบคลุมพื้นที่ที่ทดสอบได้)"
          }
        ],
        "challenges": [
          {
            "title": "การสร้างสภาพแวดล้อมทดสอบที่เชื่อมต่อ 3 เซอร์วิส React+Python+OnlyOffice",
            "resolution": "ออกแบบโครงสร้างเครือข่ายที่เริ่ม 3 เซอร์วิสด้วย Docker Compose และเข้าถึงได้จาก test runner ของ Playwright จัดการข้อมูลเริ่มต้นสำหรับทดสอบและการ cleanup เป็น fixture เพื่อรับประกันความเป็นอิสระของแต่ละ test"
          }
        ]
      },
      {
        "title": "การสร้าง Dashboard เพิ่มประสิทธิภาพการพัฒนา, MCP รวบรวม Log และ Agent สร้าง Story",
        "summary": "สร้าง dashboard ที่แสดงสถานะการทำงานของ Celery task และอัตราความสำเร็จ/ล้มเหลวของการตรวจสอบการแปล นอกจากนี้ยังสร้าง MCP server ที่ค้นหา log จากสภาพแวดล้อมกระจายผ่าน Claude Code และ sub-agent ที่สร้าง Storybook Story อัตโนมัติจาก component เพื่อเพิ่มประสิทธิภาพการพัฒนา",
        "difficulty": "medium",
        "technologies": [
          "Python",
          "Storybook",
          "agent-browser"
        ],
        "highlights": [
          "สร้างโครงสร้างพื้นฐานสนับสนุนการพัฒนาที่ใช้เครื่องมือ AI เช่น MCP server สำหรับค้นหา log และ agent สร้าง Story อัตโนมัติ"
        ],
        "decisions": [
          {
            "title": "การรวม Log กระจายเข้ากับ Claude Code ผ่าน MCP Server",
            "detail": "สร้าง MCP server ที่ค้นหา log ข้ามคอนเทนเนอร์ React, Python, Celery จาก Claude Code เดิมต้องตรวจสอบ log ทีละตัวด้วย docker logs + grep แต่ด้วยการทำเป็น MCP tool ทำให้สามารถค้นหาและกรอง log จากในบทสนทนาของ Claude Code ได้"
          },
          {
            "title": "การสร้าง Storybook Story อัตโนมัติด้วย agent-browser",
            "detail": "สร้าง sub-agent ที่สร้าง Storybook Story อัตโนมัติจาก React component ที่มีอยู่ agent-browser วิเคราะห์การ implement ของ component แล้วสร้าง Story file ที่ครอบคลุม props และ state pattern อย่างครอบคลุม เร่งการจัดเตรียม UI catalog"
          }
        ],
        "outcomes": [
          {
            "before": "ต้องดำเนินการ docker logs + grep ด้วยมือเพื่อตรวจสอบ log คอนเทนเนอร์กระจาย ใช้เวลานานในการตรวจสอบปัญหา Storybook Story ก็ต้องสร้างด้วยมือสำหรับ UI component แต่ละตัว",
            "after": "MCP server ทำให้สามารถค้นหา log ข้ามจาก Claude Code สร้าง dashboard ที่แสดงสถานะการทำงานของ Celery task และอัตราความสำเร็จ/ล้มเหลวของการตรวจสอบการแปล เพิ่มประสิทธิภาพการตรวจสอบปัญหาและการติดตามคุณภาพ",
            "metric": "เพิ่มประสิทธิภาพการตรวจสอบปัญหาและการพัฒนา รวมถึงเร่งการจัดเตรียม UI catalog"
          }
        ]
      }
    ]
  },
  {
    "id": "learning-platform-consulting-2025",
    "company": "บริษัทแพลตฟอร์มการเรียนรู้ออนไลน์ขนาดกลาง",
    "companyDesc": "บริษัทที่ให้บริการแพลตฟอร์มการเรียนรู้ออนไลน์ขนาดกลาง สนับสนุนการวิเคราะห์ทางเทคนิคและจัดทำข้อเสนอสำหรับความต้องการขยายระบบธุรกิจแบบบูรณาการในระยะสั้น",
    "role": "การสำรวจทางเทคนิคและจัดทำเอกสาร",
    "roles": ["Consulting"],
    "period": "2025-05 — 2025-07",
    "teamSize": 2,
    "summary": "วิเคราะห์คุณภาพเชิงปริมาณของระบบ legacy บน VBScript/Oracle ด้วย SonarQube สนับสนุนการเลือกกลยุทธ์ด้วย comparison matrix 3 ทางเลือก (ปรับปรุง/นำ ERP มาใช้/browser extension) บน 7 เกณฑ์ สร้างระบบค้นหาเอกสารภายในแบบ RAG ด้วย NotebookLM+markitdown ใช้เครื่องมือ generative AI สร้างผลลัพธ์ในโปรเจกต์ที่ปรึกษาระยะสั้นประมาณ 2 เดือน",
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
        "title": "การสร้างระบบค้นหาเอกสารภายในแบบ RAG",
        "summary": "แปลงเอกสารภายในเป็น Markdown ด้วย markitdown แล้วจัดเตรียมสภาพแวดล้อมค้นหาแบบ RAG ด้วย NotebookLM เชื่อมต่อ Claude Desktop + SonarQube ผ่าน MCP เพื่อเพิ่มประสิทธิภาพ flow การสกัดประเด็นสำคัญของปัญหาคุณภาพและการจัดรูปแบบ",
        "difficulty": "medium",
        "technologies": [
          "SonarQube",
          "NotebookLM",
          "markitdown",
          "Claude"
        ],
        "highlights": [
          "ออกแบบสถาปัตยกรรมระบบค้นหาแบบ RAG ด้วย NotebookLM+markitdown และสร้าง pipeline แปลงเอกสาร",
          "เสนอแนวทางต้นทุนต่ำและส่งมอบเร็วด้วยการใช้ SaaS ที่มีอยู่ (NotebookLM) แทนการพัฒนา custom RAG"
        ],
        "decisions": [
          {
            "title": "การสร้าง RAG แบบลดเวลาด้วย NotebookLM + markitdown",
            "detail": "ใช้ NotebookLM ของ Google แปลงเอกสารภายใน (PDF/Word/Excel) เป็นข้อความด้วย markitdown แล้วนำเข้า ลดต้นทุนด้วยการใช้ SaaS ที่มีอยู่แทนการสร้าง custom RAG"
          }
        ],
        "outcomes": [
          {
            "before": "เอกสารภายในกระจายอยู่ตาม file server และ cloud storage ของแต่ละแผนก ไม่สามารถค้นหาข้ามได้ ใช้เวลานานในการหาข้อมูลที่ต้องการ",
            "after": "สร้างระบบค้นหาแบบ RAG ด้วย NotebookLM + markitdown แปลงเอกสารภายในเป็น Markdown แล้วนำเข้า ทำให้สามารถค้นหาข้ามด้วยภาษาธรรมชาติได้ บรรลุสภาพแวดล้อมการค้นหาที่ใช้งานได้จริงภายในระยะเวลาที่ปรึกษาประมาณ 2 สัปดาห์",
            "metric": "เพิ่มประสิทธิภาพการค้นหาเอกสารภายใน"
          }
        ],
        "challenges": [
          {
            "title": "การแปลงเอกสารภายในหลากหลายรูปแบบให้สามารถค้นหาด้วย RAG ได้",
            "resolution": "ใช้ markitdown แปลง PDF/Word/Excel เป็นรูปแบบ Markdown สร้าง pipeline แปลงที่รักษาข้อมูลโครงสร้าง (หัวข้อ, ตาราง, รายการ) ไว้ให้มากที่สุด ตรวจสอบคุณภาพ Markdown หลังแปลงด้วยมือ แก้ไขตามความจำเป็นก่อนนำเข้า NotebookLM"
          }
        ]
      },
      {
        "title": "การสำรวจโครงสร้างโค้ดของระบบ Legacy และการวิเคราะห์ความสามารถในการขยาย",
        "summary": "วิเคราะห์ static ของระบบ legacy บน VBScript/Oracle ด้วย Cursor/SonarQube/Claude Desktop วิเคราะห์ความสามารถในการขยาย ความยากในการปรับปรุง dependency และจัดการ/เปรียบเทียบทางเลือก ERP, ปรับปรุงที่มีอยู่ และแผนขยาย",
        "difficulty": "medium",
        "technologies": [
          "SonarQube",
          "Cursor",
          "ChatGPT",
          "Claude"
        ],
        "highlights": [
          "ดำเนินการวิเคราะห์ static ด้วย SonarQube และจัดทำรายงานประเมินความเสี่ยงในการปรับปรุงตามโมดูล",
          "ให้ข้อมูลพื้นฐานสำหรับการตัดสินใจใช้แนวทาง browser extension ผ่านการแสดงภาพความเสี่ยงในการปรับปรุงบนข้อมูลเชิงปริมาณ"
        ],
        "decisions": [
          {
            "title": "การวัดคุณภาพโค้ด Legacy เชิงปริมาณด้วย SonarQube",
            "detail": "ใช้ SonarQube วิเคราะห์ static ของโค้ดทั้งหมด วัดตัวชี้วัด bug, code smell, อัตราซ้ำซ้อน และ test coverage เชิงปริมาณ จัดเตรียมข้อมูลเพื่อประเมินความเสี่ยงในการปรับปรุงอย่างเป็นกลาง"
          },
          {
            "title": "ข้อเสนอลำดับความสำคัญการปรับปรุงบนข้อมูลเชิงปริมาณ",
            "detail": "จัดระเบียบผลการวิเคราะห์ static ตามหน่วยโมดูล แมปจุดที่มีความเสี่ยงสูงในการปรับปรุงกับขอบเขตผลกระทบ เสนอลำดับความสำคัญการปรับปรุงบนหลักฐานเชิงปริมาณ"
          }
        ],
        "outcomes": [
          {
            "before": "ไม่มีการประเมินคุณภาพโค้ดอย่างเป็นกลาง ความเสี่ยงในการปรับปรุงไม่ชัดเจน",
            "after": "ประเมินคุณภาพโค้ดเชิงปริมาณด้วยการวิเคราะห์ SonarQube ระบุจุดที่มีความเสี่ยงสูงในการปรับปรุงและแสดงภาพรวมหนี้ทางเทคนิค",
            "metric": "ทำให้ความเสี่ยงในการปรับปรุงเป็นกลางบนการประเมินเชิงปริมาณ ใช้เป็นหลักฐานสนับสนุนการใช้แนวทาง browser extension"
          }
        ],
        "challenges": [
          {
            "title": "การสำรวจในสภาพแวดล้อม Legacy ที่ไม่มี Version Control และการทดสอบ",
            "resolution": "วัดคุณภาพเชิงปริมาณด้วยการวิเคราะห์ static ของ SonarQube และดำเนินการสำรวจโดยเชื่อมต่อกับ read-only replica ของ Oracle DB โดยไม่กระทบสภาพแวดล้อม production จัดทำรายงานสรุปผลการวิเคราะห์ในรูปแบบสไลด์เพื่อแสดงภาพความเสี่ยงทางเทคนิคต่อผู้บริหาร"
          }
        ]
      },
      {
        "title": "การจัดทำเอกสารสนับสนุนการตัดสินใจและแนวคิด PoC สำหรับแผนขยายระยะสั้น",
        "summary": "จัดทำเอกสารข้อเสนอที่ใช้ diagram flow/structure ด้วย Mermaid อย่างเข้มข้น ใช้ generative AI เช่น Genspark, Gamma, Canva เร่งกระบวนการสร้างเอกสารด้วย iteration ระยะสั้น",
        "difficulty": "medium",
        "technologies": [
          "Genspark",
          "Gamma",
          "Canva",
          "Mermaid"
        ],
        "highlights": [
          "ออกแบบ comparison matrix 3 ทางเลือกบน 7 เกณฑ์ประเมินและ decision tree กำหนดสถาปัตยกรรม PoC สำหรับ React browser extension",
          "จำแนกความต้องการของ 6 แผนกเป็น 3 ระดับ: \"รองรับด้วย extension ได้/ต้องปรับปรุงโค้ด/รอ ERP\" แสดงแนวโน้มการบรรลุให้แต่ละแผนก"
        ],
        "decisions": [
          {
            "title": "สนับสนุนการเลือกกลยุทธ์ด้วย Framework เปรียบเทียบ 3 ทางเลือก",
            "detail": "สร้าง matrix เปรียบเทียบ 3 ทางเลือกบน 7 เกณฑ์ประเมิน (ความเสี่ยงในการพัฒนา, ต้นทุน, ระยะเวลา, การประกันคุณภาพ, ผลกระทบต่อการดำเนินงาน, ความสามารถในการขยาย, ROI) และแสดง flow การตัดสินใจในรูปแบบ decision tree"
          },
          {
            "title": "ข้อเสนอแนวทางปรับปรุงความเสี่ยงต่ำด้วย React Browser Extension",
            "detail": "เสนอแนวทางวาง React UI ซ้อนบนหน้าจอ legacy เป็น Chrome extension ออกแบบ PoC ที่ implement dropdown แบบลำดับชั้นสำหรับ discount master ทางฝั่งฟรอนต์เอนด์โดยไม่เปลี่ยนแปลง DB หรือ backend logic ที่มีอยู่"
          }
        ],
        "outcomes": [
          {
            "before": "ไม่มีเกณฑ์ตัดสินสำหรับหลายแนวทางขยาย (ปรับปรุง/ERP/extension) ผู้บริหารไม่สามารถตัดสินใจได้",
            "after": "สนับสนุนการเลือกกลยุทธ์ด้วย comparison matrix 3 ทางเลือก + decision tree ออกแบบสถาปัตยกรรม PoC ของ React browser extension (Lambda+S3+IndexedDB+Chrome Extension) แสดงแนวทาง implement เฉพาะสำหรับ use case ปรับเกณฑ์ discount ให้ยืดหยุ่น",
            "metric": "Browser extension ได้รับอนุมัติเป็นมาตรการระยะสั้น การนำ ERP มาใช้เริ่มพิจารณาจัดสรรงบประมาณแยกเป็นแผนระยะกลาง-ยาว 2-3 ปี"
          }
        ],
        "challenges": [
          {
            "title": "การจัดระเบียบความต้องการ 6 แผนกและการจำแนกความเป็นไปได้",
            "resolution": "รวบรวมความต้องการทั้งหมดจากผลสัมภาษณ์ลงใน Excel จำแนกเป็น 3 ระดับ: \"รองรับด้วย browser extension ได้\" \"ต้องปรับปรุงโค้ดที่มีอยู่\" \"รอ ERP\" แสดงลำดับความสำคัญด้วยสัญลักษณ์ดาว แสดงให้เห็นว่าความต้องการของแต่ละแผนกจะบรรลุได้ในขั้นตอนใด"
          }
        ]
      }
    ]
  },
  {
    "id": "ai-translation-qcd-2025",
    "company": "สตาร์ทอัพ SaaS แปลภาษาด้วย Generative AI ในประเทศ",
    "companyDesc": "สตาร์ทอัพในประเทศที่ให้บริการ SaaS แปลภาษาด้วย generative AI รับผิดชอบข้อเสนอปรับปรุง QCD ด้านบุคลากรในองค์กรพัฒนา",
    "role": "ที่ปรึกษาองค์กรพัฒนา",
    "roles": ["Consulting"],
    "period": "2025-04 — 2025-07",
    "teamSize": 2,
    "summary": "วิเคราะห์โครงสร้างปัญหา QCD (คุณภาพ, ต้นทุน, การส่งมอบ) ขององค์กรพัฒนาขนาดประมาณ 30 คนในฐานะที่ปรึกษาภายนอก จัดโครงสร้าง 100 สมมติฐานด้วย MECE x Issue Tree ทำให้ลำดับความสำคัญของมาตรการเป็นกลางด้วย 5-axis weighted scoring จัดทำ roadmap ดำเนินการ 6 เฟสและเอกสารเสนอผู้บริหาร ได้รับอนุมัติจาก COO ในการประชุมผู้บริหาร",
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
        "title": "การวิเคราะห์โครงสร้างปัญหา QCD ขององค์กรพัฒนา",
        "summary": "ตรวจสอบสาเหตุของ development velocity และการลดลงของคุณภาพ จัดระเบียบปัญหาทางเทคนิคและโครงสร้างองค์กร เจาะลึกปัญหาเชิงโครงสร้างขององค์กรวิศวกร เช่น การจัดการโค้ด, ระบบ review, ขั้นตอน release และโครงสร้างที่ขึ้นอยู่กับบุคคล",
        "difficulty": "high",
        "technologies": [
          "SonarQube",
          "Cursor",
          "NotebookLM"
        ],
        "highlights": [
          "จัดโครงสร้าง 100 สมมติฐานด้วย MECE x Issue Tree และคัดเลือก 8 ปัญหาหลักด้วย 5-axis scoring อธิบายปัญหาด้านการเมืององค์กรเป็นปัญหาเชิงระบบอย่างเป็นกลาง"
        ],
        "decisions": [
          {
            "title": "แนวทางจัดโครงสร้าง 100 สมมติฐานด้วย MECE x Issue Tree",
            "detail": "ผสมผสาน MECE (Mutually Exclusive, Collectively Exhaustive) กับวิธี Issue Tree ใช้ 5-axis quantitative scoring (contribution ต่อความเร็ว release, contribution ต่ออัตรา bug, ความง่ายในการดำเนินการ, ความง่ายในการวัด, lead time) เพื่อระบุและประเมิน 100 สมมติฐานอย่างครอบคลุม"
          },
          {
            "title": "การจัดลำดับความสำคัญ 8 ปัญหาหลักและการ Map โครงสร้างองค์กร",
            "detail": "ใช้ contribution ต่อปัญหาสำคัญที่สุด \"การลดลงของ delivery แอปที่มีอยู่\" เป็นเกณฑ์ เจาะลึก 3 ปัญหาที่เกี่ยวข้องโดยตรงกับผู้พัฒนา จัดระเบียบ 5 ปัญหาที่เหลือตาม stakeholder เรียงลำดับ 8 ปัญหาตามความสำคัญ"
          }
        ],
        "outcomes": [
          {
            "before": "ปัญหากระจัดกระจาย ภาพรวมไม่ชัดเจน ผลสัมภาษณ์เป็นอัตวิสัย ไม่สามารถตัดสินลำดับความสำคัญได้",
            "after": "จัดโครงสร้าง 100 สมมติฐานด้วย MECE x Issue Tree คัดเลือก 8 ปัญหาหลักด้วย 5-axis scoring สร้างแผนที่ปัญหาที่ผู้บริหารสามารถใช้ตัดสินใจได้",
            "metric": "จัดโครงสร้าง 100 สมมติฐาน -> 8 ปัญหาหลักสำเร็จ ประเมินเชิงปริมาณตั้งแต่คะแนนสมมติฐานสูงสุด 4.35 ถึงต่ำสุด 1.9"
          }
        ],
        "challenges": [
          {
            "title": "การจัดโครงสร้างปัญหาในสภาวะที่ขาดข้อมูลเชิงปริมาณ",
            "resolution": "ไม่พึ่งพาข้อมูลเชิงปริมาณ แต่ใช้วิธีจัดโครงสร้างสมมติฐานด้วย MECE x Issue Tree และประเมินเชิงสัมพัทธ์ด้วย 5-axis scoring สร้าง framework เฉพาะที่แปลงเนื้อหาสัมภาษณ์เป็น \"น้ำหนักของปัญหา\""
          },
          {
            "title": "การอธิบายปัญหาด้านการเมืององค์กรอย่างเป็นกลาง",
            "resolution": "ไม่ระบุชื่อบุคคล อธิบายเป็นปัญหาเชิงระบบ เช่น \"โครงสร้างการตัดสินใจ\" \"ความไม่ชัดเจนของอำนาจอนุมัติ\" เสนอแนวทางแก้ไขเป็นการออกแบบระบบ ไม่ใช่การวิจารณ์บุคคล"
          }
        ]
      },
      {
        "title": "การสร้าง Framework ประเมินมาตรการปรับปรุง QCD และ Matrix ลำดับความสำคัญ",
        "summary": "สำรวจและจัดระเบียบมาตรการปรับปรุงตามแกนคุณภาพ, ต้นทุน, การส่งมอบ ดำเนินการประเมินเชิงปริมาณ \"ผลกระทบ x ความเป็นไปได้\" สำหรับแต่ละมาตรการ จัดทำ weighted matrix และ priority chart ในเอกสาร แสดงแผนดำเนินการแบบค่อยเป็นค่อยไปด้วย Gantt chart และ responsibility diagram",
        "difficulty": "high",
        "technologies": [
          "ChatGPT",
          "Gamma",
          "Mermaid"
        ],
        "highlights": [
          "ออกแบบ 5-axis weighted scoring function และสร้าง roadmap 6 เฟส x 3 สัปดาห์อัตโนมัติด้วย RANK.EQ function"
        ],
        "decisions": [
          {
            "title": "การทำให้ลำดับความสำคัญของมาตรการเป็นกลางด้วย 5-Axis Weighted Scoring",
            "detail": "ออกแบบ scoring function ที่ให้น้ำหนักกับ 5 แกน: Q contribution (0.1), C contribution (0.1), D contribution (0.4), ต้นทุนเงิน (0.1), เวลาที่ต้องใช้ (0.3) การกระจายน้ำหนักเน้น contribution ต่อ D (การส่งมอบ) และเวลาที่ต้องใช้"
          },
          {
            "title": "การออกแบบ Roadmap การดำเนินการ 6 เฟส x 3 สัปดาห์",
            "detail": "Map ลำดับคะแนนเป็นหมายเลขเฟสอัตโนมัติด้วย RANK.EQ function สร้าง Gantt chart 6 เฟส x 3 สัปดาห์อัตโนมัติ จัดวาง 4-5 มาตรการในแต่ละเฟส ใช้ผลลัพธ์ของเฟสก่อนหน้าเป็นเงื่อนไขเบื้องต้นของเฟสถัดไป"
          }
        ],
        "outcomes": [
          {
            "before": "ลำดับความสำคัญของ 27 มาตรการไม่ชัดเจน การตัดสินใจของผู้บริหารล่าช้า",
            "after": "สร้างแผนดำเนินการที่สามารถแสดงความคืบหน้ารายเดือนด้วย 5-axis weighted scoring + roadmap 6 เฟส",
            "metric": "ลำดับความสำคัญของ Top 5 มาตรการได้รับอนุมัติในการประชุมผู้บริหารครั้งเดียว เป้าหมาย: เพิ่มความเร็ว release 30% และลดอัตรา bug 30% ใน 4 เดือน (เป้าหมายชั่วคราว)"
          }
        ],
        "challenges": [
          {
            "title": "การสร้าง Framework ประเมินลำดับความสำคัญมาตรการอย่างเป็นกลาง",
            "resolution": "พัฒนา 5-axis weighted scoring ใน Excel และตกลงพื้นฐานของ weight กับ COO ล่วงหน้า เพื่อรับประกันความเป็นกลางและความโปร่งใสของผลลัพธ์ scoring"
          }
        ]
      },
      {
        "title": "การออกแบบและจัดทำเอกสารสไลด์สำหรับเสนอในการประชุมผู้บริหาร",
        "summary": "ใช้ flow diagram, sequence diagram และ decision chart จำนวนมากด้วย Mermaid เพื่อส่งเสริมการสร้างฉันทามติกับผู้ที่ไม่ใช่วิศวกร จัดทำเอกสารสนับสนุนการตัดสินใจสำหรับผู้บริหารโดยใช้ RAG ของ NotebookLM",
        "difficulty": "medium",
        "technologies": [
          "NotebookLM",
          "Gemini",
          "Genspark",
          "Mermaid"
        ],
        "highlights": [
          "จัดทำเอกสารเสนอผู้บริหาร 2 ส่วน (23+10 สไลด์) อธิบายปัญหาทางเทคนิคในรูปแบบผลกระทบ QCD ด้วย causal chain"
        ],
        "decisions": [
          {
            "title": "การออกแบบเอกสารเสนอผู้บริหาร 2 ส่วน (การเพิ่มประสิทธิภาพบุคลากร + การออกแบบใหม่ระบบจัดการตั๋ว)",
            "detail": "ออกแบบเอกสาร 2 ส่วน: \"ข้อเสนอการเพิ่มประสิทธิภาพบุคลากรในองค์กรพัฒนาธุรกิจแปลภาษา AI\" (23 สไลด์, ภาพรวม) และ \"การปรับปรุง QCD ผ่านการออกแบบใหม่ระบบจัดการตั๋ว\" (10 สไลด์, เจาะลึก)"
          },
          {
            "title": "ข้อเสนอ Jira Unified Platform และสนับสนุนการตัดสินใจด้วยตารางเปรียบเทียบเครื่องมือ",
            "detail": "สร้างตารางเปรียบเทียบ 4 ทางเลือก (Notion, Planio, Notion+Planio ผสม, Jira) บน 5 แกน: \"ความยืดหยุ่นโครงสร้างตั๋ว\" \"การทำงานข้ามแผนก\" \"UI/UX\" \"การออกแบบ workflow\" \"การเชื่อมต่อกับเครื่องมืออื่น\" แนะนำ Jira+Jira Service Management"
          }
        ],
        "outcomes": [
          {
            "before": "ไม่มีวิธีอธิบายปัญหาทางเทคนิคต่อผู้บริหาร การอนุมัติการลงทุนปรับปรุงเป็นเรื่องยาก",
            "after": "แสดงภาพรวมการปรับปรุง QCD และมาตรการเฉพาะด้วยเอกสารเสนอผู้บริหาร 2 ส่วน (23 สไลด์ + 10 สไลด์) สนับสนุนการตัดสินใจด้วยตารางเปรียบเทียบเครื่องมือและ RACI chart",
            "metric": "COO อนุมัติการดำเนินการ PoC ตัดสินใจเริ่มรวมระบบจัดการตั๋วและตรวจสอบการนำ Jira มาใช้"
          }
        ],
        "challenges": [
          {
            "title": "การอธิบายปัญหาทางเทคนิคต่อผู้บริหารที่ไม่ใช่วิศวกร",
            "resolution": "นิยามปัญหาทางเทคนิคใหม่เป็นผลกระทบต่อ QCD (คุณภาพ, ต้นทุน, การส่งมอบ) อธิบายด้วย causal chain เช่น \"bug หลุด -> เวลาทำงานซ้ำ -> ต้นทุนเพิ่ม\" ตั้งเป้า KPI (ลด bug rate 40%, ลด lead time 25%) เพื่อวัดผลการปรับปรุงเชิงปริมาณ"
          }
        ]
      }
    ]
  },
  {
    "id": "factory-maintenance-app-2024",
    "company": "สตาร์ทอัพแอปพลิเคชันสำหรับภาคการผลิต",
    "companyDesc": "สตาร์ทอัพ SaaS ที่สนับสนุนงานบำรุงรักษาอุปกรณ์โรงงานในภาคการผลิต รับผิดชอบการพัฒนา full-stack ของแอปบำรุงรักษาอุปกรณ์โรงงาน",
    "role": "วิศวกร Full-Stack",
    "roles": ["Frontend", "Backend", "Infra"],
    "period": "2024-10 — 2025-03",
    "teamSize": 4,
    "summary": "SaaS แบบ multi-tenant สำหรับจัดการงานบำรุงรักษาและตรวจสอบอุปกรณ์ในภาคการผลิต รับผิดชอบทั้งแบ็กเอนด์ NestJS + GraphQL + PostgreSQL และฟรอนต์เอนด์ React + Apollo Client อย่างต่อเนื่อง ออกแบบและพัฒนาฟีเจอร์หลักเช่น ฟังก์ชันงานซ้ำตามมาตรฐาน RFC5545, access control 3 แกน RBAC+ReBAC, UI ปฏิทินแบบ Google Calendar และการบันทึกแบบ incremental ตามฟิลด์",
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
        "title": "การออกแบบและพัฒนาฟังก์ชันงานซ้ำตามมาตรฐาน RFC5545",
        "summary": "ครอบคลุมการซ้ำแบบปี, เดือน (สัปดาห์ที่ n วันที่ n / วันที่ n), สัปดาห์ (เลือกหลายวันได้) และวัน รวมถึงอัปเดตแบบกลุ่ม, ข้าม และเงื่อนไขสิ้นสุด ออกแบบ schema, API และ batch ที่แยก instance ที่ยังไม่สร้างจริงกับที่สร้างจริงแล้วแต่แสดงรวมในหน้าจอเดียวกัน เลือกใช้สถาปัตยกรรม batch สร้าง instance ล่วงหน้าหนึ่งวันด้วย Redis+SQS+EventBridge",
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
          "วิเคราะห์ข้อกำหนด RFC5545 ออกแบบสถาปัตยกรรมสำหรับการขยาย recurrence rule, การจัดการ exception และ batch instantiation จัดทำเอกสารข้อกำหนดและเอกสารทบทวนการออกแบบ บันทึกเจตนาการออกแบบและทางเลือกอย่างเป็นระบบ",
          "พัฒนา SQL/API แบบ merge entity/non-entity ด้วย generate_series + UNION ALL + DISTINCT ON"
        ],
        "decisions": [
          {
            "title": "การเลือกใช้ Batch Instantiation ล่วงหน้าหนึ่งวัน (EventBridge+SQS)",
            "detail": "เลือกใช้ batch instantiation ล่วงหน้าหนึ่งวันด้วย EventBridge+SQS+NestJS SQS Consumer"
          },
          {
            "title": "วิธี Merge Entity/Non-Entity ด้วย generate_series + UNION ALL",
            "detail": "ขยายวันที่ด้วย generate_series ของ PostgreSQL กู้คืน 20+ คอลัมน์จากนิยาม JSON ของ template UNION ALL กับ entity record แล้ว deduplication ด้วย DISTINCT ON"
          },
          {
            "title": "การรวม 3 Time Model ไว้ในโมเดลเดียว",
            "detail": "เลือกใช้การออกแบบที่รวม 3 time model (เฉพาะวันที่, มีเวลา, ระบุช่วงเวลา) ไว้ในโมเดลเดียวเพื่อรักษาความเข้ากันได้กับระบบที่มีอยู่ เขียนเอกสารการออกแบบเพื่อขยายไปยังแนวคิด timeModel ในฝั่ง template สำหรับการแยกในอนาคต"
          }
        ],
        "outcomes": [
          {
            "before": "ฟังก์ชันงานซ้ำยังไม่ได้พัฒนา ต้องสร้างงานตรวจสอบประจำวัน/ประจำสัปดาห์ด้วยมือ",
            "after": "เปิดตัวฟังก์ชัน recurrence rule ตามมาตรฐาน RFC5545 ทำให้สามารถสร้างงานซ้ำ Daily/Weekly/Monthly ได้โดยอัตโนมัติ",
            "metric": "ลดเวลาสร้างงานตรวจสอบประจำด้วยมือ"
          },
          {
            "before": "การอภิปรายออกแบบ recurrence ไม่ลงตัว ข้อกำหนดการออกแบบกระจัดกระจาย",
            "after": "จัดทำเอกสารข้อกำหนดและเอกสารทบทวน จัดระเบียบปัญหาของการ implement ปัจจุบันและการออกแบบในอุดมคติ กำหนด roadmap ปรับปรุง 6 เฟส",
            "metric": "การสะสมความรู้ด้านการออกแบบอย่างเป็นองค์กรและการทำให้ roadmap ปรับปรุงชัดเจน"
          }
        ],
        "challenges": [
          {
            "title": "การออกแบบ Recurrence Rule ที่รวม 3 Time Model ไว้ในโมเดลเดียว",
            "resolution": "เริ่มด้วย minimum implementation ที่รองรับเฉพาะวันที่ (ไม่รองรับเวลา) และเขียนเอกสารการออกแบบในอุดมคติที่มีแนวคิด timeModel ในฝั่ง template ทำให้ migration path สำหรับการแยก 3 model ในอนาคตชัดเจน"
          },
          {
            "title": "SQL กว่า 300 บรรทัดสำหรับกู้คืนทุกฟิลด์จากนิยาม JSONB ของ Template",
            "resolution": "สร้าง CTE chain กว่า 300 บรรทัดแบบค่อยเป็นค่อยไป แยกความรับผิดชอบของ CTE ในแต่ละขั้นตอน: ขยาย recurrence rule -> สร้างวันที่ -> สร้าง non-entity task -> merge กับ entity task -> deduplicate รักษาโครงสร้างที่บำรุงรักษาได้ ขณะเดียวกันเขียนการออกแบบในอุดมคติเช่น template reference approach ในเอกสารทบทวนอย่างละเอียด"
          },
          {
            "title": "ข้อจำกัดของ Dashboard Pivot API ที่บังคับให้ใช้ Batch Instantiation",
            "resolution": "สร้าง CTE chain ที่แปลง non-entity task ให้มีโครงสร้างคอลัมน์เดียวกับ entity record ภายใน SQL วิเคราะห์ทางเลือก two-stage aggregation + app layer merge ที่ใช้ associativity ของ COUNT/SUM อย่างละเอียดในเอกสารทบทวน (พร้อมการพิสูจน์ทางคณิตศาสตร์)"
          }
        ]
      },
      {
        "title": "การออกแบบ Access Control 3 แกน (Scope x Resource x Action) การสร้างฉันทามติ และการพัฒนา",
        "summary": "กำหนดสิทธิ์ด้วย 3 แกน: scope (สำนักงานใหญ่/โรงงาน ฯลฯ) x resource x action เปรียบเทียบ 2 แผน: แบบตั้งค่าเฉพาะรายและแบบกำหนด role จัด facilitate การสร้างฉันทามติ จัดการ API authorization และ UI display control ร่วมกันด้วย CASL Ability เพื่อรักษาความสอดคล้อง",
        "difficulty": "high",
        "technologies": [
          "TypeScript",
          "React",
          "NestJS",
          "GraphQL",
          "CASL"
        ],
        "highlights": [
          "ออกแบบ RBAC+ReBAC hybrid ACL model ตรวจสอบ use case กว่า 30 กรณีอย่างครอบคลุม บันทึกหลักฐานการตัดสินใจและทางเลือกในเอกสารออกแบบอย่างละเอียด",
          "เปรียบเทียบ 2 แผน: แบบตั้งค่าเฉพาะรายและแบบกำหนด role จัด facilitate การสร้างฉันทามติด้านการออกแบบกับทีม"
        ],
        "decisions": [
          {
            "title": "การเลือกใช้ RBAC+ReBAC Hybrid ACL Model",
            "detail": "เลือกใช้ RBAC+ReBAC hybrid ในชั้น DB (สามารถขยายเป็น ABAC ในอนาคต) และการเปิดเผยแบบค่อยเป็นค่อยไป 3 เฟสในชั้น UI"
          },
          {
            "title": "การประเมินสิทธิ์แบบ Deny-by-default + Template",
            "detail": "ค่าเริ่มต้นปฏิเสธ ถ้ามี explicit deny แม้แต่ 1 ก็ปฏิเสธ ถ้ามี allow นอกจากนั้นก็อนุญาต ถ้าไม่มีทั้งสองก็ปฏิเสธ การประเมิน 3 ขั้นตอน"
          },
          {
            "title": "การทำให้ Scope Inheritance เป็นตัวเลือกด้วย scopeType+inheritChildren",
            "detail": "เพิ่ม flag inheritance ในการกำหนด role ตาม scope ทำให้สามารถเลือกเปิด/ปิด inheritance เมื่อกำหนด role ได้"
          }
        ],
        "outcomes": [
          {
            "before": "ไม่มี access control ผู้ใช้ทุกคนสามารถเข้าถึงข้อมูลทั้งหมดได้",
            "after": "ออกแบบและสร้างฉันทามติสำหรับระบบ RBAC+ReBAC ACL ด้วย 3 ระดับ scope hierarchy (องค์กร > สถานที่ > โปรเจกต์) และ 5 ประเภท system-defined template",
            "metric": "การออกแบบ ACL model เสร็จสมบูรณ์และการสร้างฉันทามติในทีม"
          },
          {
            "before": "ข้อกำหนด ACL กระจัดกระจาย ไม่สามารถตรวจสอบ use case กว่า 30 กรณีได้อย่างครอบคลุม",
            "after": "จัดทำเอกสารออกแบบและตารางตรวจสอบ use case ยืนยันว่า 12 use case (ดูแลหลายโรงงาน, วิศวกรภายนอก, ผู้ตรวจสอบ ฯลฯ) ได้รับการครอบคลุม",
            "metric": "การตรวจสอบข้อกำหนดอย่างครอบคลุมและการจัดทำเอกสารออกแบบ"
          }
        ],
        "challenges": [
          {
            "title": "การสร้างสมดุลในการออกแบบ Permission Hierarchy สำหรับ Multi-Tenant SaaS",
            "resolution": "สร้างสมดุลระหว่างความยืดหยุ่นและความง่ายในการจัดการด้วยการทำ inheritance เป็นตัวเลือกผ่าน flag และโครงสร้าง 2 ชั้น: role template + การ override สิทธิ์เฉพาะราย จัดทำเอกสาร use case กว่า 30 กรณีและตรวจสอบว่าแต่ละ pattern ได้รับการครอบคลุม"
          }
        ]
      },
      {
        "title": "การเพิ่มประสิทธิภาพการ Render หน้าจอหลัก (ลดเวลา render กว่า 70%)",
        "summary": "ลด re-render ที่เกิดจากการ render เชื่อมโยงระหว่าง filter, list และ detail ด้วยการปรับโครงสร้าง state จำกัดการ refactoring ไว้เฉพาะจุดที่มี render cost สูงและกระทบ UX มากในเวลาที่จำกัด",
        "difficulty": "high",
        "technologies": [
          "TypeScript",
          "React",
          "Apollo Client"
        ],
        "highlights": [
          "วิเคราะห์ re-render ด้วย React DevTools Profiler ใช้ React.memo/useMemo/useCallback อย่างเลือกสรรเพื่อลดเวลา render กว่า 70%"
        ],
        "decisions": [
          {
            "title": "การกำจัด Re-Render ที่ไม่จำเป็นด้วย React.memo + useMemo",
            "detail": "แสดงภาพ re-render ของ component tree ด้วย Profiler ของ React DevTools กำจัด re-render ที่ไม่จำเป็นด้วย React.memo, useMemo, useCallback บรรลุการลดเวลา render กว่า 70%"
          }
        ],
        "outcomes": [
          {
            "before": "เวลา render ช้า ส่งผลเสียต่อ UX",
            "after": "ลดเวลา render กว่า 70%",
            "metric": "อัตราลดเวลา render"
          }
        ],
        "challenges": [
          {
            "title": "การ Memoize ทุก Component พร้อมกัน vs การเพิ่มประสิทธิภาพแบบเลือกสรรด้วย Profiler",
            "resolution": "ใช้ React DevTools Profiler ตรวจดู re-render ของ component tree ด้วยตา ระบุเฉพาะ component ที่ช้าจริง ๆ แล้วใช้ React.memo/useMemo/useCallback อย่างเลือกสรร ลดเวลา render กว่า 70% โดยใช้เวลาพัฒนาน้อย"
          }
        ]
      },
      {
        "title": "การพัฒนา UI แสดงงานแบบ Google Calendar",
        "summary": "พัฒนา calendar view ที่รองรับการแสดงรายสัปดาห์, รายเดือน และ 3 วัน ใช้ CSS Grid/Subgrid สร้างการแสดงมุมโค้ง, พื้นที่แสดงผลแบบปรับได้ และรองรับ scheduler",
        "difficulty": "medium",
        "technologies": [
          "TypeScript",
          "React",
          "CSS"
        ],
        "highlights": [
          "สร้าง packing algorithm (row occupancy mapping -> top-align placement) เอง กำหนดการออกแบบ reactive update ด้วย Apollo Client SSoT",
          "พัฒนาจากศูนย์: view แบบปรับได้ 3/4/7 วัน, D&D เปลี่ยนวันที่, มุมโค้งข้ามสัปดาห์, CSS scroll snap รองรับมือถือ"
        ],
        "decisions": [
          {
            "title": "การตัดสินใจพัฒนา Calendar UI จากศูนย์",
            "detail": "สร้าง calendar UI จากศูนย์ด้วย React+CSS โดยไม่พึ่ง library รับจำนวนวันแบบปรับได้ (3 วัน/4 วัน/รายสัปดาห์) เป็น external parameter ออกแบบให้ layout ไม่เสียรูปไม่ว่าจะแสดงกี่วัน"
          },
          {
            "title": "Drag & Drop เปลี่ยนวันที่และการเชื่อมต่อกับการบันทึกแบบ Incremental โดยใช้ Apollo Client เป็น SSoT",
            "detail": "ออกแบบให้ cache ของ Apollo Client เป็นแหล่งข้อมูลเดียวที่เชื่อถือได้ (SSoT) สร้างกลไกที่ไม่ว่าจะเปลี่ยนวันที่ด้วย D&D หรือบันทึกแบบ incremental จาก edit modal ก็อัปเดต Apollo cache แล้ว calendar จะ re-render แบบ reactive"
          },
          {
            "title": "Responsive Calendar UI และการเพิ่มประสิทธิภาพมือถือด้วย CSS Scroll Snap",
            "detail": "สลับเป็น UI ที่แตกต่างอย่างมากจากเวอร์ชัน PC เมื่อใช้บนมือถือ เลือกใช้การออกแบบที่แตะวันที่แล้วแสดง task list แบบ slide ใช้ CSS scroll snap เพื่อให้ scroll snap ตามหน่วยวันเสมอไม่หยุดกลางทาง"
          }
        ],
        "outcomes": [
          {
            "before": "ไม่มี calendar UI แผนงานแสดงแบบ list เท่านั้น มองภาพรวมยาก",
            "after": "พัฒนา custom calendar UI ที่มีความรู้สึกการใช้งานเทียบเท่า Google Calendar จากศูนย์ สลับ view แบบ dynamic 3 วัน/4 วัน/รายสัปดาห์ แสดงมุมโค้งสำหรับ event ข้ามสัปดาห์",
            "metric": "ให้ UI ที่ผู้ใช้เข้าใจและจัดการแผนงานได้อย่างสังหรณ์ใจ สามารถตอบสนองการเปลี่ยนแปลงข้อกำหนดอย่างยืดหยุ่นด้วยการพัฒนาจากศูนย์"
          },
          {
            "before": "การจัดการวันทำงานแสดงเฉพาะตารางแบบ list มองภาพรวม schedule ยาก",
            "after": "สร้าง UI แบบ Google Calendar จากศูนย์ การแสดง packing แน่นสำหรับ task หลายวัน/วันเดียว, D&D เปลี่ยนวันที่, อัปเดตแบบ realtime ด้วย Apollo Client SSoT, responsive (รวม scroll snap) view แบบปรับได้ 3/4/7 วัน",
            "metric": "ความสมบูรณ์ของ calendar UI และ usability"
          }
        ],
        "challenges": [
          {
            "title": "การแสดง UI มุมโค้งสำหรับ Event ข้ามสัปดาห์",
            "resolution": "แบ่ง event ออกเป็น segment ตามสัปดาห์ ใช้ border-radius class แบบ dynamic ตามตำแหน่งของแต่ละ segment (ต้น/กลาง/ท้าย) segment ต้นมุมโค้งซ้าย segment ท้ายมุมโค้งขวา segment กลางไม่มีมุมโค้ง"
          },
          {
            "title": "Responsive Layout สำหรับ View แบบจำนวนวันปรับได้",
            "resolution": "รับ parameter จำนวนวันเป็น props ของ component คำนวณความกว้างคอลัมน์แบบ dynamic ด้วยหน่วย fr ของ CSS Grid เปลี่ยน logic การจัดวาง event เป็นคำนวณตำแหน่ง grid-column แบบ dynamic จาก startDate/endDate"
          },
          {
            "title": "Packing Algorithm สำหรับ Task หลายวันและวันเดียว (จัดเรียงบนสุดไม่มีช่องว่าง)",
            "resolution": "สร้าง packing algorithm ที่จัดการสถานะการจองของแต่ละแถวเอง map แถวที่ task หลายวันจองไว้ก่อน แล้วจัดวาง task วันเดียวในแถวบนสุดที่ว่าง ทำให้ได้ layout แน่นเหมือน Google Calendar"
          }
        ]
      },
      {
        "title": "การพัฒนา Type-Based Validation สำหรับโครงสร้างฟอร์มแบบ Dynamic",
        "summary": "พัฒนา type-based validation ด้วย RHF+Zod สำหรับ field ที่เพิ่ม/ลบได้บน template (string/number/date ฯลฯ) สร้างสมดุลระหว่างการแยก logic และการ reuse ระหว่าง create modal กับ edit screen รองรับ active control, display control ของตัวเลือก และ cross-field validation",
        "difficulty": "high",
        "technologies": [
          "TypeScript",
          "React Hook Form",
          "Zod"
        ],
        "highlights": [
          "พัฒนา type-based validation ด้วย RHF+Zod สำหรับ field ที่เพิ่ม/ลบได้บน template (string/number/date ฯลฯ) สร้างสมดุลระหว่างการแยก logic และการ reuse ระหว่าง create modal กับ edit screen รองรับ active control, display control ของตัวเลือก และ cross-field validation"
        ]
      },
      {
        "title": "การพัฒนาฟังก์ชันบันทึก Incremental เมื่อ Focus Out เฉพาะส่วนที่เปลี่ยน",
        "summary": "พัฒนาการบันทึกแบบ incremental ที่บันทึกเฉพาะส่วนที่เปลี่ยนเมื่อ focus out เพื่อป้องกันข้อมูลหาย ใช้ DevTools throttling ทดสอบการ resend ในสภาวะเครือข่ายไม่เสถียร",
        "difficulty": "medium",
        "technologies": [
          "TypeScript",
          "React",
          "GraphQL"
        ],
        "highlights": [
          "ออกแบบสถาปัตยกรรม field-level onBlur incremental save + Command Pattern พัฒนากลไก resend สำหรับ command ที่ส่งล้มเหลว"
        ],
        "decisions": [
          {
            "title": "การเลือกใช้ Field-Level onBlur Incremental Save (ไม่ใช่ Form Batch Save)",
            "detail": "เลือกใช้วิธี incremental save ที่แต่ละ field มี react-hook-form instance อิสระ ตรวจสอบ diff ด้วย isEqual เมื่อ onBlur event แล้วส่ง GraphQL mutation ทันที"
          },
          {
            "title": "วิธี RPC ที่ Encapsulate การเปลี่ยนแปลง Field ด้วยการจัดการ Command เป็นข้อมูล",
            "detail": "เลือกใช้วิธี RPC ที่จัดโครงสร้างการเปลี่ยนแปลงแต่ละ field เป็น command data กำหนด UUID เป็น ID แล้วส่งไปยังแบ็กเอนด์ กำหนด type definition ของ field set ที่เปลี่ยนได้ตามประเภท resource ออกแบบให้การดำเนินการเปลี่ยนแปลงเป็นข้อมูลที่ serialize ได้"
          }
        ],
        "outcomes": [
          {
            "before": "มีความเสี่ยงข้อมูลที่กรอกหายในสภาพแวดล้อม Wi-Fi โรงงานเนื่องจาก form batch save",
            "after": "พัฒนา field-level onBlur incremental save + Command Pattern + กลไก resend สำหรับ command ที่ส่งล้มเหลว ออกแบบ roadmap ปรับปรุง 3 ขั้นตอน (localStorage persistence -> SW -> full offline)",
            "metric": "ลดความเสี่ยงข้อมูลหายอย่างมากและกำหนดแผนปรับปรุงในอนาคต"
          }
        ],
        "challenges": [
          {
            "title": "การรักษาข้อมูลในสภาพแวดล้อม Wi-Fi โรงงานที่ไม่เสถียร",
            "resolution": "พัฒนา field-level onBlur incremental save + สะสม command ที่ส่งล้มเหลวด้วย useRef + กลไก resend ด้วยปุ่ม save error handling 2 ขั้นตอน: เมื่อ network error จะเก็บค่าฟอร์มไว้ เมื่อ client error จะ reset เป็นค่าจากเซิร์ฟเวอร์"
          }
        ]
      },
      {
        "title": "การกำหนดโครงสร้าง Directory และกฎการตั้งชื่อ UI Component และการนำไปใช้",
        "summary": "เสนอและสร้างฉันทามติสำหรับโครงสร้าง directory, กฎการตั้งชื่อ และกฎโครงสร้าง component เพื่อเพิ่มความสามารถในการ reuse ของ domain-specific component ทำให้เป็นข้อตกลงร่วมภายในทีม",
        "difficulty": "medium",
        "technologies": [
          "TypeScript",
          "React"
        ],
        "highlights": [
          "เสนอและสร้างฉันทามติสำหรับโครงสร้าง directory, กฎการตั้งชื่อ และกฎโครงสร้าง component เพื่อเพิ่มความสามารถในการ reuse ของ domain-specific component ทำให้เป็นข้อตกลงร่วมภายในทีม"
        ]
      },
      {
        "title": "การแสดงภาพ UI State ทั้งหมดด้วย Storybook และการจัดเตรียมพื้นฐานรองรับหลายภาษา",
        "summary": "แสดงภาพ UI state ทั้งหมดด้วย Storybook ทำให้รองรับ display variation ในอนาคตง่ายขึ้น พัฒนาการรองรับหลายภาษาของ card UI (รวมถึงการเสนอข้อความภาษาอังกฤษ) จัดเตรียมพื้นฐานรองรับสากล",
        "difficulty": "medium",
        "technologies": [
          "TypeScript",
          "Storybook",
          "Playwright",
          "Vitest"
        ],
        "highlights": [
          "แสดงภาพ UI state ทั้งหมดด้วย Storybook ทำให้รองรับ display variation ในอนาคตง่ายขึ้น พัฒนาการรองรับหลายภาษาของ card UI (รวมถึงการเสนอข้อความภาษาอังกฤษ) จัดเตรียมพื้นฐานรองรับสากล"
        ]
      }
    ]
  },
  {
    "id": "recruitment-saas-2022",
    "company": "บริษัทในเครือจดทะเบียนด้าน HR Consulting และระบบ",
    "companyDesc": "บริษัทในเครือของบริษัทจดทะเบียนที่ให้บริการ HR consulting และพัฒนาระบบ รับผิดชอบการพัฒนาระบบจัดการสรรหาบุคลากรแบบ multi-tenant ใหม่",
    "role": "Frontend Tech Lead",
    "roles": ["Frontend", "Tech Lead", "Testing"],
    "period": "2022-10 — 2024-09",
    "teamSize": 10,
    "summary": "นำการพัฒนาฟรอนต์เอนด์ของ SaaS จัดการสรรหาบุคลากรสำหรับนักศึกษาจบใหม่ในฐานะ tech lead เป็นเวลา 2 ปี พัฒนา B2B (หน้าจัดการสำหรับ HR) และ B2C (หน้า entry สำหรับผู้สมัคร) ด้วย pnpm monorepo ออกแบบและพัฒนาฟีเจอร์หลักเช่น dynamic form builder ด้วย Specification pattern, dashboard รองรับ Suspense และ VRT pipeline ขับเคลื่อนการปรับปรุงคุณภาพและประสิทธิภาพการพัฒนาของทีม 10 คน",
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
        "title": "การบริหารทีมและการจัดการคุณภาพในฐานะ Frontend Tech Lead",
        "summary": "นำ task assignment, อัปเดต SP, แชร์ความรู้, สร้างวัฒนธรรม PR review และจัดทำ implementation guide นำการอัปเดต library อัตโนมัติเป็นประจำด้วย Renovate จัดการประชุมทีมเพื่อแชร์เทคนิค, code convention และข้อกำหนดหน้าจอ",
        "difficulty": "high",
        "technologies": [
          "TypeScript",
          "React",
          "GitHub Actions",
          "Renovate"
        ],
        "highlights": [
          "นำในรูปแบบ orchestrator: รวบรวมข้อกำหนดแอป B2C ทั้งหมด, สร้างฉันทามติกับทีมแบ็กเอนด์, แยก task, assign สมาชิก และรับผิดชอบ critical path",
          "สร้างมาตรฐานคุณภาพของทีมผ่านการกำหนด code review guideline, สร้างสภาพแวดล้อม VRT และการฝึกอบรม intern"
        ],
        "decisions": [
          {
            "title": "การฝึกอบรม Intern และยกระดับคุณภาพทีมผ่าน Code Review",
            "detail": "ดำเนินการ code review อย่างแข็งขันด้วยตนเอง ฝึกอบรม intern ผ่าน feedback ใช้แนวทาง OJT ที่ถ่ายทอด coding convention และ design pattern ผ่านการ review อย่างเป็นระบบ"
          },
          {
            "title": "การรวมช่องทางติดต่อทีมแบ็กเอนด์ไว้จุดเดียวและการจัดการแบบ Orchestrator",
            "detail": "รวบรวมข้อกำหนดแอป B2C ทั้งหมดด้วยตนเองในระยะเวลาสั้น สนทนาอย่างละเอียดกับ team lead ของแบ็กเอนด์แบบตัวต่อตัว หลังจากตกลงกันแล้วจัดการประชุม onboarding สำหรับสมาชิกทีม B2C อธิบายข้อกำหนดทั้งหมด ทำหน้าที่เป็นจุดติดต่อเดียวที่รวบรวมคำถาม/ข้อสงสัยจากทีมแล้วแก้ไขกับทีมแบ็กเอนด์"
          },
          {
            "title": "การแยก Task จากข้อกำหนด การจัดการ Dependency และ Assignment ตามคุณลักษณะสมาชิก",
            "detail": "แยก task จากข้อกำหนดที่ตกลงกันแล้ว ทำให้ dependency ชัดเจนแล้วสร้างเป็น Jira ticket assign ticket ตามจุดแข็ง/จุดอ่อน, ระดับทักษะ และความต้องการของสมาชิก รับผิดชอบจุดที่มีแนวโน้มเป็น single point of failure (critical path) ด้วยตนเอง"
          }
        ],
        "outcomes": [
          {
            "before": "คุณภาพฟรอนต์เอนด์ไม่สม่ำเสมอและมีการมองข้าม CSS regression",
            "after": "สร้างสภาพแวดล้อม visual regression ด้วย Storybook+storycap+reg-suit ตรวจจับ UI diff อัตโนมัติทุก PR กำหนด code review guideline ด้วย",
            "metric": "สร้างระบบประกันคุณภาพ UI อัตโนมัติ"
          }
        ],
        "challenges": [
          {
            "title": "การสร้างสมดุลระหว่างหนี้ทางเทคนิคกับความเร็วในการพัฒนาในฐานะ FE Tech Lead",
            "resolution": "สร้างสภาพแวดล้อม visual regression ด้วย Storybook+storycap+reg-suit เพื่อประกัน UI quality อัตโนมัติ กำหนด code review guideline เพื่อยกระดับมาตรฐานคุณภาพทั้งทีม"
          },
          {
            "title": "การกำหนดข้อกำหนดรายละเอียดแอปสำหรับผู้สมัคร B2C ใน 4 เดือน",
            "resolution": "นำจากการกำหนดข้อกำหนดรายละเอียดในฐานะ tech lead จัดระเบียบ user flow ของผู้สมัคร กำหนดเงื่อนไข transition ในแต่ละ status, เนื้อหาที่แสดง และ validation rule อย่างเป็นระบบ ยืนยันข้อกำหนดแบบ agile ขนานกับการพัฒนา"
          },
          {
            "title": "การค้นหา Edge Case ของข้อกำหนด Dynamic Form และการสร้างฉันทามติกับแบ็กเอนด์",
            "resolution": "ตัดสินว่ากรณีตัวเลือก 0 รายการจะใช้การแทรกแซง customer support ผ่านการตั้งค่าฟอร์มฝั่ง B2B ฝั่ง B2C จะไม่แสดง alert สร้างฉันทามติกับ team lead แบ็กเอนด์เป็นรายกรณีสำหรับแต่ละ edge case จัดทำเอกสารข้อตกลงและแชร์กับทีม"
          }
        ]
      },
      {
        "title": "การกำหนดข้อกำหนดและพัฒนาเส้นทาง Entry สำหรับผู้สมัคร",
        "summary": "กำหนดข้อกำหนดรายละเอียดและพัฒนา FE สำหรับ entry flow: สมัครสมาชิก -> สมัครงาน -> เข้าสู่ขั้นตอนคัดเลือก พัฒนาฟีเจอร์ทั้งหมดภายใน 4 เดือน ได้รับคำชมสูงจากลูกค้า",
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
          "กำหนดการออกแบบที่รวม 4 เส้นทางฟอร์มด้วย DynamicForm พื้นฐานร่วม พัฒนา multi-page validation และ transition control"
        ],
        "decisions": [
          {
            "title": "การพัฒนา 4 เส้นทางฟอร์ม B2C ด้วย DynamicForm พื้นฐานร่วม",
            "detail": "เลือกใช้การออกแบบที่ใช้ form spec definition class เป็นแกน แชร์ useForm hook, input component group และ validation system ร่วมกัน โดยกำหนดเฉพาะ page composition, ปลายทางส่ง และความแตกต่างของ parameter ตามเส้นทาง"
          },
          {
            "title": "Multi-Page Form: Page-Level Validation และ Transition Control",
            "detail": "แปลงระหว่าง page index ใน URL (เริ่มจาก 1) กับ array index (เริ่มจาก 0) จัดการ validation state ตาม page ด้วย useFormState ดำเนินการ trigger() ในขอบเขตของ page block transition ไปยัง page ที่ยังไม่ผ่าน validation"
          }
        ],
        "outcomes": [
          {
            "before": "มีข้อจำกัดระยะเวลาพัฒนา 4 เดือน",
            "after": "พัฒนาทุกฟีเจอร์เสร็จภายในระยะเวลา ได้รับคำชมสูงจากลูกค้า",
            "metric": "อัตราความสำเร็จในการพัฒนาและความพึงพอใจของลูกค้า"
          },
          {
            "before": "ไม่มี entry form สำหรับผู้สมัคร ฝั่ง B2C ของ SaaS จัดการสรรหายังไม่พร้อม",
            "after": "พัฒนา 4 เส้นทางฟอร์ม (ลงทะเบียนใหม่, pre-entry, อัปเดตโปรไฟล์, task ใน My Page) ด้วย DynamicForm พื้นฐานร่วม 24 ประเภท input component, 50+ validation rule และ multi-page transition",
            "metric": "ความสมบูรณ์ของพื้นฐาน form สำหรับผู้สมัคร B2C"
          }
        ],
        "challenges": [
          {
            "title": "การจัดการ State Transition ที่ซับซ้อนในเส้นทาง Entry สำหรับผู้สมัคร",
            "resolution": "สร้าง state transition diagram อย่างละเอียดในขั้นตอนกำหนดข้อกำหนด แสดงภาพทุก pattern พัฒนาการออกแบบที่ป้องกัน transition ที่ไม่ถูกต้องในระดับ type พัฒนาทุกฟีเจอร์ภายใน 4 เดือน"
          },
          {
            "title": "การ Map Server-Side Validation Error ในระดับ Field",
            "resolution": "ตรวจสอบ GraphQL validation error ใน useEffect แยก banner error ทั้งหน้าจอกับ field-level error แล้วตั้งค่า รวม error handling ด้วย custom useForm hook"
          }
        ]
      },
      {
        "title": "การออกแบบและพัฒนา Dynamic Form Builder สำหรับ HR (ใช้ Specification Pattern)",
        "summary": "พัฒนา form builder ที่ HR สามารถตั้งค่า page, heading, input field, validation, ความสัมพันธ์ parent-child ฯลฯ แก้ปัญหา state ของ class ด้วย Specification pattern รักษาความสอดคล้องกับ RHF บรรลุทั้ง cohesion และ extensibility",
        "difficulty": "extreme",
        "technologies": [
          "TypeScript",
          "React",
          "React Hook Form",
          "Apollo Client"
        ],
        "highlights": [
          "ออกแบบและพัฒนาพื้นฐาน cross-field validation ด้วย Specification pattern x Yup custom method 50+ สร้าง form generation engine 3 ชั้น",
          "พัฒนา reactive option filtering ด้วย parent-child field linkage + useWatch + auto-clear selected value"
        ],
        "decisions": [
          {
            "title": "การออกแบบ Dynamic Form Validation ด้วย Specification Pattern",
            "detail": "เลือกใช้ Specification pattern (pattern จาก Domain-Driven Design) พัฒนาการออกแบบที่ expression เงื่อนไขสามารถ compose เป็น object ได้"
          },
          {
            "title": "พื้นฐาน Cross-Field Validation ด้วย Specification Pattern x Yup Custom Method",
            "detail": "เพิ่ม custom method 50+ ให้ Yup schema ใช้ pattern ที่ apply กับทุก schema type พร้อมกัน อธิบาย dependency field แบบ declarative ด้วย metadata และสร้าง dependency graph อัตโนมัติ"
          },
          {
            "title": "การแยก Validation เป็น Shared Package ด้วย pnpm Monorepo",
            "detail": "เลือกใช้โครงสร้าง 3 package ด้วย pnpm workspace: B2B, B2C และ shared วาง validation พื้นฐานใน shared package ใช้ re-export จาก B2B/B2C จัดการ enum definition จาก GraphQL อย่างรวมศูนย์ด้วย enum registry"
          },
          {
            "title": "Reactive Option Filtering แบบไม่ต้อง Reload ด้วย Parent-Child Field Linkage",
            "detail": "ใช้ useWatch() ใน parent-child linkage component เพื่อ monitor ค่า parent field แบบ reactive ส่ง filter function ไปยัง child component ใช้ useMemo เพื่อ filter option value resetter จะ auto-clear ค่าที่ไม่ valid อัตโนมัติ"
          }
        ],
        "outcomes": [
          {
            "before": "นิยามเงื่อนไขของ form สมัครถูก hardcode ต้องแก้โค้ดทุกครั้งที่เปลี่ยนเงื่อนไข",
            "after": "พัฒนานิยามเงื่อนไขแบบ declarative ด้วย Specification pattern ทำให้ HR สามารถตั้งค่าเงื่อนไขฟอร์มได้โดยไม่ต้องเขียนโค้ด",
            "metric": "การทำให้เปลี่ยนเงื่อนไขฟอร์มได้ด้วยตนเอง"
          },
          {
            "before": "form field ถูก hardcode ต้องให้วิศวกรพัฒนาทุกครั้งที่เพิ่ม/เปลี่ยน field",
            "after": "dynamic form generation engine ทำให้ HR สามารถตั้งค่า form field ได้อย่างอิสระ พื้นฐาน dynamic form ที่มี 50+ validation rule, 24 ประเภท input component, cross-field validation และ reactive option filtering ให้บริการทั้ง B2B/B2C ผ่าน shared package",
            "metric": "ความยืดหยุ่นและคุณภาพของพื้นฐาน dynamic form"
          }
        ],
        "challenges": [
          {
            "title": "Combination Explosion ของ Expression เงื่อนไข Dynamic Form สำหรับ HR",
            "resolution": "เลือกใช้ Specification pattern (จาก DDD) ออกแบบ expression เงื่อนไขเป็น first-class object ที่ compose ด้วย AND/OR/NOT ได้ พัฒนานิยามเงื่อนไขแบบ declarative คล้าย JSON Schema"
          },
          {
            "title": "การควบคุม Synchronization ระหว่าง Cross-Field Validation กับ Reactive UI ของ Form Field",
            "resolution": "ตรวจจับการเปลี่ยนแปลงตัวเลือกด้วย value reset component แล้ว clear ค่าที่ไม่ valid ทันที สร้าง field dependency graph อัตโนมัติ trigger re-validation อัตโนมัติด้วย deps option ของ React Hook Form รองรับ dependency ของ dynamic form ด้วย wildcard matching ของ array index"
          },
          {
            "title": "การออกแบบ Schema-Driven Dynamic Form Generation Engine",
            "resolution": "ออกแบบ specification definition class 3 ชั้น: form ทั้งหมด -> page -> field แต่ละชั้นสร้าง validation schema แบบ dynamic สร้าง schema ต่อ page อัตโนมัติ รับประกัน type safety ของ form value ด้วย TypeScript type parameter"
          }
        ]
      },
      {
        "title": "การกำหนดข้อกำหนดรายละเอียดและพัฒนา Dashboard สำหรับ HR ด้วย Suspense",
        "summary": "กำหนดข้อกำหนดรายละเอียดและพัฒนา dashboard หน้าจอหลัก รองรับ Suspense สำหรับทั้งหมดและ 3 ประเภท panel ระบุสาเหตุ render ด้วย React Profiler ปรับปรุงทั้งประสิทธิภาพจริงและเวลารอที่รู้สึก",
        "difficulty": "high",
        "technologies": [
          "TypeScript",
          "React",
          "Apollo Client",
          "TanStack Query"
        ],
        "highlights": [
          "ออกแบบและพัฒนาสถาปัตยกรรม widget independent data fetch (Suspense+ErrorBoundary) และ custom Masonry grid algorithm"
        ],
        "decisions": [
          {
            "title": "การเลือกใช้สถาปัตยกรรม Widget Independent Data Fetch",
            "detail": "เลือกใช้สถาปัตยกรรมที่แต่ละ widget fetch ข้อมูลอย่างอิสระ ใช้ Apollo Client useReadQuery เพื่อให้ data fetch ที่รองรับ Suspense เสร็จสมบูรณ์ภายใน widget component"
          },
          {
            "title": "การพัฒนา Custom Masonry Grid Layout จากศูนย์",
            "detail": "พัฒนา custom grid placement algorithm ติดตาม row index ปัจจุบันของคอลัมน์ซ้ายและขวา วาง widget ในคอลัมน์ที่สั้นกว่าเพื่อสร้าง Masonry effect"
          },
          {
            "title": "การจัดเรียง Widget ด้วย Drag & Drop ด้วย dnd-kit v6",
            "detail": "เลือกใช้ @dnd-kit/core v6.1.0 + @dnd-kit/sortable v8.0.0 จัดการ list ด้วย SortableContext ควบคุม D&D state ของแต่ละ widget ด้วย useSortable hook พัฒนา preview ขณะเคลื่อนย้ายด้วย DragOverlay"
          }
        ],
        "outcomes": [
          {
            "before": "data fetch ของ dashboard เป็นแบบ waterfall ไม่สามารถใช้งานได้จนกว่า widget ทั้งหมดจะโหลดเสร็จ มีปัญหาช่องว่างในการจัดวาง widget",
            "after": "บรรลุ independent fetch + skeleton display ด้วย React Suspense + Apollo useReadQuery + Material UI Skeleton การจัดวางไร้ช่องว่างด้วย custom Masonry grid D&D จัดเรียงด้วย dnd-kit v6 สลับ 1 คอลัมน์/2 คอลัมน์",
            "metric": "ปรับปรุง UX ให้แต่ละ widget แสดงผลทันทีที่โหลดเสร็จ สถาปัตยกรรม loose coupling ที่รองรับการขยายเป็น third-party marketplace ในอนาคต"
          }
        ],
        "challenges": [
          {
            "title": "การแก้ปัญหา Waterfall ของ Data Fetch พร้อมกัน 20 Widget",
            "resolution": "ย้ายไปใช้ Suspense-compatible data fetch ด้วย useReadQuery ของ Apollo Client 3.10 wrap แต่ละ widget ด้วย React Suspense boundary ตั้ง Skeleton component ของ Material UI เป็น fallback ใช้ ErrorBoundary เฉพาะแต่ละ widget เพื่อป้องกันไม่ให้ความล้มเหลวของ API หนึ่งส่งผลกระทบต่อ widget อื่น"
          },
          {
            "title": "การพัฒนา Custom Grid Layout ในสภาพแวดล้อมที่ CSS Masonry ยังไม่รองรับ",
            "resolution": "พัฒนา custom placement algorithm ติดตาม row index ปัจจุบันของคอลัมน์ซ้ายและขวา วางแต่ละ widget ในคอลัมน์ที่สั้นกว่า คำนวณ grid-row-start/grid-row-span แบบ dynamic บน CSS Grid เพื่อบรรลุการจัดวาง Masonry-like ไร้ช่องว่าง"
          }
        ]
      },
      {
        "title": "การจัดเตรียมฟังก์ชันหน้าจอ Cross-Cutting: Error Handling, Cache, Access Control ฯลฯ",
        "summary": "พัฒนา error handling, cache reset, query header parameter injection, redirect, query batching และแก้ไข auto-generated validation จาก GraphQL schema",
        "difficulty": "high",
        "technologies": [
          "TypeScript",
          "React",
          "Apollo Client",
          "GraphQL"
        ],
        "highlights": [
          "พัฒนา error handling, cache reset, query header parameter injection, redirect, query batching และแก้ไข auto-generated validation จาก GraphQL schema"
        ]
      },
      {
        "title": "การสร้างสภาพแวดล้อม Visual Regression ด้วย Storybook+storycap+reg-suit",
        "summary": "รวม Storybook, storycap และ reg-suit เข้ากับ CI ของ GitHub Actions เพื่อดำเนินการ regression test ของ UI จัดเตรียม E2E test ด้วย Playwright สำหรับ regression test ใน CI ด้วย",
        "difficulty": "high",
        "technologies": [
          "Storybook",
          "GitHub Actions",
          "Playwright",
          "reg-suit",
          "storycap"
        ],
        "highlights": [
          "ออกแบบและสร้าง VRT pipeline ด้วย Storybook+storycap+reg-suit+GitHub Actions+S3 ทำให้วัฒนธรรม VRT เป็นที่ยอมรับในทีม",
          "พัฒนา b2b/b2c parallel screenshot ด้วย matrix strategy, threshold 0.1% diff comparison และ auto-post PR comment"
        ],
        "decisions": [
          {
            "title": "การออกแบบ VRT Pipeline ด้วย Storybook v8 + storycap + reg-suit + S3",
            "detail": "สร้างสภาพแวดล้อม Storybook ด้วย @storybook/react-vite v8.1.5 auto screenshot ด้วย storycap v5.0.0 pixel diff comparison ด้วย reg-suit (threshold 0.1%) publish ผลลัพธ์ไปยัง AWS S3 สร้าง diff review flow ผ่าน GitHub PR notification"
          },
          {
            "title": "VRT แบบ Parallel สำหรับ b2b/b2c ด้วย GitHub Actions Matrix Strategy",
            "detail": "screenshot b2b/b2c แบบ parallel ด้วย storycap ผ่าน matrix strategy ของ GitHub Actions อัปโหลดเป็น artifact ออกแบบ 2-stage pipeline ที่รวมแล้วดำเนินการ reg-suit run ใน vrt job ถัดไป"
          }
        ],
        "outcomes": [
          {
            "before": "การเปลี่ยนแปลง UI ที่ไม่ตั้งใจ (CSS regression) ถูกพบหลังจาก release",
            "after": "screenshot comparison อัตโนมัติทุก PR ด้วย storycap+reg-suit ตรวจจับ CSS regression ได้ 100% ก่อน merge",
            "metric": "อัตราตรวจจับ CSS regression"
          },
          {
            "before": "การตรวจสอบคุณภาพ UI เป็นแบบตรวจด้วยตาเท่านั้น regression bug ถูกพบหลัง release เนื่องจากมองข้าม",
            "after": "สร้าง VRT pipeline ด้วย Storybook v8.1.5 + storycap + reg-suit + GitHub Actions + S3 auto screenshot comparison สำหรับ UI component ทั้งหมด: b2b 215 story, b2c 49 page ทุก PR",
            "metric": "ตรวจจับ visual regression อัตโนมัติด้วย threshold pixel diff 0.1% PR comment diff image review เป็นที่ยอมรับ ลด UI regression bug หลัง release"
          }
        ],
        "challenges": [
          {
            "title": "การทำให้ storycap มีเสถียรภาพ: Timeout และ Asset Wait",
            "resolution": "ตั้ง screenshot: { waitAssets: true } ใน default parameter ของ preview.tsx เพื่อรอให้ asset โหลดเสร็จ ตั้ง serverTimeout 60000ms, captureTimeout 15000ms เมื่อดำเนินการ storycap ปรับ delay เฉพาะแต่ละ story เพื่อสร้างสภาพแวดล้อมถ่ายภาพที่เสถียร"
          },
          {
            "title": "การทำให้วัฒนธรรม VRT เป็นที่ยอมรับในทีม",
            "resolution": "นำ diff image display ใน PR comment ด้วย reg-notify-github-plugin มาใช้ กำหนดกฎทีมให้รวม diff ในการ review แนะนำ flow การพัฒนา component บน Storybook สร้าง development process ที่การสร้าง story เป็นส่วนหนึ่งของ VRT อย่างเป็นธรรมชาติ"
          }
        ]
      },
      {
        "title": "การ Migrate จาก react-admin ไปยัง Apollo Client/RHF/MUI และการนำ GraphQL Suspense มาใช้",
        "summary": "เสนอและผลักดันการ migrate จาก react-admin ไปยัง Apollo Client, RHF, MUI จนเสร็จสมบูรณ์เพื่อเพิ่มประสิทธิภาพการพัฒนา ตรวจสอบและนำ GraphQL Suspense, React Suspense มาใช้จริงเพื่อเพิ่มความเร็วในการแสดงผล",
        "difficulty": "high",
        "technologies": [
          "React",
          "React Hook Form",
          "MUI",
          "Apollo Client",
          "GraphQL"
        ],
        "highlights": [
          "เสนอและผลักดันการ migrate จาก react-admin ไปยัง Apollo Client, RHF, MUI จนเสร็จสมบูรณ์เพื่อเพิ่มประสิทธิภาพการพัฒนา ตรวจสอบและนำ GraphQL Suspense, React Suspense มาใช้จริงเพื่อเพิ่มความเร็วในการแสดงผล"
        ]
      },
      {
        "title": "การนำทีม Smoke Test ในฐานะ Leader",
        "summary": "รับบทบาท driver อย่างแข็งขันในฐานะ leader ของ test phase แชร์ข้อกำหนดหน้าจอและ transition เมื่อสมาชิกคนอื่นเป็น driver นำการสร้าง bug ticket และจัดการ test status",
        "difficulty": "medium",
        "technologies": [
          "Playwright"
        ],
        "highlights": [
          "รับบทบาท driver อย่างแข็งขันในฐานะ leader ของ test phase แชร์ข้อกำหนดหน้าจอและ transition เมื่อสมาชิกคนอื่นเป็น driver นำการสร้าง bug ticket และจัดการ test status"
        ]
      }
    ]
  },
  {
    "id": "mobile-order-app-2022",
    "company": "บริษัทแอปสั่งอาหารผ่านมือถือ",
    "companyDesc": "บริษัทที่พัฒนาและจำหน่ายแอปสั่งอาหารผ่านมือถือสำหรับร้านอาหาร รับผิดชอบการพัฒนา LIFF, แอปพลิเคชัน native และแบ็กเอนด์",
    "role": "วิศวกร LIFF Frontend / Native App / Backend",
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
        "title": "การพัฒนาฟรอนต์เอนด์ข้ามแพลตฟอร์ม: Web/LIFF/Native App",
        "summary": "พัฒนาทั้ง Web (Next.js), LIFF app และ native app (React Native/Expo) อย่างต่อเนื่อง implement domain logic ที่หลากหลาย เช่น การจัดการคำสั่งซื้อ, LINE integration ของร้าน, POS integration, การจัดการสต็อก และการปิดบัญชี",
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
          "พัฒนาทั้ง Web (Next.js), LIFF app และ native app (React Native/Expo) อย่างต่อเนื่อง implement domain logic ที่หลากหลาย เช่น การจัดการคำสั่งซื้อ, LINE integration ของร้าน, POS integration, การจัดการสต็อก และการปิดบัญชี"
        ]
      },
      {
        "title": "การรองรับหลายภาษาของ Mobile Order (ภาษาอังกฤษและภาษาจีน)",
        "summary": "สำรวจ UI ของแอปภาษาอังกฤษและภาษาจีนโดยมีเงื่อนไขว่าโลโก้และข้อความต้องแสดงถูกต้องบนทุกอุปกรณ์และเข้าใจความหมายได้กระชับ ปรับปรุง UI ด้วยการอภิปรายกับ designer และ PO โดยใช้ prototype",
        "difficulty": "medium",
        "technologies": [
          "TypeScript",
          "React",
          "LIFF"
        ],
        "highlights": [
          "สำรวจ UI ของแอปภาษาอังกฤษและภาษาจีนโดยมีเงื่อนไขว่าโลโก้และข้อความต้องแสดงถูกต้องบนทุกอุปกรณ์และเข้าใจความหมายได้กระชับ ปรับปรุง UI ด้วยการอภิปรายกับ designer และ PO โดยใช้ prototype"
        ]
      },
      {
        "title": "การพัฒนาการปิดบัญชีชั่วคราวของ POS (การรวม Logic กับการปิดบัญชีจริงและจัดทำ Unit Test)",
        "summary": "รวม logic ที่ซ้ำกับการปิดบัญชีจริงให้เป็นหนึ่ง แก้ไขความไม่สม่ำเสมอของการตั้งชื่อตัวแปร เพิ่ม unit test เพื่อ implement ที่มีหนี้ทางเทคนิคน้อย",
        "difficulty": "medium",
        "technologies": [
          "TypeScript",
          "NestJS",
          "GraphQL",
          "Jest"
        ],
        "highlights": [
          "รวม logic ที่ซ้ำกับการปิดบัญชีจริงให้เป็นหนึ่ง แก้ไขความไม่สม่ำเสมอของการตั้งชื่อตัวแปร เพิ่ม unit test เพื่อ implement ที่มีหนี้ทางเทคนิคน้อย"
        ]
      },
      {
        "title": "การพัฒนาการรวบรวมสถานะคำสั่งซื้อตามโต๊ะ, เมนู และเวลาบน Kitchen Display",
        "summary": "พัฒนาฟีเจอร์และปรับปรุง UI ของ kitchen display implement ฟังก์ชันรวบรวมสถานะคำสั่งซื้อตามโต๊ะ, เมนู และเวลา",
        "difficulty": "medium",
        "technologies": [
          "TypeScript",
          "Hasura",
          "GraphQL",
          "React Native"
        ],
        "highlights": [
          "พัฒนาฟีเจอร์และปรับปรุง UI ของ kitchen display implement ฟังก์ชันรวบรวมสถานะคำสั่งซื้อตามโต๊ะ, เมนู และเวลา"
        ]
      }
    ]
  },
  {
    "id": "board-management-app-2022",
    "company": "บริษัท DX การบริหารคณะกรรมการ",
    "companyDesc": "บริษัทที่ให้บริการ SaaS สำหรับ DX การบริหารคณะกรรมการบริษัท รับผิดชอบการพัฒนา FE และ BE ของบริการจัดการคณะกรรมการ",
    "role": "วิศวกร Frontend / Backend",
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
        "title": "การพัฒนา UI Component และจัดเตรียม Storybook (ใช้ Atomic Design)",
        "summary": "แก้ปัญหาความยากในการค้นหา UI component ด้วยการปรับ directory ของ Storybook ให้เป็น Atomic Design แสดง UI component ทั้งหมดใน Storybook เพื่อเพิ่มประสิทธิภาพการพัฒนาหน้าจอ",
        "difficulty": "medium",
        "technologies": [
          "TypeScript",
          "React",
          "Tailwind CSS",
          "Storybook"
        ],
        "highlights": [
          "แก้ปัญหาความยากในการค้นหา UI component ด้วยการปรับ directory ของ Storybook ให้เป็น Atomic Design แสดง UI component ทั้งหมดใน Storybook เพื่อเพิ่มประสิทธิภาพการพัฒนาหน้าจอ"
        ]
      },
      {
        "title": "การพัฒนาหน้าจอสนับสนุนการสร้างเอกสารและมติเป็นลายลักษณ์อักษร พร้อม E2E Test",
        "summary": "พัฒนารายละเอียดหน้าจอสนับสนุนการสร้างเอกสารและมติเป็นลายลักษณ์อักษร พัฒนา Playwright E2E test เพื่อรับประกันคุณภาพ",
        "difficulty": "medium",
        "technologies": [
          "TypeScript",
          "React",
          "Playwright"
        ],
        "highlights": [
          "พัฒนารายละเอียดหน้าจอสนับสนุนการสร้างเอกสารและมติเป็นลายลักษณ์อักษร พัฒนา Playwright E2E test เพื่อรับประกันคุณภาพ"
        ]
      },
      {
        "title": "การพัฒนาแบ็กเอนด์ฟังก์ชันจัดตารางนัดหมาย",
        "summary": "พัฒนาแบ็กเอนด์ฟังก์ชันจัดตารางนัดหมายด้วย Node.js/Express/GraphQL/Prisma",
        "difficulty": "medium",
        "technologies": [
          "Node.js",
          "Express",
          "Prisma",
          "GraphQL"
        ],
        "highlights": [
          "พัฒนาแบ็กเอนด์ฟังก์ชันจัดตารางนัดหมายด้วย Node.js/Express/GraphQL/Prisma"
        ]
      }
    ]
  },
  {
    "id": "freelance-web-2021",
    "company": "ฟรีแลนซ์",
    "companyDesc": "รับงานพัฒนา SPA homepage หลายโปรเจกต์ในฐานะฟรีแลนซ์ 4 โปรเจกต์: บริษัทสร้างเว็บไซต์, บริษัทจัดหางาน, บริษัทวิเคราะห์ข้อมูล และร้านอาหาร",
    "role": "วิศวกรฟรอนต์เอนด์",
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
        "title": "การพัฒนา SPA Homepage ด้วย React/Next.js (4 โปรเจกต์)",
        "summary": "พัฒนา SPA homepage สำหรับบริษัทสร้างเว็บไซต์, บริษัทจัดหางาน, บริษัทวิเคราะห์ข้อมูล และร้านอาหาร รับผิดชอบการเชื่อมต่อ frontend app กับ CMS (WordPress/Contentful ฯลฯ) และ hosting บน Vercel/Netlify/S3",
        "difficulty": "medium",
        "technologies": [
          "TypeScript",
          "JavaScript",
          "React",
          "Next.js",
          "Amazon S3"
        ],
        "highlights": [
          "พัฒนา SPA homepage สำหรับบริษัทสร้างเว็บไซต์, บริษัทจัดหางาน, บริษัทวิเคราะห์ข้อมูล และร้านอาหาร รับผิดชอบการเชื่อมต่อ frontend app กับ CMS (WordPress/Contentful ฯลฯ) และ hosting บน Vercel/Netlify/S3"
        ]
      }
    ]
  },
  {
    "id": "bitkey-data-2020",
    "company": "Bitkey, Inc.",
    "companyDesc": "สตาร์ทอัพพัฒนา smart lock รับผิดชอบการสร้าง data lake และ dashboard ภายในบริษัทรวมถึงพัฒนาเว็บไซต์ town portal",
    "role": "วิศวกรข้อมูล / วิศวกรฟรอนต์เอนด์",
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
        "title": "การกำหนดและจัดทำ KPI ร่วมทั้งบริษัท",
        "summary": "จัดระเบียบ KPI ด้านการบริหาร, ผลิตภัณฑ์, การขาย, คุณภาพ และสถานะการใช้งาน นิยามกลุ่มตัวชี้วัดที่พนักงานทั้งหมดควรแชร์ นำการออกแบบตัวชี้วัดเพื่อส่งเสริมวัฒนธรรมการแบ่งปันความรู้ข้ามทีม",
        "difficulty": "high",
        "technologies": [
          "Python",
          "SQL",
          "BigQuery"
        ],
        "highlights": [
          "จัดระเบียบ KPI ด้านการบริหาร, ผลิตภัณฑ์, การขาย, คุณภาพ และสถานะการใช้งาน นิยามกลุ่มตัวชี้วัดที่พนักงานทั้งหมดควรแชร์ นำการออกแบบตัวชี้วัดเพื่อส่งเสริมวัฒนธรรมการแบ่งปันความรู้ข้ามทีม"
        ]
      },
      {
        "title": "การสร้าง Pipeline รวบรวมข้อมูลจากหลายแหล่งไปยัง BigQuery",
        "summary": "พัฒนาการประมวลผลแบบตั้งเวลาด้วย AWS Lambda และ Cloud Functions เพื่อรวบรวมข้อมูลที่กระจายอยู่ใน Amazon Redshift, Amazon Aurora, Salesforce และ Cloud Firestore ไปยัง BigQuery รับผิดชอบการแปลงและรวบรวมข้อมูลแบบ semi-structured อัตโนมัติ",
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
          "พัฒนาการประมวลผลแบบตั้งเวลาด้วย AWS Lambda และ Cloud Functions เพื่อรวบรวมข้อมูลที่กระจายอยู่ใน Amazon Redshift, Amazon Aurora, Salesforce และ Cloud Firestore ไปยัง BigQuery รับผิดชอบการแปลงและรวบรวมข้อมูลแบบ semi-structured อัตโนมัติ"
        ]
      },
      {
        "title": "การออกแบบและพัฒนา Dashboard ด้วย Google Data Portal และการเผยแพร่ภายในบริษัท",
        "summary": "ออกแบบและพัฒนา dashboard ด้วย Google Data Portal แสดงตัวชี้วัดการขาย, คุณภาพ และการใช้งานตลอดเวลา ติดตั้งจอแสดงผลที่ทางเข้าสำนักงาน, วางใน portal พนักงาน และนำเสนอในการประชุมรายสัปดาห์เพื่อสร้างวัฒนธรรมการใช้ข้อมูล",
        "difficulty": "medium",
        "technologies": [
          "SQL",
          "BigQuery",
          "Google Data Portal"
        ],
        "highlights": [
          "ออกแบบและพัฒนา dashboard ด้วย Google Data Portal แสดงตัวชี้วัดการขาย, คุณภาพ และการใช้งานตลอดเวลา ติดตั้งจอแสดงผลที่ทางเข้าสำนักงาน, วางใน portal พนักงาน และนำเสนอในการประชุมรายสัปดาห์เพื่อสร้างวัฒนธรรมการใช้ข้อมูล"
        ]
      },
      {
        "title": "การพัฒนา UI Component ของเว็บไซต์ Town Portal",
        "summary": "เว็บไซต์ town portal สำหรับแชร์ข้อมูลระหว่างผู้อยู่อาศัยในเมืองใหม่ที่ใช้ smart lock พัฒนา UI component ร่วมหลายหน้าจอโดยปรึกษากับ UI designer สร้าง UI catalog ด้วย Storybook",
        "difficulty": "medium",
        "technologies": [
          "TypeScript",
          "React",
          "MUI",
          "Storybook"
        ],
        "highlights": [
          "เว็บไซต์ town portal สำหรับแชร์ข้อมูลระหว่างผู้อยู่อาศัยในเมืองใหม่ที่ใช้ smart lock พัฒนา UI component ร่วมหลายหน้าจอโดยปรึกษากับ UI designer สร้าง UI catalog ด้วย Storybook"
        ]
      }
    ]
  },
  {
    "id": "simplex-banking-2019",
    "company": "Simplex Inc.",
    "companyDesc": "SIer ที่เชี่ยวชาญด้านการพัฒนาระบบการเงิน รับผิดชอบการพัฒนา, ทดสอบ และบำรุงรักษาระบบจัดการความเสี่ยงสำหรับธนาคารขนาดใหญ่และแอปลงทะเบียนใหม่สำหรับบริษัทประกันภัย",
    "role": "วิศวกรฟรอนต์เอนด์ / ผู้ทดสอบ / ผู้ดูแลระบบ",
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
        "title": "การพัฒนาแอป Frontend บน Excel ที่เชื่อมต่อ Java JSON API ด้วย VBA",
        "summary": "พัฒนาแอปที่สื่อสารกับ Java JSON API ผ่าน VBA และแสดงข้อมูลบน Excel implement ฟังก์ชันเพิ่มคอลัมน์แบบ dynamic ตามผลลัพธ์ JSON และฝังสูตร Excel ในแต่ละคอลัมน์ ให้ความสำคัญกับการตั้งชื่อที่อ่านง่าย",
        "difficulty": "high",
        "technologies": [
          "Java",
          "VBA",
          "Bash"
        ],
        "highlights": [
          "พัฒนาแอปที่สื่อสารกับ Java JSON API ผ่าน VBA และแสดงข้อมูลบน Excel implement ฟังก์ชันเพิ่มคอลัมน์แบบ dynamic ตามผลลัพธ์ JSON และฝังสูตร Excel ในแต่ละคอลัมน์ ให้ความสำคัญกับการตั้งชื่อที่อ่านง่าย"
        ]
      },
      {
        "title": "การทดสอบที่ไซต์ลูกค้า, การ Release, การบำรุงรักษาและตอบคำถามลูกค้า",
        "summary": "รับผิดชอบการทดสอบที่ไซต์ลูกค้าและการ release ด้วย shell command และ AWS นำการตอบคำถามทางอีเมลจากลูกค้า, การออกแบบพื้นฐานของ enhancement project, การสร้าง bug ticket และการยืนยันการจัดการในการประชุมประจำ",
        "difficulty": "medium",
        "technologies": [
          "Java",
          "Bash"
        ],
        "highlights": [
          "รับผิดชอบการทดสอบที่ไซต์ลูกค้าและการ release ด้วย shell command และ AWS นำการตอบคำถามทางอีเมลจากลูกค้า, การออกแบบพื้นฐานของ enhancement project, การสร้าง bug ticket และการยืนยันการจัดการในการประชุมประจำ"
        ]
      },
      {
        "title": "การพัฒนา Frontend ด้วย Vue.js สำหรับแอปลงทะเบียนใหม่ของบริษัทประกันภัย",
        "summary": "กำหนดข้อกำหนดรายละเอียดของ help tip และ modal ร่วมกับ designer แล้ว implement ในทุก input field ของทุกหน้าจอ พัฒนา UI สำหรับหน้าจอ input ของผู้ใช้หลายหน้า รับผิดชอบการดำเนินการและจัดการ business scenario test และ system test",
        "difficulty": "medium",
        "technologies": [
          "TypeScript",
          "JavaScript",
          "Vue.js"
        ],
        "highlights": [
          "กำหนดข้อกำหนดรายละเอียดของ help tip และ modal ร่วมกับ designer แล้ว implement ในทุก input field ของทุกหน้าจอ พัฒนา UI สำหรับหน้าจอ input ของผู้ใช้หลายหน้า รับผิดชอบการดำเนินการและจัดการ business scenario test และ system test"
        ]
      }
    ]
  },
  {
    "id": "graph-intern-2018",
    "company": "Graph, Inc.",
    "companyDesc": "ฝึกงานที่บริษัทวิเคราะห์ข้อมูลและพัฒนา AI รับผิดชอบการพัฒนา recommendation engine สำหรับ EC แฟชั่น, การวิเคราะห์ข้อมูลสำหรับผู้ผลิตรถยนต์ และการพัฒนา chatbot",
    "role": "วิศวกรข้อมูล / นักศึกษาฝึกงาน",
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
        "title": "การพัฒนา Prototype ของ Recommendation Engine สำหรับ EC แฟชั่น (3 อัลกอริทึม)",
        "summary": "พัฒนา prototype ของ recommendation engine สำหรับแสดงรายการแนะนำในหน้าแรก, หน้าสินค้า และหน้าตะกร้าสินค้า ใช้ content-based filtering และ collaborative filtering สำหรับลูกค้าใหม่, ลูกค้าเก่า และหน้าสินค้าแต่ละแบบ ออกแบบโดยคำนึงถึง serendipity ด้วย",
        "difficulty": "high",
        "technologies": [
          "Python",
          "pandas",
          "NumPy",
          "SQL"
        ],
        "highlights": [
          "พัฒนา prototype ของ recommendation engine สำหรับแสดงรายการแนะนำในหน้าแรก, หน้าสินค้า และหน้าตะกร้าสินค้า ใช้ content-based filtering และ collaborative filtering สำหรับลูกค้าใหม่, ลูกค้าเก่า และหน้าสินค้าแต่ละแบบ ออกแบบโดยคำนึงถึง serendipity ด้วย"
        ]
      },
      {
        "title": "การจำแนกลูกค้าด้วย k-Nearest Neighbors และการรวบรวมข้อมูลการซื้อพื้นฐาน",
        "summary": "จำแนกลูกค้าปัจจุบันด้วย k-nearest neighbors เพื่อประกอบการพิจารณากลยุทธ์การตลาดของผู้บริหาร EC แฟชั่น รวบรวมข้อมูลการซื้อพื้นฐานตามกลุ่ม (ยอมขายตามหมวดหมู่สินค้า ฯลฯ)",
        "difficulty": "medium",
        "technologies": [
          "Python",
          "pandas",
          "NumPy",
          "SQL"
        ],
        "highlights": [
          "จำแนกลูกค้าปัจจุบันด้วย k-nearest neighbors เพื่อประกอบการพิจารณากลยุทธ์การตลาดของผู้บริหาร EC แฟชั่น รวบรวมข้อมูลการซื้อพื้นฐานตามกลุ่ม (ยอดขายตามหมวดหมู่สินค้า ฯลฯ)"
        ]
      },
      {
        "title": "การพัฒนาและ Deploy Chatbot สำหรับสาธิตแบบ Full-Stack",
        "summary": "กำหนดข้อกำหนดการออกแบบ, พัฒนาหน้าจอ และ API (Python/Flask) ของ chatbot สำหรับสาธิต deploy แอปพลิเคชันไปยัง S3 และ EC2",
        "difficulty": "medium",
        "technologies": [
          "JavaScript",
          "Flask",
          "Amazon S3",
          "Amazon EC2",
          "Python"
        ],
        "highlights": [
          "กำหนดข้อกำหนดการออกแบบ, พัฒนาหน้าจอ และ API (Python/Flask) ของ chatbot สำหรับสาธิต deploy แอปพลิเคชันไปยัง S3 และ EC2"
        ]
      }
    ]
  }
];
