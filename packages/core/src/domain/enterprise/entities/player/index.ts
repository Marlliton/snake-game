import { Optional } from "@/types/Optional";

import { Entity } from "../../../../common/entities/entity";
import { UniqueEntityId } from "../../../../common/entities/unique-entity-id";
import { Coordinates } from "../value-objects/Coordinates";

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

  static createPlayer(
    props: Optional<PlayerProps, "playerX" | "playerY" | "lastMovement" | "body">,
    id?: UniqueEntityId,
  ) {
    const [x, y] = Coordinates.generateUniqueCoordinateXAndY([], 9); // FIXME: TEM QUE VIR DO TAMANHO DA SCREEN
    const player = new Player(
      {
        ...props,
        playerX: props.playerX ?? x, // TODO: TEMP
        playerY: props.playerY ?? y, // TODO: TEMP
        lastMovement: props.lastMovement ?? null,
        body: props.body ?? [],
      },
      id,
    );

    return player;
  }
}
