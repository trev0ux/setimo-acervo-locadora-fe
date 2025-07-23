import type { Config } from "tailwindcss";

export default <Config>{
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "2rem",
          lg: "2.5rem",
          xl: "5rem",
          "2xl": "6rem",
        },
        screens: {
          sm: "640px",
          md: "768px",
          lg: "1024px",
          xl: "1280px",
          "2xl": "1400px",
        },
      },
      colors: {
        aux: {
          primary: "#E11A38",
          black: "#171B24",
          light: "#282A2C",
          "light-black": "#202632",
          white: "#ffffff",
          border: "#4C4E53",
          grey: "#979797",
        },
      },
      fontFamily: {
        sans: ["Sora", "sans-serif"],
      },
    },
  },
  plugins: [],
};
