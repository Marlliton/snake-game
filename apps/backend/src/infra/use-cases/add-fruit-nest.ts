import { Injectable } from "@nestjs/common";
import { AddFruitUseCase } from "@snake/core/use-cases";

@Injectable()
export class AddFruitUseCaseNest extends AddFruitUseCase {}
