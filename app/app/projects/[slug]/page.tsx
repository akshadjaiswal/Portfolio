import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import { Metadata } from 'next';
import Container from '@/components/ui/Container';
import { PROJECTS } from '@/lib/data/projects';
import { PERSONAL_INFO } from '@/lib/constants';

export async function generateStaticParams() {
  return PROJECTS.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const project = PROJECTS.find((p) => p.slug === params.slug);

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: `${project.title} - ${PERSONAL_INFO.name}`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: [project.thumbnail],
    },
  };
}

export default function ProjectDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const project = PROJECTS.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-portfolio-bg py-16">
      <Container>
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-portfolio-silver hover:text-portfolio-text transition-colors mb-12"
        >
          <ArrowLeft size={20} />
          <span>Back to Projects</span>
        </Link>

        {/* Hero Image */}
        <div className="relative aspect-video rounded-lg overflow-hidden mb-8 bg-portfolio-surface">
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-medium text-portfolio-text mb-3">
            {project.title}
          </h1>
          <p className="text-xl text-portfolio-muted mb-6">
            {project.tagline}
          </p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-portfolio-surface border border-portfolio-border rounded-full text-sm text-portfolio-text font-mono"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="flex gap-4">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-portfolio-silver text-portfolio-bg rounded-lg hover:bg-opacity-90 transition-all"
              >
                <ExternalLink size={20} />
                <span>Live Demo</span>
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 border border-portfolio-border text-portfolio-text rounded-lg hover:border-portfolio-silver hover:bg-portfolio-surface transition-all"
              >
                <Github size={20} />
                <span>GitHub</span>
              </a>
            )}
          </div>
        </div>

        {/* Overview */}
        <section className="mb-12">
          <h2 className="text-2xl font-medium text-portfolio-text mb-4">
            Overview
          </h2>
          <div className="w-12 h-0.5 bg-portfolio-silver mb-6" />
          <p className="text-portfolio-text leading-relaxed">
            {project.fullDescription}
          </p>
        </section>

        {/* The Challenge */}
        <section className="mb-12">
          <h2 className="text-2xl font-medium text-portfolio-text mb-4">
            The Challenge
          </h2>
          <div className="w-12 h-0.5 bg-portfolio-silver mb-6" />
          <p className="text-portfolio-text leading-relaxed">
            {project.problem}
          </p>
        </section>

        {/* The Solution */}
        <section className="mb-12">
          <h2 className="text-2xl font-medium text-portfolio-text mb-4">
            The Solution
          </h2>
          <div className="w-12 h-0.5 bg-portfolio-silver mb-6" />
          <p className="text-portfolio-text leading-relaxed">
            {project.solution}
          </p>
        </section>

        {/* Impact */}
        <section className="mb-12">
          <h2 className="text-2xl font-medium text-portfolio-text mb-4">
            Impact
          </h2>
          <div className="w-12 h-0.5 bg-portfolio-silver mb-6" />
          <p className="text-portfolio-text leading-relaxed">
            {project.impact}
          </p>
        </section>

        {/* Testimonial */}
        {project.testimonial && (
          <section className="mb-12">
            <div className="border border-portfolio-border rounded-lg p-8 bg-portfolio-surface">
              <p className="text-lg text-portfolio-text italic mb-4">
                &ldquo;{project.testimonial.text}&rdquo;
              </p>
              <div className="text-sm text-portfolio-muted">
                <p className="font-medium">{project.testimonial.author}</p>
                <p>{project.testimonial.role}</p>
              </div>
            </div>
          </section>
        )}
      </Container>
    </main>
  );
}
