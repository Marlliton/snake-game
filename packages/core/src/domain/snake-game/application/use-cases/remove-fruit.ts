import { UniqueEntityId } from "@/common/entities/unique-entity-id";
import { FruitNotFoundError } from "@/common/error/application/use-cases/fruit-not-found-error";
import { Either, left, right } from "@/common/error/either";

import { Game } from "../../enterprise/entities/game";

interface RemoveFruitUseCaseRequest {
  game: Game;
  fruitId: UniqueEntityId;
}

type RemoveFruitUseCaseResponse = Either<FruitNotFoundError, { game: Game }>;

export class RemoveFruitUseCase {
  execute({ fruitId, game }: RemoveFruitUseCaseRequest): RemoveFruitUseCaseResponse {
    const fruit = game.fruits[fruitId.value];
    if (!fruit) return left(new FruitNotFoundError());

    return right({ game: game.removeFruit(fruitId) });
  }
}
