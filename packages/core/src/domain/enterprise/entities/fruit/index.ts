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

  checkCollision(x: number, y: number) {
    const isCollided = this.fruitX === x && this.fruitY === y;

    return isCollided;
  }

  static createFruit(props: FruitProps, id?: UniqueEntityId) {
    const fruit = new Fruit(props, id);

    return fruit;
  }
}
