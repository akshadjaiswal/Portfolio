// Utility object for common theme-aware Tailwind classes
export const themeClasses = {
  bg: 'bg-portfolio-light-bg dark:bg-portfolio-bg',
  surface: 'bg-portfolio-light-surface dark:bg-portfolio-surface',
  border: 'border-portfolio-light-border dark:border-portfolio-border',
  borderHover: 'hover:border-portfolio-light-accent dark:hover:border-portfolio-silver',
  text: 'text-portfolio-light-text dark:text-portfolio-text',
  muted: 'text-portfolio-muted', // Same for both themes
  accent: 'text-portfolio-light-accent dark:text-portfolio-silver',
  accentHover: 'hover:text-portfolio-light-accent dark:hover:text-portfolio-silver',
};

// Helper function to combine theme classes
export function getThemeClasses(...classes: (keyof typeof themeClasses)[]) {
  return classes.map((key) => themeClasses[key]).join(' ');
}
