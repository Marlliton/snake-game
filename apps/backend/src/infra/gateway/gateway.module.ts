import { Module } from "@nestjs/common";

import { AddPlayerUseCasseNest } from "../use-cases/add-player-nest";
import { RemovePlayerUseCasseNest } from "../use-cases/remove-player-nest";
import { BootstrapGateway } from "./bootstrap/bootstrap.gateway";

@Module({
  providers: [BootstrapGateway, AddPlayerUseCasseNest, RemovePlayerUseCasseNest],
  exports: [BootstrapGateway],
})
export class GatewayModule {}
