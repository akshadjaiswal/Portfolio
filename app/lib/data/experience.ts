import { Experience } from '../types';

export const EXPERIENCES: Experience[] = [
  {
    id: 'exp-erlin-ai',
    company: 'Erlin AI',
    companyUrl: 'https://erlin.ai',
    logo: '/images/companies/erlin_ai_logo.jpeg',
    logoAlt: 'Erlin AI Logo',
    location: 'Pune, Maharashtra, India',
    totalDuration: '1 yr 1 mo',
    positions: [
      {
        id: 'pos-erlin-1',
        role: 'Founding Software Developer',
        type: 'Full-time',
        duration: 'May 2025 - Present',
        startDate: '2025-05-01',
        endDate: null,
        description: 'Leading end-to-end frontend development for the core Next.js application.',
        achievements: [
          'Lead end-to-end frontend development for the core Next.js application, covering the full lifecycle from requirements analysis and UI/UX refinement to scalable implementation and production deployment.',
          'Collaborate with CEO, Product Manager, client teams, and directly on client calls to define features and ensure alignment with business and user needs.',
          'Build high-performance, maintainable Next.js code with robust architecture, while contributing to backend orchestration and integration with FastAPI services.',
          'Manage CI/CD pipelines, code documentation, and frontend PR reviews to uphold code quality and efficient releases.'
        ],
        technologies: ['Next.js', 'TypeScript', 'React', 'Tailwind CSS', 'FastAPI', 'Supabase', 'AI Agents', 'CrewAI', 'CI/CD']
      },
      {
        id: 'pos-erlin-2',
        role: 'Python/AI Developer',
        type: 'Internship',
        duration: 'Jan 2025 - May 2025',
        startDate: '2025-01-01',
        endDate: '2025-05-01',
        description: 'Developed and deployed a full-stack, AI-powered platform using Next.js and FastAPI.',
        achievements: [
          'Developed and deployed a full-stack, AI-powered platform using Next.js and FastAPI.',
          'Integrated and managed CrewAI agents for automated business analysis and content generation.',
          'Contributed to key features including brand analysis, SEO tools, and a centralized content library.',
          'Worked with a modern tech stack, including TypeScript, Python, Supabase, and Tailwind CSS.'
        ],
        technologies: ['Next.js', 'React.js', 'FastAPI', 'Python', 'Supabase', 'Tailwind CSS', 'CrewAI', 'TypeScript']
      }
    ]
  },
  {
    id: 'exp-2',
    company: 'Celebal Technologies',
    companyUrl: 'https://celebaltech.com',
    logo: '/images/companies/celebaltechnologies_logo.jpeg',
    logoAlt: 'Celebal Technologies Logo',
    role: 'React.js Developer',
    duration: 'May 2024 - Jul 2024',
    startDate: '2024-05-01',
    endDate: '2024-07-31',
    location: 'Pune, Maharashtra, India',
    type: 'Internship',
    description: 'Gained hands-on experience in React.js development during a summer internship program.',
    achievements: [
      'Developed responsive web applications using React.js and modern JavaScript frameworks',
      'Collaborated with senior developers on multiple client projects',
      'Implemented reusable components following best practices and design patterns'
    ],
    technologies: ['React.js', 'JavaScript', 'TypeScript', 'Tailwind CSS', 'Git']
  },
  {
    id: 'exp-3',
    company: 'Skillvalley',
    companyUrl: 'https://skillvalley.in',
    logo: '/images/companies/skillvalley_in_logo.jpeg',
    logoAlt: 'Skillvalley Logo',
    role: 'Full Stack Developer',
    duration: 'Mar 2023 - May 2023',
    startDate: '2023-03-01',
    endDate: '2023-05-31',
    location: 'Delhi, India',
    type: 'Internship',
    description: 'Led a team of three interns in end-to-end product development, from ideation to deployment.',
    achievements: [
      'Led a team of three interns, overseeing the end-to-end development of a product',
      'Successfully analyzed and broke down a complex problem statement, creating wireframes and Figma designs through collaborative brainstorming',
      'Took ownership of the product\'s backend development and later transitioned to frontend work',
      'Contributed to frontend development and collaborated closely with the team to ensure smooth and seamless product delivery'
    ],
    technologies: ['React.js', 'Node.js', 'Express', 'MongoDB', 'Figma', 'JavaScript']
  }
];
