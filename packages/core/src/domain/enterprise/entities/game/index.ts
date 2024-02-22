import { Entity } from "@/common/entities/entity";
import { UniqueEntityId } from "@/common/entities/unique-entity-id";

import { Fruit } from "../fruit";
import { Player } from "../player";
import { Screen } from "../value-objects/Screen";

type acceptedMoves = {
  [key: string]: (player: Player) => Game;
};

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

  movePlayer(playerId: UniqueEntityId, command: string): Game {
    const movingPlayer = this.player(playerId);
    if (!movingPlayer) return this;

    const acceptedMoves: acceptedMoves = {
      up: (player: Player): Game => {
        const { playerY: y } = player;
        return this.move(player.clone({ playerY: y - 1 }));
      },
      right: (player: Player): Game => {
        const { playerX: x } = player;
        return this.move(player.clone({ playerX: x + 1 }));
      },
      down: (player: Player): Game => {
        const { playerY: y } = player;
        return this.move(player.clone({ playerY: y + 1 }));
      },
      left: (player: Player): Game => {
        const { playerX: x } = player;
        return this.move(player.clone({ playerX: x - 1 }));
      },
    };

    const moveFunction = acceptedMoves[command];

    if (moveFunction) {
      return moveFunction(movingPlayer);
    }

    return this;
  }

  private move(player: Player): Game {
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
