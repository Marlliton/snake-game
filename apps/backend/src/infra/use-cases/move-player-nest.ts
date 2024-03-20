import { Injectable } from "@nestjs/common";
import { MovePlayerUseCasse } from "@snake/core/use-cases";

@Injectable()
export class MovePlayerUseCaseNest extends MovePlayerUseCasse {}
