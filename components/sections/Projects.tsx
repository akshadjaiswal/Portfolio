import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Container from '../ui/Container';
import Section from '../ui/Section';
import SectionHeader from '../ui/SectionHeader';
import ProjectCard from '../ui/ProjectCard';
import { fetchAllProjects } from '@/lib/services/github';
import { GITHUB_PROJECT_REPOS } from '@/lib/data/projects';

async function getProjects() {
  try {
    const projects = await fetchAllProjects(GITHUB_PROJECT_REPOS);
    return projects;
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

export default async function Projects() {
  const projects = await getProjects();

  // Get featured projects only
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 3);

  return (
    <Section id="projects">
      <Container>
        <SectionHeader
          title="Selected Work"
          subtitle="Projects I'm proud to have built"
        />

        {featuredProjects.length > 0 ? (
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
                  className="inline-flex items-center gap-2 text-portfolio-silver hover:text-portfolio-text transition-colors"
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
              Loading projects... Please check back soon.
            </p>
          </div>
        )}
      </Container>
    </Section>
  );
}
