import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProjectCard } from './ProjectCard';
import { Button } from './ui/button';
import type { Project } from '../types';

interface PortfolioFilterProps {
  projects: Project[];
}

export function PortfolioFilter({ projects }: PortfolioFilterProps) {
  const [selectedTag, setSelectedTag] = useState<string>('すべて');

  // すべてのタグを取得
  const allTags = ['すべて', ...Array.from(new Set(projects.flatMap(p => p.tags)))];

  // フィルタリングされたプロジェクト
  const filteredProjects = selectedTag === 'すべて'
    ? projects
    : projects.filter(p => p.tags.includes(selectedTag));

  return (
    <div>
      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 justify-center mb-12">
        {allTags.map((tag) => (
          <Button
            key={tag}
            variant={selectedTag === tag ? 'default' : 'outline'}
            onClick={() => setSelectedTag(tag)}
            className="transition-all"
          >
            {tag}
          </Button>
        ))}
      </div>

      {/* Project Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <ProjectCard project={project} index={index} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-20"
        >
          <p className="text-2xl text-muted-foreground">
            該当するプロジェクトが見つかりませんでした
          </p>
        </motion.div>
      )}

      {/* Project Count */}
      <motion.div
        layout
        className="text-center mt-12 text-muted-foreground"
      >
        {filteredProjects.length} 件のプロジェクト
      </motion.div>
    </div>
  );
}
