import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Container from '../ui/Container';
import Section from '../ui/Section';
import SectionHeader from '../ui/SectionHeader';
import ProjectCard from '../ui/ProjectCard';
import { PROJECTS } from '@/lib/data/projects';

export default function Projects() {
  // Get featured projects only
  const featuredProjects = PROJECTS.filter((p) => p.featured).slice(0, 3);

  return (
    <Section id="projects">
      <Container>
        <SectionHeader
          title="Selected Work"
          subtitle="Projects I'm proud to have built"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
        <div className="text-center">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-portfolio-silver hover:text-portfolio-text transition-colors"
          >
            <span>View All Projects</span>
            <ArrowRight size={20} />
          </Link>
        </div>
      </Container>
    </Section>
  );
}
