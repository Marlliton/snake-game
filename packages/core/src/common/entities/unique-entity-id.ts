import { randomUUID } from "node:crypto";

export class UniqueEntityId {
  private _id: string;
  constructor(id?: string) {
    this._id = id ?? randomUUID();
  }

  get value() {
    return this._id;
  }

  equals(id: UniqueEntityId) {
    return this.value === id.value;
  }
}
