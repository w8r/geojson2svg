import { LineString } from "./line_string";
import { Point } from "./point";
import { Polygon } from "./polygon";
import { Textbox } from "./textbox";
import * as bboxUtils from "../../src/bbox";
import project from "geojson-project";

console.log({ project });

export class GeometryCollection extends LineString {
  randomGeometry(center, bbox, R) {
    const polygon = new Polygon().randomGeometry().build();
    const line = new LineString().randomGeometry().build();
    const point = new Point().randomGeometry().build();
    const textbox = new Textbox().randomGeometry().build();

    this.setProperty("geometriesTypes", [
      "point",
      "line",
      "polygon",
      "textbox",
    ]);

    this.geometry({
      type: "GeometryCollection",
      geometries: [
        point.geometry,
        line.geometry,
        polygon.geometry,
        textbox.geometry,
      ],
    });

    return this;
  }

  bbox() {
    const bbox = bboxUtils.getDefault();
    project(
      {
        type: "Feature",
        geometry: this._geometry,
      },
      function (coord) {
        bboxUtils.extend(bbox, coord);
        return coord;
      }
    );
    return bbox;
  }
}
