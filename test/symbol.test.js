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

var featureCollection = require('./helpers/feature_collection');
var Symbol           = require('./helpers/symbol');


tape('Symbol', function (t) {
  var builder = new Symbol()
    .randomGeometry()
    .setProperty('weight', 1)
    .setProperty('fill', 'blue')
    .setProperty('stroke', 'red')
    .setProperty('rotation', Math.PI / 4)
    .setProperty('scale', 1.5)
    .setProperty('className', 'special-point')
    .addIcon()
    .round();

  var point = builder.build();
  var svg = geojson2svg(point).type('type').render();

  var bbox = svg.match(/viewBox=['"]([^"]+)['"]/m)[1].split(' ').map(parseFloat);
  bbox[2] += bbox[0];
  bbox[3] += bbox[1];

  var round = function(c) {
    return parseFloat(parseFloat(c).toFixed(3));
  };

  var calculatedBBox = [ 14.499581197746, 15.999267005583999,
      25.500418802254, 24.000732994416 ].map(round);

  var matrix = svg.match(/matrix\(([^\)]+)\)/)[1].split(' ').map(round);

  t.deepEquals(matrix, [ 1.061, 1.061, -1.061, 1.061, 18.409, -30.383 ], 'matrix');
  t.deepEquals(bbox.map(round), calculatedBBox, 'correct viewBox');
  t.notEquals(svg.indexOf('stroke-width="1"'), -1, 'has stroke-width');
  t.notEquals(svg.indexOf('stroke="red"'), -1, 'has stroke color');
  t.notEquals(svg.indexOf('fill="blue"'), -1, 'fill color');
  t.notEquals(svg.indexOf('width="9.000837604508"'), -1, 'width');
  t.notEquals(svg.indexOf('height="6.001465988832"'), -1, 'height');
  t.notEquals(svg.indexOf('class="symbol special-point"'), -1, 'className');

  t.end();
});
