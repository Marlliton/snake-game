import { UniqueEntityId } from "@/common/entities/unique-entity-id";
import { PlayerNotFoundError } from "@/common/error/application/use-cases/player-not-found-error";
import { Either, left, right } from "@/common/error/either";

import { Game } from "../../enterprise/entities/game";

interface RemovePlayerUseCasseRequest {
  playerId: UniqueEntityId;
  game: Game;
}

type RemovePlayerUseCasseResponse = Either<PlayerNotFoundError, { game: Game }>;

export class RemovePlayerUseCasse {
  execute({ game, playerId }: RemovePlayerUseCasseRequest): RemovePlayerUseCasseResponse {
    const player = game.player(playerId);
    if (!player) return left(new PlayerNotFoundError());

    return right({ game: game.removePlayer(playerId) });
  }
}
