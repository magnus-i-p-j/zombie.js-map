/**
 * @param {mapConfig} config
 * @param {Array.<igeTextureDefinition>} textures
 * @param {IgeScene2d} scene
 * @constructor
 */
var TextureMapManager = function (config, textures, scene) {
  this._config = config;
  this._textures = textures;
  this._textureMaps = [];

  this._background = this._createTextureMap(config, textures, scene, 10);
  this._edgeTransitions = this._createTextureMap(config, textures, scene, 11);
  this._vertexTransitions = this._createTextureMap(config, textures, scene, 11);
};

/**
 * @param {mapConfig} config
 * @param {Array.<igeTextureDefinition>} textures
 * @param {IgeScene2d} scene
 * @returns {TextureMap}
 * @private
 */
TextureMapManager.prototype._createTextureMap = function (config, textures, scene, depth) {
  var textureMap = new TextureMap(config, textures, depth);
  textureMap.mount(scene);
  this._textureMaps.push(textureMap);
  return textureMap;
};

/**
 * @param {number} x
 * @param {number} y
 * @param {string} terrain
 */
TextureMapManager.prototype.drawTile = function (x, y, terrain) {
  this._background.drawTile(x, y, terrain);
  for (var i = x - 1; i <= x + 1; ++i) {
    for (var j = y + 1; j >= y - 1; --j) {
      if(this._background.getTexture(i, j)){
        this._drawTransitions(i, j);
      }
    }
  }
};

TextureMapManager.prototype._drawTransitions = function (x, y) {
  var transitions = this._getTransitions(x, y);
  for(var edgeTransition in transitions.edges){
    if(transitions.edges.hasOwnProperty(edgeTransition)){
      var edge = transitions.edges[edgeTransition];
      if(edge > 0){
        //var background = this._background.getTexture(neighbour.x, neighbour.y);
        //this._background.drawTile(x, y, background);
        this._edgeTransitions.drawTile(x, y, edgeTransition, edge + 2);
      }
    }
  }
  for(var vertexTransition in transitions.vertices){
    if(transitions.vertices.hasOwnProperty(vertexTransition)){
      var vertex = transitions.vertices[vertexTransition];
      if(vertex > 0){
        this._vertexTransitions.drawTile(x, y, vertexTransition, vertex + 19);
      }
    }
  }
};

/**
 * @param {number} x
 * @param {number} y
 * @return {{
 *  edges: Object.<string, number>,
 *  vertices: Object.<string, number>
 * }}
 * @private
 */
TextureMapManager.prototype._getTransitions = function (x, y) {
  var transitions = {};
  var X = 1; // [0001]
  var Y = 2; // [0010]
  var W = 4; // [0100]
  var Z = 8; // [1000]
  var centerTexture = this._background.getTexture(x, y);

  var edgeNeighbours = [
    {x: x - 1, y: y, index: X},
    {x: x, y: y - 1, index: Y},
    {x: x + 1, y: y, index: W},
    {x: x, y: y + 1, index: Z}
  ];
  transitions.edges = this._getNeighbourTransitionIndices(centerTexture, edgeNeighbours);

  var vertexNeighbours = [
    {x: x - 1, y: y - 1, index: X},
    {x: x + 1, y: y - 1, index: Y},
    {x: x + 1, y: y + 1, index: W},
    {x: x - 1, y: y + 1, index: Z}
  ];
  transitions.vertices = this._getNeighbourTransitionIndices(centerTexture, vertexNeighbours);

  var vertexFilter = [
    {edge: X, mask: 6},
    {edge: Y, mask: 12},
    {edge: W, mask: 9},
    {edge: Z, mask: 3}
  ];
  this._filterVertexTransitions(vertexFilter, transitions);

  return transitions;
};

/**
 * @param {igeTextureDefinition} centerTexture
 * @param {Array.<{
 *  x: number,
 *  y: number,
 *  mask: number
 * }>} neighbours
 * @return {Object.<string, number>}
 * @private
 */
TextureMapManager.prototype._getNeighbourTransitionIndices = function (centerTexture, neighbours) {
  var transitions = {};
  for (var i = 0; i < neighbours.length; ++i) {
    var neighbour = neighbours[i];
    var neighbourTexture = this._background.getTexture(neighbour.x, neighbour.y);
    if (neighbourTexture && neighbourTexture.transitional && neighbourTexture.precedence > centerTexture.precedence) {
      if (!transitions.hasOwnProperty(neighbourTexture.type)) {
        transitions[neighbourTexture.type] = 0;
      }
      transitions[neighbourTexture.type] |= neighbours[i].index;
    }
  }
  return transitions;
};

/**
 * @param {Array.<{edge: number, mask: number}>} vertexFilter
 * @param {{
 *  edges: Object.<string, number>,
 *  vertices: Object.<string, number>
 * }} transitions
 * @returns {{
 *  edges: Object.<string, number>,
 *  vertices: Object.<string, number>
 * }}
 * @private
 */
TextureMapManager.prototype._filterVertexTransitions = function (vertexFilter, transitions) {
  for (var type in transitions.edges) {
    if (transitions.edges.hasOwnProperty(type)) {
      var vertices = transitions.vertices[type];
      if (vertices) {
        var edge = transitions.edges[type];
        transitions.vertices[type] &= this._getVertexMask(vertexFilter, edge);
      }
    }
  }
};

TextureMapManager.prototype._getVertexMask = function (vertexFilter, edge) {
  var vertexMask = 15; //[1111]
  for (var prop in vertexFilter) {
    if (vertexFilter.hasOwnProperty(prop)) {
      var filter = vertexFilter[prop];
      if (filter.edge & edge) {
        vertexMask &= filter.mask;
      }
    }
  }
  return vertexMask;
};


/**
 * @returns {IgePoint}
 */
TextureMapManager.prototype.mouseToTile = function () {
  return this._background.mouseToTile();
};
