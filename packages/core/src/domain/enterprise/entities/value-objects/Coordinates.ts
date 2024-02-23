export class Coordinates {
  static generateUniqueCoordinateXAndY(
    numbersToExclude: number[],
    maxValue: number,
  ): [number, number] {
    let x: number | null = null;
    let y: number | null = null;

    while (x === null || y === null) {
      const num = Math.floor(Math.random() * (maxValue - 0 + 1)) + 0;

      if (!numbersToExclude.includes(num)) {
        if (x === null) {
          x = num;
        } else {
          y = num;
        }
      }
    }

    return [x, y];
  }
}
