import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import type { Skill } from '../types';

interface SkillCardProps {
  skill: Skill;
  index: number;
}

export function SkillCard({ skill, index }: SkillCardProps) {
  const categoryColors: Record<Skill['category'], string> = {
    frontend: 'from-blue-500 to-cyan-500',
    backend: 'from-green-500 to-emerald-500',
    devops: 'from-orange-500 to-red-500',
    design: 'from-purple-500 to-pink-500',
    database: 'from-indigo-500 to-blue-500',
    testing: 'from-yellow-500 to-amber-500',
    ai: 'from-violet-500 to-purple-500',
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -5 }}
    >
      <Card className="h-full overflow-hidden border-2 hover:border-primary/50 transition-colors">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">{skill.name}</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Progress bar */}
          <div className="relative h-2 bg-secondary rounded-full overflow-hidden">
            <motion.div
              className={`absolute inset-y-0 left-0 bg-gradient-to-r ${categoryColors[skill.category]} rounded-full`}
              initial={{ width: 0 }}
              whileInView={{ width: `${skill.level}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: index * 0.05 + 0.2, ease: 'easeOut' }}
            />
          </div>
          <div className="mt-2 text-sm text-muted-foreground text-right">
            {skill.level}%
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
