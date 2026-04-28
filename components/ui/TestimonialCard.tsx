'use client';

import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { Testimonial } from '@/lib/types';
import { ANIMATION_CONFIG } from '@/lib/constants';

interface TestimonialCardProps {
  testimonial: Testimonial;
  index: number;
}

export default function TestimonialCard({ testimonial, index }: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: ANIMATION_CONFIG.fadeInDuration,
        ease: ANIMATION_CONFIG.easing,
        delay: index * 0.1,
      }}
      className="group relative flex flex-col gap-5 p-6 rounded-xl border border-gray-200 dark:border-portfolio-border bg-white dark:bg-portfolio-surface/40 shadow-card dark:shadow-dark-card hover:shadow-card-hover dark:hover:shadow-dark-card-hover hover:border-gray-300 dark:hover:border-portfolio-silver/20 transition-all duration-300"
    >
      {/* Decorative quote mark */}
      <span
        className="absolute top-3 right-4 text-8xl leading-none font-serif text-portfolio-accent-primary/20 select-none pointer-events-none"
        aria-hidden="true"
      >
        &ldquo;
      </span>

      {/* Recommendation text with left accent bar */}
      <div className="relative border-l-2 border-portfolio-accent-primary/30 pl-4 flex-1 space-y-3">
        {testimonial.text.split('\n\n').map((para, i, arr) => (
          <p
            key={i}
            className="text-sm leading-relaxed text-gray-700 dark:text-portfolio-text/80"
          >
            {i === 0 && <>&ldquo;</>}{para}{i === arr.length - 1 && <>&rdquo;</>}
          </p>
        ))}
      </div>

      {/* Author row */}
      <div className="flex items-center justify-between gap-3 pt-3 border-t border-gray-100 dark:border-portfolio-border">
        <div className="flex items-center gap-3 min-w-0">
          {/* Avatar */}
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-50 dark:bg-portfolio-silver/10 border border-blue-200 dark:border-portfolio-silver/20 flex items-center justify-center">
            <span className="text-sm font-semibold text-blue-700 dark:text-portfolio-silver">
              {testimonial.avatarInitials}
            </span>
          </div>

          <div className="min-w-0">
            <p className="text-sm font-medium text-gray-900 dark:text-portfolio-text truncate">
              {testimonial.name}
            </p>
            <p className="text-xs text-gray-500 dark:text-portfolio-muted truncate">
              {testimonial.role} · {testimonial.company}
            </p>
            <p className="text-xs text-gray-400 dark:text-portfolio-muted/70 truncate mt-0.5">
              {testimonial.relationship}
            </p>
          </div>
        </div>

        {/* LinkedIn link */}
        {testimonial.linkedinUrl && (
          <a
            href={testimonial.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${testimonial.name}'s LinkedIn profile`}
            className="flex-shrink-0 flex items-center gap-1 text-xs px-2.5 py-1 rounded-full border border-blue-200 dark:border-portfolio-silver/30 text-blue-700 dark:text-portfolio-silver hover:bg-blue-50 dark:hover:bg-portfolio-silver/10 transition-colors duration-200"
          >
            <ExternalLink size={11} />
            <span>LinkedIn</span>
          </a>
        )}
      </div>
    </motion.div>
  );
}
