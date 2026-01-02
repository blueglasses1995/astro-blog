/**
 * AI翻訳ライブラリ
 * OpenAI、Anthropic、Google Geminiに対応
 */

type AIProvider = 'openai' | 'anthropic' | 'gemini';

interface TranslationOptions {
	provider?: AIProvider;
	sourceLocale: string;
	targetLocale: string;
	preserveMarkdown?: boolean;
}

interface TranslationResult {
	translatedText: string;
	provider: string;
}

/**
 * OpenAI APIを使用した翻訳
 */
async function translateWithOpenAI(
	text: string,
	sourceLocale: string,
	targetLocale: string
): Promise<string> {
	const apiKey = process.env.OPENAI_API_KEY;
	if (!apiKey) {
		throw new Error('OPENAI_API_KEY is not set');
	}

	const response = await fetch('https://api.openai.com/v1/chat/completions', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${apiKey}`,
		},
		body: JSON.stringify({
			model: 'gpt-4',
			messages: [
				{
					role: 'system',
					content: `You are a professional translator. Translate the following markdown content from ${sourceLocale} to ${targetLocale}. Preserve all markdown formatting, code blocks, links, and structure exactly as they are. Only translate the text content, not the markdown syntax.`,
				},
				{
					role: 'user',
					content: text,
				},
			],
			temperature: 0.3,
		}),
	});

	if (!response.ok) {
		const error = await response.text();
		throw new Error(`OpenAI API error: ${response.status} - ${error}`);
	}

	const data = await response.json();
	return data.choices[0]?.message?.content || text;
}

/**
 * Anthropic APIを使用した翻訳
 */
async function translateWithAnthropic(
	text: string,
	sourceLocale: string,
	targetLocale: string
): Promise<string> {
	const apiKey = process.env.ANTHROPIC_API_KEY;
	if (!apiKey) {
		throw new Error('ANTHROPIC_API_KEY is not set');
	}

	const response = await fetch('https://api.anthropic.com/v1/messages', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'x-api-key': apiKey,
			'anthropic-version': '2023-06-01',
		},
		body: JSON.stringify({
			model: 'claude-3-5-sonnet-20241022',
			max_tokens: 8192,
			messages: [
				{
					role: 'user',
					content: `Translate the following markdown content from ${sourceLocale} to ${targetLocale}. Preserve all markdown formatting, code blocks, links, and structure exactly as they are. Only translate the text content, not the markdown syntax.\n\n${text}`,
				},
			],
		}),
	});

	if (!response.ok) {
		const error = await response.text();
		throw new Error(`Anthropic API error: ${response.status} - ${error}`);
	}

	const data = await response.json();
	return data.content[0]?.text || text;
}

/**
 * Google Gemini APIを使用した翻訳
 */
async function translateWithGemini(
	text: string,
	sourceLocale: string,
	targetLocale: string
): Promise<string> {
	const apiKey = process.env.GEMINI_API_KEY;
	if (!apiKey) {
		throw new Error('GEMINI_API_KEY is not set');
	}

	const response = await fetch(
		`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				contents: [
					{
						parts: [
							{
								text: `Translate the following markdown content from ${sourceLocale} to ${targetLocale}. Preserve all markdown formatting, code blocks, links, and structure exactly as they are. Only translate the text content, not the markdown syntax.\n\n${text}`,
							},
						],
					},
				],
			}),
		}
	);

	if (!response.ok) {
		const error = await response.text();
		throw new Error(`Gemini API error: ${response.status} - ${error}`);
	}

	const data = await response.json();
	return data.candidates[0]?.content?.parts[0]?.text || text;
}

/**
 * テキストを翻訳
 */
export async function translateText(
	text: string,
	options: TranslationOptions
): Promise<TranslationResult> {
	const {
		provider = (process.env.AI_PROVIDER as AIProvider) || 'openai',
		sourceLocale,
		targetLocale,
	} = options;

	if (sourceLocale === targetLocale) {
		return {
			translatedText: text,
			provider: 'none',
		};
	}

	let translatedText: string;

	try {
		switch (provider) {
			case 'openai':
				translatedText = await translateWithOpenAI(text, sourceLocale, targetLocale);
				break;
			case 'anthropic':
				translatedText = await translateWithAnthropic(text, sourceLocale, targetLocale);
				break;
			case 'gemini':
				translatedText = await translateWithGemini(text, sourceLocale, targetLocale);
				break;
			default:
				throw new Error(`Unsupported AI provider: ${provider}`);
		}

		return {
			translatedText,
			provider,
		};
	} catch (error) {
		console.error(`Translation error (${provider}):`, error);
		throw error;
	}
}

/**
 * マークダウンファイルのフロントマターとコンテンツを翻訳
 */
export async function translateMarkdown(
	frontmatter: Record<string, any>,
	content: string,
	options: TranslationOptions
): Promise<{ translatedFrontmatter: Record<string, any>; translatedContent: string }> {
	// タイトルと説明を翻訳
	const title = await translateText(frontmatter.title || '', options);
	const description = await translateText(frontmatter.description || '', options);
	const contentResult = await translateText(content, options);

	// 翻訳されたフロントマターを作成（言語依存のフィールドのみ翻訳）
	const translatedFrontmatter = {
		...frontmatter,
		title: title.translatedText,
		description: description.translatedText,
		// メタデータへの参照を追加
		metadataSlug: frontmatter.slug || frontmatter.metadataSlug,
	};

	return {
		translatedFrontmatter,
		translatedContent: contentResult.translatedText,
	};
}
