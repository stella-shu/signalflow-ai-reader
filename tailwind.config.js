/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "#4edea3",
        "primary-container": "#10b981",
        "on-primary": "#003824",
        "on-primary-container": "#00422b",
        "surface": "#111318",
        "surface-container-lowest": "#0c0e12",
        "surface-container-low": "#1a1c20",
        "surface-container": "#1e2024",
        "surface-container-high": "#282a2e",
        "surface-container-highest": "#333539",
        "on-surface": "#e2e2e8",
        "on-surface-variant": "#bbcabf",
        "outline": "#86948a",
        "outline-variant": "#3c4a42",
        "error": "#ffb4ab",
        "error-container": "#93000a",
        "on-error": "#690005"
      },
      fontFamily: {
        "headline": ["Newsreader", "serif"],
        "body": ["Manrope", "sans-serif"],
        "label": ["Manrope", "sans-serif"]
      }
    },
  },
  plugins: [],
}
