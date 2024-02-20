import { Controller, Get, HttpCode } from "@nestjs/common";

@Controller("/hallo")
export class HalloWorldController {
  @Get()
  @HttpCode(200)
  handle() {
    return "Hallo World!";
  }
}
