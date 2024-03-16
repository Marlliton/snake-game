"use client";
import { createContext, useState } from "react";

const GREEN_THEME = {
  fruit: "#A2AB28",
  "board-100": "#36907E10",
  "board-200": "#36907E20",
  "board-700": "#36907E80",
  bg: "#0e130f",
  "snake-100": "#C24328",
  "snake-200": "#C2432890",
} as const;

type GreenTheme = typeof GREEN_THEME;

interface ThemeContextProps {
  theme: GreenTheme;
  changeTheme(theme: any): void;
}

export const ThemeContext = createContext({} as ThemeContextProps);

export function ThemeContextProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<GreenTheme>(GREEN_THEME);

  function changeTheme(theme: any) {
    setTheme(theme);
  }

  return <ThemeContext.Provider value={{ theme, changeTheme }}>{children}</ThemeContext.Provider>;
}
