var Feature = require('./feature');
var generatePolygon = require('./generate_polygon');

function Polygon(props, geometry) {
  Feature.call(this, props, geometry);
}
Polygon.prototype = Object.create(Feature.prototype);


Polygon.prototype.randomGeometry = function (center, bbox, R) {
  center = center ?
    center :
    bbox ?
      [ (bbox[0] + bbox[1]) / 2, (bbox[1] + bbox[3]) / 2 ] :
      [ -500 + 1000 * Math.random(), -500 + 1000 * Math.random()];
  R = R || 250;

  var coords = generatePolygon(
    center[0], center[1], R, 0.5, 0.3, 10 + Math.random(20 * Math.random()))

  this.geometry({
    type: 'Polygon',
    coordinates: [coords]
  });
  return this;
}

module.exports = Polygon;
