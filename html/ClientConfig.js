var igeClientConfig = {
  include: [
    '../js/IsogenicMap.js',
    '../js/TextureMapManager.js',
    '../js/testMap.js'
  ]
};

if (typeof(module) !== 'undefined' && typeof(module.exports) !== 'undefined') {
  module.exports = igeClientConfig;
}