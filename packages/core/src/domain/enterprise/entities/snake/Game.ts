import { Entity } from "@/common/entities/entity";
import { UniqueEntityId } from "@/common/entities/unique-entity-id";
import { Fruit } from "@/common/value-objects/Fruit";
import { Player } from "@/common/value-objects/Player";

type ScreenProperties = {
  width: number;
  height: number;
};
export interface GameProps {
  players: Record<string, Player>;
  fruits: Record<string, Fruit>;
  screen: ScreenProperties;
}

export class Game extends Entity<Game, GameProps> {
  protected constructor(props: GameProps) {
    super(props);
  }

  get players() {
    return this.props.players;
  }

  get screen(): ScreenProperties {
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
    const correctMovement = this.checkAndForceCorrectMovement(player);
    return this.clone({
      players: { ...this.players, [player.id.value]: correctMovement },
    });
  }

  static createGame(props: GameProps): Game {
    const game = new Game({
      ...props,
    });

    return game;
  }

  private checkAndForceCorrectMovement(player: Player): Player {
    const { height, width } = this.screen;
    const { playerX, playerY } = player;

    const isPlayerXOutOfBounds = playerX < 0 || playerX >= width;
    const isPlayerYOutOfBounds = playerY < 0 || playerY >= height;

    let finalPlayerX = playerX;
    let finalPlayerY = playerY;

    if (isPlayerXOutOfBounds) {
      finalPlayerX = playerX < 0 ? width - 1 : 0;
    }

    if (isPlayerYOutOfBounds) {
      finalPlayerY = playerY < 0 ? height - 1 : 0;
    }

    const finalPlayerPosition = player.clone({
      playerX: finalPlayerX,
      playerY: finalPlayerY,
    });

    return finalPlayerPosition;
  }
}
