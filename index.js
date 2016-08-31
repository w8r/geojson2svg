var project = require('geojson-project');

module.exports = geojson2svg;

var XMLNS   = 'http://www.w3.org/2000/svg';
var XLINK   = 'http://www.w3.org/1999/xlink';
var VERSION = 1.2;

function GeoJSON2SVG (gj, styles, extent, project) {
  if (styles) this.styles(styles);
  if (extent) this.extent(extent);
  if (projection) this.projection(project);
  if (gj) this.data(gj);
}

GeoJSON2SVG.prototype = {


  styles: function (styles) {
    this._styles = styles;
    return this;
  },


  data: function (data) {
    this._data = data;
    return this;
  },


  projection: function (proj) {
    this._projection = proj;
    if (this._data) {
      this._data = project(this._data, proj);
    }
    return this;
  },


  extent: function (extent) {
    this._extent = extent;
    return this;
  },


  render: function () {
    var rendered = [];
    var bbox = [Infinity, Infinity, -Infinity, -Infinity];
    for (var i = 0, len = this._data.features.length; i < len; i++) {
      this._renderFeature(this._data.features[i], rendered, bounds);
    }
    this._renderContainer(rendered,
      this._extent || this._data.extent || this._data.bbox ||
      this._data.properties ? this._data.properties.bbox : null || bbox);
    return rendered.join('');
  },


  _renderContainer: function (accum, extent) {
    var viewBox = [extent[0], extent[1], extent[2] - extent[0], extent[3] - extent[1]];
    accum.unshift(
      ['<svg viewBox="', viewBox.join(' '), '" xmlns="', XMLNS,
       '" xmlns:xlink="', XLINK, '" version="', VERSION, '">'].join(''));
    accum.push('</svg>');
  },


  _renderFeature: function (feature, accum) {
    switch (feature.geometry.type) {
      default:
        break;
    }
  }


};

function geojson2svg (gj, styles, extent, project) {
  return new GeoJSON2SVG(gj, styles, extent, project);
}
