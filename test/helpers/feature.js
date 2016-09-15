var project = require('geojson-project');
var bboxUtils = require('../../src/bbox');

function Feature(props, geometry) {
  this._properties = props || {};

  if (props)    this.properties(props);
  if (geometry) this.geometry(geometry);
}

Feature.prototype = {

  properties: function (props) {
    return this;
  },


  setProperty: function (key, value) {
    this._properties[key] = value;
    return this;
  },


  geometry: function (geometry) {
    this._geometry = geometry;
    return this;
  },


  round: function () {
    this.geometry(project({
        type: 'Feature',
        geometry: this._geometry
    }, function (coord) {
      return [Math.round(coord[0]), Math.round(coord[1])];
    }).geometry);
    return this;
  },


  bbox: function () {
    return bbox(bboxUtils.getDefault(), this._geometry.coordinates);
  },


  build: function () {
    return {
      type: 'Feature',
      properties: JSON.parse(JSON.stringify(this._properties)),
      geometry: JSON.parse(JSON.stringify(this._geometry))
    };
  }
};



function bbox(b, ring) {
  if (Array.isArray(ring) && isFinite(ring[0])) {
    bboxUtils.extend(b, ring);
  } else {
    ring.forEach(function (r) {
      bbox(b, r);
    });
  }
  return b;
}


module.exports = Feature;
