/**
 * @param {textureDefinition} definition
 * @constructor
 */
var TileLayer = function(definition){
  this._definition = definition;
  this._texture = null;
};

TileLayer.prototype.loadTextures = function () {
  if (this._definition.type === "transition") {
    this._texture = new IgeCellSheet(texture.uri, 8, 4);
  } else if (this._definition.type === "single") {
    this._texture = new IgeTexture(texture.uri);
  }
};
