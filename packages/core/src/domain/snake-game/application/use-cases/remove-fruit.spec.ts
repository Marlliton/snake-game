import { describe, expect, it } from "vitest";

import { Fruit } from "../../enterprise/entities/fruit";
import { Game } from "../../enterprise/entities/game";
import { Screen } from "../../enterprise/entities/value-objects/Screen";
import { RemoveFruitUseCase } from "./remove-fruit";

describe("Remove Fruit", () => {
  it("should be able to remove a fruit", () => {
    const screen = Screen.createScreen({ height: 10, width: 10 });
    const fruit = Fruit.create({ fruitX: 0, fruitY: 0 });
    const game = Game.create({ fruits: { [fruit.id.value]: fruit }, players: {}, screen });

    const sut = new RemoveFruitUseCase();
    const result = sut.execute({ fruitId: fruit.id, game });

    expect(result.isRight()).toBe(true);
    expect(Object.values((result.value as any).game.fruits)).toHaveLength(0);
  });
});
