import { Project } from '@/lib/types';
import { GITHUB_PROJECT_REPOS } from '@/lib/data/projects';

interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  topics: string[];
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  created_at: string;
  updated_at: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

interface GitHubLanguages {
  [key: string]: number;
}

interface GitHubReadme {
  content: string;
  encoding: string;
}

const GITHUB_API_BASE = 'https://api.github.com';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

/**
 * Fetch repository data from GitHub API
 */
export async function fetchRepositoryData(repoUrl: string): Promise<GitHubRepo> {
  const repoPath = repoUrl.replace('https://github.com/', '');

  const response = await fetch(`${GITHUB_API_BASE}/repos/${repoPath}`, {
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: 'application/vnd.github.v3+json',
    },
    next: { revalidate: 3600 }, // Cache for 1 hour
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch repository: ${repoPath}`);
  }

  return response.json();
}

/**
 * Fetch repository languages
 */
async function fetchRepositoryLanguages(repoPath: string): Promise<GitHubLanguages> {
  const response = await fetch(`${GITHUB_API_BASE}/repos/${repoPath}/languages`, {
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: 'application/vnd.github.v3+json',
    },
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    return {};
  }

  return response.json();
}

/**
 * Fetch repository README
 */
async function fetchRepositoryReadme(repoPath: string): Promise<string> {
  try {
    const response = await fetch(`${GITHUB_API_BASE}/repos/${repoPath}/readme`, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: 'application/vnd.github.v3+json',
      },
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      return '';
    }

    const data: GitHubReadme = await response.json();
    const content = Buffer.from(data.content, 'base64').toString('utf-8');
    return content;
  } catch (error) {
    console.error(`Failed to fetch README for ${repoPath}:`, error);
    return '';
  }
}

/**
 * Extract deployment URL from repository data and README
 */
export async function extractDeploymentUrl(
  repo: GitHubRepo,
  readme: string
): Promise<string | null> {
  // 1. Check homepage field first
  if (repo.homepage && repo.homepage.trim() !== '') {
    const homepage = repo.homepage.trim();
    // Skip GitHub Pages URLs, we'll check those separately
    if (!homepage.includes('github.io')) {
      return homepage;
    }
  }

  // 2. Parse README for deployment links
  const deploymentUrl = extractUrlFromReadme(readme);
  if (deploymentUrl) {
    return deploymentUrl;
  }

  // 3. Check for GitHub Pages
  const githubPagesUrl = `https://${repo.owner.login}.github.io/${repo.name}`;
  if (repo.homepage === githubPagesUrl) {
    return githubPagesUrl;
  }

  return null;
}

/**
 * Strip HTML tags and Markdown formatting from text
 */
function stripHtml(text: string): string {
  return text
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold markdown (**text**)
    .replace(/\*(.*?)\*/g, '$1') // Remove italic markdown (*text*)
    .replace(/`(.*?)`/g, '$1') // Remove inline code (`text`)
    .replace(/#{1,6}\s+/g, '') // Remove markdown headers
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove markdown links, keep text
    .trim();
}

/**
 * Extract deployment URL from README content
 */
function extractUrlFromReadme(readme: string): string | null {
  if (!readme) return null;

  // Look for common deployment platform badges and links
  const patterns = [
    // Vercel deployment badge
    /\[!\[.*?\]\(.*?vercel.*?\)\]\((https:\/\/[^\)]+)\)/i,
    // Netlify deployment badge
    /\[!\[.*?\]\(.*?netlify.*?\)\]\((https:\/\/[^\)]+)\)/i,
    // Railway deployment
    /\[!\[.*?\]\(.*?railway.*?\)\]\((https:\/\/[^\)]+)\)/i,
    // Render deployment
    /\[!\[.*?\]\(.*?render.*?\)\]\((https:\/\/[^\)]+)\)/i,
    // Generic "Demo" or "Live" links
    /\[(?:demo|live|deployment|website|view\s*live)\]\((https:\/\/[^\)]+)\)/i,
    // Look for explicit deployment section URLs
    /##?\s*(?:demo|live|deployment|website)[\s\S]*?\n.*?\[(.*?)\]\((https:\/\/[^\)]+)\)/i,
  ];

  for (const pattern of patterns) {
    const match = readme.match(pattern);
    if (match) {
      const url = match[1] || match[2];
      if (url && !url.includes('github.com')) {
        return url;
      }
    }
  }

  return null;
}

/**
 * Extract project description from README
 */
function extractDescriptionFromReadme(readme: string, repoDescription: string | null): string {
  if (!readme) {
    return repoDescription || 'A project built with modern web technologies.';
  }

  // Remove title (first # heading)
  let content = readme.replace(/^#\s+.+?\n/m, '');

  // Strip HTML tags first
  content = stripHtml(content);

  // Extract first paragraph after badges/shields
  const lines = content.split('\n');
  let description = '';
  let foundContent = false;

  for (const line of lines) {
    const trimmed = line.trim();

    // Skip empty lines, badges, image links, and HTML-looking content
    if (!trimmed ||
        trimmed.startsWith('![') ||
        trimmed.startsWith('[!') ||
        trimmed.startsWith('##') ||
        trimmed.includes('align=') ||
        trimmed.includes('src=') ||
        trimmed.length < 10) {  // Skip very short lines
      if (foundContent) break; // Stop at next heading
      continue;
    }

    description += trimmed + ' ';
    foundContent = true;

    // Stop if we have enough content (around 120-150 chars)
    if (description.length > 120) break;
  }

  const cleaned = description.trim();
  // Limit to 150 characters and add ellipsis if needed
  if (cleaned.length > 150) {
    return cleaned.substring(0, 147) + '...';
  }

  return cleaned || repoDescription || 'A project built with modern web technologies.';
}

/**
 * Extract technologies from README badges and topics
 */
function extractTechnologies(readme: string, topics: string[], language: string | null): string[] {
  const technologies = new Set<string>();

  // Add topics (GitHub tags)
  topics.forEach(topic => {
    // Clean up topic (remove hyphens, capitalize)
    const cleaned = topic
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    technologies.add(cleaned);
  });

  // Add primary language
  if (language) {
    technologies.add(language);
  }

  // Extract from README badges
  const badgePatterns = [
    /!\[.*?\]\(https:\/\/img\.shields\.io\/badge\/([^-]+)-/gi,
  ];

  badgePatterns.forEach(pattern => {
    let match;
    while ((match = pattern.exec(readme)) !== null) {
      const tech = match[1].replace(/%20/g, ' ').trim();
      if (tech.length > 1 && tech.length < 30) {
        technologies.add(tech);
      }
    }
  });

  return Array.from(technologies).slice(0, 8); // Limit to 8 technologies
}

/**
 * Extract screenshot/thumbnail from README or use local image
 */
function extractThumbnailFromReadme(readme: string, repoName: string): string {
  // Use local project images from /public/images/projects/
  // Map repository names to actual image filenames
  const imageNameMap: { [key: string]: string } = {
    'excuse-generator-pro': 'excuse-generator',
    'devstart': 'devstart-cli',
  };

  const imageName = imageNameMap[repoName] || repoName;
  return `/images/projects/${imageName}.png`;
}

/**
 * Convert kebab-case to Title Case
 */
function kebabToTitleCase(str: string): string {
  return str
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Generate slug from repository name
 */
function generateSlug(repoName: string): string {
  return repoName.toLowerCase().replace(/[^a-z0-9-]/g, '-');
}

/**
 * Transform GitHub repo data to Project type
 */
export async function transformGitHubRepoToProject(
  repo: GitHubRepo,
  readme: string,
  deploymentUrl: string | null
): Promise<Project> {
  const readmeDescription = extractDescriptionFromReadme(readme, repo.description);
  const technologies = extractTechnologies(readme, repo.topics, repo.language);
  const thumbnail = extractThumbnailFromReadme(readme, repo.name);
  const title = kebabToTitleCase(repo.name);

  // Use GitHub repo description as tagline, README content as description
  // This avoids duplication
  const tagline = repo.description || readmeDescription.slice(0, 60);
  const description = repo.description ? readmeDescription : 'A project built with modern web technologies.';

  return {
    id: repo.id.toString(),
    slug: generateSlug(repo.name),
    title,
    tagline,
    description,
    fullDescription: description,
    thumbnail,
    technologies,
    category: 'Web Development',
    liveUrl: deploymentUrl || undefined,
    githubUrl: repo.html_url,
    featured: repo.stargazers_count > 0, // Feature repos with stars
    createdAt: repo.created_at,
    images: [thumbnail],

    // GitHub-specific fields
    githubStars: repo.stargazers_count,
    githubForks: repo.forks_count,
    primaryLanguage: repo.language || undefined,
    lastUpdated: repo.updated_at,
    autoFetched: true,
    repositoryUrl: repo.html_url,
  };
}

/**
 * Fetch all configured projects from GitHub
 */
export async function fetchAllProjects(repoUrls: string[]): Promise<Project[]> {
  const projects: Project[] = [];

  for (const repoUrl of repoUrls) {
    try {
      const repo = await fetchRepositoryData(repoUrl);
      const repoPath = repoUrl.replace('https://github.com/', '');

      // Fetch additional data in parallel
      const [readme, languages] = await Promise.all([
        fetchRepositoryReadme(repoPath),
        fetchRepositoryLanguages(repoPath),
      ]);

      const deploymentUrl = await extractDeploymentUrl(repo, readme);
      const project = await transformGitHubRepoToProject(repo, readme, deploymentUrl);

      projects.push(project);
    } catch (error) {
      console.error(`Failed to fetch project from ${repoUrl}:`, error);
    }
  }

  // Sort by creation date (newest first)
  return projects.sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
}

/**
 * Fetch a single project by slug from GitHub API
 */
export async function fetchProjectBySlug(slug: string): Promise<Project | null> {
  const projects = await fetchAllProjects(GITHUB_PROJECT_REPOS);
  return projects.find(p => p.slug === slug) || null;
}
