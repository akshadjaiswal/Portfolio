'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
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
        <div className="relative h-48 overflow-hidden bg-portfolio-surface">
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <span className="text-white font-medium text-sm">View Project</span>
          </div>
        </div>
      </Link>

      {/* Content */}
      <div className="p-4">
        <Link href={`/projects/${project.slug}`}>
          <h3 className="text-lg font-medium text-portfolio-text mb-1.5 group-hover:text-portfolio-silver transition-colors">
            {project.title}
          </h3>
        </Link>
        <p className="text-xs text-portfolio-muted mb-3">
          {project.tagline}
        </p>
        <p className="text-sm text-portfolio-text mb-3 leading-relaxed line-clamp-2">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 bg-portfolio-surface border border-portfolio-border rounded text-xs text-portfolio-text font-mono"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="px-2 py-0.5 text-xs text-portfolio-muted">
              +{project.technologies.length - 4} more
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
