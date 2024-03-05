import { Either, right } from "@/common/error/either";

import { Fruit } from "../../enterprise/entities/fruit";
import { Game } from "../../enterprise/entities/game";

interface AddFruitUseCaseRequest {
  fruitX: number;
  fruitY: number;
  game: Game;
}

type AddFruitUseCaseResponse = Either<null, { game: Game }>;

export class AddFruitUseCase {
  execute({ fruitX, fruitY, game }: AddFruitUseCaseRequest): AddFruitUseCaseResponse {
    const fruit = Fruit.create({ fruitX, fruitY });

    const newGame = game.addFruit(fruit);

    return right({ game: newGame });
  }
}
