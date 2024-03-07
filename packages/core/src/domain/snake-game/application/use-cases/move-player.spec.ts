import { beforeEach, describe, expect, it } from "vitest";

import { Game } from "../../enterprise/entities/game";
import { Player } from "../../enterprise/entities/player";
import { Screen } from "../../enterprise/entities/value-objects/Screen";
import { MovePlayerUseCasse } from "./move-player";

let sut: MovePlayerUseCasse;
let game: Game;
let player: Player;
describe("Move Player", () => {
  beforeEach(() => {
    sut = new MovePlayerUseCasse();
    player = Player.create({ x: 5, y: 5 });
    game = Game.create({
      fruits: {},
      players: { [player.id.value]: player },
      screen: Screen.createScreen({ height: 10, width: 10 }),
    });
  });
  it("should be able to move player to down", () => {
    const result = sut.execute({ game, playerId: player.id, command: "down" });

    expect(result.isRight()).toBe(true);
    expect((result.value.game as Game).player(player.id)?.props).toEqual(
      expect.objectContaining({
        x: 5,
        y: 6,
      }),
    );
  });
  it("should be able to move player to up", () => {
    const result = sut.execute({ game, playerId: player.id, command: "up" });

    expect(result.isRight()).toBe(true);
    expect((result.value.game as Game).player(player.id)?.props).toEqual(
      expect.objectContaining({
        x: 5,
        y: 4,
      }),
    );
  });
  it("should be able to move player to left", () => {
    const result = sut.execute({ game, playerId: player.id, command: "left" });

    expect(result.isRight()).toBe(true);
    expect((result.value.game as Game).player(player.id)?.props).toEqual(
      expect.objectContaining({
        x: 4,
        y: 5,
      }),
    );
  });
  it("should be able to move player to right", () => {
    const result = sut.execute({ game, playerId: player.id, command: "right" });

    expect(result.isRight()).toBe(true);
    expect((result.value.game as Game).player(player.id)?.props).toEqual(
      expect.objectContaining({
        x: 6,
        y: 5,
      }),
    );
  });
});
