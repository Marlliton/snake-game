import { Player } from "../player";

export class CollisionDetection {
  constructor(
    private players: Record<string, Player>,
    private playerMoved: Player,
  ) {}

  execute() {
    for (const currentPlayer of Object.values(this.players)) {
      if (!this.playerMoved.equals(currentPlayer)) {
        const { playerX, playerY } = this.playerMoved;

        const isPlayerCollided = currentPlayer.fullBodyCoordinate.some(
          (coordinate) => playerX === coordinate.x && playerY === coordinate.y,
        );
        return isPlayerCollided;
      }
    }

    return false;
  }
}
