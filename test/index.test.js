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

      bboxutils.extend(bbox, point);
      bboxutils.extend(featureBounds, point);

      cloudPoints.push(point.slice());
    }
    var inward = area < 0;
    str += decorator(cloudPoints, radius, closed, inward, true) + ' ';
  }

  // SVG complains about empty path strings
  return str || 'M0 0';
}


tape('geojson2svg', function (t) {
  /*console.time('svg');
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
  */

  t.test('API', function (t) {
    t.test('constructor', function (t) {
      t.end();
    });

    t.test('type()', function (t) {
      t.end();
    });

    t.test('styles()', function (t) {
      t.end();
    });

    t.test('fonts()', function (t) {
      t.end();
    });

    t.test('data()', function (t) {
      t.end();
    });

    t.test('projection()', function(t) {
      t.end();
    });

    t.test('decorator()', function(t) {
      t.end();
    });

    t.test('plugin()', function (t) {
      t.end();
    });



    t.end();
  });


  t.test('polygon()', function (t) {
    var builder = new Polygon()
      .randomGeometry()
      .setProperty('weight', 5)
      .setProperty('stroke', 'red')
      .setProperty('fill', 'blue')
      .round();

    var polygon = builder.build();
    var svg = geojson2svg(polygon).render();

    var bbox = svg.match(/viewBox=['"]([^"]+)['"]/m)[1].split(' ').map(parseFloat);
    var path = svg
      .match(/d=['"]([^"]+)['"]/m)[1]
      .trim()
      .split(/[^\d-]/)
      .filter(function (val) {
        return val !== '';
      })
      .map(parseFloat);

    bbox[2] += bbox[0];
    bbox[3] += bbox[1];

    var calculatedBBox = builder.bbox();
    bboxUtils.pad(calculatedBBox, 5);
    t.deepEquals(path, _.flatten(_.flatten(polygon.geometry.coordinates)), 'correct path');
    t.deepEquals(bbox, calculatedBBox, 'correct viewBox');

    t.ok(svg.indexOf('stroke-width="5"') !== -1, 'has stroke-width');
    t.ok(svg.indexOf('stroke="red"') !== -1, 'has stroke color');
    t.ok(svg.indexOf('fill="blue"') !== -1, 'fill color');

    t.end();
  });

  t.end();
});
