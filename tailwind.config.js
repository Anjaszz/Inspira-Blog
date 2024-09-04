/** @type {import('tailwindcss').Config} */
import scrollbarHide from 'tailwind-scrollbar-hide';
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        beige: '#F5F5DC',
        peach: '#FFCBA4',
        mint: '#B2DFDB',
        'mint-dark': '#9FD3D0'
      },
      fontFamily: {
        'nerko': ['Nerko One', 'cursive'], 
      },
    },
  },
  plugins: [
    scrollbarHide,
  ],
}

