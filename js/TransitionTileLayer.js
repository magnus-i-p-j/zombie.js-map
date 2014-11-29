/**
 * @param {mapConfig} config
 * @param {textureDefinition} definition
 * @implements ITileLayer
 * @constructor
 */
var TransitionTileLayer = function (config, definition, tileVariationStrategy) {
  this._definition = definition;
  this._tileVariationStrategy = tileVariationStrategy;

  this._edgeTextureIndices = [];
  this._vertexTextureIndices = [];

  this._edges = this._createTextureMap(config);
  this._vertices = this._createTextureMap(config);
};

/**
 * @param {mapConfig} config
 * @private
 */
TransitionTileLayer.prototype._createTextureMap = function (config) {
  var textureMap = new IgeTextureMap();
  textureMap.tileWidth(config.tileSize);
  textureMap.tileHeight(config.tileSize);
  textureMap.autoSection(5);
  return textureMap;
};

/**
 * @param {IgeScene2d} scene
 * @param {number} depth
 */
TransitionTileLayer.prototype.mount = function (scene, depth) {
  this._mount(this._edges, depth, scene);
  this._mount(this._vertices, depth, scene);
};


TransitionTileLayer.prototype._mount = function (map, depth, scene) {
  map.depth(depth);
  map.mount(scene);
};

/**
 * @returns {IgePoint}
 */
TransitionTileLayer.prototype.mouseToTile = function () {
  return this._edges.mouseToTile();
};

TransitionTileLayer.prototype.loadTextures = function () {
  var textures = this._definition.textures;
  for(var i=0; i<textures.length; ++i) {
    var texture = new IgeCellSheet(textures[i].uri, 8, 4);
    var edgeTextureIndex = this._edges.addTexture(texture);
    var vertexTextureIndex = this._vertices.addTexture(texture);
    for(var j = textures[i].weight; j > 0; --j) {
      this._edgeTextureIndices.push(edgeTextureIndex);
      this._vertexTextureIndices.push(vertexTextureIndex);
    }
  }
};

/**
 * @param {number} x
 * @param {number} y
 * @param {string} terrain
 * @param {Array.<string>} adjacent
 */
TransitionTileLayer.prototype.drawTile = function (x, y, terrain, adjacent) {
  var name = this._definition.name;
  var zone = this._definition.zone;

  var variationIndex = this._tileVariationStrategy(x, y) % this._edgeTextureIndices.length;

  if (terrain[zone] === name) {
    this._edges.paintTile(x, y, this._edgeTextureIndices[variationIndex], 1);
    this._vertices.clearTile(x, y);
  } else {
    var edgeIndex = 0;
    for (var i = 0; i < 8; i += 2) {
      if (adjacent[i][zone] === name) {
        edgeIndex |= Math.pow(2, i / 2);
      }
    }

    var vertexIndex = 0;
    for (i = 1; i < 8; i += 2) {
      if ((adjacent[i - 1][zone] !== name ) && (adjacent[(i + 1) % 8][zone] !== name) && (adjacent[i][zone] === name)) {
        vertexIndex |= Math.pow(2, (i - 1) / 2);
      }
    }

    if (edgeIndex + vertexIndex) {
      if (edgeIndex) {
        this._edges.paintTile(x, y, this._edgeTextureIndices[variationIndex], edgeIndex + 1);
      } else {
        this._edges.clearTile(x, y);
      }
      if (vertexIndex) {
        this._vertices.paintTile(x, y, this._vertexTextureIndices[variationIndex], vertexIndex + 16);
      } else {
        this._vertices.clearTile(x, y);
      }
    } else {
      this._vertices.clearTile(x, y);
      this._edges.clearTile(x, y);
    }

  }
  this._vertices.cacheForceFrame();
  this._edges.cacheForceFrame();
};