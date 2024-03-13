"use client";
import { Button } from "@snake/ui/button";
import { useEffect, useRef } from "react";
import { Socket, io } from "socket.io-client";

export default function Page() {
  const ioRef = useRef<Socket>();

  useEffect(() => {
    ioRef.current = io("http://localhost:3333");
    ioRef.current.on("connect", () => {
      ioRef.current?.emit("message", { hallo: "world" });
    });

    ioRef.current.on("from-server", (s, ...args) => {
      console.log(s, args);
    });
  }, []);
  return (
    <div>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <Button children="Teste" appName="botão" />
    </div>
  );
}
