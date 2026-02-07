'use client';

import { useEffect } from 'react';
import { useThemeStore } from '@/lib/stores/theme-store';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme, resolvedTheme, resolveTheme } = useThemeStore();

  useEffect(() => {
    // Initial theme resolution
    resolveTheme();

    // Apply theme class to html
    const root = document.documentElement;

    if (resolvedTheme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    // Add transitioning class for smooth theme change
    root.classList.add('transitioning');
    const timeout = setTimeout(() => {
      root.classList.remove('transitioning');
    }, 300);

    return () => clearTimeout(timeout);
  }, [resolvedTheme, resolveTheme]);

  useEffect(() => {
    // Listen for system theme changes when theme is set to 'system'
    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => resolveTheme();

      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [theme, resolveTheme]);

  return <>{children}</>;
}
