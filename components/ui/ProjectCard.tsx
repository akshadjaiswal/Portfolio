'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, Star, GitFork } from 'lucide-react';
import { Project } from '@/lib/types';
import { ANIMATION_CONFIG } from '@/lib/constants';
import ProjectBadge from './ProjectBadge';

interface ProjectCardProps {
  project: Project;
  variant?: 'default' | 'featured';
}

export default function ProjectCard({ project, variant = 'default' }: ProjectCardProps) {
  const isFeatured = variant === 'featured';
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: ANIMATION_CONFIG.fadeInDuration,
        ease: ANIMATION_CONFIG.easing,
      }}
      whileHover={{ scale: 1.02, y: -4 }}
      className={`rounded-lg overflow-hidden transition-all duration-300 group bg-portfolio-light-surface dark:bg-transparent shadow-card dark:shadow-dark-card hover:shadow-card-hover dark:hover:shadow-dark-card-hover active:scale-[0.98] ${
        isFeatured
          ? 'border-2 border-transparent bg-gradient-to-r from-portfolio-accent-primary/20 to-portfolio-accent-secondary/20 p-[2px] hover:from-portfolio-accent-primary/40 hover:to-portfolio-accent-secondary/40'
          : 'border border-portfolio-light-border dark:border-portfolio-border hover:border-portfolio-light-accent dark:hover:border-portfolio-silver'
      }`}
    >
      {/* Thumbnail with Overlay */}
      <Link href={`/projects/${project.slug}`}>
        <div className="relative h-48 overflow-hidden bg-portfolio-light-surface dark:bg-portfolio-surface">
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <span className="text-white font-medium text-sm">View Project</span>
          </div>

          {/* Badges */}
          <div className="absolute top-3 right-3 z-10 flex gap-2">
            {project.freshBuild && (
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-portfolio-light-surface/90 dark:bg-portfolio-surface/90 backdrop-blur-sm border border-portfolio-light-border dark:border-portfolio-border rounded-full text-xs text-portfolio-light-accent dark:text-portfolio-silver">
                <Sparkles size={12} className="text-portfolio-light-accent dark:text-portfolio-silver" />
                <span>Fresh Build</span>
              </div>
            )}
            {project.complexity && (
              <ProjectBadge variant="complexity" value={project.complexity} />
            )}
          </div>
        </div>
      </Link>

      {/* Content */}
      <div className="p-4">
        <Link href={`/projects/${project.slug}`}>
          <h3 className="text-lg font-normal text-portfolio-light-text dark:text-portfolio-text mb-1.5 group-hover:text-portfolio-light-accent dark:group-hover:text-portfolio-silver transition-colors">
            {project.title}
          </h3>
        </Link>
        <p className="text-xs text-portfolio-muted mb-3">
          {project.tagline}
        </p>
        <p className={`text-sm text-portfolio-light-text dark:text-portfolio-text mb-3 leading-relaxed ${isFeatured ? 'line-clamp-3' : 'line-clamp-2'}`}>
          {project.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {project.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 bg-portfolio-light-surface dark:bg-portfolio-surface border border-portfolio-light-border dark:border-portfolio-border rounded text-xs text-portfolio-light-text dark:text-portfolio-text font-mono tracking-wider uppercase"
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

        {/* GitHub Stats */}
        {(isFeatured || project.githubStats || project.githubStars !== undefined) && (
          <div className="flex items-center gap-4 text-sm text-portfolio-muted pt-3 border-t border-portfolio-light-border dark:border-portfolio-border">
            {(project.githubStats?.stars || project.githubStars !== undefined) && (
              <span className="flex items-center gap-1">
                <Star className="w-4 h-4" />
                {project.githubStats?.stars || project.githubStars || 0}
              </span>
            )}
            {(project.githubStats?.forks || project.githubForks !== undefined) && (
              <span className="flex items-center gap-1">
                <GitFork className="w-4 h-4" />
                {project.githubStats?.forks || project.githubForks || 0}
              </span>
            )}
            {(project.githubStats?.language || project.primaryLanguage) && (
              <span className="text-xs">
                {project.githubStats?.language || project.primaryLanguage}
              </span>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
