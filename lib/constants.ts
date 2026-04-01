import { SocialLink } from './types';

// Personal information
export const PERSONAL_INFO = {
  name: 'Akshad Jaiswal',
  tagline: 'Building things that work, and work well',
  currentRole: 'Software Developer',
  roles: ['Software Developer', 'Full-Stack Engineer', 'Founding SDE', 'Product-Minded Builder'],
  location: 'India',
  email: 'your.email@example.com', // Update with your email
  githubUsername: 'akshadjaiswal',
  calComLink: 'https://cal.com/akshad-jaiswal/15min',
  coverQuote: 'Building the future, one line of code at a time.', // Update with your quote
  bio: 'Full-stack engineer who thrives on end-to-end ownership from product discovery and rapid prototyping to scalable backends and polished UX. As a Founding SDE at a startup while freelancing, I balance delivery speed, reliability, and cost daily. My approach is simple: ship small, learn fast, and iterate with real user feedback.',
};

// Social links
export const SOCIAL_LINKS: SocialLink[] = [
  {
    platform: 'GitHub',
    url: 'https://github.com/akshadjaiswal',
    username: 'akshadjaiswal',
    icon: 'Github'
  },
  {
    platform: 'LinkedIn',
    url: 'https://linkedin.com/in/akshadsantoshjaiswal',
    username: 'akshadsantoshjaiswal',
    icon: 'Linkedin'
  },
  {
    platform: 'X',
    url: 'https://x.com/akshad_999',
    username: '@akshad_999',
    icon: 'Twitter'
  }
];

// Animation configuration
export const ANIMATION_CONFIG = {
  fadeInDuration: 0.3,
  fadeInDelay: 0.2,
  staggerDelay: 0.1,
  slideDistance: 20,
  easing: [0.4, 0, 0.2, 1] as [number, number, number, number],

  // Extended animation presets
  pageTransitionDuration: 0.4,
  themeTransitionDuration: 0.3,
  hoverDuration: 0.2,
  microInteractionDuration: 0.15,
  scrollRevealDuration: 0.5,
  pulseDuration: 2,

  // Spring configurations
  spring: {
    stiffness: 300,
    damping: 20,
  },
  springButton: {
    stiffness: 400,
    damping: 10,
  },
};

// Layout configuration
export const LAYOUT_CONFIG = {
  maxWidth: '800px',
  sectionSpacing: '64px',
  cardSpacing: '24px',
};

// Tech stack categorization
export const TECH_CATEGORIES: Record<string, 'frontend' | 'backend' | 'devops' | 'tools'> = {
  // Frontend
  'React': 'frontend',
  'Next.js': 'frontend',
  'TypeScript': 'frontend',
  'JavaScript': 'frontend',
  'Tailwind': 'frontend',
  'TailwindCSS': 'frontend',
  'Vue': 'frontend',
  'Svelte': 'frontend',
  'HTML': 'frontend',
  'CSS': 'frontend',
  'Framer Motion': 'frontend',
  'Redux': 'frontend',
  'Zustand': 'frontend',

  // Backend
  'Node.js': 'backend',
  'Python': 'backend',
  'FastAPI': 'backend',
  'Express': 'backend',
  'Django': 'backend',
  'PostgreSQL': 'backend',
  'MongoDB': 'backend',
  'MySQL': 'backend',
  'Redis': 'backend',
  'GraphQL': 'backend',
  'Supabase': 'backend',
  'Prisma': 'backend',

  // DevOps
  'Docker': 'devops',
  'AWS': 'devops',
  'Vercel': 'devops',
  'CI/CD': 'devops',
  'GitHub Actions': 'devops',
  'Kubernetes': 'devops',

  // Tools
  'Git': 'tools',
  'Figma': 'tools',
  'Jest': 'tools',
  'Testing Library': 'tools',
  'Storybook': 'tools',
  'Webpack': 'tools',
  'Vite': 'tools',
};

export const CATEGORY_COLORS = {
  frontend: 'from-blue-500 to-blue-600',
  backend: 'from-purple-500 to-purple-600',
  devops: 'from-green-500 to-green-600',
  tools: 'from-orange-500 to-orange-600',
};
