import { Module } from "@nestjs/common";

import { TesteGateway } from "./bootstrap/bootstrap.gateway";

@Module({
  providers: [TesteGateway],
  exports: [TesteGateway],
})
export class GatewayModule {}
