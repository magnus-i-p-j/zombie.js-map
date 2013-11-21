var config = {};
var textures = [
  {
    type: 'water',
    uri: '../img/water.png',
    transitional: false,
    precedence: 0
  },
  {
    type: 'grass',
    uri: '../img/grass.png',
    transitional: false,
    precedence: 1
  }
];

var map = new IsogenicMap(/** @type {mapConfig} */ config, /** @type {textureMap} */ textures);

map.claim('target');

var drawATile = function () {
  console.log('map.drawTile');
  map.drawTile(0, 0, 'grass');
};

map.drawTile(-1, 1, 'water');
map.drawTile(0, 1, 'water');
map.drawTile(1, 1, 'water');
map.drawTile(1, 0, 'water');
map.drawTile(-1, 0, 'water');
map.drawTile(-1, -1, 'water');
map.drawTile(0, -1, 'water');
map.drawTile(1, -1, 'water');





