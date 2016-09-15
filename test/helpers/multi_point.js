var Point = require('./point');
var bboxUtils = require('../../src/bbox');

function MultiPoint(props, geometry) {
  Point.call(this, props, geometry);
}
MultiPoint.prototype = Object.create(Point.prototype);


MultiPoint.prototype.randomGeometry = function (center, bbox, R) {
  var coords = center || [20, 20];
  var coords2 = [coords[0] + 50, coords[1] + 50];

  this.geometry({
    type: 'MultiPoint',
    coordinates: [coords, coords2]
  });
  return this;
};


MultiPoint.prototype.bbox = function () {
  var bbox1 = bboxUtils.getDefault();
  var bbox2 = bboxUtils.getDefault();
  var bbox  = bboxUtils.getDefault();

  var radius = this._properties.radius || 1;
  var weight = this._properties.weight || 5;

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
};

module.exports = MultiPoint;
