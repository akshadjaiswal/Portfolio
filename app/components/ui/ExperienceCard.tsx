'use client';

import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { Experience } from '@/lib/types';
import { ANIMATION_CONFIG } from '@/lib/constants';

interface ExperienceCardProps {
  experience: Experience;
}

export default function ExperienceCard({ experience }: ExperienceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: ANIMATION_CONFIG.fadeInDuration,
        ease: ANIMATION_CONFIG.easing,
      }}
      whileHover={{ y: -4 }}
      className="border border-portfolio-border rounded-lg p-6 hover:border-portfolio-silver hover:bg-portfolio-surface transition-all duration-300"
    >
      {/* Header */}
      <div className="mb-4">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="text-xl font-medium text-portfolio-text flex items-center gap-2">
              {experience.companyUrl ? (
                <a
                  href={experience.companyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-portfolio-silver transition-colors flex items-center gap-2"
                >
                  {experience.company}
                  <ExternalLink size={16} />
                </a>
              ) : (
                experience.company
              )}
            </h3>
            <p className="text-base text-portfolio-silver">{experience.role}</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-sm text-portfolio-muted">
          <span>{experience.duration}</span>
          <span>•</span>
          <span>{experience.location}</span>
          <span>•</span>
          <span>{experience.type}</span>
        </div>
      </div>

      {/* Description */}
      <p className="text-portfolio-text mb-4 leading-relaxed">
        {experience.description}
      </p>

      {/* Achievements */}
      <ul className="space-y-2 mb-4">
        {experience.achievements.map((achievement, index) => (
          <li key={index} className="text-sm text-portfolio-muted flex items-start">
            <span className="text-portfolio-silver mr-2">→</span>
            {achievement}
          </li>
        ))}
      </ul>

      {/* Technologies */}
      <div className="flex flex-wrap gap-2">
        {experience.technologies.map((tech) => (
          <span
            key={tech}
            className="px-3 py-1 bg-portfolio-surface border border-portfolio-border rounded-full text-xs text-portfolio-text font-mono"
          >
            {tech}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
