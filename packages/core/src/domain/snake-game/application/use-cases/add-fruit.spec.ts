import { describe, expect, it } from "vitest";

import { Game } from "../../enterprise/entities/game";
import { Screen } from "../../enterprise/entities/value-objects/Screen";
import { AddFruitUseCase } from "./add-fruit";

describe("Add Fruit", () => {
  it("should be able to add a fruit", () => {
    const screen = Screen.createScreen({ height: 10, width: 10 });
    const game = Game.create({ fruits: {}, players: {}, screen });

    const sut = new AddFruitUseCase();
    const newStateGame = sut.execute({ fruitX: 5, fruitY: 3, game });

    expect(newStateGame.isRight()).toBe(true);
    expect(newStateGame.value?.game).toBeInstanceOf(Game);
    expect(Object.values(newStateGame.value!.game.fruits)).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          fruitX: 5,
          fruitY: 3,
        }),
      ]),
    );
  });
});
