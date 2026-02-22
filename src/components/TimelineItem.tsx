import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import type { Experience } from '../types';

interface TimelineItemProps {
  experience: Experience;
  index: number;
  isLast?: boolean;
}

export function TimelineItem({ experience, index, isLast }: TimelineItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '0px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative"
    >
      <div className="flex items-start gap-6">
        {/* Timeline dot and line */}
        <div className="relative flex flex-col items-center">
          <motion.div
            className="w-4 h-4 rounded-full bg-gradient-to-r from-crimson-700 to-crimson-400 z-10"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
          />
          {!isLast && (
            <motion.div
              className="w-0.5 flex-1 bg-gradient-to-b from-primary/50 to-transparent mt-2"
              initial={{ height: 0 }}
              whileInView={{ height: '100%' }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 + 0.4 }}
              style={{ minHeight: '100px' }}
            />
          )}
        </div>

        {/* Content */}
        <Card className="flex-1 mb-8 hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
              <div>
                <CardTitle className="text-xl">{experience.title}</CardTitle>
                <CardDescription className="text-base font-medium mt-1">
                  {experience.company}
                </CardDescription>
              </div>
              <Badge variant="secondary" className="whitespace-nowrap">
                {experience.period}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">{experience.description}</p>
            <div className="flex flex-wrap gap-2">
              {experience.technologies.map((tech) => (
                <Badge key={tech} variant="outline">
                  {tech}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}
