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

tape('MultiPoint', function (t) {
  var builder = new MultiPoint()
    .randomGeometry()
    .setProperty('weight', 5)
    .setProperty('stroke', 'red')
    .setProperty('fill', 'blue')
    .setProperty('dashArray', [2, 2])
    .round();

  var points = builder.build();
  var svg = geojson2svg(points).render();

  var bbox = svg.match(/viewBox=['"]([^"]+)['"]/m)[1].split(' ').map(parseFloat);
  bbox[2] += bbox[0];
  bbox[3] += bbox[1];

  t.deepEquals(builder.bbox(), bbox, 'bbox calculated correctly');
  t.equals(svg.match(/<circle /g).length, 2, 'multiple elements');

  t.end();
});
