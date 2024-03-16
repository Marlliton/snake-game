"use client";
import { createContext, useEffect, useRef } from "react";

type ObserverFuc = (key: string) => void;
type Observer = {
  identifier: string;
  action: ObserverFuc;
};
interface KeyboardContextProps {
  registerObserver(observer: Observer): void;
}

export const KeyboardContext = createContext({} as KeyboardContextProps);

export function KeyboardContextProvider({ children }: { children: React.ReactNode }) {
  const observersRefs = useRef<Observer[]>([]);

  useEffect(() => {
    if (!observersRefs.current) return;
    function notify(event: KeyboardEvent) {
      const observers = observersRefs.current;
      for (const observer of observers) {
        observer.action(event.key.replace("Arrow", "").toLowerCase());
      }
    }
    if (!document) return;
    document.addEventListener("keydown", notify);
    return () => document.removeEventListener("keydown", notify);
  }, []);

  const registerObserver = (observer: Observer) => {
    const observerIndex = observersRefs.current.findIndex(
      (ob) => ob.identifier === observer.identifier,
    );

    if (observerIndex > -1) {
      observersRefs.current[observerIndex] = observer;
    } else {
      observersRefs.current.push(observer);
    }
  };

  return (
    <KeyboardContext.Provider value={{ registerObserver }}>{children}</KeyboardContext.Provider>
  );
}
