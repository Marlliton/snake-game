/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        ...defaultTheme.gridTemplateColumns,
        16: "repeat(16, minmax(0, 1fr))",
        18: "repeat(18, minmax(0, 1fr))",
        20: "repeat(20, minmax(0, 1fr))",
        22: "repeat(22, minmax(0, 1fr))",
        24: "repeat(24, minmax(0, 1fr))",
      },
    },
  },
  safelist: [
    {
        pattern: /^grid-cols-/,
    },
    {
        pattern: /^grid-rows-/,
    },
],
  plugins: [],
};
