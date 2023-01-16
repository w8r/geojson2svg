export { LineString } from "./line_string";
export { generatePolygon } from "./generate_polygon";

export class MultiLineString extends LineString {
  randomGeometry(center, bbox, R) {
    const coords = this.getPath(center, bbox, R);
    const coords2 = this.getPath([20, 20], bbox, 150);

    this.geometry({
      type: "MultiLineString",
      coordinates: [
        coords.slice(0, coords.length - 1),
        coords2.slice(0, coords2.length - 1),
      ],
    });
    return this;
  }
}
