import { Polygon } from "./polygon";

export class Textbox extends Polygon {
  constructor(props, geometry) {
    super(props, geometry);
    this.setProperty("type", "textbox");
  }

  asPoint(center) {
    center = center || [20, 20];
    this.setProperty("radius", 30);
    this.geometry({
      type: "Point",
      coordinates: center,
    });
    return this;
  }

  randomGeometry(center, R) {
    center = center || [20, 20];
    R = R || 50;

    const coords = [
      [center[0] - R, center[1] - R],
      [center[0] + R, center[1] - R],
      [center[0] + R, center[1] + R],
      [center[0] - R, center[1] + R],
      [center[0] - R, center[1] - R],
    ];

    this.geometry({
      type: "Polygon",
      coordinates: [coords],
    });

    return this;
  }
}
