const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Nunito Sans", ...defaultTheme.fontFamily.sans],
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
