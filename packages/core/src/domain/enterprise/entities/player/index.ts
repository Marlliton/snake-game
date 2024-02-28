import { Optional } from "@/types/Optional";

import { Entity } from "../../../../common/entities/entity";
import { UniqueEntityId } from "../../../../common/entities/unique-entity-id";
import { Screen } from "../value-objects/Screen";

interface PlayerProps {
  playerY: number;
  playerX: number;
  lastMovement: "up" | "right" | "down" | "left" | null;
  body: number[];
}

type acceptedMoves = {
  [key: string]: () => Player;
};

export class Player extends Entity<Player, PlayerProps> {
  get playerX() {
    return this.props.playerX;
  }

  get playerY() {
    return this.props.playerY;
  }

  get body() {
    return this.props.body;
  }

  get lastMovement() {
    return this.props.lastMovement;
  }

  get coordinates() {
    return [this.playerX, this.playerY];
  }

  increaseBody() {
    const newBody = this.body.concat(0);
    return this.clone({ body: newBody });
  }

  movePlayer(command: string, screen: Screen) {
    const acceptedMoves: acceptedMoves = {
      up: (): Player => {
        const { playerY: y } = this;
        return this.move(this.clone({ playerY: y - 1, lastMovement: "up" }), screen);
      },
      right: (): Player => {
        const { playerX: x } = this;
        return this.move(this.clone({ playerX: x + 1, lastMovement: "right" }), screen);
      },
      down: (): Player => {
        const { playerY: y } = this;
        return this.move(this.clone({ playerY: y + 1, lastMovement: "down" }), screen);
      },
      left: (): Player => {
        const { playerX: x } = this;
        return this.move(this.clone({ playerX: x - 1, lastMovement: "left" }), screen);
      },
    };

    const moveFunction = acceptedMoves[command];

    if (moveFunction) {
      return moveFunction();
    }

    return this;
  }

  private move(player: Player, screen: Screen) {
    const { x, y } = screen.checkAndForceCorrectMovement({
      x: player.playerX,
      y: player.playerY,
    });

    return this.clone({ playerX: x, playerY: y });
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
