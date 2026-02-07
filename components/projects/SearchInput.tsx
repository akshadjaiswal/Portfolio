'use client';

import { Search, X } from 'lucide-react';
import { useFilterStore } from '@/lib/stores/filter-store';
import { motion, AnimatePresence } from 'framer-motion';

export function SearchInput() {
  const { searchQuery, setSearchQuery } = useFilterStore();

  return (
    <div className="relative">
      <Search
        className="absolute left-3 top-1/2 -translate-y-1/2 text-portfolio-muted"
        size={20}
      />
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search projects by name, description, or technology..."
        className="w-full pl-10 pr-10 py-3 bg-portfolio-light-surface dark:bg-portfolio-surface border border-portfolio-light-border dark:border-portfolio-border rounded-lg text-portfolio-light-text dark:text-portfolio-text placeholder:text-portfolio-muted focus:outline-none focus:border-portfolio-light-accent dark:focus:border-portfolio-silver transition-colors"
      />
      <AnimatePresence>
        {searchQuery && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-portfolio-muted hover:text-portfolio-light-text dark:hover:text-portfolio-text transition-colors"
            aria-label="Clear search"
          >
            <X size={20} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
