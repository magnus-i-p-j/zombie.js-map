var IsogenicMap = function (elementId) {
  var ige = new IgeEngine();
  ige.showStats(1);

  var grass = new IgeTexture('../img/grassTile01.jpg');

  var init = function () {
    var target = document.getElementById(elementId);
    var canvas = document.createElement('canvas');
    target.innerHTML = '';
    target.appendChild(canvas);

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
        vp.drawBounds(true);
        vp.mount(ige);

        // Create the texture maps
        var textureMap = new IgeTextureMap();
        textureMap.depth(0);
        textureMap.tileWidth(120);
        textureMap.tileHeight(120);

        textureMap.drawBounds(true);
        textureMap.autoSection(10);
        textureMap.drawSectionBounds(true);
        textureMap.mount(mainScene);

        var grassIdx = textureMap.addTexture(grass);

        textureMap.paintTile(1, 2, grassIdx, 0);
        textureMap.paintTile(6, 2, grassIdx, 0);
        textureMap.paintTile(3, 2, grassIdx, 0);
        textureMap.paintTile(4, 2, grassIdx, 0);





      }
    });
  };

  ige.on('texturesLoaded', init);
};