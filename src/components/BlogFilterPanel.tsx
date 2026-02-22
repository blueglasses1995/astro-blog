import { useEffect, useMemo, useState } from 'react';
import { format } from 'date-fns';
import { ja, enUS, zhCN, th, de, fr, es } from 'date-fns/locale';
import type { Locale } from 'date-fns';
import * as dayPickerLocales from 'react-day-picker/locale';
import type { Locale as DayPickerLocale } from 'react-day-picker';
import { Calendar as CalendarIcon, ChevronRight, ChevronDown } from 'lucide-react';
import { BlogCard } from './BlogCard';
import { Button } from './ui/button';
import { Calendar } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { cn } from '@/lib/utils';
import type { SupportedLocale } from '../types';
import { getSkillAliases, findSkillDef } from './skills/skills-data';

type SortKey = 'updated-desc' | 'updated-asc' | 'created-desc' | 'created-asc';
type DateFilterMode = 'updated' | 'created';

export type BlogListItem = {
  title: string;
  description: string;
  date: string;
  updatedDate?: string;
  readTime?: string;
  tags?: string[];
  slug: string;
  category?: string;
  subcategory?: string;
};

export type BlogFilterPanelLabels = {
  helperText?: string;
  resultCountText?: string;
  resetButton?: string;
  sortLabel?: string;
  dateTargetLabel?: string;
  startDateLabel?: string;
  endDateLabel?: string;
  categoriesLabel?: string;
  tagsLabel?: string;
  emptyState?: string;
  categoryFallback?: string;
  tagPrefix?: string;
  sortOptionLabels?: Partial<Record<SortKey, string>>;
  dateFilterOptionLabels?: Partial<Record<DateFilterMode, string>>;
};

const defaultLabels: Required<Omit<BlogFilterPanelLabels, 'sortOptionLabels' | 'dateFilterOptionLabels'>> & {
  sortOptionLabels: Record<SortKey, string>;
  dateFilterOptionLabels: Record<DateFilterMode, string>;
} = {
  helperText: 'フィルターを使って記事を探せます',
  resultCountText: '{{visible}} / {{total}} 件表示中',
  resetButton: '条件をリセット',
  sortLabel: 'ソート順',
  dateTargetLabel: '日時の対象',
  startDateLabel: '開始日',
  endDateLabel: '終了日',
  categoriesLabel: 'カテゴリー',
  tagsLabel: 'タグ',
  emptyState: '条件に一致する記事が見つかりませんでした。',
  categoryFallback: '未分類',
  tagPrefix: '#',
  sortOptionLabels: {
    'updated-desc': '更新が新しい順',
    'updated-asc': '更新が古い順',
    'created-desc': '作成が新しい順',
    'created-asc': '作成が古い順',
  },
  dateFilterOptionLabels: {
    updated: '更新日',
    created: '作成日',
  },
};

const getTimeValue = (value?: string | Date) => {
  if (!value) return 0;
  return value instanceof Date ? value.getTime() : new Date(value).getTime();
};

const getDateFnsLocale = (locale?: SupportedLocale): Locale => {
  const localeMap: Record<SupportedLocale, Locale> = {
    ja: ja,
    en: enUS,
    zh: zhCN,
    th: th,
    de: de,
    fr: fr,
    es: es,
  };
  return localeMap[locale ?? 'ja'] ?? enUS;
};

const getDayPickerLocale = (locale?: SupportedLocale): DayPickerLocale => {
  const localeMap: Record<SupportedLocale, DayPickerLocale> = {
    ja: dayPickerLocales.ja,
    en: dayPickerLocales.enUS,
    zh: dayPickerLocales.zhCN,
    th: dayPickerLocales.th,
    de: dayPickerLocales.de,
    fr: dayPickerLocales.fr,
    es: dayPickerLocales.es,
  };
  return localeMap[locale ?? 'ja'] ?? dayPickerLocales.enUS;
};

const formatDate = (date: Date, locale?: SupportedLocale) => {
  const dateFnsLocale = getDateFnsLocale(locale);
  return format(date, 'PPP', { locale: dateFnsLocale });
};

export function BlogFilterPanel({
  posts,
  labels,
  locale,
}: {
  posts: BlogListItem[];
  labels?: BlogFilterPanelLabels;
  locale?: SupportedLocale;
}) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([]);
  const [expandedCategoryFilters, setExpandedCategoryFilters] = useState<Set<string>>(new Set());
  const [sortOrder, setSortOrder] = useState<SortKey>('updated-desc');
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [dateFilterMode, setDateFilterMode] = useState<DateFilterMode>('updated');
  const [skillFilter, setSkillFilter] = useState<string | null>(null);

  const mergedLabels = {
    ...defaultLabels,
    ...labels,
    sortOptionLabels: {
      ...defaultLabels.sortOptionLabels,
      ...(labels?.sortOptionLabels ?? {}),
    },
    dateFilterOptionLabels: {
      ...defaultLabels.dateFilterOptionLabels,
      ...(labels?.dateFilterOptionLabels ?? {}),
    },
  };

  const availableTags = useMemo(() => {
    const tags = new Set<string>();
    posts.forEach((post) => {
      (post.tags ?? []).forEach((tag) => tags.add(tag));
    });
    return Array.from(tags).sort((a, b) => a.localeCompare(b));
  }, [posts]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const skillParam = params.get('skill');
    if (!skillParam) return;

    const aliases = getSkillAliases(skillParam);
    const matchingTags = availableTags.filter((tag) =>
      aliases.some((alias) => alias.toLowerCase() === tag.toLowerCase())
    );
    if (matchingTags.length > 0) {
      setSelectedTags(matchingTags);
    }
    const def = findSkillDef(skillParam);
    setSkillFilter(def?.name ?? skillParam);
  }, [availableTags]);

  const availableCategories = useMemo(() => {
    const categories = new Set<string>();
    posts.forEach((post) => {
      categories.add(post.category ?? mergedLabels.categoryFallback);
    });
    return Array.from(categories).sort((a, b) => a.localeCompare(b));
  }, [posts, mergedLabels.categoryFallback]);

  const categorySubcategoryMap = useMemo(() => {
    const map = new Map<string, Set<string>>();
    posts.forEach((post) => {
      const category = post.category ?? mergedLabels.categoryFallback;
      if (post.subcategory) {
        if (!map.has(category)) {
          map.set(category, new Set());
        }
        map.get(category)!.add(post.subcategory);
      }
    });
    return map;
  }, [posts, mergedLabels.categoryFallback]);

  const toggleValue = (value: string, current: string[], setter: (next: string[]) => void) => {
    setter(
      current.includes(value) ? current.filter((item) => item !== value) : [...current, value]
    );
  };

  const resetFilters = () => {
    setSelectedTags([]);
    setSelectedCategories([]);
    setSelectedSubcategories([]);
    setExpandedCategoryFilters(new Set());
    setSortOrder('updated-desc');
    setStartDate(undefined);
    setEndDate(undefined);
    setDateFilterMode('updated');
    if (skillFilter) {
      setSkillFilter(null);
      const url = new URL(window.location.href);
      url.searchParams.delete('skill');
      window.history.replaceState({}, '', url.toString());
    }
  };

  const toggleCategoryFilter = (category: string) => {
    const newExpanded = new Set(expandedCategoryFilters);
    if (newExpanded.has(category)) {
      newExpanded.delete(category);
    } else {
      newExpanded.add(category);
    }
    setExpandedCategoryFilters(newExpanded);
  };

  const filteredPosts = useMemo(() => {
    const startTime = startDate ? startDate.setHours(0, 0, 0, 0) : null;
    const endTime = endDate ? endDate.setHours(23, 59, 59, 999) : null;

    const matchesFilters = (post: BlogListItem) => {
      if (selectedCategories.length) {
        const category = post.category ?? mergedLabels.categoryFallback;
        if (!selectedCategories.includes(category)) return false;
      }

      if (selectedSubcategories.length) {
        if (!post.subcategory || !selectedSubcategories.includes(post.subcategory)) return false;
      }

      if (selectedTags.length) {
        const postTags = post.tags ?? [];
        const hasEveryTag = selectedTags.every((tag) => postTags.includes(tag));
        if (!hasEveryTag) return false;
      }

      if (startTime || endTime) {
        const targetDate = dateFilterMode === 'updated' ? post.updatedDate ?? post.date : post.date;
        const value = getTimeValue(targetDate);
        if (startTime && value < startTime) return false;
        if (endTime && value > endTime) return false;
      }

      return true;
    };

    const sorters: Record<SortKey, (a: BlogListItem, b: BlogListItem) => number> = {
      'updated-desc': (a, b) =>
        getTimeValue(b.updatedDate ?? b.date) - getTimeValue(a.updatedDate ?? a.date),
      'updated-asc': (a, b) =>
        getTimeValue(a.updatedDate ?? a.date) - getTimeValue(b.updatedDate ?? b.date),
      'created-desc': (a, b) => getTimeValue(b.date) - getTimeValue(a.date),
      'created-asc': (a, b) => getTimeValue(a.date) - getTimeValue(b.date),
    };

    return posts.filter(matchesFilters).sort(sorters[sortOrder]);
  }, [posts, selectedCategories, selectedSubcategories, selectedTags, startDate, endDate, dateFilterMode, sortOrder, mergedLabels.categoryFallback]);

  const pillClasses = (active: boolean) =>
    cn(
      'px-3 py-1 rounded-full border text-sm transition-colors',
      active
        ? 'bg-primary text-primary-foreground border-primary'
        : 'bg-background text-muted-foreground border-border hover:border-primary/60'
    );

  return (
    <div className="space-y-8">
      {skillFilter && (
        <div className="flex items-center justify-between rounded-lg border-l-4 border-l-crimson-500 bg-crimson-500/10 px-4 py-3">
          <span className="text-sm font-medium">
            Filtered by skill: <strong>{skillFilter}</strong>
          </span>
          <button
            type="button"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            onClick={resetFilters}
          >
            Clear
          </button>
        </div>
      )}
      <div className="rounded-lg border bg-card/40 p-4 sm:p-6 space-y-4 sm:space-y-6">
        <div className="flex flex-wrap items-center gap-4 justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{mergedLabels.helperText}</p>
            <p className="text-xs text-muted-foreground/80">
              {mergedLabels.resultCountText
                .replace('{{visible}}', String(filteredPosts.length))
                .replace('{{total}}', String(posts.length))}
            </p>
          </div>
          <Button variant="ghost" size="sm" onClick={resetFilters}>
            {mergedLabels.resetButton}
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="grid gap-2">
            <label className="text-sm font-medium text-muted-foreground">
              {mergedLabels.sortLabel}
            </label>
            <Select value={sortOrder} onValueChange={(value) => setSortOrder(value as SortKey)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(mergedLabels.sortOptionLabels).map(([key, label]) => (
                  <SelectItem key={key} value={key}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-medium text-muted-foreground">
              {mergedLabels.dateTargetLabel}
            </label>
            <Select
              value={dateFilterMode}
              onValueChange={(value) => setDateFilterMode(value as DateFilterMode)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(mergedLabels.dateFilterOptionLabels).map(([key, label]) => (
                  <SelectItem key={key} value={key}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="grid gap-2">
            <label className="text-sm font-medium text-muted-foreground">
              {mergedLabels.startDateLabel}
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    'w-full justify-start text-left font-normal relative',
                    !startDate && 'text-muted-foreground'
                  )}
                >
                  <span className="flex-1 truncate">
                    {startDate ? formatDate(startDate, locale) : mergedLabels.startDateLabel}
                  </span>
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 max-w-[calc(100vw-2rem)]" align="start">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={setStartDate}
                  locale={getDayPickerLocale(locale)}
                  weekStartsOn={getDayPickerLocale(locale)?.options?.weekStartsOn}
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-medium text-muted-foreground">
              {mergedLabels.endDateLabel}
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    'w-full justify-start text-left font-normal relative',
                    !endDate && 'text-muted-foreground'
                  )}
                >
                  <span className="flex-1 truncate">
                    {endDate ? formatDate(endDate, locale) : mergedLabels.endDateLabel}
                  </span>
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 max-w-[calc(100vw-2rem)]" align="start">
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={setEndDate}
                  locale={getDayPickerLocale(locale)}
                  weekStartsOn={getDayPickerLocale(locale)?.options?.weekStartsOn}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {availableCategories.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              {mergedLabels.categoriesLabel}
            </p>
            <div className="flex flex-wrap gap-2">
              {availableCategories.map((category) => {
                const active = selectedCategories.includes(category);
                const subcategories = categorySubcategoryMap.get(category);
                const hasSubcategories = subcategories && subcategories.size > 0;
                const isExpanded = expandedCategoryFilters.has(category);

                return (
                  <div key={category} className="flex flex-col gap-1.5 max-w-full">
                    <div className="inline-flex items-center gap-1 max-w-full">
                      {hasSubcategories && (
                        <button
                          type="button"
                          onClick={() => toggleCategoryFilter(category)}
                          className="p-0.5 hover:bg-muted rounded transition-colors"
                          aria-label={isExpanded ? '折りたたむ' : '展開する'}
                        >
                          {isExpanded ? (
                            <ChevronDown className="h-3 w-3 text-muted-foreground" />
                          ) : (
                            <ChevronRight className="h-3 w-3 text-muted-foreground" />
                          )}
                        </button>
                      )}
                      <button
                        type="button"
                        className={cn(
                          'inline-flex w-fit max-w-full px-3 py-1 rounded-full border text-sm font-semibold transition-colors leading-relaxed whitespace-nowrap',
                          active
                            ? 'bg-primary text-primary-foreground border-primary'
                            : 'bg-background text-muted-foreground border-border hover:border-primary/60'
                        )}
                        onClick={() =>
                          toggleValue(category, selectedCategories, setSelectedCategories)
                        }
                      >
                        <span className="truncate">{category}</span>
                      </button>
                    </div>
                    {isExpanded && hasSubcategories && (
                      <div className="pl-5 flex flex-wrap gap-2">
                        {Array.from(subcategories)
                          .sort((a, b) => a.localeCompare(b))
                          .map((subcategory) => {
                            const subActive = selectedSubcategories.includes(subcategory);
                            return (
                              <button
                                key={subcategory}
                                type="button"
                                className={cn(
                                  'inline-flex w-fit max-w-full px-3 py-1 rounded-full border text-[0.6875rem] font-normal transition-colors leading-tight whitespace-nowrap',
                                  subActive
                                    ? 'bg-primary text-primary-foreground border-primary'
                                    : 'bg-background text-muted-foreground border-border hover:border-primary/60'
                                )}
                                onClick={() =>
                                  toggleValue(
                                    subcategory,
                                    selectedSubcategories,
                                    setSelectedSubcategories
                                  )
                                }
                              >
                                <span className="truncate">{subcategory}</span>
                              </button>
                            );
                          })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {availableTags.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              {mergedLabels.tagsLabel}
            </p>
            <div className="flex flex-wrap gap-2">
              {availableTags.map((tag) => {
                const active = selectedTags.includes(tag);
                return (
                  <button
                    key={tag}
                    type="button"
                    className={pillClasses(active)}
                    onClick={() => toggleValue(tag, selectedTags, setSelectedTags)}
                  >
                    {mergedLabels.tagPrefix}
                    {tag}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {filteredPosts.length === 0 ? (
        <div className="rounded-lg border border-dashed p-10 text-center text-muted-foreground">
          {mergedLabels.emptyState}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => (
            <BlogCard
              key={post.slug}
              title={post.title}
              description={post.description}
              date={dateFilterMode === 'updated' ? post.updatedDate ?? post.date : post.date}
              readTime={post.readTime ?? ''}
              tags={post.tags ?? []}
              slug={post.slug}
              locale={locale}
              updatedDate={post.updatedDate}
            />
          ))}
        </div>
      )}
    </div>
  );
}
