import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ExternalLink, Github, Star } from 'lucide-react';
import type { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="h-full"
    >
      <Card className="h-full flex flex-col overflow-hidden group border hover:border-foreground/20 transition-all duration-300">
        {/* Project Image */}
        <div className="relative h-48 overflow-hidden bg-gradient-to-br from-secondary to-muted">
          {project.featured && (
            <div className="absolute top-4 right-4 z-10">
              <Badge className="bg-crimson-500 hover:bg-crimson-500 text-white border-0 text-[10px] tracking-wider uppercase">
                <Star className="w-3 h-3 mr-1 fill-white" />
                Featured
              </Badge>
            </div>
          )}
          <div
            className="absolute inset-0 bg-gradient-to-br from-foreground/5 to-foreground/10 group-hover:from-foreground/10 group-hover:to-foreground/15 transition-all duration-500"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-7xl font-serif font-black text-foreground/[0.04]">
              {project.title.charAt(0)}
            </span>
          </div>
        </div>

        <CardHeader>
          <CardTitle className="font-serif text-xl line-clamp-1 group-hover:text-crimson-600 dark:group-hover:text-crimson-400 transition-colors">
            {project.title}
          </CardTitle>
          <CardDescription className="line-clamp-2">{project.description}</CardDescription>
        </CardHeader>

        <CardContent className="flex-grow">
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-[10px] px-2 py-0 font-normal">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>

        <CardFooter className="flex gap-2">
          {project.demoUrl && (
            <Button asChild variant="default" size="sm" className="flex-1 bg-crimson-500 hover:bg-crimson-600 text-white border-0">
              <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-2" />
                Demo
              </a>
            </Button>
          )}
          {project.githubUrl && (
            <Button
              asChild
              variant={project.demoUrl ? 'outline' : 'default'}
              size="sm"
              className="flex-1"
            >
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4 mr-2" />
                GitHub
              </a>
            </Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
}
