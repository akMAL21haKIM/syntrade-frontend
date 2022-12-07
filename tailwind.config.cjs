/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        sm: "639px",
        // => @media (min-width: 640px) { ... }
        md: "640px",
        // => @media (min-width: 640px) { ... }
      },
      spacing: {
        18: "4.5rem",
      },
      fontFamily: {
        now: ["Now", "sans-serif"],
      },
      colors: {
        blue: {
          600: "#006FF9",
        },
      },
    },
  },
};
