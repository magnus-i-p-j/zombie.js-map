/**
 * @typedef:{{
 *  tileX: number,
 *  tileY: number,
 *  clientX: number,
 *  clientY: number
 * }}
 */
var mapEvent;

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
 * @param {string} terrain
 * @param {Array.<string>} adjacent
 */
IMap.prototype.drawTile = function (x, y, terrain, adjacent) {};

/**
 * @param {function(mapEvent)} callback
 */
IMap.prototype.onTileFocused = function(callback) {};

/**
 * @param {function(mapEvent)} callback
 */
IMap.prototype.onTileContext = function(callback) {};