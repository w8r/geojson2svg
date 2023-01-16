import hash from "@sindresorhus/string-hash";
import projectgj from "geojson-project";
import { getFontData } from "./get_font_data";
var Matrix = require("transformation-matrix-js").Matrix;
import { mat3 } from "gl-matrix";
import type {
  BBox,
  FeatureCollection,
  Feature,
  Position,
  GeometryCollection,
  GeoJsonProperties,
  MultiPoint,
  LineString,
  Polygon,
  MultiLineString,
  MultiPolygon,
  Point,
} from "geojson";

import {
  extend as extendBBox,
  pad as padBBox,
  getDefault as getDefaultBBox,
} from "./bbox";

const XMLNS = "http://www.w3.org/2000/svg";
const XLINK = "http://www.w3.org/1999/xlink";
const VERSION = 1.2;

const SYMBOL = "symbol";
const TEXTBOX = "textbox";
const FONT_SIZE = 10;

import { Styles as DefaultStyles } from "./default_styles";
import { FontData, Result } from "./measure_glyphs";
import {
  Style,
  Styles,
  FeatureTransformer,
  StylesFunction,
  StyleSelector,
  Projection,
  PluginRenderer,
  PathDecorator,
  ArrowOptions,
} from "./types";
import { renderTextContent } from "./text";
import { coordinatesToPath, createArrow } from "./utils";

const DefaultFonts: FontData[] = [
  require("../fonts/arial_helvetica_sans-serif.json"),
  require("../fonts/helvetica_arial_sans-serif.json"),
  require("../fonts/georgia_times_serif.json"),
  require("../fonts/lucida_console_monaco_monospace.json"),
  require("../fonts/verdana_geneva_sans-serif.json"),
];

// module.exports = renderer;
// module.exports.Renderer = Renderer;
// module.exports.DefaultStyles = DefaultStyles;
// module.exports.extendBBox = extendBBox;
// module.exports.padBBox = padBBox;

export class Renderer {
  private _data: FeatureCollection | null;
  private _extent: BBox | null;
  private _type: string | StyleSelector | null;
  private _styles: Styles | StylesFunction;
  private _projection: Projection | null;
  private _transform: FeatureTransformer | null;
  private _plugins: Record<string, PluginRenderer>;
  private _decorators: Record<string, PathDecorator>;
  private _defs: string[];
  private _fonts: FontData[];

  /**
   * @param {GeoJSON=}         gj         Input data
   * @param {Object=}          styles     Styles per feature type
   * @param {Array.<Number>=}  extent     Forced canvas bbox
   * @param {Function=}        projection Projection function [x,y] => [x,y]
   * @param {String|Function=} type       Properties field to be used to select
   *                                      styles for the feature
   * @param {Object}           fonts      Font measurement(s)
   * @param {Function=}        transform  Transform function invoked per feature,
   *                                      in case you need to perform some
   *                                      preparation of Feature -> Feature
   */
  constructor(
    gj?: FeatureCollection,
    styles?: Styles,
    extent?: BBox,
    projection?: Projection,
    type?: string | StyleSelector,
    fonts?: FontData[],
    transform?: FeatureTransformer
  ) {
    this._data = null;
    this._extent = null;
    this._type = null;
    this._styles = DefaultStyles;
    this._projection = null;
    this._type = null;
    this._fonts = [];
    this._transform = null;
    this._plugins = {};
    this._decorators = {};

    this._defs = [];

    if (styles) this.styles(styles);
    if (extent) this.extent(extent);
    if (projection) this.projection(projection);
    if (type) this.type(type);
    if (transform) this.transform(transform);
    if (gj) this.data(gj);

    this.fonts(fonts || DefaultFonts);
  }

  /**
   * Stores styles for the renderer
   *
   * @param  {Object|Function} styles
   * @return {Renderer}
   */
  styles = (styles: Styles | StylesFunction) => {
    this._styles =
      typeof styles === "function" ? styles : { ...DefaultStyles, ...styles };
    return this;
  };

  /**
   * @param  {Array.<Object>} fonts
   * @return {Renderer}
   */
  fonts = (fonts: FontData[] | FontData) => {
    if (!Array.isArray(fonts)) fonts = [fonts];

    for (let i = 0, len = fonts.length; i < len; i++) {
      fonts[i].values = fonts[i].values.sort((a, b) => a.size - b.size);
      this._fonts.push(fonts[i]);
    }

    return this;
  };

  /**
   * Sets transformation function
   * @param  {Function} transform
   * @return {Renderer}
   */
  transform = (transform: FeatureTransformer) => {
    if (typeof transform !== "function") {
      throw new TypeError("Transform feature must be a function");
    }
    this._transform = transform;
    return this;
  };

  /**
   * Property that is going to be used as for type->style selection
   * @param  {String|Function} type
   * @return {Renderer}
   */
  type = (type: StyleSelector | string) => {
    this._type = type;
    return this;
  };

  /**
   * Here you can pass GeoJSON
   *
   * @param  {GeoJSON} data
   * @return {Renderer}
   */
  data(data: FeatureCollection | Feature) {
    if (data.type !== "FeatureCollection") {
      if (data.type === "Feature") {
        data = { type: "FeatureCollection", features: [data] };
      } else {
        throw new TypeError("Input has to be a FeatureCollection or a Feature");
      }
    }

    if (this._projection) data = projectgj(data, this._projection);

    this._data = data;
    return this;
  }

  /**
   * Projection function for the coordinates
   *
   * @param  {Function} proj
   * @return {Renderer}
   */
  projection = (proj: Projection) => {
    if (typeof proj !== "function") {
      throw new TypeError("Projection must be a function [x, y] -> [x, y]");
    }
    this._projection = proj;
    return this;
  };

  /**
   * Custom extent to be used as a `viewBox`
   *
   * @param  {Array.<Number>} extent
   * @return {Renderer}
   */
  extent = (extent: BBox) => {
    this._extent = extent;
    return this;
  };

  /**
   * Register a path decorator
   * @param  {String}   type
   * @param  {Function} decorator
   * @return {Renderer}
   */
  decorator = (type: string, decorator: PathDecorator) => {
    if (typeof decorator !== "function") {
      throw new TypeError(
        "Decorator must be a function " +
          "(feature, coordinates, closed, bbox, featureBounds) -> SVGPath "
      );
    }
    this._decorators[type] = decorator;
    return this;
  };

  /**
   * Main rendering routine
   * @param {GeoJSON=} data
   * @return {String}
   */
  render = (data?: Feature | FeatureCollection) => {
    if (data) this.data(data);

    const rendered: string[] = [];
    const bbox = getDefaultBBox();
    this._defs = [];

    if (this._data) {
      for (var i = 0, len = this._data.features.length; i < len; i++) {
        this._feature(this._data.features[i], rendered, bbox);
      }
    }

    this._renderContainer(
      rendered,
      this._extent || (this._data && (this._data.bbox || null)) || bbox
    );
    return rendered.join("");
  };

  /**
   * Wraps generated content with the SVG container
   */
  private _renderContainer(accum: string[], bbox: BBox) {
    const viewBox = [
      bbox[0],
      bbox[1],
      bbox[2] - bbox[0],
      bbox[3] - bbox[1],
    ].join(" ");
    accum.unshift("<g>");

    if (this._defs.length !== 0) {
      accum.unshift("</defs>");
      accum.unshift.apply(accum, this._defs.slice());
      accum.unshift("<defs>");
    }

    accum.unshift(
      `<svg viewBox="${viewBox}" xmlns="${XMLNS}" xmlns:xlink="${XLINK}" version="${VERSION}">`
    );

    accum.push("</g>", "</svg>");
  }

  /**
   * @param  {String}   type
   * @param  {Function} pluginRenderer
   * @return {Renderer}
   */
  plugin = (type: string, pluginRenderer: PluginRenderer) => {
    this._plugins[type] = pluginRenderer;
    return this;
  };

  /**
   * @param  {Feature} feature
   * @return {Function|null}
   */
  private _getPluginRenderer(feature: Feature) {
    // TODO: fix the type
    const type = feature.properties![this._type as string];
    const pluginRenderer = type ? this._plugins[type] : null;
    return pluginRenderer;
  }

  /**
   * Renders individual feature
   * @param  {Feature}         feature
   * @param  {Array.<String>}  accum
   * @param  {Array.<Number>}  bbox
   * @return  {Array.<Number>} featureBounds
   */
  private _feature(feature: Feature, accum: string[], bbox: BBox) {
    const featureBounds = getDefaultBBox();

    if (this._transform) feature = this._transform(feature);

    const pluginRenderer = this._getPluginRenderer(feature);
    if (pluginRenderer) {
      pluginRenderer.call(this, feature, accum, bbox, featureBounds);
      return featureBounds;
    }

    switch (feature.geometry.type) {
      case "Polygon": // render in one path
      case "MultiPolygon":
        this._polygon(feature as Feature<Polygon>, accum, bbox, featureBounds);
        break;
      case "LineString": // render in one path
      case "MultiLineString":
        this._lineString(
          feature as Feature<LineString>,
          accum,
          bbox,
          featureBounds
        );
        break;
      case "Point":
        this._point(feature as Feature<Point>, accum, bbox, featureBounds);
        break;
      case "MultiPoint":
        this._multiPoint(
          feature as Feature<MultiPoint>,
          accum,
          bbox,
          featureBounds
        );
        break;
      case "GeometryCollection":
        this._geometryCollection(feature, accum, bbox, featureBounds);
        break;
      default:
        break;
    }
    return featureBounds;
  }

  /**
   * Render `GeometryCollection` in a group
   *
   * @param  {Feature<GeometryCollection>}        feature
   * @param  {Array.<String>} accum
   * @param  {Array.<Number>} bbox
   * @param  {Array.<Number>} featureBounds
   */
  private _geometryCollection(
    feature: Feature,
    accum: string[],
    bbox: BBox,
    featureBounds: BBox
  ) {
    const className = (
      "geometrycollection " + (feature.properties!.className || "")
    ).trim();
    accum.push('<g class="', className, '">');

    const geom = feature.geometry as GeometryCollection;
    const geometriesLength = geom.geometries.length;
    const types =
      feature.properties!["geometriesTypes"] || Array(geometriesLength);

    // split geometries into features for rendering
    for (var i = 0; i < geometriesLength; i++) {
      const properties: GeoJsonProperties = {
        ...feature.properties,
        collectionIndex: i,
      };
      // TODO: this._type
      if (this._type) properties[this._type as string] = types[i];

      if (
        feature.properties &&
        feature.properties.styles &&
        feature.properties.styles[types[i]]
      ) {
        Object.assign(properties, feature.properties.styles[types[i]]);
      }

      // if (types[i] === TEXTBOX) {
      //   properties
      // }

      this._feature(
        {
          type: "Feature",
          properties: properties,
          geometry: geom.geometries[i],
        },
        accum,
        bbox
      );
    }

    accum.push("</g>");
  }

  /**
   * Renders `MultiPoint` in a group
   *
   * @param  {Feature}        feature
   * @param  {Array.<String>} accum
   * @param  {Array.<Number>} bbox
   * @param  {Array.<Number>} featureBounds
   */
  private _multiPoint(
    feature: Feature<MultiPoint>,
    accum: string[],
    bbox: BBox,
    featureBounds: BBox
  ) {
    const className = (
      "multipoint " + (feature.properties!.className || "")
    ).trim();
    accum.push('<g class="', className, '">');

    // split geometries into features for rendering
    for (let i = 0, len = feature.geometry.coordinates.length; i < len; i++) {
      this._point(
        {
          type: "Feature",
          properties: feature.properties,
          geometry: {
            type: "Point",
            coordinates: feature.geometry.coordinates[i],
          },
        },
        accum,
        bbox,
        getDefaultBBox()
      );
    }

    accum.push("</g>");
  }

  /**
   * @param  {Feature} feature
   * @param  {Array.<String>} accum
   * @param  {Array.<Number>} bbox
   * @param  {Array.<Number>} featureBounds
   */
  private _lineString(
    feature: Feature<LineString>,
    accum: string[],
    bbox: BBox,
    featureBounds: BBox
  ) {
    const properties = feature.properties || {};
    const className = ("linestring " + (properties.className || "")).trim();
    accum.push(
      '<path class="',
      className,
      '" d="',
      this._getPath(feature, false, bbox, featureBounds),
      '"',
      this._getStyles(feature, bbox, featureBounds),
      " />"
    );
  }

  /**
   * @param  {Feature}        feature
   * @param  {Array.<String>} accum
   * @param  {Array.<Number}  bbox
   * @param  {Array.<Number>} featureBounds
   */
  private _text(
    feature: Feature,
    accum: string[],
    bbox: BBox,
    featureBounds: BBox
  ) {
    const properties = { ...this._selectStyle(feature), ...feature.properties };
    const fontSize = properties.fontSize || FONT_SIZE;
    const fontColor = properties.fontColor || properties.color || "";
    let fontFamily = properties.fontFamily || "";

    const text = properties.text as string;
    const pos = [featureBounds[0], featureBounds[1]];

    const content = renderTextContent(
      text,
      fontSize,
      fontFamily,
      featureBounds,
      properties,
      this._fonts
    );

    if (fontFamily) {
      fontFamily = `font-family="${fontFamily.replace(/\"/g, "'").trim()}" `;
    }

    const className = ("textbox " + (properties.className || "")).trim();

    accum.push(
      "<text ",
      fontFamily,
      'class="',
      className,
      '" ',
      'font-size="',
      String(fontSize),
      '" ',
      'fill="',
      fontColor,
      '" ',
      'x="',
      String(pos[0]),
      '" ',
      'y="',
      String(pos[1]),
      '" ',
      ">",
      content,
      "</text>"
    );
  }

  /**
   * @param  {Feature} feature
   * @param  {Array.<String>} accum
   * @param  {Array.<Number>} bbox
   * @param  {Array.<Number>} featureBounds
   */
  private _polygon(
    feature: Feature<Polygon>,
    accum: string[],
    bbox: BBox,
    featureBounds: BBox
  ) {
    const properties = feature.properties || {};
    const className = ("polygon " + (properties.className || "")).trim();
    accum.push(
      '<path class="',
      className,
      '" d="',
      this._getPath(feature, true, bbox, featureBounds),
      '"',
      this._getStyles(feature, bbox, featureBounds),
      "/>"
    );

    // TODO: fix this._type
    if (this._type && properties[this._type as string] === TEXTBOX) {
      this._text(feature, accum, bbox, featureBounds);
    }
  }

  /**
   * @param  {Feature} feature
   * @param  {Array.<String>} accum
   * @param  {Array.<Number>} bbox
   * @param  {Array.<Number>} featureBounds
   */
  private _point(
    feature: Feature<Point>,
    accum: string[],
    bbox: BBox,
    featureBounds: BBox
  ) {
    const properties = feature.properties || {};
    // TODO: fix this._type
    var type = this._type ? properties[this._type as string] : "";
    if (type && type === SYMBOL) {
      this._symbol(feature, accum, bbox, featureBounds);
    } else {
      const coord = feature.geometry.coordinates;
      const className = ("point " + (properties.className || "")).trim();

      const radius = properties.radius || 1;

      extendBBox(bbox, coord);
      extendBBox(featureBounds, coord);

      if (type && type === TEXTBOX) {
        this._text(feature, accum, bbox, featureBounds);
      } else {
        accum.push(
          '<circle class="',
          className,
          '" cx="',
          String(coord[0]),
          '" cy="',
          String(coord[1]),
          '" r="',
          radius,
          '" ',
          this._getStyles(feature, bbox, featureBounds),
          " />"
        );
      }
      padBBox(featureBounds, radius);
      extendBBox(bbox, featureBounds.slice(0, 2));
      extendBBox(bbox, featureBounds.slice(2, 4));
    }
  }

  /**
   * Create symbol for putting into defs
   *
   * @param  {Feature} feature
   * @return {String} symbol id
   */
  private _getSymbolDef(feature: Feature, viewBox: BBox) {
    const properties = feature.properties || {};
    let src = properties.symbol.src.trim();
    const id = "feature-symbol-" + hash(src);

    // strip garbage
    src = src
      .replace(/<\/?svg[^>]*>/g, "")
      .replace(/\<\?xml.+\?\>|\<\!DOCTYPE.+]\>/g, "")
      .replace(/<metadata>[\s\S]*?<\/metadata>/g, "");

    const vb = viewBox.join(" ");
    const symbol = `<symbol id="${id}" viewBox="${vb}">${src}</symbol>`;

    if (this._defs.indexOf(symbol) === -1) this._defs.push(symbol);

    return id;
  }

  /**
   * @param  {Feature}        feature
   * @param  {Array.<Number>} bbox
   * @param  {Array.<Number>} featureBounds
   * @return {String}
   */
  private _createSymbol(
    feature: Feature<Point>,
    bbox: BBox,
    featureBounds: BBox
  ) {
    const properties = feature.properties || {};
    let viewBox = properties.symbol.src.match(
      /view[Bb]ox\=["']([^"']+)["']/m
    )[1];
    viewBox = viewBox ? viewBox.split(" ").map(parseFloat) : featureBounds;
    const symbol = properties.symbol;
    const symbolDef = this._getSymbolDef(feature, viewBox);
    const width = symbol.width || viewBox[2] || "";
    const height = symbol.height || viewBox[3] || "";
    const coords = (feature.geometry as Point).coordinates;

    var className = ("symbol " + (properties.className || "")).trim();

    const symbolBBox: BBox = [
      coords[0] - width / 2,
      coords[1] - height / 2,
      coords[0] + width / 2,
      coords[1] + height / 2,
    ];

    const transform = this._getSymbolTransform(
      feature,
      bbox,
      featureBounds,
      width,
      height
    );
    //symbolBBox = Matrix.from.apply(Matrix, transform).applyToArray(symbolBBox);

    extendBBox(featureBounds, symbolBBox.slice(0, 2));
    extendBBox(featureBounds, symbolBBox.slice(2, 4));

    extendBBox(bbox, symbolBBox.slice(0, 2));
    extendBBox(bbox, symbolBBox.slice(2, 4));

    const use = `<use xlink:href="#${symbolDef}" transform="matrix(${transform.join(
      " "
    )}" width="${width}" height="${height}" x="${coords[0]}" y="${
      coords[1]
    }" class="${className}" ${this._getStyles(feature, bbox, featureBounds)}/>`;
    return use;
  }

  /**
   * @param  {Feature}        feature
   * @param  {Array.<Number>} bbox
   * @param  {Array.<Number>} featureBounds
   * @param  {Number}         width
   * @param  {Number}         height
   * @return {Array.<Number>} matrix
   */
  private _getSymbolTransform(
    feature: Feature<Point>,
    bbox: BBox,
    featureBounds: BBox,
    width: number,
    height: number
  ) {
    const props = feature.properties || {};
    const center = feature.geometry.coordinates;
    const scale = props.scale || 1;
    const rotation = props.rotation || 0;

    const m = Matrix.from(1, 0, 0, 1, 0, 0)
      .translate(center[0], center[1])
      .rotate(rotation)
      .scale(scale, scale)
      .translate(-center[0], -center[1])
      .translate(-width / 2, -height / 2);

    return m.toArray();
  }

  /**
   * @param  {Feature} feature
   * @param  {Array.<String>} accum
   * @param  {Array.<Number>} bbox
   * @param  {Array.<Number>} featureBounds
   */
  private _symbol(
    feature: Feature<Point>,
    accum: string[],
    bbox: BBox,
    featureBounds: BBox
  ) {
    const properties = feature.properties || {};
    const coord = feature.geometry.coordinates;
    const className = ("point " + (properties.className || "")).trim();
    const radius = properties.radius || 1;

    extendBBox(bbox, coord);
    extendBBox(featureBounds, coord);
    if (properties.symbol.src) {
      accum.push(this._createSymbol(feature, bbox, featureBounds));
    } else {
      accum.push(
        '<circle class="',
        className,
        '" cx="',
        String(coord[0]),
        '" cy="',
        String(coord[1]),
        '" r="',
        radius,
        '" ',
        this._getStyles(feature, bbox, featureBounds),
        "/>"
      );
    }
  }

  /**
   * @param {Feature} feature
   * @param {Boolean} closed
   * @param {Array.<Number>}  bbox
   * @param {Array.<Number>}  fBounds
   */
  private _getPath(
    feature: Feature<LineString | MultiLineString | Polygon | MultiPolygon>,
    closed: boolean,
    bbox: BBox,
    fBounds: BBox
  ) {
    let path = "";
    const properties = feature.properties || {};
    const coordinates = feature.geometry.coordinates;
    // TODO: fix this._type
    if (this._type && this._decorators[properties[this._type as string]]) {
      const decorator = this._decorators[properties[this._type as string]];
      path = decorator.call(this, feature, coordinates, closed, bbox, fBounds);
    } else {
      path = coordinatesToPath(coordinates, closed, bbox, fBounds);
    }
    return path.trim();
  }

  /**
   * @param  {Feature} feature
   * @return {Object}  style
   */
  private _selectStyle(feature: Feature) {
    const styles = this._styles as Styles;
    if (this._type) {
      if (typeof this._type === "function") {
        return this._type(feature, this._styles as Styles);
      } else {
        const t = feature.properties![this._type as string];
        return styles[t];
      }
    } else return styles[feature.geometry.type];
  }

  /**
   * @param  {Feature} feature
   * @param  {Array.<Number>}  bbox
   * @param  {Array.<Number>}  featureBounds
   * @return {String} styles
   */
  private _getStyles(feature: Feature, bbox: BBox, featureBounds: BBox) {
    let styles: Record<string, string | number> = {
      "stroke-width": 1,
    };
    const currentStyle: Record<string, string | number> = {};
    let styleString = "";

    if (typeof this._styles === "function") {
      // @ts-ignore
      styles = this._styles(feature, bbox, featureBounds);
    } else {
      styles = { ...this._selectStyle(feature), ...feature.properties };
    }

    // this code is an mainly an extract from Leaflet
    if (styles.stroke || styles.weight) {
      currentStyle["stroke"] = styles.stroke || styles.color;
      currentStyle["stroke-opacity"] = styles.opacity;
      currentStyle["stroke-width"] = styles.weight;
      currentStyle["stroke-linecap"] = styles.lineCap || "round";
      currentStyle["stroke-linejoin"] = styles.lineJoin || "round";

      if (styles.dashArray) {
        currentStyle["stroke-dasharray"] = styles.dashArray;
      }

      if (styles.dashOffset) {
        currentStyle["stroke-dashoffset"] = styles.dashOffset;
      }

      if (styles.weight) {
        padBBox(featureBounds, styles.weight as number);
        extendBBox(bbox, featureBounds.slice(0, 2));
        extendBBox(bbox, featureBounds.slice(2, 4));
      }

      if (styles.direction) {
        // arrow
        const arrow = createArrow(
          styles as unknown as ArrowOptions,
          this._defs
        );
        currentStyle[styles.direction === 1 ? "marker-end" : "marker-start"] =
          "url(#" + arrow + ")";
      }
    } else {
      currentStyle["stroke"] = "none";
    }

    if (styles.fill) {
      currentStyle["fill"] = styles.fill || styles.fillColor || styles.color;
      currentStyle["fill-opacity"] = styles.fillOpacity || styles.opacity || "";
      currentStyle["fill-rule"] =
        styles.fillRule ||
        (feature.geometry.type === "MultiPolygon" ? "nonzero" : "evenodd");
    } else {
      currentStyle["fill"] = "none";
    }

    for (var rule in currentStyle) {
      if (currentStyle[rule] !== undefined) {
        styleString += " " + rule + '="' + currentStyle[rule] + '"';
      }
    }
    return styleString;
  }
}

// factory
export const renderer = (
  gj: FeatureCollection,
  styles?: Styles,
  extent?: BBox,
  projection?: Projection,
  type?: string | StyleSelector,
  fonts?: FontData[],
  transform?: FeatureTransformer
) => new Renderer(gj, styles, extent, projection, type, fonts, transform);
