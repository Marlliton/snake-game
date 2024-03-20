import { Server, Socket } from "socket.io";

import { AddPlayerUseCasseNest } from "@/infra/use-cases/add-player-nest";
// import { MovePlayerUseCasseNest } from "@/infra/use-cases/move-player-nest";
import { MovePlayerUseCaseNest } from "@/infra/use-cases/move-player-nest";
import { RemovePlayerUseCasseNest } from "@/infra/use-cases/remove-player-nest";
import { Inject } from "@nestjs/common";
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { Game, Screen } from "@snake/core";
import { UniqueEntityId } from "@snake/core/common";

@WebSocketGateway({
  cors: true,
})
export class BootstrapGateway implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {
  private game: Game;
  constructor(
    private addPlayer: AddPlayerUseCasseNest,
    private removePlayer: RemovePlayerUseCasseNest,
    private movePlayer: MovePlayerUseCaseNest,
  ) {
    this.game = Game.create({
      fruits: {},
      players: {},
      screen: Screen.createScreen({ height: 30, width: 30 }),
    });
  }

  afterInit(server: Server) {
    this.game.onMove(() => {
      server.sockets.emit("apply-movement-effects", { state: this.game.state() });
    });
  }

  handleDisconnect(client: Socket) {
    const result = this.removePlayer.execute({
      game: this.game,
      playerId: new UniqueEntityId(client.id),
    });

    if (result.isLeft()) throw result.value;

    this.game = result.value.game;

    client.broadcast.emit("player-disconnect", { state: this.game.state() });
  }

  handleConnection(client: Socket, ...args: any[]) {
    const result = this.addPlayer.execute({ game: this.game, playerId: client.id });
    if (result.isLeft()) throw result.value;

    const { game } = result.value;
    this.game = game;
    client.emit("bootstrap", {
      setup: game.state(),
      playerId: client.id,
    });

    client.broadcast.emit("setup", { setup: this.game.state() });
  }

  @SubscribeMessage("new-movement")
  handleMovement(client: Socket, { command }: { command: string }) {
    const result = this.movePlayer.execute({
      game: this.game,
      command,
      playerId: new UniqueEntityId(client.id), // TODO: tem ue ser dinamicamente
    });

    if (result.isLeft()) throw result.value;
    this.game = result.value.game;
  }
}
