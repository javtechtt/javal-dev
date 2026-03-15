import { projects } from '@/data/projects';

// ── Core portfolio knowledge ──────────────────────────────────────

export const PORTFOLIO_CONTEXT = {
  about: `Javal Joseph is an AI Agent Developer and UI/UX Engineer with 5+ years of experience building digital products. He works at the intersection of design and engineering — delivering polished web platforms, intelligent AI agents, and end-to-end UI/UX design. Based remotely, he collaborates with startups, agencies, and established organizations worldwide.`,

  positioning: 'AI Agent Developer & UI/UX Engineer',

  contact: {
    email: 'connect@javal.dev',
    site: 'https://javal.dev',
    linkedin: 'https://www.linkedin.com/in/javaljoseph',
    location: 'Arima, Trinidad and Tobago',
  },

  stats: {
    projects: '100+',
    clients: '50+',
    experience: '5+ years',
  },

  tech: {
    design: ['Figma', 'Adobe Creative Suite (Photoshop, Illustrator, XD, InDesign)', 'UI/UX Design', 'Design Systems', 'Prototyping', 'Wireframing'],
    frontend: ['Next.js', 'React', 'TypeScript', 'JavaScript (ES6+)', 'HTML5', 'CSS', 'Tailwind CSS', 'Framer Motion'],
    backend: ['Java', 'Node.js', 'RESTful APIs'],
    cms: ['WordPress', 'WooCommerce', 'Odoo', 'Hostinger Website Builder'],
    tools: ['Git', 'Vercel', 'Google Analytics', 'Adobe Premiere Pro', 'WCAG Accessibility'],
    ai: ['AI Agent Development', 'LLM Integration', 'Claude Code', 'ChatGPT', 'Kimi'],
  },

  services: [
    { name: 'UI/UX Design', detail: 'user research, wireframing, prototyping, design systems — end-to-end in Figma' },
    { name: 'Web Development', detail: 'Next.js, React, TypeScript, Tailwind CSS — performant, production-ready web apps' },
    { name: 'AI Agent Development', detail: 'custom AI agents, LLM-powered interfaces, intelligent automation' },
    { name: 'E-Commerce', detail: 'WordPress / WooCommerce builds, product catalogs, checkout optimization' },
    { name: 'Brand Identity', detail: 'logos, visual identity systems, brand guidelines' },
  ],

  careerHighlights: [
    'Directed a cross-functional team to deliver a full e-commerce website transformation, driving a 347% surge in online sales within the first three months of launch.',
    'Redesigned, optimized and maintained the UTT Outreach website on Odoo, increasing active user engagement from 299 to 435 within a 10-month period.',
    'Delivered web design, digital content creation and strategic input that contributed to the company earning an international award for excellence in the renewable energy sector.',
    'Designed and launched a modern, responsive NGO website that significantly boosted donor engagement and increased overall contributions.',
  ],

  workHistory: [
    {
      role: 'Web Content Support Officer',
      company: 'University of Trinidad and Tobago',
      period: 'September 2024 – Present',
      highlights: 'Maintains and enhances the organization\'s main website, manages online payment gateway, coordinates creative content across web, intranet, social media and microsites.',
    },
    {
      role: 'E-Commerce Developer',
      company: 'Homeland Furnishings Ltd',
      period: 'November 2023 – August 2024',
      highlights: 'Maintained WordPress WooCommerce site, implemented design and functionality updates, managed full product lifecycle, integrated Google Analytics — achieved 347% increase in e-commerce sales within three months.',
    },
    {
      role: 'Software Quality Assurance Analyst',
      company: 'Bermudez Biscuits Company Ltd',
      period: 'June – September 2023',
      highlights: 'Executed white/black box testing, implemented critical code updates using PHP, JavaScript, and MySQL, produced professional company videos with Adobe Premiere Pro.',
    },
    {
      role: 'IT Specialist',
      company: 'ecliffelie Ltd',
      period: 'March 2021 – April 2022',
      highlights: 'Spearheaded e-commerce website launch and maintenance with 99.9%+ uptime, configured systems, delivered technical support, digitalized customer database and inventory systems.',
    },
    {
      role: 'Lead Web & Graphic Designer, Founder',
      company: 'Javtech Ltd',
      period: '2021 – Present',
      highlights: 'Founded and leads a digital agency providing web design, development, and graphic design services.',
    },
  ],

  education: [
    'PgCert, Artificial Intelligence Applied to the Enterprise — MIU City University Miami, USA (currently pursuing)',
    'MSc in Business Intelligence — MIU City University Miami, USA (currently pursuing)',
    'PgCert, Leadership and Management — MIU City University Miami, USA',
    'BASc in Computer Engineering, Specialization in Software Engineering — University of Trinidad and Tobago',
    'Certificate: Google Project Management — Coursera, USA',
    'Certificate: Fundamentals of Digital Marketing — Google Digital Garage, USA',
    'Diploma: Software Engineering — University of Trinidad and Tobago',
  ],
};

// ── Per-project knowledge ─────────────────────────────────────────

export const PROJECT_BRIEFS: Record<string, string> = {
  'baloto-visual-agent':
    'An AI-powered visual agent built with Next.js and TypeScript — demonstrates applied AI in a modern web interface with intelligent visual processing and LLM integration.',
  'lotto-voice-agent':
    'A voice-powered AI agent that interprets spoken input and delivers intelligent LLM-backed responses, built with a custom TypeScript backend.',
  'javal-dev':
    'This portfolio itself — built with Next.js, TypeScript, Tailwind CSS, and Framer Motion. Features an AI voice assistant, animated sections, and a premium dark design system.',
  'cazova':
    'Web platform for the Caribbean Zonal Volleyball Association — events, news, and regional athlete communication, built on WordPress with a clean sport-focused design.',
  'homeland-furnishings':
    'E-commerce site for a furniture retailer built on WordPress and WooCommerce — product catalog, professional branding, and a clean shopping experience.',
  'utt-outreach':
    "Institutional platform for the University of Trinidad and Tobago's outreach division — programs, updates, and community engagement built on Odoo Website Builder.",
  'javtech-ltd':
    "Javtech Ltd's own agency website built with Hostinger Website Builder — showcasing digital services, portfolio, and capabilities.",
  'amcs-limited':
    'Professional corporate website on WordPress for AMCS Limited — service presentation, credibility building, and client-facing communication.',
  'the-harambee-house':
    'Community organization website for The Harambee House — awareness building, program information, and community engagement on WordPress.',
  'ecliff-elie':
    'Personal brand and e-commerce site for Ecliff Elie — clean information hierarchy, professional presence, and shopping functionality built on Lightspeed.',
  'a-team-band-tt':
    'Entertainment website for A Team Band TT — performances, bookings, music releases, and media showcase built on WordPress.',
  'javal-protoverse':
    'An interactive Figma prototype exploring futuristic design patterns, immersive user flows, and advanced interface layouts — built entirely in Figma and Figma Make.',
};

// ── Slug resolution ───────────────────────────────────────────────

const SLUG_ALIASES: Record<string, string> = {
  baloto: 'baloto-visual-agent',
  'visual agent': 'baloto-visual-agent',
  lotto: 'lotto-voice-agent',
  'voice agent': 'lotto-voice-agent',
  'javal.dev': 'javal-dev',
  'this portfolio': 'javal-dev',
  cazova: 'cazova',
  volleyball: 'cazova',
  'caribbean zonal': 'cazova',
  homeland: 'homeland-furnishings',
  furnishings: 'homeland-furnishings',
  furniture: 'homeland-furnishings',
  utt: 'utt-outreach',
  'university of trinidad': 'utt-outreach',
  outreach: 'utt-outreach',
  javtech: 'javtech-ltd',
  amcs: 'amcs-limited',
  harambee: 'the-harambee-house',
  ecliff: 'ecliff-elie',
  'a team': 'a-team-band-tt',
  'band tt': 'a-team-band-tt',
  protoverse: 'javal-protoverse',
  'figma prototype': 'javal-protoverse',
};

export function findProjectSlug(query: string): string | null {
  const lower = query.toLowerCase();
  const byTitle = projects.find((p) => lower.includes(p.title.toLowerCase()));
  if (byTitle) return byTitle.slug;
  for (const [alias, slug] of Object.entries(SLUG_ALIASES)) {
    if (lower.includes(alias)) return slug;
  }
  return null;
}

export function getProjectBrief(slug: string): string | null {
  return PROJECT_BRIEFS[slug] ?? null;
}

// ── Tool: getPageState ────────────────────────────────────────────

export interface PageState {
  page: 'home' | 'case-study' | 'other';
  visibleSections: string[];
  currentSection: string | null;
  activeProject: string | null;
}

export function getPageState(): PageState {
  if (typeof window === 'undefined') {
    return { page: 'home', visibleSections: [], currentSection: null, activeProject: null };
  }
  const pathname = window.location.pathname;
  const projectMatch = pathname.match(/^\/projects\/(.+)$/);

  const knownSections = ['hero', 'projects', 'about', 'services', 'contact'];
  const visibleSections = knownSections.filter((id) => {
    const el = document.getElementById(id);
    if (!el) return false;
    const rect = el.getBoundingClientRect();
    return rect.top < window.innerHeight * 0.75 && rect.bottom > 0;
  });

  return {
    page: pathname === '/' ? 'home' : projectMatch ? 'case-study' : 'other',
    visibleSections,
    currentSection: visibleSections[0] ?? null,
    activeProject: projectMatch ? projectMatch[1] : null,
  };
}
