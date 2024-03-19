import { Socket } from "socket.io";

import { SubscribeMessage, WebSocketGateway } from "@nestjs/websockets";
import { Game, Player, Screen } from "@snake/core";
import { UniqueEntityId } from "@snake/core/common";

@WebSocketGateway({
  cors: true,
})
export class TesteGateway {
  @SubscribeMessage("bootstrap")
  handleMessage(client: Socket, payload: any) {
    const player = Player.create(
      {
        x: Math.floor(Math.random() * 30),
        y: Math.floor(Math.random() * 30),
      },
      new UniqueEntityId(client.id),
    );
    const game = Game.create({
      fruits: {},
      players: { [player.id.value]: player },
      screen: Screen.createScreen({ height: 30, width: 30 }),
    });

    console.log("🚀 ~ TesteGateway ~ handleMessage ~ game.gameState():", game.gameState());
    client.emit("setup", game.gameState());
  }
}
