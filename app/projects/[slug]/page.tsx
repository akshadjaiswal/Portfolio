"use client";

import { notFound, useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import Container from "@/components/ui/Container";
import ProjectMetadata from "@/components/ui/ProjectMetadata";
import VideoEmbed from "@/components/ui/VideoEmbed";
import ImageGallery from "@/components/ui/ImageGallery";
import { Project } from "@/lib/types";

async function fetchProjectBySlug(slug: string): Promise<Project> {
  const response = await fetch(`/api/github/projects?slug=${slug}`);
  if (!response.ok) {
    throw new Error("Project not found");
  }
  return response.json();
}

export default function ProjectDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const {
    data: project,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["project", slug],
    queryFn: () => fetchProjectBySlug(slug),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  if (isLoading) {
    return (
      <main className="min-h-screen bg-portfolio-light-bg dark:bg-portfolio-bg py-16">
        <Container>
          <div className="animate-pulse">
            <div className="h-8 w-32 bg-portfolio-surface rounded mb-12" />
            <div className="aspect-video bg-portfolio-surface rounded-lg mb-8" />
            <div className="h-8 w-3/4 bg-portfolio-surface rounded mb-4" />
            <div className="h-6 w-1/2 bg-portfolio-surface rounded mb-6" />
          </div>
        </Container>
      </main>
    );
  }

  if (error || !project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-portfolio-light-bg dark:bg-portfolio-bg py-16">
      <Container>
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-portfolio-silver hover:text-portfolio-light-text dark:text-portfolio-text transition-colors mb-12"
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
          <h1 className="text-2xl md:text-3xl font-medium text-portfolio-light-text dark:text-portfolio-text mb-3">
            {project.title}
          </h1>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-portfolio-surface border border-portfolio-light-border dark:border-portfolio-border rounded-full text-sm text-portfolio-light-text dark:text-portfolio-text font-mono"
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
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-portfolio-light-border dark:border-portfolio-border text-portfolio-light-text dark:text-portfolio-text rounded-lg hover:border-portfolio-silver hover:bg-portfolio-surface transition-all font-medium"
              >
                <Github size={20} />
                <span>GitHub</span>
              </a>
            )}
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-xl md:text-2xl font-medium text-portfolio-light-text dark:text-portfolio-text mb-4">
            Overview
          </h2>
          <div className="w-12 h-0.5 bg-portfolio-silver mb-6" />
          <p className="text-portfolio-light-text dark:text-portfolio-text leading-relaxed text-base md:text-lg whitespace-pre-wrap">
            {project.tagline}
          </p>
        </section>
        {/* Metadata Card */}
        <div className="mb-12">
          <ProjectMetadata
            category={project.category}
            createdAt={project.createdAt}
            lastUpdated={project.lastUpdated}
            autoFetched={project.autoFetched}
          />
        </div>

        {/* Video Demo */}
        {project.videoUrl && (
          <section className="mb-12">
            <h2 className="text-xl md:text-2xl font-medium text-portfolio-light-text dark:text-portfolio-text mb-4">
              Video Demo
            </h2>
            <div className="w-12 h-0.5 bg-portfolio-silver mb-6" />
            <VideoEmbed videoUrl={project.videoUrl} title={project.title} />
          </section>
        )}

        {/* The Challenge */}
        {project.problem && (
          <section className="mb-12">
            <h2 className="text-xl md:text-2xl font-medium text-portfolio-light-text dark:text-portfolio-text mb-4">
              The Challenge
            </h2>
            <div className="w-12 h-0.5 bg-portfolio-silver mb-6" />
            <p className="text-portfolio-light-text dark:text-portfolio-text leading-relaxed text-base md:text-lg">
              {project.problem}
            </p>
          </section>
        )}

        {/* The Solution */}
        {project.solution && (
          <section className="mb-12">
            <h2 className="text-xl md:text-2xl font-medium text-portfolio-light-text dark:text-portfolio-text mb-4">
              The Solution
            </h2>
            <div className="w-12 h-0.5 bg-portfolio-silver mb-6" />
            <p className="text-portfolio-light-text dark:text-portfolio-text leading-relaxed text-base md:text-lg">
              {project.solution}
            </p>
          </section>
        )}

        {/* Impact */}
        {project.impact && (
          <section className="mb-12">
            <h2 className="text-xl md:text-2xl font-medium text-portfolio-light-text dark:text-portfolio-text mb-4">
              Impact
            </h2>
            <div className="w-12 h-0.5 bg-portfolio-silver mb-6" />
            <p className="text-portfolio-light-text dark:text-portfolio-text leading-relaxed text-base md:text-lg">
              {project.impact}
            </p>
          </section>
        )}

        {/* Image Gallery */}
        {project.images && project.images.length > 1 && (
          <section className="mb-12">
            <h2 className="text-xl md:text-2xl font-medium text-portfolio-light-text dark:text-portfolio-text mb-4">
              Gallery
            </h2>
            <div className="w-12 h-0.5 bg-portfolio-silver mb-6" />
            <ImageGallery
              images={project.images}
              projectTitle={project.title}
            />
          </section>
        )}

        {/* Testimonial */}
        {project.testimonial && (
          <section className="mb-12">
            <h2 className="text-xl md:text-2xl font-medium text-portfolio-light-text dark:text-portfolio-text mb-4">
              Testimonial
            </h2>
            <div className="w-12 h-0.5 bg-portfolio-silver mb-6" />
            <div className="border border-portfolio-light-border dark:border-portfolio-border rounded-lg p-8 bg-portfolio-surface">
              <p className="text-base md:text-lg text-portfolio-light-text dark:text-portfolio-text italic mb-4">
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
