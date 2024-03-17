import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      keyframes: {
        show: {
          "0%": {
            transform: "translateY(-50px)",
          },
          "50%": { transform: "translateY(5px)" },
          "100%": {
            transform: "translateY(0px)",
          },
        },
        hidden: {
          "0%": {
            transform: "translateY(0px)",
          },
          "50%": { transform: "translateY(5px)" },
          "100%": {
            transform: "translateY(-50px)",
          },
        },
      },
      animation: {
        show: "show .5s ease-in-out",
        hidden: "hidden .5s ease-in-out forwards",
      },
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

export default config;
