import { Polygon } from "./polygon";

class MultiPolygon extends Polygon {
  randomGeometry(center, bbox, R) {
    const coords = this.getPath(center, bbox, R);
    const coords2 = this.getPath([20, 20], null, 100);

    this.geometry({
      type: "MultiPolygon",
      coordinates: [[coords], [coords2]],
    });
    return this;
  }
}
