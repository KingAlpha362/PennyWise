/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Instrument Serif"', 'serif'],
        sans: ['Syne', 'sans-serif'],
      },
      colors: {
        bg: '#090909',
        'bg-card': 'rgba(255,255,255,0.04)',
        border: 'rgba(255,255,255,0.08)',
        text: '#f0ede8',
        'text-muted': 'rgba(240,237,232,0.45)',
        accent: '#c9b99a',
        'accent-dim': 'rgba(201,185,154,0.15)',
      }
    },
  },
  plugins: [],
}
