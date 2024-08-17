/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'prompt': ['Prompt'],
        'inter': ['Inter']
      },
      colors: {
        'customGreen' : '#096a10',
        'green2' : '#0c9015',
        'customWhite': '#ebe6e0',
        'white2': '#f5f8eb',
        'customGray': '#d3d3d3'
      }
    },
  },
  plugins: [],
}