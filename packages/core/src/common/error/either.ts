export type Either<L, R> = Left<L, R> | Right<L, R>;

class Left<L, R> {
  constructor(readonly value: L) {}

  isLeft(): this is Left<L, R> {
    return true;
  }

  isRight(): this is Right<L, R> {
    return false;
  }
}

class Right<L, R> {
  constructor(readonly value: R) {}

  isLeft(): this is Left<L, R> {
    return false;
  }

  isRight(): this is Right<L, R> {
    return true;
  }
}

export const left = <L, R>(value: L): Either<L, R> => {
  return new Left(value);
};

export const right = <L, R>(value: R): Either<L, R> => {
  return new Right(value);
};
