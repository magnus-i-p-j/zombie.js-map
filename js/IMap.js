/**
 * @typedef{{
 *  tileX: number,
 *  tileY: number,
 *  clientX: number,
 *  clientY: number
 * }}
 */
var mapEvent;

/**
 * @typedef{Object.<string, string>}
 */
var terrain;

/**
 * @interface
 */
var IMap = function () {
};

/**
 * @param {string} elementId
 */
IMap.prototype.claim = function (elementId) {};

/**
 * @param {number} x
 * @param {number} y
 * @param {terrain} terrain
 * @param {Array.<terrain>} adjacent
 */
IMap.prototype.drawTile = function (x, y, terrain, adjacent) {};

/**
 * @param {number} x
 * @param {number} y
 * @param {Array.<string>} text
 */
IMap.prototype.drawText = function (x, y, text) {};

/**
 * @param {function(mapEvent)} callback
 */
IMap.prototype.onTileFocused = function(callback) {};

/**
 * @param {function(mapEvent)} callback
 */
IMap.prototype.onTileContext = function(callback) {};