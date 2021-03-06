var Polygon = require('./polygon');

function Textbox(props, geometry) {
  Polygon.call(this, props, geometry);
  this.setProperty('type', 'textbox');
}
Textbox.prototype = Object.create(Polygon.prototype);

Textbox.prototype.asPoint = function (center) {
  center = center || [20, 20];
  this.setProperty('radius', 30);
  this.geometry({
    type: 'Point',
    coordinates: center
  });
  return this;
};

Textbox.prototype.randomGeometry = function (center, R) {
  center = center || [20, 20];
  R = R || 50;

  var coords = [
    [center[0] - R, center[1] - R],
    [center[0] + R, center[1] - R],
    [center[0] + R, center[1] + R],
    [center[0] - R, center[1] + R],
    [center[0] - R, center[1] - R]
  ];

  this.geometry({
    type: 'Polygon',
    coordinates: [coords]
  });

  return this;
};

module.exports = Textbox;
