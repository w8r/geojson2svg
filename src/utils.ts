import type { ArrowOptions, BBox, PathDecorator, Position } from "./types";
import {
  extend as extendBBox,
  pad as padBBox,
  getDefault as getDefaultBBox,
} from "./bbox";

/**
 * Creates SVG marker
 * @param  {SVGElement} path Element to use as the marker
 * @param  {Object}     options
 * @return {String}
 */
export function createMarker(
  path: string,
  id: string,
  width: number,
  height: number,
  ref: [number, number]
) {
  var marker = [
    '<marker id="',
    id,
    '" ',
    'markerWidth="',
    width,
    '" ',
    'markerHeight="',
    height,
    '" ',
    'orient="auto" ',
  ];

  if (ref) marker.push('refX="', ref[0], '" ', 'refY="', ref[1], '" ');

  marker.push(">", path, "</marker>");
  return marker.join("");
}

/**
 * Create arrow at the end of the line
 * @param  {Object} options
 * @return {String} SVG marker id
 */
export function createArrow(options: ArrowOptions, defs: string[]) {
  const height = options.arrowLength || options.weight * 20;
  const width = options.arrowThickness || options.weight * 10;
  const length = height;
  const direction = options.direction;

  const id = `arrow-${width}${length}${direction}`.replace(/\./g, "");
  let path = defs.filter((def) => def.indexOf(id) !== -1)[0];

  if (!path) {
    // arrow doesn't exist, create it
    let refX = 0;
    let refY = width / 2;
    let d = "";

    if (direction === 1) {
      // LTR
      refX = length;
      d = ["M", 0, 0, "L", 0, width, "L", length, width / 2, "Z"].join(" ");
    } else {
      // RTL
      d = ["M", length, 0, "L", length, width, "L", 0, width / 2, "Z"].join(
        " "
      );
    }

    const markerpath = `<path id="path-${id}" class="arrow-path" d="${d}" />`;
    const marker = createMarker(markerpath, id, height, width, [refX, refY]);
    defs.push(marker);
  }
  return id;
}

/**
 * @param  {Array.<Array.<Number>>} coords
 * @param  {Booelean}               closed
 * @param  {Array.<Number>}         bbox
 * @param  {Array.<Number>}         featureBounds
 * @return {String}
 */
export function coordinatesToPath(
  coords: Position[] | Position[][] | Position[][][],
  closed: boolean,
  bbox: BBox,
  fBounds: BBox
) {
  var res = "";
  if (!isFinite(coords[0][0] as number)) {
    const rings = coords as Position[][];
    for (let i = 0, len = rings.length; i < len; i++) {
      res += " " + coordinatesToPath(rings[i], closed, bbox, fBounds);
    }
  } else {
    const ring = coords as Position[];
    for (let i = 0, len = ring.length; i < len; i++) {
      const c = ring[i];
      res += (i === 0 ? "M" : "L") + c[0] + " " + c[1];

      extendBBox(bbox, c);
      extendBBox(fBounds, c);
    }

    if (closed) res += "Z";
  }

  return res || "M0 0";
}
