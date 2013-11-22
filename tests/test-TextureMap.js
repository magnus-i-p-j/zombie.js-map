TestCase("test TextureMap", {
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
        transitional: false,
        precedence: 1,
        igeTexture: {
          _loaded: true
        }
      }
    ];

    this.map = new TextureMap({}, textures);
    this.map.drawTile(0, 0, 'water');
    this.map.drawTile(1, -1, 'grass');
  },
  'test Should get igeTextureDefinition for tile': function () {
    var expected = {
      type: 'water',
      uri: '../img/water.png',
      transitional: false,
      precedence: 0,
      igeTexture: {
        _loaded: true
      }
    };
    var actual = this.map.getTexture(0,0);
    assertEquals(expected, actual);
  }
});
