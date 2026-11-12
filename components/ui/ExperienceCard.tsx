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

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString('default', { month: 'short' }) + ' ' + d.getFullYear();
}

export default function ExperienceCard({ experience }: ExperienceCardProps) {
  const [open, setOpen] = useState(false);

  const start = experience.startDate ? formatDate(experience.startDate) : '';
  const end   = experience.endDate   ? formatDate(experience.endDate)   : 'Present';
  const expandable = !!(experience.achievements?.length || experience.description);
  const panelId = `${experience.id}-details`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: ANIMATION_CONFIG.fadeInDuration, ease: ANIMATION_CONFIG.easing }}
      className="grid grid-cols-[72px_1fr] sm:grid-cols-[100px_1fr] md:grid-cols-[130px_1fr] gap-x-3 sm:gap-x-6 md:gap-x-10 py-7"
    >
      {/* Left: dates */}
      <div className="pt-1 flex flex-col gap-0.5">
        <span className="font-mono text-xs text-portfolio-muted leading-tight">{start}</span>
        <span className="font-mono text-xs text-portfolio-muted leading-tight">{end}</span>
        <span className="font-mono text-[10px] text-portfolio-muted/50 mt-1 leading-tight">{experience.type}</span>
      </div>

      {/* Right: content */}
      <div className="space-y-2.5">
        {/* Logo + Company + Role row */}
        <div className="flex items-start gap-2.5">
          {/* Logo */}
          <div className="flex-shrink-0 w-7 h-7 rounded-md overflow-hidden border border-portfolio-light-border dark:border-portfolio-border bg-portfolio-light-surface dark:bg-portfolio-surface mt-0.5">
            <Image
              src={experience.logo}
              alt={experience.logoAlt || experience.company}
              width={28}
              height={28}
              className="object-contain p-0.5"
            />
          </div>

          <div className="flex-1 min-w-0">
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

            {/* Role row — whole row toggles details (company link stays separate: no link-in-button) */}
            {(() => {
              const content = (
                <>
                  <span className="flex-1 min-w-0 block">
                    <span className="block text-sm text-portfolio-light-text/80 dark:text-portfolio-text/80 leading-snug">
                      {experience.role}
                    </span>
                    <span className="block text-xs text-portfolio-muted mt-0.5">{experience.location}</span>
                    {!!experience.technologies?.length && (
                      <span className="block text-[11px] font-mono text-portfolio-muted/60 mt-1.5 leading-relaxed">
                        {experience.technologies.join(' · ')}
                      </span>
                    )}
                  </span>
                  {expandable && (
                    <motion.span
                      animate={{ rotate: open ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex-shrink-0 mt-0.5 p-1 -m-1 rounded text-portfolio-muted group-hover:text-portfolio-light-text dark:group-hover:text-portfolio-text transition-colors"
                      aria-hidden
                    >
                      <ChevronDown size={16} />
                    </motion.span>
                  )}
                </>
              );
              return expandable ? (
                <button
                  type="button"
                  onClick={() => setOpen(!open)}
                  aria-expanded={open}
                  aria-controls={panelId}
                  className="group w-full flex items-start justify-between gap-2 py-1.5 -mx-2 px-2 rounded-md text-left cursor-pointer hover:bg-portfolio-light-surface/60 dark:hover:bg-portfolio-surface/40 transition-colors"
                >
                  {content}
                </button>
              ) : (
                <div className="flex items-start justify-between gap-2 py-1.5">{content}</div>
              );
            })()}
          </div>
        </div>

        {/* Expandable: description + achievements */}
        <AnimatePresence>
          {open && (
            <motion.div
              id={panelId}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.28, ease: ANIMATION_CONFIG.easing }}
              className="overflow-hidden pl-[1.875rem]"
            >
              <div className="space-y-2.5 pt-1">
                {experience.description && (
                  <p className="text-sm text-portfolio-muted leading-relaxed">{experience.description}</p>
                )}
                {!!experience.achievements?.length && (
                  <ul className="space-y-1.5">
                    {experience.achievements.map((a, i) => (
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
    </motion.div>
  );
}
