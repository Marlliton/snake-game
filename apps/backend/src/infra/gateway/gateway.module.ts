import { Module } from "@nestjs/common";

import { TesteGateway } from "./teste/teste.gateway";

@Module({
  providers: [TesteGateway],
  exports: [TesteGateway],
})
export class GatewayModule {}
