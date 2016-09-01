var FILL    = '#000000';
var WEIGHT  = 1;
var OPACITY = 0.75;


var Styles = {

  'Polygon': {
    stroke: 1,
    color: '#333333',
    opacity: OPACITY
  },

  LineString: {
    stroke: 1,
    color: '#333333',
    opacity: OPACITY
  },

  Point: {
    radius: 3,
    color: '#333333'
  }
};


Styles.MultiPolygon    = Styles.Polygon;
Styles.MultiLineString = Styles.LineString;
Styles.MultiPoint      = Styles.Point;

module.exports = Styles;
