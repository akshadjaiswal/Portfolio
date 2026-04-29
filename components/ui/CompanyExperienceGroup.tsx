'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { Experience, Position } from '@/lib/types';
import { ANIMATION_CONFIG } from '@/lib/constants';

interface CompanyExperienceGroupProps {
  experience: Experience;
  isExpanded: boolean;
  onToggle: () => void;
}

interface PositionRowProps {
  position: Position;
  companyName: string;
  isExpanded: boolean;
  onToggle: () => void;
}

function PositionRow({ position, companyName, isExpanded, onToggle }: PositionRowProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onToggle();
    }
  };

  const startYear = position.startDate ? new Date(position.startDate).getFullYear() : '';
  const startMonth = position.startDate
    ? new Date(position.startDate).toLocaleString('default', { month: 'short' })
    : '';
  const endYear = position.endDate ? new Date(position.endDate).getFullYear() : 'Present';
  const endMonth = position.endDate
    ? new Date(position.endDate).toLocaleString('default', { month: 'short' })
    : '';

  return (
    <div className="border-t border-portfolio-light-border/30 dark:border-portfolio-border/20">
      <div
        onClick={onToggle}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
        aria-expanded={isExpanded}
        aria-label={`${companyName} - ${position.role}. ${isExpanded ? 'Collapse' : 'Expand'} details`}
        className="grid grid-cols-[100px_1fr] md:grid-cols-[130px_1fr] gap-x-6 md:gap-x-10 py-4 cursor-pointer group focus:outline-none"
      >
        {/* Left: date */}
        <div className="pt-0.5 flex flex-col gap-0.5">
          <span className="font-mono text-xs text-portfolio-muted leading-tight">
            {startMonth} {startYear}
          </span>
          <span className="font-mono text-xs text-portfolio-muted leading-tight">
            {endMonth ? `${endMonth} ${endYear}` : endYear}
          </span>
          <span className="font-mono text-xs text-portfolio-muted/60 leading-tight mt-1">
            {position.type}
          </span>
        </div>

        {/* Right: role */}
        <div className="flex items-start justify-between gap-4 pl-4 border-l-2 border-portfolio-light-border/40 dark:border-portfolio-border/30">
          <div className="flex-1 min-w-0">
            <p className="text-sm text-portfolio-light-accent dark:text-portfolio-silver font-medium group-hover:opacity-80 transition-opacity">
              {position.role}
            </p>
          </div>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="flex-shrink-0 text-portfolio-muted mt-0.5"
          >
            <ChevronDown size={14} />
          </motion.div>
        </div>
      </div>

      {/* Expanded */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: ANIMATION_CONFIG.easing, opacity: { duration: 0.2 } }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-[100px_1fr] md:grid-cols-[130px_1fr] gap-x-6 md:gap-x-10 pb-4">
              <div />
              <div className="pl-4 border-l-2 border-portfolio-light-border/40 dark:border-portfolio-border/30 space-y-4">
                {position.achievements.length > 0 && (
                  <ul className="space-y-2">
                    {position.achievements.map((achievement, i) => (
                      <li key={i} className="text-sm text-portfolio-muted flex items-start gap-2">
                        <span className="text-portfolio-light-accent dark:text-portfolio-silver mt-0.5 flex-shrink-0">→</span>
                        <span className="flex-1">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {position.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {position.technologies.map((tech) => (
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
    </div>
  );
}

export default function CompanyExperienceGroup({ experience, isExpanded, onToggle }: CompanyExperienceGroupProps) {
  const [expandedPositionId, setExpandedPositionId] = useState<string | null>(null);

  if (!experience.positions || experience.positions.length === 0) return null;

  const handlePositionToggle = (positionId: string) => {
    setExpandedPositionId(expandedPositionId === positionId ? null : positionId);
  };

  const firstPos = experience.positions[0];
  const lastPos = experience.positions[experience.positions.length - 1];
  const startYear = lastPos.startDate ? new Date(lastPos.startDate).getFullYear() : '';
  const startMonth = lastPos.startDate
    ? new Date(lastPos.startDate).toLocaleString('default', { month: 'short' })
    : '';
  const endYear = firstPos.endDate ? new Date(firstPos.endDate).getFullYear() : 'Present';
  const endMonth = firstPos.endDate
    ? new Date(firstPos.endDate).toLocaleString('default', { month: 'short' })
    : '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: ANIMATION_CONFIG.fadeInDuration, ease: ANIMATION_CONFIG.easing }}
      className="border-b border-portfolio-light-border/50 dark:border-portfolio-border/30 last:border-b-0"
    >
      {/* Company header row */}
      <div
        onClick={onToggle}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onToggle(); }
        }}
        role="button"
        tabIndex={0}
        aria-expanded={isExpanded}
        aria-label={`${experience.company}. ${isExpanded ? 'Collapse' : 'Expand'} positions`}
        className="grid grid-cols-[100px_1fr] md:grid-cols-[130px_1fr] gap-x-6 md:gap-x-10 py-6 cursor-pointer group focus:outline-none"
      >
        {/* Left: total date range */}
        <div className="pt-0.5 flex flex-col gap-0.5">
          <span className="font-mono text-xs text-portfolio-muted leading-tight">
            {startMonth} {startYear}
          </span>
          <span className="font-mono text-xs text-portfolio-muted leading-tight">
            {endMonth ? `${endMonth} ${endYear}` : endYear}
          </span>
          {experience.totalDuration && (
            <span className="font-mono text-xs text-portfolio-muted/60 leading-tight mt-1">
              {experience.totalDuration}
            </span>
          )}
        </div>

        {/* Right: company info */}
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
                <h2 className="text-sm font-medium text-portfolio-light-text dark:text-portfolio-text group-hover:text-portfolio-light-accent dark:group-hover:text-portfolio-silver transition-colors">
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
                </h2>
                <span className="text-portfolio-muted/40 text-xs">·</span>
                <span className="text-xs text-portfolio-muted">{experience.location}</span>
              </div>
              <p className="text-xs text-portfolio-muted mt-0.5">
                {experience.positions.length} positions
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

      {/* Position rows */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: ANIMATION_CONFIG.easing, opacity: { duration: 0.2 } }}
            className="overflow-hidden"
          >
            <div className="pb-4">
              {experience.positions.map((position) => (
                <PositionRow
                  key={position.id}
                  position={position}
                  companyName={experience.company}
                  isExpanded={expandedPositionId === position.id}
                  onToggle={() => handlePositionToggle(position.id)}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
