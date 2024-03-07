import { beforeEach, describe, expect, it } from "vitest";

import { Game } from "../../enterprise/entities/game";
import { Player } from "../../enterprise/entities/player";
import { Screen } from "../../enterprise/entities/value-objects/Screen";
import { RemovePlayerUseCasse } from "./remove-player";

let sut: RemovePlayerUseCasse;
let game: Game;
let player: Player;
describe("Remove Player", () => {
  beforeEach(() => {
    sut = new RemovePlayerUseCasse();
    player = Player.create({ x: 9, y: 4 });
    game = Game.create({
      fruits: {},
      players: { [player.id.value]: player },
      screen: Screen.createScreen({ height: 10, width: 10 }),
    });
  });
  it("should be able to remove player", () => {
    const result = sut.execute({ game, playerId: player.id });

    expect(result.isRight()).toBe(true);
    expect(Object.values(result.value!.game.players)).toHaveLength(0);
  });
});
