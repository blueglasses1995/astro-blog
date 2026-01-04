import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Calendar, Clock, RefreshCcw } from 'lucide-react';
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

/**
 * 日付文字列を日付レベルのフォーマット（YYYY-MM-DD）に変換
 */
function formatDate(dateString: string): string {
  if (!dateString) return '';
  
  try {
    const date = new Date(dateString);
    // 無効な日付の場合は元の文字列を返す
    if (isNaN(date.getTime())) {
      return dateString;
    }
    
    // YYYY-MM-DD形式で返す
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
  } catch (error) {
    // エラーが発生した場合は元の文字列を返す
    return dateString;
  }
}

export function BlogCard({ title, description, date, readTime = '', tags = [], slug, updatedDate, locale = defaultLocale, category }: BlogCardProps) {
  const href = getLocalizedPath(`/blog/${slug}`, locale);
  const showUpdated = Boolean(updatedDate && updatedDate !== date);
  const formattedDate = formatDate(date);
  const formattedUpdatedDate = updatedDate ? formatDate(updatedDate) : '';
  
  return (
    <a href={href} className="block h-full group">
      <Card className="h-full flex flex-col hover:shadow-lg hover:border-primary/50 transition-all cursor-pointer">
        <CardHeader>
          <div className="flex gap-2 mb-3 flex-wrap">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
          <CardTitle className="line-clamp-2 mb-2 group-hover:text-primary transition-colors">{title}</CardTitle>
          <CardDescription className="line-clamp-2">{description}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow flex flex-col">
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground leading-relaxed mt-auto">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{formattedDate}</span>
            </div>
            {showUpdated && (
              <div className="flex items-center gap-1">
                <RefreshCcw className="h-4 w-4" />
                <span>{formattedUpdatedDate}</span>
              </div>
            )}
            {readTime && (
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{readTime}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </a>
  );
}
