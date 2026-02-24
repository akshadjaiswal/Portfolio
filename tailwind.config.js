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
          },

          // Professional accent system
          accent: {
            primary: '#3B82F6',
            secondary: '#8B5CF6',
            success: '#10B981',
            warning: '#F59E0B',
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
      letterSpacing: {
        'tighter': '-0.02em',
        'tight': '-0.01em',
        'wide': '0.05em',
        'wider': '0.1em',
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgb(0 0 0 / 0.08), 0 2px 4px -2px rgb(0 0 0 / 0.08)',
        'card-hover': '0 20px 25px -5px rgb(0 0 0 / 0.12), 0 8px 10px -6px rgb(0 0 0 / 0.12)',
        'dark-card': '0 4px 6px -1px rgb(0 0 0 / 0.3), 0 2px 4px -2px rgb(0 0 0 / 0.3)',
        'dark-card-hover': '0 20px 25px -5px rgb(0 0 0 / 0.4), 0 8px 10px -6px rgb(0 0 0 / 0.4)',
      },
      backgroundImage: {
        'gradient-subtle': 'linear-gradient(135deg, var(--tw-gradient-stops))',
        'mesh-light': 'radial-gradient(at 40% 20%, hsla(28,100%,74%,0.1) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(189,100%,56%,0.1) 0px, transparent 50%)',
        'mesh-dark': 'radial-gradient(at 40% 20%, hsla(28,100%,74%,0.05) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(189,100%,56%,0.05) 0px, transparent 50%)',
      },
      scale: {
        '102': '1.02',
        '103': '1.03',
      },
      transitionProperty: {
        'theme': 'background-color, border-color, color, fill, stroke',
      },
      transitionDuration: {
        'theme': '300ms',
        '200': '200ms',
      },
    },
  },
  plugins: [],
}
