var tape = require('tape');
var geojson2svg = require('../');
var data = require('./fixtures/markup.json');

tape('geojson2svg', function (t) {
  console.log(geojson2svg(data).render());
  t.end();
});
