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
var project     = require('geojson-project');

var featureCollection = require('./helpers/feature_collection');
var Polygon           = require('./helpers/polygon');

//var geoData     = require('./fixtures/ne_50m_admin_0_countries.geojson');


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
    path.resolve(process.cwd(), 'demo/markup.svg'), rendered, {
      encoding: 'utf-8'
    });

/*
  // render geo data
  fs.readFile(path.join(process.cwd(), 'test/fixtures/ne_50m_admin_0_countries.geojson'), {
    encoding: 'utf-8'
  }, function (err, data) {
    console.log('read');
    var geoData = JSON.parse(data);

    console.time('geo');
    var rendered = geojson2svg(geoData, function (feature) {
      return {
        fill: 'rgb(' + [
          Math.round(256 * Math.random()),
          Math.round(256 * Math.random()),
          Math.round(256 * Math.random())
        ].join(',') + ')',
        weight: 0.25,
        color: '#333333'
      };
    }, null, function (coord) {
      return [coord[0], 85-coord[1]];
    }).render();
    console.timeEnd('geo');

    fs.writeFileSync(
      path.resolve(process.cwd(), 'demo/lands.svg'), rendered, {
        encoding: 'utf-8'
      });
    console.log('done');
  });
*/
