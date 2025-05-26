const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  safelist: ["glitch"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        orbitron: ["Orbitron", "sans-serif"],
      },
      animation: {
        stars: "starsMove 60s linear infinite",
      },
      keyframes: {
        starsMove: {
          "0%": { backgroundPosition: "0 0" },
          "100%": { backgroundPosition: "1000px 1000px" },
        },
      },
    },
  },
  plugins: [],
};
