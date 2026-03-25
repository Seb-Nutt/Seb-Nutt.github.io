// 2d rectangular grid demo

const CELL_SIZE = 100;
let rows;
let cols;
let grid;
let white = false;
const SOLID = 1;
const OPEN_TILE = 0;
const PLAYER = 9;
let thePlayer = {
  x:0,
  y:0
};
let rocksImg;
let cloverImg;

function preload(){
  rocksImg = loadImage('rocks.jpg');
  cloverImg = loadImage('clover.jpg');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  rows = Math.floor(width/CELL_SIZE);
  cols = Math.floor(height/CELL_SIZE);
  grid = generateGrid(cols,rows);

  grid[thePlayer.y][thePlayer.x] = PLAYER;
}

function draw() {
  background(220);


  displayGrid();
}

function generateGrid(cols,rows){
  newGrid = [];
  for (let y = 0; y < cols; y++){
    newGrid.push([]);
    for (let x = 0; x < rows; x++){
      clr = random(100);
      if (clr < 50 || white){
        newGrid[y].push(OPEN_TILE);
      }
      else{
        newGrid[y].push(SOLID);
      }
    }
  }
  return newGrid;
}



function displayGrid(){
  for (let y = 0; y < cols; y++){
    for (let x = 0; x < rows; x++){
      if (grid[y][x] === OPEN_TILE){
        // fill('white');
        image(cloverImg, x*CELL_SIZE, y*CELL_SIZE, CELL_SIZE, CELL_SIZE);
      }
      else if(grid[y][x] === SOLID){
        // fill('black');
        image(rocksImg, x*CELL_SIZE, y*CELL_SIZE,CELL_SIZE, CELL_SIZE);
      }
      else if (grid[y][x] === PLAYER){
        fill('red');
        square(x*CELL_SIZE,y*CELL_SIZE,CELL_SIZE);
      }
    }
  }
}

function mousePressed(){
  let col = Math.floor(mouseY/CELL_SIZE);
  let row = Math.floor(mouseX/CELL_SIZE);

  toggleCell(col,row);
}

function toggleCell(col,row){

  if (col >= 0 && col < cols && row >= 0 && row < rows){
    if (grid[col][row] === SOLID){
      grid[col][row] = OPEN_TILE;
    }
    else if (grid[col][row] === OPEN_TILE){
      grid[col][row] = SOLID;
    }
  }
}

function keyPressed() {
  if (key === 'r'){
    white = false;
    grid = generateGrid(cols,rows);
    grid[thePlayer.y][thePlayer.x] = PLAYER;
  }
  else if (key === 'e'){
    white = true;
    grid = generateGrid(cols,rows);
    grid[thePlayer.y][thePlayer.x] = PLAYER;
  }
  else if (key === 's'){
    movePlayer(thePlayer.x,thePlayer.y + 1);
  }
  else if (key === 'w'){
    movePlayer(thePlayer.x,thePlayer.y - 1);
  }
  else if (key === 'a'){
    movePlayer(thePlayer.x - 1,thePlayer.y);
  }
  else if (key === 'd'){
    movePlayer(thePlayer.x + 1,thePlayer.y);
  }
}

function movePlayer(x,y){


  if (x >= 0 && x < rows && y >= 0 && y < cols && grid[y][x] !== SOLID){
    grid[thePlayer.y][thePlayer.x] = OPEN_TILE;
    thePlayer.x = x;
    thePlayer.y = y;
    grid[thePlayer.y][thePlayer.x] = PLAYER;
  }
}