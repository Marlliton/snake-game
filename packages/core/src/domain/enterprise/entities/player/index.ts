import { Optional } from "@/types/Optional";

import { Entity } from "../../../../common/entities/entity";
import { UniqueEntityId } from "../../../../common/entities/unique-entity-id";
import { Screen } from "../value-objects/Screen";

type Body = {
  x: number;
  y: number;
};

type acceptedMoves = {
  [key: string]: () => Player;
};

interface PlayerProps {
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

  increaseBody() {
    const lastCoordinate = this.fullBodyCoordinate.slice(-1)[0];
    if (this.lastMovement === "up") {
      const newBodyItem: Body = { y: lastCoordinate!.y + 1, x: lastCoordinate!.x };

      return this.clone({ body: this.body.concat(newBodyItem) });
    }
    if (this.lastMovement === "down") {
      const newBodyItem: Body = { y: lastCoordinate!.y - 1, x: lastCoordinate!.x };

      return this.clone({ body: this.body.concat(newBodyItem) });
    }
    if (this.lastMovement === "left") {
      const newBodyItem: Body = { y: lastCoordinate!.y, x: lastCoordinate!.x + 1 };

      return this.clone({ body: this.body.concat(newBodyItem) });
    }
    if (this.lastMovement === "right") {
      const newBodyItem: Body = { y: lastCoordinate!.y, x: lastCoordinate!.x - 1 };
      return this.clone({ body: this.body.concat(newBodyItem) });
    }

    return this;
  }

  movePlayer(command: string, screen: Screen) {
    const acceptedMoves: acceptedMoves = {
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

  static createPlayer(props: Optional<PlayerProps, "lastMovement" | "body">, id?: UniqueEntityId) {
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
