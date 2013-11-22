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
  this._textureIndexFromTerrain = {};
  this._terrainFromTextureIndex = [];
  this._initTextures(textures);
};

/**
 * @param {Array.<igeTextureDefinition>} textures
 * @returns {Object.<string, number>}
 * @private
 */
TextureMap.prototype._initTextures = function (textures) {
  for (var i=0; i < textures.length; ++i) {
    var index = this._textureMap.addTexture(textures[i].igeTexture);
    this._textureIndexFromTerrain[textures[i].type] = index;
    this._terrainFromTextureIndex[index] = textures[i];
  }

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
 * @return {igeTextureDefinition}
 */
TextureMap.prototype.getTexture = function(x, y){
  var index = this._textureMap.tileTextureIndex(x, y);
  return this._terrainFromTextureIndex[index];
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
