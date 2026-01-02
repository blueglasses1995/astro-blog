import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProjectCard } from './ProjectCard';
import { Button } from './ui/button';
import { getTranslations } from '../i18n';
import { defaultLocale } from '../i18n/utils';
import type { Project, SupportedLocale } from '../types';

interface PortfolioFilterProps {
  projects: Project[];
  locale?: SupportedLocale;
}

export function PortfolioFilter({ projects, locale = defaultLocale }: PortfolioFilterProps) {
  const translations = getTranslations(locale);
  const [selectedTag, setSelectedTag] = useState<string>(translations.portfolio.all);

  // すべてのタグを取得
  const allTags = [translations.portfolio.all, ...Array.from(new Set(projects.flatMap(p => p.tags)))];

  // フィルタリングされたプロジェクト
  const filteredProjects = selectedTag === translations.portfolio.all
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
            {locale === 'ja' ? '該当するプロジェクトが見つかりませんでした' : 
             locale === 'zh' ? '未找到匹配的项目' :
             locale === 'th' ? 'ไม่พบโปรเจกต์ที่ตรงกัน' :
             'No matching projects found'}
          </p>
        </motion.div>
      )}

      {/* Project Count */}
      <motion.div
        layout
        className="text-center mt-12 text-muted-foreground"
      >
        {filteredProjects.length} {locale === 'ja' ? '件のプロジェクト' : 
                                   locale === 'zh' ? '个项目' :
                                   locale === 'th' ? 'โปรเจกต์' :
                                   'projects'}
      </motion.div>
    </div>
  );
}
