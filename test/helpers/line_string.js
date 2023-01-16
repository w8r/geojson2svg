import { Feature } from "./feature";
import { generatePolygon } from "./generate_polygon";

export class LineString extends Feature {
  getPath(center, bbox, R) {
    center = center
      ? center
      : bbox
      ? [(bbox[0] + bbox[1]) / 2, (bbox[1] + bbox[3]) / 2]
      : [-500 + 1000 * Math.random(), -500 + 1000 * Math.random()];
    R = R || 250;

    var coords = generatePolygon(
      center[0],
      center[1],
      R,
      0.5,
      0.3,
      10 + Math.random(20 * Math.random())
    );
    return coords;
  }

  randomGeometry(center, bbox, R) {
    var coords = this.getPath(center, bbox, R);

    this.geometry({
      type: "LineString",
      coordinates: coords.slice(0, coords.length - 1),
    });
    return this;
  }
}
