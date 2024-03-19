import { Injectable } from "@nestjs/common";
import { AddPlayerUseCasse } from "@snake/core/use-cases";

@Injectable()
export class AddPlayerUseCasseNest extends AddPlayerUseCasse {}
