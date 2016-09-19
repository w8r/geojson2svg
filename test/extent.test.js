var tape               = require('tape');
var GeometryCollection = require('./helpers/geometry_collection');
var featureCollection  = require('./helpers/feature_collection');
var geojson2svg        = require('../');
var Point              = require('./helpers/point');

tape('Canvas extent', function (t) {
  var fontFamily = 'Helvetica, Arial, serif';
  var fontSize   = 12;
  var fontColor  = 'red';
  var builder = new GeometryCollection()
    .randomGeometry()
    .setProperty('text', ['Multiline text', 'with line breaks'])
    .setProperty('fontFamily', fontFamily)
    .setProperty('fontSize', fontSize)
    .setProperty('fontColor', fontColor)
    .setProperty('className', 'special-collection')
    .round();

  var gc = builder.build();
  var svg = geojson2svg(gc).type('type').extent([0, 0, 500, 500]).render();

  var bbox = svg.match(/viewBox=['"]([^"]+)['"]/m)[1].split(' ').map(parseFloat);
  bbox[2] += bbox[0];
  bbox[3] += bbox[1];

  t.deepEquals(bbox, [ 0, 0, 500, 500 ], 'forced extent');

  var pt = new Point({}, { type: 'Point', coordinates: [-900, -900]})
    .setProperty('weight', 5)
    .setProperty('stroke', 'red')
    .setProperty('fill', 'blue')
    .setProperty('dashArray', [2, 2])
    .setProperty('className', 'special-point')
    .setProperty('radius', 10)
    .round().build();

  var fc = featureCollection(pt, gc);
  svg = geojson2svg(fc).type('type').extent([0, 0, 500, 500]).render();

  bbox = svg.match(/viewBox=['"]([^"]+)['"]/m)[1].split(' ').map(parseFloat);
  bbox[2] += bbox[0];
  bbox[3] += bbox[1];

  t.deepEquals(bbox, [ 0, 0, 500, 500 ], 'forced extent persists');

  t.end();
});
