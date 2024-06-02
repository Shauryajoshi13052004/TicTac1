/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'sm': '640px',   // Small screens, like smartphones (640px)
      'md': '768px',   // Medium screens, like tablets (768px)
      'lg': '1024px',  // Large screens, like laptops (1024px)
      'xl': '1280px',  // Extra large screens, like desktops (1280px)
    },
    extend: {}
  },
  plugins: [],
}