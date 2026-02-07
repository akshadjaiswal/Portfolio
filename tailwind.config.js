/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Enable class-based dark mode
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        heading: ['var(--font-space-grotesk)', 'var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      colors: {
        'portfolio': {
          // Dark mode colors (existing)
          bg: '#0A0A0A',
          surface: '#1A1A1A',
          border: '#2A2A2A',
          silver: '#C0C0C0',
          text: '#E8E8E8',
          muted: '#6B7280',

          // Light mode colors (new)
          light: {
            bg: '#FFFFFF',
            surface: '#F9FAFB',
            border: '#E5E7EB',
            accent: '#1F2937',
            text: '#111827',
            muted: '#6B7280',
          }
        }
      },
      maxWidth: {
        'portfolio': '800px'
      },
      fontWeight: {
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
      },
      transitionProperty: {
        'theme': 'background-color, border-color, color, fill, stroke',
      },
      transitionDuration: {
        'theme': '300ms',
      },
    },
  },
  plugins: [],
}
