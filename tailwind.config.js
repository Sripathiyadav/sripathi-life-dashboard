/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html","./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: { purple:"#7f77dd", red:"#E24B4A", green:"#639922", amber:"#BA7517", teal:"#1D9E75" }
      }
    }
  },
  plugins: [],
}
