export type Lang = 'pt' | 'en';

export interface Experience {
  company: string;
  role: string;
  period: string;
  technologies: string[];
  responsibilities: string[];
  logo?: string;
}

export interface Project {
  name: string;
  description: string;
  technologies: string[];
  projectUrl?: string;
  githubUrl?: string;
  image?: string;
}

export interface TranslationSet {
  pt: Record<string, string | string[] | Experience[] | Project[]>;
  en: Record<string, string | string[] | Experience[] | Project[]>;
}
