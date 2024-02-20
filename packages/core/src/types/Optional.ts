type Optional<TypeBase, keys extends keyof TypeBase> = Pick<Partial<TypeBase>, keys> &
  Omit<TypeBase, keys>;

export type { Optional };
