import { beforeEach, describe, expect, it } from "vitest";

import { ErrorValidation } from "./error-validation";

interface ModelTestProps {
  name?: string | null;
  email?: string | null;
  age?: number | null;
}
class ModelTest {
  constructor(public props: ModelTestProps) {}
}

let model: ModelTest;

describe("Error Validation", () => {
  beforeEach(() => {
    model = new ModelTest({ name: "Marlliton", age: 20, email: "marlliton@gmail.com" });
  });

  it("should be able to validate string length", () => {
    const validations = ErrorValidation.initValidation(model.props, model.constructor.name)
      .attribute("name")
      .notNull()
      .notUndefined()
      .betweenLength(3, 80);

    expect(() => validations.throwIfErrors()).not.toThrow();
  });

  it("should be able to throw erros if incorrect string length", () => {
    model.props.name = "at";
    const validations = ErrorValidation.initValidation(model.props, model.constructor.name)
      .attribute("name")
      .betweenLength(3, 80);

    expect(() => validations.throwIfErrors()).toThrow();
  });

  it("should be able to throw erros if the attribute is null or undefined", () => {
    model.props.name = null;
    model.props.email = undefined;
    const validations = ErrorValidation.initValidation(model.props, model.constructor.name)
      .attribute("name")
      .notNull()
      .attribute("email")
      .notUndefined();

    expect(() => validations.throwIfErrors()).toThrow();
  });
  it("should be able to throw validation erros", () => {
    model.props.name = null;
    model.props.email = undefined;

    const validations = ErrorValidation.initValidation(model.props, model.constructor.name)
      .attribute("name")
      .notNull()
      .attribute("email")
      .notUndefined();

    expect(validations.errors).toHaveLength(2);
    expect(validations.errors).toEqual([
      expect.objectContaining({
        attribute: "name",
        className: model.constructor.name,
      }),
      expect.objectContaining({
        attribute: "email",
        className: model.constructor.name,
      }),
    ]);
    expect(() => validations.throwIfErrors()).toThrow();
  });
});
