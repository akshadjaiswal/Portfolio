import { NextRequest, NextResponse } from 'next/server';
import { fetchAllProjects, fetchProjectBySlug } from '@/lib/services/github';
import { GITHUB_PROJECT_REPOS, FALLBACK_PROJECTS } from '@/lib/data/projects';

export const runtime = 'nodejs';

// GitHub fetches are cached for 1h in lib/services/github.ts; let the CDN cache responses too
const CACHE_HEADERS = {
  'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
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
          return NextResponse.json(fallbackProject, { headers: CACHE_HEADERS });
        }
        return NextResponse.json(
          { error: 'Project not found' },
          { status: 404, headers: CACHE_HEADERS }
        );
      }

      return NextResponse.json(project, { headers: CACHE_HEADERS });
    }

    // Fetch all projects
    const projects = await fetchAllProjects(GITHUB_PROJECT_REPOS);

    // If GitHub API completely failed, use fallback
    if (projects.length === 0) {
      console.warn('API: Using fallback project data');
      return NextResponse.json(FALLBACK_PROJECTS, { headers: CACHE_HEADERS });
    }

    // Merge in manual-only projects (e.g. private repos not in GITHUB_PROJECT_REPOS)
    const fetchedSlugs = new Set(projects.map(p => p.slug));
    const manualProjects = FALLBACK_PROJECTS.filter(p => !fetchedSlugs.has(p.slug));
    const allProjects = [...projects, ...manualProjects]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return NextResponse.json(allProjects, { headers: CACHE_HEADERS });
  } catch (error) {
    console.error('API Error fetching projects:', error);

    // Return fallback data on error
    return NextResponse.json(FALLBACK_PROJECTS, { headers: CACHE_HEADERS });
  }
}
