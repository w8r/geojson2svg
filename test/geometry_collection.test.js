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
var GeometryCollection = require('./helpers/geometry_collection');

tape('GeometryCollection', function (t) {
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
  var svg = geojson2svg(gc).type('type').render();

  var bbox = svg.match(/viewBox=['"]([^"]+)['"]/m)[1].split(' ').map(parseFloat);
  bbox[2] += bbox[0];
  bbox[3] += bbox[1];

  t.deepEquals(builder.bbox(), bbox, 'correct bbox');

  t.notEquals(svg.indexOf('g class=\"geometrycollection'), -1, 'group present');
  t.notEquals(svg.indexOf('point special-collection'), -1, 'point present');
  t.notEquals(svg.indexOf('linestring special-collection'), -1, 'line present');
  t.notEquals(svg.indexOf('polygon special-collection'), -1, 'polygon present');
  t.notEquals(svg.indexOf('textbox special-collection'), -1, 'textbox present');

  t.equals(svg.match(/<tspan/g).length, 2, '2 lines in textbox');

  builder
    .setProperty('geometriesTypes', ["styled-point", "line", "polygon", "textbox"]);
  var gc = builder.build();
  var stroke = 18.5;
  var svg = geojson2svg(gc)
    .type('type')
    .styles({
      "styled-point": {
        weight: stroke
      }
    })
    .render();

  t.notEquals(svg.indexOf('stroke-width="' + stroke + '"'), -1,
    'special styling per type available');

  t.end();
});
