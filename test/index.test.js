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
var decorator   = require('svg-polygon-decorator');
var simplify    = require('simplify-js');
var project     = require('geojson-project');

var featureCollection = require('./helpers/feature_collection');
var Polygon           = require('./helpers/polygon');

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

      bboxUtils.extend(bbox, point);
      bboxUtils.extend(featureBounds, point);

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

  fs.writeFileSync(
    path.resolve(process.cwd(), 'demo/index.html'), rendered, {
      encoding: 'utf-8'
    });

  t.end();
});
