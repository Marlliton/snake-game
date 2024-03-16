"use client";
import { Fruit, Game, MovePlayerUseCasse, Player, Screen, UniqueEntityId } from "@snake/core";
import { createContext, useCallback, useState } from "react";

interface GameContextProps {
  game: Game;
  player: Player;
  movePlayer(command: string): void;
  fruits(): Fruit[];
}

export const GameContext = createContext({} as GameContextProps);

const fruit = Fruit.create({ fruitX: 5, fruitY: 29 });
const fruit2 = Fruit.create({ fruitX: 3, fruitY: 16 });
const fruit3 = Fruit.create({ fruitX: 9, fruitY: 23 });
const fruit4 = Fruit.create({ fruitX: 3, fruitY: 21 });
const player = Player.create({ x: 0, y: 0 }, new UniqueEntityId("player-1"));

export function GameContextProvider({ children }: { children: React.ReactNode }) {
  const [game, setGame] = useState(
    Game.create({
      fruits: {
        [fruit.id.value]: fruit,
        [fruit2.id.value]: fruit2,
        [fruit3.id.value]: fruit3,
        [fruit4.id.value]: fruit4,
      },
      players: { [player.id.value]: player },
      screen: Screen.createScreen({ height: 30, width: 30 }),
    }),
  );

  const movePlayer = useCallback(
    (command: string) => {
      const newGame = new MovePlayerUseCasse().execute({
        game,
        command,
        playerId: player.id,
      });
      if (newGame.isLeft()) throw new Error("errr");
      setGame(newGame.value.game);
    },
    [game],
  );

  const fruits = useCallback(() => {
    const fruits = Object.entries(game.fruits).map(([_, fruit]) => fruit);
    console.log(fruits[0]?.coordinates);
    return fruits;
  }, [game.fruits]);

  return (
    <GameContext.Provider value={{ game, player: game.player(player.id)!, movePlayer, fruits }}>
      {children}
    </GameContext.Provider>
  );
}
