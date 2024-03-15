"use client";

import { Canvas } from "@/components/canvas";
import { KeyboardContext } from "@/contexts/keyboard-context";
import { Page } from "@snake/ui";
import { use, useContext, useEffect } from "react";
export default function Home() {
  const { registerObserver } = useContext(KeyboardContext);

  useEffect(() => {
    registerObserver({ move: console.log });
  }, []);

  return (
    <Page>
      <Canvas />
    </Page>
  );
}
