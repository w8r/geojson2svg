const fs = require("fs");
const path = require("path");
const _ = require("lodash");

const formatXml = require("./helpers/format_xml");
const geojson2svg = require("../src");
const bboxUtils = require("../src/bbox");
const Renderer = geojson2svg.Renderer;
const data = require("./fixtures/data.json");
const style = require("./fixtures/markup_style.json");
const wave = require("./helpers/wave");
const project = require("geojson-project");

const featureCollection = require("./helpers/feature_collection");
const Polygon = require("./helpers/polygon");

//var geoData     = require('./fixtures/ne_50m_admin_0_countries.geojson');

console.time("svg");
const rendered = geojson2svg(data, style, null, null, "markupType")
  .decorator("cloud", (feature, coordinates, closed, bbox, fbounds) => {
    const radius = feature.properties.radius || 5;
    console.time("wave");
    const w = wave(coordinates, radius, closed, bbox, fbounds);
    console.timeEnd("wave");
    return w;
  })
  .render();
console.timeEnd("svg");

fs.writeFileSync(path.resolve(process.cwd(), "demo/markup.svg"), rendered, {
  encoding: "utf-8",
});

// render geo data
fs.readFile(
  path.join(process.cwd(), "test/fixtures/ne_50m_admin_0_countries.geojson"),
  {
    encoding: "utf-8",
  },
  (err, data) => {
    console.log("read");
    const geoData = JSON.parse(data);

    console.time("geo");
    const rendered = geojson2svg(
      geoData,
      (feature) => {
        return {
          fill:
            "rgb(" +
            [
              Math.round(256 * Math.random()),
              Math.round(256 * Math.random()),
              Math.round(256 * Math.random()),
            ].join(",") +
            ")",
          weight: 0.25,
          color: "#333333",
        };
      },
      null,
      function (coord) {
        return [coord[0], 85 - coord[1]];
      }
    ).render();
    console.timeEnd("geo");

    fs.writeFileSync(path.resolve(process.cwd(), "demo/lands.svg"), rendered, {
      encoding: "utf-8",
    });
    console.log("done");
  }
);
