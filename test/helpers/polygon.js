import { LineString } from "./line_string";

export class Polygon extends LineString {
  randomGeometry(center, bbox, R) {
    const coords = this.getPath(center, bbox, R);

    this.geometry({
      type: "Polygon",
      coordinates: [coords],
    });
    return this;
  }
}
