import { GameContextProvider } from "@/contexts/game-context";
import { KeyboardContextProvider } from "@/contexts/keyboard-context";
import { ThemeContextProvider } from "@/contexts/theme-context";
import "@snake/ui/styles.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Turborepo",
  description: "Generated by create turbo",
};

export default function RootLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <html lang="en">
      <body className={`bg-900 ${inter.className}`}>
        <ThemeContextProvider>
          <KeyboardContextProvider>
            <GameContextProvider>{children}</GameContextProvider>
          </KeyboardContextProvider>
        </ThemeContextProvider>
      </body>
    </html>
  );
}
