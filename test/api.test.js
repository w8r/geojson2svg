import { describe, it, assert } from "vitest";
import { Renderer } from "../src/renderer";
var tape = require("tape");

var geojson2svg = require("../dist/geojson2svg.umd.js");
var decorator = require("svg-polygon-decorator");
var simplify = require("simplify-js");
var project = require("geojson-project");

var featureCollection = require("./helpers/feature_collection");
var Polygon = require("./helpers/polygon");

describe("API", () => {
  it(".constructor", () => {
    assert.equal(typeof Renderer, "function", "exposed");
    const r = new Renderer();

    // assert.ok(Array.isArray(r._fonts), "fonts is array");
    // assert.ok(r._fonts.length, "default fonts are there");
    // assert.deepEqual(r._plugins, {}, "empty plugins registry");
    // assert.deepEqual(r._decorators, {}, "empty decorators registry");
    // assert.ok(r._styles, "default styles");
    // assert.equal(r._defs, null, "defs are clear");
  });

  it(".type()", () => {
    const r = new Renderer();
    const type = "_type_";
    assert.equal(r.type(type)._type, type, "sets type and returns renderer");
  });

  it(".styles()", () => {
    const styles = { SpecialType: { fill: "none" } };
    const r = new Renderer(undefined, styles);
    assert.deepEqual(
      r._styles.SpecialType,
      styles.SpecialType,
      "through constructor"
    );
    var styleFunc = function () {};
    assert.equal(
      r.styles(styleFunc)._styles,
      styleFunc,
      "sets style function and returns renderer"
    );
  });

  it(".fonts()", () => {
    var fonts = { name: "dd", values: [{ size: 1 }, { size: 2 }] };
    var r = new Renderer(null, null, null, null, null, fonts);
    assert.deepEqual((
      r._fonts[r._fonts.length - 1],
      fonts,
      "stores through constructor"
    );
    var fonts = { name: "dd", values: [{ size: 2 }, { size: 1 }] };
    assert.deepEqual((
      r._fonts[r._fonts.length - 1].values.map(function (v) {
        return v.size;
      }),
      [1, 2],
      "sorts values"
    );
  });

  it(".data()", () => {
    var data = featureCollection();
    var r = new Renderer(data);

    t.plan(4);
    assert.equal(r._data, data, "stored through constructor");

    assert.equal(
      r.data(featureCollection())._data.type,
      "FeatureCollection",
      "allows FeatureCollection"
    );
    assert.equal(
      r.data({
        type: "Feature",
        properties: {},
        geometry: {},
      })._data.type,
      "FeatureCollection",
      "allows Feature, turns it into FeatureCollection"
    );
    assert.throws(
      function () {
        r.data({ some: "rubbish" });
      },
      TypeError,
      "throws invalid data type"
    );
  });

  it(".projection()", () => {
    var proj = function (c) {
      return [c[0] + 1, c[1] + 1];
    };
    var polygon = new Polygon().randomGeometry().round().build();
    var r = new Renderer(polygon, null, null, proj);

    t.plan(4);
    assert.equal(r._projection, proj, "sets through constructor");
    assert.deepEqual((
      r._data.features[0],
      project(polygon, proj),
      "projects on data assignment"
    );
    r._projection = null;
    assert.equal(
      r.projection(proj)._projection,
      proj,
      "stores and returns renderer"
    );
    assert.throws(
      function () {
        r.projection({});
      },
      TypeError,
      "validates projection type"
    );
  });

  it(".decorator()", () => {
    const r = new Renderer();
    const decorator = function (f, c, closed, bbox, fbounds) {};
    assert.equal(
      r.decorator("special", decorator)._decorators.special,
      decorator,
      "stores and returns renderer"
    );
    assert.throws(
      function () {
        r.decorator("special", {});
      },
      TypeError,
      "throws on wrong decorator type"
    );
  });

  it(".transform()", () => {
    const r = new Renderer();
    var transform = function (f, c, closed, bbox, fbounds) {};
    assert.equal(
      r.transform(transform)._transform,
      transform,
      "stores and returns renderer"
    );
    assert.throws(
      function () {
        r.transform({});
      },
      TypeError,
      "throws on wrong transform type"
    );
  });
});
