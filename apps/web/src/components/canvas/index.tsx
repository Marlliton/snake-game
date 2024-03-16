"use client";
import { GameContext } from "@/contexts/game-context";
import { KeyboardContext } from "@/contexts/keyboard-context";
import { Container } from "@snake/ui";
import { use, useEffect, useRef } from "react";
import { emerald, amber } from "tailwindcss/colors";

export function Canvas() {
  const { registerObserver } = use(KeyboardContext);
  const { player, movePlayer, fruits } = use(GameContext);

  useEffect(() => {
    registerObserver({
      action: movePlayer,
      identifier: "move",
    });
  }, [movePlayer, registerObserver]);

  const fruitsList = fruits();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scale = 20;
  const rows = 60;
  const cols = 60;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = "#ffffff21";

      for (let i = 0; i < rows; i++) {
        ctx.beginPath();
        ctx.moveTo(0, i * scale);
        ctx.lineTo(canvas.width, i * scale);
        ctx.stroke();
      }

      for (let i = 0; i < cols; i++) {
        ctx.beginPath();
        ctx.moveTo(i * scale, 0);
        ctx.lineTo(i * scale, canvas.height);
        ctx.stroke();
      }

      for (let i = 0; i < fruitsList.length; i++) {
        ctx.fillStyle = emerald[500];
        ctx.fillRect(fruitsList[i]!.fruitX * scale, fruitsList[i]!.fruitY * scale, scale, scale);
      }

      const { playerX, playerY, body } = player;
      ctx.fillStyle = "red";
      ctx.fillRect(playerX * scale, playerY * scale, scale, scale);
      for (let i = 0; i < body.length; i++) {
        ctx.fillStyle = "#f59e0b80";
        if (!body.length) return;
        console.log("renderizando corpo");
        ctx.fillRect(body[i]!.x * scale, body[i]!.y * scale, scale, scale);
      }
    }
  }, [fruitsList, player]);
  return (
    <Container>
      <canvas
        className="no-blur bg-"
        ref={canvasRef}
        height={600}
        width={600}
        style={{ border: "solid 1px #969191" }}
      />
    </Container>
  );
}
