module.exports = function featureCollection () {
  return {
    type: 'FeatureCollection',
    features: Array.prototype.slice.call(arguments)
  };
};
