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
          ige.addGraph('IgeBaseScene');

        }
      }
    );
  };


  ige.on('texturesLoaded', init);
};