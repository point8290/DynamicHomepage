/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        fadeIn: "fadeIn 2.5s ease-out",
        slideIn: "slideInBig 2.5s ease-out",
      },
      keyframes: () => ({
        fadeIn: {
          "0%": { opacity: 0, transform: "scale(0.9)" },
          "100%": { opacity: 1, transform: "scale(1)" },
        },
        slideInBig: {
          "0%": {
            opacity: 0,
            transform: "translateY(80%)",
          },

          "100%": {
            opacity: 1,
            transform: "translateY(0)",
          },
        },
      }),
    },
  },
  plugins: [],
};
