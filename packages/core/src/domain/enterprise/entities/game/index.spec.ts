import { beforeEach, describe, expect, it } from "vitest";

import { UniqueEntityId } from "@/common/entities/unique-entity-id";

import { Game, GameProps } from ".";
import { Fruit } from "../fruit";
import { Player } from "../player";
import { Screen } from "../value-objects/Screen";

let player: Player;
let fruit: Fruit;
let screen: Screen;
let game: Game;
let state: GameProps;
describe("Game", () => {
  beforeEach(() => {
    player = Player.createPlayer({ playerX: 2, playerY: 4 }, new UniqueEntityId("player1"));
    fruit = Fruit.createFruit({ fruitX: 4, fruitY: 0 }, new UniqueEntityId("fruit1"));
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

    game = Game.createGame(state);
  });
  it("should be able to create a new game", () => {
    expect(game).toBeDefined();
  });

  it("should be able to move a player", () => {
    expect(game.player(player.id)).toEqual(
      expect.objectContaining({
        playerX: player.playerX,
        playerY: player.playerY,
      }),
    );

    const newStateGame = game.movePlayer(player.id, "up");

    expect(newStateGame.player(player.id)).toEqual(
      expect.objectContaining({
        playerX: 2,
        playerY: 3,
      }),
    );
  });

  it("should not move the player beyond the screen boundary", () => {
    // Teste movendo o jogador para fora da tela na direção X (horizontal) à direita
    const playerOnTheRightEdge = player.clone({ playerX: 9 });
    const gameWithXOutOfBoundsRight = Game.createGame(state)
      .addPlayer(playerOnTheRightEdge)
      .movePlayer(playerOnTheRightEdge.id, "right");
    expect(gameWithXOutOfBoundsRight.player(player.id)).toEqual(
      expect.objectContaining({
        playerX: 0,
        playerY: 4,
      }),
    );

    // Teste movendo o jogador para fora da tela na direção X (horizontal) à esquerda
    const playerOnTheLeftEdge = player.clone({ playerX: 0 });
    const gameWithXOutOfBoundsLeft = Game.createGame(state)
      .addPlayer(playerOnTheLeftEdge)
      .movePlayer(playerOnTheLeftEdge.id, "left");
    expect(gameWithXOutOfBoundsLeft.player(player.id)).toEqual(
      expect.objectContaining({
        playerX: 9,
        playerY: 4,
      }),
    );

    // Teste movendo o jogador para fora da tela na direção Y (vertical) para baixo
    const playerOnTheBottomEdge = player.clone({ playerY: 9 });
    const gameWithYOutOfBoundsDown = Game.createGame(state)
      .addPlayer(playerOnTheBottomEdge)
      .movePlayer(playerOnTheBottomEdge.id, "down");
    expect(gameWithYOutOfBoundsDown.player(player.id)).toEqual(
      expect.objectContaining({
        playerX: 2,
        playerY: 0,
      }),
    );

    // Teste movendo o jogador para fora da tela na direção Y (vertical) para cima
    const playerOnTheTopEdge = player.clone({ playerY: 0 });
    const gameWithYOutOfBoundsUp = Game.createGame(state)
      .addPlayer(playerOnTheTopEdge)
      .movePlayer(playerOnTheTopEdge.id, "up");
    expect(gameWithYOutOfBoundsUp.player(player.id)).toEqual(
      expect.objectContaining({
        playerX: 2,
        playerY: 9,
      }),
    );
  });

  it("should be able to add a player", () => {
    expect(Object.keys(game.players)).toHaveLength(1);

    const anotherPlayer = Player.createPlayer({});
    const gameWithOneMorePlayer = game.addPlayer(anotherPlayer);
    expect(Object.keys(gameWithOneMorePlayer)).toHaveLength(2);
    expect(gameWithOneMorePlayer.player(anotherPlayer.id)!.id).toEqual(anotherPlayer.id);
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

  it("should be able to add a fruit", () => {
    const secondFruit = Fruit.createFruit({});
    const gameWithFruit = game.addFruit(secondFruit);
    expect(gameWithFruit.fruits[secondFruit.id.value]).toEqual(secondFruit);
  });

  it("should not be possible to add a fruit to an already occupied coordinate", () => {
    const fruit2 = Fruit.createFruit({ fruitX: 2, fruitY: 4 });
    const fruit3 = Fruit.createFruit({ fruitX: 2, fruitY: 4 });
    const newGame = game.addFruit(fruit2).addFruit(fruit3);

    const fruits = Object.entries(newGame.fruits).filter(
      ([_, fruit]) => fruit.fruitX === 2 && fruit.fruitY === 4,
    );
    expect(fruits).toHaveLength(1);
  });

  it("should be able to detect player and fruit collision", () => {
    const fruit = Fruit.createFruit({ fruitX: 9, fruitY: 9 });
    const gameWithInitialState = Game.createGame(state)
      .addPlayer(player.clone({ playerX: 9, playerY: 8 }))
      .addFruit(fruit);
    expect(Object.keys(gameWithInitialState.fruits)).toHaveLength(2);
    expect(gameWithInitialState.fruits[fruit.id.value]).toEqual(fruit);

    const gameWithCollisionFruit = gameWithInitialState.movePlayer(player.id, "down");
    expect(Object.keys(gameWithCollisionFruit.fruits)).toHaveLength(1);
    expect(gameWithCollisionFruit.fruits[fruit.id.value]).toBeUndefined();
  });
});
