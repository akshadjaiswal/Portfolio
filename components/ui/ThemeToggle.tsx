'use client';

import { Moon, Sun, Monitor } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useThemeStore } from '@/lib/stores/theme-store';

export function ThemeToggle() {
  const { theme, setTheme } = useThemeStore();

  const icons = {
    light: Sun,
    dark: Moon,
    system: Monitor,
  };

  const nextTheme = {
    light: 'dark',
    dark: 'system',
    system: 'light',
  } as const;

  const Icon = icons[theme];

  const handleToggle = () => {
    setTheme(nextTheme[theme]);
  };

  return (
    <motion.button
      onClick={handleToggle}
      className="relative w-10 h-10 rounded-lg border border-portfolio-light-border dark:border-portfolio-border bg-portfolio-light-surface dark:bg-portfolio-surface hover:border-portfolio-light-accent dark:hover:border-portfolio-silver transition-colors"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${nextTheme[theme]} theme`}
      title={`Current: ${theme} theme`}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={theme}
          initial={{ opacity: 0, rotate: -90, scale: 0.8 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 90, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Icon size={20} className="text-portfolio-light-text dark:text-portfolio-text" />
        </motion.div>
      </AnimatePresence>
    </motion.button>
  );
}
