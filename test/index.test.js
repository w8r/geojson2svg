var tape = require('tape');
var fs   = require('fs');
var path = require('path');

var formatXml   = require('./helpers/format_xml');
var geojson2svg = require('../');
var data        = require('./fixtures/data.json');
var style       = require('./fixtures/markup_style.json');

tape('geojson2svg', function (t) {
  var rendered = formatXml(geojson2svg(data, style, null, null, 'markupType').render());
  console.log(rendered);
  fs.writeFileSync(
    path.resolve(process.cwd(), 'demo/index.html'), rendered, {
      encoding: 'utf-8'
    });
    
  t.end();
});
