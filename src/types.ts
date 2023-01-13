import type { GeoJsonGeometryTypes, Feature, Position, BBox } from "geojson";
export { BBox, Position, Feature } from "geojson";

export interface Style {
  weight?: number;
  color?: string;
  opacity?: number;
  fill?: string;
  radius?: number;
  stroke?: string;
  text?: string | string[];
  fontFamily?: string;
  fontSize?: number;
  fontColor?: string;
  lineHeight?: number;
  className?: string;
  [index: string]: string | string[] | number | undefined;
}

export type Styles = Record<GeoJsonGeometryTypes | "textbox" | string, Style>;

export type FeatureTransformer = (feature: Feature) => Feature;
export type StyleSelector = (feature: Feature, styles: Styles) => Style;
export type Projection = (coordinate: Position) => Position;
export type StylesFunction = (
  feature: Feature,
  bbox: BBox,
  featureBounds: BBox
) => Style;
export type PathDecorator = (
  feature: Feature,
  coordinates: Position[] | Position[][] | Position[][][],
  closed: boolean,
  bbox: BBox,
  featureBounds: BBox
) => string;
export type PluginRenderer = (
  feature: Feature,
  accum: string[],
  bbox: BBox,
  featureBounds: BBox
) => void;

export interface ArrowOptions {
  direction?: number;
  arrowLength?: number;
  arrowThickness?: number;
  weight: number;
}
