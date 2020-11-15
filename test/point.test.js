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

var featureCollection = require('./helpers/feature_collection');
var Point           = require('./helpers/point');
var MultiPoint      = require('./helpers/multi_point');


tape('Point', function (t) {
  var builder = new Point()
    .randomGeometry()
    .setProperty('weight', 5)
    .setProperty('stroke', 'red')
    .setProperty('fill', 'blue')
    .setProperty('dashArray', [2, 2])
    .setProperty('className', 'special-point')
    .setProperty('radius', 10)
    .round();

  var point = builder.build();
  var svg = geojson2svg(point).render();

  var bbox = svg.match(/viewBox=['"]([^"]+)['"]/m)[1].split(' ').map(parseFloat);
  bbox[2] += bbox[0];
  bbox[3] += bbox[1];

  var calculatedBBox = builder.bbox();
  bboxUtils.pad(calculatedBBox, 5);
  t.deepEquals(bbox, calculatedBBox, 'correct viewBox');

  t.notEquals(svg.indexOf('stroke-width="5"'), -1, 'has stroke-width');
  t.notEquals(svg.indexOf('stroke="red"'), -1, 'has stroke color');
  t.notEquals(svg.indexOf('fill="blue"'), -1, 'fill color');
  t.notEquals(svg.indexOf('r="10"'), -1, 'radius');
  t.notEquals(svg.indexOf('stroke-dasharray="2,2"'), -1, 'dash array');
  t.notEquals(svg.indexOf('class="point special-point"'), -1, 'className');

  t.end();
});
