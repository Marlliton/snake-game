import { Optional } from "@/types/Optional";

import { Entity } from "../../../../common/entities/entity";
import { UniqueEntityId } from "../../../../common/entities/unique-entity-id";

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
    const fruit = new Fruit(
      {
        ...props,
        fruitX: props.fruitX ?? Math.floor(Math.random() * 9), // TODO: TEMP
        fruitY: props.fruitY ?? Math.floor(Math.random() * 9), // TODO: TEMP
      },
      id,
    );

    return fruit;
  }
}
