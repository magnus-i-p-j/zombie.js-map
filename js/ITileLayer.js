/**
 * @param {textureDefinition} definition
 * @interface
 */
var ITileLayer = function(definition){};

ITileLayer.prototype.loadTextures = function () {};

/**
 * @param {number} x
 * @param {number} y
 * @param {string} terrain
 * @param {Array.<string>} adjacent
 * @param {number} tileVariation
 */
ITileLayer.prototype.drawTile = function (x, y, terrain, adjacent, tileVariation) {};

/**
 * @param {IgeScene2d} scene
 * @param {number} depth
 */
ITileLayer.prototype.mount = function(scene, depth){};

/**
 * @returns {IgePoint}
 */
ITileLayer.prototype.mouseToTile = function(){};