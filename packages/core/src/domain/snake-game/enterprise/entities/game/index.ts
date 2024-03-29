import { Entity } from "@/common/entities/entity";
import { UniqueEntityId } from "@/common/entities/unique-entity-id";

import { Fruit } from "../fruit";
import { Body, Player } from "../player";
import { Coordinates } from "../value-objects/Coordinates";
import { Screen } from "../value-objects/Screen";
import { CollisionDetection } from "./CollisionDetection";

export interface GameProps {
  players: Record<string, Player>;
  fruits: Record<string, Fruit>;
  screen: Screen;
}

export type GameState = {
  fruits: {
    fruitY: number;
    fruitX: number;
    id: string;
  }[];
  players: {
    id: string;
    x: number;
    y: number;
    body: Body[];
  }[];
  screen: {
    width: number;
    height: number;
  };
};

export class Game extends Entity<Game, GameProps> {
  private static observers: any[] = []; // TODO: REFATORA OS OBSERVADORES PARA UMA CLASSE OU DEIXAR MAIS ORGANIZADO.
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
        playersIterable.flatMap(([_, p]) => Object.values(p.headCoordinates)),
        this.screen.width,
      );

      return this.clone({
        players: { ...this.players, [player.id.value]: player.clone({ x, y }) },
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
    const playerToMove = this.player(playerId);
    if (!playerToMove) return this;

    const playerMoved = playerToMove.movePlayer(command, this.screen);

    const finalGameState = this.applyMovementEffects(playerMoved);

    this.notifyAll();
    return finalGameState;
  }

  state(): GameState {
    const fruits = Object.entries(this.fruits).map(([_, fruit]) => fruit.state());
    const players = Object.entries(this.players).map(([_, player]) => player.state());
    return {
      fruits,
      players,
      screen: this.screen.state(),
    };
  }

  updateState(state: GameState): Game {
    const players = state.players.reduce(
      (players, currentPlayer) => {
        const instance = Player.create(
          {
            x: currentPlayer.x,
            y: currentPlayer.y,
            body: currentPlayer.body,
          },
          new UniqueEntityId(currentPlayer.id),
        );

        players[currentPlayer.id] = instance;
        return players;
      },
      {} as Record<string, Player>,
    );

    const fruits = state.fruits.reduce(
      (fruits, currentFruit) => {
        const instance = Fruit.create(
          {
            fruitX: currentFruit.fruitX,
            fruitY: currentFruit.fruitY,
          },
          new UniqueEntityId(currentFruit.id),
        );

        fruits[currentFruit.id] = instance;
        return fruits;
      },
      {} as Record<string, Fruit>,
    );

    return this.clone({ fruits, players, screen: Screen.createScreen(state.screen) });
  }

  onMove(callback: () => void) {
    Game.observers.push(callback);
  }

  private notifyAll() {
    Game.observers.forEach((callback) => {
      callback();
    });
  }

  private applyMovementEffects(playerMoved: Player): Game {
    const isFruitCollided = Object.entries(this.fruits).find(([_, fruit]) =>
      fruit.checkCollision(playerMoved.playerX, playerMoved.playerY),
    );
    const isPlayerCollided = new CollisionDetection(this.players, playerMoved).execute();

    if (isPlayerCollided) {
      const { points, playerWithAnEmptyBody } = playerMoved.clearBodyPoints();
      const createdFruits = this.addFruitsFromPoints(points);

      return this.clone({
        players: { ...this.players, [playerWithAnEmptyBody.id.value]: playerWithAnEmptyBody },
        fruits: { ...this.fruits, ...createdFruits },
      });
    }

    if (isFruitCollided?.length) {
      const [_, fruit] = isFruitCollided;
      const increasedPlayer = playerMoved.increaseBody();

      return this.removeFruit(fruit.id).clone({
        players: { ...this.players, [playerMoved.id.value]: increasedPlayer },
      });
    }

    return this.clone({ players: { ...this.players, [playerMoved.id.value]: playerMoved } });
  }

  private addFruitsFromPoints(points: { x: number; y: number }[]) {
    const fruits: Record<string, Fruit> = points.reduce(
      (fruits, currentPoint) => {
        const fruit = Fruit.create({ fruitX: currentPoint.x, fruitY: currentPoint.y });
        fruits[fruit.id.value] = fruit;
        return fruits;
      },
      {} as Record<string, Fruit>,
    );

    return fruits;
  }

  static create(props: GameProps): Game {
    const game = new Game({
      ...props,
    });

    return game;
  }
}
