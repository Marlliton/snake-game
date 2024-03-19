import { UniqueEntityId } from "@/common";
import { Either, right } from "@/common/error/either";

import { Game } from "../../enterprise/entities/game";
import { Player, PlayerProps } from "../../enterprise/entities/player";

interface AddPlayerUseCasseRequest {
  player?: Partial<PlayerProps>;
  playerId?: string;
  game: Game;
}

type AddPlayerUseCasseResponse = Either<null, { game: Game }>;

export class AddPlayerUseCasse {
  execute({ game, player, playerId }: AddPlayerUseCasseRequest): AddPlayerUseCasseResponse {
    const playerCreated = Player.create(
      {
        x: Math.floor(Math.random() * 30),
        y: Math.floor(Math.random() * 30),
        ...player,
      },
      new UniqueEntityId(playerId),
    );

    return right({ game: game.addPlayer(playerCreated) });
  }
}
