import { describe, it, assert } from "vitest";
import * as bboxUtils from "../src/bbox";

describe("BBox utils", () => {
  it("getDefaultBBox", () => {
    assert.deepEqual(
      bboxUtils.getDefault(),
      [Infinity, Infinity, -Infinity, -Infinity],
      "infinity bbox"
    );
  });

  it("extendBBox", () => {
    const bbox = bboxUtils.getDefault();
    bboxUtils.extend(bbox, [0, 0]);
    assert.deepEqual(bbox, [0, 0, 0, 0]);
    bboxUtils.extend(bbox, [1, 1]);
    assert.deepEqual(bbox, [0, 0, 1, 1]);
    bboxUtils.extend(bbox, [-1, -1]);
    assert.deepEqual(bbox, [-1, -1, 1, 1]);
    bboxUtils.extend(bbox, [0, 0]);
    assert.deepEqual(bbox, [-1, -1, 1, 1]);
  });

  it("padBBox", () => {
    const bbox = bboxUtils.getDefault();
    bboxUtils.extend(bbox, [-1, -1]);
    bboxUtils.extend(bbox, [1, 1]);

    bboxUtils.pad(bbox, 1);
    assert.deepEqual(bbox, [-2, -2, 2, 2]);
    bboxUtils.pad(bbox, 0);
    assert.deepEqual(bbox, [-2, -2, 2, 2]);
    bboxUtils.pad(bbox, -1);
    assert.deepEqual(bbox, [-1, -1, 1, 1]);
  });
});
