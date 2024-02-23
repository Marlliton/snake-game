import { Optional } from "@/types/Optional";

import { Entity } from "../../../../common/entities/entity";
import { UniqueEntityId } from "../../../../common/entities/unique-entity-id";
import { Coordinates } from "../value-objects/Coordinates";

interface FruitProps {
  fruitY: number;
  fruitX: number;
}

export class Fruit extends Entity<Fruit, FruitProps> {
  get fruitX() {
    return this.props.fruitX;
  }

  get fruitY() {
    return this.props.fruitY;
  }

  get coordinates() {
    return [this.fruitX, this.fruitY];
  }

  static createFruit(props: Optional<FruitProps, "fruitX" | "fruitY">, id?: UniqueEntityId) {
    const [x, y] = Coordinates.generateUniqueCoordinateXAndY([], 9); // FIXME: tem que ser dinâmico de acordo com a screen
    const fruit = new Fruit(
      {
        ...props,
        fruitX: props.fruitX ?? x, // TODO: TEMP
        fruitY: props.fruitY ?? y, // TODO: TEMP
      },
      id,
    );

    return fruit;
  }
}
