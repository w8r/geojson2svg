var tape = require('tape');
var bboxUtils = require('../src/bbox');

tape('BBox utils', function (t) {

  t.test('getDefaultBBox', function (t) {
    t.deepEquals(bboxUtils.getDefault(), [Infinity, Infinity, -Infinity, -Infinity], 'infinity bbox');
    t.end();
  });

  t.test('extendBBox', function (t) {
    var bbox = bboxUtils.getDefault();
    bboxUtils.extend(bbox, [0, 0]);
    t.deepEquals(bbox, [0, 0, 0, 0]);
    bboxUtils.extend(bbox, [1, 1]);
    t.deepEquals(bbox, [0, 0, 1, 1]);
    bboxUtils.extend(bbox, [-1, -1]);
    t.deepEquals(bbox, [-1, -1, 1, 1]);
    bboxUtils.extend(bbox, [0, 0]);
    t.deepEquals(bbox, [-1, -1, 1, 1]);

    t.end();
  });

  t.test('padBBox', function (t) {
    var bbox = bboxUtils.getDefault();
    bboxUtils.extend(bbox, [-1, -1]);
    bboxUtils.extend(bbox, [1, 1]);

    bboxUtils.pad(bbox, 1);
    t.deepEquals(bbox, [-2, -2, 2, 2]);
    bboxUtils.pad(bbox, 0);
    t.deepEquals(bbox, [-2, -2, 2, 2]);
    bboxUtils.pad(bbox, -1);
    t.deepEquals(bbox, [-1, -1, 1, 1]);

    t.end();
  });

  t.end();
});
