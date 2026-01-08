import { NextResponse } from 'next/server';
import { fetchAllProjects } from '@/lib/services/github';

// GitHub repository URLs to fetch
const GITHUB_PROJECT_REPOS = [
  'https://github.com/akshadjaiswal/remind-well',
  'https://github.com/akshadjaiswal/dev-wrapped',
  'https://github.com/akshadjaiswal/excuse-generator-pro',
  'https://github.com/akshadjaiswal/glide-data-grid',
  'https://github.com/akshadjaiswal/devstart',
];

export async function GET() {
  try {
    const projects = await fetchAllProjects(GITHUB_PROJECT_REPOS);

    return NextResponse.json({
      success: true,
      projects,
      count: projects.length,
    });
  } catch (error) {
    console.error('Error fetching GitHub projects:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch projects from GitHub',
        projects: [],
      },
      { status: 500 }
    );
  }
}

// Enable caching for 1 hour
export const revalidate = 3600;
