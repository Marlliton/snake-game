"use client";
import { ThemeContext, THEME_OPTIONS } from "@/contexts/theme-context";
import { Palette } from "@phosphor-icons/react";
import { Flex, mergeClasseNames } from "@snake/ui";
import { use, useState } from "react";

export function Header() {
  const { theme, changeTheme } = use(ThemeContext);
  const [show, setShow] = useState(false);
  return (
    <header className={mergeClasseNames("flex justify-between mx-5 py-2 overflow-hidden bg")}>
      <div>Snake.game</div>
      <div className={mergeClasseNames("flex gap-2")}>
        <Flex>
          <button
            onClick={() => {
              changeTheme("GREEN_THEME");
              setShow(false);
            }}
            style={{ backgroundColor: THEME_OPTIONS.GREEN_THEME["700"] }}
            className={mergeClasseNames(
              "rounded-md w-8 h-8",
              { "animate-show": show },
              {
                "animate-[hidden_.8s_ease-in-out_forwards]": !show,
              },
            )}
          ></button>
          <button
            onClick={() => {
              changeTheme("PASTEL_THEME");
              setShow(false);
            }}
            style={{ backgroundColor: THEME_OPTIONS.PASTEL_THEME["700"] }}
            className={mergeClasseNames(
              "rounded-md w-8 h-8",
              {
                "animate-[show_.6s_ease-in-out]": show,
              },
              {
                "animate-[hidden_.6s_ease-in-out_forwards]": !show,
              },
            )}
          ></button>
          <button
            onClick={() => {
              changeTheme("VIOLET_THEME");
              setShow(false);
            }}
            style={{ backgroundColor: THEME_OPTIONS.VIOLET_THEME["700"] }}
            className={mergeClasseNames(
              "rounded-md w-8 h-8",
              {
                "animate-[show_.8s_ease-in-out]": show,
              },
              { "animate-hidden": !show },
            )}
          ></button>
        </Flex>
        <button
          onClick={() => setShow(!show)}
          className={mergeClasseNames("relative flex rounded-md")}
        >
          <Palette style={{ color: theme["200"] }} size={32} />
        </button>
      </div>
    </header>
  );
}
