import { Entity } from "@/common/entities/entity";
import { UniqueEntityId } from "@/common/entities/unique-entity-id";

import { Fruit } from "../fruit";
import { Player } from "../player";
import { Screen } from "../value-objects/Screen";

export interface GameProps {
  players: Record<string, Player>;
  fruits: Record<string, Fruit>;
  screen: Screen;
}

export class Game extends Entity<Game, GameProps> {
  get players() {
    return this.props.players;
  }

  get screen(): Screen {
    return this.props.screen;
  }

  player(playerId: UniqueEntityId): Player | null {
    const playerInPlayers = playerId.value in this.players;
    if (!playerInPlayers) return null;

    return this.players[playerId.value]!;
  }

  addPlayer(player: Player): Game {
    return this.clone({
      players: {
        ...this.players,
        [player.id.value]: player,
      },
    });
  }

  removePlayer(playerId: UniqueEntityId): Game {
    const { [playerId.value]: _, ...remainingPlayers } = this.players;

    return this.clone({ players: remainingPlayers });
  }

  movePlayer(player: Player): Game {
    const { x, y } = this.screen.checkAndForceCorrectMovement({
      x: player.playerX,
      y: player.playerY,
    });

    return this.clone({
      players: { ...this.players, [player.id.value]: player.clone({ playerX: x, playerY: y }) },
    });
  }

  static createGame(props: GameProps): Game {
    const game = new Game({
      ...props,
    });

    return game;
  }
}
