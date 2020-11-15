var tape = require('tape');
var fs   = require('fs');
var path = require('path');
var flatten = require('lodash.flatten');

var formatXml   = require('./helpers/format_xml');
var geojson2svg = require('../');
var bboxUtils   = require('../src/bbox');
var Renderer    = geojson2svg.Renderer;
var data        = require('./fixtures/data.json');
var style       = require('./fixtures/markup_style.json');
var wave        = require('./helpers/wave');

var featureCollection = require('./helpers/feature_collection');
var LineString        = require('./helpers/line_string');


tape('LineString', function (t) {
  var builder = new LineString()
    .randomGeometry()
    .setProperty('weight', 5)
    .setProperty('stroke', 'red')
    .setProperty('fill', 'blue')
    .setProperty('dashArray', [2, 2])
    .round();

  var linestring = builder.build();
  var svg = geojson2svg(linestring).render();

  var bbox = svg.match(/viewBox=['"]([^"]+)['"]/m)[1].split(' ').map(parseFloat);
  var path = svg
    .match(/d=['"]([^"]+)['"]/m)[1]
    .trim();

  t.notEquals(path[path.length - 1], 'Z', 'path string not closed');

  path = path
    .split(/[^\d-]/)
    .filter(function (val) {
      return val !== '';
    })
    .map(parseFloat);

  bbox[2] += bbox[0];
  bbox[3] += bbox[1];

  var calculatedBBox = builder.bbox();
  bboxUtils.pad(calculatedBBox, 5);
  t.deepEquals(path, flatten(flatten(linestring.geometry.coordinates)), 'correct path');
  t.deepEquals(bbox, calculatedBBox, 'correct viewBox');

  t.notEquals(svg.indexOf('stroke-width="5"'), -1, 'has stroke-width');
  t.notEquals(svg.indexOf('stroke="red"'), -1, 'has stroke color');
  t.notEquals(svg.indexOf('fill="blue"'), -1, 'fill color');
  t.notEquals(svg.indexOf('stroke-dasharray="2,2"'), -1, 'dash array');

  builder
    .setProperty('direction', 1)
    .setProperty('arrowThickness', 5)
    .setProperty('arrowLength', 20);

  linestring = builder.build();
  svg = geojson2svg(linestring).render();

  t.notEquals(svg.indexOf('marker id="arrow-5-20-1"'), -1, 'marker created');

  t.end();
});
