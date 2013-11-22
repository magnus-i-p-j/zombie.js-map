/**
 * @param {mapConfig} config
 * @param {Array.<igeTextureDefinition>} textures
 * @param {IgeScene2d} scene
 * @constructor
 */
var TextureMapManager = function (config, textures, scene) {
  this._config = config;
  this._textures = textures;
  this._textureMaps = [];

  this._background = this._createTextureMap(config, textures, scene);
  this._transitions = this._createTextureMap(config, textures, scene);
};

/**
 * @param {mapConfig} config
 * @param {Array.<igeTextureDefinition>} textures
 * @param {IgeScene2d} scene
 * @returns {TextureMap}
 * @private
 */
TextureMapManager.prototype._createTextureMap = function (config, textures, scene) {
  var textureMap  = new TextureMap(config, textures);
  textureMap.mount(scene);
  this._textureMaps.push(textureMap);
  return textureMap;
};

/**
 * @param {number} x
 * @param {number} y
 * @param {string} terrain
 */
TextureMapManager.prototype.drawTile = function (x, y, terrain) {
  this._background.drawTile(x, y, terrain);
};

/**
 * @param {number} x
 * @param {number} y
 * @private
 */
TextureMapManager.prototype._getTransitions = function (x, y) {

};

/**
 * @returns {IgePoint}
 */
TextureMapManager.prototype.mouseToTile = function(){
  return this._background.mouseToTile();
};
