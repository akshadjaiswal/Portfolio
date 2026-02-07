'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useThemeStore } from '@/lib/stores/theme-store';

export function useKeyboardShortcuts() {
  const router = useRouter();
  const { theme, setTheme } = useThemeStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in input
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      // Shortcuts with Ctrl/Cmd
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 'k': // Search
            e.preventDefault();
            document.querySelector<HTMLInputElement>('input[type="text"]')?.focus();
            break;
        }
      }

      // Simple key shortcuts
      switch (e.key) {
        case 'h': // Home
          router.push('/');
          break;
        case 'p': // Projects
          router.push('/projects');
          break;
        case 't': // Toggle theme
          const nextTheme = theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light';
          setTheme(nextTheme);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [router, theme, setTheme]);
}
