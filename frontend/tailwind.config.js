/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'primary': '#FF6363',
        'secondary':  '#E2E2D5',
        'bgc' : '#F3F3F3',
        'favorite' : '#FFA500',

          
        
        
      },
      fontFamily: {
        'primary': ["Lato", "sans-serif"],
        'secondary': ["Noto Sans", "sans-serif"]  
      },
    },
  },
  plugins: [],
}

