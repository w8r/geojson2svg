const FILL    = '#000000';
const COLOR   = '#333333';
const WEIGHT  = 0.25;
const OPACITY = 0.75;


const Styles = {

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

export default Styles;
