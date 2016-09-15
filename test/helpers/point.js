var bboxUtils = require('../../src/bbox');
var Feature = require('./feature');

function Point(props, geometry) {
  Feature.call(this, props, geometry);
}
Point.prototype = Object.create(Feature.prototype);


Point.prototype.randomGeometry = function (center, bbox, R) {
  var coords = center || [20, 20];

  this.geometry({
    type: 'Point',
    coordinates: coords
  });
  return this;
};


Point.prototype.bbox = function () {
  var bbox = bboxUtils.getDefault();
  bboxUtils.extend(bbox, this._geometry.coordinates);
  bboxUtils.pad(bbox, this._properties.radius || 0);
  bboxUtils.pad(this._properties.weight || 0);

  return bbox;
};

module.exports = Point;
