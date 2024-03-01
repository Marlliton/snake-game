import { beforeEach, describe, expect, it } from "vitest";

import { Player } from ".";
import { Screen } from "../value-objects/Screen";

let screen: Screen;
let player: Player;
describe("Player", () => {
  beforeEach(() => {
    screen = Screen.createScreen({ height: 10, width: 10 });
    player = Player.createPlayer({
      x: 5,
      y: 5,
      body: [
        { x: 4, y: 5 },
        { x: 3, y: 5 },
        { x: 2, y: 5 },
      ],
    });
  });

  it("should be able to move the player DOWN and update your body positions", () => {
    const playerMovedForTheFirstTime = player.movePlayer("down", screen);
    expect(playerMovedForTheFirstTime.fullBodyCoordinate).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ x: 5, y: 6 }),
        expect.objectContaining({ x: 5, y: 5 }),
        expect.objectContaining({ x: 4, y: 5 }),
        expect.objectContaining({ x: 3, y: 5 }),
      ]),
    );

    const playerMovedForTheSecondTime = playerMovedForTheFirstTime.movePlayer("down", screen);
    expect(playerMovedForTheSecondTime.fullBodyCoordinate).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ x: 5, y: 7 }),
        expect.objectContaining({ x: 5, y: 6 }),
        expect.objectContaining({ x: 5, y: 5 }),
        expect.objectContaining({ x: 4, y: 5 }),
      ]),
    );

    const playerMovedForTheThirdTime = playerMovedForTheSecondTime.movePlayer("down", screen);
    expect(playerMovedForTheThirdTime.fullBodyCoordinate).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ x: 5, y: 8 }),
        expect.objectContaining({ x: 5, y: 7 }),
        expect.objectContaining({ x: 5, y: 6 }),
        expect.objectContaining({ x: 5, y: 5 }),
      ]),
    );
  });

  it("should be able to move the player UP and update your body positions", () => {
    const playerMovedForTheFirstTime = player.movePlayer("up", screen);
    expect(playerMovedForTheFirstTime.fullBodyCoordinate).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ x: 5, y: 4 }),
        expect.objectContaining({ x: 5, y: 5 }),
        expect.objectContaining({ x: 4, y: 5 }),
        expect.objectContaining({ x: 3, y: 5 }),
      ]),
    );
    const playerMovedForTheSecondTime = playerMovedForTheFirstTime.movePlayer("up", screen);
    expect(playerMovedForTheSecondTime.fullBodyCoordinate).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ x: 5, y: 3 }),
        expect.objectContaining({ x: 5, y: 4 }),
        expect.objectContaining({ x: 5, y: 5 }),
        expect.objectContaining({ x: 4, y: 5 }),
      ]),
    );
    const playerMovedForTheThirdTime = playerMovedForTheSecondTime.movePlayer("up", screen);
    expect(playerMovedForTheThirdTime.fullBodyCoordinate).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ x: 5, y: 2 }),
        expect.objectContaining({ x: 5, y: 3 }),
        expect.objectContaining({ x: 5, y: 4 }),
        expect.objectContaining({ x: 5, y: 5 }),
      ]),
    );
  });
  it("should be able to move the player RIGHT and update your body positions", () => {
    const newPlayer = player.clone({
      body: [
        { x: 5, y: 4 },
        { x: 5, y: 3 },
        { x: 5, y: 2 },
      ],
    });
    expect(newPlayer.fullBodyCoordinate).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ x: 5, y: 5 }),
        expect.objectContaining({ x: 5, y: 4 }),
        expect.objectContaining({ x: 5, y: 3 }),
        expect.objectContaining({ x: 5, y: 5 }),
      ]),
    );

    const playerMovedForTheFirstTime = newPlayer.movePlayer("right", screen);
    expect(playerMovedForTheFirstTime.fullBodyCoordinate).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ x: 6, y: 5 }),
        expect.objectContaining({ x: 5, y: 5 }),
        expect.objectContaining({ x: 5, y: 4 }),
        expect.objectContaining({ x: 5, y: 3 }),
      ]),
    );
    const playerMovedForTheSecondTime = playerMovedForTheFirstTime.movePlayer("right", screen);
    expect(playerMovedForTheSecondTime.fullBodyCoordinate).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ x: 7, y: 5 }),
        expect.objectContaining({ x: 6, y: 5 }),
        expect.objectContaining({ x: 5, y: 5 }),
        expect.objectContaining({ x: 5, y: 4 }),
      ]),
    );
    const playerMovedForTheThirdTime = playerMovedForTheSecondTime.movePlayer("right", screen);
    expect(playerMovedForTheThirdTime.fullBodyCoordinate).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ x: 8, y: 5 }),
        expect.objectContaining({ x: 7, y: 5 }),
        expect.objectContaining({ x: 6, y: 5 }),
        expect.objectContaining({ x: 5, y: 5 }),
      ]),
    );
    const playerMovedForTheFourthTime = playerMovedForTheThirdTime.movePlayer("right", screen);
    expect(playerMovedForTheFourthTime.fullBodyCoordinate).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ x: 9, y: 5 }),
        expect.objectContaining({ x: 8, y: 5 }),
        expect.objectContaining({ x: 7, y: 5 }),
        expect.objectContaining({ x: 6, y: 5 }),
      ]),
    );
  });
  it("should be able to move the player LEFT and update your body positions", () => {
    const newPlayer = player.clone({
      body: [
        { x: 5, y: 4 },
        { x: 5, y: 3 },
        { x: 5, y: 2 },
      ],
    });
    expect(newPlayer.fullBodyCoordinate).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ x: 5, y: 5 }),
        expect.objectContaining({ x: 5, y: 4 }),
        expect.objectContaining({ x: 5, y: 3 }),
        expect.objectContaining({ x: 5, y: 5 }),
      ]),
    );

    const playerMovedForTheFirstTime = newPlayer.movePlayer("left", screen);
    expect(playerMovedForTheFirstTime.fullBodyCoordinate).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ x: 4, y: 5 }),
        expect.objectContaining({ x: 5, y: 5 }),
        expect.objectContaining({ x: 5, y: 4 }),
        expect.objectContaining({ x: 5, y: 3 }),
      ]),
    );
    const playerMovedForTheSecondTime = playerMovedForTheFirstTime.movePlayer("left", screen);
    expect(playerMovedForTheSecondTime.fullBodyCoordinate).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ x: 3, y: 5 }),
        expect.objectContaining({ x: 4, y: 5 }),
        expect.objectContaining({ x: 5, y: 5 }),
        expect.objectContaining({ x: 5, y: 4 }),
      ]),
    );
    const playerMovedForTheThirdTime = playerMovedForTheSecondTime.movePlayer("left", screen);
    expect(playerMovedForTheThirdTime.fullBodyCoordinate).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ x: 2, y: 5 }),
        expect.objectContaining({ x: 3, y: 5 }),
        expect.objectContaining({ x: 4, y: 5 }),
        expect.objectContaining({ x: 5, y: 5 }),
      ]),
    );
    const playerMovedForTheFourthTime = playerMovedForTheThirdTime.movePlayer("left", screen);
    expect(playerMovedForTheFourthTime.fullBodyCoordinate).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ x: 1, y: 5 }),
        expect.objectContaining({ x: 2, y: 5 }),
        expect.objectContaining({ x: 3, y: 5 }),
        expect.objectContaining({ x: 4, y: 5 }),
      ]),
    );
  });
});
