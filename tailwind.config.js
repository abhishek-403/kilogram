/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        h1: ["Roboto Slab", "serif"],
        h2: ["Playfair Display", "serif"],
        h4: ["Salsa", "cursive"],
        allh: ["Merriweather", "serif"],
        p: ["Domine", "sans-serif"],
        span: ["Carter One", "cursive"],
        name: ["Lucida Sans", "Lucida Sans Regular", "Lucida Grande"],
      },
    },
  },
  plugins: [],
};
