/**
 * @param {mapConfig} config
 * @param {textureDefinition} definition
 * @implements ITileLayer
 * @constructor
 */
var SingleTileLayer = function (config, definition) {
  this._definition = definition;
  this._texture = null;
  this._index = null;
  this._textureMap = new IgeTextureMap();

  this._textureMap.tileWidth(config.tileSize);
  this._textureMap.tileHeight(config.tileSize);
  this._textureMap.autoSection(5);
};

/**
 * @param {IgeScene2d} scene
 * @param {number} depth
 */
SingleTileLayer.prototype.mount = function (scene, depth) {
  this._textureMap.depth(depth);
  this._textureMap.mount(scene);
};

/**
 * @returns {IgePoint}
 */
SingleTileLayer.prototype.mouseToTile = function () {
  return this._textureMap.mouseToTile();
};

SingleTileLayer.prototype.loadTextures = function () {
  this._texture = new IgeTexture( this._definition.uri);
  this._index = this._textureMap.addTexture(this._texture);
};

/**
 * @param {number} x
 * @param {number} y
 * @param {string} terrain,
 * @param {Array.<string>} adjacent
 */
SingleTileLayer.prototype.drawTile = function (x, y, terrain, adjacent) {
  if (terrain === this._definition.name) {
    this._textureMap.paintTile(x, y, this._index, 1);
  } else {
    this._textureMap.clearTile(x, y);
  }
  this._textureMap.cacheForceFrame();
};
