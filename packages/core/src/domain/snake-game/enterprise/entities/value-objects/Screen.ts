type coordinates = { x: number; y: number };

export interface ScreenProps {
  width: number;
  height: number;
}

export class Screen {
  private constructor(readonly props: ScreenProps) {}

  get width() {
    return this.props.width;
  }

  get height() {
    return this.props.height;
  }

  checkAndForceCorrectMovement({ x, y }: coordinates): coordinates {
    const isPlayerXOutOfBounds = x < 0 || x >= this.width;
    const isPlayerYOutOfBounds = y < 0 || y >= this.height;

    let finalCoordinateX = x;
    let finalCoordinateY = y;

    if (isPlayerXOutOfBounds) {
      finalCoordinateX = x < 0 ? this.width - 1 : 0;
    }

    if (isPlayerYOutOfBounds) {
      finalCoordinateY = y < 0 ? this.height - 1 : 0;
    }

    return {
      x: finalCoordinateX,
      y: finalCoordinateY,
    };
  }

  state() {
    return {
      width: this.width,
      height: this.height,
    };
  }

  static createScreen(props: ScreenProps): Screen {
    return new Screen(props);
  }
}
