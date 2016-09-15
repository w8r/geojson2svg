var Point = require('./point');

function Symbol (props, geometry) {
  Point.call(this, props, geometry);
  this
    .setProperty('type', 'symbol')
    .setProperty('rotation', 0)
    .setProperty('scale', 1);
}
Symbol.prototype = Object.create(Point.prototype);

Symbol.prototype.addIcon = function () {
  return this.setProperty('src', '<svg width="200" height="200" viewBox="448.98045206828 282.02753516689 9.000837604508 6.001465988832" xmlns="http://www.w3.org/2000/svg"><g stroke-linecap="round" stroke="#000" stroke-width=".25" fill="#000000"><path d="M453.48 285.028l-3.499-2v4l7-3.999v4z"/><path d="M453.481 283.028v4" /></g></svg>');
};

module.exports = Symbol;
