import { NextRequest, NextResponse } from 'next/server';
import { fetchAllProjects, fetchProjectBySlug } from '@/lib/services/github';
import { GITHUB_PROJECT_REPOS, FALLBACK_PROJECTS } from '@/lib/data/projects';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

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
          return NextResponse.json(fallbackProject);
        }
        return NextResponse.json(
          { error: 'Project not found' },
          { status: 404 }
        );
      }

      return NextResponse.json(project);
    }

    // Fetch all projects
    const projects = await fetchAllProjects(GITHUB_PROJECT_REPOS);

    // If GitHub API completely failed, use fallback
    if (projects.length === 0) {
      console.warn('API: Using fallback project data');
      return NextResponse.json(FALLBACK_PROJECTS);
    }

    return NextResponse.json(projects);
  } catch (error) {
    console.error('API Error fetching projects:', error);

    // Return fallback data on error
    return NextResponse.json(FALLBACK_PROJECTS);
  }
}
