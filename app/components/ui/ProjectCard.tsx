'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Github } from 'lucide-react';
import { Project } from '@/lib/types';
import { ANIMATION_CONFIG } from '@/lib/constants';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: ANIMATION_CONFIG.fadeInDuration,
        ease: ANIMATION_CONFIG.easing,
      }}
      className="border border-portfolio-border rounded-lg overflow-hidden hover:border-portfolio-silver transition-all duration-300 group"
    >
      {/* Thumbnail with Overlay */}
      <Link href={`/projects/${project.slug}`}>
        <div className="relative aspect-video overflow-hidden bg-portfolio-surface">
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <span className="text-white font-medium">View Project</span>
          </div>
        </div>
      </Link>

      {/* Content */}
      <div className="p-6">
        <Link href={`/projects/${project.slug}`}>
          <h3 className="text-xl font-medium text-portfolio-text mb-2 group-hover:text-portfolio-silver transition-colors">
            {project.title}
          </h3>
        </Link>
        <p className="text-sm text-portfolio-muted mb-4">
          {project.tagline}
        </p>
        <p className="text-sm text-portfolio-text mb-4 leading-relaxed">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 bg-portfolio-surface border border-portfolio-border rounded text-xs text-portfolio-text font-mono"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="px-2 py-1 text-xs text-portfolio-muted">
              +{project.technologies.length - 4} more
            </span>
          )}
        </div>

        {/* Links */}
        <div className="flex gap-4">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm text-portfolio-silver hover:text-portfolio-text transition-colors"
            >
              <ExternalLink size={16} />
              <span>Live Demo</span>
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm text-portfolio-silver hover:text-portfolio-text transition-colors"
            >
              <Github size={16} />
              <span>GitHub</span>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
