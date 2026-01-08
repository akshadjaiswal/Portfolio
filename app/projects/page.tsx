import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Container from '@/components/ui/Container';
import ProjectCard from '@/components/ui/ProjectCard';
import { fetchAllProjects } from '@/lib/services/github';
import { GITHUB_PROJECT_REPOS } from '@/lib/data/projects';

async function getProjects() {
  try {
    const projects = await fetchAllProjects(GITHUB_PROJECT_REPOS);
    return projects;
  } catch (error) {
    console.error('Failed to fetch projects:', error);
    return [];
  }
}

export default async function ProjectsPage() {
  const projects = await getProjects();

  // Sort by creation date (most recent first)
  const sortedProjects = [...projects].sort((a, b) =>
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <main className="min-h-screen bg-portfolio-bg py-16">
      <Container>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-portfolio-silver hover:text-portfolio-text transition-colors mb-12"
        >
          <ArrowLeft size={20} />
          <span>Back to Home</span>
        </Link>

        <h1 className="text-2xl md:text-3xl font-medium text-portfolio-text mb-4">
          All Projects
        </h1>
        <div className="w-16 h-0.5 bg-portfolio-silver mb-12" />

        {sortedProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sortedProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-portfolio-muted">
              No projects found. Please check back later.
            </p>
          </div>
        )}
      </Container>
    </main>
  );
}
