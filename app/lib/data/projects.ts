import { Project } from '../types';

// GitHub repository URLs to fetch projects from
export const GITHUB_PROJECT_REPOS = [
  'https://github.com/akshadjaiswal/remind-well',
  'https://github.com/akshadjaiswal/dev-wrapped',
  'https://github.com/akshadjaiswal/excuse-generator-pro',
  'https://github.com/akshadjaiswal/glide-data-grid',
  'https://github.com/akshadjaiswal/devstart',
];

// Fallback projects in case GitHub API fails
// These will be replaced by auto-fetched GitHub projects
export const FALLBACK_PROJECTS: Project[] = [];

// This file is now primarily used for configuration
// Actual projects are fetched from GitHub via the API route
export const PROJECTS: Project[] = FALLBACK_PROJECTS;
