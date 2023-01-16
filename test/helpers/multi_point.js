import { Point } from "./point";
import * as bboxUtils from "../../src/bbox";

export class MultiPoint extends Point {
  randomGeometry(center, bbox, R) {
    const coords = center || [20, 20];
    const coords2 = [coords[0] + 50, coords[1] + 50];

    this.geometry({
      type: "MultiPoint",
      coordinates: [coords, coords2],
    });
    return this;
  }

  bbox() {
    const bbox1 = bboxUtils.getDefault();
    const bbox2 = bboxUtils.getDefault();
    const bbox = bboxUtils.getDefault();

    const radius = this._properties.radius || 1;
    const weight = this._properties.weight || 5;

    bboxUtils.extend(bbox1, this._geometry.coordinates[0]);
    bboxUtils.extend(bbox2, this._geometry.coordinates[1]);

    bboxUtils.pad(bbox1, radius);
    bboxUtils.pad(bbox1, weight);

    bboxUtils.pad(bbox2, radius);
    bboxUtils.pad(bbox2, weight);

    bboxUtils.extend(bbox, bbox1.slice(0, 2));
    bboxUtils.extend(bbox, bbox1.slice(2, 4));
    bboxUtils.extend(bbox, bbox2.slice(0, 2));
    bboxUtils.extend(bbox, bbox2.slice(2, 4));

    return bbox;
  }
}
