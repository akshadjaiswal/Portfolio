// Core data types for portfolio

export interface Position {
  id: string;
  role: string;
  type: 'Full-time' | 'Contract' | 'Freelance' | 'Internship';
  duration: string;          // "Jan 2023 - Present"
  startDate: string;         // ISO format for sorting
  endDate: string | null;    // null for current
  description: string;       // 2-3 sentences
  achievements: string[];    // 3-5 key achievements
  technologies: string[];    // Tech stack used
}

export interface Experience {
  id: string;
  company: string;
  companyUrl?: string;
  logo: string;              // Path to company logo
  logoAlt?: string;          // Alt text (optional, defaults to company name)
  location: string;

  // For single position (backward compatible)
  role?: string;
  duration?: string;         // "Jan 2023 - Present"
  startDate?: string;        // ISO format for sorting
  endDate?: string | null;   // null for current
  type?: 'Full-time' | 'Contract' | 'Freelance' | 'Internship';
  description?: string;      // 2-3 sentences
  achievements?: string[];   // 3-5 key achievements
  technologies?: string[];   // Tech stack used

  // For multiple positions
  positions?: Position[];
  totalDuration?: string;    // e.g., "1 yr 1 mo"
}

export interface Project {
  id: string;
  slug: string;              // URL-friendly
  title: string;
  tagline: string;           // One-liner for card (40-60 chars)
  description: string;       // Brief for card (120-150 chars)
  thumbnail: string;         // /images/projects/slug/hero.jpg
  technologies: string[];
  category: 'Web' | 'Mobile' | 'Tool' | 'Open Source' | 'Web Development';
  featured: boolean;
  liveUrl?: string;
  githubUrl?: string;

  // Detail page content
  fullDescription: string;   // Longer narrative
  problem?: string;          // What problem did this solve?
  solution?: string;         // How did you solve it?
  impact?: string;           // Results/outcomes
  images: string[];          // Gallery images
  videoUrl?: string;         // Demo video
  testimonial?: {
    text: string;
    author: string;
    role: string;
  };
  createdAt: string;         // For sorting

  // GitHub-specific fields (for auto-fetched projects)
  githubStars?: number;
  githubForks?: number;
  primaryLanguage?: string;
  languages?: { [key: string]: number };
  lastUpdated?: string;
  autoFetched?: boolean;     // Indicates if fetched from GitHub
  repositoryUrl?: string;    // Full GitHub URL
  freshBuild?: boolean;      // Indicates if project should show "Fresh Build" badge
}

export interface SocialLink {
  platform: 'GitHub' | 'LinkedIn' | 'X' | 'Email';
  url: string;
  username: string;
  icon: string;              // Lucide icon name
}

export interface LearningRepo {
  owner: string;
  name: string;
  url: string;
  description: string;
  label: string;
  stars?: number; // Fetched from API
}
