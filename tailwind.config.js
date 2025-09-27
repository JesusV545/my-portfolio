/** @type {import(''tailwindcss'').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          900: "#0A2342", // Deep Navy
          700: "#2F3E46", // Charcoal Gray
          500: "#7A8450", // Muted Olive
          300: "#C6CEC1", // Pale Sage
          100: "#FDFCF9", // Warm Ivory
        },
      },
    },
  },
  plugins: [],
};
