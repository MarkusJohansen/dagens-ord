/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Space Grotesk", "sans-serif"],
      logo: ["Space Grotesk", "sans-serif"],
      mono: ["Space Grotesk", "monospace"],
    },
    extend: {
      colors: {
        "brutal-yellow": "#FFE500",
        "brutal-pink": "#FF2D55",
        "brutal-teal": "#00D4AA",
        "brutal-blue": "#4361EE",
        "brutal-orange": "#FF6B35",
        "light-gray": "#656565",
        "semi-transparent": "rgba(0, 0, 0, 0.2)",
      },
      boxShadow: {
        brutal: "4px 4px 0px #000000",
        "brutal-lg": "6px 6px 0px #000000",
        "brutal-sm": "2px 2px 0px #000000",
      },
    },
  },
  plugins: [],
};
