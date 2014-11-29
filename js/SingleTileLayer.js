/**
 * @param {mapConfig} config
 * @param {textureDefinition} definition
 * @implements ITileLayer
 * @constructor
 */
var SingleTileLayer = function (config, definition, tileVariationStrategy) {
  /**
   * @type {textureDefinition}
   * @private
   */
  this._definition = definition;

  this._tileVariationStrategy = tileVariationStrategy;

  this._textureIndices = [];
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
  var textures = this._definition.textures;
  for(var i=0; i<textures.length; ++i) {
    var texture = new IgeTexture(textures[i].uri);
    var index = this._textureMap.addTexture(texture);
    for(var j = textures[i].weight; j > 0; --j) {
      this._textureIndices.push(index);
    }
  }
};

/**
 * @param {number} x
 * @param {number} y
 * @param {terrain} terrain
 * @param {Array.<terrain>} adjacent
 */
SingleTileLayer.prototype.drawTile = function (x, y, terrain, adjacent) {
  if (terrain[this._definition.zone] === this._definition.name) {
    var index = this._tileVariationStrategy(x, y) % this._textureIndices.length;
    this._textureMap.paintTile(x, y, this._textureIndices[index], 1);

  } else {
    this._textureMap.clearTile(x, y);
  }
  this._textureMap.cacheForceFrame();
};
