/** @type {import('tailwindcss').Config} */
const { fontFamily } = require('tailwindcss/defaultTheme')

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Ubuntu', ...fontFamily.sans],
      },
    },
    colors: {
      'primary': '#4338ca',
    }
  },
  plugins: [],
}

