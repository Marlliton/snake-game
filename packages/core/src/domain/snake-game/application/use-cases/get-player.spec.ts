import { beforeAll, beforeEach, describe, expect, it } from "vitest";

import { UniqueEntityId } from "@/common/entities/unique-entity-id";
import { PlayerNotFoundError } from "@/common/error/application/use-cases/player-not-found-error";

import { Game } from "../../enterprise/entities/game";
import { Player } from "../../enterprise/entities/player";
import { Screen } from "../../enterprise/entities/value-objects/Screen";
import { GetPlayerUseCase } from "./get-player";

let sut: GetPlayerUseCase;
describe("Add Fruit", () => {
  beforeEach(() => {
    sut = new GetPlayerUseCase();
  });
  it("should be able to get a player", () => {
    const screen = Screen.createScreen({ height: 10, width: 10 });
    const player = Player.create({ x: 2, y: 8 });
    const game = Game.create({ fruits: {}, players: { [player.id.value]: player }, screen });

    const result = sut.execute({ playerId: player.id, game });

    expect(result.isRight()).toBe(true);
    expect(result.value.player).toBeInstanceOf(Player);
    expect(result.value.player.props).toEqual(
      expect.objectContaining({
        x: 2,
        y: 8,
      }),
    );
  });
  it("should not be able to get a player", () => {
    const screen = Screen.createScreen({ height: 10, width: 10 });
    const player = Player.create({ x: 2, y: 8 });
    const game = Game.create({ fruits: {}, players: { [player.id.value]: player }, screen });

    const result = sut.execute({ playerId: new UniqueEntityId(), game });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(PlayerNotFoundError);
  });
});
