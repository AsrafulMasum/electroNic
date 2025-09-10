/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        green: "#09B782",
        action: "#FFC603",
        secondary: "#FFC603",
        base: "#EBEBEB",
        dark: "#000000",
      },
      boxShadow: {
        soft: "0 0px 6px rgba(0,0,0,0.25)",
      },
    },
  },
  plugins: [],
};
