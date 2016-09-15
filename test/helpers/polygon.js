var LineString = require('./line_string');
var generatePolygon = require('./generate_polygon');

function Polygon(props, geometry) {
  LineString.call(this, props, geometry);
}
Polygon.prototype = Object.create(LineString.prototype);


Polygon.prototype.randomGeometry = function (center, bbox, R) {
  var coords = this.getPath(center, bbox, R);

  this.geometry({
    type: 'Polygon',
    coordinates: [coords]
  });
  return this;
}

module.exports = Polygon;
