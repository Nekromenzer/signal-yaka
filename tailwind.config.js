/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: "#1D3557",
        sun: "#E63946",
        sea: "#457B9D",
        sky: "#A8DADC",
        cloud: "#F1FAEE",
      },
      backgroundImage: {
        hero: "url('/src/img/blob/electric.svg')",
        logo: "url('/src/img/logo.png')",
      },
    },
  },
  plugins: [],
};
