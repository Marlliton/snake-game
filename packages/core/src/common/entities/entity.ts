import { UniqueEntityId } from "./unique-entity-id";

export abstract class Entity<Type, Props> {
  private _id: UniqueEntityId;
  protected constructor(
    public props: Props,
    id?: UniqueEntityId,
  ) {
    this._id = id ?? new UniqueEntityId();
  }

  get id() {
    return this._id;
  }

  equals(entity: Entity<Type, Props>) {
    return this._id.equals(entity._id);
  }

  clone(props: Partial<Props>): Type {
    const clonedEntity = new (this.constructor as new (props: Props, id: UniqueEntityId) => Type)(
      {
        ...this.props,
        ...props,
      },
      this._id,
    );

    return clonedEntity;
  }
}
