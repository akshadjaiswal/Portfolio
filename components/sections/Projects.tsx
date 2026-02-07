'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import Container from '../ui/Container';
import Section from '../ui/Section';
import SectionHeader from '../ui/SectionHeader';
import ProjectCard from '../ui/ProjectCard';
import { Project } from '@/lib/types';

async function fetchProjects(): Promise<Project[]> {
  const response = await fetch('/api/github/projects');
  if (!response.ok) {
    throw new Error('Failed to fetch projects');
  }
  return response.json();
}

export default function Projects() {
  const { data: projects = [], isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: fetchProjects,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Get featured projects only
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 4);

  return (
    <Section id="projects">
      <Container>
        <SectionHeader
          title="Selected Work"
          subtitle="Projects I'm proud to have built"
        />

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-96 bg-portfolio-light-surface dark:bg-portfolio-surface border border-portfolio-light-border dark:border-portfolio-border rounded-lg animate-pulse"
              />
            ))}
          </div>
        ) : featuredProjects.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {featuredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>

            {projects.length > 0 && (
              <div className="text-center">
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 text-portfolio-light-accent dark:text-portfolio-silver hover:text-portfolio-light-text dark:text-portfolio-text transition-colors"
                >
                  <span>View All Projects</span>
                  <ArrowRight size={20} />
                </Link>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-portfolio-muted">
              No projects available at the moment.
            </p>
          </div>
        )}
      </Container>
    </Section>
  );
}
