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
 */
ITileLayer.prototype.drawTile = function (x, y, terrain) {};

/**
 * @param {IgeScene2d} scene
 * @param {number} depth
 */
ITileLayer.prototype.mount = function(scene, depth){};

/**
 * @returns {IgePoint}
 */
ITileLayer.prototype.mouseToTile = function(){};