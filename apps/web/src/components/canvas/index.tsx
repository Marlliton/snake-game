"use client";
import { GameContext } from "@/contexts/game-context";
import { KeyboardContext } from "@/contexts/keyboard-context";
import { ThemeContext } from "@/contexts/theme-context";
import { Container, mergeClasseNames } from "@snake/ui";
import { use, useCallback, useEffect, useLayoutEffect, useRef } from "react";

export function Canvas() {
  const { registerObserver } = use(KeyboardContext);
  const { theme } = use(ThemeContext);
  const { player, cols, rows, scale, movePlayer, fruits } = use(GameContext);
  const fruitsList = fruits();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    registerObserver({
      action: movePlayer,
      identifier: "move",
    });
  }, [movePlayer, registerObserver]);

  const renderBoard = useCallback(
    (ctx: CanvasRenderingContext2D) => {
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const color = (row + col) % 2 === 0 ? theme["board-100"] : theme["board-200"];
          ctx.fillStyle = color;
          ctx.fillRect(row * scale, col * scale, scale, scale);
        }
      }
    },
    [cols, theme, rows, scale],
  );
  const renderPlayer = useCallback(
    (ctx: CanvasRenderingContext2D) => {
      const { playerX, playerY, body } = player;
      ctx.fillStyle = theme["snake-100"];
      ctx.fillRect(playerX * scale, playerY * scale, scale, scale);
      for (let i = 0; i < body.length; i++) {
        ctx.fillStyle = theme["snake-200"];
        if (!body.length) return;
        ctx.fillRect(body[i]!.x * scale, body[i]!.y * scale, scale, scale);
      }
    },
    [theme, player, scale],
  );

  const renderFruits = useCallback(
    (ctx: CanvasRenderingContext2D) => {
      for (let i = 0; i < fruitsList.length; i++) {
        ctx.fillStyle = theme.fruit;
        ctx.fillRect(fruitsList[i]!.fruitX * scale, fruitsList[i]!.fruitY * scale, scale, scale);
      }
    },
    [fruitsList, theme, scale],
  );

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      renderBoard(ctx);
      renderFruits(ctx);
      renderPlayer(ctx);
    }
  }, [renderBoard, renderFruits, renderPlayer]);
  return (
    <Container>
      <canvas
        className={mergeClasseNames("no-blur border")}
        style={{ borderColor: theme["board-700"] }}
        ref={canvasRef}
        height={600}
        width={600}
      />
    </Container>
  );
}
