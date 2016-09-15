var FILL    = '#000000';
var COLOR   = '#333333';
var WEIGHT  = 1;
var OPACITY = 0.75;


var Styles = {

  'Polygon': {
    stroke: WEIGHT,
    color: COLOR,
    opacity: OPACITY
  },

  'LineString': {
    stroke: WEIGHT,
    color: COLOR,
    opacity: OPACITY
  },

  'Point': {
    radius: 3,
    stroke: WEIGHT,
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
