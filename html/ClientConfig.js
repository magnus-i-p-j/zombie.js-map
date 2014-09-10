var igeClientConfig = {
  include: [
    '../js/IsogenicMap.js',
    '../js/SingleTileLayer.js',
    '../js/TransitionTileLayer.js',
    '../js/TextLayer.js',
    '../js/testMap.js'
  ]
};

if (typeof(module) !== 'undefined' && typeof(module.exports) !== 'undefined') {
  module.exports = igeClientConfig;
}