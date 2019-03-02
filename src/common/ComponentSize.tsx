import { Dimensions } from "react-native";

export default class ComponentSize {
  static getFromWindow() {
    return Dimensions.get("window");
  }

  static computeFromWindow(
    columnsCount: number = 1,
    margins: number = 0
  ): ComponentSize {
    const window = ComponentSize.getFromWindow();
    const width = Math.floor((window.width - margins) / columnsCount);
    return new ComponentSize(width, width);
  }

  width: number;
  height: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  toStyle() {
    return {
      height: this.height,
      width: this.width
    };
  }
}
