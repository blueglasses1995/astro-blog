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
