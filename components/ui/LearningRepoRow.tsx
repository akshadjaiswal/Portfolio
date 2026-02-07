'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Star, Github } from 'lucide-react';
import { LearningRepo } from '@/lib/types';
import { ANIMATION_CONFIG } from '@/lib/constants';

interface LearningRepoRowProps {
  repo: LearningRepo;
  index: number;
}

export default function LearningRepoRow({ repo, index }: LearningRepoRowProps) {
  return (
    <motion.a
      href={repo.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: ANIMATION_CONFIG.fadeInDuration,
        ease: ANIMATION_CONFIG.easing,
        delay: index * 0.1,
      }}
      className="group flex items-center gap-4 p-4 rounded-lg hover:bg-portfolio-light-surface dark:bg-portfolio-surface/20 transition-all duration-200"
    >
      {/* GitHub Logo */}
      <div className="flex-shrink-0">
        <Github size={24} className="text-portfolio-light-accent dark:text-portfolio-silver" />
      </div>

      {/* Repo Info */}
      <div className="flex-1 min-w-0">
        <h3 className="text-base font-medium text-portfolio-light-text dark:text-portfolio-text group-hover:text-portfolio-light-accent dark:text-portfolio-silver transition-colors">
          {repo.name}
        </h3>
        <p className="text-sm text-portfolio-muted mt-0.5 line-clamp-1">
          {repo.description}
        </p>
      </div>

      {/* Stars */}
      {repo.stars !== undefined && repo.stars > 0 && (
        <div className="flex items-center gap-1.5 text-portfolio-muted flex-shrink-0">
          <Star size={16} className="fill-current" />
          <span className="text-sm font-medium">{repo.stars}</span>
        </div>
      )}

      {/* External Link Icon */}
      <div className="flex-shrink-0">
        <ExternalLink
          size={18}
          className="text-portfolio-muted group-hover:text-portfolio-light-accent dark:text-portfolio-silver transition-colors"
        />
      </div>
    </motion.a>
  );
}
