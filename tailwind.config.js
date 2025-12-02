/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Quicksand', 'sans-serif'],
      },
      colors: {
        pastel: {
          mint: '#d1fae5',
          mintDark: '#34d399',
          pink: '#fce7f3',
          pinkDark: '#f472b6',
          yellow: '#fef3c7',
          blue: '#dbeafe',
          text: '#374151',
        }
      }
    },
  },
  plugins: [],
}