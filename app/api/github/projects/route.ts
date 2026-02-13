import { NextRequest, NextResponse } from 'next/server';
import { fetchAllProjects, fetchProjectBySlug } from '@/lib/services/github';
import { GITHUB_PROJECT_REPOS, FALLBACK_PROJECTS } from '@/lib/data/projects';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// Headers to prevent Vercel CDN caching
const NO_CACHE_HEADERS = {
  'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0',
  'CDN-Cache-Control': 'no-store',
  'Vercel-CDN-Cache-Control': 'no-store',
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');

    // If slug is provided, fetch single project
    if (slug) {
      const project = await fetchProjectBySlug(slug);

      if (!project) {
        // Try finding in fallback data
        const fallbackProject = FALLBACK_PROJECTS.find(p => p.slug === slug);
        if (fallbackProject) {
          return NextResponse.json(fallbackProject, { headers: NO_CACHE_HEADERS });
        }
        return NextResponse.json(
          { error: 'Project not found' },
          { status: 404, headers: NO_CACHE_HEADERS }
        );
      }

      return NextResponse.json(project, { headers: NO_CACHE_HEADERS });
    }

    // Fetch all projects
    const projects = await fetchAllProjects(GITHUB_PROJECT_REPOS);

    // If GitHub API completely failed, use fallback
    if (projects.length === 0) {
      console.warn('API: Using fallback project data');
      return NextResponse.json(FALLBACK_PROJECTS, { headers: NO_CACHE_HEADERS });
    }

    return NextResponse.json(projects, { headers: NO_CACHE_HEADERS });
  } catch (error) {
    console.error('API Error fetching projects:', error);

    // Return fallback data on error
    return NextResponse.json(FALLBACK_PROJECTS, { headers: NO_CACHE_HEADERS });
  }
}
