var tape = require('tape');

var geojson2svg = require('../');
var Renderer    = geojson2svg.Renderer;
var decorator   = require('svg-polygon-decorator');
var simplify    = require('simplify-js');
var project     = require('geojson-project');

var featureCollection = require('./helpers/feature_collection');
var Polygon           = require('./helpers/polygon');


tape('API', function (t) {
  t.test('.constructor', function (t) {
    t.equals(typeof Renderer, 'function', 'exposed');
    var r = new Renderer();
    t.ok(Array.isArray(r._fonts), 'fonts is array');
    t.ok(r._fonts.length, 'default fonts are there');
    t.deepEquals(r._plugins, {}, 'empty plugins registry');
    t.deepEquals(r._decorators, {}, 'empty decorators registry');
    t.ok(r._styles, 'default styles');
    t.equals(r._defs, null, 'defs are clear');

    t.end();
  });

  t.test('.type()', function (t) {
    var r = new Renderer();
    var type = '_type_';
    t.equals(r.type(type)._type, type, 'sets type and returns renderer');
    t.end();
  });

  t.test('.styles()', function (t) {
    var styles = { 'SpecialType': { fill: 'none' }};
    var r = new Renderer(null, styles);
    t.deepEquals(r._styles.SpecialType, styles.SpecialType, 'through constructor');
    var styleFunc = function () {};
    t.equals(r.styles(styleFunc)._styles, styleFunc, 'sets style function and returns renderer');
    t.end();
  });

  t.test('.fonts()', function (t) {
    var fonts = {name: 'dd', values: [{ size: 1 }, {size: 2}]};
    var r = new Renderer(null, null, null, null, null, fonts);
    t.deepEquals(r._fonts[r._fonts.length - 1], fonts, 'stores through constructor');
    var fonts = {name: 'dd', values: [{ size: 2 }, {size: 1}]};
    t.deepEquals(r._fonts[r._fonts.length - 1].values
      .map(function (v) { return v.size; }), [1, 2], 'sorts values');
    t.end();
  });

  t.test('.data()', function (t) {
    var data = featureCollection();
    var r = new Renderer(data);

    t.equals(r._data, data, 'stored through constructor');

    t.equals(r.data(featureCollection())._data.type, 'FeatureCollection', 'allows FeatureCollection');
    t.equals(r.data({
      type: 'Feature',
      properties: {},
      geometry: {}
    })._data.type, 'FeatureCollection', 'allows Feature, turns it into FeatureCollection');
    t.throws(function () { r.data({ some: 'rubbish'} ) }, 'throws invalid data type');
    t.end();
  });

  t.test('.projection()', function(t) {
    var proj = function (c) { return [c[0] + 1, c[1] + 1]; };
    var polygon = new Polygon()
      .randomGeometry()
      .round()
      .build();
    var r = new Renderer(polygon, null, null, proj);

    t.equals(r._projection, proj, 'sets through constructor');
    t.deepEquals(r._data.features[0], project(polygon, proj), 'projects on data assignment');
    r._projection = null;
    t.equals(r.projection(proj)._projection, proj, 'stores and returns renderer');
    t.throws(function () {
      r.projection({});
    }, 'validates projection type');

    t.end();
  });

  t.test('.decorator()', function(t) {
    var r = new Renderer();
    var decorator = function(f, c, closed, bbox, fbounds) {};
    t.equals(r.decorator('special', decorator)._decorators.special, decorator, 'stores and returns renderer');
    t.throws(function () {
      r.decorator('special', {});
    }, 'throws on wrong decorator type');

    t.end();
  });

  t.test('.transform()', function (t) {
    var r = new Renderer();
    var transform = function(f, c, closed, bbox, fbounds) {};
    t.equals(r.transform(transform)._transform, transform, 'stores and returns renderer');
    t.throws(function () {
      r.transform({});
    }, 'throws on wrong transform type');

    t.end();
  });

  t.end();
});
