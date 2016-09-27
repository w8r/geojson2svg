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
