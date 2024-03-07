export class FruitNotFoundError extends Error {
  constructor() {
    super("Fruit not found.");
  }
}
