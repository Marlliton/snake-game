import { Module } from "@nestjs/common";

import { GatewayModule } from "./gateway/gateway.module";
import { HttpModule } from "./http/http.module";

@Module({
  imports: [HttpModule, GatewayModule],
  providers: [],
})
export class AppModule {}
