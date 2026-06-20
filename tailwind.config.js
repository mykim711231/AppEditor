/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        mono: ['var(--editor-font)', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
}
