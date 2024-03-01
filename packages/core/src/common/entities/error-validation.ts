import { Optional } from "@/common/types/Optional";

import { Err } from "../error/err";

export class ErrorValidation {
  private constructor(
    private props: any,
    private className: string,
    private currentAttribute: string = "",
    readonly errors: Err[] = [],
  ) {}

  static initValidation(props: any, className: string) {
    return new ErrorValidation(props, className);
  }

  attribute(attribute: string) {
    this.currentAttribute = attribute;
    return this;
  }

  betweenLength(min: number, max: number) {
    const value = this.props[this.currentAttribute];
    const isArrayOrString = Array.isArray(value) || typeof value === "string";
    if (!isArrayOrString) {
      return this.addErr({
        className: this.className,
        msg: `"${value}" is not assignable array or string.`,
      });
    }

    if (value.length < min || value.length > max) {
      return this.addErr({
        className: this.className,
        msg: `"${this.currentAttribute}" is has to between ${min} and ${max}`,
      });
    } else {
      return this;
    }
  }

  notNull() {
    if (
      this.props[this.currentAttribute] === null ||
      this.props[this.currentAttribute] === undefined
    ) {
      return this.addErr({
        className: this.className,
        msg: `"${this.currentAttribute}" is null or undefined.`,
      });
    } else {
      return this;
    }
  }

  notUndefined() {
    if (
      this.props[this.currentAttribute] === undefined ||
      this.props[this.currentAttribute] === null
    ) {
      return this.addErr({
        className: this.className,
        msg: `"${this.currentAttribute}" is undefined or null.`,
      });
    } else {
      return this;
    }
  }

  throwIfErrors() {
    if (this.errors.length > 0) {
      throw this.errors;
    }
  }

  private addErr(err: Optional<Err, "attribute">) {
    if (this.errAlreadyExistis({ ...err, attribute: this.currentAttribute })) return this;

    return new ErrorValidation(this.props, this.className, this.currentAttribute, [
      ...this.errors,
      { ...err, attribute: this.currentAttribute },
    ]);
  }

  private errAlreadyExistis(err: Err) {
    const ocurredError = this.errors.findIndex(
      (e) => e.className === err.className && e.attribute === err.attribute && e.msg === err.msg,
    );
    return ocurredError !== -1;
  }
}
