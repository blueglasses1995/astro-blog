import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { RefreshCcw } from 'lucide-react';
import { getLocalizedPath, defaultLocale } from '../i18n/utils';
import type { SupportedLocale } from '../types';

interface BlogCardProps {
  title: string;
  description: string;
  date: string;
  readTime?: string;
  tags: string[];
  slug: string;
  locale?: SupportedLocale;
  updatedDate?: string;
  category?: string;
}

function formatDate(dateString: string): string {
  if (!dateString) return '';
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  } catch {
    return dateString;
  }
}

export function BlogCard({ title, description, date, readTime = '', tags = [], slug, updatedDate, locale = defaultLocale, category }: BlogCardProps) {
  const href = getLocalizedPath(`/blog/${slug}`, locale);
  const showUpdated = Boolean(updatedDate && updatedDate !== date);
  const formattedDate = formatDate(date);
  const formattedUpdatedDate = updatedDate ? formatDate(updatedDate) : '';

  return (
    <a
      href={href}
      className="block h-full group"
      data-testid={`blog-card-${slug}`}
      aria-label={`記事を読む: ${title}`}
    >
      <Card className="h-full flex flex-col border hover:border-foreground/20 transition-all duration-300 cursor-pointer overflow-hidden">
        <CardHeader className="pb-3">
          {/* Category accent bar */}
          {category && (
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-[2px] bg-amber-500" />
              <span className="text-xs font-medium tracking-widest uppercase text-amber-600 dark:text-amber-400">
                {category}
              </span>
            </div>
          )}
          {!category && tags.length > 0 && (
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-[2px] bg-amber-500" />
              <span className="text-xs font-medium tracking-widest uppercase text-amber-600 dark:text-amber-400">
                {tags[0]}
              </span>
            </div>
          )}
          <CardTitle className="font-serif text-xl sm:text-2xl leading-tight line-clamp-2 mb-2 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
            {title}
          </CardTitle>
          <CardDescription className="line-clamp-2 text-sm leading-relaxed">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow flex flex-col">
          {tags.length > 0 && (
            <div className="flex gap-1.5 mb-4 flex-wrap">
              {tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="secondary" className="text-[10px] px-2 py-0 font-normal">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
          <div className="flex items-center gap-3 text-xs text-muted-foreground mt-auto pt-4 border-t border-border/50">
            <span>{formattedDate}</span>
            {showUpdated && (
              <>
                <span className="text-border">|</span>
                <span className="flex items-center gap-1">
                  <RefreshCcw className="h-3 w-3" />
                  {formattedUpdatedDate}
                </span>
              </>
            )}
            {readTime && (
              <>
                <span className="text-border">|</span>
                <span>{readTime}</span>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </a>
  );
}
