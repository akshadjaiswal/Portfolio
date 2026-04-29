export type TechCategory = 'frontend' | 'backend' | 'database' | 'tools';

export interface TechItem {
  name: string;
  icon: string; // react-icons key
  category: TechCategory;
  color: string; // brand color for icon tint on hover (light mode)
  darkColor?: string; // override for dark mode (use for black-brand icons)
}

export const TECH_STACK: TechItem[] = [
  // Frontend
  { name: 'React', icon: 'SiReact', category: 'frontend', color: '#61DAFB' },
  { name: 'Next.js', icon: 'SiNextdotjs', category: 'frontend', color: '#000000', darkColor: '#FFFFFF' },
  { name: 'TypeScript', icon: 'SiTypescript', category: 'frontend', color: '#3178C6' },
  { name: 'Tailwind CSS', icon: 'SiTailwindcss', category: 'frontend', color: '#06B6D4' },
  { name: 'Framer Motion', icon: 'SiFramer', category: 'frontend', color: '#0055FF' },
  // Backend
  { name: 'Go', icon: 'SiGo', category: 'backend', color: '#00ADD8' },
  { name: 'Node.js', icon: 'SiNodedotjs', category: 'backend', color: '#339933' },
  { name: 'Python', icon: 'SiPython', category: 'backend', color: '#3776AB' },
  { name: 'Express', icon: 'SiExpress', category: 'backend', color: '#000000', darkColor: '#FFFFFF' },
  { name: 'FastAPI', icon: 'SiFastapi', category: 'backend', color: '#009688' },
  // Database / Infra
  { name: 'PostgreSQL', icon: 'SiPostgresql', category: 'database', color: '#4169E1' },
  { name: 'MongoDB', icon: 'SiMongodb', category: 'database', color: '#47A248' },
  { name: 'Redis', icon: 'SiRedis', category: 'database', color: '#DC382D' },
  { name: 'Supabase', icon: 'SiSupabase', category: 'database', color: '#3ECF8E' },
  { name: 'Docker', icon: 'SiDocker', category: 'database', color: '#2496ED' },
  // Tools
  { name: 'Git', icon: 'SiGit', category: 'tools', color: '#F05032' },
  { name: 'Figma', icon: 'SiFigma', category: 'tools', color: '#F24E1E' },
  { name: 'AWS', icon: 'SiAmazonwebservices', category: 'tools', color: '#FF9900' },
  { name: 'Vercel', icon: 'SiVercel', category: 'tools', color: '#000000', darkColor: '#FFFFFF' },
  { name: 'GitHub', icon: 'SiGithub', category: 'tools', color: '#181717', darkColor: '#FFFFFF' },
];
