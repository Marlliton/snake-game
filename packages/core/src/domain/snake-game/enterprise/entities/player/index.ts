import { Entity } from "@/common/entities/entity";
import { UniqueEntityId } from "@/common/entities/unique-entity-id";
import { Optional } from "@/common/types/Optional";

import { Screen } from "../value-objects/Screen";

export type Body = {
  x: number;
  y: number;
};

type AcceptedMoves = {
  [key: string]: () => Player;
};

export interface PlayerProps {
  x: number;
  y: number;
  lastMovement: "up" | "right" | "down" | "left" | null;
  body: Body[];
}

export class Player extends Entity<Player, PlayerProps> {
  get playerX() {
    return this.props.x;
  }

  get playerY() {
    return this.props.y;
  }

  get body() {
    return this.props.body;
  }

  get lastMovement() {
    return this.props.lastMovement;
  }

  get headCoordinates() {
    return {
      x: this.playerX,
      y: this.playerY,
    };
  }

  get fullBodyCoordinate() {
    return [this.headCoordinates].concat(this.body);
  }

  clearBodyPoints() {
    return {
      points: this.body,
      playerWithAnEmptyBody: this.clone({ body: [] }),
    };
  }

  increaseBody() {
    if (!this.lastMovement) return this;

    const movementMap = {
      up: { y: 1, x: 0 },
      down: { y: -1, x: 0 },
      left: { y: 0, x: 1 },
      right: { y: 0, x: -1 },
    };

    const lastCoordinate = this.fullBodyCoordinate.slice(-1)[0];
    const movement = movementMap[this.lastMovement];

    if (movement) {
      const newBodyItem: Body = {
        y: lastCoordinate!.y + movement.y,
        x: lastCoordinate!.x + movement.x,
      };

      return this.clone({ body: this.body.concat(newBodyItem) });
    }
    return this;
  }

  movePlayer(command: string, screen: Screen) {
    const acceptedMoves: AcceptedMoves = {
      up: (): Player => {
        const { playerY: y } = this;
        return this.move(this.clone({ y: y - 1, lastMovement: "up" }), screen);
      },
      right: (): Player => {
        const { playerX: x } = this;
        return this.move(this.clone({ x: x + 1, lastMovement: "right" }), screen);
      },
      down: (): Player => {
        const { playerY: y } = this;
        return this.move(this.clone({ y: y + 1, lastMovement: "down" }), screen);
      },
      left: (): Player => {
        const { playerX: x } = this;
        return this.move(this.clone({ x: x - 1, lastMovement: "left" }), screen);
      },
    };

    const moveFunction = acceptedMoves[command];

    if (moveFunction) {
      return moveFunction();
    }

    return this;
  }

  private move(player: Player, screen: Screen) {
    const { x: finalX, y: finalY } = screen.checkAndForceCorrectMovement({
      x: player.playerX,
      y: player.playerY,
    });

    let prevX = this.playerX;
    let prevY = this.playerY;

    const newBodyCoordinates = player.body.map((body) => {
      const tempX = body.x;
      const tempY = body.y;

      body.x = prevX;
      body.y = prevY;

      prevX = tempX;
      prevY = tempY;

      return body;
    });

    return player.clone({ x: finalX, y: finalY, body: newBodyCoordinates });
  }

  state() {
    return {
      id: this.id.value,
      x: this.playerX,
      y: this.playerY,
      body: this.body,
    };
  }

  static create(props: Optional<PlayerProps, "lastMovement" | "body">, id?: UniqueEntityId) {
    const player = new Player(
      {
        ...props,
        lastMovement: props.lastMovement ?? null,
        body: props.body ?? [],
      },
      id,
    );

    return player;
  }
}
