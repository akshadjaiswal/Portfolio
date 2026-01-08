'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Container from '../ui/Container';
import Section from '../ui/Section';
import SectionHeader from '../ui/SectionHeader';
import ProjectCard from '../ui/ProjectCard';
import { Project } from '@/lib/types';

async function fetchProjects(): Promise<Project[]> {
  const response = await fetch('/api/github/projects');
  const data = await response.json();

  if (!data.success) {
    throw new Error(data.error || 'Failed to fetch projects');
  }

  return data.projects;
}

export default function Projects() {
  const {
    data: projects = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['github-projects'],
    queryFn: fetchProjects,
    staleTime: 1000 * 60 * 30, // 30 minutes
  });

  // Get featured projects only
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 3);

  return (
    <Section id="projects">
      <Container>
        <SectionHeader
          title="Selected Work"
          subtitle="Projects I'm proud to have built"
        />

        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="rounded-lg bg-portfolio-surface/30 h-96 animate-pulse"
              />
            ))}
          </div>
        )}

        {error && (
          <div className="text-center py-12">
            <p className="text-portfolio-muted">
              Failed to load projects. Please try again later.
            </p>
          </div>
        )}

        {!isLoading && !error && featuredProjects.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}

        {!isLoading && !error && featuredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-portfolio-muted">No projects found.</p>
          </div>
        )}

        {!isLoading && !error && projects.length > 0 && (
          <div className="text-center">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-portfolio-silver hover:text-portfolio-text transition-colors"
            >
              <span>View All Projects</span>
              <ArrowRight size={20} />
            </Link>
          </div>
        )}
      </Container>
    </Section>
  );
}
