(function (factory) {
	typeof define === 'function' && define.amd ? define(factory) :
	factory();
}((function () { 'use strict';

	/**
	 * @preserve
	 * GeoJSON -> SVG text renderer
	 *
	 * @license MIT
	 * @copyright 2016 Alexander Milevski <info@w8r.name>
	 */
	module.exports = require('./src/renderer');

})));
