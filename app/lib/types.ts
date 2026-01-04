// Core data types for portfolio

export interface Experience {
  id: string;
  company: string;
  companyUrl?: string;
  logo: string;              // Path to company logo
  logoAlt?: string;          // Alt text (optional, defaults to company name)
  role: string;
  duration: string;          // "Jan 2023 - Present"
  startDate: string;         // ISO format for sorting
  endDate: string | null;    // null for current
  location: string;
  type: 'Full-time' | 'Contract' | 'Freelance';
  description: string;       // 2-3 sentences
  achievements: string[];    // 3-5 key achievements
  technologies: string[];    // Tech stack used
}

export interface Project {
  id: string;
  slug: string;              // URL-friendly
  title: string;
  tagline: string;           // One-liner for card (40-60 chars)
  description: string;       // Brief for card (120-150 chars)
  thumbnail: string;         // /images/projects/slug/hero.jpg
  technologies: string[];
  category: 'Web' | 'Mobile' | 'Tool' | 'Open Source';
  featured: boolean;
  liveUrl?: string;
  githubUrl?: string;

  // Detail page content
  fullDescription: string;   // Longer narrative
  problem: string;           // What problem did this solve?
  solution: string;          // How did you solve it?
  impact: string;            // Results/outcomes
  images: string[];          // Gallery images
  videoUrl?: string;         // Demo video
  testimonial?: {
    text: string;
    author: string;
    role: string;
  };
  createdAt: string;         // For sorting
}

export interface SocialLink {
  platform: 'GitHub' | 'LinkedIn' | 'X' | 'Email';
  url: string;
  username: string;
  icon: string;              // Lucide icon name
}
