import { Module } from "@nestjs/common";

import { HalloWorldController } from "./controllers/hello-world.controller";

@Module({
  controllers: [HalloWorldController],
})
export class HttpModule {}
