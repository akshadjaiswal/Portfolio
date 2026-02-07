'use client';

import { useFilterStore } from '@/lib/stores/filter-store';
import { SearchInput } from './SearchInput';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function FilterBar() {
  const { searchQuery, selectedTechnologies, selectedCategories, clearFilters } =
    useFilterStore();

  const hasActiveFilters =
    searchQuery || selectedTechnologies.length > 0 || selectedCategories.length > 0;

  return (
    <div className="mb-8 space-y-4">
      {/* Search */}
      <SearchInput />

      {/* Active Filters & Clear */}
      <AnimatePresence>
        {hasActiveFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-center gap-2 flex-wrap"
          >
            <span className="text-sm text-portfolio-muted">Active filters:</span>

            {searchQuery && (
              <motion.div
                layout
                className="px-3 py-1 bg-portfolio-light-surface dark:bg-portfolio-surface border border-portfolio-light-border dark:border-portfolio-border rounded-full text-sm"
              >
                Search: &quot;{searchQuery}&quot;
              </motion.div>
            )}

            {selectedCategories.map((category) => (
              <motion.div
                key={category}
                layout
                className="px-3 py-1 bg-portfolio-light-surface dark:bg-portfolio-surface border border-portfolio-light-border dark:border-portfolio-border rounded-full text-sm flex items-center gap-2"
              >
                {category}
              </motion.div>
            ))}

            {selectedTechnologies.map((tech) => (
              <motion.div
                key={tech}
                layout
                className="px-3 py-1 bg-portfolio-light-surface dark:bg-portfolio-surface border border-portfolio-light-border dark:border-portfolio-border rounded-full text-sm flex items-center gap-2"
              >
                {tech}
              </motion.div>
            ))}

            <button
              onClick={clearFilters}
              className="px-3 py-1 text-sm text-portfolio-light-accent dark:text-portfolio-silver hover:text-portfolio-light-text dark:hover:text-portfolio-text transition-colors flex items-center gap-1"
            >
              <X size={14} />
              Clear all
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
