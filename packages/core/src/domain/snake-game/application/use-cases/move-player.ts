import { UniqueEntityId } from "@/common/entities/unique-entity-id";
import { PlayerNotFoundError } from "@/common/error/application/use-cases/player-not-found-error";
import { Either, left, right } from "@/common/error/either";

import { Game } from "../../enterprise/entities/game";

interface MovePlayerUseCasseRequest {
  playerId: UniqueEntityId;
  game: Game;
  command: string;
}

type MovePlayerUseCasseResponse = Either<PlayerNotFoundError, { game: Game }>;

export class MovePlayerUseCasse {
  execute({ game, playerId, command }: MovePlayerUseCasseRequest): MovePlayerUseCasseResponse {
    const player = game.player(playerId);
    if (!player) return left(new PlayerNotFoundError());

    return right({ game: game.movePlayer(playerId, command) });
  }
}
