import { Either, right } from "@/common/error/either";

import { Fruit } from "../../enterprise/entities/fruit";
import { Game } from "../../enterprise/entities/game";

interface AddFruitUseCaseRequest {
  x?: number;
  y?: number;
  game: Game;
}

type AddFruitUseCaseResponse = Either<null, { game: Game }>;

export class AddFruitUseCase {
  execute({ x, y, game }: AddFruitUseCaseRequest): AddFruitUseCaseResponse {
    const fruit = Fruit.create({
      fruitX: x ?? Math.floor(Math.random() * 30),
      fruitY: y ?? Math.floor(Math.random() * 30),
    });

    const newGame = game.addFruit(fruit);

    return right({ game: newGame });
  }
}
