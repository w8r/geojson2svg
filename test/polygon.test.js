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
var Polygon           = require('./helpers/polygon');
var MultiPolygon      = require('./helpers/multi_polygon');

tape('Polygon', function (t) {
  var builder = new Polygon()
    .randomGeometry()
    .setProperty('weight', 5)
    .setProperty('stroke', 'red')
    .setProperty('fill', 'blue')
    .setProperty('dashArray', [2, 2])
    .setProperty('className', 'special-polygon')
    .round();

  var polygon = builder.build();
  var svg = geojson2svg(polygon).render();

  var bbox = svg.match(/viewBox=['"]([^"]+)['"]/m)[1].split(' ').map(parseFloat);
  var path = svg
    .match(/d=['"]([^"]+)['"]/m)[1]
    .trim();

  t.equals(path[path.length - 1], 'Z', 'closed path');

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
  t.deepEquals(path, flatten(flatten(polygon.geometry.coordinates)), 'correct path');
  t.deepEquals(bbox, calculatedBBox, 'correct viewBox');

  t.notEquals(svg.indexOf('stroke-width="5"'), -1, 'has stroke-width');
  t.notEquals(svg.indexOf('stroke="red"'), -1, 'has stroke color');
  t.notEquals(svg.indexOf('fill="blue"'), -1, 'fill color');
  t.notEquals(svg.indexOf('stroke-dasharray="2,2"'), -1, 'dash array');
  t.notEquals(svg.indexOf('class="polygon special-polygon"'), -1, 'className');

  t.end();
});
