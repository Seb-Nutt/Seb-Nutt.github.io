// Generative art demo

let tileArray = [];
const SIZE = 3;

function setup() {
  createCanvas(windowWidth, windowHeight);


  let tile;

  for (let y = SIZE/2; y <= width; y += SIZE){
    for (let x = SIZE/2; x <= width; x += SIZE){
      tile = spawnTile(x,y,SIZE);

      tileArray.push(tile);
    }
  }
  
}

function draw() {
  background(220);


  for (let tiles of tileArray){
    line(tiles.x1,tiles.y1,tiles.x2, tiles.y2);
  }
}

function spawnTile(_x,_y,_tileSize) {
  let choice = random(100);

  let tile;

  if (choice < 50){
    // +
    tile = {
      x1: _x-_tileSize/2,
      y1: _y + _tileSize/2,
      x2: _x + _tileSize/2,
      y2: _y - _tileSize/2
    };
  }

  else{
    // -
    tile = {
      x1: _x - _tileSize/2,
      y1: _y - _tileSize/2,
      x2: _x + _tileSize/2,
      y2: _y + _tileSize/2
    };
  }

  return tile;
}
