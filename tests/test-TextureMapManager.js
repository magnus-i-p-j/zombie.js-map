TestCase("test TextureMapManager", {
  'setUp': function () {
    var textures = [
      {
        type: 'water',
        uri: '../img/water.png',
        transitional: false,
        precedence: 0,
        igeTexture: {
          _loaded: true
        }
      },
      {
        type: 'grass',
        uri: '../img/grass.png',
        transitional: true,
        precedence: 1,
        igeTexture: {
          _loaded: true
        }
      }
    ];

    this.manager = new TextureMapManager({}, textures, {});
    this.manager.drawTile(0, 0, 'water');
    this.manager.drawTile(-1, 1, 'water');
    this.manager.drawTile(0, 1, 'grass');
    this.manager.drawTile(1, 1, 'grass');
    this.manager.drawTile(1, 0, 'grass');
    this.manager.drawTile(-1, 0, 'water');
    this.manager.drawTile(-1, -1, 'grass');
    this.manager.drawTile(0, -1, 'water');
    this.manager.drawTile(1, -1, 'water');
  },
  'test Should get edge and corner transitions for a tile': function () {
    var expected = {
      edges:
        {
          grass: 6
        }
      ,
      vertices:
        {
          grass: 8
        }
    };
    var actual = this.manager._getTransitions(0,0);
    assertEquals(expected, actual);
  }
});
