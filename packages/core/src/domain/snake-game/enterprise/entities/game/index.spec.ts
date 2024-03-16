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
    player = Player.create({ x: 2, y: 4 }, new UniqueEntityId("player1"));
    fruit = Fruit.create({ fruitX: 4, fruitY: 0 }, new UniqueEntityId("fruit1"));
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

    game = Game.create(state);
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
    const playerOnTheRightEdge = player.clone({ x: 9 });
    const gameWithXOutOfBoundsRight = Game.create(state)
      .addPlayer(playerOnTheRightEdge)
      .movePlayer(playerOnTheRightEdge.id, "right");
    expect(gameWithXOutOfBoundsRight.player(player.id)?.props).toEqual(
      expect.objectContaining({
        x: 0,
        y: 4,
      }),
    );

    // Teste movendo o jogador para fora da tela na direção X (horizontal) à esquerda
    const playerOnTheLeftEdge = player.clone({ x: 0 });
    const gameWithXOutOfBoundsLeft = Game.create(state)
      .addPlayer(playerOnTheLeftEdge)
      .movePlayer(playerOnTheLeftEdge.id, "left");
    expect(gameWithXOutOfBoundsLeft.player(player.id)?.props).toEqual(
      expect.objectContaining({
        x: 9,
        y: 4,
      }),
    );

    // Teste movendo o jogador para fora da tela na direção Y (vertical) para baixo
    const playerOnTheBottomEdge = player.clone({ y: 9 });
    const gameWithYOutOfBoundsDown = Game.create(state)
      .addPlayer(playerOnTheBottomEdge)
      .movePlayer(playerOnTheBottomEdge.id, "down");
    expect(gameWithYOutOfBoundsDown.player(player.id)?.props).toEqual(
      expect.objectContaining({
        x: 2,
        y: 0,
      }),
    );

    // Teste movendo o jogador para fora da tela na direção Y (vertical) para cima
    const playerOnTheTopEdge = player.clone({ y: 0 });
    const gameWithYOutOfBoundsUp = Game.create(state)
      .addPlayer(playerOnTheTopEdge)
      .movePlayer(playerOnTheTopEdge.id, "up");
    expect(gameWithYOutOfBoundsUp.player(player.id)?.props).toEqual(
      expect.objectContaining({
        x: 2,
        y: 9,
      }),
    );
  });

  it("should not be able to move a player with a wrong command", () => {
    const playerOnTheTopEdge = player.clone({ x: 0, y: 0 });
    const gameState = Game.create(state)
      .addPlayer(playerOnTheTopEdge)
      .movePlayer(playerOnTheTopEdge.id, "wrong");

    expect(gameState.player(player.id)?.props).toEqual(
      expect.objectContaining({
        x: 0,
        y: 0,
      }),
    );
  });

  it("should be able to add a player", () => {
    expect(Object.keys(game.players)).toHaveLength(1);

    const anotherPlayer = Player.create({ x: 0, y: 0 });
    const gameWithOneMorePlayer = game.addPlayer(anotherPlayer);
    expect(Object.keys(gameWithOneMorePlayer)).toHaveLength(2);
    expect(gameWithOneMorePlayer.player(anotherPlayer.id)!.id).toEqual(anotherPlayer.id);
  });

  it("should be able to remove a player", () => {
    const secondPlayer = Player.create({ x: 0, y: 0 });
    const gameWithTwoPlayers = Game.create(state).addPlayer(secondPlayer);
    expect(Object.keys(gameWithTwoPlayers.players)).toHaveLength(2);

    const gameWitOnlyOnePlayer = gameWithTwoPlayers.removePlayer(player.id);
    expect(Object.keys(gameWitOnlyOnePlayer.players)).toHaveLength(1);

    const gameWithoutPlayers = gameWitOnlyOnePlayer.removePlayer(secondPlayer.id);
    expect(Object.keys(gameWithoutPlayers.players)).toHaveLength(0);
    expect(gameWithoutPlayers.player(player.id)).toBeNull();
  });

  it("should be able to add a fruit", () => {
    const secondFruit = Fruit.create({ fruitX: 2, fruitY: 9 });
    const gameWithFruit = game.addFruit(secondFruit);
    expect(gameWithFruit.fruits[secondFruit.id.value]).toEqual(secondFruit);
  });

  it("should not be possible to add a fruit to an already occupied coordinate", () => {
    const fruit2 = Fruit.create({ fruitX: 2, fruitY: 4 });
    const fruit3 = Fruit.create({ fruitX: 2, fruitY: 4 });
    const newGame = game.addFruit(fruit2).addFruit(fruit3);

    const fruits = Object.entries(newGame.fruits).filter(
      ([_, fruit]) => fruit.fruitX === 2 && fruit.fruitY === 4,
    );
    expect(fruits).toHaveLength(1);
  });

  it("should be able to detect player and fruit collision", () => {
    const fruit = Fruit.create({ fruitX: 9, fruitY: 9 });
    const gameWithInitialState = Game.create(state)
      .addPlayer(player.clone({ x: 9, y: 8 }))
      .addFruit(fruit);
    expect(Object.keys(gameWithInitialState.fruits)).toHaveLength(2);
    expect(gameWithInitialState.fruits[fruit.id.value]).toEqual(fruit);

    const gameWithCollisionFruit = gameWithInitialState.movePlayer(player.id, "down");
    expect(Object.keys(gameWithCollisionFruit.fruits)).toHaveLength(1);
    expect(gameWithCollisionFruit.fruits[fruit.id.value]).toBeUndefined();
  });

  it("is should increase the player body when there is a collision with fruit", () => {
    const fruit = Fruit.create({ fruitX: 9, fruitY: 9 });
    const gameWithCollisionFruit = game
      .addPlayer(player.clone({ x: 9, y: 8 }))
      .addFruit(fruit)
      .movePlayer(player.id, "down");

    expect(gameWithCollisionFruit.player(player.id)?.body).toHaveLength(1);
    expect(gameWithCollisionFruit.player(player.id)?.body[0]).toEqual(
      expect.objectContaining({
        x: 9,
        y: 8,
      }),
    );

    const newFruit1 = Fruit.create({ fruitX: 6, fruitY: 8 });
    const newFruit2 = Fruit.create({ fruitX: 7, fruitY: 8 });
    const newFruit3 = Fruit.create({ fruitX: 8, fruitY: 8 });
    const p = player.clone({ x: 5, y: 8 });
    const gameWithTwoCollisionFruits = game
      .addPlayer(p)
      .addFruit(newFruit1)
      .addFruit(newFruit2)
      .addFruit(newFruit3)
      .movePlayer(p.id, "right")
      .movePlayer(p.id, "right")
      .movePlayer(p.id, "right");

    expect(gameWithTwoCollisionFruits.player(player.id)?.body).toHaveLength(3);
    expect(gameWithTwoCollisionFruits.player(player.id)?.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          x: 7,
          y: 8,
        }),
        expect.objectContaining({
          x: 6,
          y: 8,
        }),

        expect.objectContaining({
          x: 5,
          y: 8,
        }),
      ]),
    );
  });

  it("should be able to detect player body collisions", () => {
    const player1 = player.clone({
      x: 3,
      y: 4,
      body: [
        { x: 3, y: 3 },
        { x: 3, y: 2 },
      ],
    });
    const player2 = Player.create(
      {
        x: 5,
        y: 5,
        body: [
          { x: 4, y: 5 },
          { x: 3, y: 5 },
          { x: 2, y: 5 },
        ],
      },
      new UniqueEntityId("player2"),
    );
    const newGame = game.addPlayer(player1).addPlayer(player2).movePlayer(player1.id, "down");

    expect(newGame.player(player1.id)?.body).toHaveLength(0);
    expect(Object.values(newGame.fruits)).toHaveLength(3);
  });

  it("should not collide", () => {
    const player1 = player.clone({
      x: 3,
      y: 4,
      body: [
        { x: 3, y: 3 },
        { x: 3, y: 2 },
      ],
    });
    const player2 = Player.create(
      {
        x: 5,
        y: 5,
        body: [
          { x: 4, y: 5 },
          { x: 3, y: 5 },
          { x: 2, y: 5 },
        ],
      },
      new UniqueEntityId("player2"),
    );
    const newGame = game.addPlayer(player1).addPlayer(player2).movePlayer(player1.id, "left");

    expect(newGame.player(player1.id)?.body).toHaveLength(2);
    expect(Object.values(newGame.fruits)).toHaveLength(1);
  });
});
