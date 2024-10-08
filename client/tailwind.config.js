/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: { logo: ["Playfair Display"] },
    extend: {
      colors: {
        "light-gray": "#656565",
        "semi-transparent": "rgba(0, 0, 0, 0.2)",
      },
    },
  },
  plugins: [],
};
