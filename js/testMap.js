var config = {};
var terrainUris = {
  'grass': '../img/grassTile01.jpg'
};

var map = new IsogenicMap(config, terrainUris);

map.claim('target');

var drawtilea = function () {
  console.log('map.drawTile');
  map.drawTile(0, 0, 'grass');
};

