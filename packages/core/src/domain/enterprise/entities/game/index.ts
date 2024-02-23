import { Entity } from "@/common/entities/entity";
import { UniqueEntityId } from "@/common/entities/unique-entity-id";

import { Fruit } from "../fruit";
import { Player } from "../player";
import { Coordinates } from "../value-objects/Coordinates";
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

  get fruits() {
    return this.props.fruits;
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
    const { playerX, playerY } = player;
    const playersIterable = Object.entries(this.players);
    const isPlayersInTheSameCoordinate = playersIterable.filter(
      ([_, p]) => p.playerX === playerX && p.playerY === playerY,
    );

    if (isPlayersInTheSameCoordinate.length) {
      const [x, y] = Coordinates.generateUniqueCoordinateXAndY(
        playersIterable.flatMap(([_, p]) => [...p.coordinates]),
        this.screen.width,
      );

      return this.clone({
        players: { ...this.players, [player.id.value]: player.clone({ playerX: x, playerY: y }) },
      });
    }

    return this.clone({
      players: {
        ...this.players,
        [player.id.value]: player,
      },
    });
  }

  addFruit(fruit: Fruit): Game {
    const { fruitX, fruitY } = fruit;
    const fruitsIterable = Object.entries(this.fruits);
    const isFruitsInTheSameCoordinate = fruitsIterable.filter(
      ([_, f]) => f.fruitX === fruitX && f.fruitY === fruitY,
    );

    if (isFruitsInTheSameCoordinate.length) {
      const [x, y] = Coordinates.generateUniqueCoordinateXAndY(
        fruitsIterable.flatMap(([_, f]) => [...f.coordinates]),
        this.screen.width,
      );

      return this.clone({
        fruits: { ...this.fruits, [fruit.id.value]: fruit.clone({ fruitX: x, fruitY: y }) },
      });
    }
    return this.clone({
      fruits: { ...this.fruits, [fruit.id.value]: fruit },
    });
  }

  removePlayer(playerId: UniqueEntityId): Game {
    const { [playerId.value]: _, ...remainingPlayers } = this.players;

    return this.clone({ players: remainingPlayers });
  }

  removeFruit(fruitId: UniqueEntityId) {
    const { [fruitId.value]: _, ...remainingFruits } = this.fruits;

    return this.clone({ fruits: remainingFruits });
  }

  movePlayer(playerId: UniqueEntityId, command: string): Game {
    const movingPlayer = this.player(playerId);
    if (!movingPlayer) return this;

    const acceptedMoves: acceptedMoves = {
      up: (player: Player): Game => {
        const { playerY: y } = player;
        return this.move(player.clone({ playerY: y - 1, lastMovement: "up" }));
      },
      right: (player: Player): Game => {
        const { playerX: x } = player;
        return this.move(player.clone({ playerX: x + 1, lastMovement: "right" }));
      },
      down: (player: Player): Game => {
        const { playerY: y } = player;
        return this.move(player.clone({ playerY: y + 1, lastMovement: "down" }));
      },
      left: (player: Player): Game => {
        const { playerX: x } = player;
        return this.move(player.clone({ playerX: x - 1, lastMovement: "left" }));
      },
    };

    const moveFunction = acceptedMoves[command];

    if (moveFunction) {
      const newGameState = moveFunction(movingPlayer);

      const finalGameState = this.applyMovementEffects(newGameState, movingPlayer.id);
      return finalGameState;
    }

    return this;
  }

  private applyMovementEffects(gameState: Game, playerId: UniqueEntityId): Game {
    const movedPlayer = gameState.player(playerId);

    const isFruitCollided = Object.entries(this.fruits).find(([_, fruit]) =>
      fruit.checkCollision(movedPlayer!.playerX, movedPlayer!.playerY),
    );

    if (isFruitCollided?.length) {
      const [_, fruit] = isFruitCollided;
      const increasedPlayer = movedPlayer!.increaseBody();

      return gameState.removeFruit(fruit.id).clone({
        players: { ...this.players, [movedPlayer!.id.value]: increasedPlayer },
      });
    }
    return gameState;
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
