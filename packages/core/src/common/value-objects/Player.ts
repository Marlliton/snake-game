import { Optional } from "@/types/Optional";

import { Entity } from "../entities/entity";
import { UniqueEntityId } from "../entities/unique-entity-id";

interface PlayerProps {
  playerY: number;
  playerX: number;
}

export class Player extends Entity<Player, PlayerProps> {
  get playerX() {
    return this.props.playerX;
  }

  get playerY() {
    return this.props.playerY;
  }

  static createPlayer(props: Optional<PlayerProps, "playerX" | "playerY">, id?: UniqueEntityId) {
    const player = new Player(
      {
        ...props,
        playerX: props.playerX ?? Math.floor(Math.random() * 9), // TODO: TEMP
        playerY: props.playerY ?? Math.floor(Math.random() * 9), // TODO: TEMP
      },
      id,
    );

    return player;
  }
}
