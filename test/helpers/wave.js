import decorator from "svg-polygon-decorator";
import simplify from "simplify-js";
import * as bboxUtils from "../../src/bbox";

export function wave(rings, radius, closed, bbox, featureBounds) {
  var str = "";

  for (var i = 0, len = rings.length; i < len; ++i) {
    var cloudPoints = [];
    var area = 0;
    var ring = simplify(
      rings[i].map(function (p) {
        return { x: p[0], y: p[1] };
      })
    ).map(function (p) {
      return [p.x, p.y];
    });

    var ringLength = ring.length;

    for (var j = 0; j < ringLength; j++) {
      var point = ring[j];

      bboxUtils.extend(bbox, point);
      bboxUtils.extend(featureBounds, point);

      cloudPoints.push(point.slice());
    }
    var inward = area < 0;
    str += decorator(cloudPoints, radius, closed, inward, true) + " ";
  }

  // SVG complains about empty path strings
  return str || "M0 0";
}
