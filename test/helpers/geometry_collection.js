var LineString = require('./line_string');
var Point = require('./point');
var Polygon = require('./polygon');
var Textbox = require('./textbox');
var Feature = require('./feature');
var bboxUtils = require('../../src/bbox');
var project = require('geojson-project');

function GeometryCollection(props, geometry) {
  Feature.call(this, props, geometry);
}
GeometryCollection.prototype = Object.create(LineString.prototype);


GeometryCollection.prototype.randomGeometry = function (center, bbox, R) {
  var polygon = new Polygon().randomGeometry().build();
  var line    = new LineString().randomGeometry().build();
  var point   = new Point().randomGeometry().build();
  var textbox = new Textbox().randomGeometry().build();

  this.setProperty('geometriesTypes', ["point", "line", "polygon", "textbox"]);

  this.geometry({
    type: 'GeometryCollection',
    geometries: [point.geometry, line.geometry, polygon.geometry, textbox.geometry]
  });

  return this;
};


GeometryCollection.prototype.bbox = function () {
  var bbox = bboxUtils.getDefault();
  project({
    type: 'Feature',
    geometry: this._geometry
  }, function (coord) {
    console.log(coord);
    bboxUtils.extend(bbox, coord);
    return coord;
  });
  return bbox;
};

module.exports = GeometryCollection;
