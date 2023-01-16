import project from "geojson-project";
import { extend, getDefault } from "../../src/bbox";

export class Feature {
  constructor(props, geometry) {
    this._properties = props || {};

    if (props) this.properties(props);
    if (geometry) this.geometry(geometry);
  }

  properties(props) {
    return this;
  }

  setProperty(key, value) {
    this._properties[key] = value;
    return this;
  }

  geometry(geometry) {
    this._geometry = geometry;
    return this;
  }

  round() {
    this.geometry(
      project(
        {
          type: "Feature",
          geometry: this._geometry,
        },
        function (coord) {
          return [Math.round(coord[0]), Math.round(coord[1])];
        }
      ).geometry
    );
    return this;
  }

  bbox() {
    var bbox = getDefault();
    project(
      {
        type: "Feature",
        geometry: this._geometry,
      },
      function (coord) {
        extend(bbox, coord);
        return coord;
      }
    );
    return bbox;
  }

  build() {
    return {
      type: "Feature",
      properties: JSON.parse(JSON.stringify(this._properties)),
      geometry: JSON.parse(JSON.stringify(this._geometry)),
    };
  }
}

Feature.calculateBounds = bbox;

function bbox(b, ring) {
  if (Array.isArray(ring) && isFinite(ring[0])) {
    extend(b, ring);
  } else {
    ring.forEach((r) => bbox(b, r));
  }
  return b;
}
