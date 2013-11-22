/**
 * @constructor
 * @param {mapConfig} config
 * @param {Array.<igeTextureDefinition>} textures
 */
var TextureMap = function(config, textures){
  this._textureMap = new IgeTextureMap();
  this._textureMap.depth(0);
  this._textureMap.tileWidth(config.tileSize);
  this._textureMap.tileHeight(config.tileSize);
  this._textureMap.autoSection(5);
  this._textureIndexFromTerrain = this._initTextures(textures);
};

/**
 * @param {Array.<igeTextureDefinition>} textures
 * @returns {Object.<string, number>}
 * @private
 */
TextureMap.prototype._initTextures = function (textures) {
  var result = {};
  for (var i=0; i < textures.length; ++i) {
     result[textures[i].type] = this._textureMap.addTexture(textures[i].igeTexture);
  }
  return result;
};

/**
 * @param {IgeScene2d} scene
 */
TextureMap.prototype.mount = function(scene){
  this._textureMap.mount(scene);
};

/**
 * @returns {IgePoint}
 */
TextureMap.prototype.mouseToTile = function(){
  return this._textureMap.mouseToTile();
};

/**
 * @param {number} x
 * @param {number} y
 * @param {string} terrain
 */
TextureMap.prototype.drawTile = function (x, y, terrain) {
  var texIndex = this._textureIndexFromTerrain[terrain];
  this._textureMap.cacheForceFrame();
  this._textureMap.paintTile(x, y, texIndex, 1);
};
