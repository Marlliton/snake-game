import { v4 as uuidv4 } from "uuid";

export class UniqueEntityId {
  private _id: string;
  constructor(id?: string) {
    this._id = id ?? uuidv4();
  }

  get value() {
    return this._id;
  }

  equals(id: UniqueEntityId) {
    return this.value === id.value;
  }
}
