var tape = require('tape');
var formatXml = require('./helpers/format_xml');
var geojson2svg = require('../');
var data = require('./fixtures/markup.json');

tape('geojson2svg', function (t) {
  console.log(formatXml(geojson2svg(data).render()));
  t.end();
});
