/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "blue-500": '#9fd3c7',
        "blue-700": '#385170',
        "gray-700": '#ececec',
      }
    },
  },
  plugins: [],
};
