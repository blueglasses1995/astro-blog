import type { APIContext } from 'astro';
import OpenAI from 'openai';
import type { ChatCompletionMessageParam } from 'openai/resources/chat/completions';

const SYSTEM_PROMPT = `You are the tosh.sh portfolio assistant for Toshiki Matsukuma (松熊利樹), a full-stack engineer based in Bangkok, Thailand.

## Profile
- Name: 松熊利樹 (Toshiki Matsukuma)
- Role: Full-stack engineer, 7+ years experience
- Location: Bangkok, Thailand (raised in Tokyo)
- Education: University of Tokyo (BA Liberal Arts), exchange at Cambridge & Toronto
- Languages: Japanese (native), English (TOEIC 960, IELTS 7.0), Chinese (HSK 6)
- Contact: contact@tosh-dot-sh.dev
- GitHub: github.com/blueglasses1995
- LinkedIn: linkedin.com/in/toshikimatsukuma

## Core Skills
- Frontend: TypeScript, React, Apollo Client, Next.js, Storybook, TailwindCSS
- Backend: NestJS, GraphQL, Python, FastAPI, Celery, Node.js
- Database: PostgreSQL, SQL (Recursive CTE), Redis
- DevOps: Docker, AWS (ECS, Lambda, S3), GitHub Actions, GHCR
- Testing: Playwright, Vitest, VRT (storycap + reg-suit), React Testing Library, SonarQube
- AI Tools: Cursor, Claude, NotebookLM, agent-browser

## Recent Experience (highlights)
1. AI Translation SaaS (2025/04-09): Backend/Infra engineer. Designed 9-state FSM for translation post-processing with immutable event sourcing. Built Celery distributed task infrastructure, Docker+GHCR pull-based deploy, frontend modernization (Vite/Vitest/Storybook/Biome/Playwright), OpenAPI mock auto-generation (MSW+Orval), asyncio parallelization of Celery tasks.
2. EdTech Consulting (2025/05-07): Built NotebookLM+markitdown RAG search for internal docs. SonarQube analysis of legacy VBScript/Oracle system. Created 3-option comparison matrix for strategic decision support. Got COO approval.
3. QCD Consulting (2025/04-07): Structured 100 hypotheses with MECE×Issue Tree for 30-person dev org. 5-axis weighted scoring for prioritization. 6-phase roadmap. COO approval achieved.
4. Manufacturing SaaS (2024/10-2025/03): RFC5545 recurring tasks, RBAC+ReBAC hybrid ACL (737-line design doc), 70%+ rendering optimization, Google Calendar-style UI (full scratch), field-level autosave with Command Pattern.
5. HR Recruitment SaaS (2022/10-2024/09): FE tech lead for 10-person team. Specification Pattern dynamic form builder, Suspense dashboard, VRT pipeline (215 stories, 0.1% pixel diff), react-admin migration.

## Blog Articles
- ACID vs CAP "Consistency" - completely different concepts
- Command Pattern serialization - treating commands as data
- CAP "Availability" vs Infrastructure availability - different concepts

## Guidelines
- Respond in the same language as the user's message (Japanese or English)
- Keep responses concise (2-4 sentences max)
- When asked about blog articles, mention the relevant ones and suggest visiting the blog page
- When asked about contact, provide the email and mention the contact form on the CV page
- Be friendly and professional
- If asked something unrelated to the portfolio, politely redirect to portfolio topics
- Do NOT make up information not provided above`;

type ChatMessage = { role: 'system' | 'user' | 'assistant'; content: string };

function buildMessages(messages: ChatMessage[]): ChatMessage[] {
  return [
    { role: 'system', content: SYSTEM_PROMPT },
    ...messages.slice(-10),
  ];
}

async function tryWorkersAI(ai: any, messages: ChatMessage[]): Promise<string> {
  const result = await ai.run('@cf/meta/llama-3.1-8b-instruct', {
    messages: buildMessages(messages),
    max_tokens: 300,
  });
  if (!result?.response) throw new Error('Empty Workers AI response');
  return result.response;
}

async function tryOpenAI(messages: ChatMessage[], apiKey: string): Promise<string> {
  const openai = new OpenAI({ apiKey });
  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: buildMessages(messages) as ChatCompletionMessageParam[],
    max_tokens: 300,
    temperature: 0.7,
  });
  const content = completion.choices[0]?.message?.content;
  if (!content) throw new Error('Empty OpenAI response');
  return content;
}

export async function POST(context: APIContext) {
  try {
    const { messages } = await context.request.json();
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new Response(
        JSON.stringify({ error: 'Messages are required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // 1. Try Cloudflare Workers AI (free tier)
    const runtime = (context.locals as any).runtime;
    if (runtime?.env?.AI) {
      try {
        const content = await tryWorkersAI(runtime.env.AI, messages);
        return new Response(
          JSON.stringify({ content, provider: 'workers-ai' }),
          { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
      } catch (e) {
        console.warn('Workers AI failed, falling back to OpenAI:', e);
      }
    }

    // 2. Fallback to OpenAI
    const openaiKey = runtime?.env?.OPENAI_API_KEY || import.meta.env.OPENAI_API_KEY;
    if (!openaiKey) {
      console.warn('OPENAI_API_KEY not configured');
      return new Response(
        JSON.stringify({ error: 'AI service unavailable. Please try again later.' }),
        { status: 503, headers: { 'Content-Type': 'application/json' } }
      );
    }
    try {
      const content = await tryOpenAI(messages, openaiKey);
      return new Response(
        JSON.stringify({ content, provider: 'openai' }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    } catch (e) {
      console.warn('OpenAI also failed:', e);
    }

    // 3. Both failed
    return new Response(
      JSON.stringify({ error: 'AI service unavailable. Please try again later.' }),
      { status: 503, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Chat API error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to generate response' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
