'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import Container from '@/components/ui/Container';
import ProjectCard from '@/components/ui/ProjectCard';
import { Project } from '@/lib/types';

async function fetchProjects(): Promise<Project[]> {
  const response = await fetch('/api/github/projects');
  if (!response.ok) {
    throw new Error('Failed to fetch projects');
  }
  return response.json();
}

export default function ProjectsPage() {
  const { data: projects = [], isLoading, error } = useQuery({
    queryKey: ['projects'],
    queryFn: fetchProjects,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Sort by creation date (most recent first)
  const sortedProjects = [...projects].sort((a, b) =>
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <main className="min-h-screen bg-portfolio-light-bg dark:bg-portfolio-bg py-16">
      <Container>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-portfolio-silver hover:text-portfolio-light-text dark:text-portfolio-text transition-colors mb-12"
        >
          <ArrowLeft size={20} />
          <span>Back to Home</span>
        </Link>

        <h1 className="text-2xl md:text-3xl font-medium text-portfolio-light-text dark:text-portfolio-text mb-4">
          All Projects
        </h1>
        <div className="w-16 h-0.5 bg-portfolio-silver mb-12" />

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-96 bg-portfolio-surface border border-portfolio-border rounded-lg animate-pulse"
              />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-portfolio-muted">
              Failed to load projects. Please try again later.
            </p>
          </div>
        ) : sortedProjects.length > 0 ? (
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
