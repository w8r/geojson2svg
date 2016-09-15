var Feature = require('./feature');
var generatePolygon = require('./generate_polygon');

function LineString(props, geometry) {
  Feature.call(this, props, geometry);
}
LineString.prototype = Object.create(Feature.prototype);


LineString.prototype.getPath = function (center, bbox, R) {
  center = center ?
    center :
    bbox ?
      [ (bbox[0] + bbox[1]) / 2, (bbox[1] + bbox[3]) / 2 ] :
      [ -500 + 1000 * Math.random(), -500 + 1000 * Math.random()];
  R = R || 250;

  var coords = generatePolygon(
    center[0], center[1], R, 0.5, 0.3, 10 + Math.random(20 * Math.random()));
  return coords;
};


LineString.prototype.randomGeometry = function (center, bbox, R) {
  var coords = this.getPath(center, bbox, R);

  this.geometry({
    type: 'LineString',
    coordinates: coords.slice(0, coords.length - 1)
  });
  return this;
};

module.exports = LineString;
