/**
 * @implements IMap
 * @param {mapConfig} config
 * @param {Array.<textureDefinition>} textures
 * @constructor
 */
var IsogenicMap = function (config, textures) {
  this._setDefaults(config);
  this._config = config;
  this._mainScene = null;
  this._mapManager = null;
  this._tileDrawQueue = [];
  this._ige = new IgeEngine();
  this._textures = this._loadTextures(textures);

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
  if(!this._mapManager){
     this._tileDrawQueue.push(
       {
         x: x, y:y, terrain: terrain
       }
     );
  }
  else{
    this._mapManager.drawTile(x, y, terrain);
  }
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
  this._ige.on('texturesLoaded', this._startIsogenic, this);
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
  console.log(point);
  if(this.vp){
    console.log(this.vp.mousePosWorld());
  }
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
      self._mapManager = new TextureMapManager(self._config, self._textures, self._mainScene);
      for(var i=0; i<self._tileDrawQueue.length; ++i){
        self._mapManager.drawTile(
          self._tileDrawQueue[i].x,
          self._tileDrawQueue[i].y,
          self._tileDrawQueue[i].terrain);
      }
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

  this.vp = new IgeViewport();
  var vp = this.vp;
  vp.addComponent(IgeMousePanComponent);
  vp.mousePan.enabled(true);
  vp.id('vp');
  vp.autoSize(true);
  vp.scene(this._mainScene);
  vp.mount(this._ige);

};

/**
 * @param {Array.<textureDefinition>} textures
 * @returns {Array.<igeTextureDefinition>}
 * @private
 */
IsogenicMap.prototype._loadTextures = function (textures) {
  var result = [];
  for (var i=0; i<textures.length; ++i) {
    var texture = /** @type{igeTextureDefinition} */ textures[i];
    if(texture.transitional){
      texture.igeTexture = new IgeCellSheet(texture.uri, 17, 2);
    }else{
      texture.igeTexture = new IgeTexture(texture.uri);
    }
    result.push(texture);
  }
  return result;
};