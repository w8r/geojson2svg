var extend      = require('json-extend');
var hash        = require('string-hash');
var projectgj   = require('geojson-project');
var getFontData = require('./get_font_data');
var Matrix      = require('transformation-matrix-js').Matrix;

var bboxUtils       = require('./bbox');
var extendBBox      = bboxUtils.extend;
var padBBox         = bboxUtils.pad;
var getDefaultBBox  = bboxUtils.getDefault;

var XMLNS     = 'http://www.w3.org/2000/svg';
var XLINK     = 'http://www.w3.org/1999/xlink';
var VERSION   = 1.2;

var SYMBOL    = 'symbol';
var TEXTBOX   = 'textbox';
var FONT_SIZE = 10;


var DefaultStyles = require('./default_styles');
var DefaultFonts  = [
  require('../fonts/arial_helvetica_sans-serif.json'),
  require('../fonts/helvetica_arial_sans-serif.json'),
  require('../fonts/georgia_times_serif.json'),
  require('../fonts/lucida_console_monaco_monospace.json'),
  require('../fonts/verdana_geneva_sans-serif.json')
];

module.exports               = renderer;
module.exports.Renderer      = Renderer;
module.exports.DefaultStyles = DefaultStyles;
module.exports.extendBBox    = extendBBox;
module.exports.padBBox       = padBBox;

/**
 *
 * @class Renderer
 *
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
function Renderer (gj, styles, extent, projection, type, fonts, transform) {
  this._data       = null;
  this._extent     = null;
  this._type       = null;
  this._styles     = DefaultStyles;
  this._projection = null;
  this._type       = null;
  this._fonts      = [];
  this._transform  = null;
  this._plugins    = {};
  this._decorators = {};

  this._defs       = null;

  if (styles)       this.styles(styles);
  if (extent)       this.extent(extent);
  if (projection)   this.projection(projection);
  if (type)         this.type(type);
  if (transform)    this.transform(transform);
  if (gj)           this.data(gj);

  this.fonts(fonts || DefaultFonts);
}

// factory
function renderer (gj, styles, extent, project, type, fonts, transform) {
  return new Renderer(gj, styles, extent, project, type, fonts, transform);
}

Renderer.prototype = {

  /**
   * Stores styles for the renderer
   *
   * @param  {Object|Function} styles
   * @return {Renderer}
   */
  styles: function (styles) {
    this._styles = (typeof styles === 'function') ?
      styles : extend({}, DefaultStyles, styles);
    return this;
  },


  /**
   * @param  {Array.<Object>} fonts
   * @return {Renderer}
   */
  fonts: function(fonts) {
    if (!Array.isArray(fonts)) {
      fonts = [fonts];
    }

    for (var i = 0, len = fonts.length; i < len; i++) {
      fonts[i].values = fonts[i].values.sort(function(a, b) {
        return a.size - b.size;
      });
      this._fonts.push(fonts[i]);
    }

    return this;
  },


  /**
   * Sets transformation function
   * @param  {Function} transform
   * @return {Renderer}
   */
  transform: function(transform) {
    if (typeof transform !== 'function') {
      throw new TypeError('Transform feature must be a function');
    }
    this._transform = transform;
    return this;
  },


  /**
   * Property that is going to be used as for type->style selection
   * @param  {String|Function} type
   * @return {Renderer}
   */
  type: function(type) {
    this._type = type;
    return this;
  },


  /**
   * Here you can pass GeoJSON
   *
   * @param  {GeoJSON} data
   * @return {Renderer}
   */
  data: function (data) {
    if (data.type !== 'FeatureCollection') {
      if (data.type === 'Feature') {
        data = { type: 'FeatureCollection', 'features': [data] };
      } else {
        throw new TypeError('Input has to be a FeatureCollection or a Feature');
      }
    }

    if (this._projection) {
      data = projectgj(data, this._projection);
    }

    this._data = data;
    return this;
  },


  /**
   * Projection function for the coordinates
   *
   * @param  {Function} proj
   * @return {Renderer}
   */
  projection: function (proj) {
    if (typeof proj !== 'function') {
      throw new TypeError('Projection must be a function [x, y] -> [x, y]');
    }
    this._projection = proj;
    return this;
  },


  /**
   * Custom extent to be used as a `viewBox`
   *
   * @param  {Array.<Number>} extent
   * @return {Renderer}
   */
  extent: function (extent) {
    this._extent = extent;
    return this;
  },


  /**
   * Register a path decorator
   * @param  {String}   type
   * @param  {Function} decorator
   * @return {Renderer}
   */
  decorator: function (type, decorator) {
    if (typeof decorator !== 'function') {
      throw new TypeError('Decorator must be a function ' +
        '(feature, coordinates, closed, bbox, featureBounds) -> SVGPath ');
    }
    this._decorators[type] = decorator;
    return this;
  },


  /**
   * Main rendering routine
   * @param {GeoJSON=} data
   * @return {String}
   */
  render: function (data) {
    if (data) this.data(data);

    var rendered = [];
    var bbox = getDefaultBBox();
    this._defs = [];
    for (var i = 0, len = this._data.features.length; i < len; i++) {
      this._feature(this._data.features[i], rendered, bbox);
    }

    this._renderContainer(rendered,
      this._extent || this._data.extent || this._data.bbox ||
      (this._data.properties ? this._data.properties.bbox : null) || bbox);
    return rendered.join('');
  },


  /**
   * Wraps generated content with the SVG container
   *
   * @param  {Array.<String>} accum
   * @param  {Array.<Number>} bbox
   */
  _renderContainer: function (accum, bbox) {
    var viewBox = [bbox[0], bbox[1], bbox[2] - bbox[0], bbox[3] - bbox[1]];
    accum.unshift('<g>');

    if (this._defs.length !== 0) {
      accum.unshift('</defs>');
      accum.unshift.apply(accum, this._defs.slice());
      accum.unshift('<defs>');
    }

    accum.unshift(
      ['<svg viewBox="', viewBox.join(' '), '" xmlns="', XMLNS,
       '" xmlns:xlink="', XLINK, '" version="', VERSION, '">'].join(''));

    accum.push('</g>', '</svg>');
  },


  /**
   * @param  {String}   type
   * @param  {Function} pluginRenderer
   * @return {Renderer}
   */
  plugin: function (type, pluginRenderer) {
    this._plugins[type] = pluginRenderer;
    return this;
  },


  /**
   * @param  {Feature} feature
   * @return {Function|null}
   */
  _getPluginRenderer: function(feature) {
    var type = feature.properties[this._type];
    var pluginRenderer = null;
    if (type) {
      pluginRenderer = this._plugins[type];
    }
    return pluginRenderer;
  },


  /**
   * Renders individual feature
   * @param  {Feature}         feature
   * @param  {Array.<String>}  accum
   * @param  {Array.<Number>}  bbox
   * @return  {Array.<Number>} featureBounds
   */
  _feature: function (feature, accum, bbox) {
    var featureBounds = getDefaultBBox();

    if (this._transform) feature = this._transform(feature);

    var pluginRenderer = this._getPluginRenderer(feature);
    if (pluginRenderer) {
      pluginRenderer.call(this, feature, accum, bbox, featureBounds);
      return featureBounds;
    }

    switch (feature.geometry.type) {
      case 'Polygon':        // render in one path
      case 'MultiPolygon':
        this._polygon(feature, accum, bbox, featureBounds);
        break;
      case 'LineString':      // render in one path
      case 'MultiLineString':
        this._lineString(feature, accum, bbox, featureBounds);
        break;
      case 'Point':
        this._point(feature, accum, bbox, featureBounds);
        break;
      case 'MultiPoint':
        this._multiPoint(feature, accum, bbox, featureBounds);
        break;
      case 'GeometryCollection':
        this._geometryCollection(feature, accum, bbox, featureBounds);
        break;
      default:
        break;
    }
    return featureBounds;
  },


  /**
   * Render `GeometryCollection` in a group
   *
   * @param  {Feature}        feature
   * @param  {Array.<String>} accum
   * @param  {Array.<Number>} bbox
   * @param  {Array.<Number>} featureBounds
   */
  _geometryCollection: function (feature, accum, bbox, featureBounds) {
    var className =
      ('geometrycollection ' + (feature.properties.className || '')).trim();
    accum.push('<g class="', className, '">');

    var geometriesLength = feature.geometry.geometries.length;
    var types = feature.properties['geometriesTypes'] || Array(geometriesLength);

    // split geometries into features for rendering
    for (var i = 0; i < geometriesLength; i++) {
      var properties = extend({}, feature.properties, {
        collectionIndex: i
      });
      properties[this._type] = types[i];

      if (feature.properties.styles && feature.properties.styles[types[i]]) {
        extend(properties, feature.properties.styles[types[i]]);
      }

      // if (types[i] === TEXTBOX) {
      //   properties
      // }

      this._feature({
        type:       'Feature',
        properties: properties,
        geometry:   feature.geometry.geometries[i]
      }, accum, bbox);
    }

    accum.push('</g>');
  },


  /**
   * Renders `MultiPoint` in a group
   *
   * @param  {Feature}        feature
   * @param  {Array.<String>} accum
   * @param  {Array.<Number>} bbox
   * @param  {Array.<Number>} featureBounds
   */
  _multiPoint: function(feature, accum, bbox, featureBounds) {
    var className =
      ('multipoint ' + (feature.properties.className || '')).trim();
    accum.push('<g class="', className, '">');

    // split geometries into features for rendering
    for (var i = 0, len = feature.geometry.coordinates.length; i < len; i++) {
      this._point({
        type:       'Feature',
        properties: feature.properties,
        geometry:   {
          type:        'Point',
          coordinates: feature.geometry.coordinates[i],
        }
      }, accum, bbox, getDefaultBBox());
    }

    accum.push('</g>');
  },


  /**
   * @param  {Feature} feature
   * @param  {Array.<String>} accum
   * @param  {Array.<Number>} bbox
   * @param  {Array.<Number>} featureBounds
   */
  _lineString: function (feature, accum, bbox, featureBounds) {
    var properties = feature.properties;
    var className = ('linestring ' + (properties.className || '')).trim();
    accum.push('<path class="', className,
      '" d="', this._getPath(feature, false, bbox, featureBounds), '"',
      this._getStyles(feature, bbox, featureBounds), ' />');
  },


  /**
   * @param  {Feature}        feature
   * @param  {Array.<String>} accum
   * @param  {Array.<Number}  bbox
   * @param  {Array.<Number>} featureBounds
   */
  _text: function (feature, accum, bbox, featureBounds) {
    var properties = extend({}, this._selectStyle(feature), feature.properties);
    var fontSize   = properties.fontSize   || FONT_SIZE;
    var fontColor  = properties.fontColor  || properties.color;
    var fontFamily = properties.fontFamily || '';

    var text = properties.text;
    var pos = [featureBounds[0], featureBounds[1]];

    var content = this._renderTextContent(
      text, fontSize, fontFamily, featureBounds, properties);

    if (fontFamily) {
      fontFamily = 'font-family="' + fontFamily.replace(/\"/g, '\'').trim() + '" ';
    }

    var className = ('textbox ' + (properties.className || '')).trim();

    accum.push('<text ', fontFamily,
      'class="',     className, '" ',
      'font-size="', fontSize, '" ',
      'fill="',      fontColor, '" ',
      'x="',         pos[0], '" ',
      'y="',         pos[1], '" ',
      '>',
        content,
      '</text>');
  },


  /**
   * @param  {String}         text
   * @param  {Number}         fontSize
   * @param  {String}         fontFamily
   * @param  {Array.<Number>} featureBounds
   * @param  {Object}         props
   * @return {String}
   */
  _renderTextContent: function(text, fontSize, fontFamily, featureBounds, props) {
    var accum = [];
    if (Array.isArray(text) && props.lineHeight) { // it's formatted
      for (var i = 0, len = text.length; i < len; i++) {
        accum.push('<tspan ',
          'dy="', props.lineHeight, '" ',
          'x="',  featureBounds[0], '">',
          String(text[i]),
        '</tspan>');
      }
      text = accum.join('');
    } else {
      var fontData = getFontData(fontFamily, fontSize, this._fonts);
      text = this._renderMultilineText(String(text), fontData, featureBounds);
    }

    return text;
  },


  /**
   * @param  {String} text
   * @param  {Object} fontData
   * @param  {Array.<Number>} bbox
   * @return {String}
   */
  _renderMultilineText: function(text, fontData, bbox) {
    var width = bbox[2] - bbox[0];
    var length = text.length;
    var accum = [];
    var str = '';
    var i = 0, dy = fontData.height, lineLength = 0;

    if (width === 0) {
      dy -= fontData.height * 0.68;
    }

    while (i < length) {
      if (i === 0 || lineLength + fontData.avg > width) {
        var x = (width === 0) ? (bbox[0] - fontData.avg / 2) : bbox[0];
        str += ['<tspan ',
          'dy="', dy, '" ',
          'x="', x ,'"',
        '>'].join('');
        lineLength = 0;
      }

      str += text[i++];
      lineLength += fontData.avg;

      if (i === length || (lineLength + fontData.avg > width)) {
        str += '</tspan>';
        accum.push(str);
        str = '';
      }
    }

    return accum.join('');
  },


  /**
   * @param  {Feature} feature
   * @param  {Array.<String>} accum
   * @param  {Array.<Number>} bbox
   * @param  {Array.<Number>} featureBounds
   */
  _polygon: function (feature, accum, bbox, featureBounds) {
    var properties = feature.properties;
    var className = ('polygon ' + (properties.className || '')).trim();
    accum.push('<path class="', className,
      '" d="', this._getPath(feature, true, bbox, featureBounds), '"',
      this._getStyles(feature, bbox, featureBounds), '/>');

    if (this._type && feature.properties[this._type] === TEXTBOX) {
      this._text(feature, accum, bbox, featureBounds);
    }
  },


  /**
   * @param  {Feature} feature
   * @param  {Array.<String>} accum
   * @param  {Array.<Number>} bbox
   * @param  {Array.<Number>} featureBounds
   */
  _point: function (feature, accum, bbox, featureBounds) {
    var type = this._type ? feature.properties[this._type] : '';
    if (type && type === SYMBOL) {
      this._symbol(feature, accum, bbox, featureBounds);
    } else {
      var coord = feature.geometry.coordinates;
      var className = ('point ' + (feature.properties.className || '')).trim();

      var radius = feature.properties.radius || 1;

      extendBBox(bbox, coord);
      extendBBox(featureBounds, coord);

      if (type && type === TEXTBOX) {
        this._text(feature, accum, bbox, featureBounds);
      } else {
        accum.push('<circle class="', className,
          '" cx="', coord[0], '" cy="', coord[1],
          '" r="',  radius,  '" ',
          this._getStyles(feature, bbox, featureBounds), ' />');
      }
      padBBox(featureBounds, radius);
      extendBBox(bbox, featureBounds.slice(0, 2));
      extendBBox(bbox, featureBounds.slice(2, 4));
    }
  },


  /**
   * Create arrow at the end of the line
   * @param  {Object} options
   * @return {String} SVG marker id
   */
  _createArrow: function(options) {
    var height = options.arrowLength    || (options.weight * 20);
    var width  = options.arrowThickness || (options.weight * 10);
    var length = height;
    var direction = options.direction;

    var id = [
              'arrow', width, length, direction
            ].join('-').replace(/\./g, '');
    var path = this._defs.filter(function (def) {
      return def.indexOf(id) !== -1;
    })[0];

    if (!path) { // arrow doesn't exist, create it
      var refX = 0, refY = width / 2, d = '';

      if (direction === 1) { // LTR
        refX = length;
        d = ['M', 0, 0, 'L', 0, width,
             'L', length, width / 2, 'Z'].join(' ');
      } else {               // RTL
        d = ['M', length, 0, 'L', length, width,
             'L', 0, width / 2, 'Z'].join(' ');
      }

      path = ['<path id="path-', id, '" class="arrow-path" d="', d , '" />'];

      var marker = this._createMarker(
        path.join(''), id, height, width, [refX, refY]);
      this._defs.push(marker);
    }
    return id;
  },


  /**
   * Creates SVG marker
   * @param  {SVGElement} path Element to use as the marker
   * @param  {Object}     options
   * @return {String}
   */
  _createMarker: function (path, id, width, height, ref) {
    var marker = [
      '<marker id="',     id,     '" ',
        'markerWidth="',  width,  '" ',
        'markerHeight="', height, '" ',
        'orient="auto" '];

    if (ref) {
      marker.push('refX="', ref[0], '" ',
                  'refY="', ref[1], '" ');
    }

    marker.push('>', path, '</marker>');
    return marker.join('');
  },


  /**
   * Create symbol for putting into defs
   *
   * @param  {Feature} feature
   * @return {String} symbol id
   */
  _getSymbolDef: function (feature, viewBox) {
    var src = feature.properties.symbol.src.trim();
    var id = 'feature-symbol-' + hash(src);

    // strip garbage
    src = src
      .replace(/<\/?svg[^>]*>/g, '')
      .replace(/\<\?xml.+\?\>|\<\!DOCTYPE.+]\>/g, '')
      .replace(/<metadata>[\s\S]*?<\/metadata>/g, '');

    var symbol = [
      '<symbol id="', id, '" viewBox="', viewBox.join(' '), '">',
        src,
      '</symbol>'
    ].join('');

    if (this._defs.indexOf(symbol) === -1) {
      this._defs.push(symbol);
    }

    return id;
  },


  /**
   * @param  {Feature}        feature
   * @param  {Array.<Number>} bbox
   * @param  {Array.<Number>} featureBounds
   * @return {String}
   */
  _createSymbol: function (feature, bbox, featureBounds) {
    var viewBox = feature.properties.symbol
      .src.match(/view[Bb]ox\=["']([^"']+)["']/m)[1];
    viewBox = viewBox ? viewBox.split(' ').map(parseFloat) : featureBounds;
    var symbol    = feature.properties.symbol;
    var symbolDef = this._getSymbolDef(feature, viewBox);
    var width     = symbol.width  || viewBox[2] || '';
    var height    = symbol.height || viewBox[3] || '';
    var coords    = feature.geometry.coordinates;

    var className = ('symbol ' + (feature.properties.className || '')).trim();

    var symbolBBox = [
      coords[0] - width / 2, coords[1] - height / 2,
      coords[0] + width / 2, coords[1] + height / 2
    ];

    var transform = this._getSymbolTransform(feature, bbox, featureBounds, width, height);
    //symbolBBox = Matrix.from.apply(Matrix, transform).applyToArray(symbolBBox);

    extendBBox(featureBounds, symbolBBox.slice(0, 2));
    extendBBox(featureBounds, symbolBBox.slice(2, 4));

    extendBBox(bbox,          symbolBBox.slice(0, 2));
    extendBBox(bbox,          symbolBBox.slice(2, 4));

    var use = [
      '<use xlink:href="#', symbolDef, '" transform="matrix(',
        transform.join(' '),   ')" ',
        'width="',  width,     '" ',
        'height="', height,    '" ',
        'x="',      coords[0], '" ',
        'y="',      coords[1], '" ',
        'class="',  className, '" ',
        this._getStyles(feature, bbox, featureBounds),
      '/>'
    ].join('');
    return use;
  },


  /**
   * @param  {Feature}        feature
   * @param  {Array.<Number>} bbox
   * @param  {Array.<Number>} featureBounds
   * @param  {Number}         width
   * @param  {Number}         height
   * @return {Array.<Number>} matrix
   */
  _getSymbolTransform: function (feature, bbox, featureBounds, width, height) {
    var props    = feature.properties;
    var center   = feature.geometry.coordinates;
    var scale    = props.scale    || 1;
    var rotation = props.rotation || 0;

    var m = Matrix.from(1, 0, 0, 1, 0, 0)
      .translate(center[0], center[1])
      .rotate(rotation)
      .scale(scale, scale)
      .translate(-center[0], -center[1])
      .translate(-width / 2, -height / 2);

    return m.toArray();
  },


  /**
   * @param  {Feature} feature
   * @param  {Array.<String>} accum
   * @param  {Array.<Number>} bbox
   * @param  {Array.<Number>} featureBounds
   */
  _symbol: function (feature, accum, bbox, featureBounds) {
    var coord = feature.geometry.coordinates;
    var className = ('point ' + (feature.properties.className || '')).trim();
    var radius = feature.properties.radius || 1;

    extendBBox(bbox, coord);
    extendBBox(featureBounds, coord);
    if (feature.properties.symbol.src) {
      accum.push(this._createSymbol(feature, bbox, featureBounds));
    } else {
      accum.push('<circle class="', className,
        '" cx="', coord[0], '" cy="', coord[1],
        '" r="',  radius, '" ',
        this._getStyles(feature, bbox, featureBounds), '/>');
    }
  },


  /**
   * @param  {Array.<Array.<Number>>} coords
   * @param  {Booelean}               closed
   * @param  {Array.<Number>}         bbox
   * @param  {Array.<Number>}         featureBounds
   * @return {String}
   */
  _coordinatesToPath: function (coords, closed, bbox, fBounds, decorator) {
    var res = '', i, len, c, x, y;
    if (!isFinite(coords[0][0])) {
      for (i = 0, len = coords.length; i < len; i++) {
        res += ' ' + this._coordinatesToPath(coords[i], closed, bbox, fBounds, decorator);
      }
    } else {
      for (i = 0, len = coords.length; i < len; i++) {
        c = coords[i];
        x = c[0];
        y = c[1];
        res += (i === 0 ? 'M' : 'L') + x + ' ' + y;

        extendBBox(bbox, c);
        extendBBox(fBounds, c);
      }

      if (closed) res += 'Z';
    }

    return res || 'M0 0';
  },


  /**
   * @param {Feature} feature
   * @param {Boolean} closed
   * @param {Array.<Number>}  bbox
   * @param {Array.<Number>}  fBounds
   */
  _getPath: function (feature, closed, bbox, fBounds) {
    var path = '';
    var coordinates = feature.geometry.coordinates;
    if (this._type && this._decorators[feature.properties[this._type]]) {
      var decorator = this._decorators[feature.properties[this._type]];
      path = decorator.call(this, feature, coordinates, closed, bbox, fBounds);
    } else {
      path = this._coordinatesToPath(coordinates, closed, bbox, fBounds);
    }
    return path.trim();
  },


  /**
   * @param  {Feature} feature
   * @return {Object}  style
   */
  _selectStyle: function (feature) {
    if (this._type) {
      if (typeof this._type === 'function') {
        return this._type(feature, this._styles);
      } else {
        return this._styles[feature.properties[this._type]];
      }
    } else {
      return this._styles[feature.geometry.type];
    }
  },


  /**
   * @param  {Feature} feature
   * @param  {Array.<Number>}  bbox
   * @param  {Array.<Number>}  featureBounds
   * @return {String} styles
   */
  _getStyles: function(feature, bbox, featureBounds) {
    var styles = {
      'stroke-width': 1
    };
    var currentStyle = {};
    var styleString = '';

    if (typeof this._styles === 'function') {
      styles = this._styles(feature, bbox, featureBounds);
    } else {
      styles = extend({}, this._selectStyle(feature), feature.properties);
    }

    // this code is an mainly an extract from Leaflet
    if (styles.stroke || styles.weight) {
      currentStyle['stroke']          = styles.stroke   || styles.color;
      currentStyle['stroke-opacity']  = styles.opacity;
      currentStyle['stroke-width']    = styles.weight;
      currentStyle['stroke-linecap']  = styles.lineCap  || 'round';
      currentStyle['stroke-linejoin'] = styles.lineJoin || 'round';

      if (styles.dashArray) {
        currentStyle['stroke-dasharray'] = styles.dashArray;
      }

      if (styles.dashOffset) {
        currentStyle['stroke-dashoffset'] = styles.dashOffset;
      }

      if (styles.weight) {
        padBBox(featureBounds, styles.weight);

        extendBBox(bbox, featureBounds.slice(0, 2));
        extendBBox(bbox, featureBounds.slice(2, 4));
      }

      if (styles.direction) { // arrow
        var arrow = this._createArrow(styles);
        currentStyle[styles.direction === 1 ? 'marker-end' : 'marker-start'] =
          'url(#' + arrow + ')';
      }
    } else {
      currentStyle['stroke'] = 'none';
    }

    if (styles.fill) {
      currentStyle['fill']         = styles.fill        || styles.fillColor || styles.color;
      currentStyle['fill-opacity'] = styles.fillOpacity || styles.opacity   || '';
      currentStyle['fill-rule']    = styles.fillRule    ||
        (feature.geometry.type === 'MultiPolygon') ? 'nonzero' : 'evenodd';
    } else {
      currentStyle['fill'] = 'none';
    }

    for (var rule in currentStyle) {
      if (currentStyle[rule] !== undefined) {
        styleString += ' ' + rule + '="' + currentStyle[rule] + '"';
      }
    }
    return styleString;
  }
};
