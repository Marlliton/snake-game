import { UniqueEntityId } from "@/common/entities/unique-entity-id";
import { Either, right } from "@/common/error/either";

import { Game } from "../../enterprise/entities/game";

interface RemovePlayerUseCasseRequest {
  playerId: UniqueEntityId;
  game: Game;
}

type RemovePlayerUseCasseResponse = Either<null, { game: Game }>;

export class RemovePlayerUseCasse {
  execute({ game, playerId }: RemovePlayerUseCasseRequest): RemovePlayerUseCasseResponse {
    return right({ game: game.removePlayer(playerId) });
  }
}
