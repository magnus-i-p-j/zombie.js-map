/**
 * @implements IMap
 * @param {mapConfig} config
 * @param {textureMap} terrainUris
 * @constructor
 */
var IsogenicMap = function (config, terrainUris) {
  this._setDefaults(config);
  this._config = config;
  this._mainScene = null;
  this._mapManager = null;
  this._ige = new IgeEngine();
  this._textureFromTerrain = this._initTextures(terrainUris);
};

/**
 * @param {mapConfig} config
 * @private
 */
IsogenicMap.prototype._setDefaults = function (config) {
  config.tileSize = config.tileSize || 100;
};

/**
 * @param {number} x
 * @param {number} y
 * @param {string} terrain
 */
IsogenicMap.prototype.drawTile = function (x, y, terrain) {
  this._mapManager.drawTile(x, y, terrain);
};

/**
 * @param {string} elementId
 */
IsogenicMap.prototype.claim = function (elementId) {
  var target = document.getElementById(elementId);
  var canvas = document.createElement('canvas');
  target.innerHTML = '';
  target.appendChild(canvas);
  this._ige.canvas(canvas, true);
  this._ige.on('texturesLoaded', this.startIsogenic, this); // TODO: something about this
};

IsogenicMap.prototype.startIsogenic = function () {
  this._ige.start(function (success) {
    if (success) {
      console.log('success');
      this._createMainScene();
      this._mapManager = new TextureMapManager(this._config, this._textureFromTerrain, this._mainScene);
    }
  }, this);
};

IsogenicMap.prototype._createMainScene = function () {
  this._mainScene = new IgeScene2d();
  this._mainScene.id('mainScene');
  this._mainScene.drawBounds(false);

  var vp = new IgeViewport();
  vp.addComponent(IgeMousePanComponent);
  vp.mousePan.enabled(true);
  vp.id('vp');
  vp.autoSize(true);
  vp.scene(this._mainScene);
  vp.mount(ige);
};

/**
 * @param terrainUris
 * @returns {{}}
 * @private
 */
IsogenicMap.prototype._initTextures = function (terrainUris) {
  var ret = {};
  for (var index in terrainUris) {
    if (terrainUris.hasOwnProperty(index)) {
      ret[index] = new IgeTexture(terrainUris[index]);
    }
  }
  return ret;
};