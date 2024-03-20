"use client";
import { GameContext } from "@/contexts/game-context";
import { ThemeContext } from "@/contexts/theme-context";
import { Container, mergeClasseNames } from "@snake/ui";
import { use, useCallback, useEffect, useRef, useState } from "react";

export function Canvas() {
  const { theme } = use(ThemeContext);
  const { playerId, cols, rows, scale, fruits, players } = use(GameContext);
  const fruitsList = fruits();
  const playersList = players();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [animationFrameId, setAnimationFrameId] = useState<number | null>(null);

  const renderBoard = useCallback(
    (ctx: CanvasRenderingContext2D) => {
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const color = (row + col) % 2 === 0 ? theme["500"] : theme["600"];
          ctx.fillStyle = color;
          ctx.fillRect(row * scale, col * scale, scale, scale);
        }
      }
    },
    [cols, theme, rows, scale],
  );
  const renderPlayers = useCallback(
    (ctx: CanvasRenderingContext2D) => {
      if (!playerId) return;
      console.log("renderizando player inicio");
      playersList.forEach((p) => {
        const { playerX, playerY, body } = p;

        ctx.fillStyle = p.id.value === playerId ? theme["300"] : theme["350"];
        ctx.fillRect(playerX * scale, playerY * scale, scale, scale);

        for (let i = 0; i < body.length; i++) {
          ctx.fillStyle = p.id.value === playerId ? theme["400"] : theme["450"];
          if (!body.length) return;
          ctx.fillRect(body[i]!.x * scale, body[i]!.y * scale, scale, scale);
        }
      });
    },
    [playerId, playersList, theme, scale],
  );

  const renderFruits = useCallback(
    (ctx: CanvasRenderingContext2D) => {
      for (let i = 0; i < fruitsList.length; i++) {
        ctx.fillStyle = theme["100"];
        ctx.fillRect(fruitsList[i]!.fruitX * scale, fruitsList[i]!.fruitY * scale, scale, scale);
      }
    },
    [fruitsList, theme, scale],
  );

  const renderGame = useCallback(
    (canvas: HTMLCanvasElement | null) => {
      if (canvas) {
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        renderBoard(ctx);
        renderFruits(ctx);
        renderPlayers(ctx);

        setAnimationFrameId(requestAnimationFrame(() => renderGame(canvas)));
      }
    },
    [renderBoard, renderFruits, renderPlayers],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    renderGame(canvas);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [animationFrameId, renderGame]);

  return (
    <Container>
      <canvas
        className={mergeClasseNames("no-blur border")}
        style={{ borderColor: theme["700"] }}
        ref={canvasRef}
        height={600}
        width={600}
      />
    </Container>
  );
}
