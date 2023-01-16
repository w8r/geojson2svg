import * as bboxUtils from "../../src/bbox";
import { Feature } from "./feature";

export class Point extends Feature {
  randomGeometry(center, bbox, R) {
    const coords = center || [20, 20];

    this.geometry({
      type: "Point",
      coordinates: coords,
    });
    return this;
  }

  bbox() {
    const bbox = bboxUtils.getDefault();
    bboxUtils.extend(bbox, this._geometry.coordinates);
    bboxUtils.pad(bbox, this._properties.radius || 0);
    bboxUtils.pad(this._properties.weight || 0);

    return bbox;
  }
}
