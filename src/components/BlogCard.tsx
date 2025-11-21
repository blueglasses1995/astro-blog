import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Calendar, Clock } from 'lucide-react';

interface BlogCardProps {
  title: string;
  description: string;
  date: string;
  readTime: string;
  tags: string[];
  slug: string;
}

export function BlogCard({ title, description, date, readTime, tags, slug }: BlogCardProps) {
  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex gap-2 mb-2 flex-wrap">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
        <CardTitle className="line-clamp-2">{title}</CardTitle>
        <CardDescription className="line-clamp-2">{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{readTime}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild variant="outline" className="w-full">
          <a href={`/blog/${slug}`}>続きを読む</a>
        </Button>
      </CardFooter>
    </Card>
  );
}
