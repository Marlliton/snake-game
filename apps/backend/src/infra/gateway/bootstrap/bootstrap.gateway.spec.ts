import { beforeEach, describe, expect, it } from "vitest";

import { Test, TestingModule } from "@nestjs/testing";

import { TesteGateway } from "./bootstrap.gateway";

describe("TesteGateway", () => {
  let gateway: TesteGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TesteGateway],
    }).compile();

    gateway = module.get<TesteGateway>(TesteGateway);
  });

  it("should be defined", () => {
    expect(gateway).toBeDefined();
  });
});
