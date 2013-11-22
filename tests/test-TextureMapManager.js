TestCase("test TextureMapManager", {
  'setUp': function () {
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

    this.manager = new TextureMapManager({}, {}, {});
  },
  'test Should get edge and corner transitions for a tile': function () {
    var expected = {
      edges: [
        {
          grass: 6
        }
      ],
      vertices: [
        {
          grass: 8
        }
      ]
    };
    var actual = this.manager._getTransitions(0,0);
    assertSame(expected, actual);
  }
});
