import { GeometryCollection } from "./helpers/geometry_collection";
import { featureCollection } from "./helpers/feature_collection";
import { renderer } from "..";
import { Point } from "./helpers/point";
import { describe, it, assert } from "vitest";

describe("Canvas extent", () => {
  it("should calculate correctly", () => {
    const fontFamily = "Helvetica, Arial, serif";
    const fontSize = 12;
    const fontColor = "red";
    const builder = new GeometryCollection()
      .randomGeometry()
      .setProperty("text", ["Multiline text", "with line breaks"])
      .setProperty("fontFamily", fontFamily)
      .setProperty("fontSize", fontSize)
      .setProperty("fontColor", fontColor)
      .setProperty("className", "special-collection")
      .round();

    const gc = builder.build();
    const svg = renderer(gc).type("type").extent([0, 0, 500, 500]).render();

    var bbox = svg
      .match(/viewBox=['"]([^"]+)['"]/m)[1]
      .split(" ")
      .map(parseFloat);
    bbox[2] += bbox[0];
    bbox[3] += bbox[1];

    assert.deepEqual(bbox, [0, 0, 500, 500], "forced extent");

    var pt = new Point({}, { type: "Point", coordinates: [-900, -900] })
      .setProperty("weight", 5)
      .setProperty("stroke", "red")
      .setProperty("fill", "blue")
      .setProperty("dashArray", [2, 2])
      .setProperty("className", "special-point")
      .setProperty("radius", 10)
      .round()
      .build();

    var fc = featureCollection(pt, gc);
    svg = geojson2svg(fc).type("type").extent([0, 0, 500, 500]).render();

    bbox = svg
      .match(/viewBox=['"]([^"]+)['"]/m)[1]
      .split(" ")
      .map(parseFloat);
    bbox[2] += bbox[0];
    bbox[3] += bbox[1];

    assert.deepEqual(bbox, [0, 0, 500, 500], "forced extent persists");
  });
});
