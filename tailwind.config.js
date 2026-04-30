/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
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
        bg: 'var(--bg)',
        'bg-card': 'var(--bg-card)',
        border: 'var(--border)',
        text: 'var(--text)',
        'text-muted': 'var(--text-muted)',
        accent: 'var(--accent)',
        'accent-dim': 'var(--accent-dim)',
      }
    },
  },
  plugins: [],
}
