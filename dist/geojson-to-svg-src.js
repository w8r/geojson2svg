(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
module.exports={
  "fontFamily": "Arial, Helvetica, sans-serif",
  "values": [
    {
      "avg": 1.6878916422526042,
      "height": 3.03125,
      "size": 3
    },
    {
      "avg": 4.501044379340278,
      "height": 8.54296875,
      "size": 8
    },
    {
      "avg": 5.626305474175347,
      "height": 11.0234375,
      "size": 10
    },
    {
      "avg": 6.751566569010417,
      "height": 13.50390625,
      "size": 12
    },
    {
      "avg": 9.002088758680555,
      "height": 18,
      "size": 16
    },
    {
      "avg": 11.252610948350695,
      "height": 22.05078125,
      "size": 20
    },
    {
      "avg": 18.00417751736111,
      "height": 36,
      "size": 32
    },
    {
      "avg": 27.006266276041668,
      "height": 53.5234375,
      "size": 48
    }
  ]
}
},{}],2:[function(require,module,exports){
module.exports={
  "fontFamily": "Georgia, Times, serif",
  "values": [
    {
      "avg": 1.7044669126852965,
      "height": 3.56640625,
      "size": 3
    },
    {
      "avg": 4.545245100494124,
      "height": 9.5,
      "size": 8
    },
    {
      "avg": 5.681556375617655,
      "height": 11.0390625,
      "size": 10
    },
    {
      "avg": 6.817867650741186,
      "height": 13.5234375,
      "size": 12
    },
    {
      "avg": 9.090490200988247,
      "height": 18,
      "size": 16
    },
    {
      "avg": 11.36311275123531,
      "height": 23,
      "size": 20
    },
    {
      "avg": 18.180980401976495,
      "height": 36.5,
      "size": 32
    },
    {
      "avg": 27.271470602964744,
      "height": 54.5,
      "size": 48
    }
  ]
}
},{}],3:[function(require,module,exports){
module.exports={
  "fontFamily": "Helvetica, Arial, sans-serif",
  "values": [
    {
      "avg": 1.6879063630715394,
      "height": 3.5390625,
      "size": 3
    },
    {
      "avg": 4.501083634857439,
      "height": 9,
      "size": 8
    },
    {
      "avg": 5.626354543571798,
      "height": 11.5,
      "size": 10
    },
    {
      "avg": 6.751625452286158,
      "height": 14,
      "size": 12
    },
    {
      "avg": 9.002167269714878,
      "height": 18.5078125,
      "size": 16
    },
    {
      "avg": 11.252709087143597,
      "height": 23,
      "size": 20
    },
    {
      "avg": 18.004334539429756,
      "height": 37,
      "size": 32
    },
    {
      "avg": 27.00650180914463,
      "height": 55,
      "size": 48
    }
  ]
}
},{}],4:[function(require,module,exports){
module.exports={
  "fontFamily": "\"Lucida Console\", Monaco, monospace",
  "values": [
    {
      "avg": 1.80029296875,
      "height": 4,
      "size": 3
    },
    {
      "avg": 4.80078125,
      "height": 10,
      "size": 8
    },
    {
      "avg": 6.0009765625,
      "height": 12.5,
      "size": 10
    },
    {
      "avg": 7.201171875,
      "height": 15,
      "size": 12
    },
    {
      "avg": 9.6015625,
      "height": 20,
      "size": 16
    },
    {
      "avg": 12.001953125,
      "height": 25,
      "size": 20
    },
    {
      "avg": 19.203125,
      "height": 40,
      "size": 32
    },
    {
      "avg": 28.8046875,
      "height": 60,
      "size": 48
    }
  ]
}
},{}],5:[function(require,module,exports){
module.exports={
  "fontFamily": "Verdana, Geneva, sans-serif",
  "values": [
    {
      "avg": 1.9013624924879808,
      "height": 3.55078125,
      "size": 3
    },
    {
      "avg": 5.070299979967949,
      "height": 9.54296875,
      "size": 8
    },
    {
      "avg": 6.337874974959936,
      "height": 12.015625,
      "size": 10
    },
    {
      "avg": 7.605449969951923,
      "height": 14.5,
      "size": 12
    },
    {
      "avg": 10.140599959935898,
      "height": 19.5,
      "size": 16
    },
    {
      "avg": 12.675749949919872,
      "height": 24.03125,
      "size": 20
    },
    {
      "avg": 20.281199919871796,
      "height": 38.52734375,
      "size": 32
    },
    {
      "avg": 30.421799879807693,
      "height": 58.5,
      "size": 48
    }
  ]
}
},{}],6:[function(require,module,exports){
/**
 * @preserve
 * GeoJSON -> SVG text renderer
 *
 * @license MIT
 * @copyright 2020 Alexander Milevski <info@w8r.name>
 */
module.exports = require('./src/renderer');

},{"./src/renderer":15}],7:[function(require,module,exports){
/**
 * Node & browser script to transform/project geojson coordinates
 * @copyright Alexander Milevski <info@w8r.name>
 * @preserve
 * @license MIT
 */
(function (factory) { // UMD wrapper
	if (typeof define === 'function' && define.amd) { // AMD
		define(factory);
	} else if (typeof module         === 'object' &&
             typeof module.exports === 'object') { // Node/CommonJS
		module.exports = factory();
	} else { // Browser globals
		window.geojsonProject = factory();
	}
})(function () {

/**
 * Takes in GeoJSON and applies a function to each coordinate,
 * with a given context
 *
 * @param  {Object}     data GeoJSON
 * @param  {Function}   project
 * @param  {*=}         context
 * @return {Object}
 */
function geojsonProject (data, project, context) {
  data = JSON.parse(JSON.stringify(data));
  if (data.type === 'FeatureCollection') {
    // That's a huge hack to get things working with both ArcGIS server
    // and GeoServer. Geoserver provides crs reference in GeoJSON, ArcGIS —
    // doesn't.
    //if (data.crs) delete data.crs;
    for (var i = data.features.length - 1; i >= 0; i--) {
      data.features[i] = projectFeature(data.features[i], project, context);
    }
  } else {
    data = projectFeature(data, project, context);
  }
  return data;
};

geojsonProject.projectFeature  = projectFeature;
geojsonProject.projectGeometry = projectGeometry;


/**
 * @param  {Object}     data GeoJSON
 * @param  {Function}   project
 * @param  {*=}         context
 * @return {Object}
 */
function projectFeature (feature, project, context) {
  if (feature.geometry.type === 'GeometryCollection') {
    for (var i = 0, len = feature.geometry.geometries.length; i < len; i++) {
      feature.geometry.geometries[i] =
        projectGeometry(feature.geometry.geometries[i], project, context);
    }
  } else {
    feature.geometry = projectGeometry(feature.geometry, project, context);
  }
  return feature;
}


/**
 * @param  {Object}     data GeoJSON
 * @param  {Function}   project
 * @param  {*=}         context
 * @return {Object}
 */
function projectGeometry (geometry, project, context) {
  var coords = geometry.coordinates;
  switch (geometry.type) {
    case 'Point':
      geometry.coordinates = project.call(context, coords);
      break;

    case 'MultiPoint':
    case 'LineString':
      for (var i = 0, len = coords.length; i < len; i++) {
        coords[i] = project.call(context, coords[i]);
      }
      geometry.coordinates = coords;
      break;

    case 'Polygon':
      geometry.coordinates = projectCoords(coords, 1, project, context);
      break;

    case 'MultiLineString':
      geometry.coordinates = projectCoords(coords, 1, project, context);
      break;

    case 'MultiPolygon':
      geometry.coordinates = projectCoords(coords, 2, project, context);
      break;

    default:
      break;
  }
  return geometry;
}


/**
 * @param  {*}         coords Coords arrays
 * @param  {Number}    levelsDeep
 * @param  {Function}  project
 * @param  {*=}         context
 * @return {*}
 */
function projectCoords (coords, levelsDeep, project, context) {
  var coord, i, len = coords.length;
  var result = new Array(len);

  if (levelsDeep) {
		for (i = 0; i < len; i++) {
	    result[i] = projectCoords(coords[i], levelsDeep - 1, project, context);
	  }
	} else {
	  for (i = 0, len = coords.length; i < len; i++) {
	    result[i] = project.call(context, coords[i]);
	  }
  }

  return result;
}

return geojsonProject;

});

},{}],8:[function(require,module,exports){
(function ( GLOBAL ) {

    'use strict';

    if ( !Array.isArray ) {
        Array.isArray = function ( arg ) {
            return Object.prototype.toString.call( arg ) === '[object Array]';
        };
    }

    function isPrimitive( val ) {
        return val !== Object( val );
    }

    function copyValue( source ) {
        if ( isPrimitive( source ) ) {
            return source;
        }
        if ( Array.isArray( source ) ) {
            return mergeArray( source.slice( 0 ), source );
        }
        return mergeObject( {}, source );
    }

    function mergeArray( target, source ) {
        var i, len;
        for ( i = 0, len = source.length; i < len; i += 1 ) {
            target[i] = copyValue( source[i] );
        }
        return target;
    }

    function mergeObject( target, source ) {
        var prop;
        for ( prop in source ) {
            if ( source.hasOwnProperty( prop ) ) {
                target[prop] = copyValue( source[prop] );
            }
        }
        return target;
    }

    function extend( target /*, obj1, obj2, ... objN */ ) {
        var i, len, source;
        if ( !target || isPrimitive( target ) ) {
            return;
        }
        for ( i = 1, len = arguments.length; i < len; i += 1 ) {
            source = arguments[i];
            if ( !isPrimitive( source ) ) {
                if ( Array.isArray( source ) ) {
                    mergeArray( target, source );
                } else {
                    mergeObject( target, source );
                }
            }
        }
        return target;
    }

    if ( typeof module === 'undefined' ) {

        GLOBAL.extend = extend;

    } else {

        module.exports = extend;

    }

}( this ));

},{}],9:[function(require,module,exports){
module.exports = function(str) {
  var hash = 5381,
      i    = str.length

  while(i)
    hash = (hash * 33) ^ str.charCodeAt(--i)

  /* JavaScript does bitwise operations (like XOR, above) on 32-bit signed
   * integers. Since we want the results to be always positive, if the high bit
   * is set, unset it and add it back in through (64-bit IEEE) addition. */
  return hash >= 0 ? hash : (hash & 0x7FFFFFFF) + 0x80000000
}

},{}],10:[function(require,module,exports){
/*!
	2D Transformation Matrix v2.6.5
	(c) Epistemex.com 2014-2016
	License: MIT, header required.
*/

/* --- To see contributors: please see readme.md and Change.log --- */

/**
 * 2D transformation matrix object initialized with identity matrix.
 *
 * The matrix can synchronize a canvas 2D context by supplying the context
 * as an argument, or later apply current absolute transform to an
 * existing context.
 *
 * To synchronize a DOM element you can use [`toCSS()`]{@link Matrix#toCSS} or [`toCSS3D()`]{@link Matrix#toCSS3D}.
 *
 * @param {CanvasRenderingContext2D} [context] - Optional context to sync with Matrix
 * @prop {number} a - scale x
 * @prop {number} b - shear y
 * @prop {number} c - shear x
 * @prop {number} d - scale y
 * @prop {number} e - translate x
 * @prop {number} f - translate y
 * @prop {CanvasRenderingContext2D|null} [context=null] - set or get current canvas context
 * @constructor
 * @license MIT license (header required)
 * @copyright Epistemex.com 2014-2016
 */
function Matrix(context) {

	var me = this;
	me._t = me.transform;

	me.a = me.d = 1;
	me.b = me.c = me.e = me.f = 0;

	// reset canvas to enable 100% sync.
	if (context)
		(me.context = context).setTransform(1, 0, 0, 1, 0, 0);
}

/**
 * Returns a new matrix that transforms a triangle `t1` into another triangle
 * `t2`, or throws an exception if it is impossible.
 *
 * Note: the method can take both arrays as well as literal objects.
 * Just make sure that both arguments (`t1`, `t2`) are of the same type.
 *
 * @param {{px: number, py: number, qx: number, qy: number, rx: number, ry: number}|Array} t1 - Object or array containing the three points for the triangle.
 * For object use obj.px, obj.py, obj.qx, obj.qy, obj.rx and obj.ry. For arrays provide the points in the order [px, py, qx, qy, rx, ry], or as point array [{x:,y:}, {x:,y:}, {x:,y:}]
 * @param {{px: number, py: number, qx: number, qy: number, rx: number, ry: number}|Array} t2 - See description for t1.
 * @param {CanvasRenderingContext2D} [context] - optional canvas 2D context to use for the matrix
 * @returns {Matrix}
 * @throws Exception is matrix becomes not invertible
 * @static
 */
Matrix.fromTriangles = function(t1, t2, context) {

	var m1 = new Matrix(),
		m2 = new Matrix(context),
		r1, r2, rx1, ry1, rx2, ry2;

	if (Array.isArray(t1)) {
		if (typeof t1[0] === "number") {
			rx1 = t1[4]; ry1 = t1[5]; rx2 = t2[4]; ry2 = t2[5];
			r1 = [t1[0] - rx1, t1[1] - ry1, t1[2] - rx1, t1[3] - ry1, rx1, ry1];
			r2 = [t2[0] - rx2, t2[1] - ry2, t2[2] - rx2, t2[3] - ry2, rx2, ry2]
		}
		else {
			rx1 = t1[2].x; ry1 = t1[2].y; rx2 = t2[2].x; ry2 = t2[2].y;
			r1 = [t1[0].x - rx1, t1[0].y - ry1, t1[1].x - rx1, t1[1].y - ry1, rx1, ry1];
			r2 = [t2[0].x - rx2, t2[0].y - ry2, t2[1].x - rx2, t1[1].y - ry2, rx2, ry2]
		}
	}
	else {
		r1 = [t1.px - t1.rx, t1.py - t1.ry, t1.qx - t1.rx, t1.qy - t1.ry, t1.rx, t1.ry];
		r2 = [t2.px - t2.rx, t2.py - t2.ry, t2.qx - t2.rx, t2.qy - t2.ry, t2.rx, t2.ry]
	}

	m1.setTransform.apply(m1, r1);
	m2.setTransform.apply(m2, r2);

	return m2.multiply(m1.inverse())
};

/**
 * Create a new matrix from a SVGMatrix
 *
 * @param {SVGMatrix} svgMatrix - source SVG Matrix
 * @param {CanvasRenderingContext2D} [context] - optional canvas 2D context to use for the matrix
 * @returns {Matrix}
 * @static
 * @private
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/SVGMatrix|MDN / SVGMatrix}
 */
Matrix.fromSVGMatrix = function(svgMatrix, context) {
	console.warn("Obsolete. Use Matrix.from()");
	return new Matrix(context).multiply(svgMatrix)
};

/**
 * Create a new matrix from a DOMMatrix
 *
 * @param {DOMMatrix} domMatrix - source DOMMatrix
 * @param {CanvasRenderingContext2D} [context] - optional canvas 2D context to use for the matrix
 * @returns {Matrix}
 * @static
 * @private
 * @see {@link https://drafts.fxtf.org/geometry/#dommatrix|MDN / DOMMatrix}
 */
Matrix.fromDOMMatrix = function(domMatrix, context) {
	console.warn("Obsolete. Use Matrix.from()");
	if (!domMatrix.is2D) throw "Cannot use 3D matrix.";
	return new Matrix(context).multiply(domMatrix)
};

/**
 * Create a matrix from a transform list from an SVG shape. The list
 * can be for example baseVal (i.e. `shape.transform.baseVal`).
 *
 * The resulting matrix has all transformations from that list applied
 * in the same order as the list.
 *
 * @param {SVGTransformList} tList - transform list from an SVG shape.
 * @param {CanvasRenderingContext2D} [context] - optional canvas 2D context to use for the matrix
 * @returns {Matrix}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/SVGTransformList|MDN / SVGTransformList}
 */
Matrix.fromSVGTransformList = function(tList, context) {

	var m = new Matrix(context),
		i = 0;

	while(i < tList.length)
		m.multiply(tList[i++].matrix);

	return m
};

/**
 * Create and transform a new matrix based on given matrix values, or
 * provide SVGMatrix or a (2D) DOMMatrix or another instance of a Matrix
 * (in fact, any 2D matrix object using properties a-f can be used as source).
 *
 * @example
 *
 *     var m = Matrix.from(1, 0.2, 0, 2, 120, 97);
 *     var m = Matrix.from(domMatrix, ctx);
 *     var m = Matrix.from(svgMatrix);
 *     var m = Matrix.from(matrix);
 *
 * @param {number|DOMMatrix|SVGMatrix|Matrix} a - number representing a in [a-f], or a Matrix object containing properties a-f
 * @param {number|CanvasRenderingContext2D} [b] - b property if a is not a matrix object, or optional canvas 2D context
 * @param {number} [c]
 * @param {number} [d]
 * @param {number} [e]
 * @param {number} [f]
 * @param {CanvasRenderingContext2D} [context] - optional canvas context to synchronize
 * @returns {Matrix}
 * @static
 */
Matrix.from = function(a, b, c, d, e, f, context) {

	var m = new Matrix(context);

	if (typeof a === "number")
		m.setTransform(a, b, c, d, e, f);

	else {
		if (typeof a.is2D === "boolean" && !a.is2D) throw "Cannot use 3D DOMMatrix.";
		if (b) m.context = b;
		m.multiply(a)
	}

	return m
};

Matrix.prototype = {

	/**
	 * Concatenates transforms of this matrix onto the given child matrix and
	 * returns a new matrix. This instance is used on left side.
	 *
	 * @param {Matrix|SVGMatrix} cm - child matrix to apply concatenation to
	 * @returns {Matrix} - new Matrix instance
	 */
	concat: function(cm) {
		return this.clone().multiply(cm)
	},

	/**
	 * Flips the horizontal values.
	 * @returns {Matrix}
	 */
	flipX: function() {
		return this._t(-1, 0, 0, 1, 0, 0)
	},

	/**
	 * Flips the vertical values.
	 * @returns {Matrix}
	 */
	flipY: function() {
		return this._t(1, 0, 0, -1, 0, 0)
	},

	/**
	 * Reflects incoming (velocity) vector on the normal which will be the
	 * current transformed x axis. Call when a trigger condition is met.
	 *
	 * @param {number} x - vector end point for x (start = 0)
	 * @param {number} y - vector end point for y (start = 0)
	 * @returns {{x: number, y: number}}
	 */
	reflectVector: function(x, y) {

		var v = this.applyToPoint(0, 1),
			d = (v.x * x + v.y * y) * 2;

		x -= d * v.x;
		y -= d * v.y;

		return {x: x, y: y}
	},

	/**
	 * Short-hand to reset current matrix to an identity matrix.
	 * @returns {Matrix}
	 */
	reset: function() {
		return this.setTransform(1, 0, 0, 1, 0, 0)
	},

	/**
	 * Rotates current matrix by angle (accumulative).
	 * @param {number} angle - angle in radians
	 * @returns {Matrix}
	 */
	rotate: function(angle) {
		var cos = Math.cos(angle),
			sin = Math.sin(angle);
		return this._t(cos, sin, -sin, cos, 0, 0)
	},

	/**
	 * Converts a vector given as `x` and `y` to angle, and
	 * rotates (accumulative).
	 * @param x
	 * @param y
	 * @returns {Matrix}
	 */
	rotateFromVector: function(x, y) {
		return this.rotate(Math.atan2(y, x))
	},

	/**
	 * Helper method to make a rotation based on an angle in degrees.
	 * @param {number} angle - angle in degrees
	 * @returns {Matrix}
	 */
	rotateDeg: function(angle) {
		return this.rotate(angle * Math.PI / 180)
	},

	/**
	 * Scales current matrix uniformly and accumulative.
	 * @param {number} f - scale factor for both x and y (1 does nothing)
	 * @returns {Matrix}
	 */
	scaleU: function(f) {
		return this._t(f, 0, 0, f, 0, 0)
	},

	/**
	 * Scales current matrix accumulative.
	 * @param {number} sx - scale factor x (1 does nothing)
	 * @param {number} sy - scale factor y (1 does nothing)
	 * @returns {Matrix}
	 */
	scale: function(sx, sy) {
		return this._t(sx, 0, 0, sy, 0, 0)
	},

	/**
	 * Scales current matrix on x axis accumulative.
	 * @param {number} sx - scale factor x (1 does nothing)
	 * @returns {Matrix}
	 */
	scaleX: function(sx) {
		return this._t(sx, 0, 0, 1, 0, 0)
	},

	/**
	 * Scales current matrix on y axis accumulative.
	 * @param {number} sy - scale factor y (1 does nothing)
	 * @returns {Matrix}
	 */
	scaleY: function(sy) {
		return this._t(1, 0, 0, sy, 0, 0)
	},

	/**
	 * Apply shear to the current matrix accumulative.
	 * @param {number} sx - amount of shear for x
	 * @param {number} sy - amount of shear for y
	 * @returns {Matrix}
	 */
	shear: function(sx, sy) {
		return this._t(1, sy, sx, 1, 0, 0)
	},

	/**
	 * Apply shear for x to the current matrix accumulative.
	 * @param {number} sx - amount of shear for x
	 * @returns {Matrix}
	 */
	shearX: function(sx) {
		return this._t(1, 0, sx, 1, 0, 0)
	},

	/**
	 * Apply shear for y to the current matrix accumulative.
	 * @param {number} sy - amount of shear for y
	 * @returns {Matrix}
	 */
	shearY: function(sy) {
		return this._t(1, sy, 0, 1, 0, 0)
	},

	/**
	 * Apply skew to the current matrix accumulative. Angles in radians.
	 * Also see [`skewDeg()`]{@link Matrix#skewDeg}.
	 * @param {number} ax - angle of skew for x
	 * @param {number} ay - angle of skew for y
	 * @returns {Matrix}
	 */
	skew: function(ax, ay) {
		return this.shear(Math.tan(ax), Math.tan(ay))
	},

	/**
	 * Apply skew to the current matrix accumulative. Angles in degrees.
	 * Also see [`skew()`]{@link Matrix#skew}.
	 * @param {number} ax - angle of skew for x
	 * @param {number} ay - angle of skew for y
	 * @returns {Matrix}
	 */
	skewDeg: function(ax, ay) {
		return this.shear(Math.tan(ax / 180 * Math.PI), Math.tan(ay / 180 * Math.PI))
	},

	/**
	 * Apply skew for x to the current matrix accumulative. Angles in radians.
	 * Also see [`skewDeg()`]{@link Matrix#skewDeg}.
	 * @param {number} ax - angle of skew for x
	 * @returns {Matrix}
	 */
	skewX: function(ax) {
		return this.shearX(Math.tan(ax))
	},

	/**
	 * Apply skew for y to the current matrix accumulative. Angles in radians.
	 * Also see [`skewDeg()`]{@link Matrix#skewDeg}.
	 * @param {number} ay - angle of skew for y
	 * @returns {Matrix}
	 */
	skewY: function(ay) {
		return this.shearY(Math.tan(ay))
	},

	/**
	 * Set current matrix to new absolute matrix.
	 * @param {number} a - scale x
	 * @param {number} b - shear y
	 * @param {number} c - shear x
	 * @param {number} d - scale y
	 * @param {number} e - translate x
	 * @param {number} f - translate y
	 * @returns {Matrix}
	 */
	setTransform: function(a, b, c, d, e, f) {
		var me = this;
		me.a = a;
		me.b = b;
		me.c = c;
		me.d = d;
		me.e = e;
		me.f = f;
		return me._x()
	},

	/**
	 * Translate current matrix accumulative.
	 * @param {number} tx - translation for x
	 * @param {number} ty - translation for y
	 * @returns {Matrix}
	 */
	translate: function(tx, ty) {
		return this._t(1, 0, 0, 1, tx, ty)
	},

	/**
	 * Translate current matrix on x axis accumulative.
	 * @param {number} tx - translation for x
	 * @returns {Matrix}
	 */
	translateX: function(tx) {
		return this._t(1, 0, 0, 1, tx, 0)
	},

	/**
	 * Translate current matrix on y axis accumulative.
	 * @param {number} ty - translation for y
	 * @returns {Matrix}
	 */
	translateY: function(ty) {
		return this._t(1, 0, 0, 1, 0, ty)
	},

	/**
	 * Multiplies current matrix with new matrix values. Also see [`multiply()`]{@link Matrix#multiply}.
	 *
	 * @param {number} a2 - scale x
	 * @param {number} b2 - shear y
	 * @param {number} c2 - shear x
	 * @param {number} d2 - scale y
	 * @param {number} e2 - translate x
	 * @param {number} f2 - translate y
	 * @returns {Matrix}
	 */
	transform: function(a2, b2, c2, d2, e2, f2) {

		var me = this,
			a1 = me.a,
			b1 = me.b,
			c1 = me.c,
			d1 = me.d,
			e1 = me.e,
			f1 = me.f;

		/* matrix order (canvas compatible):
		* ace
		* bdf
		* 001
		*/
		me.a = a1 * a2 + c1 * b2;
		me.b = b1 * a2 + d1 * b2;
		me.c = a1 * c2 + c1 * d2;
		me.d = b1 * c2 + d1 * d2;
		me.e = a1 * e2 + c1 * f2 + e1;
		me.f = b1 * e2 + d1 * f2 + f1;

		return me._x()
	},

	/**
	 * Multiplies current matrix with source matrix.
	 * @param {Matrix|SVGMatrix} m - source matrix to multiply with.
	 * @returns {Matrix}
	 */
	multiply: function(m) {
		return this._t(m.a, m.b, m.c, m.d, m.e, m.f)
	},

	/**
	 * Divide this matrix on input matrix which must be invertible.
	 * @param {Matrix} m - matrix to divide on (divisor)
	 * @throws Exception is input matrix is not invertible
	 * @returns {Matrix}
	 */
	divide: function(m) {

		if (!m.isInvertible())
			throw "Matrix not invertible";

		return this.multiply(m.inverse())
	},

	/**
	 * Divide current matrix on scalar value != 0.
	 * @param {number} d - divisor (can not be 0)
	 * @returns {Matrix}
	 */
	divideScalar: function(d) {

		var me = this;
		me.a /= d;
		me.b /= d;
		me.c /= d;
		me.d /= d;
		me.e /= d;
		me.f /= d;

		return me._x()
	},

	/**
	 * Get an inverse matrix of current matrix. The method returns a new
	 * matrix with values you need to use to get to an identity matrix.
	 * Context from parent matrix is not applied to the returned matrix.
	 *
	 * @param {boolean} [cloneContext=false] - clone current context to resulting matrix
	 * @throws Exception is input matrix is not invertible
	 * @returns {Matrix} - new Matrix instance
	 */
	inverse: function(cloneContext) {

		var me = this,
			m  = new Matrix(cloneContext ? me.context : null),
			dt = me.determinant();

		if (me._q(dt, 0))
			throw "Matrix not invertible.";

		m.a = me.d / dt;
		m.b = -me.b / dt;
		m.c = -me.c / dt;
		m.d = me.a / dt;
		m.e = (me.c * me.f - me.d * me.e) / dt;
		m.f = -(me.a * me.f - me.b * me.e) / dt;

		return m
	},

	/**
	 * Interpolate this matrix with another and produce a new matrix.
	 * `t` is a value in the range [0.0, 1.0] where 0 is this instance and
	 * 1 is equal to the second matrix. The `t` value is not clamped.
	 *
	 * Context from parent matrix is not applied to the returned matrix.
	 *
	 * Note: this interpolation is naive. For animation containing rotation,
	 * shear or skew use the [`interpolateAnim()`]{@link Matrix#interpolateAnim} method instead
	 * to avoid unintended flipping.
	 *
	 * @param {Matrix|SVGMatrix} m2 - the matrix to interpolate with.
	 * @param {number} t - interpolation [0.0, 1.0]
	 * @param {CanvasRenderingContext2D} [context] - optional context to affect
	 * @returns {Matrix} - new Matrix instance with the interpolated result
	 */
	interpolate: function(m2, t, context) {

		var me = this,
			m  = context ? new Matrix(context) : new Matrix();

		m.a = me.a + (m2.a - me.a) * t;
		m.b = me.b + (m2.b - me.b) * t;
		m.c = me.c + (m2.c - me.c) * t;
		m.d = me.d + (m2.d - me.d) * t;
		m.e = me.e + (m2.e - me.e) * t;
		m.f = me.f + (m2.f - me.f) * t;

		return m._x()
	},

	/**
	 * Interpolate this matrix with another and produce a new matrix.
	 * `t` is a value in the range [0.0, 1.0] where 0 is this instance and
	 * 1 is equal to the second matrix. The `t` value is not constrained.
	 *
	 * Context from parent matrix is not applied to the returned matrix.
	 *
	 * To obtain easing `t` can be preprocessed using easing-functions
	 * before being passed to this method.
	 *
	 * Note: this interpolation method uses decomposition which makes
	 * it suitable for animations (in particular where rotation takes
	 * places).
	 *
	 * @param {Matrix} m2 - the matrix to interpolate with.
	 * @param {number} t - interpolation [0.0, 1.0]
	 * @param {CanvasRenderingContext2D} [context] - optional context to affect
	 * @returns {Matrix} - new Matrix instance with the interpolated result
	 */
	interpolateAnim: function(m2, t, context) {

		var m          = new Matrix(context ? context : null),
			d1         = this.decompose(),
			d2         = m2.decompose(),
			t1         = d1.translate,
			t2         = d2.translate,
			s1         = d1.scale,
			rotation   = d1.rotation + (d2.rotation - d1.rotation) * t,
			translateX = t1.x + (t2.x - t1.x) * t,
			translateY = t1.y + (t2.y - t1.y) * t,
			scaleX     = s1.x + (d2.scale.x - s1.x) * t,
			scaleY     = s1.y + (d2.scale.y - s1.y) * t
			;

		// QR order (t-r-s-sk)
		m.translate(translateX, translateY);
		m.rotate(rotation);
		m.scale(scaleX, scaleY);
		//todo test skew scenarios

		return m._x()
	},

	/**
	 * Decompose the current matrix into simple transforms using either
	 * QR (default) or LU decomposition.
	 *
	 * @param {boolean} [useLU=false] - set to true to use LU rather than QR decomposition
	 * @returns {*} - an object containing current decomposed values (translate, rotation, scale, skew)
	 * @see {@link http://www.maths-informatique-jeux.com/blog/frederic/?post/2013/12/01/Decomposition-of-2D-transform-matrices|Adoption based on this code}
	 * @see {@link https://en.wikipedia.org/wiki/QR_decomposition|More on QR decomposition}
	 * @see {@link https://en.wikipedia.org/wiki/LU_decomposition|More on LU decomposition}
	 */
	decompose: function(useLU) {

		var me        = this,
			a         = me.a,
			b         = me.b,
			c         = me.c,
			d         = me.d,
			acos      = Math.acos,
			atan      = Math.atan,
			sqrt      = Math.sqrt,
			pi        = Math.PI,

			translate = {x: me.e, y: me.f},
			rotation  = 0,
			scale     = {x: 1, y: 1},
			skew      = {x: 0, y: 0},

			determ    = a * d - b * c;	// determinant(), skip DRY here...

		if (useLU) {
			if (a) {
				skew = {x: atan(c / a), y: atan(b / a)};
				scale = {x: a, y: determ / a};
			}
			else if (b) {
				rotation = pi * 0.5;
				scale = {x: b, y: determ / b};
				skew.x = atan(d / b);
			}
			else { // a = b = 0
				scale = {x: c, y: d};
				skew.x = pi * 0.25;
			}
		}
		else {
			// Apply the QR-like decomposition.
			if (a || b) {
				var r = sqrt(a * a + b * b);
				rotation = b > 0 ? acos(a / r) : -acos(a / r);
				scale = {x: r, y: determ / r};
				skew.x = atan((a * c + b * d) / (r * r));
			}
			else if (c || d) {
				var s = sqrt(c * c + d * d);
				rotation = pi * 0.5 - (d > 0 ? acos(-c / s) : -acos(c / s));
				scale = {x: determ / s, y: s};
				skew.y = atan((a * c + b * d) / (s * s));
			}
			else { // a = b = c = d = 0
				scale = {x: 0, y: 0};
			}
		}

		return {
			translate: translate,
			rotation : rotation,
			scale    : scale,
			skew     : skew
		}
	},

	/**
	 * Returns the determinant of the current matrix.
	 * @returns {number}
	 */
	determinant: function() {
		return this.a * this.d - this.b * this.c
	},

	/**
	 * Apply current matrix to `x` and `y` of a point.
	 * Returns a point object.
	 *
	 * @param {number} x - value for x
	 * @param {number} y - value for y
	 * @returns {{x: number, y: number}} A new transformed point object
	 */
	applyToPoint: function(x, y) {

		var me = this;

		return {
			x: x * me.a + y * me.c + me.e,
			y: x * me.b + y * me.d + me.f
		}
	},

	/**
	 * Apply current matrix to array with point objects or point pairs.
	 * Returns a new array with points in the same format as the input array.
	 *
	 * A point object is an object literal:
	 *
	 *     {x: x, y: y}
	 *
	 * so an array would contain either:
	 *
	 *     [{x: x1, y: y1}, {x: x2, y: y2}, ... {x: xn, y: yn}]
	 *
	 * or
	 *
	 *     [x1, y1, x2, y2, ... xn, yn]
	 *
	 * @param {Array} points - array with point objects or pairs
	 * @returns {Array} A new array with transformed points
	 */
	applyToArray: function(points) {

		var i = 0, p, l,
			mxPoints = [];

		if (typeof points[0] === 'number') {

			l = points.length;

			while(i < l) {
				p = this.applyToPoint(points[i++], points[i++]);
				mxPoints.push(p.x, p.y);
			}
		}
		else {
			while(p = points[i++]) {
				mxPoints.push(this.applyToPoint(p.x, p.y));
			}
		}

		return mxPoints
	},

	/**
	 * Apply current matrix to a typed array with point pairs. Although
	 * the input array may be an ordinary array, this method is intended
	 * for more performant use where typed arrays are used. The returned
	 * array is regardless always returned as a `Float32Array`.
	 *
	 * @param {*} points - (typed) array with point pairs [x1, y1, ..., xn, yn]
	 * @param {boolean} [use64=false] - use Float64Array instead of Float32Array
	 * @returns {*} A new typed array with transformed points
	 */
	applyToTypedArray: function(points, use64) {

		var i = 0, p,
			l = points.length,
			mxPoints = use64 ? new Float64Array(l) : new Float32Array(l);

		while(i < l) {
			p = this.applyToPoint(points[i], points[i + 1]);
			mxPoints[i++] = p.x;
			mxPoints[i++] = p.y;
		}

		return mxPoints
	},

	/**
	 * Apply to any canvas 2D context object. This does not affect the
	 * context that optionally was referenced in constructor unless it is
	 * the same context.
	 *
	 * @param {CanvasRenderingContext2D} context - target context
	 * @returns {Matrix}
	 */
	applyToContext: function(context) {
		var me = this;
		context.setTransform(me.a, me.b, me.c, me.d, me.e, me.f);
		return me
	},

	/**
	 * Returns true if matrix is an identity matrix (no transforms applied).
	 * @returns {boolean}
	 */
	isIdentity: function() {
		var me = this;
		return me._q(me.a, 1) &&
			me._q(me.b, 0) &&
			me._q(me.c, 0) &&
			me._q(me.d, 1) &&
			me._q(me.e, 0) &&
			me._q(me.f, 0)
	},

	/**
	 * Returns true if matrix is invertible
	 * @returns {boolean}
	 */
	isInvertible: function() {
		return !this._q(this.determinant(), 0)
	},

	/**
	 * The method is intended for situations where scale is accumulated
	 * via multiplications, to detect situations where scale becomes
	 * "trapped" with a value of zero. And in which case scale must be
	 * set explicitly to a non-zero value.
	 *
	 * @returns {boolean}
	 */
	isValid: function() {
		return !(this.a * this.d)
	},

	/**
	 * Compares current matrix with another matrix. Returns true if equal
	 * (within epsilon tolerance).
	 * @param {Matrix|SVGMatrix} m - matrix to compare this matrix with
	 * @returns {boolean}
	 */
	isEqual: function(m) {

		var me = this,
			q = me._q;

		return  q(me.a, m.a) &&
				q(me.b, m.b) &&
				q(me.c, m.c) &&
				q(me.d, m.d) &&
				q(me.e, m.e) &&
				q(me.f, m.f)
	},

	/**
	 * Clones current instance and returning a new matrix.
	 * @param {boolean} [noContext=false] don't clone context reference if true
	 * @returns {Matrix} - a new Matrix instance with identical transformations as this instance
	 */
	clone: function(noContext) {
		return new Matrix(noContext ? null : this.context).multiply(this)
	},

	/**
	 * Returns an array with current matrix values.
	 * @returns {Array}
	 */
	toArray: function() {
		var me = this;
		return [me.a, me.b, me.c, me.d, me.e, me.f]
	},

	/**
	 * Returns a binary typed array, either as 32-bit (default) or
	 * 64-bit.
	 * @param {boolean} [use64=false] chose whether to use 32-bit or 64-bit typed array
	 * @returns {*}
	 */
	toTypedArray: function(use64) {

		var a  = use64 ? new Float64Array(6) : new Float32Array(6),
			me = this;

		a[0] = me.a;
		a[1] = me.b;
		a[2] = me.c;
		a[3] = me.d;
		a[4] = me.e;
		a[5] = me.f;

		return a
	},

	/**
	 * Generates a string that can be used with CSS `transform`.
	 * @example
	 *     element.style.transform = m.toCSS();
	 * @returns {string}
	 */
	toCSS: function() {
		return "matrix(" + this.toArray() + ")"
	},

	/**
	 * Generates a `matrix3d()` string that can be used with CSS `transform`.
	 * Although the matrix is for 2D use you may see performance benefits
	 * on some devices using a 3D CSS transform instead of a 2D.
	 * @example
	 *     element.style.transform = m.toCSS3D();
	 * @returns {string}
	 */
	toCSS3D: function() {
		var me = this;
		return "matrix3d(" + me.a + "," + me.b + ",0,0," + me.c + "," + me.d + ",0,0,0,0,1,0," + me.e + "," + me.f + ",0,1)"
	},

	/**
	 * Returns a JSON compatible string of current matrix.
	 * @returns {string}
	 */
	toJSON: function() {
		var me = this;
		return '{"a":' + me.a + ',"b":' + me.b + ',"c":' + me.c + ',"d":' + me.d + ',"e":' + me.e + ',"f":' + me.f + '}'
	},

	/**
	 * Returns a string with current matrix as comma-separated list.
	 * @param {number} [fixLen=4] - truncate decimal values to number of digits
	 * @returns {string}
	 */
	toString: function(fixLen) {
		var me = this;
		fixLen = fixLen || 4;
		return 	 "a=" + me.a.toFixed(fixLen) +
				" b=" + me.b.toFixed(fixLen) +
				" c=" + me.c.toFixed(fixLen) +
				" d=" + me.d.toFixed(fixLen) +
				" e=" + me.e.toFixed(fixLen) +
				" f=" + me.f.toFixed(fixLen)
	},

	/**
	 * Returns a string with current matrix as comma-separated values
	 * string with line-end (CR+LF).
	 * @returns {string}
	 */
	toCSV: function() {
		return this.toArray().join() + "\r\n"
	},

	/**
	 * Convert current matrix into a `DOMMatrix`. If `DOMMatrix` is not
	 * supported, a `null` is returned.
	 *
	 * @returns {DOMMatrix}
	 * @see {@link https://drafts.fxtf.org/geometry/#dommatrix|MDN / SVGMatrix}
	 */
	toDOMMatrix: function() {
		var m = null;
		if ("DOMMatrix" in window) {
			m = new DOMMatrix();
			m.a = this.a;
			m.b = this.b;
			m.c = this.c;
			m.d = this.d;
			m.e = this.e;
			m.f = this.f;
		}
		return m
	},

	/**
	 * Convert current matrix into a `SVGMatrix`. If `SVGMatrix` is not
	 * supported, a `null` is returned.
	 *
	 * Note: BETA
	 *
	 * @returns {SVGMatrix}
	 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/SVGMatrix|MDN / SVGMatrix}
	 */
	toSVGMatrix: function() {

		// as we can not set transforms directly on SVG matrices we need
		// to decompose our own matrix first:
		var dc = this.decompose(),
			translate = dc.translate,
			scale = dc.scale,
			skew = dc.skew,
			eq = this._q,
			svgMatrix = document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGMatrix();

		if (!svgMatrix) return null;

		// apply transformations in the correct order (see decompose()), QR: translate -> rotate -> scale -> skew
		svgMatrix = svgMatrix.translate(translate.x, translate.y);
		svgMatrix = svgMatrix.rotate(dc.rotation / Math.PI * 180);		// SVGMatrix uses degrees
		svgMatrix = svgMatrix.scaleNonUniform(scale.x, scale.y);

		if (!eq(0, skew.x))
			svgMatrix = svgMatrix.skewX(skew.x);

		if (!eq(0, skew.y))
			svgMatrix = svgMatrix.skewY(skew.y);

		return svgMatrix
	},

	/**
	 * Compares floating point values with some tolerance (epsilon)
	 * @param {number} f1 - float 1
	 * @param {number} f2 - float 2
	 * @returns {boolean}
	 * @private
	 */
	_q: function(f1, f2) {
		return Math.abs(f1 - f2) < 1e-14
	},

	/**
	 * Apply current absolute matrix to context if defined, to sync it.
	 * @returns {Matrix}
	 * @private
	 */
	_x: function() {
		var me = this;
		if (me.context)
			me.context.setTransform(me.a, me.b, me.c, me.d, me.e, me.f);
		return me
	}
};

// Node support
if (typeof exports !== "undefined") exports.Matrix = Matrix;

},{}],11:[function(require,module,exports){
/**
 * BBox 'extend' in-place
 *
 * @param  {Array.<Number>} bbox
 * @param  {Array.<Number>} coord
 */
function extend (bbox, coord) {
  var x = coord[0];
  var y = coord[1];
  bbox[0] = Math.min(x, bbox[0]);
  bbox[1] = Math.min(y, bbox[1]);
  bbox[2] = Math.max(x, bbox[2]);
  bbox[3] = Math.max(y, bbox[3]);
}


/**
 * BBox 'extend' in-place
 *
 * @param  {Array.<Number>} bbox
 * @param  {Number}         padding
 */
function pad (bbox, padding) {
  bbox[0] -= padding;
  bbox[1] -= padding;
  bbox[2] += padding;
  bbox[3] += padding;
}


/**
 * @return {Array.<Number>}
 */
function getDefault () {
  return [Infinity, Infinity, -Infinity, -Infinity];
}

module.exports = {
  extend:     extend,
  pad:        pad,
  getDefault: getDefault
};

},{}],12:[function(require,module,exports){
var FILL    = '#000000';
var COLOR   = '#333333';
var WEIGHT  = 0.25;
var OPACITY = 0.75;


var Styles = {

  'Polygon': {
    weight: WEIGHT,
    color: COLOR,
    opacity: OPACITY
  },

  'LineString': {
    weight: WEIGHT,
    color: COLOR,
    opacity: OPACITY
  },

  'Point': {
    radius: 3,
    stroke: COLOR,
    weight: WEIGHT,
    color: COLOR,
    fill: FILL
  },

  'textbox': {
    'fontFamily': 'Helvetica, Arial, sans-serif',
    'fontColor': COLOR,
    'weight': 0,
    'color': COLOR
  }
};


Styles['MultiPolygon']    = Styles.Polygon;
Styles['MultiLineString'] = Styles.LineString;
Styles['MultiPoint']      = Styles.Point;

module.exports = Styles;

},{}],13:[function(require,module,exports){
var LINE_RATIO  = 1.01567;
var WIDTH_RATIO = 1 / 1.946;
var measure     = require('./measure_glyphs');

/**
 * @param  {String} fontFamily
 * @param  {Number} fontSize
 * @param  {Array.<Object>} fontData
 * @return {Object}
 */
module.exports = function getFontData (fontFamily, fontSize, fontData) {
  var data = null;
  var prev, next;

  // try and select from available
  for (var i = 0, len = fontData.length; i < len; i++) {
    var font = fontData[i];
    prev = next = null;

    if (font.fontFamily === fontFamily) {
      for (var j = 0, jj = font.values.length; j < jj; j++) {
        var values = font.values[j];
        if (values.size === fontSize) {
          data = values;
          break;
        } else if (values.size < fontSize) {
          prev = values;
        } else if (!next && values.size > fontSize) {
          next = values;
        }
      }
      break;
    }
  }

  if (!data) {               // none available
    var ratio;
    if (typeof window !== 'undefined') {  // if in browser - calculate
      data = measure(fontFamily, fontSize).values[0];
    } else if (prev) {       // else interpolate
      if (next) {            // between two values
        ratio = (fontSize - prev.size) / (next.size - prev.size);
        data = {
          avg:    prev.avg + (next.avg - prev.avg) * ratio,
          height: prev.height + (next.height - prev.height) * ratio,
          size:   fontSize
        };
      } else {               // larger than the largest
        data = fromOtherValue(fontSize, prev);
      }
    } else if (next) {        // smaller than smallest
      data = fromOtherValue(fontSize, next);
    } else {                  // not enough data at all, roughly calculate
      data = {
        avg:    fontSize * WIDTH_RATIO,
        height: fontSize * LINE_RATIO,
        size:   fontSize
      };
    }
  }

  return data;
};


/**
 * @param  {Number} fontSize
 * @param  {Object} value
 * @return {Object} font data
 */
function fromOtherValue (fontSize, value) {
  var ratio = fontSize / value.size;
  return {
    avg:    value.avg * ratio,
    size:   fontSize,
    height: value.height * ratio
  };
}

},{"./measure_glyphs":14}],14:[function(require,module,exports){
/**
 * The reason for everything inlined is that the function has to have a
 * single body to be `eval`ed in electron context
 *
 * @param  {String}                fontFamily
 * @param  {Array.<Number>|Number} fontSizes
 * @param  {Boolean}               detailed  More details about measurements
 * @return {Object}
 */
module.exports = function measureGlyphs(fontFamily, fontSizes, detailed) {

  /**
   * @param  {Number}  size
   * @param  {Boolean} details
   * @param  {...els}  SVGElement
   * @return {Object}
   */
  function measure (size, details) {
    var combinedWidth = 0;
    var combinedHeight = 0;
    var measurements = [];
    var groups = arguments.length - 2;

    for (var i = 2, len = arguments.length; i < len; i++) {
      var el = arguments[i];
      el.setAttribute('font-size', size);
      var symbols = el.textContent.length;
      var length  = el.getComputedTextLength();
      var bbox    = el.getBBox();

      combinedWidth  += length / symbols;
      combinedHeight += bbox.height;

      if (details) {
        measurements.push({
          length: length,
          width:  bbox.width,
          height: bbox.height,
          n:      symbols,
          avg:    length / symbols
        });
      }
    }

    var res = {
      avg: combinedWidth / groups,
      height: combinedHeight / groups,
      size: size
    };

    if (details) {
      res.measurements = measurements;
    }

    return res;
  }

  /**
   * Generates a significant range of special HTML chars
   * @return {String}
   */
  function getSpecialChars() {
    var chars = '';
    for (var i = 160; i < 256; i++) {
      chars += '&#' + i + ';';
    }
    return chars;
  }


  /**
   * Creates text element of a specific font-family and content
   * inside of the container
   * @inlined
   * @param  {String} text
   * @param  {String} font
   * @param  {String} container
   * @return {SVGElement}
   */
  function createText(text, font, container) {
    var textElement = create('text');
    textElement.setAttribute('font-family', font);

    var textNode = document.createTextNode(text || '');
    textElement.appendChild(textNode);
    container.appendChild(textElement);

    return textElement;
  }

  var SVG_NS = 'http://www.w3.org/2000/svg';

  function create(tag) {
     return document.createElementNS(SVG_NS, tag);
  }


  var svg = create('svg');

  if (typeof fontSizes === 'number') {
    fontSizes = [fontSizes];
  }

  var a = createText('abcdefghijklmnopqrstuvwxyz', fontFamily, svg);
  var A = createText('ABCDEFGHIJKLMNOPQRTSUVWXYZ', fontFamily, svg);
  var n = createText('0123456789',                 fontFamily, svg);
  var s = createText(getSpecialChars(),            fontFamily, svg);

  svg.style.position = 'absolute';
  svg.style.top = svg.style.left = '-9999px';
  document.body.appendChild(svg);

  var values = [];
  for (var i = 0, len = fontSizes.length; i < len; i++) {
    values.push(measure(fontSizes[i], detailed, a, A, n, s));
  }

  svg.parentNode.removeChild(svg);

  return {
    fontFamily: fontFamily,
    values: values
  };
};

},{}],15:[function(require,module,exports){
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

},{"../fonts/arial_helvetica_sans-serif.json":1,"../fonts/georgia_times_serif.json":2,"../fonts/helvetica_arial_sans-serif.json":3,"../fonts/lucida_console_monaco_monospace.json":4,"../fonts/verdana_geneva_sans-serif.json":5,"./bbox":11,"./default_styles":12,"./get_font_data":13,"geojson-project":7,"json-extend":8,"string-hash":9,"transformation-matrix-js":10}]},{},[6]);
