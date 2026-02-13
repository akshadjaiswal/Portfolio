'use client';

import { useCallback } from 'react';
import { motion } from 'framer-motion';
import { useFilterStore } from '@/lib/stores/filter-store';

interface SkillsCloudProps {
  technologies: { name: string; count: number }[];
}

export function SkillsCloud({ technologies }: SkillsCloudProps) {
  const { selectedTechnologies, toggleTechnology } = useFilterStore();

  // Memoize click handler to prevent recreation
  const handleClick = useCallback((techName: string) => {
    console.log('[SkillsCloud] Clicked:', techName);
    toggleTechnology(techName);
  }, [toggleTechnology]);

  // Calculate font sizes based on count (min: 0.875rem, max: 1.5rem)
  const maxCount = Math.max(...technologies.map((t) => t.count));
  const minCount = Math.min(...technologies.map((t) => t.count));

  const getFontSize = (count: number) => {
    if (maxCount === minCount) return 1; // All same count
    const normalized = (count - minCount) / (maxCount - minCount);
    return 0.875 + normalized * 0.625; // 14px to 24px
  };

  return (
    <div className="flex flex-wrap gap-3 items-center justify-center p-6 bg-portfolio-light-surface dark:bg-portfolio-surface border border-portfolio-light-border dark:border-portfolio-border rounded-lg">
      {technologies.map((tech, index) => {
        const isSelected = selectedTechnologies.includes(tech.name);
        const fontSize = getFontSize(tech.count);

        return (
          <motion.button
            key={tech.name}
            type="button"
            onClick={() => handleClick(tech.name)}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: 1,
              scale: 1,
              fontSize: `${fontSize}rem`,
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{
              delay: index * 0.02,
              duration: 0.3,
            }}
            layout={false}
            style={{ pointerEvents: 'auto', touchAction: 'manipulation' }}
            className={`
              px-3 py-1.5 rounded-full transition-colors font-medium
              ${
                isSelected
                  ? 'bg-portfolio-light-accent dark:bg-portfolio-silver text-white dark:text-portfolio-bg'
                  : 'bg-portfolio-light-bg dark:bg-portfolio-bg text-portfolio-light-text dark:text-portfolio-text hover:bg-portfolio-light-border dark:hover:bg-portfolio-border'
              }
            `}
            aria-pressed={isSelected}
            aria-label={`${isSelected ? 'Remove' : 'Add'} ${tech.name} filter`}
          >
            {tech.name}
            <span className="ml-1.5 text-xs opacity-70">({tech.count})</span>
          </motion.button>
        );
      })}
    </div>
  );
}
