var tape = require('tape');
var formatXml = require('./helpers/format_xml');
var geojson2svg = require('../');
var data = require('./fixtures/data.json');
var style = require('./fixtures/markup_style.json');

tape('geojson2svg', function (t) {
  console.log(formatXml(geojson2svg(data, style, null, null, 'markupType').render()));
  t.end();
});
