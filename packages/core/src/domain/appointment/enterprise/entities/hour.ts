import { Dayjs } from "dayjs";

import { Entity } from "@/common/entities/entity";
import { UniqueEntityId } from "@/common/entities/unique-entity-id";
import { Optional } from "@/types/Optional";

export interface HourProps {
  value: Dayjs;
  available: boolean;
}

export class Hour extends Entity<Hour, HourProps> {
  get value() {
    return this.props.value;
  }

  get available() {
    return this.props.available;
  }

  static create(props: Optional<HourProps, "available">, id?: UniqueEntityId) {
    return new Hour(
      {
        ...props,
        available: props.available ?? false,
      },
      id,
    );
  }
}
