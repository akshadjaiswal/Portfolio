'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, ChevronDown, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { Experience, Position } from '@/lib/types';
import { ANIMATION_CONFIG } from '@/lib/constants';

interface CompanyExperienceGroupProps {
  experience: Experience;
  isExpanded: boolean;
  onToggle: () => void;
}

interface PositionCardProps {
  position: Position;
  companyName: string;
  isExpanded: boolean;
  onToggle: () => void;
}

function PositionCard({ position, companyName, isExpanded, onToggle }: PositionCardProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onToggle();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: ANIMATION_CONFIG.fadeInDuration,
        ease: ANIMATION_CONFIG.easing,
      }}
      onClick={onToggle}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-expanded={isExpanded}
      aria-label={`${companyName} - ${position.role}. ${isExpanded ? 'Collapse' : 'Expand'} details`}
      className="rounded-lg cursor-pointer bg-transparent hover:bg-portfolio-light-surface dark:bg-portfolio-surface/20 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-portfolio-silver focus:ring-offset-2 focus:ring-offset-portfolio-bg ml-4 md:ml-6"
    >
      {/* Collapsed State Content */}
      <div className="p-3 sm:p-4">
        <div className="flex items-start gap-3 sm:gap-4">
          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4">
              {/* Left: Role */}
              <div className="flex-1 min-w-0">
                <h3 className="text-base sm:text-lg font-medium text-portfolio-light-text dark:text-portfolio-text">
                  {position.role}
                </h3>
                <p className="text-sm text-portfolio-muted mt-0.5">
                  {position.type}
                </p>
              </div>

              {/* Right: Date */}
              <div className="text-left sm:text-right flex-shrink-0">
                <p className="text-xs sm:text-sm text-portfolio-light-text dark:text-portfolio-text font-medium">
                  {position.duration}
                </p>
              </div>
            </div>
          </div>

          {/* Chevron Icon */}
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="flex-shrink-0 text-portfolio-muted"
          >
            <ChevronDown size={18} />
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
            <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-2">
              {/* Achievements */}
              {position.achievements.length > 0 && (
                <div className="mb-5">
                  <ul className="space-y-2">
                    {position.achievements.map((achievement, index) => (
                      <li
                        key={index}
                        className="text-sm text-portfolio-muted flex items-start gap-2"
                      >
                        <span className="text-portfolio-light-accent dark:text-portfolio-silver mt-0.5">→</span>
                        <span className="flex-1">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Technologies */}
              {position.technologies.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-portfolio-light-accent dark:text-portfolio-silver mb-3">
                    Technologies
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {position.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 bg-portfolio-light-surface dark:bg-portfolio-surface border border-portfolio-light-border dark:border-portfolio-border rounded-full text-xs text-portfolio-light-text dark:text-portfolio-text font-mono"
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

export default function CompanyExperienceGroup({ experience, isExpanded, onToggle }: CompanyExperienceGroupProps) {
  const [expandedPositionId, setExpandedPositionId] = useState<string | null>(null);

  if (!experience.positions || experience.positions.length === 0) {
    return null;
  }

  const handlePositionToggle = (positionId: string) => {
    setExpandedPositionId(expandedPositionId === positionId ? null : positionId);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onToggle();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: ANIMATION_CONFIG.fadeInDuration,
        ease: ANIMATION_CONFIG.easing,
      }}
      className="rounded-lg bg-transparent p-3 sm:p-4 space-y-4"
    >
      {/* Company Header - Clickable */}
      <div
        className="flex items-start gap-3 sm:gap-4 cursor-pointer hover:bg-portfolio-light-surface dark:bg-portfolio-surface/10 p-2 -m-2 rounded-lg transition-colors"
        onClick={onToggle}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
        aria-expanded={isExpanded}
        aria-label={`${experience.company}. ${isExpanded ? 'Collapse' : 'Expand'} positions`}
      >
        {/* Company Logo */}
        <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-md overflow-hidden bg-portfolio-light-surface dark:bg-portfolio-surface border border-portfolio-light-border dark:border-portfolio-border">
          <Image
            src={experience.logo}
            alt={experience.logoAlt || `${experience.company} logo`}
            width={56}
            height={56}
            className="object-contain p-2"
          />
        </div>

        {/* Company Info */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 sm:gap-4">
            {/* Company Name */}
            <div className="flex-1 min-w-0">
              <h2 className="text-lg sm:text-xl font-medium text-portfolio-light-text dark:text-portfolio-text">
                {experience.companyUrl ? (
                  <a
                    href={experience.companyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-portfolio-light-accent dark:text-portfolio-silver transition-colors inline-flex items-center gap-1.5"
                  >
                    {experience.company}
                    <ExternalLink size={16} />
                  </a>
                ) : (
                  experience.company
                )}
              </h2>
              <div className="flex items-center gap-1.5 text-xs sm:text-sm text-portfolio-muted mt-1">
                <span>{experience.location}</span>
                <span>•</span>
                <span>On-site</span>
              </div>
            </div>

            {/* Total Duration */}
            {experience.totalDuration && (
              <div className="text-left sm:text-right flex-shrink-0">
                <p className="text-sm font-medium text-portfolio-light-text dark:text-portfolio-text">
                  {experience.totalDuration}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Chevron Icon */}
        <motion.div
          animate={{ rotate: isExpanded ? 90 : 0 }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
          className="flex-shrink-0 text-portfolio-muted"
        >
          <ChevronRight size={20} />
        </motion.div>
      </div>

      {/* Position Cards */}
      {isExpanded && (
        <div className="space-y-3 pt-2">
          {experience.positions.map((position) => (
            <PositionCard
              key={position.id}
              position={position}
              companyName={experience.company}
              isExpanded={expandedPositionId === position.id}
              onToggle={() => handlePositionToggle(position.id)}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}
