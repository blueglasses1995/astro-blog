/**
 * 画像のaltテキストを生成するライブラリ
 */

type AIProvider = 'openai' | 'anthropic' | 'gemini';

interface AltTextOptions {
	provider?: AIProvider;
	locale: string;
	context?: string; // 記事のコンテキスト
}

/**
 * OpenAI APIを使用してaltテキストを生成
 */
async function generateAltWithOpenAI(
	imageUrl: string,
	options: AltTextOptions
): Promise<string> {
	const apiKey = process.env.OPENAI_API_KEY;
	if (!apiKey) {
		throw new Error('OPENAI_API_KEY is not set');
	}

	const prompt = `Generate a concise, descriptive alt text in ${options.locale} for this image. The alt text should be under 125 characters and describe what's in the image clearly.

${options.context ? `Context: ${options.context}\n` : ''}Image URL: ${imageUrl}

Alt text:`;

	const response = await fetch('https://api.openai.com/v1/chat/completions', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${apiKey}`,
		},
		body: JSON.stringify({
			model: 'gpt-4-vision-preview',
			messages: [
				{
					role: 'user',
					content: [
						{ type: 'text', text: prompt },
						{ type: 'image_url', image_url: { url: imageUrl } },
					],
				},
			],
			max_tokens: 100,
		}),
	});

	if (!response.ok) {
		const error = await response.text();
		throw new Error(`OpenAI API error: ${response.status} - ${error}`);
	}

	const data = await response.json();
	return data.choices[0]?.message?.content?.trim() || '';
}

/**
 * 画像のaltテキストを生成
 */
export async function generateImageAltText(
	imageUrl: string,
	options: AltTextOptions
): Promise<string> {
	const {
		provider = (process.env.AI_PROVIDER as AIProvider) || 'openai',
	} = options;

	try {
		switch (provider) {
			case 'openai':
				return await generateAltWithOpenAI(imageUrl, options);
			case 'anthropic':
			case 'gemini':
				// 他のプロバイダーも同様に実装可能
				console.warn(`Alt text generation for ${provider} is not yet implemented`);
				return '';
			default:
				throw new Error(`Unsupported AI provider: ${provider}`);
		}
	} catch (error) {
		console.error(`Alt text generation error (${provider}):`, error);
		return '';
	}
}

/**
 * マークダウン内の画像タグにaltテキストを追加
 */
export function addAltTextToMarkdown(
	markdown: string,
	imageAltMap: Record<string, string>
): string {
	// 画像タグのパターン: ![alt](url) または <img src="url" alt="alt">
	let result = markdown;

	// ![alt](url) パターン
	result = result.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (match, alt, url) => {
		if (alt && alt.trim()) {
			return match; // 既にaltがある場合はそのまま
		}
		const altText = imageAltMap[url] || imageAltMap[decodeURIComponent(url)] || 'Image';
		return `![${altText}](${url})`;
	});

	// <img> タグパターン
	result = result.replace(/<img\s+([^>]*)>/gi, (match, attributes) => {
		if (attributes.includes('alt=')) {
			return match; // 既にaltがある場合はそのまま
		}
		const srcMatch = attributes.match(/src=["']([^"']+)["']/i);
		if (srcMatch) {
			const url = srcMatch[1];
			const altText = imageAltMap[url] || imageAltMap[decodeURIComponent(url)] || 'Image';
			return `<img ${attributes} alt="${altText}">`;
		}
		return match;
	});

	return result;
}
