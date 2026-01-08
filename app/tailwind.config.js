/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'portfolio': {
          bg: '#0A0A0A',
          surface: '#1A1A1A',
          border: '#2A2A2A',
          silver: '#C0C0C0',
          text: '#E8E8E8',
          muted: '#6B7280',
        }
      },
      maxWidth: {
        'portfolio': '640px'
      },
      fontWeight: {
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
      },
    },
  },
  plugins: [],
}
