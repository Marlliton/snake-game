import { describe, expect, it } from "vitest";

import { UniqueEntityId } from "@/common/entities/unique-entity-id";
import { Optional } from "@/common/types/Optional";

import { Entity } from "./entity";

interface EntityTestProps {
  name: string;
  price: number;
  description: string;
  duration: number;
  createdAt: Date;
  updatedAt?: Date;
}

class EntityTest extends Entity<EntityTest, EntityTestProps> {
  get name() {
    return this.props.name;
  }

  get price() {
    return this.props.price;
  }

  get description() {
    return this.props.description;
  }

  get duration() {
    return this.props.duration;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  static create(props: Optional<EntityTestProps, "createdAt">, id?: UniqueEntityId) {
    return new EntityTest(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    );
  }
}

describe("Entities: Service", () => {
  it("Should be able to create a service entity", () => {
    const service = EntityTest.create({
      name: "Corte de cabelo",
      description: "Corte simples",
      duration: 30,
      price: 25,
    });

    expect(service.id).toBeDefined();
  });

  it("Should be able to clone a service entity", () => {
    const service = EntityTest.create({
      name: "Corte de cabelo",
      description: "Corte simples",
      duration: 30,
      price: 25,
    });

    const clonedService = service.clone({ name: "Outro nome" });

    expect(clonedService).toBeInstanceOf(EntityTest);
    expect(clonedService.equals(service)).toBe(true);
    expect(clonedService.name).toEqual("Outro nome");
  });

  it("Should be able to create a service with a custom id", () => {
    const id = new UniqueEntityId();
    const service = EntityTest.create(
      {
        name: "Corte de cabelo",
        description: "Corte simples",
        duration: 30,
        price: 25,
      },
      id,
    );

    const clonedService = service.clone({ name: "Outro nome" });

    expect(clonedService).toBeInstanceOf(EntityTest);
    expect(clonedService.id.equals(id)).toBe(true);
  });

  it("Should be able to return a correct values", () => {
    const service = EntityTest.create({
      name: "Corte de cabelo",
      description: "description",
      duration: 30,
      price: 25,
    });

    expect(service.name).toEqual("Corte de cabelo");
    expect(service.description).toEqual("description");
    expect(service.duration).toEqual(30);
    expect(service.price).toEqual(25);
    expect(service.createdAt).toBeInstanceOf(Date);
  });
});
