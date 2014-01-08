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
  this._tileDrawQueue = [];
  this._ige = new IgeEngine();
  /**
   * @type {Array.<ITileLayer>}
   * @private
   */
  this._layers = this._createTileLayers(textures);

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
 * @inheritDoc
 */
IsogenicMap.prototype.drawTile = function (x, y, terrain, adjacent) {
  if(!this._tileDrawQueue){
     this._tileDrawQueue.push(
       {
         x: x, y:y, terrain: terrain, adjacent: adjacent
       }
     );
  }
  else{
    this._drawTile(x, y, terrain, adjacent);
  }
};

/**
 * @param {number} x
 * @param {number} y
 * @param {string} terrain
 * @param {Array.<string>} adjacent
 * @private
 */
IsogenicMap.prototype._drawTile = function (x, y, terrain, adjacent) {
  for(var i=0; i<this._layers.length; ++i){
    this._layers[i].drawTile(x, -y, terrain, adjacent);
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
  var point = this._layers[0].mouseToTile();
  console.log(point);
  if(this.vp){
    console.log(this.vp.mousePosWorld());
  }
  callback({
    'tileX': /** @type {number} */ point.x,
    'tileY': -1 * /** @type {number} */ point.y,
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
      for(var i=0; i<self._layers.length; ++i){
        self._layers[i].mount(self._mainScene, i * 10);
      }
      for(i=0; i<self._tileDrawQueue.length; ++i){
        self._drawTile(
          self._tileDrawQueue[i].x,
          self._tileDrawQueue[i].y,
          self._tileDrawQueue[i].terrain,
          self._tileDrawQueue[i].adjacent);
      }
      self._tileDrawQueue = false;
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
 * @returns {Array.<ITileLayer>}
 * @private
 */
IsogenicMap.prototype._createTileLayers = function (textures) {
  var result = [];
  for (var i=0; i<textures.length; ++i) {
    var layer = null;
    if(textures[i].type === 'single' ){
      layer = new SingleTileLayer(this._config, textures[i]);
    }else if(textures[i].type === 'transition' ){
      layer = new TransitionTileLayer(this._config, textures[i]);
    }
    else{
      throw 'Unknown texture type.';
    }
    layer.loadTextures();
    result.push(layer);
  }
  return result;
};