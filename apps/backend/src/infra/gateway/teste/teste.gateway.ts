import { Socket } from "socket.io";

import { SubscribeMessage, WebSocketGateway } from "@nestjs/websockets";

@WebSocketGateway({
  cors: true,
})
export class TesteGateway {
  @SubscribeMessage("message")
  handleMessage(client: Socket, payload: any) {
    console.log(client.id, payload);
    client.broadcast.emit("from-server", { message: "from server" });
  }
}
