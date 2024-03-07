import { Either, right } from "@/common/error/either";

import { Game } from "../../enterprise/entities/game";
import { Player } from "../../enterprise/entities/player";

interface AddPlayerUseCasseRequest {
  player?: Player;
  game: Game;
}

type AddPlayerUseCasseResponse = Either<null, { game: Game }>;

export class AddPlayerUseCasse {
  execute({ game, player: p }: AddPlayerUseCasseRequest): AddPlayerUseCasseResponse {
    if (!p) {
      const player = Player.create({ x: 0, y: 0 });

      return right({ game: game.addPlayer(player) });
    }

    return right({ game: game.addPlayer(p) });
  }
}
