var tape = require('tape');
var fs   = require('fs');
var path = require('path');
var _    = require('lodash');

var formatXml   = require('./helpers/format_xml');
var geojson2svg = require('../');
var bboxUtils   = require('../src/bbox');
var Renderer    = geojson2svg.Renderer;
var data        = require('./fixtures/data.json');
var style       = require('./fixtures/markup_style.json');
var wave        = require('./helpers/wave');

var featureCollection = require('./helpers/feature_collection');
var LineString        = require('./helpers/line_string');

tape('MultiLineString', function (t) {
  var builder = new LineString()
    .randomGeometry()
    .setProperty('weight', 5)
    .setProperty('stroke', 'red')
    .setProperty('dashArray', [2, 2])
    .round();

  var linestring = builder.build();
  var svg = geojson2svg(linestring, {
    LineString: {
      opacity: 0.375
    }
  }).render();

  var bbox = svg.match(/viewBox=['"]([^"]+)['"]/m)[1].split(' ').map(parseFloat);
  var path = svg
    .match(/d=['"]([^"]+)['"]/m)[1]
    .trim();

  t.equals(path.match(/Z/g), null, 'path rings are not closed');

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
  t.deepEquals(path, _.flatten(_.flatten(linestring.geometry.coordinates)), 'correct path');
  t.deepEquals(bbox, calculatedBBox, 'correct viewBox');

  t.ok(svg.indexOf('stroke-width="5"') !== -1, 'has stroke-width');
  t.ok(svg.indexOf('stroke="red"') !== -1, 'has stroke color');
  t.ok(svg.indexOf('fill="none"') !== -1, 'fill color');
  t.ok(svg.indexOf('stroke-dasharray="2,2"') !== -1, 'dash array');
  t.ok(svg.indexOf('stroke-opacity="0.375"') !== -1, 'dash array');

  t.end();
});
