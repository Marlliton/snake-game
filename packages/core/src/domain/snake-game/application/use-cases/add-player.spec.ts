import { beforeEach, describe, expect, it } from "vitest";

import { Game } from "../../enterprise/entities/game";
import { Screen } from "../../enterprise/entities/value-objects/Screen";
import { AddPlayerUseCasse } from "./add-player";

let sut: AddPlayerUseCasse;
let game: Game;
describe("Add Player", () => {
  beforeEach(() => {
    sut = new AddPlayerUseCasse();
    game = Game.create({
      fruits: {},
      players: {},
      screen: Screen.createScreen({ height: 10, width: 10 }),
    });
  });
  it("should be able add get a player", () => {
    const result = sut.execute({ game });

    expect(result.isRight()).toBe(true);
    expect(Object.values(result.value!.game.players)).toHaveLength(1);
  });
});
