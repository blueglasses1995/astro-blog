export interface Skill {
  name: string;
  level: number; // 0-100
  category: 'frontend' | 'backend' | 'devops' | 'design';
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  period: string;
  description: string;
  technologies: string[];
}

export interface Education {
  id: string;
  degree: string;
  school: string;
  period: string;
  description?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  demoUrl?: string;
  githubUrl?: string;
  featured?: boolean;
}

export interface ProfileData {
  name: string;
  title: string;
  bio: string;
  email: string;
  github?: string;
  twitter?: string;
  linkedin?: string;
  location: string;
  avatar: string;
}

export type SupportedLocale = 'ja' | 'en' | 'zh' | 'th' | 'de' | 'fr' | 'es';

export interface Translations {
  nav: {
    home: string;
    about: string;
    portfolio: string;
    cv: string;
    blog: string;
  };
  common: {
    readMore: string;
    viewAll: string;
    download: string;
    contact: string;
    links: string;
    techStack: string;
    allRightsReserved: string;
  };
  home: {
    title: string;
    featuredProjects: string;
    featuredProjectsDesc: string;
    viewAllProjects: string;
    techStack: string;
    techStackDesc: string;
    latestPosts: string;
    latestPostsDesc: string;
    viewAllPosts: string;
  };
  hero: {
    name: string;
    title: string;
    bio: string;
    viewPortfolio: string;
    cvResume: string;
    aboutMe: string;
    scroll: string;
  };
  about: {
    title: string;
    skills: string;
    skillsDesc: string;
    experience: string;
    experienceDesc: string;
    education: string;
    educationDesc: string;
    frontend: string;
    backend: string;
    devops: string;
    design: string;
  };
  portfolio: {
    title: string;
    description: string;
    all: string;
    frontend: string;
    backend: string;
    fullstack: string;
  };
  cv: {
    title: string;
    downloadPDF: string;
    profile: string;
    skills: string;
    workExperience: string;
    education: string;
    contactMe: string;
    contactDesc: string;
    sendEmail: string;
    asOf: string;
  };
  blog: {
    title: string;
    description: string;
    readTime: string;
    author: string;
    tags: string;
    filters: {
      helperText: string;
      resultCountText: string;
      resetButton: string;
      sortLabel: string;
      dateTargetLabel: string;
      startDateLabel: string;
      endDateLabel: string;
      categoriesLabel: string;
      tagsLabel: string;
      emptyState: string;
      categoryFallback: string;
      tagPrefix: string;
      sort: {
        updatedDesc: string;
        updatedAsc: string;
        createdDesc: string;
        createdAsc: string;
      };
      dateModes: {
        updated: string;
        created: string;
      };
    };
  };
  footer: {
    description: string;
  };
}
