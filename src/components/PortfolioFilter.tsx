import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProjectCard } from './ProjectCard';
import { Button } from './ui/button';
import { getTranslations } from '../i18n';
import { defaultLocale } from '../i18n/utils';
import { getSkillAliases, findSkillDef } from './skills/skills-data';
import { X } from 'lucide-react';
import type { Project, SupportedLocale } from '../types';

interface PortfolioFilterProps {
  projects: Project[];
  locale?: SupportedLocale;
}

export function PortfolioFilter({ projects, locale = defaultLocale }: PortfolioFilterProps) {
  const translations = getTranslations(locale);
  const [selectedTag, setSelectedTag] = useState<string>(translations.portfolio.all);
  const [skillFilter, setSkillFilter] = useState<string | null>(null);

  // すべてのタグを取得
  const allTags = [translations.portfolio.all, ...Array.from(new Set(projects.flatMap(p => p.tags)))];

  // Read ?skill=xxx from URL on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const skill = params.get('skill');
    if (skill) {
      const aliases = getSkillAliases(skill);
      const lowerAliases = aliases.map(a => a.toLowerCase());
      const matchingTag = allTags.find(tag =>
        tag !== translations.portfolio.all && lowerAliases.includes(tag.toLowerCase())
      );
      if (matchingTag) {
        setSelectedTag(matchingTag);
      }
      setSkillFilter(findSkillDef(skill)?.name ?? skill);
    }
  }, []);

  // フィルタリングされたプロジェクト
  const filteredProjects = useMemo(() => {
    if (skillFilter) {
      const skillParam = new URLSearchParams(window.location.search).get('skill');
      if (skillParam) {
        const aliases = getSkillAliases(skillParam);
        const lowerAliases = aliases.map(a => a.toLowerCase());
        return projects.filter(p =>
          p.tags.some(tag => lowerAliases.includes(tag.toLowerCase()))
        );
      }
    }
    if (selectedTag === translations.portfolio.all) return projects;
    return projects.filter(p => p.tags.includes(selectedTag));
  }, [projects, selectedTag, skillFilter, translations.portfolio.all]);

  return (
    <div>
      {/* Skill Filter Banner */}
      {skillFilter && (
        <div className="flex items-center justify-between px-4 py-2.5 mb-6 rounded-lg border-l-4 border-amber-500 bg-amber-500/10">
          <span className="text-sm font-medium text-foreground">
            Filtered by skill: <span className="text-amber-500">{skillFilter}</span>
          </span>
          <button
            onClick={() => {
              setSkillFilter(null);
              setSelectedTag(translations.portfolio.all);
              window.history.replaceState({}, '', window.location.pathname);
            }}
            className="text-muted-foreground hover:text-foreground transition-colors p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

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
