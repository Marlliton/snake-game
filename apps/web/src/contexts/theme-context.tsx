"use client";
import { createContext, useEffect, useState } from "react";
import Cookie from "js-cookie";
import tailwind from "../../tailwind.config";
console.log(tailwind.theme?.colors);

const GREEN_THEME = {
  "100": "#A2AB28",
  "200": "#36907E",
  "300": "#C24328",
  "400": "#C2432890",
  "500": "#36907E10",
  "600": "#36907E20",
  "700": "#36907E80",
  "900": "#0e130f",
} as const;

const PASTEL_THEME = {
  "100": "#DEAE62",
  "200": "#B7A78D",
  "300": "#F48A5B",
  "400": "#F48A5B90",
  "500": "#B7A78D10",
  "600": "#B7A78D20",
  "700": "#B7A78D80",
  "900": "#201d1b",
} as const;

const VIOLET_THEME = {
  "100": "#D8B888",
  "200": "#99697E",
  "300": "#79445E",
  "400": "#79445E90",
  "500": "#99697E10",
  "600": "#99697E20",
  "700": "#99697E80",
  "900": "#0f070c",
} as const;

export const THEME_OPTIONS = { GREEN_THEME, PASTEL_THEME, VIOLET_THEME } as const;

type Theme = typeof GREEN_THEME | typeof PASTEL_THEME | typeof VIOLET_THEME;
type ThemeOptions = keyof typeof THEME_OPTIONS;

interface ThemeContextProps {
  theme: Theme;
  changeTheme(theme: ThemeOptions): void;
}

export const ThemeContext = createContext({} as ThemeContextProps);

export function ThemeContextProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(GREEN_THEME);

  useEffect(() => {
    if (!document) return;
    const selectedTheme = Cookie.get("snake-theme") as ThemeOptions;

    if (THEME_OPTIONS[selectedTheme]) {
      console.log("🚀 ~ useEffect ~ selectedTheme:", selectedTheme);
      changeTheme(selectedTheme);
    }

    document.body.style.backgroundColor = theme[900];
  }, [theme]);

  function changeTheme(theme: ThemeOptions) {
    Cookie.set("snake-theme", theme);
    setTheme(THEME_OPTIONS[theme]);
  }

  return <ThemeContext.Provider value={{ theme, changeTheme }}>{children}</ThemeContext.Provider>;
}
