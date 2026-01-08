'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { Experience } from '@/lib/types';
import { ANIMATION_CONFIG } from '@/lib/constants';

interface ExperienceCardProps {
  experience: Experience;
}

export default function ExperienceCard({ experience }: ExperienceCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleExpand();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: ANIMATION_CONFIG.fadeInDuration,
        ease: ANIMATION_CONFIG.easing,
      }}
      onClick={toggleExpand}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-expanded={isExpanded}
      aria-label={`${experience.company} - ${experience.role}. ${isExpanded ? 'Collapse' : 'Expand'} details`}
      className="rounded-lg cursor-pointer bg-portfolio-surface/30 hover:bg-portfolio-surface/50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-portfolio-silver focus:ring-offset-2 focus:ring-offset-portfolio-bg"
    >
      {/* Collapsed State Content */}
      <div className="p-4 sm:p-6">
        <div className="flex items-start gap-3 sm:gap-4">
          {/* Company Logo */}
          <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-md overflow-hidden bg-portfolio-surface border border-portfolio-border">
            <Image
              src={experience.logo}
              alt={experience.logoAlt || `${experience.company} logo`}
              width={48}
              height={48}
              className="object-contain p-2"
            />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4">
              {/* Left: Company & Role */}
              <div className="flex-1 min-w-0">
                <h3 className="text-base sm:text-lg font-medium text-portfolio-text truncate">
                  {experience.companyUrl ? (
                    <a
                      href={experience.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="hover:text-portfolio-silver transition-colors inline-flex items-center gap-1"
                    >
                      {experience.company}
                      <ExternalLink size={14} />
                    </a>
                  ) : (
                    experience.company
                  )}
                </h3>
                <p className="text-sm sm:text-base text-portfolio-silver mt-0.5">
                  {experience.role}
                </p>
              </div>

              {/* Right: Date & Meta */}
              <div className="text-left sm:text-right flex-shrink-0">
                <p className="text-xs sm:text-sm text-portfolio-text font-medium">
                  {experience.duration}
                </p>
                <div className="flex items-center gap-1.5 text-xs text-portfolio-muted mt-0.5 sm:justify-end">
                  <span>{experience.location}</span>
                  <span>•</span>
                  <span>{experience.type}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Chevron Icon */}
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="flex-shrink-0 text-portfolio-muted"
          >
            <ChevronDown size={20} />
          </motion.div>
        </div>
      </div>

      {/* Expanded State Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              duration: 0.3,
              ease: ANIMATION_CONFIG.easing,
              opacity: { duration: 0.2 },
            }}
            className="overflow-hidden"
          >
            <div className="px-4 sm:px-6 pb-4 sm:pb-6 pt-4">
              {/* Description */}
              <p className="text-portfolio-text leading-relaxed mb-6">
                {experience.description}
              </p>

              {/* Achievements */}
              {!!experience.achievements?.length && (
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-portfolio-silver mb-3">
                    Key Achievements
                  </h4>
                  <ul className="space-y-2">
                    {experience.achievements?.map((achievement, index) => (
                      <li
                        key={index}
                        className="text-sm text-portfolio-muted flex items-start gap-2"
                      >
                        <span className="text-portfolio-silver mt-0.5">→</span>
                        <span className="flex-1">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Technologies */}
              {!!experience.technologies?.length && (
                <div>
                  <h4 className="text-sm font-medium text-portfolio-silver mb-3">
                    Technologies
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {experience.technologies?.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 bg-portfolio-surface border border-portfolio-border rounded-full text-xs text-portfolio-text font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
