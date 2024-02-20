import { beforeEach, describe, expect, it } from "vitest";

import { UniqueEntityId } from "@/common/entities/unique-entity-id";
import { Fruit } from "@/common/value-objects/Fruit";
import { Player } from "@/common/value-objects/Player";
import { Game, GameProps } from "@/domain/enterprise/entities/snake/Game";

let state: GameProps;
let player: Player;
let fruit: Fruit;
describe("Game", () => {
  beforeEach(() => {
    player = Player.createPlayer({}, new UniqueEntityId("player1"));
    fruit = Fruit.createFruit({}, new UniqueEntityId("fruit1"));
    state = {
      players: {
        [player.id.value]: player,
      },
      fruits: {
        [fruit.id.value]: fruit,
      },
      screen: {
        height: 10,
        width: 10,
      },
    };
  });
  it("should be able to create a new game", () => {
    const game = Game.createGame(state);

    expect(game).toBeDefined();
  });

  it("should be able to move a player", () => {
    const game = Game.createGame(state);
    expect(game.player(player.id)).toEqual(
      expect.objectContaining({
        playerX: player.playerX,
        playerY: player.playerY,
      }),
    );

    const newStateGame = game.movePlayer(player.clone({ playerX: 3, playerY: 9 }));

    expect(newStateGame.player(player.id)).toEqual(
      expect.objectContaining({
        playerX: 3,
        playerY: 9,
      }),
    );
  });

  it("should be able to add a player", () => {
    const game = Game.createGame(state);
    expect(Object.keys(game.players)).toHaveLength(1);

    const anotherPlayer = Player.createPlayer({});
    const gameWithOneMorePlayer = game.addPlayer(anotherPlayer);
    expect(Object.keys(gameWithOneMorePlayer)).toHaveLength(2);
    expect(gameWithOneMorePlayer.player(anotherPlayer.id)).toEqual(anotherPlayer);
  });

  it("should be able to remove a player", () => {
    const gameWithoutPlayer = Game.createGame(state).removePlayer(player.id);
    expect(Object.keys(gameWithoutPlayer.players)).toHaveLength(0);
    expect(gameWithoutPlayer.player(player.id)).toBeUndefined();
  });
});
