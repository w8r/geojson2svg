var _next_gauss;

/**
 * Gaussian distribution. `mu` is the mean, and `sigma` is the standard
 * deviation. Notes:
 * uses the "polar method" we generate pairs; keep one in a cache for next time
 * @param {Number} mu
 * @param {Number} sigma
 */
function gauss(mu, sigma) {
  var s, u, v, w, z;
  if (mu == null) {
    mu = 0;
  }
  if (sigma == null) {
    sigma = 1;
  }
  if ((z = _next_gauss) != null) {
    _next_gauss = null;
  } else {
    while (!(s && s < 1)) {
      u = 2 * Math.random() - 1;
      v = 2 * Math.random() - 1;
      s = u * u + v * v;
    }
    w = Math.sqrt((-2 * Math.log(s)) / s);
    z = u * w;
    _next_gauss = v * w;
  }
  return mu + z * sigma;
}

/**
 * Start with the centre of the polygon at ctrX, ctrY,
 * then creates the polygon by sampling points on a circle around the centre.
 * Randon noise is added by varying the angular spacing between sequential points,
 * and by varying the radial distance of each point from the centre.
 *
 * @param {Number} ctrX, ctrY coordinates of the "centre" of the polygon
 * @param {Number} aveRadius in px, the average radius of this polygon,
 *                           this roughly controls how large the polygon is,
 *                           really only useful for order of magnitude.
 * @param {Number} irregularity [0,1] indicating how much variance there is
 *                              in the angular spacing of vertices.
 *                              [0,1] will map to [0, 2pi/numberOfVerts]
 * @param {Number} spikeyness [0,1] indicating how much variance there is
 *                            in each vertex from the circle of radius
 *                            aveRadius. [0,1] will map to [0, aveRadius]
 * @param {Number} numVerts self-explanatory
 *
 * @return {Array.<Array<Number>>} list of vertices, in CCW order.
 */
export function generatePolygon(
  ctrX,
  ctrY,
  aveRadius,
  irregularity,
  spikeyness,
  numVerts
) {
  var PIx2 = 2 * Math.PI;
  irregularity = (clamp(irregularity, 0, 1) * PIx2) / numVerts;
  spikeyness = clamp(spikeyness, 0, 1) * aveRadius;

  var i;

  // generate n angle steps
  var angleSteps = [];
  var lower = PIx2 / numVerts - irregularity;
  var upper = PIx2 / numVerts + irregularity;
  var sum = 0;
  for (var i = 0; i < numVerts; i++) {
    var tmp = lower + (upper - lower) * Math.random();
    angleSteps.push(tmp);
    sum = sum + tmp;
  }

  // normalize the steps so that point 0 and point n+1 are the same
  var k = sum / PIx2;
  for (i = 0; i < numVerts; i++) {
    angleSteps[i] /= k;
  }

  // now generate the points
  var points = [];
  var angle = PIx2 * Math.random();

  for (i = 0; i < numVerts; i++) {
    var r_i = clamp(gauss(aveRadius, spikeyness), 0, 2 * aveRadius);
    var x = ctrX + r_i * Math.cos(angle);
    var y = ctrY + r_i * Math.sin(angle);
    points.push([x, y]);
    angle += angleSteps[i];
  }

  return points;
}

/**
 * @param  {Number} x   [description]
 * @param  {Number} min [description]
 * @param  {Number} max [description]
 * @return {Number}     [description]
 */
function clamp(x, min, max) {
  if (min > max) return x;
  else if (x < min) return min;
  else if (x > max) return max;
  else return x;
}
