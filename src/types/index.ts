export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: ProjectCategory;
  tags: string[];
  techStack: string[];
  thumbnail: string;
  liveUrl?: string;
  githubUrl?: string;
  caseStudyUrl?: string;
  featured: boolean;
  year: number;
}

export type ProjectCategory =
  | 'Web Design'
  | 'UI/UX'
  | 'Web App'
  | 'AI Agent'
  | 'E-Commerce'
  | 'Branding'
  | 'Mobile';

export interface Service {
  id: string;
  icon: string;
  title: string;
  description: string;
  features: string[];
}

export interface Skill {
  name: string;
  category: SkillCategory;
  level: number; // 0–100
}

export type SkillCategory =
  | 'Design'
  | 'Frontend'
  | 'Tools'
  | 'Backend'
  | 'AI Tools';

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  quote: string;
}


// ── Case Studies ──────────────────────────────────────────────────

export type ContentBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'bullets'; items: string[] };

export interface CaseStudySection {
  title: string;
  blocks: ContentBlock[];
}

export interface CaseStudy {
  slug: string;
  title: string;
  subtitle?: string;
  role: string;
  projectType: string;
  tech: string[];
  platform?: string;
  liveUrl?: string;
  githubUrl?: string;
  sections: CaseStudySection[];
}
