import { describe, expect, it } from "vitest";

import { dayjsUTC } from "@/common/util/dayjs";

import { Day } from "./day";
import { Hour } from "./hour";

describe("Day", () => {
  // it("should be able to create a available day", () => {
  //   const day = Day.create();

  //   expect(day.hours).toHaveLength(24);
  //   expect(day.availableHours).toHaveLength(24);
  //   expect(day.available).toBe(true);
  // });

  // it("should be able to create a available day with time interval", () => {
  //   const day = Day.create({
  //     beginningOfDay: Hour.create({ value: dayjsUTC().set("hour", 8) }),
  //     endOfDay: Hour.create({ value: dayjsUTC().set("hour", 17) }),
  //   });

  //   expect(day.hours).toHaveLength(24);
  //   expect(day.availableHours).toHaveLength(10);
  //   expect(day.available).toBe(true);
  // });

  it("should not be able to create a available day", () => {
    const day = Day.create({
      beginningOfDay: Hour.create({ value: dayjsUTC().set("hour", 8), available: true }),
      endOfDay: Hour.create({ value: dayjsUTC().set("hour", 17), available: false }),
    });

    expect(day.hours).toHaveLength(24);
    expect(day.availableHours).toHaveLength(0);
    expect(day.available).toBe(false);
  });
});
