import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type Theme = 'light' | 'dark' | 'system';
type ResolvedTheme = 'light' | 'dark';

interface ThemeStore {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: Theme) => void;
  resolveTheme: () => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      theme: 'dark', // Default to dark theme (current portfolio theme)
      resolvedTheme: 'dark',

      setTheme: (theme) => {
        set({ theme });
        get().resolveTheme();
      },

      resolveTheme: () => {
        const { theme } = get();

        if (typeof window === 'undefined') {
          set({ resolvedTheme: 'dark' });
          return;
        }

        if (theme === 'system') {
          const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
            ? 'dark'
            : 'light';
          set({ resolvedTheme: systemTheme });
        } else {
          set({ resolvedTheme: theme });
        }
      },
    }),
    {
      name: 'portfolio-theme',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
