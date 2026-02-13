'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import Container from '@/components/ui/Container';
import ProjectCard from '@/components/ui/ProjectCard';
import { FilterBar } from '@/components/projects/FilterBar';
import { SkillsCloud } from '@/components/projects/SkillsCloud';
import { FilterSync } from '@/components/projects/FilterSync';
import { useFilterStore } from '@/lib/stores/filter-store';
import { Project } from '@/lib/types';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { ErrorFallback } from '@/components/ui/ErrorFallback';

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

  const filterProjects = useFilterStore((state) => state.filterProjects);

  // Extract unique technologies and categories
  const allTechnologies = Array.from(new Set(projects.flatMap((p) => p.technologies))).sort();

  const allCategories = Array.from(new Set(projects.map((p) => p.category))).sort();

  // Calculate technology counts for skills cloud
  const technologyCounts = projects.reduce((acc, project) => {
    project.technologies.forEach((tech) => {
      acc[tech] = (acc[tech] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);

  const technologiesWithCounts = Object.entries(technologyCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);

  // Apply filters
  const filteredProjects = filterProjects(projects);

  // Sort by creation date (most recent first)
  const sortedProjects = [...filteredProjects].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <main className="min-h-screen bg-portfolio-light-bg dark:bg-portfolio-bg py-16">
      <ErrorBoundary
        fallback={
          <Container>
            <div className="py-16">
              <ErrorFallback
                title="Projects page unavailable"
                message="We couldn't load the projects page. This might be due to network issues or GitHub API rate limiting."
              />
            </div>
          </Container>
        }
      >
        <Suspense fallback={null}>
          <FilterSync />
        </Suspense>
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
        <div className="w-16 h-0.5 bg-portfolio-light-accent dark:bg-portfolio-silver mb-8" />

        {/* Skills Cloud */}
        {!isLoading && !error && technologiesWithCounts.length > 0 && (
          <div className="mb-8">
            <SkillsCloud technologies={technologiesWithCounts} />
          </div>
        )}

        {/* Filter Bar */}
        <FilterBar />

        {/* Results Count */}
        {!isLoading && !error && projects.length > 0 && (
          <div className="mb-4 text-sm text-portfolio-muted">
            Showing {sortedProjects.length} of {projects.length} projects
          </div>
        )}

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
          <AnimatePresence mode="popLayout">
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sortedProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        ) : projects.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-portfolio-muted text-lg mb-2">
              No projects match your filters
            </p>
            <p className="text-sm text-portfolio-muted">
              Try adjusting your search or clearing filters
            </p>
          </motion.div>
        ) : (
          <div className="text-center py-12">
            <p className="text-portfolio-muted">No projects found. Please check back later.</p>
          </div>
        )}
        </Container>
      </ErrorBoundary>
    </main>
  );
}
