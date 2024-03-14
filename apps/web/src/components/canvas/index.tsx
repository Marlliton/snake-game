"use client";
import { Container } from "@snake/ui";
import { useEffect, useRef } from "react";

export function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scale = 10;
  const rows = 40;
  const cols = 40;

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

      ctx.fillStyle = "red";
      ctx.fillRect(0 * scale, 0 * scale, scale, scale);
    }
  }, []);
  return (
    <Container>
      <canvas
        className="no-blur"
        ref={canvasRef}
        height={400}
        width={400}
        style={{ border: "solid 1px #969191" }}
      />
    </Container>
  );
}
