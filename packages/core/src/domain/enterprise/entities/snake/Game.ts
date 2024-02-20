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

  player(playerId: UniqueEntityId) {
    return this.players[playerId.value];
  }

  addPlayer(player: Player) {
    return this.clone({
      players: {
        ...this.players,
        [player.id.value]: player,
      },
    });
  }

  get players() {
    return this.props.players;
  }

  removePlayer(playerId: UniqueEntityId) {
    const { [playerId.value]: _, ...remainingPlayers } = this.players;

    return this.clone({ players: remainingPlayers });
  }

  movePlayer(player: Player) {
    return this.clone({
      players: { ...this.players, [player.id.value]: player },
    });
  }

  static createGame(props: GameProps) {
    const game = new Game({
      ...props,
    });

    return game;
  }
}
