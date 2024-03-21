/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // "watchlist-green": "#FFFFFF",
        "watchlist-green": "#38CD51",
        "delete-red" : "#b91c1c"
      },
    },
  },
  plugins: [],
};
