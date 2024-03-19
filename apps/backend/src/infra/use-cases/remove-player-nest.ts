import { Injectable } from "@nestjs/common";
import { RemovePlayerUseCasse } from "@snake/core/use-cases";

@Injectable()
export class RemovePlayerUseCasseNest extends RemovePlayerUseCasse {}
