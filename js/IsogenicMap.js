/**
 * @implements IMap
 * @param {mapConfig} config
 * @constructor
 */
var IsogenicMap = function (config) {
    this.setDefaults(config);
    this._config = config;
    /**
     * @type {IsogenicEngineFacade}
     * @private
     */
    this._facade = null;
};

/**
 * @param {mapConfig} config
 */
IsogenicMap.prototype.setDefaults = function (config) {
    config.tileSize = config.tileSize || 100;
};

/**
 * @param  {string} terrain
 * @param  {string} uri
 */
IsogenicMap.prototype.addTexture = function (terrain, uri) {

};

/**
 * @param {number} x
 * @param {number} y
 * @param {string} terrain
 */
IsogenicMap.prototype.drawTile = function (x, y, terrain) {

};

/**
 * @param {string} elementId
 */
IsogenicMap.prototype.claim = function (elementId) {
    var target = document.getElementById(elementId);
    var canvas = document.createElement('canvas');
    target.innerHTML = '';
    target.appendChild(canvas);
    this._facade = new IsogenicEngineFacade(canvas, this.config);
};