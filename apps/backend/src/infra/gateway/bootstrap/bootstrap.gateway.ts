import { Server, Socket } from "socket.io";

import { AddFruitUseCaseNest } from "@/infra/use-cases/add-fruit-nest";
import { AddPlayerUseCasseNest } from "@/infra/use-cases/add-player-nest";
import { MovePlayerUseCaseNest } from "@/infra/use-cases/move-player-nest";
import { RemovePlayerUseCasseNest } from "@/infra/use-cases/remove-player-nest";
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
} from "@nestjs/websockets";
import { Game, Screen } from "@snake/core";
import { UniqueEntityId } from "@snake/core/common";

@WebSocketGateway({
  cors: true,
})
export class BootstrapGateway implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {
  private game: Game;
  private fruitInterval: NodeJS.Timeout | null = null;
  private autoMoveInterval: NodeJS.Timeout | null = null;
  constructor(
    private addPlayer: AddPlayerUseCasseNest,
    private removePlayer: RemovePlayerUseCasseNest,
    private movePlayer: MovePlayerUseCaseNest,
    private addFruit: AddFruitUseCaseNest,
  ) {
    this.game = Game.create({
      fruits: {},
      players: {},
      screen: Screen.createScreen({ height: 30, width: 30 }),
    });
  }

  afterInit(server: Server) {
    this.fruitInterval = setInterval(() => {
      const result = this.addFruit.execute({ game: this.game });
      if (result.isRight()) {
        this.game = result.value.game;
        server.sockets.emit("setup", { setup: result.value.game.state() });
      }
    }, 3000);

    this.autoMoveInterval = setInterval(() => {
      const players = this.game.players;
      for (const [_, player] of Object.entries(players)) {
        if (player.lastMovement) {
          const result = this.movePlayer.execute({
            game: this.game,
            command: player.lastMovement,
            playerId: player.id,
          });

          if (result.isRight()) {
            this.game = result.value.game;
            server.sockets.emit("setup", { setup: result.value.game.state() });
          }
        }
      }
    }, 300);
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

  handleConnection(client: Socket) {
    const result = this.addPlayer.execute({ game: this.game, playerId: client.id });
    if (result.isLeft()) throw result.value;

    const { game } = result.value;
    this.game = game;
    client.emit("bootstrap", {
      setup: game.state(),
      playerId: client.id,
    });

    client.broadcast.emit("setup", { setup: game.state() });
  }

  @SubscribeMessage("new-movement")
  handleMovement(client: Socket, { command }: { command: string }) {
    const result = this.movePlayer.execute({
      game: this.game,
      command,
      playerId: new UniqueEntityId(client.id), // TODO:  TROCAR PARA STRING AO INVÉS DE ENTIDADE, CRIAR ENTIDADE NO CASO DE USO.
    });

    if (result.isLeft()) throw result.value;
    this.game = result.value.game;
    client.broadcast.emit("setup", { setup: result.value.game.state() });
  }
}
