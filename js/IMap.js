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

/**
 * @param {string} terrain
 * @param {string} uri
 */
IMap.prototype.addTexture = function (terrain, uri) {};

//TODO: Events