import {
  AddFruitUseCase,
  AddPlayerUseCasse,
  GetPlayerUseCase,
  MovePlayerUseCasse,
  RemoveFruitUseCase,
  RemovePlayerUseCasse,
} from "./domain/snake-game/application/use-cases";
import { Fruit, Game, Player, Screen } from "./domain/snake-game/enterprise/entities";
import type { GameProps, ScreenProps } from "./domain/snake-game/enterprise/entities";

export {
  Fruit,
  Game,
  Player,
  Screen,
  AddFruitUseCase,
  AddPlayerUseCasse,
  GetPlayerUseCase,
  MovePlayerUseCasse,
  RemoveFruitUseCase,
  RemovePlayerUseCasse,
};
export type { GameProps, ScreenProps };
