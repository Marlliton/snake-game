import { Entity } from "@/common/entities/entity";
import { UniqueEntityId } from "@/common/entities/unique-entity-id";
import { Name } from "@/common/value-objects/name";
import { Optional } from "@/types/Optional";

type Rule = "client" | "adm";

export interface UserProps {
  name: Name;
  email: string;
  photoURL: string;
  rule: Rule;
  createdAt: Date;
  updatedAt?: Date;
}

export class User extends Entity<User, UserProps> {
  get name() {
    return this.props.name._value;
  }

  get email() {
    return this.props.email;
  }

  get photoURL() {
    return this.props.photoURL;
  }

  get rule() {
    return this.props.rule;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  static create(props: Optional<UserProps, "createdAt">, id?: UniqueEntityId) {
    return new User(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    );
  }
}
