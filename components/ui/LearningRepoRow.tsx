'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Star, Github, Globe } from 'lucide-react';
import { LearningRepo } from '@/lib/types';
import { ANIMATION_CONFIG } from '@/lib/constants';
import { AnimatedCounter } from './AnimatedCounter';

interface LearningRepoRowProps {
  repo: LearningRepo;
  index: number;
}

export default function LearningRepoRow({ repo, index }: LearningRepoRowProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: ANIMATION_CONFIG.fadeInDuration,
        ease: ANIMATION_CONFIG.easing,
        delay: index * 0.1,
      }}
      className="group relative flex items-start gap-4 p-4 rounded-lg hover:bg-portfolio-light-surface dark:bg-portfolio-surface/20 transition-all duration-200"
    >
      {/* === MOBILE LAYOUT (hidden on sm+) === */}
      <div className="flex flex-1 min-w-0 items-start gap-4 sm:hidden">
        {/* GitHub icon aligned to top of text */}
        <div className="flex-shrink-0 pt-0.5">
          <Github size={24} className="text-portfolio-light-accent dark:text-portfolio-silver" />
        </div>

        {/* Right column: name/description top, stars + live app below */}
        <div className="flex-1 min-w-0">
          {/* Top row: repo name + description */}
          <a
            href={repo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block min-w-0 pr-6"
          >
            <h3 className="text-base font-medium text-portfolio-light-text dark:text-portfolio-text group-hover:text-portfolio-light-accent dark:group-hover:text-portfolio-silver transition-colors truncate">
              {repo.name}
            </h3>
            <p className="text-sm text-portfolio-muted mt-0.5 line-clamp-1">
              {repo.description}
            </p>
          </a>

          {/* Second row: stars + Live App */}
          {((repo.stars !== undefined && repo.stars > 0) || repo.appUrl) && (
            <div className="flex items-center gap-3 mt-2">
              {repo.stars !== undefined && repo.stars > 0 && (
                <div className="flex items-center gap-1.5 text-portfolio-light-accent dark:text-portfolio-silver">
                  <Star size={14} className="fill-current" />
                  <AnimatedCounter end={repo.stars} duration={1500} className="text-sm font-medium" />
                </div>
              )}
              {repo.appUrl && (
                <a
                  href={repo.appUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open live app for ${repo.name}`}
                  className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full border border-portfolio-light-accent/40 dark:border-portfolio-silver/30 text-portfolio-light-accent dark:text-portfolio-silver hover:bg-portfolio-light-accent/10 dark:hover:bg-portfolio-silver/10 transition-colors duration-200 cursor-pointer"
                >
                  <Globe size={12} />
                  <span>Live App</span>
                </a>
              )}
            </div>
          )}
        </div>
      </div>

      {/* External link — absolute top-right on mobile */}
      <a
        href={repo.url}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={-1}
        aria-hidden="true"
        className="absolute top-4 right-4 sm:hidden"
      >
        <ExternalLink
          size={18}
          className="text-portfolio-light-text/60 dark:text-portfolio-muted group-hover:text-portfolio-light-accent dark:group-hover:text-portfolio-silver transition-colors"
        />
      </a>

      {/* === DESKTOP LAYOUT (hidden below sm) — original single-row === */}
      <a
        href={repo.url}
        target="_blank"
        rel="noopener noreferrer"
        className="hidden sm:flex items-center gap-4 flex-1 min-w-0"
      >
        <div className="flex-shrink-0">
          <Github size={24} className="text-portfolio-light-accent dark:text-portfolio-silver" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-medium text-portfolio-light-text dark:text-portfolio-text group-hover:text-portfolio-light-accent dark:group-hover:text-portfolio-silver transition-colors">
            {repo.name}
          </h3>
          <p className="text-sm text-portfolio-muted mt-0.5 line-clamp-1">
            {repo.description}
          </p>
        </div>
      </a>

      {repo.stars !== undefined && repo.stars > 0 && (
        <div className="hidden sm:flex items-center gap-1.5 text-portfolio-light-accent dark:text-portfolio-silver flex-shrink-0">
          <Star size={16} className="fill-current" />
          <AnimatedCounter end={repo.stars} duration={1500} className="text-sm font-medium" />
        </div>
      )}

      {repo.appUrl && (
        <a
          href={repo.appUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open live app for ${repo.name}`}
          className="hidden sm:flex flex-shrink-0 items-center gap-1 text-xs px-2.5 py-1 rounded-full border border-portfolio-light-accent/40 dark:border-portfolio-silver/30 text-portfolio-light-accent dark:text-portfolio-silver hover:bg-portfolio-light-accent/10 dark:hover:bg-portfolio-silver/10 transition-colors duration-200 cursor-pointer"
        >
          <Globe size={12} />
          <span>Live App</span>
        </a>
      )}

      <a
        href={repo.url}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={-1}
        aria-hidden="true"
        className="hidden sm:flex flex-shrink-0"
      >
        <ExternalLink
          size={18}
          className="text-portfolio-light-text/60 dark:text-portfolio-muted group-hover:text-portfolio-light-accent dark:group-hover:text-portfolio-silver transition-colors"
        />
      </a>
    </motion.div>
  );
}
