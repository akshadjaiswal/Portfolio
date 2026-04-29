'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { Experience } from '@/lib/types';
import { ANIMATION_CONFIG } from '@/lib/constants';

interface ExperienceCardProps {
  experience: Experience;
  isExpanded: boolean;
  onToggle: () => void;
}

export default function ExperienceCard({ experience, isExpanded, onToggle }: ExperienceCardProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onToggle();
    }
  };

  const startYear = experience.startDate ? new Date(experience.startDate).getFullYear() : '';
  const startMonth = experience.startDate
    ? new Date(experience.startDate).toLocaleString('default', { month: 'short' })
    : '';
  const endYear = experience.endDate ? new Date(experience.endDate).getFullYear() : 'Present';
  const endMonth = experience.endDate
    ? new Date(experience.endDate).toLocaleString('default', { month: 'short' })
    : '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: ANIMATION_CONFIG.fadeInDuration, ease: ANIMATION_CONFIG.easing }}
      className="border-b border-portfolio-light-border/50 dark:border-portfolio-border/30 last:border-b-0"
    >
      <div
        onClick={onToggle}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
        aria-expanded={isExpanded}
        aria-label={`${experience.company} - ${experience.role}. ${isExpanded ? 'Collapse' : 'Expand'} details`}
        className="grid grid-cols-[100px_1fr] md:grid-cols-[130px_1fr] gap-x-6 md:gap-x-10 py-6 cursor-pointer group focus:outline-none"
      >
        {/* Left: date column */}
        <div className="pt-0.5 flex flex-col gap-0.5">
          <span className="font-mono text-xs text-portfolio-muted leading-tight">
            {startMonth} {startYear}
          </span>
          <span className="font-mono text-xs text-portfolio-muted leading-tight">
            {endMonth ? `${endMonth} ${endYear}` : endYear}
          </span>
          <span className="font-mono text-xs text-portfolio-muted/60 leading-tight mt-1">
            {experience.type}
          </span>
        </div>

        {/* Right: content column */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            {/* Logo */}
            <div className="flex-shrink-0 w-9 h-9 rounded-md overflow-hidden bg-portfolio-light-surface dark:bg-portfolio-surface border border-portfolio-light-border dark:border-portfolio-border mt-0.5">
              <Image
                src={experience.logo}
                alt={experience.logoAlt || `${experience.company} logo`}
                width={36}
                height={36}
                className="object-contain p-1.5"
              />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <h3 className="text-sm font-medium text-portfolio-light-text dark:text-portfolio-text group-hover:text-portfolio-light-accent dark:group-hover:text-portfolio-silver transition-colors">
                  {experience.companyUrl ? (
                    <a
                      href={experience.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1 hover:text-portfolio-light-accent dark:hover:text-portfolio-silver transition-colors"
                    >
                      {experience.company}
                      <ExternalLink size={12} className="opacity-60" />
                    </a>
                  ) : (
                    experience.company
                  )}
                </h3>
                <span className="text-portfolio-muted/40 text-xs">·</span>
                <span className="text-xs text-portfolio-muted">{experience.location}</span>
              </div>
              <p className="text-sm text-portfolio-light-accent dark:text-portfolio-silver mt-0.5">
                {experience.role}
              </p>
            </div>
          </div>

          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="flex-shrink-0 text-portfolio-muted mt-1"
          >
            <ChevronDown size={16} />
          </motion.div>
        </div>
      </div>

      {/* Expanded content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: ANIMATION_CONFIG.easing, opacity: { duration: 0.2 } }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-[100px_1fr] md:grid-cols-[130px_1fr] gap-x-6 md:gap-x-10 pb-6">
              <div />
              <div className="space-y-5">
                {experience.description && (
                  <p className="text-sm text-portfolio-muted leading-relaxed">
                    {experience.description}
                  </p>
                )}

                {!!experience.achievements?.length && (
                  <ul className="space-y-2">
                    {experience.achievements.map((achievement, i) => (
                      <li key={i} className="text-sm text-portfolio-muted flex items-start gap-2">
                        <span className="text-portfolio-light-accent dark:text-portfolio-silver mt-0.5 flex-shrink-0">→</span>
                        <span className="flex-1">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {!!experience.technologies?.length && (
                  <div className="flex flex-wrap gap-1.5">
                    {experience.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 bg-portfolio-light-surface dark:bg-portfolio-surface border border-portfolio-light-border dark:border-portfolio-border rounded-full text-xs text-portfolio-light-text dark:text-portfolio-text font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
