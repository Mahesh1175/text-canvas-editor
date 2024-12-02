/** @type {import('tailwindcss').Config} */
export default {
  base: '/text-canvas-editor/', 

  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        fleur: ['"Fleur De Leah"', 'cursive'], // Add this
        outfit: [ "Outfit", "sans-serif"],
      },
    },
  },
  plugins: [],
}
