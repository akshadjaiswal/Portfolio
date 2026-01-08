import { Experience } from '../types';

export const EXPERIENCES: Experience[] = [
  {
    id: 'exp-1',
    company: 'Tech Company Inc.',
    companyUrl: 'https://example.com',
    role: 'Senior Software Developer',
    duration: 'Jan 2023 - Present',
    startDate: '2023-01-01',
    endDate: null,
    location: 'Remote',
    type: 'Full-time',
    description: 'Leading frontend development for enterprise SaaS platform, architecting scalable React applications that serve thousands of users daily.',
    achievements: [
      'Reduced initial page load time by 40% through code splitting and lazy loading',
      'Implemented company-wide design system using React and Tailwind CSS',
      'Mentored 3 junior developers and conducted weekly code reviews'
    ],
    technologies: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'GraphQL']
  },
  {
    id: 'exp-2',
    company: 'Startup Solutions',
    companyUrl: 'https://example.com',
    role: 'Full Stack Developer',
    duration: 'Jun 2021 - Dec 2022',
    startDate: '2021-06-01',
    endDate: '2022-12-31',
    location: 'Hybrid',
    type: 'Full-time',
    description: 'Built and maintained multiple client-facing web applications, from initial concept to production deployment.',
    achievements: [
      'Developed 5+ production applications using modern JavaScript frameworks',
      'Integrated third-party APIs including Stripe, SendGrid, and AWS services',
      'Improved application performance by 60% through database optimization'
    ],
    technologies: ['Vue.js', 'Node.js', 'Express', 'MongoDB', 'AWS']
  },
  {
    id: 'exp-3',
    company: 'Freelance',
    role: 'Web Developer',
    duration: 'Jan 2020 - May 2021',
    startDate: '2020-01-01',
    endDate: '2021-05-31',
    location: 'Remote',
    type: 'Freelance',
    description: 'Delivered custom web solutions for small businesses and startups, focusing on responsive design and user experience.',
    achievements: [
      'Completed 10+ client projects with 100% satisfaction rate',
      'Built responsive websites that increased client engagement by average 45%',
      'Established long-term relationships with 5 recurring clients'
    ],
    technologies: ['HTML', 'CSS', 'JavaScript', 'WordPress', 'PHP']
  }
];
