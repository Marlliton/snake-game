"use client";
import { Flex, mergeClasseNames } from "@snake/ui";
import { useState } from "react";

export function Header() {
  const [show, setShow] = useState(false);
  return (
    <header className={mergeClasseNames("flex justify-between mx-5")}>
      <div>Snake.game</div>
      <div
        className={mergeClasseNames("relative bg-blue-400 w-10 h-10 rounded-md", {
          "w-auto": show,
        })}
        onClick={() => setShow(true)}
      >
        <Flex
          className={mergeClasseNames("overflow-hidden transition-all duration-[3000ms] w-0", {
            "w-auto": show,
          })}
        >
          <span>Gree</span>
          <span>Pastel</span>
          <span>Violet</span>
        </Flex>
      </div>
    </header>
  );
}
