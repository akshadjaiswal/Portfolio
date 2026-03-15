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
          <>
            <p className="text-sm text-portfolio-muted animate-pulse mb-6">Fetching projects from GitHub...</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="rounded-lg border border-portfolio-light-border dark:border-portfolio-border overflow-hidden bg-portfolio-light-surface dark:bg-portfolio-surface/20">
                  <div className="aspect-video bg-portfolio-light-border dark:bg-portfolio-border animate-pulse" />
                  <div className="p-4 space-y-3">
                    <div className="h-5 w-3/4 bg-portfolio-light-border dark:bg-portfolio-border rounded animate-pulse" />
                    <div className="h-3 w-full bg-portfolio-light-border dark:bg-portfolio-border rounded animate-pulse" />
                    <div className="h-3 w-2/3 bg-portfolio-light-border dark:bg-portfolio-border rounded animate-pulse" />
                    <div className="flex gap-1.5 pt-1">
                      {[1, 2, 3].map((j) => (
                        <div key={j} className="h-5 w-14 bg-portfolio-light-border dark:bg-portfolio-border rounded animate-pulse" />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
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
