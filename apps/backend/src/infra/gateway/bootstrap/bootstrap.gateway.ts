import { Socket } from "socket.io";

import { AddPlayerUseCasseNest } from "@/infra/use-cases/add-player-nest";
import { RemovePlayerUseCasseNest } from "@/infra/use-cases/remove-player-nest";
import { OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway } from "@nestjs/websockets";
import { Game, Screen } from "@snake/core";
import { UniqueEntityId } from "@snake/core/common";

@WebSocketGateway({
  cors: true,
})
export class BootstrapGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private game: Game;
  constructor(
    private addPlayer: AddPlayerUseCasseNest,
    private removePlayer: RemovePlayerUseCasseNest,
  ) {
    this.game = Game.create({
      fruits: {},
      players: {},
      screen: Screen.createScreen({ height: 30, width: 30 }),
    });
  }

  handleDisconnect(client: Socket) {
    const result = this.removePlayer.execute({
      game: this.game,
      playerId: new UniqueEntityId(client.id),
    });

    if (result.isLeft()) throw result.value;

    this.game = result.value.game;
  }

  handleConnection(client: Socket, ...args: any[]) {
    const result = this.addPlayer.execute({ game: this.game, playerId: client.id });
    if (result.isLeft()) throw result.value;

    const { game } = result.value;
    this.game = game;
    client.emit("bootstrap", {
      setup: game.gameState(),
      playerId: client.id,
    });

    client.broadcast.emit("setup", this.game.gameState());
  }
}
