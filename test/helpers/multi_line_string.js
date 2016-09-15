var LineString = require('./line_string');
var generatePolygon = require('./generate_polygon');

function MultiLineString(props, geometry) {
  LineString.call(this, props, geometry);
}
MultiLineString.prototype = Object.create(LineString.prototype);


MultiLineString.prototype.randomGeometry = function (center, bbox, R) {
  var coords = this.getPath(center, bbox, R);
  var coords2 = this.getPath([20, 20], bbox, 150);

  this.geometry({
    type: 'MultiLineString',
    coordinates: [coords.slice(0, coords.length - 1), coords2.slice(0, coords2.length - 1)]
  });
  return this;
};

module.exports = MultiLineString;
