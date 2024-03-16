"use client";
import { createContext, useEffect, useState } from "react";

const GREEN_THEME = {
  fruit: "#A2AB28",
  "board-100": "#36907E10",
  "board-200": "#36907E20",
  "board-700": "#36907E80",
  bg: "#0e130f",
  "snake-100": "#C24328",
  "snake-200": "#C2432890",
} as const;

const PASTEL_THEME = {
  fruit: "#DEAE62",
  "board-100": "#B7A78D10",
  "board-200": "#B7A78D20",
  "board-700": "#B7A78D80",
  bg: "#201d1b",
  "snake-100": "#F48A5B",
  "snake-200": "#F48A5B90",
} as const;

const VIOLET_THEME = {
  fruit: "#D8B888",
  "board-100": "#99697E10",
  "board-200": "#99697E20",
  "board-700": "#99697E80",
  bg: "#0f070c",
  "snake-100": "#79445E",
  "snake-200": "#79445E90",
} as const;

const THEME_OPTIONS = { GREEN_THEME, PASTEL_THEME, VIOLET_THEME } as const;

type Theme = typeof GREEN_THEME | typeof PASTEL_THEME | typeof VIOLET_THEME;
type ThemeOptions = keyof typeof THEME_OPTIONS;

interface ThemeContextProps {
  theme: Theme;
  changeTheme(theme: ThemeOptions): void;
}

export const ThemeContext = createContext({} as ThemeContextProps);

export function ThemeContextProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(PASTEL_THEME);

  useEffect(() => {
    if (!document) return;
    document.body.style.backgroundColor = theme.bg;
  }, [theme]);

  function changeTheme(theme: ThemeOptions) {
    setTheme(THEME_OPTIONS[theme]);
  }

  return <ThemeContext.Provider value={{ theme, changeTheme }}>{children}</ThemeContext.Provider>;
}
