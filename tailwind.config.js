/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "selector",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        accent: "#7287fd",
        accent_dark: "#8e9ffd",
        cream: "#f3f1ef",
        cream_dark: "#222222",
      },
      content: {
        check: "url('/check.svg')",
        check_dark: "url('/check-dark.svg')",
      },
    },
  },
  plugins: [],
}
