"use client";
import { Fruit, Game, GameProps, Player, Screen } from "@snake/core";
import { UniqueEntityId } from "@snake/core/common";
import { MovePlayerUseCasse } from "@snake/core/use-cases";
import { createContext, useCallback, useEffect, useRef, useState } from "react";

import { Socket, io } from "socket.io-client";

interface GameContextProps {
  game: Game;
  scale: number;
  rows: number;
  cols: number;
  player: Player | null;
  movePlayer(command: string): void;
  fruits(): Fruit[];
  players(): Player[];
}

export const GameContext = createContext({} as GameContextProps);

const SCALE = 20;
const ROWS = 60;
const COLS = 60;

export function GameContextProvider({ children }: { children: React.ReactNode }) {
  const ioRef = useRef<Socket>();
  const [player, setPlayer] = useState<Player | null>(null);
  const [game, setGame] = useState(
    Game.create({
      fruits: {},
      players: {},
      screen: Screen.createScreen({ height: 30, width: 30 }),
    }),
  );

  useEffect(() => {
    if (!ioRef.current) {
      ioRef.current = io("http://localhost:3333");
    }

    ioRef.current.on("connect", () => {
      ioRef.current?.on("bootstrap", ({ setup, playerId }) => {
        const setupGame: GameProps = {
          fruits: {},
          players: {},
          screen: Screen.createScreen({ height: setup.screen.height, width: setup.screen.width }),
        };

        setup.players.forEach((player) => {
          const instance = Player.create(
            {
              x: player.x,
              y: player.y,
              body: player.body,
            },
            new UniqueEntityId(player.id),
          );
          setupGame.players[instance.id.value] = instance;
        });

        setup.fruits.forEach((fruit) => {
          const instance = Fruit.create(
            {
              fruitX: fruit.fruitX,
              fruitY: fruit.fruitY,
            },
            new UniqueEntityId(fruit.id),
          );
          setupGame.fruits[instance.id.value] = instance;
        });

        const game = Game.create(setupGame);
        const player = game.player(new UniqueEntityId(playerId));

        setPlayer(player!);
        setGame(game);
      });
    });

    // ioRef.current.on("setup", (setup) => {

    // });
  }, []);

  const movePlayer = useCallback(
    (command: string) => {
      if (!player) return;
      const newGame = new MovePlayerUseCasse().execute({
        game,
        command,
        playerId: player.id, // TODO: tem ue ser dinamicamente
      });
      if (newGame.isLeft()) throw new Error("errr");
      setGame(newGame.value.game);
    },
    [game, player],
  );

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
        player,
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
