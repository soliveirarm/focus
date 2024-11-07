/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "selector",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        accent: "#7287fd",
        cream: "#f3f1ef",
        cream_dark: "#111111",
      },
      content: {
        check: "url('/check.svg')",
      },
    },
  },
  plugins: [],
}
