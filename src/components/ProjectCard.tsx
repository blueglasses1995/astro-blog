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
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="h-full"
    >
      <Card className="h-full flex flex-col overflow-hidden group border-2 hover:border-primary/50 transition-colors">
        {/* Project Image */}
        <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary/10 to-purple-500/10">
          {project.featured && (
            <div className="absolute top-4 right-4 z-10">
              <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 border-0">
                <Star className="w-3 h-3 mr-1 fill-white" />
                注目
              </Badge>
            </div>
          )}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-primary/20 to-purple-500/20"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          />
          <div className="absolute inset-0 flex items-center justify-center text-6xl font-bold text-primary/10">
            {project.title.charAt(0)}
          </div>
        </div>

        <CardHeader>
          <CardTitle className="line-clamp-1 group-hover:text-primary transition-colors">
            {project.title}
          </CardTitle>
          <CardDescription className="line-clamp-2">{project.description}</CardDescription>
        </CardHeader>

        <CardContent className="flex-grow">
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>

        <CardFooter className="flex gap-2">
          {project.demoUrl && (
            <Button asChild variant="default" size="sm" className="flex-1">
              <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-2" />
                デモ
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
