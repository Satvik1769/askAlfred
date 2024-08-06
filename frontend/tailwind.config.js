/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        fadeInLeft: 'fadeInLeft .5s ease-in-out',
        fadeInRight: 'fadeInRight .5s ease-in-out',
      },
      keyframes: {
        fadeInLeft: {
          '0%': {
            opacity: 0,
            transform: 'translateX(-50px)',
          },
          '100%': {
            opacity: 1,
            transform: 'translateX(0)',
          },
        },
        fadeInRight: {
          '0%': {
            opacity: 0,
            transform: 'translateX(50px)',
          },
          '100%': {
            opacity: 1,
            transform: 'translateX(0)',
          },
        },
      },
    },
  },
  plugins: [],
}
