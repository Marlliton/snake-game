import { NestFactory } from "@nestjs/core";
import { Game, Screen } from "@snake/core";

import { AppModule } from "./app.module";
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3333);

  const game = Game.create({
    fruits: {},
    players: {},
    screen: Screen.createScreen({ height: 50, width: 50 }),
  });
}
bootstrap();
