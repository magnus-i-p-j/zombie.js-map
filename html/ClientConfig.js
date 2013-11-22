var igeClientConfig = {
  include: [
    '../js/IsogenicMap.js',
    '../js/TextureMapManager.js',
    '../js/testMap.js',
    '../js/TextureMap.js'
  ]
};

if (typeof(module) !== 'undefined' && typeof(module.exports) !== 'undefined') {
  module.exports = igeClientConfig;
}