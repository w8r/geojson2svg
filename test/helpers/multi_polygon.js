var Polygon = require('./polygon');
var generatePolygon = require('./generate_polygon');

function MultiPolygon(props, geometry) {
  Polygon.call(this, props, geometry);
}
MultiPolygon.prototype = Object.create(Polygon.prototype);


MultiPolygon.prototype.randomGeometry = function (center, bbox, R) {
  var coords = this.getPath(center, bbox, R);
  var coords2 = this.getPath([20, 20], null, 100);

  this.geometry({
    type: 'MultiPolygon',
    coordinates: [[coords], [coords2]]
  });
  return this;
}

module.exports = MultiPolygon;
