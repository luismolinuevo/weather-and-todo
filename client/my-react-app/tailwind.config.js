/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      'xl': '35px',
      '2xl': '45px',
      '3xl': '65px'
    },
  },
  plugins: [],
}

