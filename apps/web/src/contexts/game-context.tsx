"use client";
import { Fruit, Game, Player, Screen } from "@snake/core";
import { MovePlayerUseCasse } from "@snake/core/use-cases";
import { UniqueEntityId } from "@snake/core/common";
import { createContext, useCallback, useState } from "react";

interface GameContextProps {
  game: Game;
  scale: number;
  rows: number;
  cols: number;
  movePlayer(command: string): void;
  fruits(): Fruit[];
  players(): Player[];
}

export const GameContext = createContext({} as GameContextProps);

const fruit = Fruit.create({ fruitX: 5, fruitY: 29 });
const fruit2 = Fruit.create({ fruitX: 3, fruitY: 16 });
const fruit3 = Fruit.create({ fruitX: 9, fruitY: 23 });
const fruit4 = Fruit.create({ fruitX: 3, fruitY: 21 });
const player = Player.create({ x: 0, y: 0 }, new UniqueEntityId("player-1"));
const player2 = Player.create(
  { x: 13, y: 27, body: [{ x: 13, y: 26 }] },
  new UniqueEntityId("player-2"),
);

const SCALE = 20;
const ROWS = 60;
const COLS = 60;

export function GameContextProvider({ children }: { children: React.ReactNode }) {
  const [game, setGame] = useState(
    Game.create({
      fruits: {
        [fruit.id.value]: fruit,
        [fruit2.id.value]: fruit2,
        [fruit3.id.value]: fruit3,
        [fruit4.id.value]: fruit4,
      },
      players: { [player.id.value]: player, [player2.id.value]: player2 },
      screen: Screen.createScreen({ height: 30, width: 30 }),
    }),
  );

  const movePlayer = useCallback(
    (command: string) => {
      const newGame = new MovePlayerUseCasse().execute({
        game,
        command,
        playerId: player.id, // TODO: tem ue ser dinamicamente
      });
      if (newGame.isLeft()) throw new Error("errr");
      setGame(newGame.value.game);
    },
    [game],
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
