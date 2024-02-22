import { Optional } from "@/types/Optional";

import { Entity } from "../../../../common/entities/entity";
import { UniqueEntityId } from "../../../../common/entities/unique-entity-id";

interface PlayerProps {
  playerY: number;
  playerX: number;
  lastMovement: "up" | "right" | "down" | "left" | null;
}

export class Player extends Entity<Player, PlayerProps> {
  get playerX() {
    return this.props.playerX;
  }

  get playerY() {
    return this.props.playerY;
  }

  get lastMovement() {
    return this.props.lastMovement;
  }

  static createPlayer(
    props: Optional<PlayerProps, "playerX" | "playerY" | "lastMovement">,
    id?: UniqueEntityId,
  ) {
    const player = new Player(
      {
        ...props,
        playerX: props.playerX ?? Math.floor(Math.random() * 9), // TODO: TEMP
        playerY: props.playerY ?? Math.floor(Math.random() * 9), // TODO: TEMP
        lastMovement: props.lastMovement ?? null,
      },
      id,
    );

    return player;
  }
}
