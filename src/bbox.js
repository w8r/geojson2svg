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
