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
var Textbox           = require('./helpers/textbox');

tape('Textbox', function (t) {
  var fontFamily = 'Helvetica, Arial, serif';
  var fontSize   = 12;
  var fontColor  = 'red';
  var builder = new Textbox()
    .randomGeometry()
    .setProperty('text', ['Multiline text', 'with line breaks'])
    .setProperty('fontFamily', fontFamily)
    .setProperty('fontSize', fontSize)
    .setProperty('fontColor', fontColor)
    .setProperty('className', 'special-text')
    .round();

  var textbox = builder.build();
  var svg = geojson2svg(textbox).type('type').render();

  var bbox = svg.match(/viewBox=['"]([^"]+)['"]/m)[1].split(' ').map(parseFloat);
  bbox[2] += bbox[0];
  bbox[3] += bbox[1];

  t.deepEquals(builder.bbox(), bbox, 'correct bbox');

  t.equals(svg.match(/<tspan/g).length, 2, '2 lines');
  t.notEquals(svg.indexOf('fill="' + fontColor + '"'), -1, 'font color');
  t.notEquals(svg.indexOf('font-size="' + fontSize + '"'), -1, 'font size');
  t.notEquals(svg.indexOf('font-family="' + fontFamily + '"'), -1, 'font family');
  t.notEquals(svg.indexOf('class="textbox special-text"'), -1, 'className');

  builder.setProperty('text', Array(400).join('a'));
  textbox = builder.build();
  svg = geojson2svg(textbox).type('type').render();
  t.equals(svg.match(/<tspan/g).length, 25, '25 lines for 400 characters');

  t.end();
});
