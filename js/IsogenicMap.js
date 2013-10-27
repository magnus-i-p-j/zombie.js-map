var IsogenicMap = function (elementId,textures) {
  var ige = new IgeEngine();
//  ige.showStats(1);

  var grass = new IgeTexture('../img/grassTile01.jpg');

  var target = document.getElementById(elementId);
  var canvas = document.createElement('canvas');
  target.innerHTML = '';
  target.appendChild(canvas);

  var startIsogenicMap = function () {
    ige.canvas(canvas, true);

    ige.start(function (success) {
      if (success) {
        var mainScene = new IgeScene2d();
        mainScene.id('mainScene');
        mainScene.drawBounds(true);

        // Create the main viewport
        var vp = new IgeViewport();
        vp.addComponent(IgeMousePanComponent);
        vp.addComponent(IgeMouseZoomComponent);
        vp.mousePan.enabled(true);
        vp.id('vp');
        vp.autoSize(true);
        vp.scene(mainScene);
        vp.mount(ige);

        // Create the texture maps
        var textureMap = new IgeTextureMap();
        textureMap.depth(0);
        textureMap.tileWidth(100);
        textureMap.tileHeight(100);

        textureMap.autoSection(5);
        textureMap.mount(mainScene);

        var grassIdx = textureMap.addTexture(grass);

        textureMap.paintTile(0, 0, grassIdx, 0);
//        textureMap.paintTile(1, 2, grassIdx, 0);
//        textureMap.paintTile(6, 2, grassIdx, 0);
//        textureMap.paintTile(3, 2, grassIdx, 0);
//        textureMap.paintTile(4, 2, grassIdx, 0);

      }
    });
  };

  ige.on('texturesLoaded', startIsogenicMap);
};