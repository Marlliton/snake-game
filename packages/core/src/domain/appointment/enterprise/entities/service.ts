import { Entity } from "@/common/entities/entity";
import { UniqueEntityId } from "@/common/entities/unique-entity-id";
import { Optional } from "@/types/Optional";

export interface ServiceProps {
  name: string;
  price: number;
  description: string;
  duration: number;
  createdAt: Date;
  updatedAt?: Date;
}

export class Service extends Entity<Service, ServiceProps> {
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

  static create(props: Optional<ServiceProps, "createdAt">, id?: UniqueEntityId) {
    return new Service(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    );
  }
}
