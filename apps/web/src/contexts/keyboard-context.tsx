"use client";
import { createContext, useEffect, useState } from "react";

type Observer = {
  [type: string]: () => void;
};

declare module "@/contexts/keyboard-context" {
  interface KeyboardContextProps {
    registerObserver(observer: Observer): void;
  }
}

export const KeyboardContext = createContext({} as KeyboardContextProps);

export function KeyboardContextProvider({ children }: { children: React.ReactNode }) {
  const [observers, serObservers] = useState<Record<string, Observer>>({});

  // useEffect(() => {
  //   const notify = (key: KeyboardEvent) => {
  //     for (const observer of observers) {
  //       observer(key);
  //     }
  //   };

  //   if (!document) return;
  //   document.addEventListener("keydown", notify);
  //   console.log("notificando");
  //   return () => document.removeEventListener("keydown", notify);
  // }, [observers]);

  const registerObserver = (observer: Observer) => {
    console.log("🚀 ~ registerObserver ~ observer:", observer);
  };

  return (
    <KeyboardContext.Provider value={{ registerObserver }}>{children}</KeyboardContext.Provider>
  );
}
