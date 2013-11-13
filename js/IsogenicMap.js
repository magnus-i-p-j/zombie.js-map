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

  this._onTileFocused = function(){console.log('focus');};
  this._onTileContext = function(){console.log('context');};
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
  canvas.addEventListener('click', this.onMouseClick.bind(this));
  canvas.addEventListener('mouseup', this.onMouseUp.bind(this));
  target.innerHTML = '';
  target.appendChild(canvas);
  this._ige.canvas(canvas, true);
  this._ige.on('texturesLoaded', this._startIsogenic, this); // TODO: something about this
};

/**
 * @param {MouseEvent} evt
 */
IsogenicMap.prototype.onMouseUp = function(evt){
  if(evt.button === 2){
    this.raiseMapEvent(evt, this._onTileContext);
  }
};

/**
 * @param {MouseEvent} evt
 */
IsogenicMap.prototype.onMouseClick = function(evt){
  this.raiseMapEvent(evt, this._onTileFocused);
};

/**
 * @param {MouseEvent} evt
 * @param {function(mapEvent)} callback
 */
IsogenicMap.prototype.raiseMapEvent = function (evt, callback) {
  var point = this._mapManager.mouseToTile();
  callback({
    'tileX': /** @type {number} */ point.x,
    'tileY': /** @type {number} */ point.y,
    'clientX': /** @type {number} */ evt.clientX,
    'clientY': /** @type {number} */ evt.clientY
  });
};


/**
 * @inheritDoc
 */
IsogenicMap.prototype.onTileFocused = function (callback) {
  this._onTileFocused = callback;
};

/**
 * @inheritDoc
 */
IsogenicMap.prototype.onTileContext = function (callback) {
  this._onTileContext = callback;
};

/**
 * @private
 */
IsogenicMap.prototype._startIsogenic = function () {
  var self = this;
  this._ige.start(function (success) {
    if (success) {
      self._createMainScene();
      self._mapManager = new TextureMapManager(self._config, self._textureFromTerrain, self._mainScene);
    }
  });
};

/**
 * @private
 */
IsogenicMap.prototype._createMainScene = function () {
  this._mainScene = new IgeScene2d();
  this._mainScene.id('mainScene');
  this._mainScene.drawBounds(true);

  var vp = new IgeViewport();
  vp.addComponent(IgeMousePanComponent);
  vp.mousePan.enabled(true);
  vp.id('vp');
  vp.autoSize(true);
  vp.scene(this._mainScene);
  vp.mount(this._ige);

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