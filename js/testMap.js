var config = {};
var textures =
  [
    {
      "name": "water",
      "type": "single",
      "zone": "base",
      "textures": [
        {
          "weight": 1,
          "uri": "../img/water.png"
        }
      ]
    },
    {
      "name": "grass",
      "type": "transition",
      "zone": "base",
      "textures": [
        {
          "weight": 1,
          "uri": "../img/grass5.png"
        },
        {
          "weight": 1,
          "uri": "../img/grass6.png"
        }
      ]

    },
    {
      "name": "hut",
      "type": "single",
      "zone": "content",
      "textures": [
        {
          "weight": 1,
          "uri": "../img/hut.png"
        }
      ]

    }
  ];

var isogenicMap = new IsogenicMap(config, textures, function(x, y){ return Math.abs(x + y) });

isogenicMap.claim('target');

var drawATile = function () {
  console.log('map.drawTile');
  drawTile(0, 0);
};

var map = [
  [{'base':'grass'},{'base':'grass'},{'base':'grass'},{'base':'grass'},{'base':'grass'}],
  [{'base':'grass'},{'base':'water'},{'base':'grass', 'content':'hut'},{'base':'grass'},{'base':'grass'}],
  [{'base':'grass'},{'base':'water'},{'base':'water'},{'base':'water'},{'base':'grass'}],
  [{'base':'grass'},{'base':'water'},{'base':'water'},{'base':'grass'},{'base':'grass'}],
  [{'base':'grass'},{'base':'grass'},{'base':'grass'},{'base':'grass'},{'base':'grass'}]
];

function getAdjacent(x, y, map) {
  return [
    map[y]    [x - 1],
    map[y - 1][x - 1],
    map[y - 1][x]    ,
    map[y - 1][x + 1],
    map[y]    [x + 1],
    map[y + 1][x + 1],
    map[y + 1][x]    ,
    map[y + 1][x - 1]
  ];
}

function drawTile(x, y, adjacent) {
  isogenicMap.drawTile(x, y, adjacent[-y + 2][x + 2], getAdjacent(x + 2, -y + 2, adjacent));
}

function drawText(x, y, text) {
  isogenicMap.drawText(x, y, text);
}

for (var y = -1; y <= 1; ++y) {
  for (var x = -1; x <= 1; ++x) {
    drawTile(x, y, map);
    drawText(x, y, ["[" + x + ";" + y + "]"]);
  }
}





