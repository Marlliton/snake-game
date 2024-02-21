import { beforeEach, describe, expect, it } from "vitest";

import { UniqueEntityId } from "@/common/entities/unique-entity-id";
import { Fruit } from "@/domain/enterprise/entities/fruit";
import { Game, GameProps } from "@/domain/enterprise/entities/game";
import { Player } from "@/domain/enterprise/entities/player";
import { Screen } from "@/domain/enterprise/entities/value-objects/Screen";

let state: GameProps;
let player: Player;
let fruit: Fruit;
let screen: Screen;
describe("Game", () => {
  beforeEach(() => {
    player = Player.createPlayer({}, new UniqueEntityId("player1"));
    fruit = Fruit.createFruit({}, new UniqueEntityId("fruit1"));
    screen = Screen.createScreen({ height: 10, width: 10 });
    state = {
      players: {
        [player.id.value]: player,
      },
      fruits: {
        [fruit.id.value]: fruit,
      },
      screen,
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

  it("should not move the player beyond the screen boundary", () => {
    // Teste movendo o jogador para fora da tela na direção X (horizontal) à direita
    const gameWithXOutOfBoundsRight = Game.createGame(state).movePlayer(
      player.clone({ playerX: 10, playerY: 5 }),
    );
    expect(gameWithXOutOfBoundsRight.player(player.id)).toEqual(
      expect.objectContaining({
        playerX: 0,
        playerY: 5,
      }),
    );

    // Teste movendo o jogador para fora da tela na direção X (horizontal) à esquerda
    const gameWithXOutOfBoundsLeft = Game.createGame(state).movePlayer(
      player.clone({ playerX: -1, playerY: 5 }),
    );
    expect(gameWithXOutOfBoundsLeft.player(player.id)).toEqual(
      expect.objectContaining({
        playerX: 9,
        playerY: 5,
      }),
    );

    // Teste movendo o jogador para fora da tela na direção Y (vertical) para baixo
    const gameWithYOutOfBoundsDown = Game.createGame(state).movePlayer(
      player.clone({ playerX: 5, playerY: 10 }),
    );
    expect(gameWithYOutOfBoundsDown.player(player.id)).toEqual(
      expect.objectContaining({
        playerX: 5,
        playerY: 0,
      }),
    );

    // Teste movendo o jogador para fora da tela na direção Y (vertical) para cima
    const gameWithYOutOfBoundsUp = Game.createGame(state).movePlayer(
      player.clone({ playerX: 5, playerY: -1 }),
    );
    expect(gameWithYOutOfBoundsUp.player(player.id)).toEqual(
      expect.objectContaining({
        playerX: 5,
        playerY: 9,
      }),
    );

    // Teste com o jogador já em um limite da tela (canto superior direito)
    const gameWithPlayerAtScreenBoundary = Game.createGame(state).movePlayer(
      player.clone({ playerX: 9, playerY: 9 }),
    );
    expect(gameWithPlayerAtScreenBoundary.player(player.id)).toEqual(
      expect.objectContaining({
        playerX: 9,
        playerY: 9,
      }),
    );

    // Teste com o jogador fora dos limites no Y e no X (canto superior direito)
    const gameWithYAndXOutOfBounds = Game.createGame(state).movePlayer(
      player.clone({ playerX: 10, playerY: 10 }),
    );
    expect(gameWithYAndXOutOfBounds.player(player.id)).toEqual(
      expect.objectContaining({
        playerX: 0,
        playerY: 0,
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
    const secondPlayer = Player.createPlayer({});
    const gameWithTwoPlayers = Game.createGame(state).addPlayer(secondPlayer);
    expect(Object.keys(gameWithTwoPlayers.players)).toHaveLength(2);

    const gameWitOnlyOnePlayer = gameWithTwoPlayers.removePlayer(player.id);
    expect(Object.keys(gameWitOnlyOnePlayer.players)).toHaveLength(1);

    const gameWithoutPlayers = gameWitOnlyOnePlayer.removePlayer(secondPlayer.id);
    expect(Object.keys(gameWithoutPlayers.players)).toHaveLength(0);
    expect(gameWithoutPlayers.player(player.id)).toBeNull();
  });
});
