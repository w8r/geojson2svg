var tape = require('tape');
var fs   = require('fs');
var path = require('path');
var validator = require('html-validator');

var formatXml   = require('./helpers/format_xml');
var geojson2svg = require('../');
var Renderer    = geojson2svg.Renderer;
var data        = require('./fixtures/data.json');
var style       = require('./fixtures/markup_style.json');
var decorator   = require('svg-polygon-decorator');
var simplify    = require('simplify-js');

function wave(rings, radius, closed, bbox, featureBounds) {
  var str = '';

  for (var i = 0, len = rings.length; i < len; ++i) {
    var cloudPoints = [];
    var area = 0;
    var ring = simplify(rings[i].map(function(p) {
      return { x: p[0], y: p[1] };
    })).map(function(p) {
      return [p.x, p.y];
    });
    var ringLength = ring.length;

    for (var j = 0; j < ringLength; j++) {
      var point = ring[j];

      // console.log();
      //
      Renderer.extendBBox(bbox, point);
      Renderer.extendBBox(featureBounds, point);

      cloudPoints.push(point.slice());
    }
    var inward = area < 0;
    str += decorator(cloudPoints, radius, closed, inward, true) + ' ';
  }

  // SVG complains about empty path strings
  return str || 'M0 0';
}

tape('geojson2svg', function (t) {
  console.time('svg');
  var rendered =
    geojson2svg(data, style, null, null, 'markupType')
       .decorator('cloud', function (feature, coordinates, closed, bbox, fbounds) {
         var radius = feature.properties.radius || 5;
         console.time('wave');
         var w = wave(coordinates, radius, closed, bbox, fbounds);
         console.timeEnd('wave');
         return w;
       })
      .render();
  console.timeEnd('svg');
  //console.log(rendered);

  // validator({
  //   format: 'json',
  //   data: rendered
  // }, function (error, data) {
  //   if (error) {
  //     throw error;
  //   }
  //
  //   console.log(data);
  // });

  fs.writeFileSync(
    path.resolve(process.cwd(), 'demo/index.html'), rendered, {
      encoding: 'utf-8'
    });

  t.end();
});
