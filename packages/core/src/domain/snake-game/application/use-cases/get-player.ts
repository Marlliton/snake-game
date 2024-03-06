import { UniqueEntityId } from "@/common/entities/unique-entity-id";
import { PlayerNotFoundError } from "@/common/error/application/use-cases/player-not-found-error";
import { Either, left, right } from "@/common/error/either";

import { Game } from "../../enterprise/entities/game";
import { Player } from "../../enterprise/entities/player";

interface GetPlayerUseCaseRequest {
  playerId: UniqueEntityId;
  game: Game;
}

type GetPlayerUseCaseResponse = Either<PlayerNotFoundError, { player: Player }>;

export class GetPlayerUseCase {
  execute({ game, playerId }: GetPlayerUseCaseRequest): GetPlayerUseCaseResponse {
    const player = game.player(playerId);

    if (!player) {
      return left(new PlayerNotFoundError());
    }

    return right({ player });
  }
}
