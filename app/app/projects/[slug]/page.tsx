import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import { Metadata } from 'next';
import Container from '@/components/ui/Container';
import GitHubStats from '@/components/ui/GitHubStats';
import ProjectMetadata from '@/components/ui/ProjectMetadata';
import VideoEmbed from '@/components/ui/VideoEmbed';
import ImageGallery from '@/components/ui/ImageGallery';
import { fetchProjectBySlug, fetchAllProjects } from '@/lib/services/github';
import { GITHUB_PROJECT_REPOS } from '@/lib/data/projects';
import { PERSONAL_INFO } from '@/lib/constants';

// Enable static generation for these routes
export const dynamic = 'force-static';
export const dynamicParams = false; // Only generate params from generateStaticParams
export const revalidate = 3600; // Revalidate every hour

export async function generateStaticParams() {
  const projects = await fetchAllProjects(GITHUB_PROJECT_REPOS);
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await fetchProjectBySlug(slug);

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

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await fetchProjectBySlug(slug);

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
          <h1 className="text-2xl md:text-3xl font-medium text-portfolio-text mb-3">
            {project.title}
          </h1>
          <p className="text-base md:text-lg text-portfolio-muted mb-6">
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

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-portfolio-silver text-portfolio-bg rounded-lg hover:bg-opacity-90 transition-all font-medium"
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
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-portfolio-border text-portfolio-text rounded-lg hover:border-portfolio-silver hover:bg-portfolio-surface transition-all font-medium"
              >
                <Github size={20} />
                <span>GitHub</span>
              </a>
            )}
          </div>
        </div>

        {/* Metadata Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <ProjectMetadata
            category={project.category}
            createdAt={project.createdAt}
            lastUpdated={project.lastUpdated}
            autoFetched={project.autoFetched}
          />
          <GitHubStats
            stars={project.githubStars}
            forks={project.githubForks}
            primaryLanguage={project.primaryLanguage}
            languages={project.languages}
            lastUpdated={project.lastUpdated}
            repositoryUrl={project.repositoryUrl}
          />
        </div>

        {/* Video Demo */}
        {project.videoUrl && (
          <section className="mb-12">
            <h2 className="text-xl md:text-2xl font-medium text-portfolio-text mb-4">
              Video Demo
            </h2>
            <div className="w-12 h-0.5 bg-portfolio-silver mb-6" />
            <VideoEmbed videoUrl={project.videoUrl} title={project.title} />
          </section>
        )}

        {/* Overview */}
        <section className="mb-12">
          <h2 className="text-xl md:text-2xl font-medium text-portfolio-text mb-4">
            Overview
          </h2>
          <div className="w-12 h-0.5 bg-portfolio-silver mb-6" />
          <p className="text-portfolio-text leading-relaxed text-base md:text-lg">
            {project.fullDescription}
          </p>
        </section>

        {/* The Challenge */}
        {project.problem && (
          <section className="mb-12">
            <h2 className="text-xl md:text-2xl font-medium text-portfolio-text mb-4">
              The Challenge
            </h2>
            <div className="w-12 h-0.5 bg-portfolio-silver mb-6" />
            <p className="text-portfolio-text leading-relaxed text-base md:text-lg">
              {project.problem}
            </p>
          </section>
        )}

        {/* The Solution */}
        {project.solution && (
          <section className="mb-12">
            <h2 className="text-xl md:text-2xl font-medium text-portfolio-text mb-4">
              The Solution
            </h2>
            <div className="w-12 h-0.5 bg-portfolio-silver mb-6" />
            <p className="text-portfolio-text leading-relaxed text-base md:text-lg">
              {project.solution}
            </p>
          </section>
        )}

        {/* Impact */}
        {project.impact && (
          <section className="mb-12">
            <h2 className="text-xl md:text-2xl font-medium text-portfolio-text mb-4">
              Impact
            </h2>
            <div className="w-12 h-0.5 bg-portfolio-silver mb-6" />
            <p className="text-portfolio-text leading-relaxed text-base md:text-lg">
              {project.impact}
            </p>
          </section>
        )}

        {/* Image Gallery */}
        {project.images && project.images.length > 1 && (
          <section className="mb-12">
            <h2 className="text-xl md:text-2xl font-medium text-portfolio-text mb-4">
              Gallery
            </h2>
            <div className="w-12 h-0.5 bg-portfolio-silver mb-6" />
            <ImageGallery images={project.images} projectTitle={project.title} />
          </section>
        )}

        {/* Testimonial */}
        {project.testimonial && (
          <section className="mb-12">
            <h2 className="text-xl md:text-2xl font-medium text-portfolio-text mb-4">
              Testimonial
            </h2>
            <div className="w-12 h-0.5 bg-portfolio-silver mb-6" />
            <div className="border border-portfolio-border rounded-lg p-8 bg-portfolio-surface">
              <p className="text-base md:text-lg text-portfolio-text italic mb-4">
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
