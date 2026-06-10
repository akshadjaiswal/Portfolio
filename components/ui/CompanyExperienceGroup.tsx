'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { Experience } from '@/lib/types';
import { ANIMATION_CONFIG } from '@/lib/constants';

interface CompanyExperienceGroupProps {
  experience: Experience;
}

function formatDate(iso: string | null | undefined) {
  if (!iso) return 'Present';
  const d = new Date(iso);
  return d.toLocaleString('default', { month: 'short' }) + ' ' + d.getFullYear();
}

export default function CompanyExperienceGroup({ experience }: CompanyExperienceGroupProps) {
  const [openPos, setOpenPos] = useState<string | null>(null);

  if (!experience.positions?.length) return null;

  const firstPos = experience.positions[0];
  const lastPos  = experience.positions[experience.positions.length - 1];
  const rangeStart = formatDate(lastPos.startDate);
  const rangeEnd   = firstPos.endDate ? formatDate(firstPos.endDate) : 'Present';

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: ANIMATION_CONFIG.fadeInDuration, ease: ANIMATION_CONFIG.easing }}
      className="grid grid-cols-[72px_1fr] sm:grid-cols-[100px_1fr] md:grid-cols-[130px_1fr] gap-x-3 sm:gap-x-6 md:gap-x-10 py-7"
    >
      {/* Left: total date range */}
      <div className="pt-1 flex flex-col gap-0.5">
        <span className="font-mono text-xs text-portfolio-muted leading-tight">{rangeStart}</span>
        <span className="font-mono text-xs text-portfolio-muted leading-tight">{rangeEnd}</span>
        {experience.totalDuration && (
          <span className="font-mono text-[10px] text-portfolio-muted/50 mt-1 leading-tight">
            {experience.totalDuration}
          </span>
        )}
      </div>

      {/* Right: company header + positions */}
      <div className="space-y-4">
        {/* Company header with logo */}
        <div className="flex items-start gap-2.5">
          <div className="flex-shrink-0 w-7 h-7 rounded-md overflow-hidden border border-portfolio-light-border dark:border-portfolio-border bg-portfolio-light-surface dark:bg-portfolio-surface mt-0.5">
            <Image
              src={experience.logo}
              alt={experience.logoAlt || experience.company}
              width={28}
              height={28}
              className="object-contain p-0.5"
            />
          </div>
          <div>
            <p className="text-sm font-semibold text-portfolio-light-text dark:text-portfolio-text leading-snug">
              {experience.companyUrl ? (
                <a
                  href={experience.companyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-portfolio-light-accent dark:hover:text-portfolio-silver transition-colors"
                >
                  {experience.company}
                  <ExternalLink size={11} className="opacity-40" />
                </a>
              ) : experience.company}
            </p>
            <p className="text-xs text-portfolio-muted mt-0.5">{experience.location}</p>
          </div>
        </div>

        {/* Positions list */}
        <div className="space-y-3 pl-[1.875rem]">
          {experience.positions.map((pos) => {
            const posStart = formatDate(pos.startDate);
            const posEnd   = pos.endDate ? formatDate(pos.endDate) : 'Present';
            const isOpen   = openPos === pos.id;

            return (
              <div key={pos.id} className="space-y-0">
                {/* Position row */}
                <div className="flex items-start justify-between gap-2 py-1.5">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-portfolio-light-text dark:text-portfolio-text leading-snug">
                      {pos.role}
                    </p>
                    <p className="font-mono text-xs text-portfolio-muted mt-0.5">
                      {posStart} – {posEnd}
                      <span className="ml-2 text-portfolio-muted/50">{pos.type}</span>
                    </p>
                    {!!pos.technologies?.length && (
                      <p className="text-[11px] font-mono text-portfolio-muted/60 mt-1 leading-relaxed">
                        {pos.technologies.join(' · ')}
                      </p>
                    )}
                  </div>

                  {(pos.achievements?.length || pos.description) && (
                    <button
                      onClick={() => setOpenPos(isOpen ? null : pos.id)}
                      aria-expanded={isOpen}
                      className="flex-shrink-0 text-portfolio-muted hover:text-portfolio-light-text dark:hover:text-portfolio-text transition-colors mt-1"
                    >
                      <motion.span
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="block"
                      >
                        <ChevronDown size={14} />
                      </motion.span>
                    </button>
                  )}
                </div>

                {/* Expandable details */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: ANIMATION_CONFIG.easing }}
                      className="overflow-hidden"
                    >
                      <div className="space-y-2 pb-3 pt-1">
                        {pos.description && (
                          <p className="text-sm text-portfolio-muted leading-relaxed">{pos.description}</p>
                        )}
                        {!!pos.achievements?.length && (
                          <ul className="space-y-1.5">
                            {pos.achievements.map((a, i) => (
                              <motion.li
                                key={i}
                                initial={{ opacity: 0, x: -6 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.2, delay: i * 0.04 }}
                                className="flex items-start gap-2 text-sm text-portfolio-muted"
                              >
                                <span className="text-portfolio-light-accent dark:text-portfolio-silver flex-shrink-0 mt-0.5 text-xs">→</span>
                                <span className="flex-1">{a}</span>
                              </motion.li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
