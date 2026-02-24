import { useState, useMemo } from 'react';
import type { CVProject } from '../data/cv-details';

interface CVFilterTranslations {
  members: string;
  tasks: string;
  contributions: string;
  decisions: string;
  outcomes: string;
  challenges: string;
  difficultyExtreme: string;
  difficultyHigh: string;
  difficultyMedium: string;
  difficultyLow: string;
  filterByTech: string;
  filterByRole: string;
  clearFilters: string;
  showingCount: string;
}

interface Props {
  projects: CVProject[];
  translations: CVFilterTranslations;
}

export function CVExperienceFilter({ projects, translations: t }: Props) {
  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);

  const allTechs = useMemo(() => {
    const techs = new Set<string>();
    projects.forEach(p => p.technologies.forEach(tech => techs.add(tech)));
    return Array.from(techs).sort();
  }, [projects]);

  const allRoles = useMemo(() => {
    const roles = new Set<string>();
    projects.forEach(p => p.roles.forEach(role => roles.add(role)));
    return Array.from(roles).sort();
  }, [projects]);

  const filteredProjects = useMemo(() => {
    return projects.filter(p => {
      if (selectedTechs.length > 0 && !selectedTechs.some(tech => p.technologies.includes(tech))) return false;
      if (selectedRoles.length > 0 && !selectedRoles.some(role => p.roles.includes(role))) return false;
      return true;
    });
  }, [projects, selectedTechs, selectedRoles]);

  const toggleTech = (tech: string) => {
    setSelectedTechs(prev => prev.includes(tech) ? prev.filter(x => x !== tech) : [...prev, tech]);
  };

  const toggleRole = (role: string) => {
    setSelectedRoles(prev => prev.includes(role) ? prev.filter(x => x !== role) : [...prev, role]);
  };

  const clearFilters = () => {
    setSelectedTechs([]);
    setSelectedRoles([]);
  };

  const hasFilters = selectedTechs.length > 0 || selectedRoles.length > 0;

  const getDifficultyClass = (d: string) => {
    switch (d) {
      case 'extreme': return 'difficulty-extreme';
      case 'high': return 'difficulty-high';
      case 'medium': return 'difficulty-medium';
      default: return 'difficulty-low';
    }
  };

  const getDifficultyLabel = (d: string) => {
    switch (d) {
      case 'extreme': return t.difficultyExtreme;
      case 'high': return t.difficultyHigh;
      case 'medium': return t.difficultyMedium;
      default: return t.difficultyLow;
    }
  };

  return (
    <>
      {/* Filter UI */}
      <div className="mb-6 space-y-3 p-4 rounded-lg bg-muted/30 border no-print">
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1.5 block">{t.filterByTech}</label>
          <div className="flex flex-wrap gap-1.5">
            {allTechs.map(tech => (
              <button
                key={tech}
                onClick={() => toggleTech(tech)}
                className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
                  selectedTechs.includes(tech)
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }`}
              >
                {tech}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1.5 block">{t.filterByRole}</label>
          <div className="flex flex-wrap gap-1.5">
            {allRoles.map(role => (
              <button
                key={role}
                onClick={() => toggleRole(role)}
                className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
                  selectedRoles.includes(role)
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }`}
              >
                {role}
              </button>
            ))}
          </div>
        </div>

        {hasFilters && (
          <div className="flex items-center justify-between pt-1">
            <span className="text-xs text-muted-foreground">
              {t.showingCount.replace('{count}', String(filteredProjects.length)).replace('{total}', String(projects.length))}
            </span>
            <button onClick={clearFilters} className="text-xs text-primary hover:underline">
              {t.clearFilters}
            </button>
          </div>
        )}
      </div>

      {/* Project List */}
      <div className="flex flex-col gap-4">
        {filteredProjects.map(project => (
          <div key={project.id} className="border rounded-lg overflow-hidden">
            <details className="group">
              <summary className="flex flex-col sm:flex-row sm:items-center gap-2 p-4 sm:p-5 hover:bg-muted/50 transition-colors">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-lg font-bold">{project.role}</h3>
                    {project.teamSize && (
                      <span className="text-xs px-2 py-0.5 bg-muted rounded-full text-muted-foreground">
                        {t.members.replace('{count}', String(project.teamSize))}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                    <span className="text-sm font-medium text-muted-foreground">{project.company}</span>
                    <span className="text-muted-foreground">&bull;</span>
                    <span className="text-sm text-muted-foreground">{project.period}</span>
                    {project.roles.map(role => (
                      <span key={role} className="text-[10px] px-1.5 py-0.5 bg-primary/10 text-primary rounded font-medium">
                        {role}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed line-clamp-2">{project.summary}</p>
                </div>
                <div className="text-xs text-muted-foreground whitespace-nowrap self-start sm:self-center">
                  {t.tasks.replace('{count}', String(project.tasks.length))}
                </div>
              </summary>

              <div className="border-t px-4 sm:px-5 py-4 bg-muted/20 space-y-3">
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.technologies.map(tech => (
                    <span key={tech} className="px-2 py-0.5 bg-secondary text-secondary-foreground rounded text-xs font-medium">{tech}</span>
                  ))}
                </div>

                {project.tasks.map((task, tIdx) => (
                  <details key={tIdx} className="task-card rounded-md border bg-background">
                    <summary className="p-3 text-sm">
                      <span className="font-semibold">{task.title}</span>
                      {task.difficulty && (
                        <span className={`ml-2 text-xs ${getDifficultyClass(task.difficulty)}`}>
                          {getDifficultyLabel(task.difficulty)}
                        </span>
                      )}
                    </summary>

                    <div className="px-3 pb-3 space-y-3 text-sm">
                      {task.summary && (
                        <p className="text-muted-foreground leading-relaxed">{task.summary}</p>
                      )}

                      {task.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {task.technologies.map(tech => (
                            <span key={tech} className="px-1.5 py-0.5 bg-primary/10 text-primary rounded text-xs">{tech}</span>
                          ))}
                        </div>
                      )}

                      {task.highlights.length > 0 && (
                        <div>
                          <h5 className="font-semibold text-xs text-muted-foreground uppercase tracking-wider mb-1.5">{t.contributions}</h5>
                          <ul className="space-y-1">
                            {task.highlights.map((h, hIdx) => (
                              <li key={hIdx} className="flex gap-2 text-sm leading-relaxed">
                                <span className="text-primary mt-1 shrink-0">&bull;</span>
                                <span>{h}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {task.decisions && task.decisions.length > 0 && (
                        <details open className="rounded border-l-2 border-blue-500 bg-blue-50 dark:bg-blue-950/20">
                          <summary className="p-2 text-xs font-semibold text-blue-700 dark:text-blue-400">
                            {t.decisions} ({task.decisions.length})
                          </summary>
                          <div className="px-2 pb-2 space-y-2">
                            {task.decisions.map((d, dIdx) => (
                              <div key={dIdx} className="text-xs">
                                <p className="font-medium">{d.title}</p>
                                <p className="text-muted-foreground mt-0.5">{d.detail}</p>
                              </div>
                            ))}
                          </div>
                        </details>
                      )}

                      {task.outcomes && task.outcomes.length > 0 && (
                        <details open className="rounded border-l-2 border-green-500 bg-green-50 dark:bg-green-950/20">
                          <summary className="p-2 text-xs font-semibold text-green-700 dark:text-green-400">
                            {t.outcomes} ({task.outcomes.length})
                          </summary>
                          <div className="px-2 pb-2 space-y-2">
                            {task.outcomes.map((o, oIdx) => (
                              <div key={oIdx} className="text-xs space-y-0.5">
                                {o.before && <p><span className="text-muted-foreground">Before:</span> {o.before}</p>}
                                {o.after && <p><span className="text-green-600 dark:text-green-400 font-medium">After:</span> {o.after}</p>}
                                {o.metric && <p className="text-muted-foreground italic">{o.metric}</p>}
                              </div>
                            ))}
                          </div>
                        </details>
                      )}

                      {task.challenges && task.challenges.length > 0 && (
                        <details open className="rounded border-l-2 border-amber-500 bg-amber-50 dark:bg-amber-950/20">
                          <summary className="p-2 text-xs font-semibold text-amber-700 dark:text-amber-400">
                            {t.challenges} ({task.challenges.length})
                          </summary>
                          <div className="px-2 pb-2 space-y-2">
                            {task.challenges.map((c, cIdx) => (
                              <div key={cIdx} className="text-xs">
                                <p className="font-medium">{c.title}</p>
                                <p className="text-muted-foreground mt-0.5">{c.resolution}</p>
                              </div>
                            ))}
                          </div>
                        </details>
                      )}
                    </div>
                  </details>
                ))}
              </div>
            </details>
          </div>
        ))}
      </div>
    </>
  );
}
