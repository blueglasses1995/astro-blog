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
 * 画像をリサイズしてbase64エンコードする
 * Claude APIの制限（2000px）に対応
 */
async function resizeImageToBase64(
	imageUrl: string,
	maxDimension: number = 2000
): Promise<string> {
	try {
		// 画像をフェッチ
		const response = await fetch(imageUrl);
		if (!response.ok) {
			throw new Error(`Failed to fetch image: ${response.statusText}`);
		}

		const arrayBuffer = await response.arrayBuffer();
		const buffer = Buffer.from(arrayBuffer);

		// sharpを使用してリサイズ（Node.js環境のみ）
		// 動的インポートでsharpを使用
		let sharpModule: any = null;
		try {
			sharpModule = await import('sharp');
		} catch (e) {
			// sharpが利用できない場合はnullのまま
		}
		
		if (sharpModule && (sharpModule.default || sharpModule)) {
			// sharpが利用可能な場合
			const sharp = sharpModule.default || sharpModule;
			const image = sharp(buffer);
			const metadata = await image.metadata();
			
			let width = metadata.width || 0;
			let height = metadata.height || 0;
			
			// リサイズが必要かチェック
			if (width > maxDimension || height > maxDimension) {
				const ratio = Math.min(maxDimension / width, maxDimension / height);
				width = Math.round(width * ratio);
				height = Math.round(height * ratio);
				
				const resizedBuffer = await image
					.resize(width, height, { fit: 'inside', withoutEnlargement: true })
					.jpeg({ quality: 85 })
					.toBuffer();
				
				return `data:image/jpeg;base64,${resizedBuffer.toString('base64')}`;
			}
			
			// リサイズ不要な場合はそのままbase64エンコード
			return `data:image/${metadata.format || 'jpeg'};base64,${buffer.toString('base64')}`;
		} else {
			// sharpが利用できない場合（ブラウザ環境など）
			// 画像をそのままbase64エンコード（リサイズなし）
			const contentType = response.headers.get('content-type') || 'image/jpeg';
			return `data:${contentType};base64,${buffer.toString('base64')}`;
		}
	} catch (error) {
		console.error('Error resizing image:', error);
		throw error;
	}
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
 * Anthropic APIを使用してaltテキストを生成
 */
async function generateAltWithAnthropic(
	imageUrl: string,
	options: AltTextOptions
): Promise<string> {
	const apiKey = process.env.ANTHROPIC_API_KEY;
	if (!apiKey) {
		throw new Error('ANTHROPIC_API_KEY is not set');
	}

	// 画像をリサイズしてbase64エンコード（2000px制限対応）
	const base64Image = await resizeImageToBase64(imageUrl, 2000);

	const prompt = `Generate a concise, descriptive alt text in ${options.locale} for this image. The alt text should be under 125 characters and describe what's in the image clearly.

${options.context ? `Context: ${options.context}\n` : ''}Alt text:`;

	const response = await fetch('https://api.anthropic.com/v1/messages', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'x-api-key': apiKey,
			'anthropic-version': '2023-06-01',
		},
		body: JSON.stringify({
			model: 'claude-3-5-sonnet-20241022',
			max_tokens: 100,
			messages: [
				{
					role: 'user',
					content: [
						{ type: 'text', text: prompt },
						{
							type: 'image',
							source: {
								type: 'base64',
								media_type: 'image/jpeg',
								data: base64Image.split(',')[1], // data:image/jpeg;base64,の部分を除去
							},
						},
					],
				},
			],
		}),
	});

	if (!response.ok) {
		const error = await response.text();
		throw new Error(`Anthropic API error: ${response.status} - ${error}`);
	}

	const data = await response.json();
	return data.content[0]?.text?.trim() || '';
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
				return await generateAltWithAnthropic(imageUrl, options);
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
