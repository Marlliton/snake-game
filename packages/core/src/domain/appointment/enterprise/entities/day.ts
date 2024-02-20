import { Entity } from "@/common/entities/entity";
import { UniqueEntityId } from "@/common/entities/unique-entity-id";
import { dayjsUTC } from "@/common/util/dayjs";
import { Optional } from "@/types/Optional";

import { Hour } from "./hour";

export interface DayProps {
  hours: Hour[];
  beginningOfDay: Hour;
  endOfDay: Hour;
}

export class Day extends Entity<Day, DayProps> {
  get hours() {
    return this.props.hours;
  }

  get available() {
    return this.hours.some((hour) => hour.available);
  }

  get availableHours() {
    return this.hours.filter((h) => h.available);
  }

  setBeginningOfDay(hour: Hour) {
    return this.clone({ beginningOfDay: hour });
  }

  setEndOfDay(hour: Hour) {
    return this.clone({ endOfDay: hour });
  }

  static create(
    props?: Optional<DayProps, "beginningOfDay" | "endOfDay" | "hours">,
    id?: UniqueEntityId,
  ) {
    const beginningOfDay =
      props?.beginningOfDay ?? Hour.create({ value: dayjsUTC().startOf("day"), available: true });
    const endOfDay =
      props?.endOfDay ?? Hour.create({ value: dayjsUTC().endOf("day"), available: true });

    const hours =
      props?.hours ??
      Array.from({ length: 24 }).map((_, i) => {
        const hour = beginningOfDay.value.add(i, "hour");

        const available =
          (hour.isAfter(beginningOfDay.value) || hour.isSame(beginningOfDay.value)) &&
          (hour.isBefore(endOfDay.value) || hour.isSame(endOfDay.value));

        return Hour.create({
          value: hour,
          available: hour.isSame(beginningOfDay.value)
            ? beginningOfDay.available
            : hour.isSame(endOfDay.value)
              ? endOfDay.available
              : available,
        });
      });

    return new Day(
      {
        ...props,
        hours,
        beginningOfDay,
        endOfDay,
      },
      id,
    );
  }
}
