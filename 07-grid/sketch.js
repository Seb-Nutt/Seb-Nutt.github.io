// 2d grid demo

// use when hard coding
// let theGrid = [[true,false,false,false],[true,false,true,false],[false,true,false,false],[false,false,true,true]];
// const SQUARE_DIMENSION = theGrid.length;

//use this if randomising
let theGrid;
const SQUARE_DIMENSION = 20;
let cellSize;


function setup() {
  createCanvas(windowWidth, windowHeight);
  if (width > height){
    cellSize = height/SQUARE_DIMENSION;
  }
  else{
    cellSize = width/SQUARE_DIMENSION;
  }

  theGrid = randomiseGrid();
}

function draw() {
  background(220);
  showGrid();
}

function showGrid(){
  for (let i = 0; i < SQUARE_DIMENSION; i++){
    for (let j = 0; j < SQUARE_DIMENSION; j++){
      if (theGrid[j][i]){
        fill('black');
      }
      else if (!theGrid[j][i]){
        fill('white');
      }
      square(i*cellSize,j*cellSize,cellSize);
    }
  }
}


function mousePressed(){
  let verticalSquare = Math.floor(mouseY/cellSize);
  let horizantalSquare = Math.floor(mouseX/cellSize);

  toggleSquare(horizantalSquare,verticalSquare);
}

function toggleSquare(_x,_y){
  theGrid[_y][_x] = !theGrid[_y][_x];
}

function randomiseGrid(){
  let newGrid = [];
  for (let y = 0; y < SQUARE_DIMENSION; y++){
    newGrid.push([]);
    for (let x = 0; x < SQUARE_DIMENSION; x++){
      if (random(100) < 50){
        newGrid[y].push(false);
      }
      else{
        newGrid[y].push(true);
      }
    }
  }
  return newGrid;
}