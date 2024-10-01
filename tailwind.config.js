/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./scr/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors : {
        primarycolor : '#19164A',
        secondarycolor : '#43C6AC'
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'], 
      },
    },
  },
  plugins: [],
}

