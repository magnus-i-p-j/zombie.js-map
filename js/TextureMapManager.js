/**
 * @param {mapConfig} config
 * @param {Object.<string,IgeTexture>} textureFromTerrain
 * @param {IgeScene2d} mainScene
 * @constructor
 */
var TextureMapManager = function (config, textureFromTerrain, mainScene) {
  this._config = config;
  this._background = this._createTextureMap(this._config, mainScene);

  this._backgroundIndexFromTerrain = this._initTextures(this._background, textureFromTerrain);
};

/**
 * @param {IgeTextureMap} textureMap
 * @param {Object.<string,IgeTexture>} textureFromTerrain
 * @returns {Object.<string, number>}
 * @private
 */
TextureMapManager.prototype._initTextures = function (textureMap, textureFromTerrain) {
  var ret = {};
  for (var terrain in textureFromTerrain) {
    if (textureFromTerrain.hasOwnProperty(terrain)) {
      ret[terrain] = textureMap.addTexture(textureFromTerrain[terrain]);
    }
  }
  return ret;
};

TextureMapManager.prototype._createTextureMap = function (config, mainScene) {
  var textureMap = new IgeTextureMap();
  textureMap.depth(0);
  textureMap.tileWidth(config.tileSize);
  textureMap.tileHeight(config.tileSize);
  textureMap.autoSection(5);
  textureMap.mount(mainScene);
  return textureMap;
};

/**
 * @param {number} x
 * @param {number} y
 * @param {string} terrain
 */
TextureMapManager.prototype.drawTile = function (x, y, terrain) {
  var texIndex = this._backgroundIndexFromTerrain[terrain];
  this._background.cacheForceFrame();
  this._background.paintTile(x, y, texIndex, 1);

};
