/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  mode: 'jit',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        homePage: "rgb(var(--homePage))",
        navBar: "rgb(var(--navBar))",
        textColor: "rgb(var(--textColor))",
        card: "rgb(var(--card))",
        checkout: "rgb(var(--checkout))"
      }, 
    },
  },
  plugins: [],
}