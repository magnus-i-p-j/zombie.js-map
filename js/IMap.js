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
 */
IMap.prototype.drawTile = function (x, y, terrain) {};

//TODO: Events