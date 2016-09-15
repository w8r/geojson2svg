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
