/**
 * 関連記事コンポーネント
 */

import { BlogCard } from './BlogCard';
import type { SupportedLocale } from '../types';
import { defaultLocale } from '../i18n/utils';

interface RelatedPost {
	slug: string;
	title: string;
	description: string;
	date: string | Date;
	readTime?: string;
	tags: string[];
	category?: string;
}

interface RelatedPostsProps {
	posts: RelatedPost[];
	locale?: SupportedLocale;
	currentSlug?: string;
}

export function RelatedPosts({ posts, locale = defaultLocale, currentSlug }: RelatedPostsProps) {
	// 現在の記事を除外
	const filteredPosts = posts.filter(post => post.slug !== currentSlug);

	if (filteredPosts.length === 0) {
		return null;
	}

	return (
		<section className="mt-16 pt-8 border-t border-border">
			<h2 className="text-2xl font-bold mb-6">関連記事</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{filteredPosts.map((post) => {
				const dateString = post.date instanceof Date 
					? post.date.toISOString().split('T')[0] 
					: typeof post.date === 'string' 
						? post.date 
						: new Date().toISOString().split('T')[0];
				
				return (
					<BlogCard
						key={post.slug}
						title={post.title}
						description={post.description}
						date={dateString}
						readTime={post.readTime}
						tags={post.tags || []}
						slug={post.slug}
						locale={locale}
						category={post.category}
					/>
				);
			})}
			</div>
		</section>
	);
}
