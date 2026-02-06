import { useState, useCallback, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { SkillTreeViewMode } from '../../types/knowledge-graph';
import { SkillTreeRPG } from './SkillTreeRPG';
import { SkillTreeMindMap } from './SkillTreeMindMap';
import { SkillTreeRadar } from './SkillTreeRadar';
import { getSkillAliases, findSkillDef, domainColors, getDomain } from './skills-data';
import { X, ExternalLink, BookOpen, Briefcase, FolderOpen } from 'lucide-react';

export interface BlogPostMeta {
  slug: string;
  title: string;
  tags: string[];
}

export interface ProjectMeta {
  id: string;
  title: string;
  tags: string[];
  description: string;
}

export interface ExperienceMeta {
  id: string;
  title: string;
  company: string;
  period: string;
  technologies: string[];
}

interface SkillTreeViewProps {
  blogPosts?: BlogPostMeta[];
  projects?: ProjectMeta[];
  experiences?: ExperienceMeta[];
}

const tabs: { mode: SkillTreeViewMode; label: string; description: string }[] = [
  { mode: 'rpg', label: 'RPG Tree', description: 'Game-style skill tree' },
  { mode: 'mindmap', label: 'Mind Map', description: 'Radial mind map' },
  { mode: 'radar', label: 'Tech Radar', description: 'Concentric tech radar' },
];

const levelLabels: Record<number, string> = {
  1: 'Beginner',
  2: 'Learning',
  3: 'Familiar',
  4: 'Proficient',
  5: 'Expert',
};

export function SkillTreeView({ blogPosts = [], projects = [], experiences = [] }: SkillTreeViewProps) {
  const [activeTab, setActiveTab] = useState<SkillTreeViewMode>('rpg');
  const [selectedNode, setSelectedNode] = useState<{
    id: string;
    name: string;
    level: number;
  } | null>(null);

  const handleNodeSelect = useCallback((id: string, name: string, level: number) => {
    setSelectedNode({ id, name, level });
  }, []);

  // Cross-link matching
  const relatedContent = useMemo(() => {
    if (!selectedNode) return null;

    const aliases = getSkillAliases(selectedNode.id);
    const lowerAliases = aliases.map((a) => a.toLowerCase());

    const matchedArticles = blogPosts.filter((post) =>
      (post.tags ?? []).some((tag) => lowerAliases.includes(tag.toLowerCase()))
    );

    const matchedProjects = projects.filter((project) =>
      (project.tags ?? []).some((tag) => lowerAliases.includes(tag.toLowerCase()))
    );

    const matchedExperiences = experiences.filter((exp) =>
      (exp.technologies ?? []).some((tech) => lowerAliases.includes(tech.toLowerCase()))
    );

    const skillDef = findSkillDef(selectedNode.id);
    const linkedArticleSlugs = skillDef?.articles ?? [];
    const linkedArticles = blogPosts.filter((post) => linkedArticleSlugs.includes(post.slug));

    // Merge: direct article links + tag-matched articles (deduplicated)
    const allArticleSlugs = new Set<string>();
    const allArticles: BlogPostMeta[] = [];
    [...linkedArticles, ...matchedArticles].forEach((a) => {
      if (!allArticleSlugs.has(a.slug)) {
        allArticleSlugs.add(a.slug);
        allArticles.push(a);
      }
    });

    return {
      articles: allArticles,
      projects: matchedProjects,
      experiences: matchedExperiences,
      hasContent: allArticles.length > 0 || matchedProjects.length > 0 || matchedExperiences.length > 0,
    };
  }, [selectedNode, blogPosts, projects, experiences]);

  const domain = selectedNode ? getDomain(selectedNode.id) : 'frontend';
  const domainColor = domainColors[domain] || '#6366f1';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-3">
          Skill Tree
        </h1>
        <div className="w-12 h-[3px] bg-amber-500 mx-auto mb-4" />
        <p className="text-muted-foreground text-base sm:text-lg max-w-xl mx-auto">
          Interactive visualization of technical skills and expertise
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex justify-center">
        <div className="inline-flex rounded-lg border border-border bg-card/50 backdrop-blur-sm p-1 gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.mode}
              onClick={() => {
                setActiveTab(tab.mode);
                setSelectedNode(null);
              }}
              className={`
                px-4 py-2 rounded-md text-sm font-medium transition-all duration-200
                ${activeTab === tab.mode
                  ? 'bg-foreground text-background shadow-sm'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }
              `}
              title={tab.description}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Graph + Detail Panel Layout */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Graph View */}
        <div className="flex-1 min-w-0 relative">
          {activeTab === 'rpg' && <SkillTreeRPG onNodeSelect={handleNodeSelect} />}
          {activeTab === 'mindmap' && <SkillTreeMindMap onNodeSelect={handleNodeSelect} />}
          {activeTab === 'radar' && <SkillTreeRadar onNodeSelect={handleNodeSelect} />}
        </div>

        {/* Detail Panel */}
        <AnimatePresence>
          {selectedNode && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="lg:w-80 shrink-0"
            >
              <div className="rounded-xl border border-border bg-card p-5 space-y-5 sticky top-24">
                {/* Skill Header */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-foreground leading-tight">
                      {selectedNode.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span
                        className="text-xs font-medium px-2 py-0.5 rounded-full"
                        style={{
                          backgroundColor: `${domainColor}20`,
                          color: domainColor,
                        }}
                      >
                        Lv.{selectedNode.level}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {levelLabels[selectedNode.level]}
                      </span>
                      <div className="flex gap-0.5 ml-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span
                            key={i}
                            className={`w-1.5 h-1.5 rounded-full ${
                              i < selectedNode.level ? 'bg-amber-500' : 'bg-muted'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedNode(null)}
                    className="text-muted-foreground hover:text-foreground transition-colors p-1 -m-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Related Content */}
                {relatedContent?.hasContent ? (
                  <div className="space-y-4">
                    {/* Articles */}
                    {relatedContent.articles.length > 0 && (
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <BookOpen className="w-3.5 h-3.5 text-amber-500" />
                          <h4 className="text-xs font-semibold text-amber-500 uppercase tracking-wider">
                            Articles
                          </h4>
                          <span className="text-xs text-muted-foreground">
                            ({relatedContent.articles.length})
                          </span>
                        </div>
                        <ul className="space-y-1.5">
                          {relatedContent.articles.slice(0, 5).map((article) => (
                            <li key={article.slug}>
                              <a
                                href={`/blog/${article.slug}`}
                                className="group flex items-start gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                              >
                                <ExternalLink className="w-3 h-3 mt-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                                <span className="line-clamp-2 leading-snug">{article.title}</span>
                              </a>
                            </li>
                          ))}
                        </ul>
                        {relatedContent.articles.length > 5 && (
                          <a
                            href={`/blog?skill=${selectedNode.id}`}
                            className="block text-xs text-amber-500 hover:text-amber-400 mt-2 transition-colors"
                          >
                            See all {relatedContent.articles.length} articles
                          </a>
                        )}
                        {relatedContent.articles.length <= 5 && (
                          <a
                            href={`/blog?skill=${selectedNode.id}`}
                            className="block text-xs text-amber-500 hover:text-amber-400 mt-2 transition-colors"
                          >
                            Filter blog by this skill
                          </a>
                        )}
                      </div>
                    )}

                    {/* Projects */}
                    {relatedContent.projects.length > 0 && (
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <FolderOpen className="w-3.5 h-3.5 text-amber-500" />
                          <h4 className="text-xs font-semibold text-amber-500 uppercase tracking-wider">
                            Projects
                          </h4>
                          <span className="text-xs text-muted-foreground">
                            ({relatedContent.projects.length})
                          </span>
                        </div>
                        <ul className="space-y-1.5">
                          {relatedContent.projects.slice(0, 5).map((project) => (
                            <li key={project.id}>
                              <a
                                href={`/portfolio?skill=${selectedNode.id}`}
                                className="group flex items-start gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                              >
                                <ExternalLink className="w-3 h-3 mt-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                                <span className="line-clamp-2 leading-snug">{project.title}</span>
                              </a>
                            </li>
                          ))}
                        </ul>
                        <a
                          href={`/portfolio?skill=${selectedNode.id}`}
                          className="block text-xs text-amber-500 hover:text-amber-400 mt-2 transition-colors"
                        >
                          Filter portfolio by this skill
                        </a>
                      </div>
                    )}

                    {/* Experiences */}
                    {relatedContent.experiences.length > 0 && (
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Briefcase className="w-3.5 h-3.5 text-amber-500" />
                          <h4 className="text-xs font-semibold text-amber-500 uppercase tracking-wider">
                            Experience
                          </h4>
                          <span className="text-xs text-muted-foreground">
                            ({relatedContent.experiences.length})
                          </span>
                        </div>
                        <ul className="space-y-2">
                          {relatedContent.experiences.map((exp) => (
                            <li key={exp.id}>
                              <a
                                href={`/cv?skill=${selectedNode.id}`}
                                className="group block text-sm text-muted-foreground hover:text-foreground transition-colors"
                              >
                                <div className="font-medium leading-snug">{exp.title}</div>
                                <div className="text-xs text-muted-foreground/70">
                                  {exp.company} - {exp.period}
                                </div>
                              </a>
                            </li>
                          ))}
                        </ul>
                        <a
                          href={`/cv?skill=${selectedNode.id}`}
                          className="block text-xs text-amber-500 hover:text-amber-400 mt-2 transition-colors"
                        >
                          View on CV
                        </a>
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground/60 italic">
                    No linked content yet for this skill.
                  </p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Legend for RPG view */}
      {activeTab === 'rpg' && (
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground">
          <span>Node size = skill level</span>
          <span className="text-amber-500">Gold border = linked articles</span>
          <span>Top-to-bottom hierarchy</span>
        </div>
      )}
    </div>
  );
}
