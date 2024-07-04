"use client";
import { Fruit, Game, Player, Screen } from "@snake/core";
import { UniqueEntityId } from "@snake/core/common";
import { MovePlayerUseCasse } from "@snake/core/use-cases";
import { createContext, use, useCallback, useEffect, useRef, useState } from "react";

import { Socket, io } from "socket.io-client";
import { KeyboardContext } from "./keyboard-context";

interface GameContextProps {
  game: Game;
  scale: number;
  rows: number;
  cols: number;
  playerId: string | null;
  movePlayer(command: string): void;
  fruits(): Fruit[];
  players(): Player[];
}

export const GameContext = createContext({} as GameContextProps);

const SCALE = 20;
const ROWS = 60;
const COLS = 60;

export function GameContextProvider({ children }: { children: React.ReactNode }) {
  const { registerObserver } = use(KeyboardContext);
  const ioRef = useRef<Socket>();
  const [playerId, setPlayerId] = useState<string | null>(null);
  const [game, setGame] = useState(
    Game.create({
      fruits: {},
      players: {},
      screen: Screen.createScreen({ height: 30, width: 30 }),
    }),
  );

  const movePlayer = useCallback(
    (command: string) => {
      if (!playerId) return;
      const result = new MovePlayerUseCasse().execute({
        game,
        command,
        playerId: new UniqueEntityId(playerId),
      });
      if (result.isLeft()) throw result.value;

      setGame(result.value.game);
    },
    [game, playerId],
  );

  useEffect(() => {
    // registerObserver({
    //   action: movePlayer,
    //   identifier: "move",
    // });
    registerObserver({
      action: (command: string) => {
        ioRef.current?.emit("new-movement", { command });
      },
      identifier: "emiter",
    });
  }, [movePlayer, registerObserver]);

  useEffect(() => {
    if (!ioRef.current) {
      ioRef.current = io("http://localhost:3333");
    }

    ioRef.current.on("connect", () => {
      ioRef.current?.on("bootstrap", ({ setup, playerId }) => {
        const createdSetup = game.updateState(setup);

        setPlayerId(playerId);
        setGame(createdSetup);
      });
    });

    ioRef.current.on("setup", ({ setup }) => {
      const gameState = game.updateState(setup);

      setGame(gameState);
    });

    ioRef.current.on("player-disconnect", ({ state }) => {
      setGame(game.updateState(state));
    });
  }, [game, playerId]);

  const fruits = useCallback(() => {
    const fruits = Object.entries(game.fruits).map(([_, fruit]) => fruit);
    return fruits;
  }, [game.fruits]);

  const players = useCallback(() => {
    const players = Object.entries(game.players).map(([_, player]) => player);
    return players;
  }, [game.players]);

  return (
    <GameContext.Provider
      value={{
        game,
        playerId,
        cols: COLS,
        rows: ROWS,
        scale: SCALE,
        players,
        movePlayer,
        fruits,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}
