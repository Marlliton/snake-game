import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";
import defaultColors from "tailwindcss/colors";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
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
    colors: {
      ...defaultColors,
      "custom-green-400": "#A2AB28",
      "custom-green-500": "#36907E10",
      "custom-green-600": "#36907E20",
      "custom-green-700": "#36907E80",
      "custom-green-900": "#0e130f",

      "custom-red-100": "#C24328",
      "custom-red-200": "#C2432890",
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

export default config;
