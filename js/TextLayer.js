/**
 * @param {mapConfig} config
 * @constructor
 */
var TextLayer = function (config) {
  this._config = config;
  this._tileMap = new IgeTileMap2d();

  this._tileMap.tileWidth(config.tileSize);
  this._tileMap.tileHeight(config.tileSize);

  this._fontEntityCache = [];
};

/**
 * @param {IgeScene2d} scene
 * @param {number} depth
 */
TextLayer.prototype.mount = function (scene, depth) {
  this._mount(this._tileMap, depth, scene);
};


TextLayer.prototype._mount = function (map, depth, scene) {
  map.depth(depth * 10);
  map.mount(scene);

  this._depth = depth;
  this._scene = scene;
};

/**
 * @param {number} x
 * @param {number} y
 * @param {Array.<string>} text
 */
TextLayer.prototype.drawText = function (x, y, text) {
  var lines = "";
  for (var i = 0; i < text.length; i++) {
    lines += text[i] + "\n";
  }
  var fontEntity = this._getTextEntity(x, y);
  fontEntity.text(lines);
  return fontEntity;
};

TextLayer.prototype._getTextEntity = function(x, y) {
  if(!this._fontEntityCache[x]) {
    this._fontEntityCache[x] = [];
  }
  var fontEntity = this._fontEntityCache[x][y];
  if(!fontEntity) {
    fontEntity = new IgeFontEntity()
      .depth(this._depth * 10)
      .width(config.tileSize * 0.98)
      .height(config.tileSize * 0.98)
      .textAlignX(0)
      .textAlignY(0)
      .colorOverlay('#ffffff')
      .nativeFont('8pt Arial')
      .textLineSpacing(1)
      .mount(this._tileMap)
      .translateToTile(x, -1 * y);
    this._fontEntityCache[x][y] = fontEntity;
  }
  return fontEntity;
};
