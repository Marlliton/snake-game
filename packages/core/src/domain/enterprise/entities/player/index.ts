import { Optional } from "@/types/Optional";

import { Entity } from "../../../../common/entities/entity";
import { UniqueEntityId } from "../../../../common/entities/unique-entity-id";

interface PlayerProps {
  playerY: number;
  playerX: number;
  lastMovement: "up" | "right" | "down" | "left" | null;
  body: number[];
}

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
