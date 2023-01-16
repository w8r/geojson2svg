import type { BBox, Position } from "geojson";
/**
 * BBox 'extend' in-place
 */
export function extend(bbox: BBox, [x, y]: Position) {
  bbox[0] = Math.min(x, bbox[0]);
  bbox[1] = Math.min(y, bbox[1]);
  bbox[2] = Math.max(x, bbox[2]);
  bbox[3] = Math.max(y, bbox[3]);
}

/**
 * BBox 'extend' in-place
 */
export function pad(bbox: BBox, padding: number) {
  bbox[0] -= padding;
  bbox[1] -= padding;
  bbox[2] += padding;
  bbox[3] += padding;
}

/**
 * @return {Array.<Number>}
 */
export const getDefault = (): BBox => [
  Infinity,
  Infinity,
  -Infinity,
  -Infinity,
];
