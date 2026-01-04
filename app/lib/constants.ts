import { SocialLink } from './types';

// Personal information
export const PERSONAL_INFO = {
  name: 'Akshad Jaiswal',
  tagline: 'Building things that work, and work well',
  currentRole: 'Software Developer',
  location: 'India',
  email: 'your.email@example.com', // Update with your email
  githubUsername: 'akshadjaiswal',
  calComLink: 'https://cal.com/akshad-jaiswal/15min',
  coverQuote: 'Building the future, one line of code at a time.', // Update with your quote
  bio: 'I build from zero. Whether it\'s frontend, backend, full-stack applications, or AI-powered experiences, I work across the entire development lifecycle. From UI/UX to deployment to user feedback, I care less about technology debates and more about delivering results that people love using.',
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
};

// Layout configuration
export const LAYOUT_CONFIG = {
  maxWidth: '800px',
  sectionSpacing: '64px',
  cardSpacing: '24px',
};
