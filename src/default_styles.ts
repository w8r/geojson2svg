import type { GeoJsonGeometryTypes } from "geojson";
import { Style } from "./types";

const FILL = "#000000";
const COLOR = "#333333";
const WEIGHT = 0.25;
const OPACITY = 0.75;

const PolygonStyle: Style = {
  weight: WEIGHT,
  color: COLOR,
  opacity: OPACITY,
};

const LineStyle: Style = {
  weight: WEIGHT,
  color: COLOR,
  opacity: OPACITY,
};

const PointStyle: Style = {
  radius: 3,
  stroke: COLOR,
  weight: WEIGHT,
  color: COLOR,
  fill: FILL,
};

export const Styles: Record<GeoJsonGeometryTypes | "textbox", Style> = {
  Polygon: PolygonStyle,
  MultiPolygon: PolygonStyle,

  LineString: LineStyle,
  MultiLineString: LineStyle,

  Point: PointStyle,
  MultiPoint: PointStyle,

  textbox: {
    fontFamily: "Helvetica, Arial, sans-serif",
    fontColor: COLOR,
    weight: 0,
    color: COLOR,
  },

  GeometryCollection: {},
};
